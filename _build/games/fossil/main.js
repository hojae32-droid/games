/* 5학년 · 지층과 화석 — 화석 발굴단 (붓으로 흙을 쓱쓱 털어 화석을 찾고 알아맞히기)
   디자인: 양피지 현장 노트와 놋쇠 — 발굴 현장. 붓·탐험가·지층은 직접 그린 그림이고, 화석을 찾으면 번쩍 알려 줘요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const plain=s=>String(s).replace(/<[^>]+>/g,'');
const hash=n=>{n=Math.imul(n^(n>>>16),0x45d9f3b);n=Math.imul(n^(n>>>15),0x45d9f3b);return((n^(n>>>16))>>>0)/4294967296;};
const INK='#3a2a1d';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" fill="#f6e8c8" stroke="#3a2a1d" stroke-width="3"/><path d="M14 26c0-8 6-12 12-12s8 5 8 10-4 9-10 9-10-3-10-7z" fill="#d9bf94" stroke="#3a2a1d" stroke-width="2.5"/><path d="M18 24c1-4 5-6 8-5M20 29c3 2 8 1 10-3" fill="none" stroke="#3a2a1d" stroke-width="2" stroke-linecap="round"/></svg>';
/*@@DATA@@*/
/* 발굴 대원 (사진기 대신 돋보기): (x,y)=발 아래 */
function digger(g,x,y,s,t,mood){g.save();g.translate(x,y);g.lineJoin='round';g.lineCap='round';g.lineWidth=Math.max(2,s*.05);g.strokeStyle=INK;const bob=mood==='cheer'?-Math.abs(Math.sin(t*10))*s*.1:0;g.translate(0,bob);K.shadow(g,0,-bob,s*.3,s*.06,.25);
  g.fillStyle='#6b4a2a';for(const d of[-1,1]){K.rr(g,d*s*.1-s*.07,-s*.3,s*.14,s*.3,s*.05);g.fill();g.stroke();}
  g.fillStyle='#5aa17a';K.rr(g,-s*.2,-s*.64,s*.4,s*.38,s*.1);g.fill();g.stroke();g.fillStyle='#e0b252';g.fillRect(-s*.2,-s*.5,s*.4,s*.05);
  /* 팔 + 돋보기 */
  g.save();g.translate(s*.2,-s*.56);g.rotate(mood==='cheer'?-2.3+Math.sin(t*12)*.3:-.9);g.fillStyle='#5aa17a';K.rr(g,-s*.05,0,s*.1,s*.26,s*.05);g.fill();g.stroke();
  g.strokeStyle='#8a5a1a';g.lineWidth=Math.max(2,s*.05);g.beginPath();g.moveTo(0,s*.26);g.lineTo(0,s*.4);g.stroke();g.fillStyle='rgba(190,235,255,.7)';g.strokeStyle='#b8893f';g.lineWidth=Math.max(2.5,s*.06);g.beginPath();g.arc(0,s*.52,s*.13,0,TAU);g.fill();g.stroke();g.restore();
  g.save();g.translate(-s*.2,-s*.56);g.rotate(.5);g.fillStyle='#5aa17a';K.rr(g,-s*.05,0,s*.1,s*.26,s*.05);g.fill();g.stroke();g.restore();
  g.translate(0,-s*.8);g.fillStyle='#ffd6b0';g.beginPath();g.arc(0,0,s*.2,0,TAU);g.fill();g.stroke();
  g.fillStyle='#e0c07a';g.beginPath();g.ellipse(0,-s*.1,s*.3,s*.08,0,0,TAU);g.fill();g.stroke();g.beginPath();g.moveTo(-s*.19,-s*.1);g.quadraticCurveTo(0,-s*.4,s*.19,-s*.1);g.closePath();g.fill();g.stroke();
  g.fillStyle=INK;g.strokeStyle=INK;g.lineWidth=Math.max(1.5,s*.035);
  if(mood==='cheer'){for(const d of[-1,1]){g.beginPath();g.arc(d*s*.08,s*.02,s*.035,Math.PI*1.1,Math.PI*1.9);g.stroke();}g.fillStyle='#c0392b';g.beginPath();g.arc(0,s*.08,s*.07,0,Math.PI);g.fill();}
  else if(mood==='oops'){for(const d of[-1,1]){g.beginPath();g.moveTo(d*s*.08-s*.03,-s*.01);g.lineTo(d*s*.08+s*.03,s*.05);g.moveTo(d*s*.08+s*.03,-s*.01);g.lineTo(d*s*.08-s*.03,s*.05);g.stroke();}g.beginPath();g.arc(0,s*.13,s*.05,1.15*Math.PI,1.85*Math.PI);g.stroke();}
  else if(mood==='wow'){for(const d of[-1,1]){g.beginPath();g.arc(d*s*.08,s*.02,s*.045,0,TAU);g.stroke();g.beginPath();g.arc(d*s*.08,s*.02,s*.015,0,TAU);g.fill();}g.beginPath();g.ellipse(0,s*.11,s*.035,s*.05,0,0,TAU);g.fill();}
  else{for(const d of[-1,1]){g.beginPath();g.arc(d*s*.08,s*.02,s*.025,0,TAU);g.fill();}g.beginPath();g.arc(0,s*.08,s*.05,.15*Math.PI,.85*Math.PI);g.stroke();}
  g.restore();}
function brushV(g,x,y,s,ang){g.save();g.translate(x,y);g.rotate(ang);g.lineJoin='round';g.lineWidth=Math.max(1.6,s*.05);g.strokeStyle=INK;
  g.fillStyle='#b8893f';K.rr(g,-s*.03,-s*.95,s*.06,s*.7,s*.03);g.fill();g.stroke();g.fillStyle='#8a8a8a';K.rr(g,-s*.07,-s*.3,s*.14,s*.14,s*.02);g.fill();g.stroke();
  g.fillStyle='#f0d9a0';g.beginPath();g.moveTo(-s*.08,-s*.16);g.lineTo(s*.08,-s*.16);g.lineTo(s*.14,s*.16);g.quadraticCurveTo(0,s*.22,-s*.14,s*.16);g.closePath();g.fill();g.stroke();g.restore();}
function pennant(g,x,y,s,t){g.save();g.translate(x,y);g.strokeStyle='#8a5a1a';g.lineWidth=Math.max(2,s*.08);g.beginPath();g.moveTo(0,0);g.lineTo(0,-s*1.4);g.stroke();g.fillStyle='#e0452a';g.beginPath();g.moveTo(0,-s*1.4);g.lineTo(s*.8+Math.sin(t*5)*s*.05,-s*1.15);g.lineTo(0,-s*.9);g.fill();g.restore();}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const u=Math.min(W,H)/8;K.vgrad(g,0,0,W,H,['#6b4a2a','#4a3524','#2e2016']);
    /* 지층 */
    const cols=['#d6a77a','#a3a3a3','#e7c88a','#9c7350','#c4b5a0'];const n=5,top=H*.38,bh=(H-top)/n;for(let i=0;i<n;i++){const y=top+i*bh;g.fillStyle=cols[i];g.beginPath();g.moveTo(0,y);for(let x=0;x<=W;x+=W/12)g.lineTo(x,y+Math.sin(x/W*5+i)*u*.12);g.lineTo(W,y+bh+u*.15);g.lineTo(0,y+bh+u*.15);g.fill();g.fillStyle='rgba(0,0,0,.12)';g.fillRect(0,y+bh-3,W,3);}
    K.vgrad(g,0,0,W,top,['#4a2c18','#a9682f','#f0b560']);K.glow(g,W*.2,top,u*3,'#ffe9a8',.7);g.fillStyle='#8bd06a';g.fillRect(0,top-u*.25,W,u*.3);
    /* 화석 묻힌 곳 */
    const fx=[[.22,3,'🦴'],[.55,4,'🐚'],[.8,2,'🌿']];fx.forEach(([x,li,e],i)=>{const y=top+bh*(li+.4);g.save();g.globalAlpha=.9;K.emo(g,e,W*x,y+Math.sin(T*2+i)*u*.05,u*1.05);g.restore();});
    pennant(g,W*.12,top-u*.1,u*.8,T);digger(g,W>H*1.3?W*.86:W*.5,top-u*.1,u*1.8,T,Math.sin(T*.7)>.6?'cheer':'neutral');
    /* 흙 먼지 */
    g.fillStyle='rgba(230,200,150,.6)';for(let i=0;i<14;i++){const x=W*.5+Math.sin(i*2+T*3)*u*1.4,y=top-u*.4-((T*u*.8+i*u*.3)%(u*1.6));g.beginPath();g.arc(x,y,u*.06,0,TAU);g.fill();}};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}

const GAME={
  id:'sci5-fossil',title:'화석 발굴단',title1:'땅속 비밀을 캐요',title2:'화석 발굴단',emoji:LOGO,
  subtitle:'5학년 · 지층과 화석',
  howto:'붓으로 흙을 <b>쓱쓱 문질러</b> 털어 내요! 숨은 화석이나 암석이 드러나면 아래 버튼으로 알아맞혀요. 지층 문제는 알맞은 층을 톡!',
  how:'손가락으로 흙을 <b>쓱쓱 문질러</b> 털고<br>아래 버튼으로 답해요',
  txt:{who:'누구와 발굴할까요?',dur:'발굴 시간',pace:'한 문제 시간',seat:'번 대원 ',go:'발굴 시작!',s1:'1. 현장',s2:'2. 방법',s3:'3. 이름'},
  theme:{c1:'#d9531e',c2:'#0d9488'},hero:heroScene,vignette:.1,durs:[60,90,120],
  levelTitle:'어느 현장을 팔까요?',
  levels:[
    {id:'fossil',g:'5학년 · 지층과 화석',t:'🦴 화석 발굴',d:'이름과 옛날 환경 알아맞히기'},
    {id:'rock',g:'5학년 · 지층과 화석',t:'🪨 퇴적암 발굴',d:'이암·사암·역암'},
    {id:'layer',g:'5학년 · 지층과 화석',t:'🟫 지층 읽기',d:'먼저 쌓인 층은 어디?'},
    {id:'all',g:'5학년 · 지층과 화석',t:'🌟 모두 섞기',d:'번갈아 나와요'},
  ],
/*@@SUMMARY@@*/
  Z0(p){return Math.max(p.top||0,p.u*3.2);},
  init(p){const st=p.state;st.kN=0;st.T=0;st.mood='neutral';st.moodT=0;st.flash=0;st.dust=document.createElement('canvas');this.round(p);},
  round(p){const st=p.state,L=p.levelId,R=p.R,u=p.u;st.k=L==='all'?['fossil','rock','layer'][st.kN++%3]:L;st.asked=false;st.lock=false;st.rev=0;st.found=false;st.pick=null;p.ctrl.innerHTML='';st.qt=0;st.qmax=0;st.digT=0;
    const Z0=this.Z0(p);
    if(st.k==='layer'){const n=R.int(4,5);const cols=['#d6a77a','#a3a3a3','#e7c88a','#9c7350','#c4b5a0','#7c6a58'];st.layers=R.shuffle(cols).slice(0,n);
      const q=R.pick([['가장 <b>먼저</b> 쌓인 층은?','bot'],['가장 <b>오래된</b> 층은?','bot'],['가장 <b>나중에</b> 쌓인 층은?','top'],['가장 <b>최근에</b> 쌓인 층은?','top']]);st.lq=q;st.qmax=12/p.pace;st.qt=st.qmax;
      p.ask('🟫 지층에서 '+q[0],'알맞은 층을 톡! (지층이 뒤집히지 않았어요)');return;}
    if(st.k==='fossil'){st.item=p.deck(FOSSILS,'fo');}else st.item=p.deck(ROCKS,'ro');
    const W=Math.round(p.W),H=Math.round(p.H);const d=st.dust;d.width=W;d.height=H;const g=d.getContext('2d');
    const sg=g.createLinearGradient(0,0,0,H);sg.addColorStop(0,'#d2ac78');sg.addColorStop(1,'#b48a5a');g.fillStyle=sg;g.fillRect(0,0,W,H);const Rf=p.Rf;
    for(let i=0;i<10;i++){const x=Rf.num(0,W),y=Rf.num(0,H),r=Rf.num(.15,.35)*Math.min(W,H);const gg=g.createRadialGradient(x,y,0,x,y,r);gg.addColorStop(0,Rf.chance(.5)?'rgba(230,200,150,.35)':'rgba(140,100,60,.25)');gg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gg;g.fillRect(x-r,y-r,r*2,r*2);}
    for(let i=0;i<W*H/140;i++){g.fillStyle=Rf.pick(['#a98256','#dcbd90','#9a744a','#e3c89e']);const r=Rf.num(.6,1.8);g.beginPath();g.arc(Rf.num(0,W),Rf.num(0,H),r,0,7);g.fill();}
    for(let i=0;i<22;i++){const x=Rf.num(0,W),y=Rf.num(0,H),rx=Rf.num(.08,.22)*u,ry=rx*Rf.num(.6,.9),c=Rf.pick(['#a8a29e','#8b7d6b','#c9b79c','#78716c']);
      g.fillStyle='rgba(60,40,20,.25)';g.beginPath();g.ellipse(x+rx*.15,y+ry*.35,rx,ry,0,0,7);g.fill();const pg=g.createRadialGradient(x-rx*.3,y-ry*.4,rx*.1,x,y,rx);pg.addColorStop(0,K.shade(c,.35));pg.addColorStop(1,c);g.fillStyle=pg;g.beginPath();g.ellipse(x,y,rx,ry,0,0,7);g.fill();}
    for(let i=0;i<5;i++)K.emo(g,Rf.pick(['🌾','🐜','🍂']),Rf.num(0,W),Rf.num(0,H),u*.5,Rf.num(-1,1),.7);
    st.size=Math.min(W,H-Z0)*.3;st.cx=W*R.num(.35,.65);st.cy=Z0+st.size*1.1+(H-Z0-st.size*2.4)*R.num(.15,.7);st.rot=R.num(-.4,.4);st.digT=26/p.pace;st.digMax=st.digT;
    p.ask(st.k==='fossil'?'🖌️ 흙을 털어 <b>화석</b>을 찾아요!':'🖌️ 흙을 털어 <b>퇴적암</b>을 드러내요!','손가락으로 쓱쓱 문질러요');},
/*@@DRAWITEM@@*/
  update(p,dt){const st=p.state;st.T+=dt;if(st.moodT>0){st.moodT-=dt;if(st.moodT<=0)st.mood='neutral';}st.flash=Math.max(0,st.flash-dt*1.5);
    /* 한 문제 시간 */
    if(st.qmax>0&&st.qt>0&&!st.lock){st.qt-=dt;if(st.qt<=0)this.timeout(p);}
    if(st.k==='layer'||st.asked){return;}
    st.digT-=dt;if(st.digT<=0){st.rev=1;this.ask(p);return;}
    st.chk=(st.chk||0)+dt;if(st.chk<.25)return;st.chk=0;
    const g=st.dust.getContext('2d');const s=st.size;const x0=Math.max(0,Math.round(st.cx-s*.7)),y0=Math.max(0,Math.round(st.cy-s*.6));const w=Math.min(st.dust.width-x0,Math.round(s*1.4)),h=Math.min(st.dust.height-y0,Math.round(s*1.2));
    if(w<2||h<2)return;const d=g.getImageData(x0,y0,w,h).data;let clear=0,tot=0;for(let i=3;i<d.length;i+=4*37){tot++;if(d[i]<40)clear++;}st.rev=clear/tot;
    if(st.rev>.5)this.ask(p);},
  timeout(p){const st=p.state;st.lock=true;st.mood='oops';st.moodT=1.6;
    if(st.k==='layer'){const want=st.lq[1]==='bot'?st.layers.length-1:0;st.pick=want;st.pickOk=true;p.hit(false,{pen:20,x:p.W/2,y:p.H*.4,tip:`시간이 다 됐어요! ${want?'가장 아래층':'가장 위층'}이에요 (아래층이 먼저 쌓여요)`,review:`지층: ${plain(st.lq[0])} → ${want?'가장 아래층':'가장 위층'} (아래층이 먼저 쌓여요)`,tipMs:2600});setTimeout(()=>{st.pick=null;if(p.active)this.round(p);},2000);return;}
    const it=st.item;p.hit(false,{pen:20,x:st.cx,y:st.cy-st.size,tip:`시간이 다 됐어요! 정답: <b>${st.ans}</b>`,review:`${st.k==='rock'?'퇴적암 ('+it.d+')':it.n}${st.qtxt.includes('어떤 곳')?' → 옛날 환경: ':' → '}${st.ans}`,tipMs:2600});
    [...p.ctrl.querySelectorAll('.toolbtn')].forEach(b=>{if(b.textContent.trim()===st.ans){b.style.outline='5px solid #22c55e';b.style.background='#dcfce7';}});setTimeout(()=>{if(p.active)this.round(p);},2000);},
  ask(p){const st=p.state,R=p.R,it=st.item;st.asked=true;st.found=true;st.flash=1;st.mood='wow';st.moodT=1.2;p.Snd.bell(880,0,.06);p.burst(st.cx,st.cy,'#ffe27a',22);st.dust.getContext('2d').clearRect(0,0,st.dust.width,st.dust.height);
    const Z0=this.Z0(p);st.cy=(Z0+(p.H-p.u*3.9))/2+p.u*.2;
    let q,ans,opts;
    if(st.k==='rock'){q=`이 퇴적암은 무엇일까요? <span class="s">알갱이를 잘 봐요</span>`;ans=it.n;opts=['이암','사암','역암'];}
    else if(R.chance(.5)){q='이 화석의 이름은?';ans=it.n;opts=R.shuffle([it.n,...R.sample(FOSSILS.filter(f=>f!==it).map(f=>f.n),2)]);}
    else{q=`${it.n}${J(it.n,'이').slice(it.n.length)} 나온 곳은 옛날에 어떤 곳이었을까?`;ans=it.env;const envs=[...new Set(FOSSILS.map(f=>f.env))].filter(e=>e!==it.env);
      const far=envs.filter(e=>(it.env.includes('육지'))!==(e.includes('육지')));opts=R.shuffle([it.env,...R.sample(far.length>=2?far:envs,2)]);}
    st.ans=ans;st.qtxt=q;st.qmax=14/p.pace;st.qt=st.qmax;
    p.ask('🔍 '+q,'');
    p.tools(opts.map(t=>({t})),(k,t)=>{if(st.lock)return;st.lock=true;st.qt=0;const ok=t.t===ans;st.mood=ok?'cheer':'oops';st.moodT=1.4;
      const why=st.k==='rock'?`${it.n}: ${it.d}`:(ans===it.env?it.why:`${it.n}`);
      p.hit(ok,{x:st.cx,y:st.cy-st.size,tip:ok?why:`정답: <b>${ans}</b> — ${why}`,review:`${st.k==='rock'?'퇴적암 ('+it.d+')':it.n}${q.includes('어떤 곳')?' → 옛날 환경: ':' → '}${ans}`});
      setTimeout(()=>{if(p.active)this.round(p);},ok?900:1700);},{toggle:false});},
  pill(g,str,x,y,s,bg,fg,al='center'){g.save();g.font=K.font(s);const w=K.mw(g,str,s)+s*1.1;const x0=al==='right'?x-w:x-w/2;K.card(g,x0,y-s*.78,w,s*1.56,s*.78,bg,{blur:s*.5,dy:s*.12,hi:false,stroke:'#b8893f',lw:2});K.txt(g,str,x0+w/2,y+s*.03,{size:s,color:fg});g.restore();return w;},
  draw(p,g){const W=p.W,H=p.H,u=p.u,st=p.state,t=st.T;const Z0=this.Z0(p);
    if(st.k==='layer'){K.sky(g,W,Z0+u*.6,'#f0cf8a','#f9e7b8');
      const n=st.layers.length;const top=Z0+u*.5,bh=(H*.94-top)/n;st.lr=[];
      K.vgrad(g,0,H*.94,W,H*.06,['#6b5a4a','#3f342a']);
      for(let i=0;i<n;i++){const y=top+i*bh;const c=st.layers[i];const lg=g.createLinearGradient(0,y,0,y+bh);lg.addColorStop(0,K.shade(c,.12));lg.addColorStop(1,K.shade(c,-.14));g.fillStyle=lg;
        g.beginPath();g.moveTo(0,y+Math.sin(i)*u*.2);for(let x=0;x<=W;x+=W/12)g.lineTo(x,y+Math.sin(x/W*5+i)*u*.12);g.lineTo(W,y+bh+u*.2);g.lineTo(0,y+bh+u*.2);g.fill();
        g.strokeStyle='rgba(255,255,255,.25)';g.lineWidth=Math.max(1.5,u*.04);g.beginPath();for(let x=0;x<=W;x+=W/12)g[x?'lineTo':'moveTo'](x,y+Math.sin(x/W*5+i)*u*.12+1);g.stroke();
        st.lr.push({y0:y,y1:y+bh,i});const Rf=makeR(i*31+7);
        for(let k=0;k<26;k++){const x=Rf.num(0,W),yy=Rf.num(y+u*.2,y+bh-u*.1),r=Rf.num(.03,.09)*u;g.fillStyle='rgba(40,25,10,.18)';g.beginPath();g.ellipse(x,yy,r*1.4,r,0,0,7);g.fill();g.fillStyle='rgba(255,255,255,.18)';g.beginPath();g.ellipse(x-r*.3,yy-r*.3,r*.6,r*.4,0,0,7);g.fill();}
        if(st.pick===i){const okc=st.pickOk?'#22c55e':'#ef4444';g.save();g.shadowColor=okc;g.shadowBlur=u*.4;g.strokeStyle=okc;g.lineWidth=Math.max(3,u*.09);K.rr(g,u*.12,y+u*.1,W-u*.24,bh-u*.05,u*.25);g.stroke();g.restore();
          g.fillStyle=K.rgba(okc,.15);K.rr(g,u*.12,y+u*.1,W-u*.24,bh-u*.05,u*.25);g.fill();}}
      const gg=g.createLinearGradient(0,top-u*.3,0,top+u*.1);gg.addColorStop(0,'#8bd06a');gg.addColorStop(1,'#4d9a3a');g.fillStyle=gg;K.rr(g,-u*.2,top-u*.28,W+u*.4,u*.38,u*.15);g.fill();
      pennant(g,W*.14,top-u*.15,u*.7,t);digger(g,W*.42,top-u*.1,u*1.4,t,st.mood);
      this.pill(g,'⬆ 위',W-u*.8,top+bh*.5,u*.3,'rgba(255,246,220,.94)','#3a2a1d');this.pill(g,'⬇ 아래',W-u*.95,top+bh*(n-.5),u*.3,'rgba(255,246,220,.94)','#3a2a1d');
      this.qbar(p,g);return;}
    /* 발굴 현장 */
    K.vgrad(g,0,0,W,H,['#efdcb8','#e2c799']);K.grid(g,W,H,u*1.2,'rgba(120,80,40,.08)');
    this.drawItem(p,g);g.drawImage(st.dust,0,0,W,H);
    if(!st.asked){g.save();g.strokeStyle='rgba(255,250,235,.4)';g.lineWidth=1.5;g.setLineDash([u*.3,u*.15]);g.beginPath();for(let x=W/4;x<W;x+=W/4){g.moveTo(x,0);g.lineTo(x,H);}for(let y=H/3;y<H;y+=H/3){g.moveTo(0,y);g.lineTo(W,y);}g.stroke();g.restore();
      const f=Math.min(1,st.rev/.5);const str=`🔍 드러난 정도 ${Math.round(f*100)}%`;const s=u*.32;g.save();g.font=K.font(s);const w=K.mw(g,str,s)+s*1.4;g.restore();
      const x0=W-u*.25-w,y0=Z0+u*.15,hh=s*2.3;K.card(g,x0,y0,w,hh,s*.6,'rgba(246,232,200,.96)',{blur:s*.6,dy:s*.15,hi:false,stroke:'#b8893f',lw:2});K.txt(g,str,x0+w/2,y0+s*.8,{size:s,color:'#6b3f1d'});
      const bw=w-s*1.2;K.rr(g,x0+s*.6,y0+hh-s*.6,bw,s*.25,s*.12);g.fillStyle='#e0cfa6';g.fill();if(f>0){K.rr(g,x0+s*.6,y0+hh-s*.6,Math.max(s*.25,bw*f),s*.25,s*.12);g.fillStyle='#d9531e';g.fill();}
      /* 발굴 남은 시간 */
      const df=clamp(st.digT/st.digMax,0,1),bw2=Math.min(W*.5,u*8),bh2=Math.max(6,u*.18),bx2=u*.3,by2=Z0+u*.15+bh2;K.rr(g,bx2,by2,bw2,bh2,bh2/2);g.fillStyle='rgba(58,42,29,.25)';g.fill();K.rr(g,bx2,by2,Math.max(bh2,bw2*df),bh2,bh2/2);g.fillStyle=df>.3?'#0d9488':'#d9531e';g.fill();K.txt(g,'⏳ 발굴 시간',bx2,by2-u*.2,{size:u*.26,color:'#3a2a1d',align:'left',stroke:'#fff3d0',lw:u*.08});}
    if(st.asked){this.qbar(p,g);if(st.flash>0){g.fillStyle=`rgba(255,240,170,${st.flash*.45})`;g.fillRect(0,0,W,H);K.txt(g,'발견!',W/2,Z0+u*1.0,{size:u*.9*(1+st.flash*.2),color:'#d9531e',stroke:'#fff7d6',lw:u*.18,alpha:Math.min(1,st.flash*2)});}}
    digger(g,Math.min(W-u*1.5,W*.9),H-u*.35-(p.bot||0),u*2,t,st.mood);
    if(st.brush){K.shadow(g,st.brush.x+u*.2,st.brush.y+u*.15,u*.35,u*.1,.25);brushV(g,st.brush.x+u*.35,st.brush.y-u*.15,u*1.2,.7);}},
  qbar(p,g){const st=p.state,u=p.u;if(st.lock||!(st.qmax>0)||st.qt<=0)return;const f=clamp(st.qt/st.qmax,0,1);const bw=Math.min(p.W*.8,u*12),bh=Math.max(6,u*.2),bx=p.W/2-bw/2,by=this.Z0(p)-u*.3;K.rr(g,bx,by,bw,bh,bh/2);g.fillStyle='rgba(58,42,29,.3)';g.fill();K.rr(g,bx,by,Math.max(bh,bw*f),bh,bh/2);g.fillStyle=f>.4?'#0d9488':(f>.2?'#e0b252':'#d9531e');g.fill();},
  scrub(p,x,y){const st=p.state;if(st.k==='layer'||st.asked)return;const g=st.dust.getContext('2d');g.save();g.globalCompositeOperation='destination-out';
    const r=p.u*.75;const pr=st.last||[x,y];g.lineCap='round';g.lineWidth=r*2;g.beginPath();g.moveTo(pr[0]*st.dust.width/p.W,pr[1]*st.dust.height/p.H);g.lineTo(x*st.dust.width/p.W,y*st.dust.height/p.H);g.stroke();g.restore();
    st.last=[x,y];st.brush={x,y};if(Math.random()<.15)p.Snd.noise(.06,1800,.04);
    if(Math.random()<.3)p.fx.push({k:'b',x,y,vx:(Math.random()-.5)*p.u*3,vy:-p.u*2,color:'#c2a074',r:p.u*.07,t:0,life:.5});},
  down(p,x,y){const st=p.state;if(st.k==='layer'){if(st.lock||!st.lr)return;const L=st.lr.find(l=>y>=l.y0&&y<l.y1);if(!L)return;st.lock=true;st.qt=0;
      const want=st.lq[1]==='bot'?st.layers.length-1:0;const ok=L.i===want;st.pick=L.i;st.pickOk=ok;st.mood=ok?'cheer':'oops';st.moodT=1.4;
      p.hit(ok,{x:p.W/2,y:(L.y0+L.y1)/2,tip:ok?(want?'아래층일수록 먼저 쌓여서 오래되었어요':'맨 위층이 가장 나중에 쌓였어요'):`${want?'가장 아래층':'가장 위층'}이에요! 지층은 아래부터 차례로 쌓여요`,review:`지층: ${strip(st.lq[0])} → ${want?'가장 아래층':'가장 위층'} (아래층이 먼저 쌓여요)`});
      setTimeout(()=>{st.pick=null;if(p.active)this.round(p);},ok?800:1500);return;}
    st.last=[x,y];this.scrub(p,x,y);},
  move(p,x,y,down){if(down)this.scrub(p,x,y);},
  up(p){p.state.last=null;p.state.brush=null;},
};

Engine.boot(GAME);
