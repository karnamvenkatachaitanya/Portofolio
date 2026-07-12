"use client";

import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { renderMarkdown } from "@/lib/markdown";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export function ChatMessage({ role, content, isStreaming }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 35 }}
      className={cn("flex gap-2.5", isUser ? "flex-row-reverse" : "flex-row")}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
          isUser
            ? "bg-accent text-bg-primary dark:bg-accent-pop dark:text-bg-dark"
            : "border border-border bg-bg-secondary dark:border-border-dark"
        )}
      >
        {isUser ? (
          <User className="h-3.5 w-3.5" />
        ) : (
          <Bot className="h-3.5 w-3.5 text-accent-pop" />
        )}
      </div>

      {/* Message Bubble */}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
          isUser
            ? "rounded-tr-md bg-accent text-bg-primary dark:bg-accent-pop dark:text-bg-dark"
            : "rounded-tl-md border border-border/60 bg-bg-secondary text-text-primary dark:border-border-dark/60 dark:bg-bg-secondary"
        )}
      >
        {isUser ? (
          <span>{content}</span>
        ) : (
          <div className="chat-markdown space-y-1">
            {renderMarkdown(content)}
            {/* Streaming cursor */}
            {isStreaming && content && (
              <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse bg-accent-pop" />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
