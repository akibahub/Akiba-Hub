import type { VercelRequest, VercelResponse } from "@vercel/node";
import { capturePayPalOrder } from "../_lib/paypal.js";
import {
  calculateTrustedOrder,
  isValidCartItem,
} from "../_lib/calculateOrder.js";
import {
  appendOrderToSheet,
  appendOrderItemsToSheet,
  orderAlreadySaved,
} from "../_lib/googleSheets.js";
import { sendOrderEmails } from "../_lib/email.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { orderId, cart, customer } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: "Missing PayPal order ID" });
    }

    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    if (!cart.every(isValidCartItem)) {
      return res.status(400).json({ error: "Invalid cart format" });
    }

    const calculatedOrder = await calculateTrustedOrder(cart);
    const capture = await capturePayPalOrder(orderId);

    if (capture.status !== "COMPLETED") {
      return res.status(400).json({
        error: "Payment was not completed",
        status: capture.status,
      });
    }

    const captureId =
      capture.purchase_units?.[0]?.payments?.captures?.[0]?.id || "";

    if (!captureId) {
      return res.status(400).json({ error: "No capture ID found from PayPal" });
    }

    // Verify the captured amount matches the backend-calculated total
    const capturedAmount =
      capture.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value || "";

    if (Number(capturedAmount).toFixed(2) !== Number(calculatedOrder.total).toFixed(2)) {
      return res.status(400).json({
        error: `Captured amount (${capturedAmount}) does not match trusted total (${calculatedOrder.total})`,
      });
    }

    // Prevent duplicate spreadsheet rows by checking captureId
    const alreadySaved = await orderAlreadySaved(captureId);
    if (alreadySaved) {
      console.warn(`Order with capture ID ${captureId} is already saved. Skipping duplicate save.`);
      return res.status(200).json({
        status: capture.status,
        paypalOrderId: capture.id,
        captureId,
        akibaOrderId: `AKIBA-DUPLICATE-${captureId}`,
        calculatedOrder,
      });
    }

    const akibaOrderId = `AKIBA-${Date.now()}-${captureId.slice(-6)}`;
    const createdAt = new Date().toISOString();

    // Save the main order to the separate order spreadsheet
    await appendOrderToSheet({
      orderId: akibaOrderId,
      paypalOrderId: capture.id,
      captureId,
      customerName: customer?.name || "",
      email: customer?.email || "",
      phone: customer?.phone || "",
      address1: customer?.address1 || "",
      address2: customer?.address2 || "",
      city: customer?.city || "",
      postcode: customer?.postcode || "",
      country: customer?.country || "",
      subtotal: calculatedOrder.subtotal,
      shipping: calculatedOrder.shipping,
      total: calculatedOrder.total,
      status: "processing",
      createdAt,
    });

    // Save each product line to the separate order spreadsheet
    await appendOrderItemsToSheet(
      calculatedOrder.items.map((item) => ({
        orderId: akibaOrderId,
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        lineTotal: item.lineTotal,
      }))
    );

    // Attempt customer receipt and optional merchant notification email without breaking successfully paid orders
    try {
      await sendOrderEmails({
        orderId: akibaOrderId,
        paypalOrderId: String(capture.id ?? orderId),
        captureId,
        customerName: String(customer?.name ?? "").trim(),
        customerEmail: String(customer?.email ?? "").trim(),
        phone: String(customer?.phone ?? "").trim(),
        address1: String(customer?.address1 ?? "").trim(),
        address2: String(customer?.address2 ?? "").trim(),
        city: String(customer?.city ?? "").trim(),
        postcode: String(customer?.postcode ?? "").trim(),
        country: String(customer?.country ?? "United Kingdom").trim(),
        items: calculatedOrder.items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          lineTotal: item.lineTotal,
        })),
        subtotal: calculatedOrder.subtotal,
        shipping: calculatedOrder.shipping,
        total: calculatedOrder.total,
        createdAt,
      });
    } catch (emailError) {
      console.error("Order email failed:", emailError);
    }

    return res.status(200).json({
      status: capture.status,
      paypalOrderId: capture.id,
      captureId,
      akibaOrderId,
      calculatedOrder,
      emailAttempted: true,
    });
  } catch (error) {
    console.error("Capture and save order error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to capture order";

    return res.status(400).json({ error: message });
  }
}