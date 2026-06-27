# GitReview Validation Plan

## Goal

Validate whether engineering teams will pay for an AI-powered PR Assistant before committing to the full MVP build.

## Go/No-Go Criteria

- **Go:** 3+ of 10 teams signal willingness to pay $19/user/month.
- **No-Go:** Fewer than 3 teams signal willingness to pay → park GitReview and pivot.

## Validation method

Public deployment is blocked by missing GitHub/hosting credentials (tracked in [MIN-6](/MIN/issues/MIN-6)), so Week 2 will validate with a **local demo + recorded output** rather than a live install.

### What we show
- [`demo-output.md`](./demo-output.md): a sample AI-generated PR description.
- [`DEPLOYMENT.md`](./DEPLOYMENT.md): one-click deployment runbook.
- [`gitreview-prototype.zip`](./gitreview-prototype.zip): the prototype source.

### What we ask
- 15-minute feedback call.
- Three questions:
  1. Does your team spend noticeable time writing PR descriptions?
  2. Would an AI-generated first draft save meaningful time?
  3. At $19/user/month, would you pay for this after a free trial?

## Candidate projects

| # | Repository | Why target | Est. stars | Maintainer / team | Best contact path | Outreach angle |
|---|------------|-----------|------------|-------------------|-------------------|----------------|
| 1 | [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | AI dev-tool builder, understands AI workflows | ~30k–35k | Org-led; active core team | GitHub Discussion | “You build AI dev tools — you know the pain of context-heavy PRs.” |
| 2 | [supermemoryai/supermemory](https://github.com/supermemoryai/supermemory) | Active AI project, small core team | ~22k–27k | Dhravya Shah / small team | GitHub issue or discussion | “Fast-moving AI repo with a small team; PR descriptions are easy to skip.” |
| 3 | [AIEraDev/Clypra](https://github.com/AIEraDev/Clypra) | Early-stage desktop video editor, PR-heavy TypeScript | ~2k | AIEraDev + small contributors | GitHub issue/discussion | “Early-stage product where every PR needs clear context for new contributors.” |
| 4 | [Kilo-Org/kilocode](https://github.com/Kilo-Org/kilocode) | AI coding agent, target user | ~24k | Org-led; `marius-kilocode` visible | GitHub Discussion | “Agentic coding platform with high PR velocity; auto-descriptions keep review load low.” |
| 5 | [tashfeenahmed/freellmapi](https://github.com/tashfeenahmed/freellmapi) | Active small dev tool | ~300 | Tashfeen Ahmed + contributors | GitHub issue/discussion | “Solo/small-team maintainer who directly feels PR overhead.” |
| 6 | [colbymchenry/codegraph](https://github.com/colbymchenry/codegraph) | Code intelligence tool, PR-heavy | ~40k–53k | Colby McHenry | GitHub issue/discussion | “Code intelligence tool with rapid growth; clear PRs help onboard contributors.” |
| 7 | [Egonex-AI/Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) | AI understanding tool, active community | ~63k–67k | Egonex org; Lum1104 origin | GitHub Discussion | “Large active community where reviewer context is expensive.” |
| 8 | [honojs/hono](https://github.com/honojs/hono) | Active framework, many PRs | ~31k | Yusuke Wada / core team | Discord or GitHub Discussion | “High-velocity framework with many external PRs; first-draft descriptions save maintainer time.” |
| 9 | [mastra-ai/mastra](https://github.com/mastra-ai/mastra) | Active AI framework | ~23k–25k | Mastra AI team (Gatsby/YC alumni) | Discord or GitHub Discussion | “TypeScript AI framework with strong distribution; ideal design partner.” |
| 10 | [Effect-TS/effect](https://github.com/Effect-TS/effect) | Active TypeScript ecosystem | ~15k | Effect core team / Michael Arnaldi | Discord or GitHub Discussion | “Complex TypeScript ecosystem where PRs need rich context for the community.” |

*Star counts are estimates from recent web snapshots; verify live numbers before outreach.*

## Outreach message

### Subject
Quick feedback on an AI PR-description tool

### Body
```
Hi [maintainer name],

I'm building GitReview, an AI-powered PR Assistant that auto-generates clear PR descriptions from diffs. I came across [repo name] and thought your team might be a good fit.

We're running a 1-week free pilot with engineering teams in exchange for a 15-minute feedback call. No code changes required — I can share a demo output from one of your recent PRs if you're open to it.

If this sounds useful, reply and we'll schedule a call.

Best,
[Name]
CEO, GitReview
```

## Tracker

| Project | Contact | Outreach sent | Call scheduled | Willing to pay? | Notes |
|---------|---------|---------------|----------------|-----------------|-------|
| CopilotKit | | | | | |
| supermemory | | | | | |
| Clypra | | | | | |
| kilocode | | | | | |
| freellmapi | | | | | |
| codegraph | | | | | |
| Understand-Anything | | | | | |
| hono | | | | | |
| mastra | | | | | |
| effect | | | | | |

## Execution checklist

- [ ] Board approves outreach approach and provides contact channel (email/GitHub account).
- [ ] Personalize each message with repo-specific angle and maintainer name.
- [ ] Send outreach to 10 projects.
- [ ] Schedule 15-minute feedback calls.
- [ ] Record answers to the three questions.
- [ ] Score willingness-to-pay signals.
- [ ] Decide Go/No-Go and report back.

## Next step

Awaiting board approval of this outreach plan and a contact channel (email or GitHub account). Once approved, I will begin personalized outreach in the next heartbeat.
