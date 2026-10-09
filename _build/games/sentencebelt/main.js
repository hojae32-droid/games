/* 4~6학년 영어 · 문장 만들기 — 문장 컨베이어
   디자인: 불빛 환한 회전 초밥집. 위 메뉴판의 우리말 뜻에 맞게, 돌아가는 접시 위의 영어 낱말을 순서대로 집어 문장을 완성해요. 가짜 접시도 섞여 있어요! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#fff4e0',RED='#ef4444',NAVY='#1a2a4a';
const LOGO=gkLogo('#233a63','#fff4e0','🍣');
const COL=['#FFD166','#EF476F','#06D6A0','#74C0FC','#C4A1FF','#FFA94D'];
const LV={
  '4':{g:'4~6학년',t:'4학년 문장',d:'쉬운 문장 · 느린 벨트 · 가짜 접시 2개'},
  '5':{g:'4~6학년',t:'5학년 문장',d:'진행·시간·장소 · 가짜 접시 3개'},
  '6':{g:'4~6학년',t:'6학년 문장',d:'과거·미래·이유 · 빠른 벨트 · 가짜 4개'},
};
const CFG={'4':{sp:.09,dec:2},'5':{sp:.12,dec:3},'6':{sp:.15,dec:4}};
const SB={
      '4':[['I like apples.','나는 사과를 좋아해요.'],['She has a red bag.','그녀는 빨간 가방이 있어요.'],['We go to school.','우리는 학교에 가요.'],['He can swim well.','그는 수영을 잘해요.'],['This is my cat.','이것은 내 고양이예요.'],['I am happy today.','나는 오늘 행복해요.'],['They play soccer.','그들은 축구를 해요.'],['Open the door, please.','문을 열어 주세요.'],['My mother is a nurse.','우리 어머니는 간호사예요.'],['What is your name?','네 이름이 뭐니?'],['I have two dogs.','나는 개가 두 마리 있어요.'],['Where is my pen?','내 펜은 어디에 있나요?'],['Do you like pizza?','너는 피자를 좋아하니?'],['It is a big tree.','그것은 큰 나무예요.']],
      '5':[['She is reading a book now.','그녀는 지금 책을 읽고 있어요.'],['I get up at seven.','나는 7시에 일어나요.'],['He does not like carrots.','그는 당근을 좋아하지 않아요.'],['What time is it?','몇 시예요?'],['Can you help me, please?','저를 도와줄 수 있나요?'],['We are going to the park.','우리는 공원에 가는 중이에요.'],['How much is this cap?','이 모자는 얼마예요?'],['There are three apples on the table.','탁자 위에 사과가 세 개 있어요.'],['My brother is taller than me.','내 형(동생)은 나보다 키가 커요.'],['I usually eat breakfast at home.','나는 보통 집에서 아침을 먹어요.'],['Is she your teacher?','그녀는 네 선생님이니?'],['Turn left at the bank.','은행에서 왼쪽으로 도세요.'],['Let us play baseball after school.','방과 후에 야구하자.'],['Which color do you like?','너는 어떤 색을 좋아하니?']],
      '6':[['I visited my grandmother yesterday.','나는 어제 할머니를 방문했어요.'],['What did you do last weekend?','지난 주말에 뭐 했어?'],['He is going to be a doctor.','그는 의사가 될 거예요.'],['She wants to join the science club.','그녀는 과학 동아리에 들어가고 싶어 해요.'],['I am good at drawing pictures.','나는 그림 그리기를 잘해요.'],['You should wash your hands before lunch.','점심 전에 손을 씻어야 해요.'],['We have to keep the classroom clean.','우리는 교실을 깨끗하게 해야 해요.'],['Who is the tallest student in your class?','너희 반에서 키가 가장 큰 학생은 누구니?'],['Please tell me the way to the museum.','박물관 가는 길을 알려 주세요.'],['They were watching TV when I came home.','내가 집에 왔을 때 그들은 TV를 보고 있었어요.'],['I want to be a scientist because I like space.','나는 우주를 좋아해서 과학자가 되고 싶어요.'],['How long does it take to get there?','거기까지 얼마나 걸리나요?'],['My favorite subject is science.','내가 가장 좋아하는 과목은 과학이에요.'],['Do not run in the hallway.','복도에서 뛰지 마세요.']],
    };

const MCV=document.createElement('canvas').getContext('2d');
function hero(g,W,H,T,u){g.fillStyle='#1a2a4a';g.fillRect(0,0,W,H);for(let i=0;i<9;i++){g.fillStyle=i%2?'#ef4444':'#fff4e0';g.fillRect(i*W/9,0,W/9,u*1.2);}
  g.fillStyle='#4a2f1a';g.fillRect(0,H*.55,W,u*1.8);['I like apples.','She has a bag.'].forEach((t,li)=>{const y=H*.55+u*.9+li*u*1.2;});
  ['I','like','apples','cat','run'].forEach((w,i)=>{const x=((i*W*.22+T*u*3)%(W+u*3))-u*1.5;K.card(g,x-u*1.3,H*.58,u*2.6,u*1.1,u*.55,COL[i%COL.length],{stroke:'#fff',lw:3,blur:0,dy:u*.06});K.txt(g,w,x,H*.58+u*.55,{size:u*.6,color:'#1a2a4a',maxW:u*2.3});});
  K.emo(g,'🍣',W*.2,H*.3,u*1.5);K.emo(g,'🍱',W*.5,H*.28+Math.sin(T*3)*u*.1,u*1.6);K.emo(g,'🥢',W*.8,H*.3,u*1.4);}
const GAME={
  id:'sentencebelt',title:'문장 컨베이어',title1:'회전 초밥집',title2:'문장 컨베이어',emoji:LOGO,
  subtitle:'4~6학년 영어 · 낱말을 순서대로 문장 만들기',
  howto:'🍣 위의 우리말 뜻에 맞게, 벨트 위를 지나가는 <b>영어 낱말 접시를 순서대로</b> 눌러 문장을 만들어요. 깜빡이는 칸이 다음 낱말 자리예요. 틀린 접시를 누르면 감점이고, 문장을 빨리 만들수록 점수가 커요!',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:RED,c2:'#fde047'},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 메뉴를 만들까요?',
  txt:{who:'누가 요리사일까요?',dur:'영업 시간',pace:'벨트 속도',seat:'번 요리사 ',go:'영업 시작!',s1:'1. 메뉴',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li>영어 문장은 보통 <b>누가(주어) → 어찌한다(동사) → 무엇을/어디서(나머지)</b> 순서로 말해요. 우리말과 순서가 달라요.</li>
    <li>문장의 첫 글자는 <b>대문자</b>로 쓰고, 끝에는 마침표(.)나 물음표(?)를 써요.</li>
    <li>I am(나는 ~이다), She has(그녀는 ~를 가지고 있다)처럼 자주 쓰는 짝꿍 낱말을 외워 두면 편해요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.3,pad=u*.4,gap=u*.3;const menu={x:pad,y:top,w:W-pad*2,h:Math.min(u*2.2,H*.12)};const sl={x:pad,y:menu.y+menu.h+gap,w:W-pad*2,h:Math.min(u*2.2,H*.12)};
    const bt=sl.y+sl.h+gap*1.5;const bh=(H-pad-bt-gap)/2;const lanes=[{x:pad,y:bt,w:W-pad*2,h:bh},{x:pad,y:bt+bh+gap,w:W-pad*2,h:bh}];return{W,H,u,top,pad,menu,sl,lanes,fs:Math.min(bh*.34,u*1.1)};},
  init(p){const st=p.state;Object.assign(st,{T:0,cur:null,pos:0,blocks:[],phase:'idle',t0:0,lim:20,mist:0,wait:0,bag:null,flash:0,built:false});this.next(p);},
  next(p){const st=p.state,R=p.R,deck=p.levelId;const S=SB[deck];if(!st.bag)st.bag=EN.bag(S,()=>R.f());const it=st.bag();const ws=it[0].split(' ');st.cur={ws,ko:it[1],en:it[0]};st.pos=0;st.mist=0;st.lim=10+ws.length*3.2;st.t0=st.T;st.phase='play';st.wait=0;
    const ALL=S.map(x=>x[0].split(' ')).flat();const dec=[];let tr=0;while(dec.length<CFG[deck].dec&&tr++<60){const w=R.pick(ALL);if(!ws.includes(w)&&!dec.includes(w))dec.push(w);}
    const words=EN.shuffle(ws.concat(dec),()=>R.f());st.blocks=words.map((w,i)=>({w,lane:i%2,x:0,wd:0,dead:false,col:COL[i%COL.length]}));st.built=false;p.ask('🍣 '+it[1],'낱말을 순서대로 집어요');enSay(it[0],.7);},
  buildLane(p){const st=p.state,G=this.geo(p);MCV.font=K.font(G.fs);st.blocks.forEach(b=>{b.wd=MCV.measureText(b.w).width+G.fs*1.3;});
    [0,1].forEach(li=>{const bl=st.blocks.filter(b=>b.lane===li);const lw=G.lanes[li].w;const sum=bl.reduce((a,b)=>a+b.wd,0);const gp=Math.max(G.fs*.7,(lw*1.25-sum)/Math.max(1,bl.length));let x=p.R.f()*lw*.3;bl.forEach(b=>{b.x=x;x+=b.wd+gp;});st.tot=st.tot||[];st.tot[li]=Math.max(x,lw+40);});st.built=true;},
  update(p,dt){const st=p.state,G=this.geo(p);st.T+=dt;if(st.flash>0)st.flash-=dt;if(!st.built&&st.cur)this.buildLane(p);const cfg=CFG[p.levelId];
    st.blocks.forEach(b=>{if(b.dead)return;const lw=G.lanes[b.lane].w;b.x-=lw*cfg.sp*dt*(b.lane?1.25:1)*p.pace;if(b.x<-b.wd-4)b.x+=st.tot[b.lane];});
    if(st.phase==='play'&&st.T-st.t0>st.lim){st.phase='wait';st.wait=2.2;p.hit(false,{pen:10,shake:false,tip:'시간이 다 됐어요',tipMs:1200,review:st.cur.ko+' → '+st.cur.en});st.pos=st.cur.ws.length;st.reveal=true;}
    if(st.wait>0){st.wait-=dt;if(st.wait<=0){st.reveal=false;this.next(p);}}},
  down(p,x,y){const st=p.state,G=this.geo(p);if(st.phase!=='play')return;for(let li=0;li<2;li++){const L=G.lanes[li];if(y<L.y||y>L.y+L.h)continue;for(const b of st.blocks){if(b.dead||b.lane!==li)continue;const bx=L.x+b.x;if(x>=bx&&x<=bx+b.wd){this.take(p,b);return;}}}},
  take(p,b){const st=p.state,G=this.geo(p);if(b.w===st.cur.ws[st.pos]){b.dead=true;st.pos++;p.Snd.tone&&p.Snd.tone(600+st.pos*80,.07,'sine',.05);enSay(b.w,.8);
      if(st.pos>=st.cur.ws.length){st.phase='wait';st.wait=1.5;st.flash=.3;const el=st.T-st.t0;p.hit(true,{pts:st.mist?50:EN.pts(Math.min(el,st.lim),st.lim),x:G.W/2,y:G.sl.y});setTimeout(()=>enSay(st.cur.en,.8),200);}}
    else{st.mist++;b.shake=.3;const L=G.lanes[b.lane];p.hit(false,{pen:10,shake:false,x:L.x+b.x+b.wd/2,y:L.y,tip:'순서가 달라요',tipMs:800,review:st.cur.ko+' → '+st.cur.en+' (다음 낱말은 「'+st.cur.ws[st.pos]+'」)'});}},
  botAct(p){const st=p.state,G=this.geo(p);if(st.phase!=='play')return null;const b=st.blocks.find(b=>!b.dead&&b.w===st.cur.ws[st.pos]&&G.lanes[b.lane].x+b.x>G.lanes[0].x+5&&b.x+b.wd<G.lanes[b.lane].w-5);if(!b)return null;const L=G.lanes[b.lane];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+L.x+b.x+b.wd/2,y:rc.top+L.y+L.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,C=st.cur;if(!C)return;
    g.fillStyle='#1a2a4a';g.fillRect(0,0,W,H);for(let i=0;i<Math.ceil(W/(u*2));i++){g.fillStyle=i%2?'#ef4444':'#fff4e0';g.fillRect(i*u*2,0,u*2,u*.35);}
    const M=G.menu;K.card(g,M.x,M.y,M.w,M.h,u*.25,'#fff4e0',{stroke:'#0e1830',lw:3,blur:0,dy:u*.06,sc:'#0a1224'});K.txt(g,'🍽️ '+C.ko,M.x+M.w/2,M.y+M.h/2,{size:Math.min(u*1.1,M.w/Math.max(10,C.ko.length)*1.5),color:'#1a2a4a',maxW:M.w*.94});
    const S=G.sl;const n=C.ws.length;const gp=u*.2;const lens=C.ws.map(w=>w.length+1.5);const tot=lens.reduce((a,b)=>a+b,0);const unit=(S.w-gp*(n-1))/tot;let x=S.x;
    C.ws.forEach((w,i)=>{const sw=lens[i]*unit;const filled=i<st.pos;const next=i===st.pos&&st.phase==='play';K.rr(g,x,S.y,sw,S.h,u*.2);g.fillStyle=filled?'#fde68a':next&&Math.floor(st.T*3)%2?'#fecdd3':'#2a4577';g.fill();g.lineWidth=next?4:2;g.strokeStyle=next?RED:'#fff4e0';g.stroke();if(filled)K.txt(g,w,x+sw/2,S.y+S.h/2,{size:Math.min(S.h*.5,sw/Math.max(2,w.length)*1.6),color:'#1a2a4a',maxW:sw*.94});x+=sw+gp;});
    G.lanes.forEach((L,li)=>{g.fillStyle='#4a2f1a';K.rr(g,L.x,L.y,L.w,L.h,u*.2);g.fill();g.fillStyle='#6a4526';g.fillRect(L.x,L.y+L.h*.86,L.w,L.h*.14);for(let k=0;k<30;k++){g.fillStyle='rgba(0,0,0,.18)';g.fillRect(L.x+((k*47+(li?st.T*-60:st.T*60))%(L.w+60)+L.w+60)%(L.w+60)-30,L.y+L.h*.9,10,3);}
      g.save();K.rr(g,L.x,L.y,L.w,L.h,u*.2);g.clip();st.blocks.forEach(b=>{if(b.lane!==li||b.dead)return;const bx=L.x+b.x,by=L.y+L.h*.12,bh=L.h*.72;const sh=b.shake>0?Math.sin(b.shake*60)*u*.1:0;if(b.shake>0)b.shake-=.016;K.rr(g,bx+sh,by,b.wd,bh,bh/2);g.fillStyle=b.col;g.fill();g.lineWidth=3;g.strokeStyle='#fff';g.stroke();K.txt(g,b.w,bx+b.wd/2+sh,by+bh/2,{size:G.fs,color:'#1a2a4a',maxW:b.wd*.92});});g.restore();});
    if(st.phase==='play')QZ.bar(g,G.sl.x,G.sl.y+G.sl.h+u*.05,G.sl.w,Math.max(5,u*.15),Math.max(0,1-(st.T-st.t0)/st.lim),{good:RED});
    if(st.reveal)K.txt(g,C.en,W/2,G.sl.y+G.sl.h/2,{size:Math.min(u*.9,W/Math.max(10,C.en.length)*1.6),color:'#fff4e0',stroke:'#0e1830',lw:u*.14,maxW:W*.9});
    if(st.flash>0){g.fillStyle='rgba(255,255,255,'+st.flash*.6+')';g.fillRect(0,0,W,H);}
  },
};
Engine.boot(GAME);
