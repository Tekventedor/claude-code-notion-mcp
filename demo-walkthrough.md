# Notion MCP — Demo Walkthrough

Run this top to bottom in one sitting. Every command, every screenshot. Save screenshots into this directory with the **exact filenames** listed; the blog references them verbatim.

Three rules for clean captures:
1. **One session.** Run the whole thing in one go so page titles, IDs and timestamps stay consistent.
2. **Redact.** Skim each PNG for emails, teammates' full names, and customer-named pages before publishing.
3. **Consistent chrome.** Same terminal theme, same browser, bookmarks bar hidden, no personal tabs.

---

## Step 0 — Prerequisite: an active, verified Notion account

The Notion MCP is OAuth-only. The handshake fails silently or returns useless errors if you don't have a verified, signed-in Notion workspace.

1. Sign up at https://www.notion.com/signup (use the same email you can read mail at).
2. Verify the email Notion sends.
3. Create a workspace if prompted, and add at least one page with a small block of text and one database (a simple "Tasks" table works). The demo needs real content to search against.
4. In the **same browser** you'll use for the OAuth handshake, make sure you're signed in to Notion.

If you're on the free plan, all the demo prompts below work. The `notion-search` tool's third-party connector results require Notion AI access, and `notion-query-data-sources` needs Enterprise, but those aren't part of this demo.

---

## Step 1 — Install the Notion MCP server in Claude Code

In your terminal, from any directory:

```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

This registers the server in your **local** scope (current project only). If you want it available across every project on this machine, add `--scope user`:

```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp --scope user
```

---

## Step 2 — Start Claude Code and trigger the OAuth flow

```bash
claude
```

Inside Claude Code, run:

```
/mcp
```

You'll see `notion` listed as `needs-auth` (or similar). Select it and follow the OAuth link Claude Code prints. Your browser opens a Notion authorization page asking which workspace and which pages to grant access to.

Pick your demo workspace, grant access to a parent page that contains your tasks/notes, and click **Allow access**.

> **Screenshot:** save the Notion consent screen as `claude-code-notion-mcp-oauth.png`.

Return to the terminal; Claude Code will confirm the connection.

---

## Step 3 — Restart the session and verify

Exit Claude Code (Ctrl-D or `exit`), then restart:

```bash
claude
```

Inside the session, run:

```
/mcp
```

You should see `notion` with status `connected` and a count of tools (18 at time of writing).

> **Screenshot:** save the `/mcp` output showing `notion` connected as `claude-code-notion-mcp-mcp-list.png`. Make sure the tool count is visible in the frame.

---

## Step 4 — Worked example, prompt 1: search the workspace

In Claude Code, paste this prompt verbatim:

```
Use the Notion MCP to search my workspace for pages mentioning "roadmap" or "Q3 planning". Return the top three results with their page IDs and a one-sentence summary of each.
```

Claude Code will call `notion-search`. Wait for the result.

> **Screenshot:** capture the **full tool-call frame** — both the `⏺ notion - notion-search(...)` line AND the `  ⎿  ` result line in the same image. Scroll up before capturing if the terminal wrapped. Save as `claude-code-notion-mcp-search.png`.

Copy the page IDs back here — you'll need one in Step 6.

---

## Step 5 — Worked example, prompt 2: fetch a page

Pick one of the page IDs from Step 4 (or a page URL from your workspace) and paste:

```
Fetch the full contents of Notion page <PAGE_ID_OR_URL_FROM_STEP_4> and give me a structured outline: headings, any database blocks, and the first sentence under each heading.
```

Claude Code calls `notion-fetch`.

> **Screenshot:** capture the `⏺ notion - notion-fetch(...)` call and result. Save as `claude-code-notion-mcp-fetch.png`.

---

## Step 6 — Worked example, prompt 3: create a new page

```
Using what you just read, create a new Notion page titled "Sprint Sync Notes — <today's date>" under the same parent page. Include a Markdown summary of the outline (3 bullets), a checklist of three follow-ups, and a callout block at the top with the source page link.
```

Claude Code calls `notion-create-pages`.

> **Screenshot:** capture the `⏺ notion - notion-create-pages(...)` call and the response with the new page's URL. Save as `claude-code-notion-mcp-create.png`.

Open the new page in Notion in your browser to confirm it landed correctly.

---

## Step 7 — (Optional) FlowHunt integration screenshot

Add the same MCP server URL to FlowHunt's MCP server settings (FlowHunt UI → Settings → MCP Servers → Add server → paste `https://mcp.notion.com/mcp` and configure the same OAuth). Once connected, FlowHunt workflows can call the same tools.

> **Screenshot:** capture the FlowHunt MCP server settings panel showing Notion connected. Save as `claude-code-notion-mcp-flowhunt.png`.

---

## Step 8 — (Optional) Cleanup

If the demo pages are clutter, delete them in Notion (Move to Trash) so your workspace stays tidy. To remove the MCP server from Claude Code:

```bash
claude mcp remove notion
```

---

## Step 9 — Paste back to me

When you're done, paste back into chat:

1. The three page titles + IDs from Step 4's search results.
2. The fetched page's outline structure (headings) from Step 5.
3. The created page's URL from Step 6.
4. Any error you hit and what fixed it.

I'll find-and-replace every `<...>` placeholder in the blog draft with those real strings, then scaffold the rendervid promo.
