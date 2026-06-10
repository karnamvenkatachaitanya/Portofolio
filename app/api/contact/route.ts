import { Resend } from "resend";
import { SITE_CONFIG } from "@/lib/constants";

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const contactEmail =
      process.env.CONTACT_EMAIL ?? SITE_CONFIG.email;
    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: contactEmail,
        replyTo: email,
        subject: `[Portfolio] ${subject} — from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      });

      return Response.json({ success: true });
    }

    // Fallback: FormSubmit.co (no backend API key needed)
    const formSubmitRes = await fetch("https://formsubmit.co/ajax/" + contactEmail, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
        _subject: `[Portfolio] ${subject} — from ${name}`,
      }),
    });

    if (!formSubmitRes.ok) {
      throw new Error("Form submission failed");
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return Response.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
