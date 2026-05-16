import { FormData } from "@/types/form";
import { buildPrompt } from "@/lib/buildPrompt";
import { generateWithWatsonx, getWatsonxConfig } from "@/lib/watsonx";
import { getAIProvider } from "@/lib/ai/types";
import { generateWithOpenAI } from "@/lib/ai/providers/openai";
import { generateWithAnthropic } from "@/lib/ai/providers/anthropic";
import { generateDemoBlueprint } from "@/lib/ai/providers/demo";

export function validateProviderConfig(provider: ReturnType<typeof getAIProvider>) {
  switch (provider) {
    case "watsonx": {
      const config = getWatsonxConfig();
      if (!config.apiKey) {
        return "Set WATSONX_API_KEY (IBM Cloud API key) in .env.local";
      }
      if (!config.projectId && !config.spaceId) {
        return "Set WATSONX_PROJECT_ID or WATSONX_SPACE_ID in .env.local";
      }
      return null;
    }
    case "openai":
      if (!process.env.OPENAI_API_KEY?.trim()) {
        return "Set OPENAI_API_KEY in .env.local";
      }
      return null;
    case "anthropic":
      if (!process.env.ANTHROPIC_API_KEY?.trim()) {
        return "Set ANTHROPIC_API_KEY in .env.local";
      }
      return null;
    case "demo":
      return null;
    default:
      return "Invalid AI_PROVIDER";
  }
}

export async function generateBlueprintText(
  formData: FormData
): Promise<{ text: string; provider: string }> {
  const provider = getAIProvider();
  const configError = validateProviderConfig(provider);
  if (configError) {
    throw new Error(configError);
  }

  if (provider === "demo") {
    return {
      text: generateDemoBlueprint(formData),
      provider: "demo",
    };
  }

  const prompt = buildPrompt(formData);

  switch (provider) {
    case "openai":
      return { text: await generateWithOpenAI(prompt), provider: "openai" };
    case "anthropic":
      return { text: await generateWithAnthropic(prompt), provider: "anthropic" };
    case "watsonx":
    default: {
      const config = getWatsonxConfig();
      return {
        text: await generateWithWatsonx(prompt, config),
        provider: "watsonx",
      };
    }
  }
}
