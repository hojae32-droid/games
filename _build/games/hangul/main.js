/* 1~2학년 국어 · 자음과 모음 · 받침 · 낱말 쓰기 — 한글 블록 공장
   디자인: 원색 블록 장난감 공장. 그림 주문서를 보고 자음·모음 블록을 쌓아 글자를 만들어요. 로봇 '블록이'가 도와줘요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#1e3a8a';
const strip=s=>String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="6" y="18" width="36" height="24" rx="4" fill="#ef4444" stroke="#1e3a8a" stroke-width="3.5"/><rect x="11" y="10" width="10" height="9" rx="2" fill="#ef4444" stroke="#1e3a8a" stroke-width="3"/><rect x="27" y="10" width="10" height="9" rx="2" fill="#ef4444" stroke="#1e3a8a" stroke-width="3"/><text x="24" y="37" text-anchor="middle" font-size="19" font-weight="900" fill="#fff" font-family="sans-serif">ㄱ</text></svg>';
/*@@DATA@@*/
const CC='#ef4444',VC='#3b82f6',FC='#f59e0b';   /* 자음 · 모음 · 받침 블록 색 */
const kindCol=k=>k==='V'?VC:(k==='F'?FC:CC);
const kindLab=k=>k==='V'?'모':(k==='F'?'받':'자');
/* 블록 한 개 (윗면에 볼록이 두 개) */
function brick(g,x,y,w,h,col,label,o){o=o||{};g.save();g.translate(x+w/2,y+h/2);if(o.rot)g.rotate(o.rot);if(o.sc)g.scale(o.sc,o.sc);g.translate(-w/2,-h/2);g.globalAlpha*=o.al==null?1:o.al;
  const sh=Math.max(3,h*.09),lw=Math.max(2,Math.min(w,h)*.06);
  if(o.glow)K.glow(g,w/2,h/2,Math.max(w,h)*.9,col,.55);
  const sd=h*.12;
  for(const dx of[.27,.73]){g.fillStyle=K.shade(col,-.12);g.strokeStyle=INK;g.lineWidth=lw;K.rr(g,w*dx-w*.11,-sd*.8,w*.22,sd*1.4,sd*.5);g.fill();g.stroke();}
  K.rr(g,0,0,w,h,Math.min(w,h)*.2);g.fillStyle=K.shade(col,-.28);g.fill();
  K.rr(g,0,0,w,h-sh,Math.min(w,h)*.2);g.fillStyle=col;g.fill();g.strokeStyle=INK;g.lineWidth=lw;g.stroke();
  g.fillStyle='rgba(255,255,255,.28)';K.rr(g,w*.1,h*.08,w*.8,h*.14,h*.07);g.fill();
  if(label)K.txt(g,label,w/2,(h-sh)/2+h*.03,{size:Math.min(h*.62,w*.72),color:'#fff',stroke:INK,lw:Math.max(3,h*.09),maxW:w*.8});
  g.restore();}
function robot(g,x,y,s,mood,t){g.save();g.translate(x,y+Math.sin(t*3)*s*.02);g.lineJoin='round';g.lineWidth=Math.max(2,s*.05);g.strokeStyle=INK;K.shadow(g,0,s*.52,s*.4,s*.07,.3);
  /* 몸 */
  K.rr(g,-s*.3,s*.04,s*.6,s*.46,s*.1);g.fillStyle='#fde047';g.fill();g.stroke();
  g.fillStyle=CC;K.rr(g,-s*.14,s*.13,s*.28,s*.2,s*.04);g.fill();g.stroke();g.fillStyle='#fff';g.font=K.font(s*.17);g.textAlign='center';g.textBaseline='middle';g.fillText('ㅎ',0,s*.24);
  /* 팔 */
  const wv=mood==='happy'?Math.sin(t*9)*.5:0;
  for(const d of[-1,1]){g.save();g.translate(d*s*.3,s*.14);g.rotate(d*(.5+(d>0?wv:0)));g.fillStyle='#93c5fd';K.rr(g,-s*.05,0,s*.1,s*.26,s*.05);g.fill();g.stroke();g.restore();}
  /* 머리 */
  K.rr(g,-s*.38,-s*.5,s*.76,s*.52,s*.14);g.fillStyle='#bfdbfe';g.fill();g.stroke();
  g.beginPath();g.moveTo(0,-s*.5);g.lineTo(0,-s*.64);g.stroke();g.fillStyle=CC;g.beginPath();g.arc(0,-s*.67,s*.06,0,TAU);g.fill();g.stroke();
  g.fillStyle='#fff';for(const d of[-1,1]){K.rr(g,d*s*.17-s*.11,-s*.38,s*.22,s*.2,s*.06);g.fill();g.stroke();}
  g.fillStyle=INK;g.strokeStyle=INK;g.lineCap='round';g.lineWidth=Math.max(2,s*.045);
  for(const d of[-1,1]){const ex=d*s*.17,ey=-s*.28;if(mood==='oops'){g.beginPath();g.moveTo(ex-s*.05,ey-s*.05);g.lineTo(ex+s*.05,ey+s*.05);g.moveTo(ex+s*.05,ey-s*.05);g.lineTo(ex-s*.05,ey+s*.05);g.stroke();}
    else if(mood==='happy'){g.beginPath();g.arc(ex,ey+s*.03,s*.06,Math.PI*1.1,Math.PI*1.9);g.stroke();}else{g.beginPath();g.arc(ex,ey,s*.05,0,TAU);g.fill();}}
  g.beginPath();if(mood==='happy'){g.arc(0,-s*.12,s*.09,.1,Math.PI-.1);}else if(mood==='oops'){g.arc(0,-s*.06,s*.07,Math.PI*1.1,Math.PI*1.9);}else{g.moveTo(-s*.07,-s*.1);g.lineTo(s*.07,-s*.1);}g.stroke();
  g.fillStyle='#fda4af';for(const d of[-1,1]){g.beginPath();g.arc(d*s*.3,-s*.14,s*.05,0,TAU);g.fill();}
  g.restore();}
function factory(g,W,H,u,t,belt){K.vgrad(g,0,0,W,H,['#bfe3ff','#e8f6ff','#fff7d1']);
  /* 벽 줄무늬 · 창문 */
  g.fillStyle='rgba(255,255,255,.55)';for(let k=0;k<5;k++){const x=((k*W/4.2)+W*.05)%W;K.rr(g,x,H*.05,Math.min(W*.16,u*3.4),H*.2,u*.15);g.fill();}
  g.save();g.strokeStyle='rgba(30,58,138,.08)';g.lineWidth=2;for(let y=H*.3;y<H;y+=u*1.2){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}g.restore();
  if(belt){const by=belt;g.fillStyle='#475569';g.fillRect(0,by,W,u*.5);g.fillStyle='#334155';g.fillRect(0,by+u*.5,W,u*.14);
    g.fillStyle='#fbbf24';const off=(t*u*1.6)%(u*1.2);for(let x=-u*1.2+off;x<W;x+=u*1.2){g.beginPath();g.moveTo(x,by);g.lineTo(x+u*.5,by);g.lineTo(x+u*.3,by+u*.5);g.lineTo(x-u*.2,by+u*.5);g.closePath();g.fill();}}}
/* 첫 화면 그림: 블록이 떨어져 글자가 되고 상자에 담겨 나가요 */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const SETS=[['ㄱ','ㅗ','ㅁ','곰','🐻'],['ㄷ','ㅏ','ㄹ','달','🌙'],['ㅂ','ㅕ','ㄹ','별','⭐']];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/6.4:Math.min(W,H)/6.2;const by=H*.86;factory(g,W,H,u,T,by);
    const per=6,n=Math.floor(T/per),ph=(T%per),S=SETS[n%3];const cx=W*(wide?.58:.55),bs=Math.min(u*1.25,W*.16),gy=by-bs*.1;
    /* 세 블록이 차례로 떨어져요 */
    for(let k=0;k<3;k++){const st=.3+k*.6;const f=clamp((ph-st)/.5,0,1);const merged=ph>2.4;if(merged||f<=0)continue;const e=1-Math.pow(1-f,3);const x=cx+(k-1)*bs*1.15-bs/2;const y=H*.3+(gy-bs*3.1-H*.3)*e;
      brick(g,x,y,bs,bs,k===1?VC:(k===0?CC:FC),S[k],{al:1});}
    if(ph>=2.4&&ph<3.0){const f=(ph-2.4)/.6;K.glow(g,cx,gy-bs*1.8,bs*2.2,'#fde047',.6*(1-f));}
    if(ph>=2.4&&ph<4.8){const f=clamp((ph-2.4)/.4,0,1);const sc=1+Math.sin(f*Math.PI)*.25;const sl=ph>3.4?(ph-3.4)*u*3:0;
      brick(g,cx-bs*.9+sl,gy-bs*1.8,bs*1.8,bs*1.8,'#22c55e',S[3],{sc});if(ph>3.4)K.emo(g,S[4],cx+sl+bs*.9+bs*.7,gy-bs*.9,bs*1.1);}
    /* 블록이 */
    robot(g,W*(wide?.14:.17),by-u*.1,u*1.9,ph>2.4&&ph<4.5?'happy':'neutral',T);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'k01-hangul-factory',title:'한글 블록 공장',title1:'장난감 블록 공장',title2:'한글 블록 공장',emoji:LOGO,
  subtitle:'1~2학년 · 자음과 모음 · 받침 · 낱말 쓰기',
  howto:'그림을 보고 그 이름을 <b>자음 · 모음 블록</b>으로 조립해요! 블록을 차례로 누르면 글자가 한 칸씩 만들어져요. 다 만들면 <b>📦 포장!</b> 버튼을 눌러 장난감 상자를 보내요. 🔈를 누르면 이름을 들려줘요.',
  how:p=>({a:'그림 이름을 <b>블록</b>으로 만들어요 (받침 없는 글자)',b:'<b>받침</b>까지 블록으로 쌓아요',c:'<b>어려운 모음</b> 블록을 찾아요 (ㅐ ㅔ ㅘ ㅚ ㅟ ㅢ)',d:'<b>겹받침</b>과 어려운 받침을 만들어요'}[p.levelId]),
  theme:{c1:'#ef4444',c2:'#2563eb'},hero:heroScene,vignette:.04,durs:[120,180,300],levelTitle:'어떤 글자를 만들까요?',
  txt:{who:'누가 일꾼이 될까요?',dur:'일하는 시간',pace:'한 문제 시간',seat:'번 일꾼 ',go:'공장 문 열기!',s1:'1. 글자',s2:'2. 방법',s3:'3. 이름'},
  levels:[
    {id:'a',g:'1~2학년',t:'받침 없는 글자',d:'나비 · 오이 · 사자처럼'},
    {id:'b',g:'1~2학년',t:'받침 있는 글자',d:'곰 · 달 · 수박처럼'},
    {id:'c',g:'1~2학년',t:'어려운 모음',d:'ㅐ ㅔ ㅘ ㅚ ㅟ ㅢ ㅖ'},
    {id:'d',g:'1~2학년',t:'어려운 받침 · 겹받침',d:'옷 · 낚시 · 닭 · 앉다처럼'},
  ],
  summary:`<ul><li>한글 글자는 <b>자음</b>(ㄱ ㄴ ㄷ…)과 <b>모음</b>(ㅏ ㅓ ㅗ…)이 만나서 만들어져요. 자음이 앞, 모음이 뒤예요 (ㄱ + ㅗ = 고).</li>
    <li>글자 아래에 붙는 자음을 <b>받침</b>이라고 해요 (고 + ㅁ = 곰). 받침이 없는 글자도 많아요.</li>
    <li>받침이 두 개인 <b>겹받침</b>도 있어요 (닭 = ㄷ + ㅏ + ㄹ + ㄱ, 앉 = ㅇ + ㅏ + ㄴ + ㅈ).</li>
    <li>소리가 비슷한 글자는 눈으로 한 번 더 확인해요 (ㅐ와 ㅔ, ㅗ와 ㅜ, ㄱ과 ㅋ).</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=(p.top||0)+u*.85;const land=W>=H*1.2;const pad=Math.max(8,u*.3),gap=Math.max(5,u*.2);
    const barH=Math.min(u*.22,8);const btnH=clamp((H-Z0)*.13,u*1.25,u*1.9);const btnY=H-btnH-pad;
    let pic,blk,pal;
    if(land){const lw=Math.min(W*.3,u*7.4);pic={x:pad,y:Z0,w:lw,h:btnY-gap-Z0};const rx=pad*2+lw,rw=W-rx-pad;
      const palH=clamp((btnY-gap-Z0)*.46,u*3,u*6);pal={x:rx,y:btnY-gap-palH,w:rw,h:palH};blk={x:rx,y:Z0,w:rw,h:pal.y-gap-Z0};}
    else{const ph=clamp((H-Z0)*.2,u*2.6,u*4.2);pic={x:pad,y:Z0,w:W-pad*2,h:ph};const palH=clamp((btnY-gap-Z0)*.4,u*3.4,u*7);pal={x:pad,y:btnY-gap-palH,w:W-pad*2,h:palH};
      blk={x:pad,y:Z0+ph+gap,w:W-pad*2,h:pal.y-gap-(Z0+ph+gap)};}
    const full=W-pad*2,x0=land?pal.x:pad,wb=land?pal.w:full;const bw=[.3,.3,.4].map(f=>(wb-gap*2)*f);
    const btn=[{x:x0,y:btnY,w:bw[0],h:btnH},{x:x0+bw[0]+gap,y:btnY,w:bw[1],h:btnH},{x:x0+bw[0]+bw[1]+gap*2,y:btnY,w:bw[2],h:btnH}];
    return{W,H,u,Z0,land,pad,gap,pic,blk,pal,btn,barH,btnY};},
  tileRects(p){const G=this.geo(p),q=p.state.q;if(!q)return[];const n=q.tiles.length,r=G.pal,gp=G.gap;let best=null;
    for(let cols=3;cols<=n;cols++){const rows=Math.ceil(n/cols);const s=Math.min((r.w-(cols-1)*gp)/cols,(r.h-(rows-1)*gp)/rows);if(!best||s>best.s+.5)best={cols,rows,s};}
    const s=Math.min(best.s,G.u*2.2),w=s,h=s*.92;const out=[];
    for(let i=0;i<n;i++){const row=Math.floor(i/best.cols),inRow=row<best.rows-1?best.cols:n-best.cols*(best.rows-1);const c=i%best.cols;
      const rw=inRow*w+(inRow-1)*gp;out.push({x:r.x+(r.w-rw)/2+c*(w+gp),y:r.y+(r.h-(best.rows*h+(best.rows-1)*gp))/2+row*(h+gp),w,h});}
    return out;},
  init(p){const st=p.state;Object.assign(st,{q:null,n:0,made:0,T:0,lock:false,res:null,qt:0,qmax:0,mood:'neutral',mT:0,shk:{},press:null,boxT:0,sl:[],said:0});this.newQ(p);},
  make(p,L){const R=p.R;const w=p.deck(WORDS[L],'dk_'+L);const q={w:w[0],ic:w[1],clue:w[2]||''};
    q.syl=[...q.w].map(decomp);q.text=q.clue?strip(q.clue):'그림의 이름을 블록으로 만들어요!';
    const need=new Set();q.syl.forEach(s=>{need.add(s.c);need.add(s.v);s.f.forEach(x=>need.add(x));});
    const extra=new Set();need.forEach(j=>(SIM[j]||[]).forEach(x=>{if(!need.has(x))extra.add(x);}));
    let ex=R.shuffle([...extra]).slice(0,Math.max(3,11-need.size));const fill=R.shuffle('ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅎㅏㅓㅗㅜㅡㅣ'.split('')).filter(x=>!need.has(x)&&!ex.includes(x));while(need.size+ex.length<11&&fill.length)ex.push(fill.pop());
    q.tiles=[...need,...ex];q.tiles.sort((a,b)=>ORD.indexOf(a)-ORD.indexOf(b));
    q.review=`${q.ic} ${q.clue?strip(q.clue)+' ':''}→ ${q.w}`;return q;},
  newQ(p){const st=p.state;const q=this.make(p,p.levelId);st.q=q;st.n++;st.lock=false;st.res=null;st.boxT=0;st.press=null;st.shk={};st.made_s='';
    st.sl=[];q.syl.forEach((s,k)=>{st.sl.push({s:k,k:'C',ans:s.c,v:null},{s:k,k:'V',ans:s.v,v:null});s.f.forEach(f=>st.sl.push({s:k,k:'F',ans:f,v:null}));});
    st.qmax=(24+q.syl.length*9)/p.pace;st.qt=st.qmax;
    p.ask('🏭 '+q.text,'블록을 차례로 눌러 글자를 만들고 📦 포장!');
    if(p.n===1&&st.n>1&&st.n%1===0)setTimeout(()=>{if(p.active&&st.q===q)QK.say(q.w);},350);},
  syl(p,k){const st=p.state;return compose(st.sl.filter(x=>x.s===k));},
  madeWord(p){const st=p.state;return st.q.syl.map((s,k)=>this.syl(p,k)).join('');},
  verdict(p,timeout){const st=p.state,q=st.q;if(st.lock)return;st.lock=true;const made=this.madeWord(p);const ok=!timeout&&made===q.w;st.res=ok?'ok':'bad';st.made_s=made;
    st.mood=ok?'happy':'oops';st.mT=1.8;st.boxT=0;const G=this.geo(p);if(ok){st.made++;if(p.n===1)QK.say(q.w);}
    p.hit(ok,{x:G.blk.x+G.blk.w/2,y:G.blk.y+G.blk.h*.4,tip:ok?undefined:`${timeout?'시간이 다 됐어요! ':'내가 만든 글자: '+made+' → '}정답: ${q.w}`,review:q.review,tipMs:ok?1000:3200});
    setTimeout(()=>{if(p.active)this.newQ(p);},ok?1500:2800);},
  update(p,dt){const st=p.state;st.T+=dt;if(st.mT>0){st.mT-=dt;if(st.mT<=0)st.mood='neutral';}if(st.res)st.boxT+=dt;
    for(const k in st.shk){st.shk[k]-=dt;if(st.shk[k]<=0)delete st.shk[k];}if(st.press){st.press.t-=dt;if(st.press.t<=0)st.press=null;}
    if(st.q&&!st.lock&&st.qmax>0){st.qt-=dt;if(st.qt<=0)this.verdict(p,true);}},
  down(p,x,y){const st=p.state,q=st.q,G=this.geo(p);if(!q||st.lock)return;
    if(K.inRect(x,y,{x:G.pic.x,y:G.pic.y,w:G.pic.w,h:G.pic.h})&&this.sayRect(p)&&K.inRect(x,y,this.sayRect(p))){QK.say(q.w);p.Snd.tap&&p.Snd.tap();return;}
    const ti=this.tileRects(p).findIndex(r=>K.inRect(x,y,r));
    if(ti>=0){const t=q.tiles[ti];const isV=VOW.includes(t);const cur=st.sl.find(s=>s.v==null);if(!cur){p.Snd.bad&&p.Snd.bad();st.shk.pack=.4;return;}
      if((cur.k==='V')!==isV){st.shk[ti]=.35;st.mood='oops';st.mT=.8;p.Snd.tone&&p.Snd.tone(220,.1,'sine',.05);p.tip(isV?'지금은 <b>자음</b> 블록 차례예요!':'지금은 <b>모음</b> 블록 차례예요!','',1200);return;}
      cur.v=t;st.press={i:ti,t:.18};p.Snd.tone&&p.Snd.tone(isV?660:520,.07,'sine',.05);return;}
    if(K.inRect(x,y,G.btn[0])){const f=st.sl.filter(s=>s.v!=null).pop();if(f){f.v=null;p.Snd.tap&&p.Snd.tap();}return;}
    if(K.inRect(x,y,G.btn[1])){st.sl.forEach(s=>s.v=null);p.Snd.tap&&p.Snd.tap();return;}
    if(K.inRect(x,y,G.btn[2])){if(st.sl.some(s=>s.v==null)){p.Snd.bad&&p.Snd.bad();st.shk.pack=.4;p.tip('블록을 다 채워야 포장할 수 있어요!','',1400);return;}this.verdict(p,false);}},
  sayRect(p){const G=this.geo(p);const s=Math.min(G.u*1.3,G.pic.h*.3);return G.land?{x:G.pic.x+G.pic.w/2-s*1.6,y:G.pic.y+G.pic.h*.52,w:s*3.2,h:s}:{x:G.pic.x+G.pic.h*1.05,y:G.pic.y+G.pic.h*.1,w:Math.min(G.u*3.4,G.pic.w*.3),h:Math.min(G.u*1.2,G.pic.h*.38)};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;
    factory(g,W,H,u,t,0);
    /* 제한 시간 막대 */
    if(!st.lock&&st.qmax>0){const f=clamp(st.qt/st.qmax,0,1),bw=Math.min(W*.5,u*10),bh=Math.max(5,G.barH);const by=(p.top||0)+u*.22;K.rr(g,W/2-bw/2,by,bw,bh,bh/2);g.fillStyle='rgba(30,58,138,.18)';g.fill();K.rr(g,W/2-bw/2,by,Math.max(bh,bw*f),bh,bh/2);g.fillStyle=f>.4?'#22c55e':(f>.2?'#f59e0b':'#ef4444');g.fill();}
    /* 주문서(그림) */
    const pc=G.pic;K.card(g,pc.x,pc.y,pc.w,pc.h,u*.35,'#fff',{stroke:INK,lw:Math.max(3,u*.09),blur:0,dy:u*.1,sc:INK});
    g.save();K.rr(g,pc.x,pc.y,pc.w,G.land?u*.5:u*.22,u*.1);g.fillStyle='#fde047';g.fill();g.restore();if(G.land)K.txt(g,'📋 주문서',pc.x+pc.w/2,pc.y+u*.3,{size:u*.38,color:INK});
    const es=G.land?Math.min(pc.w*.7,pc.h*.42):Math.min(pc.h*.62,u*2.6);const ex=G.land?pc.x+pc.w/2:pc.x+pc.h*.55,ey=G.land?pc.y+u*.55+es*.58:pc.y+u*.3+(pc.h-u*.3)/2;
    const bob=Math.sin(t*2.4)*u*.06;K.shadow(g,ex,ey+es*.55,es*.4,es*.07,.18);K.emo(g,q.ic,ex,ey+bob,es);
    const sr=this.sayRect(p);K.card(g,sr.x,sr.y,sr.w,sr.h,sr.h/2,'#dbeafe',{stroke:INK,lw:Math.max(2,u*.07),blur:0,dy:u*.06,sc:INK});K.txt(g,'🔈 들려줘',sr.x+sr.w/2,sr.y+sr.h/2,{size:Math.min(u*.5,sr.h*.5),color:INK,maxW:sr.w*.85});
    {const rs=G.land?Math.min(pc.w*.55,u*1.7,pc.h*.28):Math.min(u*1.7,pc.h*.5);const rx=G.land?pc.x+pc.w*.5:pc.x+pc.w-rs*.7,ry=G.land?pc.y+pc.h-rs*.55:pc.y+pc.h*.55;robot(g,rx,ry,rs,st.mood,t);
      if(G.land&&st.mood==='neutral'&&!st.lock){}}
    /* 블록 줄 */
    const b=G.blk,n=q.syl.length;const S=st.sl.length;const padIn=u*.12,gx=Math.max(u*.25,b.w*.02);
    const ss=Math.min((b.w-(n-1)*gx-n*padIn*2)/S,b.h*.34,u*1.7);const cur=st.sl.findIndex(s=>s.v==null);
    let totalW=0;const bws=q.syl.map((sy,k)=>{const c=st.sl.filter(x=>x.s===k).length;const w=c*ss+padIn*2;totalW+=w;return w;});totalW+=gx*(n-1);let x=b.x+(b.w-totalW)/2;
    const bh=Math.min(b.h,ss*3.1+u*.2),by0=b.y+(b.h-bh)/2;
    q.syl.forEach((sy,k)=>{const bw=bws[k],slots=st.sl.filter(s=>s.s===k);const isCur=cur>=0&&st.sl[cur].s===k&&!st.lock;const shk=(st.shk.pack&&k===0)?Math.sin(t*50)*u*.06:0;
      const lift=isCur?-u*.1+Math.sin(t*5)*u*.03:0;const made=compose(slots);const right=st.res&&made===q.w[k];const wrong=st.res==='bad'&&made!==q.w[k];
      const bx=x+shk,byy=by0+lift;const fillc=st.res==='ok'?'#bbf7d0':(wrong?'#fecaca':'#fff');
      K.card(g,bx,byy,bw,bh,u*.22,fillc,{stroke:isCur?'#f59e0b':INK,lw:Math.max(3,u*(isCur?.11:.08)),blur:isCur?u*.4:0,dy:u*.09,sc:isCur?'rgba(245,158,11,.7)':INK});
      /* 글자 */
      const chH=bh-ss-padIn*3;const fs=Math.min(chH*.82,bw*.95,u*3);
      if(wrong){K.txt(g,made||'?',bx+bw/2,byy+chH*.28+padIn,{size:fs*.52,color:'#dc2626'});g.save();g.strokeStyle='#dc2626';g.lineWidth=Math.max(2,u*.06);g.beginPath();g.moveTo(bx+bw*.2,byy+chH*.28+padIn);g.lineTo(bx+bw*.8,byy+chH*.28+padIn);g.stroke();g.restore();
        K.txt(g,q.w[k],bx+bw/2,byy+chH*.74+padIn*.5,{size:fs*.62,color:'#16a34a',stroke:'#fff',lw:u*.06});}
      else K.txt(g,made||'',bx+bw/2,byy+chH*.5+padIn,{size:fs,color:right?'#15803d':INK});
      /* 칸 */
      slots.forEach((s,j)=>{const sx=bx+padIn+j*ss,sy2=byy+bh-ss-padIn*1.2;const gi=st.sl.indexOf(s);const nxt=gi===cur&&!st.lock;const col=kindCol(s.k);
        K.rr(g,sx+ss*.06,sy2,ss*.88,ss*.88,ss*.18);if(s.v){g.fillStyle=col;g.fill();g.lineWidth=Math.max(2,ss*.06);g.strokeStyle=INK;g.stroke();K.txt(g,s.v,sx+ss/2,sy2+ss*.46,{size:ss*.62,color:'#fff',stroke:INK,lw:ss*.1});}
        else{g.fillStyle=nxt?K.rgba('#facc15',.55+.3*Math.sin(t*7)):K.rgba(col,.14);g.fill();g.lineWidth=Math.max(2,ss*.06);g.strokeStyle=nxt?'#f59e0b':K.rgba(col,.7);g.setLineDash(nxt?[]:[ss*.14,ss*.1]);g.stroke();g.setLineDash([]);K.txt(g,kindLab(s.k),sx+ss/2,sy2+ss*.46,{size:ss*.42,color:K.rgba(col,.85)});}});
      x+=bw+gx;});
    /* 정답 포장 상자가 컨베이어를 타고 나가요 */
    if(st.res==='ok'){const f=clamp(st.boxT/1.2,0,1);const bs=Math.min(u*2.4,b.h*.5);const bx=b.x+(W-b.x)*f*.9-bs/2,byb=b.y+b.h-bs*.9;g.save();g.globalAlpha=1-Math.max(0,f-.8)*5;K.card(g,bx,byb,bs,bs,u*.2,'#d6a15f',{stroke:INK,lw:Math.max(3,u*.08),blur:0,dy:u*.08,sc:INK});g.fillStyle='#f4d6a3';g.fillRect(bx+bs*.42,byb+u*.04,bs*.16,bs-u*.08);K.emo(g,q.ic,bx+bs/2,byb+bs*.5,bs*.55);g.restore();}
    /* 블록 보관함 */
    const pl=G.pal;K.card(g,pl.x,pl.y,pl.w,pl.h,u*.25,'rgba(255,255,255,.65)',{stroke:INK,lw:Math.max(2,u*.06),blur:0,dy:u*.06,sc:'rgba(30,58,138,.4)'});
    this.tileRects(p).forEach((r,i)=>{const tt=q.tiles[i];const isV=VOW.includes(tt);const sk=st.shk[i]?Math.sin(t*60)*r.w*.07:0;const pr=st.press&&st.press.i===i;
      brick(g,r.x+sk,r.y+(pr?r.h*.06:0),r.w,r.h*.88,isV?VC:CC,tt,{sc:pr?.94:1});});
    /* 단추 */
    const bt=[['⌫ 지우기','#bfdbfe',INK],['↺ 처음부터','#fde68a',INK],['📦 포장!',st.sl.every(s=>s.v!=null)?'#22c55e':'#86efac','#052e16']];
    G.btn.forEach((r,i)=>{const sk=(i===2&&st.shk.pack)?Math.sin(t*50)*u*.06:0;K.card(g,r.x+sk,r.y,r.w,r.h,u*.3,bt[i][1],{stroke:INK,lw:Math.max(3,u*.08),blur:0,dy:u*.1,sc:INK});
      K.txt(g,bt[i][0],r.x+sk+r.w/2,r.y+r.h*.46,{size:Math.min(u*.8,r.h*.42),color:bt[i][2],maxW:r.w*.88});});
  },
};

Engine.boot(GAME);
