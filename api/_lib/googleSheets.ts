import { google } from "googleapis";

export type SheetProduct = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  subCategory: string;
  language: string;
  featured: boolean;
  active: boolean;
};

function getProductSpreadsheetId(): string {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) throw new Error("Missing GOOGLE_SHEET_ID");
  return spreadsheetId;
}

function getOrdersSpreadsheetId(): string {
  const spreadsheetId = process.env.GOOGLE_ORDERS_SHEET_ID;
  if (!spreadsheetId) throw new Error("Missing GOOGLE_ORDERS_SHEET_ID");
  return spreadsheetId;
}

function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !privateKey) {
    throw new Error("Missing Google credentials");
  }

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

export async function getProductsFromSheet(): Promise<SheetProduct[]> {
  const spreadsheetId = getProductSpreadsheetId();
  const sheets = getSheetsClient();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Products!A:J",
    valueRenderOption: "UNFORMATTED_VALUE",
  });

  const rows = response.data.values || [];
  const [, ...dataRows] = rows;

  return dataRows
    .map((row) => ({
      id: String(row[0] ?? "").trim(),
      name: String(row[1] ?? "").trim(),
      price: Number(row[2]) || 0,
      stock: Number(row[3]) || 0,
      image: String(row[4] ?? "").trim(),
      category: String(row[5] ?? "").trim(),
      subCategory: String(row[6] ?? "").trim(),
      language: String(row[7] ?? "").trim(),
      featured: String(row[8] ?? "").trim().toUpperCase() === "TRUE",
      active: String(row[9] ?? "").trim().toUpperCase() === "TRUE",
    }))
    .filter((p) => p.id && p.active);
}

export async function orderAlreadySaved(captureId: string): Promise<boolean> {
  if (!captureId) return false;
  const spreadsheetId = getOrdersSpreadsheetId();
  const sheets = getSheetsClient();
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Orders!C2:C",
    });
    const rows = response.data.values || [];
    return rows.some((row) => String(row[0] || "").trim() === captureId);
  } catch (error) {
    console.error("Error checking orderAlreadySaved:", error);
    return false;
  }
}

export async function appendOrderToSheet(order: {
  orderId: string;
  paypalOrderId: string;
  captureId: string;
  customerName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  country: string;
  subtotal: string;
  shipping: string;
  total: string;
  status: string;
  createdAt: string;
}) {
  const spreadsheetId = getOrdersSpreadsheetId();
  const sheets = getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId: getOrdersSpreadsheetId(),
    range: "Orders!A:P",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          order.orderId,
          order.paypalOrderId,
          order.captureId,
          order.customerName,
          order.email,
          String(order.phone ?? "").trim(),
          order.address1,
          order.address2,
          order.city,
          order.postcode,
          order.country,
          Number(order.subtotal),
          Number(order.shipping),
          Number(order.total),
          order.status,
          order.createdAt,
        ],
      ],
    },
  });
}

export async function appendOrderItemsToSheet(
  items: {
    orderId: string;
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }[]
) {
  const spreadsheetId = getOrdersSpreadsheetId();
  const sheets = getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "OrderItems!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: items.map((item) => [
        item.orderId,
        item.productId,
        item.productName,
        item.quantity,
        item.unitPrice,
        item.lineTotal,
      ]),
    },
  });
}