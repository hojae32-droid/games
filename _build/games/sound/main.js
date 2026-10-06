/* 3학년 · 소리의 성질 — 소리 리듬 탭 (내려오는 음표를 알맞은 패드로 박자에 맞춰 톡)
   디자인: 팝스타 무대. 북·마이크·음표 친구가 박자에 맞춰 춤추고, 패드를 누르면 소리 물결이 퍼져요. 5연속이면 피버 타임! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#3b0764';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><ellipse cx="16" cy="36" rx="9" ry="7" fill="#ec4899" stroke="#3b0764" stroke-width="3"/><path d="M24 35V9l16 5v8L24 17" fill="#facc15" stroke="#3b0764" stroke-width="3" stroke-linejoin="round"/><circle cx="14" cy="35" r="1.6" fill="#3b0764"/><circle cx="19" cy="35" r="1.6" fill="#3b0764"/></svg>';
/*@@DATA@@*/
/* 표정 도우미: 눈·입 그리기 */
function face(g,s,mood,ey,dx){g.save();g.strokeStyle=INK;g.fillStyle=INK;g.lineWidth=Math.max(1.6,s*.06);g.lineCap='round';
  for(const d of[-1,1]){const x=d*dx;if(mood==='oops'){g.beginPath();g.moveTo(x-s*.07,ey-s*.07);g.lineTo(x+s*.07,ey+s*.07);g.moveTo(x+s*.07,ey-s*.07);g.lineTo(x-s*.07,ey+s*.07);g.stroke();}
    else if(mood==='happy'){g.beginPath();g.arc(x,ey+s*.03,s*.09,Math.PI*1.1,Math.PI*1.9);g.stroke();}
    else{g.fillStyle='#fff';g.beginPath();g.ellipse(x,ey,s*.1,s*.12,0,0,TAU);g.fill();g.stroke();g.fillStyle=INK;g.beginPath();g.arc(x,ey+s*.02,s*.05,0,TAU);g.fill();}}
  g.beginPath();if(mood==='happy'){g.fillStyle='#be123c';g.arc(0,ey+s*.2,s*.14,0,Math.PI);g.fill();g.stroke();}else if(mood==='oops'){g.arc(0,ey+s*.3,s*.1,1.15*Math.PI,1.85*Math.PI);g.stroke();}else{g.arc(0,ey+s*.16,s*.1,.15*Math.PI,.85*Math.PI);g.stroke();}
  g.fillStyle='rgba(244,114,182,.55)';for(const d of[-1,1]){g.beginPath();g.ellipse(d*dx*1.5,ey+s*.12,s*.07,s*.045,0,0,TAU);g.fill();}g.restore();}
/* 소리 친구들: 북(drum) · 마이크(mic) · 음표(note) */
function pal(g,kind,x,y,s,mood,t,bop){g.save();g.translate(x,y-Math.abs(Math.sin(t*5+bop))*s*(mood==='happy'?.18:.06));K.shadow(g,0,s*.62,s*.5,s*.09,.25);g.lineJoin='round';g.lineWidth=Math.max(2,s*.06);g.strokeStyle=INK;
  if(kind==='drum'){const gr=g.createLinearGradient(-s*.5,0,s*.5,0);gr.addColorStop(0,'#f43f5e');gr.addColorStop(.5,'#fb7185');gr.addColorStop(1,'#e11d48');g.fillStyle=gr;K.rr(g,-s*.5,-s*.25,s,s*.85,s*.14);g.fill();g.stroke();
    g.fillStyle='#fff';g.beginPath();g.ellipse(0,-s*.25,s*.5,s*.16,0,0,TAU);g.fill();g.stroke();
    g.strokeStyle='#fde68a';g.lineWidth=s*.05;g.beginPath();for(let i=-2;i<=2;i++){g.moveTo(i*s*.2,-s*.12);g.lineTo(i*s*.2+s*.1,s*.58);g.moveTo(i*s*.2+s*.1,-s*.12);g.lineTo(i*s*.2,s*.58);}g.stroke();
    g.strokeStyle=INK;g.lineWidth=s*.06;const sw=Math.sin(t*10+bop)*.5;for(const d of[-1,1]){g.save();g.translate(d*s*.45,-s*.45);g.rotate(d*(.6+sw*d));g.beginPath();g.moveTo(0,0);g.lineTo(0,-s*.5);g.stroke();g.fillStyle='#fde047';g.beginPath();g.arc(0,-s*.52,s*.07,0,TAU);g.fill();g.restore();}
    g.fillStyle='#fff1f2';g.beginPath();g.ellipse(0,s*.14,s*.38,s*.3,0,0,TAU);g.fill();g.save();g.translate(0,s*.12);face(g,s*.9,mood,0,s*.16);g.restore();}
  else if(kind==='mic'){g.fillStyle='#64748b';K.rr(g,-s*.1,s*.15,s*.2,s*.5,s*.08);g.fill();g.stroke();
    const gr=g.createRadialGradient(-s*.15,-s*.35,s*.05,0,-s*.2,s*.5);gr.addColorStop(0,'#fef9c3');gr.addColorStop(1,'#facc15');g.fillStyle=gr;g.beginPath();g.arc(0,-s*.15,s*.45,0,TAU);g.fill();g.stroke();
    g.strokeStyle='rgba(120,53,15,.3)';g.lineWidth=1.5;for(let i=-3;i<=3;i++){g.beginPath();g.moveTo(i*s*.12,-s*.55);g.lineTo(i*s*.12,s*.25);g.stroke();}
    g.fillStyle='#ec4899';K.rr(g,-s*.2,s*.18,s*.4,s*.1,s*.04);g.fill();
    g.save();g.translate(0,-s*.18);face(g,s*.8,mood,0,s*.15);g.restore();}
  else{g.fillStyle='#22d3ee';g.beginPath();g.ellipse(0,s*.3,s*.42,s*.34,-.25,0,TAU);g.fill();g.stroke();
    g.fillStyle=INK;g.fillRect(s*.28,-s*.55,s*.1,s*.85);g.fillStyle='#22d3ee';g.beginPath();g.moveTo(s*.38,-s*.55);g.quadraticCurveTo(s*.75,-s*.45,s*.6,-s*.05);g.quadraticCurveTo(s*.62,-s*.35,s*.38,-s*.3);g.fill();g.stroke();
    g.save();g.translate(-s*.02,s*.25);face(g,s*.7,mood,0,s*.14);g.restore();}
  g.restore();}
function stageBg(g,W,H,u,t,lineY,fever){
  K.vgrad(g,0,0,W,H,fever?['#4c1d95','#9d174d','#db2777','#6b21a8']:['#2e1065','#4c1d95','#7e22ce','#3b0764']);
  K.stars(g,W,lineY*.7,t,40,5,'#fbcfe8');
  g.save();g.globalCompositeOperation='lighter';
  [[.12,'#f472b6',.6],[.5,'#22d3ee',-.2],[.88,'#fde047',.4]].forEach(([fx,c,ph])=>{const x=W*fx,sw=Math.sin(t*(fever?2:.7)+ph)*W*.12;
    const gr=g.createLinearGradient(x,0,x+sw,lineY);gr.addColorStop(0,K.rgba(c,fever?.5:.3));gr.addColorStop(1,K.rgba(c,0));g.fillStyle=gr;
    g.beginPath();g.moveTo(x-u*.25,0);g.lineTo(x+u*.25,0);g.lineTo(x+sw+W*.12,lineY);g.lineTo(x+sw-W*.12,lineY);g.closePath();g.fill();K.glow(g,x,0,u*1.2,c,.6);});g.restore();
  for(let k=0;k<12;k++){const x=(k*97+13)%W,y=lineY-((k*53+t*22)%lineY);g.globalAlpha=.2+.12*Math.sin(t+k);K.txt(g,k%2?'♪':'♫',x,y,{size:u*(.45+(k%3)*.12),color:'#fbcfe8'});}g.globalAlpha=1;
  /* 색종이 */
  for(let k=0;k<(fever?26:10);k++){const x=(k*131+7)%W,y=((t*u*(.5+k%3*.2)+k*77)%(lineY));g.save();g.translate(x,y);g.rotate(t*2+k);g.fillStyle=['#fde047','#f472b6','#22d3ee','#a3e635'][k%4];g.globalAlpha=.7;g.fillRect(-u*.07,-u*.04,u*.14,u*.08);g.restore();}
  const fy=lineY-u*.9;const gr=g.createLinearGradient(0,fy,0,H);gr.addColorStop(0,'#5b21b6');gr.addColorStop(1,'#2e1065');g.fillStyle=gr;g.fillRect(0,fy,W,H-fy);
  g.fillStyle='rgba(255,255,255,.18)';g.fillRect(0,fy,W,Math.max(2,u*.05));}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/8:Math.min(W,H)/7;const lineY=H*.78;const fever=Math.sin(T*.4)>.3;stageBg(g,W,H,u,T,lineY,fever);
    const s=u*1.5,cy=lineY-u*.2;pal(g,'drum',W*(wide?.22:.2),cy,s,Math.sin(T*3)>0?'happy':'neutral',T,0);pal(g,'mic',W*.5,cy-u*.15,s*1.15,'happy',T,1);pal(g,'note',W*(wide?.78:.8),cy,s,Math.sin(T*3+1)>0?'happy':'neutral',T,2);
    for(let i=0;i<3;i++){const ph=(T*.8+i/3)%1;const x=W*(.3+i*.2),y=ph*lineY;g.globalAlpha=1-Math.abs(ph-.8)*1.2;K.txt(g,['♪','♫','♩'][i],x,y,{size:u*.9,color:'#fde047',stroke:INK,lw:u*.1});}g.globalAlpha=1;
    const pr=(T*1.2)%1;g.strokeStyle=`rgba(253,224,71,${1-pr})`;g.lineWidth=u*.12*(1-pr);g.beginPath();g.arc(W*.5,lineY+u*.5,u*(.5+pr*3),Math.PI,TAU);g.stroke();};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
/*@@HEAD@@*/
  init(p){const st=p.state;Object.assign(st,{notes:[],beat:0,spawnT:1,setK:null,setN:0,padFlash:{},T:0,mood:'neutral',moodT:0,waves:[],pops:[],fever:0,lastS:0});this.useSet(p);},
  useSet(p){const st=p.state,L=p.levelId;let k=L;if(L==='all'){const ks=['pitch','loud','medium','reflect'];k=ks[st.setN%4];}st.setN++;st.setK=k;st.set=SND_SET[k];st.left=8;
    const names={pitch:'높은 소리일까, 낮은 소리일까?',loud:'큰 소리일까, 작은 소리일까?',medium:'무엇을 통해 소리가 전달될까?',reflect:'소리를 반사할까, 흡수할까?'};
    p.ask('🎵 '+names[k],'음표가 노란 선에 닿을 때 패드를 눌러요');},
  geo(p){const H=p.H,u=p.u;const padH=Math.min(H*.2,u*2.2);return{lineY:H-padH-u*.9,padH,padY:H-padH-u*.15,top:Math.max(p.top||0,u*2.6)};},
  spawn(p){const st=p.state,R=p.Rf,G=this.geo(p);const it=p.deck(st.set.items,'snd_'+st.setK);
    const listen=st.setK==='pitch'&&p.n===1&&R.chance(.3);
    st.notes.push({it,y:G.top-p.u*.6,listen,k:it[0],age:0});st.left--;
    if(listen){const f=it[0]==='hi'?1046:262;p.Snd.bell(f,0,.09,.5);p.Snd.bell(f,.45,.09,.5);}},
  update(p,dt){const st=p.state,G=this.geo(p),u=p.u;st.T+=dt;if(st.moodT>0){st.moodT-=dt;if(st.moodT<=0)st.mood='neutral';}
    if(p.streak>=5&&st.lastS<5)st.fever=8;st.lastS=p.streak;if(st.fever>0)st.fever-=dt;
    const fall=(G.lineY-G.top)*p.pace/Math.max(1.7,2.6-p.t/p.dur*.8);
    st.spawnT-=dt;if(st.spawnT<=0){if(st.left<=0&&!st.notes.length)this.useSet(p);if(st.left>0)this.spawn(p);st.spawnT=Math.max(1.05,1.6-p.t/p.dur*.5)*(p.Rf.chance(.25)?1.5:1)/p.pace;}
    for(const n of st.notes){n.age+=dt;n.y+=fall*dt;if(!n.done&&n.y>G.lineY+u*1.1){n.done=true;n.miss=true;st.mood='oops';st.moodT=1;
      p.hit(false,{pen:10,x:p.W/2,y:G.lineY-u,tip:`놓쳤어요! ${n.listen?'들린 소리':n.it[2]} → <b>${st.set.pads.find(q=>q.k===n.k).t}</b>`,review:`${n.listen?(n.k==='hi'?'높은 소리(귀로 듣기)':'낮은 소리(귀로 듣기)'):n.it[2]} → ${st.set.pads.find(q=>q.k===n.k).t}`});}}
    st.notes=st.notes.filter(n=>n.y<p.H+u*2&&!(n.done&&n.fade>1));st.notes.forEach(n=>{if(n.done)n.fade=(n.fade||0)+dt*3;});
    Object.keys(st.padFlash).forEach(k=>{st.padFlash[k]-=dt;});
    st.waves=st.waves.filter(w=>(w.t+=dt)<1);st.pops=st.pops.filter(q=>(q.t+=dt)<1);},
  padRects(p){const G=this.geo(p),W=p.W,u=p.u;const pads=p.state.set.pads;const gap=u*.25;const w=(W-gap*(pads.length+1))/pads.length;
    return pads.map((pd,i)=>({pd,x:gap+i*(w+gap),y:G.padY,w,h:G.padH}));},
  noteCard(p,g,n,a){const W=p.W,u=p.u;const listen=n.listen;const label=listen?'잘 들어 봐요!':n.it[2];const e=listen?'🎧':n.it[1];
    const s=u*.48;g.save();g.globalAlpha*=a*clamp(n.age*4,0,1);g.font=K.font(s);const maxW=Math.min(W*.86,u*7.5)-u*1.2;let lines=K.wrap(g,label,maxW);let fs=s;
    while(lines.length>2&&fs>9){fs*=.9;g.font=K.font(fs);lines=K.wrap(g,label,maxW);}
    const tw=Math.max(...lines.map(l=>g.measureText(l).width));const bh=Math.max(u*1.05,lines.length*fs*1.2+u*.4);const bw=tw+u*1.75;const x=W/2-bw/2,y=n.y-bh/2;
    const fill=n.done?(n.res==='ok'?'#dcfce7':'#ffe4e6'):'#ffffff';
    if(!n.done)K.glow(g,W/2,n.y,bw*.6,'#f0abfc',.25);
    K.card(g,x,y,bw,bh,bh/2,fill,{blur:u*.5,dy:u*.12,sc:'rgba(10,5,40,.45)',stroke:INK,lw:2.5});
    const cx=x+bh/2,r=bh/2-u*.1;const og=g.createLinearGradient(0,n.y-r,0,n.y+r);og.addColorStop(0,'#fdf4ff');og.addColorStop(1,'#fbcfe8');g.fillStyle=og;g.beginPath();g.arc(cx,n.y,r,0,7);g.fill();
    K.emo(g,e,cx,n.y,r*1.45);
    g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';const tx=x+bh+(bw-bh-u*.3)/2;
    lines.forEach((l,i)=>g.fillText(l,tx,n.y+(i-(lines.length-1)/2)*fs*1.2+fs*.04));
    if(n.done)K.emo(g,n.res==='ok'?'✅':'❌',x+bw-u*.05,y+u*.05,u*.55);
    g.restore();},
  draw(p,g){const W=p.W,H=p.H,u=p.u,st=p.state,G=this.geo(p),t=st.T;const fever=st.fever>0;
    stageBg(g,W,H,u,t,G.lineY,fever);
    /* 소리 친구들 */
    const s=Math.min(u*1.9,W*.16),cy=G.lineY-u*.05;const md=st.mood;
    const bw=Math.max(W*.14,s*.8);pal(g,'drum',bw,cy-s*.5,s,md,t,0);pal(g,'note',W-bw,cy-s*.5,s,md,t,2);if(W>H*.9)pal(g,'mic',W/2,cy-s*.55,s*1.1,md,t,1);
    /* 판정선 */
    const pulse=.5+.5*Math.sin(t*6);
    const bz=g.createLinearGradient(0,G.lineY-u*.8,0,G.lineY+u*.8);bz.addColorStop(0,'rgba(250,204,21,0)');bz.addColorStop(.5,`rgba(250,204,21,${.18+.08*pulse})`);bz.addColorStop(1,'rgba(250,204,21,0)');g.fillStyle=bz;g.fillRect(0,G.lineY-u*.8,W,u*1.6);
    g.save();g.shadowColor='#fde047';g.shadowBlur=u*.5;g.fillStyle='#fde68a';K.rr(g,u*.15,G.lineY-u*.06,W-u*.3,u*.12,u*.06);g.fill();g.restore();
    for(const n of st.notes){const a=n.done?Math.max(0,1-(n.fade||0)):1;if(a>0)this.noteCard(p,g,n,a);}
    /* 소리 물결 */
    for(const w of st.waves){const r=u*(.6+w.t*5),a=1-w.t;g.save();g.strokeStyle=K.rgba(w.c,a*.9);g.lineWidth=u*(.1+w.amp*.25)*a;for(let k=0;k<3;k++){g.beginPath();g.arc(w.x,w.y,r*(1-k*.22),Math.PI*1.1,Math.PI*1.9);g.stroke();}g.restore();}
    for(const q of st.pops){const a=1-q.t;K.txt(g,q.s,q.x,q.y-q.t*u*1.2,{size:u*(.5+.3*(1-q.t)),color:q.c,stroke:INK,lw:u*.1,alpha:a});}
    this.padRects(p).forEach(r=>{const fl=Math.max(0,st.padFlash[r.pd.k]||0);const c=r.pd.c;const dy=fl>0?u*.08:0;
      if(fl>0)K.glow(g,r.x+r.w/2,r.y+r.h/2,Math.max(r.w,r.h)*.75,c,.7);
      K.rr(g,r.x,r.y+u*.12,r.w,r.h,u*.45);g.fillStyle=K.shade(c,-.45);g.fill();
      g.save();K.rr(g,r.x,r.y+dy,r.w,r.h,u*.45);const pg=g.createLinearGradient(0,r.y,0,r.y+r.h);pg.addColorStop(0,K.shade(c,fl>0?.45:.25));pg.addColorStop(1,K.shade(c,fl>0?.05:-.15));g.fillStyle=pg;g.fill();
      g.clip();g.fillStyle='rgba(255,255,255,.22)';g.beginPath();g.ellipse(r.x+r.w/2,r.y+dy,r.w*.6,r.h*.42,0,0,7);g.fill();g.restore();
      K.rr(g,r.x,r.y+dy,r.w,r.h,u*.45);g.strokeStyle=INK;g.lineWidth=3;g.stroke();
      K.emo(g,r.pd.e,r.x+r.w/2,r.y+dy+r.h*.36,Math.min(r.h*.4,u*.95));K.txt(g,r.pd.t,r.x+r.w/2,r.y+dy+r.h*.74,{size:Math.min(r.h*.22,u*.55),maxW:r.w*.9,color:'#fff',stroke:K.rgba('#1e1b4b',.5),lw:Math.max(2,u*.08)});});
    if(fever)K.txt(g,'🔥 피버 타임! 🔥',W/2,G.top+u*.4,{size:u*.55,color:'#fde047',stroke:INK,lw:u*.12});},
  down(p,x,y){const st=p.state,G=this.geo(p),u=p.u;const r=this.padRects(p).find(r=>K.inRect(x,y,r));if(!r)return;
    st.padFlash[r.pd.k]=.15;const pd=r.pd;
    if(st.setK==='loud')p.Snd.tone(pd.f,.25,'sine',pd.k==='big'?.12:.03);else p.Snd.tone(pd.f,.2,'sine',.07);
    st.waves.push({x:r.x+r.w/2,y:r.y,t:0,c:pd.c,amp:st.setK==='loud'&&pd.k==='small'?.15:1});
    const cand=st.notes.filter(n=>!n.done).sort((a,b)=>b.y-a.y)[0];if(!cand)return;
    const d=Math.abs(cand.y-G.lineY);if(d>u*1.6){return;}
    cand.done=true;const ok=pd.k===cand.k;cand.res=ok?'ok':'bad';st.mood=ok?'happy':'oops';st.moodT=.9;
    const right=st.set.pads.find(q=>q.k===cand.k).t;const what=cand.listen?(cand.k==='hi'?'방금 들린 높은 소리':'방금 들린 낮은 소리'):cand.it[2];
    const perfect=ok&&d<u*.45;st.pops.push({s:ok?(perfect?'PERFECT!':'GOOD'):'MISS',x:p.W/2,y:G.lineY-u*1.4,t:0,c:ok?(perfect?'#fde047':'#a7f3d0'):'#fecdd3'});
    p.hit(ok,{x:p.W/2,y:G.lineY-u*1.2,tip:ok?SND_TIP[cand.k]:`${what} → <b>${right}</b> (${SND_TIP[cand.k]})`,review:`${what} → ${right}`});
    if(perfect)p.add(20,p.W/2+u*2,G.lineY-u*1.8);},
};

Engine.boot(GAME);
