export type AIProviderName = "watsonx" | "openai" | "anthropic" | "demo";

export function getAIProvider(): AIProviderName {
  const raw = process.env.AI_PROVIDER?.toLowerCase().trim();

  if (
    raw === "openai" ||
    raw === "anthropic" ||
    raw === "demo" ||
    raw === "watsonx"
  ) {
    return raw;
  }

  // Auto-detect when AI_PROVIDER is not set (common on Vercel)
  if (process.env.ANTHROPIC_API_KEY?.trim()) return "anthropic";
  if (process.env.OPENAI_API_KEY?.trim()) return "openai";
  if (
    (process.env.WATSONX_API_KEY?.trim() || process.env.BOB_API_KEY?.trim()) &&
    (process.env.WATSONX_PROJECT_ID?.trim() || process.env.WATSONX_SPACE_ID?.trim())
  ) {
    return "watsonx";
  }

  return "demo";
}
