export type AIProviderName = "watsonx" | "openai" | "anthropic" | "demo";

export function getAIProvider(): AIProviderName {
  const raw = (process.env.AI_PROVIDER || "watsonx").toLowerCase().trim();
  if (
    raw === "openai" ||
    raw === "anthropic" ||
    raw === "demo" ||
    raw === "watsonx"
  ) {
    return raw;
  }
  return "watsonx";
}
