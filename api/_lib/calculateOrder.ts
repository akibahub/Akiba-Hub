import { getProductsFromSheet } from "./googleSheets.js";

export type CartRequestItem = {
  id: string;
  quantity: number;
};

export function isValidCartItem(item: unknown): item is CartRequestItem {
  if (!item || typeof item !== "object") return false;

  const possibleItem = item as CartRequestItem;

  return (
    typeof possibleItem.id === "string" &&
    Number.isInteger(possibleItem.quantity) &&
    possibleItem.quantity > 0 &&
    possibleItem.quantity <= 20
  );
}

export async function calculateTrustedOrder(cart: CartRequestItem[]) {
  const products = await getProductsFromSheet();

  let subtotal = 0;

  const items = cart.map((cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);

    if (!product) {
      throw new Error(`Product not found: ${cartItem.id}`);
    }

    if (product.stock < cartItem.quantity) {
      throw new Error(
        `Not enough stock for ${product.name}. Available: ${product.stock}`
      );
    }

    const lineTotal = Number((product.price * cartItem.quantity).toFixed(2));
    subtotal += lineTotal;

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: cartItem.quantity,
      lineTotal,
    };
  });

  const shipping = subtotal >= 50 ? 0 : 3.99;
  const total = Number((subtotal + shipping).toFixed(2));

  return {
    items,
    subtotal: subtotal.toFixed(2),
    shipping: shipping.toFixed(2),
    total: total.toFixed(2),
  };
}