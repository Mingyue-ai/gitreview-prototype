# GitReview Prototype

A minimal GitHub App that listens for opened pull requests and posts an AI-generated PR description as a comment.

## Why

This is the Week 1 deliverable of the CEO-led bootstrap sprint for [GitReview](/MIN/issues/MIN-2). It validates whether engineering teams will pay for an AI-powered PR Assistant before committing to the full MVP build.

## Stack

- Node.js 20 + TypeScript
- Express (local / Render)
- Serverless adapter for Vercel (`src/vercel.ts`)
- @octokit/webhooks + @octokit/rest + @octokit/auth-app
- Anthropic Claude API

## What it does

1. Listens for `pull_request.opened` webhooks from GitHub.
2. Authenticates as the GitHub App installation that owns the event.
3. Fetches the PR diff.
4. Sends the diff + original title/body to Claude.
5. Posts the generated description as a PR comment.
6. Skips if a GitReview comment already exists (idempotent).

## Prerequisites

- A GitHub App with:
  - **App ID** and **private key** (PEM)
  - **Webhook secret**
  - Permissions: `Pull requests` (read), `Issues` (write, to post comments), `Contents` (read, for diffs)
  - Subscribe to `Pull request` events
- An Anthropic API key

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in credentials:
   ```bash
   cp .env.example .env
   ```

   For local testing with a personal access token you can use `GITHUB_TOKEN` instead of `GITHUB_APP_ID` / `GITHUB_PRIVATE_KEY`. For the real webhook flow, use the GitHub App credentials.

3. Start the dev server:
   ```bash
   npm run dev
   ```

4. Expose locally (e.g., ngrok) and configure the GitHub App webhook URL to `https://your-tunnel/webhooks`.

5. Open a PR in a repo where the app is installed.

## Deploy

### Vercel (free tier)

1. Push this repo to GitHub.
2. Import the repo in [Vercel](https://vercel.com).
3. Add environment variables in the Vercel dashboard:
   - `GITHUB_APP_ID`
   - `GITHUB_PRIVATE_KEY`
   - `GITHUB_WEBHOOK_SECRET`
   - `ANTHROPIC_API_KEY`
   - `ANTHROPIC_MODEL` (optional, defaults to `claude-sonnet-4-6`)
4. Set the GitHub App webhook URL to `https://your-project.vercel.app/webhooks`.

The included `vercel.json` routes `/webhooks` and `/health` to `src/vercel.ts`.

### Render (free tier)

1. Push this repo to GitHub.
2. In Render, choose **New > Blueprint** and point it at `render.yaml`.
3. Fill in the secret environment variables when prompted.
4. Render builds with `npm run build` and starts with `npm start`.
5. Set the GitHub App webhook URL to `https://your-service.onrender.com/webhooks`.

## Verify the deployment

1. `GET /health` should return `{"status":"ok","version":"0.1.0"}`.
2. Open a pull request in a repo with the app installed.
3. The PR should receive a comment starting with `## AI-generated PR description`.

## Project layout

```
src/
  index.ts    # Express entry point (local / Render)
  vercel.ts   # Serverless handler (Vercel)
  github.ts   # GitHub App auth, diff fetch, comment post
  claude.ts   # Claude API prompt and response handling
```

## Next step

Week 2 validation: [MIN-5](/MIN/issues/MIN-5)
