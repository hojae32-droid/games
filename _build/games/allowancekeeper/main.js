/* 5~6학년 실과 · 알뜰한 소비 생활 — 용돈 지킴이
   디자인: 초록 시장의 장바구니와 영수증. 상황을 읽고 꼭 필요한 물건만 장바구니에 담아 용돈 안에서 계산해요. 6학년은 할인율과 저축 목표까지! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#2f4a1a',GRN='#16a34a',ORG='#f97316';
const LOGO=gkLogo('#fffdf2','#2f6b1f','🛒');
const won=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,',')+'원';
const LV={
  '5':{g:'5~6학년',t:'필요한 것 vs 원하는 것',d:'용돈 안에서 꼭 필요한 물건 사기'},
  '6':{g:'5~6학년',t:'알뜰 소비 + 저축',d:'할인율 계산과 저축 목표'},
};
const AKD=[
      ['🎨','내일 미술 시간에 쓸 준비물을 사요.',[['색연필',2000,'🖍️'],['도화지',1500,'📄'],['물감',3000,'🎨'],['붓',1500,'🖌️'],['가위',1000,'✂️']],[['캐릭터 스티커',1000,'⭐'],['젤리',1200,'🍬'],['로봇 장난감',3500,'🤖'],['예쁜 필통',4000,'👝'],['게임 아이템',2000,'🎮'],['과자',1500,'🍪']]],
      ['🧺','내일 소풍에 가져갈 것을 사요.',[['도시락 재료',3000,'🍙'],['물',1000,'💧'],['돗자리',2500,'🧺'],['모자',2000,'🧢']],[['인형',3000,'🧸'],['아이스크림',1500,'🍦'],['만화책',3000,'📚'],['탄산음료',1500,'🥤'],['장난감 총',3500,'🔫']]],
      ['✏️','새 학기 학용품을 사요.',[['공책',2000,'📓'],['연필',1000,'✏️'],['지우개',500,'🧽'],['자',800,'📏'],['필통',2500,'👝']],[['캐릭터 스티커',1000,'⭐'],['사탕',1000,'🍭'],['팽이',2500,'🌀'],['카드 게임',3000,'🃏'],['슬러시',1800,'🧊']]],
      ['🎁','친구 생일 선물을 준비해요.',[['선물',3500,'🎁'],['포장지',1000,'🎀'],['축하 카드',500,'💌']],[['내 간식',2000,'🍩'],['게임 머니',3000,'🎮'],['슬라임',2500,'🫧'],['새 장난감',4000,'🚗'],['아이스크림',1500,'🍦']]],
      ['🏃','운동회 준비물을 사요.',[['물통',2500,'🥤'],['수건',2000,'🧣'],['머리띠',1500,'🎗️'],['운동화 끈',1000,'👟']],[['탄산음료',1500,'🥤'],['과자',1500,'🍪'],['연예인 카드',2500,'🃏'],['새 게임기',6000,'🕹️'],['풍선껌',500,'🫧']]],
    ];
function hero(g,W,H,T,u){g.fillStyle='#cfe8b0';g.fillRect(0,0,W,H);for(let i=0;i<10;i++){g.fillStyle=i%2?'#e8f5d8':'#dcefc3';g.fillRect(i*W/10,0,W/10,H);}
  g.fillStyle='#fff';g.fillRect(0,H*.7,W,H*.3);const bx=W/2-u*3,by=H*.45;K.card(g,bx,by,u*6,u*3.6,u*.4,'#fff7e0',{stroke:'#2f6b1f',lw:5,blur:0,dy:u*.1,sc:'#24541a'});g.strokeStyle='#2f6b1f';g.lineWidth=6;g.beginPath();g.arc(W/2,by,u*1.5,Math.PI,0);g.stroke();
  ['🍎','📓','✏️','🧃'].forEach((e,i)=>K.emo(g,e,bx+u*(.9+i*1.4),by-u*.3+Math.sin(T*3+i)*u*.12,u*1.1));K.txt(g,'용돈 5,000원',W/2,by+u*2,{size:u*.8,color:'#2f4a1a'});}
const GAME={
  id:'allowancekeeper',title:'용돈 지킴이',title1:'초록 시장 장바구니',title2:'용돈 지킴이',emoji:LOGO,
  subtitle:'5~6학년 실과 · 알뜰한 소비 생활',
  howto:'🛒 상황을 읽고 <b>꼭 필요한 물건(준비물)</b>을 모두 장바구니에 담아요. <b>용돈보다 많이 쓰면 안 돼요!</b> 갖고 싶은 것은 남는 돈이 있을 때만 사요. 6학년은 <b>할인율</b>을 직접 계산하고 <b>저축 목표</b>도 지켜요. 다 담았으면 [계산하기]!',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:GRN,c2:ORG},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 장보기를 할까요?',
  txt:{who:'누가 장을 볼까요?',dur:'장보기 시간',pace:'생각하는 시간',seat:'번 손님 ',go:'장보기 시작!',s1:'1. 장보기',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li><b>필요한 것</b>은 꼭 있어야 하는 것(준비물, 학용품), <b>원하는 것</b>은 갖고 싶지만 없어도 되는 것이에요. 먼저 필요한 것을 사고, 남은 돈으로 원하는 것을 정해요.</li>
    <li><b>할인가</b> = 원래 가격 × (100 − 할인율) ÷ 100. 20% 할인된 2,500원짜리는 2,000원이에요.</li>
    <li><b>저축</b>은 쓰고 남은 돈을 모으는 것이 아니라 <b>미리 정해 두고 지키는 것</b>이에요. 용돈 − 쓴 돈 ≥ 저축 목표!</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.3,pad=u*.4,gap=u*.3,q=p.state.q;const land=W>=H*1.15;const n=q?q.items.length:8;const bh=Math.min(u*2.2,H*.12);
    let gridR,rec,btn;
    if(land){gridR={x:pad,y:top,w:W*.62-pad,h:H-top-pad};rec={x:W*.62+pad,y:top,w:W*.38-pad*2,h:H-top-pad-bh-gap};btn={x:rec.x,y:H-pad-bh,w:rec.w,h:bh};}
    else{const rh=Math.min(u*5.6,(H-top)*.22);gridR={x:pad,y:top,w:W-pad*2,h:H-top-pad-rh-bh-gap*2};rec={x:pad,y:gridR.y+gridR.h+gap,w:W-pad*2,h:rh};btn={x:pad,y:H-pad-bh,w:W-pad*2,h:bh};}
    const info=u*1.7;const cols=land?3:3;const cells=QK.grid(gridR.w+gridR.x*2,gridR.y+info,gridR.y+gridR.h,n,cols,gridR.x,u*.25);
    return{W,H,u,top,pad,land,gridR,info,cells,rec,btn};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,okFlag:false,sel:new Set(),tries:0,msg:'',msgT:0,shake:0});this.newQ(p);},
  make(p,L){const R=p.R,t=p.deck(AKD,'ak');const deck=L;
    const nn=3+R.int(0,Math.min(2,t[2].length-2)-1+1);const needs=R.shuffle(t[2]).slice(0,deck==='5'?Math.min(nn,4):Math.min(nn+1,t[2].length)).map(x=>({n:x[0],base:x[1],e:x[2],need:true}));
    const wants=R.shuffle(t[3]).slice(0,Math.min(5,10-needs.length-(needs.length>3?0:1))).map(x=>({n:x[0],base:x[1],e:x[2],need:false}));let items=needs.concat(wants);
    if(deck==='6'){R.shuffle(items.map((_,i)=>i)).slice(0,3).forEach(i=>{items[i].sale=R.pick([10,20,30,50]);});}
    items.forEach(it=>{it.p=it.sale?Math.round(it.base*(100-it.sale)/100):it.base;});
    const need=items.filter(i=>i.need).reduce((a,i)=>a+i.p,0);const extra=deck==='5'?R.pick([500,1000,1500,2000]):0;const save=deck==='6'?R.pick([1000,1500,2000]):0;
    const budget=Math.ceil((need+extra+(deck==='6'?save+R.pick([0,500]):0))/500)*500;
    const q={t,items:R.shuffle(items),budget,save,need,deck};q.text=t[0]+' '+t[1];q.reveal='꼭 필요한 것: '+items.filter(i=>i.need).map(i=>i.n+' '+won(i.p)).join(', ');q.review=t[1]+' (용돈 '+won(budget)+(save?', 저축 목표 '+won(save):'')+') → '+q.reveal;q.speak='';return q;},
  qtime(q){return q.deck==='5'?45:60;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return q.text;},askSub(q){return q.deck==='5'?'필요한 것부터 담아요':'할인가를 계산해서 담아요';},
  isOk(q,i,p){return !!p.state.okFlag;},tipOf(q){return q.reveal;},goodTip(q){return '알뜰 소비 성공! 🎉';},
  ptsOf(p,q,frac){return Math.round((55+50*frac)*(p.state.tries?.7:1));},
  onNew(p,q){const st=p.state;st.sel=new Set();st.tries=0;st.msg='';st.msgT=0;st.okFlag=false;},
  total(st){return [...st.sel].reduce((a,i)=>a+st.q.items[i].p,0);},
  calc(p){const st=p.state,q=st.q;const tt=this.total(st);const miss=q.items.filter((it,i)=>it.need&&!st.sel.has(i));let why='';
    if(miss.length)why="꼭 필요한 '"+miss[0].n+"'을(를) 아직 안 담았어요";else if(tt>q.budget)why='용돈보다 '+won(tt-q.budget)+' 많이 썼어요!';else if(q.budget-tt<q.save)why='저축 목표 '+won(q.save)+'에 '+won(q.save-(q.budget-tt))+' 모자라요';
    if(!why){st.okFlag=true;st.msg='🎉 알뜰 소비 성공! 남은 돈 '+won(q.budget-tt);this.verdict(p,0,false);}
    else{st.tries++;st.shake=.4;st.msg='😮 '+why;st.msgT=2.2;const G=this.geo(p);p.hit(false,{pen:10,shake:false,x:G.btn.x+G.btn.w/2,y:G.btn.y,tip:why,tipMs:1600,review:q.t[1]+': '+why});}},
  upd(p,dt){const st=p.state;if(st.msgT>0)st.msgT-=dt;if(st.shake>0)st.shake-=dt;},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);if(K.inRect(x,y,G.btn)){this.calc(p);return;}const i=gkHit(G.cells,x,y);if(i>=0){if(st.sel.has(i))st.sel.delete(i);else st.sel.add(i);p.Snd.tone&&p.Snd.tone(st.sel.has(i)?700:500,.05,'sine',.04);}},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();const cl=r=>({k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2});const i=q.items.findIndex((it,k)=>it.need&&!st.sel.has(k));if(i>=0)return cl(G.cells[i]);return cl(G.btn);},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q;if(!q)return;
    g.fillStyle='#cfe8b0';g.fillRect(0,0,W,H);for(let i=0;i<Math.ceil(W/(u*2.4));i++){g.fillStyle=i%2?'#e8f5d8':'#dcefc3';g.fillRect(i*u*2.4,0,u*2.4,H);}
    /* 상단 정보 */
    const R=G.gridR;K.card(g,R.x,R.y,R.w,G.info-u*.15,u*.25,'#fffdf2',{stroke:'#2f6b1f',lw:3,blur:0,dy:u*.05,sc:'#24541a'});
    K.txt(g,'💰 내 용돈 '+won(q.budget),R.x+u*.5,R.y+(G.info-u*.15)*.5,{size:Math.min(u*.8,R.w/16),color:INK,align:'left',maxW:R.w*.55});
    if(q.save)K.txt(g,'🏦 저축 '+won(q.save)+' 이상',R.x+R.w-u*.4,R.y+(G.info-u*.15)*.5,{size:Math.min(u*.6,R.w/22),color:'#b45309',align:'right',maxW:R.w*.42});
    /* 물건 카드 */
    q.items.forEach((it,i)=>{const c=G.cells[i];if(!c)return;const on=st.sel.has(i);const reveal=st.lock&&it.need;
      K.card(g,c.x,c.y,c.w,c.h,u*.25,on?'#d9f7c4':'#fffdf2',{stroke:on?GRN:reveal&&!on?'#dc2626':'#2f6b1f',lw:on?5:3,blur:0,dy:u*.05,sc:'#24541a'});
      K.emo(g,it.e,c.x+c.w/2,c.y+c.h*.32,Math.min(c.h*.42,c.w*.4));K.txt(g,it.n,c.x+c.w/2,c.y+c.h*.64,{size:Math.min(c.h*.17,u*.62),color:INK,maxW:c.w*.9});
      if(it.sale){K.txt(g,won(it.base),c.x+c.w/2,c.y+c.h*.84,{size:Math.min(c.h*.15,u*.55),color:'#78716c',maxW:c.w*.8});const w=Math.min(c.w*.7,u*3.2);g.strokeStyle='#78716c';g.lineWidth=2;g.beginPath();g.moveTo(c.x+c.w/2-w/2,c.y+c.h*.84);g.lineTo(c.x+c.w/2+w/2,c.y+c.h*.84);g.stroke();
        K.card(g,c.x+c.w-u*2.5,c.y-u*.15,u*2.6,u*.75,u*.2,'#e11d48',{blur:0,dy:0});K.txt(g,it.sale+'% 할인',c.x+c.w-u*1.2,c.y+u*.22,{size:u*.42,color:'#fff',maxW:u*2.4});}
      else K.txt(g,won(it.base),c.x+c.w/2,c.y+c.h*.84,{size:Math.min(c.h*.16,u*.58),color:'#b45309',maxW:c.w*.85});
      if(on)K.txt(g,'🧺',c.x+u*.6,c.y+u*.6,{size:u*.8});});
    /* 영수증 */
    const C=G.rec;g.fillStyle='#fff';K.rr(g,C.x,C.y,C.w,C.h,u*.15);g.fill();g.strokeStyle='#2f6b1f';g.lineWidth=3;g.setLineDash([8,5]);g.stroke();g.setLineDash([]);
    K.txt(g,'🧾 영수증',C.x+C.w/2,C.y+u*.6,{size:u*.55,color:INK});const sel=[...st.sel].map(i=>q.items[i]);const tt=this.total(st);
    const lh=Math.min(u*.62,(C.h-u*2.7)/Math.max(4,sel.length+1));sel.slice(0,8).forEach((it,i)=>{K.txt(g,it.e+' '+it.n,C.x+u*.4,C.y+u*1.3+i*lh,{size:lh*.8,color:INK,align:'left',maxW:C.w*.55});K.txt(g,q.deck==='6'?'?':won(it.p),C.x+C.w-u*.4,C.y+u*1.3+i*lh,{size:lh*.8,color:'#b45309',align:'right',maxW:C.w*.38});});
    g.fillStyle=INK;g.fillRect(C.x+u*.3,C.y+C.h-u*1.25,C.w-u*.6,2);
    if(q.deck==='6')K.txt(g,'고른 물건 '+sel.length+'개 · 할인가는 직접 계산!',C.x+C.w/2,C.y+C.h-u*.6,{size:Math.min(u*.5,C.w/18),color:INK,maxW:C.w*.94});
    else K.txt(g,'합계 '+won(tt)+' · 남는 돈 '+won(q.budget-tt),C.x+C.w/2,C.y+C.h-u*.6,{size:Math.min(u*.55,C.w/16),color:tt>q.budget?'#dc2626':INK,maxW:C.w*.94});
    if(st.msg&&(st.msgT>0||st.lock))K.txt(g,st.msg,C.x+C.w/2,C.y+C.h*.45,{size:Math.min(u*.6,C.w/14),color:st.okFlag?'#15803d':'#dc2626',stroke:'#fff',lw:u*.12,maxW:C.w*.92});
    if(st.lock&&!st.okFlag)K.txt(g,'정답: '+q.reveal,W/2,H-u*.5,{size:u*.42,color:'#7f1d1d',stroke:'#fff',lw:u*.1,maxW:W*.95});
    if(!st.lock&&st.qmax>0)QZ.bar(g,R.x,R.y+G.info-u*.12,R.w,Math.max(6,u*.14),st.qt/st.qmax,{good:GRN});
    const b=G.btn,sh=st.shake>0?Math.sin(st.shake*60)*u*.1:0;K.rr(g,b.x+sh,b.y,b.w,b.h,u*.25);g.fillStyle=ORG;g.fill();g.lineWidth=3;g.strokeStyle='#9a3412';g.stroke();K.txt(g,'🧮 계산하기',b.x+b.w/2+sh,b.y+b.h/2,{size:Math.min(b.h*.5,u*1),color:'#fff',maxW:b.w*.9});
  },
};
QZ.mix(GAME,{say:false,pts0:55,pts1:50,okMs:1900,badMs:3600});
Engine.boot(GAME);
