/* 6학년 사회 · 민주주의 · 선거 · 지구촌 평화 — 정답 과녁 슛
   디자인: 가을 운동회 '박 터뜨리기'. 정답이 적힌 박을 향해 콩주머니를 휙 던져요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#1c2b4d';
const strip=s=>String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M24 4v10" stroke="#1c2b4d" stroke-width="3"/><circle cx="24" cy="26" r="14" fill="#e53935" stroke="#1c2b4d" stroke-width="3.2"/><path d="M14 20c4 2 16 2 20 0" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/><ellipse cx="19" cy="21" rx="3" ry="2" fill="#fff" opacity=".7"/></svg>';
const DECKS=/*@@DECKS@@*/;
const Q=/*@@Q@@*/;
const GC=['#e53935','#1e66d0','#f2a900'];
function flags(g,W,y,u,t){g.strokeStyle='#64748b';g.lineWidth=2;g.beginPath();g.moveTo(0,y);g.quadraticCurveTo(W/2,y+u*.5,W,y);g.stroke();const n=Math.ceil(W/(u*.9));const cl=['#e53935','#f2a900','#1e66d0','#2ea043','#9b51e0'];for(let i=0;i<n;i++){const x=i*u*.9+u*.3;const yy=y+Math.sin(i/n*Math.PI)*u*.5;g.fillStyle=cl[i%5];g.beginPath();g.moveTo(x,yy);g.lineTo(x+u*.6,yy);g.lineTo(x+u*.3,yy+u*.7+Math.sin(t*3+i)*u*.05);g.closePath();g.fill();}}
function field(g,W,H,u,t,gy){K.vgrad(g,0,0,W,H,['#8fd3ff','#d8f0ff','#fff6d8']);K.clouds(g,W,H,t*.5,.12,3,u*1.6);K.hills(g,W,H,gy-u,'#b7efc5','#86e0a3',t);K.ground(g,gy,W,H,'#e8cf9b','#f3e0b0');
  g.save();g.globalAlpha=.25;g.strokeStyle='#fff';g.lineWidth=3;for(let i=0;i<5;i++){g.beginPath();g.moveTo(W/2+(i-2)*W*.08,gy);g.lineTo(W/2+(i-2)*W*.4,H);g.stroke();}g.restore();}
/* 박 */
function gourd(g,x,y,r,col,text,u,o){o=o||{};g.save();g.translate(x,y);g.rotate(o.ang||0);
  const lw=Math.max(3,u*.09);g.strokeStyle='#92400e';g.lineWidth=lw;g.beginPath();g.moveTo(0,-r*2.2);g.lineTo(0,-r);g.stroke();
  if(o.glow)K.glow(g,0,0,r*1.7,'#fde047',.7);
  const half=(sx)=>{g.save();g.translate(sx*(o.burst||0)*r*.9,(o.burst||0)*r*.4);g.rotate(sx*(o.burst||0)*.7);g.beginPath();g.arc(0,0,r,sx<0?Math.PI/2:-Math.PI/2,sx<0?Math.PI*1.5:Math.PI*.5);g.closePath();g.fillStyle=col;g.fill();g.strokeStyle=INK;g.lineWidth=lw;g.stroke();g.restore();};
  if(o.burst>0){half(-1);half(1);}else{const gr=g.createRadialGradient(-r*.3,-r*.35,r*.1,0,0,r);gr.addColorStop(0,K.shade(col,.5));gr.addColorStop(.6,col);gr.addColorStop(1,K.shade(col,-.25));g.fillStyle=gr;g.beginPath();g.arc(0,0,r,0,TAU);g.fill();g.strokeStyle=INK;g.lineWidth=lw;g.stroke();
    g.fillStyle='rgba(255,255,255,.5)';g.beginPath();g.ellipse(-r*.45,-r*.5,r*.22,r*.12,-.6,0,TAU);g.fill();g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=lw*.7;g.beginPath();g.arc(0,0,r*.92,Math.PI*.15,Math.PI*.85);g.stroke();
    /* 박 이음선 */g.strokeStyle='rgba(28,43,77,.35)';g.lineWidth=2;g.beginPath();g.moveTo(-r,0);g.lineTo(r,0);g.stroke();
    QK.txt(g,text,0,0,r*1.7,r*1.5,Math.min(r*.5,u*1.1),'#fff',1.15);}
  g.restore();}
function bagArt(g,x,y,s,rot){g.save();g.translate(x,y);g.rotate(rot||0);g.fillStyle='#e53935';g.strokeStyle=INK;g.lineWidth=Math.max(2,s*.07);K.rr(g,-s*.5,-s*.42,s,s*.84,s*.28);g.fill();g.stroke();g.fillStyle='#1e66d0';g.fillRect(-s*.5+g.lineWidth/2,-s*.12,s-g.lineWidth,s*.24);g.fillStyle='#f2a900';g.beginPath();g.arc(0,0,s*.14,0,TAU);g.fill();g.stroke();g.restore();}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/7:Math.min(W,H)/7;const gy=H*.8;field(g,W,H,u,T,gy);flags(g,W,H*.04,u*.7,T);
    const per=4,ph=(T%per)/per,n=Math.floor(T/per);const r=Math.min(u*1.15,W*.12);[0,1,2].forEach(i=>{const x=W*(.25+i*.25),y=H*.3+Math.sin(T*1.3+i)*u*.12;const hit=i===n%3&&ph>.5;gourd(g,x,y,r,GC[i],['민주','선거','평화'][i],u,{ang:Math.sin(T*1.2+i)*.07,burst:hit?clamp((ph-.5)*3,0,1):0});});
    const tx=W*(.25+(n%3)*.25),ty=H*.3;const f=clamp(ph/.5,0,1);if(ph<.5)bagArt(g,W*.5+(tx-W*.5)*f,H*.78+(ty-H*.78)*f-Math.sin(f*Math.PI)*u*1.2,u*.9,f*9);else{bagArt(g,W*.5,H*.8,u*.9,0);for(let k=0;k<8;k++){const a=k/8*TAU,e=(ph-.5)*2;K.txt(g,'🎉',tx+Math.cos(a)*e*u*1.8,ty+Math.sin(a)*e*u*1.8,{size:u*.4,alpha:1-e});}}
    if(ph<.5)bagArt(g,W*.5,H*.8,u*.9,0);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'beanbag',title:'정답 과녁 슛',title1:'가을 운동회 박 터뜨리기',title2:'정답 과녁 슛',emoji:LOGO,
  subtitle:'6학년 사회 · 민주주의 · 선거 · 지구촌 평화',
  howto:'문제를 읽고 정답이 적힌 박을 향해 콩주머니를 <b>위로 휙 던져요</b>! (박을 바로 눌러도 던져져요) 맞히면 박이 쩍! 갈라지며 폭죽이 터지고, 빨리 맞힐수록 점수가 커요.',
  how:p=>({demo:'<b>민주주의</b>, 다수결, 민주화 운동',vote:'<b>선거의 원칙</b>과 국민의 대표',peace:'<b>국제기구</b>, 비정부 기구, 지속 가능한 발전'}[p.levelId]),
  theme:{c1:'#1e66d0',c2:'#e53935'},hero:heroScene,vignette:.04,durs:[90,150,240],levelTitle:'어떤 단원을 던질까요?',
  txt:{who:'누가 던질까요?',dur:'운동회 시간',pace:'한 문제 시간',seat:'번 선수 ',go:'경기 시작!',s1:'1. 단원',s2:'2. 방법',s3:'3. 이름'},
  levels:DECKS.map(d=>({id:d.key,g:'6학년',t:d.ic+' '+d.label,d:d.tag+' · '+d.desc})),
  summary:`<ul><li><b>민주주의</b>는 국민이 나라의 주인으로서 함께 결정하는 정치예요. 다수결로 정할 때도 <b>소수 의견을 존중</b>해야 해요.</li>
    <li>선거의 4원칙은 <b>보통·평등·직접·비밀 선거</b>예요. 후보자는 <b>공약</b>을 내걸고, 선거 관리 위원회가 공정하게 관리해요.</li>
    <li>세계 평화를 위해 <b>국제 연합(UN)</b>, 유니세프, 유네스코 같은 국제기구와 그린피스, 국경 없는 의사회 같은 <b>비정부 기구</b>가 활동해요.</li>
    <li><b>지속 가능한 발전</b>은 지금 세대와 미래 세대가 함께 잘 사는 발전이에요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=(p.top||0)+u*1.1;const land=W>=H*1.2;const A=H-Z0;const gy=Z0+A*.78;let r,tg;
    if(land){r=Math.min(W*.14,A*.19,u*2.8);tg=[0,1,2].map(i=>({x:W*(.19+i*.31),y:Z0+A*(.3+(i===1?.04:-.02)),r}));}
    else{r=Math.min(W*.2,A*.14);tg=[{x:W*.27,y:Z0+A*.2,r},{x:W*.73,y:Z0+A*.2,r},{x:W*.5,y:Z0+A*.45,r}];}
    return{W,H,u,Z0,land,A,r,gy,tg,ox:W/2,oy:Z0+A*.9};},
  init(p){Object.assign(p.state,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,fly:null,miss:null,burst:0,msg:'',msgT:0,drag:null});this.newQ(p);},
  make(p,L){const R=p.R,it=p.deck(Q[L],'dk_'+L);const opts=R.shuffle([it[1],...it[2]]);return{it,text:it[0],ans:it[1],opts,okIdx:opts.indexOf(it[1]),reveal:it[1],review:it[0]+' → '+it[1],speak:it[0]};},
  qtime(){return 15;},askHtml(q){return '🎯 '+q.text;},askSub(){return '정답 박을 향해 위로 휙 던져요!';},
  isOk(q,i){return i===q.okIdx;},tipOf(q){return '정답은 '+q.reveal;},hold(p){return !!p.state.fly;},
  onNew(p){const st=p.state;st.fly=null;st.burst=0;st.msg='';st.miss=null;},
  onVerdict(p,q,ok){const st=p.state;st.msg=ok?'명중! 정답이에요':'빗나감! 정답은 '+q.ans;st.msgT=0;},
  upd(p,dt){const st=p.state;st.msgT+=dt;const G=this.geo(p);if(st.fly){const f=st.fly;f.t+=dt/.55;if(f.t>=1){const i=f.i;st.fly=null;if(i==null){st.miss={t:0};p.Snd.tap&&p.Snd.tap();}else{st.hitI=i;this.verdict(p,i,false);}}}
    if(st.res==='ok')st.burst=Math.min(1,st.burst+dt*3);if(st.miss){st.miss.t+=dt;if(st.miss.t>.6)st.miss=null;}},
  throwTo(p,i,mx,my){const st=p.state;if(st.lock||st.fly)return;const G=this.geo(p);const tx=i==null?mx:G.tg[i].x,ty=i==null?my:G.tg[i].y;st.fly={i,t:0,tx,ty,ox:G.ox,oy:G.oy};p.Snd.tone&&p.Snd.tone(500,.15,'sine',.04);},
  down(p,x,y){const st=p.state;if(st.lock||st.fly||!st.q)return;const G=this.geo(p);const i=G.tg.findIndex(t=>Math.hypot(x-t.x,y-t.y)<t.r*1.1);if(i>=0){this.throwTo(p,i);st.drag=null;return;}st.drag={x0:x,y0:y};},
  up(p,x,y,d){const st=p.state;const s=st.drag;st.drag=null;if(!s||st.lock||st.fly)return;const dx=x-s.x0,dy=y-s.y0;if(dy>-25)return;const G=this.geo(p);const ang=Math.atan2(dy,dx);let best=-1,bd=1e9;G.tg.forEach((t,i)=>{const a=Math.atan2(t.y-G.oy,t.x-G.ox);let dd=Math.abs(a-ang);if(dd>Math.PI)dd=TAU-dd;if(dd<bd){bd=dd;best=i;}});
    if(bd<.38)this.throwTo(p,best);else{const L=G.oy*.9;this.throwTo(p,null,G.ox+Math.cos(ang)*L,G.oy+Math.sin(ang)*L);}},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock||st.fly)return null;const t=this.geo(p).tg[q.okIdx];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+t.x,y:rc.top+t.y};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;field(g,W,H,u,t*.4,G.gy);flags(g,W,(p.top||0)+u*.55,u*.5,t);
    if(!st.lock&&st.qmax>0){const bw=Math.min(W*.5,u*10);QZ.bar(g,W/2-bw/2,(p.top||0)+u*.12,bw,Math.max(5,u*.2),st.qt/st.qmax,{good:'#1e66d0'});}
    G.tg.forEach((tt,i)=>{const isAns=i===q.okIdx;const hit=st.res&&st.hitI===i;const burst=st.res==='ok'&&isAns?st.burst:0;const wob=(st.res==='bad'&&st.pick===i)?Math.sin(t*30)*.18:Math.sin(t*1.2+i)*.07;
      gourd(g,tt.x,tt.y+Math.sin(t*1.3+i)*u*.08,tt.r,GC[i],q.opts[i],u,{ang:wob,burst,glow:st.lock&&isAns&&st.res==='bad'});
      if(st.lock&&isAns&&st.res==='ok'&&burst>.5){const f=clamp((st.rT-.3)/.5,0,1);K.card(g,tt.x-tt.r*.9,tt.y+tt.r*.2+f*tt.r*1.4,tt.r*1.8,tt.r*.6,tt.r*.2,'#fde047',{stroke:INK,lw:3,blur:0,dy:3,sc:INK});K.txt(g,'정답!',tt.x,tt.y+tt.r*.5+f*tt.r*1.4,{size:tt.r*.4,color:INK});}});
    if(st.res==='ok'){for(let k=0;k<18;k++){const a=k/18*TAU+k,e=clamp(st.rT*1.2,0,1),tt=G.tg[q.okIdx];K.txt(g,['🎉','✨','🎊'][k%3],tt.x+Math.cos(a)*e*u*(2+k%3),tt.y+Math.sin(a)*e*u*(2+k%3)+e*e*u*1.5,{size:u*.5,alpha:1-e});}}
    /* 콩주머니 */
    if(st.fly){const f=st.fly,k=clamp(f.t,0,1);bagArt(g,f.ox+(f.tx-f.ox)*k,f.oy+(f.ty-f.oy)*k-Math.sin(k*Math.PI)*Math.max(40,(f.oy-f.ty)*.35),u*1.1*(1-k*.3),k*9);}
    else if(!st.lock)bagArt(g,G.ox+(st.drag?0:0),G.oy,u*1.1,Math.sin(t*3)*.1);
    if(!st.lock&&!st.fly&&st.n<=2)K.txt(g,'👆 위로 휙!',G.ox,G.oy-u*1.1,{size:u*.6,color:INK,stroke:'#fff'});
    if(st.miss)K.txt(g,'빗나갔어요! 다시 던져요',W/2,G.oy-u*2.2,{size:u*.6,color:'#b91c1c',stroke:'#fff'});
    if(st.msg&&st.lock)K.txt(g,st.msg,W/2,G.oy-u*2.1,{size:Math.min(u*.8,W*.05),color:st.res==='ok'?'#15803d':'#b91c1c',stroke:'#fff',maxW:W*.9});
    K.card(g,u*.3,(p.top||0)+u*.4,u*3.6,u*.8,u*.4,'rgba(255,255,255,.9)',{stroke:INK,lw:2,blur:0,dy:0});K.txt(g,'🎯 명중 '+(st.okN||0)+'번',u*.3+u*1.8,(p.top||0)+u*.8,{size:u*.5,color:INK,maxW:u*3.2});
  },
};
QZ.mix(GAME,{say:false,pts0:50,pts1:50,okMs:1700,badMs:2600});
Engine.boot(GAME);
