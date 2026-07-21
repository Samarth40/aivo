# AIVO — Deployment Guide

> Complete step-by-step guide to deploy the AIVO platform to production.

---

## Architecture Overview

AIVO consists of **3 deployable services** and **4 external dependencies**:

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRODUCTION STACK                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐    │
│  │   Frontend    │────▶│  API Gateway  │────▶│  AI Worker   │    │
│  │  (Vercel)     │     │  (Render)     │     │  (Render)    │    │
│  │  React + Vite │     │  Node/Express │     │  Python      │    │
│  └──────────────┘     └──────┬───────┘     └──────┬───────┘    │
│                              │                     │            │
│                    ┌─────────┴─────────────────────┘            │
│                    ▼                                            │
│            ┌──────────────┐  ┌──────────────┐                  │
│            │   MongoDB    │  │    Redis      │                  │
│            │   (Atlas)    │  │   (Render)    │                  │
│            └──────────────┘  └──────────────┘                  │
│                                                                 │
│  External Services: Clerk (Auth) · Google Gemini API (AI)      │
└─────────────────────────────────────────────────────────────────┘
```

| Service | Platform | Source Directory |
|---------|----------|-----------------|
| **Frontend (React)** | Vercel | `Client/` |
| **API Gateway (Node.js)** | Render | `Server/gateway/` |
| **AI Worker (Python)** | Render | `Server/ai-service/` |
| **Redis** | Render (managed) | — |
| **MongoDB** | MongoDB Atlas (free) | — |

---

## Deployment Readiness Checklist

> [!IMPORTANT]
> Review this checklist before deploying. Items marked ✅ are already configured in your codebase. Items marked ⚠️ need manual setup.

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | `render.yaml` Blueprint | ✅ Ready | Defines gateway, worker, and Redis |
| 2 | `vercel.json` SPA Rewrites | ✅ Ready | Catch-all rewrite for React Router |
| 3 | `vite.config.js` Build Config | ✅ Ready | React + Tailwind plugins configured |
| 4 | Gateway `package.json` scripts | ✅ Ready | `start` and `dev` scripts present |
| 5 | Python `requirements.txt` | ✅ Ready | All dependencies pinned |
| 6 | `.env.example` files | ✅ Ready | Both Client and Server templates exist |
| 7 | `.gitignore` excludes `.env` | ✅ Ready | All `.env.*` patterns excluded |
| 8 | CORS origin configuration | ✅ Ready | Reads from `CORS_ORIGIN` env var |
| 9 | Graceful shutdown handler | ✅ Ready | SIGTERM handler in `app.js` |
| 10 | Health check endpoint | ✅ Ready | `GET /health` returns `{ status: 'ok' }` |
| 11 | MongoDB Atlas cluster | ⚠️ Manual | Need to create (free tier works) |
| 12 | Clerk project | ⚠️ Manual | Need API keys from Clerk dashboard |
| 13 | Gemini API key | ⚠️ Manual | Need key from Google AI Studio |
| 14 | Push code to GitHub | ⚠️ Manual | Both Vercel and Render deploy from Git |

---

## Pre-requisites

Before starting, make sure you have accounts on:

- [GitHub](https://github.com) — to host your repository
- [Vercel](https://vercel.com) — for frontend deployment (free tier)
- [Render](https://render.com) — for backend + Redis deployment (free tier)
- [MongoDB Atlas](https://cloud.mongodb.com) — for database (free M0 cluster)
- [Clerk](https://clerk.com) — for authentication (free dev plan)
- [Google AI Studio](https://aistudio.google.com/app/apikey) — for Gemini API key

---

## Step 1 — Set Up External Services

### 1.1 MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com) and create a free account.
2. Create a new **Shared Cluster** (M0 free tier).
3. Under **Database Access**, create a database user:
   - Username: `aivo-admin` (or your choice)
   - Password: Generate a strong password → **copy it**
4. Under **Network Access**, add IP `0.0.0.0/0` (allow from anywhere — required for Render).
5. Click **Connect** → **Drivers** → Copy the connection string:
   ```
   mongodb+srv://aivo-admin:<password>@cluster0.xxxxx.mongodb.net/aivo?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password. **Save this — you'll need it as `MONGODB_URI`**.

### 1.2 Clerk (Authentication)

1. Go to [Clerk Dashboard](https://dashboard.clerk.com) and create a new application.
2. Name it `AIVO` and enable **Email** + **Google OAuth** sign-in methods.
3. Go to **API Keys** and copy:
   - **Publishable Key** → `pk_live_...` (for production) or `pk_test_...` (for testing)
   - **Secret Key** → `sk_live_...` or `sk_test_...`
4. Under **Social Connections** → configure Google OAuth:
   - Add your production frontend URL as an authorized redirect URI.
5. **Save both keys — you'll need them for Client and Server env vars**.

### 1.3 Gemini API Key (AI Engine)

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Click **Create API Key** → select or create a GCP project.
3. Copy the key: `AIzaSy...`
4. **Save this — you'll need it as `GEMINI_API_KEY`**.

---

## Step 2 — Push Code to GitHub

If you haven't already, push your code to a GitHub repository:

```bash
# From the project root (f:\Projects\aivo)
git init                        # skip if already initialized
git add .
git commit -m "Initial commit — production-ready AIVO"
git remote add origin https://github.com/<your-username>/aivo.git
git push -u origin main
```

> [!WARNING]
> Double-check that `.env` files are **NOT** committed. Your `.gitignore` already excludes them, but verify with `git status` before pushing.

---

## Step 3 — Deploy Backend on Render

### 3.1 Automatic Blueprint Deploy (Recommended)

Render can auto-detect the `render.yaml` file and provision all 3 services at once.

1. Go to [Render Dashboard](https://dashboard.render.com).
2. Click **New** → **Blueprint**.
3. Connect your GitHub repo (`aivo`).
4. Render will detect `render.yaml` and show 3 services:
   - `aivo-gateway` (Web Service — Node.js)
   - `aivo-worker` (Background Worker — Python)
   - `aivo-redis` (Redis Instance)
5. Click **Apply** to create all services.

### 3.2 Configure Environment Variables

After the blueprint deploys, you must set the **secret** env vars manually (marked `sync: false` in `render.yaml`):

#### For `aivo-gateway`:
Go to **aivo-gateway** → **Environment** tab and set:

| Variable | Value |
|----------|-------|
| `CLERK_PUBLISHABLE_KEY` | `pk_live_...` (from Step 1.2) |
| `CLERK_SECRET_KEY` | `sk_live_...` (from Step 1.2) |
| `MONGODB_URI` | `mongodb+srv://...` (from Step 1.1) |
| `GEMINI_API_KEY` | `AIzaSy...` (from Step 1.3) |
| `CORS_ORIGIN` | Your Vercel frontend URL (e.g., `https://aivo.vercel.app`) |

> [!NOTE]
> `NODE_ENV`, `PORT`, and `REDIS_URL` are already auto-configured by `render.yaml`.

#### For `aivo-worker`:
Go to **aivo-worker** → **Environment** tab and set:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | Same MongoDB URI as gateway |
| `GEMINI_API_KEY` | Same Gemini key as gateway |

> [!NOTE]
> `REDIS_URL` is automatically injected from the `aivo-redis` service.

### 3.3 Verify Backend is Running

1. After deploy completes, find the gateway URL in Render (e.g., `https://aivo-gateway.onrender.com`).
2. Test the health endpoint:
   ```bash
   curl https://aivo-gateway.onrender.com/health
   ```
   Expected response:
   ```json
   { "status": "ok", "service": "AIVO Application API Gateway" }
   ```
3. Check **aivo-worker** logs in Render to confirm:
   ```
   [OK] Backend Connections initialized successfully.
   Worker listening on queue 'aivo_tasks'...
   ```

> [!WARNING]
> Render free-tier services **spin down after 15 minutes of inactivity** and take ~30–60 seconds to cold-start. The first request after idle will be slow. Consider upgrading to a paid plan for production use.

---

## Step 4 — Deploy Frontend on Vercel

### 4.1 Import Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New** → **Project**.
3. Import your GitHub repository (`aivo`).
4. Configure build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `Client`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)

### 4.2 Set Environment Variables

In Vercel → **Project Settings** → **Environment Variables**, add:

| Variable | Value | Environment |
|----------|-------|-------------|
| `VITE_CLERK_PUBLISHABLE_KEY` | `pk_live_...` (from Step 1.2) | Production |
| `VITE_API_URL` | `https://aivo-gateway.onrender.com` (from Step 3.3) | Production |

> [!IMPORTANT]
> Vite env vars are injected at **build time**, not runtime. If you change them, you must **redeploy** (trigger a new build) for changes to take effect.

### 4.3 Deploy

1. Click **Deploy**. Vercel will build and deploy automatically.
2. Your frontend will be live at: `https://aivo-<random>.vercel.app` (or a custom domain).

### 4.4 Update CORS on Render

After getting your Vercel URL, go back to Render:

1. **aivo-gateway** → **Environment** → Update `CORS_ORIGIN`:
   ```
   https://aivo.vercel.app
   ```
   (Replace with your actual Vercel URL. For multiple origins, comma-separate them.)
2. Save → the gateway will auto-redeploy.

---

## Step 5 — Configure Clerk for Production

1. Go to [Clerk Dashboard](https://dashboard.clerk.com) → your AIVO app.
2. Under **Domains**, add your Vercel URL:
   - `https://aivo.vercel.app` (or your custom domain)
3. Under **Paths** → **SSO Callback URL**, ensure it's set to:
   - `https://aivo.vercel.app/sso-callback`
4. If using **Google OAuth**, update the authorized redirect URIs in [Google Cloud Console](https://console.cloud.google.com/apis/credentials):
   - Add: `https://clerk.aivo.vercel.app/v1/oauth_callback` (Clerk's redirect)

---

## Step 6 — Post-Deploy Verification

Run through this checklist to make sure everything works end-to-end:

| # | Test | How to Verify |
|---|------|---------------|
| 1 | Frontend loads | Visit your Vercel URL → Landing page should render |
| 2 | Sign Up / Login | Create a new account → should redirect to `/onboarding` |
| 3 | Dashboard loads | After onboarding → `/dashboard` should show stats |
| 4 | Analysis Pipeline | Submit a URL → job should go to "Extracting" → "Analyzing" → "Completed" |
| 5 | AI Simulation | Run a simulation → should show multi-model results |
| 6 | Competitor Intel | Compare two URLs → should return analysis |
| 7 | LLMs.txt Generator | Enter a URL → should generate llms.txt content |
| 8 | Reports | Check that completed jobs appear in Reports page |

---

## Step 7 — Custom Domain (Optional)

### Vercel (Frontend)
1. Go to **Project Settings** → **Domains**.
2. Add your domain (e.g., `app.aivo.io`).
3. Update DNS records as instructed by Vercel.
4. Update `CORS_ORIGIN` on Render to include the new domain.
5. Update Clerk domains and redirect URIs.

### Render (Backend)
1. Go to **aivo-gateway** → **Settings** → **Custom Domains**.
2. Add your API domain (e.g., `api.aivo.io`).
3. Update `VITE_API_URL` in Vercel to the new API domain.
4. Redeploy the frontend.

---

## Environment Variables Summary

### Client (Vercel) — Build-Time Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | `pk_live_abc123...` |
| `VITE_API_URL` | Backend gateway URL | `https://aivo-gateway.onrender.com` |

### Server — Gateway (Render)

| Variable | Description | Source |
|----------|-------------|--------|
| `NODE_ENV` | Environment | `production` (set in render.yaml) |
| `PORT` | Server port | `10000` (set in render.yaml) |
| `CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Clerk Dashboard |
| `CLERK_SECRET_KEY` | Clerk secret key | Clerk Dashboard |
| `MONGODB_URI` | MongoDB connection string | MongoDB Atlas |
| `REDIS_URL` | Redis connection string | Auto-injected by Render |
| `GEMINI_API_KEY` | Google Gemini API key | Google AI Studio |
| `CORS_ORIGIN` | Allowed frontend origins | Your Vercel URL |

### Server — AI Worker (Render)

| Variable | Description | Source |
|----------|-------------|--------|
| `MONGODB_URI` | MongoDB connection string | MongoDB Atlas |
| `REDIS_URL` | Redis connection string | Auto-injected by Render |
| `GEMINI_API_KEY` | Google Gemini API key | Google AI Studio |

---

## Troubleshooting

### Frontend shows blank page
- Check browser console for errors.
- Verify `VITE_CLERK_PUBLISHABLE_KEY` is set correctly in Vercel env vars.
- Make sure you **redeployed** after changing env vars (Vite injects at build time).

### 401 Unauthorized on API calls
- Verify `CLERK_SECRET_KEY` is set in Render gateway env vars.
- Ensure `CORS_ORIGIN` matches your exact Vercel URL (no trailing slash).
- Check that Clerk domain settings include your production URL.

### Analysis jobs stuck at "Processing"
- Check **aivo-worker** logs in Render dashboard.
- Verify `REDIS_URL` is correctly injected (should auto-connect via blueprint).
- Verify `GEMINI_API_KEY` is set in the worker's env vars.
- Check `MONGODB_URI` — the worker needs to write results back to the same database.

### Render services are slow / timing out
- Free tier spins down after 15 min idle. First request after idle takes 30–60s.
- Upgrade to **Starter plan** ($7/mo per service) to keep services always on.

### MongoDB connection refused
- Verify IP `0.0.0.0/0` is in Atlas **Network Access** (required for Render's dynamic IPs).
- Check that the password in `MONGODB_URI` doesn't contain special characters that need URL-encoding.

---

## Upgrade Considerations for Production

| Area | Free Tier Limitation | Recommended Upgrade |
|------|---------------------|---------------------|
| **Render Web Service** | Spins down after 15 min idle | Starter plan ($7/mo) — always on |
| **Render Worker** | Same idle spindown | Starter plan ($7/mo) |
| **Render Redis** | 25 MB, no persistence | Starter plan ($10/mo) — persistence enabled |
| **MongoDB Atlas** | 512 MB M0 cluster | M10 ($57/mo) — dedicated resources |
| **Clerk** | 10,000 MAU | Pro plan ($25/mo) — higher limits |
| **Vercel** | 100 GB bandwidth | Pro plan ($20/mo) — more bandwidth |

---

## Quick-Deploy Cheat Sheet

```bash
# 1. Push to GitHub
git add . && git commit -m "deploy" && git push origin main

# 2. Render auto-deploys from render.yaml (set secrets in dashboard)
# 3. Vercel auto-deploys on push (set VITE_ env vars in dashboard)

# 4. Test
curl https://aivo-gateway.onrender.com/health
# → { "status": "ok" }
```

---

*Last Updated: 2026-07-21*
