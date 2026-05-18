# Project Kickstarter — Master Prompt
### IBM Bob Hackathon | May 2026

---

## 1. PURPOSE

**Name:** Project starter-kit
**Tagline:** "Describe your idea. Bob builds the blueprint."

**Problem it solves:**
Every developer knows the blank-screen moment — you have an idea but don't know where to start. What stack? What folder structure? How do I set it up? This paralysis kills momentum before a single line of code is written.

**What it does:**
A developer fills in a simple 7-question form. IBM Bob reads the inputs and instantly generates a complete, opinionated Project Blueprint — tech stack with reasoning, folder structure, boilerplate starter files, and a step-by-step local setup guide.

**Why it wins:**
- Solves a pain every developer at every skill level has felt
- IBM Bob is the entire engine — not a wrapper, not optional
- Live demo is dramatic: fill form → watch blueprint appear in seconds
- Works for solo devs, small teams, and large teams equally

---

## 2. TECH STACK

| Layer | Choice | Version | Why |
|---|---|---|---|
| Framework | Next.js | 14+ | App Router, easy Vercel deploy, API routes built-in |
| Styling | Tailwind CSS | 3.4+ | Fast UI building, no custom CSS files needed |
| Language | TypeScript | 5.0+ | Type safety, cleaner code for judges to read |
| AI Engine | IBM Bob API | latest | Core engine — called via Next.js API route |
| Hosting | Vercel | — | Made for Next.js, free tier, one-click deploy |
| Backend | None | — | No data to save, no auth needed |

**Bob API call flow:**
```
Browser → /api/generate (Next.js API Route) → IBM Bob API
```
API key lives in `.env.local` — never exposed to the browser.

---

## 3. PROJECT STRUCTURE

```
project-stater-kit/
├── app/
│   ├── page.tsx                  ← Screen 1: Landing page
│   ├── form/
│   │   └── page.tsx              ← Screen 2: 7-question form
│   ├── loading/
│   │   └── page.tsx              ← Screen 3: Bob is thinking
│   ├── blueprint/
│   │   └── page.tsx              ← Screen 4: Blueprint output
│   └── api/
│       └── generate/
│           └── route.ts          ← Bob API call (server-side, key hidden)
├── components/
│   ├── Chip.tsx                  ← Select chip button
│   ├── BlueprintSection.tsx      ← Each output section card
│   └── CodeBlock.tsx             ← Syntax block with copy button
├── lib/
│   ├── buildPrompt.ts            ← Builds the Bob prompt from form data
│   └── FormContext.tsx           ← React Context — shares form state across all pages
├── types/
│   └── form.ts                   ← TypeScript types for form data
├── .env.local                    ← BOB_API_KEY (never committed)
├── tailwind.config.ts
└── next.config.ts
```

---

## 4. USER FLOW

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

---

## 5. THE FORM (7 Questions)

| # | Question | Type | Required |
|---|---|---|---|
| 1 | What does your app do? | Textarea | ✅ Yes |
| 2 | What type of app is it? | Multi-select chips | ✅ Yes |
| 3 | Who are the expected users? | Single-select chips | No |
| 4 | Team size | Single-select chips | No |
| 5 | Budget | Single-select chips | No |
| 6 | Timeline | Single-select chips | No |
| 7 | Any preferences or constraints? | Text input | No |

**Chip options:**

- **App type:** Web app / Mobile app / API-Backend / Desktop app / CLI tool / Bot-Automation
- **Users:** Just me / Small team (2–10) / Company internal / Public small / Public large
- **Team size:** Solo / 2–5 / 5+
- **Budget:** Free only / Low (<$50/mo) / Flexible / High (>$500/mo)
- **Timeline:** Weekend hack / A few weeks / Several months / Long-term

---

## 6. IBM BOB PROMPT

This is the exact prompt sent to Bob. Do not change it.

```
You are an expert software architect. A developer has described their project below.

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

--- PROJECT INPUTS ---
What it does     : {appDesc}
App type         : {appType}
Expected users   : {users}
Team size        : {teamSize}
Budget           : {budget}
Timeline         : {timeline}
Preferences      : {prefs}
```

---

## 7. BLUEPRINT OUTPUT (5 Sections)

| Section | What Bob generates |
|---|---|
| A — Project Summary | 2–3 sentences restating the project clearly |
| B — Tech Stack | Table: layer / choice / why / alternative |
| C — Folder Structure | Code block with full folder tree |
| D — Starter Files | 3–5 boilerplate files, syntax-highlighted, copy button |
| E — Setup Checklist | Numbered steps to run the project locally |

**Actions after blueprint:**
- Copy full blueprint (as markdown)
- Download as `README.md`
- Start over

---

## 8. UI / UX DESIGN

### Aesthetic Direction
Minimalist black and white. Pure monochrome.
Think **Vercel meets Linear** — premium developer tool, not a startup landing page.
Sharp typography. No gradients. No decorations. Every pixel earns its place. Typography does all the work. White space is the design.


---

### Color Palette

| Role | Hex |
|---|---|
| Background primary | `#000000` |
| Background surface (cards) | `#0D0D0D` |
| Background elevated | `#141414` |
| Border default | `#222222` |
| Border hover | `#333333` |
| Text primary | `#FFFFFF` |
| Text secondary | `#888888` |
| Text tertiary | `#444444` |
| Accent primary | `#FFFFFF` |
| Accent hover | `#CCCCCC` |
| Accent bg tint | `#1A1A1A` |
| Success | `#FFFFFF` |
| Warning | `#888888` |
| Code background | `#0A0A0A` |

---

### Typography

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
```

| Role | Font | Size | Weight |
|---|---|---|---|
| Hero headline | DM Serif Display | 48–56px | 400 |
| Section headings | DM Serif Display | 24–32px | 400 |
| Body / UI text | DM Mono | 14–16px | 400 |
| Labels / caps | DM Mono | 11–12px | 500 |
| Code blocks | DM Mono | 13px | 400 |

---

### Layout

| Property | Value |
|---|---|
| Max content width | `720px` centered |
| Page padding (desktop) | `4rem` horizontal |
| Page padding (mobile) | `2rem` horizontal |
| Section spacing | `3rem` between sections |
| Card border radius | `12px` |
| Button border radius | `8px` |
| Input border radius | `8px` |

---

### Component Specs

**Chip (select button)**
```
Default  → bg #0D0D0D | border 1px #222222 | text #888888
Hover    → border #333333 | text #FFFFFF
Selected → bg #1A1A1A | border #FFFFFF | text #FFFFFF
Size     → padding 6px 16px | border-radius 20px | font DM Mono 13px
```

**Primary Button**
```
bg #FFFFFF | text #000000 | font DM Mono 14px weight 500
Hover  → bg #CCCCCC
Active → scale(0.98)
Padding → 12px 24px
```

**Text Input / Textarea**
```
bg #0D0D0D | border 1px #222222
Focus → border #FFFFFF
Text → #FFFFFF DM Mono 14px
Placeholder → #444444
```

**Code Block**
```
bg #0A0A0A | border 1px #222222 | border-left 3px #FFFFFF
Font → DM Mono 13px
Copy button → top-right corner, icon only
```

**Loading Bar**
```
Track → #141414
Fill  → animated shimmer #FFFFFF → #888888
Loop  → 2s smooth, left to right
```

---

### Animations

| Trigger | Animation |
|---|---|
| Page load | Sections fade in: `opacity 0→1` + `translateY 10px→0`, staggered 100ms |
| Chip select | `scale(0.97)` on click, spring back |
| Form → Loading | Crossfade 200ms |
| Blueprint sections | Slide in sequentially, 100ms stagger |
| Copy button | Show `✓ Copied` for 1.5s then reset |

---

## 9. SCREENS SUMMARY

| Screen | Route | Description |
|---|---|---|
| Landing | `/` | Headline, tagline, single CTA button |
| Form | `/form` | 7 questions, chip selects + text inputs |
| Loading | `/loading` | Animated bar + rotating Bob status messages |
| Blueprint | `/blueprint` | 5-section output + copy / download / reset |

All state passed via URL params or React context — no database, no backend storage.

---

## 10. LOADING MESSAGES (rotate during Bob API call)

1. "Bob is reading your idea..."
2. "Analyzing the best stack for your use case..."
3. "Comparing tradeoffs..."
4. "Generating your folder structure..."
5. "Writing your setup guide..."

---

## 11. DEMO SCRIPT (for judges — 2.5 minutes)

| Time | Action |
|---|---|
| 0:00–0:10 | Open app. Show clean landing page. |
| 0:10–0:12 | Click "Start my project →" |
| 0:12–0:42 | Fill form live with a real project idea |
| 0:42–0:52 | Hit Generate. Show loading state. |
| 0:52–1:52 | Blueprint appears. Walk through all 5 sections. |
| 1:52–2:02 | Copy the README. Show it's paste-ready. |
| 2:02–2:30 | "This is what IBM Bob makes possible — from blank screen to running project in under 2 minutes." |

---

## 12. JUDGING CRITERIA MAP

| Criterion | How this project addresses it |
|---|---|
| Meaningful IBM Bob use | Bob is the entire engine — removes it and the app has nothing |
| Speeds the way you work | Eliminates blank-screen paralysis — the #1 daily dev pain |
| Any skill level | Junior gets expert decisions. Senior skips the boilerplate. |
| High-quality software delivery | Every output includes structure, docs, and setup guide |
| POC quality | Live demo, real API call, real output — not a mockup |

---

## 13. BUILD PLAN

### Day 1
- [ ] Init Next.js 14 + Tailwind + TypeScript project
- [ ] Build Landing page (`/`)
- [ ] Build Form page (`/form`) — all 7 questions with chips
- [ ] Build `/api/generate` route — connect IBM Bob API
- [ ] Build Loading page (`/loading`) with rotating messages
- [ ] Parse Bob response — display raw output on Blueprint page

### Day 2
- [ ] Structure Blueprint output into 5 sections
- [ ] Add syntax-highlighted code blocks with copy buttons
- [ ] Add "Copy full blueprint" + "Download README.md" buttons
- [ ] Polish all animations and transitions
- [ ] Deploy to Vercel
- [ ] Record demo video

---

*IBM Bob Hackathon | lablab.ai | May 2026*
