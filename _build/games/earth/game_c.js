
/* ═════════ 공전 미션: 궤도에 지구 놓기 · 별자리 맞히기 ═════════ */
function orbGeo(p){const A=areaOf(p);const land=A.w>A.h*1.05;const u=Math.min(p.u,A.w/11,A.h/13);
  const cx=land?A.w*.36:A.w*.5,cy=land?A.h*.5:A.h*.39;
  const CRx=land?A.w*.29:A.w/2-u*1.15,CRy=land?A.h*.4:A.h*.26;
  const OR=land?Math.min(A.w*.19,A.h*.24):Math.max(u*1.6,Math.min(CRx-u*2.1,CRy-u*1.9));
  const box=land?{x:A.w*.74,y:A.h*.2,w:A.w*.24,h:A.h*.5}:{x:A.w*.06,y:A.h*.8,w:A.w*.88,h:A.h*.17};
  return{A,u,land,cx,cy,OR,CRx,CRy,box};}
function conPos(G,i){const a=CONS[i].a;return[G.cx+Math.cos(a)*G.CRx,G.cy+Math.sin(a)*G.CRy];}
/* 한밤중 남쪽 하늘 창 */
function nightBox(g,G,orb,T,show,hl){const b=G.box,u=G.u;g.save();K.rr(g,b.x,b.y,b.w,b.h,u*.3);g.clip();
  const gr=g.createLinearGradient(0,b.y,0,b.y+b.h);gr.addColorStop(0,'#02030f');gr.addColorStop(1,'#141c64');g.fillStyle=gr;g.fillRect(b.x,b.y,b.w,b.h);
  let a=19;const r=()=>{a=(a*16807)%2147483647;return a/2147483647;};for(let i=0;i<40;i++){g.globalAlpha=.3+.5*Math.abs(Math.sin(T*1.4+i));g.fillStyle='#fff';g.fillRect(b.x+r()*b.w,b.y+r()*b.h*.9,1.4,1.4);}g.globalAlpha=1;
  if(show){CONS.forEach((c,i)=>{const d=angd(c.a,orb);if(Math.abs(d)<PI/2.2){const x=b.x+b.w/2+(-d/(PI/2.2))*b.w*.42,s=Math.min(b.h*.34,b.w*.16);const al=1-Math.abs(d)/(PI/2.2)*.6;
      drawConst(g,c.id,x,b.y+b.h*.46,s,al,T,hl===i?'#ffe08a':null);K.txt(g,c.n,x,b.y+b.h*.88,{size:clamp(u*.3,10,15),color:'#e8e2ff',alpha:al,maxW:b.w*.4});}});}
  else K.txt(g,'?',b.x+b.w/2,b.y+b.h*.5,{size:Math.min(b.h*.5,u*1.5),color:'rgba(200,190,255,.5)'});
  g.restore();K.rr(g,b.x,b.y,b.w,b.h,u*.3);g.lineWidth=2.5;g.strokeStyle='rgba(170,150,255,.65)';g.stroke();
  if(G.land)K.txt(g,'한밤중 남쪽 하늘',b.x+b.w/2,b.y-u*.3,{size:clamp(u*.3,10,15),color:'#cfc6ff',maxW:b.w});else K.txt(g,'한밤중 남쪽 하늘',b.x+u*2,b.y+u*.35,{size:clamp(u*.28,10,13),color:'#9d94e0',maxW:b.w*.5});}
function orbitScene(p,g,st,o){const G=orbGeo(p),{cx,cy,OR,u}=G,T=st.T;
  /* 태양 */
  const sp=1+Math.sin(T*1.6)*.03;K.glow(g,cx,cy,u*3.6*sp,'#ff9a3d',.5);K.glow(g,cx,cy,u*1.6,'#ffe08a',.95);g.fillStyle='#fff1b8';g.beginPath();g.arc(cx,cy,u*.62,0,TAU);g.fill();K.txt(g,'태양',cx+u*1.25,cy-u*.9,{size:u*.32,color:'#ffe3a0',stroke:'rgba(0,0,0,.6)',lw:3});
  /* 궤도 */
  g.save();g.strokeStyle='rgba(190,170,255,.5)';g.lineWidth=2;g.setLineDash([u*.14,u*.24]);g.lineDashOffset=-T*8;g.beginPath();g.arc(cx,cy,OR,0,TAU);g.stroke();g.restore();
  /* 별자리 */
  CONS.forEach((c,i)=>{const [x,y]=conPos(G,i);const hl=o.hl===i,dim=o.dim===i;
    g.save();g.fillStyle=hl?'rgba(255,224,130,.2)':'rgba(30,24,90,.8)';g.strokeStyle=hl?'#ffe08a':'rgba(170,150,255,.5)';g.lineWidth=hl?3:2;g.beginPath();g.arc(x,y,u*.95,0,TAU);g.fill();g.stroke();g.restore();
    drawConst(g,c.id,x,y,u*.64,dim?.35:1,T,hl?'#ffe08a':null);
    K.box(g,x-u*1.5,y+u*.98,u*3,u*.58,u*.29,'rgba(224,219,255,.95)');K.txt(g,c.n,x,y+u*1.27,{size:u*.3,color:'#1a1250',maxW:u*2.8});});
  /* 계절 표시(궤도 안쪽) */
  if(o.tags)CONS.forEach(c=>{const x=cx+Math.cos(c.a)*OR*.7,y=cy+Math.sin(c.a)*OR*.7;K.box(g,x-u*.5,y-u*.27,u*1,u*.54,u*.27,SEASONC[c.season]);K.txt(g,c.season,x,y,{size:u*.3,color:'#1a1250'});});
  /* 지구에서 한밤중 하늘 방향 */
  const ex=cx+Math.cos(st.orb)*OR,ey=cy+Math.sin(st.orb)*OR;
  if(o.line){g.save();g.strokeStyle='rgba(255,224,130,.55)';g.lineWidth=2;g.setLineDash([u*.15,u*.2]);g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(st.orb)*Math.max(G.CRx,G.CRy)*1.05,cy+Math.sin(st.orb)*Math.max(G.CRx,G.CRy)*1.05);g.stroke();g.restore();}
  globe(g,ex,ey,u*.62,T*.8,st.orb);
  if(o.ring){g.save();g.strokeStyle=p.color;g.lineWidth=3;g.shadowColor=p.color;g.shadowBlur=u*.3;g.beginPath();g.arc(ex,ey,u*.8,0,TAU);g.stroke();g.restore();}
  K.txt(g,'밤',ex+Math.cos(st.orb)*u*1.2,ey+Math.sin(st.orb)*u*1.2,{size:u*.32,color:'#cfc6ff',stroke:'rgba(0,0,0,.6)',lw:3});
  return G;}

MS.place={
  init(p){const st=p.state,R=p.R;const c=p.deck(CONS,'cs');st.c=c;st.ci=CONS.indexOf(c);st.drag=false;let o=R.num(0,TAU);while(Math.abs(angd(o,c.a))<1.1)o=R.num(0,TAU);st.orb=o;st.res=false;st.idle=0;
    p.ask(`🔭 <b>${c.season}철</b> 한밤중 남쪽 하늘에 <b>${c.n}</b>${J(c.n,'이').slice(c.n.length)} 잘 보이게 지구를 옮겨요!`,'지구의 밤 쪽이 별자리를 향해야 해요 · 궤도를 따라 끌어요');p.tools([],()=>{});},
  down(p,x,y){const st=p.state;if(st.lock)return;const G=orbGeo(p);const ex=G.cx+Math.cos(st.orb)*G.OR,ey=G.cy+Math.sin(st.orb)*G.OR;
    if(Math.hypot(x-ex,y-ey)<G.u*1.8||Math.abs(Math.hypot(x-G.cx,y-G.cy)-G.OR)<G.u*1.1){st.drag=true;st.orb=Math.atan2(y-G.cy,x-G.cx);st.idle=0;}},
  move(p,x,y,down){const st=p.state;if(!down||!st.drag||st.lock)return;const G=orbGeo(p);const a=Math.atan2(y-G.cy,x-G.cx);if(Math.floor(a*3)!==st._m){st._m=Math.floor(a*3);p.Snd.tone(250+Math.random()*40,.02,'sine',.02);}st.orb=a;},
  up(p){const st=p.state;if(!st.drag)return;st.drag=false;if(st.lock)return;const c=st.c;const ok=nearA(st.orb,c.a,.42);
    if(ok){st.lock=true;st.orb=c.a;st.res=true;goodHit(p,150,p.W/2,p.H*.14,`<b>${c.season}철</b> 한밤중 남쪽 하늘: <b>${c.n}</b>. 지구의 밤 쪽이 ${c.n}를 향해요`);p.Snd.win();nextRound(p,1500);}
    else{st.lock=true;p.hit(false,{pen:25,x:p.W/2,y:p.H*.14,tip:`지구의 <b>밤 쪽</b>이 ${c.n}${J(c.n,'을').slice(c.n.length)} 향하게 놓아요. 태양 - 지구 - ${c.n}가 일직선이 돼요`,tipMs:3000,review:`${c.season}철 한밤중 남쪽 하늘의 별자리 → ${c.n} (태양 - 지구 - 별자리가 일직선일 때)`});setTimeout(()=>{st.lock=false;},700);}},
  draw(p,g,A,dt){const st=p.state;const a=intro(p);g.save();g.globalAlpha=a;
    const G=orbitScene(p,g,st,{hl:st.res?st.ci:null,line:st.drag||st.res,ring:!st.drag&&!st.lock,tags:true});
    nightBox(g,G,st.orb,st.T,true,st.res?st.ci:null);
    g.restore();}
};
function orbitChoice(kind){return{
  init(p){const st=p.state,R=p.R;const i=R.int(0,3);st.ci=i;st.orb=CONS[i].a+R.num(-.15,.15);st.rev=false;st.rt=0;st.lock=false;st.drag=false;st.res=false;
    const c=CONS[i];const order=R.shuffle([0,1,2,3]);const ans=kind==='see'?i:(i+2)%4;st.ansCon=ans;
    st.opts=order;
    if(kind==='see')p.ask('🔭 지구가 지금 이 자리에 있을 때, <b>한밤중 남쪽 하늘</b>에 보이는 별자리는?','지구의 밤 쪽이 향하는 곳을 찾아봐요');
    else p.ask('🔭 지구가 이 자리에 있을 때, 한밤중에 <b>볼 수 없는</b> 별자리는?','태양 때문에 낮 하늘에 가려진 쪽이에요');
    p.tools(order.map(k=>({t:CONS[k].n})),(bi)=>{if(st.lock||st.rev)return;st.lock=true;st.rev=true;st.rt=0;const pick=order[bi];const ok=pick===ans;
      const why=kind==='see'?`지구의 밤 쪽이 향하는 <b>${CONS[ans].n}</b>가 한밤중 남쪽 하늘에 보여요`:`태양 쪽에 있는 <b>${CONS[ans].n}</b>는 태양 빛에 가려 한밤중에는 볼 수 없어요`;
      if(ok)goodHit(p,120,p.W/2,p.H*.14,why);else p.hit(false,{x:p.W/2,y:p.H*.14,tip:'정답: <b>'+CONS[ans].n+'</b><br>'+why,tipMs:3600,review:(kind==='see'?'지구의 밤 쪽이 향하는 별자리가 한밤중에 보여요 → ':'태양 쪽 별자리는 한밤중에 볼 수 없어요 → ')+CONS[ans].n});
      p.Snd.slide(300,800,.3,.05);nextRound(p,3800);},{toggle:false});},
  draw(p,g,A,dt){const st=p.state;if(st.rev)st.rt+=dt;const a=intro(p);g.save();g.globalAlpha=a;
    const G=orbitScene(p,g,st,{hl:st.rev?st.ansCon:null,dim:null,line:st.rev&&kind==='see',tags:true});
    nightBox(g,G,st.orb,st.T,st.rev&&kind==='see',st.rev?st.ansCon:null);
    g.restore();}
};}
MS.see=orbitChoice('see');MS.hidden=orbitChoice('hidden');

/* ═════════ 자전·공전 구분하기 ═════════ */
const SORT=[
  ['낮과 밤이 생겨요',0,'지구가 <b>자전</b>하면서 태양을 향한 쪽은 낮, 반대쪽은 밤이 돼요'],
  ['하루(약 24시간)에 한 바퀴 돌아요',0,'<b>자전</b>은 하루에 한 바퀴 도는 거예요'],
  ['태양이 동쪽에서 서쪽으로 움직이는 것처럼 보여요',0,'지구가 서쪽에서 동쪽으로 <b>자전</b>해서 태양은 반대로 움직여 보여요'],
  ['별이 북극성 둘레를 도는 것처럼 보여요',0,'지구의 <b>자전</b> 때문에 별이 하루 동안 움직여 보여요'],
  ['지구가 자전축을 중심으로 돌아요',0,'자전축을 중심으로 도는 것이 <b>자전</b>이에요'],
  ['밤하늘의 별이 서쪽으로 지는 것처럼 보여요',0,'지구의 <b>자전</b> 때문에 별이 동쪽에서 떠서 서쪽으로 져요'],
  ['1년에 한 바퀴 돌아요',1,'<b>공전</b>은 지구가 태양 둘레를 1년에 한 바퀴 도는 거예요'],
  ['계절에 따라 보이는 별자리가 달라져요',1,'지구가 <b>공전</b>해서 밤에 향하는 별자리가 달라져요'],
  ['지구가 태양 둘레를 돌아요',1,'태양 둘레를 도는 것이 <b>공전</b>이에요'],
  ['봄에는 사자자리, 겨울에는 오리온자리가 보여요',1,'<b>공전</b>하면서 한밤중에 보이는 별자리가 바뀌어요'],
  ['지구가 서쪽에서 동쪽으로 태양 둘레를 돌아요',1,'태양 둘레를 도는 <b>공전</b>도 서쪽에서 동쪽 방향이에요'],
];
function wrapLines(g,s,maxW,size){g.font=K.font(size);const words=s.split(' ');const out=[];let cur='';words.forEach(w=>{const t=cur?cur+' '+w:w;if(g.measureText(t).width>maxW&&cur){out.push(cur);cur=w;}else cur=t;});if(cur)out.push(cur);return out;}
MS.sort={
  init(p){const st=p.state;const it=p.deck(SORT,'so');st.it=it;st.fly=null;st.lock=false;
    p.ask('🌏 이 현상은 <b>자전</b>일까요, <b>공전</b>일까요?','카드를 읽고 알맞은 쪽을 눌러요');
    p.tools([{e:'🌏',t:'자전'},{e:'☀️',t:'공전'}],(i)=>{if(st.lock)return;st.lock=true;const ok=i===st.it[1];st.fly={dir:i?1:-1,t:0,ok};
      if(ok)goodHit(p,90,p.W/2,p.H*.14,st.it[2]);else p.hit(false,{x:p.W/2,y:p.H*.14,tip:'정답은 <b>'+(st.it[1]?'공전':'자전')+'</b><br>'+st.it[2],tipMs:3200,review:`${st.it[0]} → ${st.it[1]?'공전':'자전'} (${plain(st.it[2])})`});
      nextRound(p,ok?1000:2300);},{toggle:false});},
  draw(p,g,A,dt){const st=p.state,u=p.u,T=st.T;const a=intro(p);g.save();g.globalAlpha=a;
    const land=A.w>A.h*1.05;const cy=A.h*.5;
    /* 양쪽 안내: 자전(제자리에서 빙글) / 공전(태양 둘레) */
    const ex=A.w*(land?.14:.2),ey=A.h*(land?.5:.78),er=Math.min(A.w*.12,A.h*.17);
    g.save();g.globalAlpha=a*.95;globe(g,ex,ey,er*.8,T*1.1,0);K.txt(g,'자전',ex,ey+er*1.25,{size:u*.5,color:'#9ff0e0',stroke:'rgba(0,0,0,.6)',lw:3});g.restore();
    const sx=A.w*(land?.86:.8),sy=ey;K.glow(g,sx,sy,er*1.1,'#ff9a3d',.5);g.fillStyle='#fff1b8';g.beginPath();g.arc(sx,sy,er*.3,0,TAU);g.fill();
    g.save();g.strokeStyle='rgba(190,170,255,.5)';g.lineWidth=2;g.setLineDash([6,8]);g.beginPath();g.ellipse(sx,sy,er*.9,er*.9,0,0,TAU);g.stroke();g.restore();
    const oa=-T*.8;globe(g,sx+Math.cos(oa)*er*.9,sy+Math.sin(oa)*er*.9,er*.26,T*2,oa);K.txt(g,'공전',sx,sy+er*1.25,{size:u*.5,color:'#ffd27a',stroke:'rgba(0,0,0,.6)',lw:3});
    /* 카드 */
    let cx=A.w/2,cyy=cy-(land?0:A.h*.1),rot=0,al=1;if(st.fly){st.fly.t+=dt;const k=easeIO(st.fly.t/.45);cx+=st.fly.dir*k*A.w*.34;cyy+=k*A.h*(land?0:.16);rot=st.fly.dir*k*.25;al=1-clamp((st.fly.t-.3)/.3,0,1);}
    const cw=Math.min(A.w*(land?.46:.84),u*13),ch=Math.min(A.h*(land?.5:.34),u*5.6);
    g.save();g.globalAlpha=a*al;g.translate(cx,cyy);g.rotate(rot);
    K.card(g,-cw/2,-ch/2,cw,ch,u*.4,'#f6f2ff',{blur:u*.6,dy:u*.2,stroke:'#a99cff',lw:3,hi:false});
    const fs=clamp(Math.min(ch*.17,cw*.075),14,34);const lines=wrapLines(g,st.it[0],cw*.86,fs);
    lines.forEach((l,i)=>K.txt(g,l,0,(i-(lines.length-1)/2)*fs*1.3,{size:fs,color:'#1a1250'}));
    K.box(g,-cw/2+u*.3,-ch/2-u*.3,u*2.2,u*.6,u*.3,'#7a63ff');K.txt(g,'관측 기록',-cw/2+u*1.4,-ch/2,{size:u*.32,color:'#fff'});
    g.restore();g.restore();}
};

/* ═════════ 게임 정의 ═════════ */
const IC={
  spin:'<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="12" fill="#2f7bff"/><path d="M13 14c3-3 8-3 10 0s0 5-3 5-3 4-6 3-4-5-1-8z" fill="#4cd37a"/><path d="M20 4a16 16 0 0 1 12 6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M33 5l-1 7-6-3z" fill="currentColor"/></svg>',
  rev:'<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="6" fill="#ffb347"/><ellipse cx="20" cy="20" rx="16" ry="10" fill="none" stroke="currentColor" stroke-width="2.4" stroke-dasharray="3 3"/><circle cx="34" cy="17" r="3.6" fill="#4da3ff"/></svg>',
  sort:'<svg viewBox="0 0 40 40"><rect x="5" y="9" width="30" height="22" rx="4" fill="none" stroke="currentColor" stroke-width="3"/><path d="M20 9v22" stroke="currentColor" stroke-width="2.5"/><circle cx="12.5" cy="20" r="3.5" fill="#4da3ff"/><circle cx="27.5" cy="20" r="3.5" fill="#ffb347"/></svg>',
  all:'<svg viewBox="0 0 40 40"><path d="M20 4l4.6 10.6 11.4 1-8.6 7.6 2.6 11.2L20 28.2 10 34.4l2.6-11.2L4 15.6l11.4-1z" fill="currentColor"/></svg>',
};
const MIS={time:MS.time,sky:MS.sky,trail:MS.trail,opp:MS.opp,place:MS.place,see:MS.see,hidden:MS.hidden,sort:MS.sort};
const KINDS={spin:['time','time','sky','trail','opp'],rev:['place','place','see','hidden'],sort:['sort'],all:['time','sky','trail','opp','place','see','hidden','sort']};
const GAME={
  id:'sci6-earth-observatory',title:'지구 돌리기',title1:'우주 관측소',title2:'지구 돌리기',emoji:LOGO,
  subtitle:'6학년 과학 · 지구의 운동',
  howto:'우주 관측소의 관측자가 되어 보세요! 지구를 <b>빙글 돌려</b> 낮과 밤을 만들고, <b>궤도</b>를 따라 옮겨 계절별 별자리를 찾아요. 맞힐 때마다 지구가 <b>한 달씩</b> 앞으로 나아가 1년 여행을 해요.',
  how(p){const m={spin:'지구를 <b>시계 반대 방향</b>으로 빙글 돌리고<br>별의 움직임·지구 반대편도 맞혀요',rev:'지구를 <b>궤도</b>를 따라 끌어서<br>계절별 별자리를 찾아요',sort:'카드의 현상이<br><b>자전</b>인지 <b>공전</b>인지 빠르게 골라요',all:'자전 · 공전 · 별자리 관측이<br><b>번갈아</b> 나와요'};return m[p.levelId]||'';},
  theme:{c1:'#ffa63d',c2:'#8f7dff'},
  txt:{who:'누구와 함께 관측할까요?',dur:'관측 시간',seat:'번 관측자 ',go:'관측 시작!',pickN:'몇 명이 할지 먼저 골라 주세요.',pickWho:'누구와 함께 할지 먼저 골라 주세요.'},
  durs:[90,120,180],vignette:.12,hero:heroScene,
  levelTitle:'관측할 내용 고르기',
  levels:[
    {id:'spin',g:'6학년 · 지구의 운동',t:'자전과 낮·밤',d:'지구 돌리기 · 별의 일주 운동',ic:IC.spin},
    {id:'rev',g:'6학년 · 지구의 운동',t:'공전과 계절별 별자리',d:'궤도에 지구 놓기 · 한밤중 별자리',ic:IC.rev},
    {id:'sort',g:'6학년 · 지구의 운동',t:'자전·공전 구분하기',d:'현상 카드 빠르게 분류',ic:IC.sort},
    {id:'all',g:'6학년 · 지구의 운동',t:'모두 섞기',d:'모든 관측이 번갈아 나와요',ic:IC.all},
  ],
  summary:`<ul><li><b>자전</b>: 지구가 자전축을 중심으로 하루에 한 바퀴, 서쪽에서 동쪽으로(북극 위에서 보면 시계 반대 방향) 도는 것 → 낮과 밤이 생겨요.</li>
    <li>자전 때문에 태양·달·별이 <b>동쪽에서 서쪽으로</b> 움직이는 것처럼 보여요. 북쪽 하늘의 별은 북극성을 중심으로 시계 반대 방향으로 돌아요.</li>
    <li><b>공전</b>: 지구가 태양 둘레를 1년에 한 바퀴, 서쪽에서 동쪽으로 도는 것 → 계절에 따라 한밤중에 보이는 별자리가 달라져요.</li>
    <li>한밤중 남쪽 하늘의 대표 별자리: 봄 사자자리 · 여름 백조자리 · 가을 페가수스자리 · 겨울 오리온자리 (태양 - 지구 - 별자리가 일직선일 때)</li>
    <li>한쪽이 낮이면 지구 반대편은 밤이에요. 우리나라가 정오일 때 반대편은 한밤중이에요.</li></ul>`,
  init(p){const st=p.state;st.T=0;this.round(p);},
  round(p){const st=p.state;const L=p.levelId;const k=p.deck(KINDS[L],'kinds');st.k=k;st.lock=false;st.t0=st.T||0;st.rev=false;st.drag=false;p.ctrl.innerHTML='';MIS[k].init(p);},
  draw(p,g,dt){bgScene(p,g,dt);const st=p.state;if(!st.k)return;MIS[st.k].draw(p,g,areaOf(p),dt);},
  down(p,x,y){const m=MIS[p.state.k];if(m&&m.down)m.down(p,x,y);},
  move(p,x,y,d){const m=MIS[p.state.k];if(m&&m.move)m.move(p,x,y,d);},
  up(p,x,y){const m=MIS[p.state.k];if(m&&m.up)m.up(p,x,y);},
};
Engine.boot(GAME);
