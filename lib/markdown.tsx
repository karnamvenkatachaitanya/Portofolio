import React from "react";

/**
 * Lightweight markdown-to-React parser for chat messages.
 * Handles: **bold**, `inline code`, [links](url), bullet lists, and line breaks.
 * No dangerouslySetInnerHTML — outputs safe React elements.
 */

interface ParsedNode {
  type: "text" | "bold" | "code" | "link" | "break";
  content: string;
  href?: string;
}

function parseInline(text: string): ParsedNode[] {
  const nodes: ParsedNode[] = [];
  // Combined regex for **bold**, `code`, and [link](url)
  const inlineRegex = /(\*\*(.+?)\*\*)|(`([^`]+)`)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = inlineRegex.exec(text)) !== null) {
    // Push preceding plain text
    if (match.index > lastIndex) {
      nodes.push({ type: "text", content: text.slice(lastIndex, match.index) });
    }

    if (match[1]) {
      // **bold**
      nodes.push({ type: "bold", content: match[2] });
    } else if (match[3]) {
      // `inline code`
      nodes.push({ type: "code", content: match[4] });
    } else if (match[5]) {
      // [link](url)
      nodes.push({ type: "link", content: match[6], href: match[7] });
    }

    lastIndex = match.index + match[0].length;
  }

  // Push remaining text
  if (lastIndex < text.length) {
    nodes.push({ type: "text", content: text.slice(lastIndex) });
  }

  return nodes;
}

function renderInlineNodes(nodes: ParsedNode[], keyPrefix: string): React.ReactNode[] {
  return nodes.map((node, i) => {
    const key = `${keyPrefix}-${i}`;
    switch (node.type) {
      case "bold":
        return (
          <strong key={key} className="font-bold text-text-primary border-b-2 border-accent-pop/50 pb-[1px] tracking-tight">
            {node.content}
          </strong>
        );
      case "code":
        return (
          <code
            key={key}
            className="rounded bg-accent-pop/15 px-1 py-0.5 font-mono text-[0.85em] text-accent-pop"
          >
            {node.content}
          </code>
        );
      case "link":
        return (
          <a
            key={key}
            href={node.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent-pop underline decoration-accent-pop/40 underline-offset-2 transition-colors hover:decoration-accent-pop"
          >
            {node.content}
          </a>
        );
      default:
        return <span key={key}>{node.content}</span>;
    }
  });
}

export function renderMarkdown(text: string): React.ReactNode {
  if (!text) return null;

  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];
  let listKey = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul
          key={`list-${listKey++}`}
          className="my-3 divide-y divide-border/20 border-t border-b border-border/20 bg-bg-secondary/20 px-3 py-1 rounded-xl dark:divide-border-dark/30 dark:border-border-dark/40 dark:bg-bg-secondary/5"
        >
          {listItems}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, lineIdx) => {
    const trimmed = line.trim();

    // Bullet list items: - item or * item or • item
    const listMatch = trimmed.match(/^[-*•]\s+(.+)$/);
    if (listMatch) {
      const parsed = parseInline(listMatch[1]);
      listItems.push(
        <li key={`li-${lineIdx}`} className="flex items-start gap-2.5 py-2.5 last:pb-1.5 first:pt-1.5">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-pop shadow-[0_0_8px_rgba(232,255,71,0.9)]" />
          <span className="text-[12.5px] leading-relaxed text-text-primary dark:text-zinc-100">{renderInlineNodes(parsed, `li-${lineIdx}`)}</span>
        </li>
      );
      return;
    }

    // Non-list line — flush any pending list
    flushList();

    // Empty line → spacing
    if (!trimmed) {
      elements.push(<div key={`br-${lineIdx}`} className="h-2" />);
      return;
    }

    // Regular paragraph
    const parsed = parseInline(trimmed);
    elements.push(
      <p key={`p-${lineIdx}`} className="leading-relaxed text-[13px] text-text-primary dark:text-zinc-100 my-1">
        {renderInlineNodes(parsed, `p-${lineIdx}`)}
      </p>
    );
  });

  // Flush any trailing list
  flushList();

  return <>{elements}</>;
}
