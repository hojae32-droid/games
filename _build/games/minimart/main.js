/* 4~5학년 영어 · 주문·가격 — 영어 미니 마트
   디자인: 민트 타일 벽의 동네 마트 계산대. 손님의 영어 주문을 알아듣고 물건을 담거나 거스름돈을 계산해요. 손님 인내심 게이지가 줄어들기 전에! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#0b4f3f',OR='#ff8a00',GR='#00a884',DK='#007a62';
const LOGO=gkLogo('#fff','#ff8a00','🛒');
const NUM='zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty'.split(' ');
const FOLK=['🧑‍🦰','👵','👨‍🦳','👧','🧒','👩‍🦱','🧔','👱'];
const ITEMS=[['apple','apples','🍎'],['banana','bananas','🍌'],['cake','cakes','🎂'],['cookie','cookies','🍪'],['egg','eggs','🥚'],['pizza','pizzas','🍕'],['hamburger','hamburgers','🍔'],['carrot','carrots','🥕'],['grape','grapes','🍇'],['orange','oranges','🍊'],['lemon','lemons','🍋'],['strawberry','strawberries','🍓']];
const GOODS=[['cap','🧢'],['book','📖'],['pen','🖊️'],['ball','⚽'],['bag','🎒'],['doll','🪆'],['kite','🪁'],['hat','🎩'],['toy car','🚗'],['notebook','📒']];
const LV={
  '4':{g:'4~5학년',t:'4학년 주문 받기',d:'"Two apples, please." 영어 주문대로 물건 담기'},
  '5':{g:'4~5학년',t:'5학년 거스름돈',d:'"It is seven dollars." 값을 알아듣고 거스름돈 계산'},
};
function hero(g,W,H,T,u){g.fillStyle='#e6fff6';g.fillRect(0,0,W,H);for(let i=0;i<8;i++)for(let j=0;j<5;j++){g.strokeStyle='rgba(0,168,132,.2)';g.strokeRect(i*W/8,j*H/5,W/8,H/5);}
  g.fillStyle='#00a884';g.fillRect(0,H*.7,W,H*.3);['🍎','🍌','🍕','🥕','🍇'].forEach((e,i)=>K.emo(g,e,W*(.12+i*.19),H*.62+Math.sin(T*2+i)*u*.12,u*1.4));K.emo(g,'🛒',W*.5,H*.3+Math.sin(T*3)*u*.1,u*2);K.card(g,W*.12,H*.1,u*3,u*1.4,u*.4,'#fff',{stroke:'#007a62',lw:3,blur:0,dy:u*.06,sc:'#007a62'});K.txt(g,'$5',W*.12+u*1.5,H*.1+u*.7,{size:u,color:OR});}
const GAME={
  id:'minimart',title:'영어 미니 마트',title1:'영어 미니 마트',title2:'계산대 놀이',emoji:LOGO,
  subtitle:'4~5학년 영어 · 영어 주문 듣고 물건 담기, 거스름돈 계산',
  howto:'🛒 <b>4학년</b>: 손님의 영어 주문을 읽고 물건 수를 + / − 로 맞춘 뒤 [드려요]를 눌러요. <b>5학년</b>: 가격과 낸 돈을 읽고, 동전·지폐를 눌러 <b>거스름돈</b>을 맞춘 뒤 [드려요]! 손님이 참을성을 잃기 전에 해결해요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:OR,c2:GR},hero:gkHero(hero),vignette:.02,durs:[120,180,300],levelTitle:'어느 계산대를 맡을까요?',
  txt:{who:'누가 점원일까요?',dur:'영업 시간',pace:'손님 인내심',seat:'번 점원 ',go:'영업 시작!',s1:'1. 계산대',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li><b>I want two apples, please.</b> — 물건을 살 때는 <b>수 + 물건 이름</b>을 말해요. 둘 이상이면 apples처럼 -s를 붙여요.</li>
    <li><b>It is seven dollars.</b> — 값은 숫자(seven)와 단위(dollars)로 말해요.</li>
    <li><b>Here you are. / Thank you.</b> — 물건이나 돈을 건넬 때, 받을 때 쓰는 인사말이에요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2,pad=u*.4;const ch=Math.min(H*.25,u*5.2);const cu={x:pad,y:top,w:W-pad*2,h:ch};const gh=Math.min(u*2.3,H*.11);const go={x:W/2-Math.min(W*.42,u*7),y:H-pad-gh,w:Math.min(W*.84,u*14),h:gh};
    const body={x:pad,y:cu.y+ch+u*.8,w:W-pad*2,h:go.y-u*.4-(cu.y+ch+u*.8)};const n=6;const cols=W>H*1.1?3:2,rows=Math.ceil(n/cols);const gap=u*.35;const cw=(body.w-gap*(cols-1))/cols,chh=(body.h-gap*(rows-1))/rows;
    return{W,H,u,top,pad,cu,go,body,cols,rows,gap,cw,chh};},
  init(p){const st=p.state;Object.assign(st,{T:0,O:null,cnt:[],tray:0,cust:0,phase:'idle',t0:0,tries:0,wait:0,say:'',who:FOLK[0],lim:p.levelId==='4'?24:22,flash:0,mood:0,shake:0});this.next(p);},
  next(p){const st=p.state,R=p.R,deck=p.levelId;st.phase='play';st.tries=0;st.t0=st.T;st.who=FOLK[st.cust++%FOLK.length];st.wait=0;st.mood=0;
    if(deck==='4'){const sh=EN.shuffle(ITEMS,()=>R.f()).slice(0,6);const nk=R.f()<.35?1:2;const maxq=3+Math.min(4,Math.floor(st.cust/3));const want=EN.shuffle([0,1,2,3,4,5],()=>R.f()).slice(0,nk).map(i=>[i,1+Math.floor(R.f()*maxq)]);st.O={sh,want};st.cnt=sh.map(()=>0);
      st.say='I want '+want.map(([i,n])=>NUM[n]+' '+(n>1?sh[i][1]:sh[i][0])).join(' and ')+', please.';st.ans=want.map(([i,n])=>sh[i][2]+'×'+n).join(' ');}
    else{const g=GOODS[Math.floor(R.f()*GOODS.length)];const price=2+Math.floor(R.f()*(st.cust>4?16:9));const pay=price<=10?10:20;st.O={price,pay,change:pay-price,g};st.tray=0;st.say='This '+g[0]+' is '+NUM[price]+' dollars. Here is '+NUM[pay]+' dollars.';st.ans='거스름돈 $'+(pay-price);}
    p.ask('🛒 손님이 왔어요','영어 주문을 읽어요');enSay(st.say,.75);},
  update(p,dt){const st=p.state;st.T+=dt;if(st.flash>0)st.flash-=dt;if(st.shake>0)st.shake-=dt;const f=(st.T-st.t0)/st.lim;st.mood=f>.7?2:f>.4?1:0;
    if(st.phase==='play'&&f>=1){st.phase='wait';st.wait=1.6;st.angry=true;p.hit(false,{pen:5,shake:false,tip:'손님이 떠났어요',tipMs:1200,review:st.say+' → '+st.ans});}
    if(st.wait>0){st.wait-=dt;if(st.wait<=0){st.angry=false;this.next(p);}}},
  btn(p,x,y){const st=p.state,G=this.geo(p);const gb=G.go;if(x>=gb.x&&x<=gb.x+gb.w&&y>=gb.y&&y<=gb.y+gb.h)return{k:'go'};
    if(p.levelId==='4'){for(let i=0;i<6;i++){const r=this.cell(G,i);const bh=r.h*.3,by=r.y+r.h-bh-r.h*.06,bw=r.w*.3;if(y>=by&&y<=by+bh){if(x>=r.x+r.w*.06&&x<=r.x+r.w*.06+bw)return{k:'d',i,d:-1};if(x>=r.x+r.w-r.w*.06-bw&&x<=r.x+r.w-r.w*.06)return{k:'d',i,d:1};}}}
    else{const cs=this.coins(G);for(const c of cs)if(Math.hypot(x-c.x,y-c.y)<=c.r*1.1)return{k:'c',v:c.v};const rs=this.reset(G);if(Math.hypot(x-rs.x,y-rs.y)<=rs.r)return{k:'re'};}
    return null;},
  cell(G,i){const col=i%G.cols,row=Math.floor(i/G.cols);return{x:G.body.x+col*(G.cw+G.gap),y:G.body.y+row*(G.chh+G.gap),w:G.cw,h:G.chh};},
  coins(G){const b=G.body,r=Math.min(b.h*.22,b.w*.085,G.u*1.9);const cy=b.y+b.h*.78;return[{v:1,x:b.x+b.w*.15,y:cy,r},{v:2,x:b.x+b.w*.37,y:cy,r},{v:5,x:b.x+b.w*.6,y:cy,r:r*1.15}];},
  reset(G){const b=G.body,r=Math.min(b.h*.12,G.u*1.1);return{x:b.x+b.w*.84,y:b.y+b.h*.78,r};},
  down(p,x,y){const st=p.state;if(st.phase!=='play')return;const a=this.btn(p,x,y);if(a)this.act(p,a);},
  act(p,a){const st=p.state;if(a.k==='go')return this.check(p);if(a.k==='d'){st.cnt[a.i]=clamp(st.cnt[a.i]+a.d,0,12);p.Snd.tone&&p.Snd.tone(500+a.d*80,.04,'sine',.04);}if(a.k==='c'){st.tray+=a.v;p.Snd.tone&&p.Snd.tone(900,.05,'triangle',.05);}if(a.k==='re')st.tray=0;},
  check(p){const st=p.state,G=this.geo(p),O=st.O;let ok;if(p.levelId==='4')ok=O.sh.every((_,i)=>st.cnt[i]===((O.want.find(w=>w[0]===i)||[0,0])[1]));else ok=st.tray===O.change;
    if(ok){st.phase='wait';st.wait=1.2;st.flash=.3;const el=st.T-st.t0;p.hit(true,{pts:st.tries?50:EN.pts(Math.min(el,st.lim),st.lim),x:G.go.x+G.go.w/2,y:G.go.y});enSay('Thank you!',.9);}
    else{if(!st.tries)p.hit(false,{pen:5,shake:false,x:G.go.x+G.go.w/2,y:G.go.y,tip:'다시 해 봐요',tipMs:900,review:st.say+' → '+st.ans});st.tries++;st.shake=.4;if(p.levelId==='4')st.cnt=st.cnt.map(()=>0);else st.tray=0;}},
  botAct(p){const st=p.state,G=this.geo(p),rc=p.cv.getBoundingClientRect();if(st.phase!=='play')return null;const O=st.O;let a;
    if(p.levelId==='4'){const i=O.sh.findIndex((_,k)=>st.cnt[k]<((O.want.find(w=>w[0]===k)||[0,0])[1]));if(i>=0){const r=this.cell(G,i);a={x:r.x+r.w*.94-r.w*.15,y:r.y+r.h-r.h*.06-r.h*.15};}}
    else{const rem=O.change-st.tray;if(rem>0){const v=rem>=5?5:rem>=2?2:1;const c=this.coins(G).find(c=>c.v===v);a={x:c.x,y:c.y};}}
    if(!a)a={x:G.go.x+G.go.w/2,y:G.go.y+G.go.h/2};return{k:'click',x:rc.left+a.x,y:rc.top+a.y};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,O=st.O;if(!O)return;
    g.fillStyle='#e6fff6';g.fillRect(0,0,W,H);g.strokeStyle='rgba(0,168,132,.14)';g.lineWidth=2;for(let x=0;x<W;x+=u*2){g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke();}for(let y=0;y<H;y+=u*2){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}
    g.fillStyle='#00a884';g.fillRect(0,G.go.y-u*.2,W,H-G.go.y+u*.2);
    // customer
    const C=G.cu;const fs=Math.min(C.h*.85,u*4,W*.2);K.emo(g,st.angry?'😡':st.mood===2?'😠':st.mood===1?'😐':'🙂',C.x+fs*.6,C.y+C.h*.5,fs);
    const bx=C.x+fs*1.15,bw=C.w-fs*1.15;K.card(g,bx,C.y,bw,C.h,u*.35,'#fff',{stroke:DK,lw:4,blur:0,dy:u*.07,sc:DK});
    let ls=Math.min(C.h*.24,u*1.15),lines;for(;;){g.font=K.font(ls);lines=enWrap(g,st.say,bw*.9);if(lines.length*ls*1.25<=C.h*.66||ls<8)break;ls*=.92;}lines.forEach((l,i)=>K.txt(g,l,bx+bw/2,C.y+C.h*.45+(i-(lines.length-1)/2)*ls*1.25,{size:ls,color:INK,maxW:bw*.94}));
    const pf=Math.max(0,1-(st.T-st.t0)/st.lim);if(st.phase==='play')QZ.bar(g,bx+bw*.06,C.y+C.h*.86,bw*.88,Math.max(5,u*.14),pf,{good:pf>.5?GR:pf>.25?OR:'#dc2626'});
    // body
    if(p.levelId==='4'){O.sh.forEach((it,i)=>{const r=this.cell(G,i);const has=st.cnt[i]>0;K.card(g,r.x,r.y,r.w,r.h,u*.3,has?'#fff3d6':'#fff',{stroke:has?OR:DK,lw:has?5:3,blur:0,dy:u*.06,sc:DK});
        K.emo(g,it[2],r.x+r.w/2,r.y+r.h*.3,Math.min(r.h*.4,r.w*.4));K.txt(g,it[0],r.x+r.w/2,r.y+r.h*.58,{size:Math.min(r.h*.15,r.w/Math.max(5,it[0].length)*1.5),color:INK,maxW:r.w*.9});
        const bh=r.h*.3,by=r.y+r.h-bh-r.h*.06,bw2=r.w*.3;[[r.x+r.w*.06,'−','#e5e7eb',INK],[r.x+r.w-r.w*.06-bw2,'+',OR,'#fff']].forEach(([x,t,c,ic])=>{K.card(g,x,by,bw2,bh,bh*.3,c,{stroke:DK,lw:2,blur:0,dy:2,sc:DK});K.txt(g,t,x+bw2/2,by+bh*.5,{size:bh*.8,color:ic});});K.txt(g,String(st.cnt[i]),r.x+r.w/2,by+bh*.5,{size:bh*.85,color:has?OR:INK});});}
    else{const b=G.body;K.card(g,b.x,b.y,b.w*.45,b.h*.5,u*.3,'#fff',{stroke:DK,lw:3,blur:0,dy:u*.06,sc:DK});K.emo(g,O.g[1],b.x+b.w*.12,b.y+b.h*.25,Math.min(b.h*.35,b.w*.12));K.txt(g,'$'+O.price,b.x+b.w*.32,b.y+b.h*.25,{size:Math.min(b.h*.28,u*1.7),color:OR,maxW:b.w*.22});
      K.card(g,b.x+b.w*.5,b.y,b.w*.5,b.h*.5,u*.3,'#fffbe6',{stroke:OR,lw:4,blur:0,dy:u*.06,sc:DK});K.txt(g,'거스름돈',b.x+b.w*.75,b.y+b.h*.14,{size:Math.min(b.h*.12,u*.9),color:INK});K.txt(g,'$'+st.tray,b.x+b.w*.75,b.y+b.h*.34,{size:Math.min(b.h*.26,u*1.8),color:OR});
      K.txt(g,'$'+O.pay+' − $'+O.price+' = ?',b.x+b.w*.32,b.y+b.h*.43,{size:Math.min(b.h*.1,u*.8),color:'#6b7280',maxW:b.w*.4});
      this.coins(G).forEach(c=>{g.fillStyle=c.v===5?'#22c55e':'#fbbf24';g.strokeStyle=c.v===5?'#15803d':'#b45309';g.lineWidth=5;g.beginPath();g.arc(c.x,c.y,c.r,0,TAU);g.fill();g.stroke();g.lineWidth=2;g.beginPath();g.arc(c.x,c.y,c.r*.76,0,TAU);g.stroke();K.txt(g,'$'+c.v,c.x,c.y,{size:c.r*.9,color:c.v===5?'#fff':'#78350f'});});
      const rs=this.reset(G);g.fillStyle='#e5e7eb';g.strokeStyle=DK;g.lineWidth=3;g.beginPath();g.arc(rs.x,rs.y,rs.r,0,TAU);g.fill();g.stroke();K.txt(g,'↺',rs.x,rs.y,{size:rs.r*1.2,color:INK});}
    // go
    const gb=G.go;const sh=st.shake>0?Math.sin(st.shake*60)*u*.15:0;K.card(g,gb.x+sh,gb.y,gb.w,gb.h,gb.h*.3,OR,{stroke:'#fff',lw:4,blur:0,dy:u*.08,sc:'#b45309'});K.txt(g,'드려요 ✔  Here you are!',gb.x+gb.w/2+sh,gb.y+gb.h*.5,{size:Math.min(gb.h*.5,gb.w/14),color:'#fff',maxW:gb.w*.92});
    if(st.flash>0){g.fillStyle='rgba(255,255,255,'+st.flash*1.5+')';g.fillRect(0,0,W,H);}
  },
};
Engine.boot(GAME);
