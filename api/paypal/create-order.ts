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
    const cart = req.body?.cart;

    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    if (!cart.every(isValidCartItem)) {
      return res.status(400).json({ error: "Invalid cart format" });
    }

    const calculatedOrder = await calculateTrustedOrder(cart);
    const paypalOrder = await createPayPalOrder(calculatedOrder.total);

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