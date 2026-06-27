# GitReview Prototype Deployment Runbook

This runbook describes how to deploy the GitReview prototype to a public host once the required external credentials are available.

## External credentials required

- **GitHub App** — App ID, private key (PEM), webhook secret.
- **Hosting account** — Vercel or Render free tier.
- **Anthropic API key** — already available in this workspace.

## Option A: Vercel (recommended, fastest)

1. Push the `gitreview-prototype` directory to a GitHub repository.
2. Import the repository in [vercel.com](https://vercel.com).
3. Add these environment variables in the Vercel dashboard:
   - `GITHUB_APP_ID`
   - `GITHUB_PRIVATE_KEY`
   - `GITHUB_WEBHOOK_SECRET`
   - `ANTHROPIC_API_KEY`
   - `ANTHROPIC_MODEL` (optional, defaults to `claude-sonnet-4-6`)
4. Deploy.
5. Set the GitHub App webhook URL to `https://<project>.vercel.app/webhooks`.
6. Install the app on a test repository and open a PR.
7. Verify a comment starting with `## AI-generated PR description` appears.

## Option B: Render (free tier)

1. Push the `gitreview-prototype` directory to a GitHub repository.
2. In Render, choose **New > Blueprint** and point it at `render.yaml`.
3. Fill in the secret environment variables when prompted.
4. Render builds with `npm run build` and starts with `npm start`.
5. Set the GitHub App webhook URL to `https://<service>.onrender.com/webhooks`.
6. Install the app on a test repository and open a PR.

## Creating the GitHub App

Use the included `github-app-manifest.json` with GitHub's [App Manifest flow](https://docs.github.com/en/apps/sharing-github-apps/registering-a-github-app-using-url-parameters):

1. Host `github-app-manifest.json` at a public URL (e.g., a GitHub Gist raw URL).
2. Navigate to:
   ```
   https://github.com/settings/apps/new?state=<optional-state>
   ```
   with the manifest URL in the request body as documented by GitHub, or use GitHub's manifest creation endpoint with a logged-in session.
3. After creation, note the **App ID** and download the **private key**.
4. Generate a **webhook secret** and set it in both the GitHub App settings and the deployment environment.

## Verification

1. `GET /health` returns `{"status":"ok","version":"0.1.0"}`.
2. Open a pull request in a repo with the app installed.
3. The PR receives a comment starting with `## AI-generated PR description`.

## Demo without deployment

If credentials are not available, run the local demo:

```bash
cd gitreview-prototype
npm run build
node scripts/demo.js
```

See [`demo-output.md`](./demo-output.md) for sample output.
