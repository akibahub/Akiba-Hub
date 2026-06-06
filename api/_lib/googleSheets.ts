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
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) throw new Error("Missing GOOGLE_SHEET_ID");

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
      id: String(row[0] || "").trim(),
      name: String(row[1] || "").trim(),
      price: Number(row[2]) || 0,
      stock: Number(row[3]),
      image: String(row[4] || "").trim(),
      category: String(row[5] || "").trim(),
      subCategory: String(row[6] || "").trim(),
      language: String(row[7] || "").trim(),
      featured: String(row[8]).toUpperCase() === "TRUE",
      active: String(row[9]).toUpperCase() === "TRUE",
    }))
    .filter((p) => p.id && p.active);
}

export async function appendOrderToSheet(order: {
  orderId: string;
  paypalOrderId: string;
  captureId: string;
  customerName: string;
  email: string;
  total: string;
  status: string;
  createdAt: string;
}) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) throw new Error("Missing GOOGLE_SHEET_ID");

  const sheets = getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Orders!A:H",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          order.orderId,
          order.paypalOrderId,
          order.captureId,
          order.customerName,
          order.email,
          order.total,
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
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) throw new Error("Missing GOOGLE_SHEET_ID");

  const sheets = getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "OrderItems!A:R",
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