"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribeAction(email: string) {
  try {
    if (!email || !email.includes("@")) {
      return { success: false, error: "Invalid email" };
    }

    // Sends an email to you when someone subscribes
    const { data, error } = await resend.emails.send({
      from: "Portfolio <noreply@portfolio.com>",
      to: "joysengupta521@gmail.com", 
      subject: "NEW_SIGNAL_DETECTED: Footer Form",
      html: `
        <div style="font-family: 'Courier New', monospace; background-color: #09090b; color: #fafafa; padding: 32px; border-radius: 8px; border: 1px solid #27272a;">
          <h2 style="color: #f9531f; margin-top: 0; font-size: 22px; font-weight: bold;">> NEW_CONNECTION_ESTABLISHED</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #a1a1aa;">
            System log: A new subscriber has interfaced with the portfolio footer terminal.
          </p>
          <div style="background-color: #000000; padding: 20px; border-radius: 6px; border-left: 4px solid #f9531f; margin: 24px 0;">
            <code style="color: #10b981; font-size: 16px;">
              <span style="color: #71717a;">$</span> extract_payload --target email<br/><br/>
              <span style="color: #fafafa;">> "${email}"</span>
            </code>
          </div>
          <p style="color: #71717a; font-size: 12px; margin-bottom: 0;">
            // End of transmission.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Subscription Error:", error);
    return { success: false, error: "Failed to process subscription" };
  }
}
