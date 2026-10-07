/* 4학년 1학기 수학 · 큰 수 — 큰 수 보물 경매장
   디자인: 붉은 벨벳 커튼과 황금 전광판이 있는 경매장. 경매사가 부르는 금액을 숫자 카드로 쓰고, 라이벌보다 더 큰 금액을 부르고, 뛰어 세기로 값을 올려요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#2a060e',GOLD='#facc15';
const LOGO=gkLogo('#7a1a30','#facc15','🔨');
const LV={
  a:{t:'만과 다섯 자리 수',d:'읽기 · 쓰기 · 자릿값'},
  b:{t:'억과 조',d:'큰 수 읽기 · 쓰기 · 자릿값'},
  c:{t:'뛰어 세기',d:'만 · 10만 · 억 · 조씩 값 올리기'},
  d:{t:'수의 크기 비교',d:'카드로 더 큰 수 만들어 이기기'},
};
const ITEMS=['🏺','👑','🦖','💎','🖼️','🎻','🗿','📜','⚱️','🪙','🧭','🔭','🕰️','🛡️','🦴','🎎'];
const DK=['','일','이','삼','사','오','육','칠','팔','구'],SU=['','십','백','천'],BU=['','만','억','조','경'];
function read4(s){s=s.padStart(4,'0');let o='';for(let k=0;k<4;k++){const x=Number(s[k]);if(!x)continue;const u=SU[3-k];o+=(x===1&&u?'':DK[x])+u;}return o;}
function readBig(n){n=String(n).replace(/^0+/,'');if(!n)return'영';const g=[];for(let e=n.length;e>0;e-=4)g.unshift(n.slice(Math.max(0,e-4),e));let o='';g.forEach((x,k)=>{const r=read4(x);const u=BU[g.length-1-k];if(r)o+=(r==='일'&&u==='만'?'':r)+u+' ';});return o.trim();}
function valKo(v){const s=String(v);const z=s.length-1;if(z<4)return gkComma(s);const big=['','만','억','조'][Math.floor(z/4)];return s[0]+'0'.repeat(z%4)+big;}
function mutate(n,R){const a=n.split('');const k=R.int(1,a.length-1);a[k]=String((Number(a[k])+R.int(1,8))%10);return a.join('');}
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#4a0d1a','#7a1a30']);g.fillStyle='#8a1c36';for(let i=0;i<9;i++){g.beginPath();g.ellipse(W*(i+.5)/9,0,W/18,H*.9,0,0,Math.PI);g.fill();}
  K.card(g,W*.2,H*.28,W*.6,H*.26,u*.2,'#140307',{stroke:GOLD,lw:4,blur:0,dy:0});K.txt(g,gkComma(Math.floor(10000+((T*7919)%90000)))+'원',W/2,H*.41,{size:H*.17,color:GOLD,maxW:W*.55});
  g.fillStyle='#78350f';g.fillRect(W*.1,H*.72,W*.8,H*.06);K.emo(g,'🔨',W*.5+Math.sin(T*6)*6,H*.68,u*.9);}
const GAME={
  id:'auction',title:'큰 수 보물 경매장',title1:'붉은 벨벳 경매장',title2:'큰 수 보물 경매장',emoji:LOGO,
  subtitle:'4학년 1학기 수학 · 큰 수',
  howto:'신기한 보물을 경매로 사요! 경매사가 부르는 금액을 <b>숫자 카드</b>로 쓰고, 카드를 배치해 라이벌보다 <b>더 큰 금액</b>을 부르고, <b>뛰어 세기</b>로 값을 올려요. 낙찰받은 보물은 내 박물관에!',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:'#b91c1c',c2:'#1d4ed8'},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 경매에 참여할까요?',
  txt:{who:'누가 입찰자일까요?',dur:'경매 시간',pace:'생각하는 시간',seat:'번 입찰자 ',go:'경매 시작!',s1:'1. 경매',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'4학년 1학기',t:v.t,d:v.d})),
  summary:`<ul><li><b>만</b>은 1000이 10개, <b>억</b>은 1만이 10000개, <b>조</b>는 1억이 10000개인 수예요. 오른쪽부터 네 자리씩 끊어 읽어요.</li>
    <li>수를 쓸 때는 <b>세 자리마다 쉼표(,)</b>를 찍으면 읽기 쉬워요. 예) 35,200 → 삼만 오천이백</li>
    <li><b>자릿값</b>: 같은 숫자라도 어느 자리에 있느냐에 따라 나타내는 값이 달라요. 87,654에서 8은 80000(팔만)을 나타내요.</li>
    <li><b>뛰어 세기</b>는 같은 수씩 더하며 세요. 어느 자리 숫자가 변하는지 살펴봐요. <b>수의 크기 비교</b>는 자리 수가 많은 쪽, 자리 수가 같으면 높은 자리 숫자부터 비교해요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2,q=p.state.q,pad=u*.35;let list=[],tray=[],slots=[],btns=[];let oy,sc,mid=null;
    if(q&&q.ty==='cards'){const n=q.digits.length;const cardW=Math.min(u*1.7,(W-pad*2)/(n>7?Math.ceil(n/2):n)-u*.15);const rows=n>7?2:1;const per=Math.ceil(n/rows);const ch=Math.min(u*2.1,cardW*1.25);
      const btnH=Math.min(u*1.5,(H-top)*.09);const trayH=rows*ch+(rows-1)*u*.2;oy=H-pad-btnH-u*.2-trayH;
      for(let k=0;k<n;k++){const r=Math.floor(k/per),c=k%per;const cnt=r===rows-1?n-per*r:per;const w0=cnt*cardW+(cnt-1)*u*.15;tray.push({x:(W-w0)/2+c*(cardW+u*.15),y:oy+r*(ch+u*.2),w:cardW,h:ch,k});}
      btns=[{id:'clr',t:'↩ 모두 빼기',x:pad,y:H-pad-btnH,w:(W-pad*3)*.35,h:btnH},{id:'ok',t:'🔨 입찰!',x:pad*2+(W-pad*3)*.35,y:H-pad-btnH,w:(W-pad*3)*.65,h:btnH,go:1}];
      const sw=Math.min(u*1.35,(W-pad*2)/(n+Math.floor((n-1)/3)*.5+1.2));const sh=sw*1.35;const tw=n*sw+Math.floor((n-1)/3)*sw*.5+sw*.9;const sy=oy-sh-u*.45;let x=(W-tw)/2;
      for(let k=0;k<n;k++){if(k&&(n-k)%3===0)x+=sw*.5;slots.push({x,y:sy,w:sw,h:sh,k});x+=sw;}mid={y:sy,h:sh,x:(W-tw)/2,tw,sw};sc={x:pad,y:top,w:W-pad*2,h:sy-top-u*.4};}
    else{const n=3;const G0=gkGeo(p,n,W<H*1.1&&q&&q.opts&&q.opts.some(o=>o.length>12)?1:3,2.3);oy=G0.oy;list=G0.list;sc={x:pad,y:top,w:W-pad*2,h:oy-top-u*.4};}
    return{W,H,u,top,pad,sc,list,tray,slots,btns,mid,oy};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,won:[],slots:[],okFlag:false});this.newQ(p);},
  make(p,L){const R=p.R,q={item:R.pick(ITEMS)};const strip=s=>s.replace(/<[^>]+>/g,'');
    const rnd=d=>{let s=String(R.int(1,9));for(let k=1;k<d;k++)s+=R.chance(.35)?'0':String(R.int(0,9));return s;};
    const popts=(right,wr)=>{const u=[];wr.forEach(w=>{if(w!==right&&!u.includes(w))u.push(w);});const o=R.shuffle([right,...R.shuffle(u).slice(0,2)]);q.opts=o;q.okIdx=o.indexOf(right);};
    if(L==='a'||L==='b'){const d=L==='a'?5:R.pick([8,9,9,10,12,13]);const n=rnd(d);const k=R.pick(['write','write','read','place']);
      if(k==='write'){q.ty='cards';q.n=n;q.digits=R.shuffle(n.split(''));q.say=readBig(n)+' 원!';q.text='경매사가 부른 금액을 숫자 카드로 써요';q.reveal=gkComma(n)+'원';}
      else if(k==='read'){q.ty='pick';q.say=gkComma(n)+'원!';q.text='경매사가 부르는 말로 알맞은 것은?';const r=readBig(n);q.reveal=r;popts(r,[readBig(mutate(n,R)),R.pick([readBig(n.slice(0,-1)),readBig(n+'0')]),readBig(mutate(n,R))]);}
      else{let pos;do{pos=R.int(0,d-1);}while(n[pos]==='0');const dg=n[pos];const pv=dg+'0'.repeat(d-1-pos);q.ty='pick';const cm=gkComma(n);let cnt=-1,ul=-1;for(let i=0;i<cm.length;i++){if(cm[i]!==','){cnt++;if(cnt===pos){ul=i;break;}}}
        q.say=cm+'원';q.ul=ul;q.text='밑줄 친 숫자 <b>'+dg+'</b>가 나타내는 값은?';q.reveal=valKo(pv);popts(valKo(pv),[valKo(pv+'0'),valKo(pv.length>1?pv.slice(0,-1):pv+'00'),valKo(pv+'00')]);}}
    else if(L==='c'){const steps=[['1','만'],['10','만'],['100','만'],['1000','만'],['1','억'],['10','억'],['1','조']];const st=R.pick(steps);const unit=st[1]==='만'?'0000':st[1]==='억'?'00000000':'000000000000';
      const sN=BigInt(st[0]+unit);const a=BigInt(rnd(st[1]==='조'?14:st[1]==='억'?R.int(10,11):R.int(6,8)));const seq=[];for(let k=0;k<4;k++)seq.push(a+sN*BigInt(k));const nx=seq[3]+sN;
      q.ty='paddle';q.seq=seq.map(v=>gkComma(v.toString()));q.say=(st[0]==='1'?'':st[0])+st[1]+'씩 올려요!';q.text='다음에 부를 금액 패들을 들어요!';q.reveal=gkComma(nx.toString())+' (+'+(st[0]==='1'?'':st[0])+st[1]+')';popts(gkComma(nx.toString()),[nx+sN*9n,nx-sN+(sN/10n||1n),nx+sN,nx*10n].map(v=>gkComma(v.toString())));}
    else{const d=R.int(5,8);const digs=[];for(let k=0;k<d;k++)digs.push(String(R.int(k?0:1,9)));const big=R.chance(.6);const best=digs.slice().sort((x,y)=>big?y-x:x-y);if(!big&&best[0]==='0'){const j=best.findIndex(x=>x!=='0');[best[0],best[j]]=[best[j],best[0]];}
      const bestN=best.join('');let rival;do{rival=R.shuffle(digs).join('');}while(rival[0]==='0'||rival===bestN);q.ty='cards';q.digits=R.shuffle(digs);q.big=big;q.n=bestN;q.rival=rival;q.say=big?'라이벌 입찰: '+gkComma(rival)+'원':'가장 적은 금액으로 사는 사람이 이겨요!';
      q.text=big?'카드를 모두 써서 <b>가장 큰 금액</b>을 불러요!':'카드를 모두 써서 <b>가장 작은 금액</b>을 불러요! (맨 앞에 0은 안 돼요)';q.reveal=gkComma(bestN)+'원';}
    q.review=q.say+' · '+strip(q.text)+' → '+q.reveal;q.speak='';return q;},
  qtime(q){return q.ty==='pick'?25:q.ty==='paddle'?30:q.digits.length>9?70:q.digits.length>6?50:40;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return q.text;},askSub(q){return q.ty==='cards'?'카드를 눌러 칸에 채우고 입찰!':'알맞은 것을 눌러요';},
  isOk(q,i,p){return q.ty==='cards'?!!p.state.okFlag:i===q.okIdx;},tipOf(q){return '정답: '+q.reveal;},goodTip(q){return '낙찰! '+q.reveal;},
  ptsOf(p,q,frac){return Math.round(55+50*frac);},
  onNew(p,q){const st=p.state;st.okFlag=false;st.slots=q.ty==='cards'?Array(q.digits.length).fill(null):[];},
  onVerdict(p,q,ok){const st=p.state;if(ok){st.won.push(q.item);if(st.won.length>8)st.won.shift();}},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);
    if(q.ty!=='cards'){const i=gkHit(G.list,x,y);if(i>=0)this.verdict(p,i,false);return;}
    const b=G.btns.find(b=>K.inRect(x,y,b));if(b){if(b.id==='clr'){st.slots.fill(null);p.Snd.tap&&p.Snd.tap();}else{if(st.slots.includes(null)){p.Snd.bad&&p.Snd.bad();return;}const v=st.slots.map(k=>q.digits[k]).join('');st.okFlag=v===q.n&&v[0]!=='0';st.myBid=v;this.verdict(p,0,false);}return;}
    const sk=G.slots.find(s=>K.inRect(x,y,s));if(sk&&st.slots[sk.k]!=null){st.slots[sk.k]=null;p.Snd.tap&&p.Snd.tap();return;}
    const c=G.tray.find(c=>K.inRect(x,y,c));if(c&&!st.slots.includes(c.k)){const e=st.slots.indexOf(null);if(e>=0){st.slots[e]=c.k;p.Snd.tap&&p.Snd.tap();}}},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();const cl=b=>({k:'click',x:rc.left+b.x+b.w/2,y:rc.top+b.y+b.h/2});
    if(q.ty!=='cards')return cl(G.list[q.okIdx]);const e=st.slots.indexOf(null);if(e<0)return cl(G.btns[1]);const need=q.n[e];const k=q.digits.findIndex((d,i)=>d===need&&!st.slots.includes(i));return cl(G.tray[k]);},
  /* ── 그리기 ── */
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q,t=st.T,S=G.sc;if(!q)return;
    K.vgrad(g,0,0,W,H,['#4a0d1a','#6e1426']);g.fillStyle='#8a1c36';for(let i=0;i<9;i++){g.beginPath();g.ellipse(W*(i+.5)/9,G.top-u*.3,W/18,u*2.6,0,0,Math.PI);g.fill();}
    /* 내 박물관 */
    K.card(g,S.x,S.y,Math.min(S.w*.5,u*9),u*.8,u*.2,'rgba(20,3,7,.85)',{stroke:GOLD,lw:3,blur:0,dy:0});K.txt(g,'🏛️ '+(st.won.join('')||'아직 비었어요'),S.x+Math.min(S.w*.5,u*9)/2,S.y+u*.42,{size:u*.5,color:'#ffe9a8',maxW:Math.min(S.w*.5,u*9)*.92});
    if(!st.lock&&st.qmax>0){const bw=Math.min(W*.3,u*7);QZ.bar(g,S.x+S.w-bw,S.y+u*.3,bw,Math.max(6,u*.2),st.qt/st.qmax,{good:GOLD});}
    /* 전광판 */
    const bw=Math.min(S.w*.78,u*20),bh=Math.min(S.h*.34,u*2.8),bx=S.x+(S.w-bw)/2,by=S.y+u*1.1;K.card(g,bx,by,bw,bh,u*.25,'#140307',{stroke:GOLD,lw:Math.max(3,u*.1),blur:u*.3,dy:u*.08});
    const say=q.say;const fsz=Math.min(bh*.5,u*1.3);g.font=K.font?K.font(fsz):fsz+'px sans-serif';
    if(q.ul!=null&&q.ul>=0){/* 밑줄 친 숫자 */g.save();g.font=K.font(fsz);const full=g.measureText(say).width;const sc=Math.min(1,(bw*.92)/full);const f2=fsz*sc;g.font=K.font(f2);const wAll=g.measureText(say).width;let x=bx+bw/2-wAll/2;g.textAlign='left';g.textBaseline='middle';g.fillStyle=GOLD;for(let i=0;i<say.length;i++){const ch=say[i];g.fillText(ch,x,by+bh/2);const cw=g.measureText(ch).width;if(i===q.ul){g.strokeStyle='#fb7185';g.lineWidth=Math.max(3,f2*.08);g.beginPath();g.moveTo(x,by+bh/2+f2*.55);g.lineTo(x+cw,by+bh/2+f2*.55);g.stroke();}x+=cw;}g.restore();}
    else K.txt(g,say,bx+bw/2,by+bh/2,{size:fsz,color:GOLD,maxW:bw*.92});
    /* 무대: 경매사 · 보물 · 라이벌 */
    const ay=by+bh+u*.3,ah=S.y+S.h-ay;const es=Math.min(ah*.55,u*2.6);const cy=ay+ah*.45;
    g.fillStyle='#78350f';K.rr(g,S.x+S.w*.3,ay+ah*.7,S.w*.4,ah*.26,u*.15);g.fill();K.emo(g,'🧑‍⚖️',S.x+S.w*.15,cy,es);K.emo(g,'🤵',S.x+S.w*.85,cy+(st.lock&&!st.okFlag?-Math.abs(Math.sin(st.rT*8))*u*.3:0),es);
    const it=st.lock&&st.okFlag?clamp(st.rT*1.5,0,1):0;K.emo(g,q.item,S.x+S.w/2+(S.w*.35)*it*-0,cy+ah*.0-it*u*.8,es*(1.1-it*.3));
    if(st.lock){K.txt(g,st.okFlag?'🔨 낙찰!':'🔨 라이벌 낙찰…',S.x+S.w/2,cy-es*.9,{size:u*.9,color:st.okFlag?'#fef08a':'#fecaca',stroke:INK,lw:u*.2,maxW:S.w*.5});}
    /* 뛰어 세기 수열 */
    if(q.ty==='paddle'){const items=q.seq.concat(['?']);const fs=Math.min(u*.8,S.h*.1);g.font=K.font(fs);const wid=items.map(s=>g.measureText(s).width+u*.7);let x=0,y=0;const lines=[[]];let acc=0;items.forEach((s,i)=>{if(acc+wid[i]>S.w*.96&&lines[lines.length-1].length){lines.push([]);acc=0;}lines[lines.length-1].push([s,wid[i]]);acc+=wid[i]+u*.4;});
      const lh=fs*1.5,y0=by+bh+u*.2;lines.forEach((ln,li)=>{const tw=ln.reduce((a,b)=>a+b[1]+u*.4,-u*.4);let xx=S.x+(S.w-tw)/2;ln.forEach(([s,w],ci)=>{const qm=s==='?';K.card(g,xx,y0+li*lh,w,lh*.85,u*.15,qm?'#fde68a':'#fff7e6',{stroke:GOLD,lw:2,blur:0,dy:0});K.txt(g,s,xx+w/2,y0+li*lh+lh*.43,{size:fs,color:qm?'#b91c1c':INK,maxW:w*.95});xx+=w+u*.4;if(ci<ln.length-1)K.txt(g,'→',xx-u*.2,y0+li*lh+lh*.43,{size:fs*.7,color:GOLD,maxW:u*.4});});});}
    if(q.ty==='cards'){G.slots.forEach(s=>{const c=st.slots[s.k];const on=c!=null;if(s.k&&(G.slots.length-s.k)%3===0)K.txt(g,',',s.x-G.mid.sw*.25,s.y+s.h*.9,{size:s.h*.7,color:GOLD,maxW:u});K.rr(g,s.x,s.y,s.w,s.h,u*.15);g.fillStyle=on?'#fff7e6':'rgba(20,3,7,.7)';g.fill();g.lineWidth=3;g.strokeStyle=GOLD;g.stroke();if(on)K.txt(g,q.digits[c],s.x+s.w/2,s.y+s.h/2,{size:s.h*.7,color:INK,maxW:s.w});});
      K.txt(g,'원',G.mid.x+G.mid.tw-G.mid.sw*.3,G.mid.y+G.mid.h*.6,{size:G.mid.h*.5,color:GOLD,maxW:u*2});
      G.tray.forEach(c=>{const used=st.slots.includes(c.k);K.rr(g,c.x,c.y,c.w,c.h,u*.2);g.fillStyle=used?'rgba(255,255,255,.12)':'#fff7e6';g.fill();g.lineWidth=3;g.strokeStyle=used?'#7a1a30':GOLD;g.stroke();if(!used)K.txt(g,q.digits[c.k],c.x+c.w/2,c.y+c.h/2,{size:c.h*.62,color:INK,maxW:c.w});});
      G.btns.forEach(b=>{K.rr(g,b.x,b.y,b.w,b.h,u*.25);g.fillStyle=b.go?(st.lock?'#64748b':GOLD):'#7a1a30';g.fill();g.lineWidth=3;g.strokeStyle=GOLD;g.stroke();K.txt(g,b.t,b.x+b.w/2,b.y+b.h/2,{size:Math.min(b.h*.5,u*.9),color:b.go?INK:'#ffe9a8',maxW:b.w*.9});});
      if(st.lock&&!st.okFlag&&st.myBid)K.txt(g,'내 입찰 '+gkComma(st.myBid)+'원',W/2,G.mid.y-u*.35,{size:u*.5,color:'#fecaca',maxW:W*.9});}
    else G.list.forEach((r,i)=>{let s='idle';if(st.lock)s=i===q.okIdx?'ok':(i===st.pick?'bad':'dim');QK.card(g,u,r,(q.ty==='paddle'?'🪧 ':'')+q.opts[i],s,{fill:'#fff7e6',bd:GOLD,ink:INK,rad:u*.2,blur:0});});
  },
};
QZ.mix(GAME,{say:false,pts0:55,pts1:50,okMs:1900,badMs:3400});
Engine.boot(GAME);
