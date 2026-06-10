import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
        role === "user"
          ? "ml-auto bg-accent text-bg-primary dark:bg-accent-pop dark:text-accent"
          : "mr-auto bg-bg-secondary text-text-primary dark:bg-bg-dark"
      )}
    >
      {content}
    </div>
  );
}
