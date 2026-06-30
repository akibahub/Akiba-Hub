const PAYPAL_API_BASE =
  process.env.PAYPAL_API_BASE || "https://api-m.sandbox.paypal.com";

async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing PayPal credentials");
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error("Failed to get PayPal access token");
  }

  const data = await response.json();
  return data.access_token;
}

export async function createPayPalOrder(
  items: { id: string; name: string; price: number; quantity: number }[],
  subtotal: string,
  shipping: string,
  total: string,
  customer: {
    name: string;
    address1: string;
    address2?: string;
    city: string;
    postcode: string;
    countryCode: "GB";
  }
) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      payment_source: {
        paypal: {
          experience_context: {
            shipping_preference: "SET_PROVIDED_ADDRESS",
          },
        },
      },
      purchase_units: [
        {
          amount: {
            currency_code: "GBP",
            value: total,
            breakdown: {
              item_total: {
                currency_code: "GBP",
                value: subtotal,
              },
              shipping: {
                currency_code: "GBP",
                value: shipping,
              },
            },
          },
          shipping: {
            name: {
              full_name: customer.name,
            },
            address: {
              address_line_1: customer.address1,
              address_line_2: customer.address2 || undefined,
              admin_area_2: customer.city,
              postal_code: customer.postcode,
              country_code: "GB",
            },
          },
          items: items.map((item) => ({
            name: item.name.slice(0, 127),
            sku: item.id.slice(0, 127),
            quantity: String(item.quantity),
            category: "PHYSICAL_GOODS",
            unit_amount: {
              currency_code: "GBP",
              value: Number(item.price).toFixed(2),
            },
          })),
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export async function capturePayPalOrder(orderId: string) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(
    `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}