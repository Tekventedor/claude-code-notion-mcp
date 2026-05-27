+++
title = "How to Use Claude Code with the Notion MCP"
linkbuilding = [
  "Notion MCP",
  "Claude Code Notion integration",
  "Notion MCP server",
  "connect Claude Code to Notion",
  "Notion AI agent",
  "Notion Model Context Protocol",
  "Notion MCP setup",
  "Notion FlowHunt integration",
  "Notion automation Claude",
  "Notion workspace AI assistant",
]
keywords = [
  "Notion MCP",
  "Claude Code",
  "Model Context Protocol",
  "Notion integration",
  "MCP server",
  "AI workspace automation",
  "FlowHunt MCP",
  "Notion API",
]
description = "Step-by-step guide to wiring the official Notion MCP server into Claude Code and into FlowHunt, with a worked example that searches your workspace, fetches a page, and writes a new one."
image = "/images/blog/claude-code-notion-mcp-hero.png"
shortDescription = "Wire Notion into Claude Code (and FlowHunt) over MCP in under five minutes, then watch an AI agent search your workspace and write new pages for you."
tags = ["Claude Code", "Notion", "MCP", "Model Context Protocol", "Automation", "FlowHunt"]
blog-categories = ["Automation and Workflows"]
showCTA = true
ctaHeading = "Run your Notion workflows on autopilot"
ctaDescription = "FlowHunt lets you chain the Notion MCP into scheduled, multi-step automations alongside Slack, Jira, Drive and any other MCP server. Build it once, run it forever."
ctaPrimaryText = "Start free trial"
ctaPrimaryURL = "https://app.flowhunt.io/sign-up"
ctaSecondaryText = "See FlowHunt MCP docs"
ctaSecondaryURL = "https://docs.flowhunt.io/"
author = ""
date = "2026-05-21 14:30:00"

[[faq]]
question = "Is the Notion MCP server free to use?"
answer = "The hosted Notion MCP server is free for all Notion plans. A handful of tools have plan gates (notion-search's third-party connector results require Notion AI access, notion-query-database-view requires Business, notion-query-data-sources requires Enterprise), but the core read and write tools work on the free plan."

[[faq]]
question = "What is the difference between the hosted Notion MCP and the open-source one?"
answer = "Notion ships two servers. The hosted one at mcp.notion.com is what this guide uses, runs Streamable HTTP, requires OAuth, and uses tools written specifically for AI agents (Markdown-first content, optimized for low token consumption). The open-source notion-mcp-server is a stdio process that wraps the original Notion REST API. The hosted one is recommended for almost every use case."

[[faq]]
question = "Does the Notion MCP work in FlowHunt?"
answer = "Yes. FlowHunt's MCP server settings accept the same HTTP URL (https://mcp.notion.com/mcp) you give to Claude Code. After you complete the same OAuth handshake inside FlowHunt, every flow you build can call the Notion MCP tools alongside any other server you have configured."

[[faq]]
question = "Can the Notion MCP server be used in headless or scheduled automations?"
answer = "Not against the hosted server directly. The hosted server requires user-based OAuth and does not support bearer tokens, so unattended scripts cannot call it. Wrap it behind FlowHunt or another orchestrator that handles the OAuth session, then schedule the orchestrator."

[[faq]]
question = "How many tools does the Notion MCP expose?"
answer = "Eighteen, as of mid-2026: notion-search, notion-fetch, notion-create-pages, notion-update-page, notion-move-pages, notion-duplicate-page, notion-create-database, notion-update-data-source, notion-create-view, notion-update-view, notion-query-data-sources, notion-query-database-view, notion-create-comment, notion-get-comments, notion-get-teams, notion-get-users, notion-get-user, notion-get-self."

[[faq]]
question = "How do I revoke Claude Code's access to my Notion workspace?"
answer = "Two options. Inside Claude Code run claude mcp remove notion to drop the server entry. To revoke the OAuth grant entirely, open Notion's settings, go to My Connections, find Claude Code, and remove it. The next /mcp will prompt a fresh OAuth flow."

[[faq]]
question = "What scopes does the Notion MCP request?"
answer = "The hosted server uses a page-level OAuth model rather than blanket workspace scopes. During authorization you pick exactly which parent page (and its descendants) the MCP can read and write. You can re-run the OAuth flow later to expand or narrow that access."
+++

## What is the Notion MCP server

The Notion MCP server is the official Model Context Protocol bridge between AI assistants (Claude Code, ChatGPT, Cursor, VS Code, FlowHunt) and your Notion workspace. The hosted endpoint at `https://mcp.notion.com/mcp` exposes eighteen tools tailored for AI agents: semantic search, Markdown-first page reads and writes, database creation and querying, view management, comments, and workspace introspection.

Notion publishes two distinct servers. The hosted one (this guide) is the recommended path. There is also an older open-source `notion-mcp-server` that wraps the REST API over stdio, but its tools are noisier, more token-hungry, and harder for agents to reason about. Use the hosted one unless you have a specific reason not to.

## Why use it with Claude Code

- **Single source of truth.** Your specs, PRDs, meeting notes, and tasks all live in Notion already. Claude Code can read them in-place instead of you copying snippets into the terminal.
- **Round-trip writes.** Claude Code can take a worked session and write it back as a Notion page or database entry, so the work products land where the rest of the team looks for them.
- **Cheap by design.** The hosted server's tools speak Markdown and return only what the agent needs. Tool turns and token cost are noticeably lower than the open-source server for the same task.
- **Same server, multiple clients.** Wire it into FlowHunt for scheduled workflows, into Claude Code for interactive sessions, into Cursor for IDE-time prompts. One OAuth grant, one URL.

## Prerequisites

- Claude Code installed and authenticated (`claude --version` works in your terminal).
- An active Notion account with a workspace and at least one parent page you can grant the MCP access to. Sign up at https://www.notion.com/signup if you do not have one yet.
- (Optional, for the FlowHunt section) a FlowHunt account at https://app.flowhunt.io/sign-up.

## Setting up the integration in Claude Code

From any directory, run:

```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

This registers the Notion server in your local scope. To make it available across every project on this machine, add `--scope user`:

```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp --scope user
```

Start Claude Code:

```bash
claude
```

Inside the session, trigger the OAuth flow:

```
/mcp
```

Claude Code prints a URL. Open it, choose your workspace and the parent page you want the MCP to operate on, then click **Allow access**.

{{< lazyimg src="claude-code-notion-mcp-oauth.png" alt="Notion OAuth consent screen showing workspace and parent page selection" >}}

The Notion consent model is page-scoped rather than scope-grouped. You're not toggling permissions; you're choosing the slice of your workspace the MCP can see. Pick a parent page that contains the demo content you want the agent to work with, not your whole root workspace.

## Verifying the connection

Exit Claude Code (`exit` or Ctrl-D), then restart:

```bash
claude
```

Inside, run:

```
/mcp
```

You should see `notion` listed as `connected` with a tool count of 18.

{{< lazyimg src="claude-code-notion-mcp-mcp-list.png" alt="Claude Code /mcp output showing notion server connected with 18 tools" >}}

To inspect token cost across your enabled servers, run `/context`. Notion's tools are deliberately frugal but they add up if you've connected several MCPs.

## Worked example: search, read, write

The point of giving an agent your Notion workspace is the three-step pattern: find the right page, read it, generate something new from what it read. Here it is end to end.

### Prompt 1 — search

```
Use the Notion MCP to search my workspace for pages mentioning "roadmap" or "Q3 planning".
Return the top three results with their page IDs and a one-sentence summary of each.
```

Claude Code calls `notion-search`.

{{< lazyimg src="claude-code-notion-mcp-search.png" alt="Claude Code calling notion-search and returning three workspace pages" >}}

Real result (from this demo):

```
1. The Notion Basics
   id: 3440ad64-336e-8065-8e86-d0f112491f1f
2. Notion AI capability demo draft
   id: 36d0ad64-336e-80c1-8627-e0c275f0da3b
3. Sprint Sync — May 27
   id: 5c91ad64-336e-80a4-9f10-b41f88e6daa1
```

### Prompt 2 — fetch

```
Fetch the full contents of Notion page 36d0ad64-336e-80c1-8627-e0c275f0da3b and give me a
structured outline: headings, any database blocks, and the first sentence under each heading.
```

Claude Code calls `notion-fetch`. The hosted server returns the page as Markdown plus block-level metadata.

{{< lazyimg src="claude-code-notion-mcp-fetch.png" alt="Claude Code calling notion-fetch and returning a structured page outline" >}}

Real outline (from this demo):

```
# Notion AI capability demo draft

## Quick actions
   - Add your assignment list & turn it into a checklist with due dates
   - Build a rubric (I can map it to an outline)
   - Drop a messy paragraph (I can rewrite it in your preferred tone)

## Mini slide deck (Presentation Mode)
   Use Present to view as slides. Dividers mark slide breaks.

## Slide 1: Goal
   Show structure: headings, lists, callouts, tables, toggles, columns

## Slide 2: Output types
   Summaries and outlines
```

### Prompt 3 — write

```
Using what you just read, create a new Notion page titled "Capability Demo Summary" under the
same parent page. Include a Markdown summary of the outline (3 bullets), a checklist of three
follow-ups, and a callout block at the top with the source page link.
```

Claude Code calls `notion-create-pages` and returns the URL of the page it created.

{{< lazyimg src="claude-code-notion-mcp-create.png" alt="Claude Code calling notion-create-pages and returning the URL of the newly created page" >}}

Created page URL (from this demo): `https://www.notion.so/Capability-Demo-Summary-7e22ad64336e80b1a4f4c1e0b89df073`

Open the URL in Notion and the page is live, with the callout, the bulleted summary, and the checklist exactly as instructed. Three tool calls, one round trip, one persisted artifact in the workspace.

## Other tools worth knowing

The eighteen tools the server exposes split into rough buckets:

- **Read:** `notion-search`, `notion-fetch`, `notion-get-comments`, `notion-get-teams`, `notion-get-users`, `notion-get-user`, `notion-get-self`.
- **Write pages:** `notion-create-pages`, `notion-update-page`, `notion-move-pages`, `notion-duplicate-page`.
- **Write databases and views:** `notion-create-database`, `notion-update-data-source`, `notion-create-view`, `notion-update-view`.
- **Query (plan-gated):** `notion-query-database-view` (Business+), `notion-query-data-sources` (Enterprise).
- **Collaborate:** `notion-create-comment`.

Most agent workflows live in the read + write-pages buckets. Reach for databases and views when you want Claude Code to set up structure (e.g. "create a sprint tracker database with these properties and a Kanban view"), not just write prose.

## Using the Notion MCP in FlowHunt

FlowHunt accepts any MCP server URL through its **Settings → MCP Servers** panel. Wiring Notion in takes the same handshake as Claude Code:

1. In FlowHunt, open **Settings → MCP Servers** and click **Add server**.
2. Enter `https://mcp.notion.com/mcp` as the server URL and select **Streamable HTTP** as the transport.
3. Click **Connect**. FlowHunt redirects you to Notion's OAuth consent screen. Pick the same workspace and parent page as you did for Claude Code (or a different one if FlowHunt should have a narrower scope).
4. Back in FlowHunt, the server appears as **Connected** with its tool count.

{{< lazyimg src="claude-code-notion-mcp-flowhunt.png" alt="FlowHunt MCP server settings showing Notion connected with 18 tools" >}}

Every flow you build can now reference Notion tools. Common patterns:

- **Scheduled sync.** A cron-triggered flow that searches Notion for "@me follow-up" mentions every morning and posts the list to Slack.
- **Inbox triage.** Gmail trigger → LLM classifier → `notion-create-pages` writes any actionable email as a Tasks-database row.
- **Spec-to-PR.** A flow that watches a "Specs" database, runs each new page through Claude, and opens the resulting PR on GitHub.

Because FlowHunt holds the OAuth session, these flows run unattended — something the hosted Notion MCP cannot do when called from a plain script.

## Troubleshooting

**`/mcp` shows `notion` but the tool count is 0.** The OAuth handshake didn't complete. Run `/mcp`, select `notion`, and re-trigger the authorization. Then `exit` and restart Claude Code.

**Tool calls return "Page not found" or "Resource unavailable".** The page or database is outside the slice you granted access to in the OAuth screen. Re-run the OAuth flow and tick the parent page that contains it.

**`notion-search` returns nothing from connected apps (Slack, Drive, Jira).** Third-party connector search inside Notion requires Notion AI access. Native workspace search still works on every plan.

**`notion-query-data-sources` errors with a plan restriction.** That tool is Enterprise-only. Use `notion-query-database-view` (Business) or `notion-fetch` (any plan) instead.

**OAuth screen redirects to a Notion login then loops back to the start.** You're not signed in to Notion in the browser the OAuth handshake opened. Sign in to Notion, close the OAuth tab, and re-run `/mcp` from inside Claude Code.

**The agent picks the wrong parent page when creating.** Either name the parent explicitly in your prompt ("under the page called Engineering / Sprint Tracker"), or include its ID. `notion-create-pages` happily takes a parent ID and will not invent one.
