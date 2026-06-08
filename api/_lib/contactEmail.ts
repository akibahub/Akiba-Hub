import { Resend } from "resend";

export type ContactEmailDetails = {
  messageId: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

// HTML escaping helper to prevent script/markup injection
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

export async function sendContactNotification(
  details: ContactEmailDetails
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_FROM_EMAIL;
  const notificationEmail = process.env.ORDER_NOTIFICATION_EMAIL;

  if (!apiKey || !from || !notificationEmail) {
    throw new Error("Missing required Resend environment variables for contact form submission.");
  }

  // Create Resend client inside the function
  const resend = new Resend(apiKey);

  const escapedName = escapeHtml(details.name);
  const escapedEmail = escapeHtml(details.email);
  const escapedMessageId = escapeHtml(details.messageId);
  const escapedCreatedAt = escapeHtml(details.createdAt);
  const escapedMessageHtml = escapeHtml(details.message).replaceAll("\n", "<br>");

  const subject = `New Akiba Hub enquiry — ${details.name}`;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Akiba Hub Enquiry</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7fafc; margin: 0; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; padding: 24px;">
        
        <div style="border-bottom: 2px solid #e60012; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="color: #e60012; margin: 0; font-size: 18px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">NEW AKIBA HUB ENQUIRY</h2>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px; color: #4a5568;">
          <tr>
            <td style="padding: 6px 0; font-weight: bold; width: 140px; color: #718096; text-transform: uppercase;">Message Reference:</td>
            <td style="padding: 6px 0; color: #1a202c; font-family: monospace; font-weight: bold;">${escapedMessageId}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #718096; text-transform: uppercase;">Received At:</td>
            <td style="padding: 6px 0; color: #1a202c;">${escapedCreatedAt}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #718096; text-transform: uppercase;">Customer Name:</td>
            <td style="padding: 6px 0; color: #1a202c; font-weight: bold;">${escapedName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #718096; text-transform: uppercase;">Customer Email:</td>
            <td style="padding: 6px 0; color: #1a202c; font-weight: bold;">
              <a href="mailto:${escapedEmail}" style="color: #e60012; text-decoration: none;">${escapedEmail}</a>
            </td>
          </tr>
        </table>

        <div style="background-color: #f7fafc; border: 1px solid #edf2f7; border-radius: 6px; padding: 20px; font-size: 14px; line-height: 1.6; color: #2d3748; margin-bottom: 24px; white-space: normal; word-break: break-word;">
          <strong style="display: block; font-size: 11px; color: #718096; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.05em;">Customer Message:</strong>
          ${escapedMessageHtml}
        </div>

        <div style="background-color: #fffaf0; border: 1px solid #feebc8; border-radius: 6px; padding: 12px 16px; font-size: 12px; color: #dd6b20; font-weight: 600; text-align: center; line-height: 1.4;">
          💡 Reply directly to this notification email or click the email link above to respond directly to the customer. The customer was not sent an automated copy of this email.
        </div>

      </div>
    </body>
    </html>
  `;

  await resend.emails.send({
    from: from,
    to: notificationEmail.trim(),
    subject,
    html: emailHtml,
    replyTo: details.email.trim(),
  });

  console.log(`Contact notification email successfully sent to merchant at ${notificationEmail.trim()} for ${details.name}`);
}
