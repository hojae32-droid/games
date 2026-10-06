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
   배달차 그리기 (탑차·오토바이·트럭·승합차)
   원점 = 차 가운데 아래(땅), 오른쪽으로 달려요.
   drawVehicle 안에서는 g.scale(u)를 해서 숫자를 '차 단위'로 써요.
   ========================================================= */
const CARS={
  boxtruck:{name:'탑차',driver:'bunny'},
  bike:    {name:'오토바이',driver:'cat'},
  truck:   {name:'트럭',driver:'bear'},
  van:     {name:'승합차',driver:'penguin'},
};
const CAR_KEYS=['boxtruck','bike','truck','van'];
const SCARF='#FFD84D',TIRE='#2B2F3A',METAL='#3A4050',GLASS='#CFEAFF';
const KRAFT='#D9A066',TAPE='#F3D9A4';
const EXH  ={boxtruck:[-55,-14],bike:[-46,-16],truck:[-55,-14],van:[-55,-15]};   // 배기구
const CARGO={boxtruck:[-22,-60],bike:[-37,-54],truck:[-32,-64],van:[-14,-54]};  // 상자가 나오는 곳

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
function numBadge(g,x,y,r,num){
  el(g,x,y,r,r);fs(g,'#fff');
  g.save();g.fillStyle=OUT;g.textAlign='center';g.textBaseline='middle';g.font=`${(r*1.4).toFixed(2)}px Jua, sans-serif`;
  g.fillText(String(num),x,y+r*.1);g.restore();
}
/* 택배 상자 (왼쪽 위 x,y) */
function parcel(g,x,y,w,h){
  g.save();g.lineJoin='round';
  g.beginPath();g.rect(x,y,w,h);g.fillStyle=KRAFT;g.fill();
  g.fillStyle=TAPE;g.fillRect(x+w*.39,y,w*.22,h);
  g.fillStyle='rgba(0,0,0,.12)';g.fillRect(x,y+h*.78,w,h*.22);
  g.beginPath();g.rect(x,y,w,h);g.stroke();
  g.restore();
}
function polyPath(g,pts){g.beginPath();g.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)g.lineTo(pts[i][0],pts[i][1]);g.closePath();}
/* 창문 안에 운전하는 동물 */
function cabWindow(g,kind,pts,k,x,y,st){
  polyPath(g,pts);g.fillStyle=GLASS;g.fill();
  g.save();polyPath(g,pts);g.clip();
  g.translate(x,y);drawCritter(g,CARS[kind].driver,k,{pose:'drive',now:st.now||0,face:st.face||'normal',wind:st.wind},SCARF);
  g.restore();
  g.save();g.globalAlpha=.35;g.strokeStyle='#fff';g.lineWidth=2.2;
  g.beginPath();g.moveTo(pts[1][0]-3,pts[1][1]+3);g.lineTo(pts[1][0]-9,pts[1][1]+9);g.stroke();g.restore();
  polyPath(g,pts);g.lineWidth=2.4;g.stroke();g.lineWidth=1.5;
}
function well(g,x,y,R){el(g,x,y,R,R);fs(g,TIRE,false);}

const CAR_DRAW={
  boxtruck(g,st,c){
    const dk=mix(c,'#000000',.3),lt=mix(c,'#FFFFFF',.6);
    rr(g,-55,-20,110,8,3);fs(g,METAL);
    // 짐칸
    rr(g,-55,-62,68,46,4);fs(g,c);
    rr(g,-49,-40,56,8,3);fs(g,lt,false);
    parcel(g,-29,-56,16,13);
    g.beginPath();g.moveTo(-51,-58);g.lineTo(-51,-20);g.stroke();
    // 운전석
    g.beginPath();g.moveTo(14,-15);g.lineTo(14,-47);g.quadraticCurveTo(14,-51,18,-51);g.lineTo(36,-51);g.lineTo(51,-33);g.quadraticCurveTo(55,-29,55,-23);g.lineTo(55,-15);g.closePath();fs(g,c);
    cabWindow(g,'boxtruck',[[19,-47],[35,-47],[48,-32],[19,-32]],.52,30,-13,st);
    rr(g,50,-20,8,6,2);fs(g,METAL);
    el(g,51,-26,2.4,3);fs(g,'#FFE36B');
    numBadge(g,27,-23,5,st.num);
    well(g,-34,-11,13);well(g,34,-11,13);
    wheel(g,-34,-10,10,st.wheel||0);wheel(g,34,-10,10,st.wheel||0);
    g.fillStyle=dk;g.fillRect(-55,-17,4,4);
  },
  bike(g,st,c){
    const lt=mix(c,'#FFFFFF',.6);
    // 배달통
    rr(g,-52,-56,30,28,4);fs(g,c);
    g.fillStyle=lt;g.fillRect(-52,-50,30,4);g.beginPath();g.rect(-52,-56,30,28);g.stroke();
    numBadge(g,-37,-38,6,st.num);
    rr(g,-50,-29,32,4,2);fs(g,METAL);
    wheel(g,-30,-11,11,st.wheel||0);wheel(g,30,-11,11,st.wheel||0);
    // 몸통
    g.beginPath();g.moveTo(-36,-16);g.quadraticCurveTo(-38,-31,-20,-31);g.lineTo(8,-31);g.quadraticCurveTo(15,-31,15,-24);g.lineTo(13,-16);g.closePath();fs(g,c);
    rr(g,-22,-35,24,5,2.5);fs(g,'#3A3F4D');
    g.save();g.translate(-7,-34);drawCritter(g,'cat',.56,{pose:'drive',now:st.now||0,face:st.face||'normal',wind:st.wind},SCARF);g.restore();
    // 앞쪽
    thick(g,[[27,-38],[30,-11]],3,METAL,1);
    polyPath(g,[[11,-16],[21,-16],[31,-40],[24,-44]]);fs(g,c);
    thick(g,[[24,-44],[15,-48]],3,METAL,1);
    el(g,30,-37,2.6,3.2);fs(g,'#FFE36B');
  },
  truck(g,st,c){
    const lt=mix(c,'#FFFFFF',.55);
    rr(g,-55,-20,110,8,3);fs(g,METAL);
    // 짐칸에 쌓인 상자
    [[-51,-49,18,17],[-32,-49,18,17],[-13,-47,16,15],[-43,-65,18,16],[-25,-63,15,14]].forEach(b=>parcel(g,...b));
    rr(g,-55,-33,64,17,3);fs(g,c);
    g.fillStyle=lt;g.fillRect(-51,-28,56,3);
    // 운전석
    g.beginPath();g.moveTo(11,-15);g.lineTo(11,-53);g.quadraticCurveTo(11,-57,15,-57);g.lineTo(37,-57);g.quadraticCurveTo(43,-57,45,-51);g.lineTo(51,-35);g.quadraticCurveTo(55,-31,55,-25);g.lineTo(55,-15);g.closePath();fs(g,c);
    cabWindow(g,'truck',[[17,-52],[39,-52],[47,-36],[17,-36]],.5,29,-17,st);
    rr(g,50,-21,8,6,2);fs(g,METAL);
    el(g,51,-28,2.4,3);fs(g,'#FFE36B');
    numBadge(g,27,-25,5,st.num);
    well(g,-34,-11,13);well(g,34,-11,13);
    wheel(g,-34,-10,10,st.wheel||0);wheel(g,34,-10,10,st.wheel||0);
  },
  van(g,st,c){
    const lt=mix(c,'#FFFFFF',.6);
    g.beginPath();g.moveTo(-55,-15);g.lineTo(-55,-46);g.quadraticCurveTo(-55,-54,-47,-54);g.lineTo(16,-54);g.quadraticCurveTo(24,-54,30,-48);g.lineTo(47,-33);g.quadraticCurveTo(55,-30,55,-23);g.lineTo(55,-15);g.closePath();fs(g,c);
    g.fillStyle=lt;g.fillRect(-55,-27,110,4);
    // 뒤 창문 두 개 (안에 상자가 보여요)
    [[-48,-48],[-25,-48]].forEach(([x,y],k)=>{rr(g,x,y,20,13,3);g.fillStyle=GLASS;g.fill();g.save();rr(g,x,y,20,13,3);g.clip();parcel(g,x+3+k*4,y+4,12,10);g.restore();rr(g,x,y,20,13,3);g.stroke();});
    cabWindow(g,'van',[[0,-48],[24,-48],[43,-33],[0,-33]],.5,16,-14,st);
    g.beginPath();g.moveTo(-3,-48);g.lineTo(-3,-16);g.stroke();
    numBadge(g,-15,-20,5,st.num);
    el(g,51,-25,2.4,3);fs(g,'#FFE36B');
    well(g,-34,-11,13);well(g,34,-11,13);
    wheel(g,-34,-10,10,st.wheel||0);wheel(g,34,-10,10,st.wheel||0);
  },
};

/* st: {now, wheel, num, face, wind, tilt} */
function drawCar(g,kind,u,st,color){
  g.save();
  if(st.tilt){g.translate(-30*u,0);g.rotate(st.tilt);g.translate(30*u,0);}
  g.scale(u,u);
  g.lineJoin='round';g.lineCap='round';g.strokeStyle=OUT;g.lineWidth=1.5;
  CAR_DRAW[kind](g,st,color);
  g.restore();
}
function drawCarPreview(c,kind,color,num,face){
  const d=2,w=c.width/d,h=c.height/d,g=c.getContext('2d');
  g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,w,h);
  const u=Math.min(w/124,h/78);
  g.save();g.translate(w*.5,h*.93);
  g.fillStyle='rgba(0,0,0,.13)';el(g,0,0,52*u,3*u);g.fill();
  drawCar(g,kind,u,{now:1000,num,face:face||'normal'},color);
  g.restore();
}

/* 드론 (가운데 x,y) */
function drawDrone(g,x,y,u,now,box){
  g.save();g.translate(x,y);g.scale(u,u);
  g.lineJoin='round';g.lineCap='round';g.strokeStyle=OUT;g.lineWidth=1.4;
  if(box){
    g.beginPath();g.moveTo(-4,4);g.lineTo(-6,12);g.moveTo(4,4);g.lineTo(6,12);g.stroke();
    parcel(g,-8,12,16,12);
  }
  g.save();g.lineWidth=3;g.strokeStyle=METAL;g.beginPath();g.moveTo(-17,-2);g.lineTo(17,-2);g.stroke();g.restore();
  [-17,17].forEach((px,k)=>{
    g.save();g.lineWidth=2;g.strokeStyle=METAL;g.beginPath();g.moveTo(px,-2);g.lineTo(px,-6);g.stroke();g.restore();
    const sp=Math.abs(Math.cos(now/28+k*1.3));
    el(g,px,-7,3+10*sp,1.8);g.fillStyle='rgba(58,64,80,.55)';g.fill();
  });
  rr(g,-10,-7,20,11,5);fs(g,'#FFFFFF');
  el(g,6,-1.5,2.4,2.4);fs(g,'#2F80ED',false);
  g.restore();
}

/* =========================================================
   동네 집 (길가에 줄지어 있어요)
   ========================================================= */
const WALLS=['#FFF1DC','#E3F0FB','#FBE3EC','#E3F4E6','#FFF8D6','#ECE6F7'];
const ROOFS=['#E36E62','#5C7CFA','#F09A4A','#3FAE9E','#8E6CD0','#D9573F'];
function hsh(i,k){const x=Math.sin(i*127.1+k*311.7)*43758.5453;return x-Math.floor(x);}
function houseGeom(idx,s){
  const sp=96*s,w=(38+10*hsh(idx,1))*s,X=idx*sp+hsh(idx,2)*sp*.25,left=hsh(idx,3)<.5;
  return{X,w,sp,left,door:X+w*(left?.28:.72)};
}
/* X: 화면 왼쪽, gy: 땅, maxH: 최대 높이 */
function drawHouse(g,idx,X,gy,maxH,s,done){
  const hg=houseGeom(idx,s),w=hg.w,H=maxH*(.8+.2*hsh(idx,4)),bH=H*.58;
  g.save();g.lineJoin='round';g.strokeStyle=OUT;g.lineWidth=Math.max(1,1.2*s);
  // 옆 나무
  const nx=houseGeom(idx+1,s),gap=nx.X-(hg.X+w);
  if(hsh(idx,7)>.45&&gap>14*s){
    const tx=X+w+gap/2,tr=Math.min(gap*.42,10*s,maxH*.3);
    g.fillStyle='#8D6E63';g.fillRect(tx-1.5*s,gy-tr*1.2,3*s,tr*1.2);
    el(g,tx,gy-tr*1.6,tr,tr);fs(g,'#5DBB63');
  }
  g.beginPath();g.rect(X,gy-bH,w,bH);g.fillStyle=WALLS[Math.floor(hsh(idx,5)*6)];g.fill();g.stroke();
  g.beginPath();g.moveTo(X-3*s,gy-bH);g.lineTo(X+w/2,gy-H);g.lineTo(X+w+3*s,gy-bH);g.closePath();g.fillStyle=ROOFS[Math.floor(hsh(idx,6)*6)];g.fill();g.stroke();
  const dw=w*.24,dh=bH*.64,dx=X+w*(hg.left?.16:.6);
  g.beginPath();g.rect(dx,gy-dh,dw,dh);g.fillStyle='#8D6E63';g.fill();g.stroke();
  const ws=w*.24,wx=X+w*(hg.left?.6:.16),wy=gy-bH*.8;
  g.beginPath();g.rect(wx,wy,ws,ws*.85);g.fillStyle='#BFE3FF';g.fill();g.stroke();
  if(done){
    const b=Math.min(9*s,bH*.34);parcel(g,dx+dw+1*s,gy-b*.85,b,b*.85);
    const cy=gy-bH-(H-bH)*.38,cr=Math.max(3,Math.min(6*s,(H-bH)*.3));
    el(g,X+w/2,cy,cr,cr);g.fillStyle='#1F9D68';g.fill();g.strokeStyle='#fff';g.stroke();
    g.lineWidth=Math.max(1.4,cr*.35);g.beginPath();g.moveTo(X+w/2-cr*.45,cy);g.lineTo(X+w/2-cr*.1,cy+cr*.35);g.lineTo(X+w/2+cr*.5,cy-cr*.4);g.stroke();
  }
  g.restore();
}
function drawStreet(g,off,W,gy,maxH,s,doneSet){
  const sp=96*s,first=Math.floor(off/sp)-1;
  for(let idx=first;idx<first+W/sp+3;idx++){
    const hg=houseGeom(idx,s),x=hg.X-off;
    if(x>W||x+hg.w+sp<0)continue;
    drawHouse(g,idx,x,gy,maxH,s,doneSet&&doneSet.has(idx));
  }
}

/* ----- 그리기 ----- */
const APTS=['#DCE7F3','#E9E3F5','#F4E4D6','#D8EEE4'];
function cloud(x,y,k){ctx.beginPath();ctx.arc(x,y,13*k,0,7);ctx.arc(x+15*k,y-7*k,17*k,0,7);ctx.arc(x+33*k,y,13*k,0,7);ctx.rect(x,y,33*k,12*k);ctx.fill();}
function drawSky(avg){
  const H=G.skyH,k=Math.max(.5,Math.min(1.6,H/100));
  const gr=ctx.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#58B9F0');gr.addColorStop(1,'#CDEBFF');
  ctx.fillStyle=gr;ctx.fillRect(0,0,CW,H);
  ctx.fillStyle='rgba(255,236,120,.35)';ctx.beginPath();ctx.arc(CW*.88,H*.28,26*k,0,7);ctx.fill();
  ctx.fillStyle='#FFE066';ctx.beginPath();ctx.arc(CW*.88,H*.28,16*k,0,7);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.95)';
  const span=CW+180;for(let i=0;i<4;i++){const x=((i*span/4-avg*.05)%span+span)%span-90;cloud(x,H*(.16+.12*(i%2)),k*.85);}
  // 멀리 보이는 아파트
  const bw=54*k,sc=avg*.12,base=Math.floor(sc/bw),off=sc-base*bw,hedge=Math.max(4,7*k);
  for(let i=-1;i<CW/bw+2;i++){
    const idx=base+i,x=i*bw-off,bh=H*(.34+.3*hsh(idx,9)),top=H-hedge-bh,w=bw-8*k;
    ctx.fillStyle=APTS[Math.floor(hsh(idx,8)*4)];ctx.fillRect(x,top,w,bh+hedge);
    ctx.fillStyle='rgba(30,42,74,.12)';ctx.fillRect(x,top,w,Math.max(2,3*k));
    ctx.fillStyle='rgba(120,150,190,.45)';
    const rh=7*k;for(let y=top+6*k;y<H-hedge-3*k;y+=rh)for(let c=0;c<3;c++)ctx.fillRect(x+5*k+c*(w-10*k)/3,y,Math.max(2,(w-10*k)/3-4*k),Math.max(1.5,3*k));
  }
  ctx.fillStyle='#63B85B';ctx.fillRect(0,H-hedge,CW,hedge);
}
function drawLane(p,L,i){
  const s=L.s,rt=L.roadTop,sw=Math.max(3,5*s),bottom=L.top+L.h;
  ctx.fillStyle=i%2?'#DCEAF3':'#E6F1F8';ctx.fillRect(0,L.top,CW,rt-L.top);
  ctx.save();ctx.beginPath();ctx.rect(0,L.top,CW,rt-L.top+1);ctx.clip();
  drawStreet(ctx,p.bg,CW,rt,rt-L.top-3*s,s,p.done);
  ctx.restore();
  // 인도와 도로
  ctx.fillStyle='#C9CED6';ctx.fillRect(0,rt,CW,sw);
  ctx.fillStyle='#AEB5C0';ctx.fillRect(0,rt+sw-Math.max(1,1.2*s),CW,Math.max(1,1.2*s));
  ctx.fillStyle=i%2?'#474E5E':'#4E5566';ctx.fillRect(0,rt+sw,CW,bottom-rt-sw);
  ctx.fillStyle='rgba(255,255,255,.45)';
  const gap=Math.max(60,110*s),dy=L.gy+(bottom-L.gy)*.5;
  for(let x=-(p.bg%gap);x<CW;x+=gap)ctx.fillRect(x,dy,34*s,Math.max(2,2.5*s));
  // 번호와 이름
  const r=Math.max(9,Math.min(16,L.h*.14)),bx=8+r,by=L.top+r+4;
  ctx.font=`${Math.round(r*.95)}px Jua, sans-serif`;
  const nw=L.h>44?ctx.measureText(p.name).width+r+12:0;
  ctx.fillStyle='rgba(255,255,255,.85)';rr(ctx,bx-r-3,by-r-3,2*r+6+nw,2*r+6,r+3);ctx.fill();
  ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(bx,by,r,0,7);ctx.fill();
  ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.font=`${Math.round(r*1.2)}px Jua, sans-serif`;ctx.fillText(String(i+1),bx,by+1);
  if(nw){ctx.textAlign='left';ctx.font=`${Math.round(r*.95)}px Jua, sans-serif`;ctx.fillStyle=OUT;ctx.fillText(p.name,bx+r+6,by+1);}
  ctx.textBaseline='alphabetic';
}
function drawParts(p,L,front,now){
  p.parts.forEach(q=>{
    if((q.type==='line')!==!front)return;   // 바람 줄은 차 뒤, 나머지는 앞
    const a=Math.max(0,1-q.age/q.life);
    if(q.type==='parcel'){
      if(q.landed)return;
      const t=Math.min(1,q.age/q.life),d=doorPt(p,L,q.idx),e=t*t*(3-2*t);
      const x=q.x0+(d[0]-q.x0)*e,y=q.y0+(d[1]-q.y0)*e-Math.sin(t*Math.PI)*28*L.s,b=11*L.s;
      ctx.save();ctx.translate(x,y);ctx.rotate(t*Math.PI*1.2);ctx.strokeStyle=OUT;ctx.lineWidth=Math.max(1,1.2*L.s);parcel(ctx,-b/2,-b/2,b,b*.85);ctx.restore();
    }
    else if(q.type==='line'){ctx.fillStyle=`rgba(255,255,255,${.5*Math.min(1,a*2)})`;ctx.fillRect(q.x,q.y,q.len,2);}
    else if(q.type==='dust'){ctx.globalAlpha=a*.5;ctx.fillStyle='#E6EAF0';ctx.beginPath();ctx.arc(q.x,q.y,q.r,0,7);ctx.fill();}
    else{ctx.globalAlpha=a;star(ctx,q.x,q.y,q.r,q.col,q.rot+q.age*6);}
    ctx.globalAlpha=1;
  });
}
/* 틀렸을 때: 상자가 뒤로 떨어졌다가 다시 실려요 */
function drawDropped(p,L,now){
  const f=(now-p.phaseStart)/T_BROKE;if(f>=.95)return;
  const s=L.s,c=CARGO[p.kind],sx=p.x+c[0]*s,sy=L.gy+c[1]*s,ex=p.x-66*s,ey=L.gy,b=14*s;
  let x,y,rot;
  if(f<.28){const t=f/.28;x=sx+(ex-sx)*t;y=sy+(ey-sy)*t*t-Math.sin(t*Math.PI)*10*s;rot=-t*2.2;}
  else if(f<.72){const t=(f-.28)/.44,bn=Math.max(0,Math.sin(t*Math.PI*3))*Math.max(0,1-t*2)*5*s;x=ex;y=ey-bn;rot=t<.2?-2.2+t/.2*2.2:0;}
  else{const t=(f-.72)/.23;x=ex+(sx-ex)*t;y=ey+(sy-ey)*t-Math.sin(t*Math.PI)*26*s;rot=t*Math.PI*2;}
  ctx.save();ctx.translate(x,y-b*.42);ctx.rotate(rot);ctx.strokeStyle=OUT;ctx.lineWidth=Math.max(1,1.3*s);parcel(ctx,-b/2,-b*.42,b,b*.85);ctx.restore();
  if(f>.28&&f<.72){
    const a=Math.min(1,(f-.28)/.06)*Math.min(1,(.72-f)/.06);
    ctx.globalAlpha=a;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`${Math.round(18*s)}px sans-serif`;
    ctx.fillText('💦',ex+12*s+Math.sin(now/120)*2*s,ey-24*s);ctx.globalAlpha=1;ctx.textBaseline='alphabetic';
  }
}
