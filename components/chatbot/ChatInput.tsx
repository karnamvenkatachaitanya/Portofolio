"use client";

import { Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled,
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const canSend = !disabled && value.trim().length > 0;

  return (
    <div className="border-t border-border/60 bg-bg-primary/50 px-3 py-2.5 backdrop-blur-sm dark:border-border-dark/60">
      <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-bg-primary px-3 py-1.5 transition-all duration-200 focus-within:border-accent-pop/50 focus-within:ring-1 focus-within:ring-accent-pop/20 dark:border-border-dark/70 dark:bg-bg-dark">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about Chaitanya..."
          disabled={disabled}
          aria-label="Chat message input"
          className="flex-1 bg-transparent text-[13px] text-text-primary placeholder:text-text-muted/60 focus:outline-none disabled:opacity-50"
        />
        <button
          onClick={onSubmit}
          disabled={!canSend}
          aria-label="Send message"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent text-bg-primary transition-all duration-200 hover:bg-accent/80 disabled:opacity-30 disabled:hover:bg-accent dark:bg-accent-pop dark:text-bg-dark dark:hover:bg-accent-pop/80"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="mt-1.5 text-center text-[9px] text-text-muted/50">
        AI assistant · Answers only about Chaitanya&apos;s portfolio
      </p>
    </div>
  );
}
