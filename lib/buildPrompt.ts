import { FormData } from "@/types/form";

const SECTION_FORMAT_RULES = `
IMPORTANT: Use exactly these section headers (numbered, uppercase) in your response:

1. PROJECT SUMMARY
2. TECH STACK
3. FOLDER STRUCTURE
4. STARTER FILES
5. SETUP CHECKLIST

Do not rename or renumber these headers. Put all content for each section directly under its header.
`;

export function buildPrompt(formData: FormData): string {
  return `You are an expert software architect. A developer has described their project below.

Your job is to generate a complete Project Blueprint with 5 sections:

1. PROJECT SUMMARY — Restate the project in 2-3 clear sentences.

2. TECH STACK — Recommend the best stack for this project. For each layer
   (frontend, backend, database, auth, hosting, etc.), state:
   - The chosen technology
   - Why you chose it (1-2 sentences)
   - One alternative and why you didn't choose it

3. FOLDER STRUCTURE — Show a complete, clean folder tree as a code block.

4. STARTER FILES — Provide content for 3-5 key boilerplate files
   (package.json or equivalent, README.md, .env.example, entry point, config).
   Show each as a labeled code block.

5. SETUP CHECKLIST — Step-by-step numbered instructions to get the project
   running locally from scratch.

Be opinionated. Don't hedge. Pick the best option and explain why.
Avoid overengineering for the given team size and timeline.
${SECTION_FORMAT_RULES}

--- PROJECT INPUTS ---
What it does     : ${formData.appDescription}
App type         : ${formData.appTypes.join(", ")}
Expected users   : ${formData.users || "Not specified"}
Team size        : ${formData.teamSize || "Not specified"}
Budget           : ${formData.budget || "Not specified"}
Timeline         : ${formData.timeline || "Not specified"}
Preferences      : ${formData.preferences || "None"}`;
}

export interface ParsedBlueprint {
  summary: string;
  techStack: string;
  folderStructure: string;
  starterFiles: string;
  setupChecklist: string;
  rawResponse: string;
  parseFailed: boolean;
}

function extractSection(
  raw: string,
  patterns: RegExp[]
): string {
  for (const pattern of patterns) {
    const match = raw.match(pattern);
    if (match?.[1]?.trim()) {
      return match[1].trim();
    }
  }
  return "";
}

export function parseBlueprint(rawResponse: string): ParsedBlueprint {
  const sections = {
    summary: "",
    techStack: "",
    folderStructure: "",
    starterFiles: "",
    setupChecklist: "",
    rawResponse,
    parseFailed: false,
  };

  sections.summary = extractSection(rawResponse, [
    /1\.\s*PROJECT SUMMARY[^\n]*\n+([\s\S]*?)(?=\n\s*2\.|$)/i,
    /##\s*1?\.?\s*PROJECT SUMMARY[^\n]*\n+([\s\S]*?)(?=\n##\s*|$)/i,
    /#\s*PROJECT SUMMARY[^\n]*\n+([\s\S]*?)(?=\n#\s*|$)/i,
  ]);

  sections.techStack = extractSection(rawResponse, [
    /2\.\s*TECH STACK[^\n]*\n+([\s\S]*?)(?=\n\s*3\.|$)/i,
    /##\s*2?\.?\s*TECH STACK[^\n]*\n+([\s\S]*?)(?=\n##\s*|$)/i,
    /#\s*TECH STACK[^\n]*\n+([\s\S]*?)(?=\n#\s*|$)/i,
  ]);

  sections.folderStructure = extractSection(rawResponse, [
    /3\.\s*FOLDER STRUCTURE[^\n]*\n+([\s\S]*?)(?=\n\s*4\.|$)/i,
    /##\s*3?\.?\s*FOLDER STRUCTURE[^\n]*\n+([\s\S]*?)(?=\n##\s*|$)/i,
    /#\s*FOLDER STRUCTURE[^\n]*\n+([\s\S]*?)(?=\n#\s*|$)/i,
  ]);

  sections.starterFiles = extractSection(rawResponse, [
    /4\.\s*STARTER FILES[^\n]*\n+([\s\S]*?)(?=\n\s*5\.|$)/i,
    /##\s*4?\.?\s*STARTER FILES[^\n]*\n+([\s\S]*?)(?=\n##\s*|$)/i,
    /#\s*STARTER FILES[^\n]*\n+([\s\S]*?)(?=\n#\s*|$)/i,
  ]);

  sections.setupChecklist = extractSection(rawResponse, [
    /5\.\s*SETUP CHECKLIST[^\n]*\n+([\s\S]*?)$/i,
    /##\s*5?\.?\s*SETUP CHECKLIST[^\n]*\n+([\s\S]*?)$/i,
    /#\s*SETUP CHECKLIST[^\n]*\n+([\s\S]*?)$/i,
  ]);

  const hasParsedSections =
    sections.summary ||
    sections.techStack ||
    sections.folderStructure ||
    sections.starterFiles ||
    sections.setupChecklist;

  if (!hasParsedSections && rawResponse.trim()) {
    sections.summary = rawResponse.trim();
    sections.parseFailed = true;
  }

  return sections;
}

export function extractGeneratedText(data: Record<string, unknown>): string {
  if (typeof data.generated_text === "string") return data.generated_text;
  if (typeof data.text === "string") return data.text;
  if (typeof data.response === "string") return data.response;
  if (typeof data.content === "string") return data.content;
  if (typeof data.output === "string") return data.output;

  const choices = data.choices;
  if (Array.isArray(choices) && choices[0]) {
    const first = choices[0] as Record<string, unknown>;
    const message = first.message as Record<string, unknown> | undefined;
    if (typeof message?.content === "string") return message.content;
    if (typeof first.text === "string") return first.text;
  }

  const result = data.result;
  if (typeof result === "string") return result;

  return "";
}
