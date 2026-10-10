"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribeAction(email: string) {
  try {
    if (!email || !email.includes("@")) {
      return { success: false, error: "Invalid email" };
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "joysengupta521@gmail.com",
      subject: "New subscriber from your portfolio",
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 520px; margin: 0 auto; background-color: #ffffff; padding: 0;">
          
          <!-- Header -->
          <div style="text-align: center; padding: 40px 32px 24px;">
            <img src="https://0x-joy.vercel.app/icon.png" alt="Joy" width="64" height="64" style="border-radius: 50%; display: inline-block;" />
            <h1 style="font-size: 22px; font-weight: 700; color: #09090b; margin: 16px 0 0;">New Portfolio Subscriber</h1>
          </div>

          <!-- Body -->
          <div style="padding: 0 32px 32px;">
            <p style="font-size: 15px; line-height: 1.6; color: #374151; margin: 0 0 16px;">
              Hi Joy,
            </p>
            <p style="font-size: 15px; line-height: 1.6; color: #374151; margin: 0 0 24px;">
              Someone just signed up through your portfolio footer. Here are the details:
            </p>

            <!-- Email Card -->
            <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 0 0 28px; border: 1px solid #e5e7eb;">
              <p style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 6px;">Subscriber Email</p>
              <p style="font-size: 16px; font-weight: 600; color: #09090b; margin: 0;">${email}</p>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin: 0 0 32px;">
              <a href="mailto:${email}" style="display: inline-block; background-color: #f9531f; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; padding: 12px 32px; border-radius: 6px;">
                Reply to Subscriber
              </a>
            </div>

            <p style="font-size: 15px; line-height: 1.6; color: #374151; margin: 0 0 4px;">
              Best regards,
            </p>
            <p style="font-size: 15px; color: #09090b; font-weight: 600; margin: 0;">
              Joy's Portfolio
            </p>
          </div>

          <!-- Footer -->
          <div style="border-top: 1px solid #e5e7eb; padding: 24px 32px; text-align: center;">
            <p style="font-size: 12px; color: #9ca3af; margin: 0;">
              This is an automated notification from your portfolio site.
            </p>
          </div>
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
