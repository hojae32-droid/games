/* 3학년 2학기 수학 · 들이와 무게 — 마법 물약 공방
   디자인: 별이 반짝이는 밤의 마법사 공방. 주문받은 만큼 물약을 따르고, 저울을 맞추고, 물통 두 개로 딱 맞는 양을 만들어요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#150829',LIME='#a3e635',VIO='#c084fc';
const LOGO=gkLogo('#3f2178','#a3e635','🧪');
const LV={
  a:{t:'들이 (L, mL)',d:'눈금 읽기 · 단위 바꾸기 · 어림'},
  b:{t:'들이의 덧셈과 뺄셈',d:'물약 섞기 · 덜어 내기'},
  c:{t:'무게 (kg, g, t)',d:'저울 읽기 · 단위 바꾸기 · 어림'},
  d:{t:'무게의 덧셈과 뺄셈',d:'재료 무게 더하고 빼기'},
  f:{t:'⚖️ 저울 균형 맞추기',d:'추를 올려 수평 만들기'},
  e:{t:'🫙 물통 퍼즐 (도전)',d:'3 L · 5 L 통으로 4 L 만들기'},
};
const TIME={cup:25,scale:25,pot:20,mix:35,pour:30,jug:120,bal:60};
const J=(w,j)=>{const c=w.charCodeAt(w.length-1);if(c<0xAC00||c>0xD7A3)return w+(j==='을'?'를':j==='은'?'는':j==='과'?'와':'가');const b=(c-0xAC00)%28===0;return w+(j==='을'?(b?'를':'을'):j==='은'?(b?'는':'은'):j==='과'?(b?'와':'과'):(b?'가':'이'));};
const pj=(w,t)=>J(String(w),t).slice(String(w).length);
const EST_L=[['물약 숟가락','약 5 mL',['약 5 L','약 500 mL'],'🥄'],['우유갑','약 200 mL',['약 200 L','약 20 L'],'🥛'],['큰 물병','약 2 L',['약 2 mL','약 200 L'],'🍶'],['욕조','약 200 L',['약 200 mL','약 2 L'],'🛁'],['양동이','약 10 L',['약 10 mL','약 1000 L'],'🪣'],['종이컵','약 180 mL',['약 18 L','약 1800 mL'],'☕']];
const EST_W=[['사과 한 개','약 300 g',['약 300 kg','약 3 g'],'🍎'],['수박 한 통','약 6 kg',['약 6 g','약 600 kg'],'🍉'],['연필 한 자루','약 5 g',['약 5 kg','약 500 g'],'✏️'],['어린이 한 명','약 35 kg',['약 35 g','약 350 kg'],'🧒'],['트럭 한 대','약 5 t',['약 5 kg','약 50 g'],'🚚'],['코끼리','약 6 t',['약 6 kg','약 60 g'],'🐘']];
function jugMin(A,B,t){const seen=new Set(['0,0']);let fr=[[0,0]];for(let d=1;d<=10;d++){const nx=[];for(const[a,b]of fr){const c=[[A,b],[a,B],[0,b],[a,0],[a-Math.min(a,B-b),b+Math.min(a,B-b)],[a+Math.min(b,A-a),b-Math.min(b,A-a)]];for(const[x,y]of c){const k=x+','+y;if(seen.has(k))continue;seen.add(k);if(x===t||y===t)return d;nx.push([x,y]);}}fr=nx;}return 99;}
const JUGS=(()=>{const out=[];[[3,5],[2,5],[3,7],[4,7],[4,9],[5,7],[3,8],[5,8]].forEach(([a,b])=>{for(let t=1;t<b;t++){if(t===a)continue;const m=jugMin(a,b,t);if(m>=2&&m<=8)out.push([a,b,t,m]);}});return out;})();
const Lm=x=>{const a=Math.floor(x/1000),b=x%1000;return((a?a+' L ':'')+(b?b+' mL':'')).trim()||'0 mL';};
const kgf=x=>{const a=Math.floor(x/1000),b=x%1000;return((a?a+' kg ':'')+(b?b+' g':'')).trim()||'0 g';};
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#2a1250','#4c2a94']);for(let i=0;i<24;i++){g.fillStyle='rgba(255,255,255,'+(.3+.5*Math.sin(T*2+i))+')';g.beginPath();g.arc((i*97)%100/100*W,(i*53)%100/100*H*.6,1.8,0,TAU);g.fill();}
  const cx=W/2,cy=H*.62,s=u*1.7;cauldron(g,cx,cy,s,'#a3e635',T,'');}
function cauldron(g,cx,cy,s,col,t,icon){g.save();g.translate(cx,cy);K.glow&&K.glow(g,0,-s*.2,s*1.5,col,.35);for(let k=0;k<5;k++){const ph=(t*.7+k*.21)%1;g.fillStyle=col;g.globalAlpha=.6*(1-ph);g.beginPath();g.arc((k-2)*s*.22,-s*.2-ph*s*.9,s*(.07+k%3*.03),0,TAU);g.fill();}g.globalAlpha=1;
  g.fillStyle='#1e1b3a';g.strokeStyle='#0b0620';g.lineWidth=Math.max(3,s*.05);g.beginPath();g.moveTo(-s*.9,0);g.quadraticCurveTo(-s*.9,s*.95,0,s*.95);g.quadraticCurveTo(s*.9,s*.95,s*.9,0);g.fill();g.stroke();
  g.fillStyle=col;g.beginPath();g.ellipse(0,0,s*.9,s*.2,0,0,TAU);g.fill();g.stroke();g.strokeStyle='#0b0620';g.lineWidth=Math.max(4,s*.07);g.beginPath();g.moveTo(-s*.6,s*.85);g.lineTo(-s*.75,s*1.05);g.moveTo(s*.6,s*.85);g.lineTo(s*.75,s*1.05);g.stroke();
  if(icon)K.emo(g,icon,0,s*.45,s*.7);g.restore();}
function beaker(g,x,y,w,h,v,max,o){o=o||{};g.save();g.lineWidth=Math.max(3,w*.04);g.strokeStyle='#cbd5e1';g.fillStyle='rgba(255,255,255,.16)';g.beginPath();g.moveTo(x,y);g.lineTo(x,y+h-w*.1);g.quadraticCurveTo(x,y+h,x+w*.1,y+h);g.lineTo(x+w*.9,y+h);g.quadraticCurveTo(x+w,y+h,x+w,y+h-w*.1);g.lineTo(x+w,y);g.fill();
  const lv=y+h-h*v/max;if(v>0){g.fillStyle=o.col||'rgba(168,85,247,.85)';g.beginPath();g.moveTo(x+2,lv);g.lineTo(x+w-2,lv);g.lineTo(x+w-2,y+h-w*.1);g.quadraticCurveTo(x+w-2,y+h-2,x+w*.9,y+h-2);g.lineTo(x+w*.1,y+h-2);g.quadraticCurveTo(x+2,y+h-2,x+2,y+h-w*.1);g.closePath();g.fill();g.strokeStyle='#e9d5ff';g.lineWidth=2;g.beginPath();for(let i=0;i<=w;i+=4){const yy=lv+Math.sin(i*.12+(o.t||0)*3)*2;i?g.lineTo(x+i,yy):g.moveTo(x+i,yy);}g.stroke();}
  g.strokeStyle='#cbd5e1';g.lineWidth=Math.max(3,w*.04);g.beginPath();g.moveTo(x,y);g.lineTo(x,y+h-w*.1);g.quadraticCurveTo(x,y+h,x+w*.1,y+h);g.lineTo(x+w*.9,y+h);g.quadraticCurveTo(x+w,y+h,x+w,y+h-w*.1);g.lineTo(x+w,y);g.stroke();
  const n=max/50;for(let k=0;k<=n;k++){const yy=y+h-h*k/n;const big=k%2===0;g.strokeStyle='#f5e9ff';g.lineWidth=big?2.5:1.5;g.beginPath();g.moveTo(x+w,yy);g.lineTo(x+w-(big?w*.28:w*.16),yy);g.stroke();if(big&&o.nums)K.txt(g,k*50===1000?'1 L':String(k*50),x+w+w*.1,yy,{size:Math.min(h/n*1.5,w*.22),color:'#f5e9ff',maxW:w*.5,align:'left'});}g.restore();}
const GAME={
  id:'potion',title:'마법 물약 공방',title1:'별빛 마법사의 공방',title2:'마법 물약 공방',emoji:LOGO,
  subtitle:'3학년 2학기 수학 · 들이와 무게',
  howto:'꼬마 마법사가 되어 물약을 만들어요! 주문받은 만큼 비커에 <b>꾹</b> 눌러 따르고, 추를 올려 저울을 맞추고, 물통 두 개로 딱 맞는 양을 만드는 퍼즐에도 도전해요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:'#7e22ce',c2:'#10b981'},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 마법을 연습할까요?',
  txt:{who:'누가 마법사일까요?',dur:'공방 시간',pace:'생각하는 시간',seat:'번 마법사 ',go:'마법 시작!',s1:'1. 마법',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'3학년 2학기',t:v.t,d:v.d})),
  summary:`<ul><li><b>들이</b>: <b>1 L = 1000 mL</b>. 2 L 300 mL = 2300 mL예요. 들이를 더하고 뺄 때는 L는 L끼리, mL는 mL끼리 계산해요.</li>
    <li><b>무게</b>: <b>1 kg = 1000 g</b>, <b>1 t = 1000 kg</b>. 눈금이 어느 단위인지, 작은 눈금 한 칸이 얼마인지 먼저 살펴봐요.</li>
    <li><b>어림</b>: 우유갑은 약 200 mL, 큰 물병은 약 2 L, 사과는 약 300 g, 수박은 약 6 kg처럼 기준이 되는 것을 기억해 두면 편해요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2,q=p.state.q,pad=u*.35;let rows=[];
    if(q){if(q.labels)rows=[q.labels.map((t,i)=>({id:'o'+i,t,i}))];
      else if(q.ty==='pour')rows=[[{id:'hold',t:'💧 꾹 누르면 따라져요',hold:1}],[{id:'minus',t:'− 조금 덜기'},{id:'plus',t:'+ 한 방울'},{id:'ok',t:'✅ 다 따랐어요',go:1}]];
      else if(q.ty==='jug')rows=[[{id:'fa',t:'🚰 '+q.A+' L 통 채우기'},{id:'fb',t:'🚰 '+q.B+' L 통 채우기'}],[{id:'ea',t:'🫗 '+q.A+' L 통 비우기'},{id:'eb',t:'🫗 '+q.B+' L 통 비우기'}],[{id:'ab',t:'➡ '+q.A+' L → '+q.B+' L 붓기'},{id:'ba',t:'⬅ '+q.B+' L → '+q.A+' L 붓기'}]];
      else rows=[[1000,500,200,100].map(w=>({id:'w'+w,t:'+ '+(w>=1000?w/1000+' kg':w+' g'),wt:w}))].concat([[{id:'undo',t:'↩ 하나 빼기'},{id:'clr',t:'🧹 모두 내리기'},{id:'ok',t:'⚖️ 확인',go:1}]]);}
    const mrh=Math.min(u*1.7,(H-top)*.12);const ctrlH=Math.min((H-top)*.45,rows.length*mrh+(rows.length-1)*u*.2);const oy=H-pad-ctrlH;const gap=u*.2;const list=[];
    const rh=rows.length?(ctrlH-gap*(rows.length-1))/rows.length:0;rows.forEach((row,r)=>{const w=(W-pad*2-gap*(row.length-1))/row.length;row.forEach((b,c)=>list.push(Object.assign({},b,{x:pad+c*(w+gap),y:oy+r*(rh+gap),w,h:rh})));});
    return{W,H,u,top,pad,oy,list,sc:{x:pad,y:top,w:W-pad*2,h:oy-top-pad*.6}};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,amt:0,hold:false,a:0,b:0,moves:0,ws:[],msg:'',msgT:0});this.newQ(p);},
  make(p,L){const R=p.R,q={};const strip=s=>s.replace(/<[^>]+>/g,'');const fin=()=>{q.review=strip(q.text)+' → '+q.reveal;q.speak='';return q;};
    const sopts=(right,wr)=>{const u=[];wr.forEach(w=>{if(w&&w!==right&&!u.includes(w))u.push(w);});const o=R.shuffle([right,...R.shuffle(u).slice(0,2)]);q.labels=o;q.okIdx=o.indexOf(right);};
    const fmt=L==='a'||L==='b'?Lm:kgf;
    if(L==='e'){const P=R.pick(JUGS);q.ty='jug';q.A=P[0];q.B=P[1];q.t=P[2];q.min=P[3];q.limit=P[3]+5;q.text='<b>'+P[0]+' L</b> 통과 <b>'+P[1]+' L</b> 통으로 물을 정확히 <b>'+P[2]+' L</b> 만들어요!';q.reveal='최소 '+P[3]+'번 만에 만들 수 있어요';return fin();}
    if(L==='f'){const w=R.int(3,29)*100;q.ty='bal';q.w=w;q.item=R.pick(['🎃','🍉','📦','🧀','🍍','🪨']);q.label=R.chance(.5)&&w>=1000?kgf(w):w+' g';q.text='왼쪽 재료는 <b>'+q.label+'</b>'+(J(q.label,'이').endsWith('이')?'이에요':'예요')+'. 오른쪽에 추를 올려 <b>수평</b>을 만들어요!';q.reveal=kgf(w)+' = '+w+' g';return fin();}
    if(L==='a'&&R.chance(.45)){const v=R.int(2,18)*50;q.ty='pour';q.v=v;q.text='🧾 주문: 물약 <b>'+v+' mL</b>'+pj(v+' mL','을')+' 비커에 따라 주세요!';q.reveal=v+' mL';return fin();}
    if(L==='a'||L==='c'){const k=R.pick(['read','to','from','est']);q.k=k;const u=L==='a'?' mL':' g';
      if(k==='read'){if(L==='a'){const v=R.int(1,19)*50;q.v=v;q.ty='cup';q.text='비커에 담긴 물약은 몇 mL일까요?';q.reveal=v+' mL';const o=gkOpts3(R,v,[v+50,v-50,v+100,v-100,v+500].filter(x=>x>0&&x<=1000),x=>x+' mL');q.labels=o.labels;q.okIdx=o.okIdx;}
        else{const v=R.int(2,19)*100;q.v=v;q.ty='scale';q.text='저울에 올린 재료의 무게는?';q.reveal=kgf(v);sopts(kgf(v),[kgf(v+100),kgf(v-100),kgf(v+200),Math.floor(v/1000)+' kg '+(v%1000)/100+' g',kgf(v+1000),kgf(Math.abs(v-1000))].filter(x=>!x.startsWith('-')));}}
      else if(k==='to'){const x=R.int(1,5)*1000+R.int(1,19)*50;q.ty='pot';q.text='<b>'+fmt(x)+'</b>'+pj(fmt(x),'은')+' 몇 '+(L==='a'?'mL':'g')+'일까요?';q.reveal=fmt(x)+' = '+x+u;const a=Math.floor(x/1000),b=x%1000;sopts(x+u,[(a*100+b)+u,(a*10000+b)+u,(x+1000)+u,a+''+b+u]);}
      else if(k==='from'){const x=R.int(1,5)*1000+R.int(1,19)*50;q.ty='pot';q.text='<b>'+x+u+'</b>'+pj(x+u,'은')+' 몇 '+(L==='a'?'L 몇 mL':'kg 몇 g')+'일까요?';q.reveal=x+u+' = '+fmt(x);sopts(fmt(x),[fmt(x+1000),fmt(x-1000),(L==='a'?Math.floor(x/100)+' L '+x%100+' mL':Math.floor(x/100)+' kg '+x%100+' g')]);}
      else{const it=R.pick(L==='a'?EST_L:EST_W);q.ty='pot';q.text='<b>'+it[0]+'</b>의 '+(L==='a'?'들이':'무게')+'는 약 얼마일까요?';q.reveal=it[0]+'은(는) '+it[1];sopts(it[1],it[2]);q.icon=it[3];}}
    else{const add=R.chance(.5);let a=R.int(1,4)*1000+R.int(1,9)*100,b=R.int(0,3)*1000+R.int(1,9)*100;if(R.chance(.5)){a+=R.pick([0,50]);b+=R.pick([0,50]);}if(!add&&b>=a){[a,b]=[b+1000,a];}const t=add?a+b:a-b;q.ty='mix';
      q.text=L==='b'?(add?'물약 <b>'+Lm(a)+'</b>'+pj(Lm(a),'과')+' <b>'+Lm(b)+'</b>'+pj(Lm(b),'을')+' 섞으면 모두 얼마?':'물약 <b>'+Lm(a)+'</b>에서 <b>'+Lm(b)+'</b>'+pj(Lm(b),'을')+' 덜어 내면?'):(add?'<b>'+kgf(a)+'</b> 재료에 <b>'+kgf(b)+'</b>'+pj(kgf(b),'을')+' 더 넣으면?':'<b>'+kgf(a)+'</b> 재료에서 <b>'+kgf(b)+'</b>'+pj(kgf(b),'을')+' 덜어 내면?');
      q.reveal=fmt(a)+(add?' + ':' − ')+fmt(b)+' = '+fmt(t);const naive=add?(Math.floor(a/1000)+Math.floor(b/1000))+(L==='b'?' L ':' kg ')+(a%1000+b%1000)+(L==='b'?' mL':' g'):null;sopts(fmt(t),[fmt(t+1000),fmt(Math.max(100,t-1000)),fmt(t+100),naive,add?fmt(t-100):fmt(a+b)]);}
    return fin();},
  qtime(q){return TIME[q.ty];},level(p){this._p=p;return p.levelId;},
  askHtml(q){return q.text;},askSub(q){return {cup:'눈금을 잘 읽어요 (한 칸은 50 mL)',scale:'작은 눈금 한 칸은 100 g',pot:'알맞은 것을 눌러요',mix:'알맞은 양을 눌러요',pour:'눈금을 보고 주문한 만큼 따라요 (±10 mL까지)',jug:'버튼으로 물을 채우고 옮기고 비워요',bal:'추를 올려 저울을 수평으로 만들어요'}[q.ty];},
  isOk(q,i,p){return !!p.state.okFlag;},tipOf(q){return q.reveal;},goodTip(q){return '딩동댕! '+q.reveal;},
  ptsOf(p,q,frac){return Math.round((55+45*frac)*(p.state.part||1))+(q.ty==='jug'?40:0);},
  onNew(p,q){const st=p.state;st.okFlag=false;st.part=1;st.amt=0;st.hold=false;st.a=0;st.b=0;st.moves=0;st.ws=[];st.msg='';st.msgT=0;},
  sum(st){return st.ws.reduce((a,b)=>a+b,0);},
  press(p,b){const st=p.state,q=st.q;p.Snd.tap&&p.Snd.tap();
    if(b.i!=null){st.okFlag=b.i===q.okIdx;this.verdict(p,b.i,false);return;}
    if(q.ty==='pour'){if(b.id==='minus')st.amt=clamp(Math.round(st.amt/10)*10-10,0,1000);else if(b.id==='plus')st.amt=clamp(Math.round(st.amt/10)*10+10,0,1000);else if(b.id==='ok'){st.hold=false;st.amt=Math.round(st.amt/10)*10;const d=Math.abs(st.amt-q.v);st.okFlag=d<=10;this.verdict(p,0,false);}return;}
    if(q.ty==='jug'){const A=q.A,B=q.B;const f={fa:()=>st.a=A,fb:()=>st.b=B,ea:()=>st.a=0,eb:()=>st.b=0,ab:()=>{const m=Math.min(st.a,B-st.b);st.a-=m;st.b+=m;},ba:()=>{const m=Math.min(st.b,A-st.a);st.b-=m;st.a+=m;}}[b.id];if(!f)return;f();st.moves++;p.Snd.tone&&p.Snd.tone(420,.12,'sine',.05);
      if(st.a===q.t||st.b===q.t){st.okFlag=true;st.part=st.moves<=q.min+1?1:.8;st.msg=st.moves+'번 만에 성공! (최소 '+q.min+'번)';this.verdict(p,0,false);}else if(st.moves>=q.limit){st.okFlag=false;this.verdict(p,1,false);}return;}
    if(q.ty==='bal'){if(b.wt){if(st.ws.length<12){st.ws.push(b.wt);p.Snd.tone&&p.Snd.tone(300+b.wt/10,.08,'sine',.05);}}else if(b.id==='undo')st.ws.pop();else if(b.id==='clr')st.ws=[];else if(b.id==='ok'){st.okFlag=this.sum(st)===q.w;this.verdict(p,0,false);}}},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);const b=G.list.find(b=>K.inRect(x,y,b));if(!b)return;if(b.hold){st.hold=true;p.Snd.tap&&p.Snd.tap();return;}this.press(p,b);},
  up(p){const st=p.state;if(st.hold){st.hold=false;st.amt=Math.round(st.amt/10)*10;}},
  upd(p,dt){const st=p.state,q=st.q;if(!q)return;if(st.msgT>0)st.msgT-=dt;if(st.hold&&q.ty==='pour'&&!st.lock){st.amt=Math.min(1000,st.amt+260*dt);if(Math.random()<.15)p.Snd.tone&&p.Snd.tone(500+Math.random()*300,.04,'sine',.025);}},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();const cl=b=>({k:'click',x:rc.left+b.x+b.w/2,y:rc.top+b.y+b.h/2});
    if(q.labels)return cl(G.list[q.okIdx]);
    if(q.ty==='pour'){st.amt=q.v;return cl(G.list.find(b=>b.id==='ok'));}
    if(q.ty==='bal'){const need=q.w-this.sum(st);if(need===0)return cl(G.list.find(b=>b.id==='ok'));const w=[1000,500,200,100].find(w=>w<=need);return cl(G.list.find(b=>b.wt===w));}
    if(q.ty==='jug'){const o=this.jugPlan(q);const s=o[st.moves];if(!s){return null;}return cl(G.list.find(b=>b.id===s));}return null;},
  jugPlan(q){if(q._plan)return q._plan;const A=q.A,B=q.B,t=q.t;const seen=new Map([['0,0',null]]);let fr=[[0,0]];const mv=(a,b)=>[['fa',[A,b]],['fb',[a,B]],['ea',[0,b]],['eb',[a,0]],['ab',[a-Math.min(a,B-b),b+Math.min(a,B-b)]],['ba',[a+Math.min(b,A-a),b-Math.min(b,A-a)]]];
    for(let d=0;d<12;d++){const nx=[];for(const[a,b]of fr){for(const[id,[x,y]]of mv(a,b)){const k=x+','+y;if(seen.has(k))continue;seen.set(k,[a+','+b,id]);if(x===t||y===t){const path=[];let c=k;while(seen.get(c)){const[pk,pid]=seen.get(c);path.unshift(pid);c=pk;}return q._plan=path;}nx.push([x,y]);}}fr=nx;}return q._plan=[];},
  /* ── 그리기 ── */
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q,t=st.T,S=G.sc;if(!q)return;
    K.vgrad(g,0,0,W,H,['#2a1250','#3d1d7a']);for(let i=0;i<30;i++){g.fillStyle='rgba(255,255,255,'+(.25+.5*Math.sin(t*2+i*1.7))+')';g.beginPath();g.arc((i*97)%100/100*W,((i*53)%100)/100*H*.7,1.6,0,TAU);g.fill();}
    const cx=S.x+S.w/2;
    if(q.ty==='cup'){const bh=S.h*.86,bw=Math.min(bh*.5,S.w*.35);beaker(g,cx-bw*.6,S.y+S.h*.07,bw,bh,q.v,1000,{nums:1,t});K.txt(g,'(mL)',cx+bw*.5,S.y+u*.3,{size:u*.45,color:'#e9d5ff',maxW:u*3});}
    else if(q.ty==='scale')this.drawDial(g,S,q,u);
    else if(q.ty==='pot'||q.ty==='mix'){cauldron(g,cx,S.y+S.h*.45,Math.min(S.h*.42,S.w*.18,u*3.4),['#a855f7','#22c55e','#f97316','#ec4899'][p.i%4],t,q.icon||'');}
    else if(q.ty==='pour')this.drawPour(g,S,q,st,u,t);
    else if(q.ty==='jug')this.drawJugs(g,S,q,st,u);
    else this.drawBal(g,S,q,st,u);
    /* 단추 */
    G.list.forEach(b=>{let fill='#4c2a94',ink='#f5e9ff',line='#7c3aed';if(b.go){fill=LIME;ink=INK;line='#4d7c0f';}if(b.hold){fill=st.hold?'#d8b4fe':'#7e22ce';}if(b.i!=null&&st.lock){fill=b.i===q.okIdx?'#16a34a':b.i===st.pick?'#dc2626':'#2a1250';}
      K.rr(g,b.x,b.y,b.w,b.h,u*.25);g.fillStyle=fill;g.fill();g.lineWidth=3;g.strokeStyle=line;g.stroke();K.txt(g,b.t,b.x+b.w/2,b.y+b.h/2,{size:Math.min(b.h*.45,u*.9),color:ink,maxW:b.w*.92});});
    if(st.msgT>0&&st.msg)K.txt(g,st.msg,W/2,S.y+S.h*.9,{size:u*.7,color:'#fef08a',stroke:INK,lw:u*.16,maxW:W*.9});
    if(!st.lock&&st.qmax>0){const bw=Math.min(W*.35,u*7);QZ.bar(g,W-bw-u*.3,S.y+u*.1,bw,Math.max(6,u*.2),st.qt/st.qmax,{good:LIME});}
    K.card(g,u*.3,S.y+u*.05,u*2.8,u*.75,u*.37,'rgba(21,8,41,.88)',{stroke:LIME,lw:3,blur:0,dy:0});K.txt(g,'🧪 '+(st.okN||0)+'개',u*.3+u*1.4,S.y+u*.43,{size:u*.45,color:'#f5e9ff',maxW:u*2.5});
  },
  drawDial(g,S,q,u){const cx=S.x+S.w/2,r=Math.min(S.h*.46,S.w*.25),cy=S.y+S.h*.55;K.shadow&&K.shadow(g,cx,cy+r*1.05,r,r*.15,.4);g.fillStyle='#94a3b8';K.rr(g,cx-r*1.15,cy+r*.8,r*2.3,r*.4,r*.12);g.fill();g.fillStyle='#64748b';K.rr(g,cx-r*.9,cy-r*1.05,r*1.8,r*.22,r*.1);g.fill();K.emo(g,q.v<500?'🍎':q.v<1000?'🍉':q.v<1500?'🎃':'🍍',cx,cy-r*1.28,r*.5);
    g.fillStyle='#fff';g.strokeStyle='#334155';g.lineWidth=Math.max(4,r*.06);g.beginPath();g.arc(cx,cy,r,0,TAU);g.fill();g.stroke();
    for(let k=0;k<20;k++){const a=(-90+k/20*360)*Math.PI/180;const big=k%10===0,mid=k%5===0;const r1=r*.95,r2=big?r*.72:mid?r*.8:r*.86;g.strokeStyle='#111';g.lineWidth=big?3:mid?2.2:1.4;g.beginPath();g.moveTo(cx+r1*Math.cos(a),cy+r1*Math.sin(a));g.lineTo(cx+r2*Math.cos(a),cy+r2*Math.sin(a));g.stroke();if(big)K.txt(g,k?'1 kg':'0',cx+r*.56*Math.cos(a),cy+r*.56*Math.sin(a),{size:r*.18,color:'#111',maxW:r*.4});}
    const a=(-90+q.v/2000*360)*Math.PI/180;g.strokeStyle='#dc2626';g.lineWidth=Math.max(3,r*.05);g.lineCap='round';g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+r*.85*Math.cos(a),cy+r*.85*Math.sin(a));g.stroke();g.fillStyle='#dc2626';g.beginPath();g.arc(cx,cy,r*.08,0,TAU);g.fill();K.txt(g,'작은 눈금 한 칸 = 100 g',cx,cy+r*.35,{size:r*.12,color:'#475569',maxW:r*1.2});},
  drawPour(g,S,q,st,u,t){const bh=S.h*.84,bw=Math.min(bh*.5,S.w*.3),bx=S.x+S.w*.55,by=S.y+S.h*.08;beaker(g,bx,by,bw,bh,st.amt,1000,{nums:1,t});
    const fx=bx-bw*.9,fy=S.y+S.h*.3;g.save();g.translate(fx,fy);g.rotate(st.hold?-.95:0);K.emo(g,'⚗️',0,0,Math.min(u*2.6,S.h*.3));g.restore();if(st.hold){g.strokeStyle='rgba(168,85,247,.9)';g.lineWidth=Math.max(4,u*.12);g.beginPath();g.moveTo(fx+u*.8,fy+u*.9);g.lineTo(bx+bw*.45,by+bh-bh*st.amt/1000);g.stroke();}
    K.card(g,S.x+S.w*.08,S.y+S.h*.55,S.w*.34,S.h*.3,u*.3,'rgba(21,8,41,.88)',{stroke:LIME,lw:3,blur:0,dy:0});K.txt(g,'주문 '+q.v+' mL',S.x+S.w*.25,S.y+S.h*.64,{size:Math.min(u*.9,S.h*.1),color:'#f5e9ff',maxW:S.w*.3});K.txt(g,Math.round(st.amt/10)*10+' mL',S.x+S.w*.25,S.y+S.h*.76,{size:Math.min(u*1.1,S.h*.12),color:LIME,maxW:S.w*.3});},
  drawJugs(g,S,q,st,u){const cap=Math.max(q.A,q.B);const jw=Math.min(S.w*.22,S.h*.34);[[q.A,st.a,S.x+S.w*.3],[q.B,st.b,S.x+S.w*.7]].forEach(([c,v,x])=>{const jh=S.h*.68*c/cap,y=S.y+S.h*.86-jh;g.fillStyle='rgba(255,255,255,.14)';K.rr(g,x-jw/2,y,jw,jh,u*.25);g.fill();g.save();g.beginPath();K.rr(g,x-jw/2,y,jw,jh,u*.25);g.clip();const lh=jh*v/c;const grd=g.createLinearGradient(0,y+jh-lh,0,y+jh);grd.addColorStop(0,'#60a5fa');grd.addColorStop(1,'#2563eb');g.fillStyle=grd;g.fillRect(x-jw/2,y+jh-lh,jw,lh);g.strokeStyle='rgba(255,255,255,.45)';g.lineWidth=2;for(let k=1;k<c;k++){const yy=y+jh-jh*k/c;g.beginPath();g.moveTo(x-jw/2,yy);g.lineTo(x-jw/2+jw*.3,yy);g.stroke();}g.restore();g.strokeStyle='#cbd5e1';g.lineWidth=Math.max(3,u*.09);K.rr(g,x-jw/2,y,jw,jh,u*.25);g.stroke();
      K.txt(g,v+' L',x,y-u*.55,{size:u*.9,color:LIME,maxW:jw*1.4});K.txt(g,c+' L 통',x,S.y+S.h*.86+u*.5,{size:u*.6,color:'#f5e9ff',maxW:jw*1.4});});
    K.card(g,S.x+S.w-u*7.2,S.y+u*.1,u*7.1,u*.9,u*.3,'rgba(21,8,41,.9)',{stroke:LIME,lw:3,blur:0,dy:0});K.txt(g,'🎯 '+q.t+' L · 남은 횟수 '+Math.max(0,q.limit-st.moves),S.x+S.w-u*3.65,S.y+u*.55,{size:u*.5,color:'#f5e9ff',maxW:u*6.6});},
  drawBal(g,S,q,st,u){const sum=this.sum(st);const ang=clamp((sum-q.w)/Math.max(400,q.w)*22,-14,14);const cx=S.x+S.w/2,cy=S.y+S.h*.3,L=Math.min(S.w*.36,S.h*.9);const nm=w=>w>=1000?w/1000+' kg':w+' g';
    g.fillStyle='#a16207';g.fillRect(cx-u*.2,cy,u*.4,S.h*.62);g.fillStyle='#78350f';K.rr(g,cx-u*1.6,cy+S.h*.6,u*3.2,u*.4,u*.15);g.fill();
    g.save();g.translate(cx,cy);g.rotate(ang*Math.PI/180);g.fillStyle='#ca8a04';K.rr(g,-L,-u*.15,L*2,u*.3,u*.15);g.fill();
    const pan=(sx,draw)=>{g.save();g.translate(sx,0);g.rotate(-ang*Math.PI/180);g.strokeStyle='#d6a15a';g.lineWidth=2;g.beginPath();g.moveTo(0,0);g.lineTo(0,S.h*.3);g.stroke();g.fillStyle='#fde68a';g.strokeStyle='#a16207';g.beginPath();g.ellipse(0,S.h*.3,L*.38,u*.3,0,0,TAU);g.fill();g.stroke();draw();g.restore();};
    pan(-L*.8,()=>{K.emo(g,q.item,0,S.h*.3-u*1.2,u*1.9);K.txt(g,q.label,0,S.h*.3+u*.9,{size:u*.6,color:'#fde68a',maxW:L*.7});});
    pan(L*.8,()=>{const ws=st.ws.slice().sort((a,b)=>b-a);ws.forEach((w,k)=>{const ww=(w/1000*L*.5+L*.2),hh=u*.55;g.fillStyle=w>=1000?'#475569':w>=500?'#64748b':w>=200?'#94a3b8':'#cbd5e1';g.strokeStyle='#1e293b';g.lineWidth=2;K.rr(g,-ww/2,S.h*.3-hh*(k+1)-u*.1,ww,hh,u*.1);g.fill();g.stroke();K.txt(g,nm(w),0,S.h*.3-hh*(k+.5)-u*.1,{size:hh*.65,color:'#fff',maxW:ww*.9});});});
    g.restore();g.fillStyle=sum===q.w?'#22c55e':'#ef4444';g.beginPath();g.moveTo(cx,cy-u*.45);g.lineTo(cx-u*.3,cy-u*1.0);g.lineTo(cx+u*.3,cy-u*1.0);g.closePath();g.fill();
    K.txt(g,'올린 추 '+(sum?kgf(sum):'없음'),cx+S.w*.3,S.y+S.h*.8,{size:u*.55,color:'#e9d5ff',maxW:S.w*.3});},
};
QZ.mix(GAME,{say:false,pts0:55,pts1:45,okMs:1800,badMs:3200});
Engine.boot(GAME);
