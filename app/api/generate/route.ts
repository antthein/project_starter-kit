import { NextRequest, NextResponse } from "next/server";
import { parseBlueprint } from "@/lib/buildPrompt";
import { FormData } from "@/types/form";
import { generateBlueprintText } from "@/lib/ai/generate";
import { getAIProvider } from "@/lib/ai/types";

/** Allow longer Claude responses on Vercel (Pro: up to 300s; Hobby: capped ~10s). */
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData: FormData = await request.json();

    if (!formData.appDescription?.trim() || !formData.appTypes?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { text, provider } = await generateBlueprintText(formData);
    const blueprint = parseBlueprint(text);

    return NextResponse.json({
      success: true,
      blueprint,
      provider,
    });
  } catch (error) {
    console.error(
      `Error in generate API route (${getAIProvider()}):`,
      error
    );
    const message =
      error instanceof Error ? error.message : "Unknown error";
    const hint = getErrorHint(message);

    return NextResponse.json(
      {
        error: "Failed to generate blueprint",
        provider: getAIProvider(),
        hint,
        details: process.env.NODE_ENV === "production" ? undefined : message,
      },
      { status: 502 }
    );
  }
}

function getErrorHint(message: string): string | undefined {
  if (message.includes("ANTHROPIC_API_KEY")) {
    return "On Vercel: Settings → Environment Variables → add ANTHROPIC_API_KEY and AI_PROVIDER=anthropic, then Redeploy.";
  }
  if (message.includes("WATSONX") || message.includes("watsonx")) {
    return "On Vercel: set AI_PROVIDER=anthropic (or full watsonx vars). Default without keys uses demo mode after redeploy.";
  }
  if (message.includes("Anthropic 401") || message.includes("authentication")) {
    return "Invalid Anthropic API key. Create a new key at console.anthropic.com and update Vercel env vars.";
  }
  if (message.includes("Anthropic 404") || message.includes("model")) {
    return "Wrong ANTHROPIC_MODEL. Try claude-haiku-4-5-20251001 or claude-3-5-haiku-20241022 in Vercel env.";
  }
  return undefined;
}
