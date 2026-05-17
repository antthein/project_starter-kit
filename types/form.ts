// Form data types based on the 7-question form

export type AppType =
  | "Web app"
  | "Mobile app"
  | "API-Backend"
  | "Desktop app"
  | "CLI tool"
  | "Bot-Automation";

export type UserType =
  | "Just me"
  | "Small team (2–10)"
  | "Company internal"
  | "Public small"
  | "Public large";

export type TeamSize = "Solo" | "2–5" | "5+";

export type Budget =
  | "Free only"
  | "Low (<$50/mo)"
  | "Flexible"
  | "High (>$500/mo)";

export type Timeline =
  | "Weekend hack"
  | "A few weeks"
  | "Several months"
  | "Long-term";

export interface FormData {
  // Question 1: What does your app do? (required)
  appDescription: string;

  // Question 2: What type of app is it? (required, multi-select)
  appTypes: AppType[];

  // Question 3: Who are the expected users? (optional, single-select)
  users?: UserType;

  // Question 4: Team size (optional, single-select)
  teamSize?: TeamSize;

  // Question 5: Budget (optional, single-select)
  budget?: Budget;

  // Question 6: Timeline (optional, single-select)
  timeline?: Timeline;

  // Question 7: Any preferences or constraints? (optional)
  preferences?: string;
}

// Blueprint response structure returned by the configured AI engine
export interface BlueprintResponse {
  summary: string;
  techStack: string;
  folderStructure: string;
  starterFiles: string;
  setupChecklist: string;
  rawResponse: string;
  parseFailed?: boolean;
}

// Loading messages that rotate during API call
export const LOADING_MESSAGES = [
  "Bob is reading your idea...",
  "Analyzing the best stack for your use case...",
  "Comparing tradeoffs...",
  "Generating your folder structure...",
  "Writing your setup guide...",
] as const;

// Form validation
export interface FormErrors {
  appDescription?: string;
  appTypes?: string;
}

// Form state for context
export interface FormState {
  data: FormData;
  errors: FormErrors;
  isSubmitting: boolean;
  blueprint?: BlueprintResponse;
}

// Form actions
export type FormAction =
  | { type: "UPDATE_FIELD"; field: keyof FormData; value: FormData[keyof FormData] }
  | { type: "ADD_APP_TYPE"; appType: AppType }
  | { type: "REMOVE_APP_TYPE"; appType: AppType }
  | { type: "SET_ERRORS"; errors: FormErrors }
  | { type: "SET_SUBMITTING"; isSubmitting: boolean }
  | { type: "SET_BLUEPRINT"; blueprint: BlueprintResponse }
  | { type: "HYDRATE_BLUEPRINT"; blueprint: BlueprintResponse }
  | { type: "RESET_FORM" };

// Utility type for chip components
export interface ChipOption<T = string> {
  value: T;
  label: string;
  selected: boolean;
}

// Made with Bob
