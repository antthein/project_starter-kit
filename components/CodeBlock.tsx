"use client";

import React, { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({
  code,
  language = "text",
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative group">
      {filename && (
        <div className="bg-[var(--elevated)] border border-[var(--border)] border-b-0 rounded-t-lg px-4 py-2.5 text-xs font-mono font-medium text-[var(--text-secondary)] uppercase tracking-wider">
          {filename}
        </div>
      )}
      <div
        className={`relative bg-[var(--code-bg)] border border-[var(--border)] ${
          filename ? "rounded-b-lg" : "rounded-lg"
        } border-l-2 border-l-[var(--text-primary)] overflow-hidden`}
      >
        <pre className="p-4 overflow-x-auto">
          <code className="text-[14px] font-mono text-[var(--text-primary)] leading-relaxed">
            {code}
          </code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-md text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 opacity-0 group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

// Made with Bob
