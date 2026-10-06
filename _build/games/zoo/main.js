/* 1~2학년 국어 · 소리와 모양을 흉내 내는 말 — 흉내 내는 말 동물원
   디자인: 햇살 가득한 동물원 풀밭. 동물 친구들이 소리 내고 움직여요. 맞히면 친구가 스티커가 돼요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#14532d';
const strip=s=>String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const LOGO='<svg class="logo" viewBox="0 0 48 48"><circle cx="24" cy="26" r="17" fill="#fbbf24" stroke="#14532d" stroke-width="3.5"/><circle cx="9" cy="12" r="6" fill="#f59e0b" stroke="#14532d" stroke-width="3"/><circle cx="39" cy="12" r="6" fill="#f59e0b" stroke="#14532d" stroke-width="3"/><circle cx="18" cy="23" r="2.6" fill="#14532d"/><circle cx="30" cy="23" r="2.6" fill="#14532d"/><ellipse cx="24" cy="31" rx="6" ry="4.5" fill="#fff" stroke="#14532d" stroke-width="2.5"/></svg>';
/*@@DATA@@*/
/* 친구들이 움직이는 모양 (a 값에 따라) */
function move(a,t,s,k){const w=t*(1+(k%3)*.13)+k*.9;const o={dx:0,dy:0,rot:0,sx:1,sy:1,al:1};
  switch(a){
    case'hop':o.dy=-Math.abs(Math.sin(w*3.4))*s*.35;o.sy=1+.05*Math.cos(w*6.8);break;
    case'crawl':o.dx=Math.sin(w*.9)*s*.2;o.dy=Math.abs(Math.sin(w*1.8))*s*.02;o.rot=Math.sin(w*1.8)*.05;break;
    case'twinkle':o.sx=o.sy=1+.14*Math.sin(w*6);o.rot=Math.sin(w*3)*.2;break;
    case'toddle':o.rot=Math.sin(w*5)*.17;o.dy=-Math.abs(Math.sin(w*5))*s*.05;o.dx=Math.sin(w*1.2)*s*.1;break;
    case'fly':o.dx=Math.sin(w*1.5)*s*.25;o.dy=Math.sin(w*3)*s*.12;o.rot=Math.sin(w*3)*.15;break;
    case'fall':{const f=(w*.45)%1;o.dy=(f-.5)*s*.8;o.al=Math.min(1,f*5,(1-f)*4);break;}
    case'shine':o.sx=o.sy=1+.1*Math.sin(w*3);break;
    case'float':{const f=(w*.4)%1;o.dy=-f*s*.4+s*.2;o.al=Math.min(1,f*4,(1-f)*3);o.dx=Math.sin(w*2)*s*.06;break;}
    case'wag':o.rot=Math.sin(w*8)*.25;break;
    case'roll':o.dx=Math.sin(w*1.4)*s*.3;o.rot=w*2.2;break;
    case'nod':o.rot=Math.sin(w*3)*.2;o.dy=Math.abs(Math.sin(w*3))*s*.04;break;
    case'jelly':o.sx=1+.12*Math.sin(w*7);o.sy=1-.12*Math.sin(w*7);break;
    case'bloom':{const f=(w*.5)%1;o.sx=o.sy=.6+.5*Math.min(1,f*1.3);break;}
    case'bark':o.dy=-Math.abs(Math.sin(w*4))*s*.07;o.sx=1+.025*Math.sin(w*8);o.sy=1-.025*Math.sin(w*8);break;
    default:o.dy=Math.sin(w*2.4)*s*.04;}
  return o;}
function animal(g,ic,x,y,s,a,t,k,o){o=o||{};const m=move(a,t,s,k);g.save();g.translate(x+m.dx,y+m.dy);g.rotate(m.rot+(o.rot||0));g.scale(m.sx*(o.sc||1),m.sy*(o.sc||1));g.globalAlpha*=(o.noal?1:m.al)*(o.al==null?1:o.al);K.emo(g,ic,0,0,s);g.restore();return m;}
function waves(g,x,y,s,t,col){g.save();g.strokeStyle=col||'#16a34a';g.lineWidth=Math.max(2,s*.05);g.lineCap='round';for(let i=0;i<3;i++){const f=((t*1.4+i*.33)%1);g.globalAlpha=(1-f)*.7;g.beginPath();g.arc(x,y,s*(.55+f*.5),-.7,.7);g.stroke();}g.restore();}
function scene(g,W,H,u,t,gy){K.vgrad(g,0,0,W,H,['#8fd8ff','#d9f4ff','#e7fbd3']);
  K.glow(g,W*.86,H*.1,u*3,'#fde047',.7);g.fillStyle='#fde047';g.beginPath();g.arc(W*.86,H*.1,u*.7,0,TAU);g.fill();
  K.clouds(g,W,H,t,.1,3,u*1.6);
  K.hills(g,W,H,gy-u*.6,'#a7e8b6','#7fd99a',t);
  K.ground(g,gy,W,H,'#6fd08a');
  /* 울타리 */
  g.save();g.strokeStyle='#a16207';g.fillStyle='#d6a15f';g.lineWidth=Math.max(2,u*.05);const fw=u*.5;for(let x=-fw;x<W+fw;x+=fw*1.7){K.rr(g,x,gy-u*.9,fw,u*.9,fw*.3);g.fill();g.stroke();}
  g.fillRect(0,gy-u*.62,W,u*.12);g.fillRect(0,gy-u*.3,W,u*.12);g.restore();
  /* 꽃 */
  for(let i=0;i<10;i++){const x=((i*173)%1000)/1000*W,y=gy+u*.5+((i*61)%5)*(H-gy-u*.9)/5;K.emo(g,['🌼','🌷','🌸'][i%3],x,y,u*.45);}}
/* 첫 화면 그림 */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const SH=[['🐶','멍멍','bark'],['🐰','깡충깡충','hop'],['🐢','엉금엉금','crawl'],['🐤','삐악삐악','bark'],['⭐','반짝반짝','twinkle'],['🐸','폴짝폴짝','hop']];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/7:Math.min(W,H)/7;const gy=H*(wide?.74:.5);scene(g,W,H,u,T,gy);
    const n=wide?4:3;const areaX=wide?W*.04:W*.06,areaW=wide?W*.46:W*.88;const sz=Math.min(u*1.9,areaW/n*.85);
    for(let i=0;i<n;i++){const idx=(Math.floor(T/4)*n+i)%SH.length;const s=SH[idx];const x=areaX+areaW*(i+.5)/n,y=gy+u*(wide?.95:.7);K.shadow(g,x,y+sz*.45,sz*.4,sz*.08,.2);animal(g,s[0],x,y,sz,s[2],T,i);
      if(s[2]==='bark')waves(g,x+sz*.4,y-sz*.1,sz*.45,T+i,'#16a34a');
      const bw=Math.min(sz*1.7,areaW/n*1.0);K.card(g,x-bw/2,y-sz*1.05,bw,sz*.42,sz*.2,'#fff',{stroke:INK,lw:2,blur:0,dy:2,sc:INK});K.txt(g,s[1],x,y-sz*.84,{size:sz*.27,color:INK,maxW:bw*.9});}};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'k02-sound-zoo',title:'흉내 내는 말 동물원',title1:'동물 친구들의 소리·모양',title2:'흉내 내는 말 동물원',emoji:LOGO,
  subtitle:'1~2학년 · 소리와 모양을 흉내 내는 말',
  howto:'동물원 친구들이 저마다 소리를 내고 움직여요! 말풍선의 <b>흉내 내는 말</b>을 보고 알맞은 친구를 <b>콕</b> 눌러요. 맞히면 친구가 우리 동물원 스티커가 돼요. 🔈를 누르면 말을 들려줘요.',
  how:p=>({a:'<b>소리</b>를 흉내 낸 말의 주인을 찾아요 (멍멍, 꿀꿀…)',b:'<b>모양</b>을 흉내 낸 말의 주인을 찾아요 (깡충깡충…)',c:'문장의 <b>빈칸</b>에 알맞은 말을 골라요',d:'소리일까 <b>모양</b>일까? 나누어요'}[p.levelId]),
  theme:{c1:'#16a34a',c2:'#f59e0b'},hero:heroScene,vignette:.04,durs:[90,150,240],levelTitle:'어떤 동물원을 구경할까요?',
  txt:{who:'누가 사육사가 될까요?',dur:'구경 시간',pace:'한 문제 시간',seat:'번 사육사 ',go:'동물원 문 열기!',s1:'1. 구경',s2:'2. 방법',s3:'3. 이름'},
  levels:[
    {id:'a',g:'1~2학년',t:'소리 흉내 내는 말',d:'멍멍 · 꿀꿀 · 똑딱똑딱'},
    {id:'b',g:'1~2학년',t:'모양 흉내 내는 말',d:'깡충깡충 · 엉금엉금 · 반짝반짝'},
    {id:'c',g:'1~2학년',t:'문장에 알맞은 말',d:'토끼가 ( ) 뛰어요'},
    {id:'d',g:'1~2학년',t:'소리일까 모양일까',d:'흉내 내는 말 나누기'},
  ],
  summary:`<ul><li><b>소리를 흉내 내는 말</b>은 소리를 그대로 따라 한 말이에요 (멍멍, 꿀꿀, 똑딱똑딱, 꽥꽥).</li>
    <li><b>모양을 흉내 내는 말</b>은 움직임이나 모습을 흉내 낸 말이에요 (깡충깡충, 엉금엉금, 반짝반짝, 아장아장).</li>
    <li>흉내 내는 말을 쓰면 문장이 더 생생하고 재미있어져요. “토끼가 <b>깡충깡충</b> 뛰어요.”</li>
    <li>같은 동작도 말이 달라요: 거북은 <b>엉금엉금</b>, 아기는 <b>아장아장</b>, 오리는 <b>뒤뚱뒤뚱</b> 걸어요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=(p.top||0)+u*.85;const land=W>=H*1.2;const pad=Math.max(8,u*.3),gap=Math.max(6,u*.25);
    const stripH=Math.min(u*1.1,(H-Z0)*.09);const sy=Z0;const ty=Z0+stripH+gap+u*.3;
    const q=p.state.q;const choice=q&&(q.ty==='fill'||q.ty==='sort');
    const optH=choice?clamp((H-Z0)*.2,u*1.5,u*2.6):0;const optY=H-optH-pad;const gy=choice?optY-gap:H-pad;
    return{W,H,u,Z0,land,pad,gap,stripH,sy,ty,optH,optY,gy,choice};},
  /* 누를 수 있는 칸 (동물 4마리 / 보기 버튼) */
  targets(p){const G=this.geo(p),q=p.state.q;if(!q)return[];
    if(q.ty==='tap'){const area={x:G.pad,y:G.ty+G.u*1.5,w:G.W-G.pad*2,h:G.gy-(G.ty+G.u*1.5)};const cols=G.land?4:2,rows=G.land?1:2;const w=(area.w-(cols-1)*G.gap)/cols,h0=(area.h-(rows-1)*G.gap)/rows,h=Math.min(h0,w*1.1);const oy=(area.h-(rows*h+(rows-1)*G.gap))/2;
      return q.cast.map((z,i)=>({x:area.x+(i%cols)*(w+G.gap),y:area.y+oy+Math.floor(i/cols)*(h+G.gap),w,h}));}
    const n=q.opts.length;const w=(G.W-G.pad*2-(n-1)*G.gap)/n;return q.opts.map((o,i)=>({x:G.pad+i*(w+G.gap),y:G.optY,w,h:G.optH}));},
  init(p){const st=p.state;Object.assign(st,{q:null,n:0,T:0,lock:false,pick:-1,qt:0,qmax:0,mood:'neutral',mT:0,got:[],res:null,rT:0,said:0});this.newQ(p);},
  make(p,L){const R=p.R,q={};
    if(L==='a'||L==='b'){const pool=ZOO.filter(z=>z.t===(L==='a'?'s':'m'));const ans=p.deck(pool,'dk_'+L);const others=[];
      for(const z of R.shuffle(pool)){if(z===ans||others.length>=3)continue;if(z.ic===ans.ic||z.w===ans.w||others.some(o=>o.ic===z.ic||(L==='b'&&o.a===z.a))||(L==='b'&&z.a===ans.a))continue;others.push(z);}
      q.ty='tap';q.ans=ans;q.cast=R.shuffle([ans,...others]);q.okIdx=q.cast.indexOf(ans);q.text=`<b>“${ans.w}”</b> ${L==='a'?'소리를 내는':'을 흉내 낸'} 친구는 누구일까요?`;q.speak=ans.w;q.reveal=`${ans.n} ${ans.ic}`;q.word=ans.w;}
    else if(L==='c'){const ans=p.deck(ZOO,'dk_c');const tl=x=>x.s.split('___')[1].trim().slice(0,2);const ds=R.shuffle(ZOO.filter(z=>z.w!==ans.w&&z.ic!==ans.ic&&z.n!==ans.n&&tl(z)!==tl(ans)&&!(z.g&&z.g===ans.g)&&!(z.t==='m'&&z.a===ans.a))).slice(0,2);q.ty='fill';q.ans=ans;q.cast=[ans];
      q.text=ans.s.replace('___','<span class="blank">(　　)</span>');q.sent=ans.s;q.opts=R.shuffle([ans,...ds]).map(z=>({html:z.w,ok:z===ans}));q.okIdx=q.opts.findIndex(o=>o.ok);q.speak=ans.s.replace('___','무엇');q.reveal=ans.s.replace('___',ans.w);}
    else{const ans=p.deck(ZOO.filter(z=>!z.both),'dk_d');q.ty='sort';q.ans=ans;q.cast=[ans];q.text=`<b>“${ans.w}”</b>${pj(ans.w,'은')} 무엇을 흉내 낸 말일까요?`;q.speak=ans.w;q.word=ans.w;
      q.opts=[{html:'👂 소리를 흉내 냈어요',ok:ans.t==='s'},{html:'👀 모양을 흉내 냈어요',ok:ans.t==='m'}];q.okIdx=ans.t==='s'?0:1;q.reveal=`${ans.w} → ${ans.t==='s'?'소리':'모양'}을 흉내 낸 말`;}
    q.review=strip(q.text)+' → '+strip(q.reveal);return q;},
  newQ(p){const st=p.state;const q=this.make(p,p.levelId);st.q=q;st.n++;st.lock=false;st.pick=-1;st.res=null;st.rT=0;st.qmax=({tap:20,fill:24,sort:16}[q.ty])/p.pace;st.qt=st.qmax;
    p.ask('🦁 '+(q.ty==='fill'?'빈칸에 알맞은 말을 골라요':q.text),q.ty==='tap'?'말풍선을 누르면 소리를 들려줘요':q.ty==='fill'?'문장을 읽고 알맞은 흉내 내는 말을 골라요':'소리면 👂, 모양이면 👀');
    if(p.n===1&&q.speak)setTimeout(()=>{if(p.active&&st.q===q)QK.say(q.speak);},400);},
  verdict(p,i,timeout){const st=p.state,q=st.q;if(st.lock)return;st.lock=true;st.pick=i;const ok=!timeout&&i===q.okIdx;st.res=ok?'ok':'bad';st.rT=0;st.mood=ok?'happy':'oops';st.mT=1.6;if(ok)st.got.push(q.ans.ic);
    const G=this.geo(p);p.hit(ok,{x:G.W/2,y:G.ty+G.u*2,tip:ok?undefined:`${timeout?'시간이 다 됐어요! ':''}${strip(q.reveal)}`,review:q.review,tipMs:ok?1000:3200});
    setTimeout(()=>{if(p.active)this.newQ(p);},ok?1300:2600);},
  update(p,dt){const st=p.state;st.T+=dt;if(st.mT>0){st.mT-=dt;if(st.mT<=0)st.mood='neutral';}if(st.res)st.rT+=dt;
    if(st.q&&!st.lock&&st.qmax>0){st.qt-=dt;if(st.qt<=0)this.verdict(p,-1,true);}},
  bubbleRect(p){const G=this.geo(p);const w=Math.min(G.W*.7,G.u*9);return{x:G.W/2-w/2,y:G.ty,w,h:G.u*1.4};},
  down(p,x,y){const st=p.state,q=st.q;if(!q)return;
    if(q.ty==='tap'&&K.inRect(x,y,this.bubbleRect(p))&&!st.lock){QK.say(q.speak);p.Snd.tap&&p.Snd.tap();return;}
    if(q.ty==='fill'&&K.inRect(x,y,this.sentRect(p))){QK.say(q.speak);return;}
    if(st.lock)return;const i=this.targets(p).findIndex(r=>K.inRect(x,y,r));if(i>=0){p.Snd.tap&&p.Snd.tap();this.verdict(p,i,false);}},
  sentRect(p){const G=this.geo(p);return{x:G.pad,y:G.ty,w:G.W-G.pad*2,h:G.u*2.6};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;
    scene(g,W,H,u,t*.5,G.choice?G.gy:H-u*3.2);
    /* 스티커 줄 */
    K.card(g,G.pad,G.sy,W-G.pad*2,G.stripH,G.stripH/2,'rgba(255,255,255,.88)',{stroke:INK,lw:2,blur:u*.1,dy:u*.04});K.txt(g,'⭐ 내 스티커',G.pad+u*1.9,G.sy+G.stripH/2,{size:Math.min(u*.42,G.stripH*.5),color:INK,maxW:u*3.2});
    const ss=Math.min(G.stripH*.8,u*.95);const room=W-G.pad*2-u*4;const nmax=Math.max(1,Math.floor(room/(ss*1.05)));st.got.slice(-nmax).forEach((e,i)=>K.emo(g,e,G.pad+u*3.8+ss*.55+i*ss*1.05,G.sy+G.stripH/2,ss*.85));
    if(!st.lock&&st.qmax>0){const f=clamp(st.qt/st.qmax,0,1),bw=Math.min(W*.5,u*10),bh=Math.max(5,Math.min(u*.2,9)),by=G.sy+G.stripH+u*.06;K.rr(g,W/2-bw/2,by,bw,bh,bh/2);g.fillStyle='rgba(20,83,45,.2)';g.fill();K.rr(g,W/2-bw/2,by,Math.max(bh,bw*f),bh,bh/2);g.fillStyle=f>.4?'#22c55e':(f>.2?'#f59e0b':'#ef4444');g.fill();}
    const T=this.targets(p);
    if(q.ty==='tap'){const br=this.bubbleRect(p);const bob=Math.sin(t*3)*u*.05;const pop=st.res==='ok'?1+Math.sin(Math.min(1,st.rT*3)*Math.PI)*.15:1;g.save();g.translate(br.x+br.w/2,br.y+br.h/2+bob);g.scale(pop,pop);g.translate(-br.w/2,-br.h/2);
      K.card(g,0,0,br.w,br.h,br.h*.5,'#fff',{stroke:INK,lw:Math.max(3,u*.09),blur:0,dy:u*.08,sc:INK});g.fillStyle='#fff';g.strokeStyle=INK;g.lineWidth=Math.max(3,u*.09);g.beginPath();g.moveTo(br.w*.5-u*.3,br.h-1);g.lineTo(br.w*.5,br.h+u*.45);g.lineTo(br.w*.5+u*.3,br.h-1);g.fill();g.stroke();g.fillStyle='#fff';g.fillRect(br.w*.5-u*.3+g.lineWidth,br.h-g.lineWidth-1,u*.6-g.lineWidth*2,g.lineWidth+2);
      K.txt(g,'🔈 '+q.word,br.w/2,br.h/2+u*.03,{size:Math.min(u*.95,br.h*.62),color:'#c2410c',maxW:br.w*.9});g.restore();
      T.forEach((r,i)=>{const z=q.cast[i];const isAns=i===q.okIdx;const picked=st.pick===i;let al=1;if(st.lock&&!isAns&&!picked)al=.55;
        const hint=st.res==='bad'&&isAns,nope=st.res==='bad'&&picked;const sk=nope?Math.sin(t*50)*u*.08:0;
        K.card(g,r.x+sk,r.y,r.w,r.h,u*.4,hint||(st.res==='ok'&&isAns)?'#dcfce7':nope?'#fee2e2':'rgba(255,255,255,.9)',{stroke:hint||(st.res==='ok'&&isAns)?'#16a34a':nope?'#dc2626':'#86c99a',lw:Math.max(3,u*(hint?.12:.08)),blur:0,dy:u*.08,sc:'#86c99a'});
        const es=Math.min(r.w*.62,r.h*.56);const cx=r.x+r.w/2+sk,cy=r.y+r.h*.42;g.save();g.globalAlpha=al;
        if(q.ans.t==='s'&&!st.lock){}
        K.shadow(g,cx,cy+es*.55,es*.38,es*.07,.18);
        const m=animal(g,z.ic,cx,cy,es,(q.ans.t==='m')?z.a:'idle',t,i,{noal:1,sc:(st.res==='ok'&&isAns)?1.15+Math.sin(st.rT*8)*.05:1});
        if(st.res==='ok'&&isAns)waves(g,cx+es*.5,cy-es*.2,es*.5,t,'#f59e0b');
        K.txt(g,z.n,r.x+r.w/2,r.y+r.h-Math.min(u*.55,r.h*.13),{size:Math.min(u*.6,r.h*.14),color:INK,maxW:r.w*.9});g.restore();
        if(hint){K.txt(g,'👆',cx,r.y+r.h*.08,{size:u*.6});}});}
    else{/* 문장 · 소리/모양 낱말 */
      const sr=this.sentRect(p);const es=Math.min(u*3.6,(G.gy-sr.y-sr.h)*.6,W*.5);
      K.card(g,sr.x,sr.y,sr.w,sr.h,u*.4,'#fff',{stroke:INK,lw:Math.max(3,u*.09),blur:0,dy:u*.08,sc:INK});
      if(q.ty==='fill'){const pick=st.res?q.ans.w:null;const text=q.sent.replace('___',pick?'『'+pick+'』':'(　　)');QK.txt(g,text,sr.x+sr.w/2,sr.y+sr.h/2,sr.w-u*.8,sr.h-u*.5,u*1.05,st.res==='ok'?'#15803d':INK);}
      else{QK.txt(g,'🔈 “'+q.word+'”',sr.x+sr.w/2,sr.y+sr.h/2,sr.w-u*.8,sr.h-u*.5,u*1.5,'#c2410c');}
      const z=q.ans,ay=sr.y+sr.h+(G.gy-sr.y-sr.h)*.5;const ex=W/2;
      K.shadow(g,ex,ay+es*.5,es*.4,es*.07,.18);const m=animal(g,z.ic,ex,ay,es,(z.t==='m'||q.ty==='fill')?z.a:'bark',t,0,{sc:st.res==='ok'?1.12:1});
      if(z.t==='s'&&(q.ty==='sort'||st.res))waves(g,ex+es*.55,ay-es*.1,es*.5,t,'#16a34a');
      K.txt(g,z.n,ex,ay+es*.62,{size:Math.min(u*.6,es*.3),color:INK,stroke:'#fff',lw:u*.1});
      this.targets(p).forEach((r,i)=>{const o=q.opts[i];const isAns=i===q.okIdx;const picked=st.pick===i;let st2='idle';if(st.lock){if(isAns)st2='ok';else if(picked)st2='bad';else st2='dim';}
        const cols=['#fde68a','#bfdbfe','#fbcfe8'];QK.card(g,u,r,o.html,st2,{fill:st2==='idle'?cols[i%3]:undefined,bd:INK,ink:INK,blur:0});});}
    /* 소리 동물 친구 — 반응 */
    if(st.res==='ok'){for(let k=0;k<6;k++){const a=k/6*TAU+st.rT*3,r2=u*(1.4+st.rT*1.5);K.txt(g,'✨',W/2+Math.cos(a)*r2,(G.ty+G.gy)/2+Math.sin(a)*r2*.6,{size:u*.5,alpha:Math.max(0,1-st.rT/1.1)});}}
  },
};

Engine.boot(GAME);
