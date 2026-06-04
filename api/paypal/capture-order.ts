import type { VercelRequest, VercelResponse } from "@vercel/node";
import { capturePayPalOrder } from "../_lib/paypal.js";
import {
  calculateTrustedOrder,
  isValidCartItem,
} from "../_lib/calculateOrder.js";
import {
  appendOrderToSheet,
  appendOrderItemsToSheet,
} from "../_lib/googleSheets.js";

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

    const akibaOrderId = `AKIBA-${Date.now()}`;
    const createdAt = new Date().toISOString();

    await appendOrderToSheet({
      orderId: akibaOrderId,
      paypalOrderId: capture.id,
      captureId,
      customerName: customer?.name || "",
      email: customer?.email || "",
      total: calculatedOrder.total,
      status: "processing",
      createdAt,
    });

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

    return res.status(200).json({
      status: capture.status,
      paypalOrderId: capture.id,
      captureId,
      akibaOrderId,
      calculatedOrder,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to capture order";

    return res.status(400).json({ error: message });
  }
}