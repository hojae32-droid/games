/* 1~2학년 국어 · 인물의 마음 · 마음을 나타내는 말 · 마음을 전하는 말 — 마음 우체국
   디자인: 분홍 지붕 우체국. 비둘기 집배원 '구구'가 편지를 읽고, 알맞은 마음 우체통에 배달해요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#7a1d4b';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="5" y="12" width="38" height="28" rx="4" fill="#fff7ed" stroke="#9d174d" stroke-width="3.2"/><path d="M5 15l19 14 19-14" fill="none" stroke="#9d174d" stroke-width="3.2" stroke-linejoin="round"/><path d="M24 36c-6-4-8-7-8-10a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 3-2 6-8 10z" fill="#f43f5e" transform="translate(0 -3) scale(.9) translate(2.5 3)"/></svg>';
/*@@DATA@@*/
const PALM=['#f9a8d4','#93c5fd','#fcd34d','#86efac'];
/* 비둘기 집배원 구구 */
function pigeon(g,x,y,s,mood,t,fly){g.save();g.translate(x,y+Math.sin(t*3)*s*.02);g.lineJoin='round';g.lineWidth=Math.max(2,s*.05);g.strokeStyle=INK;K.shadow(g,0,s*.55,s*.4,s*.07,.22);
  /* 날개 */
  const wf=fly?Math.sin(t*14)*.5:Math.sin(t*2)*.08;g.fillStyle='#cbd5e1';g.save();g.translate(-s*.2,s*.12);g.rotate(-.5+wf);g.beginPath();g.ellipse(0,-s*.16,s*.14,s*.3,0,0,TAU);g.fill();g.stroke();g.restore();
  /* 몸 */
  g.fillStyle='#e2e8f0';g.beginPath();g.ellipse(0,s*.18,s*.38,s*.4,0,0,TAU);g.fill();g.stroke();g.fillStyle='#fff';g.beginPath();g.ellipse(s*.06,s*.26,s*.26,s*.28,0,0,TAU);g.fill();
  /* 가방 */
  g.fillStyle='#f43f5e';K.rr(g,-s*.38,s*.12,s*.3,s*.26,s*.05);g.fill();g.stroke();g.strokeStyle='#fff';g.lineWidth=Math.max(1.5,s*.03);g.beginPath();g.moveTo(-s*.36,s*.2);g.lineTo(-s*.1,s*.2);g.stroke();g.strokeStyle=INK;g.lineWidth=Math.max(2,s*.05);
  /* 머리 */
  g.fillStyle='#e2e8f0';g.beginPath();g.arc(s*.1,-s*.2,s*.26,0,TAU);g.fill();g.stroke();
  /* 모자 */
  g.fillStyle='#ec4899';g.beginPath();g.arc(s*.1,-s*.27,s*.27,Math.PI*1.04,Math.PI*1.96);g.closePath();g.fill();g.stroke();g.fillStyle='#fde047';g.beginPath();g.arc(s*.1,-s*.46,s*.05,0,TAU);g.fill();
  /* 부리 */
  g.fillStyle='#fb923c';g.beginPath();g.moveTo(s*.32,-s*.18);g.lineTo(s*.5,-s*.12);g.lineTo(s*.32,-s*.06);g.closePath();g.fill();g.stroke();
  /* 눈 */
  g.fillStyle=INK;g.strokeStyle=INK;g.lineWidth=Math.max(1.6,s*.04);g.lineCap='round';const ex=s*.19,ey=-s*.2;
  if(mood==='oops'){g.beginPath();g.moveTo(ex-s*.05,ey-s*.05);g.lineTo(ex+s*.05,ey+s*.05);g.moveTo(ex+s*.05,ey-s*.05);g.lineTo(ex-s*.05,ey+s*.05);g.stroke();}
  else if(mood==='happy'){g.beginPath();g.arc(ex,ey+s*.02,s*.06,Math.PI*1.1,Math.PI*1.9);g.stroke();}else{g.beginPath();g.arc(ex,ey,s*.05,0,TAU);g.fill();}
  g.fillStyle='#fda4af';g.beginPath();g.arc(s*.02,-s*.12,s*.05,0,TAU);g.fill();
  /* 다리 */
  g.strokeStyle='#fb923c';g.lineWidth=Math.max(2,s*.05);g.beginPath();g.moveTo(-s*.08,s*.56);g.lineTo(-s*.08,s*.66);g.moveTo(s*.14,s*.56);g.lineTo(s*.14,s*.66);g.stroke();
  g.restore();}
function town(g,W,H,u,t,gy){K.vgrad(g,0,0,W,H,['#fbcfe8','#fde8f3','#fff7ed']);K.clouds(g,W,H,t*.5,.1,3,u*1.4);
  /* 먼 집들 */
  const cols=['#fda4af','#fcd34d','#a5b4fc','#86efac','#fdba74'];for(let i=0;i<9;i++){const x=i*W/8-u*.4,w=u*1.7,h=u*(1.2+(i*37%5)*.25);const y=gy-h;g.fillStyle=cols[i%5];g.fillRect(x,y,w,h);g.fillStyle='#fff';g.beginPath();g.moveTo(x-u*.1,y);g.lineTo(x+w/2,y-u*.6);g.lineTo(x+w+u*.1,y);g.closePath();g.fillStyle=cols[(i+2)%5];g.fill();g.fillStyle='rgba(255,255,255,.7)';g.fillRect(x+w*.3,y+h*.35,w*.4,h*.28);}
  g.fillStyle='#bbf7d0';g.fillRect(0,gy,W,H-gy);g.fillStyle='#86efac';g.fillRect(0,gy,W,Math.max(3,u*.12));}
function mailbox(g,x,y,w,h,col,face,word,u,o){o=o||{};g.save();const lw=Math.max(3,u*.08);
  if(o.glow)K.glow(g,x+w/2,y+h/2,Math.max(w,h)*.8,'#fde047',.6);
  /* 기둥 */
  g.fillStyle='#a16207';g.strokeStyle=INK;g.lineWidth=lw;K.rr(g,x+w*.44,y+h*.78,w*.12,h*.22,w*.03);g.fill();g.stroke();
  /* 통 */
  K.card(g,x+w*.06,y,w*.88,h*.8,w*.28,o.fill||col,{stroke:INK,lw,blur:0,dy:u*.08,sc:INK});
  g.fillStyle='rgba(255,255,255,.35)';K.rr(g,x+w*.14,y+h*.06,w*.72,h*.1,h*.05);g.fill();
  /* 우편 구멍 */
  g.fillStyle=INK;K.rr(g,x+w*.3,y+h*.17,w*.4,h*.05,h*.025);g.fill();
  K.emo(g,face,x+w/2,y+h*.4,Math.min(w*.46,h*.3));
  K.txt(g,word,x+w/2,y+h*.67,{size:Math.min(w*.2,h*.14),color:INK,maxW:w*.78});
  /* 깃발 */
  g.fillStyle='#ef4444';g.beginPath();g.moveTo(x+w*.9,y+h*.12);g.lineTo(x+w*.9,y-h*.12);g.lineTo(x+w*1.04,y-h*.04);g.lineTo(x+w*.9,y+h*.02);g.closePath();g.fill();g.stroke();
  g.restore();}
function paper(g,x,y,w,h,u){K.card(g,x,y,w,h,u*.25,'#fffdf5',{stroke:INK,lw:Math.max(2.5,u*.07),blur:0,dy:u*.08,sc:INK});g.save();g.strokeStyle='rgba(244,114,182,.28)';g.lineWidth=1.4;for(let yy=y+u*1.1;yy<y+h-u*.3;yy+=u*.5){g.beginPath();g.moveTo(x+u*.35,yy);g.lineTo(x+w-u*.35,yy);g.stroke();}g.restore();}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const FE=[['😄','기쁘다'],['😢','슬프다'],['😠','화나다'],['😲','놀라다']];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/7:Math.min(W,H)/7;const gy=H*.86;town(g,W,H,u,T,gy);
    const n=wide?4:3,bw=Math.min(u*1.9,W/(n+.8)),bx0=W/2-(n*bw*1.15)/2;const per=3.2,ph=(T%per)/per,cur=Math.floor(T/per)%n;
    for(let i=0;i<n;i++){mailbox(g,bx0+i*bw*1.15,gy-bw*1.35,bw,bw*1.45,PALM[i],FE[i][0],FE[i][1],u,{glow:i===cur&&ph>.55});}
    /* 편지를 든 비둘기가 날아와요 */
    const tx=bx0+cur*bw*1.15+bw/2,sx=-u,f=clamp(ph/.55,0,1),e=f*f*(3-2*f);const px=sx+(tx-sx)*e,py=H*.3+Math.sin(f*Math.PI)*-u*.5+f*(gy-bw*1.35-H*.3-u*.6);
    if(ph<.6)pigeon(g,px,py,u*1.4,'neutral',T,true);else pigeon(g,tx+bw*.9,gy-bw*.5,u*1.3,'happy',T,false);
    if(ph<.55){K.emo(g,'✉️',px+u*.9,py+u*.1,u*.7,Math.sin(T*8)*.2);}};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'k04-feeling-post',title:'마음 우체국',title1:'편지 배달 왔어요',title2:'마음 우체국',emoji:LOGO,
  subtitle:'1~2학년 · 인물의 마음 · 마음을 나타내는 말',
  howto:'친구들의 이야기가 담긴 편지가 도착했어요! 편지를 읽고 그 친구의 <b>마음</b>이 적힌 우체통을 <b>콕</b> 눌러 배달해요. 마지막 단계에서는 친구에게 <b>마음을 전하는 말</b>을 골라요. 🔈를 누르면 편지를 읽어 줘요.',
  how:p=>({a:'<b>기쁘다·슬프다·화나다·무섭다·놀라다</b> 우체통에 배달해요',b:'<b>설레다·속상하다·뿌듯하다…</b> 여러 가지 마음 말',c:'친구에게 <b>마음을 전하는 말</b>을 골라요'}[p.levelId]),
  theme:{c1:'#db2777',c2:'#f59e0b'},hero:heroScene,vignette:.04,durs:[90,150,240],levelTitle:'어떤 편지를 배달할까요?',
  txt:{who:'누가 집배원이 될까요?',dur:'배달 시간',pace:'한 문제 시간',seat:'번 집배원 ',go:'배달 시작!',s1:'1. 편지',s2:'2. 방법',s3:'3. 이름'},
  levels:[
    {id:'a',g:'1~2학년',t:'기본 마음 말',d:'기쁘다 · 슬프다 · 화나다 · 무섭다 · 놀라다'},
    {id:'b',g:'1~2학년',t:'여러 가지 마음 말',d:'설레다 · 속상하다 · 뿌듯하다 · 억울하다 …'},
    {id:'c',g:'1~2학년',t:'마음을 전하는 말',d:'이럴 때 뭐라고 말할까요?'},
  ],
  summary:`<ul><li>이야기 속 인물의 <b>마음</b>은 그 상황에서 어떤 일이 일어났는지 살펴보면 알 수 있어요.</li>
    <li>마음을 나타내는 말에는 <b>기쁘다, 슬프다, 화나다, 무섭다, 놀라다</b>가 있고, 더 자세히 <b>설레다, 속상하다, 억울하다, 뿌듯하다, 서운하다, 미안하다, 고맙다</b>처럼 말할 수 있어요.</li>
    <li>친구의 마음을 알았다면 <b>따뜻한 말</b>로 전해요. “괜찮아?”, “고마워!”, “미안해.”, “축하해!”</li>
    <li>마음을 나누는 말을 쓰면 친구와 더 가까워져요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=(p.top||0)+u*1.5;const land=W>=H*1.2;const pad=Math.max(8,u*.3),gap=Math.max(7,u*.25);const A=H-Z0-pad;const q=p.state.q;const talk=q&&q.ty==='talk';
    let paperR,optsR,mascot;
    if(land){const lw=W*.42;paperR={x:pad,y:Z0,w:lw,h:A*.72};mascot={x:pad+lw*.5,y:Z0+A*.86,s:Math.min(A*.28,lw*.4)};optsR={x:pad*2+lw,y:Z0,w:W-lw-pad*3,h:A};}
    else{const ph=A*.34,rowH=u*2.3;paperR={x:pad,y:Z0,w:W-pad*2,h:ph};optsR={x:pad,y:Z0+ph+rowH+gap,w:W-pad*2,h:A-ph-rowH-gap*2};mascot={x:W-pad-u*1.5,y:Z0+ph+rowH*.5,s:u*1.7};}
    const n=q?(q.ty==='talk'?q.opts.length:q.boxes.length):4;let cols=talk?1:2;const rows=Math.ceil(n/cols);
    const cw=(optsR.w-(cols-1)*gap)/cols,ch=(optsR.h-(rows-1)*gap)/rows;const rects=[];for(let i=0;i<n;i++)rects.push({x:optsR.x+(i%cols)*(cw+gap),y:optsR.y+Math.floor(i/cols)*(ch+gap),w:cw,h:ch});
    return{W,H,u,Z0,land,pad,gap,paperR,optsR,mascot,rects};},
  init(p){Object.assign(p.state,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0});this.newQ(p);},
  make(p,L){const R=p.R,q={};
    if(L==='c'){const s=p.deck(TALK,'dk_c');q.ty='talk';q.s=s;q.text='이럴 때 친구에게 <b>어떤 말</b>을 해 줄까요?';q.speak=s[0];q.reveal=s[1];q.opts=R.shuffle([s[1],s[2],s[3]]).map(t=>({t,ok:t===s[1]}));q.okIdx=q.opts.findIndex(o=>o.ok);q.review=s[0]+' → '+s[1];return q;}
    const pool=L==='a'?SIT_A:SIT_B;const E=L==='a'?EMO_A:EMO_B;const s=p.deck(pool,'dk_'+L);const alt=s[2]||[];const others=R.shuffle(Object.keys(E).filter(e=>e!==s[1]&&!alt.includes(e))).slice(0,3);
    q.ty='post';q.s=s;q.boxes=R.shuffle([s[1],...others]);q.E=E;q.okIdx=q.boxes.indexOf(s[1]);q.text='편지 속 친구는 <b>어떤 마음</b>일까요?';q.speak=s[0];q.reveal=s[1];q.review=s[0]+' → '+s[1];return q;},
  qtime(q){return q.ty==='talk'?26:22;},askHtml(q){return '💌 '+q.text;},askSub(q){return q.ty==='talk'?'알맞은 말을 눌러요':'알맞은 우체통을 눌러요';},
  isOk(q,i){return i===q.okIdx;},tipOf(q){return q.ty==='talk'?'알맞은 말: '+q.reveal:'이 친구의 마음은 '+q.reveal;},
  onVerdict(p,q,ok){if(ok&&q.ty==='post')p.state.fly=0;},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);const sp=this.sayRect(p);if(sp&&K.inRect(x,y,sp)){QK.say(q.speak);return;}const i=G.rects.findIndex(r=>K.inRect(x,y,r));if(i>=0){p.Snd.tap&&p.Snd.tap();this.verdict(p,i,false);}},
  sayRect(p){const G=this.geo(p),r=G.paperR;const s=Math.min(G.u*1.1,r.h*.18);return G.land?{x:r.x+r.w-s*3.3,y:r.y+r.h-s*1.2,w:s*3.1,h:s}:{x:r.x+G.u*.3,y:r.y+r.h+G.u*.6,w:G.u*4.4,h:G.u*1.15};},
  upd(p,dt){const st=p.state;if(st.fly!=null)st.fly+=dt;},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const r=this.geo(p).rects[q.okIdx];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;town(g,W,H,u,t*.5,H-u*.4);
    /* 시간 막대 */
    if(!st.lock&&st.qmax>0){const bw=Math.min(W*.5,u*10);QZ.bar(g,W/2-bw/2,(p.top||0)+u*.2,bw,Math.max(5,u*.2),st.qt/st.qmax);}
    /* 편지 / 이야기 */
    const pr=G.paperR;
    if(q.ty==='post'){const fl=st.res==='ok'?clamp((st.fly||0)/.7,0,1):0;const dx=0;paper(g,pr.x,pr.y,pr.w,pr.h,u);K.emo(g,'✉️',pr.x+u*.9,pr.y+u*.75,u*1.1,-.12);K.txt(g,'마음 우체국',pr.x+pr.w/2,pr.y+u*.6,{size:u*.55,color:'#db2777',maxW:pr.w*.5});
      QK.txt(g,q.s[0],pr.x+pr.w/2,pr.y+pr.h*.55,pr.w-u*.9,pr.h-u*2.2,Math.min(u*1.15,pr.h*.2),INK,1.35);}
    else{paper(g,pr.x,pr.y,pr.w,pr.h,u);const kid=st.res?(st.res==='ok'?'😊':'😥'):(q.s[5]||'🧒');K.emo(g,kid,pr.x+pr.w-u*1.2,pr.y+pr.h*.25,Math.min(u*1.8,pr.h*.3),Math.sin(t*3)*.05);K.txt(g,'💬 이런 일이 있었어요',pr.x+u*.4,pr.y+u*.6,{size:u*.5,color:'#db2777',align:'left',maxW:pr.w-u*3});
      QK.txt(g,q.s[0],pr.x+pr.w/2-u*.5,pr.y+pr.h*.62,pr.w-u*2.6,pr.h-u*1.8,Math.min(u*1.1,pr.h*.2),INK,1.35);}
    /* 읽어 주기 */
    const sr=this.sayRect(p);K.card(g,sr.x,sr.y,sr.w,sr.h,sr.h/2,'#fce7f3',{stroke:INK,lw:2,blur:0,dy:3,sc:INK});K.txt(g,'🔈 읽어 줘',sr.x+sr.w/2,sr.y+sr.h/2,{size:sr.h*.5,color:INK,maxW:sr.w*.88});
    /* 선택 칸 */
    G.rects.forEach((r,i)=>{const isAns=i===q.okIdx;const picked=st.pick===i;const show=st.lock;let dim=show&&!isAns&&!picked;
      if(q.ty==='post'){const e=q.boxes[i];g.save();g.globalAlpha=dim?.45:1;const sk=(show&&picked&&!isAns)?Math.sin(t*50)*u*.08:0;mailbox(g,r.x+sk+r.w*.1,r.y,r.w*.8,r.h,PALM[i%4],q.E[e],e,u,{glow:show&&isAns,fill:show&&picked&&!isAns?'#fecaca':undefined});g.restore();
        if(show&&isAns&&st.res==='ok'&&st.rT<1){const f=clamp(st.rT/.8,0,1);K.emo(g,'✉️',pr.x+pr.w/2+(r.x+r.w/2-pr.x-pr.w/2)*f,pr.y+pr.h*.55+(r.y+r.h*.3-pr.y-pr.h*.55)*f-Math.sin(f*Math.PI)*u,u*1.1*(1-f*.5),f*5);}}
      else{let s2='idle';if(show){if(isAns)s2='ok';else if(picked)s2='bad';else s2='dim';}QK.card(g,u,r,'💬 '+q.opts[i].t,s2,{fill:'#fff',bd:'#db2777',ink:INK,blur:0});}});
    pigeon(g,G.mascot.x,G.mascot.y,G.mascot.s,st.mood,t,false);
    K.card(g,G.pad,(p.top||0)+u*.4,u*3.9,u*.8,u*.4,'rgba(255,255,255,.88)',{stroke:INK,lw:2,blur:0,dy:0});K.txt(g,'💌 배달 '+(st.okN||0)+'통',G.pad+u*1.95,(p.top||0)+u*.8,{size:u*.5,color:INK,maxW:u*3.5});
  },
};
QZ.mix(GAME,{say:true,pts0:60,pts1:60});
Engine.boot(GAME);
