/* 3~4학년 국어 · 문장의 짜임 · 이어 주는 말 · 꾸며 주는 말 — 문장 로봇 조립소
   디자인: 하늘색 장난감 로봇 공장. 낱말 부품으로 문장 로봇을 조립하고, 톱니바퀴로 두 문장을 이어요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#0c3a63';
const strip=s=>String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="11" y="12" width="26" height="22" rx="5" fill="#fbbf24" stroke="#0c3a63" stroke-width="3.2"/><path d="M24 12V6" stroke="#0c3a63" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="5" r="3" fill="#ef4444" stroke="#0c3a63" stroke-width="2"/><circle cx="18" cy="22" r="3.5" fill="#fff" stroke="#0c3a63" stroke-width="2"/><circle cx="30" cy="22" r="3.5" fill="#fff" stroke="#0c3a63" stroke-width="2"/><path d="M18 29h12" stroke="#0c3a63" stroke-width="3" stroke-linecap="round"/><rect x="14" y="36" width="8" height="7" rx="2" fill="#38bdf8" stroke="#0c3a63" stroke-width="2.5"/><rect x="26" y="36" width="8" height="7" rx="2" fill="#38bdf8" stroke="#0c3a63" stroke-width="2.5"/></svg>';
/*@@DATA@@*/
const MC=(()=>{const c=document.createElement('canvas');return c.getContext('2d');})();
const mw=(t,fs)=>{MC.font=K.font(fs);return MC.measureText(t).width;};
const OPT4=['그리고','그러나','그래서','왜냐하면'];
const PLATE=['#fde68a','#bae6fd','#bbf7d0'];
function gear(g,x,y,r,t,col,teeth){teeth=teeth||10;g.save();g.translate(x,y);g.rotate(t);g.fillStyle=col||'#94a3b8';g.strokeStyle=INK;g.lineWidth=Math.max(2,r*.1);g.beginPath();for(let i=0;i<teeth*2;i++){const a=i*Math.PI/teeth,rr=i%2?r*.78:r;g.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);}g.closePath();g.fill();g.stroke();g.fillStyle='#e0f2fe';g.beginPath();g.arc(0,0,r*.32,0,TAU);g.fill();g.stroke();g.restore();}
/* 슬롯 로봇: 머리·몸통·다리 칸. fills[k] 글자, roles[k] 이름 */
function slotRobot(g,x,y,w,h,u,n,fills,roles,o){o=o||{};const kinds=n===2?[0,2]:[0,1,2];const hs=n===2?[h*.46,0,h*.46]:[h*.3,h*.38,h*.3];const gap=h*.04;
  let cy=y;kinds.forEach((kd,k)=>{const ph=hs[kd];const pw=kd===0?w*.78:kd===1?w:w*.82;const px=x+(w-pw)/2;const filled=fills[k];const col=o.res?(o.res==='ok'?'#bbf7d0':(filled&&filled!==o.ans[k]?'#fecaca':PLATE[kd])):PLATE[kd];
    K.card(g,px,cy,pw,ph,u*.25,filled?col:'rgba(255,255,255,.5)',{stroke:INK,lw:Math.max(3,u*.08),blur:0,dy:u*.08,sc:INK});
    if(kd===0){/* 안테나 */g.strokeStyle=INK;g.lineWidth=Math.max(3,u*.08);g.beginPath();g.moveTo(px+pw/2,cy);g.lineTo(px+pw/2,cy-u*.6);g.stroke();g.fillStyle='#ef4444';g.beginPath();g.arc(px+pw/2,cy-u*.7,u*.2,0,TAU);g.fill();g.stroke();}
    if(kd===2){/* 발 */for(const d of[-1,1]){g.fillStyle='#38bdf8';K.rr(g,px+pw/2+d*pw*.28-pw*.14,cy+ph-u*.05,pw*.28,u*.4,u*.12);g.fill();g.stroke();}}
    if(kd===1){/* 팔 */for(const d of[-1,1]){g.fillStyle='#38bdf8';K.rr(g,d<0?px-u*.45:px+pw-u*.05,cy+ph*.2,u*.5,ph*.55,u*.2);g.fill();g.stroke();}}
    K.txt(g,roles[k]||'',px+u*.2,cy+u*.4,{size:Math.min(u*.42,ph*.22),color:'#0369a1',align:'left',maxW:pw*.5});
    if(filled)QK.txt(g,filled,px+pw/2,cy+ph*.58,pw*.88,ph*.6,Math.min(u*1.1,ph*.45),INK,1.1);else K.txt(g,'?',px+pw/2,cy+ph*.58,{size:Math.min(u*.9,ph*.45),color:'rgba(3,105,161,.5)'});
    if(k<kinds.length-1){g.fillStyle='#94a3b8';g.beginPath();g.arc(px+pw*.25,cy+ph+gap/2,u*.1,0,TAU);g.arc(px+pw*.75,cy+ph+gap/2,u*.1,0,TAU);g.fill();}
    cy+=ph+gap;});}
function miniBot(g,x,y,s,mood,t,walk){g.save();g.translate(x,y);g.lineJoin='round';g.lineWidth=Math.max(2,s*.05);g.strokeStyle=INK;const bob=walk?Math.abs(Math.sin(t*8))*s*.04:Math.sin(t*3)*s*.015;g.translate(0,-bob);
  K.shadow(g,0,s*.5+bob,s*.4,s*.07,.25);
  for(const d of[-1,1]){g.fillStyle='#38bdf8';K.rr(g,d*s*.16-s*.08,s*.28,s*.16,s*.22+(walk?Math.sin(t*8+d)*s*.04:0),s*.05);g.fill();g.stroke();}
  g.fillStyle='#fbbf24';K.rr(g,-s*.28,-s*.02,s*.56,s*.36,s*.1);g.fill();g.stroke();gear(g,0,s*.16,s*.1,t*2,'#f97316',6);
  for(const d of[-1,1]){g.fillStyle='#38bdf8';K.rr(g,d*s*.36-s*.05,s*.02,s*.1,s*.26,s*.04);g.fill();g.stroke();}
  g.fillStyle='#fde68a';K.rr(g,-s*.3,-s*.5,s*.6,s*.44,s*.12);g.fill();g.stroke();g.beginPath();g.moveTo(0,-s*.5);g.lineTo(0,-s*.62);g.stroke();g.fillStyle='#ef4444';g.beginPath();g.arc(0,-s*.65,s*.05,0,TAU);g.fill();g.stroke();
  g.fillStyle='#e0f2fe';K.rr(g,-s*.22,-s*.42,s*.44,s*.26,s*.06);g.fill();g.stroke();g.fillStyle=INK;g.strokeStyle=INK;g.lineCap='round';
  for(const d of[-1,1]){const ex=d*s*.09,ey=-s*.32;if(mood==='oops'){g.beginPath();g.moveTo(ex-s*.04,ey-s*.04);g.lineTo(ex+s*.04,ey+s*.04);g.moveTo(ex+s*.04,ey-s*.04);g.lineTo(ex-s*.04,ey+s*.04);g.stroke();}else if(mood==='happy'){g.beginPath();g.arc(ex,ey+s*.02,s*.045,Math.PI*1.1,Math.PI*1.9);g.stroke();}else{g.beginPath();g.arc(ex,ey,s*.04,0,TAU);g.fill();}}
  g.beginPath();if(mood==='happy')g.arc(0,-s*.24,s*.06,.1,Math.PI-.1);else if(mood==='oops')g.arc(0,-s*.19,s*.05,Math.PI*1.1,Math.PI*1.9);else{g.moveTo(-s*.05,-s*.22);g.lineTo(s*.05,-s*.22);}g.stroke();
  g.restore();}
function lab(g,W,H,u,t,gy){K.vgrad(g,0,0,W,H,['#d7efff','#eaf6ff','#fff5d6']);g.save();g.strokeStyle='rgba(3,105,161,.07)';g.lineWidth=2;const gs=u*1.2;for(let x=0;x<W;x+=gs){g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke();}for(let y=0;y<H;y+=gs){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}g.restore();
  gear(g,W*.9,H*.12,u*1.1,t*.4,'rgba(148,163,184,.55)',12);gear(g,W*.82,H*.12+u*1.35,u*.6,-t*.8,'rgba(251,191,36,.6)',8);
  g.fillStyle='#94a3b8';g.fillRect(0,gy,W,H-gy);g.fillStyle='#64748b';g.fillRect(0,gy,W,Math.max(3,u*.12));g.fillStyle='#fbbf24';const off=(t*u*.8)%(u*1.2);for(let x=-u*1.2+off;x<W;x+=u*1.2){g.beginPath();g.moveTo(x,gy+u*.2);g.lineTo(x+u*.5,gy+u*.2);g.lineTo(x+u*.3,gy+u*.5);g.lineTo(x-u*.2,gy+u*.5);g.closePath();g.fill();}}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const S=[['아기가','웃는다'],['새가','노래한다'],['고양이가','생선을 먹는다']];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/6.5:Math.min(W,H)/7;const gy=H*.86;lab(g,W,H,u,T,gy);const per=5,n=Math.floor(T/per),ph=(T%per)/per;const s=S[n%3];
    const rs=Math.min(u*3.2,H*.42);const rx=ph<.65?W*.5:W*.5+(ph-.65)/.35*W*.6;miniBot(g,rx,gy-rs*.5,rs,ph>.2?'happy':'neutral',T,ph>.65);
    const cw=Math.min(u*3.2,W*.28);[['머리',s[0],-1],['다리',s[1],1]].forEach(([r,w,d],i)=>{const a=clamp((ph-.1-i*.12)/.2,0,1);if(ph>.65)return;K.card(g,W*.5+d*cw*.9-cw/2,gy-rs*1.15-(1-a)*u*2,cw,u*.9,u*.2,'#fff',{stroke:INK,lw:3,blur:0,dy:4,sc:INK});K.txt(g,w,W*.5+d*cw*.9,gy-rs*1.15-(1-a)*u*2+u*.45,{size:u*.45,color:INK,maxW:cw*.9});});};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'k07-sentence-robot',title:'문장 로봇 조립소',title1:'장난감 로봇 공장',title2:'문장 로봇 조립소',emoji:LOGO,
  subtitle:'3~4학년 · 문장의 짜임 · 이어 주는 말 · 꾸며 주는 말',
  howto:'낱말 부품으로 <b>문장 로봇</b>을 조립해요! 머리(누가·무엇이), 몸통(무엇을), 다리(어찌하다·어떠하다) 자리에 알맞은 부품을 끼우고, 두 문장을 <b>이어 주는 말</b> 톱니바퀴로 연결하고, <b>꾸며 주는 말</b>을 찾아 장식을 달아요. 완성하면 로봇이 걸어가요!',
  how:p=>({a:'낱말 부품을 <b>알맞은 자리</b>에 끼워요 (문장의 짜임)',b:'두 문장을 <b>이어 주는 말</b> 톱니바퀴를 골라요',c:'<b>꾸며 주는 말</b>을 모두 찾아요'}[p.levelId]),
  theme:{c1:'#0369a1',c2:'#f59e0b'},hero:heroScene,vignette:.04,durs:[90,150,240],levelTitle:'어떤 로봇을 만들까요?',
  txt:{who:'누가 로봇 박사가 될까요?',dur:'조립 시간',pace:'한 문제 시간',seat:'번 박사 ',go:'조립 시작!',s1:'1. 조립',s2:'2. 방법',s3:'3. 이름'},
  levels:[{id:'a',g:'3~4학년',t:'문장의 짜임',d:'누가 + 어찌하다 · 무엇이 + 어떠하다 …'},{id:'b',g:'3~4학년',t:'이어 주는 말',d:'그리고 · 그러나 · 그래서 · 왜냐하면'},{id:'c',g:'3~4학년',t:'꾸며 주는 말',d:'노란 나비가 훨훨 날아요'}],
  summary:`<ul><li>문장은 <b>누가(무엇이) + 어찌하다(어떠하다/무엇이다)</b>로 짜여요. “아기가 웃는다”(누가 + 어찌하다), “하늘이 파랗다”(무엇이 + 어떠하다), “나는 학생이다”(누가 + 무엇이다).</li>
    <li>“누가 + <b>무엇을</b> + 어찌하다”처럼 <b>무엇을</b>이 들어가기도 해요 (고양이가 생선을 먹는다).</li>
    <li><b>이어 주는 말</b>: 그리고(나란히), 그러나(반대), 그래서(원인과 결과), 왜냐하면(까닭).</li>
    <li><b>꾸며 주는 말</b>은 뒤의 말을 더 자세히 해 줘요 (노란 나비가 훨훨 날아요 → 노란, 훨훨).</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=(p.top||0)+u*1.3;const land=W>=H*1.2;const pad=Math.max(8,u*.3),gap=Math.max(7,u*.22);const A=H-Z0-pad;const q=p.state.q;
    let sc,oR;if(land){const sw=W*.5;sc={x:pad,y:Z0,w:sw,h:A};oR={x:pad*2+sw,y:Z0,w:W-sw-pad*3,h:A};}else{const sh=A*(q&&q.ty==='deco'?.3:.44);sc={x:pad,y:Z0,w:W-pad*2,h:sh};oR={x:pad,y:Z0+sh+gap,w:W-pad*2,h:A-sh-gap};}
    let rects=[],reset=null,toks=[],done=null;
    if(q){if(q.ty==='build'){const n=q.cards.length;const rh=Math.min(u*1.4,oR.h*.14);const gh=oR.h-rh-gap;const cols=n>3?2:1;const rows=Math.ceil(n/cols);const cw=(oR.w-(cols-1)*gap)/cols,ch=Math.min((gh-(rows-1)*gap)/rows,u*2.6);const oy=(gh-(rows*ch+(rows-1)*gap))/2;for(let i=0;i<n;i++)rects.push({x:oR.x+(i%cols)*(cw+gap),y:oR.y+oy+Math.floor(i/cols)*(ch+gap),w:cw,h:ch});reset={x:oR.x+oR.w*.15,y:oR.y+oR.h-rh,w:oR.w*.7,h:rh};}
      else if(q.ty==='kind'||q.ty==='link'){const n=q.opts.length;const cols=2,rows=2;const cw=(oR.w-gap)/2,ch=Math.min((oR.h-gap)/rows,u*3.4);const oy=(oR.h-(rows*ch+gap))/2;for(let i=0;i<n;i++)rects.push({x:oR.x+(i%cols)*(cw+gap),y:oR.y+oy+Math.floor(i/cols)*(ch+gap),w:cw,h:ch});}
      else{const fs=Math.min(u*1,oR.h*.1);const ph=fs*.5;let x=oR.x,y=oR.y+fs*.2;const rowH=fs*2.1;q.tok.forEach((t,k)=>{const w=mw(t.w,fs)+ph*2;if(x+w>oR.x+oR.w&&x>oR.x){x=oR.x;y+=rowH+gap*.6;}toks.push({x,y,w,h:rowH,k});x+=w+gap;});
        const bh=Math.min(u*1.6,oR.h*.14);done={x:oR.x+oR.w*.15,y:oR.y+oR.h-bh,w:oR.w*.7,h:bh};toks.fs=fs;}}
    return{W,H,u,Z0,land,pad,gap,sc,oR,rects,reset,toks,done};},
  init(p){Object.assign(p.state,{T:0,q:null,n:0,okN:0,bots:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,got:[],used:{},sel:{},bx:0});this.newQ(p);},
  make(p,L){const R=p.R,q={};
    if(L==='a'){const s=p.deck(SENT,'dk_a');const ty=s[0];const parts=s[1].split('|');q.kind=ty;q.parts=parts;q.roles=ROLE[ty];
      if(R.chance(.6)){q.ty='build';q.cards=R.shuffle(parts.map((w,k)=>({w,k})));q.text='부품 낱말을 <b>알맞은 자리</b>에 차례로 끼워 로봇을 완성해요!';q.reveal=parts.join(' ')+` (${q.roles.join(' + ')})`;q.okIdx=0;}
      else{q.ty='kind';q.text='이 문장은 <b>어떤 짜임</b>일까요?';q.reveal=KN[ty];let o=R.shuffle(Object.keys(KN)).slice(0,4);if(!o.includes(ty))o[0]=ty;o=R.shuffle(o);q.opts=o.map(k=>({t:KN[k],ok:k===ty}));q.okIdx=q.opts.findIndex(x=>x.ok);}
      q.speak=parts.join(' ');q.review=parts.join(' ')+' → '+KN[ty];}
    else if(L==='b'){const s=p.deck(LINK,'dk_b');q.ty='link';q.s=s;q.text='두 문장을 이어 주는 <b>톱니바퀴</b>를 골라요!';q.opts=OPT4.map(w=>({t:w,ok:w===s[2]}));q.okIdx=OPT4.indexOf(s[2]);q.reveal=`${s[0]} ${s[2]} ${s[1]}`;q.speak=`${s[0]} 무엇 ${s[1]}`;q.review=q.reveal;}
    else{const s=p.deck(DECO,'dk_c');q.ty='deco';q.tok=s.split(' ').map(t=>({w:t.replace(/\*/g,''),m:t.includes('*')}));q.text='<b>꾸며 주는 말</b>을 모두 찾아 콕콕! (어떤? 어떻게?)';q.reveal=q.tok.filter(t=>t.m).map(t=>t.w).join(', ');q.speak=q.tok.map(t=>t.w).join(' ');q.review=q.speak+' → 꾸며 주는 말: '+q.reveal;q.okIdx=0;}
    return q;},
  qtime(q){return {build:28,kind:18,link:20,deco:30}[q.ty];},askHtml(q){return '🤖 '+q.text;},askSub(q){return q.ty==='build'?'부품을 차례로 눌러 끼워요':q.ty==='deco'?'낱말을 눌러 고르고 ✨ 완성!':'알맞은 것을 눌러요';},
  isOk(q,i){return i===q.okIdx;},tipOf(q){return q.ty==='build'?'바른 문장: '+q.reveal:q.ty==='deco'?'꾸며 주는 말: '+q.reveal:q.reveal;},
  onNew(p,q){const st=p.state;st.got=[];st.used={};st.sel={};st.bx=0;},
  onVerdict(p,q,ok){const st=p.state;if(ok)st.bots++;},
  upd(p,dt){const st=p.state;if(st.res==='ok'&&st.rT>.5)st.bx+=dt*p.u*4;},
  buildTap(p,k){const st=p.state,q=st.q;if(st.lock||st.used[k])return;st.used[k]=1;st.got.push(q.cards[k].k);p.Snd.tone&&p.Snd.tone(420+st.got.length*120,.08,'sine',.05);
    if(st.got.length===q.cards.length){const ok=st.got.every((x,j)=>x===j);this.verdict(p,ok?0:1,false);}},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);const sr=this.sayRect(p);if(K.inRect(x,y,sr)){QK.say(q.speak);return;}
    if(q.ty==='build'){if(K.inRect(x,y,G.reset)){st.got=[];st.used={};p.Snd.tap&&p.Snd.tap();return;}const i=G.rects.findIndex(r=>K.inRect(x,y,r));if(i>=0)this.buildTap(p,i);return;}
    if(q.ty==='deco'){const t=G.toks.find(r=>K.inRect(x,y,r));if(t){st.sel[t.k]=!st.sel[t.k];p.Snd.tap&&p.Snd.tap();return;}if(K.inRect(x,y,G.done)){const ok=q.tok.every((t,k)=>t.m===!!st.sel[k]);this.verdict(p,ok?0:1,false);}return;}
    const i=G.rects.findIndex(r=>K.inRect(x,y,r));if(i>=0){p.Snd.tap&&p.Snd.tap();this.verdict(p,i,false);}},
  sayRect(p){const G=this.geo(p);const s=Math.min(G.u*1,G.sc.h*.11);return{x:G.sc.x+G.sc.w-s*3.3,y:G.sc.y+G.sc.h-s*1.3,w:s*3.1,h:s};},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();let r;
    if(q.ty==='build'){const nxt=st.got.length;const k=q.cards.findIndex((c,j)=>c.k===nxt&&!st.used[j]);r=G.rects[k];}
    else if(q.ty==='deco'){const k=q.tok.findIndex((t,j)=>t.m!==!!st.sel[j]);r=k>=0?G.toks.find(t=>t.k===k):G.done;}
    else r=G.rects[q.okIdx];return r?{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2}:null;},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;lab(g,W,H,u,t,H+9);
    if(!st.lock&&st.qmax>0){const bw=Math.min(W*.5,u*10);QZ.bar(g,W/2-bw/2,(p.top||0)+u*.2,bw,Math.max(5,u*.2),st.qt/st.qmax,{good:'#0ea5e9'});}
    K.card(g,G.pad,(p.top||0)+u*.4,u*5,u*.8,u*.4,'rgba(255,255,255,.92)',{stroke:INK,lw:2,blur:0,dy:0});K.txt(g,'🏭 완성 로봇 '+st.bots+'대',G.pad+u*2.5,(p.top||0)+u*.8,{size:u*.5,color:INK,maxW:u*4.6});
    const sc=G.sc;const su=Math.min(u,sc.h/7);
    const robotCX=sc.x+sc.w/2+(st.res==='ok'?st.bx:0);
    if(q.ty==='build'){const n=q.parts.length;const rw=Math.min(sc.w*.8,su*9),rh=Math.min(sc.h*.74,su*8.5);const fills=st.got.map(k=>q.parts[k]);const o={};if(st.res)o.res=st.res==='ok'?'ok':'bad';o.ans=q.parts;
      g.save();if(st.res==='ok'){g.translate(st.bx,Math.abs(Math.sin(t*8))*-su*.08);}if(st.res==='bad')g.translate(Math.sin(t*50)*su*.06,0);slotRobot(g,sc.x+(sc.w-rw)/2,sc.y+su*1.2+(sc.h-su*2.6-rh)/2,rw,rh,su,n,fills,q.roles,o);g.restore();
      if(st.res==='bad')K.txt(g,'바른 문장: '+q.parts.join(' '),sc.x+sc.w/2,sc.y+sc.h-su*.5,{size:Math.min(su*.6,sc.h*.07),color:'#15803d',maxW:sc.w*.9});}
    else if(q.ty==='kind'){const ty=Math.min(sc.h*.3,su*2.8);K.card(g,sc.x+sc.w*.06,sc.y+su*.6,sc.w*.88,ty,su*.3,'#0f172a',{stroke:'#38bdf8',lw:Math.max(3,su*.08),blur:su*.3,dy:su*.1,sc:'rgba(0,0,0,.3)'});QK.txt(g,'📺 '+q.parts.join(' '),sc.x+sc.w/2,sc.y+su*.6+ty/2,sc.w*.8,ty*.8,Math.min(su*1.2,ty*.4),'#a7f3d0',1.2);
      miniBot(g,robotCX,sc.y+sc.h*.74,Math.min(su*3.6,sc.h*.5),st.mood,t,st.res==='ok'&&st.rT>.5);}
    else if(q.ty==='link'){const cw=sc.w*.36,ch=Math.min(sc.h*.4,su*3);const cy=sc.y+sc.h*.2;[0,1].forEach(i=>{const cx=i?sc.x+sc.w*.64:sc.x+sc.w*.02;K.card(g,cx,cy,cw,ch,su*.25,'#fff',{stroke:INK,lw:Math.max(2.5,su*.07),blur:0,dy:su*.08,sc:INK});QK.txt(g,q.s[i],cx+cw/2,cy+ch/2,cw*.9,ch*.8,Math.min(su*.8,ch*.28),INK,1.25);});
      gear(g,sc.x+sc.w/2,cy+ch/2,Math.min(su*1.25,sc.w*.1),t*(st.res?2.4:.6),st.res==='ok'?'#86efac':'#fbbf24',10);K.txt(g,st.res?q.s[2]:'?',sc.x+sc.w/2,cy+ch/2,{size:Math.min(su*.55,sc.w*.05),color:INK,maxW:su*2});
      miniBot(g,sc.x+sc.w/2,sc.y+sc.h*.82,Math.min(su*2.4,sc.h*.3),st.mood,t,st.res==='ok'&&st.rT>.5);}
    else{miniBot(g,robotCX,sc.y+sc.h*.58,Math.min(su*3.2,sc.h*.6),st.mood,t,st.res==='ok'&&st.rT>.5);if(st.res==='ok')for(let k=0;k<5;k++){const a=k/5*TAU+t*2;K.txt(g,'✨',robotCX+Math.cos(a)*su*1.7,sc.y+sc.h*.5+Math.sin(a)*su*1.3,{size:su*.5});}}
    const sr=this.sayRect(p);K.card(g,sr.x,sr.y,sr.w,sr.h,sr.h/2,'#e0f2fe',{stroke:INK,lw:2,blur:0,dy:3,sc:INK});K.txt(g,'🔈 읽어 줘',sr.x+sr.w/2,sr.y+sr.h/2,{size:sr.h*.5,color:INK,maxW:sr.w*.88});
    /* 선택 칸 */
    if(q.ty==='build'){G.rects.forEach((r,i)=>{g.save();g.globalAlpha=st.used[i]?.3:1;K.card(g,r.x,r.y,r.w,r.h,u*.25,'#fff',{stroke:INK,lw:Math.max(2.5,u*.07),blur:0,dy:u*.08,sc:INK});K.emo(g,'🔩',r.x+u*.6,r.y+r.h/2,Math.min(u*.8,r.h*.5));QK.txt(g,q.cards[i].w,r.x+r.w/2+u*.3,r.y+r.h/2,r.w-u*1.5,r.h*.8,Math.min(u*1,r.h*.42),INK);g.restore();});
      const r=G.reset;K.card(g,r.x,r.y,r.w,r.h,r.h/2,'#fff',{stroke:INK,lw:2,blur:0,dy:3,sc:INK});K.txt(g,'↩ 부품 다시 빼기',r.x+r.w/2,r.y+r.h/2,{size:r.h*.5,color:INK,maxW:r.w*.9});}
    else if(q.ty==='deco'){const fs=G.toks.fs||u;G.toks.forEach(r=>{const tk=q.tok[r.k];const on=!!st.sel[r.k];const should=st.lock&&tk.m;const bad=st.lock&&on&&!tk.m;K.card(g,r.x,r.y,r.w,r.h,r.h*.3,bad?'#fecaca':should?'#bbf7d0':on?'#fde68a':'#fff',{stroke:should?'#16a34a':bad?'#dc2626':on?'#d97706':INK,lw:Math.max(2.5,u*.07),blur:0,dy:u*.06,sc:INK});K.txt(g,tk.w,r.x+r.w/2,r.y+r.h/2,{size:fs,color:INK,maxW:r.w-fs*.4});});
      const r=G.done;K.card(g,r.x,r.y,r.w,r.h,r.h/2,st.lock?'#cbd5e1':'#22c55e',{stroke:INK,lw:2.5,blur:0,dy:4,sc:INK});K.txt(g,'✨ 장식 완성!',r.x+r.w/2,r.y+r.h/2,{size:r.h*.5,color:st.lock?'#64748b':'#052e16',maxW:r.w*.9});}
    else G.rects.forEach((r,i)=>{const isAns=i===q.okIdx,picked=st.pick===i;let s2='idle';if(st.lock){if(isAns)s2='ok';else if(picked)s2='bad';else s2='dim';}QK.card(g,u,r,q.ty==='link'?'⚙️ '+q.opts[i].t:q.opts[i].t,s2,{fill:PLATE[i%3],bd:INK,ink:INK,blur:0});});
  },
};
QZ.mix(GAME,{say:true,pts0:70,pts1:70});
Engine.boot(GAME);
