/* 6학년 사회 · 세계 여러 나라 — 세계 여행 여권
   디자인: 공항 출국장. 비행기가 날아가는 동안 탑승권(보기)을 골라 여권에 나라 도장을 쾅! 찍어요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#0b1d33',YEL='#ffd23f';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="9" y="5" width="30" height="38" rx="4" fill="#173559" stroke="#ffd23f" stroke-width="3"/><circle cx="24" cy="20" r="8" fill="none" stroke="#ffd23f" stroke-width="2.5"/><path d="M16 20h16M24 12c-3 3-3 13 0 16M24 12c3 3 3 13 0 16" fill="none" stroke="#ffd23f" stroke-width="2"/><path d="M15 34h18" stroke="#ffd23f" stroke-width="3" stroke-linecap="round"/></svg>';
const DECKS=/*@@DECKS@@*/;
const CONT=/*@@CONT@@*/;
const C=/*@@C@@*/;
const jo=(w,a,b)=>{const c=w.charCodeAt(w.length-1);return c>=0xAC00&&c<=0xD7A3&&(c-0xAC00)%28?a:b;};
function sky(g,W,H,t,y0,h,u){K.vgrad(g,0,y0,W,h,['#1b3f73','#e58a5a','#ffd9a0']);K.clouds(g,W,y0+h*.8,t*.5,.12,2,u*1.5);}
function plane(g,x,y,s,rot){g.save();g.translate(x,y);g.rotate(rot||0);g.lineJoin='round';g.lineWidth=Math.max(2,s*.07);g.strokeStyle=INK;g.fillStyle='#fff';
  g.beginPath();g.moveTo(s*.6,0);g.quadraticCurveTo(s*.45,-s*.16,s*.1,-s*.16);g.lineTo(-s*.5,-s*.12);g.lineTo(-s*.62,-s*.34);g.lineTo(-s*.72,-s*.34);g.lineTo(-s*.66,0);g.lineTo(-s*.72,s*.1);g.lineTo(-s*.5,s*.1);g.lineTo(s*.1,s*.16);g.quadraticCurveTo(s*.45,s*.16,s*.6,0);g.closePath();g.fill();g.stroke();
  g.fillStyle='#ef4444';g.beginPath();g.moveTo(-s*.05,-s*.14);g.lineTo(-s*.32,-s*.58);g.lineTo(-s*.2,-s*.58);g.lineTo(s*.12,-s*.14);g.closePath();g.fill();g.stroke();
  g.beginPath();g.moveTo(-s*.05,s*.14);g.lineTo(-s*.32,s*.5);g.lineTo(-s*.2,s*.5);g.lineTo(s*.12,s*.14);g.closePath();g.fill();g.stroke();
  g.fillStyle='#7dd3fc';for(let i=0;i<4;i++){g.beginPath();g.arc(s*.38-i*s*.17,-s*.04,s*.04,0,TAU);g.fill();}g.restore();}
function stampArt(g,cx,cy,r,col,name,sub,rot,alpha){g.save();g.translate(cx,cy);g.rotate(rot);g.globalAlpha=alpha==null?1:alpha;g.strokeStyle=col;g.fillStyle=col;
  g.lineWidth=Math.max(2,r*.1);g.beginPath();g.arc(0,0,r,0,TAU);g.stroke();g.lineWidth=Math.max(1,r*.04);g.beginPath();g.arc(0,0,r*.84,0,TAU);g.stroke();
  K.txt(g,sub,0,-r*.5,{size:r*.26,color:col,maxW:r*1.3});K.txt(g,name,0,r*.02,{size:r*.4,color:col,maxW:r*1.5});
  g.fillRect(-r*.6,r*.3,r*1.2,Math.max(1.5,r*.04));K.txt(g,'✈ ARRIVED',0,r*.52,{size:r*.2,color:col,maxW:r*1.3});g.restore();}
function ticket(g,x,y,w,h,u,text,state,idx,col){const R=Math.min(u*.3,h*.25);
  g.save();g.globalAlpha=state==='dim'?.5:1;
  K.card(g,x,y,w,h,R,state==='ok'?'#dcfce7':state==='bad'?'#fee2e2':'#fff7e0',{stroke:state==='ok'?'#16a34a':state==='bad'?'#dc2626':INK,lw:Math.max(2,u*.06),blur:u*.15,dy:u*.08});
  const sw=Math.min(w*.2,u*1.4);g.strokeStyle='#a89870';g.lineWidth=2;g.setLineDash([5,5]);g.beginPath();g.moveTo(x+sw,y+R*.5);g.lineTo(x+sw,y+h-R*.5);g.stroke();g.setLineDash([]);
  g.fillStyle=col||YEL;K.rr(g,x+R*.35,y+R*.35,sw-R*.6,h-R*.7,R*.5);g.fill();
  K.txt(g,'GATE',x+sw/2,y+h*.3,{size:Math.min(sw*.28,u*.32),color:INK,maxW:sw*.8});K.txt(g,String.fromCharCode(65+idx),x+sw/2,y+h*.62,{size:Math.min(sw*.6,h*.4),color:INK,maxW:sw*.8});
  QK.txt(g,text,x+sw+(w-sw)/2,y+h/2,w-sw-u*.4,h-u*.3,Math.min(u*.9,h*.45),INK,1.15);
  if(state==='ok')K.emo(g,'✅',x+w-u*.35,y+u*.35,u*.5);if(state==='bad')K.emo(g,'❌',x+w-u*.35,y+u*.35,u*.5);g.restore();}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const S=[['프랑스','#3D7DCA','유럽'],['브라질','#8E5BD0','남아메리카'],['이집트','#D9A21B','아프리카'],['일본','#E4572E','아시아']];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    const u=Math.min(W0,H0)/6;sky(g,W0,H0,T,0,H0,u);
    const px=((T*.12)%1.3-.15)*W0,py=H0*.3+Math.sin(T*1.4)*u*.2;g.setLineDash([8,8]);g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=2;g.beginPath();g.moveTo(0,H0*.3);g.lineTo(px,py);g.stroke();g.setLineDash([]);plane(g,px,py,u*1.5,-.08);
    const n=Math.min(4,Math.floor(W0/(u*2.1)));for(let i=0;i<n;i++){const s=S[i],k=((T*.5+i*.6)%3)/3;const sc=1+Math.max(0,1-k*6)*1.2;stampArt(g,W0*(.14+i*.24)+Math.sin(i)*u*.1,H0*(.72),u*.85*sc/1.3,s[1],s[0],s[2],(i-1.5)*.18,Math.min(1,k*8));}};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'passport',title:'세계 여행 여권',title1:'공항 출국장 · 세계 일주',title2:'세계 여행 여권',emoji:LOGO,
  subtitle:'6학년 사회 · 세계 여러 나라',
  howto:'비행기가 목적지를 향해 날아가요. <b>도착하기 전에</b> 알맞은 탑승권을 눌러요! 맞히면 여권에 나라 도장이 쾅! 찍혀요. 빨리 맞힐수록 점수가 커요.',
  how:p=>({continent:'나라 이름을 보고 <b>어느 대륙</b>인지 골라요',landmark:'유명한 <b>명소</b>를 보고 <b>나라</b>를 맞혀요',capital:'나라의 <b>수도</b>를 골라요'}[p.levelId]),
  theme:{c1:'#ffd23f',c2:'#38bdf8'},hero:heroScene,vignette:.08,durs:[90,150,240],levelTitle:'어디로 여행을 떠날까요?',
  txt:{who:'누가 여행자일까요?',dur:'여행 시간',pace:'비행 시간',seat:'번 여행자 ',go:'탑승 시작!',s1:'1. 여행지',s2:'2. 방법',s3:'3. 이름'},
  levels:DECKS.map(d=>({id:d.key,g:'6학년',t:d.ic+' '+d.label,d:d.desc})),
  summary:`<ul><li>세계에는 <b>6개 대륙</b>이 있어요: 아시아·유럽·아프리카·북아메리카·남아메리카·오세아니아.</li>
    <li>나라마다 대표하는 <b>명소와 문화</b>가 있어요. 에펠탑(프랑스), 피라미드(이집트), 마추픽추(페루), 시드니 오페라 하우스(오스트레일리아)처럼 짝으로 기억해요.</li>
    <li><b>수도</b>는 나라의 중심 도시예요. 도쿄(일본)·베이징(중국)·파리(프랑스)·워싱턴 D.C.(미국)처럼 나라와 함께 외워요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const top=(p.top||0)+u*.35;const land=W>=H*1.15;const skyH=Math.min(u*2.1,H*.2);const pad=u*.35;const q=p.state.q;const n=q?q.opts.length:3;
    const y0=top+skyH+u*.3;let ox,ow,oy1,pass;
    if(land){ox=pad;ow=W*.6-pad;oy1=H-pad;pass={x:W*.6+pad*.5,y:y0,w:W*.4-pad*1.5,h:H-y0-pad};}
    else{const ph=Math.min(u*3.4,H*.2);ox=pad;ow=W-pad*2;oy1=H-ph-pad*1.5;pass={x:pad,y:H-ph-pad,w:W-pad*2,h:ph};}
    return{W,H,u,top,land,skyH,y0,ox,ow,oy1,pass,n,cols:n===6?2:1};},
  rects(p){const G=this.geo(p);return QK.grid(G.ox*2+G.ow,G.y0,G.oy1,G.n,G.cols,G.ox,G.u*.3).map(r=>r);},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,stamps:[]});this.newQ(p);},
  make(p,L){const R=p.R;let list=[];
    if(L==='continent')list=C.map(c=>({c,text:`<b>${c[0]}</b>${jo(c[0],'은','는')} 어느 대륙에 있을까요?`,ans:c[1],opts:Object.keys(CONT).map(k=>[k,CONT[k][0]])}));
    if(L==='landmark')C.forEach(c=>c[3].forEach(h=>list.push({c,text:`<b>${h}</b>${jo(h,'은','는')}?`,ans:c[0],opts:null})));
    if(L==='capital')C.filter(c=>c[2]).forEach(c=>list.push({c,text:`<b>${c[0]}</b>의 수도는?`,ans:c[2],opts:null,cap:true}));
    const it=p.deck(list,'dk_'+L);let opts=it.opts;
    if(!opts){const key=it.cap?2:0;const same=C.filter(c=>c!==it.c&&c[key]&&c[1]===it.c[1]),other=C.filter(c=>c!==it.c&&c[key]&&c[1]!==it.c[1]);
      const picks=R.shuffle(same).slice(0,1).concat(R.shuffle(other).slice(0,2-Math.min(1,same.length)));opts=R.shuffle([it.c,...picks]).map(c=>[c[key],c[key]]);}
    const okIdx=opts.findIndex(o=>o[0]===it.ans);const lab=L==='continent'?CONT[it.ans][0]:it.ans;
    const rev=L==='capital'?it.c[0]+'의 수도는 '+lab:L==='landmark'?it.text.replace(/<[^>]+>/g,'')+' → '+lab:it.c[0]+' → '+lab;
    return{c:it.c,L,text:it.text,opts,okIdx,ans:lab,reveal:rev,review:rev,speak:it.c[0]};},
  qtime(){return 12;},askHtml(q){return '✈️ '+q.text;},askSub(q){return q.L==='continent'?'알맞은 대륙 탑승권을 눌러요':q.L==='capital'?'수도 탑승권을 눌러요':'나라 탑승권을 눌러요';},
  isOk(q,i){return i===q.okIdx;},tipOf(q){return '정답은 '+q.ans;},goodTip(q){return q.L==='capital'?q.c[0]+'의 수도는 '+q.ans:q.c[0]+' · '+CONT[q.c[1]][0];},
  onVerdict(p,q,ok){const st=p.state;if(ok){st.stamps.unshift({name:q.c[0],sub:CONT[q.c[1]][0],col:CONT[q.c[1]][1],rot:(p.R.f()-.5)*.5,t:0});if(st.stamps.length>8)st.stamps.pop();}},
  upd(p,dt){const st=p.state;st.stamps.forEach(s=>s.t+=dt);},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const rs=this.rects(p);const i=rs.findIndex(r=>K.inRect(x,y,r));if(i>=0)this.verdict(p,i,false);},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const r=this.rects(p)[q.okIdx];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;
    K.vgrad(g,0,0,W,H,['#0b1d33','#10294a','#0b1d33']);
    /* 하늘: 비행기가 시간에 맞춰 날아가요 */
    const sx=u*.35,sw=W-u*.7,sy=G.top,sh=G.skyH;g.save();K.rr(g,sx,sy,sw,sh,u*.25);g.clip();sky(g,W,H,t,sy,sh,u);
    const f=st.lock?(st.res==='ok'?1:Math.max(0,st.qt/st.qmax)):1-Math.max(0,st.qt/Math.max(.001,st.qmax));const fy=sy+sh*.55;const ax=sx+sw*.1,bx=sx+sw*.86;
    g.setLineDash([u*.2,u*.2]);g.strokeStyle='rgba(255,255,255,.65)';g.lineWidth=Math.max(2,u*.05);g.beginPath();g.moveTo(ax,fy);g.lineTo(bx,fy);g.stroke();g.setLineDash([]);
    const px=ax+(bx-ax)*(st.lock&&st.res==='ok'?1:f),py=fy+Math.sin(t*3)*u*.08-Math.sin(f*Math.PI)*sh*.18;plane(g,px,py,u*1.1,-.08);g.restore();
    K.rr(g,sx,sy,sw,sh,u*.25);g.lineWidth=2;g.strokeStyle='#34608f';g.stroke();
    K.emo(g,'🧳',ax-u*.2,fy+u*.1,u*.6);K.txt(g,st.lock&&st.res==='ok'?'✅':'🏁',bx+u*.1,fy-u*.05,{size:u*.7,maxW:u*1});
    /* 탑승권 */
    const rs=this.rects(p);const gcol=['#38bdf8','#fb923c','#a3e635','#f472b6','#c4b5fd','#fde047'];
    rs.forEach((r,i)=>{let s='idle';if(st.lock){if(i===q.okIdx)s='ok';else if(i===st.pick)s='bad';else s='dim';}
      const col=q.L==='continent'?CONT[q.opts[i][0]][1]:gcol[i%gcol.length];ticket(g,r.x,r.y,r.w,r.h,u,q.opts[i][1],s,i,col);});
    /* 여권 */
    const P=G.pass;K.card(g,P.x,P.y,P.w,P.h,u*.3,'#16335c',{stroke:YEL,lw:2,blur:u*.15,dy:u*.06});K.txt(g,'🛂 나의 여권',P.x+P.w/2,P.y+u*.5,{size:Math.min(u*.55,P.w*.09),color:YEL,maxW:P.w*.8});
    const pg={x:P.x+u*.25,y:P.y+u*.95,w:P.w-u*.5,h:P.h-u*1.5};K.rr(g,pg.x,pg.y,pg.w,pg.h,u*.15);g.fillStyle='#fff4d6';g.fill();
    const cols=G.land?2:4,rows=G.land?4:2;const cw=pg.w/cols,ch=pg.h/rows;
    for(let i=0;i<cols*rows;i++){const cx=pg.x+(i%cols+.5)*cw,cy=pg.y+(Math.floor(i/cols)+.5)*ch;const r0=Math.min(cw,ch)*.46;g.strokeStyle='rgba(120,100,60,.2)';g.lineWidth=1;g.setLineDash([4,4]);g.beginPath();g.arc(cx,cy,r0,0,TAU);g.stroke();g.setLineDash([]);
      const s=st.stamps[i];if(s){const k=Math.min(1,s.t/.28);const sc=1+(1-k)*1.8;stampArt(g,cx,cy,r0*sc,s.col,s.name,s.sub,s.rot,Math.min(1,k*1.6));}}
    if(st.stamps.length===0)K.txt(g,'맞히면 도장이 찍혀요',pg.x+pg.w/2,pg.y+pg.h/2,{size:Math.min(u*.45,pg.w*.1),color:'#9a8a60',maxW:pg.w*.9});
    K.txt(g,'도장 '+(st.okN||0)+'개',P.x+P.w/2,P.y+P.h-u*.25,{size:u*.3,color:'#9fc4e8',maxW:P.w*.8});
  },
};
QZ.mix(GAME,{say:false,pts0:50,pts1:50,okMs:1200,badMs:2300});
Engine.boot(GAME);
