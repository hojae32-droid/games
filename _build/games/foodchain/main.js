/* 4학년 · 생물과 환경 — 먹이사슬 생존 (내가 먹는 것은 먹고, 천적은 피하기)
   디자인: 거친 붓글씨 + 흙빛 만화. 들판·연못·풀은 직접 그린 그림이고, 배가 부르면 커지는 보너스가 있어요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const plain=s=>String(s).replace(/<[^>]+>/g,'');
const hash=n=>{n=Math.imul(n^(n>>>16),0x45d9f3b);n=Math.imul(n^(n>>>15),0x45d9f3b);return((n^(n>>>16))>>>0)/4294967296;};
const LOGO='<svg class="logo" viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" fill="#9bcf6a" stroke="#3b2410" stroke-width="3"/><path d="M12 30l8-10 6 6 10-12" fill="none" stroke="#3b2410" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="36" cy="14" r="4" fill="#e8541a" stroke="#3b2410" stroke-width="2"/></svg>';
/*@@DATA@@*/
function tuft(g,x,y,s,col){g.strokeStyle=col;g.lineWidth=Math.max(1.5,s*.12);g.lineCap='round';g.beginPath();for(const d of[-.6,0,.6]){g.moveTo(x+d*s*.4,y);g.quadraticCurveTo(x+d*s*.5,y-s*.6,x+d*s*1.1,y-s*1.1);}g.stroke();}
function bloom(g,x,y,s,c){g.fillStyle=c;for(let i=0;i<5;i++){const a=i*TAU/5;g.beginPath();g.arc(x+Math.cos(a)*s*.3,y+Math.sin(a)*s*.3,s*.22,0,TAU);g.fill();}g.fillStyle='#ffe066';g.beginPath();g.arc(x,y,s*.2,0,TAU);g.fill();}
function field(g,W,H,u,ch,Z0){K.vgrad(g,0,0,W,H,ch?['#c6ee9a','#9bd96a','#7cc455']:['#bfe8c9','#8fd6ae','#6cbf97']);
  const R=makeR(ch?11:23);for(let k=0;k<9;k++){g.fillStyle=ch?'rgba(255,245,170,.22)':'rgba(220,255,245,.22)';g.beginPath();g.ellipse(R.f()*W,R.f()*H,u*(1.8+R.f()*2.4),u*(1+R.f()*1.2),R.f()*3,0,TAU);g.fill();}
  /* 흙길 */
  g.strokeStyle='rgba(176,128,70,.35)';g.lineWidth=u*1.1;g.lineCap='round';g.beginPath();g.moveTo(-u,H*.62);g.bezierCurveTo(W*.3,H*.5,W*.55,H*.82,W+u,H*.7);g.stroke();
  if(!ch){const px=W*.82,py=H*.78,pr=Math.min(W,H)*.2;g.fillStyle='rgba(56,148,190,.25)';g.beginPath();g.ellipse(px,py,pr*1.05,pr*.55,0,0,TAU);g.fill();const pg=g.createRadialGradient(px-pr*.3,py-pr*.2,pr*.1,px,py,pr);pg.addColorStop(0,'#a5e6f7');pg.addColorStop(1,'#4aa8cf');g.fillStyle=pg;g.beginPath();g.ellipse(px,py,pr*.95,pr*.48,0,0,TAU);g.fill();g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=2;[.5,.75].forEach(f=>{g.beginPath();g.ellipse(px,py,pr*.95*f,pr*.48*f,0,Math.PI*1.1,Math.PI*1.6);g.stroke();});}
  for(let k=0;k<30;k++)tuft(g,R.f()*W,R.f()*H,u*(.25+R.f()*.2),ch?'rgba(34,110,50,.45)':'rgba(20,100,80,.4)');
  for(let k=0;k<9;k++)bloom(g,R.f()*W,R.f()*H,u*.4,['#ff7aa8','#fff','#ffd23f','#b49cff'][k%4]);}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const ch=CHAINS[0];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const u=Math.min(W,H*1.4)/8;K.vgrad(g,0,0,W,H*.45,['#ffb347','#ffd98a','#ffeec2']);K.glow(g,W*.8,H*.2,u*3,'#fff3b0',.8);g.fillStyle='#ffd23f';g.beginPath();g.arc(W*.8,H*.2,u*.6,0,TAU);g.fill();
    g.fillStyle='#e6a560';g.beginPath();g.moveTo(0,H*.45);for(let x=0;x<=W;x+=W/20)g.lineTo(x,H*.45-u*.5*(.5+.5*Math.sin(x/W*6+1)));g.lineTo(W,H*.45);g.fill();
    field(g,W,H,u,true);g.save();g.beginPath();g.rect(0,0,W,H*.44);g.clip();K.vgrad(g,0,0,W,H*.45,['#ffb347','#ffd98a','#ffeec2']);g.fillStyle='#e6a560';g.beginPath();g.moveTo(0,H*.45);for(let x=0;x<=W;x+=W/20)g.lineTo(x,H*.45-u*.5*(.5+.5*Math.sin(x/W*6+1)));g.lineTo(W,H*.45);g.fill();K.glow(g,W*.8,H*.2,u*3,'#fff3b0',.8);g.fillStyle='#ffd23f';g.beginPath();g.arc(W*.8,H*.2,u*.6,0,TAU);g.fill();g.restore();
    /* 먹이 사슬 행진 */
    const n=ch.length;ch.forEach((a,i)=>{const x=W*(.12+.76*i/(n-1)),y=H*.72+Math.sin(T*3+i)*u*.12;K.shadow(g,x,y+u*.55,u*.5,u*.12,.25);K.emo(g,a[0],x,y,u*1.25);
      if(i<n-1){const ax=W*(.12+.76*(i+.5)/(n-1));g.fillStyle='#3b2410';g.beginPath();g.moveTo(ax-u*.25,y-u*.1);g.lineTo(ax+u*.2,y-u*.1);g.lineTo(ax+u*.2,y-u*.28);g.lineTo(ax+u*.5,y);g.lineTo(ax+u*.2,y+u*.28);g.lineTo(ax+u*.2,y+u*.1);g.lineTo(ax-u*.25,y+u*.1);g.fill();}});};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}

const GAME={
  id:'sci4-foodchain',title:'먹이사슬 생존',title1:'먹고 먹히는 들판',title2:'먹이사슬 생존',emoji:LOGO,
  subtitle:'4학년 · 생물과 환경',
  howto:'손가락으로 내 생물을 움직여요. <b>내가 먹는 것</b>만 먹고, 쫓아오는 <b>천적</b>은 피해요! 시간이 지나면 다른 생물로 바뀌어요.',
  how:'손가락을 누른 채 움직여<br>먹이는 먹고, <b>천적은 피해요!</b>',
  txt:{who:'누구와 달릴까요?',dur:'생존 시간',pace:'움직이는 속도',seat:'번 생물 ',go:'생존 시작!',s1:'1. 사냥터',s2:'2. 방법',s3:'3. 이름'},
  theme:{c1:'#e8541a',c2:'#9bcf6a'},hero:heroScene,vignette:.06,durs:[60,90,120],
  levelTitle:'어디에서 살아남을까요?',
  levels:[
    {id:'chain',g:'4학년 · 생물과 환경',t:'🔗 먹이 사슬',d:'벼 → 메뚜기 → 개구리 → 뱀 → 매'},
    {id:'role',g:'4학년 · 생물과 환경',t:'🌱 생태계의 구성',d:'생물·비생물 요소, 생산자·소비자·분해자'},
    {id:'all',g:'4학년 · 생물과 환경',t:'🌟 모두 섞기',d:'번갈아 나와요'},
  ],
/*@@SUMMARY@@*/
  Z(p){return Math.max(p.top||0,p.u*2.6);},
  init(p){const st=p.state;Object.assign(st,{x:p.W/2,y:p.H*.6,tx:p.W/2,ty:p.H*.6,items:[],preds:[],inv:0,roleT:0,kN:0,T:0,full:0,big:0,chomp:0,mood:null,moodT:0});this.newRole(p);},
  newRole(p){const st=p.state,L=p.levelId,R=p.R;const k=L==='all'?(st.kN++%2?'role':'chain'):L;st.k=k;st.roleT=16;st.items=[];st.preds=[];
    if(k==='chain'){const ch=p.deck(CHAINS,'ch');const i=R.int(1,ch.length-1);st.me=ch[i];st.food=[ch[i-1]];st.pred=i<ch.length-1?ch[i+1]:null;
      const big=[['🐍','뱀'],['🦅','매'],['🦊','여우'],['🦉','부엉이']];const plant=[['🌿','풀'],['🍃','나뭇잎'],['🪨','돌멩이'],['🌸','꽃']];
      st.no=(i===1?big:plant).filter(o=>o[1]!==st.me[1]&&(!st.pred||o[1]!==st.pred[1])&&o[1]!==ch[i-1][1]);st.yes=st.food;st.chain=ch;
      p.ask(`나는 ${st.me[0]} <b>${st.me[1]}</b>! 내 먹이를 먹고 천적은 피해요`,`먹이 사슬: ${ch.map(a=>a[1]).join(' → ')}`);
      if(st.pred)for(let n=0;n<(p.W*p.H>p.u*p.u*70?2:1);n++)st.preds.push(this.mk(p,st.pred,true));}
    else{const r=p.deck(ROLES,'ro');st.role=r;st.me=['🐲','먹보 공룡'];st.yes=r.yes;st.no=r.no;st.food=null;st.pred=['☠️','오염 물질'];
      p.ask('🐲 '+r.q,'☠️ 오염 물질은 피해요');st.preds.push(this.mk(p,st.pred,true));}
    for(let n=0;n<4;n++)st.items.push(this.mk(p,R.pick(st.yes),false,true));for(let n=0;n<4;n++)st.items.push(this.mk(p,R.pick(st.no),false,false));
    st.inv=1;},
  mk(p,a,pred,good){const R=p.Rf,st=p.state,u=p.u;const yMin=this.Z(p)+u*1.5;let x,y,k=0;do{x=R.num(u,p.W-u);y=R.num(yMin,p.H-u);k++;}while(k<30&&Math.hypot(x-st.x,y-st.y)<u*3.5);
    const ang=R.num(0,6.28);return{a,x,y,vx:Math.cos(ang)*u*.8*p.pace,vy:Math.sin(ang)*u*.8*p.pace,pred,good,ph:R.num(0,6)};},
  update(p,dt){const st=p.state,u=p.u,W=p.W,H=p.H;st.T+=dt;const yMin=this.Z(p)+u*1.4;st.x+=(st.tx-st.x)*Math.min(1,dt*6);st.y+=(st.ty-st.y)*Math.min(1,dt*6);st.y=clamp(st.y,yMin,H-u*.6);st.inv=Math.max(0,st.inv-dt);st.big=Math.max(0,st.big-dt);st.chomp=Math.max(0,st.chomp-dt*4);if(st.moodT>0){st.moodT-=dt;if(st.moodT<=0)st.mood=null;}
    st.roleT-=dt;if(st.roleT<=0)this.newRole(p);
    const move=o=>{o.x+=o.vx*dt;o.y+=o.vy*dt;if(o.x<u*.6||o.x>W-u*.6)o.vx*=-1;if(o.y<yMin||o.y>H-u*.6)o.vy*=-1;o.x=K.clamp(o.x,u*.6,W-u*.6);o.y=K.clamp(o.y,yMin,H-u*.6);};
    const rr=u*(1.05+(st.big>0?.5:0));
    for(const o of st.items){if(p.Rf.f()<dt*.5){const a=p.Rf.num(0,6.28);o.vx=Math.cos(a)*u*.8*p.pace;o.vy=Math.sin(a)*u*.8*p.pace;}move(o);
      if(Math.hypot(o.x-st.x,o.y-st.y)<rr){o.gone=true;const nm=o.a[1];
        if(o.good){p.Snd.pop();st.chomp=1;st.mood='yum';st.moodT=.7;st.full++;p.hit(true,{x:o.x,y:o.y,tip:st.k==='chain'?`${st.me[1]}${J(st.me[1],'은').slice(st.me[1].length)} ${nm}${J(nm,'을').slice(nm.length)} 먹어요`:`${nm}: ${st.role.tipYes}`,tipMs:1300});
          if(st.full>=6){st.full=0;st.big=3;st.inv=Math.max(st.inv,3);p.add(40,st.x,st.y-u*1.4);p.burst(st.x,st.y,'#ffcb2e',20);p.tip('🍖 배가 불러요! 커져서 3초 동안 안전해요 (+40)','good',1800);p.Snd.win();}}
        else{st.full=Math.max(0,st.full-2);st.mood='ouch';st.moodT=1;p.hit(false,{x:o.x,y:o.y,tip:st.k==='chain'?`${st.me[1]}${J(st.me[1],'은').slice(st.me[1].length)} ${nm}${J(nm,'을').slice(nm.length)} 먹지 않아요! 먹이: <b>${st.food[0][1]}</b>`:`${nm}${st.role.tipNo.replace('은(는)',J(nm,'은').slice(nm.length))}`,
          review:st.k==='chain'?`먹이 사슬: ${st.chain.map(a=>a[1]).join(' → ')}`:`${nm} → ${st.role.yes.some(y=>y[1]===nm)?'':'아니에요: '}${st.role.q.replace(/<[^>]+>/g,'').replace(' 먹어요!','')}`});}}}
    st.items=st.items.filter(o=>!o.gone);while(st.items.filter(o=>o.good).length<3)st.items.push(this.mk(p,p.Rf.pick(st.yes),false,true));while(st.items.filter(o=>!o.good).length<4)st.items.push(this.mk(p,p.Rf.pick(st.no),false,false));
    for(const o of st.preds){const dx=st.x-o.x,dy=st.y-o.y,d=Math.hypot(dx,dy)||1;const sp=u*(1.3+p.t/p.dur*.9)*p.pace;o.vx+=(dx/d*sp-o.vx)*dt*1.5;o.vy+=(dy/d*sp-o.vy)*dt*1.5;move(o);
      if(st.inv<=0&&d<u*1.1){st.inv=1.6;st.full=0;st.mood='ouch';st.moodT=1.2;p.add(-30,st.x,st.y-u);p.Snd.slide(500,150,.3,.06);p.shake();
        p.tip(st.k==='chain'?`${o.a[1]}${J(o.a[1],'은').slice(o.a[1].length)} ${st.me[1]}${J(st.me[1],'을').slice(st.me[1].length)} 먹어요! 피해요`:'오염 물질은 생물에게 해로워요!','bad',1600);
        const a=Math.atan2(dy,dx);o.x-=Math.cos(a)*u*3;o.y-=Math.sin(a)*u*3;}}},
  pill(g,str,x,y,s,bg,fg,st){g.save();g.font=K.font(s);const w=K.mw(g,str,s)+s*1.1;K.card(g,x-w/2,y-s*.78,w,s*1.56,s*.78,bg,{blur:s*.3,dy:s*.1,hi:false,stroke:'#3b2410',lw:2});K.txt(g,str,x,y+s*.03,{size:s,color:fg});g.restore();},
  draw(p,g){const W=p.W,H=p.H,u=p.u,st=p.state,ch=st.k==='chain',t=st.T;const Z0=this.Z(p);
    K.layer(p,'bg'+(ch?1:0),g2=>field(g2,W,H,u,ch,Z0));
    /* 위쪽 먹이 사슬 띠 */
    if(ch&&st.chain){const n=st.chain.length,bw=Math.min(W-u*.6,n*u*1.5),bx=(W-bw)/2,by=Z0+u*.1,bh=u*1.1;K.card(g,bx,by,bw,bh,u*.3,'rgba(255,246,220,.94)',{blur:u*.2,dy:u*.06,stroke:'#3b2410',lw:2.5});
      st.chain.forEach((a,i)=>{const x=bx+bw*(i+.5)/n,me=a[1]===st.me[1],fd=st.food&&a[1]===st.food[0][1],pr=st.pred&&a[1]===st.pred[1];
        if(me||fd||pr){g.fillStyle=me?'rgba(255,203,46,.7)':(fd?'rgba(120,200,90,.6)':'rgba(240,80,80,.5)');K.rr(g,x-bw/n*.45,by+bh*.08,bw/n*.9,bh*.84,u*.2);g.fill();}
        K.emo(g,a[0],x,by+bh*.45,u*.65);K.txt(g,me?'나':(fd?'먹이':(pr?'천적':'')),x,by+bh*.9,{size:u*.22,color:'#3b2410'});
        if(i<n-1){g.fillStyle='#3b2410';const ax=bx+bw*(i+1)/n;g.beginPath();g.moveTo(ax-u*.12,by+bh*.36);g.lineTo(ax+u*.1,by+bh*.45);g.lineTo(ax-u*.12,by+bh*.54);g.fill();}});}
    /* 먹이와 다른 것들 */
    for(const o of st.items){const b=Math.sin(t*4+o.ph)*u*.05;K.shadow(g,o.x,o.y+u*.42,u*.4,u*.11,.22);K.emo(g,o.a[0],o.x,o.y-u*.1+b,u*1.0);this.pill(g,o.a[1],o.x,Math.min(o.y+u*.7,H-u*.3),u*.3,'rgba(255,246,220,.95)','#3b2410');}
    /* 천적 */
    for(const o of st.preds){const pu=1+.06*Math.sin(t*6);K.glow(g,o.x,o.y,u*1.7*pu,'#f43f5e',.38);
      g.save();g.strokeStyle='rgba(225,29,72,.6)';g.lineWidth=u*.07;g.setLineDash([u*.18,u*.14]);g.lineDashOffset=-t*u*.6;g.beginPath();g.arc(o.x,o.y,u*1.15*pu,0,TAU);g.stroke();g.restore();
      K.shadow(g,o.x,o.y+u*.6,u*.55,u*.14,.25);K.emo(g,o.a[0],o.x,o.y,u*1.4);this.pill(g,'⚠️ 천적! '+o.a[1],o.x,Math.min(o.y+u*1.0,H-u*.3),u*.28,'#e11d48','#fff');}
    /* 나 */
    const blink=st.inv>0&&st.big<=0&&Math.floor(t*10)%2;g.globalAlpha=blink?.4:1;const sz=1+(st.big>0?.35:0)+st.chomp*.12;
    K.glow(g,st.x,st.y,u*1.6*sz,st.big>0?'#ffcb2e':p.color,.4);K.shadow(g,st.x,st.y+u*.88*sz,u*.65*sz,u*.16,.25);
    g.save();g.shadowColor='rgba(15,27,61,.3)';g.shadowBlur=u*.3;g.fillStyle=p.color;g.beginPath();g.arc(st.x,st.y,u*.85*sz,0,TAU);g.fill();g.restore();
    const wg=g.createRadialGradient(st.x-u*.25,st.y-u*.3,u*.1,st.x,st.y,u*.72*sz);wg.addColorStop(0,'#ffffff');wg.addColorStop(1,'#efe6d0');g.fillStyle=wg;g.beginPath();g.arc(st.x,st.y,u*.72*sz,0,TAU);g.fill();
    K.emo(g,st.me[0],st.x,st.y,u*1.15*sz);g.globalAlpha=1;
    /* 말풍선 기분 */
    if(st.mood){const bx=st.x+u*.9*sz,by=st.y-u*.9*sz;g.save();g.translate(bx,by);g.fillStyle='#fff';g.strokeStyle='#3b2410';g.lineWidth=2.5;g.beginPath();g.arc(0,0,u*.32,0,TAU);g.fill();g.stroke();
      if(st.mood==='yum'){g.fillStyle='#e8541a';g.font=K.font(u*.4);K.txt(g,'냠!',0,0,{size:u*.3,color:'#e8541a'});}else{g.strokeStyle='#c0392b';g.lineWidth=3;g.lineCap='round';g.beginPath();g.moveTo(-u*.12,-u*.12);g.lineTo(u*.12,u*.12);g.moveTo(u*.12,-u*.12);g.lineTo(-u*.12,u*.12);g.stroke();}g.restore();}
    this.pill(g,'나',st.x,Math.max(st.y-u*1.25*sz,Z0+u*1.4),u*.3,p.color,'#fff');
    /* 배부름 게이지 + 남은 시간 */
    const gw=Math.min(W*.4,u*5),gx=u*.4,gy=H-u*.55;K.txt(g,'🍖 배부름',gx,gy-u*.3,{size:u*.28,color:'#3b2410',align:'left',stroke:'#fff3d0',lw:u*.1});K.rr(g,gx,gy,gw,u*.22,u*.11);g.fillStyle='rgba(59,36,16,.25)';g.fill();const ff=st.big>0?1:st.full/6;if(ff>0){K.rr(g,gx,gy,gw*ff,u*.22,u*.11);g.fillStyle=st.big>0?'#ffcb2e':'#e8541a';g.fill();}
    const bw=W*.35,bx=W-bw-u*.4,by=H-u*.4,bh=Math.max(5,u*.13);K.rr(g,bx,by,bw,bh,bh/2);g.fillStyle='rgba(59,36,16,.25)';g.fill();
    const f=K.clamp(st.roleT/16,0,1);if(f>0){K.rr(g,bx,by,bw*f,bh,bh/2);g.fillStyle=f<.25?'#e8541a':'#fff';g.fill();}},
  down(p,x,y,e){const off=e&&e.pointerType==='touch'?p.u*.9:0;p.state.tx=x;p.state.ty=y-off;},
  move(p,x,y,down,e){if(!down)return;const off=e&&e.pointerType==='touch'?p.u*.9:0;p.state.tx=x;p.state.ty=y-off;},
};

Engine.boot(GAME);
