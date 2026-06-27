import { createNodeMiddleware, Webhooks } from "@octokit/webhooks";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generatePRDescription } from "./claude";
import {
  postPRComment,
  getPullRequestDiff,
  findExistingBotComment,
} from "./github";

const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET;

const webhooks = webhookSecret
  ? new Webhooks({ secret: webhookSecret })
  : null;

webhooks?.on("pull_request.opened", async ({ payload }) => {
  const pr = payload.pull_request;
  const repo = payload.repository;
  const installationId = payload.installation?.id;

  if (!installationId) {
    console.warn(`Ignoring PR ${repo.full_name}#${pr.number}: no installation id`);
    return;
  }

  console.log(`PR opened: ${repo.full_name}#${pr.number}`);

  try {
    const existingCommentId = await findExistingBotComment({
      owner: repo.owner.login,
      repo: repo.name,
      issueNumber: pr.number,
      installationId,
    });

    if (existingCommentId) {
      console.log(`Already commented on ${repo.full_name}#${pr.number}; skipping.`);
      return;
    }

    const diff = await getPullRequestDiff({
      owner: repo.owner.login,
      repo: repo.name,
      pullNumber: pr.number,
      installationId,
    });

    const description = await generatePRDescription({
      title: pr.title,
      body: pr.body || "",
      diff,
    });

    await postPRComment({
      owner: repo.owner.login,
      repo: repo.name,
      issueNumber: pr.number,
      body: description,
      installationId,
    });

    console.log(`Posted AI description on ${repo.full_name}#${pr.number}`);
  } catch (err) {
    console.error(`Failed to process PR ${repo.full_name}#${pr.number}:`, err);
  }
});

const webhookMiddleware = webhooks ? createNodeMiddleware(webhooks) : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.url?.startsWith("/health")) {
    res.json({ status: "ok", version: "0.1.0" });
    return;
  }

  if (!webhookSecret || !webhookMiddleware) {
    res.status(503).json({ error: "GITHUB_WEBHOOK_SECRET is not configured" });
    return;
  }

  await webhookMiddleware(req, res);
}
