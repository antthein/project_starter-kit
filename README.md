# Project Kickstarter

**Version:** v0.2.0 | **Tagline:** "Describe your idea. Bob builds the blueprint."

A Next.js web application for the IBM Bob Hackathon (May 2026) that helps developers overcome "blank screen paralysis" by generating complete project blueprints using IBM Bob AI.

> See [QUICKSTART.md](QUICKSTART.md) to run locally, [DEPLOYMENT.md](DEPLOYMENT.md) for Vercel, and [VERSION_HISTORY.md](VERSION_HISTORY.md) for changelog.

## 🎯 What It Does

Every developer knows the blank-screen moment — you have an idea but don't know where to start. What stack? What folder structure? How do I set it up?

**Project Kickstarter** solves this by:
1. Asking you 7 simple questions about your project
2. Sending your inputs to IBM Bob
3. Generating a complete, opinionated project blueprint with:
   - Tech stack recommendations with reasoning
   - Complete folder structure
   - Boilerplate starter files
   - Step-by-step setup guide

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- IBM Bob API key (from the hackathon dashboard)

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd project-starter-kit
   npm install
   ```

2. **Set up environment variables:**

   Create `.env.local` in the project root with credentials from [watsonx.ai](https://dataplatform.cloud.ibm.com/) → your project → **Developer access**:
   ```
   WATSONX_API_KEY=your_ibm_cloud_api_key
   WATSONX_PROJECT_ID=your_project_id
   WATSONX_URL=https://us-south.ml.cloud.ibm.com
   ```
   
   **Note:** IBM Bob is the IDE dev partner (build with Bob). Live generation uses `AI_PROVIDER` in `.env.local` (`watsonx`, `openai`, `anthropic`, or `demo`). See [ENV.md](ENV.md).

   **Quick fallback while watsonx access is pending:**
   ```env
   AI_PROVIDER=demo
   ```
   Or use OpenAI: `AI_PROVIDER=openai` and `OPENAI_API_KEY=...`

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 16 | App Router, API routes, easy Vercel deploy |
| Styling | Tailwind CSS v4 | Fast UI building, inline theme configuration |
| Language | TypeScript 5.0+ | Type safety, better DX |
| AI Engine | IBM Bob API | Core engine for blueprint generation |
| Hosting | Vercel | Made for Next.js, one-click deploy |

## 📁 Project Structure

```
project-starter-kit/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── form/
│   │   └── page.tsx              # 7-question form
│   ├── loading/
│   │   └── page.tsx              # Loading state with rotating messages
│   ├── blueprint/
│   │   └── page.tsx              # Blueprint output (5 sections)
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # Bob API integration (server-side)
│   ├── layout.tsx                # Root layout with FormProvider
│   └── globals.css               # Global styles & theme
├── components/
│   ├── Chip.tsx                  # Select chip button
│   ├── BlueprintSection.tsx      # Section card component
│   └── CodeBlock.tsx             # Code block with copy button
├── lib/
│   ├── FormContext.tsx           # React Context for form state
│   ├── buildPrompt.ts            # Prompt builder & parser
│   ├── storage.ts                # sessionStorage for blueprint persistence
│   └── version.ts                # App version constant
├── types/
│   └── form.ts                   # TypeScript types
└── .env.local                    # Your secrets (not committed; create locally)
```

## 🎨 Design System

**Aesthetic:** Minimalist black & white monochrome (Vercel meets Linear)

**Colors:**
- Background: `#000000`
- Surface: `#0D0D0D`
- Border: `#222222`
- Text Primary: `#FFFFFF`
- Text Secondary: `#888888`

**Typography:**
- Headings: DM Serif Display
- Body/UI: DM Mono

## 🔄 User Flow

```
Landing Page
    ↓  click "Start my project →"
7-Question Form
    ↓  click "Generate my blueprint ✦"
Loading Screen  (Bob is thinking — ~5–10 seconds)
    ↓  blueprint ready
Blueprint Output  (5 sections rendered)
    ↓  actions
Copy markdown  /  Download README.md  /  Start over
```

## 📝 The 7 Questions

1. **What does your app do?** (Required, textarea)
2. **What type of app is it?** (Required, multi-select chips)
   - Web app / Mobile app / API-Backend / Desktop app / CLI tool / Bot-Automation
3. **Who are the expected users?** (Optional, single-select)
   - Just me / Small team (2–10) / Company internal / Public small / Public large
4. **Team size** (Optional, single-select)
   - Solo / 2–5 / 5+
5. **Budget** (Optional, single-select)
   - Free only / Low (<$50/mo) / Flexible / High (>$500/mo)
6. **Timeline** (Optional, single-select)
   - Weekend hack / A few weeks / Several months / Long-term
7. **Any preferences or constraints?** (Optional, text input)

## 🤖 IBM Bob Integration

The app sends a carefully crafted prompt to IBM Bob that instructs it to generate:

1. **Project Summary** — 2-3 clear sentences
2. **Tech Stack** — Recommendations with reasoning and alternatives
3. **Folder Structure** — Complete folder tree
4. **Starter Files** — 3-5 boilerplate files with content
5. **Setup Checklist** — Step-by-step local setup instructions

The prompt is opinionated and asks Bob to avoid overengineering based on team size and timeline.

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables:
   - `WATSONX_API_KEY`
   - `WATSONX_PROJECT_ID`
   - `WATSONX_URL` (optional, default `us-south`)
4. Deploy!

Vercel will automatically detect Next.js and configure everything.

## 🧪 Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📦 Key Features

- ✅ **Zero database** — React Context + sessionStorage for blueprint on refresh
- ✅ **Server-side API calls** — API key never exposed to browser
- ✅ **Responsive design** — Works on mobile and desktop
- ✅ **Copy & download** — Export blueprint as markdown
- ✅ **Smooth animations** — Staggered fade-ins, loading states
- ✅ **Type-safe** — Full TypeScript coverage

## 🎯 Hackathon Criteria

| Criterion | How This Project Addresses It |
|-----------|-------------------------------|
| Meaningful IBM Bob use | Bob is the entire engine — remove it and the app has nothing |
| Speeds the way you work | Eliminates blank-screen paralysis — the #1 daily dev pain |
| Any skill level | Junior gets expert decisions. Senior skips the boilerplate. |
| High-quality software delivery | Every output includes structure, docs, and setup guide |
| POC quality | Live demo, real API call, real output — not a mockup |

## 📄 License

Built for IBM Bob Hackathon | lablab.ai | May 2026

---

**Made with Bob** 🤖
