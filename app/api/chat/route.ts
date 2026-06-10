import { PORTFOLIO_CONTEXT } from "@/content/portfolio-context";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Chat API is not configured" }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    const { messages } = (await request.json()) as { messages: ChatMessage[] };

    const systemPrompt = `You are a helpful AI assistant representing Karnam Venkata Chaitanya's portfolio.
Answer questions ONLY using the information below. Be concise, confident, and professional.
If asked something not covered, say 'Chaitanya hasn't shared that publicly yet — feel free to reach out directly.'
Never make up information.

${PORTFOLIO_CONTEXT}`;

    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3.3-70B-Instruct",
          messages: formattedMessages,
          stream: true,
          max_tokens: 500,
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Hugging Face API error response:", errText);
      throw new Error(`Hugging Face API returned status ${response.status}`);
    }

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        if (!response.body) {
          controller.close();
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const cleaned = line.trim();
              if (!cleaned) continue;
              if (cleaned === "data: [DONE]") continue;

              if (cleaned.startsWith("data: ")) {
                try {
                  const jsonStr = cleaned.slice(6);
                  const parsed = JSON.parse(jsonStr);
                  const text = parsed.choices?.[0]?.delta?.content;
                  if (text) {
                    controller.enqueue(encoder.encode(text));
                  }
                } catch {
                  // Partial chunk or non-JSON data line
                }
              }
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
