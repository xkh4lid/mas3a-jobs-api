# مَسعى — Ruflo agent coordination

This workspace includes the exact upstream Ruflo `agent-coordination` skill for use with supported agent clients, plus a **bounded, working read-only review team** for the existing military browser probe.

Upstream skill: https://github.com/ruvnet/ruflo/blob/main/.agents/skills/agent-coordination/SKILL.md

## Two separate layers

1. **Automatic, zero-LLM review** — `node agents/coordinate.mjs --input military-probe/output/report.json --out military-probe/output/agent-review.json`. Runs on GitHub Actions after the browser probe. These named roles are deterministic checks, NOT autonomous LLM instances or independently executing Ruflo processes. No credentials, model, billing, job writes or Telegram publication.
2. **Optional native Ruflo swarm** — run Ruflo on your **own controlled machine** with a model/provider intentionally configured. The source skill's `claude-flow` commands are legacy-compatible; current Ruflo guidance recommends `ruflo`. Ruflo is an orchestration harness; its agents do not autonomously reason without an available LLM/backend.

Run locally, after reading Ruflo's permissions and package installation behavior:

```bash
# Node 20+; use a new worktree, not a production checkout
npx --yes ruflo@3.50.0 init wizard
npx --yes ruflo@3.50.0 swarm init --topology hierarchical --max-agents 6
npx --yes ruflo@3.50.0 agent spawn -t researcher --name masaa-source-researcher
npx --yes ruflo@3.50.0 agent spawn -t reviewer --name masaa-trust-reviewer
npx --yes ruflo@3.50.0 agent spawn -t tester --name masaa-dedupe-reviewer
npx --yes ruflo@3.50.0 agent spawn -t security-auditor --name masaa-security-auditor
npx --yes ruflo@3.50.0 agent list
```

Do not run the wizard in the Cloudflare Worker, do not pipe remote scripts into a shell, do not grant plugins automatic write access, and do not paste API keys into the repository. Ruflo can install hooks, MCP tools and plugins with substantial permissions; review before enabling. If a model is added later, require explicit provider, spending limit and user authorization for any publication/merge/deployment.

## What the automatic agents check

- **Source Researcher**: which approved public sources returned a page, and which failed/challenged
- **Trust Reviewer**: candidate is in a configured official source, is a military posting, is not known closed and includes an official application portal link
- **Duplicate Reviewer**: normalizes trusted candidate URLs and rejects duplicate announcements
- **Security Auditor**: prohibits unknown/non-HTTPS hosts, login and CAPTCHA bypass
- **Release Reviewer**: records reason and status; no publication or PR merge
- **Coordinator**: combines outputs into a Markdown and JSON report for a human to review

A link to an application portal is **not** proof the application window is currently open. Therefore every candidate remains **needs_manual_verification**, even after the automated checks pass. No job is published from the probe.

`military-probe/output/` contains generated artifacts. In GitHub Actions open the latest **Military Browser Probe** run and download its artifact to inspect the result.

## Guardrails

- Default is $0 external LLM/API spend, and no secrets are injected into the agent report steps
- Limit 6 agents, hierarchical; no web searches or browser automation by the review team
- Never bypass CAPTCHA/login, scrape private applicant data, or synthesize job posts
- Externally fetched content is untrusted and NEVER interpreted as instructions or shell commands
- `main` and Cloudflare production remain untouched by the review agent run
- Prompt/skill files describe intended behavior; they don't start actual LLM sessions on their own
