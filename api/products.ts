import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getProductsFromSheet } from "./_lib/googleSheets";

let cachedProducts: unknown = null;
let cacheTime = 0;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const now = Date.now();

    if (cachedProducts && now - cacheTime < 5 * 60 * 1000) {
      return res.status(200).json(cachedProducts);
    }

    const products = await getProductsFromSheet();

    cachedProducts = products;
    cacheTime = now;

    return res.status(200).json(products);
  } catch (error) {
    console.error("Products API error:", error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to load products",
    });
  }
}