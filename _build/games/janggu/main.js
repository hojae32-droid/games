/* 3~6학년 음악 · 국악 장단(세마치·굿거리·자진모리) — 장구 장단 놀이
   디자인: 한지 빛깔 마당. 장단의 구음(덩·쿵·덕)을 보며 왼쪽 북편, 오른쪽 채편, 가운데 덩을 쳐서 장구를 직접 연주해요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#2b1b12',RED='#c1272d',BLUE='#1d4e89',GOLD='#d98e04',WOOD='#7a5230';
const JD={
  semachi:{label:'세마치장단',desc:'덩 · 덩 덕 · 쿵 덕  (3박, 한 박은 3소박)',tag:'3~4학년',ic:'🪘',beats:3,sobak:.34,cells:['덩','','','덩','','덕','쿵','덕','']},
  gutgeori:{label:'굿거리장단',desc:'덩 기덕 쿵 더러러러 … (4박)',tag:'4~5학년',ic:'💃',beats:4,sobak:.3,cells:['덩','','기덕','쿵','','더러러러','쿵','','기덕','쿵','','더러러러']},
  jajin:{label:'자진모리장단',desc:'덩 덕 · 덕 · 쿵 덕 · 덕 (4박, 빠르게)',tag:'5~6학년',ic:'🔥',beats:4,sobak:.25,cells:['덩','','덕','','덕','','쿵','','덕','','덕','']},
};
const SIDE={'덩':'both','쿵':'left','덕':'right','기덕':'right','더러러러':'right'};
const SCOL={both:'#7a3db8',left:BLUE,right:RED};
const SNAME={both:'양손',left:'왼손',right:'오른손'};
const PAIR=.11;
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M6 12c10 6 26 6 36 0v24c-10-6-26-6-36 0z" fill="#d98e04" stroke="#2b1b12" stroke-width="3" stroke-linejoin="round"/><ellipse cx="6" cy="24" rx="4" ry="12" fill="#fff9ec" stroke="#2b1b12" stroke-width="3"/><ellipse cx="42" cy="24" rx="4" ry="12" fill="#c1272d" stroke="#2b1b12" stroke-width="3"/></svg>';
const jo=(w,a,b)=>{const c=w.charCodeAt(w.length-1);return c>=0xAC00&&c<=0xD7A3&&(c-0xAC00)%28?a:b;};
function hanji(g,W,H,u,t){K.vgrad(g,0,0,W,H,['#f6ebd3','#ecdcb8']);g.fillStyle=RED;g.fillRect(0,0,W,u*.22);g.fillStyle=BLUE;g.fillRect(0,u*.22,W,u*.14);g.fillStyle=GOLD;g.fillRect(0,u*.36,W,u*.06);}
function janggu(g,cx,cy,jw,jh,pr,hint,t){g.save();g.translate(cx,cy);g.lineJoin='round';g.lineWidth=Math.max(3,jh*.03);g.strokeStyle=INK;
  const hx=jw/2,hr=jh*.5;
  /* 몸통 (장구통) */
  g.fillStyle='#e0a13a';g.beginPath();g.moveTo(-hx,-hr*.92);g.bezierCurveTo(-hx*.45,-hr*.3,-hx*.3,-hr*.18,0,-hr*.18);g.bezierCurveTo(hx*.3,-hr*.18,hx*.45,-hr*.3,hx,-hr*.92);g.lineTo(hx,hr*.92);g.bezierCurveTo(hx*.45,hr*.3,hx*.3,hr*.18,0,hr*.18);g.bezierCurveTo(-hx*.3,hr*.18,-hx*.45,hr*.3,-hx,hr*.92);g.closePath();g.fill();g.stroke();
  g.fillStyle='rgba(255,255,255,.22)';g.beginPath();g.moveTo(-hx*.9,-hr*.8);g.bezierCurveTo(-hx*.45,-hr*.3,-hx*.25,-hr*.12,0,-hr*.1);g.bezierCurveTo(-hx*.25,-hr*.2,-hx*.4,-hr*.5,-hx*.8,-hr*.9);g.closePath();g.fill();
  /* 조롱목(줄) */
  g.strokeStyle='#c1272d';g.lineWidth=Math.max(2,jh*.025);for(let i=-3;i<=3;i++){g.beginPath();g.moveTo(-hx*.88,i*hr*.2);g.lineTo(-hx*.2,(i*.28)*hr*.2);g.moveTo(hx*.88,i*hr*.2);g.lineTo(hx*.2,(i*.28)*hr*.2);g.stroke();}
  /* 양쪽 가죽 (왼쪽 북편, 오른쪽 채편) */
  for(const sd of['left','right']){const d=sd==='left'?-1:1;const on=pr[sd]>0,hn=hint&&(hint===sd||hint==='both');g.save();g.translate(d*hx,0);
    if(on||hn)K.glow(g,0,0,hr*1.1,on?'#fff3a0':sd==='left'?'#7ab8ff':'#ff9a9a',on?.9:.55+.2*Math.sin(t*10));
    g.fillStyle=on?'#fff6c4':'#fffaf0';g.strokeStyle=INK;g.lineWidth=Math.max(3,jh*.03);g.beginPath();g.ellipse(0,0,hr*.26,hr*.95,0,0,TAU);g.fill();g.stroke();
    g.strokeStyle=sd==='left'?BLUE:RED;g.lineWidth=Math.max(2,jh*.03);g.beginPath();g.ellipse(0,0,hr*.17,hr*.62,0,0,TAU);g.stroke();
    K.txt(g,sd==='left'?'쿵':'덕',0,0,{size:hr*.3,color:sd==='left'?BLUE:RED,maxW:hr*.36});g.restore();}
  /* 가운데 덩 */
  const onB=(pr.both>0),hb=hint==='both';K.rr(g,-hx*.2,-hr*.14,hx*.4,hr*.28,hr*.1);g.fillStyle=onB?'#fff3a0':'#7a3db8';g.fill();g.lineWidth=Math.max(2,jh*.025);g.strokeStyle=INK;g.stroke();
  if(hb&&!onB)K.glow(g,0,0,hr*.5,'#d1a0ff',.6+.2*Math.sin(t*10));
  K.txt(g,'덩',0,1,{size:hr*.2,color:onB?INK:'#fff',maxW:hx*.35});
  g.restore();}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    const u=Math.min(W0,H0)/6;hanji(g,W0,H0,u,T);const cs=JD.gutgeori.cells;const k=Math.floor(T*3)%cs.length;const pr={};const c=cs[k];const sd=SIDE[c];if(sd){const ph=(T*3)%1;if(ph<.4){if(sd==='both'){pr.left=1;pr.right=1;pr.both=1;}else pr[sd]=1;}}
    const n=cs.length,cw=Math.min(W0*.07,u*.9);const x0=W0/2-n*cw/2;cs.forEach((s,i)=>{K.rr(g,x0+i*cw+2,H0*.18,cw-4,cw*1.1,cw*.15);g.fillStyle=i===k?'#ffe9a8':'#fff9ec';g.fill();g.lineWidth=2;g.strokeStyle=WOOD;g.stroke();K.txt(g,s||'·',x0+i*cw+cw/2,H0*.18+cw*.55,{size:cw*.34,color:SIDE[s]?SCOL[SIDE[s]]:'#aaa',maxW:cw*.9});});
    janggu(g,W0/2,H0*.64,Math.min(W0*.55,u*8),Math.min(H0*.45,u*3.4),pr,null,T);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'janggu',title:'장구 장단 놀이',title1:'한마당 장구 연주',title2:'장구 장단 놀이',emoji:LOGO,
  subtitle:'3~6학년 음악 · 국악 장단 치기',
  howto:'처음 한 장단은 선생님이 시범을 보여요. 그다음부터 <b>빛이 지나가는 칸</b>의 구음대로 장구를 쳐요. <b>왼쪽 = 쿵(북편)</b>, <b>오른쪽 = 덕(채편)</b>, <b>가운데(또는 두 쪽을 함께) = 덩</b>. 기덕·더러러러는 덕으로 쳐요. (키보드: 왼손 F · 오른손 J · 스페이스 = 덩)',
  how:p=>(JD[p.levelId].label+' · '+JD[p.levelId].desc),
  theme:{c1:'#c1272d',c2:'#1d4e89'},hero:heroScene,vignette:.05,durs:[60,120,180],levelTitle:'어떤 장단을 칠까요?',
  txt:{who:'누가 연주자일까요?',dur:'연주 시간',pace:'장단 빠르기',seat:'번 연주자 ',go:'장단 시작!',s1:'1. 장단',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(JD).map(([k,v])=>({id:k,g:'3~6학년',t:v.ic+' '+v.label,d:v.tag+' · '+v.desc})),
  summary:`<ul><li><b>장단</b>은 우리 음악의 리듬틀이에요. 세마치장단은 3박(덩 · 덩 덕 · 쿵 덕), 굿거리장단은 느리고 흥겨운 4박, 자진모리장단은 빠르고 신나는 4박이에요.</li>
    <li><b>장구</b>는 왼쪽 북편(쿵, 낮은 소리)과 오른쪽 채편(덕, 높은 소리)으로 이루어져 있어요. 두 쪽을 함께 치면 <b>덩</b> 소리가 나요.</li>
    <li>장단의 <b>구음</b>(덩·쿵·덕·기덕·더러러러)은 장구 소리를 입으로 부르는 말이에요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const L=JD[p.levelId];const top=(p.top||0)+u*.7;const pad=u*.35;const land=W>=H*1.1;const N=L.cells.length;const cols=land||N<=9?N:Math.ceil(N/2);const rows=Math.ceil(N/cols);const cw=Math.min((W-pad*2)/cols,u*3.4);const ch=Math.min(cw*1.05,u*3);const cx0=W/2-cols*cw/2;
    const cells=L.cells.map((c,i)=>({x:cx0+(i%cols)*cw+3,y:top+(land?u*1.2:u*2)+Math.floor(i/cols)*(ch+u*.2),w:cw-6,h:ch}));const cellsBottom=top+(land?u*1.2:u*2)+rows*(ch+u*.2);
    const jy=cellsBottom+u*.4;const jh=Math.min(H-jy-u*.5,u*7,W*.42);const jw=Math.min(W-pad*2-jh*.45,u*14);const jc={x:W/2,y:jy+(H-jy)*.5};
    return{W,H,u,L,top,pad,N,cells,cellsBottom,jc,jw,jh,land,hx:jw/2};},
  init(p){const st=p.state;Object.assign(st,{T:0,clk:0,strokes:[],schedT:0,a0:0,pend:null,pr:{},judge:'',judgeT:0,judgeC:'',okN:0,streak:0,lastCell:-1,cyc:-9,started:false,msg:'',mood:'neutral',fx:[]});},
  start(p){const st=p.state,L=JD[p.levelId];const sb=L.sobak/Math.max(.8,Math.min(1.3,p.pace));st.sb=sb;st.N=L.cells.length;st.CYC=st.N*sb;st.started=true;const lead=.4+L.beats*3*sb;st.a0=M.now()+lead;st.schedT=-st.CYC;st.clk=-lead;p.ask('🪘 <b>'+L.label+'</b>','선생님 시범을 듣고, 빛이 지나가는 칸의 구음대로 쳐요');},
  play(p,name,when,vel,o){const map={'덩':'deong','쿵':'kung','덕':'deok','기덕':'gideok','더러러러':'roll'};M.hit(map[name],when,vel,Object.assign({dur:this.st(p).sb},o||{}));},
  st(p){return p.state;},
  schedule(p){const st=p.state,L=JD[p.levelId];if(!M.lead(p))return;const until=st.clk+.5;while(st.schedT<until){const k=Math.round(st.schedT/st.sb),i=((k%st.N)+st.N)%st.N,cyc=Math.floor(k/st.N),when=st.a0+st.schedT;
      if(cyc<0){if(i%3===0)M.hit('wood',when,.7,{hi:i===0});}else{const c=L.cells[i];if(c)this.play(p,c,when,cyc===0?.9:.28,{rev:.18});if(cyc>0&&i%3===0)M.hit('wood',when,.18,{hi:i===0});}
      st.schedT+=st.sb;}},
  ensure(p,t){const st=p.state,L=JD[p.levelId];const cyc=Math.floor(t/st.CYC);for(let c=Math.max(1,cyc);c<=cyc+1;c++){if(st.strokes.some(s=>s.cyc===c))continue;L.cells.forEach((name,i)=>{if(name)st.strokes.push({cyc:c,i,name,side:SIDE[name],t:c*st.CYC+i*st.sb,hit:false,missed:false});});}},
  judge(p,txt,cls){const st=p.state;st.judge=txt;st.judgeC=cls;st.judgeT=.7;},
  update(p,dt){const st=p.state;if(!st.started)return;st.T+=dt;st.clk+=dt;M.decay(st,dt);if(st.judgeT>0)st.judgeT-=dt;st.fx=st.fx.filter(f=>(f.t+=dt)<.6);const L=JD[p.levelId];const t=st.clk;this.schedule(p);
    const k=Math.floor(t/st.sb),i=((k%st.N)+st.N)%st.N;st.cur=t>=0?i:-1;st.cyc=Math.floor(t/st.CYC);if(t>=0)this.ensure(p,t);
    for(const s of st.strokes){if(!s.hit&&!s.missed&&t-s.t>.16+PAIR+.02){s.missed=true;st.streak=0;this.judge(p,'놓쳤어요','miss');p.hit(false,{pen:8,shake:false,review:s.name+jo(s.name,'은','는')+' '+SNAME[s.side]+'으로 쳐요 ('+L.label+')',quiet:true});}}
    st.strokes=st.strokes.filter(s=>t-s.t<st.CYC);},
  flash(p,side){const st=p.state;(side==='both'?['left','right','both']:[side]).forEach(sd=>M.press(st,sd,.16));},
  hand(p,side){const st=p.state;if(!st.started||!p.active)return;const vol=M.vol(p);M.hit(side==='left'?'kung':'deok',null,.85,{vol});const t=st.clk;
    if(st.pend&&st.pend.side!==side&&t-st.pend.t<=PAIR){clearTimeout(st.pend.timer);const t0=st.pend.t;st.pend=null;this.flash(p,'both');this.strike(p,'both',t0);return;}
    if(st.pend){clearTimeout(st.pend.timer);const q=st.pend;st.pend=null;this.strike(p,q.side,q.t);}
    this.flash(p,side);const q={side,t};q.timer=setTimeout(()=>{if(st.pend===q){st.pend=null;this.strike(p,side,t);}},PAIR*1000);st.pend=q;},
  both(p){const st=p.state;if(!st.started||!p.active)return;M.hit('deong',null,.85,{vol:M.vol(p)});this.flash(p,'both');this.strike(p,'both',p.state.clk);},
  strike(p,side,t){const st=p.state,G=this.geo(p);if(t<st.CYC-.2)return;
    let best=null,bd=1;for(const s of st.strokes){if(s.hit||s.missed)continue;const d=Math.abs(s.t-t);if(d<bd){bd=d;best=s;}}
    if(best&&bd<=.16){const c=G.cells[best.i];if(best.side===side){best.hit=true;const pf=bd<=.08;best.q=pf?'perfect':'good';st.streak++;st.okN++;p.hit(true,{pts:pf?30:15,x:c.x+c.w/2,y:c.y,quiet:true});this.judge(p,pf?'얼씨구!':'좋다!',pf?'perfect':'good');for(let k=0;k<6;k++)st.fx.push({x:c.x+c.w/2,y:c.y+c.h/2,a:k/6*TAU,t:0});}
      else{best.hit=true;best.missed=true;best.q='miss';st.streak=0;p.hit(false,{pen:8,shake:false,review:best.name+jo(best.name,'은','는')+' '+SNAME[best.side]+'으로 쳐요',quiet:true});this.judge(p,best.name+jo(best.name,'은','는')+' '+{both:'양손(덩)',left:'왼손(쿵)',right:'오른손(덕)'}[best.side]+'!','miss');}}
    else{this.judge(p,'쉬는 칸이에요','off');p.hit(false,{pen:8,shake:false,review:'쉬는 칸에서는 치지 않아요',quiet:true});}},
  zone(p,x,y){const G=this.geo(p);const jc=G.jc;if(y<G.cellsBottom-G.u*.3)return null;const dx=x-jc.x;if(Math.abs(dx)<G.hx*.22)return'both';return dx<0?'left':'right';},
  down(p,x,y){const z=this.zone(p,x,y);if(!z)return;if(z==='both')this.both(p);else this.hand(p,z);},
  key(p,e){const c=e.code;if(c==='KeyF'||c==='KeyD'||c==='ArrowLeft'){e.preventDefault&&e.preventDefault();this.hand(p,'left');}else if(c==='KeyJ'||c==='KeyK'||c==='ArrowRight'){e.preventDefault&&e.preventDefault();this.hand(p,'right');}else if(c==='Space'||c==='ArrowDown'||c==='ArrowUp'){e.preventDefault&&e.preventDefault();this.both(p);}},
  botAct(p){const st=p.state;if(!st.started||st.clk<0)return null;const G=this.geo(p);const s=st.strokes.find(s=>!s.hit&&!s.missed&&s.t-st.clk<.09&&s.t-st.clk>-.05);if(!s)return null;const rc=p.cv.getBoundingClientRect();const x=s.side==='both'?G.jc.x:s.side==='left'?G.jc.x-G.hx*.7:G.jc.x+G.hx*.7;return{k:'click',x:rc.left+x,y:rc.top+G.jc.y};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,L=G.L;hanji(g,W,H,u,t);
    K.card(g,u*.3,(p.top||0)+u*.5,u*3.6,u*.8,u*.2,'#fff9ec',{stroke:WOOD,lw:3,blur:0,dy:0});K.txt(g,L.ic+' '+L.label,u*.3+u*1.8,(p.top||0)+u*.9,{size:u*.42,color:INK,maxW:u*3.4});
    const ph=!st.started?'':st.clk<0?'준비…':st.cyc===0?'👂 선생님 시범':'🙌 같이 쳐요! '+st.cyc+'장단';K.txt(g,ph,W/2,G.top+(G.land?u*.5:u*1.3),{size:Math.min(u*.8,W*.05),color:st.cyc===0&&st.clk>=0?BLUE:RED,maxW:W*.7});
    /* 구음 칸 */
    G.cells.forEach((c,i)=>{const name=L.cells[i];const side=SIDE[name];const now=st.cur===i;const strk=st.strokes.find(s=>s.i===i&&s.cyc===Math.max(1,st.cyc));let col='#fff9ec';
      if(strk&&strk.q==='perfect')col='#d8f3dc';else if(strk&&strk.q==='good')col='#dbeafe';else if(strk&&strk.q==='miss')col='#ffe0e0';if(now)col='#ffe9a8';
      K.card(g,c.x,c.y+(now?-u*.1:0),c.w,c.h,u*.2,col,{stroke:(i%3===0)?GOLD:WOOD,lw:i%3===0?4:2.5,blur:0,dy:0});
      K.txt(g,name||'·',c.x+c.w/2,c.y+c.h*.45+(now?-u*.1:0),{size:Math.min(c.h*.42,c.w*.4,u*1.4),color:side?SCOL[side]:'rgba(43,27,18,.35)',maxW:c.w*.9});
      if(side)K.txt(g,SNAME[side],c.x+c.w/2,c.y+c.h*.82+(now?-u*.1:0),{size:Math.min(c.h*.2,u*.5),color:SCOL[side],maxW:c.w*.9});else K.txt(g,'쉬어요',c.x+c.w/2,c.y+c.h*.82,{size:Math.min(c.h*.18,u*.45),color:'rgba(43,27,18,.3)',maxW:c.w*.9});});
    for(const f of st.fx){const r=u*(.5+f.t*2.5);g.fillStyle=`rgba(217,142,4,${1-f.t/.6})`;g.beginPath();g.arc(f.x+Math.cos(f.a)*r,f.y+Math.sin(f.a)*r,u*.13,0,TAU);g.fill();}
    /* 다음에 칠 곳 안내 */
    let hint=null;if(st.started&&st.clk>=0){const nx=st.strokes.find(s=>!s.hit&&!s.missed&&s.t-st.clk>-.1&&s.t-st.clk<.5);if(nx)hint=nx.side;else if(st.cyc===0){const c=L.cells[st.cur];if(c)hint=SIDE[c];}}
    janggu(g,G.jc.x,G.jc.y,G.jw,G.jh,st.pr,hint,t);
    if(st.judgeT>0){const jc={perfect:'#16a34a',good:'#1d4e89',miss:'#dc2626',off:'#dc2626'}[st.judgeC];K.txt(g,st.judge,W/2,G.cellsBottom+u*.1,{size:u*.9,color:jc,stroke:'#fff',lw:u*.18,maxW:W*.8});}
    if(st.streak>2)K.txt(g,st.streak+'연속',W-u*1.6,G.top+u*.5,{size:u*.6,color:RED,maxW:u*3});
    if(st.clk<0&&st.started){const c=Math.ceil(-st.clk/st.sb/3);K.txt(g,String(Math.min(JD[p.levelId].beats,Math.max(1,c))),W/2,G.jc.y,{size:u*2.5,color:'rgba(193,39,45,.55)'});}
  },
};
Engine.boot(GAME);
