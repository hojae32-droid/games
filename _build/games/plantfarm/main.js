/* 5~6학년 실과 · 식물 가꾸기 — 식물 키우기 농장
   디자인: 햇살 가득한 유리 온실의 화분 선반. 식물 위 말풍선(식물의 신호)을 읽고 알맞은 돌봄 버튼을 눌러 주세요. 제때 돌보지 않으면 하트가 줄고, 3번 잘 돌보면 꽃이 피어요! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#1f4d2b',GRN='#16a34a',ORG='#f59e0b';
const LOGO=gkLogo('#ffffff','#2f7a3f','🌻');
const LV={
  '5':{g:'5~6학년',t:'5학년 식물 돌보기',d:'물·햇빛·비료·벌레 4가지 돌봄'},
  '6':{g:'5~6학년',t:'6학년 식물 돌보기',d:'분갈이·가지치기가 더해진 6가지'},
};
const TOOLS_ALL=[['water','💧','물주기'],['sun','☀️','햇빛'],['feed','🧪','비료'],['bug','🐛','벌레'],['pot','🪴','분갈이'],['cut','✂️','가지치기']];
const SYM={
  water:['흙이 바싹 말랐어요','잎이 축 처졌어요','화분이 가벼워졌어요'],
  sun:['줄기가 가늘고 길게 웃자랐어요','잎 색이 연해졌어요','그늘에 있어 햇빛이 부족해요'],
  feed:['잎이 노랗게 변했어요','새 잎이 잘 나지 않아요','영양이 부족해 보여요'],
  bug:['잎에 벌레가 붙었어요','잎에 구멍이 났어요','진딧물이 생겼어요'],
  pot:['뿌리가 화분 밖으로 나왔어요','화분이 너무 좁아 보여요','뿌리가 꽉 차 있어요'],
  cut:['가지가 너무 빽빽해요','시든 잎이 많아요','웃자란 가지가 엉켜 있어요'],
};
const STG=['🌱','🌿','🪴','🌻'];
function wrapKo(g,s,maxW){const out=[];let line='';for(const ch of String(s)){const t=line+ch;if(g.measureText(t).width>maxW&&line){out.push(line);line=ch===' '?'':ch;}else line=t;}if(line)out.push(line);return out;}
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#bfe9ff','#eefaff']);g.strokeStyle='rgba(255,255,255,.9)';g.lineWidth=5;for(let i=1;i<6;i++){g.beginPath();g.moveTo(W*i/6,0);g.lineTo(W*i/6,H*.7);g.stroke();}g.fillStyle='#8a5a2b';g.fillRect(0,H*.7,W,H*.05);
  [[.22,'🌱'],[.5,'🌿'],[.78,'🌻']].forEach(([x,e],i)=>{g.fillStyle='#c8683a';g.beginPath();g.moveTo(W*x-u*1,H*.7-u*1.4);g.lineTo(W*x+u*1,H*.7-u*1.4);g.lineTo(W*x+u*.7,H*.7);g.lineTo(W*x-u*.7,H*.7);g.fill();K.emo(g,e,W*x,H*.7-u*2.3+Math.sin(T*2+i)*u*.1,u*1.8);});K.emo(g,'☀️',W*.88,H*.15,u*1.6);K.emo(g,'💧',W*.34+Math.sin(T*3)*u*.2,H*.4+((T*2)%1)*u,u*.6);}
const GAME={
  id:'plantfarm',title:'식물 키우기 농장',title1:'햇살 유리 온실',title2:'식물 키우기 농장',emoji:LOGO,
  subtitle:'5~6학년 실과 · 식물 가꾸기',
  howto:'🌻 화분 3개가 차례로 열려요. 식물 위 <b>말풍선(식물의 신호)</b>을 읽고 아래의 <b>알맞은 돌봄 버튼</b>을 눌러요. 제때 돌보지 않으면 하트 ❤️가 줄어요! 돌봄을 3번 성공하면 꽃이 피어 보너스! 빨리 돌볼수록 점수가 커요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:GRN,c2:ORG},hero:gkHero(hero),vignette:.02,durs:[120,180,300],levelTitle:'어떤 화분을 돌볼까요?',
  txt:{who:'누가 농부일까요?',dur:'농사 시간',pace:'식물의 인내심',seat:'번 농부 ',go:'농사 시작!',s1:'1. 농장',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li>식물은 <b>물·햇빛·양분(비료)·알맞은 온도</b>가 있어야 잘 자라요. 흙이 마르면 물을, 웃자라면 햇빛을 주어요.</li>
    <li>잎이 노랗고 새 잎이 안 나면 <b>양분(비료)</b>이 부족한 것이고, 잎에 벌레가 있으면 <b>벌레 잡기</b>를 해요.</li>
    <li>뿌리가 꽉 차면 더 큰 화분으로 <b>분갈이</b>를 하고, 가지가 빽빽하면 <b>가지치기</b>를 해요.</li></ul>`,
  tools(p){return TOOLS_ALL.slice(0,p.levelId==='5'?4:6);},
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.3,pad=u*.4,gap=u*.3;const land=W>=H*1.15;const tl=this.tools(p);const n=tl.length;const pots=[];
    for(let i=0;i<3;i++){let area;if(land){const w=(W-pad*2-gap*2)/3;area={x:pad+i*(w+gap),y:top,w,h:H-top-pad};}else{const h=(H-top-pad-gap*2)/3;area={x:pad,y:top+i*(h+gap),w:W-pad*2,h};}
      let plant,bub,tb;
      if(land){bub={x:area.x+area.w*.06,y:area.y+u*.1,w:area.w*.88,h:area.h*.2};plant={x:area.x+area.w/2,y:area.y+area.h*.43,r:Math.min(area.w*.13,area.h*.085)};const by=area.y+area.h*.64,bh=area.y+area.h-by-u*.1;tb=this.btnGrid(area.x+u*.2,by,area.w-u*.4,bh,n,2,u);}
      else{bub={x:area.x+area.w*.02,y:area.y+u*.1,w:area.w*.55,h:area.h*.4};plant={x:area.x+area.w*.3,y:area.y+area.h*.6,r:Math.min(area.h*.13,area.w*.085)};tb=this.btnGrid(area.x+area.w*.6,area.y+u*.1,area.w*.39,area.h-u*.2,n,2,u);}
      pots.push({area,bub,plant,tb});}
    return{W,H,u,top,pad,land,pots,tl};},
  btnGrid(x,y,w,h,n,cols,u){const rows=Math.ceil(n/cols),g=u*.15;const bw=(w-g*(cols-1))/cols,bh=(h-g*(rows-1))/rows;return Array.from({length:n},(_,i)=>({x:x+(i%cols)*(bw+g),y:y+Math.floor(i/cols)*(bh+g),w:bw,h:bh}));},
  init(p){const st=p.state;Object.assign(st,{T:0,flowers:0,pots:[0,1,2].map(i=>({i,open:false,need:null,sym:'',t0:0,due:0,next:0,hp:3,st:0,done:0,lim:12,msg:'',msgT:0,bob:0,wilt:0}))});const q=st.pots;const open=(k,d)=>{q[k].open=true;q[k].next=st.T+d;};open(0,1.2);st.o2=7;st.o3=16;p.ask('🌻 식물의 신호를 읽고 알맞은 돌봄을 눌러요','말풍선 → 알맞은 버튼');},
  pat(p){const st=p.state;return (p.levelId==='5'?14:11)-Math.min(4,st.T/60*4);},
  openPot(p,k,d){const st=p.state,q=st.pots[k];q.open=true;q.need=null;q.hp=3;q.st=0;q.done=0;q.msg='🌱 새싹이 자라요';q.next=st.T+d;q.wilt=0;},
  setNeed(p,q){const st=p.state,R=p.R;const keys=this.tools(p).map(t=>t[0]);const k=R.pick(keys);q.need=k;q.sym=R.pick(SYM[k]);q.t0=st.T;q.lim=this.pat(p);q.due=st.T+q.lim;q.msg='';},
  update(p,dt){const st=p.state,R=p.R,G=this.geo(p);st.T+=dt;if(st.o2&&st.T>=st.o2){st.o2=0;this.openPot(p,1,1.5);}if(st.o3&&st.T>=st.o3){st.o3=0;this.openPot(p,2,1.5);}
    st.pots.forEach((q,k)=>{if(!q.open)return;if(q.msgT>0)q.msgT-=dt;if(q.bob>0)q.bob-=dt;if(q.reopen&&st.T>=q.reopen){q.reopen=0;this.openPot(p,k,1.5);}
      if(q.wilt>0)return;
      if(!q.need){if(q.done<3&&q.next&&st.T>=q.next)this.setNeed(p,q);}
      else if(st.T>=q.due){const pp=G.pots[k];p.hit(false,{pen:15,shake:false,x:pp.plant.x,y:pp.plant.y,tip:'늦었어요! 하트가 줄었어요',tipMs:1000,review:'식물의 신호: 「'+q.sym+'」 → 알맞은 돌봄: '+TOOLS_ALL.find(t=>t[0]===q.need)[2]});q.hp--;q.need=null;
        if(q.hp<=0){q.wilt=1;q.msg='🥀 시들었어요… 새 씨앗을 심어요';q.reopen=st.T+1.8;}else{q.msg='😢 늦었어요! 하트가 줄었어요';q.msgT=1.2;q.next=st.T+1.2;}}});},
  down(p,x,y){const st=p.state,G=this.geo(p);for(let k=0;k<3;k++){const pp=G.pots[k],q=st.pots[k];const bi=pp.tb.findIndex(b=>K.inRect(x,y,b));if(bi<0)continue;if(!q.need||q.wilt>0)return;const tool=G.tl[bi];const b=pp.tb[bi];
      if(tool[0]===q.need){const el=st.T-q.t0;p.hit(true,{pts:Math.round(45+55*Math.max(0,1-el/q.lim)),x:b.x+b.w/2,y:b.y});q.need=null;q.done++;q.bob=.5;
        if(q.done>=3){q.st=3;q.msg='🌻 꽃이 피었어요!';st.flowers++;p.hit(true,{pts:80,x:pp.plant.x,y:pp.plant.y,tip:'🌻 꽃이 피었어요! 보너스'});q.reopen=st.T+1.8;q.next=0;q.open=true;}
        else{q.st=q.done;q.msg='👍 잘 자라고 있어요';q.next=st.T+1.2+p.R.f()*1.5;}}
      else{p.hit(false,{pen:10,shake:false,x:b.x+b.w/2,y:b.y,tip:'그 돌봄이 아니에요',tipMs:800,review:'식물의 신호: 「'+q.sym+'」 → 알맞은 돌봄: '+TOOLS_ALL.find(t=>t[0]===q.need)[2]+' (내가 누른 것: '+tool[2]+')'});q.badBtn=bi;q.badT=st.T;}return;}},
  botAct(p){const st=p.state,G=this.geo(p);const k=st.pots.findIndex(q=>q.need&&q.wilt<=0);if(k<0)return null;const q=st.pots[k];const bi=G.tl.findIndex(t=>t[0]===q.need);const b=G.pots[k].tb[bi];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+b.x+b.w/2,y:rc.top+b.y+b.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u;
    K.vgrad(g,0,0,W,H,['#bfe9ff','#eefaff','#c9f0c0']);g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=u*.12;for(let i=1;i<7;i++){g.beginPath();g.moveTo(W*i/7,0);g.lineTo(W*i/7,H);g.stroke();}K.emo(g,'☀️',W*.93,(p.top||0)+u*.2,u*1.1);
    G.pots.forEach((pp,k)=>{const q=st.pots[k],A=pp.area;K.card(g,A.x,A.y,A.w,A.h,u*.3,'rgba(255,255,255,.55)',{stroke:'#2f7a3f',lw:3,blur:0,dy:u*.05,sc:'#1f5a2b'});
      if(!q.open){K.txt(g,'🔒 곧 열려요',A.x+A.w/2,A.y+A.h/2,{size:u*.7,color:'#4b7a57',maxW:A.w*.8});return;}
      /* 말풍선 */
      const B=pp.bub;K.card(g,B.x,B.y,B.w,B.h,u*.25,q.need?'#fff':'#f0faf2',{stroke:q.need&&q.due-st.T<q.lim*.25?'#dc2626':'#2f7a3f',lw:3,blur:0,dy:0});
      const txt=q.need?q.sym:q.msg||'…';g.font=K.font(Math.min(u*.62,B.h*.3));const fs=Math.min(u*.62,B.h*.3);g.fillStyle=q.need?INK:'#4b7a57';g.textAlign='center';g.textBaseline='middle';const ls=wrapKo(g,txt,B.w-u*.5);ls.slice(0,3).forEach((l,i)=>g.fillText(l,B.x+B.w/2,B.y+B.h*.45+(i-(Math.min(ls.length,3)-1)/2)*fs*1.1));
      if(q.need){const f=Math.max(0,(q.due-st.T)/q.lim);K.rr(g,B.x+u*.3,B.y+B.h-u*.3,B.w-u*.6,u*.16,u*.08);g.fillStyle='rgba(0,0,0,.12)';g.fill();K.rr(g,B.x+u*.3,B.y+B.h-u*.3,Math.max(u*.16,(B.w-u*.6)*f),u*.16,u*.08);g.fillStyle=f<.3?'#dc2626':f<.55?'#f59e0b':GRN;g.fill();}
      /* 식물과 화분 */
      const P=pp.plant,r=P.r;g.fillStyle='#c8683a';g.strokeStyle='#8a4a22';g.lineWidth=3;g.beginPath();g.moveTo(P.x-r*1.1,P.y+r*.5);g.lineTo(P.x+r*1.1,P.y+r*.5);g.lineTo(P.x+r*.8,P.y+r*1.6);g.lineTo(P.x-r*.8,P.y+r*1.6);g.closePath();g.fill();g.stroke();
      const bob=q.bob>0?Math.sin(q.bob*30)*r*.12:0;K.emo(g,q.wilt>0?'🥀':STG[q.st],P.x,P.y-r*.5+bob,r*(q.st===3?2.4:2));
      K.txt(g,'❤️'.repeat(q.hp)+'🖤'.repeat(3-q.hp),P.x,P.y+r*2.1,{size:Math.min(r*.7,u*.6),maxW:r*3.2});
      pp.tb.forEach((b,bi)=>{const t=G.tl[bi];const bad=q.badBtn===bi&&st.T-q.badT<.4;const sh=bad?Math.sin((st.T-q.badT)*60)*u*.08:0;K.rr(g,b.x+sh,b.y,b.w,b.h,u*.2);g.fillStyle=bad?'#fecaca':q.need?'#fff':'#e8f3ea';g.fill();g.lineWidth=2.5;g.strokeStyle=bad?'#dc2626':'#2f7a3f';g.stroke();
        K.emo(g,t[1],b.x+b.w/2+sh,b.y+b.h*.36,Math.min(b.h*.45,b.w*.4));K.txt(g,t[2],b.x+b.w/2+sh,b.y+b.h*.78,{size:Math.min(b.h*.22,u*.6),color:INK,maxW:b.w*.92});});});
    K.card(g,W-u*4.1,H-u*.95,u*3.8,u*.7,u*.3,'rgba(255,255,255,.95)',{stroke:'#2f7a3f',lw:3,blur:0,dy:0});K.txt(g,'🌻 '+st.flowers+'송이',W-u*4.1+u*1.9,H-u*.6,{size:u*.45,color:INK,maxW:u*3.4});
  },
};
Engine.boot(GAME);
