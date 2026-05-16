import { FormData } from "@/types/form";

const SECTION_FORMAT_RULES = `
IMPORTANT: Use exactly these section headers (numbered, uppercase) in your response:

1. WHAT YOU'RE BUILDING
2. YOUR STACK
3. FOLDER STRUCTURE
4. KEY FILES
5. FIRST STEPS

Do not rename or renumber these headers. Put all content for each section directly under its header.
`;

export function buildPrompt(formData: FormData): string {
  return `You are Bob — a friendly expert who helps people turn project ideas into a clear starting point.

Your reader may be technical or non-technical. Write so both can understand.
Tone: warm, confident, direct. Like a smart friend who happens to be a senior engineer.
Length: keep every section concise. Clarity beats completeness.

--- IMPORTANT CONTEXT ---
You are recommending a starting stack, not writing production code.
Your job is to point people in the right direction — the right tool with the right reasoning.
If your knowledge of a specific version is slightly behind, that's fine. The recommendation
still stands. Focus on WHY a tool fits this project, not on pinning exact versions.
For any tool you recommend, note it as "latest stable" unless you are confident of the version.

--- BLUEPRINT FORMAT ---
Generate a blueprint in exactly 5 sections:

## 1. WHAT YOU'RE BUILDING
2,3 plain-English sentences. What it does, who it's for, how it works at a high level. No jargon.

## 2. YOUR STACK
Only include layers this project actually needs (frontend / backend / database / auth / hosting).
For each layer, one line:
  • Layer — Tool — one sentence on why it fits this project.
Skip layers that aren't needed. One choice only — no alternatives.

## 3. FOLDER STRUCTURE
Clean folder tree in a code block. Only include folders and files that matter. No noise.

## 4. KEY FILES
Show content for 2 files only: package.json (or equivalent) and .env.example.
In package.json, use "latest" for all dependency versions rather than guessing specific numbers.
Keep them minimal — just enough to start. No full implementation code.

## 5. FIRST STEPS
Exactly 6 numbered steps to go from zero to running locally.
Plain English for each step. Terminal command on the line after if needed.
Last step should be: open the app and confirm it works.

---

Rules:
• Be decisive. Pick one option per layer. Don't say "it depends."
• If the project is simple, the blueprint should be simple.
• Match recommendations to the team size and timeline provided.
• Never pad. If a section needs 2 sentences, write 2 sentences.
• Version honesty: if unsure of the exact version, say "latest stable" — never guess a number.
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
    /1\.\s*WHAT YOU'RE BUILDING[^\n]*\n+([\s\S]*?)(?=\n\s*2\.|$)/i,
    /##\s*1?\.?\s*WHAT YOU'RE BUILDING[^\n]*\n+([\s\S]*?)(?=\n##\s*|$)/i,
    /#\s*WHAT YOU'RE BUILDING[^\n]*\n+([\s\S]*?)(?=\n#\s*|$)/i,
    // Fallback to old names for backward compatibility
    /1\.\s*PROJECT SUMMARY[^\n]*\n+([\s\S]*?)(?=\n\s*2\.|$)/i,
    /##\s*1?\.?\s*PROJECT SUMMARY[^\n]*\n+([\s\S]*?)(?=\n##\s*|$)/i,
  ]);

  sections.techStack = extractSection(rawResponse, [
    /2\.\s*YOUR STACK[^\n]*\n+([\s\S]*?)(?=\n\s*3\.|$)/i,
    /##\s*2?\.?\s*YOUR STACK[^\n]*\n+([\s\S]*?)(?=\n##\s*|$)/i,
    /#\s*YOUR STACK[^\n]*\n+([\s\S]*?)(?=\n#\s*|$)/i,
    // Fallback to old names
    /2\.\s*TECH STACK[^\n]*\n+([\s\S]*?)(?=\n\s*3\.|$)/i,
    /##\s*2?\.?\s*TECH STACK[^\n]*\n+([\s\S]*?)(?=\n##\s*|$)/i,
  ]);

  sections.folderStructure = extractSection(rawResponse, [
    /3\.\s*FOLDER STRUCTURE[^\n]*\n+([\s\S]*?)(?=\n\s*4\.|$)/i,
    /##\s*3?\.?\s*FOLDER STRUCTURE[^\n]*\n+([\s\S]*?)(?=\n##\s*|$)/i,
    /#\s*FOLDER STRUCTURE[^\n]*\n+([\s\S]*?)(?=\n#\s*|$)/i,
  ]);

  sections.starterFiles = extractSection(rawResponse, [
    /4\.\s*KEY FILES[^\n]*\n+([\s\S]*?)(?=\n\s*5\.|$)/i,
    /##\s*4?\.?\s*KEY FILES[^\n]*\n+([\s\S]*?)(?=\n##\s*|$)/i,
    /#\s*KEY FILES[^\n]*\n+([\s\S]*?)(?=\n#\s*|$)/i,
    // Fallback to old names
    /4\.\s*STARTER FILES[^\n]*\n+([\s\S]*?)(?=\n\s*5\.|$)/i,
    /##\s*4?\.?\s*STARTER FILES[^\n]*\n+([\s\S]*?)(?=\n##\s*|$)/i,
  ]);

  sections.setupChecklist = extractSection(rawResponse, [
    /5\.\s*FIRST STEPS[^\n]*\n+([\s\S]*?)$/i,
    /##\s*5?\.?\s*FIRST STEPS[^\n]*\n+([\s\S]*?)$/i,
    /#\s*FIRST STEPS[^\n]*\n+([\s\S]*?)$/i,
    // Fallback to old names
    /5\.\s*SETUP CHECKLIST[^\n]*\n+([\s\S]*?)$/i,
    /##\s*5?\.?\s*SETUP CHECKLIST[^\n]*\n+([\s\S]*?)$/i,
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
