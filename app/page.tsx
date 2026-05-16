"use client";

import Link from "next/link";
import { VERSION } from "@/lib/version";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Wordmark - Top Left */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12">
        <span className="font-mono text-xs text-text-tertiary tracking-[0.2em] uppercase">
          Bob
        </span>
      </div>

      {/* Signature - Top Right */}
      <div className="absolute top-8 right-8 md:top-12 md:right-12">
        <span className="font-mono text-xs text-text-tertiary tracking-[0.2em] lowercase">
          ah
        </span>
      </div>

      {/* Center Content */}
      <div className="flex-1 flex items-center justify-center px-8 md:px-16">
        <div className="max-w-[640px] w-full text-center">
          {/* Hero Headline */}
          <h1
            className="font-serif text-[56px] md:text-[64px] leading-[1.15] text-text-primary mb-16 tracking-tight animate-fade-in"
            style={{ animationDelay: "0ms" }}
          >
            Describe your idea.
            <br />
            Bob builds the
            <br />
            blueprint.
          </h1>

          {/* Body Text */}
          <div
            className="space-y-6 mb-16 animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            <p className="font-mono text-base text-text-secondary leading-relaxed max-w-[520px] mx-auto">
              Every developer knows the blank-screen moment. You have an idea but
              don't know where to start. What stack? What folder structure?
            </p>

            <p className="font-mono text-base text-text-primary leading-relaxed font-medium">
              Fill in a simple form. Bob generates a complete
              <br className="hidden md:block" />
              project blueprint in seconds.
            </p>
          </div>

          {/* CTA Button */}
          <div
            className="animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <Link
              href="/form"
              className="inline-flex items-center justify-center gap-2 min-w-[220px] px-10 py-4 bg-accent text-background font-mono text-base font-medium rounded-[var(--radius-button)] hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 shadow-sm"
            >
              Start my project →
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="pb-12 flex items-center justify-center gap-3 font-mono text-xs text-text-tertiary tracking-[0.1em] uppercase animate-fade-in"
        style={{ animationDelay: "300ms" }}
      >
        <span>IBM Bob Hackathon</span>
        <span className="text-border">·</span>
        <span>May 2026</span>
        <span className="text-border">·</span>
        <span className="text-text-secondary">{VERSION}</span>
      </div>
    </main>
  );
}

// Made with Bob
