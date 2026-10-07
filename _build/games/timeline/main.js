/* 5~6학년 사회 · 나라의 등장과 발전 · 대한민국의 발전 — 연표 두루마리
   디자인: 역사 교실 칠판. 분필로 그린 연표에 새 사건 카드를 알맞은 틈에 끼워 넣어요. 목숨(하트)은 3개! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const CH='#f4f1de',YEL='#ffd166',PINK='#ff8fab',BLUE='#7bdff2',GRN='#b5e48c';
const SANS='Gowun Dodum';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="4" y="6" width="40" height="30" rx="3" fill="#1f4a39" stroke="#8b5a2b" stroke-width="4"/><path d="M24 11v20" stroke="#f4f1de" stroke-width="2.5" stroke-linecap="round"/><circle cx="24" cy="14" r="3" fill="#ffd166"/><circle cx="24" cy="24" r="3" fill="#ff8fab"/><circle cx="24" cy="32" r="0" fill="#7bdff2"/><rect x="8" y="39" width="14" height="5" rx="2" fill="#f4f1de"/></svg>';
const DECKS=/*@@DECKS@@*/;
const EV=/*@@EV@@*/;
const FULL=7;
const PICK={ancient:'a',joseon:'b',modern:'c',econ:'e',all:'abce'};
const yr=y=>y<0?'기원전 '+(-y)+'년':y+'년';
const jo=(w,a,b)=>{const c=w.charCodeAt(w.length-1);return c>=0xAC00&&c<=0xD7A3&&(c-0xAC00)%28?a:b;};
function board(g,W,H,u,x,y,w,h){K.rr(g,x,y,w,h,u*.25);g.fillStyle='#8b5a2b';g.fill();const f=u*.22;K.rr(g,x+f,y+f,w-f*2,h-f*2,u*.12);const gr=g.createLinearGradient(x,y,x+w,y+h);gr.addColorStop(0,'#215542');gr.addColorStop(1,'#163a2d');g.fillStyle=gr;g.fill();
  g.save();K.rr(g,x+f,y+f,w-f*2,h-f*2,u*.12);g.clip();g.globalAlpha=.07;g.fillStyle='#fff';for(let i=0;i<30;i++){g.beginPath();g.ellipse(x+((i*131)%100)/100*w,y+((i*71)%100)/100*h,u*(.6+(i%4)*.3),u*.12,(i*.7)%3,0,TAU);g.fill();}g.restore();}
function chalk(g,x,y,w,h,r,col,lw,dash){g.save();g.strokeStyle=col;g.lineWidth=lw;g.lineCap='round';if(dash)g.setLineDash(dash);K.rr(g,x,y,w,h,r);g.stroke();g.restore();}
function hero(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const E=[['🏔️','고조선 건국','기원전 2333년'],['✍️','훈민정음 창제','1443년'],['🎉','8·15 광복','1945년'],['🏅','서울 올림픽','1988년']];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    const u=Math.min(W0,H0)/6;board(g,W0,H0,u,u*.2,u*.2,W0-u*.4,H0-u*.4);const cx=W0*.3,k=Math.floor(T/1.1)%5;g.strokeStyle=CH;g.lineWidth=3;g.lineCap='round';g.beginPath();g.moveTo(cx,H0*.18);g.lineTo(cx,H0*.86);g.stroke();
    const rh=(H0*.7)/4;for(let i=0;i<4;i++){const y=H0*.26+i*rh;const show=i<k||k===4;g.fillStyle=show?YEL:'rgba(255,255,255,.25)';g.beginPath();g.arc(cx,y,u*.16,0,TAU);g.fill();
      if(show){K.txt(g,E[i][2],cx-u*.4,y,{size:u*.38,color:YEL,maxW:cx-u*.8,font:SANS});chalk(g,cx+u*.4,y-rh*.34,W0*.38,rh*.68,u*.12,CH,2.5);K.emo(g,E[i][0],cx+u*.9,y,u*.7);K.txt(g,E[i][1],cx+u*1.4+W0*.17,y,{size:u*.4,color:CH,maxW:W0*.28,font:SANS});}
      else{g.save();g.setLineDash([6,6]);chalk(g,cx+u*.4,y-rh*.2,W0*.38,rh*.4,u*.1,'rgba(244,241,222,.4)',2);g.restore();}}};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'timeline',title:'연표 두루마리',title1:'역사 교실 칠판 연표',title2:'연표 두루마리',emoji:LOGO,
  subtitle:'5~6학년 사회 · 우리나라 역사의 흐름',
  howto:'새 사건 카드가 나오면 칠판 연표에서 그 사건이 들어갈 <b>틈(＋)</b>을 눌러 끼워 넣어요. 위쪽이 옛날, 아래쪽이 오늘날에 가까워요. 틀리면 목숨 ❤️이 하나 줄고, 셋을 다 잃으면 끝! 일곱 장을 모으면 두루마리 완성 보너스!',
  how:p=>({ancient:'<b>고조선 ~ 고려</b> 사건을 순서대로',joseon:'<b>고려 ~ 조선</b> 사건을 순서대로',modern:'<b>개항 ~ 오늘날</b> 사건을 순서대로',econ:'<b>경제 발전</b> 사건을 순서대로',all:'<b>전체 역사</b>를 섞어서 순서대로'}[p.levelId]),
  theme:{c1:'#ffd166',c2:'#ff8fab'},hero,vignette:.06,durs:[90,150,240],levelTitle:'어느 시대를 공부할까요?',
  txt:{who:'누가 도전할까요?',dur:'수업 시간',pace:'한 사건 시간',seat:'번 학생 ',go:'수업 시작!',s1:'1. 시대',s2:'2. 방법',s3:'3. 이름'},
  levels:DECKS.map(d=>({id:d.key,g:'5~6학년',t:d.ic+' '+d.label,d:d.tag.replace(/^[^ ]* ?/,'')?d.tag+' · '+d.desc:d.desc})),
  summary:`<ul><li><b>고조선(기원전 2333) → 삼국 → 통일 신라와 발해 → 고려(918) → 조선(1392)</b> 순서로 나라가 이어졌어요.</li>
    <li>훈민정음 창제(1443), 임진왜란(1592), 병자호란(1636)처럼 <b>중요한 해</b>를 기준으로 사이사이 사건을 떠올리면 쉬워요.</li>
    <li>근현대: 강화도 조약(1876) → 3·1 운동(1919) → 8·15 광복(1945) → 대한민국 정부 수립(1948) → 6·25 전쟁(1950) → 4·19(1960) → 5·18(1980) → 6월 민주 항쟁(1987)</li>
    <li>경제 발전: 경제 개발 5개년 계획(1962) → 포항 제철소(1973) → 수출 100억 달러(1977) → 외환 위기(1997) → 무역 1조 달러(2011)</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const st=p.state;const n=st.line?st.line.length:1;const pad=u*.3;const top=(p.top||0)+u*.35;const land=W>=H*1.1;const B={x:pad,y:top,w:W-pad*2,h:H-top-pad};const f=u*.3;
    let np,tl;if(land){np={x:B.x+f,y:B.y+f,w:B.w*.36-f,h:B.h-f*2};tl={x:B.x+B.w*.38,y:B.y+f,w:B.w*.61-f,h:B.h-f*2};}
    else{const nh=Math.min(B.h*.24,u*4.8);np={x:B.x+f,y:B.y+f,w:B.w-f*2,h:nh};tl={x:B.x+f,y:B.y+f*1.5+nh,w:B.w-f*2,h:B.h-nh-f*2.5};}
    const slotH0=u*.62,evH0=u*1.2;const total=(n+1)*slotH0+n*evH0;const k=Math.min(1.1,tl.h/total);const sh=slotH0*k,eh=evH0*k;let y=tl.y+(tl.h-total*k)/2;const slots=[],evs=[];
    for(let i=0;i<=n;i++){slots.push({x:tl.x,y,w:tl.w,h:sh});y+=sh;if(i<n){evs.push({x:tl.x,y,w:tl.w,h:eh});y+=eh;}}
    return{W,H,u,B,np,tl,slots,evs,land,rail:tl.x+tl.w*.26,n};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,line:[],lives:3,ins:-1,insRes:'',bonusT:0,shake:0});st.line=[this.draw1(p)];this.newQ(p);},
  pool(p){const pk=PICK[p.levelId];return EV.filter(e=>[...e[3]].some(c=>pk.includes(c)));},
  draw1(p,line){const pool=this.pool(p);for(let k=0;k<60;k++){const e=p.deck(pool,'dk_'+p.levelId);if(!(line||[]).some(l=>l[0]===e[0]))return e;}return pool[0];},
  make(p,L){const st=p.state;if(st.line.length>=FULL){st.bonusT=1.6;p.hit(true,{pts:30,x:p.W/2,y:p.H*.4,tip:'📜 두루마리 완성! 보너스 +30',tipMs:1500});st.line=[this.draw1(p)];}
    const e=this.draw1(p,st.line);let at=st.line.findIndex(l=>l[0]>e[0]);if(at<0)at=st.line.length;return{e,at,okIdx:at,text:e[1],ans:yr(e[0]),reveal:e[1]+jo(e[1],'은','는')+' '+yr(e[0])+'이에요',review:e[1]+': '+yr(e[0]),speak:e[1]};},
  qtime(){return 18;},askHtml(q){return q.e[2]+' <b>'+q.e[1]+'</b>';},askSub(){return '연표에서 들어갈 틈(＋)을 눌러요';},
  isOk(q,i,p){const line=p.state.line;if(i<0)return false;const lo=i>0?line[i-1][0]:-1e9,hi=i<line.length?line[i][0]:1e9;return lo<q.e[0]&&q.e[0]<hi;},
  tipOf(q){return q.reveal;},goodTip(q){return '딩동댕! '+q.e[1]+', '+yr(q.e[0]);},
  onNew(p,q){const st=p.state;st.ins=-1;st.insRes='';},
  onVerdict(p,q,ok,i,to){const st=p.state;st.line.splice(q.at,0,q.e);st.ins=q.at;st.insRes=ok?'ok':'bad';if(!ok){st.lives--;st.shake=.5;if(st.lives<=0)setTimeout(()=>{if(p.active&&!p.finished)Engine.finish(p);},1500);}},
  upd(p,dt){const st=p.state;if(st.bonusT>0)st.bonusT-=dt;if(st.shake>0)st.shake-=dt;},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);const i=G.slots.findIndex(r=>K.inRect(x,y,r));if(i>=0)this.verdict(p,i,false);},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const r=G.slots[q.at];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;K.vgrad(g,0,0,W,H,['#2a1c0e','#3a2814','#2a1c0e']);board(g,W,H,u,G.B.x,G.B.y,G.B.w,G.B.h);
    /* 새 사건 카드 */
    const np=G.np;K.rr(g,np.x,np.y,np.w,np.h,u*.2);g.fillStyle='rgba(255,255,255,.06)';g.fill();chalk(g,np.x,np.y,np.w,np.h,u*.2,YEL,3,[u*.3,u*.2]);
    const small=!G.land;const ic=Math.min(small?np.h*.55:np.w*.34,u*3);K.emo(g,q.e[2],small?np.x+np.w*.18:np.x+np.w/2,small?np.y+np.h*.48:np.y+np.h*.28,ic);
    QK.txt(g,q.e[1],small?np.x+np.w*.6:np.x+np.w/2,small?np.y+np.h*.32:np.y+np.h*.56,small?np.w*.6:np.w*.86,small?np.h*.36:np.h*.18,Math.min(u*1.1,small?np.h*.3:np.h*.14),CH,1.1);
    K.txt(g,st.lock?yr(q.e[0]):'몇 년?',small?np.x+np.w*.6:np.x+np.w/2,small?np.y+np.h*.6:np.y+np.h*.72,{size:Math.min(u*.9,small?np.h*.22:np.h*.1),color:st.lock?(st.res==='ok'?GRN:PINK):YEL,maxW:np.w*.7,font:SANS});
    for(let i=0;i<3;i++){const hx=small?np.x+np.w-u*.9-i*u*.9:np.x+np.w/2+(i-1)*u*1.0,hy=small?np.y+u*.55:np.y+np.h*.9;g.globalAlpha=i<st.lives?1:.25;K.emo(g,'❤️',hx+(st.shake>0?Math.sin(st.shake*50)*4:0),hy,u*.75);g.globalAlpha=1;}
    if(!st.lock&&st.qmax>0){const bw=small?np.w*.55:np.w*.8;QZ.bar(g,small?np.x+np.w*.32:np.x+np.w/2-bw/2,small?np.y+np.h-u*.32:np.y+np.h*.82,bw,Math.max(5,u*.22),st.qt/st.qmax,{good:YEL});}
    /* 연표 */
    const tl=G.tl;g.strokeStyle=CH;g.lineWidth=Math.max(2,u*.07);g.lineCap='round';g.beginPath();g.moveTo(G.rail,G.slots[0].y+G.slots[0].h*.5);g.lineTo(G.rail,G.slots[G.n].y+G.slots[G.n].h*.5);g.stroke();
    K.txt(g,'↑ 옛날',G.rail,tl.y+u*.1,{size:u*.38,color:BLUE,maxW:u*3,font:SANS});K.txt(g,'↓ 오늘날',G.rail,tl.y+tl.h-u*.1,{size:u*.38,color:BLUE,maxW:u*3,font:SANS});
    G.evs.forEach((r,i)=>{const e=st.line[i];const hl=i===st.ins;const col=hl?(st.insRes==='ok'?GRN:PINK):CH;const cy=r.y+r.h/2;const cx0=G.rail+u*.45,cw=tl.x+tl.w-cx0-u*.1;
      g.fillStyle=hl?col:YEL;g.beginPath();g.arc(G.rail,cy,u*.18,0,TAU);g.fill();
      K.txt(g,yr(e[0]),G.rail-u*.3,cy,{size:Math.min(u*.62,r.h*.5),color:hl?col:YEL,maxW:G.rail-tl.x-u*.4,font:SANS,align:'right'});
      if(hl){g.fillStyle=st.insRes==='ok'?'rgba(181,228,140,.18)':'rgba(255,143,171,.2)';K.rr(g,cx0,r.y+r.h*.06,cw,r.h*.88,u*.14);g.fill();}
      chalk(g,cx0,r.y+r.h*.06,cw,r.h*.88,u*.14,col,hl?3.5:2.2);K.emo(g,e[2],cx0+Math.min(r.h*.5,u*.8),cy,Math.min(r.h*.7,u*1.1));
      const ex=Math.min(r.h*1.0,u*1.6);QK.txt(g,e[1],cx0+ex+(cw-ex)/2,cy,cw-ex-u*.2,r.h*.8,Math.min(u*.72,r.h*.42),col,1.05);});
    if(!st.lock){const pul=.5+.5*Math.sin(t*5);G.slots.forEach((r,i)=>{const cy=r.y+r.h/2;g.strokeStyle=`rgba(255,209,102,${.5+.4*pul})`;g.lineWidth=2;g.setLineDash([6,6]);g.beginPath();g.moveTo(G.rail+u*.45,cy);g.lineTo(tl.x+tl.w-u*.1,cy);g.stroke();g.setLineDash([]);
      g.fillStyle=`rgba(255,209,102,${.25+.25*pul})`;g.beginPath();g.arc(G.rail,cy,Math.min(u*.3,r.h*.45),0,TAU);g.fill();K.txt(g,'＋',G.rail,cy+1,{size:Math.min(u*.5,r.h*.8),color:YEL});
      K.txt(g,'여기',(G.rail+u*.45+tl.x+tl.w)/2,cy,{size:Math.min(u*.42,r.h*.62),color:`rgba(255,209,102,${.55+.4*pul})`,font:SANS,maxW:u*3});});}
    if(st.bonusT>0)K.txt(g,'📜 두루마리 완성!',W/2,H*.5,{size:Math.min(u*1.5,W*.09),color:YEL,stroke:'#0b2118',lw:u*.25,maxW:W*.9});
  },
};
QZ.mix(GAME,{say:false,pts0:60,pts1:40,okMs:1100,badMs:2400});
Engine.boot(GAME);
