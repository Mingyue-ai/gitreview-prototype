const { generatePRDescription } = require("../dist/claude");

const sampleDiff = `diff --git a/src/index.ts b/src/index.ts
index 1234567..abcdefg 100644
--- a/src/index.ts
+++ b/src/index.ts
@@ -10,6 +10,10 @@ const app = express();
 const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET;

+app.get("/health", (_req, res) => {
+  res.json({ status: "ok", version: "0.1.0" });
+});
+
 function requireWebhookSecret(
   _req: Request,
   res: Response,
diff --git a/src/claude.ts b/src/claude.ts
index 1234567..abcdefg 100644
--- a/src/claude.ts
+++ b/src/claude.ts
@@ -15,6 +15,8 @@ function truncateDiff(diff: string): string {
   if (diff.length <= MAX_DIFF_CHARS) return diff;
   const snippet = diff.slice(0, MAX_DIFF_CHARS);
   const lastNewline = snippet.lastIndexOf("\\n");
+  if (lastNewline === -1) return snippet + "\\n\\n... (diff truncated)";
   return snippet.slice(0, lastNewline) + "\\n\\n... (diff truncated)";
 }

diff --git a/package.json b/package.json
index 1234567..abcdefg 100644
--- a/package.json
+++ b/package.json
@@ -11,6 +11,7 @@
   "dependencies": {
     "@anthropic-ai/sdk": "^0.24.0",
     "@octokit/auth-app": "^8.2.0",
+    "@octokit/rest": "^20.1.0",
     "@octokit/webhooks": "^13.2.0",
     "express": "^4.19.2"
   },`;

async function main() {
  console.log("Running GitReview local demo...\n");
  const description = await generatePRDescription({
    title: "Add health check and harden diff truncation",
    body: "Small reliability improvements ahead of the first deployment.",
    diff: sampleDiff,
  });
  console.log(description);
}

main().catch((err) => {
  console.error("Demo failed:", err);
  process.exit(1);
});
