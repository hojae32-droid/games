
/* ───────── 공통: 화면 영역과 밤 마을 배경 ───────── */
const stripH=p=>clamp(p.H*.12,40,92);
const areaOf=p=>({x:0,y:0,w:p.W,h:p.H-stripH(p)});
function bgScene(p,g,dt){const st=p.state,W=p.W,H=p.H,sh=stripH(p);
  st.T=(st.T||0)+dt;st.lit=lerp(st.lit||0,clamp(p.correct/20,0,1),Math.min(1,dt*2.5));st.pulse=Math.max(0,(st.pulse||0)-dt*1.6);
  K.vgrad(g,0,0,W,H,['#07102a','#0d1a45']);K.dots(g,W,H,Math.max(14,p.u*.8),'rgba(150,180,255,.06)');
  Town.draw(g,W,H-sh,sh,Math.min(1,st.lit+st.pulse*.15),st.T,p.i*7+2);
  const fs=clamp(p.u*.3,11,15);const txt='마을 복구 '+Math.round(st.lit*100)+'%';g.save();g.font=K.font(fs,'IBM Plex Sans KR');const tw=g.measureText(txt).width+fs*1.6;
  K.box(g,8,H-sh-fs*.2,tw,fs*1.9,fs*.95,'rgba(5,10,24,.82)','rgba(255,210,63,.45)',1.5);K.txt(g,txt,8+tw/2,H-sh+fs*.75,{size:fs,color:'#ffe58a',font:'IBM Plex Sans KR'});g.restore();}
/* 맞혔을 때 마을에 번쩍 */
function goodHit(p,pts,x,y,tip,extra){const r=p.hit(true,Object.assign({pts,x,y,tip,tipMs:2300,color:'#ffd23f'},extra||{}));p.state.pulse=1;return r;}
function zap(p){p.Snd.slide(180,1500,.22,.07);p.Snd.noise(.16,3600,.1);}
/* 잠시 뒤 다음 미션 */
function nextRound(p,ms){const st=p.state;st.lock=true;st.rtok=(st.rtok||0)+1;const k=st.rtok;setTimeout(()=>{if(p.active&&!p.finished&&st.rtok===k)GAME.round(p);},ms);}
const intro=p=>easeOut(((p.state.T||0)-(p.state.t0||0))/.45);
const ROTB=b=>((b<<1)|(b>>3))&15;
const DIRS=[[1,0,-1,4],[2,1,0,8],[4,0,1,1],[8,-1,0,2]];   /* 비트, dx, dy, 반대 비트 : N=1 E=2 S=4 W=8 */

/* ═════════ 미션 1 : 회로 완성하기 (전선 타일 돌리기 + 스위치) ═════════ */
const M1={
  gen(p){const st=p.state,R=p.R,A=areaOf(p);const land=A.w>A.h*1.05;const C=land?7:5,Rw=land?5:7;
    const tier=Math.min(3,Math.floor((st.n1||0)/2));
    const w=R.int(3,Math.min(C,3+Math.min(tier+1,3))),h=R.int(3,Math.min(Rw,3+Math.min(tier+1,3)));
    const x0=R.int(0,C-w),y0=R.int(0,Rw-h),x1=x0+w-1,y1=y0+h-1;
    let loop=[];for(let x=x0;x<=x1;x++)loop.push([x,y0]);for(let y=y0+1;y<=y1;y++)loop.push([x1,y]);for(let x=x1-1;x>=x0;x--)loop.push([x,y1]);for(let y=y1-1;y>y0;y--)loop.push([x0,y]);
    /* 길을 구불구불하게 */
    const occ=new Set(loop.map(c=>c[0]+','+c[1]));const bumps=tier>=1?R.int(0,tier>=2?2:1):0;
    for(let b=0;b<bumps;b++)for(let tr=0;tr<12;tr++){const i=R.int(0,loop.length-1),a=loop[i],c=loop[(i+1)%loop.length];const dx=c[0]-a[0],dy=c[1]-a[1];
      const nn=R.shuffle([[-dy,dx],[dy,-dx]]);let done=false;
      for(const [nx,ny] of nn){const a2=[a[0]+nx,a[1]+ny],c2=[c[0]+nx,c[1]+ny];
        if(a2[0]<0||a2[1]<0||a2[0]>=C||a2[1]>=Rw||c2[0]<0||c2[1]<0||c2[0]>=C||c2[1]>=Rw)continue;
        if(occ.has(a2[0]+','+a2[1])||occ.has(c2[0]+','+c2[1]))continue;
        loop.splice(i+1,0,a2,c2);occ.add(a2[0]+','+a2[1]);occ.add(c2[0]+','+c2[1]);done=true;break;}
      if(done)break;}
    const n=loop.length;const grid=[];for(let y=0;y<Rw;y++){grid.push([]);for(let x=0;x<C;x++)grid[y].push({kind:'empty',base:0,k:0,vk:0});}
    const straight=[];
    loop.forEach((c,i)=>{const a=loop[(i-1+n)%n],b=loop[(i+1)%n];let bits=0;for(const [d,dx,dy] of DIRS){if((a[0]===c[0]+dx&&a[1]===c[1]+dy)||(b[0]===c[0]+dx&&b[1]===c[1]+dy))bits|=d;}
      const t={kind:'w',base:bits,k:0,vk:0,loop:true,idx:i,fx:b[0]-a[0],fy:b[1]-a[1]};grid[c[1]][c[0]]=t;if(a[0]===b[0]||a[1]===b[1])straight.push(i);});
    const take=(list,pred)=>{const c=list.filter(pred);if(!c.length)return null;const v=R.pick(c);list.splice(list.indexOf(v),1);return v;};
    const pool=straight.slice();const cd=(i,j)=>{const d=Math.abs(i-j);return Math.min(d,n-d);};
    const bi=take(pool,()=>true);const bu=take(pool,i=>cd(i,bi)>=n/4)??take(pool,()=>true);const si=take(pool,()=>true);
    const bu2=(tier>=2||R.chance(.35))?take(pool,i=>cd(i,bi)>=2):null;
    const setK=(i,kind,extra)=>{const c=loop[i];const t=grid[c[1]][c[0]];t.kind=kind;Object.assign(t,extra||{});t.pos=c;return t;};
    const bat=setK(bi,'bat'),bulbs=[setK(bu,'bulb')];if(bu2!=null)bulbs.push(setK(bu2,'bulb'));const sw=setK(si,'sw',{closed:false});
    for(let y=0;y<Rw;y++)for(let x=0;x<C;x++){const t=grid[y][x];if(t.kind==='w')t.k=R.int(0,3);}
    const xs=loop.map(c=>c[0]),ys=loop.map(c=>c[1]);st.bb={x:Math.min(...xs),y:Math.min(...ys),w:Math.max(...xs)-Math.min(...xs)+1,h:Math.max(...ys)-Math.min(...ys)+1};
    st.C=C;st.Rw=Rw;st.grid=grid;st.loop=loop;st.bat=bat;st.sw=sw;st.bulbs=bulbs;st.ev=null;st.wiredTip=false;
    if(this.eval(p).wired){const ws=[];grid.forEach(r=>r.forEach(t=>{if(t.kind==='w'&&t.loop)ws.push(t);}));R.pick(ws).k+=1;}},
  bits(t){let b=t.base;for(let i=0;i<(t.k&3);i++)b=ROTB(b);return b;},
  eval(p){const st=p.state,g=st.grid;if(st.ev&&!st.dirty)return st.ev;st.dirty=false;const seen=new Set();const [bx,by]=st.bat.pos;seen.add(bx+','+by);const q=[[bx,by]];
    while(q.length){const [x,y]=q.shift();const b=this.bits(g[y][x]);for(const [d,dx,dy,op] of DIRS){if(!(b&d))continue;const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=st.C||ny>=st.Rw)continue;const nt=g[ny][nx];if(nt.kind==='empty'||!(this.bits(nt)&op))continue;const k=nx+','+ny;if(!seen.has(k)){seen.add(k);q.push([nx,ny]);}}}
    let wired=true;for(const [x,y] of st.loop){const t=g[y][x];if(!seen.has(x+','+y)){wired=false;break;}const b=this.bits(t);
      for(const [d,dx,dy,op] of DIRS){if(!(b&d))continue;const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=st.C||ny>=st.Rw||g[ny][nx].kind==='empty'||!(this.bits(g[ny][nx])&op)){wired=false;}}}
    return st.ev={seen,wired,lit:wired&&st.sw.closed};},
  init(p){const st=p.state;st.n1=st.n1||0;this.gen(p);
    p.ask('🔌 전선 타일을 눌러 돌려 <b>끊어지지 않는 회로</b>를 만들고 스위치를 닫아요','전지의 (+)극 → 전구 → 전지의 (−)극, 한 줄로 이어져야 해요');p.tools([],()=>{});},
  geo(p){const st=p.state,A=areaOf(p),bb=st.bb;const pad=p.u*.55;const cs=Math.min((A.w-pad*2)/bb.w,(A.h-pad*2)/bb.h,p.u*3.3);return{cs,ox:A.x+(A.w-cs*bb.w)/2-cs*bb.x,oy:A.y+(A.h-cs*bb.h)/2-cs*bb.y};},
  down(p,x,y){const st=p.state;if(st.lock)return;const G=this.geo(p);const cx=Math.floor((x-G.ox)/G.cs),cy=Math.floor((y-G.oy)/G.cs);if(cx<0||cy<0||cx>=st.C||cy>=st.Rw)return;
    const t=st.grid[cy][cx];
    if(t.kind==='w'){t.k++;st.dirty=true;p.Snd.tone(720+Math.random()*80,.04,'sine',.05);this.check(p);}
    else if(t.kind==='sw'){t.closed=!t.closed;st.dirty=true;p.Snd.tone(t.closed?420:300,.07,'square',.04);
      if(t.closed&&!this.eval(p).wired)p.tip('아직 <b>끊어진 곳</b>이 있어서 전기가 흐르지 못해요','bad',2200);
      this.check(p);}},
  check(p){const st=p.state;if(st.lock)return;const ev=this.eval(p);
    if(ev.wired&&!st.sw.closed&&!st.wiredTip){st.wiredTip=true;p.tip('전선이 모두 이어졌어요! <b>스위치</b>를 눌러 회로를 닫아요','good',2600);}
    if(ev.lit){st.lock=true;st.n1++;zap(p);const G=this.geo(p);
      st.bulbs.forEach(b=>{const [bx,by]=b.pos;p.burst(G.ox+(bx+.5)*G.cs,G.oy+(by+.5)*G.cs,'#ffd23f',16,p.u*5);});
      goodHit(p,st.bulbs.length>1?190:150,p.W/2,p.H*.18,'회로가 끊어지지 않고 이어져서 전구에 불이 켜졌어요!');nextRound(p,1300);}},
  update(p,dt){},
  draw(p,g,A,dt){const st=p.state,u=p.u;const G=this.geo(p),cs=G.cs;const ev=this.eval(p);const a=intro(p);
    const T=st.T;
    g.save();g.globalAlpha=a;g.translate(0,(1-a)*u*.6);
    const bb=st.bb;const pad=cs*.14;K.card(g,G.ox+bb.x*cs-pad,G.oy+bb.y*cs-pad,cs*bb.w+pad*2,cs*bb.h+pad*2,cs*.2,'#0e1a3f',{blur:u*.5,dy:u*.15,stroke:'rgba(120,150,255,.28)',lw:1.5,hi:false});
    if(ev.lit)K.glow(g,G.ox+(bb.x+bb.w/2)*cs,G.oy+(bb.y+bb.h/2)*cs,Math.max(cs*bb.w,cs*bb.h)*.8,'#ffd23f',.14);
    /* 칸 바탕 */
    for(let y=bb.y;y<bb.y+bb.h;y++)for(let x=bb.x;x<bb.x+bb.w;x++){const t=st.grid[y][x];const tx=G.ox+x*cs+cs*.04,ty=G.oy+y*cs+cs*.04,tw=cs*.92;
      if(t.kind==='empty'){g.fillStyle='rgba(120,150,255,.07)';g.beginPath();g.arc(G.ox+(x+.5)*cs,G.oy+(y+.5)*cs,Math.max(1.5,cs*.03),0,TAU);g.fill();continue;}
      K.rr(g,tx,ty,tw,tw,cs*.14);g.fillStyle=t.kind==='w'?'#16275a':'#1f3470';g.fill();
      g.strokeStyle=t.kind==='w'?'rgba(120,150,255,.22)':'rgba(255,210,63,.35)';g.lineWidth=1.5;g.stroke();
      g.fillStyle='rgba(150,175,255,.2)';for(const [d,dx,dy] of DIRS){g.beginPath();g.arc(G.ox+(x+.5+dx*.46)*cs,G.oy+(y+.5+dy*.46)*cs,cs*.03,0,TAU);g.fill();}}
    /* 전선과 부품 */
    for(let y=bb.y;y<bb.y+bb.h;y++)for(let x=bb.x;x<bb.x+bb.w;x++){const t=st.grid[y][x];if(t.kind==='empty')continue;const cx=G.ox+(x+.5)*cs,cy=G.oy+(y+.5)*cs;
      const on=ev.seen.has(x+','+y);const col=ev.lit?'#ffd23f':on?'#4fe3f4':'#c8803c';const lw=cs*.15;
      if(t.kind==='w'){t.vk+=(t.k-t.vk)*Math.min(1,dt*16);g.save();g.translate(cx,cy);g.rotate(t.vk*Math.PI/2);
        const pts=[];for(const [d,dx,dy] of DIRS)if(t.base&d)pts.push([dx,dy]);
        g.lineCap='round';
        g.strokeStyle='rgba(0,0,0,.45)';g.lineWidth=lw+3;g.beginPath();pts.forEach(q=>{g.moveTo(0,0);g.lineTo(q[0]*cs*.5,q[1]*cs*.5);});g.stroke();
        if(ev.lit){g.shadowColor=col;g.shadowBlur=lw*1.6;}g.strokeStyle=col;g.lineWidth=lw;g.beginPath();pts.forEach(q=>{g.moveTo(0,0);g.lineTo(q[0]*cs*.5,q[1]*cs*.5);});g.stroke();g.shadowBlur=0;
        g.strokeStyle='rgba(255,255,255,.3)';g.lineWidth=lw*.28;g.beginPath();pts.forEach(q=>{g.moveTo(0,0);g.lineTo(q[0]*cs*.5,q[1]*cs*.5);});g.stroke();
        if(pts.length>1){g.fillStyle=col;g.beginPath();g.arc(0,0,lw*.62,0,TAU);g.fill();}g.restore();}
      else{const ang=Math.atan2(t.fy,t.fx);g.save();g.translate(cx,cy);g.rotate(ang);g.lineCap='round';
        g.strokeStyle='rgba(0,0,0,.45)';g.lineWidth=lw+3;g.beginPath();g.moveTo(-cs*.5,0);g.lineTo(cs*.5,0);g.stroke();
        if(ev.lit){g.shadowColor=col;g.shadowBlur=lw*1.6;}g.strokeStyle=col;g.lineWidth=lw;g.beginPath();g.moveTo(-cs*.5,0);g.lineTo(cs*.5,0);g.stroke();g.restore();
        if(t.kind==='bat'){D.battery(g,cx,cy,cs*.82,cs*.38,ang,{});}
        else if(t.kind==='bulb'){D.bulb(g,cx,cy,cs*.31,ev.lit?1:0,T);}
        else if(t.kind==='sw'){D.knife(g,cx,cy,cs*.86,ang,t.closed,T,ev.wired&&!t.closed);}}}
    /* 흐르는 전기 알갱이 (+극에서 나와 한 바퀴) */
    if(ev.lit){const pts=st.loop.map(c=>[G.ox+(c[0]+.5)*cs,G.oy+(c[1]+.5)*cs]);pts.push(pts[0]);D.dots(g,pts,T,cs*2.2,Math.max(6,Math.round(pts.length*1.2)),cs*.05);}
    g.restore();}
};

/* ═════════ 미션 2 : 전기가 통하는 물체 (회로 테스터) ═════════ */
const M2={
  init(p){const st=p.state,R=p.R;const ys=p.deck(ITEMS.filter(i=>i.ok),'cy2'),ys2=p.deck(ITEMS.filter(i=>i.ok),'cy2');
    let a=ys,b=ys2,tries=0;while(b.id===a.id&&tries++<8)b=p.deck(ITEMS.filter(i=>i.ok),'cy2');
    const n1=p.deck(ITEMS.filter(i=>!i.ok),'cn2');let n2=p.deck(ITEMS.filter(i=>!i.ok),'cn2');tries=0;while(n2.id===n1.id&&tries++<8)n2=p.deck(ITEMS.filter(i=>!i.ok),'cn2');
    st.items=R.shuffle([a,b,n1,n2]).map(o=>({...o,mark:0}));st.found=0;st.test=null;st.bulb=0;st.lock=false;
    p.ask('📎 회로 테스터에 끼워 <b>전구에 불이 켜지는</b> 물체 2개를 찾아요','물체를 눌러 테스터에 끼워 봐요 (안 통하는 물체는 감점)');p.tools([],()=>{});},
  lay(p){const A=areaOf(p),u=p.u;const land=A.w>A.h*1.05;const m=u*.35;let T,Y;
    if(land){T={x:m,y:m,w:A.w*.52-m,h:A.h-m*2};Y={x:A.w*.52+m*.5,y:m,w:A.w*.48-m*1.5,h:A.h-m*2};}
    else{T={x:m,y:m*.8,w:A.w-m*2,h:A.h*.47};Y={x:m,y:T.y+T.h+m*.6,w:A.w-m*2,h:A.h-(T.y+T.h)-m*1.6};}
    const gx=T.x+T.w/2,top=T.y+T.h*.34,bot=T.y+T.h*.86,lx=T.x+T.w*.13,rx=T.x+T.w*.87;
    const cards=[];const gp=u*.3;const cw=(Y.w-gp)/2,ch=(Y.h-gp)/2;
    for(let i=0;i<4;i++){const c=i%2,r=Math.floor(i/2);cards.push({x:Y.x+c*(cw+gp),y:Y.y+r*(ch+gp),w:cw,h:ch});}
    return{T,Y,gx,top,bot,lx,rx,cards,gapHalf:T.w*.2};},
  down(p,x,y){const st=p.state;if(st.lock||st.test)return;const L=this.lay(p);
    for(let i=0;i<4;i++){const c=L.cards[i];if(K.inRect(x,y,c)&&!st.items[i].mark){st.test={i,t:0,res:false};p.Snd.pop();return;}}},
  draw(p,g,A,dt){const st=p.state,u=p.u,T=st.T;const L=this.lay(p);const a=intro(p);const te=st.test;
    if(te){te.t+=dt;const it=st.items[te.i];
      if(!te.res&&te.t>=.72){te.res=true;te.ok=!!it.ok;
        if(it.ok){it.mark=1;st.found++;zap(p);goodHit(p,100,L.gx,L.top-u*.9,`<b>${it.name}</b>: ${it.note}`);}
        else{it.mark=2;p.hit(false,{pen:30,x:L.gx,y:L.top-u*.9,tip:`<b>${it.name}</b>: ${it.note}`,review:`${it.name} → ${it.note}`});}}
      if(te.t>=1.9){st.test=null;if(st.found>=2&&!st.lock)nextRound(p,500);}}
    g.save();g.globalAlpha=a;g.translate(0,(1-a)*u*.6);
    /* 테스터 판 */
    const Tb=L.T;K.card(g,Tb.x,Tb.y,Tb.w,Tb.h,u*.35,'#0e1a3f',{blur:u*.5,dy:u*.15,stroke:'rgba(120,150,255,.28)',lw:1.5,hi:false});
    D.label(g,'전기 회로 테스터',Tb.x+Tb.w/2,Tb.y+Tb.h*.1,clamp(u*.36,11,17),'#9db0e6');
    const lit=te&&te.res&&te.ok&&te.t<1.65;const lv=lit?easeOut((te.t-.72)/.25):0;
    const midY=(L.top+L.bot)/2;const gH=L.gapHalf;const cl=L.gx-gH,cr=L.gx+gH;
    const flow=[[L.lx,L.top+(L.bot-L.top)*.18],[L.lx,L.top],[cl,L.top],[cr,L.top],[L.rx,L.top],[L.rx,L.bot],[L.lx,L.bot],[L.lx,L.top+(L.bot-L.top)*.82]];
    const wc=lv>0?'#ffd23f':COL.copper;
    D.wire(g,[[L.lx,L.top],[cl-u*.5,L.top]],u*.2,wc,lv>0);D.wire(g,[[cr+u*.5,L.top],[L.rx,L.top]],u*.2,wc,lv>0);
    D.wire(g,[[L.lx,L.top],[L.lx,L.bot],[L.rx,L.bot],[L.rx,L.top]],u*.2,wc,lv>0);
    /* 전지, 전구 */
    D.battery(g,L.lx,midY,Math.min(u*2.1,(L.bot-L.top)*.7),u*.95,-Math.PI/2,{});
    D.bulb(g,L.rx,midY,u*.82,lv,T);
    const open=te?(te.t<.5?1:te.t<.72?1-(te.t-.5)/.22:(te.t>1.65?(te.t-1.65)/.25:0)):1;
    D.clip(g,cl,L.top,u*1.35,1,open*.9+.1,'#ff5a7a');D.clip(g,cr,L.top,u*1.35,-1,open*.9+.1,'#3a7bff');
    if(!te){g.save();g.strokeStyle='rgba(255,210,63,.55)';g.lineWidth=2;g.setLineDash([u*.25,u*.2]);g.lineDashOffset=-T*u*.5;K.rr(g,L.gx-u*1.0,L.top-u*.75,u*2,u*1.5,u*.3);g.stroke();g.restore();
      K.emo(g,'❓',L.gx,L.top,u*.8*(1+Math.sin(T*4)*.05));}
    if(lv>0){const pts=flow.concat([flow[0]]);D.dots(g,pts,T,u*5,14,u*.09);}
    /* 물체 카드 */
    st.items.forEach((it,i)=>{const c=L.cards[i];const testing=te&&te.i===i;const cx=c.x+c.w/2,cy=c.y+c.h*.44;
      const mk=it.mark;K.card(g,c.x,c.y,c.w,c.h,u*.3,mk===1?'#14503f':mk===2?'#2a2f4a':'#1a2a60',{blur:u*.3,dy:u*.1,stroke:mk===1?'rgba(61,240,184,.8)':mk===2?'rgba(150,160,200,.35)':'rgba(120,150,255,.35)',lw:mk===1?3:1.5,hi:false});
      const sz=Math.min(c.w*.5,c.h*.52);
      if(testing){g.save();g.globalAlpha=.25;g.fillStyle='#000';K.rr(g,c.x+4,c.y+4,c.w-8,c.h-8,u*.25);g.fill();g.restore();}
      else itemIcon(g,it.id,cx,cy,sz);
      K.txt(g,it.name,cx,c.y+c.h*.86,{size:clamp(Math.min(c.h*.17,c.w*.13),12,22),maxW:c.w*.92,color:mk?'#fff':'#dfe8ff'});
      if(mk===1){K.box(g,c.x+c.w-u*1.5,c.y+u*.12,u*1.4,u*.6,u*.2,'#3df0b8');K.txt(g,'통해요',c.x+c.w-u*.8,c.y+u*.42,{size:clamp(u*.36,11,16),color:'#04251c'});}
      else if(mk===2){K.box(g,c.x+c.w-u*1.7,c.y+u*.12,u*1.6,u*.6,u*.2,'#56608a');K.txt(g,'안 통해요',c.x+c.w-u*.9,c.y+u*.42,{size:clamp(u*.34,10,15),color:'#e8eeff'});}});
    if(te){const c=L.cards[te.i],cx=c.x+c.w/2,cy=c.y+c.h*.44,sz=Math.min(c.w*.5,c.h*.52),t=te.t;let px=cx,py=cy,s=sz;
      if(t<.5){const e=easeIO(t/.5);px=lerp(cx,L.gx,e);py=lerp(cy,L.top,e);s=lerp(sz,u*1.7,e);}
      else if(t<1.65){px=L.gx;py=L.top;s=u*1.7;}
      else{const e=easeIO((t-1.65)/.25);px=lerp(L.gx,cx,e);py=lerp(L.top,cy,e);s=lerp(u*1.7,sz,e);}
      itemIcon(g,st.items[te.i].id,px,py,s);}
    g.restore();}
};
