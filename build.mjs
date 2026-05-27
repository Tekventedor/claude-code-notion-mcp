// Builds template.json from inline React component source below.
// Edit a scene, re-run `node build.mjs`, click Load again in the playground.

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

const FPS = 30;
const F = {
  pivot:     { start: 0,    end: 90,   dur: 90  },  // 3s
  demo:      { start: 90,   end: 450,  dur: 360 },  // 12s — Claude Code terminal: search → fetch → create
  arch:      { start: 450,  end: 630,  dur: 180 },  // 6s
  install:   { start: 630,  end: 870,  dur: 240 },  // 8s
  snapshot:  { start: 870,  end: 1110, dur: 240 },  // 8s — raw JSON vs rendered Notion page
  flowhunt:  { start: 1110, end: 1410, dur: 300 },  // 10s — FlowHunt parallel path
  cta:       { start: 1410, end: 1650, dur: 240 },  // 8s
};
const TOTAL_FRAMES = 1650;
const TOTAL_SECONDS = TOTAL_FRAMES / FPS;

const HELPERS = `var R=React.createElement;var cl=function(x){return Math.max(0,Math.min(1,x));};var ease=function(t){return 1-Math.pow(1-t,3);};var easeIn=function(t){return t*t*t;};var easeInOut=function(t){return t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;};var easeBack=function(t){var c1=1.70158;var c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2);};var lerp=function(a,b,t){return a+(b-a)*t;};var grad='linear-gradient(90deg,#0084FF,#1A56DB)';var INTER="Inter,system-ui,sans-serif";var MONO='"JetBrains Mono",ui-monospace,Menlo,monospace';`;

const FH_MARK_PATH = 'M36.369 175.282L24.2163 203.986C22.1071 208.969 23.073 214.948 27.1337 219.014C29.8048 221.688 33.3037 223.02 36.8027 223.02C40.3016 223.02 43.8006 221.688 46.4716 219.014L58.023 207.449L101.627 163.787C103.647 161.764 102.218 158.32 99.3599 158.32H74.5815C74.4336 158.32 74.2858 158.3 74.1281 158.3C48.0289 158.3 26.8578 136.8 27.3506 110.563C27.8335 84.9175 49.2905 64.6304 74.9067 64.6304H127.785C128.633 64.6304 129.451 64.295 130.052 63.6931L151.006 42.7153C153.027 40.6925 151.598 37.2488 148.739 37.2488H75.1531C34.0134 37.2488 -0.365082 70.9455 -0.000396729 112.131C0.236145 138.98 14.7839 162.454 36.3591 175.302L36.369 175.282ZM199.992 158.31C225.608 158.31 247.065 138.023 247.548 112.378C248.031 86.7331 226.87 64.6403 200.77 64.6403C200.613 64.6403 200.445 64.6206 200.287 64.6206H175.529C172.68 64.6206 171.251 61.167 173.262 59.1541L219.103 13.2615H219.093L228.121 4.20336C233.276 -0.957219 241.664 -1.50979 247.124 3.33504C251.707 7.39048 252.88 13.7154 250.662 18.945L238.51 47.639C260.105 60.4763 274.662 83.9505 274.909 110.799C275.273 151.985 240.895 185.692 199.755 185.692H126.159C123.31 185.692 121.881 182.238 123.892 180.225L144.846 159.248C145.447 158.646 146.266 158.31 147.113 158.31H200.002H199.992ZM186.617 87.1771C199.696 87.1771 210.301 97.7943 210.301 110.888C210.301 123.982 199.696 134.599 186.617 134.599C173.538 134.599 162.932 123.982 162.932 110.888C162.932 97.7943 173.538 87.1771 186.617 87.1771ZM89.829 87.1673C102.908 87.1673 113.513 97.7844 113.513 110.878C113.513 123.972 102.908 134.589 89.829 134.589C76.7498 134.589 66.1445 123.972 66.1445 110.878C66.1445 97.7844 76.7498 87.1673 89.829 87.1673Z';

/* ============================================================================
 * Watermark — FlowHunt mark on every scene
 * ========================================================================== */
const Watermark = `function Watermark(props){${HELPERS}
  var dark=(props.dark===true);
  var color=dark?'#FFFFFF':'#111928';
  var muted=dark?'rgba(255,255,255,0.65)':'#6B7280';
  return R('div',{style:{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'flex-end',padding:'0 32px',fontFamily:INTER}},
    R('div',{style:{display:'flex',alignItems:'center',gap:'10px',opacity:0.85}},
      R('svg',{width:22,height:22,viewBox:'0 0 275 223'},
        R('defs',null,R('linearGradient',{id:'wm-g',x1:0,y1:0,x2:1,y2:1},R('stop',{offset:0,stopColor:'#0084FF'}),R('stop',{offset:1,stopColor:'#1A56DB'}))),
        R('path',{d:'${FH_MARK_PATH}',fill:'url(#wm-g)'})
      ),
      R('span',{style:{fontSize:'14px',fontWeight:600,color:color,letterSpacing:'0.5px'}},'FlowHunt'),
      R('span',{style:{fontSize:'12px',color:muted}},'·  flowhunt.io')
    )
  );
}`;

/* ============================================================================
 * SCENE 1 — Pivot
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
      'Claude Code now writes ',
      R('span',{style:{position:'relative',display:'inline-block'}},
        R('span',{style:{background:grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}},'Notion.'),
        R('span',{style:{position:'absolute',left:0,right:'6%',bottom:'-4px',height:'8px',borderRadius:'4px',background:grad,transform:'scaleX('+underP+')',transformOrigin:'left center'}})
      )
    ),
    R('div',{style:{marginTop:'40px',fontSize:'30px',fontWeight:500,color:'#6B7280',opacity:subP*(1-outP)}},'Search a workspace, read a page, write a new one.')
  );
}`;

/* ============================================================================
 * SCENE 2 — Demo (Claude Code terminal: search → fetch → create)
 * ========================================================================== */
const DemoScene = `function DemoScene(props){${HELPERS}
  var f=props.frame||0;
  var END=360;
  var sceneOut=easeIn(cl((f-(END-20))/20));
  var op=1-sceneOut;
  var termIn=ease(cl(f/26));
  // typewriter helper
  function typed(text,start,speed){
    var n=Math.floor(cl((f-start)/speed)*text.length);
    return text.slice(0,n);
  }
  function lineAt(d){return ease(cl((f-d)/9));}
  // Prompts (scene-local frames)
  var prompt1='Search my Notion for the page "Notion AI capability demo draft".';
  var prompt1Typed=typed(prompt1,34,50);
  var t1Call=lineAt(86),t1Res=lineAt(104);
  var prompt2='Fetch its outline.';
  var prompt2Typed=typed(prompt2,128,18);
  var t2Call=lineAt(172),t2Res=lineAt(190),outlineIn=ease(cl((f-200)/30));
  var prompt3='Create "Capability Demo Summary" under the same parent.';
  var prompt3Typed=typed(prompt3,220,38);
  var t3Call=lineAt(264),t3Res=lineAt(282),t3Url=lineAt(296);
  // Right pane card
  var cardOutlineIn=ease(cl((f-80)/30));
  var cardSourceIn=ease(cl((f-180)/30));
  var cardMorphP=easeInOut(cl((f-264)/44));
  // Narrator pill
  var pillIn=ease(cl((f-330)/22));
  return R('div',{style:{width:'100%',height:'100%',background:'#F3F4F6',fontFamily:INTER,position:'relative',opacity:op,overflow:'hidden'}},
    // LEFT — terminal
    R('div',{style:{position:'absolute',left:'40px',top:'40px',width:'900px',height:'1000px',background:'#0F172A',borderRadius:'10px',boxShadow:'0 24px 50px rgba(17,25,40,0.20)',overflow:'hidden',opacity:termIn,transform:'translateX('+(-30*(1-termIn))+'px)'}},
      R('div',{style:{height:'52px',background:'#1E293B',display:'flex',alignItems:'center',padding:'0 14px',gap:'10px'}},
        R('div',{style:{width:12,height:12,borderRadius:'50%',background:'#FF5F57'}}),
        R('div',{style:{width:12,height:12,borderRadius:'50%',background:'#FEBC2E'}}),
        R('div',{style:{width:12,height:12,borderRadius:'50%',background:'#28C840'}}),
        R('div',{style:{marginLeft:'12px',color:'#94A3B8',fontSize:'13px',fontFamily:MONO}},'claude  ·  notion MCP')
      ),
      R('div',{style:{padding:'24px 28px',color:'#E5E7EB',fontFamily:MONO,fontSize:'18px',lineHeight:1.7}},
        // PROMPT 1
        R('div',null,R('span',{style:{color:'#9CA3AF'}},'> '),R('span',null,prompt1Typed)),
        // T1 call
        f>=86?R('div',{style:{opacity:t1Call,marginTop:'10px'}},R('span',{style:{color:'#22D3EE'}},'⏺ '),R('span',{style:{color:'#A78BFA'}},'notion - notion-search'),R('span',{style:{color:'#9CA3AF'}},'(query: "Notion AI capability demo draft")')):null,
        f>=104?R('div',{style:{opacity:t1Res,color:'#22C55E'}},'  ⎿  1 page  ·  36d0ad64...91f1f'):null,
        // PROMPT 2
        f>=128?R('div',{style:{marginTop:'16px'}},R('span',{style:{color:'#9CA3AF'}},'> '),R('span',null,prompt2Typed)):null,
        // T2 call
        f>=172?R('div',{style:{opacity:t2Call,marginTop:'10px'}},R('span',{style:{color:'#22D3EE'}},'⏺ '),R('span',{style:{color:'#A78BFA'}},'notion - notion-fetch'),R('span',{style:{color:'#9CA3AF'}},'(id: 36d0ad64...91f1f)')):null,
        f>=190?R('div',{style:{opacity:t2Res,color:'#22C55E'}},'  ⎿  4 headings  ·  12 blocks'):null,
        // outline mini-preview
        f>=200?R('div',{style:{opacity:outlineIn,marginTop:'8px',marginLeft:'16px',padding:'10px 14px',background:'rgba(148,163,184,0.08)',borderLeft:'3px solid #1A56DB',borderRadius:'4px',fontSize:'15px',color:'#CBD5E1',lineHeight:1.6}},
          R('div',null,'# Quick actions'),
          R('div',null,'# Mini slide deck'),
          R('div',null,'# Slide 1: Goal'),
          R('div',null,'# Slide 2: Output types')
        ):null,
        // PROMPT 3
        f>=220?R('div',{style:{marginTop:'16px'}},R('span',{style:{color:'#9CA3AF'}},'> '),R('span',null,prompt3Typed)):null,
        // T3 call
        f>=264?R('div',{style:{opacity:t3Call,marginTop:'10px'}},R('span',{style:{color:'#22D3EE'}},'⏺ '),R('span',{style:{color:'#A78BFA'}},'notion - notion-create-pages'),R('span',{style:{color:'#9CA3AF'}},'({title:"Capability Demo Summary", parent:36d0ad64...})')):null,
        f>=282?R('div',{style:{opacity:t3Res,color:'#22C55E'}},'  ⎿  ✓ Created  ·  7e22ad64...f073'):null,
        f>=296?R('div',{style:{opacity:t3Url,color:'#22D3EE',textDecoration:'underline',marginLeft:'8px'}},'notion.so/Capability-Demo-Summary'):null,
        // caret
        R('span',{style:{display:'inline-block',width:'10px',height:'20px',background:'#22D3EE',marginLeft:'2px',opacity:(Math.floor(f/8)%2)===0?1:0}})
      )
    ),

    // RIGHT — Notion page preview
    R('div',{style:{position:'absolute',left:'980px',top:'40px',width:'900px',height:'1000px',background:'#FFFFFF',borderRadius:'10px',border:'1px solid #E5E7EB',boxShadow:'0 24px 50px rgba(17,25,40,0.12)',overflow:'hidden'}},
      // URL bar
      R('div',{style:{height:'52px',background:'#F9FAFB',borderBottom:'1px solid #E5E7EB',display:'flex',alignItems:'center',padding:'0 16px',gap:'12px'}},
        R('div',{style:{width:8,height:8,borderRadius:'50%',background:'#9CA3AF'}}),
        R('div',{style:{width:8,height:8,borderRadius:'50%',background:'#9CA3AF'}}),
        R('div',{style:{flex:1,height:'28px',borderRadius:'14px',background:'#FFFFFF',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',padding:'0 12px',fontFamily:MONO,fontSize:'12px',color:'#6B7280'}},
          cardMorphP<0.5?'notion.so/Notion-AI-capability-demo-draft':'notion.so/Capability-Demo-Summary')
      ),
      // Page body
      R('div',{style:{padding:'40px'}},
        // Source-page state (fades out)
        R('div',{style:{opacity:cardSourceIn*(1-cardMorphP),position:'absolute',left:'40px',right:'40px',top:'92px'}},
          R('div',{style:{fontSize:'34px',fontWeight:700,color:'#111928',marginBottom:'24px'}},'Notion AI capability demo draft'),
          R('div',{style:{fontSize:'20px',fontWeight:600,color:'#111928',marginTop:'18px'}},'Quick actions'),
          R('div',{style:{fontSize:'16px',color:'#374151',marginTop:'6px'}},'• Add your assignment list & turn it into a checklist with due dates'),
          R('div',{style:{fontSize:'20px',fontWeight:600,color:'#111928',marginTop:'18px'}},'Mini slide deck'),
          R('div',{style:{fontSize:'16px',color:'#374151',marginTop:'6px'}},'Use Present to view as slides.'),
          R('div',{style:{fontSize:'20px',fontWeight:600,color:'#111928',marginTop:'18px'}},'Slide 1: Goal'),
          R('div',{style:{fontSize:'16px',color:'#374151',marginTop:'6px'}},'Show structure: headings, lists, callouts, tables, toggles, columns'),
          R('div',{style:{fontSize:'20px',fontWeight:600,color:'#111928',marginTop:'18px'}},'Slide 2: Output types'),
          R('div',{style:{fontSize:'16px',color:'#374151',marginTop:'6px'}},'Summaries and outlines')
        ),
        // Created-page state (fades in)
        R('div',{style:{opacity:cardMorphP,position:'absolute',left:'40px',right:'40px',top:'92px'}},
          R('div',{style:{fontSize:'34px',fontWeight:700,color:'#111928',marginBottom:'20px'}},'Capability Demo Summary'),
          R('div',{style:{padding:'14px 18px',background:'#EEF4FF',border:'1px solid #DBE7FF',borderRadius:'10px',color:'#1A56DB',fontSize:'15px',marginBottom:'24px'}},'↪  Source: Notion AI capability demo draft'),
          R('div',{style:{fontSize:'18px',fontWeight:600,color:'#111928',marginBottom:'8px'}},'Summary'),
          R('div',{style:{fontSize:'15px',color:'#374151',marginBottom:'4px'}},'•  Quick actions for ad-hoc checklists and rewrites'),
          R('div',{style:{fontSize:'15px',color:'#374151',marginBottom:'4px'}},'•  A mini slide deck used in Presentation Mode'),
          R('div',{style:{fontSize:'15px',color:'#374151',marginBottom:'18px'}},'•  Two example slides covering goal + output types'),
          R('div',{style:{fontSize:'18px',fontWeight:600,color:'#111928',marginBottom:'8px'}},'Follow-ups'),
          R('div',{style:{display:'flex',alignItems:'center',gap:'10px',fontSize:'15px',color:'#374151',marginBottom:'4px'}},R('span',{style:{display:'inline-block',width:'14px',height:'14px',borderRadius:'3px',border:'1px solid #9CA3AF'}}),'Pick a real "Quick actions" task to walk through'),
          R('div',{style:{display:'flex',alignItems:'center',gap:'10px',fontSize:'15px',color:'#374151',marginBottom:'4px'}},R('span',{style:{display:'inline-block',width:'14px',height:'14px',borderRadius:'3px',border:'1px solid #9CA3AF'}}),'Record the slide-deck as a 30-second loom'),
          R('div',{style:{display:'flex',alignItems:'center',gap:'10px',fontSize:'15px',color:'#374151'}},R('span',{style:{display:'inline-block',width:'14px',height:'14px',borderRadius:'3px',border:'1px solid #9CA3AF'}}),'Link back from the source page')
        )
      )
    ),

    // Narrator pill
    f>=330?R('div',{style:{position:'absolute',left:'50%',bottom:'30px',transform:'translateX(-50%) scale('+(0.95+0.05*pillIn)+')',opacity:pillIn,padding:'10px 22px',borderRadius:'24px',background:grad,color:'#FFFFFF',fontFamily:INTER,fontSize:'18px',fontWeight:600,boxShadow:'0 8px 20px rgba(0,132,255,0.32)'}},'Search · Fetch · Write.  One round-trip.'):null
  );
}`;

/* ============================================================================
 * SCENE 3 — Architecture pipeline
 * ========================================================================== */
const ArchScene = `function ArchScene(props){${HELPERS}
  var f=props.frame||0;
  var END=180;
  var sceneOut=easeIn(cl((f-(END-20))/20));
  var op=1-sceneOut;
  function nodeIn(d){return ease(cl((f-d)/22));}
  var n1=nodeIn(0),n2=nodeIn(8),n3=nodeIn(16),n4=nodeIn(24);
  function arrowDraw(d){return ease(cl((f-d)/26));}
  var a1=arrowDraw(30),a2=arrowDraw(46),a3=arrowDraw(62);
  function returnDraw(d){return ease(cl((f-d)/26));}
  var r1=returnDraw(90),r2=returnDraw(102),r3=returnDraw(114);
  var labelsIn=ease(cl((f-150)/22));
  var dotT=((f%72)/72);
  function node(x,y,opacity,iconNode,label,sublabel,fill){
    return R('div',{style:{position:'absolute',left:(x-100)+'px',top:y+'px',width:'200px',display:'flex',flexDirection:'column',alignItems:'center',opacity:opacity}},
      R('div',{style:{width:'120px',height:'120px',borderRadius:'20px',background:fill||'#FFFFFF',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 12px 28px rgba(17,25,40,0.10)'}},iconNode),
      R('div',{style:{marginTop:'12px',fontSize:'18px',fontWeight:700,color:'#111928',fontFamily:INTER}},label),
      R('div',{style:{fontSize:'13px',color:'#6B7280',fontFamily:INTER,marginTop:'2px'}},sublabel)
    );
  }
  function arrowSeg(x1,x2,y,p,color){
    var len=x2-x1;
    return R('div',{style:{position:'absolute',left:x1+'px',top:(y-1)+'px',width:(len*p)+'px',height:'3px',background:color,borderRadius:'2px'}});
  }
  return R('div',{style:{width:'100%',height:'100%',background:'#FFFFFF',position:'relative',fontFamily:INTER,opacity:op}},
    // Title
    R('div',{style:{position:'absolute',top:'80px',left:0,right:0,textAlign:'center',fontSize:'34px',fontWeight:700,color:'#111928'}},'How it actually wires up'),
    // Nodes
    node(280,420,n1,R('div',{style:{fontFamily:MONO,fontSize:'32px',color:'#0F172A'}},'> _'),'You','Your prompt'),
    node(720,420,n2,R('div',{style:{fontFamily:MONO,fontSize:'24px',fontWeight:700,color:'#0084FF'}},'CC'),'Claude Code','MCP client'),
    node(1200,420,n3,R('div',{style:{fontSize:'42px',fontWeight:900,fontFamily:INTER,color:'#111928'}},'N'),'Notion MCP','mcp.notion.com',null),
    node(1640,420,n4,R('div',{style:{fontSize:'42px',fontWeight:900,fontFamily:INTER,color:'#111928'}},'N'),'Notion','Your workspace','#F9FAFB'),
    // Forward arrows
    arrowSeg(340,660,470,a1,'#0084FF'),
    arrowSeg(780,1140,470,a2,'#0084FF'),
    arrowSeg(1260,1580,470,a3,'#0084FF'),
    // Return arrows
    arrowSeg(340,660,560,r1,'#475569'),
    arrowSeg(780,1140,560,r2,'#475569'),
    arrowSeg(1260,1580,560,r3,'#475569'),
    // Travelling data dot (top forward path)
    f>120?R('div',{style:{position:'absolute',left:(340+(1580-340)*dotT-6)+'px',top:'462px',width:'14px',height:'14px',borderRadius:'50%',background:'#0084FF',boxShadow:'0 0 16px #0084FF'}}):null,
    // Labels
    R('div',{style:{opacity:labelsIn}},
      R('div',{style:{position:'absolute',left:'440px',top:'430px',fontSize:'12px',color:'#0084FF',fontWeight:600,letterSpacing:'1px'}},'PROMPT'),
      R('div',{style:{position:'absolute',left:'910px',top:'430px',fontSize:'12px',color:'#0084FF',fontWeight:600,letterSpacing:'1px'}},'TOOL CALL'),
      R('div',{style:{position:'absolute',left:'1380px',top:'430px',fontSize:'12px',color:'#0084FF',fontWeight:600,letterSpacing:'1px'}},'NOTION API'),
      R('div',{style:{position:'absolute',left:'440px',top:'568px',fontSize:'12px',color:'#475569',fontWeight:600,letterSpacing:'1px'}},'RESULT'),
      R('div',{style:{position:'absolute',left:'910px',top:'568px',fontSize:'12px',color:'#475569',fontWeight:600,letterSpacing:'1px'}},'MARKDOWN'),
      R('div',{style:{position:'absolute',left:'1380px',top:'568px',fontSize:'12px',color:'#475569',fontWeight:600,letterSpacing:'1px'}},'PAGE DATA')
    )
  );
}`;

/* ============================================================================
 * SCENE 4 — Install (one-liner + OAuth flash)
 * ========================================================================== */
const InstallScene = `function InstallScene(props){${HELPERS}
  var f=props.frame||0;
  var END=240;
  var sceneOut=easeIn(cl((f-(END-20))/20));
  var op=1-sceneOut;
  var termIn=ease(cl(f/20));
  var cmd='claude mcp add --transport http notion https://mcp.notion.com/mcp';
  var typeStart=24,typeDur=56;
  var n=Math.floor(cl((f-typeStart)/typeDur)*cmd.length);
  var typed=cmd.slice(0,n);
  var resIn=ease(cl((f-86)/24));
  var oauthIn=ease(cl((f-120)/30));
  var pulse=(Math.sin((f-150)/4))*0.5+0.5;
  return R('div',{style:{width:'100%',height:'100%',background:'#F9FAFB',position:'relative',fontFamily:INTER,opacity:op,display:'flex',alignItems:'center',justifyContent:'center'}},
    // Title
    R('div',{style:{position:'absolute',top:'80px',left:0,right:0,textAlign:'center',fontSize:'34px',fontWeight:700,color:'#111928'}},'One command. One OAuth. Connected.'),
    // Terminal
    R('div',{style:{width:'1280px',height:'360px',background:'#0F172A',borderRadius:'14px',boxShadow:'0 24px 60px rgba(17,25,40,0.22)',overflow:'hidden',opacity:termIn,transform:'translateY('+(10*(1-termIn))+'px)'}},
      R('div',{style:{height:'48px',background:'#1E293B',display:'flex',alignItems:'center',padding:'0 14px',gap:'10px'}},
        R('div',{style:{width:12,height:12,borderRadius:'50%',background:'#FF5F57'}}),
        R('div',{style:{width:12,height:12,borderRadius:'50%',background:'#FEBC2E'}}),
        R('div',{style:{width:12,height:12,borderRadius:'50%',background:'#28C840'}}),
        R('div',{style:{marginLeft:'12px',color:'#94A3B8',fontSize:'13px',fontFamily:MONO}},'~/your-project  ·  zsh')
      ),
      R('div',{style:{padding:'40px',color:'#E5E7EB',fontFamily:MONO,fontSize:'24px',lineHeight:1.6}},
        R('div',null,R('span',{style:{color:'#22D3EE'}},'$ '),R('span',null,typed),R('span',{style:{display:'inline-block',width:'10px',height:'26px',background:'#22D3EE',marginLeft:'4px',verticalAlign:'middle',opacity:(Math.floor(f/8)%2)===0?1:0}})),
        f>=86?R('div',{style:{marginTop:'18px',opacity:resIn,color:'#22C55E',fontSize:'22px'}},'✓ Added MCP server "notion" (http, OAuth 2.1)'):null
      )
    ),
    // OAuth consent card (bottom-right)
    f>=120?R('div',{style:{position:'absolute',right:'80px',bottom:'80px',width:'380px',background:'#FFFFFF',borderRadius:'14px',border:'1px solid #E5E7EB',boxShadow:'0 24px 60px rgba(17,25,40,0.18)',padding:'24px',opacity:oauthIn,transform:'translateY('+(20*(1-oauthIn))+'px) scale('+(0.95+0.05*oauthIn)+')'}},
      R('div',{style:{display:'flex',alignItems:'center',gap:'10px',marginBottom:'14px'}},
        R('div',{style:{width:32,height:32,borderRadius:'6px',background:'#111928',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontWeight:900}},'N'),
        R('div',{style:{fontSize:'14px',color:'#6B7280',fontWeight:600}},'Notion MCP')
      ),
      R('div',{style:{fontSize:'20px',fontWeight:700,color:'#111928',marginBottom:'4px'}},'Connect with Notion MCP'),
      R('div',{style:{fontSize:'13px',color:'#6B7280',marginBottom:'14px'}},'Your Workspace  ·  Free Plan  ·  2 members'),
      R('div',{style:{fontSize:'13px',color:'#374151',lineHeight:1.7,marginBottom:'18px'}},
        R('div',null,'✓ Respect your access and permissions'),
        R('div',null,'✓ Take actions on your behalf'),
        R('div',null,'✓ Search across connected apps'),
        R('div',null,'✓ View workspace users and emails')
      ),
      R('div',{style:{height:'40px',borderRadius:'8px',background:grad,color:'#FFFFFF',fontWeight:600,fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:f>=150?('0 0 '+(12+12*pulse)+'px rgba(34,197,94,0.45)'):'none'}},'Continue')
    ):null
  );
}`;

/* ============================================================================
 * SCENE 5 — Snapshot magic (raw JSON vs rendered Notion page)
 * ========================================================================== */
const SnapshotScene = `function SnapshotScene(props){${HELPERS}
  var f=props.frame||0;
  var END=240;
  var sceneOut=easeIn(cl((f-(END-20))/20));
  var op=1-sceneOut;
  var leftIn=ease(cl(f/25));
  var rightIn=ease(cl((f-30)/25));
  var hiT=cl((f-70)/40);
  var hiP=ease(hiT);
  var stampIn=ease(cl((f-130)/30));
  // travelling highlight: from (x=300,y=420) on left pane to (x=1240,y=460) on right
  var hiX=lerp(300,1240,hiP);
  var hiY=lerp(420,460,hiP);
  return R('div',{style:{width:'100%',height:'100%',background:'#F3F4F6',position:'relative',fontFamily:INTER,opacity:op}},
    // Title
    R('div',{style:{position:'absolute',top:'40px',left:0,right:0,textAlign:'center',fontSize:'28px',fontWeight:700,color:'#111928'}},'Same data. Two forms.'),
    // LEFT — terminal JSON
    R('div',{style:{position:'absolute',left:'80px',top:'110px',width:'820px',height:'820px',background:'#0F172A',borderRadius:'14px',overflow:'hidden',opacity:leftIn,boxShadow:'0 24px 50px rgba(17,25,40,0.18)'}},
      R('div',{style:{height:'44px',background:'#1E293B',display:'flex',alignItems:'center',padding:'0 14px',gap:'10px'}},
        R('div',{style:{width:10,height:10,borderRadius:'50%',background:'#FF5F57'}}),
        R('div',{style:{width:10,height:10,borderRadius:'50%',background:'#FEBC2E'}}),
        R('div',{style:{width:10,height:10,borderRadius:'50%',background:'#28C840'}}),
        R('div',{style:{marginLeft:'10px',color:'#94A3B8',fontSize:'12px',fontFamily:MONO}},'notion-search · output')
      ),
      R('div',{style:{padding:'24px 28px',color:'#D1D5DB',fontFamily:MONO,fontSize:'16px',lineHeight:1.7}},
        R('div',null,'{'),
        R('div',{style:{marginLeft:'18px'}},'"object": "page",'),
        R('div',{style:{marginLeft:'18px'}},'"id": "36d0ad64-336e-80c1-8627-e0c275f0da3b",'),
        R('div',{style:{marginLeft:'18px'}},'"title": "Notion AI capability demo draft",'),
        R('div',{style:{marginLeft:'18px'}},'"last_edited": "2026-05-27T18:41:00Z",'),
        R('div',{style:{marginLeft:'18px'}},'"parent": {"type": "workspace", "workspace": true},'),
        R('div',{style:{marginLeft:'18px'}},'"url": "https://notion.so/Notion-AI-capability-..."'),
        R('div',null,'}')
      )
    ),
    // RIGHT — rendered Notion page
    R('div',{style:{position:'absolute',right:'80px',top:'110px',width:'820px',height:'820px',background:'#FFFFFF',borderRadius:'14px',border:'1px solid #E5E7EB',overflow:'hidden',opacity:rightIn,boxShadow:'0 24px 50px rgba(17,25,40,0.12)'}},
      R('div',{style:{height:'44px',background:'#F9FAFB',borderBottom:'1px solid #E5E7EB',display:'flex',alignItems:'center',padding:'0 16px',gap:'10px'}},
        R('div',{style:{flex:1,height:'24px',borderRadius:'12px',background:'#FFFFFF',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',padding:'0 12px',fontFamily:MONO,fontSize:'12px',color:'#6B7280'}},'notion.so/Capability-Demo-Summary')
      ),
      R('div',{style:{padding:'36px 40px'}},
        R('div',{style:{fontSize:'32px',fontWeight:700,color:'#111928',marginBottom:'18px'}},'Capability Demo Summary'),
        R('div',{style:{padding:'12px 16px',background:'#EEF4FF',border:'1px solid #DBE7FF',borderRadius:'10px',color:'#1A56DB',fontSize:'14px',marginBottom:'24px'}},'↪  Source: Notion AI capability demo draft'),
        R('div',{style:{fontSize:'17px',fontWeight:600,color:'#111928',marginBottom:'8px'}},'Summary'),
        R('div',{style:{fontSize:'14px',color:'#374151',marginBottom:'4px'}},'•  Quick actions for ad-hoc checklists and rewrites'),
        R('div',{style:{fontSize:'14px',color:'#374151',marginBottom:'4px'}},'•  A mini slide deck for Presentation Mode'),
        R('div',{style:{fontSize:'14px',color:'#374151',marginBottom:'20px'}},'•  Two example slides covering goal + output types'),
        R('div',{style:{fontSize:'17px',fontWeight:600,color:'#111928',marginBottom:'8px'}},'Follow-ups'),
        R('div',{style:{display:'flex',alignItems:'center',gap:'8px',fontSize:'14px',color:'#374151',marginBottom:'4px'}},R('span',{style:{display:'inline-block',width:'12px',height:'12px',borderRadius:'3px',border:'1px solid #9CA3AF'}}),'Pick a real "Quick actions" task to walk through'),
        R('div',{style:{display:'flex',alignItems:'center',gap:'8px',fontSize:'14px',color:'#374151',marginBottom:'4px'}},R('span',{style:{display:'inline-block',width:'12px',height:'12px',borderRadius:'3px',border:'1px solid #9CA3AF'}}),'Record the slide-deck as a 30-second loom'),
        R('div',{style:{display:'flex',alignItems:'center',gap:'8px',fontSize:'14px',color:'#374151'}},R('span',{style:{display:'inline-block',width:'12px',height:'12px',borderRadius:'3px',border:'1px solid #9CA3AF'}}),'Link back from the source page')
      )
    ),
    // travelling highlight
    f>=70?R('div',{style:{position:'absolute',left:hiX+'px',top:hiY+'px',width:'24px',height:'24px',borderRadius:'50%',background:'#FBBF24',boxShadow:'0 0 24px #FBBF24',opacity:1-easeIn(cl((f-105)/15))}}):null,
    // Stamp
    f>=130?R('div',{style:{position:'absolute',left:0,right:0,top:'470px',textAlign:'center',fontSize:'56px',fontWeight:800,fontFamily:INTER,letterSpacing:'-1px',opacity:stampIn,background:grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}},'From query to page.'):null
  );
}`;

/* ============================================================================
 * SCENE 6 — FlowHunt parallel path (Integrations → OAuth picker → Canvas → Live tool call)
 * ========================================================================== */
const FlowHuntScene = `function FlowHuntScene(props){${HELPERS}
  var f=props.frame||0;
  var END=300;
  var sceneOut=easeIn(cl((f-(END-20))/20));
  var op=1-sceneOut;
  // Sub-beats: A (0-60) Integrations, B (60-130) OAuth picker, C (130-200) Canvas, D (200-280) Live tool call
  function fade(a,b){
    var inF=ease(cl((f-a)/20));
    var outF=easeIn(cl((f-(b-20))/20));
    return inF-outF;
  }
  var aOp=fade(0,60),bOp=fade(60,130),cOp=fade(130,200),dOp=fade(200,280);
  var titleIn=ease(cl(f/22));
  return R('div',{style:{width:'100%',height:'100%',background:'#F9FAFB',position:'relative',fontFamily:INTER,opacity:op,overflow:'hidden'}},
    // Title
    R('div',{style:{position:'absolute',top:'36px',left:0,right:0,textAlign:'center',fontSize:'30px',fontWeight:700,color:'#111928',opacity:titleIn}},'Same MCP, in FlowHunt.'),

    // Sub-beat A — Integrations search
    R('div',{style:{position:'absolute',top:'120px',left:'50%',transform:'translateX(-50%)',width:'1300px',height:'780px',background:'#FFFFFF',borderRadius:'14px',border:'1px solid #E5E7EB',boxShadow:'0 24px 50px rgba(17,25,40,0.10)',opacity:aOp,padding:'40px'}},
      R('div',{style:{fontSize:'22px',fontWeight:700,color:'#111928',marginBottom:'18px'}},'Integrations'),
      R('div',{style:{display:'flex',gap:'12px',marginBottom:'24px'}},
        R('div',{style:{width:'320px',height:'40px',borderRadius:'8px',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',padding:'0 14px',fontSize:'14px',color:'#111928',background:'#FFFFFF'}},R('span',{style:{color:'#9CA3AF',marginRight:'10px'}},'⌕'),'notion'),
        R('div',{style:{width:'120px',height:'40px',borderRadius:'8px',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',padding:'0 14px',fontSize:'14px',color:'#374151'}},'Category  ▾')
      ),
      R('div',{style:{display:'inline-block',width:'320px',padding:'24px',borderRadius:'14px',border:'2px solid #0084FF',background:'#F8FBFF'}},
        R('div',{style:{width:'52px',height:'52px',borderRadius:'10px',background:'#111928',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:'24px',marginBottom:'14px'}},'N'),
        R('div',{style:{fontSize:'20px',fontWeight:700,color:'#111928',marginBottom:'8px'}},'Notion'),
        R('div',{style:{fontSize:'13px',color:'#6B7280',lineHeight:1.5,marginBottom:'18px'}},'Integrate Notion to automate your note-taking, database management, and collaboration workflows'),
        R('div',{style:{height:'36px',borderRadius:'8px',background:grad,color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:600,boxShadow:f>=40?'0 0 18px rgba(0,132,255,0.45)':'none'}},'Integrate')
      )
    ),

    // Sub-beat B — OAuth picker
    R('div',{style:{position:'absolute',top:'120px',left:'50%',transform:'translateX(-50%)',width:'520px',background:'#FFFFFF',borderRadius:'14px',border:'1px solid #E5E7EB',boxShadow:'0 24px 50px rgba(17,25,40,0.18)',opacity:bOp,padding:'28px'}},
      R('div',{style:{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'18px'}},
        R('div',{style:{display:'flex',alignItems:'center',gap:'10px'}},
          R('div',{style:{width:32,height:32,borderRadius:'6px',background:'#111928',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900}},'N'),
          R('div',{style:{fontWeight:600,color:'#111928'}},'Notion')
        ),
        R('div',{style:{display:'flex',alignItems:'center',gap:'6px',fontSize:'13px',color:'#374151'}},R('span',null,'🧰'),'Your Workspace  ▾')
      ),
      R('div',{style:{textAlign:'center',fontSize:'15px',color:'#111928',marginBottom:'14px'}},'Allow "FlowHunt" to access these pages'),
      R('div',{style:{height:'34px',borderRadius:'8px',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',padding:'0 12px',fontSize:'13px',color:'#9CA3AF',marginBottom:'14px'}},'⌕  Search pages'),
      R('div',{style:{padding:'10px 14px',background:'#F9FAFB',borderRadius:'8px',fontSize:'12px',color:'#374151',fontWeight:600,marginBottom:'8px'}},'Private  ▾'),
      // Page rows with tick animation
      (function(){
        var t1=ease(cl((f-78)/12)),t2=ease(cl((f-92)/12));
        return [
          R('div',{key:'r1',style:{display:'flex',alignItems:'center',gap:'12px',padding:'10px 14px',marginBottom:'6px'}},
            R('div',{style:{width:18,height:18,borderRadius:'4px',background:t1>0.5?grad:'#FFFFFF',border:'1px solid '+(t1>0.5?'#0084FF':'#9CA3AF'),display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontSize:'12px',fontWeight:800}},t1>0.5?'✓':''),
            R('div',{style:{fontSize:'14px',color:'#111928'}},'📄  Notion AI capability demo draft')
          ),
          R('div',{key:'r2',style:{display:'flex',alignItems:'center',gap:'12px',padding:'10px 14px'}},
            R('div',{style:{width:18,height:18,borderRadius:'4px',background:t2>0.5?grad:'#FFFFFF',border:'1px solid '+(t2>0.5?'#0084FF':'#9CA3AF'),display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontSize:'12px',fontWeight:800}},t2>0.5?'✓':''),
            R('div',{style:{fontSize:'14px',color:'#111928'}},'📖  The Notion Basics')
          )
        ];
      })(),
      R('div',{style:{display:'flex',gap:'10px',marginTop:'20px'}},
        R('div',{style:{flex:1,height:'40px',borderRadius:'8px',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',color:'#111928',fontWeight:500}},'Back'),
        R('div',{style:{flex:1,height:'40px',borderRadius:'8px',background:grad,color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:600,boxShadow:f>=110?'0 0 18px rgba(34,197,94,0.50)':'none'}},'Allow access')
      )
    ),

    // Sub-beat C — Agent canvas
    R('div',{style:{position:'absolute',top:'120px',left:'50%',transform:'translateX(-50%)',width:'1300px',height:'780px',background:'#FFFFFF',borderRadius:'14px',border:'1px solid #E5E7EB',boxShadow:'0 24px 50px rgba(17,25,40,0.10)',opacity:cOp,padding:'40px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}},
      // Chat Input
      R('div',{style:{width:'200px',height:'56px',borderRadius:'12px',background:'#10B981',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:600,marginBottom:'14px'}},'Chat Input'),
      R('div',{style:{width:'2px',height:'24px',background:'#94A3B8'}}),
      // AI Agent + tools row
      R('div',{style:{width:'700px',padding:'18px 24px',borderRadius:'14px',background:'#FAFAFA',border:'2px dashed #F472B6',position:'relative'}},
        R('div',{style:{display:'flex',alignItems:'center',gap:'12px',marginBottom:'12px'}},
          R('div',{style:{width:'48px',height:'48px',borderRadius:'10px',background:'#F472B6',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:'20px'}},'🤖'),
          R('div',{style:{fontSize:'20px',fontWeight:700,color:'#111928'}},'AI Agent')
        ),
        // Cascading tool icons
        R('div',{style:{display:'flex',flexWrap:'wrap',gap:'8px'}},
          (function(){
            var tools=['search','fetch','create','update','move','duplicate','db-create','view','query','comment','users','self','more','more','more','more','more','more'];
            return tools.map(function(t,i){
              var localStart=140+i*4;
              var p=ease(cl((f-localStart)/16));
              return R('div',{key:i,style:{width:'34px',height:'34px',borderRadius:'8px',background:'#111928',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:'14px',opacity:p,transform:'scale('+(0.5+0.5*p)+')'}},'N');
            });
          })()
        )
      ),
      R('div',{style:{width:'2px',height:'24px',background:'#94A3B8'}}),
      // Chat Output
      R('div',{style:{width:'200px',height:'56px',borderRadius:'12px',background:'#F87171',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:600}},'Chat Output'),
      // Integrated badge
      f>=178?R('div',{style:{position:'absolute',top:'30px',right:'40px',padding:'8px 14px',borderRadius:'20px',background:'#DCFCE7',color:'#15803D',fontSize:'13px',fontWeight:700,border:'1px solid #86EFAC',opacity:ease(cl((f-178)/22))}},'✓  Integrated'):null
    ),

    // Sub-beat D — Live tool call
    R('div',{style:{position:'absolute',top:'120px',left:'50%',transform:'translateX(-50%)',width:'1000px',background:'#FFFFFF',borderRadius:'14px',border:'1px solid #E5E7EB',boxShadow:'0 24px 50px rgba(17,25,40,0.10)',opacity:dOp,padding:'32px'}},
      R('div',{style:{display:'flex',alignItems:'center',gap:'10px',marginBottom:'18px'}},
        R('div',{style:{width:32,height:32,borderRadius:'50%',background:grad,color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:'14px'}},'∞'),
        R('div',{style:{fontSize:'14px',color:'#6B7280'}},'From: AIAgent')
      ),
      R('div',{style:{padding:'18px 22px',borderRadius:'10px',border:'1px solid #E5E7EB',marginBottom:'14px'}},
        R('div',{style:{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}},
          R('span',{style:{fontSize:'18px'}},'⚙'),
          R('div',null,
            R('div',{style:{fontSize:'16px',fontWeight:600,color:'#111928'}},'Using notion_search'),
            R('div',{style:{fontSize:'12px',color:'#9CA3AF',fontFamily:MONO}},'notion_search')
          ),
          R('div',{style:{marginLeft:'auto',fontSize:'12px',color:'#9CA3AF'}},'1103 ms  ⌃')
        ),
        R('div',{style:{padding:'12px 16px',background:'#F9FAFB',borderRadius:'8px',fontFamily:MONO,fontSize:'13px',color:'#374151',marginBottom:'10px'}},
          R('div',null,'Input'),
          R('div',{style:{marginTop:'6px',color:'#111928'}},'query: "Notion AI capability demo draft"'),
          R('div',{style:{color:'#111928'}},'filter_type: page'),
          R('div',{style:{color:'#111928'}},'page_size: 10')
        ),
        R('div',{style:{padding:'12px 16px',background:'#0F172A',borderRadius:'8px',fontFamily:MONO,fontSize:'12px',color:'#D1D5DB',lineHeight:1.6}},
          R('div',null,'Output'),
          R('div',{style:{marginTop:'6px',color:'#94A3B8'}},'[{"object":"page", "id":"3440ad64-336e-8065...",'),
          R('div',{style:{color:'#94A3B8'}},'  "title":"The Notion Basics",'),
          R('div',{style:{color:'#94A3B8'}},'  "last_edited":"2026-05-27T18:41:00Z"'),
          R('div',{style:{color:'#94A3B8'}},'}]')
        )
      ),
      R('div',{style:{display:'flex',alignItems:'center',gap:'10px',fontSize:'13px',color:'#6B7280'}},
        R('div',{style:{width:24,height:24,borderRadius:'50%',background:grad,color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px'}},'⌕'),
        'Search for pages and databases by title in Notion.'
      )
    )
  );
}`;

/* ============================================================================
 * SCENE 7 — CTA
 * ========================================================================== */
const CTAScene = `function CTAScene(props){${HELPERS}
  var f=props.frame||0;
  var END=240;
  var sceneOut=easeIn(cl((f-(END-16))/16));
  var op=1-sceneOut;
  var logoIn=ease(cl(f/22));
  var divIn=ease(cl((f-24)/16));
  var titleIn=ease(cl((f-38)/22));
  var subIn=ease(cl((f-52)/22));
  var btnIn=ease(cl((f-66)/22));
  var urlIn=ease(cl((f-100)/24));
  var btnNudge=Math.sin(f/12)*3;
  return R('div',{style:{width:'100%',height:'100%',background:'#FFFFFF',position:'relative',fontFamily:INTER,opacity:op,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'18px'}},
    // FH mark + wordmark
    R('div',{style:{display:'flex',alignItems:'center',gap:'14px',opacity:logoIn,transform:'translateY('+(8*(1-logoIn))+'px)'}},
      R('svg',{width:64,height:64,viewBox:'0 0 275 223'},
        R('defs',null,R('linearGradient',{id:'cta-g',x1:0,y1:0,x2:1,y2:1},R('stop',{offset:0,stopColor:'#0084FF'}),R('stop',{offset:1,stopColor:'#1A56DB'}))),
        R('path',{d:'${FH_MARK_PATH}',fill:'url(#cta-g)'})
      ),
      R('span',{style:{fontSize:'48px',fontWeight:800,color:'#111928',letterSpacing:'-1px'}},'FlowHunt')
    ),
    // Divider
    R('div',{style:{width:'200px',height:'2px',background:'#E5E7EB',transform:'scaleX('+divIn+')',opacity:divIn}}),
    // Title
    R('div',{style:{fontSize:'52px',fontWeight:800,color:'#111928',letterSpacing:'-1px',textAlign:'center',opacity:titleIn,transform:'translateY('+(10*(1-titleIn))+'px)'}},
      'How to Use Claude Code with ',
      R('br',null),
      R('span',{style:{background:grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}},'the Notion MCP')
    ),
    // Subtitle
    R('div',{style:{fontSize:'22px',color:'#6B7280',fontWeight:500,opacity:subIn}},'A complete setup guide'),
    // Button
    R('div',{style:{padding:'16px 32px',borderRadius:'32px',background:grad,color:'#FFFFFF',fontSize:'20px',fontWeight:600,opacity:btnIn,transform:'translateY('+(10*(1-btnIn))+'px) scale('+(0.92+0.08*btnIn)+')',boxShadow:'0 14px 30px rgba(0,132,255,0.32)',display:'flex',alignItems:'center',gap:'10px'}},
      'Read the guide',
      R('span',{style:{transform:'translateX('+btnNudge+'px)',display:'inline-block'}},'→')
    ),
    // URL
    R('div',{style:{fontSize:'18px',color:'#9CA3AF',fontFamily:MONO,opacity:urlIn,marginTop:'8px'}},'flowhunt.io/blog')
  );
}`;

// ----------------------------------------------------------------------------
// Compose template.json
// ----------------------------------------------------------------------------
function scene(id, frames, componentName, dark) {
  return {
    id,
    startFrame: frames.start,
    endFrame: frames.end,
    backgroundColor: '#FFFFFF',
    transition: { type: 'fade', duration: 18 },
    layers: [
      {
        id: `${id}-layer`,
        type: 'custom',
        position: { x: 0, y: 0 },
        size: { width: 1920, height: 1080 },
        customComponent: { name: componentName, props: {} },
      },
      {
        id: `${id}-watermark`,
        type: 'custom',
        position: { x: 0, y: 994 },
        size: { width: 1920, height: 50 },
        customComponent: { name: 'Watermark', props: { dark: !!dark } },
      },
    ],
  };
}

const template = {
  name: 'claude-code-notion-mcp',
  description: 'Motion-graphics promo for the FlowHunt blog "How to Use Claude Code with the Notion MCP".',
  version: '1.0.0',
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
    DemoScene:      { type: 'inline', code: DemoScene },
    ArchScene:      { type: 'inline', code: ArchScene },
    InstallScene:   { type: 'inline', code: InstallScene },
    SnapshotScene:  { type: 'inline', code: SnapshotScene },
    FlowHuntScene:  { type: 'inline', code: FlowHuntScene },
    CTAScene:       { type: 'inline', code: CTAScene },
  },
  scenes: [
    scene('s01-pivot',    F.pivot,    'PivotScene'),
    scene('s02-demo',     F.demo,     'DemoScene'),
    scene('s03-arch',     F.arch,     'ArchScene'),
    scene('s04-install',  F.install,  'InstallScene'),
    scene('s05-snapshot', F.snapshot, 'SnapshotScene'),
    scene('s06-flowhunt', F.flowhunt, 'FlowHuntScene'),
    scene('s07-cta',      F.cta,      'CTAScene'),
  ],
};

// Sanity check: last scene's endFrame must equal output.duration * fps.
const lastEnd = template.scenes[template.scenes.length - 1].endFrame;
const expected = Math.round(template.output.duration * template.output.fps);
if (lastEnd !== expected) {
  console.error(`ERROR: last endFrame (${lastEnd}) != duration*fps (${expected}). Black-tail risk.`);
  process.exit(1);
}

writeFileSync(join(__dirname, 'template.json'), JSON.stringify(template, null, 2));
console.log(`✓ template.json written — ${template.scenes.length} scenes · ${TOTAL_FRAMES} frames · ${TOTAL_SECONDS.toFixed(2)} s`);
