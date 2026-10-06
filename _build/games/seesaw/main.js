/* 1~2학년 국어 · 뜻이 반대인 낱말 · 묶어서 부르는 말 · 뜻이 비슷한 낱말 — 낱말 시소 놀이터
   디자인: 햇살 놀이터. 시소 한쪽에 낱말 친구가 앉아 있고, 반대쪽에 짝이 맞는 낱말 블록을 태우면 시소가 반듯해져요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#3b1d8a';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M5 30L43 20" stroke="#3b1d8a" stroke-width="6" stroke-linecap="round"/><path d="M5 30L43 20" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/><path d="M24 25l-8 15h16z" fill="#a78bfa" stroke="#3b1d8a" stroke-width="3" stroke-linejoin="round"/><circle cx="9" cy="22" r="5" fill="#fde68a" stroke="#3b1d8a" stroke-width="2.5"/><circle cx="39" cy="12" r="5" fill="#fbcfe8" stroke="#3b1d8a" stroke-width="2.5"/></svg>';
/*@@DATA@@*/
const BCOL=['#fde68a','#bbf7d0','#fbcfe8','#bae6fd'];
function park(g,W,H,u,t,gy){K.vgrad(g,0,0,W,H,['#bfe9ff','#e8f8ff','#fffbe0']);
  g.save();g.translate(W*.88,H*.1);g.rotate(t*.2);g.fillStyle='#fde047';for(let k=0;k<10;k++){g.rotate(TAU/10);g.fillRect(u*.85,-u*.07,u*.35,u*.14);}g.restore();g.fillStyle='#fde047';g.beginPath();g.arc(W*.88,H*.1,u*.7,0,TAU);g.fill();
  K.clouds(g,W,H,t*.6,.1,3,u*1.5);K.hills(g,W,H,gy-u*.8,'#b7efc5','#86e0a3',t);K.ground(g,gy,W,H,'#78d98f');
  for(let i=0;i<8;i++){const x=((i*211)%1000)/1000*W,y=gy+u*.4+((i*47)%4)*(H-gy-u*.7)/4;K.emo(g,['🌼','🌷','🌸','🦋'][i%4],x,y,u*.4);}}
/* 시소: 가운데 pivot (cx,cy), 길이 L, 기울기 ang(+는 오른쪽이 내려감) */
function seesaw(g,cx,cy,L,ang,u,left,right,o){o=o||{};g.save();g.translate(cx,cy);
  K.shadow(g,0,u*1.55,L*.46,u*.22,.18);
  /* 받침대 */
  g.fillStyle='#a78bfa';g.strokeStyle=INK;g.lineWidth=Math.max(3,u*.1);g.lineJoin='round';g.beginPath();g.moveTo(0,0);g.lineTo(-u*1.1,u*1.55);g.lineTo(u*1.1,u*1.55);g.closePath();g.fill();g.stroke();
  g.save();g.rotate(ang);
  /* 널빤지 */
  K.rr(g,-L/2,-u*.3,L,u*.6,u*.3);g.fillStyle='#fbbf24';g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.4)';K.rr(g,-L/2+u*.3,-u*.22,L-u*.6,u*.12,u*.06);g.fill();
  /* 손잡이 */
  g.strokeStyle=INK;g.lineWidth=Math.max(3,u*.09);for(const d of[-1,1]){g.beginPath();g.moveTo(d*(L/2-u*1.9),-u*.3);g.lineTo(d*(L/2-u*1.9),-u*1.0);g.lineTo(d*(L/2-u*2.5),-u*1.0);g.stroke();}
  /* 앉은 친구와 낱말 블록 */
  const bw=Math.min(L*.34,u*5.2),bh=u*1.9;
  const seat=(sx,kid,blk,isR)=>{g.save();g.translate(sx,0);K.emo(g,kid,isR?u*.1:-u*.1,-u*1.2,u*1.5);
    const bx=isR?-bw-u*1.1:u*1.1;g.save();g.translate(bx+bw/2,-u*1.2-bh/2);g.rotate(-ang);g.translate(-bw/2,-bh/2);blk(bw,bh);g.restore();g.restore();};
  seat(-L/2+u*1.1,'🧒',(w,h)=>{block(g,0,0,w,h,u,left.text,left.col||'#fde68a',{many:left.many});},false);
  seat(L/2-u*1.1,'👧',(w,h)=>{block(g,0,0,w,h,u,right.text,right.col||'#fff',{empty:right.empty,bad:right.bad,ok:right.ok});},true);
  g.restore();
  /* 기둥 위 동그라미 */
  g.fillStyle='#fff';g.strokeStyle=INK;g.lineWidth=Math.max(2,u*.08);g.beginPath();g.arc(0,0,u*.28,0,TAU);g.fill();g.stroke();g.restore();}
function block(g,x,y,w,h,u,text,col,o){o=o||{};K.card(g,x,y,w,h,u*.35,o.bad?'#fecaca':o.ok?'#bbf7d0':col,{stroke:o.bad?'#dc2626':o.ok?'#16a34a':INK,lw:Math.max(3,u*.09),blur:0,dy:u*.1,sc:INK});
  if(o.empty)K.txt(g,'?',x+w/2,y+h/2,{size:Math.min(h*.6,w*.5),color:'#a78bfa'});
  else if(o.many){const arr=String(text).split(' · ');const fs=Math.min(h*.26,w*.3);arr.forEach((a,i)=>K.txt(g,a,x+w/2,y+h*(.2+.3*i),{size:fs,color:INK,maxW:w*.9}));}
  else QK.txt(g,text,x+w/2,y+h/2,w*.88,h*.8,Math.min(h*.5,w*.34),INK,1.1);}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const PR=[['크다','작다'],['열다','닫다'],['과일','사과'],['기쁘다','즐겁다']];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/8:Math.min(W,H)/7.5;const gy=H*.84;park(g,W,H,u,T,gy);const per=4,n=Math.floor(T/per),ph=(T%per)/per;const pr=PR[n%4];
    const ang=ph<.35?-.14+Math.sin(T*6)*.012:ph<.5?-.14+(ph-.35)/.15*.14:Math.sin((ph-.5)*12)*.012*(1-ph);
    seesaw(g,W/2,gy-u*1.8,Math.min(W*.8,u*13),ang,u,{text:pr[0]},{text:pr[1],empty:ph<.45,ok:ph>.5});if(ph>.5&&ph<.85)K.emo(g,'🎉',W/2,gy-u*5.2,u*1.1);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'k05-word-seesaw',title:'낱말 시소 놀이터',title1:'균형 맞추기 놀이',title2:'낱말 시소 놀이터',emoji:LOGO,
  subtitle:'1~2학년 · 낱말의 뜻 · 낱말 사이의 관계',
  howto:'시소 한쪽에 낱말 친구가 앉아 있어요. 반대쪽에 <b>짝이 맞는 낱말 블록</b>을 올리면 시소가 반듯하게 균형을 잡아요! 짝이 틀리면 시소가 쿵 기울어져요. 🔈로 문제를 들을 수 있어요.',
  how:p=>({a:'<b>뜻이 반대</b>인 낱말을 시소에 태워요',b:'여러 낱말을 <b>묶어서 부르는 말</b>을 태워요',c:'<b>뜻이 비슷한</b> 낱말을 시소에 태워요'}[p.levelId]),
  theme:{c1:'#7c3aed',c2:'#16a34a'},hero:heroScene,vignette:.04,durs:[90,150,240],levelTitle:'어떤 시소를 탈까요?',
  txt:{who:'누가 놀이터 친구가 될까요?',dur:'노는 시간',pace:'한 문제 시간',seat:'번 친구 ',go:'놀이 시작!',s1:'1. 놀이',s2:'2. 방법',s3:'3. 이름'},
  levels:[{id:'a',g:'1~2학년',t:'뜻이 반대인 낱말',d:'크다 ↔ 작다 · 열다 ↔ 닫다'},{id:'b',g:'1~2학년',t:'묶어서 부르는 말',d:'사과 · 배 · 포도 → 과일'},{id:'c',g:'1~2학년',t:'뜻이 비슷한 낱말',d:'기쁘다 ≈ 즐겁다'}],
  summary:`<ul><li><b>뜻이 반대인 낱말</b>은 서로 뜻이 맞서는 낱말이에요 (크다 ↔ 작다, 열다 ↔ 닫다, 앞 ↔ 뒤).</li>
    <li><b>묶어서 부르는 말</b>은 여러 낱말을 한마디로 말하는 거예요 (사과, 배, 포도 → 과일).</li>
    <li><b>뜻이 비슷한 낱말</b>은 뜻이 거의 같은 낱말이에요 (기쁘다 ≈ 즐겁다, 아빠 ≈ 아버지).</li>
    <li>낱말 사이의 관계를 알면 말과 글이 더 풍부해져요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=(p.top||0)+u*.9;const land=W>=H*1.2;const pad=Math.max(8,u*.3),gap=Math.max(7,u*.25);const A=H-Z0-pad;
    let sc,oR;if(land){const sw=W*.58;sc={x:0,y:Z0,w:sw,h:A};oR={x:sw+pad,y:Z0+A*.08,w:W-sw-pad*2,h:A*.84};}else{const sh=A*.5;sc={x:0,y:Z0,w:W,h:sh};oR={x:pad,y:Z0+sh+gap,w:W-pad*2,h:A-sh-gap};}
    const q=p.state.q,n=q?q.words.length:4;const cols=2,rows=Math.ceil(n/cols);const cw=(oR.w-(cols-1)*gap)/cols;let ch=(oR.h-(rows-1)*gap)/rows;ch=Math.min(ch,u*4.2);const oy=(oR.h-(rows*ch+(rows-1)*gap))/2;const rects=[];for(let i=0;i<n;i++)rects.push({x:oR.x+(i%cols)*(cw+gap),y:oR.y+oy+Math.floor(i/cols)*(ch+gap),w:cw,h:ch});
    return{W,H,u,Z0,land,pad,gap,sc,oR,rects,gy:sc.y+sc.h*.9};},
  init(p){Object.assign(p.state,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,ang:-.15,angT:-.15,shown:null});this.newQ(p);},
  make(p,L){const R=p.R,q={};
    if(L==='a'||L==='c'){const list=L==='a'?OPP:SIM;let pr=p.deck(list,'dk_'+L).slice();if(R.chance(.5))pr=[pr[1],pr[0]];const [a,b]=pr;const near=NEAR.filter(g=>g.includes(a)||g.includes(b)).flat();const others=R.shuffle(list.filter(x=>!x.includes(a)&&!x.includes(b)).flat().filter(w=>!near.includes(w))).slice(0,3);
      q.left=a;q.ans=b;q.words=R.shuffle([b,...others]);q.text=L==='a'?`<b>${J(a,'과')}</b> 뜻이 <b>반대</b>인 낱말을 시소에 태워요!`:`<b>${J(a,'과')}</b> 뜻이 <b>비슷한</b> 낱말을 시소에 태워요!`;q.reveal=`${a} ${L==='a'?'↔':'≈'} ${b}`;}
    else{const c=p.deck(CAT,'dk_b');const items=R.sample(c[1],3);const others=R.shuffle(CAT.filter(x=>x!==c&&!(c[0]==='곤충'&&x[0]==='동물')&&!(c[0]==='동물'&&x[0]==='곤충')).map(x=>x[0])).slice(0,3);q.left=items.join(' · ');q.items=items;q.ans=c[0];q.words=R.shuffle([c[0],...others]);
      q.text=`<b>${items.join(', ')}</b>${J(items[2],'을').slice(items[2].length)} 묶어서 부르는 말은?`;q.reveal=`${items.join(', ')} → ${c[0]}`;}
    q.okIdx=q.words.indexOf(q.ans);q.speak=strip(q.text);q.review=strip(q.text)+' → '+q.reveal;return q;},
  qtime(q){return q.items?20:16;},askHtml(q){return '🛝 '+q.text;},askSub(q){return '알맞은 낱말 블록을 눌러요';},
  isOk(q,i){return i===q.okIdx;},tipOf(q){return q.reveal;},
  onNew(p,q){const st=p.state;st.angT=-.15;st.shown=null;},
  onVerdict(p,q,ok,i,to){const st=p.state;st.shown=i>=0?q.words[i]:null;st.angT=ok?0:.2;if(!ok)setTimeout(()=>{st.shown=q.ans;st.angT=0;},900);},
  upd(p,dt){const st=p.state;st.ang+=(st.angT-st.ang)*Math.min(1,dt*5);if(st.res==='ok'&&Math.abs(st.ang)<.02)st.ang=Math.sin(st.rT*14)*.02*Math.max(0,1-st.rT);},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);const sp=this.sayRect(p);if(K.inRect(x,y,sp)){QK.say(q.speak);return;}const i=G.rects.findIndex(r=>K.inRect(x,y,r));if(i>=0){p.Snd.tap&&p.Snd.tap();this.verdict(p,i,false);}},
  sayRect(p){const G=this.geo(p);const s=Math.min(G.u*1.1,G.sc.h*.12);return{x:G.sc.x+G.pad,y:G.sc.y+G.sc.h-s*1.4,w:s*3.2,h:s};},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const r=this.geo(p).rects[q.okIdx];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;const su=Math.min(u,G.sc.w/14,G.sc.h/7);park(g,W,H,u,t*.5,G.land?H-u*1.2:G.sc.y+G.sc.h*.93);
    if(!st.lock&&st.qmax>0){const bw=Math.min(W*.5,u*10);QZ.bar(g,W/2-bw/2,(p.top||0)+u*.2,bw,Math.max(5,u*.2),st.qt/st.qmax);}
    const L=Math.min(G.sc.w*.9,su*13.5);const cy=G.sc.y+G.sc.h*.66-su*.4;
    const right={text:st.shown||'?',empty:!st.shown,ok:st.res==='ok',bad:st.res==='bad'&&st.shown&&st.shown!==q.ans};
    seesaw(g,G.sc.x+G.sc.w/2,cy,L,st.ang,su,{text:q.left,many:!!q.items},right);
    if(st.res==='ok'&&st.rT<1.2){for(let k=0;k<6;k++){const a=k/6*TAU+st.rT*3;K.txt(g,'✨',G.sc.x+G.sc.w/2+Math.cos(a)*su*3.2,cy-su*2.6+Math.sin(a)*su*1.4,{size:su*.6,alpha:Math.max(0,1-st.rT/1.1)});}}
    const sr=this.sayRect(p);K.card(g,sr.x,sr.y,sr.w,sr.h,sr.h/2,'#ede9fe',{stroke:INK,lw:2,blur:0,dy:3,sc:INK});K.txt(g,'🔈 들려줘',sr.x+sr.w/2,sr.y+sr.h/2,{size:sr.h*.5,color:INK,maxW:sr.w*.88});
    K.card(g,G.pad,(p.top||0)+u*.4,u*4.1,u*.8,u*.4,'rgba(255,255,255,.9)',{stroke:INK,lw:2,blur:0,dy:0});K.txt(g,'⚖️ 균형 '+(st.okN||0)+'번',G.pad+u*2.05,(p.top||0)+u*.8,{size:u*.5,color:INK,maxW:u*3.7});
    G.rects.forEach((r,i)=>{const isAns=i===q.okIdx,picked=st.pick===i;let s2='idle';if(st.lock){if(isAns)s2='ok';else if(picked)s2='bad';else s2='dim';}QK.card(g,u,r,q.words[i],s2,{fill:BCOL[i%4],bd:INK,ink:INK,blur:0});});
  },
};
QZ.mix(GAME,{say:true,pts0:60,pts1:60});
Engine.boot(GAME);
