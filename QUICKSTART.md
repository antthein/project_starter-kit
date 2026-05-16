# 🚀 Quick Start Guide

## Get Running in 3 Steps

### Step 1: Install Dependencies

```bash
cd project-starter-kit
npm install
```

### Step 2: Set Up Your API Key

Create `.env.local` in the project root with watsonx.ai credentials (from **Developer access** in your watsonx project):

```env
WATSONX_API_KEY=your_ibm_cloud_api_key
WATSONX_PROJECT_ID=your_project_id
WATSONX_URL=https://us-south.ml.cloud.ibm.com
```

IBM Bob is used in the IDE to build this app; live blueprint generation calls **watsonx.ai** (`/ml/v1/text/generation`), not a separate Bob HTTP API.

### Step 3: Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Test the Full Flow

1. Click **Start my project →** on the landing page.
2. Fill in **Question 1** (app description) and select at least one **app type**.
3. Optionally answer questions 3–7 for better blueprint quality.
4. Click **Generate my blueprint ✦**.
5. Wait on the loading screen (~5–10 seconds).
6. Review the blueprint, then **Copy** or **Download** the markdown.

---

## Troubleshooting

### "API configuration error"

`WATSONX_API_KEY` or `WATSONX_PROJECT_ID` is missing from `.env.local`. Restart the dev server after adding them.

### "Failed to generate blueprint"

- Create an [IBM Cloud API key](https://cloud.ibm.com/iam/apikeys) and a watsonx.ai project.
- Copy **Project ID** and **base URL** from watsonx → Developer access.
- Check the terminal running `npm run dev` for `watsonx.ai` error details.

### Blueprint sections look empty

Bob may have returned a different format. Use **Copy full blueprint** — the raw markdown is always saved. Update `lib/buildPrompt.ts` if your API uses a different response shape.

### Page redirects to form after refresh

Form answers are session-only. The **blueprint** is kept in `sessionStorage` so a refresh on `/blueprint` should still work. Starting a new project clears it.

---

## Production Build

```bash
npm run build
npm start
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for Vercel deployment.

---

**Made with Bob** 🤖
