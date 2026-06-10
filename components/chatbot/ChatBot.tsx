"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Sparkles, Trash2 } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTER_QUESTIONS = [
  "What projects has Chaitanya built?",
  "Is he open to freelance work?",
  "What tech stack does he specialise in?",
  "What are his biggest achievements?",
];

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "" },
      ]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          assistantContent += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: assistantContent,
            };
            return updated;
          });
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again or reach out directly via the contact form.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-bg-primary shadow-lg dark:bg-accent-pop dark:text-accent"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {!isOpen && (
          <span className="absolute inset-0 animate-ping rounded-full bg-accent-pop/30" />
        )}
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageCircle className="h-5 w-5" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 flex h-[420px] w-[340px] sm:w-[360px] md:h-[550px] md:w-[400px] lg:h-[600px] lg:w-[420px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-border bg-bg-primary shadow-2xl dark:border-border-dark"
            data-lenis-prevent
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3 dark:border-border-dark">
              <Sparkles className="h-4 w-4 text-accent-pop" />
              <h3 className="text-sm font-semibold text-text-primary mr-auto">
                Ask me anything about Chaitanya
              </h3>
              {messages.length > 0 && (
                <button
                  onClick={() => setMessages([])}
                  className="rounded-md p-1.5 text-text-muted hover:bg-bg-secondary hover:text-text-primary transition-colors duration-200"
                  aria-label="Clear chat history"
                  title="Clear chat history"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
              <span className="rounded-full bg-accent-pop/20 px-2 py-0.5 text-[10px] font-medium text-accent">
                AI
              </span>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.length === 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-text-muted">
                    Try asking:
                  </p>
                  {STARTER_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="block w-full rounded-lg border border-border px-3 py-2 text-left text-xs text-text-secondary transition-colors hover:bg-bg-secondary dark:border-border-dark"
                      aria-label={`Ask: ${q}`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((msg, i) => (
                <ChatMessage key={i} role={msg.role} content={msg.content} />
              ))}

              {isLoading &&
                messages[messages.length - 1]?.role !== "assistant" && (
                  <div className="mr-auto rounded-2xl bg-bg-secondary px-4 py-2.5 text-sm text-text-muted">
                    Thinking...
                  </div>
                )}

              <div ref={messagesEndRef} />
            </div>

            <ChatInput
              value={input}
              onChange={setInput}
              onSubmit={() => sendMessage(input)}
              disabled={isLoading}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
