import { FormData } from "@/types/form";

/** Sample blueprint when no cloud API is available (hackathon demo / local dev). */
export function generateDemoBlueprint(formData: FormData): string {
  const types = formData.appTypes.join(", ");
  const desc = formData.appDescription.trim();

  return `1. PROJECT SUMMARY

${desc}

This blueprint was generated in demo mode for a ${types} project. Configure AI_PROVIDER=openai or watsonx in .env.local for live AI output.

2. TECH STACK

Frontend: Next.js 16 with React and TypeScript — fast iteration, great DX, easy deploy on Vercel.
Alternative: Remix — stronger data APIs; skipped for simpler hackathon scope.

Backend: Next.js Route Handlers — same repo, no extra server.
Alternative: Express — more setup for a POC.

Database: None for MVP (sessionStorage + optional Postgres later).
Alternative: Supabase — add when you need auth and persistence.

Hosting: Vercel — built for Next.js.
Alternative: IBM Code Engine — use if deploying in IBM ecosystem.

3. FOLDER STRUCTURE

\`\`\`text
my-app/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── api/
├── components/
├── lib/
├── types/
├── package.json
└── README.md
\`\`\`

4. STARTER FILES

\`\`\`json
// package.json
{
  "name": "my-app",
  "private": true,
  "scripts": { "dev": "next dev", "build": "next build", "start": "next start" }
}
\`\`\`

\`\`\`env
# .env.example
DATABASE_URL=
\`\`\`

5. SETUP CHECKLIST

1. Clone the repo and run \`npm install\`.
2. Copy \`.env.example\` to \`.env.local\` and fill in values.
3. Run \`npm run dev\` and open http://localhost:3000.
4. Run \`npm run build\` before deploying.
5. Deploy to Vercel or your chosen host.
`;
}
