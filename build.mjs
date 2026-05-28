// Builds template.json from inline React component source below.
// Edit a scene, re-run `node build.mjs`, click Load again in the playground.

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { CLAUDE_ICON } from './assets.mjs';
const __dirname = dirname(fileURLToPath(import.meta.url));

const FPS = 30;
// Order: Pivot → Install → Arch → Demo → FlowHunt → CTA. Snapshot removed.
const F = {
  pivot:    { start: 0,    end: 105,  dur: 105 },  // 3.5s
  install:  { start: 105,  end: 405,  dur: 300 },  // 10s
  arch:     { start: 405,  end: 615,  dur: 210 },  // 7s
  demo:     { start: 615,  end: 885,  dur: 270 },  // 9s   — sped up from 13s
  flowhunt: { start: 885,  end: 1785, dur: 900 },  // 30s  — A Integrations · B Tool scroll · C Multi-turn chat with loading dots · D Notion page reveal (Phase D now overlaps with Turn 3 of chat)
  cta:      { start: 1785, end: 2055, dur: 270 },  // 9s
};
const TOTAL_FRAMES = 2055;
const TOTAL_SECONDS = TOTAL_FRAMES / FPS;

const HELPERS = `var R=React.createElement;var cl=function(x){return Math.max(0,Math.min(1,x));};var ease=function(t){return 1-Math.pow(1-t,3);};var easeIn=function(t){return t*t*t;};var easeInOut=function(t){return t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;};var easeBack=function(t){var c1=1.70158;var c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2);};var lerp=function(a,b,t){return a+(b-a)*t;};var grad='linear-gradient(90deg,#0084FF,#1A56DB)';var INTER="Inter,system-ui,sans-serif";var MONO='"JetBrains Mono",ui-monospace,Menlo,monospace';var CLAUDE_ICON_URI='${CLAUDE_ICON}';function NotionMark(size,color){return R('svg',{width:size,height:size,viewBox:'0 0 100 100'},R('path',{d:'M16 18 L16 84 L26 84 L26 38 L72 84 L84 84 L84 18 L74 18 L74 64 L26 18 Z',fill:color||'#111928'}));}function BriefcaseIcon(size,color){return R('svg',{width:size,height:size,viewBox:'0 0 24 24',fill:'none'},R('rect',{x:3,y:7,width:18,height:13,rx:2,fill:color||'#A0522D'}),R('path',{d:'M8 7 V5 a2 2 0 0 1 2-2 h4 a2 2 0 0 1 2 2 V7',stroke:color||'#7C3E1A',strokeWidth:1.5,fill:'none'}),R('rect',{x:3,y:11,width:18,height:2,fill:'rgba(0,0,0,0.18)'}));}function GitHubMark(size){return R('svg',{width:size,height:size,viewBox:'0 0 16 16',fill:'#FFFFFF'},R('path',{d:'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z'}));}function SlackMark(size){return R('svg',{width:size,height:size,viewBox:'0 0 24 24'},R('rect',{x:2,y:10,width:8,height:4,rx:2,fill:'#36C5F0'}),R('rect',{x:14,y:10,width:8,height:4,rx:2,fill:'#2EB67D'}),R('rect',{x:10,y:2,width:4,height:8,rx:2,fill:'#ECB22E'}),R('rect',{x:10,y:14,width:4,height:8,rx:2,fill:'#E01E5A'}));}function DriveMark(size){return R('svg',{width:size,height:size,viewBox:'0 0 24 24'},R('path',{d:'M7.5 3 L16.5 3 L23 14 L14 14 Z',fill:'#FFD04B'}),R('path',{d:'M7.5 3 L1 14 L5.5 22 L12 11 Z',fill:'#1FA463'}),R('path',{d:'M14 14 L23 14 L18.5 22 L9.5 22 Z',fill:'#3777E3'}));}`;

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
  var END=300;
  var sceneOut=easeIn(cl((f-(END-20))/20));
  var op=1-sceneOut;
  var termIn=ease(cl(f/22));
  function lineAt(d){return ease(cl((f-d)/12));}
  function typed(text,start,speed){var n=Math.floor(cl((f-start)/speed)*text.length);return text.slice(0,n);}
  // Single command line, then the confirmation, then /mcp, then auth handshake.
  // Cleaner than the original three-scopes version — no warning lines, no "!" markers.
  var cmd1='claude mcp add --transport http notion https://mcp.notion.com/mcp';
  var cmd1Typed=typed(cmd1,22,40);
  var l1Done=lineAt(72);
  var hintP=ease(cl((f-94)/16));
  var promptMcp=ease(cl((f-130)/16));
  var slashIn=ease(cl((f-148)/16));
  var authIn=ease(cl((f-172)/16));
  var urlIn=ease(cl((f-196)/16));
  var browserNote=ease(cl((f-216)/16));
  // OAuth card phases in when the auth URL appears
  var oauthIn=ease(cl((f-208)/26));
  var pulse=(Math.sin((f-230)/4))*0.5+0.5;
  return R('div',{style:{width:'100%',height:'100%',background:'#F3F4F6',position:'relative',fontFamily:INTER,opacity:op,overflow:'hidden'}},
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
        R('div',null,R('span',{style:{color:'#22D3EE'}},'$ '),R('span',null,cmd1Typed),f<70?R('span',{style:{display:'inline-block',width:'9px',height:'18px',background:'#22D3EE',marginLeft:'2px',verticalAlign:'middle',opacity:(Math.floor(f/8)%2)===0?1:0}}):null),
        f>=72?R('div',{style:{opacity:l1Done,color:'#22C55E',marginTop:'8px'}},'✓ Added MCP server "notion" — http transport, registered for this project.'):null,
        f>=94?R('div',{style:{opacity:hintP,color:'#94A3B8',fontSize:'14px',marginTop:'4px',marginLeft:'18px'}},'Use --scope user to enable it across every Claude Code project on this machine.'):null,
        // Step 2: launch Claude Code and trigger the OAuth flow with /mcp
        f>=130?R('div',{style:{opacity:promptMcp,marginTop:'20px'}},R('span',{style:{color:'#22D3EE'}},'$ '),'claude'):null,
        f>=148?R('div',{style:{opacity:slashIn,marginTop:'10px'}},R('span',{style:{color:'#A78BFA'}},'/'),'mcp'):null,
        f>=172?R('div',{style:{opacity:authIn,marginTop:'14px',color:'#CBD5E1'}},'Connecting to the Notion MCP server…'):null,
        f>=196?R('div',{style:{opacity:urlIn,marginTop:'10px',fontSize:'13px',color:'#22D3EE',wordBreak:'break-all'}},'https://mcp.notion.com/authorize?response_type=code&client_id=…'):null,
        f>=216?R('div',{style:{opacity:browserNote,marginTop:'10px',color:'#94A3B8',fontSize:'14px'}},'Claude Code opened your browser to finish the Notion handshake.'):null
      )
    ),
    // RIGHT — Notion MCP OAuth consent (full-height right half)
    f>=180?R('div',{style:{position:'absolute',right:'32px',top:'32px',width:'928px',height:'940px',background:'#FFFFFF',borderRadius:'12px',border:'1px solid #E5E7EB',boxShadow:'0 24px 50px rgba(17,25,40,0.18)',opacity:oauthIn,transform:'translateX('+(20*(1-oauthIn))+'px)',padding:'56px 64px',overflow:'hidden'}},
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
  var END=210;
  var sceneOut=easeIn(cl((f-(END-20))/20));
  var op=1-sceneOut;
  var titleIn=ease(cl(f/22));
  // Three columns: You (left), Claude Code (big middle box, contains Notion MCP), Notion (right)
  var youIn=easeBack(cl((f-18)/22));
  var ccIn=easeBack(cl((f-36)/22));
  var notionIn=easeBack(cl((f-54)/22));
  var mcpIn=ease(cl((f-72)/22)); // the inner Notion MCP card slides up into Claude Code
  // Single continuous blue line from x=400 to x=1520, drawing in left→right.
  // The Claude Code box overlays the middle, so the line visually breaks at the box edges
  // even though it's one element. No black or grey return arrows — pure blue throughout.
  var lineProgress=ease(cl((f-90)/36));   // line draws fully by f=126
  // Dot travels continuously from x=400 to x=1520 with easeInOut. It passes behind the
  // Claude Code box (the box renders later in the DOM so it covers the dot during the
  // middle of the journey), giving a seamless "into Claude Code, out to Notion" feel.
  // Duration tuned so the dot completes its journey ~10 frames before scene-out begins.
  var dotT=easeInOut(cl((f-130)/55));
  var dotX=lerp(400,1520,dotT);
  // Labels — blue, ABOVE the line, centered on each segment's midpoint.
  // Below them in smaller black text: a "why" caption explaining each leg of the trip.
  var labelsIn=ease(cl((f-138)/22));
  var captionsIn=ease(cl((f-156)/22));

  function arrowHead(x,y,p,color){
    if(p<0.05)return null;
    return R('svg',{key:'ah',width:14,height:14,viewBox:'0 0 14 14',style:{position:'absolute',left:(x-12)+'px',top:(y-7)+'px',opacity:p}},R('path',{d:'M 0 0 L 14 7 L 0 14 Z',fill:color}));
  }

  return R('div',{style:{width:'100%',height:'100%',background:'#FFFFFF',position:'relative',fontFamily:INTER,opacity:op}},
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
  // Compressed by ~30 % from the v7 timing so the whole demo finishes in 9 s.
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
  var cardMorphP=easeInOut(cl((f-192)/32));
  // Narrator pill — bottom centre, clears the watermark
  var pillIn=ease(cl((f-238)/18));
  // Terminal + card raised so bottom edge ~= y=920 (well above watermark at y=990)
  var paneTop=32, paneH=888;
  return R('div',{style:{width:'100%',height:'100%',background:'#F3F4F6',fontFamily:INTER,position:'relative',opacity:op,overflow:'hidden'}},
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
        f>=86?R('div',{style:{opacity:t1Call,marginTop:'10px'}},R('span',{style:{color:'#22D3EE'}},'⏺ '),R('span',{style:{color:'#A78BFA'}},'notion - notion-search'),R('span',{style:{color:'#9CA3AF'}},'(query: "Notion AI capability demo draft")')):null,
        f>=104?R('div',{style:{opacity:t1Res,color:'#22C55E'}},'  ⎿  1 page  ·  36d0ad64...91f1f'):null,
        f>=128?R('div',{style:{marginTop:'14px'}},R('span',{style:{color:'#9CA3AF'}},'> '),R('span',null,prompt2Typed)):null,
        f>=172?R('div',{style:{opacity:t2Call,marginTop:'10px'}},R('span',{style:{color:'#22D3EE'}},'⏺ '),R('span',{style:{color:'#A78BFA'}},'notion - notion-fetch'),R('span',{style:{color:'#9CA3AF'}},'(id: 36d0ad64...91f1f)')):null,
        f>=190?R('div',{style:{opacity:t2Res,color:'#22C55E'}},'  ⎿  4 headings  ·  12 blocks'):null,
        f>=200?R('div',{style:{opacity:outlineIn,marginTop:'6px',marginLeft:'16px',padding:'8px 14px',background:'rgba(148,163,184,0.08)',borderLeft:'3px solid #1A56DB',borderRadius:'4px',fontSize:'14px',color:'#CBD5E1',lineHeight:1.6}},
          R('div',null,'# Quick actions'),
          R('div',null,'# Mini slide deck'),
          R('div',null,'# Slide 1: Goal'),
          R('div',null,'# Slide 2: Output types')
        ):null,
        f>=220?R('div',{style:{marginTop:'14px'}},R('span',{style:{color:'#9CA3AF'}},'> '),R('span',null,prompt3Typed)):null,
        f>=264?R('div',{style:{opacity:t3Call,marginTop:'10px'}},R('span',{style:{color:'#22D3EE'}},'⏺ '),R('span',{style:{color:'#A78BFA'}},'notion - notion-create-pages'),R('span',{style:{color:'#9CA3AF'}},'({title:"Capability Demo Summary"})')):null,
        f>=282?R('div',{style:{opacity:t3Res,color:'#22C55E'}},'  ⎿  ✓ Created  ·  7e22ad64...f073'):null,
        f>=296?R('div',{style:{opacity:t3Url,color:'#22D3EE',textDecoration:'underline',marginLeft:'8px'}},'notion.so/Capability-Demo-Summary'):null,
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
 * SCENE 5 — FlowHunt (figma-style 3-phase store/web-app)
 * A Integrations marketplace · B Notion-only tool grid (scrolls down) · C Canvas with small AI Agent + live result
 * No big pink emoji box. AI Agent is a small fhNode-style card with the Notion mark.
 * ========================================================================== */
const FlowHuntScene = `function FlowHuntScene(props){${HELPERS}
  var f=props.frame||0;
  var END=900;
  var sceneOut=easeIn(cl((f-(END-22))/22));
  var op=1-sceneOut;
  // Four phases inside a Chrome-wrapped FlowHunt web app.
  // Phases C and D OVERLAP from ~600 onwards — the Notion tab slides into the right half
  // while the chat (left) continues showing Turn 3, so the viewer sees the create-pages
  // tool call AND the resulting Notion page being built at the same time.
  function fade(a,b){var inF=ease(cl((f-a)/22));var outF=easeIn(cl((f-(b-22))/22));return cl(inF-outF);}
  var aOp=fade(0, 90);       // A — Integrations marketplace (shorter, cut ~2 s)
  var bOp=fade(90, 340);     // B — Tool catalog scroll
  var cOp=fade(340, 870);    // C — Canvas + multi-turn chat (canvas fades around 600 to make room for D)
  var dOp=fade(600, 900);    // D — Notion page reveal (starts during Turn 3)

  // Phase headlines (eyebrow + title) crossfade per phase
  function copyOp(phaseStart, phaseEnd){var inF=ease(cl((f-phaseStart)/18));var outF=easeIn(cl((f-(phaseEnd-18))/18));return cl(inF-outF);}
  var copyA=copyOp(0, 90);
  var copyB=copyOp(90, 340);
  var copyC=copyOp(340, 600);
  var copyD=copyOp(600, 900);

  // Layout: at f<600 chat sits next to a wide canvas. At f>=600 the canvas fades, chat shrinks
  // to the left half, and the Notion browser slides in on the right half.
  var dPhase=ease(cl((f-590)/30));   // 0 → 1 over the transition window
  var canvasOp=1-dPhase;              // canvas fades out as Phase D arrives

  // Browser chrome geometry (matches the canonical pattern from the jira reference)
  var browserW=1760, browserH=900;
  var browserX=(1920-browserW)/2;   // 80
  var browserY=64;
  var chromeBarH=38;
  var urlBarH=42;
  var pageHdrH=54;
  var bodyTop=browserY+chromeBarH+urlBarH+pageHdrH;
  var bodyLeft=browserX;
  var bodyW=browserW;
  var bodyH=browserH-(chromeBarH+urlBarH+pageHdrH);
  // URL bar path varies per phase
  var urlPath=(f<90)?'/integrations':(f<340?'/agents/using-notion-tool/edit':'/agents/using-notion-tool/run');

  // Notion tool list (used in B's scrolling grid)
  var allTools=['Search Notion','Retrieve Notion Page','Retrieve Notion Block','Retrieve Notion Data Source','Retrieve Notion Comments','Retrieve Notion Page Property','Create Notion Page','Create Notion Comment','Create Notion Data Source','Append Notion Block Children','Update Notion Page','Update Notion Block','Update Notion Data Source','Move Notion Page','Delete Notion Block','Get Notion Block Children','Get Notion Bot User','Get Notion User','List Notion Users','List Notion Data Source Templates','Query Notion Data Source'];

  // figma-style fhNode helper — small card with coloured header bar + port labels
  function fhNode(opts){
    var p=opts.opacity;
    if(p<0.005) return null;
    return R('div',{key:opts.key||opts.title,style:{position:opts.position||'static',left:opts.x?opts.x+'px':null,top:opts.y?opts.y+'px':null,width:opts.w+'px',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'10px',boxShadow:'0 8px 22px rgba(17,25,40,0.08)',overflow:'hidden',opacity:p,transform:'scale('+(0.93+0.07*p)+')'}},
      // Header
      R('div',{style:{padding:'8px 12px',borderBottom:'1px solid #F3F4F6',background:opts.headerBg||'#F8FAFC',display:'flex',alignItems:'center',gap:'8px'}},
        opts.icon?opts.icon:R('div',{style:{width:'6px',height:'6px',borderRadius:'2px',background:opts.dot||'#9CA3AF'}}),
        R('div',{style:{fontSize:'12px',fontWeight:700,color:opts.textColor||'#111928'}},opts.title)
      ),
      // Ports
      R('div',{style:{padding:'8px 0'}}, (opts.ports||[]).map(function(p,i){
        return R('div',{key:'pt'+i,style:{display:'flex',alignItems:'center',justifyContent:p.side==='r'?'flex-end':'flex-start',padding:'2px 10px',fontSize:'10px',color:'#374151',position:'relative'}},
          p.side==='l'?R('span',{style:{display:'inline-block',width:'7px',height:'7px',borderRadius:'50%',background:p.color||'#9CA3AF',position:'absolute',left:'-4px'}}):null,
          R('span',null,p.label),
          p.side==='r'?R('span',{style:{display:'inline-block',width:'7px',height:'7px',borderRadius:'50%',background:p.color||'#9CA3AF',position:'absolute',right:'-4px'}}):null
        );
      }))
    );
  }

  return R('div',{style:{width:'100%',height:'100%',background:'#EEF1F4',position:'relative',fontFamily:INTER,opacity:op,overflow:'hidden'}},

    // ────────────────── Chrome browser window ──────────────────
    R('div',{style:{position:'absolute',left:browserX+'px',top:browserY+'px',width:browserW+'px',height:browserH+'px',background:'#FFFFFF',borderRadius:'12px',overflow:'hidden',boxShadow:'0 30px 70px rgba(17,25,40,0.22)',border:'1px solid #D1D5DB'}},
      // Chrome chrome bar — traffic lights + tab
      R('div',{style:{height:chromeBarH+'px',background:'#DEE1E6',display:'flex',alignItems:'flex-end',padding:'0 14px',position:'relative'}},
        R('div',{style:{position:'absolute',left:14,top:12,width:12,height:12,borderRadius:'50%',background:'#FF5F57'}}),
        R('div',{style:{position:'absolute',left:34,top:12,width:12,height:12,borderRadius:'50%',background:'#FEBC2E'}}),
        R('div',{style:{position:'absolute',left:54,top:12,width:12,height:12,borderRadius:'50%',background:'#28C840'}}),
        R('div',{style:{marginLeft:'90px',height:'30px',padding:'0 16px',background:'#F4F5F7',borderTopLeftRadius:'9px',borderTopRightRadius:'9px',display:'flex',alignItems:'center',gap:'9px',fontSize:'13px',color:'#172B4D',fontWeight:600}},
          R('svg',{width:14,height:11,viewBox:'0 0 275 223'},
            R('defs',null,R('linearGradient',{id:'fhtab',x1:0,y1:0,x2:1,y2:1},R('stop',{offset:0,stopColor:'#0084FF'}),R('stop',{offset:1,stopColor:'#1A56DB'}))),
            R('path',{d:'${FH_MARK_PATH}',fill:'url(#fhtab)'})
          ),
          R('span',null,(f<90?'Integrations':'Using Notion Tool')+' · FlowHunt')
        )
      ),
      // URL bar
      R('div',{style:{height:urlBarH+'px',background:'#F4F5F7',borderBottom:'1px solid #DFE1E6',display:'flex',alignItems:'center',padding:'0 16px',gap:'12px'}},
        R('div',{style:{display:'flex',gap:'12px',color:'#9AA0A6',fontSize:'15px'}},
          R('span',null,'←'),R('span',null,'→'),R('span',null,'↻')
        ),
        R('div',{style:{flex:1,padding:'6px 14px',background:'#FFFFFF',border:'1px solid #DFE1E6',borderRadius:'16px',fontSize:'13px',color:'#42526E',display:'flex',alignItems:'center',gap:'10px'}},
          R('div',{style:{width:7,height:7,borderRadius:'50%',background:'#22C55E'}}),
          R('span',{style:{color:'#172B4D'}},'app.flowhunt.io'),
          R('span',{style:{color:'#6B7280'}},urlPath)
        )
      ),
      // FlowHunt in-page header — breadcrumb · Edit/Run/Batch pill · History · Publish
      R('div',{style:{height:pageHdrH+'px',background:'#FFFFFF',borderBottom:'1px solid #E5E7EB',display:'flex',alignItems:'center',padding:'0 22px',gap:'14px',position:'relative'}},
        R('div',{style:{fontSize:'13px',color:'#6B7280',display:'flex',alignItems:'center',gap:'6px'}},R('span',null,'‹'),R('span',null,'Agents')),
        R('div',{style:{display:'flex',alignItems:'center',gap:'6px',fontSize:'13px',color:'#111928',fontWeight:700}},
          R('span',null,f<90?'Integrations':'Using Notion Tool'),
          f>=90?R('span',{style:{color:'#9CA3AF',fontWeight:500}},'▾'):null
        ),
        // Centre: Edit | Run | Batch toggle (Run active during Phase C, Edit otherwise)
        f>=90?R('div',{style:{position:'absolute',left:'50%',transform:'translateX(-50%)',display:'flex',alignItems:'center',padding:'3px',background:'#F4F5F7',border:'1px solid #E5E7EB',borderRadius:'999px',gap:'2px',fontSize:'13px',fontWeight:600}},
          R('div',{style:{padding:'5px 18px',background:(f<340?'#111928':'transparent'),color:(f<340?'#FFFFFF':'#6B7280'),borderRadius:'999px',display:'flex',alignItems:'center',gap:'6px'}},R('span',{style:{fontSize:'11px'}},'✎'),'Edit'),
          R('div',{style:{padding:'5px 18px',background:(f>=310?'#111928':'transparent'),color:(f>=310?'#FFFFFF':'#6B7280'),borderRadius:'999px',display:'flex',alignItems:'center',gap:'6px'}},R('span',{style:{fontSize:'10px'}},'▶'),'Run'),
          R('div',{style:{padding:'5px 18px',color:'#6B7280',display:'flex',alignItems:'center',gap:'6px'}},R('span',{style:{fontSize:'11px'}},'☰'),'Batch')
        ):null,
        // Right: History + Publish
        R('div',{style:{marginLeft:'auto',display:'flex',alignItems:'center',gap:'14px',fontSize:'12px',color:'#6B7280'}},
          R('div',{style:{display:'flex',alignItems:'center',gap:'6px',padding:'5px 11px',background:'#F4F5F7',borderRadius:'14px',fontWeight:600}},R('span',{style:{fontSize:'11px'}},'⏱'),R('span',null,'History')),
          R('div',{style:{padding:'7px 16px',background:grad,color:'#FFFFFF',borderRadius:'8px',fontSize:'13px',fontWeight:700,boxShadow:'0 4px 10px rgba(0,82,204,0.25)'}},f<90?'New agent':'Publish Agent')
        )
      ),

      // FlowHunt sidebar — persistent across all phases, sits on the left of the browser body
      R('div',{style:{position:'absolute',left:0,top:(chromeBarH+urlBarH+pageHdrH)+'px',bottom:0,width:'220px',background:'#FFFFFF',borderRight:'1px solid #E5E7EB',padding:'18px 14px',display:'flex',flexDirection:'column',gap:'4px',overflow:'hidden'}},
        // Top: FlowHunt mark + wordmark
        R('div',{style:{display:'flex',alignItems:'center',gap:'8px',marginBottom:'14px'}},
          R('svg',{width:22,height:18,viewBox:'0 0 275 223'},
            R('defs',null,R('linearGradient',{id:'fhsb',x1:0,y1:0,x2:1,y2:1},R('stop',{offset:0,stopColor:'#0084FF'}),R('stop',{offset:1,stopColor:'#1A56DB'}))),
            R('path',{d:'${FH_MARK_PATH}',fill:'url(#fhsb)'})
          ),
          R('span',{style:{fontSize:'15px',fontWeight:800,color:'#111928'}},'FlowHunt')
        ),
        // Workspace block
        R('div',{style:{padding:'10px 10px',background:'#F9FAFB',border:'1px solid #E5E7EB',borderRadius:'8px',marginBottom:'14px'}},
          R('div',{style:{fontSize:'12px',fontWeight:700,color:'#111928'}},'Your Workspace'),
          R('div',{style:{fontSize:'10px',color:'#6B7280',marginTop:'2px'}},'Free Plan')
        ),
        // AGENT section
        R('div',{style:{fontSize:'10px',color:'#9CA3AF',fontWeight:700,padding:'0 6px 4px 6px',letterSpacing:'0.6px'}},'AGENT'),
        ['Home','Agents Library','My Agents','MCP Servers','Chatbots','History','Integrations'].map(function(label,i){
          var active=(label==='Integrations' && f<90) || (label==='My Agents' && f>=90);
          return R('div',{key:'a'+i,style:{display:'flex',alignItems:'center',gap:'7px',padding:'6px 8px',borderRadius:'6px',background:active?'#EEF4FF':'transparent',fontSize:'12px',color:active?'#1A56DB':'#374151',fontWeight:active?600:500}},
            R('span',{style:{width:'12px',display:'inline-block',textAlign:'center',opacity:0.7}},'◧'),
            label
          );
        }),
        // KNOWLEDGE section
        R('div',{style:{fontSize:'10px',color:'#9CA3AF',fontWeight:700,padding:'10px 6px 4px 6px',letterSpacing:'0.6px'}},'KNOWLEDGE'),
        ['Schedules','Documents','Memory','Categories'].map(function(label,i){
          return R('div',{key:'k'+i,style:{display:'flex',alignItems:'center',gap:'7px',padding:'6px 8px',borderRadius:'6px',fontSize:'12px',color:'#374151',fontWeight:500}},
            R('span',{style:{width:'12px',display:'inline-block',textAlign:'center',opacity:0.5}},'◇'),
            label
          );
        })
      ),

      // Phase eyebrow + title (rendered inside the browser body, so it lives on the FlowHunt page)
      R('div',{style:{padding:'18px 32px 0 252px',background:'#F9FAFB'}},
        R('div',{style:{position:'relative',height:'56px'}},
          R('div',{style:{position:'absolute',top:0,fontSize:'12px',fontWeight:700,color:'#6B7280',letterSpacing:'2.4px',opacity:copyA}},'INTEGRATE NOTION'),
          R('div',{style:{position:'absolute',top:0,fontSize:'12px',fontWeight:700,color:'#6B7280',letterSpacing:'2.4px',opacity:copyB}},'EVERY NOTION TOOL'),
          R('div',{style:{position:'absolute',top:0,fontSize:'12px',fontWeight:700,color:'#6B7280',letterSpacing:'2.4px',opacity:copyC}},'AGENT, RUNNING'),
          R('div',{style:{position:'absolute',top:'22px',fontSize:'26px',fontWeight:800,color:'#111928',letterSpacing:'-0.3px',opacity:copyA}},'Add Notion the same way you added Claude Code — two clicks in your browser.'),
          R('div',{style:{position:'absolute',top:'22px',fontSize:'26px',fontWeight:800,color:'#111928',letterSpacing:'-0.3px',opacity:copyB}},'All twenty-one Notion tools are picked up automatically, ready for any agent you build.'),
          R('div',{style:{position:'absolute',top:'22px',fontSize:'26px',fontWeight:800,color:'#111928',letterSpacing:'-0.3px',opacity:copyC}},'Run the agent, ask anything, and watch it call Notion live — no terminal required.')
        )
      ),

      // ── Body area where the per-phase content renders (sits to the right of the sidebar)
      R('div',{style:{position:'absolute',left:'220px',top:(chromeBarH+urlBarH+pageHdrH+78)+'px',right:0,bottom:0,background:'#F9FAFB',padding:'0 32px 28px 32px',overflow:'hidden'}},

        // ─────────── PHASE A — Integrations marketplace ───────────
        aOp>0.005?R('div',{style:{position:'relative',opacity:aOp}},
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
        ):null,

        // ─────────── PHASE B — Tool catalog: 2 columns, scroll all the way through 21 tools ───────────
        bOp>0.005?(function(){
          // Phase B = frames 150 → 380 (230 frames). Hold ~50 frames at the top so the
          // first row reads, then ease through enough travel to put the LAST rows in view.
          var scrollT=easeInOut(cl((f-200)/150));
          var scrollY=-scrollT*640;   // travels far enough to reach the bottom of the 11 rows
          return R('div',{style:{position:'absolute',inset:'0',padding:'0 32px 28px 32px',opacity:bOp}},
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
        })():null,

        // ─────────── PHASE C — Canvas + multi-turn chat with loading dots ───────────
        // Phase C runs frames 340 → 870 (overlaps Phase D from 600). Three turns paced so
        // each Q is readable, a loading-dots animation runs while the agent "thinks", then
        // the response lands. The AI Agent canvas fades around f=590 to make room for the
        // Notion-tab reveal on the right.
        cOp>0.005?(function(){
          var canvasIn=ease(cl((f-352)/22));
          // Turn 1 — capabilities Q & A (no tool call, just structured response)
          var u1In=ease(cl((f-370)/14));
          var load1=cl(ease(cl((f-420)/14))-easeIn(cl((f-468)/12)));   // loading dots visible 420 → 480
          var r1In=ease(cl((f-475)/16));
          // Turn 2 — find a page Q & tool call & A
          var u2In=ease(cl((f-525)/14));
          var load2=cl(ease(cl((f-555)/12))-easeIn(cl((f-583)/12)));   // loading dots briefly before tool call
          var t2In=ease(cl((f-580)/18));
          var r2In=ease(cl((f-615)/16));
          // Turn 3 — create a summary page Q & tool call & A
          var u3In=ease(cl((f-650)/14));
          var load3=cl(ease(cl((f-678)/12))-easeIn(cl((f-708)/12)));   // brief loading before create-pages widget
          var t3In=ease(cl((f-705)/18));
          var r3In=ease(cl((f-755)/16));
          // Stepped scroll — pushes content up as each turn arrives
          var scrollA=easeInOut(cl((f-490)/30));
          var scrollB=easeInOut(cl((f-620)/30));
          var scrollC=easeInOut(cl((f-740)/30));
          var chatScrollY=-(scrollA*160 + scrollB*200 + scrollC*200);
          function tilesP(i){return ease(cl((f-(360+i*1.2))/14));}
          // Loading dots component — three dots that bounce
          function LoadingDots(opacity, key){
            if(opacity<0.05) return null;
            var t=f*0.35;
            var d1=0.4+0.6*(Math.sin(t)*0.5+0.5);
            var d2=0.4+0.6*(Math.sin(t+0.55)*0.5+0.5);
            var d3=0.4+0.6*(Math.sin(t+1.1)*0.5+0.5);
            return R('div',{key:key,style:{display:'flex',alignItems:'center',gap:'5px',padding:'10px 14px',borderRadius:'12px',background:'#F4F5F7',width:'fit-content',marginBottom:'12px',opacity:opacity}},
              R('div',{style:{width:'7px',height:'7px',borderRadius:'50%',background:'#6B7280',opacity:d1,transform:'scale('+(0.7+0.3*d1)+')'}}),
              R('div',{style:{width:'7px',height:'7px',borderRadius:'50%',background:'#6B7280',opacity:d2,transform:'scale('+(0.7+0.3*d2)+')'}}),
              R('div',{style:{width:'7px',height:'7px',borderRadius:'50%',background:'#6B7280',opacity:d3,transform:'scale('+(0.7+0.3*d3)+')'}})
            );
          }
          // During Phase D the canvas fades and the chat shrinks to make room for the Notion tab.
          var canvasFlex=lerp(540, 0, dPhase);
          var canvasPad=lerp(0, 0, dPhase);
          var canvasContentOp=canvasIn*canvasOp;
          var chatMaxW=lerp(960, 540, dPhase);
          return R('div',{style:{position:'absolute',inset:'0',padding:'0 32px 28px 32px',opacity:cOp,display:'flex',gap:'18px'}},

            // ── LEFT: Canvas — fades out when Phase D arrives so the chat can shrink-and-shift
            R('div',{style:{flex:'0 0 '+canvasFlex+'px',background:'#FFFFFF',borderRadius:'12px',border:'1px solid #E5E7EB',overflow:'hidden',display:'flex',flexDirection:'column',opacity:canvasContentOp}},
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

            // ── RIGHT: scrolling multi-turn chat
            R('div',{style:{flex:1,background:'#FFFFFF',borderRadius:'12px',border:'1px solid #E5E7EB',overflow:'hidden',display:'flex',flexDirection:'column'}},
              R('div',{style:{padding:'12px 22px',borderBottom:'1px solid #F3F4F6',display:'flex',alignItems:'center',gap:'10px',background:'#F9FAFB'}},
                R('div',{style:{width:'26px',height:'26px',borderRadius:'7px',background:'#FFFFFF',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',justifyContent:'center'}},NotionMark(16,'#111928')),
                R('div',{style:{fontSize:'14px',fontWeight:700,color:'#111928'}},'Using Notion Tool'),
                R('div',{style:{marginLeft:'auto',display:'flex',alignItems:'center',gap:'5px',fontSize:'11px',color:'#22C55E',fontWeight:700}},R('span',{style:{display:'inline-block',width:'7px',height:'7px',borderRadius:'50%',background:'#22C55E'}}),'Live')
              ),
              R('div',{style:{flex:1,position:'relative',overflow:'hidden'}},
                R('div',{style:{position:'absolute',left:0,right:0,top:0,padding:'18px 22px',transform:'translateY('+chatScrollY+'px)'}},
                  // Turn 1: user prompt + loading dots while agent "thinks" + structured agent reply
                  R('div',{style:{display:'flex',justifyContent:'flex-end',marginBottom:'10px',opacity:u1In}},
                    R('div',{style:{padding:'10px 16px',borderRadius:'18px 18px 4px 18px',background:'#0084FF',color:'#FFFFFF',fontSize:'13px',maxWidth:'78%'}},'Explain what you can do with all your Notion tools.')
                  ),
                  LoadingDots(load1,'l1'),
                  R('div',{style:{opacity:r1In,padding:'12px 14px',background:'#F4F5F7',borderRadius:'12px',color:'#172B4D',fontSize:'12px',lineHeight:1.55,marginBottom:'16px'}},
                    R('div',{style:{fontWeight:700,fontSize:'13px',marginBottom:'6px'}},'Here\\'s what I can do for you in Notion:'),
                    R('div',{style:{marginTop:'4px'}},R('span',{style:{fontWeight:700,color:'#111928'}},'1) Find things'),' — semantic search across pages and databases (',R('span',{style:{fontFamily:MONO,color:'#0084FF'}},'notion_search'),').'),
                    R('div',{style:{marginTop:'4px'}},R('span',{style:{fontWeight:700,color:'#111928'}},'2) Read content'),' — fetch page bodies, blocks, properties, comments.'),
                    R('div',{style:{marginTop:'4px'}},R('span',{style:{fontWeight:700,color:'#111928'}},'3) Query databases'),' — filter and sort with structured queries.'),
                    R('div',{style:{marginTop:'4px'}},R('span',{style:{fontWeight:700,color:'#111928'}},'4) Create new content'),' — new pages, databases, comments, block children.'),
                    R('div',{style:{marginTop:'4px'}},R('span',{style:{fontWeight:700,color:'#111928'}},'5) Edit & organise'),' — update, move, archive existing pages and blocks.')
                  ),
                  // Turn 2: a real follow-up the user actually asked
                  R('div',{style:{display:'flex',justifyContent:'flex-end',marginBottom:'10px',opacity:u2In}},
                    R('div',{style:{padding:'10px 16px',borderRadius:'18px 18px 4px 18px',background:'#0084FF',color:'#FFFFFF',fontSize:'13px',maxWidth:'78%'}},'Can you find a page called "Notion AI capability demo draft"?')
                  ),
                  R('div',{style:{fontSize:'10px',color:'#6B7280',marginBottom:'6px',opacity:u2In}},'From: AIAgent'),
                  LoadingDots(load2,'l2'),
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
                  R('div',{style:{opacity:r2In,padding:'12px 14px',background:'#F4F5F7',borderRadius:'12px',color:'#172B4D',fontSize:'12px',lineHeight:1.55,marginBottom:'18px'}},
                    R('div',null,'Yes — I can see it.'),
                    R('div',{style:{marginTop:'4px'}},R('span',{style:{fontWeight:700,color:'#111928'}},'Page:'),' Notion AI capability demo draft'),
                    R('div',null,R('span',{style:{fontWeight:700,color:'#111928'}},'Last edited:'),' 2026-05-27 18:41'),
                    R('div',{style:{marginTop:'6px'}},'Want me to open it, list its contents, or create a summary page under the same parent?')
                  ),
                  // Turn 3: ask the agent to create a summary page → notion_create_pages tool call → reply with the resulting URL
                  R('div',{style:{display:'flex',justifyContent:'flex-end',marginBottom:'10px',opacity:u3In}},
                    R('div',{style:{padding:'10px 16px',borderRadius:'18px 18px 4px 18px',background:'#0084FF',color:'#FFFFFF',fontSize:'13px',maxWidth:'78%'}},'Create a summary page under the same parent.')
                  ),
                  R('div',{style:{fontSize:'10px',color:'#6B7280',marginBottom:'6px',opacity:u3In}},'From: AIAgent'),
                  LoadingDots(load3,'l3'),
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
                  R('div',{style:{opacity:r3In,padding:'12px 14px',background:'#F4F5F7',borderRadius:'12px',color:'#172B4D',fontSize:'12px',lineHeight:1.55}},
                    R('div',null,'Done — the new page is live in your workspace.'),
                    R('div',{style:{marginTop:'6px',display:'flex',alignItems:'center',gap:'8px',padding:'8px 12px',background:'#FFFFFF',border:'1px solid #DBE7FF',borderRadius:'8px'}},
                      R('div',{style:{width:'18px',height:'18px',borderRadius:'4px',background:'#FFFFFF',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',justifyContent:'center'}},NotionMark(12,'#111928')),
                      R('div',{style:{flex:1,fontSize:'12px',color:'#1A56DB',fontFamily:MONO}},'notion.so/Capability-Demo-Summary'),
                      R('div',{style:{fontSize:'10px',color:'#22C55E',fontWeight:700}},'✓ Created')
                    )
                  )
                )
              )
            )
          );
        })():null
      )
    ),

    // ─────────── PHASE D — Notion-page reveal (right half, alongside the chat) ───────────
    // Starts at f=600, during Turn 3 of the chat. The Notion browser slides into the right
    // half (where the AI Agent canvas just faded away), so the viewer sees the chat AND
    // the page being modified at the same time.
    dOp>0.005?(function(){
      var slideIn=easeBack(cl((f-610)/30));
      var pageSettle=ease(cl((f-640)/30));
      var checkOn=function(d){return ease(cl((f-(820+d))/16));};
      // Recompute r3In locally so Phase D can flip its "edited" badge when the chat reply lands.
      var r3InLocal=ease(cl((f-755)/16));
      var nW=860, nH=720;
      var nX=920;
      var nY=lerp(1080, 130, slideIn);
      // "Edited X ago" badge — flips from "just now" (while the agent is creating) to
      // "edited a second ago" once the chat reply (r3InLocal) lands.
      var editedBadge=r3InLocal>0.5?'edited a second ago':'just now';
      return R('div',{style:{position:'absolute',left:nX+'px',top:nY+'px',width:nW+'px',height:nH+'px',background:'#FFFFFF',borderRadius:'12px',overflow:'hidden',boxShadow:'0 40px 80px rgba(17,25,40,0.30)',border:'1px solid #D1D5DB',opacity:dOp}},
        // Notion browser chrome — traffic lights + tab + URL
        R('div',{style:{height:'36px',background:'#DEE1E6',display:'flex',alignItems:'flex-end',padding:'0 14px',position:'relative'}},
          R('div',{style:{position:'absolute',left:14,top:12,width:10,height:10,borderRadius:'50%',background:'#FF5F57'}}),
          R('div',{style:{position:'absolute',left:32,top:12,width:10,height:10,borderRadius:'50%',background:'#FEBC2E'}}),
          R('div',{style:{position:'absolute',left:50,top:12,width:10,height:10,borderRadius:'50%',background:'#28C840'}}),
          R('div',{style:{marginLeft:'82px',height:'28px',padding:'0 14px',background:'#F4F5F7',borderTopLeftRadius:'9px',borderTopRightRadius:'9px',display:'flex',alignItems:'center',gap:'8px',fontSize:'12px',color:'#172B4D',fontWeight:600}},
            NotionMark(13,'#111928'),
            R('span',null,'Capability Demo Summary · Notion')
          )
        ),
        R('div',{style:{height:'38px',background:'#F4F5F7',borderBottom:'1px solid #DFE1E6',display:'flex',alignItems:'center',padding:'0 16px',gap:'12px'}},
          R('div',{style:{display:'flex',gap:'10px',color:'#9AA0A6',fontSize:'14px'}},R('span',null,'←'),R('span',null,'→'),R('span',null,'↻')),
          R('div',{style:{flex:1,padding:'5px 14px',background:'#FFFFFF',border:'1px solid #DFE1E6',borderRadius:'14px',fontSize:'12px',color:'#42526E',display:'flex',alignItems:'center',gap:'10px'}},
            R('div',{style:{width:7,height:7,borderRadius:'50%',background:'#22C55E'}}),
            R('span',{style:{color:'#172B4D'}},'notion.so'),
            R('span',{style:{color:'#6B7280'}},'/Capability-Demo-Summary-7e22ad64336e80b1a4f4c1e0b89df073')
          )
        ),
        // Notion page body — scaled for the narrower right-half tab
        R('div',{style:{padding:'36px 48px 28px 48px',position:'relative',transform:'translateY('+(16*(1-pageSettle))+'px)',opacity:pageSettle}},
          // "Created via Notion MCP" badge at top right
          R('div',{style:{position:'absolute',top:'14px',right:'20px',padding:'4px 10px',background:'#DCFCE7',color:'#15803D',fontSize:'10px',fontWeight:700,borderRadius:'12px',border:'1px solid #86EFAC',display:'flex',alignItems:'center',gap:'5px'}},
            R('span',null,'✓'),'Created via Notion MCP'
          ),
          // Page header
          R('div',{style:{fontSize:'30px',fontWeight:800,color:'#111928',letterSpacing:'-0.8px',marginBottom:'6px'}},'Capability Demo Summary'),
          // Dynamic "edited" badge — flips to "edited a second ago" when the chat reply lands
          R('div',{style:{fontSize:'12px',color:'#9CA3AF',marginBottom:'20px',display:'flex',alignItems:'center',gap:'8px'}},
            R('span',null,'Created by Using Notion Tool'),
            R('span',{style:{color:'#D1D5DB'}},'·'),
            R('span',{style:{color:r3InLocal>0.5?'#15803D':'#9CA3AF',fontWeight:r3InLocal>0.5?600:400,transition:'color 0.3s'}},editedBadge)
          ),
          // Callout block with source — sized down for the narrower tab
          R('div',{style:{padding:'12px 16px',background:'#EEF4FF',border:'1px solid #DBE7FF',borderRadius:'10px',color:'#1A56DB',fontSize:'13px',marginBottom:'20px',display:'flex',alignItems:'center',gap:'10px'}},
            R('div',{style:{width:'20px',height:'20px',borderRadius:'5px',background:'#FFFFFF',border:'1px solid #DBE7FF',display:'flex',alignItems:'center',justifyContent:'center'}},NotionMark(12,'#111928')),
            R('div',null,R('span',{style:{fontWeight:700}},'Source: '),'Notion AI capability demo draft')
          ),
          // Summary section
          R('div',{style:{fontSize:'18px',fontWeight:700,color:'#111928',marginBottom:'8px'}},'Summary'),
          R('div',{style:{fontSize:'13px',color:'#374151',lineHeight:1.65,marginBottom:'18px'}},
            R('div',null,'•  Quick actions for ad-hoc checklists and rewrites.'),
            R('div',null,'•  A mini slide deck used in Presentation Mode.'),
            R('div',null,'•  Two example slides covering goal and output types.')
          ),
          // Follow-ups checklist
          R('div',{style:{fontSize:'18px',fontWeight:700,color:'#111928',marginBottom:'8px'}},'Follow-ups'),
          R('div',{style:{fontSize:'13px',color:'#374151',lineHeight:1.85}},
            R('div',{style:{display:'flex',alignItems:'center',gap:'10px'}},
              R('div',{style:{width:'14px',height:'14px',borderRadius:'3px',border:'1.5px solid #9CA3AF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'9px',color:'#FFFFFF',background:checkOn(0)>0.5?'#22C55E':'transparent',borderColor:checkOn(0)>0.5?'#22C55E':'#9CA3AF'}},checkOn(0)>0.5?'✓':''),
              R('span',null,'Pick a real "Quick actions" task to walk through with the agent.')
            ),
            R('div',{style:{display:'flex',alignItems:'center',gap:'10px'}},
              R('div',{style:{width:'14px',height:'14px',borderRadius:'3px',border:'1.5px solid #9CA3AF'}}),
              R('span',null,'Record the slide deck as a thirty-second screen capture.')
            ),
            R('div',{style:{display:'flex',alignItems:'center',gap:'10px'}},
              R('div',{style:{width:'14px',height:'14px',borderRadius:'3px',border:'1.5px solid #9CA3AF'}}),
              R('span',null,'Link this summary back from the source page.')
            )
          )
        )
      );
    })():null
  );
}`;

/* ============================================================================
 * SCENE 6 — CTA (FlowHunt mark + wordmark at the BOTTOM)
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
    // Top: eyebrow + tight title + subtitle + button + URL
    R('div',{style:{fontSize:'13px',fontWeight:700,color:'#6B7280',letterSpacing:'3px',marginBottom:'18px',opacity:eyebrowIn}},'ONE SETUP · TWO SURFACES'),
    R('div',{style:{fontSize:'64px',fontWeight:800,color:'#111928',letterSpacing:'-1.5px',textAlign:'center',lineHeight:1.08,maxWidth:'1500px',opacity:titleIn,transform:'translateY('+(10*(1-titleIn))+'px)'}},
      'Wire Notion into Claude Code ',
      R('span',{style:{background:grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}},'AND'),
      R('br',null),
      'run the same agent inside ',
      R('span',{style:{background:grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}},'FlowHunt.')
    ),
    R('div',{style:{marginTop:'22px',fontSize:'22px',color:'#6B7280',fontWeight:500,opacity:subIn,maxWidth:'1100px',textAlign:'center',lineHeight:1.45}},'One MCP, one OAuth, two places to run it from. The full walkthrough — with screenshots, prompts and the FlowHunt flow — lives on the FlowHunt blog.'),
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
    Watermark:      { type: 'inline', code: Watermark },
    PivotScene:     { type: 'inline', code: PivotScene },
    InstallScene:   { type: 'inline', code: InstallScene },
    ArchScene:      { type: 'inline', code: ArchScene },
    DemoScene:      { type: 'inline', code: DemoScene },
    FlowHuntScene:  { type: 'inline', code: FlowHuntScene },
    CTAScene:       { type: 'inline', code: CTAScene },
  },
  inputs: [],
  composition: {
    scenes: [
      scene('s1-pivot',    F.pivot,    'PivotScene'),
      scene('s2-install',  F.install,  'InstallScene'),
      scene('s3-arch',     F.arch,     'ArchScene'),
      scene('s4-demo',     F.demo,     'DemoScene'),
      scene('s5-flowhunt', F.flowhunt, 'FlowHuntScene'),
      scene('s6-cta',      F.cta,      'CTAScene', { suppressWatermark: true, transition: { type: 'fade', duration: 26 } }),
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
