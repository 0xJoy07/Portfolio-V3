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
      from: "Portfolio <onboarding@resend.dev>",
      to: "joysengupta521@gmail.com", 
      subject: "New Footer Subscription",
      text: `Someone just subscribed to your portfolio newsletter with the email: ${email}`,
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
