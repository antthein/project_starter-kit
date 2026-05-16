# Deployment Guide

## Prerequisites

Before deploying, ensure you have:

- ✅ IBM Bob API key from the hackathon dashboard
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

In **Project Settings → Environment Variables**, add:

| Name | Value | Environments |
|------|--------|--------------|
| `WATSONX_API_KEY` | IBM Cloud API key | Production, Preview, Development |
| `WATSONX_PROJECT_ID` | watsonx.ai project ID | Production, Preview, Development |
| `WATSONX_URL` | e.g. `https://us-south.ml.cloud.ibm.com` | Production, Preview, Development |

Optional: `WATSONX_MODEL_ID`, `WATSONX_API_VERSION`. Redeploy after changing variables.

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

Each pull request gets a preview URL. Use the same `BOB_API_KEY` and `BOB_API_URL` unless you have separate keys per environment.

### Local vs production

| Concern | Local | Vercel |
|---------|--------|--------|
| API key | `.env.local` | `WATSONX_API_KEY` |
| Project ID | `.env.local` | `WATSONX_PROJECT_ID` |
| ML base URL | `.env.local` | `WATSONX_URL` |
| Blueprint persistence | `sessionStorage` | Same (per browser tab) |

---

## Security Checklist

- [ ] `BOB_API_KEY` is only in server env (never `NEXT_PUBLIC_*`)
- [ ] `.env.local` is not committed
- [ ] API route does not return stack traces in production

---

## Rollback

In Vercel **Deployments**, find a previous successful deployment and click **Promote to Production**.

---

## Alternative Hosts

This app is a standard Next.js 16 project. You can deploy to any platform that supports Node.js and environment variables (e.g. IBM Code Engine, Railway, Netlify). Set the same env vars and run `npm run build` + `npm start`.

---

**Made with Bob** 🤖
