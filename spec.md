# claude-code-notion-mcp — scene spec

**Total**: ~55.0 s · 30 fps · 1650 frames · 1920 × 1080 · FlowHunt palette · Inter + JetBrains Mono.

Scenes are contiguous; no cross-scene cuts inside a scene's `endFrame`. FlowHunt watermark on every scene via `scene()` builder. No em dashes in copy. **Workspace name on screen is the generic "Your Workspace"; page titles "Notion AI capability demo draft" and "The Notion Basics" are real.** The Claude Code terminal demo is a synthesized successful run (the real session stalled at OAuth); the FlowHunt sequence is reconstructed from real screenshots.

| # | id | name | range | dur | role |
|---|---|---|---|---|---|
| 1 | s01-pivot       | Pivot | 0–90 | 3.0 s | Title card. "Claude Code now writes Notion." |
| 2 | s02-demo        | Demo (terminal) | 90–450 | 12.0 s | search → fetch → create-pages, three tool calls in Claude Code, real page IDs |
| 3 | s03-arch        | Architecture | 450–630 | 6.0 s | Pipeline diagram: You → Claude Code → Notion MCP → Notion |
| 4 | s04-install     | Install (one-liner + OAuth flash) | 630–870 | 8.0 s | `claude mcp add` terminal then Notion MCP consent card |
| 5 | s05-snapshot    | Snapshot magic | 870–1110 | 8.0 s | Raw `notion-search` JSON vs rendered "Capability Demo Summary" page |
| 6 | s06-flowhunt    | FlowHunt parallel path | 1110–1410 | 10.0 s | Integrations search → OAuth picker → agent canvas → live `notion_search` |
| 7 | s07-cta         | CTA | 1410–1650 | 8.0 s | FlowHunt logo + blog title + button + URL |

## Scene 1 — Pivot (0–90)

Background `#FFFFFF`. Watermark below.

- **0–20** Headline fades in centred at y=480: `Claude Code now writes ` (`#111928`) `Notion.` (gradient `linear-gradient(90deg,#0084FF,#1A56DB)`), Inter 108 px / weight 800 / letter-spacing −2.
- **22–44** Underline draws under `Notion.` left→right, gradient bar 8 px tall (reference rendervid `examples/animations/draw-on.tsx`).
- **30–52** Subtitle fades in 40 px below: "Search a workspace, read a page, write a new one." Inter 30 px / 500 / `#6B7280`.
- **70–90** Hold + scene-out via fade (default 18 f).

## Scene 2 — Demo (90–450, scene-local 0–360)

Left pane (x 40 → 940): the user's Claude Code terminal. Right pane (x 980 → 1880): an animated Notion page card that materialises at the end. **All three tool calls are synthesized** because the real session stalled at OAuth; the page titles and IDs in the terminal are the user's real Notion data.

- **0–30** Terminal window slides in from x=40 with fade. Window chrome (red/yellow/green dots, title `claude · notion MCP`).
- **34–80** Prompt 1 types in (typewriter ~16 chars/s): `Search my Notion workspace for the page "Notion AI capability demo draft" and return its ID.`
- **84–120** Tool call line types in: `⏺ notion - notion-search(query: "Notion AI capability demo draft")`, result `⎿  1 page · 36d0ad64...91f1f` (`#22C55E`).
- **128–170** Prompt 2 types in: `Fetch its outline.`
- **172–215** Tool call: `⏺ notion - notion-fetch(id: 36d0ad64...91f1f)`, result `⎿  4 headings · 12 blocks`. Below it, a small Markdown preview fades in showing the four real headings: Quick actions / Mini slide deck / Slide 1: Goal / Slide 2: Output types.
- **220–260** Prompt 3 types in: `Create "Capability Demo Summary" under the same parent.`
- **264–310** Tool call: `⏺ notion - notion-create-pages(...)`, result `⎿  ✓ Created  ·  7e22ad64...f073` in green, then the URL `notion.so/Capability-Demo-Summary` underlined in cyan.
- **80–360** Right pane: starts as a faint outline of a Notion page at frame 80, gains the page title "Notion AI capability demo draft" + the four headings at frame 180 (synced to the fetch), then at frame 270 morphs into a new card titled "Capability Demo Summary" with a callout, 3 bullets, and a 3-item checklist (reference `claude-code-notion-mcp-hero.svg` for the layout). Stays at full opacity from 290 to scene end.
- **330–360** Narrator pill, bottom centre: "Search · Fetch · Write. One round-trip."

## Scene 3 — Architecture (450–630, scene-local 0–180)

Pipeline diagram, 4 horizontally-laid nodes connected by gradient arrows.

- **0–25** Nodes fade in left to right with `easeBack`:
  1. **You** (terminal icon, label "Your prompt") at x=240
  2. **Claude Code** (small `>_` mark) at x=680
  3. **Notion MCP** (FH-blue card with the Notion `N` mark) at x=1180
  4. **Notion** (rounded card with the Notion glyph in black) at x=1620
- **30–80** Forward arrows draw between each pair (`#0084FF`, dasharray draw-in).
- **90–140** Return arrows draw underneath (`#475569`, dasharray draw-in). A small data dot loops left→right→left along the top forward path and bottom return path through scene end (reference `examples/animations/loop-dot.tsx`).
- **150–175** Three labels fade above the forward arrows: "prompt", "tool call", "Notion API". Three labels fade below the return arrows: "result", "Markdown", "page data".
- **170–180** Hold, then scene-out.

## Scene 4 — Install (630–870, scene-local 0–240)

A single full-bleed terminal with the install one-liner, then a brief OAuth flash.

- **0–20** Terminal window fades in centred (1280 × 360 panel).
- **24–80** Prompt `$ ` types in, then the literal command: `claude mcp add --transport http notion https://mcp.notion.com/mcp` (mono 22 px, syntax-coloured: `claude` `#22D3EE`, `mcp add` `#A78BFA`, flags `#FBBF24`, url `#22D3EE` underlined).
- **86–110** Result line fades in: `✓ Added MCP server "notion" (http, OAuth 2.1)` (`#22C55E`).
- **120–180** A small browser chrome card slides up from the bottom-right showing the Notion MCP consent screen at 60 % scale: header `Notion MCP · Connect with Notion MCP`, workspace pill "Your Workspace · Free Plan · 2 members", four access bullets (Respect your access · Take actions on your behalf · Search across connected apps · View workspace users), Continue button. Pulses green at frame 160. (Reconstructed from screenshot 21.11.53.)
- **190–240** Hold, then scene-out.

## Scene 5 — Snapshot magic (870–1110, scene-local 0–240)

The "before → after" payoff. Left half: the raw `notion-search` JSON (from the comparison SVG). Right half: the rendered "Capability Demo Summary" page in Notion's chrome.

- **0–25** Left pane fades in (dark terminal, JSON: `id: 36d0ad64...91f1f`, `title: "Notion AI capability demo draft"`, `last_edited: 2026-05-27T18:41:00Z`).
- **30–55** Right pane fades in (white Notion chrome, URL bar `notion.so/Capability-Demo-Summary`, page header, callout block "↪ Source: Notion AI capability demo draft", three bullets, three-item checklist).
- **70–110** A travelling highlight rectangle moves from the `id:` line in the left JSON across the gap and snaps onto the callout link in the new page on the right. Communicates: same data, two forms (reference `examples/animations/travelling-highlight.tsx`).
- **130–180** Stamp animates in over both panes: "From query to page." Inter 56 px gradient.
- **190–240** Hold, then scene-out.

## Scene 6 — FlowHunt parallel path (1110–1410, scene-local 0–300)

The "FlowHunt does this too" beat. Three sub-beats stitched as quick cards. Reconstructed from screenshots 20.41.28 → 20.41.51 → 20.34.31 → 20.40.21.

- **0–60** Sub-beat A — **Integrations search**. White FlowHunt chrome (sidebar + main panel). Search box types "notion", the Notion tile fades in mid-panel (`Integrate Notion to automate your note-taking…`), an **Integrate** button highlights at frame 50.
- **60–130** Sub-beat B — **OAuth picker**. Card crossfades to Notion's "Allow FlowHunt to access these pages" panel. Two real page rows tick on with a `✓` flick: `Notion AI capability demo draft` and `The Notion Basics`. **Allow access** button pulses green at frame 110.
- **130–200** Sub-beat C — **Agent canvas**. Card crossfades to the FlowHunt flow editor: Chat Input → AI Agent (with a row of Notion tool icons under it) → Chat Output. Tool icons cascade in from frame 140 (reference `examples/animations/cascade.tsx`). A "✓ Integrated" badge floats in at frame 180.
- **200–280** Sub-beat D — **Live tool call**. Card crossfades to a single chat message with `Using notion_search` expander, query `Notion AI capability demo draft`, result snippet `Page found · id 36d0ad64...91f1f` typing in as if streaming.
- **280–300** Hold, then scene-out.

## Scene 7 — CTA (1410–1650, scene-local 0–240)

End card. FlowHunt logo + blog title + button + URL.

- **0–22** FH gradient mark + "FlowHunt" wordmark fade in centred, y=320.
- **24–40** Thin divider expands underneath, 200 px wide.
- **38–60** Blog title fades in below: "How to Use Claude Code with " (`#111928`) "the Notion MCP" (gradient).
- **52–74** Subtitle "A complete setup guide" (`#6B7280`).
- **66–88** Pill CTA button fades in + scales from 0.9: gradient pill, "Read the guide →", arrow nudges right by 3 px on a sine.
- **100–124** URL `flowhunt.io/blog` fades in below.
- **224–240** Scene-out via fade (default 16 f).

## Constraints recap

- `output.duration * fps == 1650`. Verify on every build.
- Watermark layer at y=994, height 50, on every scene.
- No real screenshots embedded; recreate Notion + FlowHunt chrome inline with `React.createElement` so it can be animated.
- Workspace name = "Your Workspace" on screen. Page titles stay real.
- Source of truth: edit `build.mjs`, run `node build.mjs`, click Load in the playground.
