/* 5학년 · 약수와 배수 · 약분과 통분 — 약수·배수 두더지 잡기 (주문에 맞는 숫자 두더지만 뿅망치로 콩!)
   디자인: 칠판 주문서 + 잔디밭. 두더지가 숫자 팻말을 들고 나오고, 틀린 두더지는 "메롱~" 하며 놀려요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#3b2a14';
const N={comma:n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,','),gcd:(a,b)=>b?N.gcd(b,a%b):Math.abs(a),lcm:(a,b)=>a/N.gcd(a,b)*b,divs:n=>{const o=[];for(let k=1;k<=n;k++)if(n%k===0)o.push(k);return o;}};
function F(a,b,c){if(c==null)return `<span class="fr"><span class="fs"><i>${a}</i><i>${b}</i></span></span>`;return `<span class="fr">${a}<span class="fs"><i>${b}</i><i>${c}</i></span></span>`;}
const LOGO='<svg class="logo" viewBox="0 0 48 48"><ellipse cx="24" cy="30" rx="15" ry="13" fill="#8b5a3c" stroke="#3b2a14" stroke-width="3"/><circle cx="18" cy="26" r="2.4" fill="#fff"/><circle cx="30" cy="26" r="2.4" fill="#fff"/><path d="M21 31h6l-3 4z" fill="#f9a8d4" stroke="#3b2a14" stroke-width="1.5"/><path d="M33 6l9 9-6 6-9-9z" fill="#f59e0b" stroke="#3b2a14" stroke-width="2.5"/><path d="M30 14L14 30" stroke="#a16207" stroke-width="4" stroke-linecap="round"/></svg>';
const COLS=[['#8b5a3c','#d9b48f'],['#6b7280','#d1d5db'],['#a16207','#fde68a'],['#7c4a2d','#e8c4a0']];
/* 분수 그리기 (팻말 위) */
function frac(g,a,b,x,y,s,col){g.save();g.fillStyle=col;g.textAlign='center';g.textBaseline='middle';g.font=K.font(s*.8);g.fillText(a,x,y-s*.45);g.fillText(b,x,y+s*.5);g.fillRect(x-s*.5,y,s,Math.max(2,s*.09));g.restore();}
function moleDraw(g,s,look,mood,v,frc,t){/* 원점=몸 아래 가운데. 위로 그림 */
  const [c1,c2]=look;g.save();g.lineJoin='round';g.lineWidth=Math.max(2,s*.05);g.strokeStyle=INK;
  g.fillStyle=c1;g.beginPath();g.ellipse(0,-s*.45,s*.52,s*.62,0,0,TAU);g.fill();g.stroke();
  g.fillStyle=c2;g.beginPath();g.ellipse(0,-s*.3,s*.34,s*.4,0,0,TAU);g.fill();
  /* 얼굴 */
  const fy=-s*.82;g.fillStyle='#fff';g.strokeStyle=INK;
  for(const d of[-1,1]){const ex=d*s*.2;
    if(mood==='hit'){g.beginPath();g.moveTo(ex-s*.08,fy-s*.08);g.lineTo(ex+s*.08,fy+s*.08);g.moveTo(ex+s*.08,fy-s*.08);g.lineTo(ex-s*.08,fy+s*.08);g.stroke();}
    else if(mood==='tease'){g.beginPath();g.arc(ex,fy,s*.07,Math.PI*1.1,Math.PI*1.9);g.stroke();}
    else{g.beginPath();g.ellipse(ex,fy,s*.1,s*.12,0,0,TAU);g.fill();g.stroke();g.fillStyle=INK;g.beginPath();g.arc(ex+s*.015,fy+s*.02,s*.05,0,TAU);g.fill();g.fillStyle='#fff';}}
  g.fillStyle='#f9a8d4';g.beginPath();g.moveTo(-s*.1,fy+s*.1);g.lineTo(s*.1,fy+s*.1);g.lineTo(0,fy+s*.22);g.closePath();g.fill();g.stroke();
  g.strokeStyle=INK;g.lineWidth=Math.max(1.5,s*.03);g.beginPath();for(const d of[-1,1]){g.moveTo(d*s*.16,fy+s*.12);g.lineTo(d*s*.42,fy+s*.08);g.moveTo(d*s*.16,fy+s*.16);g.lineTo(d*s*.42,fy+s*.2);}g.stroke();
  g.lineWidth=Math.max(2,s*.05);
  if(mood==='tease'){g.fillStyle='#f87171';g.beginPath();g.ellipse(0,fy+s*.34,s*.1,s*.14,0,0,TAU);g.fill();g.stroke();}
  else if(mood==='hit'){g.beginPath();g.arc(0,fy+s*.38,s*.07,Math.PI*1.1,Math.PI*1.9);g.stroke();}
  else{g.fillStyle='#fff';K.rr(g,-s*.07,fy+s*.3,s*.14,s*.1,s*.02);g.fill();g.stroke();}
  /* 팻말 */
  const bw=s*.92,bh=s*.52,by=-s*.45;g.fillStyle='#fff8e1';K.rr(g,-bw/2,by-bh/2,bw,bh,s*.06);g.fill();g.strokeStyle='#a16207';g.lineWidth=Math.max(2,s*.06);g.stroke();
  g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';
  if(frc){const [a,b]=v.split('/');frac(g,a,b,0,by,bh*.62,INK);}else{let fs=bh*.8;g.font=K.font(fs);while(g.measureText(v).width>bw*.85&&fs>8){fs*=.9;g.font=K.font(fs);}g.fillText(v,0,by+fs*.04);}
  /* 손 */
  g.fillStyle=c1;g.strokeStyle=INK;g.lineWidth=Math.max(2,s*.05);for(const d of[-1,1]){g.beginPath();g.arc(d*bw*.5,by+bh*.45,s*.11,0,TAU);g.fill();g.stroke();}
  g.restore();}
function hammer(g,x,y,s,f){/* f 0..1 */const a=-1.2+Math.min(1,f*2.2)*1.5;g.save();g.translate(x,y);g.rotate(a);g.globalAlpha=f>.8?1-(f-.8)*5:1;
  g.fillStyle='#b45309';g.strokeStyle=INK;g.lineWidth=Math.max(2,s*.05);K.rr(g,-s*.07,-s*.1,s*.14,s*1.1,s*.04);g.fill();g.stroke();
  g.fillStyle='#fde047';K.rr(g,-s*.38,-s*.45,s*.76,s*.4,s*.1);g.fill();g.stroke();g.fillStyle='#ef4444';g.fillRect(-s*.38+s*.06,-s*.45+s*.05,s*.12,s*.3);g.fillRect(s*.38-s*.18,-s*.45+s*.05,s*.12,s*.3);g.restore();}
function lawn(g,W,H,u,t){K.vgrad(g,0,0,W,H,['#9be08a','#6cc56c','#4aa955']);
  for(let k=0;k<40;k++){const x=(k*97+13)%W,y=(k*53+29)%H;g.fillStyle=k%2?'rgba(255,255,255,.1)':'rgba(0,80,0,.1)';g.beginPath();g.ellipse(x,y,u*.28,u*.1,0,0,TAU);g.fill();}}
function hole(g,cx,cy,cw,rowH){g.fillStyle='#3a2616';g.beginPath();g.ellipse(cx,cy,cw*.34,rowH*.13,0,0,TAU);g.fill();}
function mound(g,cx,cy,cw,rowH){const gr=g.createLinearGradient(0,cy,0,cy+rowH*.25);gr.addColorStop(0,'#9a6b3f');gr.addColorStop(1,'#6b4423');g.fillStyle=gr;g.beginPath();g.ellipse(cx,cy+rowH*.04,cw*.4,rowH*.15,0,0,Math.PI);g.fill();g.strokeStyle='#3a2616';g.lineWidth=2;g.stroke();
  }
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/7:Math.min(W,H)/7;lawn(g,W,H,u,T);
    const vals=['1','2','3','4','6','8','12','24','5'];const n=wide?5:3;const cw=Math.min(W/(n+.3),u*3.2),rowH=cw*1.1;const y0=H*(wide?.55:.62);
    for(let i=0;i<(wide?5:6);i++){const rows=wide?1:2;const c=wide?i:i%3,r=wide?0:Math.floor(i/3);const cx=W/2+(c-(n-1)/2)*cw*1.05,cy=y0+r*rowH*.9;
      const per=3.4,ph=((T+i*.6)%per)/per;const pop=ph<.1?ph/.1:ph<.55?1:ph<.65?1-(ph-.65+.1)/.1:0;const hit=ph>.4&&ph<.5;const sc=cw*.42;
      hole(g,cx,cy,cw,rowH);g.save();g.beginPath();g.rect(cx-cw/2,cy-rowH*1.4,cw,rowH*1.4);g.clip();g.translate(cx,cy+(1-clamp(pop,0,1))*sc*1.2);moleDraw(g,sc,COLS[i%4],hit?'hit':'idle',vals[(i*2)%vals.length],false,T);g.restore();mound(g,cx,cy,cw,rowH);
      if(ph>.35&&ph<.5){hammer(g,cx+cw*.1,cy-sc*1.2,sc*1.3,(ph-.35)/.15);}}
  };
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'g29-factor-mole',title:'약수·배수 두더지 잡기',title1:'뿅망치 출동!',title2:'약수·배수 두더지 잡기',emoji:LOGO,
  subtitle:'5~6학년 · 약수와 배수 · 약분과 통분',
  howto:'구멍에서 숫자 두더지가 쏙쏙 튀어나와요! 주문에 맞는 두더지만 <b>뿅망치로 콩!</b> 틀린 두더지를 때리면 점수가 깎여요. 6마리를 잡으면 주문이 바뀌고, 갈수록 빨라져요!',
  how:p=>({yak:'주문한 수의 <b>약수</b> 두더지만 콩!',bae:'주문한 수의 <b>배수</b> 두더지만 콩!','gong-y':'두 수의 <b>공약수</b> 두더지만 콩!','gong-b':'두 수의 <b>공배수</b> 두더지만 콩!',yakbun:'<b>크기가 같은 분수</b> 두더지만 콩!',all:'여러 가지 주문이 번갈아 나와요'}[p.levelId]),
  theme:{c1:'#a16207',c2:'#16a34a'},hero:heroScene,vignette:.05,durs:[60,90,120],levelTitle:'어떤 주문을 받을까요?',goodLabel:'잡은 두더지',
  txt:{who:'누가 두더지를 잡을까요?',dur:'사냥 시간',pace:'두더지 속도',seat:'번 사냥꾼 ',go:'사냥 시작!',s1:'1. 주문',s2:'2. 방법',s3:'3. 이름'},
  levels:[
    {id:'yak',g:'5학년 1학기 · 약수·배수·약분',t:'약수',d:'24의 약수만 콩!'},
    {id:'bae',g:'5학년 1학기 · 약수·배수·약분',t:'배수',d:'7의 배수만 콩!'},
    {id:'gong-y',g:'5학년 1학기 · 약수·배수·약분',t:'공약수',d:'두 수의 공약수만 콩!'},
    {id:'gong-b',g:'5학년 1학기 · 약수·배수·약분',t:'공배수',d:'두 수의 공배수만 콩!'},
    {id:'yakbun',g:'5학년 1학기 · 약수·배수·약분',t:'크기가 같은 분수',d:'약분하면 같은 분수만 콩!'},
    {id:'all',g:'5학년 1학기 · 약수·배수·약분',t:'🌟 모두 섞기',d:'주문이 번갈아 나와요'},
  ],
  summary:`<ul><li><b>약수</b>: 어떤 수를 나누어떨어지게 하는 수 (24의 약수: 1, 2, 3, 4, 6, 8, 12, 24). <b>배수</b>: 어떤 수를 1배, 2배, 3배… 한 수 (7의 배수: 7, 14, 21…).</li>
    <li><b>공약수</b>는 두 수의 공통인 약수, <b>최대공약수</b>는 그중 가장 큰 수예요. 공약수는 최대공약수의 약수와 같아요.</li>
    <li><b>공배수</b>는 두 수의 공통인 배수, <b>최소공배수</b>는 그중 가장 작은 수예요. 공배수는 최소공배수의 배수와 같아요.</li>
    <li><b>약분</b>: 분모와 분자를 같은 수로 나누어 간단히 만드는 것. 약분해도 분수의 크기는 변하지 않아요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=Math.max(p.top||0,u*2.6)+u*.3;const avail=H-Z0-H*.02;const cw=W*.94/3;const rowH=Math.min(avail/3.06,cw*1.3);const fh=rowH*3.06;return{cw,rowH,gx:W*.03,gy:Z0+(avail-fh),Z0};},
  hpos(p,i){const G=this.geo(p);const c=i%3,r=Math.floor(i/3);return{x:G.gx+G.cw*(c+.5),y:G.gy+G.rowH*(r+.8)};},
  init(p){const st=p.state;Object.assign(st,{holes:Array.from({length:9},(_,i)=>({i,up:false,k:0,v:null,ok:false,hit:false,tease:0,until:0,hitT:0,look:COLS[i%4]})),T:0,spawnT:.5,inOrder:0,prev:-1,oN:0,ham:[],newT:0,pops:[]});this.newOrder(p,true);},
  makeOrder(p,L){const R=p.R,o={};
    const divs=N.divs,inR=(a,b)=>{const r=[];for(let x=a;x<=b;x++)r.push(x);return r;};
    if(L==='yak'){const n=R.pick([12,16,18,20,24,28,30,32,36,40,42,45,48,54,60]);const g=divs(n);
      o.text=`🎯 <span class="tg">${n}</span>의 약수만 콩!`;o.good=g.map(String);o.bad=inR(2,n-1).filter(x=>n%x).map(String);
      o.why=v=>`${J(v,'은')} ${n}의 약수가 아니에요 (${n} ÷ ${v} = ${Math.floor(n/v)} … ${n%v})`;o.ans=`${n}의 약수: ${g.join(', ')}`;}
    else if(L==='bae'){const k=R.int(3,12);const g=inR(1,Math.floor(100/k)).map(m=>k*m);
      o.text=`🎯 <span class="tg">${k}</span>의 배수만 콩!`;o.good=g.map(String);
      const bad=new Set();g.forEach(x=>{[x-1,x+1,x+2,x-2].forEach(y=>{if(y>1&&y%k)bad.add(y);});});o.bad=[...bad].map(String);
      o.why=v=>`${J(v,'은')} ${k}의 배수가 아니에요 (${v} ÷ ${k} = ${Math.floor(v/k)} … ${v%k})`;}
    else if(L==='gong-y'){const [a,b]=R.pick([[12,18],[16,24],[18,27],[20,30],[24,36],[30,45],[24,40],[36,48],[18,30],[28,42],[20,32],[30,42]]);
      const g=divs(N.gcd(a,b));o.text=`🎯 <span class="tg">${a}</span>${J(String(a),'과').slice(-1)} <span class="tg">${b}</span>의 공약수만 콩!`;
      o.good=g.map(String);const only=[...divs(a),...divs(b)].filter(x=>!g.includes(x));o.bad=[...new Set([...only,...inR(2,20).filter(x=>a%x&&b%x).slice(0,6)])].map(String);
      o.why=v=>{const x=+v;return a%x===0?`${J(v,'은')} ${a}의 약수지만 ${b}의 약수가 아니에요`:b%x===0?`${J(v,'은')} ${b}의 약수지만 ${a}의 약수가 아니에요`:`${J(v,'은')} ${a}${J(String(a),'과').slice(-1)} ${b} 어느 쪽의 약수도 아니에요`;};
      o.ans=`최대공약수 ${N.gcd(a,b)}의 약수: ${g.join(', ')}`;}
    else if(L==='gong-b'){const [a,b]=R.pick([[2,3],[3,4],[4,6],[6,8],[4,10],[6,9],[5,6],[3,5],[4,5],[6,10],[8,12],[9,12]]);
      const l=N.lcm(a,b);const top=Math.max(l*4,60);const g=inR(1,Math.floor(top/l)).map(m=>l*m);
      o.text=`🎯 <span class="tg">${a}</span>${J(String(a),'과').slice(-1)} <span class="tg">${b}</span>의 공배수만 콩!`;o.good=g.map(String);
      const bad=new Set();for(let x=1;x<=top;x++){if((x%a===0)!==(x%b===0))bad.add(x);}o.bad=[...bad].map(String);
      o.why=v=>{const x=+v;return x%a===0?`${J(v,'은')} ${a}의 배수지만 ${b}의 배수가 아니에요`:`${J(v,'은')} ${b}의 배수지만 ${a}의 배수가 아니에요`;};
      o.ans=`최소공배수 ${l}의 배수: ${g.slice(0,5).join(', ')} …`;}
    else{const [n,d]=R.pick([[1,2],[1,3],[2,3],[1,4],[3,4],[2,5],[3,5],[4,5],[5,6],[3,7],[2,7],[3,8],[5,8]]);
      const g=[];for(let k=2;k<=6;k++)g.push([n*k,d*k]);
      const bad=[];for(let k=2;k<=6;k++){bad.push([n*k+1,d*k]);bad.push([n*k,d*k+1]);bad.push([n+k,d+k]);bad.push([n*k,d+k]);}
      o.text=`🎯 크기가 ${F(n,d)}인 분수만 콩!`;o.sub='분모와 분자를 같은 수로 나누어 약분해 봐요';
      o.good=g.map(([a,b])=>a+'/'+b);o.bad=bad.filter(([a,b])=>a*d!==b*n&&a<b).map(([a,b])=>a+'/'+b);o.frac=true;
      o.why=v=>{const [a,b]=v.split('/').map(Number);const c=N.gcd(a,b);return `${F(a,b)} → 약분하면 ${c>1?F(a/c,b/c):F(a,b)+' (더 약분이 안 돼요)'} · 주문은 ${F(n,d)}`;};}
    return o;},
  newOrder(p,first){const st=p.state;const L=p.levelId==='all'?['yak','bae','gong-y','gong-b','yakbun'][st.oN++%5]:p.levelId;st.ord=this.makeOrder(p,L);st.inOrder=0;
    st.holes.forEach(h=>{if(h.up&&!h.hit)h.up=false;});if(!first){st.newT=1.2;p.Snd.bell(880,0,.05);p.Snd.bell(1320,.1,.05);}
    st.spawnT=.7;p.ask(st.ord.text,st.ord.sub||'맞는 두더지만 뿅망치로 콩!');},
  spawn(p){const st=p.state,R=p.R;const free=st.holes.filter(h=>!h.up&&h.k<.05&&h.i!==st.prev);if(!free.length)return;
    const h=R.pick(free);st.prev=h.i;const ok=R.chance(.45);const v=ok?R.pick(st.ord.good):R.pick(st.ord.bad);
    h.v=v;h.ok=ok;h.up=true;h.hit=false;h.tease=0;h.hitT=0;h.look=R.pick(COLS);h.until=st.T+Math.max(1.05,1.9-p.t*.008)/p.pace;},
  update(p,dt){const st=p.state;st.T+=dt;if(st.newT>0)st.newT-=dt;
    st.spawnT-=dt;const live=st.holes.filter(h=>h.up).length;const maxUp=p.t>40?3:2;
    if(st.spawnT<=0&&live<maxUp+1){this.spawn(p);st.spawnT=Math.max(.5,1.05-p.t*.005)*(live===0?.5:1)/p.pace;}
    for(const h of st.holes){h.k=h.up?Math.min(1,h.k+dt*7):Math.max(0,h.k-dt*6);if(h.tease>0)h.tease-=dt;
      if(h.up&&!h.hit&&st.T>h.until)h.up=false;if(h.hit&&(h.hitT-=dt)<=0&&h.up){h.up=false;}}
    st.ham=st.ham.filter(q=>(q.t+=dt)<.3);st.pops=st.pops.filter(q=>(q.t+=dt)<1);},
  down(p,x,y){const st=p.state,G=this.geo(p);
    const idx=st.holes.findIndex(h=>{const c=h.i%3,r=Math.floor(h.i/3);const cx=G.gx+G.cw*c,cy=G.gy+G.rowH*r;return x>=cx&&x<cx+G.cw&&y>=cy&&y<cy+G.rowH;});
    if(idx<0)return;const h=st.holes[idx];const hp=this.hpos(p,idx);st.ham.push({x,y,t:0});
    if(!h.up||h.hit||h.k<.3){p.Snd.tone(220,.06,'sine',.05);return;}
    if(h.ok){h.hit=true;h.hitT=.4;p.hit(true,{x:hp.x,y:hp.y-G.rowH*.9,color:'#fde047'});p.Snd.tone(523,.06,'triangle',.1);
      st.inOrder++;if(st.inOrder>=6)setTimeout(()=>{if(p.active)this.newOrder(p);},450);}
    else{h.hit=true;h.tease=.7;h.hitT=.7;p.hit(false,{pen:15,x:hp.x,y:hp.y-G.rowH*.9,tip:st.ord.why(h.v)+(st.ord.ans?` · ${st.ord.ans}`:''),review:strip(st.ord.why(h.v))+(st.ord.ans?` · ${st.ord.ans}`:''),tipMs:3000});st.pops.push({x:hp.x,y:hp.y-G.rowH*1.3,t:0});}},
  draw(p,g){const W=p.W,H=p.H,u=p.u,st=p.state,G=this.geo(p),t=st.T;lawn(g,W,H,u,t);
    const sc=Math.min(G.cw*.5,G.rowH*.6);
    for(const h of st.holes){const c=h.i%3,r=Math.floor(h.i/3);const cx=G.gx+G.cw*(c+.5),cy=G.gy+G.rowH*(r+.8);hole(g,cx,cy,G.cw,G.rowH);
      if(h.k>.01){g.save();g.beginPath();g.rect(cx-G.cw/2,cy-G.rowH*1.7,G.cw,G.rowH*1.7);g.clip();const pop=1-Math.pow(1-h.k,3)*1;g.translate(cx,cy+(1-h.k)*sc*1.2+(h.hit&&h.tease<=0?sc*.08:0));
        const sq=h.hit&&h.hitT>0?1-Math.sin(clamp(h.hitT/.4,0,1)*Math.PI)*.18:1;g.scale(1,sq);moleDraw(g,sc,h.look,h.hit?(h.tease>0?'tease':'hit'):'idle',h.v||'',st.ord&&st.ord.frac,t);
        if(h.hit&&h.tease<=0){for(let k=0;k<3;k++){const a=t*8+k*2.1;K.txt(g,'✦',Math.cos(a)*sc*.5,-sc*1.35+Math.sin(a)*sc*.12,{size:sc*.28,color:'#fde047'});}}
        g.restore();}
      mound(g,cx,cy,G.cw,G.rowH);}
    for(const q of st.pops)K.txt(g,'메롱~ −5',q.x,q.y-q.t*u*.8,{size:u*.5,color:'#fecaca',stroke:INK,lw:u*.1,alpha:1-q.t});
    for(const q of st.ham)hammer(g,q.x,q.y,u*1.1,q.t/.3);
    /* 주문 진행 별 6개 */
    const py=(p.top||G.Z0)+u*.38,pr=u*.2;for(let i=0;i<6;i++){const x=W/2+(i-2.5)*pr*2.6;g.fillStyle=i<st.inOrder?'#fde047':'rgba(0,0,0,.35)';g.strokeStyle='#fff';g.lineWidth=Math.max(1.5,u*.04);g.beginPath();for(let k=0;k<10;k++){const a=k*Math.PI/5-Math.PI/2,rr=k%2?pr*.5:pr;g.lineTo(x+Math.cos(a)*rr,py+Math.sin(a)*rr);}g.closePath();g.fill();g.stroke();}
    if(st.newT>0)K.txt(g,'📜 새 주문!',W/2,G.Z0+u*2,{size:u*1.1,color:'#fff7c2',stroke:INK,lw:u*.18,alpha:Math.min(1,st.newT*2)});},
};

Engine.boot(GAME);
