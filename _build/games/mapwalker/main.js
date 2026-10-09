/* 5~6학년 영어 · 길 안내 — 영어 길 찾기 마을
   디자인: 손으로 그린 양피지 마을 지도. 영어 길 안내를 읽고 ⭐가 걷는 대로 따라가, 마지막에 "on your left/right"의 건물을 눌러요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#5a3a1a',RED='#d9534f',GREEN='#2f8f5b';
const LOGO=gkLogo('#fff8e6','#5a3a1a','🗺️');
const PL=[['library','📚'],['school','🏫'],['hospital','🏥'],['bank','🏦'],['post office','🏤'],['park','🌳'],['market','🛒'],['cafe','☕'],['bakery','🥖'],['museum','🏛️'],['police station','🚓'],['fire station','🚒'],['zoo','🦁'],['toy shop','🧸'],['flower shop','💐'],['cinema','🎬']];
const NUM=['zero','one','two','three','four'];
const DIR=[[0,-1],[1,0],[0,1],[-1,0]];
const PP=[.11,.305,.5,.695,.89];
const LV={
  '5':{g:'5~6학년',t:'5학년 길 찾기',d:'한 번 꺾는 길 · 낱말 도움말이 있어요'},
  '6':{g:'5~6학년',t:'6학년 길 찾기',d:'두 번 꺾는 긴 길 · 도움말이 없어요'},
};
const inI=(x,y)=>x>=0&&x<=4&&y>=0&&y<=4;
const leftCell=(x,y,d)=>({0:[x-1,y-1],1:[x,y-1],2:[x,y],3:[x-1,y]})[d];
const rightCell=(x,y,d)=>({0:[x,y-1],1:[x,y],2:[x-1,y],3:[x-1,y-1]})[d];
function hero(g,W,H,T,u){g.fillStyle='#f3e3c0';g.fillRect(0,0,W,H);g.strokeStyle='#c9a46a';g.lineWidth=u*.5;[.3,.6,.9].forEach(f=>{g.beginPath();g.moveTo(0,H*f);g.lineTo(W,H*f);g.stroke();g.beginPath();g.moveTo(W*f,0);g.lineTo(W*f,H);g.stroke();});
  ['📚','🏫','🏥','🌳','☕','🏦'].forEach((e,i)=>K.emo(g,e,W*(.2+(i%3)*.3),H*(.3+Math.floor(i/3)*.4),u*1.3));
  const t=(T*.5)%1;g.strokeStyle=RED;g.lineWidth=u*.2;g.setLineDash([u*.4,u*.4]);g.beginPath();g.moveTo(W*.2,H*.3);g.lineTo(W*.5,H*.3);g.lineTo(W*.5,H*.7);g.stroke();g.setLineDash([]);K.emo(g,'⭐',W*.2+(W*.3+H*.4)*t*(t<.43?1:1)*(t<.43?1:0)+(t>=.43?W*.3:0),H*.3+(t>=.43?(t-.43)/.57*H*.4:0),u*1.2);}
const GAME={
  id:'mapwalker',title:'영어 길 찾기 마을',title1:'길 찾기 마을',title2:'영어 길 안내',emoji:LOGO,
  subtitle:'5~6학년 영어 · 길 안내를 듣고 건물 찾기',
  howto:'🗺️ 지도의 <b>⭐는 내 위치</b>, 화살표는 <b>보고 있는 방향</b>이에요. 영어 길 안내를 읽고 그대로 걸어가서, 마지막 <b>"It is on your left/right."</b>에 해당하는 건물을 눌러요. 맞히면 길이 그려지고 점수를 받아요!',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:RED,c2:GREEN},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어느 마을을 탐험할까요?',
  txt:{who:'누가 탐험가일까요?',dur:'탐험 시간',pace:'길 안내 시간',seat:'번 탐험가 ',go:'탐험 출발!',s1:'1. 마을',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li><b>Go straight</b>(곧장 가다) · <b>Turn left/right</b>(왼쪽/오른쪽으로 돌다) · <b>block</b>(길 한 구간)은 길 안내의 기본 낱말이에요.</li>
    <li><b>on your left</b>는 '네 왼쪽에', <b>on your right</b>는 '네 오른쪽에'라는 뜻이에요.</li>
    <li>길을 찾을 때는 내가 보고 있는 방향을 기준으로 왼쪽·오른쪽을 생각해요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2,pad=u*.4;const wide=W>H*1.2;let S,map,tx;
    if(wide){S=Math.min(H-top-pad,W*.55);map={x:W-S-pad,y:top+(H-top-pad-S)/2,s:S};tx={x:pad,y:top,w:W-S-pad*3,h:H-top-pad};}
    else{const th=Math.min(H*.3,u*6.5);S=Math.min(W-pad*2,H-top-th-pad*2);map={x:(W-S)/2,y:H-S-pad,s:S};tx={x:pad,y:top,w:W-pad*2,h:map.y-top-pad*.5};}
    return{W,H,u,top,pad,map,tx,wide};},
  init(p){const st=p.state;Object.assign(st,{T:0,R:null,phase:'idle',t0:0,lim:p.levelId==='5'?30:40,wait:0,pl:null,pick:null,bag:null});this.next(p);},
  gen(p){const R=p.R,deck=p.levelId;for(let k=0;k<400;k++){const x0=R.int(0,4),y0=R.int(0,4),d0=R.int(0,3);const turns=deck==='5'?1:2;let x=x0,y=y0,d=d0;const segs=[],pts=[[x,y]];let ok=true,lx=0,ly=0,ld=0;
      for(let s=0;s<=turns&&ok;s++){if(s>0){const t=R.f()<.5?'L':'R';d=t==='L'?(d+3)%4:(d+1)%4;segs.push({turn:t});}
        const n=1+Math.floor(R.f()*(deck==='5'?3:2));for(let i=0;i<n;i++){const nx=x+DIR[d][0],ny=y+DIR[d][1];if(!inI(nx,ny)){ok=false;break;}lx=x;ly=y;ld=d;x=nx;y=ny;pts.push([x,y]);}segs.push({go:n});}
      if(!ok)continue;const side=R.f()<.5?'left':'right';const c=side==='left'?leftCell(lx,ly,ld):rightCell(lx,ly,ld);if(c[0]<0||c[0]>3||c[1]<0||c[1]>3)continue;if(pts.length<(deck==='5'?3:4))continue;
      const lines=segs.map(s=>{if(s.go){const n=s.go,b=' block'+(n>1?'s':'');return R.pick([`Go straight for ${NUM[n]}${b}.`,`Walk ${NUM[n]}${b}.`,`Go ahead for ${NUM[n]}${b}.`]);}return R.pick([`Turn ${s.turn==='L'?'left':'right'}.`,`Turn ${s.turn==='L'?'left':'right'} at the corner.`]);});lines.push(`It is on your ${side}.`);
      return{x0,y0,d0,pts,side,cell:c,lines};}
    return null;},
  next(p){const st=p.state;if(!st.bag)st.bag=EN.bag([0],()=>p.R.f());st.R=this.gen(p);st.pl=EN.shuffle(PL,()=>p.R.f());st.phase='play';st.t0=st.T;st.wait=0;st.pick=null;st.show=0;p.ask('🗺️ 길 안내를 따라가요','도착한 건물을 눌러요');enSay(st.R.lines.join(' '),.8);},
  update(p,dt){const st=p.state;st.T+=dt;if(st.show>0&&st.show<1)st.show=Math.min(1,st.show+dt*1.6);
    if(st.phase==='play'&&st.T-st.t0>st.lim){st.phase='wait';st.wait=2.6;st.show=.01;st.pick=-1;p.hit(false,{pen:10,shake:false,tip:'시간이 다 됐어요',tipMs:1200,review:st.R.lines.join(' ')+' → '+this.nm(st,st.R.cell)});}
    if(st.wait>0){st.wait-=dt;if(st.wait<=0)this.next(p);}},
  nm(st,c){return st.pl[c[1]*4+c[0]][0];},
  cellAt(p,x,y){const G=this.geo(p),m=G.map;const fx=(x-m.x)/m.s,fy=(y-m.y)/m.s;for(let cy=0;cy<4;cy++)for(let cx=0;cx<4;cx++){if(fx>=PP[cx]+.012&&fx<=PP[cx+1]-.012&&fy>=PP[cy]+.012&&fy<=PP[cy+1]-.012)return[cx,cy];}return null;},
  down(p,x,y){const st=p.state;if(st.phase!=='play')return;const c=this.cellAt(p,x,y);if(!c)return;this.pickc(p,c);},
  pickc(p,c){const st=p.state,G=this.geo(p),m=G.map;const R=st.R;const ok=c[0]===R.cell[0]&&c[1]===R.cell[1];st.phase='wait';st.show=.01;st.pick=c;
    const px=m.x+m.s*(PP[c[0]]+PP[c[0]+1])/2,py=m.y+m.s*(PP[c[1]]+PP[c[1]+1])/2;
    if(ok){st.wait=1.9;p.hit(true,{pts:EN.pts(Math.min(st.T-st.t0,st.lim),st.lim),x:px,y:py});}
    else{st.wait=3;p.hit(false,{pen:10,x:px,y:py,tip:'정답은 '+this.nm(st,R.cell),tipMs:1800,review:R.lines.join(' ')+' → '+this.nm(st,R.cell)});}},
  botAct(p){const st=p.state;if(st.phase!=='play')return null;const G=this.geo(p),m=G.map,c=st.R.cell;const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+m.x+m.s*(PP[c[0]]+PP[c[0]+1])/2,y:rc.top+m.y+m.s*(PP[c[1]]+PP[c[1]+1])/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,m=G.map,R=st.R;if(!R)return;
    g.fillStyle='#f3e3c0';g.fillRect(0,0,W,H);g.fillStyle='rgba(160,120,60,.12)';for(let i=0;i<14;i++)g.fillRect((i*137)%W,(i*91)%H,u*1.4,u*.8);
    // text panel
    const tx=G.tx;K.card(g,tx.x,tx.y,tx.w,tx.h,u*.3,'#fff8e6',{stroke:'#8a6a3a',lw:3,blur:0,dy:u*.05,sc:'#c9a46a'});
    const ls=R.lines;const n=ls.length;const lh=Math.min(tx.h*.8/(n+(p.levelId==='5'?1.2:0)),u*1.5,tx.w/16);
    ls.forEach((s,i)=>{const last=i===n-1;K.txt(g,(last?'📍 ':(i+1)+'. ')+s,tx.x+tx.w/2,tx.y+tx.h*.1+lh*(i+.6)+(tx.h*.8-lh*(n+(p.levelId==='5'?1.2:0)))/2,{size:lh*.78,color:last?RED:INK,maxW:tx.w*.94});});
    if(p.levelId==='5')K.txt(g,'go straight 곧장 · turn 돌다 · block 구간 · on your left 네 왼쪽에',tx.x+tx.w/2,tx.y+tx.h-lh*.55,{size:Math.max(10,lh*.36),color:'#8a6a3a',maxW:tx.w*.96});
    if(st.phase==='play')QZ.bar(g,tx.x,tx.y+tx.h+u*.03,tx.w,Math.max(4,u*.12),Math.max(0,1-(st.T-st.t0)/st.lim),{good:GREEN});
    // map
    K.card(g,m.x-u*.1,m.y-u*.1,m.s+u*.2,m.s+u*.2,u*.3,'#e8d5a4',{stroke:'#8a6a3a',lw:4,blur:0,dy:u*.06,sc:'#c9a46a'});
    const rw=m.s*.028;g.fillStyle='#c9b27c';PP.forEach(f=>{g.fillRect(m.x+m.s*.04,m.y+m.s*f-rw,m.s*.92,rw*2);g.fillRect(m.x+m.s*f-rw,m.y+m.s*.04,rw*2,m.s*.92);});
    g.strokeStyle='#fff8e6';g.lineWidth=Math.max(1,rw*.2);g.setLineDash([rw*1.2,rw*1.2]);PP.forEach(f=>{g.beginPath();g.moveTo(m.x+m.s*.04,m.y+m.s*f);g.lineTo(m.x+m.s*.96,m.y+m.s*f);g.stroke();g.beginPath();g.moveTo(m.x+m.s*f,m.y+m.s*.04);g.lineTo(m.x+m.s*f,m.y+m.s*.96);g.stroke();});g.setLineDash([]);
    const cw=m.s*(PP[1]-PP[0])-rw*2.6;
    for(let cy=0;cy<4;cy++)for(let cx=0;cx<4;cx++){const pl=st.pl[cy*4+cx];const x=m.x+m.s*(PP[cx]+PP[cx+1])/2,y=m.y+m.s*(PP[cy]+PP[cy+1])/2;
      const isR=st.phase==='wait'&&R.cell[0]===cx&&R.cell[1]===cy,isW=st.pick&&st.pick!==-1&&st.pick[0]===cx&&st.pick[1]===cy&&!isR;
      K.rr(g,x-cw/2,y-cw/2,cw,cw,cw*.16);g.fillStyle=isR?'#bbf7d0':isW?'#fecaca':'#fff8e6';g.fill();g.lineWidth=isR||isW?4:2;g.strokeStyle=isR?GREEN:isW?RED:'#a9885a';g.stroke();
      K.emo(g,pl[1],x,y-cw*.12,cw*.46);K.txt(g,pl[0],x,y+cw*.32,{size:Math.min(cw*.2,pl[0].length>9?cw*.17:cw*.22),color:INK,maxW:cw*.92});}
    // route
    if(st.show>0){const pts=R.pts.map(q=>[m.x+m.s*PP[q[0]],m.y+m.s*PP[q[1]]]);let tot=0;for(let i=1;i<pts.length;i++)tot+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);let left=tot*st.show;g.strokeStyle=RED;g.lineWidth=Math.max(3,u*.14);g.setLineDash([u*.3,u*.25]);g.lineCap='round';g.beginPath();g.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length&&left>0;i++){const l=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);const f=Math.min(1,left/l);g.lineTo(pts[i-1][0]+(pts[i][0]-pts[i-1][0])*f,pts[i-1][1]+(pts[i][1]-pts[i-1][1])*f);left-=l;}g.stroke();g.setLineDash([]);}
    // me
    const mx=m.x+m.s*PP[R.x0],my=m.y+m.s*PP[R.y0],bob=Math.sin(st.T*4)*u*.06;K.emo(g,'⭐',mx,my+bob,m.s*.1);
    g.save();g.translate(mx,my);g.rotate(R.d0*Math.PI/2);g.fillStyle=RED;g.strokeStyle='#fff';g.lineWidth=2;const ar=m.s*.045;g.beginPath();g.moveTo(0,-m.s*.115);g.lineTo(ar,-m.s*.06);g.lineTo(-ar,-m.s*.06);g.closePath();g.fill();g.stroke();g.restore();
    K.txt(g,'N',m.x+m.s-u*.45,m.y+u*.5,{size:u*.5,color:'#8a6a3a'});
  },
};
Engine.boot(GAME);
