/* 6학년 과학 · 전기의 이용 — 정전 마을 전기 기사
   정전된 마을을 되살리는 전기 기사가 되어 회로 · 전기가 통하는 물체 · 전지/전구 연결 · 전자석 · 전기 안전을 해결해요.
   미션을 맞힐 때마다 아래 마을의 창문에 불이 하나씩 켜져요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const easeOut=t=>1-Math.pow(1-clamp(t,0,1),3);
const easeIO=t=>{t=clamp(t,0,1);return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;};
const plain=s=>String(s).replace(/<[^>]+>/g,'');
const hash=n=>{n=Math.imul(n^(n>>>16),0x45d9f3b);n=Math.imul(n^(n>>>15),0x45d9f3b);return((n^(n>>>16))>>>0)/4294967296;};
const COL={copper:'#e58a3a',copperD:'#8f4d14',copperL:'#ffc58a',volt:'#ffd23f',cyan:'#3ee6ff',mint:'#3df0b8',steel:'#a9b8d8',navy:'#0b1430',card:'#14214a',card2:'#1c2d62',bad:'#ff5a7a',paper:'#f5f1e6'};
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M24 3a15 15 0 0 0-8.5 27.4c1 .8 1.5 1.8 1.5 3V36h14v-2.6c0-1.2.5-2.2 1.5-3A15 15 0 0 0 24 3z" fill="#ffc92b"/><path d="M24 3a15 15 0 0 0-8.5 27.4c1 .8 1.5 1.8 1.5 3V36h7z" fill="#ffe27a"/><ellipse cx="17" cy="14" rx="4" ry="2.4" transform="rotate(-35 17 14)" fill="#fff9d6" opacity=".85"/><rect x="17" y="37" width="14" height="4" rx="2" fill="#94a3b8"/><rect x="19" y="42" width="10" height="3.5" rx="1.7" fill="#64748b"/><path d="M26 9l-8 13h5l-2 9 9-14h-5z" fill="#0b1430" opacity=".85"/></svg>';

/* ───────── 밤 마을: 창문에 불이 켜지는 도시 ───────── */
const Town={
  /* y: 땅(건물 아래쪽) 위치, H: 건물이 쓸 수 있는 높이. lit: 0~1 켜진 비율 */
  layer(g,W,y,H,lit,T,opt){const o=Object.assign({seed:3,far:false,col:'#101d46',top:'#1d2e68',wa:1,wsz:0},opt||{});
    const ws=o.wsz||clamp(H*.075,3,9),gap=ws*.95;let x=-ws,i=0;
    while(x<W+ws){const r=k=>hash(o.seed*977+i*31+k*7);
      const bw=Math.max(ws*3.2,W*(o.far?.05:.07)*(.65+r(1)*.95));const bh=H*((o.far?.34:.46)+r(2)*(o.far?.3:.52));const bx=x,by=y-bh;
      g.fillStyle=o.col;g.fillRect(bx,by,bw,bh);g.fillStyle=o.top;g.fillRect(bx,by,bw,Math.max(1.5,H*.012));
      if(!o.far&&r(3)>.72){g.fillStyle=o.col;g.fillRect(bx+bw*.45,by-H*.12,Math.max(1.5,ws*.3),H*.12);
        const bl=(Math.sin(T*3+i)>0)?1:.25;g.fillStyle=`rgba(255,80,100,${bl})`;g.beginPath();g.arc(bx+bw*.45+ws*.15,by-H*.12,Math.max(1.5,ws*.28),0,TAU);g.fill();}
      const cols=Math.max(1,Math.floor((bw-gap)/(ws+gap))),rows=Math.max(1,Math.floor((bh-gap*1.6)/(ws*1.25+gap)));
      const ox=bx+(bw-(cols*(ws+gap)-gap))/2;
      for(let rr=0;rr<rows;rr++)for(let cc=0;cc<cols;cc++){const th=hash(o.seed*131+i*977+rr*53+cc*11);
        const wx=ox+cc*(ws+gap),wy=by+gap*1.4+rr*(ws*1.25+gap);let on=th<lit*o.wa;
        if(on){const near=lit*o.wa-th;let a=1;if(near<.05)a=.45+.55*Math.abs(Math.sin(T*9+th*50));
          g.fillStyle=`rgba(255,214,90,${(.2*a).toFixed(3)})`;g.fillRect(wx-1.2,wy-1.2,ws+2.4,ws*1.25+2.4);
          g.fillStyle=th<.3?`rgba(255,238,170,${a})`:`rgba(255,206,92,${a})`;g.fillRect(wx,wy,ws,ws*1.25);}
        else{g.fillStyle=o.far?'#142354':'#1a2a5e';g.fillRect(wx,wy,ws,ws*1.25);}}
      x+=bw+ws*(.2+r(4)*.8);i++;}},
  draw(g,W,y,H,lit,T,seed){
    this.layer(g,W,y+H,H*.8,lit,T,{seed:seed+11,far:true,col:'#0b1636',top:'#14224f',wa:.9});
    this.layer(g,W,y+H,H,lit,T,{seed:seed,col:'#0f1b42',top:'#243a7c'});
    /* 가로등 */
    const n=Math.max(2,Math.round(W/160));for(let k=0;k<n;k++){const lx=W*(k+.5)/n+(hash(seed*5+k)-.5)*40,ly=y+H;
      g.fillStyle='#1d2c62';g.fillRect(lx-1,ly-H*.2,2,H*.2);
      const a=.25+.75*lit;g.fillStyle=`rgba(255,226,140,${a})`;g.beginPath();g.arc(lx,ly-H*.2,Math.max(2,H*.03),0,TAU);g.fill();
      if(lit>.05){K.glow(g,lx,ly-H*.2,H*.22,'#ffd77a',.25*lit);}}
    g.fillStyle='#070d22';g.fillRect(0,y+H-Math.max(2,H*.05),W,Math.max(2,H*.05));},
};

/* 설정 화면 왼쪽 그림: 어두운 마을 → 전선을 따라 전기가 흐르며 창문이 하나씩 켜지고, 다시 정전 */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);
    if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const powerAt=t=>{const c=t%17;if(c<1.6)return 0;if(c<10)return easeIO((c-1.6)/8.4);if(c<15)return 1;if(c<15.5)return .35+.65*Math.abs(Math.sin(c*30));return c<16.2?.15:0;};
  const wire=(x1,y1,x2,y2,sag)=>({x1,y1,x2,y2,cx:(x1+x2)/2,cy:y1+sag*2});
  const pt=(w,s)=>{const a=1-s;return[a*a*w.x1+2*a*s*w.cx+s*s*w.x2,a*a*w.y1+2*a*s*w.cy+s*s*w.y2];};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.min(.05,(now-last)/1000||0);last=now;T+=dt;size();
    g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const pw=powerAt(T),lit=pw;
    K.vgrad(g,0,0,W,H,['#03060f','#0b1432','#16296a']);
    K.stars(g,W,H*.62,T,Math.round(W/9),11,'#cfe0ff');
    K.glow(g,W*.8,H*.2,H*.16,'#bcd6ff',.22);g.fillStyle='#e8f0ff';g.beginPath();g.arc(W*.8,H*.2,H*.035,0,TAU);g.fill();g.fillStyle='#0b1432';g.beginPath();g.arc(W*.8+H*.012,H*.2-H*.006,H*.032,0,TAU);g.fill();
    const th=H*.5;const ty=H-th;
    Town.draw(g,W,ty,th,lit,T,4);
    /* 전신주와 전선 */
    const poleX=[W*.06,W*.5,W*.94],py=H*.5;
    const wires=[];for(let i=0;i<2;i++)for(let k=0;k<3;k++)wires.push(wire(poleX[i]+(k-1)*W*.012,py+k*H*.012-6,poleX[i+1]+(k-1)*W*.012,py+k*H*.012-6,H*.045+k*3));
    poleX.forEach(x=>{g.fillStyle='#0a1230';g.fillRect(x-3,py-8,6,H-py);g.fillRect(x-W*.03,py-6,W*.06,5);g.fillStyle='#16255a';g.fillRect(x-W*.03,py-6,W*.06,1.5);});
    g.save();g.lineWidth=2;g.strokeStyle='#5f78c4';wires.forEach(w=>{g.beginPath();g.moveTo(w.x1,w.y1);g.quadraticCurveTo(w.cx,w.cy,w.x2,w.y2);g.stroke();});g.restore();
    wires.forEach(w=>{for(let k=0;k<9;k++){const s=((T*.16+k/9)%1);const [x,y]=pt(w,s);
        const a=clamp(pw*1.4,0,1)*(.4+.6*Math.sin(s*Math.PI));if(a<.02)continue;g.fillStyle=`rgba(255,236,150,${a})`;g.beginPath();g.arc(x,y,2.4,0,TAU);g.fill();K.glow(g,x,y,9,'#ffd23f',.5*a);}});
    /* 변압기 불꽃 */
    const tx=poleX[1],tyy=py+H*.03;g.fillStyle='#17265a';K.rr(g,tx+6,tyy,W*.035,H*.045,3);g.fill();
    if(T%17<2.2&&Math.sin(T*40)>0){g.strokeStyle='#bff3ff';g.lineWidth=2;g.beginPath();let sx=tx+W*.02,sy=tyy-4;g.moveTo(sx,sy);for(let k=0;k<4;k++){sx+=(Math.random()-.5)*12;sy-=7;g.lineTo(sx,sy);}g.stroke();K.glow(g,tx+W*.02,tyy-10,22,'#9fe9ff',.7);}
    /* 큰 전구: 정전 → 점등 */
    const bx=W*.5,by=H*.43,br=Math.min(W,H)*.075;
    const lv=pw;K.glow(g,bx,by,br*(2.4+lv*3),'#ffd23f',.05+.4*lv);
    g.save();g.fillStyle=lv>.02?`rgba(255,${Math.round(190+60*lv)},${Math.round(70+120*lv)},${.35+.65*lv})`:'rgba(120,150,230,.25)';g.beginPath();g.arc(bx,by,br,0,TAU);g.fill();
    g.strokeStyle='rgba(210,225,255,.55)';g.lineWidth=2;g.stroke();g.restore();
    g.strokeStyle=lv>.05?'#fff':'#8fa0cc';g.lineWidth=2.4;g.beginPath();g.moveTo(bx-br*.3,by+br*.5);g.lineTo(bx-br*.3,by);g.lineTo(bx-br*.15,by-br*.2);g.lineTo(bx,by);g.lineTo(bx+br*.15,by-br*.2);g.lineTo(bx+br*.3,by);g.lineTo(bx+br*.3,by+br*.5);g.stroke();
    g.fillStyle='#8fa0cc';g.fillRect(bx-br*.38,by+br*.92,br*.76,br*.28);g.fillStyle='#667ab5';g.fillRect(bx-br*.3,by+br*1.22,br*.6,br*.2);
    g.strokeStyle='#5f78c4';g.lineWidth=2;g.beginPath();g.moveTo(bx,by-br);g.lineTo(bx,0);g.stroke();
    K.vignette(g,W,H,.28);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}

/* ───────── 그리기 도구 ───────── */
const D={
  /* 구리 전선: pts=[[x,y],…] */
  wire(g,pts,lw,col,glow){g.save();g.lineCap='round';g.lineJoin='round';
    const path=()=>{g.beginPath();pts.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));};
    g.strokeStyle='rgba(0,0,0,.45)';g.lineWidth=lw+3;path();g.stroke();
    if(glow){g.shadowColor=col;g.shadowBlur=lw*2.2;}g.strokeStyle=col;g.lineWidth=lw;path();g.stroke();g.shadowBlur=0;
    g.strokeStyle='rgba(255,255,255,.3)';g.lineWidth=Math.max(1,lw*.28);path();g.stroke();g.restore();},
  /* 폴리라인 위의 점(0~len) */
  along(pts,d){let tot=0;const seg=[];for(let i=0;i<pts.length-1;i++){const l=Math.hypot(pts[i+1][0]-pts[i][0],pts[i+1][1]-pts[i][1]);seg.push(l);tot+=l;}
    d=((d%tot)+tot)%tot;for(let i=0;i<seg.length;i++){if(d<=seg[i]){const t=seg[i]?d/seg[i]:0;return[lerp(pts[i][0],pts[i+1][0],t),lerp(pts[i][1],pts[i+1][1],t)];}d-=seg[i];}return pts[0];},
  len(pts){let t=0;for(let i=0;i<pts.length-1;i++)t+=Math.hypot(pts[i+1][0]-pts[i][0],pts[i+1][1]-pts[i][1]);return t;},
  dots(g,pts,T,speed,n,r,col='#fff6c0'){const L=D.len(pts);for(let k=0;k<n;k++){const [x,y]=D.along(pts,(T*speed+k*L/n));g.fillStyle=col;g.beginPath();g.arc(x,y,r,0,TAU);g.fill();K.glow(g,x,y,r*3.2,'#ffd23f',.5);}},
  /* 전구(유리구): level 0~1, rem이면 빠진 자리 */
  bulb(g,cx,cy,r,level,T,rem){
    if(rem){g.save();g.strokeStyle='rgba(159,176,230,.6)';g.lineWidth=Math.max(1.5,r*.1);g.setLineDash([r*.28,r*.22]);g.beginPath();g.arc(cx,cy,r,0,TAU);g.stroke();g.restore();
      g.fillStyle='#7d8fc4';K.rr(g,cx-r*.5,cy-r*.28,r,r*.56,r*.12);g.fill();return;}
    if(level>0){K.glow(g,cx,cy,r*(2.1+level*2.4),'#ffd84a',.1+.5*level);}
    g.save();const gr=g.createRadialGradient(cx-r*.3,cy-r*.35,r*.1,cx,cy,r);
    if(level>0){gr.addColorStop(0,`rgba(255,253,230,${.8+.2*level})`);gr.addColorStop(.55,`rgba(255,${Math.round(214+30*level)},${Math.round(80+90*level)},1)`);gr.addColorStop(1,`rgba(255,${Math.round(150+50*level)},40,1)`);}
    else{gr.addColorStop(0,'rgba(120,145,215,.45)');gr.addColorStop(1,'rgba(30,45,100,.7)');}
    g.fillStyle=gr;g.beginPath();g.arc(cx,cy,r,0,TAU);g.fill();g.strokeStyle=level>0?'rgba(255,255,255,.7)':'rgba(190,210,255,.5)';g.lineWidth=Math.max(1.5,r*.09);g.stroke();
    g.strokeStyle=level>0?'#fff':'#8fa0cc';g.lineWidth=Math.max(1.4,r*.1);g.lineCap='round';g.lineJoin='round';g.beginPath();
    g.moveTo(cx-r*.34,cy+r*.55);g.lineTo(cx-r*.34,cy+r*.02);g.lineTo(cx-r*.17,cy-r*.22);g.lineTo(cx,cy+r*.02);g.lineTo(cx+r*.17,cy-r*.22);g.lineTo(cx+r*.34,cy+r*.02);g.lineTo(cx+r*.34,cy+r*.55);g.stroke();
    g.fillStyle='rgba(255,255,255,.4)';g.beginPath();g.ellipse(cx-r*.42,cy-r*.5,r*.24,r*.12,-.6,0,TAU);g.fill();g.restore();},
  /* 건전지: (cx,cy) 중심, 길이 len, 굵기 th, 각도 ang(+극이 +x 쪽). 글자는 똑바로 */
  battery(g,cx,cy,len,th,ang,o={}){const c=Math.cos(ang),s=Math.sin(ang);
    g.save();g.translate(cx,cy);g.rotate(ang);const x=-len/2,y=-th/2;
    g.shadowColor='rgba(0,0,0,.45)';g.shadowBlur=th*.25;g.shadowOffsetY=th*.1;K.rr(g,x,y,len*.94,th,th*.22);g.fillStyle='#0d1530';g.fill();g.shadowBlur=0;g.shadowOffsetY=0;
    g.save();K.rr(g,x,y,len*.94,th,th*.22);g.clip();
    const gr=g.createLinearGradient(0,y,0,y+th);gr.addColorStop(0,'#46557d');gr.addColorStop(.45,'#222f57');gr.addColorStop(1,'#101a3b');g.fillStyle=gr;g.fillRect(x,y,len,th);
    const go=g.createLinearGradient(0,y,0,y+th);go.addColorStop(0,'#ffe9a0');go.addColorStop(.5,'#f59e0b');go.addColorStop(1,'#a8530b');g.fillStyle=go;g.fillRect(x+len*.62,y,len*.32,th);
    if(o.charge!=null){const cc=o.charge>.5?'#3df0b8':o.charge>.25?'#ffd23f':'#ff5a7a';g.fillStyle='rgba(255,255,255,.14)';g.fillRect(x+len*.06,y+th*.74,len*.5,th*.13);g.fillStyle=cc;g.fillRect(x+len*.06,y+th*.74,len*.5*clamp(o.charge,0,1),th*.13);}
    g.fillStyle='rgba(255,255,255,.22)';g.fillRect(x,y+th*.12,len,th*.1);g.restore();
    g.fillStyle='#d6dcee';K.rr(g,x+len*.94-1,-th*.2,len*.075,th*.4,th*.08);g.fill();g.restore();
    const lab=(t,dx,col)=>K.txt(g,t,cx+c*dx,cy+s*dx+th*.02,{size:th*.62,color:col,font:'IBM Plex Sans KR'});
    if(o.labels!==false){lab('+',len*.34,'#4a2400');lab('−',-len*.3,'#e6ecff');}},
  /* 칼날 스위치 (+x가 앞쪽) */
  knife(g,cx,cy,len,ang,closed,T,pulse){g.save();g.translate(cx,cy);g.rotate(ang);const w=len,h=len*.34;
    g.fillStyle='#0a1230';K.rr(g,-w/2,-h/2,w,h,h*.3);g.fill();g.strokeStyle='#3b4f94';g.lineWidth=Math.max(1,len*.02);g.stroke();
    const px=-w*.34,qx=w*.34;g.fillStyle='#c4d0ee';g.beginPath();g.arc(px,0,h*.2,0,TAU);g.fill();g.beginPath();g.arc(qx,0,h*.2,0,TAU);g.fill();
    const a=closed?0:-.95;g.save();g.translate(px,0);g.rotate(a);g.strokeStyle='#d7e0f7';g.lineWidth=h*.18;g.lineCap='round';g.beginPath();g.moveTo(0,0);g.lineTo((qx-px)*1.02,0);g.stroke();
    g.fillStyle='#ff5a7a';g.beginPath();g.arc((qx-px)*.55,0,h*.2,0,TAU);g.fill();g.restore();
    if(!closed&&pulse){g.strokeStyle=`rgba(255,210,63,${.4+.4*Math.sin(T*6)})`;g.lineWidth=Math.max(1.5,len*.03);g.beginPath();g.arc(0,0,w*.56,0,TAU);g.stroke();}
    g.restore();},
  /* 악어 클립: 아래쪽 평면에서 dir(+1:오른쪽을 향함 −1:왼쪽) 방향으로 입을 벌려요 */
  clip(g,x,y,s,dir,open,col){g.save();g.translate(x,y);g.scale(dir,1);
    g.fillStyle=col||'#ff5a7a';K.rr(g,-s*.95,-s*.22,s*.8,s*.44,s*.12);g.fill();g.fillStyle='rgba(255,255,255,.25)';K.rr(g,-s*.9,-s*.18,s*.7,s*.12,s*.05);g.fill();
    const a=open*.5;g.fillStyle='#c4cfe8';
    g.save();g.rotate(-a);g.beginPath();g.moveTo(-s*.2,-s*.2);g.lineTo(s*.62,-s*.07);g.lineTo(s*.62,0);g.lineTo(-s*.2,0);g.closePath();g.fill();g.fillStyle='#8896b8';for(let i=0;i<4;i++){g.fillRect(s*.12+i*s*.12,0,s*.06,s*.06);}g.restore();
    g.save();g.rotate(a);g.fillStyle='#aebad6';g.beginPath();g.moveTo(-s*.2,s*.2);g.lineTo(s*.62,s*.07);g.lineTo(s*.62,0);g.lineTo(-s*.2,0);g.closePath();g.fill();g.restore();
    g.restore();},
  paperclip(g,x,y,s,rot,col){g.save();g.translate(x,y);g.rotate(rot);g.strokeStyle=col||'#b9c4de';g.lineWidth=Math.max(1.4,s*.14);g.lineCap='round';g.lineJoin='round';
    g.beginPath();g.moveTo(-s*.22,-s*.34);g.lineTo(-s*.22,s*.26);g.arc(0,s*.26,s*.22,Math.PI,0,true);g.lineTo(s*.22,-s*.22);g.arc(s*.1,-s*.22,s*.12,0,Math.PI,true);g.lineTo(-s*.02,s*.16);g.stroke();g.restore();},
  /* 작은 안내글 */
  label(g,str,x,y,size,col='#cbd7fb',o={}){K.txt(g,str,x,y,Object.assign({size,color:col,font:'IBM Plex Sans KR'},o));},
};

/* ───────── 물체 그림(전기가 통하는/통하지 않는 물체) : 중심 (0,0) 가로세로 약 100 ───────── */
const ITEM={
  nail(g){g.rotate(-.65);const gr=g.createLinearGradient(-6,0,6,0);gr.addColorStop(0,'#e5eaf5');gr.addColorStop(.5,'#9aa8c6');gr.addColorStop(1,'#5f6d8e');g.fillStyle=gr;
    g.beginPath();g.moveTo(-4,-34);g.lineTo(4,-34);g.lineTo(4,32);g.lineTo(0,44);g.lineTo(-4,32);g.closePath();g.fill();g.fillStyle='#c7d1e8';g.beginPath();g.ellipse(0,-36,13,5,0,0,TAU);g.fill();g.fillStyle='#8f9dbd';g.beginPath();g.ellipse(0,-35,13,3,0,0,Math.PI);g.fill();},
  wire(g){g.strokeStyle='#4b5575';g.lineWidth=11;g.lineCap='round';g.beginPath();g.moveTo(-40,10);g.bezierCurveTo(-26,-34,-10,36,2,-8);g.bezierCurveTo(14,-40,30,30,42,-12);g.stroke();
    g.strokeStyle='#e58a3a';g.lineWidth=7;g.beginPath();g.moveTo(-40,10);g.bezierCurveTo(-26,-34,-10,36,2,-8);g.bezierCurveTo(14,-40,30,30,42,-12);g.stroke();
    g.strokeStyle='#ffc58a';g.lineWidth=2;g.beginPath();g.moveTo(-40,8);g.bezierCurveTo(-26,-36,-10,34,2,-10);g.bezierCurveTo(14,-42,30,28,42,-14);g.stroke();
    g.strokeStyle='#e58a3a';g.lineWidth=3;for(const sy of [-1,1]){g.beginPath();g.moveTo(42,-12);g.lineTo(52,-12+sy*7);g.stroke();}},
  foil(g){const gr=g.createLinearGradient(-40,-30,40,30);gr.addColorStop(0,'#f3f6fb');gr.addColorStop(.35,'#b5bfd3');gr.addColorStop(.6,'#eef2f9');gr.addColorStop(1,'#8d99b3');g.fillStyle=gr;
    g.beginPath();g.moveTo(-40,-18);g.lineTo(-18,-34);g.lineTo(6,-26);g.lineTo(36,-34);g.lineTo(42,-6);g.lineTo(30,20);g.lineTo(38,34);g.lineTo(6,28);g.lineTo(-20,36);g.lineTo(-38,18);g.lineTo(-30,0);g.closePath();g.fill();
    g.strokeStyle='rgba(60,75,110,.45)';g.lineWidth=1.6;g.beginPath();g.moveTo(-18,-34);g.lineTo(-8,-6);g.lineTo(-30,0);g.moveTo(-8,-6);g.lineTo(6,28);g.moveTo(-8,-6);g.lineTo(30,-8);g.lineTo(30,20);g.moveTo(6,-26);g.lineTo(30,-8);g.stroke();},
  coin(g){const gr=g.createRadialGradient(-12,-14,4,0,0,40);gr.addColorStop(0,'#ffd1a0');gr.addColorStop(.6,'#d9822f');gr.addColorStop(1,'#8f4d14');g.fillStyle=gr;g.beginPath();g.arc(0,0,38,0,TAU);g.fill();
    g.strokeStyle='rgba(255,230,190,.6)';g.lineWidth=3;g.beginPath();g.arc(0,0,31,0,TAU);g.stroke();g.fillStyle='#7a3f0c';g.font='bold 34px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('10',0,2);},
  clip(g){D.paperclip(g,0,0,92,.5,'#c3cde6');},
  key(g){g.rotate(-.6);const gr=g.createLinearGradient(-8,0,8,0);gr.addColorStop(0,'#f1f4fb');gr.addColorStop(1,'#8d99b3');g.fillStyle=gr;g.beginPath();g.arc(-26,0,17,0,TAU);g.arc(-26,0,7,0,TAU,true);g.fill('evenodd');
    g.fillStyle=gr;g.fillRect(-10,-5,56,10);g.fillRect(28,5,7,12);g.fillRect(40,5,7,9);},
  sblade(g){g.rotate(-.1);const gr=g.createLinearGradient(0,-10,0,10);gr.addColorStop(0,'#f1f4fb');gr.addColorStop(1,'#8d99b3');g.fillStyle=gr;
    g.beginPath();g.moveTo(-34,30);g.lineTo(40,-26);g.lineTo(44,-18);g.lineTo(-24,36);g.closePath();g.fill();g.beginPath();g.moveTo(-34,-30);g.lineTo(40,26);g.lineTo(44,18);g.lineTo(-24,-36);g.closePath();g.fill();
    g.fillStyle='#5f6d8e';g.beginPath();g.arc(-4,0,5,0,TAU);g.fill();},
  sgrip(g){g.strokeStyle='#e0455d';g.lineWidth=11;g.beginPath();g.ellipse(-20,-18,17,22,.5,0,TAU);g.stroke();g.beginPath();g.ellipse(20,-18,17,22,-.5,0,TAU);g.stroke();
    g.strokeStyle='rgba(255,255,255,.3)';g.lineWidth=3;g.beginPath();g.ellipse(-20,-18,17,22,.5,3.6,5.2);g.stroke();g.fillStyle='#e0455d';g.fillRect(-6,6,12,34);},
  rubber(g){g.strokeStyle='#d9a441';g.lineWidth=9;g.beginPath();g.ellipse(0,0,38,22,.25,0,TAU);g.stroke();g.strokeStyle='#f2c867';g.lineWidth=4;g.beginPath();g.ellipse(0,0,38,22,.25,3.4,5.4);g.stroke();
    g.strokeStyle='#c68f2e';g.lineWidth=7;g.beginPath();g.ellipse(0,0,24,12,-.3,0,TAU);g.stroke();},
  chop(g){for(const [dx,a] of [[-10,-.07],[10,.07]]){g.save();g.translate(dx,0);g.rotate(a);const gr=g.createLinearGradient(-5,0,5,0);gr.addColorStop(0,'#e8c28b');gr.addColorStop(1,'#b8864a');g.fillStyle=gr;
    g.beginPath();g.moveTo(-5,-44);g.lineTo(5,-44);g.lineTo(2,44);g.lineTo(-2,44);g.closePath();g.fill();g.restore();}},
  ruler(g){g.rotate(-.35);g.fillStyle='rgba(80,200,220,.55)';K.rr(g,-46,-14,92,28,5);g.fill();g.strokeStyle='rgba(200,245,255,.8)';g.lineWidth=2;K.rr(g,-46,-14,92,28,5);g.stroke();
    g.strokeStyle='rgba(10,50,70,.7)';g.lineWidth=1.6;g.beginPath();for(let i=0;i<=10;i++){const x=-40+i*8;g.moveTo(x,-14);g.lineTo(x,i%5===0?-4:-8);}g.stroke();},
  glass(g){g.fillStyle='rgba(160,215,255,.28)';g.strokeStyle='rgba(215,240,255,.9)';g.lineWidth=3;g.beginPath();g.moveTo(-26,-36);g.lineTo(26,-36);g.lineTo(20,36);g.lineTo(-20,36);g.closePath();g.fill();g.stroke();
    g.fillStyle='rgba(255,255,255,.4)';g.beginPath();g.moveTo(-18,-30);g.lineTo(-10,-30);g.lineTo(-8,28);g.lineTo(-13,28);g.closePath();g.fill();g.fillStyle='rgba(120,190,255,.3)';g.fillRect(-23,-4,46,38);},
  paper(g){g.fillStyle='#f8f6ee';g.beginPath();g.moveTo(-30,-40);g.lineTo(14,-40);g.lineTo(30,-24);g.lineTo(30,40);g.lineTo(-30,40);g.closePath();g.fill();g.fillStyle='#d8d3c2';g.beginPath();g.moveTo(14,-40);g.lineTo(14,-24);g.lineTo(30,-24);g.closePath();g.fill();
    g.strokeStyle='#9aa7c9';g.lineWidth=2.4;for(let i=0;i<5;i++){g.beginPath();g.moveTo(-20,-14+i*12);g.lineTo(20,-14+i*12);g.stroke();}},
  eraser(g){g.rotate(-.3);g.fillStyle='#f7c6d0';K.rr(g,-36,-20,72,40,8);g.fill();g.fillStyle='#4a82e8';K.rr(g,-8,-20,30,40,2);g.fill();g.fillStyle='rgba(255,255,255,.35)';g.fillRect(-34,-17,68,7);},
  yarn(g){const gr=g.createRadialGradient(-10,-12,3,0,0,38);gr.addColorStop(0,'#ff9aa8');gr.addColorStop(1,'#c2304a');g.fillStyle=gr;g.beginPath();g.arc(0,0,36,0,TAU);g.fill();
    g.strokeStyle='rgba(120,10,30,.45)';g.lineWidth=2.4;for(let i=-2;i<=2;i++){g.beginPath();g.ellipse(0,0,36,Math.abs(i)*8+10,i*.5,0,TAU);g.stroke();}g.strokeStyle='#ff9aa8';g.lineWidth=4;g.beginPath();g.moveTo(26,22);g.quadraticCurveTo(46,40,40,52);g.stroke();},
};
const ITEMS=[
  {id:'nail',name:'철 못',ok:1,note:'철은 금속이라 전기가 잘 통해요'},
  {id:'wire',name:'구리 전선',ok:1,note:'구리는 금속이라 전기가 잘 통해요'},
  {id:'foil',name:'알루미늄 포일',ok:1,note:'알루미늄은 금속이라 전기가 통해요'},
  {id:'coin',name:'10원 동전',ok:1,note:'동전은 금속(구리)이라 전기가 통해요'},
  {id:'clip',name:'철 클립',ok:1,note:'철 클립은 금속이라 전기가 통해요'},
  {id:'key',name:'열쇠',ok:1,note:'열쇠는 금속이라 전기가 통해요'},
  {id:'sblade',name:'가위의 날',ok:1,note:'가위의 날은 금속이라 전기가 통해요'},
  {id:'rubber',name:'고무줄',ok:0,note:'고무는 전기가 통하지 않아요'},
  {id:'chop',name:'나무젓가락',ok:0,note:'나무는 전기가 통하지 않아요'},
  {id:'ruler',name:'플라스틱 자',ok:0,note:'플라스틱은 전기가 통하지 않아요'},
  {id:'glass',name:'유리컵',ok:0,note:'유리는 전기가 통하지 않아요'},
  {id:'paper',name:'종이',ok:0,note:'종이는 전기가 통하지 않아요'},
  {id:'eraser',name:'지우개',ok:0,note:'지우개(고무)는 전기가 통하지 않아요'},
  {id:'sgrip',name:'가위의 손잡이',ok:0,note:'플라스틱 손잡이는 전기가 통하지 않아요'},
  {id:'yarn',name:'털실',ok:0,note:'털실(섬유)은 전기가 통하지 않아요'},
];
function itemIcon(g,id,x,y,s){g.save();g.translate(x,y);g.scale(s/100,s/100);g.shadowColor='rgba(0,0,0,.45)';g.shadowBlur=s*.08;g.shadowOffsetY=s*.03;ITEM[id](g);g.restore();}
