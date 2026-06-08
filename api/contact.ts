import type { VercelRequest, VercelResponse } from "@vercel/node";
import { appendContactMessage } from "./_lib/googleSheets.js";
import { sendContactNotification } from "./_lib/contactEmail.js";

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

// Input validation and text cleaning helper
function cleanText(value: unknown, maximumLength: number): string {
  if (value === null || value === undefined) {
    return "";
  }
  const str = String(value);
  return str.trim().slice(0, maximumLength);
}

// Simple email validation matcher
function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enforce POST requests only
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const body = (req.body || {}) as ContactRequestBody;

    // Clean & Sanitize fields from the body
    const name = cleanText(body.name, 100);
    const email = cleanText(body.email, 254);
    const message = cleanText(body.message, 3000);
    const website = cleanText(body.website, 200);

    // Bot honeypot filter trigger
    if (website.length > 0) {
      console.warn("Spam honeypot triggered; discarding contact submission silently");
      return res.status(200).json({
        success: true,
      });
    }

    // Server-side validation constraints
    if (name.length < 2) {
      return res.status(400).json({
        error: "Name must contain at least 2 characters.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Please enter a valid email address.",
      });
    }

    if (message.length < 10) {
      return res.status(400).json({
        error: "Message must contain at least 10 characters.",
      });
    }

    // Generate strict unique random MSG reference
    const messageId = `MSG-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)
      .toUpperCase()}`;

    const createdAt = new Date().toISOString();
    const status = "new";

    // 1. Permanent data persist: Append row to dedicated Google Spreadsheet tab
    await appendContactMessage({
      messageId,
      name,
      email,
      message,
      status,
      createdAt,
    });

    // 2. Notification dispatch: Safely trigger merchant email via Resend
    try {
      await sendContactNotification({
        messageId,
        name,
        email,
        message,
        createdAt,
      });
    } catch (emailError) {
      console.error("Contact notification failed:", emailError);
    }

    // Return success to the client with the created reference
    return res.status(201).json({
      success: true,
      messageId,
    });
  } catch (error) {
    console.error("Contact submission failed:", error);

    // Prevent leaking private system internals like Sheets IDs or Resend keys
    return res.status(500).json({
      error: "Your message could not be submitted. Please try again.",
    });
  }
}
