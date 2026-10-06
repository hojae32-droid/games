/* 3학년 · 감염병과 건강한 생활 — 세균 방어대 (비누 거품을 쏘아 세균은 물리치고, 좋은 습관은 받기)
   디자인: 민트와 핑크의 비누 거품 세상. 비누돌이·세균·하트·욕실은 직접 그린 그림이고, 연속으로 맞히면 거품 3발이 나가요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const plain=s=>String(s).replace(/<[^>]+>/g,'');
const hash=n=>{n=Math.imul(n^(n>>>16),0x45d9f3b);n=Math.imul(n^(n>>>15),0x45d9f3b);return((n^(n>>>16))>>>0)/4294967296;};
const hstr=s=>{let h=7;for(const c of String(s))h=(h*31+c.charCodeAt(0))|0;return Math.abs(h);};
const INK='#0f5a4a';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="6" y="14" width="36" height="24" rx="10" fill="#ff9ec0" stroke="#0f5a4a" stroke-width="3"/><circle cx="18" cy="24" r="2.5" fill="#0f5a4a"/><circle cx="30" cy="24" r="2.5" fill="#0f5a4a"/><path d="M20 30q4 3 8 0" fill="none" stroke="#0f5a4a" stroke-width="2.5" stroke-linecap="round"/><circle cx="14" cy="9" r="5" fill="#d6f5ff" stroke="#0f5a4a" stroke-width="2"/><circle cx="28" cy="7" r="3.5" fill="#d6f5ff" stroke="#0f5a4a" stroke-width="2"/></svg>';
/*@@DATA@@*/
function bubble(g,x,y,r,a=1){g.save();g.globalAlpha*=a;const gr=g.createRadialGradient(x-r*.3,y-r*.35,r*.05,x,y,r);gr.addColorStop(0,'rgba(255,255,255,.95)');gr.addColorStop(.55,'rgba(186,230,253,.45)');gr.addColorStop(.9,'rgba(125,211,252,.55)');gr.addColorStop(1,'rgba(56,189,248,.8)');
  g.fillStyle=gr;g.beginPath();g.arc(x,y,r,0,TAU);g.fill();g.strokeStyle='rgba(255,255,255,.9)';g.lineWidth=Math.max(1,r*.12);g.beginPath();g.arc(x,y,r*.68,3.6,4.5);g.stroke();g.restore();}
/* 세균: (x,y)=가운데, r=반지름, id로 색·모양이 달라요 */
function germ(g,x,y,r,t,id,mood){const pal=[['#a3e635','#4d7c0f'],['#c084fc','#6b21a8'],['#fb923c','#9a3412'],['#f472b6','#9d174d'],['#38bdf8','#075985']][id%5];const sp=7+id%4;
  g.save();g.translate(x,y);g.rotate(Math.sin(t*1.5+id)*.15);g.lineJoin='round';g.lineWidth=Math.max(2,r*.1);g.strokeStyle=pal[1];
  g.fillStyle=pal[0];for(let i=0;i<sp;i++){const a=i*TAU/sp+t*.4;g.save();g.rotate(a);g.beginPath();g.moveTo(r*.7,-r*.12);g.lineTo(r*1.22,0);g.lineTo(r*.7,r*.12);g.closePath();g.fill();g.stroke();g.beginPath();g.arc(r*1.25,0,r*.1,0,TAU);g.fill();g.stroke();g.restore();}
  const gr=g.createRadialGradient(-r*.3,-r*.35,r*.1,0,0,r);gr.addColorStop(0,'#ffffff55');gr.addColorStop(.01,pal[0]);gr.addColorStop(1,pal[0]);g.fillStyle=gr;g.beginPath();g.arc(0,0,r*.8,0,TAU);g.fill();g.stroke();
  g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.ellipse(-r*.3,-r*.35,r*.22,r*.12,-.5,0,TAU);g.fill();
  g.fillStyle='#fff';g.strokeStyle=pal[1];g.lineWidth=Math.max(1.5,r*.06);for(const d of[-1,1]){g.beginPath();g.ellipse(d*r*.28,-r*.08,r*.17,r*.2,0,0,TAU);g.fill();g.stroke();}
  g.fillStyle=pal[1];for(const d of[-1,1]){g.beginPath();g.arc(d*r*.28+Math.sin(t*2)*r*.03,-r*.04,r*.08,0,TAU);g.fill();}
  g.lineWidth=Math.max(2,r*.07);g.lineCap='round';for(const d of[-1,1]){g.beginPath();g.moveTo(d*r*.5,-r*.34);g.lineTo(d*r*.12,-r*.24);g.stroke();}
  g.beginPath();g.moveTo(-r*.3,r*.28);g.quadraticCurveTo(0,r*.5,r*.3,r*.28);g.stroke();g.fillStyle='#fff';for(let i=-1;i<=1;i++){g.beginPath();g.moveTo(i*r*.14-r*.06,r*.33);g.lineTo(i*r*.14+r*.06,r*.33);g.lineTo(i*r*.14,r*.44);g.fill();}
  g.restore();}
/* 착한 하트 */
function heart(g,x,y,r,t,id){g.save();g.translate(x,y);const pu=1+Math.sin(t*4+id)*.05;g.scale(pu,pu);K.glow(g,0,0,r*1.5,'#4ade80',.4);g.lineJoin='round';g.lineWidth=Math.max(2,r*.1);g.strokeStyle='#15803d';
  g.fillStyle='#4ade80';g.beginPath();g.moveTo(0,r*.85);g.bezierCurveTo(r*1.4,-r*.1,r*.7,-r*.95,0,-r*.3);g.bezierCurveTo(-r*.7,-r*.95,-r*1.4,-r*.1,0,r*.85);g.fill();g.stroke();
  g.fillStyle='rgba(255,255,255,.45)';g.beginPath();g.ellipse(-r*.4,-r*.35,r*.22,r*.12,-.6,0,TAU);g.fill();
  g.fillStyle='#14532d';for(const d of[-1,1]){g.beginPath();g.arc(d*r*.26,-r*.02,r*.07,0,TAU);g.fill();}g.strokeStyle='#14532d';g.lineWidth=Math.max(1.6,r*.06);g.lineCap='round';g.beginPath();g.arc(0,r*.12,r*.18,.15*Math.PI,.85*Math.PI);g.stroke();
  g.fillStyle='rgba(255,120,150,.5)';for(const d of[-1,1]){g.beginPath();g.ellipse(d*r*.48,r*.12,r*.1,r*.06,0,0,TAU);g.fill();}
  g.restore();}
/* 비누돌이: (x,y)=바닥 가운데 */
function soap(g,x,y,s,t,mood,col){g.save();g.translate(x,y);const bob=mood==='happy'?-Math.abs(Math.sin(t*10))*s*.1:Math.sin(t*3)*s*.015;g.translate(0,bob);K.shadow(g,0,-bob+s*.02,s*.55,s*.08,.22);
  g.lineJoin='round';g.lineWidth=Math.max(2.5,s*.05);g.strokeStyle=INK;
  const gr=g.createLinearGradient(0,-s*.7,0,0);gr.addColorStop(0,'#ffc2d9');gr.addColorStop(1,'#ff8fb8');g.fillStyle=gr;K.rr(g,-s*.55,-s*.7,s*1.1,s*.7,s*.28);g.fill();g.stroke();
  g.fillStyle='rgba(255,255,255,.5)';K.rr(g,-s*.42,-s*.62,s*.5,s*.12,s*.06);g.fill();
  /* 거품 머리 */
  for(const [dx,dy,r] of [[-.3,-.78,.2],[0,-.9,.26],[.3,-.78,.2],[.12,-1.02,.14]])bubble(g,dx*s,dy*s,r*s);
  /* 얼굴 */
  g.fillStyle=INK;g.strokeStyle=INK;g.lineWidth=Math.max(2,s*.04);g.lineCap='round';
  if(mood==='happy'){for(const d of[-1,1]){g.beginPath();g.arc(d*s*.22,-s*.38,s*.07,Math.PI*1.1,Math.PI*1.9);g.stroke();}g.fillStyle='#c0392b';g.beginPath();g.arc(0,-s*.3,s*.14,0,Math.PI);g.fill();}
  else if(mood==='oops'){for(const d of[-1,1]){g.beginPath();g.moveTo(d*s*.22-s*.06,-s*.43);g.lineTo(d*s*.22+s*.06,-s*.33);g.moveTo(d*s*.22+s*.06,-s*.43);g.lineTo(d*s*.22-s*.06,-s*.33);g.stroke();}g.beginPath();g.arc(0,-s*.2,s*.09,1.15*Math.PI,1.85*Math.PI);g.stroke();}
  else{for(const d of[-1,1]){g.beginPath();g.arc(d*s*.22,-s*.38,s*.055,0,TAU);g.fill();}g.beginPath();g.arc(0,-s*.32,s*.1,.15*Math.PI,.85*Math.PI);g.stroke();}
  g.fillStyle='rgba(255,90,130,.45)';for(const d of[-1,1]){g.beginPath();g.ellipse(d*s*.38,-s*.28,s*.08,s*.05,0,0,TAU);g.fill();}
  g.fillStyle=col;g.strokeStyle=INK;K.rr(g,-s*.18,-s*.1,s*.36,s*.1,s*.04);g.fill();g.stroke();
  g.restore();}
function bathBG(g,W,H,u,t){K.vgrad(g,0,0,W,H,['#e0f7f4','#d4f1f9','#e9e7fb']);
  const tg=u*1.3;g.save();g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=2;g.beginPath();for(let x=tg;x<W;x+=tg){g.moveTo(x,0);g.lineTo(x,H);}for(let y=tg;y<H;y+=tg){g.moveTo(0,y);g.lineTo(W,y);}g.stroke();g.restore();
  for(let k=0;k<8;k++){const r=u*(.25+(k%3)*.18);const x=(k*173+40)%W+Math.sin(t*.8+k)*u*.4;const y=H-((k*131+t*u*.6)%(H+u*2))+u;bubble(g,x,y,r,.5);}}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/6.5:Math.min(W,H)/7;bathBG(g,W,H,u,T);
    for(let i=0;i<5;i++){const x=W*(.12+i*.19),y=((T*u*.5+i*u*2.1)%(H*.9))+H*.02;if(i%2)heart(g,x,y,u*.45,T,i);else germ(g,x,y,u*.5,T,i,'');}
    soap(g,W*(wide?.84:.5)+Math.sin(T)*u*.5,H-u*.15,u*(wide?1.5:2),T,Math.sin(T*1.3)>.4?'happy':'neutral','#ff5c8a');
    for(let i=0;i<4;i++){const y=H-u*1.6-((T*u*4+i*u*2)%(H*.7));bubble(g,W*(wide?.84:.5)+Math.sin(i*2)*u*.3,y,u*.2,.9);}};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
/*@@HEAD@@*/
  init(p){const st=p.state;Object.assign(st,{x:p.W/2,tx:p.W/2,bul:[],en:[],fireT:0,spawnT:.5,setN:0,cnt:0,T:0,mood:'neutral',moodT:0,pops:[]});this.useSet(p);},
  Z0(p){return Math.max(p.top||0,p.u*2.6);},
  useSet(p){const st=p.state,L=p.levelId;st.k=L==='all'?(st.setN++%2?'route':'habit'):L;st.cnt=0;p.ask(GERM[st.k].ask,st.k==='habit'?'좋은 습관은 몸으로 받아요':'');},
  spawn(p){const st=p.state,R=p.Rf,u=p.u,W=p.W;const good=R.chance(.4);const S=GERM[st.k];const t=p.deck(good?S.good:S.bad,st.k+(good?'g':'b'));
    st.en.push({x:R.num(W*.18,W*.82),y:this.Z0(p),good,t,ph:R.num(0,6),r:u*.75,id:hstr(t)});st.cnt++;if(p.levelId==='all'&&st.cnt>=10)this.useSet(p);
    st.spawnT=(Math.max(.95,1.6-p.t/p.dur*.6)+R.num(0,.4))/p.pace;},
  fire(p,x){const st=p.state,u=p.u;const n=p.streak>=5?3:1;for(let i=0;i<n;i++)st.bul.push({x:x+(i-(n-1)/2)*u*.9,y:p.H-u*1.9,vx:(i-(n-1)/2)*u*.8});p.Snd.tone(1400,.03,'sine',.02);},
  update(p,dt){const st=p.state,u=p.u,W=p.W,H=p.H;st.T+=dt;if(st.moodT>0){st.moodT-=dt;if(st.moodT<=0)st.mood='neutral';}st.x+=(st.tx-st.x)*Math.min(1,dt*10);
    st.fireT-=dt;st.spawnT-=dt;if(st.spawnT<=0)this.spawn(p);
    const sp=u*(1.15+p.t/p.dur*.6)*p.pace;const ly=H-u*1.2;
    for(const b of st.bul){b.y-=u*11*dt;b.x+=(b.vx||0)*dt;}
    st.pops=st.pops.filter(q=>(q.t+=dt)<.5);
    for(const e of st.en){e.y+=sp*dt;e.x+=Math.sin(p.t*1.5+e.ph)*u*.5*dt;
      for(const b of st.bul){if(!b.dead&&!e.dead&&Math.hypot(b.x-e.x,b.y-e.y)<e.r){b.dead=true;e.dead=true;st.pops.push({x:e.x,y:e.y,t:0,good:e.good});p.ring(e.x,e.y,e.good?'#ef4444':'#22c55e');
          if(e.good){st.mood='oops';st.moodT=1;p.hit(false,{x:e.x,y:e.y,tip:`‘${e.t}’${J(e.t,'은').slice(e.t.length)} 좋은 거예요! 쏘지 말고 받아요`,review:`${e.t} → 건강을 지키는 좋은 것`});}
          else{st.mood='happy';st.moodT=.7;p.hit(true,{x:e.x,y:e.y,color:'#a3e635'});p.Snd.pop();}}}
      if(!e.dead&&e.y>ly-u*.9&&Math.abs(e.x-st.x)<u*1.4){e.dead=true;st.pops.push({x:e.x,y:e.y,t:0,good:e.good});
        if(e.good){st.mood='happy';st.moodT=1;p.hit(true,{x:e.x,y:e.y,color:'#86efac',tip:'좋아요! '+e.t});}
        else{st.mood='oops';st.moodT=1;p.hit(false,{x:e.x,y:e.y,tip:`‘${e.t}’에 닿았어요! 쏘아서 막아요`,review:`${e.t} → 감염병 위험`});}}
      if(!e.dead&&e.y>H+u){e.dead=true;if(!e.good){p.add(-10,e.x,H-u*2);const rv=`${e.t} → 감염병 위험`;if(!p.wrong.includes(rv))p.wrong.push(rv);}}}
    st.bul=st.bul.filter(b=>!b.dead&&b.y>-u);st.en=st.en.filter(e=>!e.dead);},
  draw(p,g){const W=p.W,H=p.H,u=p.u,st=p.state,t=st.T;const Z0=this.Z0(p);
    K.layer(p,'bg',g2=>{K.vgrad(g2,0,0,W,H,['#e0f7f4','#d4f1f9','#e9e7fb']);const tg=u*1.3;g2.strokeStyle='rgba(255,255,255,.8)';g2.lineWidth=2;g2.beginPath();for(let x=tg;x<W;x+=tg){g2.moveTo(x,0);g2.lineTo(x,H);}for(let y=tg;y<H;y+=tg){g2.moveTo(0,y);g2.lineTo(W,y);}g2.stroke();});
    for(let k=0;k<7;k++){const r=u*(.25+(k%3)*.18);const x=(k*173+40)%W+Math.sin(t*.8+k)*u*.4;const y=H-((k*131+t*u*.6)%(H+u*2))+u;bubble(g,x,y,r,.5);}
    for(const e of st.en){K.shadow(g,e.x,e.y+u*.6,u*.45,u*.1,.08);if(e.good)heart(g,e.x,e.y-u*.1,u*.62,t,e.id);else germ(g,e.x,e.y-u*.1,u*.62,t,e.id);
      K.tag(g,e.t,e.x,e.y+u*.95,{size:u*.4,maxW:Math.min(u*4.6,W*.7),fill:e.good?'#f0fdf4':'#fff7ed',stroke:e.good?'rgba(22,163,74,.55)':'rgba(194,65,12,.5)',color:e.good?'#14532d':'#7c2d12'});}
    for(const q of st.pops){const f=q.t/.5;g.save();g.globalAlpha=1-f;g.strokeStyle=q.good?'#4ade80':'#f472b6';g.lineWidth=u*.1;for(let i=0;i<8;i++){const a=i*TAU/8,r1=u*(.3+f*1.1),r2=r1+u*.3;g.beginPath();g.moveTo(q.x+Math.cos(a)*r1,q.y+Math.sin(a)*r1);g.lineTo(q.x+Math.cos(a)*r2,q.y+Math.sin(a)*r2);g.stroke();}g.restore();}
    for(const b of st.bul)bubble(g,b.x,b.y,u*.2);
    /* 방어선: 거품 띠 */
    const ly=H-u*1.2;g.fillStyle='rgba(255,255,255,.85)';for(let x=0;x<=W+u;x+=u*.55){g.beginPath();g.arc(x,ly+Math.sin(x*.05+t*2)*u*.05,u*.34,0,TAU);g.fill();}
    const lg=g.createLinearGradient(0,ly,0,H);lg.addColorStop(0,'rgba(255,255,255,.9)');lg.addColorStop(1,'rgba(255,140,185,.55)');g.fillStyle=lg;g.fillRect(0,ly,W,H-ly);
    K.txt(g,'🛡️ 우리 몸 지키기 라인',W/2,H-u*.25,{size:u*.32,color:'#b0124f'});
    const shield=p.streak>=5;if(shield)K.txt(g,'✨ 거품 3발!',st.x,H-u*3.1,{size:u*.4,color:'#b0124f',stroke:'#fff',lw:u*.12});
    soap(g,st.x,ly+u*.55,u*1.7,t,st.mood,p.color);},
  down(p,x){p.state.tx=x;},
  up(p,x,y,d){const st=p.state,u=p.u;if(Math.hypot(x-d.x0,y-d.y0)<u*.6&&performance.now()-d.t0<400&&st.fireT<=0){st.fireT=.18;st.x=x;st.tx=x;this.fire(p,x);}},
  move(p,x,y,down){if(down)p.state.tx=x;},
};

Engine.boot(GAME);
