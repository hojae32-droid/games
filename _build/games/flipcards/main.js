/* 3~6학년 영어 · 짝 맞추기 — 짝꿍 카드 뒤집기
   디자인: 초록 펠트 카지노 테이블 위의 트럼프 카드. 그림(뜻) 카드와 영어 낱말 카드의 짝을 찾아 뒤집어요. 연속으로 맞히면 콤보! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#14301e',GOLD='#facc15';
const LOGO=gkLogo('#166534','#facc15','🃏');
const LV={
  '3':{g:'3~6학년',t:'3학년 그림 짝꿍',d:'그림 카드와 영어 낱말 짝 찾기'},
  '4':{g:'3~6학년',t:'4학년 그림 짝꿍',d:'음식·장소·옷 그림과 영어 짝'},
  '5':{g:'3~6학년',t:'5학년 뜻 짝꿍',d:'우리말 뜻과 영어 낱말 짝'},
  '6':{g:'3~6학년',t:'6학년 뜻 짝꿍',d:'조금 어려운 낱말의 뜻과 영어 짝'},
};
function hero(g,W,H,T,u){const gr=g.createRadialGradient(W/2,H*.4,u,W/2,H*.4,W*.8);gr.addColorStop(0,'#1b6b3a');gr.addColorStop(1,'#0b3a1f');g.fillStyle=gr;g.fillRect(0,0,W,H);
  const cs=[['🐶','#fff'],['dog','#fff'],['🍎','#fff'],['apple','#fff']];cs.forEach((c,i)=>{g.save();g.translate(W*(.2+i*.2),H*.5+Math.sin(T*1.5+i)*u*.2);g.rotate((i-1.5)*.18);K.card(g,-u*1.3,-u*1.8,u*2.6,u*3.6,u*.25,'#fffdf2',{stroke:'#facc15',lw:4,blur:0,dy:u*.08,sc:'#052e16'});if(i%2===0)K.emo(g,c[0],0,0,u*1.5);else K.txt(g,c[0],0,0,{size:u*.8,color:INK,maxW:u*2.3});g.restore();});}
const GAME={
  id:'flipcards',title:'짝꿍 카드 뒤집기',title1:'짝꿍 카드',title2:'뒤집기 테이블',emoji:LOGO,
  subtitle:'3~6학년 영어 · 그림(뜻)과 영어 낱말 짝 맞추기',
  howto:'🃏 카드를 <b>두 장씩 뒤집어서</b> 그림(뜻)과 영어 낱말의 짝을 찾아요. 짝을 맞추면 금테 카드로 변해요. 열두 장을 다 맞추면 새 판이 깔려요. 연속으로 맞히면 콤보 점수!',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:GOLD,c2:'#dc2626'},hero:gkHero(hero),vignette:.05,durs:[120,180,300],levelTitle:'어떤 카드 판을 깔까요?',
  txt:{who:'누가 딜러일까요?',dur:'게임 시간',pace:'뒤집기 속도',seat:'번 플레이어 ',go:'카드 섞기!',s1:'1. 판',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li>그림 카드와 영어 낱말 카드를 짝지으면서 낱말의 <b>철자와 뜻</b>을 함께 기억해요.</li>
    <li>틀린 카드의 위치도 기억해 두면 다음 번에 빨리 찾을 수 있어요.</li>
    <li>맞춘 낱말은 소리 내어 읽어 보면 더 오래 기억나요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2,pad=u*.4,info=u*1.3;const ax=pad,ay=top+info,aw=W-pad*2,ah=H-ay-pad;const gap=u*.35;let best=null;
    [[4,3],[3,4],[6,2],[2,6]].forEach(([c,r])=>{const cw=Math.min((aw-gap*(c-1))/c,((ah-gap*(r-1))/r)*.78);if(!best||cw>best.cw)best={c,r,cw};});
    const ch=best.cw/.78;const gw=best.c*best.cw+(best.c-1)*gap,gh=best.r*ch+(best.r-1)*gap;return{W,H,u,top,pad,info,gap,c:best.c,r:best.r,cw:best.cw,ch,gx:(W-gw)/2,gy:ay+(ah-gh)/2};},
  init(p){const st=p.state;const deck=p.levelId;st.pic=deck==='3'||deck==='4';st.list=EN.words(deck,{pic:st.pic?1:0,alpha:1,max:st.pic?9:10});st.bag=EN.bag(st.list,()=>p.R.f());Object.assign(st,{T:0,first:-1,lock:0,t0:0,matched:0,pairs:0,msg:'',cards:[],pend:null,streak:0});this.board(p);},
  board(p){const st=p.state;const ws=[],seen=new Set();while(ws.length<6){const w=st.bag();if(seen.has(w.e)||(st.pic&&seen.has(w.p)))continue;seen.add(w.e);if(st.pic)seen.add(w.p);ws.push(w);}
    let cs=[];ws.forEach(w=>{cs.push({w,k:'a',kind:st.pic?'pic':'ko',t:st.pic?w.p:w.k,s:'down',f:0});cs.push({w,k:'b',kind:'en',t:w.e,s:'down',f:0});});
    st.cards=EN.shuffle(cs,()=>p.R.f());st.matched=0;st.first=-1;st.lock=0;st.t0=st.T;st.pend=null;p.ask('🃏 같은 짝을 찾아요','두 장씩 뒤집어요');},
  update(p,dt){const st=p.state;st.T+=dt;st.cards.forEach(c=>{const tg=c.s==='down'?0:1;c.f+=(tg-c.f)*Math.min(1,dt*12);if(Math.abs(tg-c.f)<.01)c.f=tg;if(c.bad>0)c.bad-=dt;if(c.glow>0)c.glow-=dt;});
    if(st.lock>0){st.lock-=dt;if(st.lock<=0&&st.pend){const pd=st.pend;st.pend=null;if(pd.ok){pd.a.s=pd.b.s='ok';if(st.matched===6)st.lock=.9,st.fin=true;}else{pd.a.s=pd.b.s='down';}if(!st.lock||st.lock<=0)st.lock=0;}
      else if(st.lock<=0&&st.fin){st.fin=false;this.board(p);}}},
  cardAt(p,x,y){const G=this.geo(p),st=p.state;for(let i=0;i<st.cards.length;i++){const cx=G.gx+(i%G.c)*(G.cw+G.gap),cy=G.gy+Math.floor(i/G.c)*(G.ch+G.gap);if(x>=cx&&x<=cx+G.cw&&y>=cy&&y<=cy+G.ch)return i;}return-1;},
  down(p,x,y){this.flip(p,this.cardAt(p,x,y));},
  flip(p,i){const st=p.state,G=this.geo(p);if(i<0||st.lock>0)return;const c=st.cards[i];if(c.s!=='down')return;c.s='up';p.Snd.tone&&p.Snd.tone(500,.05,'sine',.04);
    if(st.first<0){st.first=i;return;}
    const a=st.cards[st.first],b=c;st.first=-1;const bx=G.gx+(i%G.c)*(G.cw+G.gap)+G.cw/2,by=G.gy+Math.floor(i/G.c)*(G.ch+G.gap);
    if(a.w===b.w&&a.k!==b.k){st.matched++;st.pairs++;const t=st.T-st.t0;st.t0=st.T;st.pend={a,b,ok:true};st.lock=.45;a.glow=b.glow=.8;st.msg=a.w.e+' = '+a.w.k;
      p.hit(true,{pts:EN.pts(Math.min(t,14),14),x:bx,y:by});enSay(a.w.e,.8);}
    else{st.pend={a,b,ok:false};st.lock=.95;a.bad=b.bad=.9;p.hit(false,{pen:5,shake:false,x:bx,y:by,review:a.w.e+' = '+a.w.k+' · '+b.w.e+' = '+b.w.k});}},
  botAct(p){const st=p.state,G=this.geo(p);if(st.lock>0)return null;let j;if(st.first>=0){const a=st.cards[st.first];j=st.cards.findIndex((c,k)=>c.w===a.w&&k!==st.first);}else j=st.cards.findIndex(c=>c.s==='down');if(j<0)return null;const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+G.gx+(j%G.c)*(G.cw+G.gap)+G.cw/2,y:rc.top+G.gy+Math.floor(j/G.c)*(G.ch+G.gap)+G.ch/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u;
    const gr=g.createRadialGradient(W/2,H*.45,u,W/2,H*.45,Math.max(W,H)*.75);gr.addColorStop(0,'#1b6b3a');gr.addColorStop(1,'#0b3a1f');g.fillStyle=gr;g.fillRect(0,0,W,H);
    g.strokeStyle='rgba(250,204,21,.25)';g.lineWidth=3;K.rr(g,u*.2,G.top+u*.5,W-u*.4,H-G.top-u*.7,u*.8);g.stroke();
    K.txt(g,st.msg?'✔ '+st.msg:'🃏 '+st.pairs+'쌍 완성',W/2,G.top+G.info*.55,{size:Math.min(u*.9,W/14),color:GOLD,maxW:W*.9,stroke:'#052e16',lw:u*.1});
    st.cards.forEach((c,i)=>{const cx=G.gx+(i%G.c)*(G.cw+G.gap),cy=G.gy+Math.floor(i/G.c)*(G.ch+G.gap),mx=cx+G.cw/2,my=cy+G.ch/2;const sx=Math.abs(Math.cos(Math.PI*c.f));const face=c.f>.5;
      g.save();g.translate(mx,my);g.scale(Math.max(.02,sx),1+(c.glow>0?Math.sin(c.glow*8)*.04:0));const w=G.cw,h=G.ch;
      if(!face){K.card(g,-w/2,-h/2,w,h,w*.1,'#b91c1c',{stroke:'#fffdf2',lw:Math.max(3,w*.05),blur:0,dy:h*.02,sc:'#052e16'});g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=2;K.rr(g,-w*.38,-h*.4,w*.76,h*.8,w*.06);g.stroke();for(let k=-2;k<=2;k++)for(let l=-3;l<=3;l++){g.fillStyle='rgba(255,255,255,.18)';g.beginPath();g.moveTo(k*w*.15,l*h*.11-h*.04);g.lineTo(k*w*.15+w*.05,l*h*.11);g.lineTo(k*w*.15,l*h*.11+h*.04);g.lineTo(k*w*.15-w*.05,l*h*.11);g.fill();}K.txt(g,'♠',0,0,{size:w*.5,color:'#fffdf2',stroke:'#7f1d1d',lw:w*.03});}
      else{const ok=c.s==='ok';K.card(g,-w/2,-h/2,w,h,w*.1,ok?'#fff4b8':c.bad>0?'#fecaca':'#fffdf2',{stroke:ok?GOLD:c.bad>0?'#dc2626':'#e5e7eb',lw:Math.max(3,w*.05),blur:0,dy:h*.02,sc:'#052e16'});
        if(c.kind==='pic')K.emo(g,c.t,0,0,w*.62);else{const L=c.t.length;const sz=Math.min(h*.2,w*(c.kind==='ko'?.9:1.5)/Math.max(3,L)*(c.kind==='ko'?1.6:1.1));K.txt(g,c.t,0,0,{size:sz,color:c.kind==='en'?'#1d4ed8':INK,maxW:w*.88});}
        K.txt(g,c.kind==='en'?'A':c.kind==='ko'?'가':'🖼',-w*.36,-h*.4,{size:w*.14,color:'#9ca3af'});}
      g.restore();});
    if(st.streak>1)K.txt(g,'',W/2,H/2,{size:1,color:'#0000'});
  },
};
Engine.boot(GAME);
