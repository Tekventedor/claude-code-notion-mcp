# Scene timing — claude-code-notion-mcp

**Total**: 66.5 s · 30 fps · 1995 frames · 1920 × 1080.

Maps each paragraph of `voiceover.md` Part 2 (the flowing read) to the scene it sits over, with the exact absolute frame range. `voiceover.md` Part 1 has the plain-English narrative — read that first to align with the video.

| # | id                  | scene name                                    | range        | dur     | maps to VO line |
|---|---------------------|------------------------------------------------|--------------|---------|-----------------|
| 1 | s1-pivot            | Pivot                                          | 0–105        | 3.5 s   | *"The Notion MCP is now inside Claude Code."* |
| 2 | s2-install          | Install (terminal + OAuth split)               | 105–345      | 8.0 s   | *"Setup is one command. Add the MCP server, approve the Notion handshake…"* |
| 3 | s3-arch             | Architecture (MCP-inside-Claude-Code box)      | 345–525      | 6.0 s   | *"Your prompt travels through Claude Code, calls the Notion MCP…"* |
| 4 | s4-demo             | Demo (terminal: search → fetch → create)       | 525–795      | 9.0 s   | *"Three tool calls in one session: Claude searches your workspace…"* |
| 5 | s5a-fh-marketplace  | FlowHunt · Integrations marketplace            | 795–885      | 3.0 s   | *"The same MCP also plugs into FlowHunt."* |
| 6 | s5b-fh-toolcatalog  | FlowHunt · Tool catalog (scrolling)            | 885–1035     | 5.0 s   | *"All twenty-one Notion tools land in your agent automatically."* |
| 7 | s5c1-fh-chat1       | FlowHunt · Chat (turns 1–2)                    | 1035–1335    | 10.0 s  | *"Ask the agent what it can do. It enumerates every Notion capability…"* |
| 8 | s5c2-fh-chat2       | FlowHunt · Chat (turns 3–4) + Notion morph     | 1335–1725    | 13.0 s  | *"Then ask it to build something. The agent creates a summary page, adds your follow-ups, and you watch the page rewrite itself, line by line."* |
| 9 | s6-cta              | CTA                                            | 1725–1995    | 9.0 s   | *"One MCP. Two surfaces. The complete guide is on flowhunt dot i-o slash blog."* |

## Reading cadence

Target ~136 WPM end to end. Cadence varies by beat:
- **Pivot**: punchy, three beats land hard ("Notion · inside · Claude Code").
- **Install**: step-by-step, slightly slower so each instruction lands.
- **Architecture**: tight, slightly technical, follow the dot's travel across the line.
- **Demo**: brisk and confident; "three tool calls" lands on the narrator pill.
- **FH-Marketplace + Tool catalog**: matter-of-fact, this is an "and also" moment.
- **FH-Chat 1 + 2**: conversational pace, match the speed of the user prompts appearing.
- **CTA**: soft trail-off.

## Sync hits

Lines that should land on a specific visual moment:

- `inside Claude Code` lands as the gradient underline finishes drawing under "Claude Code." in Scene 1.
- `approve the Notion handshake` lands as the OAuth card's Continue button pulses green (Scene 2).
- `Notion answers back` lands as the dot completes its journey to the right node (Scene 3).
- `three tool calls` lands as the narrator pill fades in at the bottom of Scene 4.
- `plugs into FlowHunt` lands as the Notion tile's Integrate button glows in Scene 5.
- `twenty-one Notion tools` lands as the catalog scroll passes the midpoint (Scene 6).
- `enumerates every Notion capability` lands as Turn 1's 5-bullet reply finishes appearing (Scene 7).
- `creates a summary page` lands as the Notion side panel slides in from the right and morphs to "Capability Demo Summary" (Scene 8).
- `One MCP, one OAuth, two surfaces` lands as the eyebrow "ONE SETUP · TWO SURFACES" fades in (Scene 9).
- The closing `FlowHunt blog` lands as the gradient CTA button pulses (Scene 9).
