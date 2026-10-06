const ANIMALS={
  bunny:  {name:'토끼',  fur:'#FFFDF8',shade:'#E9DFD6',belly:'#FFFFFF',foot:'#F3E8DE',inner:'#FFB3C7'},
  cat:    {name:'고양이',fur:'#F7A94A',shade:'#DD8527',belly:'#FFEBCB',foot:'#FFEBCB',inner:'#FFB9AE'},
  bear:   {name:'곰',    fur:'#AD7442',shade:'#8A5930',belly:'#EDD0A6',foot:'#8A5930',inner:'#E3B287'},
  penguin:{name:'펭귄',  fur:'#2E3B5E',shade:'#1F2944',belly:'#FFFFFF',foot:'#FFA630',inner:'#FFA630'},
};
const ANIMAL_KEYS=['bunny','cat','bear','penguin'];
const OUT='#3B2E2A',EYE='#2A211D';

function el(g,x,y,rx,ry,rot){g.beginPath();g.ellipse(x,y,Math.max(.1,rx),Math.max(.1,ry),rot||0,0,Math.PI*2);}
function fs(g,fill,stroke){g.fillStyle=fill;g.fill();if(stroke!==false)g.stroke();}
function rr(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.lineTo(x+w-r,y);g.quadraticCurveTo(x+w,y,x+w,y+r);g.lineTo(x+w,y+h-r);g.quadraticCurveTo(x+w,y+h,x+w-r,y+h);g.lineTo(x+r,y+h);g.quadraticCurveTo(x,y+h,x,y+h-r);g.lineTo(x,y+r);g.quadraticCurveTo(x,y,x+r,y);g.closePath();}
function thick(g,pts,w,col,u){
  const path=()=>{g.beginPath();g.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)g.lineTo(pts[i][0],pts[i][1]);};
  g.save();g.lineCap='round';g.lineJoin='round';
  path();g.strokeStyle=OUT;g.lineWidth=w+2.8*u;g.stroke();
  path();g.strokeStyle=col;g.lineWidth=w;g.stroke();
  g.restore();
}
function star(g,x,y,r,col,rot){
  g.beginPath();
  for(let i=0;i<10;i++){const a=(rot||0)-Math.PI/2+i*Math.PI/5,rr_=i%2?r*.45:r;g.lineTo(x+Math.cos(a)*rr_,y+Math.sin(a)*rr_);}
  g.closePath();g.fillStyle=col;g.fill();
}
function limb(g,px,py,a,len,rx,ry,col){
  el(g,px+Math.sin(a)*len,py+Math.cos(a)*len,rx,ry,-a);fs(g,col);
}

/* 원점 = 발이 땅에 닿는 곳. st: {pose, runT, fallP, face, now} */
function drawCritter(g,kind,u,st,color){
  const A=ANIMALS[kind],isP=kind==='penguin';
  const now=st.now||0,ph=(st.runT||0)*14;
  let rot=0,bob=0,sx=1,sy=1,fA,fB,armF,armB,earRot=-.12,pivot=0;
  // 발이 앞으로 나갈 때 들리고, 땅을 디딜 때 뒤로 밀어요
  const foot=a=>[1*u+Math.sin(a)*9*u,-2.5*u-Math.max(0,Math.cos(a))*6.5*u];
  if(st.pose==='run'){
    bob=Math.abs(Math.sin(ph))*3.2*u;rot=.09;fA=foot(ph);fB=foot(ph+Math.PI);
    armF=Math.sin(ph)*1.1;armB=-armF;earRot=-.45+Math.sin(ph*2)*.1;
  }else if(st.pose==='jump'){
    rot=-.06;sx=.93;sy=1.08;fA=[8*u,-8*u];fB=[-5*u,-6*u];armF=2.5;armB=2.1;earRot=-.75;
  }else if(st.pose==='fall'){
    const f=st.fallP||0,a=f<.18?f/.18:f<.72?1:Math.max(0,1-(f-.72)/.2);
    rot=(1-Math.pow(1-a,2))*1.45;pivot=13*u;
    if(f>.92)bob=Math.sin((f-.92)/.08*Math.PI)*6*u;
    fA=[10*u,-4*u];fB=[-6*u,-8*u];armF=1.8;armB=1.5;earRot=-.15;
  }else if(st.pose==='drive'){
    fA=[6*u,-2.5*u];fB=[-5*u,-2.5*u];armF=1.3;armB=1.1;earRot=st.wind?-.95:-.3;
  }else{
    const br=Math.sin(now/1000*3);sy=1+br*.025;fA=[6*u,-2.5*u];fB=[-5*u,-2.5*u];armF=.3;armB=-.3;earRot=-.12+br*.04;
  }
  const face=st.face||'normal';
  g.save();
  g.lineJoin='round';g.lineCap='round';g.strokeStyle=OUT;g.lineWidth=Math.max(1,1.5*u);
  g.translate(0,-bob);
  g.translate(pivot,0);g.rotate(rot);g.translate(-pivot,0);
  g.translate(0,-24*u);g.scale(sx,sy);g.translate(0,24*u);

  const hx=isP?3*u:2*u,hy=isP?-41*u:-44*u,hr=isP?15*u:17*u;
  const neckY=isP?-31*u:-29*u;

  // 목도리 꼬리 (주자 색)
  const moving=st.pose==='run'||st.pose==='jump'||(st.pose==='drive'&&st.wind)?1:.25;
  const tail=[];
  for(let k=0;k<5;k++)tail.push([-6*u-k*5*u,neckY+k*1.6*u*(1-moving*.7)+Math.sin(now/70-k*.9)*k*.9*u*moving]);
  thick(g,tail,4.5*u,color,u);

  // 동물 꼬리
  if(kind==='bunny'){el(g,-12*u,-15*u,5*u,5*u);fs(g,A.fur);}
  else if(kind==='bear'){el(g,-12*u,-15*u,3.8*u,3.8*u);fs(g,A.fur);}
  else if(kind==='cat'){const w=Math.sin(now/220)*3*u;thick(g,[[-10*u,-12*u],[-17*u,-15*u],[-21*u+w,-24*u],[-18*u+w,-31*u]],4*u,A.fur,u);}

  // 뒤쪽 팔·발
  limb(g,-2*u,isP?-27*u:-24*u,armB,isP?7*u:5.5*u,isP?3*u:3.3*u,isP?8*u:6.2*u,A.shade);
  el(g,fB[0],fB[1],5.5*u,3.3*u);fs(g,isP?'#E08A1E':A.shade);

  // 귀 (머리 뒤)
  if(kind==='bunny'){
    const ear=(px,py,r,col)=>{g.save();g.translate(px,py);g.rotate(r);el(g,0,-12*u,5*u,13.5*u);fs(g,col);el(g,.3*u,-11*u,2.4*u,9*u);fs(g,A.inner,false);g.restore();};
    ear(hx-6*u,hy-12*u,earRot-.25,A.shade);ear(hx+3*u,hy-14*u,earRot+.05,A.fur);
  }else if(kind==='cat'){
    const ear=(px,py,r)=>{g.save();g.translate(px,py);g.rotate(r);
      g.beginPath();g.moveTo(-6.5*u,3*u);g.lineTo(-1*u,-10*u);g.lineTo(6.5*u,3*u);g.closePath();fs(g,A.fur);
      g.beginPath();g.moveTo(-3.3*u,1.5*u);g.lineTo(-1*u,-6*u);g.lineTo(3.3*u,1.5*u);g.closePath();fs(g,A.inner,false);g.restore();};
    ear(hx-9*u,hy-11*u,-.35+earRot*.3);ear(hx+9*u,hy-12*u,.3+earRot*.3);
  }else if(kind==='bear'){
    [[hx-11*u,hy-12*u],[hx+12*u,hy-12*u]].forEach(([ex,ey])=>{el(g,ex,ey,6.5*u,6.5*u);fs(g,A.fur);el(g,ex,ey,3.5*u,3.5*u);fs(g,A.inner,false);});
  }

  // 몸
  if(isP){el(g,0,-25*u,16*u,22*u);fs(g,A.fur);el(g,4*u,-20*u,10.5*u,15*u);fs(g,A.belly,false);}
  else{el(g,0,-18*u,12.5*u,13*u);fs(g,A.fur);el(g,2.5*u,-15.5*u,8*u,8.5*u);fs(g,A.belly,false);}

  // 앞발
  el(g,fA[0],fA[1],5.8*u,3.4*u);fs(g,A.foot);

  // 목도리
  el(g,1*u,neckY,isP?14*u:11.5*u,3.2*u);fs(g,color);

  // 머리
  el(g,hx,hy,hr,hr*.95);fs(g,A.fur);
  if(isP){
    el(g,hx+5*u,hy+2*u,10.5*u,9.5*u);fs(g,A.belly,false);
    g.lineWidth=1.8*u;g.beginPath();g.moveTo(hx-2*u,hy-hr+1*u);g.quadraticCurveTo(hx-1*u,hy-hr-5*u,hx+3*u,hy-hr-4*u);g.stroke();
    g.lineWidth=Math.max(1,1.5*u);
  }
  if(kind==='cat'){
    g.strokeStyle=A.shade;g.lineWidth=2*u;
    [[-4,-13],[1,-15],[6,-13]].forEach(([dx,dy])=>{g.beginPath();g.moveTo(hx+dx*u,hy+dy*u);g.lineTo(hx+dx*u,hy+(dy+4)*u);g.stroke();});
    g.strokeStyle=OUT;g.lineWidth=Math.max(1,1.5*u);
  }

  // 얼굴
  const eyes=isP?[[hx+1.5*u,hy],[hx+10*u,hy]]:[[hx-3*u,hy],[hx+8.5*u,hy]];
  const blink=face==='normal'&&(now%3300)<130;
  eyes.forEach(([ex,ey],i)=>{
    g.strokeStyle=EYE;g.lineWidth=1.9*u;
    if(face==='happy'){g.beginPath();g.arc(ex,ey+1.6*u,2.8*u,Math.PI*1.15,Math.PI*1.85);g.stroke();}
    else if(face==='dizzy'){const d=2.2*u;g.beginPath();g.moveTo(ex-d,ey-d);g.lineTo(ex+d,ey+d);g.moveTo(ex+d,ey-d);g.lineTo(ex-d,ey+d);g.stroke();}
    else if(face==='shock'){g.lineWidth=1.2*u;el(g,ex,ey,3.4*u,3.9*u);g.fillStyle='#fff';g.fill();g.stroke();el(g,ex+.5*u,ey,1.5*u,1.7*u);g.fillStyle=EYE;g.fill();}
    else if(blink){g.beginPath();g.moveTo(ex-2.4*u,ey);g.lineTo(ex+2.4*u,ey);g.stroke();}
    else{
      el(g,ex,ey,2.7*u,3.5*u);g.fillStyle=EYE;g.fill();
      el(g,ex+.9*u,ey-1.3*u,1.05*u,1.05*u);g.fillStyle='#fff';g.fill();
      if(face==='sad'){g.lineWidth=1.4*u;g.beginPath();const s_=i?-1:1;g.moveTo(ex-2.6*u,ey-5*u-s_*.9*u);g.lineTo(ex+2.6*u,ey-5*u+s_*.9*u);g.stroke();}
    }
  });
  g.strokeStyle=OUT;g.lineWidth=Math.max(1,1.5*u);
  el(g,hx-7.5*u,hy+6*u,3.4*u,2.2*u);fs(g,'rgba(255,110,140,.42)',false);
  el(g,hx+(isP?15:13.5)*u,hy+6*u,3*u,2.1*u);fs(g,'rgba(255,110,140,.42)',false);

  const mx=hx+3*u;let my=hy+6.5*u;
  if(kind==='bear'){el(g,hx+3.5*u,hy+6.5*u,6.8*u,5*u);fs(g,A.belly);el(g,hx+3.5*u,hy+4.2*u,2.4*u,1.7*u);fs(g,EYE,false);my=hy+8.3*u;}
  if(kind==='bunny'){el(g,mx,hy+3.8*u,1.8*u,1.3*u);fs(g,'#FF8FAB',false);}
  if(kind==='cat'){
    g.beginPath();g.moveTo(mx-1.8*u,hy+3*u);g.lineTo(mx+1.8*u,hy+3*u);g.lineTo(mx,hy+5*u);g.closePath();fs(g,'#FF8FAB',false);
    g.lineWidth=.9*u;g.strokeStyle='#6B5448';
    [[-5,3.5,-12,2.5],[-5,5.5,-12,6.5],[11,3.5,18,2.5],[11,5.5,18,6.5]].forEach(([a,b,c,d])=>{g.beginPath();g.moveTo(hx+a*u,hy+b*u);g.lineTo(hx+c*u,hy+d*u);g.stroke();});
    g.strokeStyle=OUT;g.lineWidth=Math.max(1,1.5*u);
  }
  if(isP){
    const bx=hx+9*u,by=hy+5*u;
    if(face==='happy'||face==='shock'){
      g.beginPath();g.moveTo(bx,by-1*u);g.lineTo(bx+8*u,by+.5*u);g.lineTo(bx,by+2*u);g.closePath();fs(g,A.foot);
      g.beginPath();g.moveTo(bx,by+3*u);g.lineTo(bx+7*u,by+5*u);g.lineTo(bx,by+6*u);g.closePath();fs(g,A.foot);
    }else{g.beginPath();g.moveTo(bx,by);g.lineTo(bx+8*u,by+2.5*u);g.lineTo(bx,by+5*u);g.closePath();fs(g,A.foot);}
  }else{
    g.lineWidth=1.3*u;
    if(face==='happy'){
      g.beginPath();g.moveTo(mx-3.2*u,my-.5*u);g.quadraticCurveTo(mx,my+6*u,mx+3.2*u,my-.5*u);g.closePath();fs(g,'#B83B4B');
      el(g,mx,my+2.4*u,1.6*u,1*u);fs(g,'#FF8FAB',false);
    }else if(face==='sad'||face==='dizzy'){
      g.beginPath();g.arc(mx,my+3*u,2.3*u,Math.PI*1.2,Math.PI*1.8);g.stroke();
    }else if(face==='shock'){
      el(g,mx,my+1.5*u,1.7*u,2.1*u);fs(g,'#7A2A33',false);
    }else{
      g.beginPath();g.arc(mx-1.5*u,my,1.5*u,.1,Math.PI-.1);g.moveTo(mx+3*u,my);g.arc(mx+1.5*u,my,1.5*u,.1,Math.PI-.1);g.stroke();
    }
    g.lineWidth=Math.max(1,1.5*u);
  }
  if(face==='sad'){el(g,eyes[1][0]+2*u,eyes[1][1]+5.5*u,1.3*u,2*u);fs(g,'#7CC8FF',false);}

  // 앞쪽 팔
  limb(g,3*u,isP?-27*u:-24*u,armF,isP?7*u:5.5*u,isP?3*u:3.3*u,isP?8*u:6.2*u,A.fur);

  // 어지러운 별
  if(face==='dizzy'){
    for(let k=0;k<3;k++){const a=now/260+k*2.1;star(g,hx+Math.cos(a)*11*u,hy-hr-4*u+Math.sin(a)*3.5*u,3.2*u,'#FFD84D',a);}
  }
  g.restore();
}


/* =========================================================
   자동차 그리기 (포뮬러·스포츠카·지프·카트)
   원점 = 자동차 가운데 아래(땅), 오른쪽으로 달려요.
   drawCar 안에서는 g.scale(u)를 해서 숫자를 '자동차 단위'로 써요.
   ========================================================= */
const CARS={
  formula:{name:'포뮬러',driver:'bunny'},
  sports: {name:'스포츠카',driver:'cat'},
  jeep:   {name:'지프',driver:'bear'},
  kart:   {name:'카트',driver:'penguin'},
};
const CAR_KEYS=['formula','sports','jeep','kart'];
const SCARF='#FFD84D',TIRE='#2B2F3A',METAL='#3A4050',GLASS='rgba(185,228,255,.4)';
const EXH ={formula:[-46,-14],sports:[-49,-11],jeep:[-47,-13],kart:[-49,-16.5]};   // 배기구
const HOOD={formula:[30,-19],sports:[40,-26],jeep:[34,-30],kart:[-40,-23]};        // 고장 연기 나는 곳

function hexRGB(h){const n=parseInt(h.slice(1),16);return[n>>16&255,n>>8&255,n&255];}
function mix(a,b,t){const A=hexRGB(a),B=hexRGB(b);return'rgb('+A.map((v,i)=>Math.round(v+(B[i]-v)*t)).join(',')+')';}

function wheel(g,x,y,R,a){
  el(g,x,y,R,R);fs(g,TIRE);
  el(g,x,y,R*.58,R*.58);fs(g,'#D5DAE2');
  g.save();g.strokeStyle='#7C8596';g.lineWidth=1.6;
  for(let k=0;k<3;k++){const b=a+k*Math.PI*2/3;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(b)*R*.52,y+Math.sin(b)*R*.52);g.stroke();}
  g.restore();
  el(g,x,y,R*.17,R*.17);fs(g,'#7C8596',false);
}
function driver(g,kind,k,x,y,st){
  g.save();g.translate(x,y);
  drawCritter(g,CARS[kind].driver,k,{pose:'drive',now:st.now||0,face:st.face||'normal',wind:st.wind},SCARF);
  g.restore();
}
function numBadge(g,x,y,r,num){
  el(g,x,y,r,r);fs(g,'#fff');
  g.save();g.fillStyle=OUT;g.textAlign='center';g.textBaseline='middle';g.font=`${(r*1.4).toFixed(2)}px Jua, sans-serif`;
  g.fillText(String(num),x,y+r*.1);g.restore();
}
function archCut(g,bodyPath,pts){g.save();bodyPath();g.clip();g.fillStyle=TIRE;pts.forEach(([x,y,R])=>{el(g,x,y,R,R);g.fill();});g.restore();}

const CAR_DRAW={
  formula(g,st,c){
    const dk=mix(c,'#000000',.32),lt=mix(c,'#FFFFFF',.45);
    g.fillStyle=METAL;g.fillRect(-41,-34,3,16);g.strokeRect(-41,-34,3,16);
    rr(g,-53,-39,22,6,2);fs(g,dk);
    driver(g,'formula',.6,-4,-7,st);
    g.beginPath();g.moveTo(-46,-7);g.lineTo(-46,-21);g.quadraticCurveTo(-45,-27,-34,-27);g.lineTo(-19,-27);g.lineTo(-15,-22);
    g.lineTo(9,-22);g.lineTo(24,-18);g.lineTo(52,-13);g.quadraticCurveTo(58,-11,55,-7);g.closePath();fs(g,c);
    el(g,-6,-12,17,4.5);fs(g,dk,false);
    g.fillStyle=lt;g.beginPath();g.moveTo(11,-20);g.lineTo(24,-16.5);g.lineTo(46,-12.5);g.lineTo(24,-14.5);g.closePath();g.fill();
    numBadge(g,-31,-17,5.5,st.num);
    rr(g,44,-10,17,4,1.5);fs(g,dk);
    wheel(g,-32,-10,10,st.wheel||0);wheel(g,35,-8.5,8.5,(st.wheel||0)*1.18);
  },
  sports(g,st,c){
    const dk=mix(c,'#000000',.32);
    const cab=()=>{g.beginPath();g.moveTo(-24,-25);g.quadraticCurveTo(-10,-44,6,-42);g.quadraticCurveTo(21,-40,29,-25);g.closePath();};
    const body=()=>{g.beginPath();g.moveTo(-49,-7);g.lineTo(-49,-20);g.quadraticCurveTo(-48,-27,-38,-27);g.lineTo(28,-26);g.quadraticCurveTo(47,-25,53,-18);g.quadraticCurveTo(57,-13,54,-7);g.closePath();};
    g.save();cab();g.clip();driver(g,'sports',.56,-1,-9,st);g.restore();
    cab();g.fillStyle=GLASS;g.fill();
    g.fillStyle=METAL;g.fillRect(-46,-30,2.5,4);rr(g,-53,-32,14,3.5,1.5);fs(g,dk);
    body();fs(g,c);
    g.fillStyle='rgba(255,255,255,.85)';g.fillRect(-46,-20,97,2.6);
    archCut(g,body,[[-29,-10,13],[32,-10,13]]);
    body();g.stroke();
    g.lineWidth=2.6;g.strokeStyle=dk;cab();g.stroke();
    g.beginPath();g.moveTo(17,-40);g.lineTo(20,-26);g.stroke();
    g.strokeStyle=OUT;g.lineWidth=1.5;cab();g.stroke();
    g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=1.6;g.beginPath();g.moveTo(22,-36);g.lineTo(25,-30);g.stroke();g.strokeStyle=OUT;g.lineWidth=1.5;
    el(g,51,-16,3,2);fs(g,'#FFE36B');el(g,-48,-21,1.8,3);fs(g,'#FF4B4B');
    numBadge(g,-4,-15,5,st.num);
    wheel(g,-29,-10,10,st.wheel||0);wheel(g,32,-10,10,st.wheel||0);
  },
  jeep(g,st,c){
    const dk=mix(c,'#000000',.3);
    g.save();g.lineWidth=3.4;g.strokeStyle=METAL;g.beginPath();g.moveTo(-28,-29);g.lineTo(-28,-50);g.quadraticCurveTo(-28,-54,-24,-54);g.lineTo(-17,-54);g.stroke();g.restore();
    driver(g,'jeep',.6,-6,-15,st);
    const body=()=>{g.beginPath();g.moveTo(-47,-9);g.lineTo(-47,-30);g.lineTo(12,-30);g.lineTo(15,-28);g.lineTo(46,-27);g.quadraticCurveTo(50,-27,50,-23);g.lineTo(50,-9);g.closePath();};
    body();fs(g,c);
    g.fillStyle=dk;g.fillRect(-47,-23,97,3);
    archCut(g,body,[[-30,-12,15],[32,-12,15]]);
    body();g.stroke();
    g.beginPath();g.moveTo(9,-50);g.lineTo(15,-29);g.lineTo(20,-29);g.lineTo(14,-50);g.closePath();g.fillStyle=GLASS;g.fill();
    g.save();g.lineWidth=2.8;g.strokeStyle=METAL;g.beginPath();g.moveTo(15,-29);g.lineTo(9,-50);g.lineTo(14,-50);g.stroke();g.restore();
    el(g,47,-25,2.6,3.4);fs(g,'#FFE36B');
    numBadge(g,1,-16,5.2,st.num);
    wheel(g,-51,-24,9,0);
    wheel(g,-30,-12,12,st.wheel||0);wheel(g,32,-12,12,st.wheel||0);
  },
  kart(g,st,c){
    const dk=mix(c,'#000000',.3),lt=mix(c,'#FFFFFF',.45);
    rr(g,-46,-22,13,11,3);fs(g,'#8C95A6');
    g.fillStyle=METAL;g.fillRect(-50,-18.5,6,3.5);
    rr(g,-23,-32,8,23,3);fs(g,dk);
    driver(g,'kart',.62,-8,-10,st);
    rr(g,-42,-12,84,5,2.5);fs(g,METAL);
    g.save();g.lineWidth=2.6;g.strokeStyle=METAL;g.beginPath();g.moveTo(9,-19);g.lineTo(2,-28);g.stroke();g.restore();
    el(g,2,-28,1.8,4.8,-.5);fs(g,TIRE);
    g.beginPath();g.moveTo(0,-8);g.lineTo(5,-21);g.quadraticCurveTo(24,-25,40,-15);g.quadraticCurveTo(44,-11,42,-8);g.closePath();fs(g,c);
    g.fillStyle=lt;g.beginPath();g.moveTo(9,-20);g.quadraticCurveTo(24,-22,34,-16);g.quadraticCurveTo(22,-19,9,-18);g.closePath();g.fill();
    numBadge(g,22,-13,4.6,st.num);
    rr(g,40,-13,6,7,2);fs(g,METAL);
    wheel(g,-28,-8,8,st.wheel||0);wheel(g,28,-8,8,st.wheel||0);
  },
};

function flame(g,x,y,len,now){
  const L=len*(1+Math.sin(now/28)*.12+Math.random()*.12);
  [['#FF5A1F',1,1],['#FFC300',.66,.62],['#FFF7D0',.36,.34]].forEach(([col,lk,wk])=>{
    g.beginPath();g.moveTo(x,y-4.5*wk);g.quadraticCurveTo(x-L*lk*.55,y-6*wk,x-L*lk,y);g.quadraticCurveTo(x-L*lk*.55,y+6*wk,x,y+4.5*wk);g.closePath();
    g.fillStyle=col;g.fill();
  });
}
/* st: {now, wheel, num, face, wind, flame(길이), tilt} */
function drawCar(g,kind,u,st,color){
  g.save();
  if(st.tilt){g.translate(-30*u,0);g.rotate(st.tilt);g.translate(30*u,0);}
  g.scale(u,u);
  g.lineJoin='round';g.lineCap='round';g.strokeStyle=OUT;g.lineWidth=1.5;
  if(st.flame>1){const e=EXH[kind];flame(g,e[0],e[1],st.flame,st.now||0);}
  CAR_DRAW[kind](g,st,color);
  g.restore();
}
function drawCarPreview(c,kind,color,num,face){
  const d=2,w=c.width/d,h=c.height/d,g=c.getContext('2d');
  g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,w,h);
  const u=Math.min(w/122,h/74);
  g.save();g.translate(w*.47,h*.9);
  g.fillStyle='rgba(0,0,0,.13)';el(g,0,0,50*u,3*u);g.fill();
  drawCar(g,kind,u,{now:1000,num,face:face||'normal'},color);
  g.restore();
}

/* ----- 그리기 ----- */
const CROWD=['#FF6B6B','#FFD93D','#6BCB77','#4D96FF','#C77DFF','#FF9F45','#FFFFFF','#FF8FB1'];
function cloud(x,y,k){ctx.beginPath();ctx.arc(x,y,13*k,0,7);ctx.arc(x+15*k,y-7*k,17*k,0,7);ctx.arc(x+33*k,y,13*k,0,7);ctx.rect(x,y,33*k,12*k);ctx.fill();}
function drawSky(avg,now){
  const H=G.skyH,k=Math.max(.5,Math.min(1.6,H/100));
  const gr=ctx.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#58B9F0');gr.addColorStop(1,'#CDEBFF');
  ctx.fillStyle=gr;ctx.fillRect(0,0,CW,H);
  ctx.fillStyle='rgba(255,236,120,.35)';ctx.beginPath();ctx.arc(CW*.88,H*.28,26*k,0,7);ctx.fill();
  ctx.fillStyle='#FFE066';ctx.beginPath();ctx.arc(CW*.88,H*.28,16*k,0,7);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.95)';
  const span=CW+180;for(let i=0;i<4;i++){const x=((i*span/4-avg*.06)%span+span)%span-90;cloud(x,H*(.18+.13*(i%2)),k*.9);}
  const grassH=Math.max(5,8*k),sb=H-grassH,st=H*.48;
  if(sb-st>14){
    ctx.fillStyle='#3F4F74';ctx.fillRect(0,st,CW,sb-st);
    const rows=3,rh=(sb-st)/rows,sp=10*k,sc=avg*.25,base=Math.floor(sc/sp),off=sc-base*sp;
    for(let r=0;r<rows;r++){
      const y=st+r*rh;
      ctx.fillStyle=r%2?'#56699A':'#4D5F8D';ctx.fillRect(0,y+rh*.58,CW,rh*.42);
      const rad=Math.min(3.4*k,rh*.33);
      for(let i=-1;i<CW/sp+2;i++){
        const idx=base+i,x=i*sp-off+(r%2)*sp/2;
        const hop=Math.max(0,Math.sin(now/170+idx*1.7+r))*1.8*k;
        ctx.fillStyle=CROWD[(((idx*7+r*3)%8)+8)%8];
        ctx.beginPath();ctx.arc(x,y+rh*.5-hop,rad,0,7);ctx.fill();
      }
    }
    const fsp=18*k,fb=Math.floor(sc/fsp),fo=sc-fb*fsp,fy=st-1*k;
    ctx.strokeStyle='rgba(255,255,255,.9)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,fy);ctx.lineTo(CW,fy);ctx.stroke();
    for(let i=-1;i<CW/fsp+2;i++){const x=i*fsp-fo;ctx.fillStyle=CROWD[(((fb+i)%6)+6)%6];ctx.beginPath();ctx.moveTo(x,fy);ctx.lineTo(x+fsp*.62,fy);ctx.lineTo(x+fsp*.31,fy+8*k);ctx.closePath();ctx.fill();}
  }
  ctx.fillStyle='#4CAF50';ctx.fillRect(0,sb,CW,grassH);
  ctx.fillStyle='#5CBF60';const gsp=40*k,go=(avg*.5)%gsp;for(let x=-go;x<CW;x+=gsp)ctx.fillRect(x,sb,gsp/2,grassH);
}
function drawLane(p,L,i){
  const s=L.s;
  ctx.fillStyle=i%2?'#474E5E':'#4E5566';ctx.fillRect(0,L.top,CW,L.h);
  // 연석 (빨강·하양)
  const cw=Math.max(14,20*s),ch=Math.max(3,4*s),co=p.bg%(cw*2);
  for(let x=-co;x<CW;x+=cw*2){ctx.fillStyle='#E8412C';ctx.fillRect(x,L.top,cw,ch);ctx.fillStyle='#fff';ctx.fillRect(x+cw,L.top,cw,ch);}
  // 차선
  ctx.fillStyle='rgba(255,255,255,.45)';
  const gap=Math.max(60,110*s),dy=L.gy+(L.top+L.h-L.gy)*.5;
  for(let x=-(p.bg%gap);x<CW;x+=gap)ctx.fillRect(x,dy,34*s,Math.max(2,2.5*s));
  // 번호와 이름
  const r=Math.max(10,Math.min(18,L.h*.16)),bx=10+r,by=L.top+ch+r+5;
  ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(bx,by,r,0,7);ctx.fill();
  ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();
  ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.font=`${Math.round(r*1.2)}px Jua, sans-serif`;ctx.fillText(String(i+1),bx,by+1);
  if(L.h>44){ctx.textAlign='left';ctx.font=`${Math.round(r*.95)}px Jua, sans-serif`;ctx.fillStyle='rgba(0,0,0,.3)';ctx.fillText(p.name,bx+r+7,by+2);ctx.fillStyle='#fff';ctx.fillText(p.name,bx+r+6,by+1);}
  ctx.textBaseline='alphabetic';
}
function drawParts(p,front){
  p.parts.forEach(q=>{
    if((q.type==='line')!==!front)return;   // 바람 줄은 자동차 뒤, 나머지는 앞
    const a=Math.max(0,1-q.age/q.life);
    if(q.type==='line'){ctx.fillStyle=`rgba(255,255,255,${.5*Math.min(1,a*2)})`;ctx.fillRect(q.x,q.y,q.len,2);}
    else if(q.type==='dust'){ctx.globalAlpha=a*.5;ctx.fillStyle='#E6EAF0';ctx.beginPath();ctx.arc(q.x,q.y,q.r,0,7);ctx.fill();}
    else if(q.type==='smoke'){ctx.globalAlpha=a*.75;ctx.fillStyle='#7D838F';ctx.beginPath();ctx.arc(q.x,q.y,q.r,0,7);ctx.fill();}
    else{ctx.globalAlpha=a;star(ctx,q.x,q.y,q.r,q.col,q.rot+q.age*6);}
    ctx.globalAlpha=1;
  });
}
