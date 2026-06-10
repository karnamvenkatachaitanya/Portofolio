interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Web3Forms access key (public, safe to hardcode — like a site key)
const WEB3FORMS_KEY = "46178669-cfe4-4a03-8c6d-505555dd9f4d";

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

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
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
      return Response.json(
        { error: result.message ?? "Failed to send message. Please try again later." },
        { status: 500 }
      );
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
