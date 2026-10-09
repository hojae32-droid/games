/* 5~6학년 실과 · 순서도 — 순서도 길잡이
   디자인: 청사진 설계도. 오늘의 상황을 읽고, 순서도의 마름모(조건)에서 [예]/[아니요]를 골라 말(🧍)을 도착 칸까지 걸어가게 해요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#eaf4ff',YEL='#ffd23f',BG='#10315c';
const LOGO=gkLogo('#10315c','#ffd23f','🔀');
const LV={
  '5':{g:'5~6학년',t:'5학년 갈림길 1개',d:'조건이 하나인 순서도'},
  '6':{g:'5~6학년',t:'6학년 갈림길 2개',d:'조건이 이어지는 순서도'},
};
/* [그림, 제목, [참 상황, 거짓 상황], 조건1, 예 행동, 아니요 행동, [참2, 거짓2], 조건2, 예2, 아니요2] */
const FW=[
      ['🚦','등굣길 횡단보도',['신호등이 초록불이에요','신호등이 빨간불이에요'],'신호등이 초록불인가요?','길을 건너요','멈춰서 기다려요',['차가 오고 있어요','차가 없어요'],'차가 오고 있나요?','차가 지나갈 때까지 기다려요','좌우를 살피고 건너요'],
      ['☔','외출 준비',['비가 와요','비가 오지 않아요'],'비가 오나요?','우산을 챙겨요','모자를 챙겨요',['바람이 세게 불어요','바람이 약해요'],'바람이 센가요?','우비를 입어요','우산을 써요'],
      ['🍜','라면 끓이기',['물이 보글보글 끓어요','물이 아직 차가워요'],'물이 끓나요?','면을 넣어요','더 기다려요',['면이 푹 익었어요','면이 덜 익었어요'],'면이 익었나요?','불을 끄고 그릇에 담아요','1분 더 끓여요'],
      ['📚','방과 후',['숙제가 있어요','숙제가 없어요'],'숙제가 있나요?','숙제를 먼저 해요','놀러 가요',['숙제를 다 끝냈어요','아직 못 끝냈어요'],'숙제를 끝냈나요?','놀러 가요','계속 숙제를 해요'],
      ['🌱','식물 돌보기',['흙이 바싹 말랐어요','흙이 촉촉해요'],'흙이 말랐나요?','물을 줘요','그대로 둬요',['햇빛이 잘 들어요','그늘이라 어두워요'],'햇빛이 잘 드나요?','그대로 둬요','밝은 곳으로 옮겨요'],
      ['♻️','쓰레기 버리기',['재활용할 수 있어요','재활용이 안 돼요'],'재활용할 수 있나요?','분리배출함에 넣어요','일반 쓰레기통에 넣어요',['깨끗하게 씻었어요','음식물이 묻어 있어요'],'깨끗하게 씻었나요?','분리배출함에 넣어요','씻어서 버려요'],
      ['🔋','태블릿 사용',['배터리가 5%예요','배터리가 90%예요'],'배터리가 부족한가요?','충전기를 연결해요','계속 사용해요',['충전기가 있어요','충전기가 없어요'],'충전기가 있나요?','충전해요','절전 모드로 바꿔요'],
      ['📖','도서관 책 빌리기',['책을 다 읽었어요','아직 다 못 읽었어요'],'책을 다 읽었나요?','반납하러 가요','계속 읽어요',['반납일이 지났어요','아직 반납일 전이에요'],'반납일이 지났나요?','사과하고 반납해요','제때 반납해요'],
    ];
function wrapKo(g,s,maxW){const out=[];let line='';for(const ch of String(s)){const t=line+ch;if(g.measureText(t).width>maxW&&line){out.push(line);line=ch===' '?'':ch;}else line=t;}if(line)out.push(line);return out;}
function hero(g,W,H,T,u){g.fillStyle=BG;g.fillRect(0,0,W,H);g.strokeStyle='rgba(255,255,255,.1)';g.lineWidth=1;for(let x=0;x<W;x+=u*.8){g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke();}for(let y=0;y<H;y+=u*.8){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}
  g.strokeStyle='#eaf4ff';g.lineWidth=3;const cx=W/2;g.beginPath();g.moveTo(cx,H*.18);g.lineTo(cx,H*.3);g.stroke();K.rr(g,cx-u*1.6,H*.1,u*3.2,u*.9,u*.45);g.stroke();K.txt(g,'시작',cx,H*.1+u*.45,{size:u*.5,color:INK});
  g.beginPath();g.moveTo(cx,H*.3);g.lineTo(cx+u*2,H*.45);g.lineTo(cx,H*.6);g.lineTo(cx-u*2,H*.45);g.closePath();g.fillStyle='rgba(255,210,63,.2)';g.fill();g.stroke();K.txt(g,'조건?',cx,H*.45,{size:u*.6,color:YEL});
  g.beginPath();g.moveTo(cx-u*2,H*.45);g.lineTo(W*.25,H*.45);g.lineTo(W*.25,H*.72);g.moveTo(cx+u*2,H*.45);g.lineTo(W*.75,H*.45);g.lineTo(W*.75,H*.72);g.stroke();
  [W*.25,W*.75].forEach(x=>{K.rr(g,x-u*1.8,H*.72,u*3.6,u*1.1,u*.2);g.stroke();});K.txt(g,'예',W*.37,H*.42,{size:u*.5,color:'#86efac'});K.txt(g,'아니요',W*.64,H*.42,{size:u*.5,color:'#fda4af'});
  const k=(T*.4)%1;K.emo(g,'🧍',cx+(W*.25-cx)*k*(k<.5?0:2*(k-.5))*0,H*.1+(H*.35)*Math.min(1,k*2),u*1);}
const GAME={
  id:'flowwalker',title:'순서도 길잡이',title1:'청사진 설계도',title2:'순서도 길잡이',emoji:LOGO,
  subtitle:'5~6학년 실과 · 순서도로 문제 해결하기',
  howto:'🔀 위에 <b>오늘의 상황</b>이 나와요. 순서도의 노란 <b>마름모(조건)</b>에서 상황에 맞게 <b>[예]</b> 또는 <b>[아니요]</b>를 눌러 말을 움직여요. 끝까지 따라가 도착한 칸이 오늘 내가 할 일이에요! 3번 연속이면 보너스!',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:'#2563eb',c2:YEL},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 순서도를 읽을까요?',
  txt:{who:'누가 길잡이일까요?',dur:'탐험 시간',pace:'생각하는 시간',seat:'번 길잡이 ',go:'출발!',s1:'1. 순서도',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li><b>순서도</b>는 어떤 일을 해결하는 순서를 그림 기호로 나타낸 것이에요. 둥근 칸은 시작·끝, 네모 칸은 할 일, <b>마름모는 조건</b>(예/아니요로 갈라지는 곳)이에요.</li>
    <li>조건이 맞으면 [예] 길로, 맞지 않으면 [아니요] 길로 가요. 갈림길이 이어지면 차례로 조건을 확인해요.</li>
    <li>일상의 선택(우산 챙기기, 횡단보도 건너기)도 순서도로 나타낼 수 있어요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.3,pad=u*.4,gap=u*.3;const two=p.levelId==='6';const bh=Math.min(u*2.4,H*.14);
    const btns=[{a:1,x:pad,y:H-pad-bh,w:(W-pad*2-gap)/2,h:bh},{a:0,x:pad+(W-pad*2-gap)/2+gap,y:H-pad-bh,w:(W-pad*2-gap)/2,h:bh}];
    const sit={x:pad,y:top,w:W-pad*2,h:Math.min(u*3.6,(H-top)*.2)};const ch={x:pad,y:sit.y+sit.h+gap,w:W-pad*2,h:H-pad-bh-gap-(sit.y+sit.h+gap)};
    const P=(nx,ny)=>({x:ch.x+nx*ch.w,y:ch.y+ny*ch.h});
    const N=two?{start:[.5,.07],d0:[.5,.28],d1:[.3,.56],x1n:[.82,.56],x2y:[.17,.88],x2n:[.47,.88],x1y:null}:{start:[.5,.09],d0:[.5,.38],x1y:[.2,.8],x1n:[.8,.8]};
    return{W,H,u,top,pad,btns,sit,ch,P,N,two};},
  init(p){const st=p.state;Object.assign(st,{T:0,f:null,facts:[],node:'d0',pawn:'start',pawnP:null,phase:'idle',t0:0,tries:0,wait:0,shake:0,hits:[],msg:'',done:false,a:true,b:true,count:0});this.next(p);},
  next(p){const st=p.state,R=p.R;const F=FW;st.f=p.deck(F,'fw');st.a=R.chance(.5);st.b=R.chance(.5);st.facts=[st.f[2][st.a?0:1]];st.node='d0';st.pawn='start';st.pawnT=0;st.phase='play';st.tries=0;st.t0=st.T;st.hits=[];st.done=false;st.wait=0;st.msg='';st.count++;
    p.ask('🔀 '+st.f[0]+' '+st.f[1],'상황에 맞게 예 · 아니요를 눌러요');},
  pos(p,id){const G=this.geo(p);const n=G.N[id];return n?G.P(n[0],n[1]):null;},
  update(p,dt){const st=p.state;st.T+=dt;if(st.shake>0)st.shake-=dt;st.pawnT=Math.min(1,(st.pawnT||0)+dt*2.2);if(st.wait>0){st.wait-=dt;if(st.wait<=0)this.next(p);}},
  answer(p,v){const st=p.state;if(st.phase!=='play'||st.done)return;const f=st.f;const want=st.node==='d0'?st.a:st.b;const G=this.geo(p);
    if((v===1)!==want){st.tries++;st.shake=.4;p.hit(false,{pen:15,shake:false,tip:'다시 상황을 읽어 봐요',tipMs:1100,x:G.btns[v?0:1].x+G.btns[0].w/2,y:G.btns[0].y,review:f[1]+': '+(st.node==='d0'?f[3]:f[7])+' → 상황 「'+st.facts[st.facts.length-1]+'」 이므로 ['+(want?'예':'아니요')+']'});return;}
    const el=st.T-st.t0;p.hit(true,{pts:st.tries?40:Math.round(50+50*Math.max(0,1-el/14)),x:G.btns[v?0:1].x+G.btns[0].w/2,y:G.btns[0].y});
    const from=st.node;let to;
    if(st.node==='d0'){if(!want)to='x1n';else if(!G.two)to='x1y';else to='d1';}else{to=want?'x2y':'x2n';}
    st.hits.push(from+(want?'y':'n'));st.pawnFrom=this.pos(p,st.pawn)||{x:0,y:0};st.pawn=from;st.pawnT=0;
    if(to==='d1'){st.node='d1';st.facts.push(f[6][st.b?0:1]);st.pawn='d0';st.pawnTo='d1';}
    else{st.node='end';st.done=true;st.endId=to;st.pawn=to;st.msg='도착! → '+({x1y:f[4],x1n:f[5],x2y:f[8],x2n:f[9]}[to]);st.wait=1.9;}
    st.pawnP={from:st.pawnFrom,t:0};},
  down(p,x,y){const G=this.geo(p);const b=G.btns.find(b=>K.inRect(x,y,b));if(b)this.answer(p,b.a);},
  botAct(p){const st=p.state;if(st.phase!=='play'||st.done)return null;const want=st.node==='d0'?st.a:st.b;const G=this.geo(p);const b=G.btns.find(b=>b.a===(want?1:0));const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+b.x+b.w/2,y:rc.top+b.y+b.h/2};},
  box(g,c,w,h,t,col,u,on,done,fill){const x=c.x-w/2,y=c.y-h/2;K.rr(g,x,y,w,h,Math.min(u*.3,h*.3));g.fillStyle=fill||'rgba(255,255,255,.07)';g.fill();g.lineWidth=on?4:2.5;g.strokeStyle=on?YEL:done?'#86efac':INK;g.stroke();
    const fs=Math.min(u*.55,h*.28);g.font=K.font(fs);g.fillStyle=done?'#bbf7d0':INK;g.textAlign='center';g.textBaseline='middle';const ls=wrapKo(g,t,w-u*.4);ls.slice(0,3).forEach((l,i)=>g.fillText(l,c.x,c.y+(i-(Math.min(ls.length,3)-1)/2)*fs*1.2));},
  dia(g,c,w,h,t,u,on,done){g.beginPath();g.moveTo(c.x,c.y-h/2);g.lineTo(c.x+w/2,c.y);g.lineTo(c.x,c.y+h/2);g.lineTo(c.x-w/2,c.y);g.closePath();g.fillStyle=on?'rgba(255,210,63,.25)':'rgba(255,210,63,.08)';g.fill();g.lineWidth=on?5:2.5;g.strokeStyle=on?YEL:done?'#86efac':INK;if(on){g.shadowColor=YEL;g.shadowBlur=u*.6;}g.stroke();g.shadowBlur=0;
    const fs=Math.min(u*.5,h*.2);g.font=K.font(fs);g.fillStyle=on?YEL:INK;g.textAlign='center';g.textBaseline='middle';const ls=wrapKo(g,t,w*.58);ls.slice(0,3).forEach((l,i)=>g.fillText(l,c.x,c.y+(i-(Math.min(ls.length,3)-1)/2)*fs*1.2));},
  line(g,a,b,lab,col,u,mid){g.strokeStyle=col;g.lineWidth=2.5;g.beginPath();g.moveTo(a.x,a.y);if(mid){g.lineTo(mid.x,mid.y);g.lineTo(b.x,b.y);}else g.lineTo(b.x,b.y);g.stroke();
    const e=mid||a;if(lab)K.txt(g,lab,(a.x+(mid?mid.x:b.x))/2,(a.y+(mid?mid.y:b.y))/2-u*.3,{size:u*.5,color:lab==='예'?'#86efac':'#fda4af',stroke:BG,lw:u*.1});},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,f=st.f;if(!f)return;
    g.fillStyle=BG;g.fillRect(0,0,W,H);g.strokeStyle='rgba(255,255,255,.07)';g.lineWidth=1;for(let x=0;x<W;x+=u*.8){g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke();}for(let y=0;y<H;y+=u*.8){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}
    /* 상황 카드 */
    const S=G.sit;K.card(g,S.x,S.y,S.w,S.h,u*.25,'#0a1f3d',{stroke:INK,lw:2,blur:0,dy:0});K.txt(g,f[0]+' '+f[1]+' · 오늘의 상황',S.x+u*.5,S.y+u*.55,{size:u*.42,color:YEL,align:'left',maxW:S.w-u});
    g.font=K.font(Math.min(u*.62,S.w/20));g.fillStyle='#fff';g.textAlign='left';g.textBaseline='middle';const fs2=Math.min(u*.62,S.w/20);st.facts.forEach((t,i)=>{g.fillText('• '+t,S.x+u*.6,S.y+u*1.3+i*fs2*1.35);});
    /* 순서도 */
    const N=G.N,P=id=>this.pos(p,id),bw=Math.min(G.ch.w*.27,u*6.5),bh=Math.min(G.ch.h*.18,u*2.4),dw=Math.min(G.ch.w*.46,u*10),dh=Math.min(G.ch.h*.28,u*3.6);
    const hit=k=>st.hits.includes(k);const on0=st.node==='d0'&&!st.done,on1=st.node==='d1'&&!st.done;
    const col=(k)=>hit(k)?'#86efac':INK;
    K.card(g,G.ch.x,G.ch.y,G.ch.w,G.ch.h,u*.2,'rgba(0,0,0,0)',{stroke:'rgba(255,255,255,.18)',lw:1,blur:0,dy:0});
    const s=P('start'),d0=P('d0');
    this.line(g,{x:s.x,y:s.y+u*.4},{x:d0.x,y:d0.y-dh/2},null,INK,u);
    if(G.two){const d1=P('d1'),x1n=P('x1n'),x2y=P('x2y'),x2n=P('x2n');
      this.line(g,{x:d0.x-dw/2,y:d0.y},{x:d1.x,y:d1.y-dh/2},'예',col('d0y'),u,{x:d1.x,y:d0.y});
      this.line(g,{x:d0.x+dw/2,y:d0.y},{x:x1n.x,y:x1n.y-bh/2},'아니요',col('d0n'),u,{x:x1n.x,y:d0.y});
      this.line(g,{x:d1.x-dw/2,y:d1.y},{x:x2y.x,y:x2y.y-bh/2},'예',col('d1y'),u,{x:x2y.x,y:d1.y});
      this.line(g,{x:d1.x+dw/2,y:d1.y},{x:x2n.x,y:x2n.y-bh/2},'아니요',col('d1n'),u,{x:x2n.x,y:d1.y});
      this.dia(g,d1,dw,dh,f[7],u,on1,hit('d0y')&&!on1);this.box(g,x1n,bw,bh,f[5],0,u,false,st.endId==='x1n',st.endId==='x1n'?'rgba(134,239,172,.25)':null);this.box(g,x2y,bw,bh,f[8],0,u,false,st.endId==='x2y',st.endId==='x2y'?'rgba(134,239,172,.25)':null);this.box(g,x2n,bw,bh,f[9],0,u,false,st.endId==='x2n',st.endId==='x2n'?'rgba(134,239,172,.25)':null);}
    else{const x1y=P('x1y'),x1n=P('x1n');
      this.line(g,{x:d0.x-dw/2,y:d0.y},{x:x1y.x,y:x1y.y-bh/2},'예',col('d0y'),u,{x:x1y.x,y:d0.y});
      this.line(g,{x:d0.x+dw/2,y:d0.y},{x:x1n.x,y:x1n.y-bh/2},'아니요',col('d0n'),u,{x:x1n.x,y:d0.y});
      this.box(g,x1y,bw,bh,f[4],0,u,false,st.endId==='x1y',st.endId==='x1y'?'rgba(134,239,172,.25)':null);this.box(g,x1n,bw,bh,f[5],0,u,false,st.endId==='x1n',st.endId==='x1n'?'rgba(134,239,172,.25)':null);}
    K.rr(g,s.x-u*1.5,s.y-u*.4,u*3,u*.8,u*.4);g.fillStyle='rgba(255,255,255,.1)';g.fill();g.lineWidth=2.5;g.strokeStyle=INK;g.stroke();K.txt(g,'시작',s.x,s.y,{size:u*.5,color:INK});
    this.dia(g,d0,dw,dh,f[3],u,on0,!on0);
    /* 말 */
    const tgt=this.pos(p,st.pawn)||s;let px=tgt.x,py=tgt.y;if(st.pawnFrom&&st.pawnT<1){const k=1-Math.pow(1-st.pawnT,3);px=st.pawnFrom.x+(tgt.x-st.pawnFrom.x)*k;py=st.pawnFrom.y+(tgt.y-st.pawnFrom.y)*k;}
    K.emo(g,'🧍',px,py-u*.2+Math.sin(st.T*6)*u*.05,u*1.1);
    if(st.msg)K.txt(g,'🎉 '+st.msg,W/2,G.ch.y+G.ch.h-u*.5,{size:u*.55,color:'#bbf7d0',stroke:BG,lw:u*.12,maxW:W*.92});
    G.btns.forEach(b=>{const sh=st.shake>0?Math.sin(st.shake*60)*u*.1:0;K.rr(g,b.x+sh,b.y,b.w,b.h,u*.25);g.fillStyle=b.a?'#14532d':'#7f1d1d';g.fill();g.lineWidth=3;g.strokeStyle=b.a?'#86efac':'#fda4af';g.stroke();K.txt(g,b.a?'예 (맞아요)':'아니요',b.x+b.w/2+sh,b.y+b.h/2,{size:Math.min(b.h*.45,u*1),color:'#fff',maxW:b.w*.9});});
  },
};
Engine.boot(GAME);
