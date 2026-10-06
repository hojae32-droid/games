/* ============ math helpers ============ */
const divisors=n=>{const r=[];for(let i=1;i<=n;i++) if(n%i===0) r.push(i);return r;};
const gcd=(a,b)=>b?gcd(b,a%b):a;
const lcm=(a,b)=>a*b/gcd(a,b);
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const batchim=n=>[0,1,3,6,7,8].includes(n%10);
const eun=n=>n+(batchim(n)?'은':'는');
const wa=n=>n+(batchim(n)?'과':'와');
const qr=(a,b)=>`${a} ÷ ${b} = ${Math.floor(a/b)}${a%b?` … ${a%b}`:''}`;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function uniq(cands,exclude,count){
  const used=new Set(exclude),out=[];
  for(const c of shuffle(cands)){ if(out.length>=count) break; if(c<1||used.has(c)) continue; used.add(c); out.push(c); }
  return out;
}

/* ============ stages & problems ============ */
const STAGES=[
  {icon:'🔍',title:'약수 뽑기',rounds:['20 이하 수의 약수','40 이하 수의 약수','약수가 많은 큰 수']},
  {icon:'📈',title:'배수 뽑기',rounds:['2~5의 배수','6~9의 배수','두 자리 수의 배수']},
  {icon:'🤝',title:'공약수 · 최대공약수',rounds:['작은 두 수의 공약수','큰 두 수의 공약수','최대공약수 딱 하나']},
  {icon:'🚀',title:'공배수 · 최소공배수',rounds:['작은 두 수의 공배수','큰 두 수의 공배수','최소공배수 딱 하나']},
];
function makeProblem(s,r){ return [pFactor,pMultiple,pGcf,pLcm][s](r); }

function pFactor(r){
  const pools=[[6,8,9,10,12,14,15,16,18,20],[22,24,26,27,28,30,32,33,34,35,38,39,40],[42,44,45,50,52,54,56,63,64,66,70]];
  const n=pick(pools[r]);
  const t=divisors(n);
  const cands=[];for(let i=2;i<=n+6;i++) if(n%i) cands.push(i);
  const dec=uniq(cands,t,clamp(12-t.length,4,6));
  const pairs=t.filter(x=>x*x<=n).map(x=>[x,n/x]);
  return {kind:'factor',n,pairs,finale:false,mission:`${n}의 약수 인형을 모두 뽑아라!`,sub:`${n}의 약수 인형이 ${t.length}개 숨어 있어요. 짝꿍 약수를 이어서 뽑으면 보너스!`,slotLabel:`${n}의 약수 짝꿍`,
    targets:t,decoys:dec,coins:t.length+3,
    right:v=>v*v===n?`${v} × ${v} = ${n} → ${eun(v)} ${n}의 약수!`:`${v} × ${n/v} = ${n} → ${wa(v)} ${eun(n/v)} ${n}의 짝꿍 약수!`,
    wrong:v=>v>n?`${eun(v)} ${n}보다 커서 ${n}의 약수가 될 수 없어요.`:`${qr(n,v)} → 나누어떨어지지 않아요.`};
}
function pMultiple(r){
  const cfg=[{ns:[2,3,4,5],max:50,k:4},{ns:[6,7,8,9],max:90,k:5},{ns:[11,12,13,15,25],max:150,k:5}][r];
  const n=pick(cfg.ns);
  const mults=[];for(let m=n;m<=cfg.max;m+=n) mults.push(m);
  const t=shuffle(mults).slice(0,cfg.k).sort((a,b)=>a-b);
  const cands=[];
  for(const m of mults) for(const d of [-2,-1,1,2]){const v=m+d;if(v>0&&v<=cfg.max&&v%n) cands.push(v);}
  const dec=uniq(cands,mults,7);
  return {kind:'multiple',finale:false,mission:`${n}의 배수 인형을 모두 뽑아라!`,sub:`기계 안에 ${n}의 배수 인형이 ${t.length}개 숨어 있어요.`,slotLabel:`${n}의 배수`,
    targets:t,decoys:dec,coins:t.length+3,
    right:v=>`${n} × ${v/n} = ${v} → ${eun(v)} ${n}의 배수!`,
    wrong:v=>`${qr(v,n)} → ${eun(v)} ${n}의 배수가 아니에요.`};
}
function pGcf(r){
  const P1=[[6,9],[8,12],[10,15],[12,16],[9,12],[6,8],[10,14],[12,15],[12,18],[8,20]];
  const P2=[[18,24],[24,36],[16,24],[20,30],[18,27],[30,45],[24,32],[28,42],[36,48],[30,42],[24,40]];
  const [a,b]=pick(r===0?P1:P2);
  const da=divisors(a),db=divisors(b),common=da.filter(x=>db.includes(x)),g=gcd(a,b);
  const onlyOne=[...new Set([...da,...db])].filter(x=>!common.includes(x));
  const others=[];for(let i=2;i<=Math.max(a,b);i++) if(a%i&&b%i) others.push(i);
  const notBoth=v=>{const ia=a%v===0,ib=b%v===0;
    if(ia&&!ib) return `${eun(v)} ${a}의 약수지만 ${b}의 약수는 아니에요.`;
    if(ib&&!ia) return `${eun(v)} ${b}의 약수지만 ${a}의 약수는 아니에요.`;
    return `${eun(v)} ${wa(a)} ${b} 어느 쪽의 약수도 아니에요.`;};
  const both=v=>`${a} ÷ ${v} = ${a/v}, ${b} ÷ ${v} = ${b/v}`;
  if(r<2){
    const want=clamp(12-common.length,5,7);
    const d1=uniq(onlyOne,common,Math.min(5,want));
    const d2=uniq(others,[...common,...d1],want-d1.length);
    return {kind:'venn',a,b,g,da,db,common,onlyOne,finale:false,mission:`${wa(a)} ${b}의 공약수 인형을 모두 뽑아라!`,sub:`공약수 인형이 ${common.length}개 숨어 있어요. 뽑은 인형은 알맞은 칸으로 들어가요.`,slotLabel:`${wa(a)} ${b}의 공약수`,
      targets:common,decoys:[...d1,...d2],coins:common.length+3,right:v=>`${both(v)} → 공약수!`,wrong:notBoth};
  }
  const wrongCommon=common.filter(x=>x!==g);
  const d2=uniq([...onlyOne,a,b],[g,...wrongCommon],Math.max(3,8-wrongCommon.length));
  return {kind:'gcf',finale:true,mission:`${wa(a)} ${b}의 최대공약수 인형을 딱 하나 뽑아라!`,sub:'코인 3개! 공약수 중에서 가장 큰 수를 찾아요.',slotLabel:'최대공약수',
    targets:[g],decoys:[...wrongCommon,...d2],coins:3,
    right:v=>`${both(v)} → 최대공약수는 ${v}!`,
    wrong:v=>common.includes(v)?`${eun(v)} 공약수지만 가장 큰 공약수는 아니에요.`:notBoth(v)};
}
function pLcm(r){
  const P1=[[2,3],[3,4],[2,5],[4,6],[3,5],[4,5],[2,7],[4,10]];
  const P2=[[6,8],[8,12],[6,9],[10,15],[9,12],[12,18],[6,10],[8,10],[4,6]];
  const [a,b]=pick(r===0?P1:P2);
  const L=lcm(a,b);
  const notBoth=v=>{const ia=v%a===0,ib=v%b===0;
    if(ia&&!ib) return `${eun(v)} ${a}의 배수지만 ${b}의 배수는 아니에요.`;
    if(ib&&!ia) return `${eun(v)} ${b}의 배수지만 ${a}의 배수는 아니에요.`;
    return `${eun(v)} ${wa(a)} ${b} 어느 쪽의 배수도 아니에요.`;};
  const both=v=>`${v} ÷ ${a} = ${v/a}, ${v} ÷ ${b} = ${v/b}`;
  if(r<2){
    const k=r===0?4:3,range=L*k;
    const t=[];for(let i=1;i<=k;i++) t.push(L*i);
    const one=[];for(let m=a;m<=range;m+=a) if(m%b) one.push(m);for(let m=b;m<=range;m+=b) if(m%a) one.push(m);
    const d1=uniq(one,t,6);
    const rest=[];for(let i=2;i<=range;i++) if(i%a&&i%b) rest.push(i);
    const d2=uniq(rest,[...t,...d1],Math.max(0,7-d1.length));
    return {kind:'cmul',finale:false,mission:`${wa(a)} ${b}의 공배수 인형을 모두 뽑아라!`,sub:`${range} 이하의 공배수 인형이 ${k}개 숨어 있어요.`,slotLabel:`${wa(a)} ${b}의 공배수`,
      targets:t,decoys:[...d1,...d2],coins:k+3,right:v=>`${both(v)} → 공배수!`,wrong:notBoth};
  }
  const trap=[L*2,L*3];if(a*b!==L) trap.push(a*b);
  const one=[];for(let m=a;m<=L*3;m+=a) if(m%b) one.push(m);for(let m=b;m<=L*3;m+=b) if(m%a) one.push(m);
  const tr=[...new Set(trap)].filter(x=>x!==L);
  const d2=uniq(one,[L,...tr],8-tr.length);
  return {kind:'lcm',finale:true,mission:`${wa(a)} ${b}의 최소공배수 인형을 딱 하나 뽑아라!`,sub:'코인 3개! 공배수 중에서 가장 작은 수를 찾아요.',slotLabel:'최소공배수',
    targets:[L],decoys:[...tr,...d2],coins:3,
    right:v=>`${both(v)} → 최소공배수는 ${v}!`,
    wrong:v=>v%L===0?(v===a*b?`${eun(v)} 두 수의 곱이에요. 공배수지만 가장 작은 공배수는 아니에요.`:`${eun(v)} 공배수지만 가장 작은 공배수는 아니에요.`):notBoth(v)};
}
function answerLine(P){
  if(P.kind==='factor') return `<b>${P.n}의 약수 짝꿍</b>${P.pairs.map(([x,y])=>`${x} × ${y}`).join(', ')}`;
  return `<b>${P.slotLabel}</b>${[...P.targets].sort((a,b)=>a-b).join(', ')}`;
}


const W=720,H=520,RAIL_Y=72,FLOOR_Y=488,DIV_X=162,DIV_TOP=380,LEFT_WALL=22,RIGHT_WALL=698,HOME_X=92,MIN_X=92,MAX_X=666,ROPE_MIN=24,POS_TIME=15,ROUND_TIME=150;
const DOLL_TYPES=[
  {id:'bear',name:'갈색 곰',body:'#c68a5b',belly:'#f2d6b8',ear:'round',inner:'#efb994',w:10},
  {id:'rabbit',name:'토끼',body:'#f6f1fb',belly:'#ffe0ec',ear:'long',inner:'#ffb3cc',w:10},
  {id:'cat',name:'고양이',body:'#f8a64c',belly:'#ffe3c2',ear:'tri',inner:'#ffcf9a',w:10},
  {id:'chick',name:'병아리',body:'#ffd84d',belly:'#fff2ad',ear:'tuft',inner:'#ff9f1c',w:10},
  {id:'frog',name:'개구리',body:'#7bd46a',belly:'#dcf6cc',ear:'frog',inner:'#fff',w:10},
  {id:'pig',name:'꿀꿀이',body:'#ff9fbd',belly:'#ffd6e2',ear:'pig',inner:'#ff7aa0',w:9},
  {id:'bluebear',name:'파랑 곰',body:'#6fa8ff',belly:'#dcebff',ear:'round',inner:'#b9d4ff',w:7},
  {id:'hamster',name:'햄스터',body:'#f3d3a0',belly:'#fff6e6',ear:'hamster',inner:'#f7b6a8',w:5},
  {id:'penguin',name:'펭귄',body:'#3a4766',belly:'#ffffff',ear:'none',inner:'#ffb02e',w:3},
  {id:'panda',name:'판다',body:'#ffffff',belly:'#f1f1f4',ear:'panda',inner:'#2a2a33',w:2},
];
const GOLD_TYPE={id:'gold',name:'황금 인형',body:'#ffc928',belly:'#fff1a6',ear:'round',inner:'#ffa600',gold:true};
const DEX_LIST=[...DOLL_TYPES,GOLD_TYPE];
function pickWeighted(list){let t=list.reduce((s,x)=>s+x.w,0),r=Math.random()*t;for(const x of list){r-=x.w;if(r<=0) return x;}return list[0];}
const stars=Array.from({length:46},()=>({x:Math.random()*W,y:Math.random()*(FLOOR_Y-90)+80,r:Math.random()*1.6+.4,p:Math.random()*6}));

const KEYSETS={
  1:[{l:['ArrowLeft','KeyA'],r:['ArrowRight','KeyD'],d:['Space','ArrowDown','KeyS','Enter','NumpadEnter'],hint:'키보드: ← → 이동 · 스페이스 뽑기'}],
  2:[{l:['KeyA'],r:['KeyD'],d:['KeyS','KeyW'],hint:'키보드: A ◀ · D ▶ · S 뽑기'},{l:['ArrowLeft'],r:['ArrowRight'],d:['ArrowDown','ArrowUp'],hint:'키보드: ← ◀ · → ▶ · ↓ 뽑기'}],
  3:[{l:['KeyA'],r:['KeyD'],d:['KeyS','KeyW'],hint:'키보드: A ◀ · D ▶ · S 뽑기'},{l:['KeyJ'],r:['KeyL'],d:['KeyK','KeyI'],hint:'키보드: J ◀ · L ▶ · K 뽑기'},{l:['ArrowLeft'],r:['ArrowRight'],d:['ArrowDown','ArrowUp'],hint:'키보드: ← ◀ · → ▶ · ↓ 뽑기'}],
  4:[{l:['KeyA'],r:['KeyD'],d:['KeyS','KeyW'],hint:'키보드: A ◀ · D ▶ · S 뽑기'},{l:['KeyJ'],r:['KeyL'],d:['KeyK','KeyI'],hint:'키보드: J ◀ · L ▶ · K 뽑기'},{l:['ArrowLeft'],r:['ArrowRight'],d:['ArrowDown','ArrowUp'],hint:'키보드: ← ◀ · → ▶ · ↓ 뽑기'},{l:['Numpad4','Digit4'],r:['Numpad6','Digit6'],d:['Numpad5','Digit5'],hint:'키보드: 4 ◀ · 6 ▶ · 5 뽑기'}],
};


/* ============ physics ============ */
function stepPhysics(m,h){
  const dolls=m.dolls,claw=m.claw;
  for(const d of dolls){
    if(d.gone) continue;
    if(d.held){d.x=claw.x+claw.sway;d.y=RAIL_Y+claw.rope+54;d.vx=d.vy=0;continue;}
    d.vy+=1500*h;d.vx*=.998;d.x+=d.vx*h;d.y+=d.vy*h;
  }
  for(let it=0;it<3;it++){
    for(let i=0;i<dolls.length;i++){const a=dolls[i];if(a.gone) continue;
      for(let j=i+1;j<dolls.length;j++){const b=dolls[j];if(b.gone||(a.held&&b.held)) continue;
        const dx=b.x-a.x,dy=b.y-a.y,dist=Math.hypot(dx,dy)||.01,min=a.r+b.r-3;
        if(dist<min){const nx=dx/dist,ny=dy/dist,ov=min-dist,wA=a.held?0:(b.held?1:.5),wB=b.held?0:(a.held?1:.5);
          a.x-=nx*ov*wA;a.y-=ny*ov*wA;b.x+=nx*ov*wB;b.y+=ny*ov*wB;
          const rv=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;
          if(rv<0){const imp=-rv*1.05;a.vx-=imp*nx*wA;a.vy-=imp*ny*wA;b.vx+=imp*nx*wB;b.vy+=imp*ny*wB;}
        }
      }
    }
    for(const d of dolls) if(!d.gone&&!d.held) bounds(d);
  }
  for(const d of dolls){
    if(!d.gone&&!d.held&&d.x<DIV_X&&d.y-d.r>H){ if(claw.state==='idle'||m.done) d.gone=true; else judge(m,d); }
  }
}
function bounds(d){
  if(d.x+d.r>RIGHT_WALL){d.x=RIGHT_WALL-d.r;if(d.vx>0) d.vx*=-.2;}
  if(d.x-d.r<LEFT_WALL){d.x=LEFT_WALL+d.r;if(d.vx<0) d.vx*=-.2;}
  if(d.y>DIV_TOP){
    if(d.x>=DIV_X){if(d.x-d.r<DIV_X+5){d.x=DIV_X+5+d.r;if(d.vx<0) d.vx*=-.2;}}
    else if(d.x+d.r>DIV_X-5){d.x=DIV_X-5-d.r;if(d.vx>0) d.vx*=-.2;}
  } else {
    const dx=d.x-DIV_X,dy=d.y-DIV_TOP,dist=Math.hypot(dx,dy);
    if(dist<d.r+5&&dist>.01){const nx=dx/dist,ny=dy/dist;d.x+=nx*(d.r+5-dist);d.y+=ny*(d.r+5-dist);
      const rv=d.vx*nx+d.vy*ny;if(rv<0){d.vx-=rv*1.2*nx;d.vy-=rv*1.2*ny;}}
  }
  if(d.x>=DIV_X&&d.y+d.r>FLOOR_Y){d.y=FLOOR_Y-d.r;if(d.vy>0) d.vy=d.vy>90?-d.vy*.15:0;d.vx*=.85;}
}


function makeQuiz(s){
  let q,ans,opts=[];
  if(s===0){
    const n=pick([12,18,20,24,28,30,32,36,40,45]);ans=divisors(n).length;q=`${n}의 약수는 모두 몇 개일까요?`;
    opts=[ans,ans+1,ans-1,ans+2];
  } else if(s===1){
    const k=pick([3,4,6,7,8,9]),mm=k*(3+Math.floor(Math.random()*8));ans=mm;q=`다음 중 ${k}의 배수는?`;
    opts=[mm,...[mm+1,mm-1,mm+2,mm-2,mm+3].filter(x=>x%k)];
  } else if(s===2){
    const [a,b]=pick([[12,18],[16,24],[18,24],[20,30],[24,36],[18,27],[30,45],[28,42],[36,48]]);
    const g=gcd(a,b),com=divisors(g);ans=g;q=`${wa(a)} ${b}의 최대공약수는?`;
    opts=[g,...com.filter(x=>x!==g&&x!==1).reverse(),g*2,Math.min(a,b)];
  } else {
    const [a,b]=pick([[4,6],[6,8],[8,12],[6,9],[10,15],[9,12],[6,10],[8,10],[4,10]]);
    const L=lcm(a,b);ans=L;q=`${wa(a)} ${b}의 최소공배수는?`;
    opts=[L,a*b,L*2,L+Math.min(a,b),Math.max(a,b)];
  }
  opts=[...new Set(opts.filter(x=>x>0))];
  for(let k=3;opts.length<4;k++) if(!opts.includes(ans+k)) opts.push(ans+k);
  return {q,ans,opts:shuffle([ans,...opts.filter(x=>x!==ans).slice(0,3)])};
}

/* ============ rendering ============ */
let ctx=null;
function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
function circ(x,y,r){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
function ell(x,y,rx,ry,rot=0){ctx.beginPath();ctx.ellipse(x,y,rx,ry,rot,0,Math.PI*2);ctx.fill();}
function star(x,y,r){ctx.beginPath();for(let k=0;k<8;k++){const a=k*Math.PI/4,q=k%2?r*.38:r;ctx.lineTo(x+Math.cos(a)*q,y+Math.sin(a)*q);}ctx.closePath();ctx.fill();}

function drawBackground(t){
  const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#3d1c80');g.addColorStop(1,'#170a3c');
  ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  ctx.fillStyle='rgba(255,255,255,.035)';
  for(let x=60;x<W;x+=120) ctx.fillRect(x,0,40,H);
  for(const s of stars){ctx.globalAlpha=.35+.35*Math.sin(t*2+s.p);ctx.fillStyle='#fff';circ(s.x,s.y,s.r);}
  ctx.globalAlpha=1;
  const cg=ctx.createLinearGradient(0,DIV_TOP,0,H);cg.addColorStop(0,'#241050');cg.addColorStop(1,'#050210');
  ctx.fillStyle=cg;ctx.fillRect(LEFT_WALL,DIV_TOP,DIV_X-LEFT_WALL,H-DIV_TOP);
  ctx.fillStyle='#ffd23f';ctx.font='20px Jua, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText('상품 출구',(LEFT_WALL+DIV_X)/2,DIV_TOP+28);
  ctx.fillText('▼',(LEFT_WALL+DIV_X)/2,DIV_TOP+52);
  ctx.fillStyle='#8a2f94';ctx.fillRect(DIV_X,FLOOR_Y,RIGHT_WALL-DIV_X,H-FLOOR_Y);
  ctx.fillStyle='rgba(255,255,255,.12)';
  for(let x=DIV_X+10;x<RIGHT_WALL;x+=18) for(let y=FLOOR_Y+8;y<H;y+=12) circ(x+((y/12)%2)*9,y,1.6);
  ctx.fillStyle='#2b1257';ctx.fillRect(0,0,LEFT_WALL,H);ctx.fillRect(RIGHT_WALL,0,W-RIGHT_WALL,H);
}
function drawDivider(){
  ctx.fillStyle='rgba(200,230,255,.28)';ctx.fillRect(DIV_X-5,DIV_TOP,10,H-DIV_TOP);
  ctx.fillStyle='#ff9cc6';rr(DIV_X-8,DIV_TOP-5,16,10,4);ctx.fill();
}
function drawDoll(d){
  const T=d.type,r=d.r,t=NOWS;
  ctx.save();ctx.translate(d.x,d.y);
  if(d.glow){const p=.5+.5*Math.sin(t*7);ctx.strokeStyle=`rgba(255,210,63,${.45+.55*p})`;ctx.lineWidth=5;ctx.beginPath();ctx.arc(0,0,r+7+p*3,0,Math.PI*2);ctx.stroke();}
  if(T.gold){ctx.shadowColor='rgba(255,210,63,.95)';ctx.shadowBlur=18+6*Math.sin(t*4);}
  ctx.fillStyle=T.body;
  if(T.ear==='round'){circ(-19,-21,10);circ(19,-21,10);ctx.shadowBlur=0;ctx.fillStyle=T.inner;circ(-19,-21,5);circ(19,-21,5);}
  else if(T.ear==='long'){ell(-11,-34,7,17,-.18);ell(11,-34,7,17,.18);ctx.fillStyle=T.inner;ell(-11,-34,3.5,12,-.18);ell(11,-34,3.5,12,.18);}
  else if(T.ear==='tri'||T.ear==='pig'){const s=T.ear==='pig'?.7:1;
    for(const k of [-1,1]){ctx.beginPath();ctx.moveTo(k*25,-10);ctx.lineTo(k*20,-10-26*s);ctx.lineTo(k*6,-25);ctx.closePath();ctx.fill();}
    ctx.fillStyle=T.inner;for(const k of [-1,1]){ctx.beginPath();ctx.moveTo(k*21,-14);ctx.lineTo(k*19,-10-18*s);ctx.lineTo(k*11,-23);ctx.closePath();ctx.fill();}}
  else if(T.ear==='tuft'){ell(0,-31,4,9,0);ell(-6,-29,3,7,-.6);ell(6,-29,3,7,.6);}
  else if(T.ear==='frog'){circ(-13,-24,10);circ(13,-24,10);}
  else if(T.ear==='hamster'){circ(-17,-22,8);circ(17,-22,8);ctx.fillStyle=T.inner;circ(-17,-22,4);circ(17,-22,4);}
  else if(T.ear==='panda'){ctx.fillStyle=T.inner;circ(-20,-21,10);circ(20,-21,10);}
  if(T.gold){ctx.shadowColor='rgba(255,210,63,.95)';ctx.shadowBlur=18+6*Math.sin(t*4);}
  ctx.fillStyle=T.body;circ(0,0,r);ctx.shadowBlur=0;
  ctx.strokeStyle=T.gold?'#e0a000':'rgba(0,0,0,.18)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle=T.belly;
  if(T.ear==='none') ell(0,6,r*.72,r*.7); else ell(0,9,r*.7,r*.55);
  if(T.ear==='frog'){ctx.fillStyle='#fff';circ(-13,-24,6);circ(13,-24,6);ctx.fillStyle='#2a1a2e';circ(-13,-24,3);circ(13,-24,3);}
  else if(T.ear==='panda'){ctx.fillStyle=T.inner;ell(-10,-9,6.5,8,.5);ell(10,-9,6.5,8,-.5);ctx.fillStyle='#fff';circ(-9,-10,2.4);circ(9,-10,2.4);ctx.fillStyle='#2a1a2e';circ(-9,-10,1.3);circ(9,-10,1.3);}
  else if(T.ear==='none'){ctx.fillStyle='#fff';circ(-9,-12,4.5);circ(9,-12,4.5);ctx.fillStyle='#1c1c28';circ(-9,-12,2.6);circ(9,-12,2.6);
    ctx.fillStyle=T.inner;ctx.beginPath();ctx.moveTo(-5,-5);ctx.lineTo(5,-5);ctx.lineTo(0,1);ctx.closePath();ctx.fill();}
  else {ctx.fillStyle='#2a1a2e';circ(-9,-10,3.2);circ(9,-10,3.2);ctx.fillStyle='#fff';circ(-8,-11,1.1);circ(10,-11,1.1);}
  ctx.fillStyle='rgba(255,120,150,.55)';
  if(T.ear==='hamster'){ell(-18,-2,7,5);ell(18,-2,7,5);} else {ell(-17,-3,5,3);ell(17,-3,5,3);}
  if(T.ear==='tuft'){ctx.fillStyle=T.inner;ctx.beginPath();ctx.moveTo(-4,-5);ctx.lineTo(4,-5);ctx.lineTo(0,0);ctx.closePath();ctx.fill();}
  if(T.ear==='pig'){ctx.fillStyle=T.inner;ell(0,-3,6,4);}
  if(T.gold){ctx.fillStyle='#fff';const k=.6+.4*Math.sin(t*5);star(-24,-30,5*k);star(26,-6,4*(1.4-k));star(-6,-36,3.5);}
  if(d.v!=null){
    const txt=String(d.v),bw=16+txt.length*12;
    ctx.fillStyle=T.gold?'#fff7d1':'#fff';rr(-bw/2,2,bw,25,8);ctx.fill();
    ctx.strokeStyle=T.gold?'#e0a000':'rgba(60,30,90,.25)';ctx.lineWidth=1.5;ctx.stroke();
    ctx.fillStyle=T.gold?'#a06a00':'#2a1440';ctx.font='23px Jua, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(txt,0,15.5);
  }
  ctx.restore();
}
function drawClaw(c){
  const hx=c.x+c.sway,hy=RAIL_Y+c.rope;
  ctx.fillStyle='#b9bfd0';ctx.fillRect(LEFT_WALL,RAIL_Y-12,RIGHT_WALL-LEFT_WALL,7);
  ctx.fillStyle='#8a90a4';ctx.fillRect(LEFT_WALL,RAIL_Y-5,RIGHT_WALL-LEFT_WALL,2);
  ctx.fillStyle='#e7e9f1';rr(c.x-24,RAIL_Y-18,48,16,5);ctx.fill();
  ctx.fillStyle='#ff4f9a';circ(c.x,RAIL_Y-10,3.5);
  ctx.strokeStyle='#d8dce8';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(c.x,RAIL_Y-2);ctx.lineTo(hx,hy);ctx.stroke();
  const th=-.3+c.arm*.9;
  ctx.strokeStyle='#cfd4e2';ctx.lineWidth=6;ctx.lineCap='round';ctx.lineJoin='round';
  for(const s of [-1,1]){
    const px=hx+s*11,py=hy+20,kx=px+s*Math.sin(th)*24,ky=py+Math.cos(th)*24,tx=kx-s*Math.sin(.75)*17,ty=ky+Math.cos(.75)*17;
    ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(kx,ky);ctx.lineTo(tx,ty);ctx.stroke();
  }
  ctx.strokeStyle='#9aa1b6';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(hx,hy+20);ctx.lineTo(hx,hy+38-c.arm*4);ctx.stroke();
  const hg=ctx.createLinearGradient(hx-20,0,hx+20,0);hg.addColorStop(0,'#aab0c2');hg.addColorStop(.5,'#f3f4f8');hg.addColorStop(1,'#9097ab');
  ctx.fillStyle=hg;rr(hx-20,hy,40,23,7);ctx.fill();
  ctx.fillStyle=c.state==='ready'?'#3ee08a':'#ff4f9a';circ(hx,hy+11,4);
}
function drawGlass(){
  ctx.fillStyle='rgba(255,255,255,.05)';
  ctx.beginPath();ctx.moveTo(430,0);ctx.lineTo(520,0);ctx.lineTo(300,H);ctx.lineTo(210,H);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(560,0);ctx.lineTo(585,0);ctx.lineTo(365,H);ctx.lineTo(340,H);ctx.closePath();ctx.fill();
}
function drawHud(m){
  const c=m.claw;
  ctx.textBaseline='middle';
  ctx.fillStyle='rgba(10,4,26,.6)';rr(LEFT_WALL+8,12,124,36,18);ctx.fill();
  ctx.fillStyle='#ffd23f';circ(LEFT_WALL+30,30,10);ctx.fillStyle='#b88a00';ctx.font='13px Jua, sans-serif';ctx.textAlign='center';ctx.fillText('₩',LEFT_WALL+30,31);
  ctx.font='22px Jua, sans-serif';ctx.textAlign='left';ctx.fillStyle='#fff';ctx.fillText(`코인 ${m.coins}`,LEFT_WALL+46,31);
  if(c.state==='ready'&&!m.quizOpen){
    const t=Math.ceil(c.posT),warn=c.posT<5;
    ctx.fillStyle='rgba(10,4,26,.6)';rr(RIGHT_WALL-150,12,142,36,18);ctx.fill();
    ctx.fillStyle=warn?'#ff5a6a':'#fff';ctx.textAlign='center';ctx.font='22px Jua, sans-serif';ctx.fillText(`⏱ ${t}초 안에!`,RIGHT_WALL-79,31);
    const sb=speedBonus(NOWS-c.readyAt);
    if(sb){ctx.fillStyle='rgba(10,4,26,.6)';rr(W/2-100,12,200,36,18);ctx.fill();ctx.fillStyle='#3ee08a';ctx.fillText(`⚡ 지금 뽑으면 +${sb}`,W/2+10,31);}
  }
}
function drawFloats(m,dt){
  ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='32px Jua, sans-serif';
  m.floats=m.floats.filter(f=>(f.life-=dt)>0);
  for(const f of m.floats){f.y-=34*dt;ctx.globalAlpha=Math.min(1,f.life*1.5);ctx.lineWidth=6;ctx.strokeStyle='rgba(20,6,40,.85)';ctx.strokeText(f.text,f.x,f.y);ctx.fillStyle=f.color;ctx.fillText(f.text,f.x,f.y);}
  ctx.globalAlpha=1;
}
