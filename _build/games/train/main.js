/* 1~2학년 국어 · 문장 부호 · 쉼표 · 띄어쓰기 — 문장 기차
   디자인: 알록달록 장난감 기차. 낱말 칸을 이은 기차에 문장 부호를 달고, 연결 고리를 눌러 쉼표와 띄어쓰기를 넣어요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#7f1d1d';
const strip=s=>String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="4" y="18" width="24" height="16" rx="3" fill="#ef4444" stroke="#7f1d1d" stroke-width="3"/><rect x="28" y="12" width="14" height="22" rx="3" fill="#fbbf24" stroke="#7f1d1d" stroke-width="3"/><rect x="31" y="15" width="8" height="7" rx="1.5" fill="#bae6fd" stroke="#7f1d1d" stroke-width="2"/><circle cx="12" cy="37" r="5" fill="#334155" stroke="#7f1d1d" stroke-width="2.5"/><circle cx="35" cy="37" r="5" fill="#334155" stroke="#7f1d1d" stroke-width="2.5"/><path d="M10 11c0-4 6-3 6-7" stroke="#94a3b8" stroke-width="3" fill="none" stroke-linecap="round"/></svg>';
/*@@DATA@@*/
const CARC=['#fca5a5','#fcd34d','#86efac','#93c5fd','#d8b4fe','#fdba74'];
const MC=(()=>{const c=document.createElement('canvas');return c.getContext('2d');})();
const mw=(t,fs)=>{MC.font=K.font(fs);return MC.measureText(t).width;};
function scenery(g,W,H,u,t,railY){K.vgrad(g,0,0,W,H,['#a5e1ff','#e3f6ff','#fff8dc']);K.glow(g,W*.86,H*.1,u*3,'#fde047',.6);g.fillStyle='#fde047';g.beginPath();g.arc(W*.86,H*.1,u*.7,0,TAU);g.fill();K.clouds(g,W,H,t*.7,.1,3,u*1.6);K.hills(g,W,H,railY-u*1.2,'#b9efc7','#86e0a3',t);
  K.ground(g,railY+u*.5,W,H,'#86d98f');
  /* 철길 */
  g.fillStyle='#78350f';const sp=u*.8,off=(t*u*.0)%sp;for(let x=-sp;x<W+sp;x+=sp)g.fillRect(x+off,railY+u*.12,u*.32,u*.45);g.fillStyle='#94a3b8';g.fillRect(0,railY+u*.08,W,u*.1);g.fillRect(0,railY+u*.4,W,u*.1);}
function loco(g,x,y,s,t,face){/* x,y: 발(바퀴 아래) 왼쪽 위치, 크기 s */g.save();g.translate(x,y);g.lineJoin='round';g.lineWidth=Math.max(3,s*.05);g.strokeStyle=INK;
  g.fillStyle='#ef4444';K.rr(g,0,-s*.62,s*.64,s*.46,s*.08);g.fill();g.stroke();g.fillStyle='#fbbf24';K.rr(g,s*.6,-s*.86,s*.32,s*.7,s*.07);g.fill();g.stroke();g.fillStyle='#bae6fd';K.rr(g,s*.66,-s*.78,s*.2,s*.2,s*.04);g.fill();g.stroke();
  g.fillStyle='#334155';K.rr(g,s*.08,-s*.78,s*.16,s*.18,s*.03);g.fill();g.stroke();
  for(const cx of[.2,.5,.78]){g.fillStyle='#1e293b';g.beginPath();g.arc(s*cx,-s*.12,s*.12,0,TAU);g.fill();g.stroke();g.fillStyle='#e2e8f0';g.beginPath();g.arc(s*cx,-s*.12,s*.04,0,TAU);g.fill();}
  /* 얼굴 */g.fillStyle=INK;g.beginPath();g.arc(s*.2,-s*.45,s*.04,0,TAU);g.arc(s*.42,-s*.45,s*.04,0,TAU);g.fill();g.strokeStyle=INK;g.beginPath();if(face==='happy')g.arc(s*.31,-s*.4,s*.07,.1,Math.PI-.1);else if(face==='oops')g.arc(s*.31,-s*.3,s*.06,Math.PI*1.1,Math.PI*1.9);else{g.moveTo(s*.26,-s*.35);g.lineTo(s*.36,-s*.35);}g.stroke();
  g.restore();}
function smoke(g,x,y,u,t,go){for(let k=0;k<4;k++){const f=((t*(go?1.6:.6)+k*.25)%1);g.globalAlpha=(1-f)*.7;g.fillStyle='#f1f5f9';g.beginPath();g.arc(x-f*u*(go?2.2:.6)+k*2,y-f*u*1.6,u*(.25+f*.35),0,TAU);g.fill();}g.globalAlpha=1;}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const WS=['저는','사과를','좋아해요','.'];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/7:Math.min(W,H)/7;const ry=H*.88;scenery(g,W,H,u,T,ry);
    const cs=Math.min(u*2.2,W*.2);const x0=((T*u*1.6)%(W+cs*7))-cs*6;smoke(g,x0+cs*.1+cs*5.5,ry-cs*.9,u,T,true);
    WS.forEach((w,i)=>{const cx=x0+i*cs*1.3;K.card(g,cx,ry-cs*.75,cs*1.15,cs*.6,cs*.12,CARC[i%6],{stroke:INK,lw:3,blur:0,dy:4,sc:INK});K.txt(g,w,cx+cs*.57,ry-cs*.45,{size:cs*.34,color:INK,maxW:cs*1.05});g.fillStyle='#1e293b';for(const dx of[.25,.9]){g.beginPath();g.arc(cx+cs*dx,ry-cs*.12,cs*.1,0,TAU);g.fill();}});
    loco(g,x0+4*cs*1.3+cs*.2,ry,cs*1.2,T,'happy');};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'k03-sentence-train',title:'문장 기차',title1:'칙칙폭폭 문장 기차',title2:'문장 기차',emoji:LOGO,
  subtitle:'1~2학년 · 문장 부호 · 띄어쓰기',
  howto:'낱말 칸을 이어 붙인 문장 기차예요! 맨 끝 칸에 알맞은 <b>문장 부호</b>를 달고, 칸과 칸 사이 <b>연결 고리</b>를 눌러 쉼표를 넣거나 <b>띄어쓰기</b>를 해요. 바르게 고치면 기차가 칙칙폭폭 출발해요!',
  how:p=>({a:'문장 끝에 알맞은 <b>마침표·물음표·느낌표</b>를 달아요',b:'<b>쉼표( , )</b>가 들어갈 고리를 눌러요',c:'띄어 써야 할 곳의 고리를 눌러 <b>띄어쓰기</b>를 해요'}[p.levelId]),
  theme:{c1:'#dc2626',c2:'#2563eb'},hero:heroScene,vignette:.04,durs:[90,150,240],levelTitle:'어떤 기차를 탈까요?',
  txt:{who:'누가 기관사가 될까요?',dur:'운전 시간',pace:'한 문제 시간',seat:'번 기관사 ',go:'출발 준비!',s1:'1. 기차',s2:'2. 방법',s3:'3. 이름'},
  levels:[{id:'a',g:'1~2학년',t:'마침표 · 물음표 · 느낌표',d:'문장 끝에 알맞은 부호'},{id:'b',g:'1~2학년',t:'쉼표 넣기',d:'부르는 말 · 대답하는 말 · 늘어놓을 때'},{id:'c',g:'1~2학년',t:'띄어쓰기',d:'낱말과 낱말 사이 띄우기'}],
  summary:`<ul><li><b>마침표( . )</b>는 설명하는 문장 끝, <b>물음표( ? )</b>는 묻는 문장 끝, <b>느낌표( ! )</b>는 느낌을 나타내는 문장 끝에 써요.</li>
    <li><b>쉼표( , )</b>는 부르는 말(민지야,)·대답하는 말(네,)·여러 낱말을 늘어놓을 때(사과, 배, 포도)에 써요.</li>
    <li><b>띄어쓰기</b>는 낱말과 낱말 사이를 띄어 써요. 그런데 “학교에”처럼 낱말에 붙는 말(에, 을, 가…)은 붙여 써요.</li>
    <li>글자만 봐도 알 수 있게 바르게 쓰면 읽는 사람이 이해하기 쉬워요.</li></ul>`,
  /* 기차 칸 배치: 한 줄에 다 안 들어가면 다음 줄로 이어요 */
  train(p){const G0=this.geo0(p),q=p.state.q;if(!q)return{cars:[],jns:[],loco:{x:0,y:0,s:1},fs:20,rows:1};const u=G0.u,sc=G0.sc;let fs=Math.min(u*2,sc.h*.17);const spaceMode=q.ty==='space';
    for(let tr=0;tr<30;tr++){const items=[];let x=sc.x,y=0,row=0;const lc=fs*2.1;const gapJ=Math.max(u*1.05,fs*.9);const ch=fs*1.9;const left=sc.x,right=sc.x+sc.w;
      const cars=[],jns=[];x=left+lc;const n=q.w.length;let ok=true;
      for(let k=0;k<n;k++){const lastc=k===n-1;let w=spaceMode?fs*1.6:Math.max(fs*1.6,mw(q.w[k],fs)+fs*.9);if(lastc&&q.ty!=='space')w+=fs*1.15;const need=w+(lastc?0:gapJ);
        if(x+need>right&&x>left+lc+1){row++;x=left+(row?0:lc);}cars.push({x,row,w,h:ch,k});x+=w;if(!lastc){jns.push({x,row,w:gapJ,h:ch,k});x+=gapJ;}}
      const rows=row+1;const rh=ch+fs*1.1;if(rows*rh<=sc.h*.86||fs<u*.6||tr===29){const y0=sc.y+(sc.h-rows*rh)/2+fs*.4;cars.forEach(c=>{c.y=y0+c.row*rh;});jns.forEach(j=>{j.y=cars[j.k].y;});return{cars,jns,loco:{x:left,y:y0+ch,s:lc*.95},fs,rows,rh,ch};}fs*=.92;}
    return{cars:[],jns:[],loco:{x:0,y:0,s:1},fs,rows:1};},
  geo0(p){const W=p.W,H=p.H,u=p.u;const Z0=(p.top||0)+u*.9;const land=W>=H*1.2;const pad=Math.max(8,u*.3),gap=Math.max(7,u*.22);const A=H-Z0-pad;const sh=A*(land?.58:.52);return{W,H,u,Z0,land,pad,gap,A,sc:{x:pad,y:Z0,w:W-pad*2,h:sh}};},
  geo(p){const G=this.geo0(p),u=G.u,q=p.state.q;const oy=G.sc.y+G.sc.h+G.gap,oh=G.A-G.sc.h-G.gap;let rects=[],reset=null,go=null;
    if(q&&q.ty==='end'){const n=3,cw=(G.W-G.pad*2-G.gap*2)/3,ch=Math.min(oh,u*4.4);for(let i=0;i<n;i++)rects.push({x:G.pad+i*(cw+G.gap),y:oy+(oh-ch)/2,w:cw,h:ch});}
    else{const bh=Math.min(oh,u*2.2);const w1=(G.W-G.pad*2-G.gap)*.34,w2=(G.W-G.pad*2-G.gap)*.66;reset={x:G.pad,y:oy+(oh-bh)/2,w:w1,h:bh};go={x:G.pad+w1+G.gap,y:oy+(oh-bh)/2,w:w2,h:bh};}
    return Object.assign(G,{rects,reset,go});},
  init(p){Object.assign(p.state,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,j:[],end:'',tx:0});this.newQ(p);},
  make(p,L){const R=p.R,q={};
    if(L==='a'){const s=p.deck(ENDS,'dk_a');q.ty='end';q.w=s[0].split(' ');q.ans=s[1];q.text='문장 끝에 어떤 <b>문장 부호</b>를 달까요?';q.speak=s[0];q.reveal=s[0]+s[1];q.opts=[['.','마침표','설명하는 문장'],['?','물음표','묻는 문장'],['!','느낌표','느낌을 나타내는 문장']];q.okIdx=q.opts.findIndex(o=>o[0]===s[1]);}
    else if(L==='b'){const s=p.deck(COMMAS,'dk_b');const tk=s.split(' ');q.ty='comma';q.w=tk.map(t=>t.replace(/,$/,''));q.ans=tk.map((t,k)=>k<tk.length-1&&t.endsWith(','));q.end=q.w[q.w.length-1].slice(-1);q.w[q.w.length-1]=q.w[q.w.length-1].slice(0,-1);q.text='<b>쉼표( , )</b>가 들어갈 고리를 눌러요!';q.speak=s.replace(/,/g,'');q.reveal=s;q.okIdx=0;}
    else{const s=p.deck(SPACES,'dk_c');q.ty='space';const syl=[],ans=[];[...s].forEach(c=>{if(c===' '){ans[ans.length-1]=true;}else if(/[.?!,]/.test(c)){syl[syl.length-1]+=c;}else{syl.push(c);ans.push(false);}});ans[ans.length-1]=false;q.w=syl;q.ans=ans.slice(0,syl.length);q.text='띄어 써야 할 곳의 고리를 눌러 <b>띄어쓰기</b>를 해요!';q.speak=s;q.reveal=s;q.okIdx=0;}
    q.review=(q.ty==='end'?q.w.join(' ')+' ( ) ':'')+'→ '+q.reveal;return q;},
  qtime(q){return {end:14,comma:22,space:30}[q.ty];},askHtml(q){return '🚂 '+q.text;},askSub(q){return q.ty==='end'?'알맞은 부호를 눌러요':'고리를 눌러 고치고 🚦 출발!';},
  isOk(q,i){return i===q.okIdx;},tipOf(q){return q.ty==='end'?'바른 문장: '+q.reveal:'바른 문장: '+q.reveal;},
  onNew(p,q){const st=p.state;st.j=q.w.map(()=>false);st.end=q.ty==='end'?'':(q.end||'');st.tx=0;},
  onVerdict(p,q,ok){},
  upd(p,dt){const st=p.state;if(st.res==='ok'&&st.rT>.5)st.tx+=dt*p.u*(2+st.rT*5);},
  submit(p){const st=p.state,q=st.q;const ok=q.w.every((w,k)=>k===q.w.length-1||st.j[k]===q.ans[k]);const mine=q.w.map((w,k)=>w+(k<q.w.length-1?(q.ty==='comma'?(st.j[k]?', ':' '):(st.j[k]?' ':'')):'')).join('')+(st.end||'');st.mine=mine;this.verdict(p,ok?0:1,false);},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);
    if(q.ty==='end'){const i=G.rects.findIndex(r=>K.inRect(x,y,r));if(i>=0){st.end=q.opts[i][0];p.Snd.tap&&p.Snd.tap();this.verdict(p,i,false);}return;}
    if(K.inRect(x,y,G.reset)){st.j=q.w.map(()=>false);p.Snd.tap&&p.Snd.tap();return;}
    if(K.inRect(x,y,G.go)){this.submit(p);return;}
    const T=this.train(p);const j=T.jns.find(r=>x>=r.x&&x<=r.x+r.w&&y>=r.y-T.fs*.3&&y<=r.y+r.h+T.fs*.3);if(j&&j.k<q.w.length-1){st.j[j.k]=!st.j[j.k];p.Snd.tone&&p.Snd.tone(st.j[j.k]?700:500,.06,'sine',.05);}},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();let r;
    if(q.ty==='end')r=G.rects[q.okIdx];else{const k=q.w.findIndex((w,i)=>i<q.w.length-1&&!!st.j[i]!==!!q.ans[i]);if(k>=0){const T=this.train(p);const j=T.jns.find(x=>x.k===k);r={x:j.x,y:j.y,w:j.w,h:j.h};}else r=G.go;}
    return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;const sc=G.sc;const T=this.train(p);const railY=T.cars.length?T.cars[T.cars.length-1].y+T.ch+T.fs*.5:sc.y+sc.h*.8;
    scenery(g,W,H,u,t*.3,Math.min(railY,sc.y+sc.h-u*.2));
    if(!st.lock&&st.qmax>0){const bw=Math.min(W*.5,u*10);QZ.bar(g,W/2-bw/2,(p.top||0)+u*.2,bw,Math.max(5,u*.2),st.qt/st.qmax,{good:'#2563eb'});}
    K.card(g,G.pad,(p.top||0)+u*.4,u*4.1,u*.8,u*.4,'rgba(255,255,255,.92)',{stroke:INK,lw:2,blur:0,dy:0});K.txt(g,'🚂 출발한 기차 '+(st.okN||0),G.pad+u*2.05,(p.top||0)+u*.8,{size:u*.46,color:INK,maxW:u*3.8});
    /* 기차 */
    g.save();if(st.res==='ok')g.translate(st.tx,0);if(st.res==='bad')g.translate(Math.sin(t*40)*u*.03,0);
    const fs=T.fs;const rowsY=[];
    /* 철길 줄마다 */
    const lo=T.loco;loco(g,lo.x,lo.y,lo.s,t,st.res==='ok'?'happy':st.res==='bad'?'oops':'normal');smoke(g,lo.x+lo.s*.15,lo.y-lo.s*.85,u,t,st.res==='ok');
    T.cars.forEach((c,i)=>{K.card(g,c.x,c.y,c.w,c.h,fs*.4,CARC[i%6],{stroke:INK,lw:Math.max(3,fs*.1),blur:0,dy:fs*.1,sc:INK});
      const lastc=c.k===q.w.length-1;const tw=lastc&&q.ty!=='space'?c.w-fs*1.15:c.w;K.txt(g,q.w[c.k],c.x+tw/2,c.y+c.h*.52,{size:fs,color:INK,maxW:tw-fs*.3});
      /* 바퀴 */g.fillStyle='#1e293b';for(const dx of[.25,.75]){g.beginPath();g.arc(c.x+c.w*dx,c.y+c.h+fs*.12,fs*.26,0,TAU);g.fill();}
      if(lastc&&q.ty!=='space'){const bx=c.x+c.w-fs*.62,by=c.y+c.h*.5;const m=q.ty==='end'?st.end:q.end;g.save();K.rr(g,bx-fs*.45,by-fs*.7,fs*.9,fs*1.4,fs*.3);g.fillStyle=m?'#fff':'rgba(255,255,255,.55)';g.fill();g.lineWidth=Math.max(2.5,fs*.08);g.strokeStyle=q.ty==='end'&&!m?'#ef4444':INK;g.setLineDash(m?[]:[fs*.18,fs*.12]);g.stroke();g.setLineDash([]);g.restore();K.txt(g,m||'?',bx,by+fs*.04,{size:fs*1.15,color:m?(st.res==='bad'&&q.ty==='end'&&m!==q.ans?'#dc2626':'#dc2626'):'#ef4444'});}});
    /* 고리 */
    T.jns.forEach(j=>{const on=!!st.j[j.k];const should=st.lock&&q.ans[j.k];const wrong=st.lock&&on&&!q.ans[j.k];const cx=j.x+j.w/2,cy=j.y+j.h*.55;const hot=q.ty!=='end'&&!st.lock;
      g.fillStyle='#64748b';g.fillRect(j.x,cy-fs*.08,j.w,fs*.16);
      if(q.ty==='end'){return;}
      const r=Math.min(fs*.55,j.w*.42);g.beginPath();g.arc(cx,cy,r,0,TAU);g.fillStyle=on?(wrong?'#fecaca':'#fde047'):'#fff';g.fill();g.lineWidth=Math.max(2.5,fs*.07);g.strokeStyle=should&&!on?'#16a34a':wrong?'#dc2626':INK;g.setLineDash(!on&&hot?[fs*.15,fs*.1]:[]);g.stroke();g.setLineDash([]);
      if(on)K.txt(g,q.ty==='comma'?',':'∨',cx,cy+(q.ty==='comma'?-fs*.05:0),{size:fs*.9,color:INK});else if(should)K.txt(g,'✓',cx,cy,{size:fs*.7,color:'#16a34a'});
      if(!on&&hot){g.globalAlpha=.45+.35*Math.sin(t*4+j.k);K.txt(g,'＋',cx,cy,{size:fs*.6,color:'#94a3b8'});g.globalAlpha=1;}});
    g.restore();
    if(st.res==='bad'&&q.ty==='end')K.txt(g,'바른 문장: '+q.reveal,sc.x+sc.w/2,sc.y+sc.h-u*.4,{size:Math.min(u*.7,sc.h*.07),color:'#15803d',maxW:sc.w});
    /* 아래 단추 */
    if(q.ty==='end'){G.rects.forEach((r,i)=>{const o=q.opts[i];const isAns=i===q.okIdx,picked=st.pick===i;let c='#fff',bd=INK;if(st.lock){if(isAns){c='#dcfce7';bd='#16a34a';}else if(picked){c='#fee2e2';bd='#dc2626';}}
      K.card(g,r.x,r.y,r.w,r.h,u*.35,c,{stroke:bd,lw:Math.max(3,u*.08),blur:0,dy:u*.1,sc:bd});g.save();g.globalAlpha=st.lock&&!isAns&&!picked?.5:1;K.txt(g,o[0],r.x+r.w/2,r.y+r.h*.38,{size:Math.min(r.h*.62,u*3),color:'#dc2626'});K.txt(g,o[1],r.x+r.w/2,r.y+r.h*.74,{size:Math.min(r.h*.2,u*.8),color:INK,maxW:r.w*.9});g.restore();});}
    else{const rs=G.reset,gs=G.go;K.card(g,rs.x,rs.y,rs.w,rs.h,rs.h*.4,'#fff',{stroke:INK,lw:3,blur:0,dy:u*.08,sc:INK});K.txt(g,'↺ 다시',rs.x+rs.w/2,rs.y+rs.h/2,{size:rs.h*.42,color:INK,maxW:rs.w*.9});
      K.card(g,gs.x,gs.y,gs.w,gs.h,gs.h*.4,st.lock?'#cbd5e1':'#22c55e',{stroke:INK,lw:3,blur:0,dy:u*.1,sc:INK});K.txt(g,'🚦 출발!',gs.x+gs.w/2,gs.y+gs.h/2,{size:gs.h*.5,color:st.lock?'#64748b':'#052e16',maxW:gs.w*.9});}
  },
};
QZ.mix(GAME,{say:true,pts0:60,pts1:60,okMs:1700,badMs:2600});
Engine.boot(GAME);
