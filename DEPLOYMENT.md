# Deployment Guide

## Prerequisites

Before deploying, ensure you have:

- ✅ An API key for your chosen AI provider — watsonx.ai (IBM Cloud), Anthropic, or OpenAI. Or skip the key and run in `demo` mode.
- ✅ GitHub account
- ✅ Vercel account (free tier works)

---

## Step-by-Step Deployment to Vercel

### 1. Prepare Your Repository

```bash
git init
git add .
git commit -m "Initial commit: Project Kickstarter"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/project-starter-kit.git
git push -u origin main
```

Do **not** commit `.env.local` — it is ignored by `.gitignore`.

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **Add New… → Project**.
3. Import your GitHub repository.
4. Vercel auto-detects **Next.js** — leave the default build settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** (default)
   - **Install Command:** `npm install`

### 3. Configure Environment Variables

In **Project Settings → Environment Variables**, add the vars for your chosen provider.

**Pick one of:**

| Provider | Required vars |
|---|---|
| Anthropic | `AI_PROVIDER=anthropic`, `ANTHROPIC_API_KEY`, optional `ANTHROPIC_MODEL` |
| OpenAI | `AI_PROVIDER=openai`, `OPENAI_API_KEY`, optional `OPENAI_MODEL`, `OPENAI_BASE_URL` |
| watsonx.ai | `AI_PROVIDER=watsonx`, `WATSONX_API_KEY`, `WATSONX_PROJECT_ID`, `WATSONX_URL`, optional `WATSONX_MODEL_ID` |
| Demo (no key) | `AI_PROVIDER=demo` |

Set scope to **Production, Preview, Development**. Redeploy after changing variables.

### 4. Deploy

Click **Deploy**. The first build usually completes in 1–3 minutes.

Your live URL will look like: `https://project-starter-kit.vercel.app`

---

## Verify Production

1. Open the deployed URL.
2. Complete the form and generate a blueprint.
3. Confirm the loading screen completes and sections render.
4. Test **Copy** and **Download**.

If generation fails only in production:

- Double-check env vars are set for **Production** (not just Preview).
- Open **Vercel → Project → Logs** and filter for `/api/generate` errors.

---

## Custom Domain (Optional)

1. **Project Settings → Domains**
2. Add your domain and follow DNS instructions.
3. Redeploy if needed.

---

## Environment-Specific Notes

### Preview deployments

Each pull request gets a preview URL. Use the same provider env vars as Production unless you have separate keys per environment.

### Local vs production

| Concern | Local | Vercel |
|---------|--------|--------|
| AI provider | `AI_PROVIDER` in `.env.local` | `AI_PROVIDER` env var |
| API key(s) | `.env.local` | Provider-specific env vars (see table above) |
| Blueprint persistence | `sessionStorage` | Same (per browser tab) |

---

## Security Checklist

- [ ] Provider API keys are only in server env (never prefixed with `NEXT_PUBLIC_*`)
- [ ] `.env.local` is not committed
- [ ] API route does not return stack traces in production (already enforced in `route.ts`)

---

## Rollback

In Vercel **Deployments**, find a previous successful deployment and click **Promote to Production**.

---

## Alternative Hosts

This app is a standard Next.js 16 project. You can deploy to any platform that supports Node.js and environment variables (e.g. IBM Code Engine, Railway, Netlify). Set the same env vars and run `npm run build` + `npm start`.

---

**Made with Bob** 🤖
