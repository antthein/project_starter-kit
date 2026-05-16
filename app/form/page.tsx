"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@/lib/FormContext";
import Chip from "@/components/Chip";
import { AppType, UserType, TeamSize, Budget, Timeline } from "@/types/form";

export default function FormPage() {
  const router = useRouter();
  const {
    state,
    updateField,
    toggleAppType,
    toggleOptionalField,
    validateForm,
    dispatch,
  } = useForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch({ type: "SET_SUBMITTING", isSubmitting: true });
    router.push("/loading");
  };

  const appTypeOptions: AppType[] = [
    "Web app",
    "Mobile app",
    "API-Backend",
    "Desktop app",
    "CLI tool",
    "Bot-Automation",
  ];

  const userOptions: UserType[] = [
    "Just me",
    "Small team (2–10)",
    "Company internal",
    "Public small",
    "Public large",
  ];

  const teamSizeOptions: TeamSize[] = ["Solo", "2–5", "5+"];

  const budgetOptions: Budget[] = [
    "Free only",
    "Low (<$50/mo)",
    "Flexible",
    "High (>$500/mo)",
  ];

  const timelineOptions: Timeline[] = [
    "Weekend hack",
    "A few weeks",
    "Several months",
    "Long-term",
  ];

  return (
    <main className="min-h-screen py-16 md:py-24 px-8 md:px-16 bg-background">
      <div className="max-w-[680px] mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="mb-8 inline-flex items-center gap-2 text-text-primary font-mono text-sm hover:text-text-secondary transition-colors duration-150 animate-fade-in"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-150 group-hover:-translate-x-1"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>

        {/* Header */}
        <div className="mb-16 animate-fade-in" style={{ animationDelay: "50ms" }}>
          <h1 className="font-serif text-5xl md:text-[56px] leading-tight text-text-primary mb-4">
            Tell Bob about
            <br />
            your project
          </h1>
          <p className="font-mono text-base text-text-secondary">
            Answer a few questions. Bob will generate your complete blueprint.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Question 1: What does your app do? (Required) */}
          <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <label className="block mb-4">
              <span className="font-mono text-sm text-[var(--text-primary)] font-medium">
                1. What does your app do?{" "}
                <span className="text-[var(--text-secondary)]">*</span>
              </span>
            </label>
            <textarea
              value={state.data.appDescription}
              onChange={(e) => updateField("appDescription", e.target.value)}
              placeholder="Describe your project idea in a few sentences..."
              rows={4}
              className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-input)] text-[var(--text-primary)] font-mono text-[15px] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--text-primary)] focus:ring-1 focus:ring-[var(--text-primary)] transition-all resize-none"
            />
            {state.errors.appDescription && (
              <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                {state.errors.appDescription}
              </p>
            )}
          </div>

          {/* Question 2: What type of app is it? (Required, Multi-select) */}
          <div className="animate-fade-in" style={{ animationDelay: "150ms" }}>
            <label className="block mb-4">
              <span className="font-mono text-sm text-[var(--text-primary)] font-medium">
                2. What type of app is it?{" "}
                <span className="text-[var(--text-secondary)]">*</span>
              </span>
              <span className="block mt-1 text-sm text-[var(--text-tertiary)]">
                Select all that apply
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {appTypeOptions.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  selected={state.data.appTypes.includes(type)}
                  onClick={() => toggleAppType(type)}
                />
              ))}
            </div>
            {state.errors.appTypes && (
              <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                {state.errors.appTypes}
              </p>
            )}
          </div>

          {/* Question 3: Who are the expected users? (Optional, Single-select) */}
          <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <label className="block mb-4">
              <span className="font-mono text-sm text-[var(--text-primary)] font-medium">
                3. Who are the expected users?
              </span>
              <span className="block mt-1 text-sm text-[var(--text-tertiary)]">
                Optional
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {userOptions.map((user) => (
                <Chip
                  key={user}
                  label={user}
                  selected={state.data.users === user}
                  onClick={() => toggleOptionalField("users", user)}
                />
              ))}
            </div>
          </div>

          {/* Question 4: Team size (Optional, Single-select) */}
          <div className="animate-fade-in" style={{ animationDelay: "250ms" }}>
            <label className="block mb-4">
              <span className="font-mono text-sm text-[var(--text-primary)] font-medium">
                4. Team size
              </span>
              <span className="block mt-1 text-sm text-[var(--text-tertiary)]">
                Optional
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {teamSizeOptions.map((size) => (
                <Chip
                  key={size}
                  label={size}
                  selected={state.data.teamSize === size}
                  onClick={() => toggleOptionalField("teamSize", size)}
                />
              ))}
            </div>
          </div>

          {/* Question 5: Budget (Optional, Single-select) */}
          <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
            <label className="block mb-4">
              <span className="font-mono text-sm text-[var(--text-primary)] font-medium">
                5. Budget
              </span>
              <span className="block mt-1 text-sm text-[var(--text-tertiary)]">
                Optional
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {budgetOptions.map((budget) => (
                <Chip
                  key={budget}
                  label={budget}
                  selected={state.data.budget === budget}
                  onClick={() => toggleOptionalField("budget", budget)}
                />
              ))}
            </div>
          </div>

          {/* Question 6: Timeline (Optional, Single-select) */}
          <div className="animate-fade-in" style={{ animationDelay: "350ms" }}>
            <label className="block mb-4">
              <span className="font-mono text-sm text-[var(--text-primary)] font-medium">
                6. Timeline
              </span>
              <span className="block mt-1 text-sm text-[var(--text-tertiary)]">
                Optional
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {timelineOptions.map((timeline) => (
                <Chip
                  key={timeline}
                  label={timeline}
                  selected={state.data.timeline === timeline}
                  onClick={() => toggleOptionalField("timeline", timeline)}
                />
              ))}
            </div>
          </div>

          {/* Question 7: Any preferences or constraints? (Optional) */}
          <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
            <label className="block mb-4">
              <span className="font-mono text-sm text-[var(--text-primary)] font-medium">
                7. Any preferences or constraints?
              </span>
              <span className="block mt-1 text-sm text-[var(--text-tertiary)]">
                Optional — e.g., "Must use Python" or "No cloud services"
              </span>
            </label>
            <input
              type="text"
              value={state.data.preferences || ""}
              onChange={(e) => updateField("preferences", e.target.value)}
              placeholder="Any specific requirements..."
              className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-input)] text-[var(--text-primary)] font-mono text-[15px] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--text-primary)] focus:ring-1 focus:ring-[var(--text-primary)] transition-all"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-8 animate-fade-in" style={{ animationDelay: "450ms" }}>
            <button
              type="submit"
              disabled={state.isSubmitting}
              className="w-full px-8 py-4 bg-[var(--accent)] text-[var(--background)] font-mono text-[15px] font-medium rounded-[var(--radius-button)] hover:bg-[var(--accent-hover)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-sm"
            >
              {state.isSubmitting
                ? "Generating..."
                : "Generate my blueprint ✦"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

// Made with Bob
