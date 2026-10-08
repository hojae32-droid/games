/* 3~4학년 수학 · 곱셈구구 · 나눗셈 — 배수 미로 냠냠
   디자인: 산울타리 정원 미로. 배고픈 햄스터를 움직여 주문에 맞는 수 씨앗만 냠냠! 틀린 씨앗은 웩, 🐱 고양이에게 잡히면 처음 자리로 돌아가요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#3f4a12',GRN='#65a30d',ORG='#f59e0b';
const LOGO=gkLogo('#fffef0','#4d6a12','🐹');
const J=(w,t)=>{w=String(w);const c=w.charCodeAt(w.length-1);const b=c>=0xAC00&&c<=0xD7A3?(c-0xAC00)%28!==0:/[013678]/.test(w[w.length-1]);const m={'은':['은','는'],'이':['이','가']}[t];return w+(b?m[0]:m[1]);};
const MAZES=[
 ["#########","#...#...#","#.#.#.#.#","#.......#","#.##.##.#","#.......#","#.#.#.#.#","#...#...#","#.#.#.#.#","#.......#","#########"],
 ["#########","#.......#","#.##.##.#","#.#...#.#","#.......#","##.#.#.##","#.......#","#.#.#.#.#","#.#...#.#","#.......#","#########"],
 ["#########","#.......#","#.#.#.#.#","#.#...#.#","#...#...#","#.#####.#","#.......#","##.#.#.##","#..#.#..#","#.......#","#########"],
];
const DIRS={U:[0,-1],D:[0,1],L:[-1,0],R:[1,0]};
const LV={
  '2-2':{g:'3~4학년',t:'곱셈구구 배수',d:'○단 수만'},
  '3-1':{g:'3~4학년',t:'나눗셈의 몫',d:'몫이 ○인 식'},
  '3-2':{g:'3~4학년',t:'나머지 나눗셈',d:'나머지가 □인 수'},
  mix:{g:'3~4학년',t:'섞어서 도전',d:'주문이 바뀌어요'},
};
function hero(g,W,H,T,u){g.fillStyle='#fef9c3';g.fillRect(0,0,W,H);const cs=Math.min(W/9,H/6);const m=MAZES[0];for(let y=0;y<5;y++)for(let x=0;x<9;x++){if(m[y][x]==='#'||((x*7+y*3)%5===0&&x%2===0&&y%2===0)){g.fillStyle='#4d7c0f';K.rr(g,(W-cs*9)/2+x*cs+1,H*.1+y*cs+1,cs-2,cs-2,cs*.28);g.fill();g.fillStyle='#65a30d';K.rr(g,(W-cs*9)/2+x*cs+cs*.16,H*.1+y*cs+cs*.12,cs*.68,cs*.5,cs*.22);g.fill();}}
  ['12','18','7'].forEach((t,i)=>{const x=W*(.3+i*.2),y=H*.72;K.card(g,x-u*.8,y-u*.45,u*1.6,u*.9,u*.4,'#fff',{stroke:'#a16207',lw:3,blur:0,dy:0});K.txt(g,t,x,y,{size:u*.6,color:'#422006'});});
  K.emo(g,'🐹',W*.2+((T*.2)%1)*W*.6,H*.45,u*1.5);K.emo(g,'🐱',W*.8-((T*.17)%1)*W*.5,H*.3,u*1.3);}
const GAME={
  id:'mazehamster',title:'배수 미로 냠냠',title1:'산울타리 정원 미로',title2:'배수 미로 냠냠',emoji:LOGO,
  subtitle:'3~4학년 수학 · 곱셈구구 · 나눗셈',
  howto:'🐹 배고픈 햄스터를 움직여 <b>주문에 맞는 수</b>만 냠냠 먹어요. 방향 버튼을 누르거나 미로를 <b>쓱 밀어서</b> 방향을 바꿔요. 틀린 씨앗을 먹으면 점수가 깎이고, 🐱 고양이에게 잡히면 처음 자리로 돌아가요!',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:GRN,c2:ORG},hero:gkHero(hero),vignette:.03,durs:[90,120,180],levelTitle:'어떤 미로로 갈까요?',
  txt:{who:'누가 햄스터일까요?',dur:'게임 시간',pace:'고양이 속도',seat:'번 햄스터 ',go:'냠냠 시작!',s1:'1. 미로',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li><b>배수</b>는 어떤 수를 1배, 2배, 3배… 한 수예요. 곱셈구구의 ○단 수는 ○의 배수예요.</li>
    <li><b>나눗셈의 몫</b>은 똑같이 나누었을 때 한 묶음의 개수예요. 몫이 4이면 □÷○ = 4, 즉 □ = ○×4.</li>
    <li><b>나머지가 있는 나눗셈</b>: 나머지는 나누는 수보다 항상 작아요. 17÷5 = 3 … 2</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*1.05,pad=u*.4;const land=W>=H*1.15;const cols=9,rows=11;
    let mz,dp;const bs=Math.min(u*2.3,H*.13);
    if(land){const aw=W*.62,ah=H-top-pad;const cs=Math.floor(Math.min(aw/cols,ah/rows));mz={x:pad+(aw-cs*cols)/2,y:top+(ah-cs*rows)/2,cs};dp={cx:W-pad-(W-aw-pad*2)/2,cy:H*.6,bs:Math.min(bs,(W-aw)/4)};}
    else{const dh=bs*3+pad;const aw=W-pad*2,ah=H-top-pad-dh;const cs=Math.floor(Math.min(aw/cols,ah/rows));mz={x:(W-cs*cols)/2,y:top+(ah-cs*rows)/2,cs};dp={cx:W/2,cy:H-pad-bs*1.5,bs};}
    const b=dp.bs,g=b*.12;const btn={U:{x:dp.cx-b/2,y:dp.cy-b*1.5-g,w:b,h:b},D:{x:dp.cx-b/2,y:dp.cy+b*.5+g,w:b,h:b},L:{x:dp.cx-b*1.5-g,y:dp.cy-b/2,w:b,h:b},R:{x:dp.cx+b*.5+g,y:dp.cy-b/2,w:b,h:b}};
    return{W,H,u,top,pad,mz,btn,land};},
  init(p){const st=p.state;Object.assign(st,{T:0,stageNo:0,sw:null,clearT:0,press:null});this.newStage(p);},
  makeRule(p){const R=p.R;let L=p.levelId;if(L==='mix')L=R.pick(['2-2','3-1','3-2']);const good=[],bad=[];
    if(L==='2-2'){const k=R.int(3,9);R.shuffle([1,2,3,4,5,6,7,8,9]).slice(0,6).forEach(m=>good.push({t:String(k*m),v:k*m}));const pool=new Set();for(let m=1;m<=9;m++)[k*m-1,k*m+1,k*m+2].forEach(x=>{if(x>1&&x%k)pool.add(x);});for(let a=2;a<=9;a++)for(let b=2;b<=9;b++)if((a*b)%k)pool.add(a*b);
      R.shuffle([...pool]).slice(0,8).forEach(x=>bad.push({t:String(x),v:x}));return{L,order:'🎯 <b>'+k+'단</b> 수만 냠냠!',sub:k+'×1, '+k+'×2, … '+k+'×9 의 곱',good,bad,why:x=>x+'는 '+k+'단 수가 아니에요 ('+k+'×'+Math.floor(x/k)+'='+k*Math.floor(x/k)+')'};}
    if(L==='3-1'){const q=R.int(2,9);R.shuffle([2,3,4,5,6,7,8,9]).slice(0,6).forEach(b=>good.push({t:b*q+'÷'+b,v:q}));for(let k=0;k<8;k++){const b=R.int(2,9);let qq=q+R.pick([-2,-1,1,2]);if(qq<1)qq=q+1;bad.push({t:b*qq+'÷'+b,v:qq});}
      return{L,order:'🎯 몫이 <b>'+q+'</b>인 나눗셈만 냠냠!',sub:'',good,bad,why:(x,s)=>s.t+'의 몫은 '+x+'예요 (몫 '+q+' 아님)'};}
    const d=R.int(3,7),r=R.int(1,d-1);R.shuffle([2,3,4,5,6,7,8,9]).slice(0,6).forEach(m=>good.push({t:String(d*m+r),v:d*m+r}));for(let k=0;k<8;k++){const m=R.int(2,9);let rr=R.int(0,d-1);if(rr===r)rr=(r+1)%d;bad.push({t:String(d*m+rr),v:d*m+rr});}
    return{L,order:'🎯 <b>'+d+'</b>로 나누면 나머지가 <b>'+r+'</b>!',sub:'나머지는 나누는 수보다 작아요',good,bad,why:x=>x+'÷'+d+' = '+Math.floor(x/d)+' … '+x%d+' (나머지 '+r+' 아님)'};},
  newStage(p){const st=p.state,R=p.R;st.maze=MAZES[st.stageNo%MAZES.length];st.stageNo++;st.rule=this.makeRule(p);p.ask(st.rule.order,st.rule.sub);
    const cells=[];st.maze.forEach((row,y)=>[...row].forEach((c,x)=>{if(c==='.'&&!(y>=8&&x>=3&&x<=5)&&!((x===1||x===7)&&y===1))cells.push([x,y]);}));
    const spots=R.shuffle(cells);const items=[...st.rule.good.map(s=>({...s,ok:true})),...st.rule.bad.map(s=>({...s,ok:false}))];st.seeds=items.map((s,k)=>({...s,x:spots[k][0],y:spots[k][1],alive:true}));
    st.pl={x:4,y:9,dir:null,want:null,spd:4.2,face:1,inv:1.2,yuck:0};const cspd=Math.min(3.5,2.5+.25*(st.stageNo-1))*Math.min(1.25,p.pace);st.cats=[{x:1,y:1,dir:null,spd:cspd},{x:7,y:1,dir:null,spd:cspd*.92}];st.clearT=0;},
  open(st,x,y){return st.maze[y]&&st.maze[y][x]==='.';},
  adv(st,e,dist,onC){let guard=0;while(dist>1e-6&&guard++<20){const atC=Math.abs(e.x-Math.round(e.x))<1e-6&&Math.abs(e.y-Math.round(e.y))<1e-6;if(atC){e.x=Math.round(e.x);e.y=Math.round(e.y);onC(e);if(!e.dir)return;}
      const [dx,dy]=e.dir;let rem;if(atC)rem=1;else rem=dx>0?Math.ceil(e.x)-e.x:dx<0?e.x-Math.floor(e.x):dy>0?Math.ceil(e.y)-e.y:e.y-Math.floor(e.y);const d=Math.min(dist,rem);e.x+=dx*d;e.y+=dy*d;if(rem-d<1e-6){e.x=Math.round(e.x);e.y=Math.round(e.y);}dist-=d;}},
  key(p,d){const st=p.state,pl=st.pl;if(!pl||st.clearT>0)return;pl.want=d;const o=DIRS[d];if(pl.dir&&pl.dir[0]===-o[0]&&pl.dir[1]===-o[1])pl.dir=o;st.press={d,t:.12};},
  sc(p,x,y){const G=this.geo(p);return{x:G.mz.x+(x+.5)*G.mz.cs,y:G.mz.y+(y+.5)*G.mz.cs};},
  update(p,dt){const st=p.state,pl=st.pl;st.T+=dt;if(st.press){st.press.t-=dt;if(st.press.t<=0)st.press=null;}
    if(st.clearT>0){st.clearT-=dt;if(st.clearT<=0)this.newStage(p);return;}
    pl.inv=Math.max(0,pl.inv-dt);pl.yuck=Math.max(0,pl.yuck-dt);
    this.adv(st,pl,pl.spd*dt,e=>{if(e.want){const o=DIRS[e.want];if(this.open(st,e.x+o[0],e.y+o[1]))e.dir=o;}if(e.dir&&!this.open(st,e.x+e.dir[0],e.y+e.dir[1]))e.dir=null;});if(pl.dir&&pl.dir[0])pl.face=pl.dir[0];
    st.cats.forEach(c=>{this.adv(st,c,c.spd*dt,e=>{const opts=Object.values(DIRS).filter(o=>this.open(st,e.x+o[0],e.y+o[1]));const back=e.dir?opts.filter(o=>!(o[0]===-e.dir[0]&&o[1]===-e.dir[1])):opts;const ch=back.length?back:opts;
      if(p.R.f()<.6){ch.sort((a,b)=>Math.hypot(e.x+a[0]-pl.x,e.y+a[1]-pl.y)-Math.hypot(e.x+b[0]-pl.x,e.y+b[1]-pl.y));e.dir=ch[0];}else e.dir=ch[Math.floor(p.R.f()*ch.length)];});});
    st.seeds.forEach(s=>{if(!s.alive)return;if(Math.abs(s.x-pl.x)+Math.abs(s.y-pl.y)<.4){s.alive=false;const P=this.sc(p,s.x,s.y);
      if(s.ok){p.hit(true,{pts:10,x:P.x,y:P.y});}else{p.hit(false,{pen:5,x:P.x,y:P.y,tip:st.rule.why(s.v,s),tipMs:1800,review:st.rule.order.replace(/<[^>]+>/g,'')+' → '+st.rule.why(s.v,s)});pl.yuck=.8;}}});
    if(!st.seeds.some(s=>s.ok&&s.alive)){const P=this.sc(p,pl.x,pl.y);p.add(20,P.x,P.y);p.tip('🎉 미로 통과! +20','good',1200);st.clearT=1.3;return;}
    if(!pl.inv&&st.cats.some(c=>Math.hypot(c.x-pl.x,c.y-pl.y)<.6)){const P=this.sc(p,pl.x,pl.y);p.add(-10,P.x,P.y);p.tip('🐱 잡혔어요! 처음 자리로','bad',1100);Object.assign(pl,{x:4,y:9,dir:null,want:null,inv:2});st.cats[0].x=1;st.cats[0].y=1;st.cats[1].x=7;st.cats[1].y=1;st.cats.forEach(c=>c.dir=null);}},
  down(p,x,y){const st=p.state,G=this.geo(p);for(const d of 'UDLR'){if(K.inRect(x,y,G.btn[d])){this.key(p,d);return;}}st.sw={x,y};},
  move(p,x,y){const st=p.state;if(!st.sw)return;const dx=x-st.sw.x,dy=y-st.sw.y;if(Math.hypot(dx,dy)>18){this.key(p,Math.abs(dx)>Math.abs(dy)?(dx>0?'R':'L'):(dy>0?'D':'U'));st.sw={x,y};}},
  up(p){p.state.sw=null;},
  botAct(p){const st=p.state,pl=st.pl;if(!pl||st.clearT>0)return null;const sx=Math.round(pl.x),sy=Math.round(pl.y);const goal=new Set(st.seeds.filter(s=>s.ok&&s.alive).map(s=>s.x+','+s.y));
    const prev={};const q=[[sx,sy]];prev[sx+','+sy]=null;let hit=null;while(q.length){const [x,y]=q.shift();if(goal.has(x+','+y)){hit=[x,y];break;}for(const [d,o] of Object.entries(DIRS)){const nx=x+o[0],ny=y+o[1],k=nx+','+ny;if(this.open(st,nx,ny)&&!(k in prev)){prev[k]=[x,y,d];q.push([nx,ny]);}}}
    if(hit){let cur=hit,dir=null;while(prev[cur[0]+','+cur[1]]){const pv=prev[cur[0]+','+cur[1]];dir=pv[2];cur=[pv[0],pv[1]];}if(dir){pl.want=dir;}}return null;},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,M=G.mz,cs=M.cs;if(!st.maze)return;
    g.fillStyle='#d9f99d';g.fillRect(0,0,W,H);
    K.card(g,M.x-u*.2,M.y-u*.2,cs*9+u*.4,cs*11+u*.4,u*.3,'#fef9c3',{stroke:'#4d6a12',lw:Math.max(3,u*.08),blur:0,dy:u*.06,sc:'#3a5010'});
    st.maze.forEach((row,y)=>[...row].forEach((c,x)=>{if(c!=='#')return;g.fillStyle='#4d7c0f';K.rr(g,M.x+x*cs+1,M.y+y*cs+1,cs-2,cs-2,cs*.28);g.fill();g.fillStyle='#65a30d';K.rr(g,M.x+x*cs+cs*.16,M.y+y*cs+cs*.12,cs*.68,cs*.5,cs*.22);g.fill();}));
    st.seeds.forEach(s=>{if(!s.alive)return;const cx=M.x+(s.x+.5)*cs,cy=M.y+(s.y+.5)*cs;g.font=K.font(Math.max(11,cs*.42));const tw=Math.min(cs*1.08,Math.max(cs*.62,g.measureText(s.t).width+cs*.2));
      g.fillStyle='#fff';g.strokeStyle='#a16207';g.lineWidth=2;K.rr(g,cx-tw/2,cy-cs*.27,tw,cs*.54,cs*.27);g.fill();g.stroke();K.txt(g,s.t,cx,cy+1,{size:Math.max(11,cs*.42),color:'#422006',maxW:tw-4});});
    st.cats.forEach(c=>K.emo(g,'🐱',M.x+(c.x+.5)*cs,M.y+(c.y+.52)*cs,cs*.85));
    const pl=st.pl;if(!(pl.inv>0&&Math.floor(pl.inv*8)%2)){g.save();g.translate(M.x+(pl.x+.5)*cs,M.y+(pl.y+.52)*cs);if(pl.face<0)g.scale(-1,1);K.emo(g,pl.yuck>0?'🤢':'🐹',0,0,cs*.9);g.restore();}
    K.card(g,u*.3,(p.top||0)+u*.15,u*4.2,u*.7,u*.2,'rgba(255,254,240,.95)',{stroke:'#4d6a12',lw:2,blur:0,dy:0});K.txt(g,'남은 정답 '+st.seeds.filter(s=>s.ok&&s.alive).length+'개',u*.3+u*2.1,(p.top||0)+u*.5,{size:u*.42,color:INK,maxW:u*4});
    for(const d of 'UDLR'){const b=G.btn[d];const on=st.press&&st.press.d===d;K.rr(g,b.x,b.y,b.w,b.h,b.w*.25);g.fillStyle=on?ORG:'#fffef0';g.fill();g.lineWidth=3;g.strokeStyle='#4d6a12';g.stroke();K.txt(g,{U:'▲',D:'▼',L:'◀',R:'▶'}[d],b.x+b.w/2,b.y+b.h/2,{size:b.w*.45,color:INK});}
  },
};
Engine.boot(GAME);
