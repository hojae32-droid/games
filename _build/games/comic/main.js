/* 5~6학년 · 국어 이야기의 구성 요소 · 사건의 흐름 · 인물 — 이야기 만화 편집부 (만화 칸 순서 붙이기 · 인물·사건·배경 나누기 · 성격 짐작)
   디자인: 만화책. 굵은 테두리와 하프톤 점, 편집장 고양이가 반응하고 잘 만들면 잡지 판매 부수가 올라가요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#1a1a2e';
const strip=s=>String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="5" y="6" width="38" height="36" rx="3" fill="#fff" stroke="#1a1a2e" stroke-width="3"/><rect x="9" y="10" width="14" height="12" fill="#facc15" stroke="#1a1a2e" stroke-width="2"/><rect x="25" y="10" width="14" height="12" fill="#e11d48" stroke="#1a1a2e" stroke-width="2"/><rect x="9" y="25" width="30" height="13" fill="#4338ca" stroke="#1a1a2e" stroke-width="2"/><path d="M14 34l4-6 4 6" stroke="#fff" stroke-width="2.5" fill="none"/></svg>';
/*@@DATA@@*/
const BIN={p:{t:'인물',c:'#3b82f6',e:'🧑'},e:{t:'사건',c:'#ef4444',e:'💥'},b:{t:'배경',c:'#22c55e',e:'🏞️'}};
function burst(g,x,y,r,col,text,t,rot){g.save();g.translate(x,y);g.rotate(rot||-.12);const sc=1+Math.sin(t*14)*.04;g.scale(sc,sc);g.fillStyle=col;g.strokeStyle=INK;g.lineWidth=Math.max(3,r*.09);g.lineJoin='round';g.beginPath();for(let i=0;i<24;i++){const a=i*Math.PI/12,rr=i%2?r*.68:r;g.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);}g.closePath();g.fill();g.stroke();
  K.txt(g,text,0,r*.03,{size:r*.5,color:'#fff',stroke:INK,lw:r*.1});g.restore();}
/* 편집장 고양이 */
function cat(g,x,y,s,mood,t){g.save();g.translate(x,y+Math.sin(t*3)*s*.015);g.lineJoin='round';g.lineWidth=Math.max(2,s*.05);g.strokeStyle=INK;K.shadow(g,0,s*.55,s*.45,s*.08,.25);
  g.fillStyle='#e8a04c';for(const d of[-1,1]){g.beginPath();g.moveTo(d*s*.18,-s*.28);g.lineTo(d*s*.42,-s*.62);g.lineTo(d*s*.5,-s*.12);g.closePath();g.fill();g.stroke();}
  g.fillStyle='#e8a04c';g.beginPath();g.ellipse(0,0,s*.5,s*.45,0,0,TAU);g.fill();g.stroke();g.fillStyle='#fde3b8';g.beginPath();g.ellipse(0,s*.12,s*.26,s*.2,0,0,TAU);g.fill();
  g.strokeStyle='#b45309';g.lineWidth=s*.04;for(const d of[-1,1])for(let k=-1;k<=1;k++){g.beginPath();g.moveTo(d*s*.04,-s*.34+k*s*.0);g.lineTo(d*s*.04,-s*.34);g.stroke();}
  g.fillStyle='#e11d48';g.strokeStyle=INK;g.lineWidth=Math.max(2,s*.05);g.beginPath();g.ellipse(-s*.04,-s*.42,s*.4,s*.17,-.15,0,TAU);g.fill();g.stroke();g.fillStyle='#be123c';g.beginPath();g.arc(s*.06,-s*.6,s*.06,0,TAU);g.fill();g.stroke();
  g.strokeStyle=INK;g.fillStyle=INK;g.lineWidth=Math.max(1.6,s*.04);g.lineCap='round';
  for(const d of[-1,1]){const ex=d*s*.2,ey=-s*.06;g.fillStyle='#fff';g.beginPath();g.arc(ex,ey,s*.12,0,TAU);g.fill();g.stroke();g.fillStyle=INK;
    if(mood==='oops'){g.beginPath();g.moveTo(ex-s*.05,ey-s*.05);g.lineTo(ex+s*.05,ey+s*.05);g.moveTo(ex+s*.05,ey-s*.05);g.lineTo(ex-s*.05,ey+s*.05);g.stroke();}else if(mood==='happy'){g.beginPath();g.arc(ex,ey+s*.02,s*.05,Math.PI*1.1,Math.PI*1.9);g.stroke();}else{g.beginPath();g.arc(ex+s*.01,ey+s*.01,s*.045,0,TAU);g.fill();}}
  g.beginPath();g.moveTo(-s*.08,-s*.06);g.lineTo(s*.08,-s*.06);g.stroke();
  g.fillStyle='#f472b6';g.beginPath();g.moveTo(-s*.06,s*.04);g.lineTo(s*.06,s*.04);g.lineTo(0,s*.1);g.closePath();g.fill();
  g.beginPath();if(mood==='happy'){g.fillStyle='#be123c';g.arc(0,s*.12,s*.08,0,Math.PI);g.fill();g.stroke();}else if(mood==='oops'){g.arc(0,s*.2,s*.07,1.15*Math.PI,1.85*Math.PI);g.stroke();}else{g.moveTo(-s*.08,s*.14);g.quadraticCurveTo(0,s*.2,s*.08,s*.14);g.stroke();}
  g.lineWidth=Math.max(1.2,s*.03);g.beginPath();for(const d of[-1,1]){g.moveTo(d*s*.18,s*.1);g.lineTo(d*s*.5,s*.06);g.moveTo(d*s*.18,s*.14);g.lineTo(d*s*.5,s*.18);}g.stroke();
  g.restore();}
function kid(g,x,y,s,seed,mood){g.save();g.translate(x,y);g.lineJoin='round';g.lineWidth=Math.max(2,s*.05);g.strokeStyle=INK;const hair=['#2b1b12','#7c4a1e','#111827','#a16207'][seed%4],skin=['#f5cfa8','#e8b88c','#f2c9a0'][seed%3],shirt=['#4338ca','#16a34a','#e11d48','#f59e0b'][seed%4];
  g.fillStyle=shirt;g.beginPath();g.moveTo(-s*.42,s*.6);g.quadraticCurveTo(-s*.4,s*.18,0,s*.16);g.quadraticCurveTo(s*.4,s*.18,s*.42,s*.6);g.closePath();g.fill();g.stroke();
  g.fillStyle=skin;g.beginPath();g.arc(0,-s*.12,s*.34,0,TAU);g.fill();g.stroke();g.fillStyle=hair;g.beginPath();g.arc(0,-s*.12,s*.36,Math.PI*1.02,Math.PI*1.98);g.quadraticCurveTo(s*.2,-s*.34,0,-s*.3);g.quadraticCurveTo(-s*.2,-s*.34,-s*.35,-s*.12);g.closePath();g.fill();g.stroke();
  g.fillStyle=INK;g.strokeStyle=INK;g.lineWidth=Math.max(1.6,s*.04);for(const d of[-1,1]){const ex=d*s*.14,ey=-s*.1;if(mood==='happy'){g.beginPath();g.arc(ex,ey+s*.02,s*.05,Math.PI*1.1,Math.PI*1.9);g.stroke();}else if(mood==='oops'){g.beginPath();g.moveTo(ex-s*.05,ey-s*.05);g.lineTo(ex+s*.05,ey+s*.05);g.moveTo(ex+s*.05,ey-s*.05);g.lineTo(ex-s*.05,ey+s*.05);g.stroke();}else{g.beginPath();g.arc(ex,ey,s*.04,0,TAU);g.fill();}}
  g.beginPath();if(mood==='happy'){g.fillStyle='#be123c';g.arc(0,s*.04,s*.09,0,Math.PI);g.fill();g.stroke();}else if(mood==='oops'){g.arc(0,s*.12,s*.06,1.15*Math.PI,1.85*Math.PI);g.stroke();}else{g.arc(0,s*.0,s*.08,.15*Math.PI,.85*Math.PI);g.stroke();}
  g.restore();}
function magazine(g,x,y,s,col){g.save();g.translate(x,y);g.lineJoin='round';g.lineWidth=Math.max(2,s*.07);g.strokeStyle=INK;for(let k=2;k>=0;k--){g.save();g.translate(k*s*.06,-k*s*.05);g.fillStyle=k?'#e5e7eb':col;K.rr(g,-s*.4,-s*.5,s*.8,s,s*.04);g.fill();g.stroke();if(!k){g.fillStyle='#fde047';g.fillRect(-s*.32,-s*.42,s*.64,s*.2);g.fillStyle='#fff';g.fillRect(-s*.32,-s*.12,s*.64,s*.4);g.strokeRect(-s*.32,-s*.12,s*.64,s*.4);g.fillStyle=INK;g.fillRect(-s*.26,s*.34,s*.4,s*.06);}g.restore();}g.restore();}
function halftone(g,W,H,u,t){g.fillStyle='#fff3c4';g.fillRect(0,0,W,H);g.fillStyle='rgba(225,29,72,.18)';const gs=u*.45;for(let y=0;y<H;y+=gs)for(let x=((y/gs)%2)*gs/2;x<W;x+=gs){const d=1-y/H;g.beginPath();g.arc(x,y,gs*.2*(.4+d*.8),0,TAU);g.fill();}}
function panelBox(g,x,y,w,h,u,fill,bd){g.save();g.fillStyle='#1a1a2e';K.rr(g,x+u*.1,y+u*.1,w,h,u*.08);g.fill();g.fillStyle=fill||'#fff';K.rr(g,x,y,w,h,u*.08);g.fill();g.strokeStyle=bd||INK;g.lineWidth=Math.max(3,u*.09);g.stroke();g.restore();}
function drawPanel(g,x,y,w,h,u,it,idx,faded){panelBox(g,x,y,w,h,u,faded?'#fff':'#fffdf0');
  if(!it){K.txt(g,String(idx+1),x+w/2,y+h/2,{size:Math.min(h*.5,w*.5),color:'rgba(26,26,46,.18)'});return;}
  const es=Math.min(h*.42,w*.5);K.emo(g,it[0],x+w/2,y+h*.3,es);
  g.save();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';let fs=Math.min(u*.5,h*.16);g.font=K.font(fs);let lines=K.wrap(g,it[1],w-u*.4);while(lines.length*fs*1.15>h*.52&&fs>8){fs*=.92;g.font=K.font(fs);lines=K.wrap(g,it[1],w-u*.4);}
  lines.forEach((l,i)=>g.fillText(l,x+w/2,y+h*.68+(i-(lines.length-1)/2)*fs*1.15));g.restore();
  if(idx>=0){g.fillStyle='#e11d48';g.beginPath();g.arc(x+u*.3,y+u*.3,u*.24,0,TAU);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();K.txt(g,String(idx+1),x+u*.3,y+u*.32,{size:u*.34,color:'#fff'});}}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/6:Math.min(W,H)/7;halftone(g,W,H,u,T);
    const n=4,pw=Math.min(W*.2,u*2.6),ph=pw*1.05;const x0=W/2-(n*pw+(n-1)*u*.3)/2;const it=[['🌰','씨앗을 심었다.'],['💧','물을 주었다.'],['🌱','싹이 텄다.'],['🌻','꽃이 피었다.']];
    const k=Math.floor(T/1.2)%6;for(let i=0;i<n;i++){const x=x0+i*(pw+u*.3),y=H*(wide?.2:.3)+Math.sin(T*1.2+i)*u*.06;drawPanel(g,x,y,pw,ph,u*.8,i<k?it[i]:null,i);}
    if(k>=4)burst(g,W*.5,H*.85,u*1.1,'#e11d48','완성!',T);
    cat(g,W*(wide?.1:.15),H*.78,u*1.6,k>=4?'happy':'neutral',T);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'k14-story-comic',title:'이야기 만화 편집부',title1:'마감이 코앞이다냥!',title2:'이야기 만화 편집부',emoji:LOGO,
  subtitle:'5~6학년 · 이야기의 구성 요소 · 사건의 흐름 · 인물',
  howto:'만화 잡지 마감 날! 뒤죽박죽 섞인 만화 칸을 <b>일이 일어난 순서</b>대로 붙이고, 원고 조각을 <b>인물 · 사건 · 배경</b> 상자로 나누고, 인물의 말과 행동을 보고 <b>성격</b>을 짐작해요. 잘 만들면 잡지 판매 부수가 올라가요!',
  how:p=>({a:'만화 칸을 <b>일어난 순서</b>대로 콕콕!',b:'원고를 <b>인물 · 사건 · 배경</b> 상자로!',c:'말과 행동으로 <b>성격</b> 짐작하기',all:'세 가지 편집이 번갈아 나와요'}[p.levelId]),
  theme:{c1:'#be123c',c2:'#4338ca'},hero:heroScene,vignette:.05,durs:[90,120,180],levelTitle:'어떤 원고를 편집할까요?',
  txt:{who:'누가 편집자가 될까요?',dur:'마감 시간',pace:'한 문제 시간',seat:'번 편집자 ',go:'편집 시작!',s1:'1. 원고',s2:'2. 방법',s3:'3. 이름'},
  levels:[
    {id:'a',g:'5~6학년',t:'사건의 순서',d:'만화 칸을 차례대로 붙이기'},
    {id:'b',g:'5~6학년',t:'인물 · 사건 · 배경',d:'이야기 구성 요소 나누기'},
    {id:'c',g:'5~6학년',t:'인물의 성격 짐작하기',d:'말과 행동으로 알아보기'},
    {id:'all',g:'5~6학년',t:'🌟 모두 섞기',d:'세 가지 편집이 번갈아 나와요'},
  ],
  summary:`<ul><li>이야기의 <b>구성 요소</b>는 <b>인물</b>(이야기에 나오는 사람이나 동물), <b>사건</b>(일어난 일), <b>배경</b>(일이 일어난 때와 곳)이에요.</li>
    <li>이야기는 일이 일어난 <b>순서(사건의 흐름)</b>대로 이어져요. 앞의 사건이 원인이 되어 다음 사건이 일어나요.</li>
    <li>인물의 <b>성격</b>은 인물이 하는 <b>말과 행동</b>을 보고 짐작할 수 있어요 (정직하다, 부지런하다, 욕심이 많다, 끈기가 있다…).</li>
    <li>이야기를 읽을 때는 인물 · 사건 · 배경을 찾고, 사건의 순서를 정리하며 읽으면 내용을 잘 이해할 수 있어요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=Math.max(p.top||0,u*2.6);const land=W>=H*1.15;const pad=u*.3,gap=u*.22;const botH=u*1.4;const availH=H-Z0-botH-pad;return{W,H,u,Z0,land,pad,gap,botH,availH,by:H-botH};},
  orderRects(p){const G=this.geo(p),{u,pad,gap}=G;const fr=[],cd=[];
    if(G.land){const w=(G.W-pad*2-gap*3)/4;const h=(G.availH-gap)/2;for(let i=0;i<4;i++){fr.push({x:pad+i*(w+gap),y:G.Z0+pad*.2,w,h});cd.push({x:pad+i*(w+gap),y:G.Z0+pad*.2+h+gap,w,h});}}
    else{const w=(G.W-pad*2-gap)/2;const h=(G.availH-gap*3)/4;for(let i=0;i<4;i++){fr.push({x:pad+(i%2)*(w+gap),y:G.Z0+pad*.2+Math.floor(i/2)*(h+gap),w,h});cd.push({x:pad+(i%2)*(w+gap),y:G.Z0+pad*.2+2*(h+gap)+Math.floor(i/2)*(h+gap),w,h});}}
    return{fr,cd};},
  binRects(p){const G=this.geo(p),{u,pad,gap}=G;const h=Math.min(u*2.1,G.availH*.34);const w=(G.W-pad*2-gap*2)/3;return[0,1,2].map(i=>({x:pad+i*(w+gap),y:G.by-h-gap,w,h}));},
  optRects(p){const G=this.geo(p),{u,pad,gap}=G;const out=[];if(G.land){const w=(G.W-pad*2-gap*2)/3,h=Math.min(G.availH*.34,u*2.6);for(let i=0;i<3;i++)out.push({x:pad+i*(w+gap),y:G.by-h-gap,w,h});}
    else{const h=u*1.5;for(let i=0;i<3;i++)out.push({x:pad,y:G.by-gap-(3-i)*h-(2-i)*gap,w:G.W-pad*2,h});}return out;},
  init(p){const st=p.state;Object.assign(st,{q:null,n:0,sales:0,shown:0,T:0,lock:false,got:[],k:0,res:[],mood:'neutral',mT:0,pow:0,powTxt:'',qt:0,qmax:0,busy:false,fly:[],rev:false,pick:-1});this.newQ(p);},
  make(p,L){const R=p.R,q={};
    if(L==='a'){const s=p.deck(STORY,'dk_a');q.ty='order';q.title=s[0];q.steps=s[1];do{q.mix=R.shuffle([0,1,2,3]);}while(q.mix.every((x,j)=>x===j));q.text=`「${s[0]}」 만화 칸을 <b>일어난 순서</b>대로 콕콕!`;q.reveal=s[1].map((x,k)=>`${k+1}. ${x[1]}`).join(' ');q.review=`「${s[0]}」 `+q.reveal;}
    else if(L==='b'){const st=p.deck(ELEM,'dk_b');const pick=R.shuffle([...st[1].map(x=>[x,'p']),...st[2].map(x=>[x,'e']),...st[3].map(x=>[x,'b'])]).slice(0,4);
      q.ty='elem';q.title=st[0];q.items=pick;q.text=`「${st[0]}」 원고 조각을 <b>인물 · 사건 · 배경</b> 상자로!`;q.reveal=pick.map(x=>`${x[0]} → ${NM[x[1]]}`).join('<br>');q.review=`「${st[0]}」 `+pick.map(x=>`${x[0]}(${NM[x[1]]})`).join(' / ');}
    else{const c=p.deck(CHAR,'dk_c');q.ty='char';q.sent=c[0];q.ans=c[1];q.opts=R.shuffle([c[1],c[2],c[3]]).map(t=>({t,ok:t===c[1]}));q.text='이 인물의 <b>성격</b>으로 알맞은 것은?';q.reveal=c[1];q.speak=c[0];q.review=c[0]+' → '+c[1];q.seed=Math.floor(R.f()*100);}
    return q;},
  newQ(p){const st=p.state,L=p.levelId==='all'?['a','b','c'][st.n%3]:p.levelId;st.n++;const q=this.make(p,L);st.q=q;st.lock=false;st.got=[];st.k=0;st.res=[];st.busy=false;st.fly=[];st.rev=false;st.pick=-1;
    st.qmax=({order:40,elem:40,char:22}[q.ty])/p.pace;st.qt=st.qmax;
    p.ask('💬 '+q.text,({order:'칸을 누르는 순서대로 붙어요',elem:'원고를 읽고 알맞은 상자를 눌러요',char:'말과 행동을 잘 살펴봐요'})[q.ty]);},
  verdict(p,ok,partial,timeout){const st=p.state,q=st.q;if(st.lock)return;st.lock=true;st.rev=true;
    st.mood=ok?'happy':'oops';st.mT=1.8;st.pow=1.4;st.powTxt=ok?(partial===1?['대박!','와우!','완성!'][st.n%3]:'잘했어요!'):(timeout?'시간 끝!':'앗!');
    if(ok)st.sales+=Math.round(300+p.Rf.f()*700);
    const G=this.geo(p);p.hit(ok,{x:p.W/2,y:G.Z0+G.availH*.3,tip:ok?(partial===1?undefined:'조금만 더! '+q.reveal):(timeout?'시간이 다 됐어요! ':'')+(q.ty==='char'?'정답: '+q.reveal:'바른 답: '+q.reveal),review:q.review,tipMs:ok?1300:3600});
    setTimeout(()=>{if(p.active)this.newQ(p);},ok?1500:3300);},
  update(p,dt){const st=p.state;st.T+=dt;if(st.mT>0){st.mT-=dt;if(st.mT<=0)st.mood='neutral';}if(st.pow>0)st.pow-=dt;if(st.shown<st.sales)st.shown=Math.min(st.sales,st.shown+Math.max(30,(st.sales-st.shown)*dt*4));
    st.fly=st.fly.filter(f=>(f.t+=dt)<.4);
    if(st.q&&!st.lock&&st.qmax>0){st.qt-=dt;if(st.qt<=0){const q=st.q;if(q.ty==='order'){st.got=[0,1,2,3];}if(q.ty==='elem'){st.res=q.items.map(x=>x[1]);st.k=q.items.length;}this.verdict(p,false,0,true);}}},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);
    if(q.ty==='order'){const {fr,cd}=this.orderRects(p);
      const ub={x:G.W/2-G.u*1.6,y:G.by+G.u*.15,w:G.u*3.2,h:G.u*1.0};if(K.inRect(x,y,ub)){st.got=[];p.Snd.tap&&p.Snd.tap();return;}
      const i=cd.findIndex((r,j)=>K.inRect(x,y,r)&&!st.got.includes(q.mix[j]));if(i<0)return;const k=q.mix[i];st.fly.push({from:cd[i],to:fr[st.got.length],t:0,k});st.got.push(k);p.Snd.tone(500+st.got.length*90,.08,'sine',.05);
      if(st.got.length===4){const ok=st.got.every((v,j)=>v===j);this.verdict(p,ok,1);}return;}
    if(q.ty==='elem'){if(st.busy)return;const i=this.binRects(p).findIndex(r=>K.inRect(x,y,r));if(i<0)return;const v=['p','e','b'][i];const it=q.items[st.k];const right=v===it[1];st.res.push(v);st.busy=true;p.Snd.tone(right?700:220,.1,'sine',.05);
      st.last={ok:right,t:0};setTimeout(()=>{st.busy=false;st.k++;if(st.k>=q.items.length&&!st.lock){const c=st.res.filter((r,j)=>r===q.items[j][1]).length;this.verdict(p,c>=3,c/4);}},550);return;}
    if(q.ty==='char'){const i=this.optRects(p).findIndex(r=>K.inRect(x,y,r));if(i<0)return;st.pick=i;this.verdict(p,q.opts[i].ok,1);}},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;
    halftone(g,W,H,u,t);
    if(!st.lock&&st.qmax>0){const f=clamp(st.qt/st.qmax,0,1),bw=Math.min(W*.5,u*10),bh=Math.max(5,u*.14);K.rr(g,W/2-bw/2-u*.1,H-u*.22,bw,bh,bh/2);g.fillStyle='rgba(26,26,46,.2)';g.fill();K.rr(g,W/2-bw/2-u*.1,H-u*.22,Math.max(bh,bw*f),bh,bh/2);g.fillStyle=f>.4?'#4338ca':(f>.2?'#f59e0b':'#e11d48');g.fill();}
    if(q.ty==='order'){const {fr,cd}=this.orderRects(p);
      fr.forEach((r,i)=>{const k=st.got[i];drawPanel(g,r.x,r.y,r.w,r.h,u,k!=null&&!st.fly.some(f=>f.to===r)?q.steps[k]:null,i,true);
        if(st.rev&&k!=null&&k===i){g.strokeStyle='#16a34a';g.lineWidth=Math.max(4,u*.12);K.rr(g,r.x,r.y,r.w,r.h,u*.08);g.stroke();}else if(st.rev&&k!=null){g.strokeStyle='#e11d48';g.lineWidth=Math.max(4,u*.12);K.rr(g,r.x,r.y,r.w,r.h,u*.08);g.stroke();}});
      cd.forEach((r,j)=>{const k=q.mix[j];const used=st.got.includes(k);if(used){g.save();g.globalAlpha=.25;panelBox(g,r.x,r.y,r.w,r.h,u,'#ddd');g.restore();}else drawPanel(g,r.x,r.y,r.w,r.h,u,q.steps[k],-1,false);});
      for(const f of st.fly){const e=1-Math.pow(1-f.t/.4,3);const x=f.from.x+(f.to.x-f.from.x)*e,y=f.from.y+(f.to.y-f.from.y)*e;drawPanel(g,x,y,f.from.w+(f.to.w-f.from.w)*e,f.from.h+(f.to.h-f.from.h)*e,u,q.steps[f.k],st.got.indexOf(f.k),false);}
      /* 다시 붙이기 */
      const ub={x:W/2-u*1.6,y:G.by+u*.15,w:u*3.2,h:u*1.0};K.card(g,ub.x,ub.y,ub.w,ub.h,u*.2,'#facc15',{stroke:INK,lw:3,blur:0,dy:u*.08,sc:INK});K.txt(g,'↩ 다시 붙이기',ub.x+ub.w/2,ub.y+ub.h/2,{size:u*.42,color:INK});}
    else if(q.ty==='elem'){const it=q.items[Math.min(st.k,q.items.length-1)];const pw=Math.min(W*.9,u*16),ph=Math.min(G.availH-this.binRects(p)[0].h-G.gap*3,u*5);const px=W/2-pw/2,py=G.Z0+G.pad*.5;
      const slide=st.busy?Math.min(1,(1-(st.last?st.last.t:0))):0;
      panelBox(g,px,py,pw,ph,u,'#fffdf0');K.txt(g,`원고 ${Math.min(st.k+1,q.items.length)} / ${q.items.length}`,px+u*1.7,py+u*.5,{size:u*.4,color:'#6b6b8a'});
      g.save();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';let fs=Math.min(u*.9,ph*.28);g.font=K.font(fs);let lines=K.wrap(g,it[0],pw-u*1.2);while(lines.length*fs*1.2>ph-u*1.2&&fs>9){fs*=.92;g.font=K.font(fs);lines=K.wrap(g,it[0],pw-u*1.2);}lines.forEach((l,i)=>g.fillText(l,W/2,py+ph/2+u*.2+(i-(lines.length-1)/2)*fs*1.2));g.restore();
      this.binRects(p).forEach((r,i)=>{const v=['p','e','b'][i],b=BIN[v];const cnt=st.res.map((x,j)=>[x,j]).filter(a=>a[0]===v);const flash=st.busy&&st.res[st.res.length-1]===v;
        g.save();if(st.rev&&q.items.length&&false){}panelBox(g,r.x,r.y,r.w,r.h,u,b.c);K.emo(g,b.e,r.x+u*.8,r.y+r.h*.4,Math.min(u*.9,r.h*.45));K.txt(g,b.t,r.x+r.w/2,r.y+r.h*.42,{size:Math.min(u*.8,r.h*.4),color:'#fff',stroke:INK,lw:u*.12});
        cnt.forEach((a,k)=>{const right=a[0]===q.items[a[1]][1];K.emo(g,right?'✅':'❌',r.x+r.w-u*.5-k*u*.6,r.y+r.h-u*.45,u*.45);});if(flash){g.fillStyle='rgba(255,255,255,.35)';K.rr(g,r.x,r.y,r.w,r.h,u*.08);g.fill();}g.restore();});
      if(st.busy&&st.last){const last=st.res.length-1;const ok=st.res[last]===q.items[last][1];K.txt(g,ok?'콕!':'앗!',W/2,py+ph*.18,{size:u*.8,color:ok?'#16a34a':'#e11d48',stroke:INK,lw:u*.14});}}
    else{const o=this.optRects(p);const top=G.Z0+G.pad*.3,hh=o[0].y-top-G.gap;const bw=Math.min(W*.92,u*18),bh=Math.min(hh*.92,u*5.2),bx=W/2-bw/2,by=top+(hh-bh)/2;
      kid(g,bx+u*1.1,by+bh*.55,Math.min(bh*.7,u*2.4),q.seed,st.mood);
      const tx=bx+u*2.4;K.card(g,tx,by,bw-u*2.4,bh,u*.4,'#fff',{stroke:INK,lw:3,blur:0,dy:u*.1,sc:INK});g.save();g.fillStyle='#fff';g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(tx+1,by+bh*.45);g.lineTo(tx-u*.4,by+bh*.55);g.lineTo(tx+1,by+bh*.65);g.closePath();g.fill();g.stroke();g.fillRect(tx-1,by+bh*.47,4,bh*.16);g.restore();
      g.save();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';let fs=Math.min(u*.95,bh*.3);g.font=K.font(fs);let ls=K.wrap(g,q.sent,bw-u*3.3);while(ls.length*fs*1.2>bh-u*.4&&fs>9){fs*=.92;g.font=K.font(fs);ls=K.wrap(g,q.sent,bw-u*3.3);}ls.forEach((l,i)=>g.fillText(l,tx+(bw-u*2.4)/2,by+bh/2+(i-(ls.length-1)/2)*fs*1.2));g.restore();
      o.forEach((r,i)=>{const op=q.opts[i];let fill='#fff',al=1;if(st.lock){if(op.ok)fill='#bbf7d0';else if(st.pick===i)fill='#fecdd3';else al=.5;}g.save();g.globalAlpha=al;panelBox(g,r.x,r.y,r.w,r.h,u,fill);
        K.txt(g,op.t,r.x+r.w/2,r.y+r.h/2,{size:Math.min(u*.8,r.h*.5),color:INK,maxW:r.w-u*.6});if(st.lock&&(op.ok||st.pick===i))K.emo(g,op.ok?'✅':'❌',r.x+r.w-u*.4,r.y+u*.4,u*.5);g.restore();});}
    /* 편집장 + 판매 부수 */
    cat(g,u*.9,G.by+G.botH*.5,u*1.05,st.mood,t);
    const mx=W-u*3.6;magazine(g,mx,G.by+G.botH*.5,u*.8,'#e11d48');K.txt(g,`판매 ${Math.round(st.shown)}부`,mx+u*2.1,G.by+G.botH*.5,{size:u*.5,color:INK,maxW:u*3.2});
    if(st.pow>0)burst(g,W/2,G.Z0+G.availH*.4,u*(st.pow>1.1?2.2-(st.pow-1.1)*2:2.2),st.mood==='happy'?'#e11d48':'#6b7280',st.powTxt,t,-.12);},
};

Engine.boot(GAME);
