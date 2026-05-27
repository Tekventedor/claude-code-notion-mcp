# Scene timing — claude-code-notion-mcp

**Total**: ~55.0 s · 30 fps · 1650 frames · 1920 × 1080.

Maps each beat of `voiceover.md` Part 2 (the flowing read) to the scene it sits over, with the exact frame range so the VO can be timed precisely against the rendered video. `voiceover.md` Part 1 has the plain-English narrative for each scene — read that first to align with the video.

| # | id              | scene name                          | range        | dur     | maps to VO line |
|---|-----------------|--------------------------------------|--------------|---------|-----------------|
| 1 | s01-pivot       | Pivot                                | 0–90         | 3.0 s   | *"Claude Code now writes Notion."* |
| 2 | s02-demo        | Demo (terminal, 3 tool calls)        | 90–450       | 12.0 s  | *"In one session, Claude searches your workspace for a page, fetches its outline, and writes a brand-new page back…"* |
| 3 | s03-arch        | Architecture                          | 450–630      | 6.0 s   | *"Your prompt becomes a tool call. The hosted Notion MCP carries it to Notion…"* |
| 4 | s04-install     | Install (one-liner + OAuth flash)    | 630–870      | 8.0 s   | *"Setup is a single command. Add the MCP server, approve access in your browser…"* |
| 5 | s05-snapshot    | Snapshot magic                        | 870–1110     | 8.0 s   | *"What used to be a JSON blob in the terminal is now a real Notion page your team can edit."* |
| 6 | s06-flowhunt    | FlowHunt parallel path                | 1110–1410    | 10.0 s  | *"The same Notion MCP plugs into FlowHunt. Same OAuth, same tools, ready for scheduled flows."* |
| 7 | s07-cta         | CTA                                   | 1410–1650    | 8.0 s   | *"For the complete setup guide, head to the FlowHunt blog."* |

## Reading cadence

Target ~131 WPM end-to-end. Cadence varies by beat:
- Pivot: punchy, three words land hard.
- Demo: brisk and confident; "Three tool calls. One round-trip." should drop as a beat-pair on the synced narrator pill.
- Architecture: tight and technical.
- Install: step-by-step, slightly slower so each instruction lands.
- Snapshot: observational, almost a reveal.
- FlowHunt: matter-of-fact; this is a "and also" beat, not a new pitch.
- CTA: soft trail-off.

## Sync hits

Lines that should land on a specific visual moment:
- `writes Notion` lands as the gradient underline finishes drawing under `Notion.` (Scene 1, frame ~44).
- `Three tool calls` lands as the narrator pill appears in the bottom centre of Scene 2 (frame ~330).
- `Notion MCP carries it to Notion` lands as the top forward arrow's data dot reaches the rightmost node (Scene 3).
- `approve access in your browser` lands as the OAuth card pulses green (Scene 4, frame ~160).
- `real Notion page` lands as the right-pane Capability Demo Summary card hits full opacity (Scene 5).
- `same OAuth` lands as the **Allow access** button on the page-picker pulses (Scene 6, frame ~110 of scene-local).
- `scheduled flows` lands as the "✓ Integrated" badge floats in (Scene 6, frame ~180 of scene-local).
- The closing `FlowHunt blog` lands as the gradient CTA button pulses (Scene 7).
