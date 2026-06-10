
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

    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (!web3formsKey) {
      console.error("WEB3FORMS_ACCESS_KEY is not set in environment variables");
      return Response.json(
        { error: "Contact form is not configured. Please contact the site owner directly." },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: web3formsKey,
        name,
        email,
        subject: `[Portfolio] ${subject} — from ${name}`,
        message,
        from_name: "Portfolio Contact Form",
        replyto: email,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error("Web3Forms error:", result);
      throw new Error(result.message ?? "Form submission failed");
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
