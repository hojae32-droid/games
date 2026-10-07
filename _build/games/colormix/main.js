/* 3~6학년 미술 · 색의 혼합 · 명도 · 색상환과 보색 — 색 섞기 실험실
   디자인: 물감 튜브가 줄지어 선 물감 실험실. 튜브를 눌러 팔레트에 한 방울씩 떨어뜨려 목표 색을 만들고, 색상환에서 보색·난색·한색을 찾아요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#3b2a50',VIO='#6d28d9';
const LOGO=gkLogo('#fff','#4c1d95','🎨');
const LV={
  primary:{t:'3원색으로 색 만들기',d:'빨강·노랑·파랑 물감을 섞어 목표 색 만들기',time:30},
  tint:{t:'밝게, 어둡게',d:'하양·검정을 섞어 밝기(명도)를 바꿔요',time:30},
  wheel:{t:'색상환과 보색',d:'10색상환에서 보색·난색·한색 찾기',time:18},
};
const C8={0:[1,1,1],r:[1,0,0],y:[1,1,0],b:[.163,.373,.6],ry:[1,.5,0],rb:[.5,0,.5],yb:[0,.66,.2],ryb:[.2,.094,0]};
function ryb2rgb(r,y,b){const L=(a,c,t)=>a.map((v,i)=>v+(c[i]-v)*t);const x0=L(C8[0],C8.r,r),x1=L(C8.y,C8.ry,r),x2=L(C8.b,C8.rb,r),x3=L(C8.yb,C8.ryb,r);const y0=L(x0,x1,y),y1=L(x2,x3,y);return L(y0,y1,b);}
function mixC(n){const C=n.r+n.y+n.b,T=C+n.w+n.k;if(!T)return null;let rgb;if(C){const m=Math.max(n.r,n.y,n.b);rgb=ryb2rgb(n.r/m,n.y/m,n.b/m);}else rgb=[1,1,1];if(!C&&n.k)rgb=[1,1,1];const tw=n.w/T,tk=n.k/T;rgb=rgb.map(v=>v*(1-tw)+tw);rgb=rgb.map(v=>v*(1-tk*.92));return rgb;}
const hex=rgb=>'#'+rgb.map(v=>Math.round(clamp(v,0,1)*255).toString(16).padStart(2,'0')).join('');
function lab(rgb){const f=v=>v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4);let[r,g,b]=rgb.map(f);const X=(r*.4124+g*.3576+b*.1805)/.95047,Y=r*.2126+g*.7152+b*.0722,Z=(r*.0193+g*.1192+b*.9505)/1.08883;const h=t=>t>.008856?Math.cbrt(t):7.787*t+16/116;return[116*h(Y)-16,500*(h(X)-h(Y)),200*(h(Y)-h(Z))];}
const dist=(a,b)=>{const A=lab(a),B=lab(b);return Math.hypot(A[0]-B[0],A[1]-B[1],A[2]-B[2]);};
const TUBES={r:['빨강','#E60012'],y:['노랑','#FFD600'],b:['파랑','#1F5FBF'],w:['하양','#FFFFFF'],k:['검정','#222222']};
const RECIPES=[['주황',{r:1,y:1}],['초록',{y:1,b:1}],['보라',{r:1,b:1}],['연두',{y:2,b:1}],['다홍',{r:2,y:1}],['귤색',{r:1,y:2}],['청록',{y:1,b:2}],['자주',{r:2,b:1}],['남보라',{r:1,b:2}],['갈색',{r:1,y:1,b:1}],['올리브색',{r:1,y:2,b:1}],['고동색',{r:2,y:1,b:1}]];
const BASES=[['빨강',{r:1}],['노랑',{y:1}],['파랑',{b:1}],['주황',{r:1,y:1}],['초록',{y:1,b:1}],['보라',{r:1,b:1}]];
const WHEEL=[['빨강','#E60012'],['주황','#F39800'],['노랑','#FFE100'],['연두','#8FC31F'],['초록','#009944'],['청록','#009E96'],['파랑','#00A0E9'],['남색','#1D2088'],['보라','#920783'],['자주','#E4007F']];
const MAXD=8;
const jo=(w,a,b)=>{const c=w.charCodeAt(w.length-1);return c>=0xAC00&&c<=0xD7A3&&(c-0xAC00)%28?a:b;};
const vec=n=>Object.assign({r:0,y:0,b:0,w:0,k:0},n);
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#fffaf0','#fde68a']);const cs=['#E60012','#FFD600','#1F5FBF','#222'];cs.forEach((c,i)=>{const x=W*(.2+i*.2),y=H*.62;g.fillStyle=c;K.rr(g,x-u*.45,y-u*.9,u*.9,u*1.8,u*.2);g.fill();g.strokeStyle='#3b2a50';g.lineWidth=3;g.stroke();g.fillStyle='#fff';g.fillRect(x-u*.3,y-u*1.2,u*.6,u*.35);g.strokeRect(x-u*.3,y-u*1.2,u*.6,u*.35);});
  const ph=(T*.5)%1;const mc=['#F39800','#009944','#920783'][Math.floor(T*.5)%3];g.fillStyle=mc;g.beginPath();g.arc(W/2,H*.28,u*(.6+.3*Math.sin(T*3)),0,TAU);g.fill();g.strokeStyle='#3b2a50';g.lineWidth=4;g.stroke();}
const GAME={
  id:'colormix',title:'색 섞기 실험실',title1:'물감 튜브 실험실',title2:'색 섞기 실험실',emoji:LOGO,
  subtitle:'3~6학년 미술 · 색의 혼합 · 명도 · 색상환',
  howto:'🎨 <b>섞기</b>: 물감 튜브를 눌러 팔레트에 한 방울씩 떨어뜨리고 <b>완성!</b>을 눌러요. 목표 색과 가까울수록 점수가 커요.<br>🌈 <b>색상환</b>: 문제에 맞는 색을 색상환에서 눌러요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:'#a855f7',c2:'#ef4444'},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 실험을 할까요?',
  txt:{who:'누가 실험가일까요?',dur:'실험 시간',pace:'생각하는 시간',seat:'번 실험가 ',go:'실험 시작!',s1:'1. 실험',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'3~6학년',t:v.t,d:v.d})),
  summary:`<ul><li><b>3원색</b>은 빨강·노랑·파랑이에요. 두 가지를 섞으면 주황(빨강+노랑), 초록(노랑+파랑), 보라(빨강+파랑)가 돼요. 세 가지를 모두 섞으면 어두운 갈색이 돼요.</li>
    <li><b>명도</b>는 색의 밝고 어두운 정도예요. 하양을 섞으면 밝아지고, 검정을 섞으면 어두워져요.</li>
    <li><b>보색</b>은 색상환에서 서로 마주 보는 색이에요. 나란히 놓으면 서로 더 선명해 보여요. 빨강·주황·노랑 계열은 <b>난색</b>(따뜻한 색), 청록·파랑·남색 계열은 <b>한색</b>(차가운 색)이에요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2,pad=u*.35,q=p.state.q;const mix=q&&q.mix;let tubes=[],btns=[],wheel=null;const tn=q&&q.deck==='primary'?3:5;
    const bh=Math.min(u*1.7,(H-top)*.1);const ty0=H-pad-bh-u*.3;
    const tubeH=Math.min(u*4.4,(H-top)*.25),tubeW=Math.min(u*2.2,(W-pad*2)/(tn+1));const tgap=(W-pad*2-tubeW*tn)/(tn+1);
    if(mix){for(let i=0;i<tn;i++)tubes.push({k:(q.deck==='primary'?['r','y','b']:['r','y','b','w','k'])[i],x:pad+tgap*(i+1)+tubeW*i,y:ty0-tubeH-u*.2,w:tubeW,h:tubeH});btns=[{id:'clear',t:'🧽 비우기',x:pad,y:H-pad-bh,w:(W-pad*3)*.35,h:bh},{id:'done',t:'완성! ✨',x:pad*2+(W-pad*3)*.35,y:H-pad-bh,w:(W-pad*3)*.65,h:bh,go:1}];}
    const area={x:pad,y:top+u*2.7,w:W-pad*2,h:(mix?tubes[0].y:H-pad)-(top+u*2.7)-u*.2};
    if(!mix){const R=Math.min(area.w*.48,area.h*.5);wheel={cx:W/2,cy:area.y+area.h/2,R,r:R*.46};}
    return{W,H,u,top,pad,tubes,btns,area,wheel};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,drops:vec({}),dropAnim:[],squeeze:{},swirl:0,msg:'',okFlag:false,close:0,gotpts:0,tapped:-1,bag:[]});this.newQ(p);},
  make(p,L){const R=p.R,q={deck:L,mix:L!=='wheel'};
    if(L==='primary'){const it=R.pick(RECIPES);q.name=it[0];q.rec=vec(it[1]);q.rgb=mixC(q.rec);}
    else if(L==='tint'){const b=R.pick(BASES),up=R.chance(.5),lvl=1+R.int(0,1);const rec=vec(b[1]);const s=Object.values(b[1]).reduce((a,c)=>a+c,0);if(up)rec.w=lvl*s;else rec.k=lvl===1?Math.max(1,Math.round(s/2)):s;q.name=(up?(lvl>1?'아주 ':'')+'밝은':(lvl>1?'아주 ':'')+'어두운')+' '+b[0];q.rec=rec;q.rgb=mixC(rec);}
    else{const t=R.int(0,2),i=R.int(0,9);if(t===2){const warm=R.chance(.5);q.type=warm?'warm':'cool';q.ok=warm?[0,1,2]:[5,6,7];q.name=warm?'따뜻한 느낌의 색(난색)':'차가운 느낌의 색(한색)';q.sw=warm?['#E60012','#FFE100']:['#009E96','#1D2088'];}else{q.type='comp';q.i=i;q.ok=[(i+5)%10];q.name=WHEEL[i][0]+'의 보색';q.sw=[WHEEL[i][1],WHEEL[i][1]];}}
    q.text=q.mix?'🎯 목표 색: <b>'+q.name+'</b>':'🎯 <b>'+q.name+'</b>을(를) 찾아요';if(!q.mix)q.text='🎯 <b>'+q.name+'</b>'+(q.type==='comp'?'을(를) 색상환에서 찾아요':'을(를) 하나 골라요');
    q.recTxt=q.mix?Object.keys(q.rec).filter(k=>q.rec[k]).map(k=>TUBES[k][0]+' '+q.rec[k]).join(' + '):'';
    q.reveal=q.mix?q.name+': '+q.recTxt:(q.type==='comp'?WHEEL[q.i][0]+'의 보색은 '+WHEEL[q.ok[0]][0]:(q.type==='warm'?'난색은 ':'한색은 ')+q.ok.map(k=>WHEEL[k][0]).join('·'));q.review=q.mix?'목표 '+q.name+' → '+q.recTxt:q.name+' → '+q.reveal;q.speak='';return q;},
  qtime(q){return LV[this._p.levelId].time;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return q.text;},askSub(q){return q.mix?'물감을 한 방울씩 떨어뜨려 섞어요':'색상환에서 눌러요';},
  isOk(q,i,p){return !!p.state.okFlag;},tipOf(q){return q.reveal;},goodTip(q){return (p0=>p0)(q.mix?(this._p.state.close<2.5?'똑같아요! 💯 ':'아주 비슷해요! ')+q.recTxt:'정답! '+q.reveal);},
  ptsOf(p,q,frac){const st=p.state;if(q.mix)return Math.round(60+40*Math.max(0,1-st.close/9))+Math.round(20*frac);return Math.round(50+50*frac);},
  onNew(p,q){const st=p.state;st.drops=vec({});st.dropAnim=[];st.okFlag=false;st.close=0;st.tapped=-1;st.msg='';},
  totalD(st){return st.drops.r+st.drops.y+st.drops.b+st.drops.w+st.drops.k;},
  judge(p,timeout){const st=p.state,q=st.q;const c=mixC(st.drops);if(!c){st.msg='물감을 먼저 떨어뜨려요';return;}st.close=dist(c,q.rgb);st.okFlag=st.close<9;this.verdict(p,0,false);},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);
    if(q.mix){const b=G.btns.find(b=>K.inRect(x,y,b));if(b){p.Snd.tap&&p.Snd.tap();if(b.id==='clear'){st.drops=vec({});}else this.judge(p);return;}
      const t=G.tubes.find(t=>K.inRect(x,y,t));if(t){if(this.totalD(st)>=MAXD){st.msg='팔레트가 가득 찼어요. 비우고 다시 해요';return;}st.drops[t.k]++;st.squeeze[t.k]=.25;st.dropAnim.push({k:t.k,t:0,x:t.x+t.w/2});st.swirl=.6;p.Snd.tap&&p.Snd.tap();return;}return;}
    const W=G.wheel;const dx=x-W.cx,dy=y-W.cy,r=Math.hypot(dx,dy);if(r<W.r||r>W.R)return;let a=Math.atan2(dy,dx)*180/Math.PI+90+18;a=((a%360)+360)%360;const i=Math.floor(a/36)%10;if(q.type==='comp'&&i===q.i)return;st.tapped=i;st.okFlag=q.ok.includes(i);this.verdict(p,i,false);},
  upd(p,dt){const st=p.state;for(const k in st.squeeze)if(st.squeeze[k]>0)st.squeeze[k]-=dt;st.dropAnim.forEach(d=>d.t+=dt);st.dropAnim=st.dropAnim.filter(d=>d.t<.4);if(st.swirl>0)st.swirl-=dt;},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();const cl=r=>({k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2});
    if(!q.mix){const W=G.wheel;const i=q.ok[0];const a=(i*36-90)*Math.PI/180,rr=(W.r+W.R)/2;return{k:'click',x:rc.left+W.cx+Math.cos(a)*rr,y:rc.top+W.cy+Math.sin(a)*rr};}
    const need=Object.keys(q.rec).find(k=>st.drops[k]<q.rec[k]);if(need&&this.totalD(st)<MAXD)return cl(G.tubes.find(t=>t.k===need));return cl(G.btns.find(b=>b.id==='done'));},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q,t=st.T;if(!q)return;
    K.vgrad(g,0,0,W,H,['#fffaf0','#fde9c4']);
    /* 목표 색 */
    const ty=G.top+u*.1;K.card(g,G.pad,ty,W-G.pad*2,u*2.4,u*.3,'#fff',{stroke:'#4c1d95',lw:3,blur:u*.15,dy:u*.06});
    const sw=u*1.7;if(q.mix){g.fillStyle=hex(q.rgb);K.rr(g,G.pad+u*.35,ty+u*.35,sw,sw,u*.3);g.fill();g.strokeStyle='#4c1d95';g.lineWidth=3;g.stroke();}else{const gr=g.createLinearGradient(G.pad+u*.35,ty,G.pad+u*.35+sw,ty+sw);gr.addColorStop(0,q.sw[0]);gr.addColorStop(1,q.sw[1]);g.fillStyle=gr;K.rr(g,G.pad+u*.35,ty+u*.35,sw,sw,u*.3);g.fill();g.strokeStyle='#4c1d95';g.lineWidth=3;g.stroke();}
    K.txt(g,'목표 색',G.pad+u*.35+sw+u*.4,ty+u*.7,{size:u*.5,color:'#8b7aa8',maxW:u*4,align:'left'});K.txt(g,q.name,G.pad+u*.35+sw+u*.4,ty+u*1.5,{size:Math.min(u*1.0,(W-G.pad*2-sw-u*2)/Math.max(4,q.name.length)*1.6),color:INK,maxW:W-G.pad*2-sw-u*1.4,align:'left'});
    if(!st.lock&&st.qmax>0)QZ.bar(g,G.pad+u*.35,ty+u*2.2,W-G.pad*2-u*.7,Math.max(5,u*.15),st.qt/st.qmax,{good:'#a855f7'});
    const A=G.area;
    if(q.mix){const cx=W/2,cy=A.y+A.h*.5,R=Math.min(A.h*.46,A.w*.3);K.shadow&&K.shadow(g,cx,cy+R*.95,R,R*.15,.25);g.fillStyle='#fff';g.strokeStyle='#4c1d95';g.lineWidth=Math.max(4,u*.12);g.beginPath();g.ellipse(cx,cy,R*1.35,R,0,0,TAU);g.fill();g.stroke();
      const c=mixC(st.drops);if(c){const tot=this.totalD(st);const sc=Math.min(1,.35+.1*tot);g.save();g.beginPath();g.ellipse(cx,cy,R*1.25*sc,R*.9*sc,0,0,TAU);g.clip();g.fillStyle=hex(c);g.fillRect(cx-R*1.5,cy-R,R*3,R*2);if(st.swirl>0){g.strokeStyle='rgba(255,255,255,.6)';g.lineWidth=u*.2;g.beginPath();g.arc(cx,cy,R*.5*(1-st.swirl),st.T*8,st.T*8+3);g.stroke();}g.restore();K.txt(g,tot+'방울',cx,cy+R*1.2,{size:u*.5,color:'#8b7aa8',maxW:u*4});}
      st.dropAnim.forEach(d=>{const k=d.t/.4;g.fillStyle=TUBES[d.k][1];g.strokeStyle='#4c1d95';g.lineWidth=2;g.beginPath();g.arc(d.x+(cx-d.x)*k,(G.tubes[0].y+G.tubes[0].h)+(cy-(G.tubes[0].y+G.tubes[0].h))*k,u*.22,0,TAU);g.fill();g.stroke();});
      const rec=Object.keys(st.drops).filter(k=>st.drops[k]);rec.forEach((k,i)=>{const x=cx+R*1.5+u*.3,y=cy-R*.7+i*u*.65;if(x<W-u*3){g.fillStyle=TUBES[k][1];g.strokeStyle='#4c1d95';g.lineWidth=2;g.beginPath();g.arc(x,y,u*.22,0,TAU);g.fill();g.stroke();K.txt(g,TUBES[k][0]+' ×'+st.drops[k],x+u*.4,y,{size:u*.45,color:INK,maxW:u*3,align:'left'});}});
      G.tubes.forEach(tb=>{const sq=st.squeeze[tb.k]>0?.92:1;const hh=tb.h*sq;g.fillStyle=TUBES[tb.k][1];g.strokeStyle='#4c1d95';g.lineWidth=3;K.rr(g,tb.x,tb.y+tb.h-hh,tb.w,hh*.82,tb.w*.2);g.fill();g.stroke();g.fillStyle='#fff';K.rr(g,tb.x+tb.w*.2,tb.y+tb.h-hh+hh*.18,tb.w*.6,hh*.4,tb.w*.1);g.fill();g.stroke();K.txt(g,TUBES[tb.k][0],tb.x+tb.w/2,tb.y+tb.h-hh+hh*.38,{size:Math.min(u*.55,tb.w*.28),color:INK,maxW:tb.w*.55});g.fillStyle='#e5e7eb';K.rr(g,tb.x+tb.w*.3,tb.y+tb.h-hh+hh*.8,tb.w*.4,hh*.2,tb.w*.08);g.fill();g.stroke();});
      G.btns.forEach(b=>{K.rr(g,b.x,b.y,b.w,b.h,u*.25);g.fillStyle=b.go?(st.lock?'#cbd5e1':'#ef4444'):'#fff';g.fill();g.lineWidth=3;g.strokeStyle='#4c1d95';g.stroke();K.txt(g,b.t,b.x+b.w/2,b.y+b.h/2,{size:Math.min(b.h*.5,u*1),color:b.go?'#fff':INK,maxW:b.w*.9});});}
    else{const Wh=G.wheel;WHEEL.forEach((w,i)=>{const a0=(i*36-90-18)*Math.PI/180,a1=(i*36-90+18)*Math.PI/180;const right=st.lock&&q.ok.includes(i),wrong=st.lock&&st.tapped===i&&!st.okFlag,src=q.type==='comp'&&q.i===i;
        g.beginPath();g.arc(Wh.cx,Wh.cy,Wh.R,a0,a1);g.arc(Wh.cx,Wh.cy,Wh.r,a1,a0,true);g.closePath();g.fillStyle=w[1];g.fill();g.lineWidth=right?8:wrong?6:3;g.strokeStyle=right?'#16a34a':wrong?'#dc2626':src?'#4c1d95':'#fff';g.stroke();
        const am=(i*36-90)*Math.PI/180,rm=(Wh.R+Wh.r)/2;K.txt(g,w[0],Wh.cx+Math.cos(am)*rm,Wh.cy+Math.sin(am)*rm,{size:Math.min(u*.6,Wh.R*.13),color:['노랑','연두'].includes(w[0])?'#3b2a50':'#fff',stroke:['노랑','연두'].includes(w[0])?null:'rgba(0,0,0,.35)',lw:3,maxW:Wh.R*.4});if(src)K.txt(g,'⭐',Wh.cx+Math.cos(am)*(Wh.R+u*.5),Wh.cy+Math.sin(am)*(Wh.R+u*.5),{size:u*.8,color:'#4c1d95',maxW:u});});
      K.txt(g,q.type==='comp'?'마주 보는 색':q.type==='warm'?'따뜻한 쪽':'차가운 쪽',Wh.cx,Wh.cy,{size:Math.min(u*.8,Wh.r*.35),color:INK,maxW:Wh.r*1.7});}
    if(st.msg)K.txt(g,st.msg,W/2,G.area.y+u*.6,{size:u*.6,color:'#b91c1c',maxW:W*.9});
    if(st.lock)K.txt(g,st.okFlag?'🎉 성공!':'🙂 아쉬워요',W/2,A.y+u*.6,{size:u*.9,color:st.okFlag?'#15803d':'#b91c1c',stroke:'#fff',lw:u*.2,maxW:W*.8});
    K.card(g,u*.3,H-u*.9-(q.mix?G.btns[0].h+G.pad:0),u*2.6,u*.7,u*.35,'rgba(255,255,255,.95)',{stroke:'#4c1d95',lw:3,blur:0,dy:0});K.txt(g,'🎨 '+(st.okN||0)+'개',u*.3+u*1.3,H-u*.55-(q.mix?G.btns[0].h+G.pad:0),{size:u*.42,color:INK,maxW:u*2.3});
  },
};
QZ.mix(GAME,{say:false,pts0:55,pts1:50,okMs:1800,badMs:3400});
Engine.boot(GAME);
