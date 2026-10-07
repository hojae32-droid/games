/* 4학년 1학기 수학 · 각도 — 각도 탱크 대작전
   디자인: 언덕 너머 적 탱크를 무찔러요! 문제의 답이 곧 포신의 각도. 맞히면 포탄이 명중, 틀리면 빗나가서 적이 반격해요. 바람과 지형도 살펴보세요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#2b3320',OLIVE='#4d5d2a';
const LOGO=gkLogo('#d9dcc4','#2b3320','💥');
const LV={
  a:{t:'각도 어림하기',d:'눈금 없이 포신을 끌어 조준',time:35},
  b:{t:'각도기로 재기',d:'각도 읽기 · 예각/직각/둔각',time:25},
  c:{t:'각도의 합과 차',d:'두 각을 더하고 빼서 조준',time:30},
  d:{t:'삼각형·사각형의 각',d:'세 각의 합 180° · 네 각의 합 360°',time:40},
};
/* ── 물리 · 지형 (월드 600×420) ── */
const WW=600,HH=420,GRAV=220,SPEED=2.0;
function terrainGen(){const h=new Float32Array(WW+1);const a=[Math.random()*6,Math.random()*6,Math.random()*6];for(let x=0;x<=WW;x++)h[x]=305+22*Math.sin(x/95+a[0])+13*Math.sin(x/41+a[1])+6*Math.sin(x/19+a[2]);return h;}
function ty(st,x){x=Math.max(0,Math.min(WW,Math.round(x)));return st.ter[x];}
function flatten(st,x,r){const y=ty(st,x);for(let i=Math.max(0,Math.round(x-r));i<=Math.min(WW,Math.round(x+r));i++){const d=Math.abs(i-x)/r;st.ter[i]=d<.65?y:st.ter[i]+(y-st.ter[i])*(1-(d-.65)/.35);}}
function carve(st,cx,cy,R){for(let x=Math.max(0,Math.round(cx-R));x<=Math.min(WW,Math.round(cx+R));x++){if(Math.abs(x-st.me.x)<30)continue;const d=Math.sqrt(R*R-(x-cx)*(x-cx));if(st.ter[x]<cy+d)st.ter[x]=Math.min(HH-12,cy+d);}}
function turret(st){return{x:st.me.x,y:ty(st,st.me.x)-17};}
function muzzle(st,deg){const c=turret(st),a=deg*Math.PI/180;return{x:c.x+26*Math.cos(a),y:c.y-26*Math.sin(a)};}
function tgtOf(st){const e=st.enemy;return e.type==='tank'?{x:e.x,cy:ty(st,e.x)-11,r:21}:{x:e.x,cy:e.y,r:19};}
function sim(st,x0,y0,deg,v,w,target){const a=deg*Math.PI/180;let x=x0,y=y0,vx=v*Math.cos(a),vy=-v*Math.sin(a),t=0;const pts=[[x,y]];const dt=1/120;
  for(let k=0;k<3000;k++){vx+=w*dt;vy+=GRAV*dt;x+=vx*dt;y+=vy*dt;t+=dt;if(k%2===0)pts.push([x,y]);
    if(target&&Math.hypot(x-target.x,y-target.cy)<target.r){pts.push([x,y]);return{pts,hit:'target',x,y,t};}
    if(x<-30||x>WW+30||y>HH+30)return{pts,hit:'off',x,y,t};
    if(x>=0&&x<=WW&&y>=ty(st,x)){pts.push([x,ty(st,x)]);return{pts,hit:'ground',x,y:ty(st,x),t};}}
  return{pts,hit:'off',x,y,t};}
function place(st,deg,lvl){const side=deg<=72?'L':deg>=108?'R':'C';const rnd=Math.random;
  const tx=lvl==='b'?(side==='L'?140:side==='R'?460:300):(side==='L'?65+rnd()*55:side==='R'?535-rnd()*55:300);
  st.me.x=Math.round(tx);flatten(st,st.me.x,48);st.wind=Math.round(rnd()*6-3)*8;if(side==='C')st.wind=Math.round(st.wind/2);
  const old=st.enemy;const keep=old&&!old.dead?{hp:old.hp}:{};const m=muzzle(st,deg);const vs=[];for(let v=140;v<=340;v+=6)vs.push(v);vs.sort(()=>rnd()-.5);
  if(side!=='C')for(const v of vs){const r=sim(st,m.x,m.y,deg,v,st.wind);
    if(r.hit==='ground'&&Math.abs(r.x-st.me.x)>=125&&r.x>28&&r.x<572){const save=st.ter.slice();flatten(st,r.x,22);st.enemy=Object.assign({type:'tank',x:r.x,y:ty(st,r.x),hp:100},keep);
      if(sim(st,m.x,m.y,deg,v,st.wind,tgtOf(st)).hit==='target'){st.v=v;return;}st.ter=save;}}
  for(const v of [230,200,260,180,290,160]){const r=sim(st,m.x,m.y,deg,v,st.wind);const c=r.pts.filter(([x,y])=>x>22&&x<578&&y>48&&y<ty(st,x)-70&&Math.hypot(x-st.me.x,y-(ty(st,st.me.x)-17))>110);
    if(c.length>4){const[x,y]=c[Math.floor(c.length*(side==='C'?.5:.6))];st.enemy=Object.assign({type:'drone',x,y,hp:100},keep);if(sim(st,m.x,m.y,deg,v,st.wind,tgtOf(st)).hit==='target'){st.v=v;return;}}}
  const r=sim(st,m.x,m.y,deg,200,0);const[x,y]=r.pts[Math.floor(r.pts.length*.45)];st.wind=0;st.v=200;st.enemy=Object.assign({type:'drone',x,y,hp:100},keep);}
function counter(st){const e=st.enemy;const sx=e.x,sy=e.type==='tank'?ty(st,e.x)-17:e.y+8;const toLeft=st.me.x<sx;const me={x:st.me.x,cy:ty(st,st.me.x)-11,r:21};
  const deg=e.type==='tank'?(toLeft?128:52):(toLeft?160:20);let best=null,bd=1e9;for(let v=60;v<=420;v+=4){const r=sim(st,sx,sy,deg,v,st.wind,me);if(r.hit==='target')return r;const d=Math.abs(r.x-me.x);if(d<bd){bd=d;best=r;}}return best;}
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#7dd3fc','#e0f2fe']);g.fillStyle='#65a30d';g.beginPath();g.moveTo(0,H);for(let x=0;x<=W;x+=10)g.lineTo(x,H*.72+Math.sin(x/90)*H*.06);g.lineTo(W,H);g.fill();
  const tx=W*.25,ty0=H*.74;g.fillStyle=OLIVE;K.rr(g,tx-u*.7,ty0-u*.4,u*1.4,u*.5,u*.15);g.fill();g.beginPath();g.arc(tx,ty0-u*.4,u*.4,Math.PI,TAU);g.fill();const a=.9+Math.sin(T)*.1;g.strokeStyle=INK;g.lineWidth=u*.2;g.beginPath();g.moveTo(tx,ty0-u*.5);g.lineTo(tx+Math.cos(-a)*u*1.2,ty0-u*.5+Math.sin(-a)*u*1.2);g.stroke();
  const ph=(T%2)/2;const x=tx+ph*W*.5,y=ty0-u*.5-Math.sin(ph*Math.PI)*H*.4;g.fillStyle=INK;g.beginPath();g.arc(x,y,u*.18,0,TAU);g.fill();}
const GAME={
  id:'tank',title:'각도 탱크 대작전',title1:'언덕 너머 포격 훈련',title2:'각도 탱크 대작전',emoji:LOGO,
  subtitle:'4학년 1학기 수학 · 각도',
  howto:'언덕 너머 적 탱크를 무찔러요! 문제의 답이 곧 <b>포신의 각도</b>예요. 맞히면 포탄이 날아가 명중하고, 틀리면 빗나가서 적이 반격해요. 바람에 따라 포탄이 휘어지는 것도 잘 보세요!',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:'#dc2626',c2:OLIVE},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 훈련을 할까요?',
  txt:{who:'누가 포병일까요?',dur:'훈련 시간',pace:'조준 시간',seat:'번 포병 ',go:'포격 개시!',s1:'1. 훈련',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'4학년 1학기',t:v.t,d:v.d})),
  summary:`<ul><li><b>각도</b>는 한 점에서 시작하는 두 반직선이 벌어진 정도예요. 직각은 90°, 예각은 0°보다 크고 90°보다 작은 각, 둔각은 90°보다 크고 180°보다 작은 각이에요.</li>
    <li><b>각도기</b>는 밑변을 각의 한 변에 맞추고 중심을 꼭짓점에 맞춰 눈금을 읽어요. 0° 눈금에서 시작해요.</li>
    <li>각도의 합과 차는 자연수처럼 계산하고 <b>°</b>를 붙여요.</li>
    <li><b>삼각형 세 각의 합은 180°</b>, <b>사각형 네 각의 합은 360°</b>예요.</li></ul>`,
  geo(p){const q=p.state.q;const aim=q&&q.ty==='aim';const n=aim?5:3;const G=gkGeo(p,n,n,2.2);const sc=Math.min(G.bw/WW,G.bh/HH);G.s=sc;G.ox=G.bx+(G.bw-WW*sc)/2;G.oy0=G.by+G.bh-HH*sc;return G;},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,ter:terrainGen(),me:{x:110,hp:100},enemy:null,kills:0,ang:90,wind:0,v:230,shots:[],fx:[],floats:[],queue:[],clouds:[[80,60],[300,40],[470,80]],barrel:null,drag:false,shot:null});this.newQ(p);},
  make(p,L){const R=p.R,q={};const okA=a=>a>=15&&a<=165;
    const degOpts=(ans,c)=>{const o=gkOpts3(R,ans,c.filter(x=>x>=0&&x<=180),v=>v+'°');q.labels=o.labels;q.vals=o.vals;q.okIdx=o.okIdx;};
    if(L==='a'){q.ty='aim';q.ans=R.int(3,33)*5;q.target=q.ans;q.text='<b>'+q.ans+'°</b>로 포신을 맞춰 쏘아요!';q.reveal='목표 각도는 '+q.ans+'°';}
    else if(L==='b'){if(R.chance(.35)){q.ty='kind';const a=R.pick([R.int(3,8)*10+R.pick([0,5]),90,R.int(10,16)*10+R.pick([0,5])]);q.target=a;const k=a<90?'예각':a===90?'직각':'둔각';q.text='빨간 선이 만드는 각은 무엇일까요? 맞히면 그 방향으로 발사!';q.reveal=a+'°는 '+k;q.labels=['예각','직각','둔각'];q.okIdx=q.labels.indexOf(k);q.vals=[45,90,135];}
      else{q.ty='read';q.ans=R.int(3,33)*5;q.target=q.ans;q.text='각도기를 읽고 <b>빨간 선</b>의 각도로 쏘아요!';q.reveal='빨간 선은 '+q.ans+'°';degOpts(q.ans,[q.ans+5,q.ans-5,q.ans+10,q.ans-10,180-q.ans]);}}
    else if(L==='c'){let a,b,add,v;do{add=R.chance(.5);if(add){a=R.int(3,18)*5;b=R.int(3,18)*5;v=a+b;}else{a=R.int(8,34)*5;b=R.int(2,20)*5;v=a-b;}}while(!okA(v));q.ty='calc';q.ans=v;q.target=v;q.text='<b>'+a+'° '+(add?'+':'−')+' '+b+'°</b>의 각도로 쏘아요!';q.reveal=a+'° '+(add?'+':'−')+' '+b+'° = '+v+'°';degOpts(v,[v+5,v-5,v+10,v-10,add?a-b:a+b]);}
    else{let tri,ang,v;do{tri=R.chance(.55);if(tri){const a=R.int(4,16)*5,b=R.int(4,Math.min(20,(170-a)/5))*5;ang=[a,b];v=180-a-b;}else{const a=R.int(14,26)*5,b=R.int(14,26)*5,c=R.int(12,24)*5;v=360-a-b-c;ang=[a,b,c];}}while(!okA(v));
      q.ty='calc';q.fig={tri,ang};q.ans=v;q.target=v;q.text=(tri?'삼각형':'사각형')+'의 <b>?</b> 각도로 쏘아요!';q.reveal=(tri?'180° − ':'360° − ')+ang.map(x=>x+'°').join(' − ')+' = '+v+'°';degOpts(v,[v+5,v-5,v+10,v-10,(tri?360:180)-ang.reduce((s,x)=>s+x,0)]);}
    q.review=q.text.replace(/<[^>]+>/g,'')+(q.fig?' ['+q.fig.ang.map(x=>x+'°').join(', ')+']':'')+' → '+q.reveal;q.speak='';return q;},
  qtime(q){return LV[this._p.levelId].time;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return '🎯 '+q.text;},askSub(q){return q.ty==='aim'?'화면을 끌거나 ◀ ▶ 로 포신을 맞추고 발사!':q.ty==='kind'?'알맞은 말을 눌러요':q.fig?'삼각형 세 각의 합은 180°, 사각형 네 각의 합은 360°':'알맞은 각도를 눌러요';},
  isOk(q,i,p){return !!(p.state.shot&&p.state.shot.ok);},tipOf(q){return q.reveal;},goodTip(q){return '명중! '+q.reveal;},
  ptsOf(p,q,frac){return Math.round((55+45*frac)*(p.state.shot&&p.state.shot.part||1));},
  onNew(p,q){const st=p.state;st.shot=null;const fresh=!st.enemy||st.enemy.dead;place(st,q.target,p.levelId);if(fresh){st.enemy.hp=100;if(st.kills)this.flt(st,st.enemy.x,st.enemy.y-50,'새로운 적 등장!','#dc2626');}
    st.ang=q.ty==='aim'?(Math.abs(q.target-90)<30?(q.target<90?150:30):90):90;st.barrel=null;},
  flt(st,x,y,text,col){st.floats.push({x,y,text,col,t0:st.T});},
  boomFx(st,x,y,r){st.fx.push({x,y,r,t0:st.T,dur:.65,ps:Array.from({length:10},()=>[Math.random()*TAU,40+Math.random()*80])});},
  /* 발사 */
  shoot(p,deg,ok,part){const st=p.state,q=st.q;if(!q||st.lock)return;deg=clamp(Number(deg)||0,0,180);st.shot={deg,ok,part};this.verdict(p,deg,false);
    const T=st.T;st.barrel={from:st.ang,to:deg,t0:T,dur:.38};st.ang=deg;const fireAt=T+.9;const m=muzzle(st,deg);const r=sim(st,m.x,m.y,deg,st.v,st.wind,tgtOf(st));const fl=r.t/SPEED;st.flight=fl;
    st.queue.push({at:fireAt,fn:()=>{p.Snd.boom&&p.Snd.boom();st.shots.push({pts:r.pts,t0:st.T,dur:fl,col:'#111827'});}});
    st.queue.push({at:fireAt+fl,fn:()=>{this.boomFx(st,r.x,r.y,r.hit==='target'?26:20);p.Snd.boom&&p.Snd.boom();
      if(r.hit==='target'){const e=st.enemy;if(ok){const dmg=Math.round(50*(part||1));e.hp=Math.max(0,e.hp-dmg);this.flt(st,e.x,e.y-48,'-'+dmg,'#dc2626');e.hit=st.T;if(e.hp<=0){e.dead=true;st.kills++;this.boomFx(st,e.x,e.y-12,46);this.flt(st,e.x,e.y-70,'💥 격파!','#dc2626');p.Snd.win&&p.Snd.win();}}else{e.shield=st.T;this.flt(st,e.x,e.y-48,'🛡️ 막았다!','#2563eb');}}
      else if(r.hit==='ground')carve(st,r.x,r.y,16);}});
    st.total=.9+fl+.7;
    if(!ok){const c=counter(st);const at=fireAt+fl+.65,fl2=c.t/SPEED;st.queue.push({at,fn:()=>{p.Snd.boom&&p.Snd.boom();st.shots.push({pts:c.pts,t0:st.T,dur:fl2,col:'#7f1d1d'});}});
      st.queue.push({at:at+fl2,fn:()=>{this.boomFx(st,c.x,c.y,22);if(c.hit==='target'){st.me.hp-=25;this.flt(st,st.me.x,ty(st,st.me.x)-48,'-25','#dc2626');st.me.hit=st.T;if(st.me.hp<=0){st.me.hp=100;this.flt(st,st.me.x,ty(st,st.me.x)-70,'🔧 수리 완료!','#16a34a');}}else if(c.hit==='ground')carve(st,c.x,c.y,14);}});st.total=at-T+fl2+.6;}},
  /* 입력 */
  worldPt(p,x,y){const G=this.geo(p);return{x:(x-G.ox)/G.s,y:(y-G.oy0)/G.s};},
  aimTo(p,x,y){const st=p.state,q=st.q;if(!q||q.ty!=='aim'||st.lock)return;const w=this.worldPt(p,x,y),c=turret(st);let a=Math.atan2(c.y-w.y,w.x-c.x)*180/Math.PI;if(a<-90)a=180;a=Math.round(clamp(a,0,180));if(a!==st.ang){st.ang=a;p.Snd.tone&&p.Snd.tone(1300,.02,'square',.02);}},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);const i=gkHit(G.list,x,y);
    if(i>=0){if(q.ty==='aim'){if(i<4){st.ang=clamp(st.ang+[5,1,-1,-5][i],0,180);p.Snd.tap&&p.Snd.tap();}else{const d=Math.abs(st.ang-q.ans);const m=muzzle(st,st.ang);const r=sim(st,m.x,m.y,st.ang,st.v,st.wind,tgtOf(st));const hit=r.hit==='target';this.shoot(p,st.ang,hit&&d<=10,d<=3?1:.6);}return;}
      const deg=q.ty==='kind'?(i===q.okIdx?q.target:q.vals[i]):q.vals[i];this.shoot(p,deg,i===q.okIdx,1);return;}
    if(q.ty==='aim'&&y<G.oy){st.drag=true;this.aimTo(p,x,y);}},
  move(p,x,y,down){if(p.state.drag&&down)this.aimTo(p,x,y);},up(p){p.state.drag=false;},
  upd(p,dt){const st=p.state;st.queue=st.queue.filter(it=>{if(st.T>=it.at){it.fn();return false;}return true;});},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();let r;if(q.ty==='aim'){st.ang=q.ans;r=G.list[4];}else r=G.list[q.okIdx];return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};},
  /* ── 그리기 ── */
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q,t=st.T;if(!q)return;
    K.vgrad(g,0,0,W,H,['#2b3320','#3d4a2a']);
    g.save();g.beginPath();g.rect(G.bx,G.by,G.bw,G.bh);g.clip();g.translate(G.ox,G.oy0);g.scale(G.s,G.s);
    const sk=g.createLinearGradient(0,0,0,HH);sk.addColorStop(0,'#7dd3fc');sk.addColorStop(1,'#e0f2fe');g.fillStyle=sk;g.fillRect(-1000,-1000,3000,3000);
    st.clouds.forEach((c,i)=>{const x=(c[0]+t*(4+i*2))%(WW+120)-60;g.fillStyle='rgba(255,255,255,.85)';g.beginPath();g.ellipse(x,c[1],34,12,0,0,TAU);g.ellipse(x+18,c[1]-7,22,10,0,0,TAU);g.fill();});
    g.fillStyle='#8a6b3d';g.beginPath();g.moveTo(-1000,HH+500);g.lineTo(-1000,ty(st,0));for(let x=0;x<=WW;x+=3)g.lineTo(x,st.ter[x]);g.lineTo(2000,ty(st,WW));g.lineTo(2000,HH+500);g.closePath();g.fill();
    g.strokeStyle='#65a30d';g.lineWidth=7;g.lineJoin='round';g.beginPath();for(let x=0;x<=WW;x+=3){x?g.lineTo(x,st.ter[x]-2):g.moveTo(x,st.ter[x]-2);}g.moveTo(-1000,ty(st,0)-2);g.lineTo(0,ty(st,0)-2);g.moveTo(WW,ty(st,WW)-2);g.lineTo(2000,ty(st,WW)-2);g.stroke();
    const tankArt=(x,y,ang,col,flip,hp,hit)=>{g.save();g.translate(x,y);const shk=hit&&t-hit<.3?Math.sin((t-hit)*80)*3:0;g.translate(shk,0);g.fillStyle='#1f2937';K.rr(g,-26,-12,52,13,6);g.fill();g.fillStyle=col;K.rr(g,-22,-22,44,13,5);g.fill();g.beginPath();g.arc(0,-22,14,Math.PI,TAU);g.fill();
      g.save();g.translate(0,-22);g.rotate(-ang*Math.PI/180);g.fillStyle='#374151';g.fillRect(0,-3,30,6);g.restore();g.fillStyle='#9ca3af';[-18,-6,6,18].forEach(wx=>{g.beginPath();g.arc(wx,-5,4,0,TAU);g.fill();});g.fillStyle='rgba(0,0,0,.35)';g.fillRect(-20,-62,40,6);g.fillStyle=hp>50?'#22c55e':hp>25?'#f59e0b':'#ef4444';g.fillRect(-20,-62,40*Math.max(0,hp)/100,6);g.restore();};
    let ang=st.ang;if(st.barrel){const k=clamp((t-st.barrel.t0)/st.barrel.dur,0,1);ang=st.barrel.from+(st.barrel.to-st.barrel.from)*(1-Math.pow(1-k,2));}
    const me=turret(st);
    if(q.ty==='read'||q.ty==='kind'){this.protractor(g,me,q,q.ty==='read');}
    tankArt(st.me.x,ty(st,st.me.x),ang,'#4d5d2a',false,st.me.hp,st.me.hit);
    const e=st.enemy;if(e&&!e.dead){if(e.type==='tank')tankArt(e.x,ty(st,e.x),e.x<st.me.x?30:150,'#b91c1c',true,e.hp,e.hit);else{g.save();g.translate(e.x,e.y+Math.sin(t*3)*3);g.fillStyle='#b91c1c';g.beginPath();g.ellipse(0,0,20,9,0,0,TAU);g.fill();g.fillStyle='#fca5a5';g.beginPath();g.arc(0,-6,8,Math.PI,TAU);g.fill();g.strokeStyle='#374151';g.lineWidth=3;g.beginPath();g.moveTo(-16,-11);g.lineTo(16,-11);g.stroke();
      g.fillStyle='rgba(0,0,0,.35)';g.fillRect(-20,-30,40,6);g.fillStyle=e.hp>50?'#22c55e':e.hp>25?'#f59e0b':'#ef4444';g.fillRect(-20,-30,40*e.hp/100,6);g.restore();}
      if(e.shield&&t-e.shield<.6){g.strokeStyle='rgba(59,130,246,'+(1-(t-e.shield)/.6)+')';g.lineWidth=4;g.beginPath();g.arc(e.x,e.type==='tank'?ty(st,e.x)-11:e.y,26,0,TAU);g.stroke();}}
    st.shots=st.shots.filter(s=>t-s.t0<s.dur+.05);st.shots.forEach(s=>{const f=clamp((t-s.t0)/s.dur,0,1),n=Math.floor(f*(s.pts.length-1));g.strokeStyle='rgba(17,24,39,.35)';g.lineWidth=2;g.setLineDash([4,5]);g.beginPath();s.pts.slice(0,n+1).forEach((pt,i)=>i?g.lineTo(pt[0],pt[1]):g.moveTo(pt[0],pt[1]));g.stroke();g.setLineDash([]);const pt=s.pts[n];g.fillStyle=s.col;g.beginPath();g.arc(pt[0],pt[1],5,0,TAU);g.fill();});
    st.fx=st.fx.filter(f=>t-f.t0<f.dur);st.fx.forEach(f=>{const k=(t-f.t0)/f.dur;g.fillStyle='rgba(251,146,60,'+(1-k)+')';g.beginPath();g.arc(f.x,f.y,f.r*(.4+k),0,TAU);g.fill();g.fillStyle='rgba(254,240,138,'+(1-k)+')';g.beginPath();g.arc(f.x,f.y,f.r*(.2+k*.5),0,TAU);g.fill();f.ps.forEach(([a,s])=>{g.fillStyle='rgba(55,65,81,'+(1-k)+')';g.beginPath();g.arc(f.x+Math.cos(a)*s*k,f.y+Math.sin(a)*s*k,3,0,TAU);g.fill();});});
    st.floats=st.floats.filter(f=>t-f.t0<1.3);st.floats.forEach(f=>{const k=(t-f.t0)/1.3;g.globalAlpha=1-k;K.txt(g,f.text,f.x,f.y-k*30,{size:18,color:f.col,stroke:'#fff',lw:4,maxW:160});g.globalAlpha=1;});
    g.restore();
    /* 바람 표시 */
    const wx=G.bx+G.bw-u*3.2,wy=G.by+u*.7;K.card(g,wx-u*1.4,wy-u*.5,u*4.2,u*1,u*.3,'rgba(242,241,227,.92)',{stroke:INK,lw:3,blur:0,dy:0});K.txt(g,st.wind===0?'🌬️ 바람 없음':'🌬️ '+(st.wind>0?'→':'←')+' '+Math.abs(st.wind),wx+u*.7,wy,{size:u*.5,color:INK,maxW:u*3.6});
    if(q.fig)this.drawFig(g,G,q.fig);
    /* 킬 수 */
    K.card(g,G.bx+u*.2,G.by+u*.15,u*3.2,u*.8,u*.2,'rgba(242,241,227,.92)',{stroke:INK,lw:3,blur:0,dy:0});K.txt(g,'💥 격파 '+st.kills,G.bx+u*1.8,G.by+u*.55,{size:u*.5,color:INK,maxW:u*2.9});
    if(!st.lock&&st.qmax>0){const bw=Math.min(W*.35,u*7);QZ.bar(g,G.bx+(G.bw-bw)/2,G.by+u*.1,bw,Math.max(6,u*.2),st.qt/st.qmax,{good:OLIVE});}
    /* 보기·버튼 */
    G.list.forEach((r,i)=>{let s='idle';if(st.lock)s=(q.ty!=='aim'&&i===q.okIdx)?'ok':(q.ty!=='aim'&&i===st.pick?'bad':'dim');
      if(q.ty==='aim'){const lb=['◀◀','◀','▶','▶▶','💥 발사!'][i];K.rr(g,r.x,r.y,r.w,r.h,u*.3);g.fillStyle=i===4?'#dc2626':'#f2f1e3';g.fill();g.lineWidth=3;g.strokeStyle=INK;g.stroke();K.txt(g,lb,r.x+r.w/2,r.y+r.h/2,{size:Math.min(u*(i===4?.8:.95),r.h*.5),color:i===4?'#fff':INK,maxW:r.w*.9});}
      else QK.card(g,u,r,q.labels[i],st.lock&&q.ty!=='aim'?(i===q.okIdx?'ok':(i===st.pick?'bad':'dim')):'idle',{fill:'#f2f1e3',bd:INK,ink:INK,rad:u*.3,blur:0});});
  },
  protractor(g,c,q,nums){const R=80;g.save();g.translate(c.x,c.y);g.fillStyle='rgba(255,255,255,.55)';g.strokeStyle='#1f2937';g.lineWidth=1.5;g.beginPath();g.arc(0,0,R,Math.PI,TAU);g.closePath();g.fill();g.stroke();
    for(let a=0;a<=180;a+=5){const r1=a%10===0?R-9:R-5;const rad=-a*Math.PI/180;g.beginPath();g.moveTo(Math.cos(rad)*R,Math.sin(rad)*R);g.lineTo(Math.cos(rad)*r1,Math.sin(rad)*r1);g.stroke();}
    if(nums)for(let a=0;a<=180;a+=30){const rad=-a*Math.PI/180;g.fillStyle='#1f2937';g.font='bold 10px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(String(a),Math.cos(rad)*(R-19),Math.sin(rad)*(R-19));}
    const rad=-q.target*Math.PI/180;g.strokeStyle='#dc2626';g.lineWidth=3.5;g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(rad)*(R+22),Math.sin(rad)*(R+22));g.stroke();g.restore();},
  drawFig(g,G,f){const u=G.u,bw=Math.min(G.bw*.3,u*6),bh=bw*.75,x=G.bx+G.bw-bw-u*.3,y=G.by+u*1.7;K.card(g,x,y,bw,bh,u*.25,'rgba(242,241,227,.95)',{stroke:INK,lw:3,blur:0,dy:0});g.save();g.strokeStyle='#1f2937';g.lineWidth=Math.max(2,u*.07);g.fillStyle='rgba(77,93,42,.18)';
    const pts=f.tri?[[.15,.8],[.85,.8],[.58,.2]]:[[.15,.75],[.85,.8],[.8,.2],[.22,.28]];g.beginPath();pts.forEach((pt,i)=>{const px=x+pt[0]*bw,py=y+pt[1]*bh;i?g.lineTo(px,py):g.moveTo(px,py);});g.closePath();g.fill();g.stroke();
    pts.forEach((pt,i)=>{const lab=i<f.ang.length?f.ang[i]+'°':'?';const cx=x+bw/2,cy=y+bh/2;const px=x+pt[0]*bw,py=y+pt[1]*bh;const dx=cx-px,dy=cy-py,l=Math.hypot(dx,dy)||1;K.txt(g,lab,px+dx/l*bw*.19,py+dy/l*bh*.19,{size:Math.min(bw*.15,u*.55),color:lab==='?'?'#dc2626':INK,maxW:bw*.3});});g.restore();},
};
QZ.mix(GAME,{say:false,pts0:55,pts1:45,okMs(p){return Math.max(2200,Math.round(((p.state.total||2)+.8)*1000));},badMs(p){return Math.max(3600,Math.round(((p.state.total||3)+1.4)*1000));}});
Engine.boot(GAME);
