// Builds template.json from inline React component source below.
// Edit a scene, re-run `node build.mjs`, click Load again in the playground.

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { CLAUDE_ICON } from './assets.mjs';
const __dirname = dirname(fileURLToPath(import.meta.url));

const FPS = 30;
// Order: Pivot → Install → Arch → Demo → FH Marketplace → FH Tool Catalog → FH Chat1 → FH Chat2 → FH Result → CTA.
const F = {
  pivot:     { start: 0,    end: 105,  dur: 105 },  // 3.5s
  install:   { start: 105,  end: 345,  dur: 240 },  // 8s
  arch:      { start: 345,  end: 525,  dur: 180 },  // 6s
  demo:      { start: 525,  end: 795,  dur: 270 },  // 9s
  fhMarket:  { start: 795,  end: 885,  dur: 90  },  // 3s   — Phase A integrations marketplace
  fhCatalog: { start: 885,  end: 1035, dur: 150 },  // 5s   — was 6s; faster scroll, ends sooner
  fhChat1:   { start: 1035, end: 1335, dur: 300 },  // 10s  — turns 1 & 2 (extended +2s for reading)
  fhChat2:   { start: 1335, end: 1635, dur: 300 },  // 10s  — turns 3 & 4 + Notion-from-right (extended +1s, no result scene)
  cta:       { start: 1635, end: 1905, dur: 270 },  // 9s
};
const TOTAL_FRAMES = 1905;
const TOTAL_SECONDS = TOTAL_FRAMES / FPS;

const HELPERS = `var R=React.createElement;var cl=function(x){return Math.max(0,Math.min(1,x));};var ease=function(t){return 1-Math.pow(1-t,3);};var easeIn=function(t){return t*t*t;};var easeInOut=function(t){return t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;};var easeBack=function(t){var c1=1.70158;var c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2);};var lerp=function(a,b,t){return a+(b-a)*t;};var grad='linear-gradient(90deg,#0084FF,#1A56DB)';var INTER="Inter,system-ui,sans-serif";var MONO='"JetBrains Mono",ui-monospace,Menlo,monospace';var CLAUDE_ICON_URI='${CLAUDE_ICON}';function NotionMark(size,color){return R('svg',{width:size,height:size,viewBox:'0 0 100 100'},R('path',{d:'M16 18 L16 84 L26 84 L26 38 L72 84 L84 84 L84 18 L74 18 L74 64 L26 18 Z',fill:color||'#111928'}));}function BriefcaseIcon(size,color){return R('svg',{width:size,height:size,viewBox:'0 0 24 24',fill:'none'},R('rect',{x:3,y:7,width:18,height:13,rx:2,fill:color||'#A0522D'}),R('path',{d:'M8 7 V5 a2 2 0 0 1 2-2 h4 a2 2 0 0 1 2 2 V7',stroke:color||'#7C3E1A',strokeWidth:1.5,fill:'none'}),R('rect',{x:3,y:11,width:18,height:2,fill:'rgba(0,0,0,0.18)'}));}function SectionLabel(text){return R('div',{style:{position:'absolute',left:'24px',top:'12px',fontSize:'11px',fontWeight:600,color:'#9CA3AF',fontFamily:'"JetBrains Mono",ui-monospace,Menlo,monospace',letterSpacing:'0.4px',opacity:0.55,zIndex:99,pointerEvents:'none'}},text);}function GitHubMark(size){return R('svg',{width:size,height:size,viewBox:'0 0 16 16',fill:'#FFFFFF'},R('path',{d:'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z'}));}function SlackMark(size){return R('svg',{width:size,height:size,viewBox:'0 0 24 24'},R('rect',{x:2,y:10,width:8,height:4,rx:2,fill:'#36C5F0'}),R('rect',{x:14,y:10,width:8,height:4,rx:2,fill:'#2EB67D'}),R('rect',{x:10,y:2,width:4,height:8,rx:2,fill:'#ECB22E'}),R('rect',{x:10,y:14,width:4,height:8,rx:2,fill:'#E01E5A'}));}function DriveMark(size){return R('svg',{width:size,height:size,viewBox:'0 0 24 24'},R('path',{d:'M7.5 3 L16.5 3 L23 14 L14 14 Z',fill:'#FFD04B'}),R('path',{d:'M7.5 3 L1 14 L5.5 22 L12 11 Z',fill:'#1FA463'}),R('path',{d:'M14 14 L23 14 L18.5 22 L9.5 22 Z',fill:'#3777E3'}));}`;

const FH_MARK_PATH = 'M36.369 175.282L24.2163 203.986C22.1071 208.969 23.073 214.948 27.1337 219.014C29.8048 221.688 33.3037 223.02 36.8027 223.02C40.3016 223.02 43.8006 221.688 46.4716 219.014L58.023 207.449L101.627 163.787C103.647 161.764 102.218 158.32 99.3599 158.32H74.5815C74.4336 158.32 74.2858 158.3 74.1281 158.3C48.0289 158.3 26.8578 136.8 27.3506 110.563C27.8335 84.9175 49.2905 64.6304 74.9067 64.6304H127.785C128.633 64.6304 129.451 64.295 130.052 63.6931L151.006 42.7153C153.027 40.6925 151.598 37.2488 148.739 37.2488H75.1531C34.0134 37.2488 -0.365082 70.9455 -0.000396729 112.131C0.236145 138.98 14.7839 162.454 36.3591 175.302L36.369 175.282ZM199.992 158.31C225.608 158.31 247.065 138.023 247.548 112.378C248.031 86.7331 226.87 64.6403 200.77 64.6403C200.613 64.6403 200.445 64.6206 200.287 64.6206H175.529C172.68 64.6206 171.251 61.167 173.262 59.1541L219.103 13.2615H219.093L228.121 4.20336C233.276 -0.957219 241.664 -1.50979 247.124 3.33504C251.707 7.39048 252.88 13.7154 250.662 18.945L238.51 47.639C260.105 60.4763 274.662 83.9505 274.909 110.799C275.273 151.985 240.895 185.692 199.755 185.692H126.159C123.31 185.692 121.881 182.238 123.892 180.225L144.846 159.248C145.447 158.646 146.266 158.31 147.113 158.31H200.002H199.992ZM186.617 87.1771C199.696 87.1771 210.301 97.7943 210.301 110.888C210.301 123.982 199.696 134.599 186.617 134.599C173.538 134.599 162.932 123.982 162.932 110.888C162.932 97.7943 173.538 87.1771 186.617 87.1771ZM89.829 87.1673C102.908 87.1673 113.513 97.7844 113.513 110.878C113.513 123.972 102.908 134.589 89.829 134.589C76.7498 134.589 66.1445 123.972 66.1445 110.878C66.1445 97.7844 76.7498 87.1673 89.829 87.1673Z';

/* ============================================================================
 * Watermark — centered "FlowHunt" wordmark (figma-canonical pattern)
 * ========================================================================== */
const Watermark = `function Watermark(props){var R=React.createElement;
  var dark=!!(props&&props.dark);
  var flowColor=dark?'#FFFFFF':'#111928';
  return R('div',{style:{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',opacity:0.85,fontFamily:'Inter,system-ui,sans-serif',fontWeight:700,fontSize:'22px',letterSpacing:'-0.3px'}},
    R('span',{style:{color:flowColor}},'Flow'),
    R('span',{style:{background:'linear-gradient(90deg,#0084FF,#1A56DB)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}},'Hunt')
  );
}`;

/* ============================================================================
 * SCENE 1 — Pivot — title card
 * ========================================================================== */
const PivotScene = `function PivotScene(props){${HELPERS}
  var f=props.frame||0;
  var inP=ease(cl(f/20));
  var outP=easeIn(cl((f-70)/20));
  var op=inP-outP;
  var underP=ease(cl((f-22)/22));
  var subP=ease(cl((f-30)/22));
  return R('div',{style:{width:'100%',height:'100%',background:'#FFFFFF',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:INTER}},
    SectionLabel('Scene 1 · Pivot'),
    R('div',{style:{opacity:op,textAlign:'center',fontSize:'108px',fontWeight:800,color:'#111928',lineHeight:1.1,letterSpacing:'-2px'}},
      'Notion, inside ',
      R('span',{style:{position:'relative',display:'inline-block'}},
        R('span',{style:{background:grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}},'Claude Code.'),
        R('span',{style:{position:'absolute',left:0,right:'4%',bottom:'-4px',height:'8px',borderRadius:'4px',background:grad,transform:'scaleX('+underP+')',transformOrigin:'left center'}})
      )
    ),
    R('div',{style:{marginTop:'40px',fontSize:'30px',fontWeight:500,color:'#6B7280',opacity:subP*(1-outP)}},'The hosted Notion MCP, plugged straight into Claude Code.')
  );
}`;

/* ============================================================================
 * SCENE 2 — Install (full-split: terminal left, Notion MCP OAuth right)
 * Terminal content mirrors screenshot 21.10.54: multi-scope mcp add + /mcp Authenticating.
 * OAuth card phases in after the Authenticating line lands.
 * ========================================================================== */
const InstallScene = `function InstallScene(props){${HELPERS}
  var f=props.frame||0;
  var END=240;
  var sceneOut=easeIn(cl((f-(END-20))/20));
  var op=1-sceneOut;
  var termIn=ease(cl(f/18));
  function lineAt(d){return ease(cl((f-d)/10));}
  function typed(text,start,speed){var n=Math.floor(cl((f-start)/speed)*text.length);return text.slice(0,n);}
  // Compressed by 20% from v8 to fit a 8s scene.
  var cmd1='claude mcp add --transport http notion https://mcp.notion.com/mcp';
  var cmd1Typed=typed(cmd1,18,32);
  var l1Done=lineAt(58);
  var hintP=ease(cl((f-75)/14));
  var promptMcp=ease(cl((f-104)/14));
  var slashIn=ease(cl((f-118)/14));
  var authIn=ease(cl((f-138)/14));
  var urlIn=ease(cl((f-157)/14));
  var browserNote=ease(cl((f-173)/14));
  var oauthIn=ease(cl((f-138)/40));   // longer fade so the card eases in cleanly (no popping)
  var pulse=(Math.sin((f-184)/4))*0.5+0.5;
  return R('div',{style:{width:'100%',height:'100%',background:'#F3F4F6',position:'relative',fontFamily:INTER,opacity:op,overflow:'hidden'}},
    SectionLabel('Scene 2 · Install · OAuth handshake'),
    // LEFT — terminal (full-height left half)
    R('div',{style:{position:'absolute',left:'32px',top:'32px',width:'928px',height:'940px',background:'#0F172A',borderRadius:'12px',boxShadow:'0 24px 50px rgba(17,25,40,0.20)',overflow:'hidden',opacity:termIn,transform:'translateX('+(-30*(1-termIn))+'px)'}},
      R('div',{style:{height:'48px',background:'#1E293B',display:'flex',alignItems:'center',padding:'0 14px',gap:'10px'}},
        R('div',{style:{width:12,height:12,borderRadius:'50%',background:'#FF5F57'}}),
        R('div',{style:{width:12,height:12,borderRadius:'50%',background:'#FEBC2E'}}),
        R('div',{style:{width:12,height:12,borderRadius:'50%',background:'#28C840'}}),
        R('img',{src:CLAUDE_ICON_URI,style:{marginLeft:'12px',width:'22px',height:'22px',borderRadius:'4px'}}),
        R('div',{style:{color:'#E5E7EB',fontSize:'13px',fontFamily:MONO,fontWeight:600}},'claude'),
        R('div',{style:{color:'#94A3B8',fontSize:'13px',fontFamily:MONO}},'·  ~/your-project'),
        R('div',{style:{marginLeft:'auto',color:'#475569',fontSize:'12px',fontFamily:MONO}},'zsh')
      ),
      R('div',{style:{padding:'28px 32px',color:'#E5E7EB',fontFamily:MONO,fontSize:'17px',lineHeight:1.65}},
        // Step 1: install the MCP server with one command
        R('div',null,R('span',{style:{color:'#22D3EE'}},'$ '),R('span',null,cmd1Typed),f<54?R('span',{style:{display:'inline-block',width:'9px',height:'18px',background:'#22D3EE',marginLeft:'2px',verticalAlign:'middle',opacity:(Math.floor(f/8)%2)===0?1:0}}):null),
        f>=58?R('div',{style:{opacity:l1Done,color:'#22C55E',marginTop:'8px'}},'✓ Added MCP server "notion" — http transport, registered for this project.'):null,
        f>=75?R('div',{style:{opacity:hintP,color:'#94A3B8',fontSize:'14px',marginTop:'4px',marginLeft:'18px'}},'Use --scope user to enable it across every Claude Code project on this machine.'):null,
        // Step 2: launch Claude Code and trigger the OAuth flow with /mcp
        f>=104?R('div',{style:{opacity:promptMcp,marginTop:'20px'}},R('span',{style:{color:'#22D3EE'}},'$ '),'claude'):null,
        f>=118?R('div',{style:{opacity:slashIn,marginTop:'10px'}},R('span',{style:{color:'#A78BFA'}},'/'),'mcp'):null,
        f>=138?R('div',{style:{opacity:authIn,marginTop:'14px',color:'#CBD5E1'}},'Connecting to the Notion MCP server…'):null,
        f>=157?R('div',{style:{opacity:urlIn,marginTop:'10px',fontSize:'13px',color:'#22D3EE',wordBreak:'break-all'}},'https://mcp.notion.com/authorize?response_type=code&client_id=…'):null,
        f>=173?R('div',{style:{opacity:browserNote,marginTop:'10px',color:'#94A3B8',fontSize:'14px'}},'Claude Code opened your browser to finish the Notion handshake.'):null
      )
    ),
    // RIGHT — Notion MCP OAuth consent (full-height right half)
    // No hard gate; opacity drives presence so the card fades in cleanly from the start of its window
    oauthIn>0.005?R('div',{style:{position:'absolute',right:'32px',top:'32px',width:'928px',height:'940px',background:'#FFFFFF',borderRadius:'12px',border:'1px solid #E5E7EB',boxShadow:'0 24px 50px rgba(17,25,40,0.18)',opacity:oauthIn,transform:'translateX('+(30*(1-oauthIn))+'px)',padding:'56px 64px',overflow:'hidden'}},
      // Browser chrome dots
      R('div',{style:{position:'absolute',top:'18px',left:'18px',display:'flex',gap:'8px'}},
        R('div',{style:{width:10,height:10,borderRadius:'50%',background:'#FF5F57'}}),
        R('div',{style:{width:10,height:10,borderRadius:'50%',background:'#FEBC2E'}}),
        R('div',{style:{width:10,height:10,borderRadius:'50%',background:'#28C840'}}),
        R('div',{style:{marginLeft:'14px',padding:'2px 14px',background:'#F3F4F6',borderRadius:'10px',fontFamily:MONO,fontSize:'11px',color:'#6B7280'}},'mcp.notion.com/authorize')
      ),
      // Header
      R('div',{style:{display:'flex',alignItems:'center',justifyContent:'center',gap:'12px',marginTop:'40px',marginBottom:'18px'}},
        NotionMark(36,'#111928'),
        R('div',{style:{fontSize:'22px',color:'#374151',fontWeight:600}},'Notion MCP')
      ),
      R('div',{style:{textAlign:'center',fontSize:'40px',fontWeight:800,color:'#111928',marginBottom:'10px',letterSpacing:'-1px'}},'Connect with Notion MCP'),
      R('div',{style:{textAlign:'center',fontSize:'18px',color:'#6B7280',marginBottom:'32px'}},'Connect your AI tools to Notion'),
      R('div',{style:{fontSize:'14px',color:'#374151',fontWeight:600,marginBottom:'8px'}},'Select workspace'),
      R('div',{style:{display:'flex',alignItems:'center',gap:'12px',padding:'14px 16px',border:'1px solid #E5E7EB',borderRadius:'10px',marginBottom:'24px'}},
        BriefcaseIcon(28,'#A0522D'),
        R('div',null,
          R('div',{style:{fontSize:'17px',fontWeight:600,color:'#111928'}},'Your Workspace'),
          R('div',{style:{fontSize:'13px',color:'#6B7280'}},'Free Plan  ·  2 members')
        ),
        R('div',{style:{marginLeft:'auto',color:'#9CA3AF',fontSize:'18px'}},'▾')
      ),
      R('div',{style:{fontSize:'14px',color:'#374151',marginBottom:'10px'}},'Through Notion MCP, your AI tool will be able to:'),
      R('div',{style:{padding:'16px 20px',border:'1px solid #E5E7EB',borderRadius:'10px',fontSize:'15px',color:'#374151',lineHeight:1.9,marginBottom:'24px'}},
        R('div',null,R('span',{style:{color:'#0084FF',marginRight:'8px',fontWeight:700}},'✓'),'Respect your page and database access and permissions'),
        R('div',null,R('span',{style:{color:'#0084FF',marginRight:'8px',fontWeight:700}},'✓'),'Take actions on your behalf, based on your access level'),
        R('div',null,R('span',{style:{color:'#0084FF',marginRight:'8px',fontWeight:700}},'✓'),'Search across connected apps (requires Notion AI plan)'),
        R('div',null,R('span',{style:{color:'#0084FF',marginRight:'8px',fontWeight:700}},'✓'),'View workspace\\'s users and their emails')
      ),
      R('div',{style:{padding:'14px 18px',background:'#FFF7E6',border:'1px solid #F5C77E',borderRadius:'10px',marginBottom:'24px'}},
        R('div',{style:{display:'flex',alignItems:'flex-start',gap:'8px',fontSize:'13px',color:'#92400E',marginBottom:'4px'}},R('span',null,'⚠'),R('div',null,'You will be redirected to the following location:')),
        R('div',{style:{fontFamily:MONO,fontSize:'13px',fontWeight:700,color:'#92400E',marginLeft:'22px',marginBottom:'6px'}},'http://localhost:63090/callback'),
        R('div',{style:{display:'flex',alignItems:'center',gap:'8px',marginLeft:'22px',fontSize:'13px',color:'#92400E'}},R('span',{style:{display:'inline-block',width:'14px',height:'14px',borderRadius:'3px',background:'#0084FF',color:'#FFFFFF',fontSize:'10px',textAlign:'center',lineHeight:'14px',fontWeight:800}},'✓'),'I recognize and trust this URL')
      ),
      R('div',{style:{height:'52px',borderRadius:'10px',background:grad,color:'#FFFFFF',fontWeight:600,fontSize:'17px',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'14px',boxShadow:f>=210?('0 0 '+(16+16*pulse)+'px rgba(34,197,94,0.45)'):'none'}},'Continue'),
      R('div',{style:{height:'48px',borderRadius:'10px',border:'1px solid #E5E7EB',background:'#FFFFFF',color:'#111928',fontWeight:500,fontSize:'15px',display:'flex',alignItems:'center',justifyContent:'center'}},'Cancel')
    ):null
  );
}`;

/* ============================================================================
 * SCENE 3 — Architecture (Notion MCP inside Claude Code, single blue line, dot)
 * ========================================================================== */
const ArchScene = `function ArchScene(props){${HELPERS}
  var f=props.frame||0;
  var END=180;
  var sceneOut=easeIn(cl((f-(END-20))/20));
  var op=1-sceneOut;
  var titleIn=ease(cl(f/20));
  // Compressed ~15 % from v8 to fit a 6 s scene.
  var youIn=easeBack(cl((f-14)/20));
  var ccIn=easeBack(cl((f-30)/20));
  var notionIn=easeBack(cl((f-46)/20));
  var mcpIn=ease(cl((f-60)/20));
  var lineProgress=ease(cl((f-76)/30));
  var dotT=easeInOut(cl((f-108)/48));
  var dotX=lerp(400,1520,dotT);
  var labelsIn=ease(cl((f-116)/20));
  var captionsIn=ease(cl((f-132)/20));

  function arrowHead(x,y,p,color){
    if(p<0.05)return null;
    return R('svg',{key:'ah',width:14,height:14,viewBox:'0 0 14 14',style:{position:'absolute',left:(x-12)+'px',top:(y-7)+'px',opacity:p}},R('path',{d:'M 0 0 L 14 7 L 0 14 Z',fill:color}));
  }

  return R('div',{style:{width:'100%',height:'100%',background:'#FFFFFF',position:'relative',fontFamily:INTER,opacity:op}},
    SectionLabel('Scene 3 · Architecture'),
    // Title
    R('div',{style:{position:'absolute',top:'74px',left:0,right:0,textAlign:'center',fontSize:'32px',fontWeight:800,color:'#111928',opacity:titleIn,letterSpacing:'-0.5px'}},'The Notion MCP lives inside Claude Code itself.'),
    R('div',{style:{position:'absolute',top:'120px',left:0,right:0,textAlign:'center',fontSize:'19px',color:'#6B7280',opacity:titleIn,maxWidth:'900px',margin:'0 auto'}},'You write a prompt, Claude Code routes it through the MCP server, and Notion answers — all without leaving your terminal.'),

    // Continuous centered blue line at y=540 — one element, drawn left→right
    R('div',{style:{position:'absolute',left:'400px',top:'538px',width:(1120*lineProgress)+'px',height:'4px',background:'#0084FF',borderRadius:'2px',boxShadow:'0 0 12px rgba(0,132,255,0.45)'}}),
    // Arrow head at the right end (just outside the Notion node)
    arrowHead(1520,540,lineProgress,'#0084FF'),

    // Travelling dot — continuous, eases through the full line. Renders BEFORE the boxes
    // below, so the Claude Code box visually covers it mid-journey ("inside Claude Code").
    f>=130?R('div',{style:{position:'absolute',left:(dotX-9)+'px',top:'531px',width:'18px',height:'18px',borderRadius:'50%',background:'#0084FF',boxShadow:'0 0 20px #0084FF, 0 0 8px #FFFFFF'}}):null,

    // YOU node (left) — vertically centered around the blue line at y=540
    R('div',{style:{position:'absolute',left:'220px',top:'460px',width:'180px',opacity:youIn,transform:'scale('+(0.94+0.06*youIn)+')'}},
      R('div',{style:{width:'180px',height:'160px',borderRadius:'18px',background:'#FFFFFF',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 12px 28px rgba(17,25,40,0.08)'}},
        R('div',{style:{fontFamily:MONO,fontSize:'40px',color:'#0F172A'}},'> _')
      ),
      R('div',{style:{textAlign:'center',marginTop:'14px',fontSize:'18px',fontWeight:700,color:'#111928'}},'You'),
      R('div',{style:{textAlign:'center',fontSize:'13px',color:'#6B7280'}},'Your prompt')
    ),

    // CLAUDE CODE big middle box (contains Notion MCP card) — vertically centered ON the blue line (y=540)
    R('div',{style:{position:'absolute',left:'50%',top:'540px',transform:'translate(-50%,-50%) scale('+(0.94+0.06*ccIn)+')',width:'600px',opacity:ccIn,transformOrigin:'center center'}},
      R('div',{style:{width:'600px',padding:'26px 32px',borderRadius:'24px',background:'#FFFFFF',border:'2px solid #0084FF',boxShadow:'0 20px 40px rgba(0,132,255,0.15)',position:'relative'}},
        // Claude Code header (centered)
        R('div',{style:{display:'flex',alignItems:'center',justifyContent:'center',gap:'14px'}},
          R('img',{src:CLAUDE_ICON_URI,style:{width:'44px',height:'44px',borderRadius:'10px'}}),
          R('div',{style:{textAlign:'left'}},
            R('div',{style:{fontSize:'22px',fontWeight:800,color:'#111928',lineHeight:1.1}},'Claude Code'),
            R('div',{style:{fontSize:'12px',color:'#6B7280',marginTop:'2px'}},'MCP host on your machine')
          )
        ),
        // Divider
        R('div',{style:{height:'1px',background:'#E5E7EB',margin:'20px 0'}}),
        // Inner Notion MCP card — centered content
        R('div',{style:{display:'flex',alignItems:'center',justifyContent:'center',gap:'16px',opacity:mcpIn,transform:'translateY('+(12*(1-mcpIn))+'px)'}},
          R('div',{style:{width:'48px',height:'48px',borderRadius:'10px',background:'#F9FAFB',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}},NotionMark(28,'#111928')),
          R('div',{style:{textAlign:'left'}},
            R('div',{style:{display:'flex',alignItems:'baseline',gap:'10px'}},
              R('div',{style:{fontSize:'17px',fontWeight:700,color:'#111928'}},'Notion MCP server'),
              R('div',{style:{fontSize:'12px',color:'#6B7280',fontFamily:MONO}},'mcp.notion.com/mcp')
            ),
            R('div',{style:{marginTop:'4px',fontSize:'13px',color:'#374151'}},'18 tools registered with this Claude Code session')
          ),
          R('div',{style:{display:'flex',alignItems:'center',gap:'6px',fontSize:'13px',color:'#15803D',fontWeight:600,marginLeft:'8px'}},
            R('span',{style:{display:'inline-block',width:'9px',height:'9px',borderRadius:'50%',background:'#22C55E'}}),'connected'
          )
        )
      )
    ),

    // NOTION node (right) — vertically centered around y=540
    R('div',{style:{position:'absolute',left:'1520px',top:'460px',width:'180px',opacity:notionIn,transform:'scale('+(0.94+0.06*notionIn)+')'}},
      R('div',{style:{width:'180px',height:'160px',borderRadius:'18px',background:'#F9FAFB',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 12px 28px rgba(17,25,40,0.08)'}},NotionMark(60,'#111928')),
      R('div',{style:{textAlign:'center',marginTop:'14px',fontSize:'18px',fontWeight:700,color:'#111928'}},'Notion'),
      R('div',{style:{textAlign:'center',fontSize:'13px',color:'#6B7280'}},'Your workspace')
    ),

    // Step labels — BLUE, ABOVE the line, centered on each segment's midpoint.
    // Below them in black: a brief "why" caption for each leg of the journey.
    // (The black captions can be removed on request — say "switch" and they disappear, leaving
    //  only the blue labels above.)
    R('div',{style:{opacity:labelsIn}},
      R('div',{style:{position:'absolute',left:'530px',top:'504px',transform:'translateX(-50%)',fontSize:'15px',color:'#0084FF',fontWeight:700,letterSpacing:'0.3px'}},'Prompt'),
      R('div',{style:{position:'absolute',left:'1390px',top:'504px',transform:'translateX(-50%)',fontSize:'15px',color:'#0084FF',fontWeight:700,letterSpacing:'0.3px'}},'Tool call')
    ),
    R('div',{style:{opacity:captionsIn}},
      R('div',{style:{position:'absolute',left:'530px',top:'560px',transform:'translateX(-50%)',fontSize:'12px',color:'#374151',fontStyle:'italic',whiteSpace:'nowrap'}},'You, asking Claude Code'),
      R('div',{style:{position:'absolute',left:'1390px',top:'560px',transform:'translateX(-50%)',fontSize:'12px',color:'#374151',fontStyle:'italic',whiteSpace:'nowrap'}},'Claude Code, asking Notion')
    )
  );
}`;

/* ============================================================================
 * SCENE 4 — Demo (terminal + Notion page card; raised; pill at top-right)
 * ========================================================================== */
const DemoScene = `function DemoScene(props){${HELPERS}
  var f=props.frame||0;
  var END=270;
  var sceneOut=easeIn(cl((f-(END-20))/20));
  var op=1-sceneOut;
  var termIn=ease(cl(f/22));
  function typed(text,start,speed){var n=Math.floor(cl((f-start)/speed)*text.length);return text.slice(0,n);}
  function lineAt(d){return ease(cl((f-d)/8));}
  // Extended back to a 9s scene so the right-pane morph can wait until AFTER the
  // terminal's create-pages tool call actually returns success — no more instant page change.
  var prompt1='Search my Notion for "Notion AI capability demo draft".';
  var prompt1Typed=typed(prompt1,22,30);
  var t1Call=lineAt(60),t1Res=lineAt(74);
  var prompt2='Fetch its outline.';
  var prompt2Typed=typed(prompt2,90,13);
  var t2Call=lineAt(122),t2Res=lineAt(135),outlineIn=ease(cl((f-145)/22));
  var prompt3='Create "Capability Demo Summary" under the same parent.';
  var prompt3Typed=typed(prompt3,158,28);
  var t3Call=lineAt(192),t3Res=lineAt(206),t3Url=lineAt(218);
  var cardOutlineIn=ease(cl((f-60)/22));
  var cardSourceIn=ease(cl((f-130)/22));
  // Morph waits for the terminal to actually report "✓ Created" before the right pane shifts.
  // t3Res lands at f=206, t3Url at f=218. Morph starts at f=215 — naturally follows the success.
  var cardMorphP=easeInOut(cl((f-215)/30));
  var pillIn=ease(cl((f-238)/18));
  // Terminal + card raised so bottom edge ~= y=920 (well above watermark at y=990)
  var paneTop=32, paneH=888;
  return R('div',{style:{width:'100%',height:'100%',background:'#F3F4F6',fontFamily:INTER,position:'relative',opacity:op,overflow:'hidden'}},
    SectionLabel('Scene 4 · Demo · search → fetch → create'),
    // LEFT — terminal
    R('div',{style:{position:'absolute',left:'32px',top:paneTop+'px',width:'928px',height:paneH+'px',background:'#0F172A',borderRadius:'12px',boxShadow:'0 24px 50px rgba(17,25,40,0.20)',overflow:'hidden',opacity:termIn,transform:'translateX('+(-30*(1-termIn))+'px)'}},
      R('div',{style:{height:'48px',background:'#1E293B',display:'flex',alignItems:'center',padding:'0 14px',gap:'10px'}},
        R('div',{style:{width:12,height:12,borderRadius:'50%',background:'#FF5F57'}}),
        R('div',{style:{width:12,height:12,borderRadius:'50%',background:'#FEBC2E'}}),
        R('div',{style:{width:12,height:12,borderRadius:'50%',background:'#28C840'}}),
        R('img',{src:CLAUDE_ICON_URI,style:{marginLeft:'12px',width:'22px',height:'22px',borderRadius:'4px'}}),
        R('div',{style:{color:'#E5E7EB',fontSize:'13px',fontFamily:MONO,fontWeight:600}},'claude'),
        R('div',{style:{color:'#475569',fontSize:'13px',fontFamily:MONO}},'·'),
        R('div',{style:{color:'#94A3B8',fontSize:'13px',fontFamily:MONO}},'notion MCP')
      ),
      R('div',{style:{padding:'22px 26px',color:'#E5E7EB',fontFamily:MONO,fontSize:'17px',lineHeight:1.65}},
        R('div',null,R('span',{style:{color:'#9CA3AF'}},'> '),R('span',null,prompt1Typed)),
        f>=60?R('div',{style:{opacity:t1Call,marginTop:'10px'}},R('span',{style:{color:'#22D3EE'}},'⏺ '),R('span',{style:{color:'#A78BFA'}},'notion - notion-search'),R('span',{style:{color:'#9CA3AF'}},'(query: "Notion AI capability demo draft")')):null,
        f>=74?R('div',{style:{opacity:t1Res,color:'#22C55E'}},'  ⎿  1 page  ·  36d0ad64...91f1f'):null,
        f>=90?R('div',{style:{marginTop:'14px'}},R('span',{style:{color:'#9CA3AF'}},'> '),R('span',null,prompt2Typed)):null,
        f>=122?R('div',{style:{opacity:t2Call,marginTop:'10px'}},R('span',{style:{color:'#22D3EE'}},'⏺ '),R('span',{style:{color:'#A78BFA'}},'notion - notion-fetch'),R('span',{style:{color:'#9CA3AF'}},'(id: 36d0ad64...91f1f)')):null,
        f>=135?R('div',{style:{opacity:t2Res,color:'#22C55E'}},'  ⎿  4 headings  ·  12 blocks'):null,
        f>=145?R('div',{style:{opacity:outlineIn,marginTop:'6px',marginLeft:'16px',padding:'8px 14px',background:'rgba(148,163,184,0.08)',borderLeft:'3px solid #1A56DB',borderRadius:'4px',fontSize:'14px',color:'#CBD5E1',lineHeight:1.6}},
          R('div',null,'# Quick actions'),
          R('div',null,'# Mini slide deck'),
          R('div',null,'# Slide 1: Goal'),
          R('div',null,'# Slide 2: Output types')
        ):null,
        f>=158?R('div',{style:{marginTop:'14px'}},R('span',{style:{color:'#9CA3AF'}},'> '),R('span',null,prompt3Typed)):null,
        f>=192?R('div',{style:{opacity:t3Call,marginTop:'10px'}},R('span',{style:{color:'#22D3EE'}},'⏺ '),R('span',{style:{color:'#A78BFA'}},'notion - notion-create-pages'),R('span',{style:{color:'#9CA3AF'}},'({title:"Capability Demo Summary"})')):null,
        f>=206?R('div',{style:{opacity:t3Res,color:'#22C55E'}},'  ⎿  ✓ Created  ·  7e22ad64...f073'):null,
        f>=218?R('div',{style:{opacity:t3Url,color:'#22D3EE',textDecoration:'underline',marginLeft:'8px'}},'notion.so/Capability-Demo-Summary'):null,
        R('span',{style:{display:'inline-block',width:'10px',height:'18px',background:'#22D3EE',marginLeft:'2px',opacity:(Math.floor(f/8)%2)===0?1:0}})
      )
    ),
    // RIGHT — Notion page preview
    R('div',{style:{position:'absolute',right:'32px',top:paneTop+'px',width:'928px',height:paneH+'px',background:'#FFFFFF',borderRadius:'12px',border:'1px solid #E5E7EB',boxShadow:'0 24px 50px rgba(17,25,40,0.12)',overflow:'hidden'}},
      R('div',{style:{height:'48px',background:'#F9FAFB',borderBottom:'1px solid #E5E7EB',display:'flex',alignItems:'center',padding:'0 16px',gap:'12px'}},
        R('div',{style:{width:8,height:8,borderRadius:'50%',background:'#9CA3AF'}}),
        R('div',{style:{width:8,height:8,borderRadius:'50%',background:'#9CA3AF'}}),
        R('div',{style:{flex:1,height:'26px',borderRadius:'13px',background:'#FFFFFF',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',padding:'0 12px',fontFamily:MONO,fontSize:'11px',color:'#6B7280'}},cardMorphP<0.5?'notion.so/Notion-AI-capability-demo-draft':'notion.so/Capability-Demo-Summary')
      ),
      R('div',{style:{padding:'36px 40px',position:'relative',height:'calc(100% - 48px)'}},
        R('div',{style:{opacity:cardSourceIn*(1-cardMorphP),position:'absolute',left:'40px',right:'40px',top:'40px'}},
          R('div',{style:{fontSize:'30px',fontWeight:700,color:'#111928',marginBottom:'18px'}},'Notion AI capability demo draft'),
          R('div',{style:{fontSize:'18px',fontWeight:600,color:'#111928',marginTop:'14px'}},'Quick actions'),
          R('div',{style:{fontSize:'14px',color:'#374151',marginTop:'4px'}},'• Add your assignment list as a checklist with due dates'),
          R('div',{style:{fontSize:'18px',fontWeight:600,color:'#111928',marginTop:'14px'}},'Mini slide deck'),
          R('div',{style:{fontSize:'14px',color:'#374151',marginTop:'4px'}},'Use Present to view as slides.'),
          R('div',{style:{fontSize:'18px',fontWeight:600,color:'#111928',marginTop:'14px'}},'Slide 1: Goal'),
          R('div',{style:{fontSize:'14px',color:'#374151',marginTop:'4px'}},'Show structure: headings, lists, callouts, tables'),
          R('div',{style:{fontSize:'18px',fontWeight:600,color:'#111928',marginTop:'14px'}},'Slide 2: Output types'),
          R('div',{style:{fontSize:'14px',color:'#374151',marginTop:'4px'}},'Summaries and outlines')
        ),
        R('div',{style:{opacity:cardMorphP,position:'absolute',left:'40px',right:'40px',top:'40px'}},
          R('div',{style:{fontSize:'30px',fontWeight:700,color:'#111928',marginBottom:'18px'}},'Capability Demo Summary'),
          R('div',{style:{padding:'12px 16px',background:'#EEF4FF',border:'1px solid #DBE7FF',borderRadius:'10px',color:'#1A56DB',fontSize:'14px',marginBottom:'20px'}},'↪  Source: Notion AI capability demo draft'),
          R('div',{style:{fontSize:'17px',fontWeight:600,color:'#111928',marginBottom:'8px'}},'Summary'),
          R('div',{style:{fontSize:'14px',color:'#374151',marginBottom:'4px'}},'•  Quick actions for ad-hoc checklists and rewrites'),
          R('div',{style:{fontSize:'14px',color:'#374151',marginBottom:'4px'}},'•  A mini slide deck used in Presentation Mode'),
          R('div',{style:{fontSize:'14px',color:'#374151',marginBottom:'18px'}},'•  Two example slides covering goal + output types'),
          R('div',{style:{fontSize:'17px',fontWeight:600,color:'#111928',marginBottom:'8px'}},'Follow-ups'),
          R('div',{style:{display:'flex',alignItems:'center',gap:'10px',fontSize:'14px',color:'#374151',marginBottom:'4px'}},R('span',{style:{display:'inline-block',width:'13px',height:'13px',borderRadius:'3px',border:'1px solid #9CA3AF'}}),'Pick a real "Quick actions" task to walk through'),
          R('div',{style:{display:'flex',alignItems:'center',gap:'10px',fontSize:'14px',color:'#374151',marginBottom:'4px'}},R('span',{style:{display:'inline-block',width:'13px',height:'13px',borderRadius:'3px',border:'1px solid #9CA3AF'}}),'Record the slide deck as a 30-second loom'),
          R('div',{style:{display:'flex',alignItems:'center',gap:'10px',fontSize:'14px',color:'#374151'}},R('span',{style:{display:'inline-block',width:'13px',height:'13px',borderRadius:'3px',border:'1px solid #9CA3AF'}}),'Link back from the source page')
        )
      )
    ),
    // Narrator pill — top centre, far from watermark
    f>=330?R('div',{style:{position:'absolute',left:'50%',top:'944px',transform:'translateX(-50%) scale('+(0.95+0.05*pillIn)+')',opacity:pillIn,padding:'8px 20px',borderRadius:'20px',background:grad,color:'#FFFFFF',fontFamily:INTER,fontSize:'15px',fontWeight:600,boxShadow:'0 8px 20px rgba(0,132,255,0.32)'}},'Search · Fetch · Write.  One round-trip.'):null
  );
}`;

/* ============================================================================
 * FH chrome — shared Chrome browser window + FlowHunt sidebar + URL bar + page
 * header, used by all four FH scenes. The fifth FH scene (Result) renders a
 * Notion browser directly with no FH chrome.
 *
 * Opts:
 *   tabText        - browser tab text (default 'Using Notion Tool · FlowHunt')
 *   urlPath        - URL bar path text
 *   activeNav      - sidebar nav item to highlight ('Integrations' | 'My Agents' | ...)
 *   rightBtnText   - primary header button label ('New agent' | 'Publish Agent' | ...)
 *   eyebrow        - eyebrow text shown above title (e.g. 'INTEGRATE NOTION')
 *   title          - page-header title text
 *   showEditRun    - whether to render the Edit | Run | Batch pill in the page header
 *   runActive      - when true, Run is highlighted instead of Edit (Phase C)
 *   browserW       - browser window width (default 1760; chat2 lerps to 1240)
 *   body           - body content (React element) rendered inside the FH page body
 * ========================================================================== */
const FH_MARK_PATH_LIT = FH_MARK_PATH;
const FH_CHROME_HELPERS = `
  var FH_CHROME_BAR_H=38, FH_URL_BAR_H=42, FH_PAGE_HDR_H=54;
  function FHChrome(opts){
    var tabText=opts.tabText||'Using Notion Tool · FlowHunt';
    var urlPath=opts.urlPath||'/agents/using-notion-tool/run';
    var activeNav=opts.activeNav||'My Agents';
    var rightBtnText=opts.rightBtnText||'Publish Agent';
    var showEditRun=opts.showEditRun!==false;
    var runActive=!!opts.runActive;
    var browserW=opts.browserW||1760;
    var browserH=900;
    var browserX=(1920-browserW)/2;
    if(opts.browserAnchorLeft) browserX=80;
    var browserY=64;
    var eyebrow=opts.eyebrow||'';
    var title=opts.title||'';
    return R('div',{style:{position:'absolute',left:browserX+'px',top:browserY+'px',width:browserW+'px',height:browserH+'px',background:'#FFFFFF',borderRadius:'12px',overflow:'hidden',boxShadow:'0 30px 70px rgba(17,25,40,0.22)',border:'1px solid #D1D5DB'}},
      R('div',{style:{height:FH_CHROME_BAR_H+'px',background:'#DEE1E6',display:'flex',alignItems:'flex-end',padding:'0 14px',position:'relative'}},
        R('div',{style:{position:'absolute',left:14,top:12,width:12,height:12,borderRadius:'50%',background:'#FF5F57'}}),
        R('div',{style:{position:'absolute',left:34,top:12,width:12,height:12,borderRadius:'50%',background:'#FEBC2E'}}),
        R('div',{style:{position:'absolute',left:54,top:12,width:12,height:12,borderRadius:'50%',background:'#28C840'}}),
        R('div',{style:{marginLeft:'90px',height:'30px',padding:'0 16px',background:'#F4F5F7',borderTopLeftRadius:'9px',borderTopRightRadius:'9px',display:'flex',alignItems:'center',gap:'9px',fontSize:'13px',color:'#172B4D',fontWeight:600}},
          R('svg',{width:14,height:11,viewBox:'0 0 275 223'},
            R('defs',null,R('linearGradient',{id:'fhtab_'+(opts.gradId||'a'),x1:0,y1:0,x2:1,y2:1},R('stop',{offset:0,stopColor:'#0084FF'}),R('stop',{offset:1,stopColor:'#1A56DB'}))),
            R('path',{d:'${FH_MARK_PATH_LIT}',fill:'url(#fhtab_'+(opts.gradId||'a')+')'})
          ),
          R('span',null,tabText)
        )
      ),
      R('div',{style:{height:FH_URL_BAR_H+'px',background:'#F4F5F7',borderBottom:'1px solid #DFE1E6',display:'flex',alignItems:'center',padding:'0 16px',gap:'12px'}},
        R('div',{style:{display:'flex',gap:'12px',color:'#9AA0A6',fontSize:'15px'}},
          R('span',null,'←'),R('span',null,'→'),R('span',null,'↻')
        ),
        R('div',{style:{flex:1,padding:'6px 14px',background:'#FFFFFF',border:'1px solid #DFE1E6',borderRadius:'16px',fontSize:'13px',color:'#42526E',display:'flex',alignItems:'center',gap:'10px'}},
          R('div',{style:{width:7,height:7,borderRadius:'50%',background:'#22C55E'}}),
          R('span',{style:{color:'#172B4D'}},'app.flowhunt.io'),
          R('span',{style:{color:'#6B7280'}},urlPath)
        )
      ),
      R('div',{style:{height:FH_PAGE_HDR_H+'px',background:'#FFFFFF',borderBottom:'1px solid #E5E7EB',display:'flex',alignItems:'center',padding:'0 22px',gap:'14px',position:'relative'}},
        R('div',{style:{fontSize:'13px',color:'#6B7280',display:'flex',alignItems:'center',gap:'6px'}},R('span',null,'‹'),R('span',null,activeNav==='Integrations'?'Integrations':'Agents')),
        R('div',{style:{display:'flex',alignItems:'center',gap:'6px',fontSize:'13px',color:'#111928',fontWeight:700}},
          R('span',null,activeNav==='Integrations'?'Integrations':'Using Notion Tool'),
          activeNav!=='Integrations'?R('span',{style:{color:'#9CA3AF',fontWeight:500}},'▾'):null
        ),
        showEditRun?R('div',{style:{position:'absolute',left:'50%',transform:'translateX(-50%)',display:'flex',alignItems:'center',padding:'3px',background:'#F4F5F7',border:'1px solid #E5E7EB',borderRadius:'999px',gap:'2px',fontSize:'13px',fontWeight:600}},
          R('div',{style:{padding:'5px 18px',background:(runActive?'transparent':'#111928'),color:(runActive?'#6B7280':'#FFFFFF'),borderRadius:'999px',display:'flex',alignItems:'center',gap:'6px'}},R('span',{style:{fontSize:'11px'}},'✎'),'Edit'),
          R('div',{style:{padding:'5px 18px',background:(runActive?'#111928':'transparent'),color:(runActive?'#FFFFFF':'#6B7280'),borderRadius:'999px',display:'flex',alignItems:'center',gap:'6px'}},R('span',{style:{fontSize:'10px'}},'▶'),'Run'),
          R('div',{style:{padding:'5px 18px',color:'#6B7280',display:'flex',alignItems:'center',gap:'6px'}},R('span',{style:{fontSize:'11px'}},'☰'),'Batch')
        ):null,
        R('div',{style:{marginLeft:'auto',display:'flex',alignItems:'center',gap:'14px',fontSize:'12px',color:'#6B7280'}},
          R('div',{style:{display:'flex',alignItems:'center',gap:'6px',padding:'5px 11px',background:'#F4F5F7',borderRadius:'14px',fontWeight:600}},R('span',{style:{fontSize:'11px'}},'⏱'),R('span',null,'History')),
          R('div',{style:{padding:'7px 16px',background:grad,color:'#FFFFFF',borderRadius:'8px',fontSize:'13px',fontWeight:700,boxShadow:'0 4px 10px rgba(0,82,204,0.25)'}},rightBtnText)
        )
      ),
      // FlowHunt sidebar
      R('div',{style:{position:'absolute',left:0,top:(FH_CHROME_BAR_H+FH_URL_BAR_H+FH_PAGE_HDR_H)+'px',bottom:0,width:'220px',background:'#FFFFFF',borderRight:'1px solid #E5E7EB',padding:'18px 14px',display:'flex',flexDirection:'column',gap:'4px',overflow:'hidden'}},
        R('div',{style:{display:'flex',alignItems:'center',gap:'8px',marginBottom:'14px'}},
          R('svg',{width:22,height:18,viewBox:'0 0 275 223'},
            R('defs',null,R('linearGradient',{id:'fhsb_'+(opts.gradId||'a'),x1:0,y1:0,x2:1,y2:1},R('stop',{offset:0,stopColor:'#0084FF'}),R('stop',{offset:1,stopColor:'#1A56DB'}))),
            R('path',{d:'${FH_MARK_PATH_LIT}',fill:'url(#fhsb_'+(opts.gradId||'a')+')'})
          ),
          R('span',{style:{fontSize:'15px',fontWeight:800,color:'#111928'}},'FlowHunt')
        ),
        R('div',{style:{padding:'10px 10px',background:'#F9FAFB',border:'1px solid #E5E7EB',borderRadius:'8px',marginBottom:'14px'}},
          R('div',{style:{fontSize:'12px',fontWeight:700,color:'#111928'}},'Your Workspace'),
          R('div',{style:{fontSize:'10px',color:'#6B7280',marginTop:'2px'}},'Free Plan')
        ),
        R('div',{style:{fontSize:'10px',color:'#9CA3AF',fontWeight:700,padding:'0 6px 4px 6px',letterSpacing:'0.6px'}},'AGENT'),
        ['Home','Agents Library','My Agents','MCP Servers','Chatbots','History','Integrations'].map(function(label,i){
          var active=(label===activeNav);
          return R('div',{key:'a'+i,style:{display:'flex',alignItems:'center',gap:'7px',padding:'6px 8px',borderRadius:'6px',background:active?'#EEF4FF':'transparent',fontSize:'12px',color:active?'#1A56DB':'#374151',fontWeight:active?600:500}},
            R('span',{style:{width:'12px',display:'inline-block',textAlign:'center',opacity:0.7}},'◧'),
            label
          );
        }),
        R('div',{style:{fontSize:'10px',color:'#9CA3AF',fontWeight:700,padding:'10px 6px 4px 6px',letterSpacing:'0.6px'}},'KNOWLEDGE'),
        ['Schedules','Documents','Memory','Categories'].map(function(label,i){
          return R('div',{key:'k'+i,style:{display:'flex',alignItems:'center',gap:'7px',padding:'6px 8px',borderRadius:'6px',fontSize:'12px',color:'#374151',fontWeight:500}},
            R('span',{style:{width:'12px',display:'inline-block',textAlign:'center',opacity:0.5}},'◇'),
            label
          );
        })
      ),
      // Eyebrow + title row
      R('div',{style:{padding:'18px 32px 0 252px',background:'#F9FAFB'}},
        R('div',{style:{position:'relative',height:'56px'}},
          R('div',{style:{position:'absolute',top:0,fontSize:'12px',fontWeight:700,color:'#6B7280',letterSpacing:'2.4px'}},eyebrow),
          R('div',{style:{position:'absolute',top:'22px',fontSize:'26px',fontWeight:800,color:'#111928',letterSpacing:'-0.3px'}},title)
        )
      ),
      // Body content area (to the right of the sidebar)
      R('div',{style:{position:'absolute',left:'220px',top:(FH_CHROME_BAR_H+FH_URL_BAR_H+FH_PAGE_HDR_H+78)+'px',right:0,bottom:0,background:'#F9FAFB',padding:'0 32px 28px 32px',overflow:'hidden'}},
        opts.body
      )
    );
  }
`;

/* ============================================================================
 * SCENE 5 — FH Marketplace (Phase A — integrations grid)
 * ========================================================================== */
const FHMarketplaceScene = `function FHMarketplaceScene(props){${HELPERS}${FH_CHROME_HELPERS}
  var f=props.frame||0;
  var END=90;
  var sceneOut=easeIn(cl((f-(END-22))/22));
  var op=1-sceneOut;
  var inP=ease(cl(f/22));
  var body=R('div',{style:{position:'relative',opacity:inP}},
    R('div',{style:{display:'flex',gap:'12px',marginBottom:'24px'}},
      R('div',{style:{width:'320px',height:'40px',borderRadius:'8px',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',padding:'0 14px',fontSize:'14px',color:'#111928',background:'#FFFFFF'}},R('span',{style:{color:'#9CA3AF',marginRight:'10px'}},'⌕'),'notion'),
      R('div',{style:{width:'120px',height:'40px',borderRadius:'8px',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',padding:'0 14px',fontSize:'14px',color:'#374151',background:'#FFFFFF'}},'Category  ▾')
    ),
    R('div',{style:{display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:'18px'}},
      R('div',{key:'n',style:{padding:'22px',borderRadius:'14px',border:'2px solid #0084FF',background:'#F8FBFF'}},
        R('div',{style:{width:'48px',height:'48px',borderRadius:'10px',background:'#111928',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'14px'}},NotionMark(28,'#FFFFFF')),
        R('div',{style:{fontSize:'18px',fontWeight:700,color:'#111928',marginBottom:'6px'}},'Notion'),
        R('div',{style:{fontSize:'12px',color:'#6B7280',lineHeight:1.45,marginBottom:'14px'}},'Pages & databases'),
        R('div',{style:{height:'36px',borderRadius:'8px',background:grad,color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:600,boxShadow:f>=60?'0 0 18px rgba(0,132,255,0.45)':'none'}},'Integrate')
      ),
      [{n:'Slack',bg:'#FFFFFF',mark:SlackMark(28),sub:'Send messages'},{n:'GitHub',bg:'#0F172A',mark:GitHubMark(28),sub:'Repos & PRs'},{n:'Google Drive',bg:'#FFFFFF',mark:DriveMark(28),sub:'Files & docs'}].map(function(it,i){
        var p=ease(cl((f-(30+i*8))/22));
        return R('div',{key:'g'+i,style:{padding:'22px',borderRadius:'14px',border:'1px solid #E5E7EB',background:'#FFFFFF',opacity:p,transform:'translateY('+(8*(1-p))+'px)'}},
          R('div',{style:{width:'48px',height:'48px',borderRadius:'10px',background:it.bg,border:it.bg==='#FFFFFF'?'1px solid #E5E7EB':'none',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'14px'}},it.mark),
          R('div',{style:{fontSize:'18px',fontWeight:700,color:'#111928',marginBottom:'6px'}},it.n),
          R('div',{style:{fontSize:'12px',color:'#6B7280',lineHeight:1.45,marginBottom:'14px'}},it.sub),
          R('div',{style:{height:'36px',borderRadius:'8px',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:600,color:'#374151'}},'Integrate')
        );
      })
    )
  );
  return R('div',{style:{width:'100%',height:'100%',background:'#EEF1F4',position:'relative',fontFamily:INTER,opacity:op,overflow:'hidden'}},
    SectionLabel('Scene 5 · Marketplace'),
    FHChrome({
      gradId:'mkt',
      tabText:'Integrations · FlowHunt',
      urlPath:'/integrations',
      activeNav:'Integrations',
      rightBtnText:'New agent',
      showEditRun:false,
      eyebrow:'INTEGRATE NOTION',
      title:'Add Notion the same way you added Claude Code — two clicks in your browser.',
      body:body
    })
  );
}`;

/* ============================================================================
 * SCENE 6 — FH Tool catalog (Phase B — 2-col scrolling tool list)
 * ========================================================================== */
const FHToolCatalogScene = `function FHToolCatalogScene(props){${HELPERS}${FH_CHROME_HELPERS}
  var f=props.frame||0;
  var END=180;
  var sceneOut=easeIn(cl((f-(END-22))/22));
  var op=1-sceneOut;
  var allTools=['Search Notion','Retrieve Notion Page','Retrieve Notion Block','Retrieve Notion Data Source','Retrieve Notion Comments','Retrieve Notion Page Property','Create Notion Page','Create Notion Comment','Create Notion Data Source','Append Notion Block Children','Update Notion Page','Update Notion Block','Update Notion Data Source','Move Notion Page','Delete Notion Block','Get Notion Block Children','Get Notion Bot User','Get Notion User','List Notion Users','List Notion Data Source Templates','Query Notion Data Source'];
  // Pure linear scroll, faster than v14 — 45-frame travel, starts at f=15.
  var scrollT=cl((f-15)/45);
  var scrollY=-scrollT*640;
  var body=R('div',{style:{position:'absolute',inset:'0',padding:'0 32px 28px 32px'}},
    R('div',{style:{background:'#FFFFFF',borderRadius:'12px',border:'1px solid #E5E7EB',padding:'22px 28px',height:'100%',display:'flex',flexDirection:'column'}},
      R('div',{style:{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'14px'}},
        R('div',{style:{fontSize:'17px',fontWeight:700,color:'#111928'}},'Select a Tool'),
        R('div',{style:{display:'flex',alignItems:'center',gap:'10px',fontSize:'12px',color:'#6B7280'}},
          R('div',{style:{padding:'5px 10px',borderRadius:'6px',background:'#EEF4FF',color:'#1A56DB',fontWeight:600}},'notion'),
          R('div',null,allTools.length+' tools')
        )
      ),
      R('div',{style:{position:'relative',flex:1,overflow:'hidden',borderTop:'1px solid #F3F4F6'}},
        R('div',{style:{position:'absolute',top:0,left:0,right:'18px',padding:'14px 0',transform:'translateY('+scrollY+'px)'}},
          R('div',{style:{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:'14px'}},
            allTools.map(function(t,i){
              return R('div',{key:i,style:{padding:'18px 20px',borderRadius:'12px',border:'1px solid #E5E7EB',background:'#FFFFFF'}},
                R('div',{style:{display:'flex',alignItems:'center',gap:'10px',marginBottom:'10px'}},
                  R('div',{style:{width:'30px',height:'30px',borderRadius:'7px',background:'#FFFFFF',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',justifyContent:'center'}},NotionMark(18,'#111928')),
                  R('div',{style:{padding:'3px 8px',borderRadius:'8px',background:'#F3F4F6',fontSize:'11px',color:'#6B7280',fontWeight:600}},'notion')
                ),
                R('div',{style:{fontSize:'15px',fontWeight:700,color:'#111928'}},t)
              );
            })
          )
        ),
        R('div',{style:{position:'absolute',right:'4px',top:'12px',bottom:'12px',width:'4px',borderRadius:'2px',background:'#F3F4F6'}}),
        R('div',{style:{position:'absolute',right:'4px',top:(12+scrollT*340)+'px',width:'4px',height:'92px',borderRadius:'2px',background:grad}})
      )
    )
  );
  return R('div',{style:{width:'100%',height:'100%',background:'#EEF1F4',position:'relative',fontFamily:INTER,opacity:op,overflow:'hidden'}},
    SectionLabel('Scene 6 · Tool catalog'),
    FHChrome({
      gradId:'cat',
      tabText:'Using Notion Tool · FlowHunt',
      urlPath:'/agents/using-notion-tool/edit',
      activeNav:'My Agents',
      rightBtnText:'Add to my agents',
      showEditRun:true,
      runActive:false,
      eyebrow:'EVERY NOTION TOOL',
      title:'All twenty-one Notion tools are picked up automatically, ready for any agent you build.',
      body:body
    })
  );
}`;

/* ============================================================================
 * SCENE 7 — FH Chat 1 (Phase C, turns 1 & 2 only)
 *   u1 (capabilities) + LoadingDots + r1
 *   u2 (find page) + AILoadingBanner notion_search + tool widget + r2
 * Canvas on the left (small AI Agent card) + chat panel on the right.
 * ========================================================================== */
const FHChat1Scene = `function FHChat1Scene(props){${HELPERS}${FH_CHROME_HELPERS}
  var f=props.frame||0;
  var END=300;
  // No scene-out fade — the next scene cuts in cleanly (no white flash).
  var op=1;
  var canvasIn=ease(cl((f-10)/22));
  // Turn 1 timings (scene-local) — paced with extra reading time
  var u1In=ease(cl((f-18)/14));
  var load1=cl(ease(cl((f-65)/12))-easeIn(cl((f-115)/10)));
  var r1In=ease(cl((f-120)/16));
  // Turn 2 timings — moved later so the reader can finish Turn 1 before this lands
  var u2In=ease(cl((f-200)/14));
  var load2=cl(ease(cl((f-230)/12))-easeIn(cl((f-255)/10)));
  var t2In=ease(cl((f-255)/18));
  var r2In=ease(cl((f-285)/16));
  // ── End-of-scene canvas squish: last 30 frames, canvas translates left + scales horizontally.
  // At scene-out (f=300) the canvas is gone; Scene 8 then takes over with the chat at the top
  // and no white fade between them.
  var squishP=ease(cl((f-270)/30));
  var canvasSquishX=lerp(0, -640, squishP);
  var canvasSquishScaleX=lerp(1, 0.05, squishP);
  function tilesP(i){return ease(cl((f-(90+i*1.2))/14));}
  function LoadingDots(opacity, key){
    if(opacity<0.05) return null;
    var t=f*0.35;
    var d1=0.4+0.6*(Math.sin(t)*0.5+0.5);
    var d2=0.4+0.6*(Math.sin(t+0.55)*0.5+0.5);
    var d3=0.4+0.6*(Math.sin(t+1.1)*0.5+0.5);
    return R('div',{key:key,style:{display:'flex',alignItems:'center',gap:'5px',padding:'10px 14px',borderRadius:'12px',background:'#F4F5F7',width:'fit-content',marginBottom:'10px',opacity:opacity}},
      R('div',{style:{width:'7px',height:'7px',borderRadius:'50%',background:'#6B7280',opacity:d1,transform:'scale('+(0.7+0.3*d1)+')'}}),
      R('div',{style:{width:'7px',height:'7px',borderRadius:'50%',background:'#6B7280',opacity:d2,transform:'scale('+(0.7+0.3*d2)+')'}}),
      R('div',{style:{width:'7px',height:'7px',borderRadius:'50%',background:'#6B7280',opacity:d3,transform:'scale('+(0.7+0.3*d3)+')'}})
    );
  }
  function AILoadingBanner(toolName, opacity, key){
    if(opacity<0.05) return null;
    var pulse=Math.sin(f*0.32)*0.5+0.5;
    return R('div',{key:key,style:{padding:'8px 14px',borderRadius:'10px',background:'#FFFFFF',border:'1px solid #DBE7FF',display:'flex',alignItems:'center',gap:'10px',width:'fit-content',marginBottom:'10px',opacity:opacity}},
      R('div',{style:{width:'12px',height:'12px',borderRadius:'50%',background:'#0084FF',opacity:0.4+0.6*pulse,boxShadow:'0 0 '+(6+8*pulse)+'px rgba(0,132,255,0.55)'}}),
      R('div',{style:{fontSize:'12px',color:'#6B7280'}},'Using ',R('span',{style:{fontFamily:MONO,fontWeight:600,color:'#0084FF'}},toolName))
    );
  }
  var body=R('div',{style:{position:'absolute',inset:'0',padding:'0 32px 28px 32px',display:'flex',gap:'18px'}},
    // LEFT: canvas — at the end of the scene it squishes left + scales toward 0 width
    R('div',{style:{flex:'0 0 '+lerp(540,0,squishP)+'px',background:'#FFFFFF',borderRadius:'12px',border:'1px solid #E5E7EB',overflow:'hidden',display:'flex',flexDirection:'column',opacity:canvasIn*(1-squishP),transform:'translateX('+canvasSquishX+'px) scaleX('+canvasSquishScaleX+')',transformOrigin:'left center'}},
      R('div',{style:{flex:1,position:'relative',backgroundImage:'radial-gradient(#D1D5DB 1px, transparent 1px)',backgroundSize:'20px 20px',padding:'30px 20px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'2px'}},
        R('div',{style:{width:'180px',height:'62px',borderRadius:'12px',background:'#10B981',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'10px 14px',boxShadow:'0 8px 20px rgba(16,185,129,0.30)'}},
          R('div',{style:{display:'flex',alignItems:'center',gap:'7px'}},R('span',{style:{display:'inline-block',width:'11px',height:'11px',borderRadius:'3px',background:'rgba(255,255,255,0.45)'}}),R('span',{style:{color:'#FFFFFF',fontSize:'13px',fontWeight:700}},'Chat Input')),
          R('div',{style:{alignSelf:'flex-end',display:'flex',alignItems:'center',gap:'4px',color:'#FFFFFF',fontSize:'10px',opacity:0.9}},'Message',R('span',{style:{display:'inline-block',width:'6px',height:'6px',borderRadius:'50%',background:'#FFFFFF'}}))
        ),
        R('div',{style:{width:'2px',height:'10px',background:'#94A3B8'}}),
        R('div',{style:{width:'22px',height:'22px',borderRadius:'50%',background:'#FFFFFF',border:'1.5px solid #0084FF',display:'flex',alignItems:'center',justifyContent:'center',color:'#0084FF',fontSize:'13px',fontWeight:700}},'+'),
        R('div',{style:{width:'2px',height:'10px',background:'#94A3B8'}}),
        R('div',{style:{width:'460px',borderRadius:'14px',background:'#FFFFFF',border:'2px dashed #F472B6',padding:'14px 18px',boxShadow:'0 10px 26px rgba(244,114,182,0.15)'}},
          R('div',{style:{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}},
            R('div',{style:{display:'flex',alignItems:'center',gap:'8px',padding:'4px 10px',borderRadius:'8px',background:'#FCE7F3'}},
              R('span',{style:{display:'inline-block',width:'10px',height:'10px',borderRadius:'2px',background:'#F472B6'}}),
              R('span',{style:{fontSize:'13px',fontWeight:700,color:'#BE185D'}},'AI Agent')
            ),
            R('div',{style:{marginLeft:'auto',fontSize:'10px',color:'#9CA3AF',fontWeight:600,letterSpacing:'0.5px'}},'21 TOOLS')
          ),
          R('div',{style:{display:'flex',flexWrap:'wrap',gap:'5px'}},
            [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(function(i){
              var p=tilesP(i);
              return R('div',{key:i,style:{width:'20px',height:'20px',borderRadius:'5px',background:'#111928',display:'flex',alignItems:'center',justifyContent:'center',opacity:p,transform:'scale('+(0.6+0.4*p)+')'}},NotionMark(12,'#FFFFFF'));
            })
          )
        ),
        R('div',{style:{width:'2px',height:'10px',background:'#94A3B8'}}),
        R('div',{style:{width:'22px',height:'22px',borderRadius:'50%',background:'#FFFFFF',border:'1.5px solid #0084FF',display:'flex',alignItems:'center',justifyContent:'center',color:'#0084FF',fontSize:'13px',fontWeight:700}},'+'),
        R('div',{style:{width:'2px',height:'10px',background:'#94A3B8'}}),
        R('div',{style:{width:'160px',height:'52px',borderRadius:'12px',background:'#F87171',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'8px 14px',boxShadow:'0 8px 20px rgba(248,113,113,0.30)'}},
          R('div',{style:{display:'flex',alignItems:'center',gap:'7px'}},R('span',{style:{display:'inline-block',width:'10px',height:'10px',borderRadius:'3px',background:'rgba(255,255,255,0.45)'}}),R('span',{style:{color:'#FFFFFF',fontSize:'12px',fontWeight:700}},'Chat Output')),
          R('div',{style:{alignSelf:'flex-start',display:'flex',alignItems:'center',gap:'4px',color:'#FFFFFF',fontSize:'10px',opacity:0.9}},R('span',{style:{display:'inline-block',width:'6px',height:'6px',borderRadius:'50%',background:'#FFFFFF'}}),'Message')
        )
      )
    ),
    // RIGHT: chat panel
    R('div',{style:{flex:1,background:'#FFFFFF',borderRadius:'12px',border:'1px solid #E5E7EB',overflow:'hidden',display:'flex',flexDirection:'column'}},
      R('div',{style:{padding:'12px 22px',borderBottom:'1px solid #F3F4F6',display:'flex',alignItems:'center',gap:'10px',background:'#F9FAFB'}},
        R('div',{style:{width:'26px',height:'26px',borderRadius:'7px',background:'#FFFFFF',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',justifyContent:'center'}},NotionMark(16,'#111928')),
        R('div',{style:{fontSize:'14px',fontWeight:700,color:'#111928'}},'Using Notion Tool'),
        R('div',{style:{marginLeft:'auto',display:'flex',alignItems:'center',gap:'5px',fontSize:'11px',color:'#22C55E',fontWeight:700}},R('span',{style:{display:'inline-block',width:'7px',height:'7px',borderRadius:'50%',background:'#22C55E'}}),'Live')
      ),
      R('div',{style:{flex:1,position:'relative',overflow:'hidden'}},
        R('div',{style:{position:'absolute',left:0,right:0,top:0,padding:'18px 22px'}},
          // Turn 1
          R('div',{style:{display:'flex',justifyContent:'flex-end',marginBottom:'10px',opacity:u1In}},
            R('div',{style:{padding:'10px 16px',borderRadius:'18px 18px 4px 18px',background:'#0084FF',color:'#FFFFFF',fontSize:'13px',maxWidth:'78%'}},'Explain what you can do with all your Notion tools.')
          ),
          LoadingDots(load1,'l1'),
          R('div',{style:{opacity:r1In,padding:'10px 12px',background:'#F4F5F7',borderRadius:'10px',color:'#172B4D',fontSize:'11px',lineHeight:1.45,marginBottom:'10px'}},
            R('div',{style:{fontWeight:700,fontSize:'12px',marginBottom:'4px'}},'Here\\'s what I can do for you in Notion:'),
            R('div',null,R('span',{style:{fontWeight:700,color:'#111928'}},'1) Find things'),' — semantic search (',R('span',{style:{fontFamily:MONO,color:'#0084FF'}},'notion_search'),').'),
            R('div',null,R('span',{style:{fontWeight:700,color:'#111928'}},'2) Read content'),' — page bodies, blocks, properties.'),
            R('div',null,R('span',{style:{fontWeight:700,color:'#111928'}},'3) Query databases'),' — filter and sort with structured queries.'),
            R('div',null,R('span',{style:{fontWeight:700,color:'#111928'}},'4) Create new content'),' — pages, databases, comments, blocks.'),
            R('div',null,R('span',{style:{fontWeight:700,color:'#111928'}},'5) Edit & organise'),' — update, move, archive.')
          ),
          // Turn 2
          R('div',{style:{display:'flex',justifyContent:'flex-end',marginBottom:'10px',opacity:u2In}},
            R('div',{style:{padding:'10px 16px',borderRadius:'18px 18px 4px 18px',background:'#0084FF',color:'#FFFFFF',fontSize:'13px',maxWidth:'78%'}},'Can you find a page called "Notion AI capability demo draft"?')
          ),
          R('div',{style:{fontSize:'10px',color:'#6B7280',marginBottom:'6px',opacity:u2In}},'From: AIAgent'),
          AILoadingBanner('notion_search',load2,'l2'),
          R('div',{style:{opacity:t2In,padding:'12px 14px',borderRadius:'10px',border:'1px solid #E5E7EB',background:'#FFFFFF',marginBottom:'12px'}},
            R('div',{style:{display:'flex',alignItems:'center',gap:'10px',marginBottom:'10px'}},
              R('span',{style:{fontSize:'14px'}},'⚙'),
              R('div',null,
                R('div',{style:{fontSize:'13px',fontWeight:600,color:'#111928'}},'Using ',R('span',{style:{fontFamily:MONO,color:'#0084FF'}},'notion_search')),
                R('div',{style:{fontSize:'10px',color:'#9CA3AF'}},'Search for pages and databases by title in Notion.')
              ),
              R('div',{style:{marginLeft:'auto',fontSize:'10px',color:'#9CA3AF'}},'1103 ms')
            ),
            R('div',{style:{padding:'8px 12px',background:'#F9FAFB',borderRadius:'8px',fontFamily:MONO,fontSize:'11px',color:'#111928',lineHeight:1.55,marginBottom:'6px'}},
              R('div',{style:{color:'#6B7280',fontSize:'9px',marginBottom:'2px'}},'Input'),
              R('div',null,'query: "Notion AI capability demo draft"'),
              R('div',null,'filter_type: page')
            ),
            R('div',{style:{padding:'8px 12px',background:'#0F172A',borderRadius:'8px',fontFamily:MONO,fontSize:'10px',color:'#D1D5DB',lineHeight:1.65}},
              R('div',{style:{color:'#94A3B8',fontSize:'9px',marginBottom:'2px'}},'Output'),
              R('div',null,'[{"object":"page","id":"36d0ad64-336e-80c1-…",'),
              R('div',null,'  "title":"Notion AI capability demo draft",'),
              R('div',null,'  "url":"notion.so/Notion-AI-capability-…"}]')
            )
          ),
          R('div',{style:{opacity:r2In,padding:'10px 12px',background:'#F4F5F7',borderRadius:'10px',color:'#172B4D',fontSize:'11px',lineHeight:1.45,marginBottom:'10px'}},
            R('div',null,'Yes — I can see it.'),
            R('div',null,R('span',{style:{fontWeight:700,color:'#111928'}},'Page:'),' Notion AI capability demo draft'),
            R('div',null,R('span',{style:{fontWeight:700,color:'#111928'}},'Last edited:'),' 2026-05-27 18:41')
          )
        )
      )
    )
  );
  return R('div',{style:{width:'100%',height:'100%',background:'#EEF1F4',position:'relative',fontFamily:INTER,opacity:op,overflow:'hidden'}},
    SectionLabel('Scene 7 · Chat (turns 1–2)'),
    FHChrome({
      gradId:'c1',
      tabText:'Using Notion Tool · FlowHunt',
      urlPath:'/agents/using-notion-tool/run',
      activeNav:'My Agents',
      rightBtnText:'Publish Agent',
      showEditRun:true,
      runActive:true,
      eyebrow:'AGENT, RUNNING',
      title:'Run the agent, ask anything, and watch it call Notion live — no terminal required.',
      body:body
    })
  );
}`;

/* ============================================================================
 * SCENE 8 — FH Chat 2 (Phase C turns 3 & 4 + Phase D Notion morph)
 * FH browser shrinks from 1760 → 1240 over the first 30 frames. The Notion
 * side panel appears at nX=1320, nW=600, nH=900, nY=64 and morphs from the
 * source page to the created "Capability Demo Summary".
 * ========================================================================== */
const FHChat2Scene = `function FHChat2Scene(props){${HELPERS}${FH_CHROME_HELPERS}
  var f=props.frame||0;
  var END=300;
  var sceneOut=easeIn(cl((f-(END-22))/22));
  var op=1-sceneOut;
  // FH browser shrinks over the first 30 frames (the layout transition)
  var dPhase=ease(cl(f/30));
  var browserW=lerp(1760,1240,dPhase);
  // Turns 1 + 2 from Scene 7 ARE STILL VISIBLE at the top — they were always there, so they
  // render at full opacity from f=0. The viewer perceives the chat as continuous.
  // Turn 3 lands at scene-local f=0 (the canvas-squish from Scene 7 ended right at the cut).
  var u3In=ease(cl((f-0)/14));
  var load3=cl(ease(cl((f-30)/12))-easeIn(cl((f-50)/10)));
  var t3In=ease(cl((f-50)/18));
  var r3In=ease(cl((f-95)/16));
  // Turn 4 timings — slightly later to give Turn 3 reading time
  var u4In=ease(cl((f-150)/14));
  var load4=cl(ease(cl((f-180)/12))-easeIn(cl((f-200)/10)));
  var t4In=ease(cl((f-200)/18));
  var r4In=ease(cl((f-245)/16));
  function AILoadingBanner(toolName, opacity, key){
    if(opacity<0.05) return null;
    var pulse=Math.sin(f*0.32)*0.5+0.5;
    return R('div',{key:key,style:{padding:'8px 14px',borderRadius:'10px',background:'#FFFFFF',border:'1px solid #DBE7FF',display:'flex',alignItems:'center',gap:'10px',width:'fit-content',marginBottom:'10px',opacity:opacity}},
      R('div',{style:{width:'12px',height:'12px',borderRadius:'50%',background:'#0084FF',opacity:0.4+0.6*pulse,boxShadow:'0 0 '+(6+8*pulse)+'px rgba(0,132,255,0.55)'}}),
      R('div',{style:{fontSize:'12px',color:'#6B7280'}},'Using ',R('span',{style:{fontFamily:MONO,fontWeight:600,color:'#0084FF'}},toolName))
    );
  }
  // Body content — chat only (canvas faded away with shrink). Centred + sized to the shrunk width.
  var body=R('div',{style:{position:'absolute',inset:'0',padding:'0 32px 28px 32px'}},
    R('div',{style:{height:'100%',background:'#FFFFFF',borderRadius:'12px',border:'1px solid #E5E7EB',overflow:'hidden',display:'flex',flexDirection:'column'}},
      R('div',{style:{padding:'12px 22px',borderBottom:'1px solid #F3F4F6',display:'flex',alignItems:'center',gap:'10px',background:'#F9FAFB'}},
        R('div',{style:{width:'26px',height:'26px',borderRadius:'7px',background:'#FFFFFF',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',justifyContent:'center'}},NotionMark(16,'#111928')),
        R('div',{style:{fontSize:'14px',fontWeight:700,color:'#111928'}},'Using Notion Tool'),
        R('div',{style:{marginLeft:'auto',display:'flex',alignItems:'center',gap:'5px',fontSize:'11px',color:'#22C55E',fontWeight:700}},R('span',{style:{display:'inline-block',width:'7px',height:'7px',borderRadius:'50%',background:'#22C55E'}}),'Live')
      ),
      R('div',{style:{flex:1,position:'relative',overflow:'hidden'}},
        // Inner stack pinned to the BOTTOM so the newest turn is always visible.
        // The carried-over Turn 1+2 use the SAME size + style as Scene 7 (and include the
        // notion_search tool widget) so the chat reads as one continuous thread.
        R('div',{style:{position:'absolute',left:0,right:0,bottom:0,top:0,padding:'18px 22px',display:'flex',flexDirection:'column',justifyContent:'flex-end',gap:'0'}},
          // Turn 1 — capabilities Q + A
          R('div',{style:{display:'flex',justifyContent:'flex-end',marginBottom:'10px'}},
            R('div',{style:{padding:'10px 16px',borderRadius:'18px 18px 4px 18px',background:'#0084FF',color:'#FFFFFF',fontSize:'13px',maxWidth:'78%'}},'Explain what you can do with all your Notion tools.')
          ),
          R('div',{style:{padding:'12px 14px',background:'#F4F5F7',borderRadius:'12px',color:'#172B4D',fontSize:'12px',lineHeight:1.55,marginBottom:'16px'}},
            R('div',{style:{fontWeight:700,fontSize:'13px',marginBottom:'6px'}},'Here\\'s what I can do for you in Notion:'),
            R('div',{style:{marginTop:'4px'}},R('span',{style:{fontWeight:700,color:'#111928'}},'1) Find things'),' — semantic search (',R('span',{style:{fontFamily:MONO,color:'#0084FF'}},'notion_search'),').'),
            R('div',{style:{marginTop:'4px'}},R('span',{style:{fontWeight:700,color:'#111928'}},'2) Read content'),' — fetch page bodies, blocks, properties, comments.'),
            R('div',{style:{marginTop:'4px'}},R('span',{style:{fontWeight:700,color:'#111928'}},'3) Query databases'),' — filter and sort with structured queries.'),
            R('div',{style:{marginTop:'4px'}},R('span',{style:{fontWeight:700,color:'#111928'}},'4) Create new content'),' — new pages, databases, comments, block children.'),
            R('div',{style:{marginTop:'4px'}},R('span',{style:{fontWeight:700,color:'#111928'}},'5) Edit & organise'),' — update, move, archive existing pages and blocks.')
          ),
          // Turn 2 — find page Q + tool widget + reply (matches Scene 7 exactly)
          R('div',{style:{display:'flex',justifyContent:'flex-end',marginBottom:'10px'}},
            R('div',{style:{padding:'10px 16px',borderRadius:'18px 18px 4px 18px',background:'#0084FF',color:'#FFFFFF',fontSize:'13px',maxWidth:'78%'}},'Can you find a page called "Notion AI capability demo draft"?')
          ),
          R('div',{style:{fontSize:'10px',color:'#6B7280',marginBottom:'6px'}},'From: AIAgent'),
          R('div',{style:{padding:'14px 16px',borderRadius:'12px',border:'1px solid #E5E7EB',background:'#FFFFFF',marginBottom:'12px'}},
            R('div',{style:{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}},
              R('span',{style:{fontSize:'14px'}},'⚙'),
              R('div',null,
                R('div',{style:{fontSize:'13px',fontWeight:600,color:'#111928'}},'Using ',R('span',{style:{fontFamily:MONO,color:'#0084FF'}},'notion_search')),
                R('div',{style:{fontSize:'10px',color:'#9CA3AF'}},'Search for pages and databases by title in Notion.')
              ),
              R('div',{style:{marginLeft:'auto',fontSize:'10px',color:'#9CA3AF'}},'1103 ms')
            ),
            R('div',{style:{padding:'8px 12px',background:'#F9FAFB',borderRadius:'8px',fontFamily:MONO,fontSize:'11px',color:'#111928',lineHeight:1.55,marginBottom:'6px'}},
              R('div',{style:{color:'#6B7280',fontSize:'9px',marginBottom:'2px'}},'Input'),
              R('div',null,'query: "Notion AI capability demo draft"'),
              R('div',null,'filter_type: page')
            ),
            R('div',{style:{padding:'8px 12px',background:'#0F172A',borderRadius:'8px',fontFamily:MONO,fontSize:'10px',color:'#D1D5DB',lineHeight:1.65}},
              R('div',{style:{color:'#94A3B8',fontSize:'9px',marginBottom:'2px'}},'Output'),
              R('div',null,'[{"object":"page","id":"36d0ad64-336e-80c1-…",'),
              R('div',null,'  "title":"Notion AI capability demo draft",'),
              R('div',null,'  "url":"notion.so/Notion-AI-capability-…"}]')
            )
          ),
          R('div',{style:{padding:'12px 14px',background:'#F4F5F7',borderRadius:'12px',color:'#172B4D',fontSize:'12px',lineHeight:1.55,marginBottom:'18px'}},
            R('div',null,'Yes — I can see it.'),
            R('div',{style:{marginTop:'4px'}},R('span',{style:{fontWeight:700,color:'#111928'}},'Page:'),' Notion AI capability demo draft'),
            R('div',null,R('span',{style:{fontWeight:700,color:'#111928'}},'Last edited:'),' 2026-05-27 18:41')
          ),
          // Turn 3 — lands at scene-local f=0, right after the canvas-squish cut from Scene 7
          R('div',{style:{display:'flex',justifyContent:'flex-end',marginBottom:'10px',opacity:u3In}},
            R('div',{style:{padding:'10px 16px',borderRadius:'18px 18px 4px 18px',background:'#0084FF',color:'#FFFFFF',fontSize:'13px',maxWidth:'78%'}},'Create a summary page under the same parent.')
          ),
          R('div',{style:{fontSize:'10px',color:'#6B7280',marginBottom:'6px',opacity:u3In}},'From: AIAgent'),
          AILoadingBanner('notion_create_pages',load3,'l3'),
          R('div',{style:{opacity:t3In,padding:'12px 14px',borderRadius:'10px',border:'1px solid #E5E7EB',background:'#FFFFFF',marginBottom:'12px'}},
            R('div',{style:{display:'flex',alignItems:'center',gap:'10px',marginBottom:'10px'}},
              R('span',{style:{fontSize:'14px'}},'⚙'),
              R('div',null,
                R('div',{style:{fontSize:'13px',fontWeight:600,color:'#111928'}},'Using ',R('span',{style:{fontFamily:MONO,color:'#0084FF'}},'notion_create_pages')),
                R('div',{style:{fontSize:'10px',color:'#9CA3AF'}},'Create new content under a parent page.')
              ),
              R('div',{style:{marginLeft:'auto',fontSize:'10px',color:'#9CA3AF'}},'842 ms')
            ),
            R('div',{style:{padding:'8px 12px',background:'#F9FAFB',borderRadius:'8px',fontFamily:MONO,fontSize:'11px',color:'#111928',lineHeight:1.55,marginBottom:'6px'}},
              R('div',{style:{color:'#6B7280',fontSize:'9px',marginBottom:'2px'}},'Input'),
              R('div',null,'parent: { type: "page_id", id: "36d0ad64-…" }'),
              R('div',null,'title: "Capability Demo Summary"'),
              R('div',null,'blocks: [callout, bullets, checklist]')
            ),
            R('div',{style:{padding:'8px 12px',background:'#0F172A',borderRadius:'8px',fontFamily:MONO,fontSize:'10px',color:'#D1D5DB',lineHeight:1.65}},
              R('div',{style:{color:'#94A3B8',fontSize:'9px',marginBottom:'2px'}},'Output'),
              R('div',null,'{"object":"page","id":"7e22ad64-336e-…",'),
              R('div',null,'  "url":"notion.so/Capability-Demo-Summary"}')
            )
          ),
          R('div',{style:{opacity:r3In,padding:'10px 12px',background:'#F4F5F7',borderRadius:'10px',color:'#172B4D',fontSize:'11px',lineHeight:1.45,marginBottom:'10px'}},
            R('div',null,'Done — the new page is live in your workspace.'),
            R('div',{style:{marginTop:'5px',display:'flex',alignItems:'center',gap:'6px',padding:'6px 10px',background:'#FFFFFF',border:'1px solid #DBE7FF',borderRadius:'7px'}},
              R('div',{style:{width:'16px',height:'16px',borderRadius:'4px',background:'#FFFFFF',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',justifyContent:'center'}},NotionMark(10,'#111928')),
              R('div',{style:{flex:1,fontSize:'11px',color:'#1A56DB',fontFamily:MONO}},'notion.so/Capability-Demo-Summary'),
              R('div',{style:{fontSize:'9px',color:'#22C55E',fontWeight:700}},'✓ Created')
            )
          ),
          // Turn 4
          R('div',{style:{display:'flex',justifyContent:'flex-end',marginBottom:'10px',opacity:u4In}},
            R('div',{style:{padding:'10px 16px',borderRadius:'18px 18px 4px 18px',background:'#0084FF',color:'#FFFFFF',fontSize:'13px',maxWidth:'78%'}},'Add a fourth follow-up: schedule a review meeting.')
          ),
          R('div',{style:{fontSize:'10px',color:'#6B7280',marginBottom:'6px',opacity:u4In}},'From: AIAgent'),
          AILoadingBanner('notion_append_block_children',load4,'l4'),
          R('div',{style:{opacity:t4In,padding:'12px 14px',borderRadius:'10px',border:'1px solid #E5E7EB',background:'#FFFFFF',marginBottom:'12px'}},
            R('div',{style:{display:'flex',alignItems:'center',gap:'10px',marginBottom:'10px'}},
              R('span',{style:{fontSize:'14px'}},'⚙'),
              R('div',null,
                R('div',{style:{fontSize:'13px',fontWeight:600,color:'#111928'}},'Using ',R('span',{style:{fontFamily:MONO,color:'#0084FF'}},'notion_append_block_children')),
                R('div',{style:{fontSize:'10px',color:'#9CA3AF'}},'Append a block to an existing Notion page.')
              ),
              R('div',{style:{marginLeft:'auto',fontSize:'10px',color:'#9CA3AF'}},'594 ms')
            ),
            R('div',{style:{padding:'8px 12px',background:'#F9FAFB',borderRadius:'8px',fontFamily:MONO,fontSize:'11px',color:'#111928',lineHeight:1.55,marginBottom:'6px'}},
              R('div',{style:{color:'#6B7280',fontSize:'9px',marginBottom:'2px'}},'Input'),
              R('div',null,'block_id: "7e22ad64-336e-…"'),
              R('div',null,'children: [{ type:"to_do", checked:false,'),
              R('div',null,'  rich_text:"Schedule a review meeting" }]')
            ),
            R('div',{style:{padding:'8px 12px',background:'#0F172A',borderRadius:'8px',fontFamily:MONO,fontSize:'10px',color:'#D1D5DB',lineHeight:1.65}},
              R('div',{style:{color:'#94A3B8',fontSize:'9px',marginBottom:'2px'}},'Output'),
              R('div',null,'{"object":"list","results":[{...}]}')
            )
          ),
          R('div',{style:{opacity:r4In,padding:'10px 12px',background:'#F4F5F7',borderRadius:'10px',color:'#172B4D',fontSize:'11px',lineHeight:1.45}},
            R('div',null,'Done — added the new follow-up to your page.')
          )
        )
      )
    )
  );
  // Notion side panel — slides in from the RIGHT (not from below), no easeBack bounce.
  var slideIn=ease(cl(f/30));
  var pageSettle=ease(cl((f-30)/30));
  var contentMorph=easeInOut(cl((f-130)/30));
  var skeletonOp=1-contentMorph;
  var fullOp=contentMorph;
  var nW=600, nH=900;
  var nY=64;                                 // fixed at the top of the canvas, aligned with FH
  var nX=lerp(1920, 1320, slideIn);          // slides in from off-screen-right to its resting spot
  var editedBadge=r3In>0.5?'edited a second ago':'just now';
  function checkOn(d){return ease(cl((f-(210+d))/16));}
  var notionPanel=R('div',{style:{position:'absolute',left:nX+'px',top:nY+'px',width:nW+'px',height:nH+'px',background:'#FFFFFF',borderRadius:'12px',overflow:'hidden',boxShadow:'0 40px 80px rgba(17,25,40,0.30)',border:'1px solid #D1D5DB'}},
    R('div',{style:{height:'36px',background:'#DEE1E6',display:'flex',alignItems:'flex-end',padding:'0 14px',position:'relative'}},
      R('div',{style:{position:'absolute',left:14,top:12,width:10,height:10,borderRadius:'50%',background:'#FF5F57'}}),
      R('div',{style:{position:'absolute',left:32,top:12,width:10,height:10,borderRadius:'50%',background:'#FEBC2E'}}),
      R('div',{style:{position:'absolute',left:50,top:12,width:10,height:10,borderRadius:'50%',background:'#28C840'}}),
      R('div',{style:{marginLeft:'82px',height:'28px',padding:'0 14px',background:'#F4F5F7',borderTopLeftRadius:'9px',borderTopRightRadius:'9px',display:'flex',alignItems:'center',gap:'8px',fontSize:'12px',color:'#172B4D',fontWeight:600}},
        NotionMark(13,'#111928'),
        R('span',null,(contentMorph<0.5?'Notion AI capability demo draft':'Capability Demo Summary')+' · Notion')
      )
    ),
    R('div',{style:{height:'38px',background:'#F4F5F7',borderBottom:'1px solid #DFE1E6',display:'flex',alignItems:'center',padding:'0 16px',gap:'12px'}},
      R('div',{style:{display:'flex',gap:'10px',color:'#9AA0A6',fontSize:'14px'}},R('span',null,'←'),R('span',null,'→'),R('span',null,'↻')),
      R('div',{style:{flex:1,padding:'5px 14px',background:'#FFFFFF',border:'1px solid #DFE1E6',borderRadius:'14px',fontSize:'12px',color:'#42526E',display:'flex',alignItems:'center',gap:'10px'}},
        R('div',{style:{width:7,height:7,borderRadius:'50%',background:'#22C55E'}}),
        R('span',{style:{color:'#172B4D'}},'notion.so'),
        R('span',{style:{color:'#6B7280'}},contentMorph<0.5?'/Notion-AI-capability-demo-draft-36d0ad64336e80c18627e0c275f0da3b':'/Capability-Demo-Summary-7e22ad64336e80b1a4f4c1e0b89df073')
      )
    ),
    R('div',{style:{padding:'36px 48px 28px 48px',position:'relative',transform:'translateY('+(16*(1-pageSettle))+'px)',opacity:pageSettle,minHeight:'480px'}},
      R('div',{style:{position:'absolute',top:'14px',right:'20px',padding:'4px 10px',background:'#DCFCE7',color:'#15803D',fontSize:'10px',fontWeight:700,borderRadius:'12px',border:'1px solid #86EFAC',display:'flex',alignItems:'center',gap:'5px',opacity:fullOp}},
        R('span',null,'✓'),'Created via Notion MCP'
      ),
      R('div',{style:{position:'absolute',left:'48px',right:'48px',top:'36px',opacity:skeletonOp}},
        R('div',{style:{fontSize:'30px',fontWeight:800,color:'#111928',letterSpacing:'-0.8px',marginBottom:'20px'}},'Notion AI capability demo draft'),
        R('div',{style:{fontSize:'17px',fontWeight:700,color:'#111928',marginTop:'14px'}},'Quick actions'),
        R('div',{style:{fontSize:'13px',color:'#374151',marginTop:'4px'}},'• Add your assignment list as a checklist with due dates'),
        R('div',{style:{fontSize:'17px',fontWeight:700,color:'#111928',marginTop:'14px'}},'Mini slide deck'),
        R('div',{style:{fontSize:'13px',color:'#374151',marginTop:'4px'}},'Use Present to view as slides.'),
        R('div',{style:{fontSize:'17px',fontWeight:700,color:'#111928',marginTop:'14px'}},'Slide 1: Goal'),
        R('div',{style:{fontSize:'13px',color:'#374151',marginTop:'4px'}},'Show structure: headings, lists, callouts, tables'),
        R('div',{style:{fontSize:'17px',fontWeight:700,color:'#111928',marginTop:'14px'}},'Slide 2: Output types'),
        R('div',{style:{fontSize:'13px',color:'#374151',marginTop:'4px'}},'Summaries and outlines')
      ),
      R('div',{style:{position:'absolute',left:'48px',right:'48px',top:'36px',opacity:fullOp}},
        R('div',{style:{fontSize:'30px',fontWeight:800,color:'#111928',letterSpacing:'-0.8px',marginBottom:'6px'}},'Capability Demo Summary'),
        R('div',{style:{fontSize:'12px',color:'#9CA3AF',marginBottom:'20px',display:'flex',alignItems:'center',gap:'8px'}},
          R('span',null,'Created by Using Notion Tool'),
          R('span',{style:{color:'#D1D5DB'}},'·'),
          R('span',{style:{color:r3In>0.5?'#15803D':'#9CA3AF',fontWeight:r3In>0.5?600:400}},editedBadge)
        ),
        R('div',{style:{padding:'12px 16px',background:'#EEF4FF',border:'1px solid #DBE7FF',borderRadius:'10px',color:'#1A56DB',fontSize:'13px',marginBottom:'20px',display:'flex',alignItems:'center',gap:'10px'}},
          R('div',{style:{width:'20px',height:'20px',borderRadius:'5px',background:'#FFFFFF',border:'1px solid #DBE7FF',display:'flex',alignItems:'center',justifyContent:'center'}},NotionMark(12,'#111928')),
          R('div',null,R('span',{style:{fontWeight:700}},'Source: '),'Notion AI capability demo draft')
        ),
        R('div',{style:{fontSize:'18px',fontWeight:700,color:'#111928',marginBottom:'8px'}},'Summary'),
        R('div',{style:{fontSize:'13px',color:'#374151',lineHeight:1.65,marginBottom:'18px'}},
          R('div',null,'•  Quick actions for ad-hoc checklists and rewrites.'),
          R('div',null,'•  A mini slide deck used in Presentation Mode.'),
          R('div',null,'•  Two example slides covering goal and output types.')
        ),
        R('div',{style:{fontSize:'18px',fontWeight:700,color:'#111928',marginBottom:'8px'}},'Follow-ups'),
        R('div',{style:{fontSize:'13px',color:'#374151',lineHeight:1.85}},
          R('div',{style:{display:'flex',alignItems:'center',gap:'10px'}},
            R('div',{style:{width:'14px',height:'14px',borderRadius:'3px',border:'1.5px solid #9CA3AF'}}),
            R('span',null,'Pick a real "Quick actions" task to walk through with the agent.')
          ),
          R('div',{style:{display:'flex',alignItems:'center',gap:'10px'}},
            R('div',{style:{width:'14px',height:'14px',borderRadius:'3px',border:'1.5px solid #9CA3AF'}}),
            R('span',null,'Record the slide deck as a thirty-second screen capture.')
          ),
          R('div',{style:{display:'flex',alignItems:'center',gap:'10px'}},
            R('div',{style:{width:'14px',height:'14px',borderRadius:'3px',border:'1.5px solid #9CA3AF'}}),
            R('span',null,'Link this summary back from the source page.')
          ),
          R('div',{style:{display:'flex',alignItems:'center',gap:'10px',opacity:r4In}},
            R('div',{style:{width:'14px',height:'14px',borderRadius:'3px',border:'1.5px solid #0084FF',background:r4In>0.5?'#EEF4FF':'transparent'}}),
            R('span',{style:{color:r4In>0.5?'#0084FF':'#9CA3AF',fontWeight:r4In>0.5?600:400}},'Schedule a review meeting.')
          )
        )
      )
    )
  );
  return R('div',{style:{width:'100%',height:'100%',background:'#EEF1F4',position:'relative',fontFamily:INTER,opacity:op,overflow:'hidden'}},
    SectionLabel('Scene 8 · Chat (turns 3–4) + Notion morph'),
    FHChrome({
      gradId:'c2',
      tabText:'Using Notion Tool · FlowHunt',
      urlPath:'/agents/using-notion-tool/run',
      activeNav:'My Agents',
      rightBtnText:'Publish Agent',
      showEditRun:true,
      runActive:true,
      eyebrow:'AGENT, RUNNING',
      title:'Run the agent, ask anything, and watch it call Notion live — no terminal required.',
      browserW:browserW,
      browserAnchorLeft:true,
      body:body
    }),
    notionPanel
  );
}`;

/* ============================================================================
 * SCENE 9 — FH Result (final reveal — full-screen Notion page, no FH chrome)
 * ========================================================================== */

/* ============================================================================
 * SCENE 10 — CTA (FlowHunt mark + wordmark at the BOTTOM)
 * ========================================================================== */
const CTAScene = `function CTAScene(props){${HELPERS}
  var f=props.frame||0;
  var END=240;
  var eyebrowIn=ease(cl(f/20));
  var titleIn=ease(cl((f-22)/22));
  var subIn=ease(cl((f-44)/22));
  var btnIn=ease(cl((f-66)/22));
  var urlIn=ease(cl((f-90)/22));
  var divIn=ease(cl((f-112)/16));
  var fhIn=ease(cl((f-130)/22));
  var sceneOut=easeIn(cl((f-(END-16))/16));
  var op=1-sceneOut;
  var btnNudge=Math.sin(f/12)*3;
  return R('div',{style:{width:'100%',height:'100%',background:'#FFFFFF',position:'relative',fontFamily:INTER,opacity:op,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',paddingTop:'80px'}},
    SectionLabel('Scene 9 · CTA'),
    // Top: eyebrow + tight title + subtitle + button + URL
    R('div',{style:{fontSize:'13px',fontWeight:700,color:'#6B7280',letterSpacing:'3px',marginBottom:'18px',opacity:eyebrowIn}},'ONE SETUP · TWO SURFACES'),
    R('div',{style:{fontSize:'72px',fontWeight:800,color:'#111928',letterSpacing:'-1.8px',textAlign:'center',lineHeight:1.08,maxWidth:'1700px',opacity:titleIn,transform:'translateY('+(10*(1-titleIn))+'px)',whiteSpace:'nowrap'}},
      'Notion in ',
      R('span',{style:{background:grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}},'Claude Code'),
      ' and ',
      R('span',{style:{background:grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}},'FlowHunt.')
    ),
    R('div',{style:{marginTop:'22px',fontSize:'22px',color:'#6B7280',fontWeight:500,opacity:subIn,maxWidth:'1100px',textAlign:'center',lineHeight:1.45}},'One MCP, one OAuth, two places to run it from. The full walkthrough is on the FlowHunt blog.'),
    R('div',{style:{marginTop:'42px',padding:'18px 38px',borderRadius:'34px',background:grad,color:'#FFFFFF',fontSize:'20px',fontWeight:600,opacity:btnIn,transform:'translateY('+(10*(1-btnIn))+'px) scale('+(0.92+0.08*btnIn)+')',boxShadow:'0 14px 30px rgba(0,132,255,0.32)',display:'flex',alignItems:'center',gap:'10px'}},
      'Read on FlowHunt',
      R('span',{style:{transform:'translateX('+btnNudge+'px)',display:'inline-block'}},'→')
    ),
    R('div',{style:{marginTop:'16px',fontSize:'17px',color:'#9CA3AF',fontFamily:MONO,opacity:urlIn}},'flowhunt.io/blog'),

    // BOTTOM — FlowHunt lockup (mark + wordmark + tagline) as the brand hero
    R('div',{style:{position:'absolute',left:'50%',bottom:'150px',transform:'translateX(-50%)',width:'280px',height:'1px',background:'#E5E7EB',opacity:divIn}}),
    R('div',{style:{position:'absolute',left:0,right:0,bottom:'48px',display:'flex',flexDirection:'column',alignItems:'center',gap:'10px',opacity:fhIn,transform:'translateY('+(10*(1-fhIn))+'px)'}},
      R('div',{style:{display:'flex',alignItems:'center',gap:'18px'}},
        R('svg',{width:64,height:52,viewBox:'0 0 275 223'},
          R('defs',null,R('linearGradient',{id:'cta-fh',x1:0,y1:0,x2:1,y2:1},R('stop',{offset:0,stopColor:'#0084FF'}),R('stop',{offset:1,stopColor:'#1A56DB'}))),
          R('path',{d:'${FH_MARK_PATH}',fill:'url(#cta-fh)'})
        ),
        R('div',{style:{display:'flex',fontSize:'56px',fontWeight:800,letterSpacing:'-1px',lineHeight:1}},
          R('span',{style:{color:'#111928'}},'Flow'),
          R('span',{style:{background:grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}},'Hunt')
        )
      ),
      R('div',{style:{fontSize:'15px',fontWeight:500,color:'#6B7280',letterSpacing:'0.5px'}},'Build AI agents visually. No code.')
    )
  );
}`;

// ----------------------------------------------------------------------------
// scene() helper — adds watermark layer below the main component
// ----------------------------------------------------------------------------
function scene(id, frames, componentName, opts = {}) {
  const transition = opts.transition || { type: 'fade', duration: 18 };
  const dark = !!opts.dark;
  const layers = [
    {
      id: `${id}-layer`,
      type: 'custom',
      position: { x: 0, y: 0 },
      size: { width: 1920, height: 1080 },
      customComponent: { name: componentName, props: {} },
    },
  ];
  // CTA scene shows the FH mark+wordmark as its OWN content at the bottom,
  // so we suppress the small watermark there to avoid duplication.
  if (!opts.suppressWatermark) {
    layers.push({
      id: `${id}-watermark`,
      type: 'custom',
      position: { x: 0, y: 990 },
      size: { width: 1920, height: 50 },
      customComponent: { name: 'Watermark', props: { dark } },
    });
  }
  return {
    id,
    startFrame: frames.start,
    endFrame: frames.end,
    backgroundColor: '#FFFFFF',
    transition,
    layers,
  };
}

const template = {
  name: 'claude-code-notion-mcp',
  description: 'Motion-graphics promo for the FlowHunt blog "How to Use Claude Code with the Notion MCP".',
  version: '2.0.0',
  output: {
    type: 'video',
    width: 1920,
    height: 1080,
    fps: FPS,
    duration: TOTAL_SECONDS,
    backgroundColor: '#FFFFFF',
  },
  customComponents: {
    Watermark:           { type: 'inline', code: Watermark },
    PivotScene:          { type: 'inline', code: PivotScene },
    InstallScene:        { type: 'inline', code: InstallScene },
    ArchScene:           { type: 'inline', code: ArchScene },
    DemoScene:           { type: 'inline', code: DemoScene },
    FHMarketplaceScene:  { type: 'inline', code: FHMarketplaceScene },
    FHToolCatalogScene:  { type: 'inline', code: FHToolCatalogScene },
    FHChat1Scene:        { type: 'inline', code: FHChat1Scene },
    FHChat2Scene:        { type: 'inline', code: FHChat2Scene },
    CTAScene:            { type: 'inline', code: CTAScene },
  },
  inputs: [],
  composition: {
    scenes: [
      scene('s1-pivot',           F.pivot,     'PivotScene'),
      scene('s2-install',         F.install,   'InstallScene'),
      scene('s3-arch',            F.arch,      'ArchScene'),
      scene('s4-demo',            F.demo,      'DemoScene'),
      scene('s5a-fh-marketplace', F.fhMarket,  'FHMarketplaceScene'),
      scene('s5b-fh-toolcatalog', F.fhCatalog, 'FHToolCatalogScene'),
      scene('s5c1-fh-chat1',      F.fhChat1,   'FHChat1Scene',   { transition: { type: 'fade', duration: 0 } }),
      scene('s5c2-fh-chat2',      F.fhChat2,   'FHChat2Scene'),
      scene('s6-cta',             F.cta,       'CTAScene', { suppressWatermark: true, transition: { type: 'fade', duration: 26 } }),
    ],
  },
};

// Sanity check
const lastEnd = template.composition.scenes[template.composition.scenes.length - 1].endFrame;
const expected = Math.round(template.output.duration * template.output.fps);
if (lastEnd !== expected) {
  console.error(`ERROR: last endFrame (${lastEnd}) != duration*fps (${expected}). Black-tail risk.`);
  process.exit(1);
}

writeFileSync(join(__dirname, 'template.json'), JSON.stringify(template, null, 2));
console.log(`✓ template.json written — ${template.composition.scenes.length} scenes · ${TOTAL_FRAMES} frames · ${TOTAL_SECONDS.toFixed(2)} s`);
