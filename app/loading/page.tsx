"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@/lib/FormContext";
import { LOADING_MESSAGES } from "@/types/form";

export default function LoadingPage() {
  const router = useRouter();
  const { state, dispatch } = useForm();
  const [messageIndex, setMessageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2000);

    if (hasFetched.current) {
      return () => clearInterval(messageInterval);
    }
    hasFetched.current = true;

    const generateBlueprint = async () => {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(state.data),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const parts = [
            errorData.error || "Failed to generate blueprint",
            errorData.hint,
            errorData.details,
          ].filter(Boolean);
          throw new Error(parts.join(" — "));
        }

        const result = await response.json();

        if (result.success && result.blueprint) {
          dispatch({
            type: "SET_BLUEPRINT",
            blueprint: result.blueprint,
          });
          router.push("/blueprint");
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (err) {
        console.error("Error generating blueprint:", err);
        setError(
          err instanceof Error ? err.message : "Failed to generate blueprint"
        );
        dispatch({ type: "SET_SUBMITTING", isSubmitting: false });
        hasFetched.current = false;
      }
    };

    generateBlueprint();

    return () => clearInterval(messageInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-[560px] w-full text-center">
          <div className="mb-8 animate-fade-in">
            <div className="text-6xl mb-6" aria-hidden>
              ⚠️
            </div>
            <h1 className="font-serif text-4xl text-[var(--text-primary)] mb-4">
              Something went wrong
            </h1>
            <p className="font-mono text-base text-[var(--text-secondary)] mb-8">
              {error}
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/form")}
            className="px-6 py-3 bg-[var(--accent)] text-[var(--background)] font-mono text-[15px] font-medium rounded-[var(--radius-button)] hover:bg-[var(--accent-hover)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
          >
            ← Back to form
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-8">
      <div className="max-w-[560px] w-full">
        <div className="text-center mb-16 animate-fade-in">
          <div className="mb-8">
            <div className="inline-block text-6xl animate-pulse" aria-hidden>
              🤖
            </div>
          </div>
          <h1 className="font-serif text-5xl text-[var(--text-primary)] mb-4 leading-tight">
            Bob is building
            <br />
            your blueprint
          </h1>
          <p className="font-mono text-base text-[var(--text-secondary)]">
            This usually takes 5–10 seconds
          </p>
        </div>

        <div
          className="mb-8 animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          <div className="h-1 bg-[var(--elevated)] rounded-full overflow-hidden">
            <div className="h-full animate-shimmer" />
          </div>
        </div>

        <div
          className="text-center animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <p
            key={messageIndex}
            className="font-mono text-[15px] text-[var(--text-secondary)] animate-fade-in"
          >
            {LOADING_MESSAGES[messageIndex]}
          </p>
        </div>

        <div
          className="mt-16 text-center animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <p className="font-mono text-sm text-[var(--text-tertiary)]">
            Analyzing your requirements and generating recommendations...
          </p>
        </div>
      </div>
    </main>
  );
}
