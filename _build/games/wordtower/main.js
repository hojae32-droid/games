/* 3~6학년 영어 · 철자 — 낱말 탑 쌓기
   디자인: 알록달록 장난감 블록 놀이방. 글자 블록을 순서대로 눌러 낱말을 만들면 탑이 한 층 올라가요. 아홉 층을 쌓으면 완공 축하! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#1e3a8a';
const LOGO=gkLogo('#fff','#3b82f6','🧱');
const COL=['#FF5C8A','#FB923C','#8B5CF6','#3B82F6','#10B981','#EAB308'];
const CFG={'3':{pic:1,min:3,max:5,dec:0},'4':{pic:1,min:4,max:7,dec:1},'5':{pic:0,min:4,max:8,dec:2},'6':{pic:0,min:5,max:10,dec:3}};
const LV={
  '3':{g:'3~6학년',t:'3학년 낱말 탑',d:'그림을 보고 쉬운 낱말 만들기 (3~5글자)'},
  '4':{g:'3~6학년',t:'4학년 낱말 탑',d:'그림을 보고 생활 낱말 · 가짜 글자 1개'},
  '5':{g:'3~6학년',t:'5학년 낱말 탑',d:'우리말 뜻을 보고 영어 낱말 · 가짜 글자 2개'},
  '6':{g:'3~6학년',t:'6학년 낱말 탑',d:'우리말 뜻을 보고 긴 낱말 · 가짜 글자 3개'},
};
const FL=9;
function hero(g,W,H,T,u){g.fillStyle='#e8f1ff';g.fillRect(0,0,W,H);const ws=['cat','sun','book','tree','star'];ws.forEach((w,i)=>{const y=H*.88-i*u*1.15,x=W/2+Math.sin(T*1.5+i)*u*.12*i;K.card(g,x-u*2.2,y-u*.5,u*4.4,u*1.05,u*.2,COL[i%6],{stroke:'#fff',lw:3,blur:0,dy:u*.06,sc:'#1e3a8a'});K.txt(g,w,x,y,{size:u*.7,color:'#fff',maxW:u*4});});
  ['A','B','C'].forEach((c,i)=>{const x=W*(.12+i*.1),y=H*.7+Math.sin(T*2+i)*u*.2;K.card(g,x-u*.7,y-u*.7,u*1.4,u*1.4,u*.25,COL[(i+3)%6],{stroke:'#fff',lw:3,blur:0,dy:u*.06,sc:'#1e3a8a'});K.txt(g,c,x,y,{size:u*1,color:'#fff'});});}
const GAME={
  id:'wordtower',title:'낱말 탑 쌓기',title1:'장난감 블록',title2:'낱말 탑 쌓기',emoji:LOGO,
  subtitle:'3~6학년 영어 · 글자 블록으로 낱말 만들기',
  howto:'🧱 그림이나 우리말 뜻에 맞는 영어 낱말을 <b>글자 블록을 순서대로 눌러서</b> 만들어요. 틀린 블록은 흔들려요. 낱말을 완성하면 탑이 한 층 올라가고, 아홉 층을 쌓으면 완공! 빠를수록 점수가 커요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:'#ff5d8f',c2:'#3b82f6'},hero:gkHero(hero),vignette:.02,durs:[120,180,300],levelTitle:'어떤 탑을 쌓을까요?',
  txt:{who:'누가 건축가일까요?',dur:'공사 시간',pace:'낱말 시간',seat:'번 건축가 ',go:'공사 시작!',s1:'1. 탑',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li>낱말은 <b>글자 하나하나의 순서</b>가 중요해요. 소리 내어 천천히 읽으며 철자를 떠올려 보세요.</li>
    <li>헷갈리기 쉬운 쌍(b/d, p/q)과 겹글자(oo, ee, ll)를 조심해요.</li>
    <li>완성한 낱말은 한 번 더 읽어 봐요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2,pad=u*.4;const wide=W>H*1.15;const st=p.state;const n=(st.tiles||[]).length||6;let tw,cl,sl,rk,bar;
    if(wide){const tww=Math.min(W*.27,u*7);tw={x:pad,y:top,w:tww,h:H-top-pad};const mx=pad*2+tww,mw=W-mx-pad;cl={x:mx,y:top,w:mw,h:Math.min(u*3.6,H*.24)};bar={x:mx,y:cl.y+cl.h+u*.1,w:mw};sl={x:mx,y:cl.y+cl.h+u*.5,w:mw,h:Math.min(u*2.6,H*.18)};rk={x:mx,y:sl.y+sl.h+u*.4,w:mw,h:H-pad-(sl.y+sl.h+u*.4)};}
    else{const ch=Math.min(H*.26,u*6);const tww=Math.min(W*.36,u*6);tw={x:W-pad-tww,y:top,w:tww,h:ch};cl={x:pad,y:top,w:W-tww-pad*3,h:ch};bar={x:pad,y:top+ch+u*.1,w:W-pad*2};sl={x:pad,y:top+ch+u*.5,w:W-pad*2,h:Math.min(u*2.4,H*.12)};rk={x:pad,y:sl.y+sl.h+u*.4,w:W-pad*2,h:H-pad-(sl.y+sl.h+u*.4)};}
    // rack tile layout
    const gap=u*.3;let best=null;for(let rows=1;rows<=3;rows++){const cols=Math.ceil(n/rows);const s=Math.min((rk.w-gap*(cols-1))/cols,(rk.h-gap*(rows-1))/rows,u*3);if(!best||s>best.s)best={rows,cols,s};}
    return{W,H,u,top,pad,tw,cl,sl,rk,bar,gap,ts:best.s,cols:best.cols,rows:best.rows,wide};},
  tilePos(G,i,n){const row=Math.floor(i/G.cols),cnt=Math.min(G.cols,n-row*G.cols),col=i%G.cols;const w=cnt*G.ts+(cnt-1)*G.gap;return{x:G.rk.x+(G.rk.w-w)/2+col*(G.ts+G.gap),y:G.rk.y+(G.rk.h-(G.rows*G.ts+(G.rows-1)*G.gap))/2+row*(G.ts+G.gap)};},
  init(p){const st=p.state,c=CFG[p.levelId];st.list=EN.words(p.levelId,{alpha:1,min:c.min,max:c.max,pic:c.pic});st.bag=EN.bag(st.list,()=>p.R.f());Object.assign(st,{T:0,W:null,pos:0,mist:0,floors:0,tower:[],phase:'idle',t0:0,lim:10,tiles:[],used:[],shake:[],wait:0,done:false,flash:0,reveal:false,fx:[]});this.next(p);},
  next(p){const st=p.state,c=CFG[p.levelId],R=p.R;if(st.tower.length>=FL)st.tower=[];const W=st.bag();st.W=W;st.pos=0;st.mist=0;st.phase='play';st.t0=st.T;st.lim=6+W.e.length*2.2;st.reveal=false;st.wait=0;
    let ls=W.e.split('');const abc='abcdefghijklmnopqrstuvwxyz';for(let i=0;i<c.dec;i++){let ch,t=0;do{ch=abc[R.int(0,25)];}while(ls.includes(ch)&&t++<30);ls.push(ch);}
    st.tiles=EN.shuffle(ls,()=>R.f());st.used=st.tiles.map(()=>false);st.shake=st.tiles.map(()=>0);p.ask('🧱 '+(c.pic?W.p+' ':'')+W.k,'글자 블록을 순서대로 눌러요');},
  update(p,dt){const st=p.state;st.T+=dt;if(st.flash>0)st.flash-=dt;st.shake=st.shake.map(v=>Math.max(0,v-dt));st.fx.forEach(f=>{f.t+=dt;f.y+=f.vy*dt;f.vy+=f.g*dt;f.x+=f.vx*dt;});st.fx=st.fx.filter(f=>f.t<1.6);
    if(st.phase==='play'&&st.T-st.t0>st.lim){st.phase='wait';st.wait=1.8;st.reveal=true;p.hit(false,{pen:5,shake:false,tip:'시간이 다 됐어요',tipMs:1200,review:st.W.k+' = '+st.W.e});}
    if(st.wait>0){st.wait-=dt;if(st.wait<=0)this.next(p);}},
  down(p,x,y){const st=p.state,G=this.geo(p);if(st.phase!=='play')return;const n=st.tiles.length;for(let i=0;i<n;i++){if(st.used[i])continue;const t=this.tilePos(G,i,n);if(x>=t.x&&x<=t.x+G.ts&&y>=t.y&&y<=t.y+G.ts){this.press(p,i);return;}}},
  press(p,i){const st=p.state,G=this.geo(p);const W=st.W;if(st.tiles[i]===W.e[st.pos]){st.used[i]=true;st.pos++;p.Snd.tone&&p.Snd.tone(500+st.pos*60,.06,'sine',.05);
      if(st.pos===W.e.length){st.phase='wait';st.wait=1.1;const el=st.T-st.t0;p.hit(true,{pts:st.mist?50:EN.pts(Math.min(el,st.lim),st.lim),x:G.sl.x+G.sl.w/2,y:G.sl.y});enSay(W.e,.8);st.tower.push(W.e);
        if(st.tower.length>=FL){st.wait=2.2;st.flash=.5;for(let k=0;k<40;k++)st.fx.push({x:G.tw.x+G.tw.w/2,y:G.tw.y+G.tw.h*.3,vx:(p.R.f()-.5)*G.u*14,vy:-p.R.f()*G.u*8,g:G.u*14,t:0,c:COL[k%6]});setTimeout(()=>p.hit(true,{pts:100,x:G.tw.x+G.tw.w/2,y:G.tw.y+G.tw.h*.3}),600);}}}
    else{st.shake[i]=.4;if(!st.mist)p.hit(false,{pen:5,shake:false,x:this.tilePos(G,i,st.tiles.length).x+G.ts/2,y:this.tilePos(G,i,st.tiles.length).y,tip:'다른 글자예요',tipMs:700,review:W.k+' = '+W.e});st.mist++;}},
  botAct(p){const st=p.state,G=this.geo(p);if(st.phase!=='play')return null;const i=st.tiles.findIndex((c,k)=>!st.used[k]&&c===st.W.e[st.pos]);if(i<0)return null;const t=this.tilePos(G,i,st.tiles.length),rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+t.x+G.ts/2,y:rc.top+t.y+G.ts/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,w=st.W;if(!w)return;const c=CFG[p.levelId];
    g.fillStyle='#e8f1ff';g.fillRect(0,0,W,H);g.fillStyle='rgba(59,130,246,.07)';for(let i=0;i<Math.ceil(W/(u*2));i++)for(let j=0;j<Math.ceil(H/(u*2));j++)if((i+j)%2)g.fillRect(i*u*2,j*u*2,u*2,u*2);
    // tower
    const T=G.tw;K.card(g,T.x,T.y,T.w,T.h,u*.3,'#fff',{stroke:INK,lw:3,blur:0,dy:u*.06,sc:'#1e3a8a'});g.save();K.rr(g,T.x,T.y,T.w,T.h,u*.3);g.clip();g.fillStyle='#86efac';g.fillRect(T.x,T.y+T.h-u*.5,T.w,u*.5);
    const fh=Math.min((T.h-u*1.4)/(FL+.8),T.w*.28);const n=st.tower.length;st.tower.forEach((t,i)=>{const sway=Math.sin(st.T*1.4+i*.5)*(i*.004)*T.w+(i%2?1:-1)*T.w*.02;const bw=T.w*.82,x=T.x+(T.w-bw)/2+sway,y=T.y+T.h-u*.5-fh*(i+1);K.card(g,x,y,bw,fh*.96,fh*.2,COL[i%6],{stroke:'#fff',lw:2,blur:0,dy:fh*.05,sc:'#1e3a8a'});K.txt(g,t,x+bw/2,y+fh*.48,{size:fh*.55,color:'#fff',maxW:bw*.9});});
    if(n>=FL){const y=T.y+T.h-u*.5-fh*FL;K.emo(g,'🚩',T.x+T.w/2,y-fh*.5,fh*1.3);}
    K.txt(g,'🧱 '+n+'층',T.x+T.w/2,T.y+u*.6,{size:Math.min(u*.8,T.w/6),color:INK,maxW:T.w*.9});g.restore();
    // clue
    const C=G.cl;K.card(g,C.x,C.y,C.w,C.h,u*.3,'#fff',{stroke:INK,lw:3,blur:0,dy:u*.06,sc:'#1e3a8a'});
    if(c.pic){K.emo(g,w.p,C.x+C.h*.55,C.y+C.h*.5,Math.min(C.h*.75,C.w*.35));K.txt(g,w.k,C.x+C.h*1.1+(C.w-C.h*1.1)/2,C.y+C.h*.5,{size:Math.min(C.h*.3,(C.w-C.h*1.1)/Math.max(3,w.k.length)*1.4),color:INK,maxW:C.w-C.h*1.2});}
    else K.txt(g,w.k,C.x+C.w/2,C.y+C.h*.5,{size:Math.min(C.h*.4,C.w/Math.max(3,w.k.length)*1.4),color:INK,maxW:C.w*.92});
    if(st.phase==='play')QZ.bar(g,G.bar.x,G.bar.y,G.bar.w,Math.max(5,u*.14),Math.max(0,1-(st.T-st.t0)/st.lim),{good:'#3b82f6'});
    // slots
    const L=w.e.length,S=G.sl,gp=u*.2,sw=Math.min((S.w-gp*(L-1))/L,S.h*1.1);const tw0=L*sw+(L-1)*gp;
    for(let i=0;i<L;i++){const x=S.x+(S.w-tw0)/2+i*(sw+gp);const on=i<st.pos||st.reveal;K.rr(g,x,S.y+(S.h-sw)/2,sw,sw,sw*.2);g.fillStyle=on?(st.reveal&&i>=st.pos?'#fecdd3':'#bbf7d0'):'#fff';g.fill();g.lineWidth=i===st.pos&&st.phase==='play'?4:2;g.strokeStyle=i===st.pos&&st.phase==='play'?'#ff5d8f':INK;g.stroke();if(on)K.txt(g,w.e[i],x+sw/2,S.y+S.h/2,{size:sw*.7,color:INK});}
    // tiles
    const nn=st.tiles.length;st.tiles.forEach((ch,i)=>{if(st.used[i])return;const t=this.tilePos(G,i,nn);const sh=st.shake[i]>0?Math.sin(st.shake[i]*50)*u*.12:0;K.card(g,t.x+sh,t.y,G.ts,G.ts,G.ts*.22,COL[i%6],{stroke:'#fff',lw:3,blur:0,dy:G.ts*.07,sc:'#1e3a8a'});K.txt(g,ch,t.x+sh+G.ts/2,t.y+G.ts*.48,{size:G.ts*.62,color:'#fff',stroke:'rgba(30,58,138,.35)',lw:G.ts*.05});});
    st.fx.forEach(f=>{g.globalAlpha=Math.max(0,1-f.t/1.6);g.fillStyle=f.c;g.fillRect(f.x,f.y,u*.3,u*.3);g.globalAlpha=1;});
    if(st.flash>0){g.fillStyle='rgba(255,255,255,'+st.flash+')';g.fillRect(0,0,W,H);}
  },
};
Engine.boot(GAME);
