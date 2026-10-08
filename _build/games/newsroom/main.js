/* 3~4학년 국어 · 사실과 의견 · 중심 문장 · 원인과 결과 — 어린이 뉴스룸 (사실/의견 도장 · 중심 문장 헤드라인 · 원인과 결과 잇기)
   디자인: 신문 인쇄 느낌의 파랑·빨강. 기자 친구가 반응하고, 잘 만든 기사는 신문 판매 부수가 올라가요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#0f1f5c',RED='#dc2626',BLUE='#1e3a8a';
const strip=s=>String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="5" y="8" width="38" height="32" rx="2" fill="#fffffa" stroke="#0f1f5c" stroke-width="3"/><rect x="9" y="12" width="30" height="8" fill="#dc2626"/><path d="M9 25h14M9 30h14M9 35h14" stroke="#0f1f5c" stroke-width="2.5"/><rect x="27" y="25" width="12" height="11" fill="#1e3a8a"/></svg>';
/*@@DATA@@*/
function reporter(g,x,y,s,mood,t){g.save();g.translate(x,y+Math.sin(t*3)*s*.015);g.lineJoin='round';g.lineWidth=Math.max(2,s*.05);g.strokeStyle=INK;K.shadow(g,0,s*.55,s*.45,s*.08,.25);
  g.fillStyle='#1e3a8a';g.beginPath();g.moveTo(-s*.4,s*.55);g.quadraticCurveTo(-s*.4,s*.14,0,s*.12);g.quadraticCurveTo(s*.4,s*.14,s*.4,s*.55);g.closePath();g.fill();g.stroke();
  g.fillStyle='#f5cfa8';g.beginPath();g.arc(0,-s*.12,s*.36,0,TAU);g.fill();g.stroke();
  g.fillStyle='#fbbf24';g.beginPath();g.arc(0,-s*.18,s*.38,Math.PI*1.02,Math.PI*1.98);g.closePath();g.fill();g.stroke();g.fillRect(-s*.38,-s*.2,s*.76,s*.08);g.strokeRect(-s*.38,-s*.2,s*.76,s*.08);K.txt(g,'PRESS',0,-s*.35,{size:s*.14,color:INK});
  g.fillStyle=INK;g.strokeStyle=INK;g.lineWidth=Math.max(1.6,s*.04);g.lineCap='round';
  for(const d of[-1,1]){const ex=d*s*.14,ey=-s*.04;if(mood==='oops'){g.beginPath();g.moveTo(ex-s*.05,ey-s*.05);g.lineTo(ex+s*.05,ey+s*.05);g.moveTo(ex+s*.05,ey-s*.05);g.lineTo(ex-s*.05,ey+s*.05);g.stroke();}else if(mood==='happy'){g.beginPath();g.arc(ex,ey+s*.02,s*.05,Math.PI*1.1,Math.PI*1.9);g.stroke();}else{g.beginPath();g.arc(ex,ey,s*.04,0,TAU);g.fill();}}
  g.beginPath();if(mood==='happy'){g.fillStyle='#be123c';g.arc(0,s*.1,s*.09,0,Math.PI);g.fill();g.stroke();}else if(mood==='oops'){g.arc(0,s*.18,s*.07,1.15*Math.PI,1.85*Math.PI);g.stroke();}else{g.arc(0,s*.06,s*.08,.15*Math.PI,.85*Math.PI);g.stroke();}
  g.fillStyle='#64748b';g.fillRect(s*.36,s*.18,s*.08,s*.3);g.fillStyle='#e11d48';g.beginPath();g.arc(s*.4,s*.14,s*.1,0,TAU);g.fill();g.stroke();
  g.restore();}
function studio(g,W,H,u,t,onair){K.vgrad(g,0,0,W,H,['#16296b','#1e3a8a','#0f1f5c']);
  g.save();g.strokeStyle='rgba(255,255,255,.07)';g.lineWidth=2;const gs=u*1.2;for(let x=0;x<W;x+=gs){g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke();}for(let y=0;y<H;y+=gs){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}g.restore();
  /* 지구본 배경 */
  g.save();g.globalAlpha=.1;g.strokeStyle='#fff';g.lineWidth=3;const gx=W*.82,gy=H*.28,gr=u*2.2;g.beginPath();g.arc(gx,gy,gr,0,TAU);g.stroke();g.beginPath();g.ellipse(gx,gy,gr*.4,gr,0,0,TAU);g.stroke();g.beginPath();g.moveTo(gx-gr,gy);g.lineTo(gx+gr,gy);g.stroke();g.restore();
  g.fillStyle='#0b1646';g.fillRect(0,H-u*.5,W,u*.5);}
function onAir(g,x,y,s,on){g.save();K.card(g,x-s*1.6,y-s*.5,s*3.2,s,s*.2,on?'#dc2626':'#4b1d1d',{stroke:'#fff',lw:2,blur:s*.2,dy:s*.05});if(on)K.glow(g,x,y,s*2.4,'#ef4444',.4);K.txt(g,'● ON AIR',x,y+s*.03,{size:s*.5,color:on?'#fff':'#9a6a6a'});g.restore();}
function stampShape(g,x,y,w,h,col,text,rot,al,u){g.save();g.translate(x,y);g.rotate(rot);g.globalAlpha=al;g.strokeStyle=col;g.lineWidth=Math.max(3,u*.12);K.rr(g,-w/2,-h/2,w,h,u*.15);g.stroke();K.txt(g,text,0,u*.03,{size:h*.6,color:col});g.restore();}
function paperBox(g,x,y,w,h,u,fill){g.save();g.fillStyle=INK;K.rr(g,x+u*.08,y+u*.08,w,h,u*.05);g.fill();g.fillStyle=fill||'#fffffa';K.rr(g,x,y,w,h,u*.05);g.fill();g.strokeStyle=INK;g.lineWidth=Math.max(2,u*.07);g.stroke();g.restore();}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const S=[['우리나라의 수도는 서울이다.','f'],['이 영화는 정말 재미있다.','o'],['고래는 새끼를 낳아 젖을 먹인다.','f']];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/6.5:Math.min(W,H)/7;studio(g,W,H,u,T);onAir(g,W*(wide?.85:.8),H*.12,u*.4,Math.sin(T*3)>0);
    const per=3,n=Math.floor(T/per),ph=(T%per)/per;const s=S[n%3];const cw=Math.min(W*.6,u*9),ch=u*2.4,cx=W/2-(wide?0:0),cy=H*(wide?.42:.5);
    const slide=clamp(ph/.2,0,1);paperBox(g,cx-cw/2+(1-slide)*W*.5,cy-ch/2,cw,ch,u);g.save();g.translate((1-slide)*W*.5,0);QK.txt(g,s[0],cx,cy,cw-u*.6,ch-u*.4,u*.55,INK);
    if(ph>.55){const a=clamp((ph-.55)/.1,0,1);stampShape(g,cx+cw*.28,cy+ch*.18,u*2.2,u*1.0,s[1]==='f'?BLUE:RED,s[1]==='f'?'사실':'의견',-.2,a,u);}g.restore();
    reporter(g,wide?W*.12:W*.16,H*.82,u*1.7,ph>.6?'happy':'neutral',T);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'k10-fact-newsroom',title:'어린이 뉴스룸',title1:'속보! 속보!',title2:'어린이 뉴스룸',emoji:LOGO,
  subtitle:'3~4학년 · 사실과 의견 · 중심 문장 · 원인과 결과',
  howto:'나는 어린이 신문 편집장! 기자들이 보낸 문장에 <b>사실 📰 / 의견 💭</b> 도장을 찍고, 문단에서 <b>중심 문장</b>을 골라 헤드라인으로 뽑고, <b>원인</b>과 <b>결과</b> 기사를 줄로 이어요. 정확할수록 신문이 많이 팔려요!',
  how:p=>({a:'기사에 <b>사실 / 의견</b> 도장 찍기',b:'문단의 <b>중심 문장</b>을 헤드라인으로!',c:'<b>원인</b>과 <b>결과</b>를 줄로 잇기',all:'세 가지 취재가 번갈아 나와요'}[p.levelId]),
  theme:{c1:'#1e3a8a',c2:'#dc2626'},hero:heroScene,vignette:.05,durs:[90,120,180],levelTitle:'어떤 기사를 다룰까요?',
  txt:{who:'누가 편집장이 될까요?',dur:'마감 시간',pace:'한 문제 시간',seat:'번 편집장 ',go:'방송 시작!',s1:'1. 기사',s2:'2. 방법',s3:'3. 이름'},
  levels:[
    {id:'a',g:'3~4학년',t:'사실과 의견',d:'실제 있었던 일 · 내 생각'},
    {id:'b',g:'3~4학년',t:'중심 문장 찾기',d:'문단에서 가장 중요한 문장'},
    {id:'c',g:'3~4학년',t:'원인과 결과',d:'왜 그렇게 되었을까?'},
    {id:'all',g:'3~4학년',t:'🌟 모두 섞기',d:'세 가지 취재가 번갈아 나와요'},
  ],
  summary:`<ul><li><b>사실</b>은 실제로 있었거나 확인할 수 있는 일이고, <b>의견</b>은 사람마다 다를 수 있는 생각이에요. ‘~같다, ~좋다, ~해야 한다, 가장 ~다’ 같은 말은 의견일 때가 많아요.</li>
    <li><b>중심 문장</b>은 문단에서 가장 중요한 내용을 담은 문장이에요. 문단의 첫머리나 끝에 오는 경우가 많고, 나머지 문장은 중심 문장을 뒷받침해요.</li>
    <li><b>원인</b>은 어떤 일이 일어난 까닭이고 <b>결과</b>는 그 때문에 일어난 일이에요. ‘왜냐하면, 그래서, 때문에’ 같은 말에 주의해요.</li>
    <li>글을 읽을 때 사실과 의견을 나누어 생각하면 믿을 만한 정보를 가려낼 수 있어요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=Math.max(p.top||0,u*2.6);const land=W>=H*1.15;const pad=u*.3,gap=u*.22;const botH=u*1.2;const by=H-botH;return{W,H,u,Z0,land,pad,gap,botH,by};},
  stampRects(p){const G=this.geo(p);const h=Math.min(G.u*2.2,G.H*.18);const w=(G.W-G.pad*2-G.gap)/2;return[0,1].map(i=>({x:G.pad+i*(w+G.gap),y:G.by-h-G.gap,w,h}));},
  causeRects(p){const G=this.geo(p),{u,pad}=G;const top=G.Z0+u*1.2,bot=G.by-G.gap;const h=Math.min((bot-top-u*.5)/3,u*2.5);const w=Math.min((G.W-pad*2-u*2.4)/2,u*9);const gx=(G.W-2*w-u*2)/2;
    return{L:[0,1,2].map(i=>({x:gx,y:top+i*(h+u*.25),w,h})),R:[0,1,2].map(i=>({x:gx+w+u*2,y:top+i*(h+u*.25),w,h})),top};},
  mainRects(p,q){const G=this.geo(p),{u,pad,gap}=G;const top=G.Z0+u*.5+u*1.2,bot=G.by-gap;const n=q.sents.length;const h=(bot-top-gap*(n-1))/n;return q.sents.map((s,i)=>({x:pad+u*.3,y:top+i*(h+gap),w:G.W-pad*2-u*.6,h}));},
  init(p){const st=p.state;Object.assign(st,{q:null,n:0,sold:0,shown:0,T:0,lock:false,k:0,res:[],mood:'neutral',mT:0,qt:0,qmax:0,busy:false,stamp:null,sel:null,links:[],pick:-1,rev:false,slide:1});this.newQ(p);},
  make(p,L){const R=p.R,q={};
    if(L==='a'){const f=QK.take(p,FACT,'dk_f',2).map(t=>[t,'f']),o=QK.take(p,OPIN,'dk_o',2).map(t=>[t,'o']);q.ty='fo';q.items=R.shuffle([...f,...o]);
      q.text='문장마다 <b>📰 사실</b>인지 <b>💭 의견</b>인지 도장을 찍어요!';q.reveal=q.items.map(x=>`${x[0]} → ${x[1]==='f'?'사실':'의견'}`).join('<br>');q.review=q.items.map(x=>`${x[0]}(${x[1]==='f'?'사실':'의견'})`).join(' / ');}
    else if(L==='b'){const g=p.deck(PARA,'dk_b');q.ty='main';q.title=g[0];q.sents=g[1];q.ans=g[2];q.text='이 문단의 <b>중심 문장</b>을 콕! 헤드라인으로 뽑아요.';q.reveal=g[1][g[2]];q.review=`[${g[0]}] ${q.reveal}`;}
    else{let ps;do{ps=QK.take(p,CAUSE,'dk_c',3);}while(ps.some((a,j)=>a[2]&&ps.some((b,k)=>k!==j&&b[2]===a[2])));q.ty='cause';q.ps=ps;q.L=R.shuffle([0,1,2]);do{q.Rr=R.shuffle([0,1,2]);}while(q.Rr.some((x,j)=>x===q.L[j]));q.text='<b>원인</b>을 먼저 콕, 그다음 알맞은 <b>결과</b>를 콕! 줄로 이어요.';q.reveal=ps.map(x=>`${x[0]} → ${x[1]}`).join('<br>');q.review=ps.map(x=>`${x[0]} → ${x[1]}`).join(' / ');}
    return q;},
  newQ(p){const st=p.state,L=p.levelId==='all'?['a','b','c'][st.n%3]:p.levelId;st.n++;const q=this.make(p,L);st.q=q;st.lock=false;st.k=0;st.res=[];st.busy=false;st.stamp=null;st.sel=null;st.links=[];st.pick=-1;st.rev=false;st.slide=1;
    st.qmax=({fo:40,main:30,cause:45}[q.ty])/p.pace;st.qt=st.qmax;p.ask('📺 '+q.text,({fo:'사실: 확인할 수 있는 일 · 의견: 사람마다 다른 생각',main:'가장 중요한 한 문장을 골라요',cause:'왼쪽 원인을 누르고, 오른쪽 결과를 눌러요'})[q.ty]);},
  verdict(p,ok,partial,timeout){const st=p.state,q=st.q;if(st.lock)return;st.lock=true;st.rev=true;st.mood=ok?'happy':'oops';st.mT=1.8;if(ok)st.sold+=Math.round(50+p.Rf.f()*50)*(partial===1?1:.6)|0;
    const G=this.geo(p);p.hit(ok,{x:p.W/2,y:G.Z0+u0(p)*3,tip:ok?(partial===1?undefined:'조금만 더! '+q.reveal):(timeout?'시간이 다 됐어요! ':'')+(q.ty==='main'?'중심 문장: <b>'+q.reveal+'</b>':'바른 답<br>'+q.reveal),review:q.review,tipMs:ok?1300:4000});
    setTimeout(()=>{if(p.active)this.newQ(p);},ok?1500:3600);},
  update(p,dt){const st=p.state;st.T+=dt;if(st.mT>0){st.mT-=dt;if(st.mT<=0)st.mood='neutral';}if(st.shown<st.sold)st.shown=Math.min(st.sold,st.shown+Math.max(5,(st.sold-st.shown)*dt*4));if(st.slide>0)st.slide=Math.max(0,st.slide-dt*3);if(st.stamp)st.stamp.t+=dt;
    if(st.q&&!st.lock&&st.qmax>0){st.qt-=dt;if(st.qt<=0){const q=st.q;if(q.ty==='fo'){while(st.res.length<q.items.length)st.res.push('x');st.k=q.items.length;}if(q.ty==='main')st.pick=q.ans;this.verdict(p,false,0,true);}}},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;
    if(q.ty==='fo'){if(st.busy)return;const i=this.stampRects(p).findIndex(r=>K.inRect(x,y,r));if(i<0)return;const v=i===0?'f':'o';const it=q.items[st.k];const right=v===it[1];st.res.push(v);st.busy=true;st.stamp={v,t:0};p.Snd.tone(right?720:220,.1,'sine',.06);st.mood=right?'happy':'oops';st.mT=.8;
      setTimeout(()=>{st.busy=false;st.stamp=null;st.k++;st.slide=1;if(st.k>=q.items.length&&!st.lock){const c=st.res.filter((r,j)=>r===q.items[j][1]).length;this.verdict(p,c>=3,c/4);}},750);return;}
    if(q.ty==='main'){const i=this.mainRects(p,q).findIndex(r=>K.inRect(x,y,r));if(i<0)return;st.pick=i;p.Snd.tap&&p.Snd.tap();this.verdict(p,i===q.ans,1);return;}
    const C=this.causeRects(p);
    let i=C.L.findIndex((r,j)=>K.inRect(x,y,r)&&!st.links.some(l=>l[0]===q.L[j]));if(i>=0){st.sel=q.L[i];p.Snd.tap&&p.Snd.tap();return;}
    i=C.R.findIndex((r,j)=>K.inRect(x,y,r)&&!st.links.some(l=>l[1]===q.Rr[j]));if(i>=0){if(st.sel==null){p.Snd.bad&&p.Snd.bad();return;}st.links.push([st.sel,q.Rr[i]]);st.sel=null;p.Snd.tone(600+st.links.length*100,.08,'sine',.05);
      if(st.links.length===3){const c2=st.links.filter(([a,b])=>a===b).length;this.verdict(p,c2===3,c2/3);}}},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;
    studio(g,W,H,u,t);onAir(g,W-u*2.3,G.Z0-u*.1,u*.4,Math.sin(t*3)>0);
    if(!st.lock&&st.qmax>0){const f=clamp(st.qt/st.qmax,0,1),bw=Math.min(W*.5,u*10),bh=Math.max(5,u*.14);K.rr(g,W/2-bw/2,H-u*.3,bw,bh,bh/2);g.fillStyle='rgba(255,255,255,.2)';g.fill();K.rr(g,W/2-bw/2,H-u*.3,Math.max(bh,bw*f),bh,bh/2);g.fillStyle=f>.4?'#fbbf24':(f>.2?'#fb923c':'#ef4444');g.fill();}
    if(q.ty==='fo'){const it=q.items[Math.min(st.k,q.items.length-1)];const cw=Math.min(W*.9,u*17),ch=Math.min(G.by-this.stampRects(p)[0].h-G.Z0-u*2.2,u*5.5),cx=W/2-cw/2,cy=G.Z0+u*.8;const sl=st.slide*W*.4;
      for(let i=0;i<q.items.length;i++){const x=W/2+(i-(q.items.length-1)/2)*u*.8,y=G.Z0+u*.35;g.fillStyle=i<st.res.length?(st.res[i]===q.items[i][1]?'#4ade80':'#f87171'):(i===st.k?'#fbbf24':'rgba(255,255,255,.3)');g.beginPath();g.arc(x,y,u*.2,0,TAU);g.fill();g.strokeStyle='#fff';g.lineWidth=2;g.stroke();}
      paperBox(g,cx+sl,cy,cw,ch,u);K.txt(g,`기사 ${Math.min(st.k+1,q.items.length)} / ${q.items.length}`,cx+sl+u*1.5,cy+u*.5,{size:u*.38,color:'#6b7280'});QK.txt(g,it[0],W/2+sl,cy+ch/2+u*.2,cw-u*.8,ch-u*1.2,Math.min(u*.9,ch*.22),INK);
      if(st.stamp){const f=clamp(st.stamp.t/.25,0,1);const sc=2-f;stampShape(g,cx+sl+cw*.72,cy+ch*.72,u*2.6*sc,u*1.2*sc,st.stamp.v==='f'?BLUE:RED,st.stamp.v==='f'?'사실':'의견',-.2,f,u);
        const ok=st.stamp.v===it[1];K.emo(g,ok?'✅':'❌',cx+cw-u*.6,cy+u*.6,u*.7);}
      this.stampRects(p).forEach((r,i)=>{const col=i===0?BLUE:RED;K.card(g,r.x,r.y,r.w,r.h,u*.15,col,{stroke:'#fff',lw:3,blur:0,dy:u*.1,sc:'rgba(0,0,0,.5)'});K.txt(g,i===0?'📰 사실':'💭 의견',r.x+r.w/2,r.y+r.h/2,{size:Math.min(u*.9,r.h*.45),color:'#fff'});});}
    else if(q.ty==='main'){const rs=this.mainRects(p,q);const px=G.pad,pw=G.W-G.pad*2;paperBox(g,px,G.Z0+u*.3,pw,G.by-G.Z0-u*.3-G.gap,u,'#fffff4');K.txt(g,'🗞️ '+q.title,W/2,G.Z0+u*.9,{size:u*.65,color:RED,maxW:pw-u});
      rs.forEach((r,i)=>{const s=q.sents[i];const isAns=i===q.ans;let fill='rgba(30,58,138,.06)',bd='rgba(15,31,92,.25)';if(st.lock){if(isAns){fill='#bbf7d0';bd='#16a34a';}else if(st.pick===i){fill='#fecdd3';bd='#dc2626';}}
        g.fillStyle=fill;K.rr(g,r.x,r.y,r.w,r.h,u*.1);g.fill();g.strokeStyle=bd;g.lineWidth=Math.max(2,u*.05);g.stroke();K.txt(g,String(i+1),r.x+u*.4,r.y+r.h/2,{size:u*.5,color:BLUE});QK.txt(g,s,r.x+r.w/2+u*.3,r.y+r.h/2,r.w-u*1.4,r.h-u*.2,Math.min(u*.65,r.h*.4),INK);
        if(st.lock&&isAns)K.txt(g,'HEADLINE',r.x+r.w-u*1.4,r.y+u*.25,{size:u*.3,color:RED});});}
    else{const C=this.causeRects(p);K.txt(g,'🔍 원인',C.L[0].x+C.L[0].w/2,C.top-u*.45,{size:u*.5,color:'#fde68a'});K.txt(g,'💥 결과',C.R[0].x+C.R[0].w/2,C.top-u*.45,{size:u*.5,color:'#fde68a'});
      const COL=['#60a5fa','#f472b6','#4ade80'];
      const cardDraw=(r,text,linkI,sel)=>{const lk=linkI>=0;g.save();paperBox(g,r.x,r.y,r.w,r.h,u,lk?'#fff':(sel?'#fef9c3':'#fffffa'));if(lk){g.strokeStyle=COL[linkI];g.lineWidth=Math.max(4,u*.12);K.rr(g,r.x,r.y,r.w,r.h,u*.05);g.stroke();g.fillStyle=COL[linkI];g.beginPath();g.arc(r.x+u*.3,r.y+u*.3,u*.24,0,TAU);g.fill();K.txt(g,String(linkI+1),r.x+u*.3,r.y+u*.32,{size:u*.32,color:'#fff'});}
        QK.txt(g,text,r.x+r.w/2+u*.1,r.y+r.h/2,r.w-u*.8,r.h-u*.3,Math.min(u*.6,r.h*.28),INK);g.restore();};
      C.L.forEach((r,j)=>{const k=q.L[j];const li=st.links.findIndex(l=>l[0]===k);cardDraw(r,q.ps[k][0],li,st.sel===k);});
      C.R.forEach((r,j)=>{const k=q.Rr[j];const li=st.links.findIndex(l=>l[1]===k);cardDraw(r,q.ps[k][1],li,false);});
      st.links.forEach((l,i)=>{const a=C.L[q.L.indexOf(l[0])],b=C.R[q.Rr.indexOf(l[1])];g.strokeStyle=COL[i];g.lineWidth=Math.max(4,u*.12);g.lineCap='round';g.beginPath();g.moveTo(a.x+a.w,a.y+a.h/2);g.bezierCurveTo(a.x+a.w+u*.8,a.y+a.h/2,b.x-u*.8,b.y+b.h/2,b.x,b.y+b.h/2);g.stroke();
        if(st.rev){const ok=l[0]===l[1];K.emo(g,ok?'✅':'❌',(a.x+a.w+b.x)/2,(a.y+b.y+a.h/2+b.h/2)/2,u*.7);}});}
    reporter(g,u*.9,H-u*.9,Math.min(u*1.3,H*.1),st.mood,t);
    K.card(g,W-u*4.0,H-u*1.1,u*3.7,u*.85,u*.15,'rgba(255,255,250,.95)',{stroke:INK,lw:2,blur:u*.15,dy:u*.05});K.txt(g,`🗞️ ${Math.round(st.shown)}부`,W-u*2.15,H-u*.67,{size:u*.5,color:INK,maxW:u*3.4});},
};
function u0(p){return p.u;}

Engine.boot(GAME);
