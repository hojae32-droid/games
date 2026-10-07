/* 3~6학년 음악 · 가락의 높낮이(가락선) — 가락선 새
   디자인: 하늘에서 노래하는 새. 음이 올라가는지 내려가는지 듣고, 고르고, 직접 가락선을 그려요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#1f4b7a';
const SC=[60,62,64,65,67,69,71,72];
const RB=['#E53935','#FB8C00','#F6C700','#43A047','#1E88E5','#3949AB','#8E24AA','#E53935'];
const NM=['도','레','미','파','솔','라','시','높은 도'];
const BEAT=.5;
const LV={
  pair:{label:'두 음 비교하기',desc:'두 번째 음이 높을까, 낮을까, 같을까?',tag:'3학년',ic:'🐤',NL:2,time:8},
  pick:{label:'가락선 고르기',desc:'가락을 듣고 알맞은 선 모양 찾기',tag:'3~4학년',ic:'〰️',NL:5,time:12},
  draw:{label:'가락선 그리기',desc:'들은 가락의 높낮이를 직접 콕콕 찍어 그려요',tag:'4~6학년',ic:'✏️',NL:5,time:22},
};
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M4 34C12 34 14 14 22 14S32 30 44 10" fill="none" stroke="#4aa8ff" stroke-width="4" stroke-linecap="round"/><circle cx="8" cy="34" r="4" fill="#E53935"/><circle cx="22" cy="14" r="4" fill="#F6C700"/><circle cx="34" cy="26" r="4" fill="#43A047"/><circle cx="44" cy="10" r="4" fill="#8E24AA"/></svg>';
function sky(g,W,H,u,t){K.vgrad(g,0,0,W,H,['#8fd0ff','#cdeaff','#fff8d6']);K.clouds(g,W,H*.25,t*.5,.14,3,u*1.8);K.glow(g,W*.9,H*.08,u*3,'#fff6b0',.6);}
function bird(g,x,y,s,t,sing,mood){g.save();g.translate(x,y);g.lineJoin='round';g.lineWidth=Math.max(2,s*.06);g.strokeStyle=INK;
  const flap=Math.sin(t*10)*(sing?.5:.15);
  g.fillStyle='#ffd23f';g.beginPath();g.ellipse(0,0,s*.42,s*.36,0,0,TAU);g.fill();g.stroke();
  g.fillStyle='#ffbe0b';g.save();g.translate(-s*.05,s*.02);g.rotate(-flap);g.beginPath();g.ellipse(0,0,s*.22,s*.13,-.4,0,TAU);g.fill();g.stroke();g.restore();
  g.fillStyle='#ffd23f';g.beginPath();g.moveTo(-s*.38,-s*.04);g.lineTo(-s*.65,-s*.18);g.lineTo(-s*.62,s*.08);g.closePath();g.fill();g.stroke();
  g.fillStyle='#ff7a2f';g.beginPath();const open=sing?(.5+.5*Math.sin(t*14))*s*.1:0;g.moveTo(s*.38,-s*.05-open*.5);g.lineTo(s*.62,s*.02);g.lineTo(s*.38,s*.05+open);g.closePath();g.fill();g.stroke();
  g.fillStyle='#fff';g.beginPath();g.arc(s*.2,-s*.1,s*.1,0,TAU);g.fill();g.stroke();g.fillStyle=INK;g.beginPath();g.arc(s*.23,-s*.09,s*.05,0,TAU);g.fill();
  g.fillStyle='rgba(255,120,120,.5)';g.beginPath();g.arc(s*.1,s*.08,s*.07,0,TAU);g.fill();
  g.restore();}
function contour(g,x,y,w,h,m,pad,r,cols){const n=m.length;const P=m.map((v,i)=>[x+pad+(w-2*pad)*i/(n-1),y+h-pad-(h-2*pad)*v/7]);g.strokeStyle=INK;g.lineWidth=Math.max(3,r*.7);g.lineCap='round';g.lineJoin='round';g.beginPath();P.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.stroke();
  P.forEach((q,i)=>{g.fillStyle=cols===false?'#fff':RB[m[i]];g.beginPath();g.arc(q[0],q[1],r,0,TAU);g.fill();g.lineWidth=2.5;g.strokeStyle=INK;g.stroke();});return P;}
const dirs=m=>{const d=[];for(let i=1;i<m.length;i++)d.push(m[i]>m[i-1]?'u':m[i]<m[i-1]?'d':'s');return d;};
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const M0=[1,3,2,5,4,6,3];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    const u=Math.min(W0,H0)/6;sky(g,W0,H0,u,T);const P=contour(g,W0*.12,H0*.2,W0*.76,H0*.6,M0,u*.3,u*.2);const k=(T*.8)%(M0.length+1);const i=Math.min(M0.length-1,Math.floor(k)),f=k-Math.floor(k);const j=Math.min(M0.length-1,i+1);
    bird(g,P[i][0]+(P[j][0]-P[i][0])*f,P[i][1]+(P[j][1]-P[i][1])*f-u*.5,u*1.1,T,true);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'skyline',title:'가락선 새',title1:'하늘 노래 교실',title2:'가락선 새',emoji:LOGO,
  subtitle:'3~6학년 음악 · 가락의 높낮이',
  howto:'새가 부르는 노래를 잘 들어요. 음이 <b>올라가는지, 내려가는지, 그대로인지</b> 생각해서 골라요. 마지막 단계에서는 들은 가락을 손가락으로 콕콕 찍어 <b>가락선을 직접 그려요</b>! 모두 함께 듣고 동시에 답해요.',
  how:p=>({pair:'두 음의 <b>높낮이</b> 비교하기',pick:'알맞은 <b>가락선</b> 고르기',draw:'들은 가락의 <b>가락선 그리기</b>'}[p.levelId]),
  theme:{c1:'#4aa8ff',c2:'#ff8a3d'},hero:heroScene,vignette:.03,durs:[90,150,240],levelTitle:'어떤 노래를 들을까요?',
  txt:{who:'누가 노래 친구일까요?',dur:'노래 시간',pace:'생각하는 시간',seat:'번 친구 ',go:'노래 시작!',s1:'1. 노래',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'3~6학년',t:v.ic+' '+v.label,d:v.tag+' · '+v.desc})),
  summary:`<ul><li><b>가락</b>은 높고 낮은 음이 이어져 만들어져요. 가락의 오르내림을 선으로 나타낸 것이 <b>가락선</b>이에요.</li>
    <li>음이 위로 가면 <b>높아지는</b> 것, 아래로 가면 <b>낮아지는</b> 것, 수평이면 <b>같은 음</b>이에요.</li>
    <li>계이름은 도(낮음) → 레 → 미 → 파 → 솔 → 라 → 시 → 높은 도(높음) 순서로 높아져요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const st=p.state;const L=LV[p.levelId];const top=(p.top||0)+u*.5;const land=W>=H*1.1;const skyH=Math.max(u*3.5,(H-top)*(land?.36:.3));const ay=top+skyH+u*.3;const ah=H-ay-u*.3;const pad=u*.35;
    const rep={x:W-pad-u*3.6,y:top+u*.1,w:u*3.6,h:u*.9};let opts=[],cells=null,go=null;
    if(p.levelId==='pair'){const w=(W-pad*2-u*.6)/3;for(let i=0;i<3;i++)opts.push({x:pad+i*(w+u*.3),y:ay,w,h:Math.min(ah,u*5.5)});}
    else if(p.levelId==='pick'){const n=3;if(land){const w=(W-pad*2-u*.6)/3;for(let i=0;i<n;i++)opts.push({x:pad+i*(w+u*.3),y:ay,w,h:Math.min(ah,u*5.5)});}else{const h=(ah-u*.6)/3;for(let i=0;i<n;i++)opts.push({x:pad,y:ay+i*(h+u*.3),w:W-pad*2,h});}}
    else{const NL=L.NL;const gx=pad+u*1.6,gw=W-pad*2-u*1.6,gh=ah-u*1.95;cells={x:gx,y:ay,w:gw,h:gh,cw:gw/NL,ch:gh/8,NL};go={x:W/2-Math.min(W*.4,u*5),y:ay+gh+u*.55,w:Math.min(W*.8,u*10),h:u*1.15};}
    return{W,H,u,land,top,skyH,ay,ah,pad,opts,cells,go,rep};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,listen:0,play:[],sing:0,draw:[],hit:0,flash:{},bx:.1,by:.5,trail:[],pr:{},tl:0});this.newQ(p);},
  make(p,L){const R=p.R;const NL=LV[L].NL;const mel=()=>{for(let t=0;t<100;t++){const out=[R.int(1,5)];for(let i=1;i<NL;i++){const r=R.f();let step=r<.4?R.int(1,2):r<.8?-R.int(1,2):0;if(NL===2&&r>=.8)step=0;let v=out[i-1]+step;if(v<0||v>7)v=out[i-1]-step;out.push(clamp(v,0,7));}
      if(NL>2){const d=dirs(out).join('');if(!/u/.test(d)||!/d/.test(d))continue;}return out;}return[2,4,3,5,4].slice(0,NL);};
    const m=mel();let opts=null,ans=0;
    if(L==='pick'){opts=[m];for(let t=0;t<300&&opts.length<3;t++){const o=mel();if(!opts.some(x=>dirs(x).join('')===dirs(o).join('')))opts.push(o);}opts=R.shuffle(opts);ans=opts.indexOf(m);}
    const d0=dirs(m)[0];return{m,opts,ans:L==='pair'?['u','s','d'].indexOf(d0):L==='pick'?ans:0,text:'',reveal:m.map(v=>NM[v]).join(' - '),review:'가락: '+m.map(v=>NM[v]).join(' - ')+' ('+dirs(m).map(d=>({u:'↗',d:'↘',s:'→'}[d])).join(' ')+')',speak:''};},
  qtime(q,p){return LV[(this._p||{}).levelId||'pair'].time;},
  level(p){this._p=p;return p.levelId;},
  askHtml(q){return {pair:'🐤 두 번째 음은 첫 번째 음보다?',pick:'〰️ 새가 부른 가락선은?',draw:'✏️ 들은 가락의 높낮이를 차례로 찍어요'}[this._p.levelId];},
  askSub(){return this._p.levelId==='draw'?'열마다 한 칸씩 찍고 「다 그렸어요」를 눌러요':'가락을 듣고 골라요';},
  isOk(q,i){return i===q.ans;},tipOf(q){return '가락: '+q.reveal;},goodTip(q){return '정답! '+q.reveal;},
  ptsOf(p,q,frac){const L=p.levelId,st=p.state;if(L==='draw')return Math.round(20+60*st.hit+20*frac);return Math.round(50+50*frac);},
  hold(p){return p.state.listen>0;},
  onNew(p,q){const st=p.state;this._p=p;st.listen=0;st.draw=[];st.hit=0;st.trail=[];st.flash={};st.bx=.1;st.by=.5;this.sound(p);},
  sound(p){const st=p.state,q=st.q;const t=M.now()+.25;if(M.lead(p))q.m.forEach((v,i)=>M.play('flute',SC[v]+12,t+i*BEAT,BEAT*.85,.9));st.listen=.25+q.m.length*BEAT+.2;st.tl=st.T+.25;},
  onVerdict(p,q,ok){const st=p.state;st.listen=0;st.trail=q.m.map((v,i)=>i);st.fly=0;},
  upd(p,dt){const st=p.state;this._p=p;M.decay(st,dt);if(st.listen>0)st.listen-=dt;const q=st.q;if(!q)return;
    if(!st.lock&&st.listen>0){const k=Math.floor((st.T-st.tl)/BEAT);st.sing=k>=0&&k<q.m.length?1:0;}else st.sing=st.lock?1:0;
    if(st.lock)st.fly=(st.fly||0)+dt;
    if(!st.lock&&st.qt<=dt&&p.levelId==='draw'&&st.draw.filter(x=>x!=null).length>=2){this.grade(p);}},
  grade(p){const st=p.state,q=st.q;if(!q||st.lock)return;const want=dirs(q.m),NL=q.m.length;const got=[];for(let i=1;i<NL;i++)got.push(st.draw[i]==null||st.draw[i-1]==null?'?':st.draw[i]>st.draw[i-1]?'u':st.draw[i]<st.draw[i-1]?'d':'s');
    const hit=want.filter((d,i)=>d===got[i]).length;st.hit=hit/want.length;st.gotD=got;st.msg='높낮이 '+want.length+'개 중 '+hit+'개 맞았어요';this.verdict(p,hit>=want.length-1?0:1,false);},
  tapCell(p,x,y){const st=p.state,G=this.geo(p);const c=G.cells;if(!K.inRect(x,y,c))return;const ci=Math.floor((x-c.x)/c.cw),ri=Math.floor((y-c.y)/c.ch);if(ci<0||ci>=c.NL||ri<0||ri>=8)return;const v=7-ri;st.draw[ci]=v;M.play('flute',SC[v]+12,null,.35,.7,{vol:M.vol(p)});M.press(st,'c'+ci,.2);},
  down(p,x,y){const st=p.state,q=st.q;if(!q)return;const G=this.geo(p);
    if(K.inRect(x,y,G.rep)){if(!st.lock&&st.listen<=0){this.sound(p);}return;}
    if(st.lock||st.listen>0)return;
    if(p.levelId==='draw'){if(G.go&&K.inRect(x,y,G.go)&&st.draw.filter(v=>v!=null).length===q.m.length){this.grade(p);return;}this.tapCell(p,x,y);return;}
    const i=G.opts.findIndex(r=>K.inRect(x,y,r));if(i>=0)this.verdict(p,i,false);},
  key(p,e){if(p.levelId==='pair'){const m={ArrowUp:0,ArrowRight:1,ArrowDown:2}[e.key];if(m!=null){e.preventDefault();const st=p.state;if(!st.lock&&st.listen<=0)this.verdict(p,m,false);}}},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock||st.listen>0)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();
    if(p.levelId==='draw'){const c=G.cells;const ci=st.draw.findIndex((v,i)=>v==null&&i<q.m.length);const idx=[...Array(q.m.length).keys()].find(i=>st.draw[i]==null);if(idx!=null){return{k:'click',x:rc.left+c.x+(idx+.5)*c.cw,y:rc.top+c.y+(7-q.m[idx]+.5)*c.ch};}return{k:'click',x:rc.left+G.go.x+G.go.w/2,y:rc.top+G.go.y+G.go.h/2};}
    const r=G.opts[q.ans];return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;this._p=p;sky(g,W,H,u,t);const L=LV[p.levelId];
    /* 하늘과 새 */
    const sy=G.top,sh=G.skyH;let bx=W*.14,by=sy+sh*.55;
    if(st.lock){const n=q.m.length,pad=Math.min(W,sh)*.12;const x0=W*.25,x1=W*.9;const P=q.m.map((v,i)=>[x0+(x1-x0)*i/(n-1),sy+sh-pad-(sh-pad*1.8)*v/7]);g.strokeStyle='rgba(255,255,255,.9)';g.lineWidth=u*.14;g.lineCap='round';g.lineJoin='round';g.beginPath();P.forEach((a,i)=>i?g.lineTo(a[0],a[1]):g.moveTo(a[0],a[1]));g.stroke();
      P.forEach((a,i)=>{const k=clamp((st.fly||0)*5-i,0,1);if(k<=0)return;g.fillStyle=RB[q.m[i]];g.beginPath();g.arc(a[0],a[1],u*.28*k,0,TAU);g.fill();g.lineWidth=2.5;g.strokeStyle=INK;g.stroke();K.txt(g,NM[q.m[i]],a[0],a[1]-u*.62,{size:u*.5,color:INK,stroke:'#fff',lw:u*.1,maxW:u*2.4,alpha:k});});
      const f=clamp((st.fly||0)*5,0,n-1),i=Math.floor(f),j=Math.min(n-1,i+1),fr=f-i;bx=P[i][0]+(P[j][0]-P[i][0])*fr;by=P[i][1]+(P[j][1]-P[i][1])*fr-u*.5;}
    else{by=sy+sh*.55+Math.sin(t*3)*(st.listen>0?u*.25:u*.08);}
    bird(g,bx,by,Math.min(u*1.5,sh*.4),t,st.sing,st.mood);
    if(st.listen>0)K.txt(g,'🎵 잘 들어요…',W*.5,sy+sh*.2,{size:u*.8,color:'#fff',stroke:INK,lw:u*.15,maxW:W*.7});
    /* 시간 막대 */
    if(!st.lock&&st.listen<=0&&st.qmax>0){const bw=Math.min(W*.5,u*10);QZ.bar(g,W/2-bw/2,(p.top||0)+u*.12,bw,Math.max(5,u*.2),st.qt/st.qmax,{good:'#4aa8ff'});}
    /* 다시 듣기 */
    const rp=G.rep,can=!st.lock&&st.listen<=0;K.rr(g,rp.x,rp.y,rp.w,rp.h,rp.h/2);g.fillStyle=can?'#fff':'rgba(255,255,255,.55)';g.fill();g.lineWidth=3;g.strokeStyle=INK;g.stroke();K.txt(g,'🔁 다시 듣기',rp.x+rp.w/2,rp.y+rp.h/2,{size:u*.46,color:can?INK:'#8a9fb5',maxW:rp.w*.9});
    /* 답하는 곳 */
    const ok=st.res==='ok';
    if(p.levelId==='pair'){const lab=[['⬆️','높아요'],['➡️','같아요'],['⬇️','낮아요']],cols=['#ffd6d6','#fff3b0','#d6ecff'];G.opts.forEach((r,i)=>{let s='idle';if(st.lock){if(i===q.ans)s='ok';else if(i===st.pick)s='bad';else s='dim';}
      g.save();g.globalAlpha=s==='dim'?.5:1;K.card(g,r.x,r.y,r.w,r.h,u*.5,s==='ok'?'#dcfce7':s==='bad'?'#fee2e2':cols[i],{stroke:s==='ok'?'#16a34a':s==='bad'?'#dc2626':INK,lw:4,blur:u*.2,dy:u*.1});K.emo(g,lab[i][0],r.x+r.w/2,r.y+r.h*.36,Math.min(r.h*.4,r.w*.4));K.txt(g,lab[i][1],r.x+r.w/2,r.y+r.h*.74,{size:Math.min(r.h*.18,u*1.2),color:INK,maxW:r.w*.85});g.restore();});}
    else if(p.levelId==='pick'){G.opts.forEach((r,i)=>{let s='idle';if(st.lock){if(i===q.ans)s='ok';else if(i===st.pick)s='bad';else s='dim';}g.save();g.globalAlpha=s==='dim'?.5:1;K.card(g,r.x,r.y,r.w,r.h,u*.4,s==='ok'?'#dcfce7':s==='bad'?'#fee2e2':'#fff',{stroke:s==='ok'?'#16a34a':s==='bad'?'#dc2626':INK,lw:4,blur:u*.2,dy:u*.1});
      contour(g,r.x,r.y,r.w,r.h,q.opts[i],Math.min(r.w,r.h)*.15,Math.min(r.w,r.h)*.045);K.txt(g,String.fromCharCode(65+i),r.x+u*.5,r.y+u*.5,{size:u*.6,color:'rgba(31,75,122,.5)'});g.restore();});}
    else{const c=G.cells;K.card(g,c.x-u*.1,c.y-u*.1,c.w+u*.2,c.h+u*.2,u*.2,'rgba(255,255,255,.85)',{stroke:INK,lw:3,blur:0,dy:0});
      for(let r=0;r<8;r++){const v=7-r;g.fillStyle=RB[v];g.globalAlpha=.22;g.fillRect(c.x,c.y+r*c.ch,c.w,c.ch);g.globalAlpha=1;K.txt(g,v===7?'도′':NM[v],c.x-u*.85,c.y+(r+.5)*c.ch,{size:Math.min(c.ch*.6,u*.6),color:INK,maxW:u*1.5});g.strokeStyle='rgba(31,75,122,.25)';g.lineWidth=1;g.beginPath();g.moveTo(c.x,c.y+r*c.ch);g.lineTo(c.x+c.w,c.y+r*c.ch);g.stroke();}
      for(let k=0;k<c.NL;k++){g.strokeStyle='rgba(31,75,122,.25)';g.beginPath();g.moveTo(c.x+k*c.cw,c.y);g.lineTo(c.x+k*c.cw,c.y+c.h);g.stroke();K.txt(g,String(k+1),c.x+(k+.5)*c.cw,c.y+c.h+u*.05,{size:u*.4,color:'rgba(31,75,122,.6)'});}
      const pts=[];for(let k=0;k<c.NL;k++){const v=st.draw[k];if(v==null)continue;const x=c.x+(k+.5)*c.cw,y=c.y+(7-v+.5)*c.ch;pts.push([x,y,v,k]);}
      if(pts.length>1){g.strokeStyle=INK;g.lineWidth=Math.max(4,u*.14);g.lineCap='round';g.lineJoin='round';g.beginPath();pts.forEach((a,i)=>i?g.lineTo(a[0],a[1]):g.moveTo(a[0],a[1]));g.stroke();}
      pts.forEach(a=>{const pr=st.pr['c'+a[3]]>0;g.fillStyle=RB[a[2]];g.beginPath();g.arc(a[0],a[1],Math.min(c.cw,c.ch)*(pr?.42:.34),0,TAU);g.fill();g.lineWidth=3;g.strokeStyle=INK;g.stroke();});
      if(st.lock){const want=dirs(q.m);for(let k=0;k<q.m.length;k++){const x=c.x+(k+.5)*c.cw,y=c.y+(7-q.m[k]+.5)*c.ch;g.strokeStyle='#16a34a';g.setLineDash([5,5]);g.lineWidth=3;g.beginPath();g.arc(x,y,Math.min(c.cw,c.ch)*.46,0,TAU);g.stroke();g.setLineDash([]);if(k>0&&st.gotD){K.txt(g,st.gotD[k-1]===want[k-1]?'⭕':'❌',c.x+k*c.cw,c.y-u*.4,{size:u*.6});}}}
      const gr=G.go,rdy=st.draw.filter(v=>v!=null).length===q.m.length&&!st.lock;K.rr(g,gr.x,gr.y,gr.w,gr.h,gr.h/2);g.fillStyle=rdy?'#ff8a3d':'rgba(255,255,255,.6)';g.fill();g.lineWidth=3;g.strokeStyle=INK;g.stroke();K.txt(g,'다 그렸어요 ✔',gr.x+gr.w/2,gr.y+gr.h/2,{size:Math.min(gr.h*.55,u*.9),color:rdy?'#fff':'#8a9fb5',stroke:rdy?INK:null,lw:3,maxW:gr.w*.85});}
    K.card(g,u*.3,(p.top||0)+u*.5,u*3.8,u*.8,u*.4,'rgba(255,255,255,.92)',{stroke:INK,lw:3,blur:0,dy:0});K.txt(g,'🐦 '+(st.okN||0)+'곡 맞힘',u*.3+u*1.9,(p.top||0)+u*.9,{size:u*.46,color:INK,maxW:u*3.4});
  },
};
M.mix(GAME,{say:false,pts0:50,pts1:50,okMs:1900,badMs:2900});
const _q=GAME.make;
Engine.boot(GAME);
