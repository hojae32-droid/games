/* 5~6학년 실과 · 간단한 조리 · 위생 — 주방 주문 처리
   디자인: 반짝이는 스테인리스 주방과 주문서 레일. 손님의 주문서대로 손 씻기부터 알맞은 순서로 도구와 재료를 눌러 요리해요. 접시 위에 요리가 한 단계씩 완성돼요! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#2b2f36',RED='#ef4444',STEEL='#d9dee5';
const LOGO=gkLogo('#f7f9fb','#2b2f36','🍳');
const LV={
  '5':{g:'5~6학년',t:'5학년 주문표 따라 만들기',d:'적힌 순서대로 누르기'},
  '6':{g:'5~6학년',t:'6학년 순서 기억해 만들기',d:'요리 이름만 보고 떠올리기'},
};
    const KW=['🙌','손 씻기'];
    const KR=[
      ['🍜','라면',[KW,['💧','물 붓기'],['🔥','불 켜기'],['🍜','면·스프 넣기'],['🥚','달걀 넣기'],['🥣','그릇에 담기']]],
      ['🥪','샌드위치',[KW,['🍞','빵 준비'],['🧈','잼 바르기'],['🥬','채소 올리기'],['🥪','빵 덮기'],['🔪','반으로 자르기']]],
      ['🍳','달걀프라이',[KW,['🔥','불 켜기'],['🫒','기름 두르기'],['🥚','달걀 깨 넣기'],['🧂','소금 뿌리기'],['🍽️','접시에 담기']]],
      ['🍙','주먹밥',[KW,['🍚','밥 준비'],['🧂','소금 간 하기'],['🥬','속 재료 넣기'],['🍙','모양 만들기']]],
      ['🥗','과일 샐러드',[KW,['🚿','과일 씻기'],['🔪','먹기 좋게 썰기'],['🥣','그릇에 담기'],['🍯','소스 뿌리기']]],
      ['🍚','볶음밥',[KW,['🥕','채소 썰기'],['🔥','불 켜기'],['🍳','채소 볶기'],['🍚','밥 넣고 볶기'],['🍽️','접시에 담기']]],
    ];
    const KDEC=[['📱','사진 찍기'],['🗑️','쓰레기 버리기'],['🧂','소금 한 컵 넣기'],['🧊','얼음 넣기'],['🍫','초콜릿 넣기'],['🧴','손 대신 옷에 닦기'],['🥤','음료수 붓기']];
function cellsOf(gr,n,u){const cols=3,rows=Math.ceil(n/cols),g=u*.22;const w=(gr.w-g*(cols-1))/cols,h=Math.min(w*1.05,(gr.h-g*(rows-1))/rows);return Array.from({length:n},(_,i)=>({x:gr.x+(i%cols)*(w+g),y:gr.y+Math.floor(i/cols)*(h+g),w,h}));}
function wrapKo(g,s,maxW){const out=[];let line='';for(const ch of String(s)){const t=line+ch;if(g.measureText(t).width>maxW&&line){out.push(line);line=ch===' '?'':ch;}else line=t;}if(line)out.push(line);return out;}
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#e6eaf0','#aeb7c3']);g.fillStyle='#fff7d6';for(let i=0;i<3;i++){const x=W*(.2+i*.3);K.card(g,x-u*1.4,H*.1,u*2.8,u*3.2,u*.15,'#fff7d6',{stroke:'#2b2f36',lw:3,blur:0,dy:u*.08});K.txt(g,'주문 '+(i+1),x,H*.1+u*.5,{size:u*.5,color:'#b91c1c'});['🍜','🥪','🍳'][i]&&K.emo(g,['🍜','🥪','🍳'][i],x,H*.1+u*1.7,u*1.3);}
  K.card(g,W*.15,H*.62,W*.7,u*.5,u*.2,'#b8c0cc',{blur:0,dy:0});K.emo(g,'🥘',W*.5,H*.58+Math.sin(T*4)*u*.1,u*1.8);K.emo(g,'🔥',W*.5,H*.72,u*.9+Math.sin(T*9)*u*.1);K.emo(g,'👩‍🍳',W*.22,H*.68,u*1.6);K.emo(g,'🧑‍🍳',W*.78,H*.68,u*1.6);}
const GAME={
  id:'kitchenrush',title:'주방 주문 처리',title1:'스테인리스 주방',title2:'주방 주문 처리',emoji:LOGO,
  subtitle:'5~6학년 실과 · 간단한 조리와 위생',
  howto:'🍳 손님의 <b>주문표</b>대로 요리해요. 아래 도구와 재료에서 <b>알맞은 순서대로</b> 눌러요. 요리 전에는 <b>손 씻기</b>부터! 엉뚱한 재료나 순서를 누르면 흔들려요. 6학년은 요리 이름만 나오니 순서를 기억해서 만들어요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:RED,c2:'#f59e0b'},hero:gkHero(hero),vignette:.03,durs:[90,120,180],levelTitle:'어떤 주문을 받을까요?',
  txt:{who:'누가 요리사일까요?',dur:'영업 시간',pace:'손님의 인내심',seat:'번 요리사 ',go:'영업 시작!',s1:'1. 주문',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li>요리를 시작하기 전에는 <b>손을 비누로 깨끗이 씻어요</b>. 음식을 만들 때 위생이 가장 중요해요.</li>
    <li>조리는 <b>재료 준비(씻기·썰기) → 가열(불 켜기·볶기) → 담기</b> 순서로 해요. 순서가 바뀌면 음식이 맛없거나 위험할 수 있어요.</li>
    <li>불과 칼은 조심해서 쓰고, 조리 도구 옆에서는 장난치지 않아요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.3,pad=u*.4,gap=u*.3,q=p.state.q;const land=W>=H*1.15;const n=q?q.btns.length:8;
    let tk,pl,gr;
    if(land){tk={x:pad,y:top,w:W*.34,h:H-top-pad};pl={x:pad*2+W*.34,y:top,w:W*.36,h:(H-top-pad)*.48};gr={x:pad*2+W*.34,y:top+pl.h+gap,w:W-pad*3-W*.34,h:H-top-pad-pl.h-gap};
      return{W,H,u,top,pad,land,tk,pl,cells:cellsOf(gr,n,u),gr};}
    tk={x:pad,y:top,w:W-pad*2,h:Math.min(u*5.8,(H-top)*.26)};pl={x:pad,y:tk.y+tk.h+gap,w:W-pad*2,h:Math.min(u*3.4,(H-top)*.17)};const gy=pl.y+pl.h+gap;gr={x:pad,y:gy,w:W-pad*2,h:H-pad-gy};
    return{W,H,u,top,pad,land,tk,pl,cells:cellsOf(gr,n,u),gr};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,okFlag:false,pos:0,used:new Set(),mist:0,shakeI:-1,shakeT:0,served:0});this.newQ(p);},
  make(p,L){const R=p.R,O=p.deck(KR,'kr');const ds=R.shuffle(KDEC.slice()).slice(0,L==='5'?2:3);const btns=R.shuffle(O[2].concat(ds));
    const q={O,btns,deck:L};q.text=O[0]+' '+O[1]+' 주문';q.reveal='순서: '+O[2].map((s,i)=>(i+1)+'. '+s[1]).join(' → ');q.review=O[1]+' 만들기 '+q.reveal;q.speak='';return q;},
  qtime(q){return 8+q.O[2].length*3.5+(q.deck==='6'?6:0);},level(p){this._p=p;return p.levelId;},
  askHtml(q){return q.text;},askSub(q){return q.deck==='5'?'주문표의 순서대로 눌러요':'요리 순서를 기억해서 눌러요';},
  isOk(q,i,p){return !!p.state.okFlag;},tipOf(q){return q.reveal;},goodTip(q){return '😋 맛있게 완성!';},
  ptsOf(p,q,frac){return Math.round((55+55*frac)*(p.state.mist?.75:1));},
  onNew(p,q){const st=p.state;st.pos=0;st.used=new Set();st.mist=0;st.okFlag=false;st.shakeI=-1;},
  upd(p,dt){const st=p.state;if(st.shakeT>0)st.shakeT-=dt;},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);const i=gkHit(G.cells,x,y);if(i<0||st.used.has(i))return;
    if(q.btns[i]===q.O[2][st.pos]){st.used.add(i);st.pos++;p.Snd.tone&&p.Snd.tone(600+st.pos*90,.08,'sine',.05);if(st.pos>=q.O[2].length){st.okFlag=true;st.served++;this.verdict(p,0,false);}}
    else{st.mist++;st.shakeI=i;st.shakeT=.4;const c=G.cells[i];p.hit(false,{pen:8,shake:false,x:c.x+c.w/2,y:c.y,tip:q.O[2][st.pos]?'지금은 「'+(q.deck==='5'?q.O[2][st.pos][1]:'다음 순서')+'」 차례예요':'',tipMs:900,review:q.O[1]+': '+(q.btns[i][1])+'은(는) 이 순서가 아니에요. '+q.reveal});}},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const i=q.btns.findIndex((b,k)=>b===q.O[2][st.pos]&&!st.used.has(k));if(i<0)return null;const c=G.cells[i];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+c.x+c.w/2,y:rc.top+c.y+c.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q;if(!q)return;
    K.vgrad(g,0,0,W,H,['#e6eaf0','#aeb7c3']);for(let x=0;x<W;x+=u*1.2){g.fillStyle='rgba(255,255,255,.25)';g.fillRect(x,0,2,H);}
    /* 주문서 */
    const T=G.tk;g.fillStyle='#8b94a1';g.fillRect(T.x-u*.1,T.y-u*.05,T.w+u*.2,u*.2);K.card(g,T.x+u*.2,T.y+u*.15,T.w-u*.4,T.h-u*.15,u*.12,'#fff7d6',{stroke:'#2b2f36',lw:3,blur:0,dy:u*.08,sc:'rgba(0,0,0,.4)'});
    g.fillStyle=RED;g.fillRect(T.x+u*.2,T.y+u*.15,T.w-u*.4,u*.9);K.txt(g,q.O[0]+' '+q.O[1]+' 주문 · 🍽️ '+st.served+'번째 손님',T.x+T.w/2,T.y+u*.62,{size:u*.55,color:'#fff',maxW:T.w-u});
    const steps=q.O[2];const showAll=q.deck==='5'||st.lock;const lh=Math.min(u*.78,(T.h-u*1.6)/Math.min(steps.length,G.land?steps.length:3));const two=!G.land&&steps.length>3;
    steps.forEach((s,i)=>{const done=i<st.pos;const col=two?(i<3?0:1):0;const row=two?(i%3):i;const x=T.x+u*.6+col*(T.w*.5-u*.2);const y=T.y+u*1.5+row*lh;const txt=showAll||done?(i+1)+'. '+s[1]:(i+1)+'. ?';
      K.txt(g,(done?'✅ ':i===st.pos&&!st.lock?'👉 ':'')+txt,x,y,{size:Math.min(lh*.78,u*.62),color:done?'#15803d':i===st.pos&&!st.lock?RED:'#2b2f36',align:'left',maxW:two?T.w*.46:T.w-u*1.2});});
    /* 접시 */
    const P=G.pl;K.card(g,P.x,P.y,P.w,P.h,u*.3,'#b8c0cc',{stroke:'#2b2f36',lw:3,blur:0,dy:u*.06});const cx=P.x+P.w/2,cy=P.y+P.h/2,pr=Math.min(P.h*.42,P.w*.2);
    g.fillStyle='#fff';g.strokeStyle='#2b2f36';g.lineWidth=3;g.beginPath();g.arc(cx,cy,pr*1.3,0,TAU);g.fill();g.stroke();g.strokeStyle='#cbd5e1';g.beginPath();g.arc(cx,cy,pr*1.0,0,TAU);g.stroke();
    steps.slice(0,st.pos).forEach((s,i)=>{const a=i/steps.length*TAU-Math.PI/2;K.emo(g,s[0],cx+Math.cos(a)*pr*.62,cy+Math.sin(a)*pr*.62,pr*.62);});
    if(st.lock)K.emo(g,st.okFlag?'😋':'😢',cx,cy,pr*1.1);
    K.emo(g,'🔥',P.x+P.w*.1,cy,u*.9+(st.mist?Math.sin(st.T*20)*u*.1:0));K.txt(g,'단계 '+st.pos+'/'+steps.length,P.x+P.w*.9,cy,{size:u*.5,color:INK,align:'right',maxW:P.w*.2});
    if(!st.lock&&st.qmax>0)QZ.bar(g,T.x+u*.3,T.y+T.h-u*.25,T.w-u*.6,Math.max(6,u*.14),st.qt/st.qmax,{good:RED});
    /* 버튼 */
    q.btns.forEach((b,i)=>{const c=G.cells[i];if(!c)return;const used=st.used.has(i);const sh=st.shakeI===i&&st.shakeT>0?Math.sin(st.shakeT*60)*u*.1:0;K.card(g,c.x+sh,c.y,c.w,c.h,u*.2,used?'#cbd5e1':'#f7f9fb',{stroke:st.shakeI===i&&st.shakeT>0?RED:'#2b2f36',lw:3,blur:0,dy:used?0:u*.06,sc:'#454c57'});
      g.globalAlpha=used?.4:1;K.emo(g,b[0],c.x+c.w/2+sh,c.y+c.h*.38,Math.min(c.h*.45,c.w*.4));K.txt(g,b[1],c.x+c.w/2+sh,c.y+c.h*.78,{size:Math.min(c.h*.18,u*.6),color:INK,maxW:c.w*.92});g.globalAlpha=1;});
  },
};
QZ.mix(GAME,{say:false,pts0:55,pts1:55,okMs:1500,badMs:3200});
Engine.boot(GAME);
