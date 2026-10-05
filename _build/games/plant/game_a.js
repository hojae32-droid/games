/* 6학년 · 식물의 구조와 기능 — 물방울 점프 (뿌리에서 잎까지 정답 잎을 밟고 올라가기)
   디자인: 식물 도감 — 손으로 그린 듯한 초록 윤곽선, 흙 속 단면에서 꽃까지. 잎·꽃·벌레·물방울 친구는 모두 직접 그린 그림이에요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const plain=s=>String(s).replace(/<[^>]+>/g,'');
const hash=n=>{n=Math.imul(n^(n>>>16),0x45d9f3b);n=Math.imul(n^(n>>>15),0x45d9f3b);return((n^(n>>>16))>>>0)/4294967296;};
const INK='#2f5d3a';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M24 4c8 9 11 15 11 21a11 11 0 0 1-22 0c0-6 3-12 11-21z" fill="#6ec6ff" stroke="#2f5d3a" stroke-width="2.6" stroke-linejoin="round"/><circle cx="20" cy="26" r="1.9" fill="#2f5d3a"/><circle cx="28" cy="26" r="1.9" fill="#2f5d3a"/><path d="M20 31q4 3 8 0" fill="none" stroke="#2f5d3a" stroke-width="2.2" stroke-linecap="round"/><path d="M6 44q9-9 18-3 9-6 18 3z" fill="#63c46f" stroke="#2f5d3a" stroke-width="2.2" stroke-linejoin="round"/></svg>';

/* ───────── 그림 도구 ───────── */
function leafShape(g,x,y,w,hh,c1,c2,flip,vein,ink){g.save();g.translate(x,y);if(flip)g.scale(-1,1);g.beginPath();g.moveTo(-w/2,0);g.quadraticCurveTo(-w*.05,-hh*1.7,w/2,0);g.quadraticCurveTo(-w*.05,hh*1.7,-w/2,0);g.closePath();
  const gr=g.createLinearGradient(0,-hh,0,hh);gr.addColorStop(0,c1);gr.addColorStop(1,c2);g.fillStyle=gr;g.fill();if(ink!==false){g.lineWidth=Math.max(2,hh*.16);g.strokeStyle=INK;g.lineJoin='round';g.stroke();}
  g.strokeStyle='rgba(255,255,255,.6)';g.lineWidth=Math.max(1.5,hh*.1);g.lineCap='round';g.beginPath();g.moveTo(-w*.45,0);g.quadraticCurveTo(0,-hh*.15,w*.44,0);g.stroke();
  if(vein!==false){g.lineWidth=Math.max(1,hh*.06);g.beginPath();for(let k=-2;k<=2;k++){const sx=k*w*.13;g.moveTo(sx,-hh*.05);g.lineTo(sx+w*.08,-hh*.6);g.moveTo(sx,hh*.02);g.lineTo(sx+w*.08,hh*.55);}g.stroke();}g.restore();}
function flowerShape(g,x,y,r,col,t){g.save();g.translate(x,y);g.rotate(Math.sin(t*1.2+x)*.1);g.fillStyle=col;g.strokeStyle=INK;g.lineWidth=Math.max(1.5,r*.1);for(let i=0;i<6;i++){g.save();g.rotate(i*TAU/6);g.beginPath();g.ellipse(0,-r*.62,r*.34,r*.5,0,0,TAU);g.fill();g.stroke();g.restore();}
  g.fillStyle='#ffd84a';g.beginPath();g.arc(0,0,r*.34,0,TAU);g.fill();g.stroke();g.restore();}
function butterfly(g,x,y,s,t,col){g.save();g.translate(x,y);const f=Math.abs(Math.sin(t*8+x));g.fillStyle=col;g.strokeStyle=INK;g.lineWidth=Math.max(1.2,s*.06);for(const d of [-1,1]){g.save();g.scale(d*Math.max(.25,f),1);g.beginPath();g.ellipse(s*.3,-s*.1,s*.34,s*.26,-.4,0,TAU);g.ellipse(s*.26,s*.2,s*.22,s*.18,.3,0,TAU);g.fill();g.stroke();g.restore();}
  g.strokeStyle=INK;g.lineWidth=Math.max(2,s*.1);g.lineCap='round';g.beginPath();g.moveTo(0,-s*.25);g.lineTo(0,s*.3);g.stroke();g.restore();}
function worm(g,x,y,s,t){g.save();g.strokeStyle=INK;g.lineWidth=s*.34;g.lineCap='round';g.beginPath();for(let i=0;i<=8;i++){const px=x+i*s*.18,py=y+Math.sin(i*.9+t*3)*s*.12;i?g.lineTo(px,py):g.moveTo(px,py);}g.stroke();
  g.strokeStyle='#ffb3b3';g.lineWidth=s*.22;g.beginPath();for(let i=0;i<=8;i++){const px=x+i*s*.18,py=y+Math.sin(i*.9+t*3)*s*.12;i?g.lineTo(px,py):g.moveTo(px,py);}g.stroke();
  g.fillStyle=INK;g.beginPath();g.arc(x+8*s*.18+s*.05,y+Math.sin(8*.9+t*3)*s*.12-s*.04,s*.05,0,TAU);g.fill();g.restore();}
function drop(g,x,y,r,sq,face,col){g.save();g.translate(x,y);g.scale(1/sq,sq);g.beginPath();g.moveTo(0,-r*1.5);g.bezierCurveTo(r*1.1,-r*.3,r*1.05,r,0,r);g.bezierCurveTo(-r*1.05,r,-r*1.1,-r*.3,0,-r*1.5);g.closePath();
  g.fillStyle='#6ec6ff';g.fill();g.lineWidth=Math.max(2.4,r*.14);g.strokeStyle=INK;g.lineJoin='round';g.stroke();g.fillStyle='rgba(255,255,255,.7)';g.beginPath();g.ellipse(-r*.42,-r*.1,r*.15,r*.32,.3,0,TAU);g.fill();
  g.fillStyle=INK;g.beginPath();g.ellipse(-r*.3,r*.15,r*.1,r*.15,0,0,TAU);g.ellipse(r*.3,r*.15,r*.1,r*.15,0,0,TAU);g.fill();
  g.strokeStyle=INK;g.lineWidth=Math.max(2,r*.1);g.lineCap='round';g.beginPath();g.arc(0,r*.38,r*.2,.15*Math.PI,.85*Math.PI);g.stroke();g.fillStyle='rgba(255,130,150,.55)';g.beginPath();g.arc(-r*.52,r*.42,r*.13,0,TAU);g.arc(r*.52,r*.42,r*.13,0,TAU);g.fill();g.restore();
  g.save();g.fillStyle=col;g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.arc(x,y-r*1.95,r*.17,0,TAU);g.fill();g.stroke();g.restore();}
function labelLeaf(g,str,cx,cy,s,maxW,st){g.save();g.font=K.font(s);const w=Math.min(maxW,g.measureText(str).width+s*1.4),h=s*1.5;
  K.rr(g,cx-w/2,cy-h/2,w,h,h*.45);g.fillStyle=st==='ok'?'#d8f7b0':st==='bad'?'#ffd6dc':'#ffffff';g.fill();g.lineWidth=Math.max(2,s*.1);g.strokeStyle=st==='bad'?'#e0476b':INK;g.stroke();g.restore();
  K.txt(g,str,cx,cy+s*.03,{size:s,color:'#23452b',maxW:w-s*.5});}
function pillG(g,str,x,y,s,bg,fg){g.save();g.font=K.font(s);const w=K.mw(g,str,s)+s*1.5,h=s*1.6;K.rr(g,x,y,w,h,h/2);g.fillStyle=bg;g.fill();g.lineWidth=2.5;g.strokeStyle=INK;g.stroke();g.restore();K.txt(g,str,x+w/2,y+h/2+s*.03,{size:s,color:fg});return w;}

/* 첫 화면 위쪽 그림: 씨앗이 자라 꽃이 피고 물방울이 줄기를 타고 올라가요 */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.min(.05,(now-last)/1000||0);last=now;T+=dt;size();
    g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);const u=Math.min(W,H)/9;
    const sk=g.createLinearGradient(0,0,0,H*.72);sk.addColorStop(0,'#8fd3ff');sk.addColorStop(1,'#e8f7d8');g.fillStyle=sk;g.fillRect(0,0,W,H);
    for(let i=0;i<3;i++){const cx=((i*W*.33+T*u*.3)%(W+u*4))-u*2,cy=H*(.14+.1*(i%2));g.fillStyle='rgba(255,255,255,.9)';g.beginPath();g.ellipse(cx,cy,u*1.1,u*.32,0,0,TAU);g.ellipse(cx-u*.5,cy+u*.05,u*.6,u*.26,0,0,TAU);g.ellipse(cx+u*.55,cy+u*.05,u*.65,u*.24,0,0,TAU);g.fill();}
    g.fillStyle='#d9c1a0';g.fillRect(0,H*.74,W,H);g.fillStyle='#b78d62';for(let i=0;i<24;i++){g.beginPath();g.ellipse(hash(i)*W,H*(.78+hash(i+3)*.2),u*(.1+hash(i+7)*.15),u*.08,0,0,TAU);g.fill();}
    g.fillStyle='#7ccf6a';g.fillRect(0,H*.72,W,H*.03);g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(0,H*.735);g.lineTo(W,H*.735);g.stroke();
    const cx=W*.24,ground=H*.735,cyc=(T%14)/14,grow=Math.min(1,cyc*1.6),bloom=clamp((cyc-.5)*3,0,1);
    /* 뿌리 */
    g.strokeStyle='#fff3dc';g.lineWidth=u*.14;g.lineCap='round';for(const [dx,l] of [[-1.2,1.4],[1,1.1],[-.4,1.6],[.5,1.3]]){g.beginPath();g.moveTo(cx,ground);g.quadraticCurveTo(cx+dx*u*.5,ground+l*u*.5,cx+dx*u*.9*grow,ground+l*u*.9*grow);g.stroke();}
    /* 줄기·잎·꽃 */
    const sh=H*.55*grow;g.strokeStyle=INK;g.lineWidth=u*.34;g.beginPath();g.moveTo(cx,ground);g.lineTo(cx,ground-sh);g.stroke();g.strokeStyle='#63c46f';g.lineWidth=u*.22;g.beginPath();g.moveTo(cx,ground);g.lineTo(cx,ground-sh);g.stroke();
    if(grow>.35)leafShape(g,cx+u*1.1,ground-sh*.42,u*2.2*Math.min(1,(grow-.3)*2),u*.45,'#8ee07c','#3fae5a',false);
    if(grow>.6)leafShape(g,cx-u*1.1,ground-sh*.7,u*2.2*Math.min(1,(grow-.5)*2),u*.45,'#8ee07c','#3fae5a',true);
    if(bloom>0)flowerShape(g,cx,ground-sh-u*.2,u*1.2*bloom,'#ff9fb8',T);
    /* 줄기 타고 오르는 물방울 */
    const dy=ground-((T*.28)%1)*sh;drop(g,cx,dy,u*.28,1,false,'#fff');
    /* 나비와 벌레 */
    butterfly(g,W*.4+Math.sin(T*.7)*u*1.5,H*.3+Math.cos(T*1.1)*u*.5,u*.8,T,'#ffb86b');worm(g,W*.1,H*.84,u*1.4,T);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}

/* ───────── 게임 내용 ───────── */
const PL_Q={
  part:[
    {q:'뿌리에서 흡수한 <b>물이 이동하는 통로</b>는?',y:['줄기'],n:['꽃잎','씨']},{q:'땅속의 <b>물을 흡수</b>하는 곳은?',y:['뿌리'],n:['꽃','열매']},
    {q:'<b>광합성</b>으로 양분을 만드는 곳은?',y:['잎'],n:['뿌리','씨']},{q:'광합성에 <b>필요한 것</b>은?',y:['빛','물','이산화 탄소'],n:['산소','어둠']},
    {q:'광합성으로 만들어지는 <b>양분</b>은?',y:['녹말'],n:['소금','이산화 탄소']},{q:'잎의 물이 수증기로 빠져나가는 것은?',y:['증산 작용'],n:['광합성','꽃가루받이']},
    {q:'양분을 저장해 굵어진 <b>뿌리</b>는?',y:['고구마','당근','무'],n:['감자','양파']},{q:'양분을 저장해 굵어진 <b>줄기</b>는?',y:['감자'],n:['고구마','당근']},
    {q:'<b>식물 세포</b>에만 있는 것은?',y:['세포벽'],n:['핵','세포막']},{q:'세포의 생명 활동을 조절하는 것은?',y:['핵'],n:['세포벽','꽃가루']},
  ],
  flower:[
    {q:'<b>꽃가루</b>를 만드는 곳은?',y:['수술'],n:['암술','꽃받침']},{q:'꽃가루받이 뒤 <b>씨</b>가 생기는 곳은?',y:['암술'],n:['수술','꽃잎']},
    {q:'꽃가루받이를 <b>도와주는 것</b>은?',y:['곤충','새','바람','물'],n:['돌','어둠']},{q:'씨를 보호하고 퍼뜨리는 것은?',y:['열매'],n:['뿌리','줄기']},
    {q:'<b>바람</b>에 날려 퍼지는 씨는?',y:['민들레','단풍나무'],n:['도꼬마리','봉선화']},{q:'<b>동물 털</b>에 붙어 퍼지는 씨는?',y:['도꼬마리','도깨비바늘'],n:['민들레','연꽃']},
    {q:'꼬투리가 <b>터지면서</b> 퍼지는 씨는?',y:['봉선화','콩'],n:['단풍나무','도꼬마리']},{q:'<b>물</b>에 떠서 퍼지는 씨는?',y:['연꽃','코코야자'],n:['도깨비바늘','봉선화']},
    {q:'동물에게 <b>먹혀서</b> 퍼지는 씨는?',y:['벚나무','머루'],n:['민들레','봉선화']},
  ],
};
const GAME={
  id:'sci6-plant',title:'물방울 점프',title1:'뿌리에서 꽃까지',title2:'물방울 점프',emoji:LOGO,
  subtitle:'6학년 · 식물의 구조와 기능',
  howto:'물방울이 통통 튀어 올라요! 손가락을 <b>좌우로</b> 움직여 방향을 바꾸고, 질문에 맞는 <b>정답 잎</b>을 밟아요. 틀린 잎은 부서져요. 뿌리 → 줄기 → 잎 → 꽃까지 올라가 봐요!',
  how:'손가락을 <b>좌우로</b> 움직여<br>정답 잎을 밟고 올라가요',
  txt:{who:'누구와 함께 자랄까요?',dur:'성장 시간',seat:'번 물방울 ',go:'점프 시작!'},
  theme:{c1:'#3fae5a',c2:'#ff8fa3'},hero:heroScene,vignette:.04,durs:[60,90,120],
  levelTitle:'올라갈 내용 고르기',
  levels:[
    {id:'part',g:'6학년 · 식물의 구조와 기능',t:'🌿 뿌리·줄기·잎·세포',d:'광합성과 증산 작용'},
    {id:'flower',g:'6학년 · 식물의 구조와 기능',t:'🌸 꽃·열매·씨 퍼지기',d:'꽃가루받이와 씨의 이동'},
    {id:'all',g:'6학년 · 식물의 구조와 기능',t:'🌟 모두 섞기',d:'골고루 나와요'},
  ],
  summary:`<ul><li><b>뿌리</b>: 물을 흡수하고 식물을 지지하며 양분을 저장해요(고구마, 당근, 무). <b>줄기</b>: 물이 이동하는 통로, 지지, 저장(감자).</li>
    <li><b>잎</b>: 빛·물·이산화 탄소로 양분(녹말)을 만드는 <b>광합성</b>, 잎의 기공으로 물이 수증기로 빠져나가는 <b>증산 작용</b></li>
    <li><b>꽃</b>: 수술의 꽃가루가 암술로 옮겨지는 꽃가루받이(곤충·새·바람·물이 도움) 뒤 씨가 생겨요. <b>열매</b>는 씨를 보호하고 퍼뜨려요.</li>
    <li>씨 퍼지기: 바람(민들레, 단풍나무) · 동물 털(도꼬마리) · 터짐(봉선화, 콩) · 물(연꽃) · 동물이 먹음(벚나무)</li><li>식물 세포에는 핵, 세포막과 함께 <b>세포벽</b>이 있어요.</li></ul>`,
  init(p){const st=p.state;Object.assign(st,{x:p.W/2,y:p.H*.7,vy:0,tx:p.W/2,cam:0,plats:[],hi:0,kN:0,got:0,T:0});
    for(let i=0;i<9;i++)this.addPlat(p,p.H*.85-i*this.gapY(p),i===0);this.newQ(p);},
  gapY(p){return Math.min(p.H*.13,p.u*1.9);},
  newQ(p){const st=p.state,L=p.levelId;const pool=L==='all'?[...PL_Q.part,...PL_Q.flower]:PL_Q[L];st.q=p.deck(pool,'pq');st.got=0;p.ask('💧 '+st.q.q,'정답 잎을 밟아요!');
    for(const pl of st.plats)if(pl.y<st.y-p.u*.5&&!pl.used)this.label(p,pl);},
  label(p,pl){const st=p.state,R=p.Rf;if(R.chance(.25)){pl.lab=null;return;}const good=R.chance(.62);pl.lab=R.pick(good?st.q.y:st.q.n);pl.ok=good;pl.q=st.q;},
  addPlat(p,y,first){const st=p.state,R=p.Rf;const w=Math.min(p.u*3.9,p.W*.44);const pl={x:first?p.W/2:R.num(w/2,p.W-w/2),y,w,used:false,lab:null};if(!first&&st.q)this.label(p,pl);st.plats.push(pl);},
  update(p,dt){const st=p.state,u=p.u,W=p.W,H=p.H;
    st.x+=(st.tx-st.x)*Math.min(1,dt*10);st.x=K.clamp(st.x,u*.4,W-u*.4);
    const g=H*1.55;const prevY=st.y;st.vy+=g*dt;st.y+=st.vy*dt;
    if(st.vy>0){for(const pl of st.plats){if(pl.broken)continue;const sy=pl.y;if(prevY<=sy&&st.y>=sy&&Math.abs(st.x-pl.x)<pl.w/2+u*.45){st.y=sy;st.vy=-Math.sqrt(2*g*this.gapY(p)*2.6);p.Snd.tone(500+Math.random()*80,.05,'sine',.03);
          if(pl.lab&&!pl.used){pl.used=true;if(pl.ok){st.got++;p.hit(true,{x:pl.x,y:pl.y-st.cam-u,tip:`정답: ${pl.lab}`,tipMs:1200});if(st.got>=2)setTimeout(()=>{if(p.active)this.newQ(p);},200);}
            else{pl.broken=true;st.vy=-Math.sqrt(2*g*this.gapY(p))*.6;p.hit(false,{x:pl.x,y:pl.y-st.cam-u,tip:`‘${pl.lab}’${J(pl.lab,'은').slice(pl.lab.length)} 아니에요! 정답: <b>${pl.q.y.join(', ')}</b>`,review:`${plain(pl.q.q)} → ${pl.q.y.join(', ')}`});}}
          break;}}}
    const target=st.y-H*.45;if(target<st.cam)st.cam=target;st.hi=Math.max(st.hi,-st.cam);
    while(Math.min(...st.plats.map(q=>q.y))>st.cam-this.gapY(p))this.addPlat(p,Math.min(...st.plats.map(q=>q.y))-this.gapY(p)*p.Rf.num(.85,1.15));
    st.plats=st.plats.filter(q=>q.y<st.cam+H+u*2);
    if(st.y>st.cam+H+u){p.add(-5,W/2,H*.5);const low=st.plats.filter(q=>!q.broken).sort((a,b)=>b.y-a.y)[0];if(low){st.x=low.x;st.tx=low.x;st.y=low.y-u;st.vy=-Math.sqrt(2*g*this.gapY(p)*2.6);}else{st.y=st.cam+H*.5;st.vy=-H;}}},
  ZBG:[['#c79a6b','#9a6c42','#6b4526'],['#bfe6ff','#e3f6d5'],['#aee0ff','#f2fbdc'],['#ffd9ec','#f1e8ff']],
  zbg(g,W,H,z){K.vgrad(g,0,0,W,H,this.ZBG[z]);},
  deco(p,g,z,a){const W=p.W,H=p.H,u=Math.min(p.u,W/7),st=p.state,t=st.T;if(a<=0)return;g.save();g.globalAlpha*=a;
    const par=st.cam*.55,step=u*2.6,j0=Math.floor(par/step)-1,j1=Math.floor((par+H)/step)+1,cx=W/2,sw=u*.75;
    if(z===0){/* 흙 속: 돌멩이, 지렁이, 개미, 굵은 뿌리 */
      for(let j=j0;j<=j1;j++){const y=j*step-par,r=this.hash(j),r2=this.hash(j+.5);
        g.fillStyle='rgba(255,236,206,.22)';g.beginPath();g.ellipse(r*W,y,u*(.3+r2*.4),u*(.18+r2*.2),r*3,0,TAU);g.fill();
        g.fillStyle='rgba(60,32,12,.18)';g.beginPath();g.arc(r2*W,y+step*.5,u*.08,0,TAU);g.fill();
        if(((j%4)+4)%4===1){worm(g,r2<.5?W*(.05+r2*.2):W*(.62+r2*.2),y+step*.3,u*.9,t+j);}}
      g.strokeStyle='#fff3dc';g.lineCap='round';
      for(let j=j0;j<=j1;j++){const y=j*step-par,s=j%2?1:-1,L=u*(1.6+this.hash(j+3)*1.6);g.lineWidth=Math.max(2,u*.14);g.beginPath();g.moveTo(cx,y);g.quadraticCurveTo(cx+s*L*.5,y+u*.2,cx+s*L,y+u*.9);g.stroke();
        g.lineWidth=Math.max(1,u*.06);g.beginPath();g.moveTo(cx+s*L*.6,y+u*.4);g.lineTo(cx+s*L*.75,y+u*1.1);g.stroke();}
      g.fillStyle='#fbe9cf';g.fillRect(cx-sw/2,0,sw,H);g.strokeStyle=INK;g.lineWidth=3;g.strokeRect(cx-sw/2,0,sw,H);}
    else{/* 줄기와 물관 속 물방울 */
      if(z>=2)for(let j=j0;j<=j1;j++){const y=j*step-par,s=j%2?1:-1;const lw=u*(2+this.hash(j)*1.2);leafShape(g,cx+s*(lw*.5+sw*.3),y-u*.3*s,lw,u*.5,'#9be68a','#52b862',s<0);}
      g.fillStyle='#63c46f';g.fillRect(cx-sw/2,0,sw,H);g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(cx-sw/2,0);g.lineTo(cx-sw/2,H);g.moveTo(cx+sw/2,0);g.lineTo(cx+sw/2,H);g.stroke();
      g.fillStyle='rgba(47,93,58,.25)';for(let j=j0;j<=j1;j++){const y=j*step-par;g.fillRect(cx-sw/2,y,sw,Math.max(2,u*.06));}
      g.fillStyle='rgba(186,230,253,.95)';for(let k=0;k<5;k++){const y=((k*H/5-t*u*1.5)%H+H)%H;g.beginPath();g.ellipse(cx,y,u*.09,u*.15,0,0,TAU);g.fill();}
      if(z===1)for(let j=j0;j<=j1;j+=2){const y=j*step-par,r=this.hash(j);const x=(r*W+t*u*.3)%(W+u*2)-u;g.fillStyle='rgba(255,255,255,.9)';g.beginPath();g.ellipse(x,y,u*.7,u*.24,0,0,TAU);g.ellipse(x-u*.3,y+u*.04,u*.4,u*.2,0,0,TAU);g.ellipse(x+u*.3,y+u*.04,u*.45,u*.18,0,0,TAU);g.fill();}
      if(z===3)for(let j=j0;j<=j1;j++){const y=j*step-par,r=this.hash(j+7);const x=r<.5?r*W*.7:W*.3+r*W*.7;const k=((j%3)+3)%3;if(k===0)flowerShape(g,x,y,u*.42,['#ff9fb8','#ffd84a','#c9a8ff'][j%3<0?0:(j%3)],t);else if(k===1)butterfly(g,x,y,u*.7,t,'#ffb86b');else flowerShape(g,x,y,u*.34,'#ffffff',t);}}
    g.restore();},
  hash(j){const v=Math.sin(j*127.1+31.7)*43758.5453;return v-Math.floor(v);},
  draw(p,g,dt){const W=p.W,H=p.H,u=Math.min(p.u,W/7),st=p.state;st.T+=dt;const h=-st.cam;const zone=h<H*2?0:h<H*5?1:h<H*9?2:3;
    const nb=[H*2,H*5,H*9][zone];const f=zone<3?K.clamp((h-(nb-H*.7))/(H*.7),0,1):0;
    this.zbg(g,W,H,zone);if(f>0){g.save();g.globalAlpha=f;this.zbg(g,W,H,zone+1);g.restore();}
    if(zone===0||f<1)this.deco(p,g,zone,1-f);if(f>0)this.deco(p,g,zone+1,f);
    for(const pl of st.plats){const y=pl.y-st.cam;if(pl.broken){g.globalAlpha=.3;}
      const lab=!!pl.lab,used=pl.used;
      const c=lab?(used?(pl.ok?['#d4f78a','#6cc24a']:['#ffd1d8','#ef8b9b']):['#9be68a','#3fae5a']):['#b9d98a','#6a9a3f'];
      g.fillStyle='rgba(47,93,58,.2)';g.beginPath();g.ellipse(pl.x,y+u*.5,pl.w*.42,u*.1,0,0,TAU);g.fill();
      leafShape(g,pl.x,y+u*.12,pl.w,u*.3,c[0],c[1],(Math.round(pl.x)%2)===0);
      if(pl.broken){g.strokeStyle='#e0476b';g.lineWidth=3;g.beginPath();g.moveTo(pl.x-u*.2,y);g.lineTo(pl.x,y+u*.2);g.lineTo(pl.x+u*.15,y+u*.05);g.stroke();}
      if(pl.lab)labelLeaf(g,pl.lab,pl.x,y-u*.34,u*.4,pl.w*1.25,used?(pl.ok?'ok':'bad'):'');g.globalAlpha=1;}
    const y=st.y-st.cam;const sq=st.vy<0?1.1:.95;drop(g,st.x,y-u*.45,u*.5,sq,true,p.color);
    const names=['🌱 뿌리','🌿 줄기','🍃 잎','🌸 꽃'];const str=names[zone]+` · 높이 ${Math.round(h/u)}`;pillG(g,str,u*.2,u*.18,u*.34,'#fffef4','#23452b');},
  down(p,x){p.state.tx=x;},
  move(p,x,y,down,e){if(down||(e&&e.pointerType==='mouse'))p.state.tx=x;},
};
Engine.boot(GAME);
