/* 4학년 · 땅의 변화 — 화산 돌 새총 (새총을 당겨 정답 돌판을 맞히기)
   디자인: 해 질 녘 화산 마을. 얼굴 있는 화산이 반응하고, 맞히면 쾅! 하고 분화해요. 돌은 직접 그린 현무암이에요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#2a1410';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M4 42L18 16h12l14 26z" fill="#6b4036" stroke="#2a1410" stroke-width="3" stroke-linejoin="round"/><path d="M18 16l-3-8 5 4 4-7 4 7 5-4-3 8z" fill="#ff6a2b" stroke="#2a1410" stroke-width="2.5" stroke-linejoin="round"/><circle cx="20" cy="28" r="2" fill="#fff"/><circle cx="28" cy="28" r="2" fill="#fff"/><path d="M21 34q3 3 6 0" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
/*@@DATA@@*/
/* 현무암 돌: 구멍 숭숭 */
function rock(g,x,y,r,rot){g.save();g.translate(x,y);g.rotate(rot||0);g.lineJoin='round';
  const gr=g.createRadialGradient(-r*.3,-r*.35,r*.1,0,0,r*1.1);gr.addColorStop(0,'#8a7a73');gr.addColorStop(1,'#3b2f2b');g.fillStyle=gr;g.strokeStyle=INK;g.lineWidth=Math.max(1.6,r*.1);
  g.beginPath();for(let i=0;i<9;i++){const a=i/9*TAU,rr=r*(.85+.15*Math.sin(i*2.3+1));const px=Math.cos(a)*rr,py=Math.sin(a)*rr;i?g.lineTo(px,py):g.moveTo(px,py);}g.closePath();g.fill();g.stroke();
  g.fillStyle='rgba(20,10,8,.55)';[[-.3,-.1,.14],[.2,.25,.11],[.25,-.3,.09],[-.15,.35,.08],[.45,.05,.07]].forEach(([a,b,c])=>{g.beginPath();g.arc(a*r,b*r,c*r,0,TAU);g.fill();});
  g.fillStyle='rgba(255,255,255,.22)';g.beginPath();g.ellipse(-r*.35,-r*.4,r*.28,r*.14,-.6,0,TAU);g.fill();g.restore();}
/* 화산이: 얼굴 있는 화산 (mood: neutral|happy|oops) */
function volcano(g,vx,gy,bw,top,u,t,mood,erupt){
  const cw=bw*.22;
  /* 연기 */
  for(let k=0;k<4;k++){const tt=(t*.35+k/4)%1;g.globalAlpha=(1-tt)*.6;const sx=vx+Math.sin(k*2+tt*3)*u*.6*tt,sy=top-u*.3-tt*u*4,r=bw*(.14+tt*.36);
    const sg=g.createRadialGradient(sx-r*.3,sy-r*.3,r*.1,sx,sy,r);sg.addColorStop(0,'#a8a29e');sg.addColorStop(1,'#44403c');g.fillStyle=sg;g.beginPath();g.arc(sx,sy,r,0,TAU);g.fill();}g.globalAlpha=1;
  K.glow(g,vx,top,u*(2.4+erupt*2),'#ff7a3d',.55+.1*Math.sin(t*3)+erupt*.3);
  /* 분화: 용암 불꽃 */
  if(erupt>0){for(let k=0;k<12;k++){const a=-Math.PI/2+(k/11-.5)*1.6,d=erupt*u*(2+k%3);g.fillStyle=['#fde047','#fb923c','#ef4444'][k%3];g.globalAlpha=Math.min(1,erupt*1.5);g.beginPath();g.arc(vx+Math.cos(a)*d*.7,top+Math.sin(a)*d-erupt*u*.5+ (1-erupt)*u*2,u*.14*(1+erupt),0,TAU);g.fill();}g.globalAlpha=1;}
  g.save();g.beginPath();g.moveTo(vx-bw,gy);g.quadraticCurveTo(vx-cw*1.3,top+u*1.2,vx-cw,top);g.lineTo(vx+cw,top);g.quadraticCurveTo(vx+cw*1.3,top+u*1.2,vx+bw,gy);g.closePath();
  const vg=g.createLinearGradient(vx-bw,0,vx+bw,0);vg.addColorStop(0,'#5b4a44');vg.addColorStop(.45,'#8a6f62');vg.addColorStop(1,'#4a3b36');g.fillStyle=vg;g.fill();g.strokeStyle=INK;g.lineWidth=Math.max(2,u*.07);g.stroke();g.clip();
  g.strokeStyle='#ff6a2b';g.lineCap='round';g.shadowColor='#ffb347';g.shadowBlur=u*.4;g.lineWidth=u*.2;g.beginPath();g.moveTo(vx-cw*.3,top);g.quadraticCurveTo(vx-cw*.8,top+u*1.4,vx-cw*1.5,top+u*2.6);g.stroke();
  g.lineWidth=u*.14;g.beginPath();g.moveTo(vx+cw*.4,top);g.quadraticCurveTo(vx+cw*.6,top+u*.8,vx+cw*1.2,top+u*1.6);g.stroke();g.restore();
  g.fillStyle='#ff8a3d';g.beginPath();g.ellipse(vx,top,cw,u*.16,0,0,TAU);g.fill();g.fillStyle='#ffd166';g.beginPath();g.ellipse(vx,top,cw*.6,u*.08,0,0,TAU);g.fill();
  /* 얼굴 */
  const fs=bw*.7,fy=top+(gy-top)*.45;g.save();g.translate(vx,fy);g.strokeStyle='#1a0f0c';g.fillStyle='#1a0f0c';g.lineWidth=Math.max(2,fs*.07);g.lineCap='round';
  for(const d of[-1,1]){const ex=d*fs*.24,ey=-fs*.05;if(mood==='oops'){g.beginPath();g.moveTo(ex-fs*.08,ey-fs*.08);g.lineTo(ex+fs*.08,ey+fs*.08);g.moveTo(ex+fs*.08,ey-fs*.08);g.lineTo(ex-fs*.08,ey+fs*.08);g.stroke();}
    else if(mood==='happy'){g.beginPath();g.arc(ex,ey+fs*.03,fs*.09,Math.PI*1.1,Math.PI*1.9);g.stroke();}
    else{g.fillStyle='#fff';g.beginPath();g.ellipse(ex,ey,fs*.1,fs*.12,0,0,TAU);g.fill();g.stroke();g.fillStyle='#1a0f0c';g.beginPath();g.arc(ex,ey+fs*.02,fs*.05,0,TAU);g.fill();}}
  g.beginPath();if(mood==='happy'){g.fillStyle='#7f1d1d';g.arc(0,fs*.12,fs*.16,0,Math.PI);g.fill();g.stroke();}else if(mood==='oops'){g.arc(0,fs*.28,fs*.12,1.15*Math.PI,1.85*Math.PI);g.stroke();}else{g.arc(0,fs*.1,fs*.12,.15*Math.PI,.85*Math.PI);g.stroke();}
  g.fillStyle='rgba(255,120,80,.5)';for(const d of[-1,1]){g.beginPath();g.ellipse(d*fs*.38,fs*.1,fs*.07,fs*.045,0,0,TAU);g.fill();}g.restore();}
function dusk(g,W,H,u,t,gy){
  K.vgrad(g,0,0,W,gy,['#1b1030','#4a1d3a','#b4472a','#ffa45c']);
  K.stars(g,W,gy*.45,t,26,4,'#ffe9d6');
  K.glow(g,W*.72,gy*.8,Math.max(W,H)*.4,'#ffb36b',.4);
  g.fillStyle='#3a1f2e';g.beginPath();g.moveTo(0,gy);for(let x=0;x<=W;x+=W/30)g.lineTo(x,gy-H*.1-Math.sin(x/W*7)*H*.03-Math.sin(x/W*17)*H*.01);g.lineTo(W,gy);g.fill();
  K.ground(g,gy,W,H,'#6b4a3c','#3b2822');}
function tablet(g,x,y,w,h,u,text,state,t){/* state: ''|ok|bad|reveal */
  const base=state==='ok'?'#dcfce7':state==='bad'?'#fee2e2':'#e8e0d4';
  g.save();g.shadowColor='rgba(0,0,0,.4)';g.shadowBlur=u*.3;g.shadowOffsetY=u*.1;K.rr(g,x,y,w,h,u*.28);const gr=g.createLinearGradient(0,y,0,y+h);gr.addColorStop(0,base);gr.addColorStop(1,K.shade(base,-.14));g.fillStyle=gr;g.fill();g.restore();
  K.rr(g,x,y,w,h,u*.28);g.strokeStyle=state==='reveal'?'#22c55e':state==='ok'?'#16a34a':state==='bad'?'#dc2626':INK;g.lineWidth=Math.max(2,u*(state?.12:.07));g.stroke();
  if(state==='reveal')K.glow(g,x+w/2,y+h/2,w*.7,'#4ade80',.5+.2*Math.sin(t*8));
  /* 이끼 */
  g.fillStyle='rgba(101,163,13,.35)';g.beginPath();g.ellipse(x+w*.15,y+h*.04,w*.12,u*.1,0,0,TAU);g.fill();g.beginPath();g.ellipse(x+w*.8,y+h*.96,w*.1,u*.08,0,0,TAU);g.fill();
  const bx=x+u*.5,by=y+h/2;[[.36,'#ef4444'],[.26,'#ffffff'],[.16,'#ef4444'],[.07,'#ffffff']].forEach(([rr,c])=>{g.fillStyle=c;g.beginPath();g.arc(bx,by,u*rr,0,TAU);g.fill();});
  K.tag(g,text,x+w/2+u*.35,y+h/2,{size:u*.42,maxW:w-u*.9,fill:'rgba(255,255,255,0)',stroke:'rgba(255,255,255,0)',lw:1,color:'#2a1410',maxLines:3});}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/8:Math.min(W,H)/7;const gy=H*.88;dusk(g,W,H,u,T,gy);
    const per=3.2,ph=(T%per)/per;const erupt=ph>.38&&ph<.6?Math.sin((ph-.38)/.22*Math.PI):0;
    const bw=wide?W*.22:W*.36;volcano(g,W*(wide?.3:.5),gy,bw,gy-bw*1.25,u,T,erupt>0?'happy':'neutral',erupt);
    /* 날아가는 돌 */
    if(ph<.38){const f=ph/.38;const x0=W*(wide?.1:.1),y0=gy-u*1.6,x1=W*(wide?.55:.78),y1=gy-u*3;const x=x0+(x1-x0)*f,y=y0+(y1-y0)*f-Math.sin(f*Math.PI)*u*3;rock(g,x,y,u*.45,f*8);}
    const tw=u*3.2,th=u*1.3;if(wide){tablet(g,W*.86-tw*.4,H*.58,tw*.8,th*.8,u*.8,'정답!',ph>.38&&ph<.8?'ok':'',T);}else{tablet(g,W*.66-tw/2,H*.5,tw,th,u,'정답!',ph>.38&&ph<.8?'ok':'',T);
    tablet(g,W*.7-tw/2,H*.36,tw,th,u,'오답',ph>.4&&ph<.8?'bad':'',T);}};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
/*@@HEAD@@*/
  Z(p){const u=p.u;return{y0:Math.max(p.top||0,u*2.6),gy:p.H*.86};},
  init(p){const st=p.state;Object.assign(st,{rock:null,pull:null,tg:[],q:null,T:0,mood:'neutral',moodT:0,erupt:0,qt:0,qmax:0,rev:false});this.newQ(p);},
  anchor(p){return{x:p.W*.17,y:p.H*.66};},
  newQ(p){const st=p.state,L=p.levelId,R=p.R;const pool=L==='all'?[...LAND_Q.river,...LAND_Q.volcano,...LAND_Q.quake]:LAND_Q[L];
    const q=p.deck(pool,'land');st.q=q;const opts=R.shuffle([q[1],...R.sample(q[2],Math.min(2,q[2].length))]);
    const n=opts.length;const W=p.W,H=p.H,u=p.u,Z=this.Z(p);
    const slots=R.shuffle([[.72,0],[.86,.5],[.66,1],[.9,.1],[.6,.45]]).slice(0,n);
    const yA=Z.y0+u*1.1,yB=Z.gy-u*1.9;
    st.tg=opts.map((t,i)=>{const [fx,fy]=slots[i];const w=Math.min(u*4,W*.42);return{t,ok:t===q[1],x:Math.min(W-w/2-u*.15,Math.max(W*.5+w/2*.3,W*fx)),y:yA+(yB-yA)*fy,ph:R.num(0,6),dead:false,oy:0};});
    st.busy=false;st.rev=false;st.qmax=34/p.pace;st.qt=st.qmax;p.ask('🌋 '+q[0],'새총을 당겨 정답 과녁을 맞혀요');},
  vmax(p){return Math.sqrt(p.H*1.25*Math.max(p.W,p.H)*1.25);},
  update(p,dt){const st=p.state,u=p.u,g=p.H*1.25;st.T+=dt;if(st.moodT>0){st.moodT-=dt;if(st.moodT<=0)st.mood='neutral';}if(st.erupt>0)st.erupt=Math.max(0,st.erupt-dt*1.2);
    for(const t of st.tg){t.oy=Math.sin(p.t*1.2*p.pace+t.ph)*u*.3*(.6+p.pace*.4);}
    if(!st.busy&&!st.rev){st.qt-=dt;if(st.qt<=0){st.rev=true;st.busy=true;st.mood='oops';st.moodT=2;st.rock=null;st.pull=null;
      p.hit(false,{pen:10,x:p.W/2,y:p.H*.4,tip:`시간이 다 됐어요! 정답: <b>${st.q[1]}</b>`,tipMs:2500});const rv=strip(st.q[0])+' → '+st.q[1];if(!p.wrong.includes(rv)&&p.wrong.length<40)p.wrong.push(rv);setTimeout(()=>{if(p.active)this.newQ(p);},2500);}}
    const r=st.rock;if(!r)return;r.vy+=g*dt;r.x+=r.vx*dt;r.y+=r.vy*dt;r.rot+=dt*8;
    for(const t of st.tg){if(t.dead||st.busy)continue;const rect=this.tRect(p,t);
      if(r.x>rect.x-u*.25&&r.x<rect.x+rect.w+u*.25&&r.y>rect.y-u*.25&&r.y<rect.y+rect.h+u*.25){t.dead=true;t.res=t.ok?'ok':'bad';st.rock=null;p.Snd.boom();
        p.burst(t.x,t.y+t.oy,t.ok?'#facc15':'#ef4444',18);st.mood=t.ok?'happy':'oops';st.moodT=1.4;if(t.ok)st.erupt=1;
        p.hit(t.ok,{x:t.x,y:t.y+t.oy-u,tip:t.ok?`정답: ${st.q[1]}`:`정답: <b>${st.q[1]}</b>`,review:strip(st.q[0])+' → '+st.q[1]});
        st.busy=true;st.tg.forEach(o=>{if(!t.ok&&o.ok)o.reveal=true;});setTimeout(()=>{if(p.active)this.newQ(p);},t.ok?800:1700);return;}}
    if(r.x>p.W+u*2||r.y>p.H+u*2||r.x<-u*3)st.rock=null;},
  tRect(p,t){const u=p.u;const w=Math.min(u*4,p.W*.42);return{x:t.x-w/2,y:t.y+(t.oy||0)-u*.9,w,h:u*1.8};},
  pill(g,str,x,y,s,bg,fg){g.save();g.font=K.font(s);const w=g.measureText(str).width+s*1.2;K.card(g,x-w/2,y-s*.8,w,s*1.6,s*.8,bg,{blur:s*.6,dy:s*.15,hi:false,stroke:INK,lw:2});K.txt(g,str,x,y+s*.03,{size:s,color:fg});g.restore();},
  draw(p,g){const W=p.W,H=p.H,u=p.u,st=p.state,A=this.anchor(p),Z=this.Z(p),gy=Z.gy,t=st.T;
    dusk(g,W,H,u,t,gy);
    const vx=W*.1,bw=Math.min(W*.24,u*3.4),top=gy-bw*1.25;
    volcano(g,vx,gy,bw,top,u,t,st.mood,st.erupt);
    for(let k=0;k<6;k++){const x=(k*0.19+.05)*W;K.shadow(g,x,gy+u*.4+(k%2)*u*.3,u*.25,u*.07,.15);}
    for(const o of st.tg){if(o.dead)continue;const r=this.tRect(p,o);g.save();g.strokeStyle='#5a3a24';g.lineWidth=Math.max(3,u*.12);g.lineCap='round';g.beginPath();g.moveTo(o.x,r.y+r.h);g.lineTo(o.x,gy);g.stroke();g.restore();K.shadow(g,o.x,gy+u*.05,u*.35,u*.08,.25);}
    for(const o of st.tg){const r=this.tRect(p,o);if(o.dead){const pr=Math.min(1,(t-(o.dt||(o.dt=t)))*2);g.save();g.globalAlpha=1-pr;g.translate(0,pr*u*1.5);tablet(g,r.x,r.y,r.w,r.h,u,o.t,o.res,t);g.restore();continue;}
      tablet(g,r.x,r.y,r.w,r.h,u,o.t,(st.rev&&o.ok)||o.reveal?'reveal':'',t);}
    /* 새총 */
    const wood=(x1,y1,x2,y2,w)=>{g.lineWidth=w;g.strokeStyle='#7c4a1e';g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke();g.lineWidth=w*.4;g.strokeStyle='rgba(255,220,170,.35)';g.beginPath();g.moveTo(x1-w*.15,y1);g.lineTo(x2-w*.15,y2);g.stroke();};
    g.save();g.lineCap='round';K.shadow(g,A.x,Math.min(gy+u*.1,A.y+u*2.05),u*.6,u*.12,.25);
    const rp=st.pull?st.pull:{x:A.x,y:A.y};
    g.strokeStyle='#3f2a1e';g.lineWidth=u*.09;g.beginPath();g.moveTo(A.x+u*.5,A.y-u*.2);g.lineTo(rp.x,rp.y);g.stroke();
    wood(A.x,A.y+u*2,A.x,A.y+u*.6,u*.28);wood(A.x,A.y+u*.6,A.x-u*.5,A.y-u*.2,u*.24);wood(A.x,A.y+u*.6,A.x+u*.5,A.y-u*.2,u*.24);
    g.strokeStyle='#3f2a1e';g.lineWidth=u*.09;g.beginPath();g.moveTo(A.x-u*.5,A.y-u*.2);g.lineTo(rp.x,rp.y);g.stroke();g.restore();
    if(!st.rock&&!st.busy){K.glow(g,rp.x,rp.y,u*.9,'#ffb347',.35);rock(g,rp.x,rp.y,u*.4,0);
      if(st.pull){const v=this.vel(p);for(let k=1;k<10;k++){const tt=k*.05;const x=rp.x+v.x*tt,y=rp.y+v.y*tt+.5*p.H*1.25*tt*tt;g.fillStyle=`rgba(255,235,200,${.95-k*.07})`;g.beginPath();g.arc(x,y,u*(.11-k*.006),0,TAU);g.fill();g.strokeStyle='rgba(42,20,16,.5)';g.lineWidth=1;g.stroke();}}
      else{const a=.6+.4*Math.sin(t*4);g.save();g.globalAlpha=a;this.pill(g,'← 당겨요',A.x-u*.2,A.y+u*2.65,u*.32,'#fff7ed','#7c2d12');g.restore();}}
    if(st.rock){K.glow(g,st.rock.x,st.rock.y,u*.8,'#ffb347',.3);rock(g,st.rock.x,st.rock.y,u*.4,st.rock.rot);}
    if(!st.busy&&!st.rev){const f=clamp(st.qt/st.qmax,0,1),bw2=Math.min(W*.5,u*9),bh=Math.max(5,u*.14),bx=W/2-bw2/2,by=H-u*.3;K.rr(g,bx,by,bw2,bh,bh/2);g.fillStyle='rgba(255,255,255,.14)';g.fill();K.rr(g,bx,by,Math.max(bh,bw2*f),bh,bh/2);g.fillStyle=f>.4?'#fbbf24':(f>.2?'#fb923c':'#ef4444');g.fill();}},
  vel(p){const A=this.anchor(p),st=p.state;const dx=A.x-st.pull.x,dy=A.y-st.pull.y;const L=Math.hypot(dx,dy);const mx=p.u*2.6;const f=Math.min(1,L/mx)*this.vmax(p)/(L||1);return{x:dx*f,y:dy*f};},
  down(p,x,y){const st=p.state,A=this.anchor(p);if(st.rock||st.busy)return;if(Math.hypot(x-A.x,y-A.y)<p.u*2.5)st.pull={x,y};},
  move(p,x,y,down){const st=p.state;if(!st.pull||!down)return;const A=this.anchor(p);let dx=x-A.x,dy=y-A.y;const L=Math.hypot(dx,dy),mx=p.u*2.6;if(L>mx){dx*=mx/L;dy*=mx/L;}st.pull={x:A.x+dx,y:A.y+dy};},
  up(p){const st=p.state;if(!st.pull)return;const A=this.anchor(p);if(Math.hypot(st.pull.x-A.x,st.pull.y-A.y)<p.u*.5){st.pull=null;return;}
    const v=this.vel(p);st.rock={x:st.pull.x,y:st.pull.y,vx:v.x,vy:v.y,rot:0};st.pull=null;p.Snd.whoosh();},
};

Engine.boot(GAME);
