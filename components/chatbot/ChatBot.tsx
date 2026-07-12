"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Bot,
  Trash2,
  Zap,
  ShieldCheck,
  Terminal,
  Activity,
} from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface TelemetryLog {
  timestamp: string;
  type: "system" | "input" | "guardrail" | "api" | "error";
  message: string;
}

const STARTER_QUESTIONS = [
  { icon: "🚀", text: "What projects has Chaitanya built?" },
  { icon: "💼", text: "Is he open to freelance work?" },
  { icon: "⚡", text: "What tech stack does he specialise in?" },
  { icon: "🏆", text: "What are his achievements?" },
];

function TypingIndicator() {
  return (
    <div className="flex items-start gap-2.5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-bg-secondary dark:border-border-dark">
        <Bot className="h-3.5 w-3.5 text-accent-pop" />
      </div>
      <div className="rounded-2xl rounded-tl-md border border-border/60 bg-bg-secondary px-4 py-3 dark:border-border-dark/60">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-accent-pop"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "telemetry">("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Telemetry state
  const [logs, setLogs] = useState<TelemetryLog[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((type: TelemetryLog["type"], message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { timestamp, type, message }]);
  }, []);

  // Initialize logs
  useEffect(() => {
    if (logs.length === 0) {
      addLog("system", "MCP AI Console v1.0.0 initialized.");
      addLog("system", "Secure tunnel connected to Hugging Face serverless router.");
      addLog("system", "Active model: Qwen2.5-Coder-32B-Instruct.");
      addLog("guardrail", "Shield guardrails activated: Injection & Off-topic filters online.");
    }
  }, [logs.length, addLog]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (activeTab === "chat") {
      scrollToBottom();
    }
  }, [messages, activeTab, scrollToBottom]);

  // Scroll telemetry logs to bottom
  useEffect(() => {
    if (activeTab === "telemetry") {
      logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, activeTab]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    const startTime = Date.now();

    addLog("input", `Query: "${text.trim()}"`);

    try {
      addLog("guardrail", "Analyzing query intent for security validation...");
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

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || "Failed to get response");
      }

      const contentType = res.headers.get("content-type") || "";

      // Handle guardrail block response
      if (contentType.includes("application/json")) {
        const data = await res.json();
        if (data.blocked) {
          addLog("guardrail", `BLOCKED: Query flagged as off-topic or injection. Reason: ${data.reason} (Intent Score: ${data.score}%)`);
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.response },
          ]);
          setIsLoading(false);
          return;
        }
      }

      // Handle successful stream response
      const intentScore = res.headers.get("X-Intent-Score") || "100";
      addLog("guardrail", `Intent validation score: ${intentScore}% (PASSED)`);
      addLog("api", "Tunnel established. Stream started.");
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

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      addLog("api", `Stream finished successfully. Duration: ${duration}s.`);
    } catch (err: any) {
      addLog("error", `Exception caught: ${err.message || err}`);
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
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-border/30 bg-accent text-bg-primary shadow-2xl dark:border-accent-pop/30 dark:bg-bg-dark dark:text-accent-pop"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isOpen ? "Close console" : "Open AI Console"}
      >
        {!isOpen && (
          <span className="absolute inset-0 animate-ping rounded-full bg-accent-pop/20" />
        )}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center gap-1"
            >
              <MessageCircle className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Main Console Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[350px] sm:h-[580px] sm:w-[380px] md:w-[420px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-2xl border border-border/60 bg-bg-primary/95 shadow-2xl backdrop-blur-xl transition-all duration-300 dark:border-border-dark/60 dark:bg-bg-dark/95"
            data-lenis-prevent
          >
            {/* Header / Navigation bar */}
            <div className="flex flex-col border-b border-border/60 bg-bg-secondary/40 dark:border-border-dark/60 dark:bg-bg-secondary/20">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-pop/10 border border-accent-pop/25">
                      <Bot className="h-3.5 w-3.5 text-accent-pop" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-bg-primary dark:ring-bg-dark" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-display text-xs font-bold uppercase tracking-wider text-text-primary">
                        KVC-ASSISTANT
                      </span>
                      <span className="rounded bg-accent-pop/20 px-1 py-0.2 font-mono text-[8px] font-semibold text-accent-pop">
                        LIVE
                      </span>
                    </div>
                    <p className="flex items-center gap-1 text-[9px] text-text-muted">
                      <ShieldCheck className="h-2.5 w-2.5 text-emerald-500" />
                      Guardrail Sandbox Active
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {messages.length > 0 && activeTab === "chat" && (
                    <button
                      onClick={() => {
                        setMessages([]);
                        addLog("system", "Chat history cleared.");
                      }}
                      className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-bg-secondary hover:text-text-primary dark:hover:bg-border-dark"
                      title="Clear session"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-bg-secondary hover:text-text-primary dark:hover:bg-border-dark"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* View Tabs */}
              <div className="flex border-t border-border/40 px-3 py-1 dark:border-border-dark/40">
                <button
                  onClick={() => setActiveTab("chat")}
                  className={`flex items-center gap-1.5 border-b-2 px-2.5 py-1.5 text-[11px] font-semibold transition-all ${
                    activeTab === "chat"
                      ? "border-accent-pop text-text-primary"
                      : "border-transparent text-text-muted hover:text-text-primary"
                  }`}
                >
                  <Bot className="h-3 w-3" />
                  AI Agent
                </button>
                <button
                  onClick={() => setActiveTab("telemetry")}
                  className={`flex items-center gap-1.5 border-b-2 px-2.5 py-1.5 text-[11px] font-semibold transition-all ${
                    activeTab === "telemetry"
                      ? "border-accent-pop text-text-primary"
                      : "border-transparent text-text-muted hover:text-text-primary"
                  }`}
                >
                  <Activity className="h-3 w-3" />
                  Telemetry
                </button>
              </div>
            </div>

            {/* Workspace View */}
            <div className="flex flex-1 overflow-hidden">
              <div className="flex flex-1 flex-col overflow-hidden">
                {activeTab === "chat" && (
                  <>
                    <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 scrollbar-thin">
                      {messages.length === 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex h-full flex-col items-center justify-center text-center px-4"
                        >
                          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-pop/10 border border-accent-pop/20 text-accent-pop">
                            <Bot className="h-5 w-5" />
                          </div>
                          <p className="mb-1 font-display text-sm font-semibold text-text-primary">
                            Interactive Portfolio AI Terminal
                          </p>
                          <p className="mb-6 text-[10px] text-text-muted max-w-[280px]">
                            Ask directly about Chaitanya&apos;s project specs, credentials, or work availability.
                          </p>
                          <div className="grid w-full grid-cols-1 gap-2 max-w-[340px]">
                            {STARTER_QUESTIONS.map((q, i) => (
                              <motion.button
                                key={q.text}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => sendMessage(q.text)}
                                className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-bg-secondary/45 px-3 py-2 text-left text-[11px] text-text-secondary hover:border-accent-pop/35 hover:bg-bg-secondary hover:text-text-primary dark:border-border-dark/50"
                              >
                                <span>{q.icon}</span>
                                <span className="truncate">{q.text}</span>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {messages.map((msg, i) => (
                        <ChatMessage
                          key={i}
                          role={msg.role}
                          content={msg.content}
                          isStreaming={
                            isLoading &&
                            i === messages.length - 1 &&
                            msg.role === "assistant"
                          }
                        />
                      ))}

                      {isLoading &&
                        messages[messages.length - 1]?.role !== "assistant" && (
                          <TypingIndicator />
                        )}

                      <div ref={messagesEndRef} />
                    </div>

                    <ChatInput
                      value={input}
                      onChange={setInput}
                      onSubmit={() => sendMessage(input)}
                      disabled={isLoading}
                    />
                  </>
                )}

                {activeTab === "telemetry" && (
                  <div className="flex flex-1 flex-col overflow-hidden bg-bg-dark p-4 font-mono text-[10px] text-zinc-300">
                    <div className="mb-4 grid grid-cols-2 gap-2 border-b border-border-dark pb-3">
                      <div>
                        <p className="text-zinc-500 uppercase text-[9px]">Endpoint Tunnel</p>
                        <p className="font-semibold text-accent-pop">router.huggingface.co</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 uppercase text-[9px]">Model Core</p>
                        <p className="font-semibold text-accent-pop">Qwen2.5-Coder-32B</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 uppercase text-[9px]">Guardrail Filter</p>
                        <p className="font-semibold text-emerald-400">ACTIVE</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 uppercase text-[9px]">IP Rate Limit</p>
                        <p className="font-semibold text-emerald-400">OK (Max 20/m)</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-b border-border-dark pb-2 mb-2 text-zinc-500 text-[9px]">
                      <span>EVENT LOGS</span>
                      <button
                        onClick={() => setLogs([])}
                        className="hover:text-accent-pop"
                      >
                        [CLEAR]
                      </button>
                    </div>

                    <div className="flex-1 space-y-1.5 overflow-y-auto pr-1">
                      {logs.map((log, index) => (
                        <div key={index} className="flex items-start gap-1">
                          <span className="text-zinc-600 shrink-0">[{log.timestamp}]</span>
                          <span
                            className={`shrink-0 uppercase font-semibold text-[8px] px-1 rounded ${
                              log.type === "system"
                                ? "bg-zinc-800 text-zinc-400"
                                : log.type === "input"
                                ? "bg-accent-pop/20 text-accent-pop"
                                : log.type === "guardrail"
                                ? "bg-blue-950 text-blue-300"
                                : log.type === "api"
                                ? "bg-emerald-950 text-emerald-300"
                                : "bg-red-950 text-red-300"
                            }`}
                          >
                            {log.type}
                          </span>
                          <span className="break-all">{log.message}</span>
                        </div>
                      ))}
                      <div ref={logsEndRef} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
