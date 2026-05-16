import { NextRequest, NextResponse } from "next/server";
import { parseBlueprint } from "@/lib/buildPrompt";
import { FormData } from "@/types/form";
import { generateBlueprintText } from "@/lib/ai/generate";
import { getAIProvider } from "@/lib/ai/types";

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
    const isProd = process.env.NODE_ENV === "production";

    return NextResponse.json(
      {
        error: "Failed to generate blueprint",
        provider: getAIProvider(),
        ...(isProd ? {} : { details: message }),
      },
      { status: 502 }
    );
  }
}
