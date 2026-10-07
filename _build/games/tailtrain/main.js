/* 3~4학년 사회 · 촌락과 도시 · 공공 기관 · 환경에 따른 생활 — 칙칙폭폭 꼬리 기차
   디자인: 나무 장난감 기차놀이판. 장난감 기차를 몰아 주제에 맞는 나무 블록만 화물칸에 실어요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#5a3a1a',WOOD='#a47a3d';
const CARC=['#e5383b','#1c7ed6','#f59f00','#37b24d'];
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="6" y="18" width="22" height="16" rx="3" fill="#e5383b" stroke="#5a3a1a" stroke-width="3"/><rect x="26" y="12" width="10" height="22" rx="3" fill="#fcc419" stroke="#5a3a1a" stroke-width="3"/><rect x="38" y="24" width="8" height="10" rx="2" fill="#1c7ed6" stroke="#5a3a1a" stroke-width="2.5"/><circle cx="13" cy="37" r="4" fill="#5a3a1a"/><circle cx="31" cy="37" r="4" fill="#5a3a1a"/></svg>';
const DECKS=/*@@DECKS@@*/;
const CATS0=/*@@CATS@@*/;
const COLS=7,NI=5;
const DIRS={L:[-1,0],R:[1,0],U:[0,-1],D:[0,1]};
const jo=(w,a,b)=>{const c=w.charCodeAt(w.length-1);return c>=0xAC00&&c<=0xD7A3&&(c-0xAC00)%28?a:b;};
function grass(g,x,y,w,h,cell,t){K.rr(g,x-cell*.12,y-cell*.12,w+cell*.24,h+cell*.24,cell*.25);g.fillStyle=WOOD;g.fill();K.rr(g,x,y,w,h,cell*.14);g.fillStyle='#9bd36a';g.fill();
  g.save();K.rr(g,x,y,w,h,cell*.14);g.clip();const nx=Math.round(w/cell),ny=Math.round(h/cell);for(let i=0;i<nx;i++)for(let j=0;j<ny;j++){if((i+j)%2)continue;g.fillStyle='rgba(255,255,255,.12)';g.fillRect(x+i*cell,y+j*cell,cell,cell);}g.restore();}
function loco(g,x,y,s,dir,t,steam){g.save();g.translate(x,y);if(dir[0]===-1)g.scale(-1,1);else if(dir[1]===-1)g.rotate(-Math.PI/2);else if(dir[1]===1)g.rotate(Math.PI/2);
  g.lineJoin='round';g.lineWidth=Math.max(2,s*.07);g.strokeStyle=INK;
  g.fillStyle='#e5383b';K.rr(g,-s*.44,-s*.3,s*.58,s*.6,s*.1);g.fill();g.stroke();g.fillStyle='#fcc419';K.rr(g,-s*.06,-s*.42,s*.34,s*.84,s*.1);g.fill();g.stroke();
  g.fillStyle='#1c7ed6';K.rr(g,s*.26,-s*.2,s*.2,s*.4,s*.08);g.fill();g.stroke();g.fillStyle='#fff';g.beginPath();g.arc(s*.08,-s*.12,s*.09,0,TAU);g.fill();g.stroke();g.fillStyle=INK;g.beginPath();g.arc(s*.1,-s*.12,s*.04,0,TAU);g.fill();
  g.fillStyle='#5a3a1a';g.fillRect(-s*.32,-s*.42,s*.14,s*.14);
  if(steam){g.globalAlpha=.7;g.fillStyle='#fff';g.beginPath();g.arc(-s*.26,-s*.5-Math.sin(t*6)*s*.04,s*.1,0,TAU);g.fill();g.beginPath();g.arc(-s*.15,-s*.66,s*.08,0,TAU);g.fill();g.globalAlpha=1;}
  g.fillStyle='#333';for(const wx of[-s*.25,s*.12])for(const wy of[-s*.32,s*.32]){g.beginPath();g.arc(wx,wy,s*.07,0,TAU);g.fill();}
  g.restore();}
function wagon(g,x,y,s,col,emo){g.save();g.translate(x,y);g.lineJoin='round';g.lineWidth=Math.max(2,s*.07);g.strokeStyle=INK;g.fillStyle=col;K.rr(g,-s*.4,-s*.36,s*.8,s*.72,s*.12);g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.35)';K.rr(g,-s*.3,-s*.28,s*.6,s*.22,s*.08);g.fill();
  g.restore();K.emo(g,emo||'📦',x,y+s*.04,s*.5);}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    g.fillStyle='#e9c58b';g.fillRect(0,0,W0,H0);const u=Math.min(W0,H0)/6;const cell=u*1.1;const bw=Math.ceil(W0/cell)*cell;grass(g,u*.3,u*.3,W0-u*.6,H0-u*.6,cell,T);
    const rows=['🚜','🐟','🏢'];const y=H0*.52;g.strokeStyle='#8b6a3d';g.lineWidth=u*.14;g.lineCap='round';g.beginPath();g.moveTo(u*.3,y);g.lineTo(W0-u*.3,y);g.stroke();g.strokeStyle='#d8b57a';g.lineWidth=u*.06;g.stroke();
    const px=((T*u*1.6)%(W0+u*6))-u*3;loco(g,px,y,u*1.3,[1,0],T,true);for(let i=1;i<=3;i++)wagon(g,px-i*u*1.15,y,u*1.1,CARC[i%4],rows[i-1]);
    ['🌾','🏘️','⛰️'].forEach((e,i)=>K.emo(g,e,W0*(.2+i*.3),H0*(i%2?.24:.78),u*.9));};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'tailtrain',title:'칙칙폭폭 꼬리 기차',title1:'나무 장난감 기차놀이',title2:'칙칙폭폭 꼬리 기차',emoji:LOGO,
  subtitle:'3~4학년 사회 · 우리 고장과 생활',
  howto:'기차를 몰아 <b>이 주제만</b> 화물칸에 실어요. 맞으면 칸이 하나 늘고, 틀리면 맨 끝 칸이 떨어져요. 화면을 쓱 밀거나 화살표 버튼으로 방향을 바꿔요. 4개를 실으면 새 주제로 바뀌어요!',
  how:p=>({village:'<b>농촌·어촌·산지촌·도시</b>에서 볼 수 있는 것',public:'<b>공공 기관</b>만 실어요',climate:'<b>더운 곳·추운 곳</b>의 생활 모습'}[p.levelId]),
  theme:{c1:'#e5383b',c2:'#37b24d'},hero:heroScene,vignette:.04,durs:[90,150,240],levelTitle:'어떤 화물을 실을까요?',
  txt:{who:'누가 기관사일까요?',dur:'운행 시간',pace:'기차 속도',seat:'번 기관사 ',go:'출발!',s1:'1. 화물',s2:'2. 방법',s3:'3. 이름'},
  levels:DECKS.map(d=>({id:d.key,g:d.tag,t:d.ic+' '+d.label,d:d.desc})),
  summary:`<ul><li><b>촌락</b>: 농촌(논·밭·과수원)·어촌(바다·갯벌·항구)·산지촌(산·숲·약초)처럼 자연환경에 맞게 살아가요. <b>도시</b>는 건물과 교통이 발달했어요.</li>
    <li><b>공공 기관</b>은 주민 모두를 위해 나라나 지방 자치 단체가 운영하는 곳이에요 (시청·경찰서·소방서·우체국·보건소·도서관).</li>
    <li>더운 곳은 <b>얇은 옷·바람 잘 통하는 집</b>, 추운 곳은 <b>두꺼운 옷·난방</b>으로 환경에 맞게 생활해요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const st=p.state;const ROWS=st.rows||8;const top=(p.top||0)+u*.3;const land=W>=H*1.15;const pad=u*.3;let cat,pd,ax0,ax1,ay0,ay1;
    if(land){const lw=Math.min(W*.24,u*7),rw=Math.min(W*.2,u*6);cat={x:pad,y:top+u*.3,w:lw,h:Math.min(H*.5,u*9)};const b=Math.min(rw/3.3,u*2);const cx=W-pad-rw/2,cy=H-pad-b*2.2;pd=[{d:'U',x:cx-b/2,y:cy-b*1.15,w:b,h:b},{d:'L',x:cx-b*1.6,y:cy,w:b,h:b},{d:'R',x:cx+b*.6,y:cy,w:b,h:b},{d:'D',x:cx-b/2,y:cy+b*1.15,w:b,h:b}];ax0=pad+lw+pad;ax1=W-pad-rw-pad;ay0=top+u*.2;ay1=H-pad;}
    else{cat={x:pad,y:top,w:W-pad*2,h:u*1.6};const b=Math.min(u*1.7,(W-pad*2)/4.4);const y=H-pad-b;const gx=(W-b*4)/5;pd=['L','U','D','R'].map((d,i)=>({d,x:gx+i*(b+gx),y,w:b,h:b}));ax0=pad;ax1=W-pad;ay0=top+cat.h+u*.25;ay1=y-u*.25;}
    const aw=ax1-ax0,ah=ay1-ay0;const cell=Math.max(10,Math.min(aw/COLS,ah/ROWS));const bw=cell*COLS,bh=cell*ROWS;const bx=ax0+(aw-bw)/2,by=ay0+(ah-bh)/2;return{W,H,u,land,cat,pd,cell,bx,by,bw,bh,ROWS,aw,ah};},
  calcRows(p){const st=p.state;const st0=st.rows;st.rows=8;const G=this.geo(p);const r=clamp(Math.floor(COLS*G.ah/G.aw),6,11);return r;},
  init(p){const st=p.state;Object.assign(st,{T:0,rows:0,cat:null,got:0,body:[],prev:[],dir:[1,0],nd:[1,0],items:[],cargo:[],acc:0,tick:.42,steps:0,msg:'',msgT:0,flash:0,okN:0,sw:null,catNo:0,mood:'neutral'});},
  start(p){const st=p.state;st.rows=this.calcRows(p);const R=st.rows;st.body=[[2,Math.floor(R/2)],[1,Math.floor(R/2)],[0,Math.floor(R/2)]];st.prev=st.body.map(b=>b.slice());this.setCat(p);},
  setCat(p){const st=p.state,R=p.R;const CATS=CATS0[p.levelId];let c;do{c=R.pick(CATS);}while(CATS.length>1&&c===st.cat);st.cat=c;st.got=0;st.catNo++;st.items=[];this.fill(p);p.ask('🚂 이 주제만 실어요: <b>'+c[0]+' '+c[1]+'</b>','4개를 실으면 새 주제가 나와요');},
  free(p){const st=p.state,R=p.R;const rows=st.rows;for(let k=0;k<200;k++){const x=R.int(0,COLS-1),y=R.int(0,rows-1);if(x<0||x>=COLS||y<0||y>=rows)continue;if(!st.body.some(b=>b[0]===x&&b[1]===y)&&!st.items.some(it=>it.x===x&&it.y===y)&&Math.abs(x-st.body[0][0])+Math.abs(y-st.body[0][1])>2)return[x,y];}return[0,0];},
  fill(p){const st=p.state,R=p.R;const CATS=CATS0[p.levelId];while(st.items.length<NI){const good=st.items.filter(i=>i.good).length;const wantGood=good<2||(good<3&&R.f()<.4);let src,cn;if(wantGood){src=st.cat[2];cn=st.cat[1];}else{const others=CATS.filter(c=>c!==st.cat);const oc=R.pick(others);src=oc[2];cn=oc[1];}
      const used=st.items.map(i=>i.v[1]);const pool=src.filter(v=>!used.includes(v[1]));if(!pool.length)break;const v=R.pick(pool);const[x,y]=this.free(p);st.items.push({v,x,y,good:wantGood,cn});}},
  turn(p,d){const st=p.state;const D=DIRS[d];if(!D)return;if(D[0]===-st.dir[0]&&D[1]===-st.dir[1]&&st.body.length>1)return;if(D[0]===-st.nd[0]&&D[1]===-st.nd[1]&&st.body.length>1)return;st.nd=D;p.Snd.tone&&p.Snd.tone(420,.03,'square',.02);},
  step(p){const st=p.state,G=this.geo(p);const R=st.rows;st.dir=st.nd;st.prev=st.body.map(b=>b.slice());const h=st.body[0];const nx=(h[0]+st.dir[0]+COLS)%COLS,ny=(h[1]+st.dir[1]+R)%R;st.body.unshift([nx,ny]);st.steps++;
    const k=st.items.findIndex(it=>it.x===nx&&it.y===ny);let grow=false;
    if(k>=0){const it=st.items.splice(k,1)[0];const px=G.bx+(nx+.5)*G.cell,py=G.by+ny*G.cell;
      if(it.good){grow=true;st.cargo.unshift(it.v[0]);st.got++;st.okN++;p.hit(true,{pts:50,x:px,y:py,tip:it.v[0]+' '+it.v[1]+' 싣기 완료!',tipMs:700,quiet:false});st.msg=it.v[0]+' '+it.v[1]+' 싣기 완료!';st.msgT=1.2;st.mood='happy';st.tick=Math.max(.26,st.tick-.008);
        if(st.got>=4){p.Snd.bell&&p.Snd.bell(880,0,.08);st.msg='🎉 '+st.cat[1]+' 칸 완성! 새 주제가 나와요';st.msgT=1.6;setTimeout(()=>{if(p.active)this.setCat(p);},250);}}
      else{st.flash=.5;st.msg='앗! '+it.v[1]+jo(it.v[1],'은','는')+' \''+st.cat[1]+'\'에 맞지 않아요';st.msgT=2;st.mood='oops';p.hit(false,{review:it.v[0]+' '+it.v[1]+' → '+it.cn+'  (지금 주제: '+st.cat[1]+')',tip:st.msg,tipMs:1500});if(st.body.length>4){st.body.pop();st.cargo.pop();}}
      this.fill(p);}
    if(!grow)st.body.pop();},
  update(p,dt){const st=p.state;st.T+=dt;if(st.msgT>0)st.msgT-=dt;if(st.flash>0)st.flash-=dt;if(!st.cat)return;st.acc+=dt;const te=st.tick/Math.max(.8,Math.min(1.3,p.pace));let n=0;while(st.acc>=te&&n++<3){st.acc-=te;this.step(p);}},
  down(p,x,y){const st=p.state;if(!st.cat)return;const G=this.geo(p);const b=G.pd.find(b=>K.inRect(x,y,b));if(b){this.turn(p,b.d);st.sw=null;return;}st.sw={x,y,done:false};},
  move(p,x,y,down){const st=p.state;const s=st.sw;if(!s||s.done||!down)return;const dx=x-s.x,dy=y-s.y;if(Math.max(Math.abs(dx),Math.abs(dy))>22){s.done=true;this.turn(p,Math.abs(dx)>Math.abs(dy)?(dx>0?'R':'L'):(dy>0?'D':'U'));}},
  up(p,x,y){p.state.sw=null;},
  botAct(p){const st=p.state;if(!st.cat||!st.body.length)return null;const G=this.geo(p);const R=st.rows;const h=st.body[0];const goods=st.items.filter(i=>i.good);if(!goods.length)return null;
    const wd=(a,b,n)=>{let d=b-a;if(d>n/2)d-=n;if(d<-n/2)d+=n;return d;};goods.sort((a,b)=>(Math.abs(wd(h[0],a.x,COLS))+Math.abs(wd(h[1],a.y,R)))-(Math.abs(wd(h[0],b.x,COLS))+Math.abs(wd(h[1],b.y,R))));const t=goods[0];const dx=wd(h[0],t.x,COLS),dy=wd(h[1],t.y,R);
    const opts=[];if(dx)opts.push(dx>0?'R':'L');if(dy)opts.push(dy>0?'D':'U');const bad=(d)=>{const D=DIRS[d];const nx=(h[0]+D[0]+COLS)%COLS,ny=(h[1]+D[1]+R)%R;return st.items.some(i=>!i.good&&i.x===nx&&i.y===ny)||(D[0]===-st.dir[0]&&D[1]===-st.dir[1]);};
    let d=opts.find(o=>!bad(o));if(!d){d=['L','R','U','D'].find(o=>!bad(o));}if(!d)return null;const cur=Object.keys(DIRS).find(k=>DIRS[k][0]===st.nd[0]&&DIRS[k][1]===st.nd[1]);if(cur===d)return null;const b=G.pd.find(b=>b.d===d);const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+b.x+b.w/2,y:rc.top+b.y+b.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T;K.vgrad(g,0,0,W,H,['#f6d9a1','#e9c58b','#dcb274']);
    if(!st.cat)return;const c=G.cell;grass(g,G.bx,G.by,G.bw,G.bh,c,t);
    const X=x=>G.bx+(x+.5)*c,Y=y=>G.by+(y+.5)*c;
    /* 나무 블록(화물) */
    g.save();K.rr(g,G.bx,G.by,G.bw,G.bh,c*.14);g.clip();
    st.items.forEach((it,i)=>{const x=X(it.x),y=Y(it.y)+Math.sin(t*3+i)*c*.03;K.card(g,x-c*.43,y-c*.43,c*.86,c*.86,c*.14,'#ffe7b0',{stroke:WOOD,lw:Math.max(2,c*.05),blur:c*.08,dy:c*.05});K.emo(g,it.v[0],x,y-c*.1,c*.46);QK.txt(g,it.v[1],x,y+c*.28,c*.82,c*.26,Math.min(c*.2,13),INK,1);});
    /* 기차: 칸 사이를 부드럽게 움직여요 */
    const te=st.tick/Math.max(.8,Math.min(1.3,p.pace));const f=clamp(st.acc/te,0,1);const pos=(i)=>{const cur=st.body[i],pr=st.prev[i]||st.prev[st.prev.length-1]||cur;if(Math.abs(cur[0]-pr[0])>1||Math.abs(cur[1]-pr[1])>1)return[cur[0],cur[1]];return[pr[0]+(cur[0]-pr[0])*f,pr[1]+(cur[1]-pr[1])*f];};
    /* 선로 */
    g.strokeStyle='rgba(120,80,30,.25)';g.lineWidth=c*.16;g.lineCap='round';g.lineJoin='round';g.beginPath();st.body.forEach((b,i)=>{const q=pos(i);i?g.lineTo(X(q[0]),Y(q[1])):g.moveTo(X(q[0]),Y(q[1]));});g.stroke();
    for(let i=st.body.length-1;i>=1;i--){const q=pos(i);wagon(g,X(q[0]),Y(q[1]),c*.9,CARC[(i-1)%4],st.cargo[i-1]);}
    const hq=pos(0);loco(g,X(hq[0]),Y(hq[1]),c*1.0,st.dir,t,true);
    g.restore();
    if(st.flash>0){g.fillStyle=`rgba(229,56,59,${st.flash*.5})`;K.rr(g,G.bx,G.by,G.bw,G.bh,c*.14);g.fill();}
    /* 주제 카드 */
    const ct=G.cat;K.card(g,ct.x,ct.y,ct.w,ct.h,u*.3,'#fffaf0',{stroke:WOOD,lw:3,blur:u*.15,dy:u*.08});
    if(G.land){K.txt(g,'이 주제만 실어요!',ct.x+ct.w/2,ct.y+u*.55,{size:Math.min(u*.55,ct.w*.1),color:'#8b6a3d',maxW:ct.w*.9});K.emo(g,st.cat[0],ct.x+ct.w/2,ct.y+ct.h*.38,Math.min(ct.w*.45,ct.h*.3));QK.txt(g,st.cat[1],ct.x+ct.w/2,ct.y+ct.h*.65,ct.w*.9,ct.h*.2,Math.min(u*1.1,ct.w*.18),INK,1.1);
      for(let i=0;i<4;i++){g.fillStyle=i<st.got?CARC[i]:'rgba(90,58,26,.15)';K.rr(g,ct.x+ct.w*.1+i*(ct.w*.8/4),ct.y+ct.h*.86,ct.w*.8/4-4,ct.h*.07,6);g.fill();}}
    else{K.emo(g,st.cat[0],ct.x+u*1.0,ct.y+ct.h/2,u*1.1);K.txt(g,'이 주제만 실어요!',ct.x+ct.w*.55,ct.y+ct.h*.3,{size:u*.42,color:'#8b6a3d',maxW:ct.w*.5});QK.txt(g,st.cat[1],ct.x+ct.w*.55,ct.y+ct.h*.66,ct.w*.5,ct.h*.5,u*.8,INK,1.1);
      for(let i=0;i<4;i++){g.fillStyle=i<st.got?CARC[i]:'rgba(90,58,26,.15)';g.beginPath();g.arc(ct.x+ct.w-u*2.2+i*u*.55,ct.y+ct.h/2,u*.2,0,TAU);g.fill();}}
    /* 방향 버튼 */
    const arrows={L:'◀',R:'▶',U:'▲',D:'▼'};G.pd.forEach(b=>{K.rr(g,b.x,b.y,b.w,b.h,b.w*.28);g.fillStyle='#fcc419';g.fill();g.lineWidth=3;g.strokeStyle=INK;g.stroke();K.txt(g,arrows[b.d],b.x+b.w/2,b.y+b.h/2+1,{size:b.w*.5,color:INK});});
    if(st.msgT>0&&st.msg)K.txt(g,st.msg,G.bx+G.bw/2,G.by+G.bh-u*.5,{size:Math.min(u*.65,W*.04),color:'#fff',stroke:INK,lw:u*.14,maxW:G.bw*.95});
    K.card(g,G.land?G.bx:u*.3,(p.top||0)+u*.5-(G.land?0:u*0)-(G.land?0:0),0,0,0,'rgba(0,0,0,0)',{});
  },
};
Engine.boot(GAME);
