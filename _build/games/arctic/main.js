/* 4학년 · 기후변화와 우리 생활 — 북극곰 빙하 지키기 (튀어나오는 카드 중 알맞은 것만 톡!)
   디자인: 오로라가 흐르는 북극의 밤. 북극곰은 직접 그린 그림이고, 맞히면 춤추고 틀리면 빙하가 갈라지며 떨어요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const plain=s=>String(s).replace(/<[^>]+>/g,'');
const hash=n=>{n=Math.imul(n^(n>>>16),0x45d9f3b);n=Math.imul(n^(n>>>15),0x45d9f3b);return((n^(n>>>16))>>>0)/4294967296;};
const LOGO='<svg class="logo" viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" fill="#173a6b" stroke="#bfeaff" stroke-width="2.5"/><circle cx="24" cy="27" r="11" fill="#fff"/><circle cx="15" cy="16" r="4.5" fill="#fff"/><circle cx="33" cy="16" r="4.5" fill="#fff"/><circle cx="20" cy="25" r="1.8" fill="#173a6b"/><circle cx="28" cy="25" r="1.8" fill="#173a6b"/><ellipse cx="24" cy="30" rx="3.5" ry="2.6" fill="#173a6b"/></svg>';
/*@@CLIM@@*/
/* 북극곰 (앉은 모습): (x,y)=엉덩이 바닥 가운데, s=키 */
function bear(g,x,y,s,t,mood){g.save();g.translate(x,y);const dance=mood==='happy'?Math.abs(Math.sin(t*9)):0;const shiver=mood==='worry'||mood==='cry'?Math.sin(t*45)*s*.012:0;g.translate(shiver,-dance*s*.1);
  g.lineJoin='round';g.lineWidth=Math.max(2,s*.035);g.strokeStyle='#5b86a8';
  K.shadow(g,0,s*.02+dance*s*.1,s*.42,s*.07,.25);
  const fur=(cx,cy,rx,ry)=>{const gr=g.createRadialGradient(cx-rx*.3,cy-ry*.4,rx*.1,cx,cy,rx*1.2);gr.addColorStop(0,'#ffffff');gr.addColorStop(1,'#d4ecfa');g.fillStyle=gr;g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,TAU);g.fill();g.stroke();};
  /* 몸 */
  fur(0,-s*.26,s*.34,s*.3);
  /* 다리/발 */
  fur(-s*.22,-s*.06,s*.13,s*.09);fur(s*.22,-s*.06,s*.13,s*.09);
  /* 팔 */
  const arm=d=>{g.save();g.translate(d*s*.3,-s*.38);g.rotate(mood==='happy'?d*(-2.4+Math.sin(t*12)*.35):d*.35);fur(0,s*.12,s*.09,s*.17);g.restore();};arm(-1);arm(1);
  /* 머리 */
  g.save();g.translate(0,-s*.66+(mood==='cry'?s*.03:0));
  for(const d of[-1,1])fur(d*s*.22,-s*.18,s*.07,s*.07);
  fur(0,0,s*.27,s*.23);
  g.fillStyle='#f0f9ff';g.beginPath();g.ellipse(0,s*.07,s*.13,s*.1,0,0,TAU);g.fill();g.stroke();
  g.fillStyle='#173a6b';g.beginPath();g.ellipse(0,s*.03,s*.045,s*.032,0,0,TAU);g.fill();
  g.strokeStyle='#173a6b';g.fillStyle='#173a6b';g.lineWidth=Math.max(1.6,s*.03);g.lineCap='round';
  if(mood==='happy'){for(const d of[-1,1]){g.beginPath();g.arc(d*s*.1,-s*.04,s*.04,Math.PI*1.1,Math.PI*1.9);g.stroke();}g.beginPath();g.arc(0,s*.09,s*.07,.1*Math.PI,.9*Math.PI);g.stroke();g.fillStyle='rgba(255,140,160,.55)';for(const d of[-1,1]){g.beginPath();g.ellipse(d*s*.17,s*.03,s*.04,s*.025,0,0,TAU);g.fill();}}
  else if(mood==='cry'){for(const d of[-1,1]){g.beginPath();g.arc(d*s*.1,-s*.04,s*.03,0,TAU);g.fill();}g.strokeStyle='#7ccbf0';g.lineWidth=Math.max(1.6,s*.03);for(const d of[-1,1]){g.beginPath();g.moveTo(d*s*.1,-s*.01);g.lineTo(d*s*.12,s*.16+((t*2)%1)*s*.05);g.stroke();}g.strokeStyle='#173a6b';g.beginPath();g.arc(0,s*.15,s*.05,1.15*Math.PI,1.85*Math.PI);g.stroke();}
  else if(mood==='worry'){for(const d of[-1,1]){g.beginPath();g.arc(d*s*.1,-s*.04,s*.035,0,TAU);g.fill();g.beginPath();g.moveTo(d*s*.16,-s*.12);g.lineTo(d*s*.05,-s*.09);g.stroke();}g.beginPath();g.arc(0,s*.14,s*.05,1.15*Math.PI,1.85*Math.PI);g.stroke();g.fillStyle='#8fe3ff';g.beginPath();g.ellipse(s*.26,-s*.1+((t*1.5)%1)*s*.08,s*.025,s*.04,0,0,TAU);g.fill();}
  else{const bl=(t%3.4)<.12;for(const d of[-1,1]){if(bl){g.beginPath();g.moveTo(d*s*.1-s*.03,-s*.04);g.lineTo(d*s*.1+s*.03,-s*.04);g.stroke();}else{g.beginPath();g.arc(d*s*.1,-s*.04,s*.03,0,TAU);g.fill();}}g.beginPath();g.arc(0,s*.1,s*.04,.15*Math.PI,.85*Math.PI);g.stroke();}
  g.restore();
  /* 목도리 */
  g.fillStyle='#ff5d73';g.strokeStyle='#8a1f33';g.lineWidth=Math.max(1.6,s*.03);K.rr(g,-s*.2,-s*.5,s*.4,s*.08,s*.04);g.fill();g.stroke();K.rr(g,s*.06,-s*.46,s*.08,s*.2,s*.03);g.fill();g.stroke();
  g.restore();}
function aurora(g,W,H,t){g.save();g.globalCompositeOperation='screen';const bands=[['rgba(94,234,212,.34)',.1,.3,0],['rgba(167,139,250,.28)',.2,.34,1.7],['rgba(110,231,183,.22)',.05,.28,3.1]];
  bands.forEach(([c,y0,h,ph])=>{const gr=g.createLinearGradient(0,H*y0,0,H*(y0+h));gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(.5,c);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.moveTo(0,H*(y0+h));for(let x=0;x<=W;x+=W/24)g.lineTo(x,H*y0+Math.sin(x/W*5+t*.5+ph)*H*.05+Math.sin(x/W*11-t*.8+ph)*H*.02);g.lineTo(W,H*(y0+h));g.closePath();g.fill();});g.restore();}
function snow(g,W,H,t,u,n){g.fillStyle='rgba(255,255,255,.8)';for(let i=0;i<n;i++){const x=((hash(i)*W+Math.sin(t*.6+i)*u*.3)%W+W)%W,y=((hash(i+99)*H+t*u*(.4+hash(i+7)*.6))%H),r=u*(.03+hash(i+3)*.05);g.beginPath();g.arc(x,y,r,0,TAU);g.fill();}}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const u=Math.min(W,H)/8,hz=H*.58;K.vgrad(g,0,0,W,hz+2,['#070e2b','#14346a','#2a6c8f']);K.stars(g,W,hz*.7,T,70,9);aurora(g,W,H,T);
    g.fillStyle='#e8f6ff';[[.12,.5,.1],[.4,.3,.07],[.7,.55,.12],[.9,.35,.08]].forEach(([x,h,w])=>{g.beginPath();g.moveTo(W*(x-w),hz+1);g.lineTo(W*(x-w*.3),hz-H*.22*h);g.lineTo(W*(x+w*.15),hz-H*.18*h);g.lineTo(W*(x+w),hz+1);g.fill();});
    K.water(g,hz,W,H,'#2f86b5','#06264a',T,u*.07);
    const iw=W*.7,iy=H*.84,ih=H*.18;g.fillStyle='#8fd0ee';g.beginPath();g.ellipse(W/2,iy+ih*.2,iw/2,ih/2,0,0,TAU);g.fill();g.fillStyle='#f2fbff';g.beginPath();g.ellipse(W/2,iy,iw/2,ih/2,0,0,TAU);g.fill();
    bear(g,W/2,iy+ih*.1,Math.min(u*2.6,H*.42),T,Math.sin(T*.8)>.2?'happy':'neutral');snow(g,W,H,T,u,60);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}

const GAME={
  id:'sci4-climate',title:'북극곰 빙하 지키기',title1:'북극곰을 지켜요',title2:'빙하 지키기',emoji:LOGO,
  subtitle:'4학년 · 기후변화와 우리 생활',
  howto:'얼음 구멍에서 카드가 튀어나와요! 질문에 <b>알맞은 카드만 빨리 톡</b> 눌러요. 맞히면 빙하가 커지고, 틀리면 빙하가 녹아요.',
  how:'알맞은 카드만 <b>빨리 톡!</b><br>틀린 카드는 그냥 두세요',
  txt:{who:'누구와 지킬까요?',dur:'지키는 시간',pace:'카드 속도',seat:'번 대원 ',go:'빙하 지키러 출발!',s1:'1. 주제',s2:'2. 방법',s3:'3. 이름'},
  theme:{c1:'#38bdf8',c2:'#7ff0d0'},hero:heroScene,vignette:.05,durs:[60,90,120],
  levelTitle:'무엇을 지킬까요?',
  levels:[
    {id:'act',g:'4학년 · 기후변화와 우리 생활',t:'🚌 기후 위기를 막는 행동',d:'우리가 할 수 있는 일'},
    {id:'case',g:'4학년 · 기후변화와 우리 생활',t:'🧊 기후변화의 모습',d:'빙하·해수면·폭염·가뭄'},
    {id:'cause',g:'4학년 · 기후변화와 우리 생활',t:'🏭 지구가 더워지는 까닭',d:'온실 기체를 늘리는 일'},
    {id:'all',g:'4학년 · 기후변화와 우리 생활',t:'🌟 모두 섞기',d:'번갈아 나와요'},
  ],
  summary:`<ul><li><b>기후변화</b>: 오랜 기간에 걸쳐 지구의 기온, 비의 양 같은 날씨의 평균이 바뀌는 것이에요. 이산화 탄소 같은 온실 기체가 늘어 지구가 더워지고 있어요.</li>
    <li>기후변화의 모습: 빙하가 녹고 해수면이 높아져요, 폭염·가뭄·홍수가 잦아져요, 생물이 사는 곳이 바뀌어요.</li>
    <li>우리가 할 일: 대중교통·걷기·자전거, 전기 아끼기, 일회용품 줄이기, 분리배출, 나무 심기, 재생 에너지 쓰기</li></ul>`,
  init(p){const st=p.state;Object.assign(st,{holes:[],ice:.6,kN:0,cnt:0,spawnT:.6,T:0,mood:'neutral',moodT:0,lt:-1,cracks:0,combo:0});this.layout(p);this.useSet(p);},
  layout(p){const st=p.state,W=p.W,H=p.H,u=p.u;const old=st.holes.map(h=>h.card);const wide=W>H*1.1;const cols=wide?3:2,rows=wide?2:3;const y0=Math.max(p.top||0,u*2.6)+u*2.1,y1=H-u*3.9;st.holes=[];
    for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)st.holes.push({x:W*(c+.5)/cols,y:y0+Math.max(u,(y1-y0))*(r+.5)/rows-u*.4,card:old[r*cols+c]||null});st.lt=p.top;},
  resize(p){this.layout(p);},
  useSet(p){const st=p.state,L=p.levelId;st.k=L==='all'?['act','case','cause'][st.kN++%3]:L;st.cnt=0;p.ask(CLIM[st.k].ask,CLIM[st.k].sub);},
  spawn(p){const st=p.state,R=p.Rf;const free=st.holes.filter(h=>!h.card);if(!free.length)return;const h=R.pick(free);const S=CLIM[st.k];const good=R.chance(.5);
    const a=p.deck(good?S.yes:S.no,st.k+(good?'y':'n'));const life=Math.max(1.9,3-p.t/p.dur*1)/p.pace;h.card={a,good,t:0,life,state:'up'};st.cnt++;
    if(p.levelId==='all'&&st.cnt>=9)this.useSet(p);},
  update(p,dt){const st=p.state;st.T+=dt;if(st.lt!==p.top)this.layout(p);if(st.moodT>0){st.moodT-=dt;if(st.moodT<=0)st.mood='neutral';}st.cracks=Math.max(0,st.cracks-dt);
    st.spawnT-=dt;const busy=st.holes.filter(h=>h.card).length;
    if(st.spawnT<=0&&busy<Math.min(3,st.holes.length-1)){this.spawn(p);st.spawnT=p.Rf.num(.45,.9)/p.pace;}
    for(const h of st.holes){const c=h.card;if(!c)continue;c.t+=dt;
      if(c.state==='up'&&c.t>c.life){c.state='down';c.t=0;if(c.good){st.ice=Math.max(.15,st.ice-.03);const rv=`${c.a[1]} → ${CLIM[st.k].ask.replace(/<[^>]+>/g,'').replace(/^\S+\s/,'').replace(' 톡!','')}`;if(!p.wrong.includes(rv)&&p.wrong.length<40)p.wrong.push(rv);}}
      if((c.state==='down'||c.state==='hit')&&c.t>.35)h.card=null;}},
  pill(g,str,x,y,s,bg,fg){g.save();g.font=K.font(s);const w=K.mw(g,str,s)+s*1.1;K.card(g,x-w/2,y-s*.78,w,s*1.56,s*.78,bg,{blur:s*.5,dy:s*.12,hi:false});K.txt(g,str,x,y+s*.03,{size:s,color:fg});g.restore();},
  draw(p,g){const W=p.W,H=p.H,u=p.u,st=p.state,t=st.T;const hz=H*.3;
    K.vgrad(g,0,0,W,hz+2,['#070e2b','#14346a','#2a6c8f']);K.stars(g,W,hz*.8,t,60,9);aurora(g,W,H,t);
    g.fillStyle='#e8f6ff';[[.12,.5,.09],[.3,.35,.06],[.62,.55,.11],[.88,.4,.07]].forEach(([x,h,w])=>{g.beginPath();g.moveTo(W*(x-w),hz+1);g.lineTo(W*(x-w*.3),hz-hz*h);g.lineTo(W*(x+w*.15),hz-hz*h*.8);g.lineTo(W*(x+w),hz+1);g.fill();});
    g.fillStyle='rgba(120,170,220,.5)';[[.12,.5,.09],[.3,.35,.06],[.62,.55,.11],[.88,.4,.07]].forEach(([x,h,w])=>{g.beginPath();g.moveTo(W*(x+w*.15),hz-hz*h*.8);g.lineTo(W*(x+w),hz+1);g.lineTo(W*(x+w*.05),hz+1);g.fill();});
    K.water(g,hz,W+16,H,'#2f86b5','#06264a',t,u*.06);
    g.save();g.strokeStyle='rgba(255,255,255,.14)';g.lineWidth=2;for(let k=0;k<9;k++){const y=hz+(H-hz)*(k+.5)/9,x0=((k*173+t*u*.3)%(W+u*3))-u*1.5;g.beginPath();g.moveTo(x0,y);g.quadraticCurveTo(x0+u*.6,y-u*.12,x0+u*1.2,y);g.stroke();}g.restore();
    /* 빙하와 북극곰 */
    const iw=W*(.25+st.ice*.55),ih=Math.min(H*.12,u*1.6),iy=H-u*1.5,th=ih*.35;
    K.shadow(g,W/2,iy+th+ih*.2,iw*.52,ih*.25,.25);
    g.fillStyle='#7cc7e8';g.beginPath();g.ellipse(W/2,iy+th,iw/2,ih/2,0,0,Math.PI);g.lineTo(W/2-iw/2,iy);g.ellipse(W/2,iy,iw/2,ih/2,0,Math.PI,0,true);g.closePath();g.fill();
    const tg=g.createLinearGradient(0,iy-ih/2,0,iy+ih/2);tg.addColorStop(0,'#ffffff');tg.addColorStop(1,'#d7efff');g.fillStyle=tg;g.beginPath();g.ellipse(W/2,iy,iw/2,ih/2,0,0,TAU);g.fill();
    if(st.cracks>0||st.ice<.35){g.strokeStyle='rgba(60,120,170,.8)';g.lineWidth=Math.max(1.5,u*.05);g.beginPath();g.moveTo(W/2-iw*.2,iy-ih*.3);g.lineTo(W/2-iw*.12,iy);g.lineTo(W/2-iw*.2,iy+ih*.15);g.moveTo(W/2+iw*.25,iy-ih*.25);g.lineTo(W/2+iw*.15,iy+ih*.05);g.stroke();}
    const mood=st.moodT>0?st.mood:(st.ice<.3?'cry':(st.ice<.45?'worry':'neutral'));
    bear(g,W/2,iy-ih*.1,u*(1.9+st.ice*.7),t,mood);
    this.pill(g,'🧊 빙하 '+Math.round(st.ice*100)+'%',W/2,Math.min(iy+ih*.9+th,H-u*.35),u*.3,st.ice<.3?'#fee2e2':'rgba(255,255,255,.95)',st.ice<.3?'#b91c1c':'#0e5a7a');
    for(const h of st.holes){const hw=Math.min(W/(st.holes.length>4?3:2)*.8,u*4.4);const hy=h.y+u*.9;
      K.shadow(g,h.x,hy+u*.32,hw*.62,u*.3,.25);
      g.fillStyle='#86cde9';g.beginPath();g.ellipse(h.x,hy+u*.14,hw*.6,u*.55,0,0,TAU);g.fill();
      const fg=g.createLinearGradient(0,hy-u*.55,0,hy+u*.55);fg.addColorStop(0,'#ffffff');fg.addColorStop(1,'#dff1fb');g.fillStyle=fg;g.beginPath();g.ellipse(h.x,hy,hw*.6,u*.55,0,0,TAU);g.fill();
      const hg=g.createLinearGradient(0,hy-u*.32,0,hy+u*.32);hg.addColorStop(0,'#06304a');hg.addColorStop(1,'#1677a3');g.fillStyle=hg;g.beginPath();g.ellipse(h.x,hy,hw*.42,u*.3,0,0,TAU);g.fill();
      const c=h.card;if(!c)continue;let k=1;if(c.state==='up')k=Math.min(1,c.t/.18);else k=Math.max(0,1-c.t/.35);
      g.save();g.beginPath();g.rect(h.x-hw,h.y-u*3,hw*2,u*3.9);g.clip();
      const cy=h.y+u*.9-(u*1.6)*k;const hit=c.state==='hit';const col=hit?(c.res?'#dcfce7':'#ffe4e6'):'#ffffff';
      if(hit)K.glow(g,h.x,cy-u*.1,hw*.8,c.res?'#4ade80':'#fb7185',.45);
      K.card(g,h.x-hw/2,cy-u*1.15,hw,u*2.1,u*.35,col,{blur:u*.35,dy:u*.1,stroke:hit?(c.res?'#4ade80':'#fb7185'):'rgba(14,116,144,.25)',lw:hit?3:1.5});
      K.glow(g,h.x,cy-u*.65,u*.6,'#bae6fd',.5);K.emo(g,c.a[0],h.x,cy-u*.65,u*.72);
      K.tag(g,c.a[1],h.x,cy+u*.25,{size:u*.38,maxW:hw*.95,fill:'#ffffff00',stroke:'#ffffff00',shadow:false,maxLines:2,color:'#0f3a52'});
      if(c.state==='up'){const bw=hw*.7,f=Math.max(0,1-c.t/c.life);K.rr(g,h.x-bw/2,cy+u*.72,bw,u*.08,u*.04);g.fillStyle='rgba(14,116,144,.15)';g.fill();K.rr(g,h.x-bw/2,cy+u*.72,bw*f,u*.08,u*.04);g.fillStyle=f<.3?'#f97316':'#22d3ee';g.fill();}
      g.restore();
      g.save();g.beginPath();g.rect(h.x-hw,hy,hw*2,u*.6);g.clip();g.fillStyle=fg;g.beginPath();g.ellipse(h.x,hy,hw*.6,u*.55,0,0,TAU);g.ellipse(h.x,hy,hw*.42,u*.3,0,0,TAU);g.fill('evenodd');g.restore();}
    snow(g,W,H,t,u,50);},
  down(p,x,y){const st=p.state,u=p.u;for(const h of st.holes){const c=h.card;if(!c||c.state!=='up')continue;const hw=Math.min(p.W/(st.holes.length>4?3:2)*.8,u*4.4);
      if(Math.abs(x-h.x)<hw/2&&y>h.y-u*1.9&&y<h.y+u*1.1){c.state='hit';c.t=0;c.res=c.good;
        if(c.good){st.ice=Math.min(1,st.ice+.05);st.mood='happy';st.moodT=1;p.hit(true,{x:h.x,y:h.y-u*1.5,color:'#a5f3fc'});}
        else{st.ice=Math.max(.1,st.ice-.08);st.mood='worry';st.moodT=1.4;st.cracks=1.2;p.hit(false,{x:h.x,y:h.y-u*1.5,tip:`‘${c.a[1]}’${J(c.a[1],'은').slice(c.a[1].length)} 알맞지 않아요`,review:`${c.a[1]} → 알맞지 않아요 (${CLIM[st.k].ask.replace(/<[^>]+>/g,'').replace(/^\S+\s/,'').replace(' 톡!','')})`});}
        return;}}},
};

Engine.boot(GAME);
