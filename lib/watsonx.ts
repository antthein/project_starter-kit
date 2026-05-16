/**
 * IBM watsonx.ai inference (text generation + chat fallback).
 * @see https://cloud.ibm.com/apidocs/watsonx-ai#text-generation
 */

const IAM_TOKEN_URL = "https://iam.cloud.ibm.com/identity/token";
const DEFAULT_ML_URL = "https://us-south.ml.cloud.ibm.com";
const DEFAULT_MODEL = "ibm/granite-3-8b-instruct";
const DEFAULT_API_VERSION = "2024-05-31";

export function getWatsonxConfig() {
  const apiKey =
    process.env.WATSONX_API_KEY?.trim() ||
    process.env.BOB_API_KEY?.trim() ||
    "";

  const projectId =
    process.env.WATSONX_PROJECT_ID?.trim() ||
    process.env.BOB_PROJECT_ID?.trim() ||
    "";

  const spaceId =
    process.env.WATSONX_SPACE_ID?.trim() ||
    process.env.BOB_SPACE_ID?.trim() ||
    "";

  return {
    apiKey,
    projectId,
    spaceId,
    baseUrl: (
      process.env.WATSONX_URL ||
      process.env.BOB_API_URL ||
      DEFAULT_ML_URL
    ).replace(/\/$/, ""),
    modelId: process.env.WATSONX_MODEL_ID?.trim() || DEFAULT_MODEL,
    apiVersion:
      process.env.WATSONX_API_VERSION?.trim() || DEFAULT_API_VERSION,
  };
}

export async function getIamAccessToken(apiKey: string): Promise<string> {
  const body = new URLSearchParams({
    grant_type: "urn:ibm:params:oauth:grant-type:apikey",
    apikey: apiKey,
  });

  const response = await fetch(IAM_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`IAM auth failed (${response.status}): ${text}`);
  }

  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error("IAM response missing access_token");
  }

  return data.access_token;
}

function scopePayload(config: ReturnType<typeof getWatsonxConfig>) {
  if (config.spaceId) {
    return { space_id: config.spaceId };
  }
  if (config.projectId) {
    return { project_id: config.projectId };
  }
  return {};
}

function parseContainerNotFound(message: string): string {
  if (!message.includes("container_not_found")) {
    return message;
  }

  return [
    message,
    "",
    "This usually means your watsonx project is not set up for foundation models.",
    "Fix: In dataplatform.cloud.ibm.com create a project for models (not data-quality only),",
    "open Prompt Lab and run one test prompt, then copy Project ID from Developer access.",
    "Or set WATSONX_SPACE_ID from a deployment space instead of WATSONX_PROJECT_ID.",
    "Ensure WATSONX_URL matches your region (e.g. https://jp-tok.ml.cloud.ibm.com).",
  ].join("\n");
}

async function requestWatsonx(
  token: string,
  config: ReturnType<typeof getWatsonxConfig>,
  path: string,
  body: Record<string, unknown>
): Promise<Response> {
  const url = `${config.baseUrl}${path}?version=${config.apiVersion}`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
}

function extractChatText(data: Record<string, unknown>): string {
  const choices = data.choices;
  if (Array.isArray(choices) && choices[0]) {
    const first = choices[0] as Record<string, unknown>;
    const message = first.message as Record<string, unknown> | undefined;
    const content = message?.content;
    if (typeof content === "string") return content.trim();
    if (Array.isArray(content)) {
      const textPart = content.find(
        (p) =>
          typeof p === "object" &&
          p !== null &&
          (p as { type?: string }).type === "text"
      ) as { text?: string } | undefined;
      if (textPart?.text) return textPart.text.trim();
    }
  }

  const results = data.results;
  if (Array.isArray(results) && results[0]) {
    const generated = (results[0] as { generated_text?: string })
      .generated_text;
    if (typeof generated === "string") return generated.trim();
  }

  return "";
}

async function generateWithChat(
  token: string,
  config: ReturnType<typeof getWatsonxConfig>,
  prompt: string
): Promise<string> {
  const response = await requestWatsonx(token, config, "/ml/v1/text/chat", {
    model_id: config.modelId,
    ...scopePayload(config),
    messages: [
      {
        role: "system",
        content:
          "You are an expert software architect. Follow the user instructions exactly.",
      },
      {
        role: "user",
        content: [{ type: "text", text: prompt }],
      },
    ],
    parameters: {
      max_new_tokens: 4000,
      temperature: 0.7,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`watsonx.ai chat ${response.status}: ${text}`);
  }

  const data = (await response.json()) as Record<string, unknown>;
  const generated = extractChatText(data);
  if (!generated) {
    throw new Error("watsonx.ai chat returned empty content");
  }
  return generated;
}

async function generateWithTextGeneration(
  token: string,
  config: ReturnType<typeof getWatsonxConfig>,
  prompt: string
): Promise<string> {
  const response = await requestWatsonx(
    token,
    config,
    "/ml/v1/text/generation",
    {
      input: prompt,
      model_id: config.modelId,
      ...scopePayload(config),
      parameters: {
        decoding_method: "sample",
        max_new_tokens: 4000,
        temperature: 0.7,
        top_p: 1,
        repetition_penalty: 1.1,
      },
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`watsonx.ai generation ${response.status}: ${text}`);
  }

  const data = (await response.json()) as {
    results?: Array<{ generated_text?: string }>;
  };

  const generated = data.results?.[0]?.generated_text?.trim();
  if (!generated) {
    throw new Error("watsonx.ai generation returned empty generated_text");
  }
  return generated;
}

export async function generateWithWatsonx(
  prompt: string,
  config: ReturnType<typeof getWatsonxConfig>
): Promise<string> {
  if (!config.projectId && !config.spaceId) {
    throw new Error(
      "Set WATSONX_PROJECT_ID or WATSONX_SPACE_ID in .env.local"
    );
  }

  const token = await getIamAccessToken(config.apiKey);

  try {
    return await generateWithChat(token, config, prompt);
  } catch (chatError) {
    const chatMessage =
      chatError instanceof Error ? chatError.message : String(chatError);

    const isContainerMissing = chatMessage.includes("container_not_found");

    if (!isContainerMissing) {
      try {
        return await generateWithTextGeneration(token, config, prompt);
      } catch (genError) {
        const genMessage =
          genError instanceof Error ? genError.message : String(genError);
        throw new Error(parseContainerNotFound(genMessage));
      }
    }

    throw new Error(parseContainerNotFound(chatMessage));
  }
}
