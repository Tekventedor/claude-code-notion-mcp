# Screenshots — claude-code-notion-mcp

Save every PNG into this project directory with the exact filename below. The blog references each filename verbatim via `{{< lazyimg src="..." >}}`; any drift produces a broken image.

| # | Filename | What's on screen | Where it appears in the blog | Aspect / framing |
|---|---|---|---|---|
| 1 | `claude-code-notion-mcp-oauth.png` | Notion OAuth consent screen. Workspace selector visible; parent-page picker visible; **Allow access** button visible. | "Setting up the integration in Claude Code" | 16:9, browser chrome cropped to just the dialog |
| 2 | `claude-code-notion-mcp-mcp-list.png` | Claude Code terminal showing `/mcp` output with `notion` listed as `connected` and a tool count of `18`. | "Verifying the connection" | 16:9, terminal full-width |
| 3 | `claude-code-notion-mcp-search.png` | Terminal frame showing the `⏺ notion - notion-search(...)` call line AND the `⎿  ` result line in the same image, with three pages in the result. | "Worked example → Prompt 1 — search" | 16:9, capture must include both call + result |
| 4 | `claude-code-notion-mcp-fetch.png` | Terminal showing `⏺ notion - notion-fetch(...)` plus the page-outline result (headings + first sentences). | "Worked example → Prompt 2 — fetch" | 16:9, both call + result visible |
| 5 | `claude-code-notion-mcp-create.png` | Terminal showing `⏺ notion - notion-create-pages(...)` plus the result containing the new page's URL. | "Worked example → Prompt 3 — write" | 16:9, the new page URL must be readable |
| 6 | `claude-code-notion-mcp-flowhunt.png` | FlowHunt **Settings → MCP Servers** panel showing **Notion** connected with its tool count. | "Using the Notion MCP in FlowHunt" | 16:9, FlowHunt UI only |

## Capture rules

- **Both call + result.** Screenshots 3, 4, 5 must show the `⏺` invocation line AND the `⎿` result line in the same frame. If the terminal wrapped, scroll up before snipping.
- **One session.** Capture all six in a single working session so page titles, IDs, and timestamps stay consistent across the set.
- **Redact.** Skim each PNG for emails, teammate names, customer-named pages. Replace or blur before publishing.
- **Consistent chrome.** Same terminal theme on screenshots 2-5. For 1 and 6, hide the bookmarks bar and close personal tabs.
- **No bookmarks bar.** Browser captures (1 and 6) should have the bookmarks bar hidden and no extension icons visible.
