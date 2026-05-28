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
  pivot:    { start: 0,    end: 90,   dur: 90  },  // 3s
  install:  { start: 90,   end: 330,  dur: 240 },  // 8s   — full-split: terminal left, Notion MCP OAuth right
  arch:     { start: 330,  end: 510,  dur: 180 },  // 6s   — center box, single blue line, dot
  demo:     { start: 510,  end: 870,  dur: 360 },  // 12s  — search → fetch → create, raised so pill clears watermark
  flowhunt: { start: 870,  end: 1170, dur: 300 },  // 10s  — Integrations → Agent creation → Tools → Run
  cta:      { start: 1170, end: 1410, dur: 240 },  // 8s   — FH at bottom
};
const TOTAL_FRAMES = 1410;
const TOTAL_SECONDS = TOTAL_FRAMES / FPS;

const HELPERS = `var R=React.createElement;var cl=function(x){return Math.max(0,Math.min(1,x));};var ease=function(t){return 1-Math.pow(1-t,3);};var easeIn=function(t){return t*t*t;};var easeInOut=function(t){return t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;};var easeBack=function(t){var c1=1.70158;var c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2);};var lerp=function(a,b,t){return a+(b-a)*t;};var grad='linear-gradient(90deg,#0084FF,#1A56DB)';var INTER="Inter,system-ui,sans-serif";var MONO='"JetBrains Mono",ui-monospace,Menlo,monospace';var CLAUDE_ICON_URI='${CLAUDE_ICON}';function NotionMark(size,color){return R('svg',{width:size,height:size,viewBox:'0 0 100 100'},R('path',{d:'M16 18 L16 84 L26 84 L26 38 L72 84 L84 84 L84 18 L74 18 L74 64 L26 18 Z',fill:color||'#111928'}));}function BriefcaseIcon(size,color){return R('svg',{width:size,height:size,viewBox:'0 0 24 24',fill:'none'},R('rect',{x:3,y:7,width:18,height:13,rx:2,fill:color||'#A0522D'}),R('path',{d:'M8 7 V5 a2 2 0 0 1 2-2 h4 a2 2 0 0 1 2 2 V7',stroke:color||'#7C3E1A',strokeWidth:1.5,fill:'none'}),R('rect',{x:3,y:11,width:18,height:2,fill:'rgba(0,0,0,0.18)'}));}`;

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
      'Claude Code, meet ',
      R('span',{style:{position:'relative',display:'inline-block'}},
        R('span',{style:{background:grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}},'Notion.'),
        R('span',{style:{position:'absolute',left:0,right:'6%',bottom:'-4px',height:'8px',borderRadius:'4px',background:grad,transform:'scaleX('+underP+')',transformOrigin:'left center'}})
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
  var termIn=ease(cl(f/22));
  function lineAt(d){return ease(cl((f-d)/12));}
  // Mirror the real terminal: three claude mcp add lines (different scopes) + /mcp auth
  function typed(text,start,speed){var n=Math.floor(cl((f-start)/speed)*text.length);return text.slice(0,n);}
  var cmd1='claude mcp add --transport http notion https://mcp.notion.com/mcp';
  var cmd1Typed=typed(cmd1,18,28);
  var l1Done=lineAt(50);
  var l2P=ease(cl((f-60)/16));
  var l3P=ease(cl((f-78)/16));
  var l4P=ease(cl((f-100)/16));
  var l5P=ease(cl((f-116)/16));
  var promptMcp=ease(cl((f-130)/16));
  var slashIn=ease(cl((f-142)/16));
  var authIn=ease(cl((f-158)/16));
  var urlIn=ease(cl((f-174)/16));
  // OAuth card phases in when the auth URL appears
  var oauthIn=ease(cl((f-180)/26));
  var pulse=(Math.sin((f-200)/4))*0.5+0.5;
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
        // First command typed live
        R('div',null,R('span',{style:{color:'#22D3EE'}},'$ '),R('span',null,cmd1Typed),f<46?R('span',{style:{display:'inline-block',width:'9px',height:'18px',background:'#22D3EE',marginLeft:'2px',verticalAlign:'middle',opacity:(Math.floor(f/8)%2)===0?1:0}}):null),
        f>=50?R('div',{style:{opacity:l1Done,color:'#22C55E',marginTop:'4px'}},'✓ Added MCP server "notion" (http) to local config'):null,
        // Second invocation (project scope)
        f>=60?R('div',{style:{opacity:l2P,marginTop:'12px'}},R('span',{style:{color:'#22D3EE'}},'$ '),'claude mcp add --transport http notion https://mcp.notion.com/mcp --scope project'):null,
        f>=78?R('div',{style:{opacity:l3P,color:'#FBBF24'}},'! MCP server "notion" already exists in local config'):null,
        // Third invocation (user scope)
        f>=100?R('div',{style:{opacity:l4P,marginTop:'12px'}},R('span',{style:{color:'#22D3EE'}},'$ '),'claude mcp add --transport http notion https://mcp.notion.com/mcp --scope user'):null,
        f>=116?R('div',{style:{opacity:l5P,color:'#22C55E'}},'✓ Added MCP server "notion" to user config'):null,
        // /mcp interactive
        f>=130?R('div',{style:{opacity:promptMcp,marginTop:'16px'}},R('span',{style:{color:'#22D3EE'}},'$ '),'claude'):null,
        f>=142?R('div',{style:{opacity:slashIn,marginTop:'8px'}},R('span',{style:{color:'#A78BFA'}},'/'),'mcp'):null,
        f>=158?R('div',{style:{opacity:authIn,marginTop:'8px',color:'#CBD5E1'}},'Authenticating with notion…'):null,
        f>=158?R('div',{style:{opacity:authIn,color:'#94A3B8',fontSize:'14px',marginTop:'4px'}},'A browser window will open for authentication.'):null,
        f>=174?R('div',{style:{opacity:urlIn,marginTop:'10px',fontSize:'13px',color:'#22D3EE',wordBreak:'break-all'}},'→ https://mcp.notion.com/authorize?response_type=code&client_id=…'):null
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
  var END=180;
  var sceneOut=easeIn(cl((f-(END-20))/20));
  var op=1-sceneOut;
  var titleIn=ease(cl(f/22));
  // Three columns: You (left), Claude Code (big middle box, contains Notion MCP), Notion (right)
  var youIn=easeBack(cl((f-18)/22));
  var ccIn=easeBack(cl((f-36)/22));
  var notionIn=easeBack(cl((f-54)/22));
  var mcpIn=ease(cl((f-72)/22)); // the inner Notion MCP card slides up into Claude Code
  // Single centered line draws from "You" to "Notion" through Claude Code
  // The line is one continuous blue track. Two gaps at the boxes so the line doesn't draw THROUGH them.
  // Segment A: You.right → CC.left  (x=400 → 660)
  // Segment B: CC.right → Notion.left  (x=1260 → 1520)
  var lineA=ease(cl((f-90)/20));
  var lineB=ease(cl((f-104)/20));
  // Dot rides the line in sync with the line drawing. Dot only travels on segments.
  // Phase D1: starts at 90, travels A 90→128 (38f). Then pauses 128→138 inside CC.
  // Phase D2: 138→176 travels B.
  var dotLocal=f-90;
  var dotPhase=0; var dotX=400, dotY=0;
  if(dotLocal<0){dotPhase=-1;}
  else if(dotLocal<38){var t=dotLocal/38; dotX=lerp(400,660,t); dotPhase=0;}
  else if(dotLocal<48){dotX=660; dotPhase=1;}   // pause inside Claude Code box
  else if(dotLocal<86){var t2=(dotLocal-48)/38; dotX=lerp(1260,1520,t2); dotPhase=2;}
  else {dotX=1520; dotPhase=3;}
  // Labels above and below the line — same set of three step labels both rows
  var labelsIn=ease(cl((f-130)/22));

  function arrowHead(x,y,p,color){
    if(p<0.05)return null;
    return R('svg',{key:'ah',width:14,height:14,viewBox:'0 0 14 14',style:{position:'absolute',left:(x-12)+'px',top:(y-7)+'px',opacity:p}},R('path',{d:'M 0 0 L 14 7 L 0 14 Z',fill:color}));
  }

  return R('div',{style:{width:'100%',height:'100%',background:'#FFFFFF',position:'relative',fontFamily:INTER,opacity:op}},
    // Title
    R('div',{style:{position:'absolute',top:'74px',left:0,right:0,textAlign:'center',fontSize:'30px',fontWeight:700,color:'#111928',opacity:titleIn}},'The Notion MCP lives inside Claude Code'),
    R('div',{style:{position:'absolute',top:'118px',left:0,right:0,textAlign:'center',fontSize:'18px',color:'#6B7280',opacity:titleIn}},'Your prompt → MCP tool call → Notion API.'),

    // Centered horizontal line at y=540 (mid)
    // Segment A
    R('div',{style:{position:'absolute',left:'400px',top:'538px',width:(260*lineA)+'px',height:'4px',background:'#0084FF',borderRadius:'2px',boxShadow:'0 0 12px rgba(0,132,255,0.45)'}}),
    arrowHead(660,540,lineA,'#0084FF'),
    // Segment B
    R('div',{style:{position:'absolute',left:'1260px',top:'538px',width:(260*lineB)+'px',height:'4px',background:'#0084FF',borderRadius:'2px',boxShadow:'0 0 12px rgba(0,132,255,0.45)'}}),
    arrowHead(1520,540,lineB,'#0084FF'),

    // Travelling dot (on the line, between boxes only)
    dotPhase>=0?R('div',{style:{position:'absolute',left:(dotX-9)+'px',top:'531px',width:'18px',height:'18px',borderRadius:'50%',background:'#0084FF',boxShadow:'0 0 20px #0084FF, 0 0 8px #FFFFFF'}}):null,

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

    // Step labels — BLACK text BELOW the blue line only (no labels above)
    R('div',{style:{opacity:labelsIn}},
      R('div',{style:{position:'absolute',left:'460px',top:'560px',fontSize:'13px',color:'#111928',fontWeight:600}},'Prompt'),
      R('div',{style:{position:'absolute',left:'1320px',top:'560px',fontSize:'13px',color:'#111928',fontWeight:600}},'Tool call')
    )
  );
}`;

/* ============================================================================
 * SCENE 4 — Demo (terminal + Notion page card; raised; pill at top-right)
 * ========================================================================== */
const DemoScene = `function DemoScene(props){${HELPERS}
  var f=props.frame||0;
  var END=360;
  var sceneOut=easeIn(cl((f-(END-20))/20));
  var op=1-sceneOut;
  var termIn=ease(cl(f/26));
  function typed(text,start,speed){var n=Math.floor(cl((f-start)/speed)*text.length);return text.slice(0,n);}
  function lineAt(d){return ease(cl((f-d)/9));}
  var prompt1='Search my Notion for "Notion AI capability demo draft".';
  var prompt1Typed=typed(prompt1,34,42);
  var t1Call=lineAt(86),t1Res=lineAt(104);
  var prompt2='Fetch its outline.';
  var prompt2Typed=typed(prompt2,128,18);
  var t2Call=lineAt(172),t2Res=lineAt(190),outlineIn=ease(cl((f-200)/30));
  var prompt3='Create "Capability Demo Summary" under the same parent.';
  var prompt3Typed=typed(prompt3,220,38);
  var t3Call=lineAt(264),t3Res=lineAt(282),t3Url=lineAt(296);
  var cardOutlineIn=ease(cl((f-80)/30));
  var cardSourceIn=ease(cl((f-180)/30));
  var cardMorphP=easeInOut(cl((f-264)/44));
  // Narrator pill — top right (clears the bottom watermark)
  var pillIn=ease(cl((f-330)/22));
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
  var END=300;
  var sceneOut=easeIn(cl((f-(END-20))/20));
  var op=1-sceneOut;
  // Three phases (figma-style: eyebrow + headline per phase, crossfading cards)
  function fade(a,b){var inF=ease(cl((f-a)/20));var outF=easeIn(cl((f-(b-20))/20));return cl(inF-outF);}
  var aOp=fade(0, 100);     // A — Marketplace + Integrate
  var bOp=fade(100, 220);   // B — Tool catalog (scroll-down)
  var cOp=fade(220, 300);   // C — Small AI Agent + live call

  // Phase headlines (eyebrow + title) crossfade per phase
  function copyOp(phaseStart, phaseEnd){var inF=ease(cl((f-phaseStart)/16));var outF=easeIn(cl((f-(phaseEnd-16))/16));return cl(inF-outF);}
  var copyA=copyOp(0, 100);
  var copyB=copyOp(100, 220);
  var copyC=copyOp(220, 300);

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

  return R('div',{style:{width:'100%',height:'100%',background:'#F9FAFB',position:'relative',fontFamily:INTER,opacity:op,overflow:'hidden'}},
    // Eyebrow + Headline (crossfade per phase)
    R('div',{style:{position:'absolute',left:'50%',top:'80px',transform:'translateX(-50%)',fontSize:'14px',fontWeight:700,color:'#6B7280',letterSpacing:'2.4px',whiteSpace:'nowrap',opacity:copyA}},'INTEGRATE NOTION'),
    R('div',{style:{position:'absolute',left:'50%',top:'80px',transform:'translateX(-50%)',fontSize:'14px',fontWeight:700,color:'#6B7280',letterSpacing:'2.4px',whiteSpace:'nowrap',opacity:copyB}},'EVERY NOTION TOOL'),
    R('div',{style:{position:'absolute',left:'50%',top:'80px',transform:'translateX(-50%)',fontSize:'14px',fontWeight:700,color:'#6B7280',letterSpacing:'2.4px',whiteSpace:'nowrap',opacity:copyC}},'AGENT, RUNNING'),

    R('div',{style:{position:'absolute',left:'50%',top:'116px',transform:'translateX(-50%)',fontSize:'34px',fontWeight:800,color:'#111928',letterSpacing:'-0.5px',whiteSpace:'nowrap',opacity:copyA}},'Wire your workspace into FlowHunt.'),
    R('div',{style:{position:'absolute',left:'50%',top:'116px',transform:'translateX(-50%)',fontSize:'34px',fontWeight:800,color:'#111928',letterSpacing:'-0.5px',whiteSpace:'nowrap',opacity:copyB}},'All 21 Notion tools, ready in your agent.'),
    R('div',{style:{position:'absolute',left:'50%',top:'116px',transform:'translateX(-50%)',fontSize:'34px',fontWeight:800,color:'#111928',letterSpacing:'-0.5px',whiteSpace:'nowrap',opacity:copyC}},'One prompt, one tool call.'),

    // ─────────── PHASE A — Marketplace + Integrate click ───────────
    aOp>0.005?R('div',{style:{position:'absolute',top:'200px',left:'50%',transform:'translateX(-50%)',width:'1280px',background:'#FFFFFF',borderRadius:'16px',border:'1px solid #E5E7EB',boxShadow:'0 24px 50px rgba(17,25,40,0.10)',opacity:aOp,padding:'40px 48px'}},
      R('div',{style:{fontSize:'22px',fontWeight:700,color:'#111928',marginBottom:'20px'}},'Integrations'),
      R('div',{style:{display:'flex',gap:'12px',marginBottom:'32px'}},
        R('div',{style:{width:'360px',height:'42px',borderRadius:'8px',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',padding:'0 14px',fontSize:'14px',color:'#111928',background:'#FFFFFF'}},R('span',{style:{color:'#9CA3AF',marginRight:'10px'}},'⌕'),'notion'),
        R('div',{style:{width:'130px',height:'42px',borderRadius:'8px',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',padding:'0 14px',fontSize:'14px',color:'#374151'}},'Category  ▾')
      ),
      // 4-card preview row: Notion (highlighted) + 3 ghost-style siblings (figma-store look)
      R('div',{style:{display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:'18px'}},
        // Notion card — highlighted with Integrate button
        R('div',{key:'n',style:{padding:'22px',borderRadius:'14px',border:'2px solid #0084FF',background:'#F8FBFF'}},
          R('div',{style:{width:'48px',height:'48px',borderRadius:'10px',background:'#111928',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'14px'}},NotionMark(28,'#FFFFFF')),
          R('div',{style:{fontSize:'18px',fontWeight:700,color:'#111928',marginBottom:'6px'}},'Notion'),
          R('div',{style:{fontSize:'12px',color:'#6B7280',lineHeight:1.45,marginBottom:'14px'}},'Pages & databases'),
          R('div',{style:{height:'36px',borderRadius:'8px',background:grad,color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:600,boxShadow:f>=50?'0 0 18px rgba(0,132,255,0.45)':'none'}},'Integrate')
        ),
        // Three ghost siblings to evoke a marketplace store
        [{n:'Slack',bg:'#4A154B',ic:'S',sub:'Send messages'},{n:'GitHub',bg:'#0F172A',ic:'G',sub:'Repos & PRs'},{n:'Google Drive',bg:'#4285F4',ic:'G',sub:'Files & docs'}].map(function(it,i){
          var p=ease(cl((f-(20+i*8))/22));
          return R('div',{key:'g'+i,style:{padding:'22px',borderRadius:'14px',border:'1px solid #E5E7EB',background:'#FFFFFF',opacity:p,transform:'translateY('+(8*(1-p))+'px)'}},
            R('div',{style:{width:'48px',height:'48px',borderRadius:'10px',background:it.bg,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'14px',color:'#FFFFFF',fontSize:'18px',fontWeight:800}},it.ic),
            R('div',{style:{fontSize:'18px',fontWeight:700,color:'#111928',marginBottom:'6px'}},it.n),
            R('div',{style:{fontSize:'12px',color:'#6B7280',lineHeight:1.45,marginBottom:'14px'}},it.sub),
            R('div',{style:{height:'36px',borderRadius:'8px',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:600,color:'#374151'}},'Integrate')
          );
        })
      )
    ):null,

    // ─────────── PHASE B — Tool catalog with scroll-down ───────────
    bOp>0.005?(function(){
      // Scroll progress maps phase frames 100→200 into a slow vertical translate
      var scrollT=ease(cl((f-130)/70));    // start scrolling at 130, finish by 200
      var totalScrollPx=420;                // total downward travel
      var scrollY=-scrollT*totalScrollPx;   // negative = move content up
      return R('div',{style:{position:'absolute',top:'200px',left:'50%',transform:'translateX(-50%)',width:'1100px',background:'#FFFFFF',borderRadius:'16px',border:'1px solid #E5E7EB',boxShadow:'0 24px 50px rgba(17,25,40,0.10)',opacity:bOp,padding:'30px 36px'}},
        R('div',{style:{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'18px'}},
          R('div',{style:{fontSize:'18px',fontWeight:700,color:'#111928'}},'Select a Tool'),
          R('div',{style:{display:'flex',alignItems:'center',gap:'10px',fontSize:'12px',color:'#6B7280'}},
            R('div',{style:{padding:'6px 10px',borderRadius:'6px',background:'#EEF4FF',color:'#1A56DB',fontWeight:600}},'notion'),
            R('div',null,allTools.length+' tools')
          )
        ),
        // Scroll viewport (fixed height, content translates upward)
        R('div',{style:{position:'relative',height:'460px',overflow:'hidden',borderTop:'1px solid #F3F4F6'}},
          R('div',{style:{position:'absolute',top:0,left:0,right:0,padding:'14px 0',transform:'translateY('+scrollY+'px)',transition:'transform 0.1s linear'}},
            R('div',{style:{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'12px'}},
              allTools.map(function(t,i){
                return R('div',{key:i,style:{padding:'14px',borderRadius:'10px',border:'1px solid #E5E7EB',background:'#FFFFFF'}},
                  R('div',{style:{display:'flex',alignItems:'center',gap:'8px',marginBottom:'8px'}},
                    R('div',{style:{width:'26px',height:'26px',borderRadius:'6px',background:'#FFFFFF',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',justifyContent:'center'}},NotionMark(16,'#111928')),
                    R('div',{style:{padding:'2px 6px',borderRadius:'8px',background:'#F3F4F6',fontSize:'10px',color:'#6B7280',fontWeight:600}},'notion')
                  ),
                  R('div',{style:{fontSize:'13px',fontWeight:600,color:'#111928'}},t)
                );
              })
            )
          ),
          // Subtle scroll-bar indicator on the right (visual cue that it scrolls)
          R('div',{style:{position:'absolute',right:'4px',top:'14px',bottom:'14px',width:'4px',borderRadius:'2px',background:'#F3F4F6'}}),
          R('div',{style:{position:'absolute',right:'4px',top:(14+scrollT*340)+'px',width:'4px',height:'88px',borderRadius:'2px',background:grad,boxShadow:'0 0 6px rgba(0,132,255,0.3)'}})
        )
      );
    })():null,

    // ─────────── PHASE C — Real FlowHunt canvas + live run ───────────
    cOp>0.005?(function(){
      var canvasIn=ease(cl((f-228)/22));
      var chatIn=ease(cl((f-244)/22));
      var toolIn=ease(cl((f-264)/22));
      // Cascade for the 21 tool tiles inside AI Agent
      function tilesP(i){return ease(cl((f-(234+i*1.2))/12));}

      return R('div',{style:{position:'absolute',top:'190px',left:'50%',transform:'translateX(-50%)',width:'1480px',height:'720px',opacity:cOp,display:'flex',gap:'20px'}},
        // ─── LEFT — Real FlowHunt canvas (vertical stack: Chat Input → AI Agent → Chat Output)
        R('div',{style:{flex:1,background:'#FFFFFF',borderRadius:'14px',border:'1px solid #E5E7EB',overflow:'hidden',display:'flex',flexDirection:'column',opacity:canvasIn}},
          // FlowHunt mini-toolbar
          R('div',{style:{padding:'12px 18px',borderBottom:'1px solid #F3F4F6',display:'flex',alignItems:'center',justifyContent:'space-between'}},
            R('div',{style:{display:'flex',alignItems:'center',gap:'8px',fontSize:'13px',color:'#6B7280'}},
              R('span',null,'Agents'),R('span',null,'/'),
              R('span',{style:{color:'#111928',fontWeight:600}},'Using Notion Tool'),
              R('span',{style:{padding:'2px 8px',fontSize:'11px',background:'#EFF6FF',color:'#0084FF',borderRadius:'4px',fontWeight:600}},'v2')
            ),
            R('div',{style:{padding:'6px 14px',fontSize:'12px',fontWeight:700,color:'#FFFFFF',background:'#22C55E',borderRadius:'6px',display:'flex',alignItems:'center',gap:'6px'}},
              R('span',{style:{fontSize:'10px'}},'▶'),'Run Agent'
            )
          ),
          // Canvas area with dotted grid
          R('div',{style:{flex:1,position:'relative',backgroundImage:'radial-gradient(#D1D5DB 1px, transparent 1px)',backgroundSize:'20px 20px',padding:'36px 24px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'2px'}},
            // ── Chat Input — bold green filled box (real FlowHunt style)
            R('div',{style:{width:'220px',height:'78px',borderRadius:'14px',background:'#10B981',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'14px 18px',boxShadow:'0 10px 26px rgba(16,185,129,0.30)'}},
              R('div',{style:{display:'flex',alignItems:'center',gap:'8px'}},
                R('span',{style:{display:'inline-block',width:'14px',height:'14px',borderRadius:'4px',background:'rgba(255,255,255,0.45)'}}),
                R('span',{style:{color:'#FFFFFF',fontSize:'15px',fontWeight:700}},'Chat Input')
              ),
              R('div',{style:{alignSelf:'flex-end',display:'flex',alignItems:'center',gap:'5px',color:'#FFFFFF',fontSize:'11px',opacity:0.9}},'Message',R('span',{style:{display:'inline-block',width:'7px',height:'7px',borderRadius:'50%',background:'#FFFFFF'}}))
            ),
            // + connector
            R('div',{style:{width:'2px',height:'10px',background:'#94A3B8'}}),
            R('div',{style:{width:'22px',height:'22px',borderRadius:'50%',background:'#FFFFFF',border:'1.5px solid #0084FF',display:'flex',alignItems:'center',justifyContent:'center',color:'#0084FF',fontSize:'13px',fontWeight:700,lineHeight:1}},'+'),
            R('div',{style:{width:'2px',height:'10px',background:'#94A3B8'}}),
            // ── AI Agent — pink dashed border, row of dark N tool tiles inside (real FH look)
            R('div',{style:{width:'540px',borderRadius:'16px',background:'#FFFFFF',border:'2px dashed #F472B6',padding:'18px 22px',boxShadow:'0 10px 26px rgba(244,114,182,0.15)'}},
              R('div',{style:{display:'flex',alignItems:'center',gap:'10px',marginBottom:'14px'}},
                R('div',{style:{display:'flex',alignItems:'center',gap:'8px',padding:'4px 10px',borderRadius:'8px',background:'#FCE7F3'}},
                  R('span',{style:{display:'inline-block',width:'10px',height:'10px',borderRadius:'2px',background:'#F472B6'}}),
                  R('span',{style:{fontSize:'13px',fontWeight:700,color:'#BE185D'}},'AI Agent')
                ),
                R('div',{style:{marginLeft:'auto',fontSize:'10px',color:'#9CA3AF',fontWeight:600,letterSpacing:'0.5px'}},'21 TOOLS')
              ),
              // Horizontal row of dark Notion tiles (icons only — names dropped per user spec)
              R('div',{style:{display:'flex',flexWrap:'wrap',gap:'5px'}},
                [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(function(i){
                  var p=tilesP(i);
                  return R('div',{key:i,style:{width:'22px',height:'22px',borderRadius:'5px',background:'#111928',display:'flex',alignItems:'center',justifyContent:'center',opacity:p,transform:'scale('+(0.6+0.4*p)+')'}},NotionMark(13,'#FFFFFF'));
                })
              )
            ),
            R('div',{style:{width:'2px',height:'10px',background:'#94A3B8'}}),
            R('div',{style:{width:'22px',height:'22px',borderRadius:'50%',background:'#FFFFFF',border:'1.5px solid #0084FF',display:'flex',alignItems:'center',justifyContent:'center',color:'#0084FF',fontSize:'13px',fontWeight:700,lineHeight:1}},'+'),
            R('div',{style:{width:'2px',height:'10px',background:'#94A3B8'}}),
            // ── Chat Output — bold red filled box
            R('div',{style:{width:'220px',height:'78px',borderRadius:'14px',background:'#F87171',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'14px 18px',boxShadow:'0 10px 26px rgba(248,113,113,0.30)'}},
              R('div',{style:{display:'flex',alignItems:'center',gap:'8px'}},
                R('span',{style:{display:'inline-block',width:'14px',height:'14px',borderRadius:'4px',background:'rgba(255,255,255,0.45)'}}),
                R('span',{style:{color:'#FFFFFF',fontSize:'15px',fontWeight:700}},'Chat Output')
              ),
              R('div',{style:{alignSelf:'flex-start',display:'flex',alignItems:'center',gap:'5px',color:'#FFFFFF',fontSize:'11px',opacity:0.9}},R('span',{style:{display:'inline-block',width:'7px',height:'7px',borderRadius:'50%',background:'#FFFFFF'}}),'Message')
            )
          )
        ),
        // ─── RIGHT — Run modal: chat conversation with live tool call
        R('div',{style:{flex:1,background:'#FFFFFF',borderRadius:'14px',border:'1px solid #E5E7EB',overflow:'hidden',display:'flex',flexDirection:'column',opacity:chatIn}},
          // Header bar
          R('div',{style:{padding:'14px 22px',borderBottom:'1px solid #F3F4F6',display:'flex',alignItems:'center',gap:'10px',background:'#F9FAFB'}},
            R('div',{style:{width:'30px',height:'30px',borderRadius:'7px',background:'#FFFFFF',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',justifyContent:'center'}},NotionMark(18,'#111928')),
            R('div',{style:{fontSize:'15px',fontWeight:700,color:'#111928'}},'Using Notion Tool'),
            R('div',{style:{marginLeft:'auto',display:'flex',alignItems:'center',gap:'5px',fontSize:'11px',color:'#22C55E',fontWeight:700}},R('span',{style:{display:'inline-block',width:'7px',height:'7px',borderRadius:'50%',background:'#22C55E'}}),'Live')
          ),
          R('div',{style:{flex:1,padding:'22px',overflow:'hidden'}},
            // User prompt
            R('div',{style:{display:'flex',justifyContent:'flex-end',marginBottom:'14px'}},
              R('div',{style:{padding:'10px 16px',borderRadius:'18px 18px 4px 18px',background:'#0084FF',color:'#FFFFFF',fontSize:'14px',maxWidth:'72%'}},'Find the capability demo draft.')
            ),
            // From AIAgent label
            R('div',{style:{fontSize:'11px',color:'#6B7280',marginBottom:'8px'}},'From: AIAgent'),
            // Tool call collapsible widget (matches real screenshot 20.40.21)
            R('div',{style:{padding:'14px 16px',borderRadius:'12px',border:'1px solid #E5E7EB',background:'#FFFFFF',opacity:toolIn}},
              R('div',{style:{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}},
                R('span',{style:{fontSize:'16px'}},'⚙'),
                R('div',null,
                  R('div',{style:{fontSize:'14px',fontWeight:600,color:'#111928'}},'Using ',R('span',{style:{fontFamily:MONO,color:'#0084FF'}},'notion_search')),
                  R('div',{style:{fontSize:'11px',color:'#9CA3AF',fontFamily:MONO}},'notion_search')
                ),
                R('div',{style:{marginLeft:'auto',fontSize:'11px',color:'#9CA3AF'}},'1103 ms  ⌃')
              ),
              R('div',{style:{padding:'10px 14px',background:'#F9FAFB',borderRadius:'8px',fontFamily:MONO,fontSize:'12px',color:'#111928',lineHeight:1.6,marginBottom:'8px'}},
                R('div',{style:{color:'#6B7280',fontSize:'10px',marginBottom:'4px'}},'Input'),
                R('div',null,'query: "Notion AI capability demo draft"'),
                R('div',null,'filter_type: page'),
                R('div',null,'page_size: 10')
              ),
              R('div',{style:{padding:'10px 14px',background:'#0F172A',borderRadius:'8px',fontFamily:MONO,fontSize:'11px',color:'#D1D5DB',lineHeight:1.7,marginBottom:'10px'}},
                R('div',{style:{color:'#94A3B8',fontSize:'10px',marginBottom:'4px'}},'Output'),
                R('div',null,'[{"object":"page",'),
                R('div',null,'  "id":"36d0ad64-336e-80c1-…",'),
                R('div',null,'  "title":"Notion AI capability demo draft"}]')
              ),
              R('div',{style:{display:'flex',alignItems:'center',gap:'8px',fontSize:'11px',color:'#6B7280',paddingTop:'4px'}},
                R('div',{style:{width:'18px',height:'18px',borderRadius:'50%',background:grad,display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontSize:'10px'}},'⌕'),
                'Search for pages and databases by title in Notion.'
              )
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
    R('div',{style:{fontSize:'13px',fontWeight:700,color:'#6B7280',letterSpacing:'3px',marginBottom:'18px',opacity:eyebrowIn}},'READ THE FULL GUIDE'),
    R('div',{style:{fontSize:'68px',fontWeight:800,color:'#111928',letterSpacing:'-1.5px',textAlign:'center',lineHeight:1.08,maxWidth:'1500px',opacity:titleIn,transform:'translateY('+(10*(1-titleIn))+'px)'}},
      'Notion in Claude Code,',
      R('br',null),
      R('span',{style:{background:grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}},'wired up in minutes.')
    ),
    R('div',{style:{marginTop:'22px',fontSize:'22px',color:'#6B7280',fontWeight:500,opacity:subIn,maxWidth:'900px',textAlign:'center'}},'The complete setup walkthrough is on the FlowHunt blog.'),
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
