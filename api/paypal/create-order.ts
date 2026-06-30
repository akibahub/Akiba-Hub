import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createPayPalOrder } from "../_lib/paypal.js";
import {
  calculateTrustedOrder,
  isValidCartItem,
} from "../_lib/calculateOrder.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { cart, customer } = req.body || {};

    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    if (!cart.every(isValidCartItem)) {
      return res.status(400).json({ error: "Invalid cart format" });
    }

    if (!customer) {
      return res.status(400).json({ error: "Customer details are required" });
    }

    const { name, address1, address2, city, postcode, countryCode } = customer;

    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "Customer name is required" });
    }
    if (!address1 || typeof address1 !== "string") {
      return res.status(400).json({ error: "Customer address line 1 is required" });
    }
    if (!city || typeof city !== "string") {
      return res.status(400).json({ error: "Customer city is required" });
    }
    if (!postcode || typeof postcode !== "string") {
      return res.status(400).json({ error: "Customer postcode is required" });
    }
    if (countryCode !== "GB") {
      return res.status(400).json({ error: "Delivery is only supported to the United Kingdom" });
    }

    const calculatedOrder = await calculateTrustedOrder(cart);
    const paypalOrder = await createPayPalOrder(
      calculatedOrder.items,
      calculatedOrder.subtotal,
      calculatedOrder.shipping,
      calculatedOrder.total,
      {
        name,
        address1,
        address2,
        city,
        postcode,
        countryCode,
      }
    );

    return res.status(200).json({
      id: paypalOrder.id,
      calculatedOrder,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create order";

    return res.status(400).json({ error: message });
  }
}