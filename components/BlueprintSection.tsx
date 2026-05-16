"use client";

import React, { ReactNode, useState } from "react";

interface BlueprintSectionProps {
  title: string;
  children: ReactNode;
  delay?: number;
  content?: string; // Raw content for copying
}

export default function BlueprintSection({
  title,
  children,
  delay = 0,
  content,
}: BlueprintSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!content) return;
    
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className="animate-fade-in bg-surface border border-border rounded-[12px] p-6 md:p-8 hover:border-border-hover transition-colors duration-150"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-6">
        <h2 className="font-serif text-3xl text-text-primary">
          {title}
        </h2>
        {content && (
          <button
            onClick={handleCopy}
            className="flex-shrink-0 p-2 text-text-secondary hover:text-text-primary hover:bg-elevated rounded-[6px] transition-all duration-150"
            title="Copy section"
          >
            {copied ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M3 13V5C3 3.89543 3.89543 3 5 3H13" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            )}
          </button>
        )}
      </div>
      <div className="text-text-primary">{children}</div>
    </div>
  );
}

// Made with Bob
