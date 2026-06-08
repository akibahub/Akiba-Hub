import { Resend } from "resend";

export type ReceiptItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  lineTotal: number;
};

export type OrderEmailDetails = {
  orderId: string;
  paypalOrderId: string;
  captureId: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  country: string;
  items: ReceiptItem[];
  subtotal: string;
  shipping: string;
  total: string;
  createdAt: string;
};

// HTML escaping helper to prevent XSS and ensure layout compliance
function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }
  const str = String(value);
  return str.replace(/[&<>"']/g, (m) => {
    switch (m) {
      case "&": return "&amp;";
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "\"": return "&quot;";
      case "'": return "&#39;";
      default: return m;
    }
  });
}

// Safe GBP formatter checking for safe numbers
function formatGBP(value: unknown): string {
  if (value === null || value === undefined) {
    return "£0.00";
  }
  const safeNumber = Number(value);
  const formatted = Number.isFinite(safeNumber)
    ? safeNumber.toFixed(2)
    : "0.00";
  return `£${formatted}`;
}

export async function sendOrderEmails(
  order: OrderEmailDetails
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_FROM_EMAIL;
  const notificationEmail = process.env.ORDER_NOTIFICATION_EMAIL;

  if (!apiKey || !from) {
    throw new Error("Missing Resend email configuration: RESEND_API_KEY or ORDER_FROM_EMAIL is not set.");
  }

  // Validate student/customer email address
  const customerEmailRaw = order.customerEmail ? order.customerEmail.trim() : "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isCustomerEmailValid = customerEmailRaw.length > 0 && emailRegex.test(customerEmailRaw);

  const escapedOrderId = escapeHtml(order.orderId);
  const escapedPaypalOrderId = escapeHtml(order.paypalOrderId);
  const escapedCaptureId = escapeHtml(order.captureId);
  const escapedCustomerName = escapeHtml(order.customerName);
  const escapedCustomerEmail = escapeHtml(order.customerEmail);
  const escapedPhone = escapeHtml(order.phone);
  const escapedAddress1 = escapeHtml(order.address1);
  const escapedAddress2 = escapeHtml(order.address2);
  const escapedCity = escapeHtml(order.city);
  const escapedPostcode = escapeHtml(order.postcode);
  const escapedCountry = escapeHtml(order.country);

  // Initialize Resend client inside the function so build step doesn't crash if SDK key is loaded lazily or absent
  const resend = new Resend(apiKey);

  if (isCustomerEmailValid) {
    // Generate Customer HTML Content
    const customerTableRowsHtml = order.items.map((item) => {
      const escapedItemName = escapeHtml(item.name);
      const escapedItemId = escapeHtml(item.id);
      return `
        <tr>
          <td style="padding: 12px; font-size: 14px; border-bottom: 1px solid #edf2f7;">
            <div style="font-weight: 600; color: #1a202c;">${escapedItemName}</div>
            <div style="font-size: 11px; color: #718096; margin-top: 2px;">SKU: ${escapedItemId}</div>
          </td>
          <td style="padding: 12px; font-size: 14px; border-bottom: 1px solid #edf2f7; text-align: center; color: #2d3748; font-weight: bold;">
            ${item.quantity}
          </td>
          <td style="padding: 12px; font-size: 14px; border-bottom: 1px solid #edf2f7; text-align: right; color: #2d3748; font-family: monospace;">
            ${formatGBP(item.price)}
          </td>
          <td style="padding: 12px; font-size: 14px; border-bottom: 1px solid #edf2f7; text-align: right; color: #1a202c; font-weight: bold; font-family: monospace;">
            ${formatGBP(item.lineTotal)}
          </td>
        </tr>
      `;
    }).join("");

    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmed - Akiba Hub</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7fafc; margin: 0; padding: 20px; -webkit-font-smoothing: antialiased;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
          
          <!-- Branding Header -->
          <div style="background-color: #0c0c0e; border-bottom: 4px solid #e60012; padding: 28px; text-align: center;">
            <span style="color: #ffffff; font-size: 24px; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase;">
              AKIBA<span style="color: #e60012;">_</span>HUB
            </span>
            <div style="color: #a0aec0; font-size: 10px; font-weight: Bold; letter-spacing: 0.15em; margin-top: 5px;">THE ANIME & MANGA COLLECTIVE</div>
          </div>

          <!-- Payment Success Banner -->
          <div style="padding: 32px 24px; text-align: center; background-color: #fffaf0; border-bottom: 1px solid #feebc8;">
            <div style="width: 48px; height: 48px; background-color: #e60012; color: #ffffff; border-radius: 50%; font-size: 24px; font-weight: bold; line-height: 48px; text-align: center; margin: 0 auto 16px auto;">✓</div>
            <h2 style="color: #e60012; margin: 0 0 8px 0; font-size: 20px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">YOUR PAYMENT SECURED</h2>
            <p style="color: #4a5568; margin: 0; font-size: 13.5px; line-height: 1.5; font-weight: 500;">
              Thank you for shopping with us! Your order matches our trusted calculations, and your PayPal payment was captured successfully.
            </p>
          </div>

          <!-- Order Metadata -->
          <div style="padding: 24px; border-bottom: 1px solid #edf2f7; background-color: #fafbfd;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 4px 0; font-size: 12px; color: #718096; font-weight: bold; uppercase;">ORDER ID:</td>
                <td style="padding: 4px 0; font-size: 12px; color: #1a202c; font-weight: bold; text-align: right; font-family: monospace;">${escapedOrderId}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-size: 12px; color: #718096; font-weight: bold; uppercase;">PAYPAL ID:</td>
                <td style="padding: 4px 0; font-size: 12px; color: #1a202c; font-weight: bold; text-align: right; font-family: monospace;">${escapedPaypalOrderId}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-size: 12px; color: #718096; font-weight: bold; uppercase;">ORDER DATE:</td>
                <td style="padding: 4px 0; font-size: 12px; color: #1a202c; font-weight: bold; text-align: right;">${escapeHtml(order.createdAt)}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-size: 12px; color: #718096; font-weight: bold; uppercase;">CUSTOMER NAME:</td>
                <td style="padding: 4px 0; font-size: 12px; color: #1a202c; font-weight: bold; text-align: right;">${escapedCustomerName}</td>
              </tr>
            </table>
          </div>

          <!-- Order Items Table -->
          <div style="padding: 24px;">
            <div style="font-size: 13px; color: #1a202c; font-weight: 900; text-transform: uppercase; border-bottom: 2px solid #e60012; padding-bottom: 6px; margin-bottom: 12px; letter-spacing: 0.05em;">ITEMS PURCHASED</div>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr>
                  <th style="text-align: left; background-color: #f7fafc; padding: 10px 12px; font-size: 11px; color: #718096; text-transform: uppercase; font-weight: 800; border-bottom: 1px solid #edf2f7;">Product Details</th>
                  <th style="text-align: center; background-color: #f7fafc; padding: 10px 12px; font-size: 11px; color: #718096; text-transform: uppercase; font-weight: 800; border-bottom: 1px solid #edf2f7; width: 50px;">Qty</th>
                  <th style="text-align: right; background-color: #f7fafc; padding: 10px 12px; font-size: 11px; color: #718096; text-transform: uppercase; font-weight: 800; border-bottom: 1px solid #edf2f7; width: 80px;">Unit Price</th>
                  <th style="text-align: right; background-color: #f7fafc; padding: 10px 12px; font-size: 11px; color: #718096; text-transform: uppercase; font-weight: 800; border-bottom: 1px solid #edf2f7; width: 95px;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${customerTableRowsHtml}
              </tbody>
            </table>

            <!-- Summary Totals -->
            <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
              <tr>
                <td style="padding: 6px 12px; border: none; text-align: right; font-size: 13px; color: #718096; font-weight: 600;">Items Subtotal:</td>
                <td style="padding: 6px 12px; border: none; text-align: right; font-size: 14px; color: #2d3748; font-weight: bold; width: 125px; font-family: monospace;">${formatGBP(order.subtotal)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 12px; border: none; text-align: right; font-size: 13px; color: #718096; font-weight: 600;">Shipping Fee:</td>
                <td style="padding: 6px 12px; border: none; text-align: right; font-size: 14px; color: #2d3748; font-weight: bold; width: 125px; font-family: monospace;">${formatGBP(order.shipping)}</td>
              </tr>
              <tr>
                <td style="padding: 12px 12px 6px 12px; border-top: 2px solid #edf2f7; text-align: right; font-size: 14px; color: #1a202c; font-weight: 800; text-transform: uppercase;">Grand Total Paid:</td>
                <td style="padding: 12px 12px 6px 12px; border-top: 2px solid #edf2f7; text-align: right; font-size: 18px; color: #e60012; font-weight: 900; width: 125px; font-family: monospace;">${formatGBP(order.total)}</td>
              </tr>
            </table>
          </div>

          <!-- Shipping Details Section -->
          <div style="padding: 24px; background-color: #f8fafc; border-top: 1px solid #edf2f7;">
            <div style="font-size: 13px; color: #1a202c; font-weight: 900; text-transform: uppercase; border-bottom: 2px solid #718096; padding-bottom: 6px; margin-bottom: 12px; letter-spacing: 0.05em;">DELIVERY ADDRESS</div>
            <div style="background-color: #ffffff; border-radius: 6px; padding: 16px; border: 1px solid #e2e8f0; font-size: 13.5px; color: #4a5568; line-height: 1.6; font-weight: 500;">
              <strong>${escapedCustomerName}</strong><br />
              ${escapedAddress1}<br />
              ${escapedAddress2 ? escapedAddress2 + "<br />" : ""}
              ${escapedCity}, ${escapedPostcode}<br />
              ${escapedCountry}
            </div>
            <div style="margin-top: 15px; font-size: 11px; color: #718096; font-weight: 600; line-height: 1.4;">
              📞 Contact Phone: ${escapedPhone} | ✉ Email: ${escapedCustomerEmail}
            </div>
          </div>

          <!-- Dispatch Banner Note -->
          <div style="padding: 20px 24px; background-color: #f0fff4; border-top: 1px solid #c6f6d5; text-align: center;">
            <p style="color: #22543d; font-size: 12px; font-weight: 800; text-transform: uppercase; margin: 0; letter-spacing: 0.05em;">Your order is currently processing!</p>
            <p style="color: #2f855a; font-size: 11.5px; margin: 4px 0 0 0; line-weight: 1.4; font-weight: 600;">Another notification email will be dispatched automatically as soon as your items ship.</p>
          </div>

          <!-- Footer Block -->
          <div style="background-color: #0c0c0e; padding: 24px; text-align: center; font-size: 12px; color: #a0aec0; border-top: 3px solid #e60012;">
            <p style="margin: 0 0 8px 0; font-weight: 600; color: #ffffff;">Akiba Hub Official Store</p>
            <p style="margin: 0; line-height: 1.4;">
              If you have any questions or require custom support, please reply to this message directly or join our community networks.
            </p>
          </div>

        </div>
      </body>
      </html>
    `;

    try {
      await resend.emails.send({
        from: from,
        to: customerEmailRaw,
        subject: `Akiba Hub order confirmed — ${order.orderId}`,
        html: customerEmailHtml,
      });
      console.log(`Customer receipt successfully sent to ${customerEmailRaw} for order ${order.orderId}`);
    } catch (error) {
      console.error("Customer receipt failed:", error);
    }
  } else {
    console.error("Customer receipt skipped: invalid email");
  }

  // Generate Merchant Notification Email if configured
  if (notificationEmail && notificationEmail.trim().length > 0) {
    const merchantTableRowsHtml = order.items.map((item) => {
      const escapedItemName = escapeHtml(item.name);
      const escapedItemId = escapeHtml(item.id);
      return `
        <tr>
          <td style="padding: 8px 12px; text-align: left; border-bottom: 1px solid #edf2f7; font-size: 13px;">
            ${escapedItemName} (SKU: ${escapedItemId})
          </td>
          <td style="padding: 8px 12px; text-align: center; border-bottom: 1px solid #edf2f7; font-size: 13px;">
            ${item.quantity}
          </td>
          <td style="padding: 8px 12px; text-align: right; border-bottom: 1px solid #edf2f7; font-size: 13px; font-family: monospace;">
            ${formatGBP(item.price)}
          </td>
          <td style="padding: 8px 12px; text-align: right; border-bottom: 1px solid #edf2f7; font-size: 13px; font-weight: bold; font-family: monospace;">
            ${formatGBP(item.lineTotal)}
          </td>
        </tr>
      `;
    }).join("");

    const merchantEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Order Received</title>
      </head>
      <body style="font-family: monospace; background-color: #f7fafc; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #cbd5e0; padding: 24px; border-radius: 4px;">
          <h2 style="color: #e60012; margin-top: 0; border-bottom: 2px solid #e60012; padding-bottom: 10px;">[NEW ORDER RECEIVED] ${escapedOrderId}</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 4px; font-weight: bold;">AKiba Order ID:</td>
              <td style="padding: 4px;">${escapedOrderId}</td>
            </tr>
            <tr>
              <td style="padding: 4px; font-weight: bold;">PayPal Order ID:</td>
              <td style="padding: 4px;">${escapedPaypalOrderId}</td>
            </tr>
            <tr>
              <td style="padding: 4px; font-weight: bold;">PayPal Capture ID:</td>
              <td style="padding: 4px;">${escapedCaptureId}</td>
            </tr>
            <tr>
              <td style="padding: 4px; font-weight: bold;">Timestamp:</td>
              <td style="padding: 4px;">${escapeHtml(order.createdAt)}</td>
            </tr>
            <tr>
              <td style="padding: 4px; font-weight: bold;">Current Status:</td>
              <td style="padding: 4px; color: #e60012; font-weight: bold;">processing</td>
            </tr>
          </table>

          <div style="border: 1px solid #edf2f7; padding: 12px; background-color: #edf2f7; margin-bottom: 20px;">
            <strong style="text-transform: uppercase;">Customer Details</strong><br/>
            Name: ${escapedCustomerName}<br/>
            Email: ${escapedCustomerEmail}<br/>
            Phone: ${escapedPhone}<br/>
            <br/>
            <strong>Delivery Address:</strong><br/>
            ${escapedAddress1}<br/>
            ${escapedAddress2 ? escapedAddress2 + "<br/>" : ""}
            ${escapedCity}, ${escapedPostcode}<br/>
            ${escapedCountry}
          </div>

          <h3 style="border-bottom: 1px solid #cbd5e0; padding-bottom: 5px;">Line Items</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #f7fafc;">
                <th style="padding: 8px; text-align: left; font-size: 11px; border-bottom: 1px solid #edf2f7;">Product Details</th>
                <th style="padding: 8px; text-align: center; font-size: 11px; border-bottom: 1px solid #edf2f7; width: 40px;">Qty</th>
                <th style="padding: 8px; text-align: right; font-size: 11px; border-bottom: 1px solid #edf2f7; width: 80px;">Price</th>
                <th style="padding: 8px; text-align: right; font-size: 11px; border-bottom: 1px solid #edf2f7; width: 90px;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${merchantTableRowsHtml}
            </tbody>
          </table>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="text-align: right; padding: 4px; font-weight: bold;">Subtotal:</td>
              <td style="text-align: right; padding: 4px; width: 100px; font-family: monospace;">${formatGBP(order.subtotal)}</td>
            </tr>
            <tr>
              <td style="text-align: right; padding: 4px; font-weight: bold;">Shipping:</td>
              <td style="text-align: right; padding: 4px; width: 100px; font-family: monospace;">${formatGBP(order.shipping)}</td>
            </tr>
            <tr>
              <td style="text-align: right; padding: 4px; font-weight: bold; border-top: 1px solid #cbd5e0; padding-top: 8px;">Order Total:</td>
              <td style="text-align: right; padding: 4px; font-weight: bold; width: 100px; font-family: monospace; border-top: 1px solid #cbd5e0; padding-top: 8px; color: #e60012;">${formatGBP(order.total)}</td>
            </tr>
          </table>
        </div>
      </body>
      </html>
    `;

    try {
      // resend.emails.send allows replyTo configuration
      await resend.emails.send({
        from: from,
        to: notificationEmail.trim(),
        subject: `New Akiba Hub order — ${order.orderId}`,
        html: merchantEmailHtml,
        replyTo: isCustomerEmailValid ? customerEmailRaw : undefined,
      });
      console.log(`Merchant notification email successfully sent to ${notificationEmail.trim()} for order ${order.orderId}`);
    } catch (error) {
      console.error("Merchant notification failed:", error);
    }
  }
}
