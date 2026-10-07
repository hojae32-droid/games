/* 5학년 1학기 수학 · 자연수의 혼합 계산 — 숫자 요리사 식당
   디자인: 손님이 줄줄이 오는 인기 식당 주방. 레시피 식에서 먼저 계산할 곳을 누르고 계산하면 음식이 한 층씩 쌓여요. 틀리면 그 층이 타 버려요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#5b2a0e',ORG='#c2410c',GRN='#16a34a';
const LOGO=gkLogo('#ffedd5','#7c2d12','👩‍🍳');
const LV={
  a:{t:'계산 순서 요리',d:'먼저 할 곳을 차례로 눌러 쌓기'},
  b:{t:'혼합 계산 요리',d:'순서대로 한 단계씩 계산해 쌓기'},
  c:{t:'비밀 소스 (기호 넣기)',d:'□에 +, −, ×, ÷ 넣어 맛 맞추기'},
  d:{t:'🃏 셰프 특선 카드',d:'숫자 카드 4장으로 주문 수 만들기'},
};
const OPS=['+','−','×','÷'];
const DISHES=[{name:'햄버거',icon:'🍔',base:'bun-b',layers:['patty','cheese','lettuce','tomato','patty','cheese'],top:'bun-t'},{name:'딸기 케이크',icon:'🍰',base:'cake-b',layers:['cream','sponge','cream','sponge','cream','sponge'],top:'berry'},
  {name:'샌드위치',icon:'🥪',base:'bread',layers:['ham','cheese','lettuce','egg','tomato','ham'],top:'bread'},{name:'팬케이크',icon:'🥞',base:'pan',layers:['pan','pan','pan','pan','pan','pan'],top:'syrup'}];
const LCOL={'bun-b':'#d97706','bun-t':'#d97706',patty:'#78350f',cheese:'#facc15',lettuce:'#4ade80',tomato:'#ef4444','cake-b':'#fcd34d',cream:'#fff7ed',sponge:'#f59e0b',berry:'#e11d48',bread:'#fde68a',ham:'#fb7185',egg:'#fef9c3',pan:'#d6a15a',syrup:'#92400e'};
const J=(w,j)=>{const c=w.charCodeAt(w.length-1);if(c<0xAC00||c>0xD7A3)return w+(j==='을'?'를':'가');const b=(c-0xAC00)%28===0;return w+(j==='을'?(b?'를':'을'):(b?'가':'이'));};
const pj=(w,t)=>J(String(w),t).slice(String(w).length);
/* 계산 도우미 */
const TPL_A=['A+B×C','A−B÷C','(A+B)×C','A×(B−C)','A+B×C−D','A÷B+C×D','(A−B)÷C+D','A×B−C÷D','A+(B−C)×D','A−B+C×D','A×B÷C+D','A+B−C×D'];
const TPL_B=['A+B×C−D','A÷B+C×D','(A−B)÷C+D','A×B−C÷D','A+(B−C)×D','(A+B)×C÷D','A×(B+C)−D','A−B÷C×D','A+B×(C−D)','(A+B−C)×D','A×B+C×D−E','A÷(B−C)+D'];
const tok=s=>s.match(/[A-E]|[()]|[+−×÷]/g);
const prec=o=>o==='×'||o==='÷'?2:1;
function evalT(toks,strict){const out=[],st=[];const ap=()=>{const o=st.pop();const b=out.pop(),a=out.pop();if(a==null||b==null)return false;let v;if(o==='+')v=a+b;else if(o==='−'){v=a-b;if(v<0||(strict&&v===0))return false;}else if(o==='×')v=a*b;else{if(b===0||a%b)return false;v=a/b;}out.push(v);return true;};
  for(const x of toks){if(typeof x==='number')out.push(x);else if(x==='(')st.push(x);else if(x===')'){while(st.length&&st[st.length-1]!=='('){if(!ap())return null;}st.pop();}else{while(st.length&&st[st.length-1]!=='('&&prec(st[st.length-1])>=prec(x)){if(!ap())return null;}st.push(x);}}
  while(st.length){if(!ap())return null;}return out.length===1?out[0]:null;}
function fill(tp,R){const t=tok(tp);for(let tries=0;tries<60;tries++){const m={};'ABCDE'.split('').forEach(c=>m[c]=R.int(2,R.chance(.3)?30:12));const toks=t.map(x=>m[x]!=null?m[x]:x);const v=evalT(toks,true);if(v!=null&&v>=0)return toks;}return null;}
const join=(nums,ops)=>{const t=[nums[0]];ops.forEach((o,k)=>{t.push(o,nums[k+1]);});return t;};
const fmtT=t=>t.map(x=>OPS.includes(x)?' '+x+' ':x).join('');
function groups(toks){const res=[],st=[];toks.forEach((x,k)=>{if(x==='(')st.push(k);else if(x===')'){const s0=st.pop();if(!toks.slice(s0+1,k).includes('('))res.push([s0+1,k]);}});return res.length?res:[[0,toks.length]];}
function allowed(toks,k){if(!OPS.includes(toks[k])||typeof toks[k-1]!=='number'||typeof toks[k+1]!=='number')return false;const g=groups(toks).find(([a,b])=>k>a&&k<b);if(!g)return false;const seg=toks.slice(g[0],g[1]);const mx=Math.max(...seg.filter(x=>OPS.includes(x)).map(prec));if(prec(toks[k])<mx)return false;const lo=toks[k-2];return !(k-2>=g[0]&&OPS.includes(lo)&&prec(lo)===prec(toks[k]));}
function why(toks,k){if(groups(toks)[0][1]!==toks.length&&!groups(toks).some(([a,b])=>k>a&&k<b))return '괄호 안을 먼저 계산해요';const g=groups(toks).find(([a,b])=>k>a&&k<b)||[0,toks.length];const seg=toks.slice(g[0],g[1]);if(prec(toks[k])<Math.max(...seg.filter(x=>OPS.includes(x)).map(prec)))return '곱셈·나눗셈을 먼저 해요';return '앞에서부터 차례로 계산해요';}
const calc1=(a,o,b)=>o==='+'?a+b:o==='−'?a-b:o==='×'?a*b:a/b;
function cardPuzzle(R){for(let t=0;t<500;t++){const nums=[R.int(1,9),R.int(1,9),R.int(2,9),R.int(1,9)];const o=()=>R.pick(OPS);let A=R.shuffle(nums.map(n=>({v:n,e:String(n),op:null})));
    const comb=(x,op,y)=>{const v=calc1(x.v,op,y.v);if(v<0||!Number.isInteger(v))return null;const wrap=(z,side)=>z.op&&(prec(z.op)<prec(op)||(side&&(op==='−'||op==='÷')&&prec(z.op)===prec(op)))?'('+z.e+')':z.e;return{v,e:wrap(x,0)+' '+op+' '+wrap(y,1),op};};
    let r;if(R.chance(.5)){const a=comb(A[0],o(),A[1]);if(!a)continue;const b=comb(a,o(),A[2]);if(!b)continue;r=comb(b,o(),A[3]);}else{const a=comb(A[0],o(),A[1]),b=comb(A[2],o(),A[3]);if(!a||!b)continue;r=comb(a,o(),b);}
    if(!r||r.v<5||r.v>60)continue;if(r.e.split('×').length+r.e.split('÷').length<3)continue;return{nums,target:r.v,sol:r.e};}
  return{nums:[3,8,2,1],target:24,sol:'3 × 8 × (2 − 1)'};}
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#fff4e0','#fed7aa']);g.fillStyle='#b45309';g.fillRect(0,H*.7,W,H*.3);const x=W/2,y=H*.68;const cols=['#d97706','#78350f','#facc15','#4ade80','#ef4444','#78350f','#d97706'];
  const n=Math.min(7,3+Math.floor((T%4)*1.8));for(let i=0;i<n;i++){g.fillStyle=cols[i];K.rr(g,x-u*1.3,y-(i+1)*u*.35,u*2.6,u*.32,u*.14);g.fill();}K.emo(g,'👩‍🍳',W*.25,H*.45,u*1.6);K.txt(g,'(3 + 5) × 2',W*.75,H*.35,{size:u*.9,color:'#7c2d12',maxW:W*.4});}
const GAME={
  id:'chef',title:'숫자 요리사 식당',title1:'인기 만점 주방',title2:'숫자 요리사 식당',emoji:LOGO,
  subtitle:'5학년 1학기 수학 · 자연수의 혼합 계산',
  howto:'손님이 줄줄이 와서 음식을 주문해요! 레시피 식에서 <b>먼저 계산할 곳을 누르고</b> 계산을 맞히면 음식이 한 층씩 완성돼요. 틀리면 그 층이 타 버려요. 빨리 내면 <b>팁</b>까지!',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:ORG,c2:GRN},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 요리를 만들까요?',
  txt:{who:'누가 요리사일까요?',dur:'영업 시간',pace:'손님 인내심',seat:'번 요리사 ',go:'영업 시작!',s1:'1. 요리',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'5학년 1학기',t:v.t,d:v.d})),
  summary:`<ul><li>식에서 <b>덧셈·뺄셈</b>과 <b>곱셈·나눗셈</b>이 섞여 있으면 <b>곱셈·나눗셈을 먼저</b> 계산해요. 예) 3 + 4 × 2 = 3 + 8 = 11</li>
    <li>같은 순위의 계산은 <b>앞에서부터 차례로</b> 해요. 예) 20 − 8 + 3 = 12 + 3 = 15</li>
    <li><b>( )</b>가 있으면 괄호 안을 가장 먼저 계산해요. 예) (3 + 4) × 2 = 7 × 2 = 14</li>
    <li>계산 결과가 되도록 □에 +, −, ×, ÷를 넣어 보면 계산 순서를 더 잘 이해할 수 있어요.</li></ul>`,
  /* 레이아웃: 가로 → 왼쪽 주방 + 오른쪽 조작판 / 세로 → 위 주방 + 아래 조작판 */
  rowsFor(p){const st=p.state,q=st.q;if(!q)return[];if(st.ready)return[[{id:'serve',t:'🛎️ 손님께 드리기',go:1}]];
    if(q.ty==='steps')return[[1,2,3].map(n=>({id:'n'+n,t:String(n)})),[4,5,6].map(n=>({id:'n'+n,t:String(n)})),[7,8,9].map(n=>({id:'n'+n,t:String(n)})),[{id:'bs',t:'⌫'},{id:'n0',t:'0'},{id:'go',t:'🍳',go:1}]];
    if(q.ty==='ops')return[OPS.map(o=>({id:'o'+o,t:o,op:o})),[{id:'done',t:'🥣 소스 완성!',go:1}]];
    if(q.ty==='cards')return[st.cards.map((c,k)=>({id:'c'+k,t:'',card:k})),OPS.map(o=>({id:'o'+o,t:o,op:o})),[{id:'reset',t:'↩ 처음부터'},{id:'giveup',t:'🏳️ 포기'}]];
    return[];},
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2,pad=u*.35,land=W>=H*1.1;const rows=this.rowsFor(p);const gap=u*.2;let scene,panel;
    if(land){const sw=W*.55;scene={x:pad,y:top,w:sw,h:H-top-pad};panel={x:pad*2+sw,y:top,w:W-sw-pad*3,h:H-top-pad};}
    else{const rh0=Math.min(u*1.7,(H-top)*.1);const ph=Math.min((H-top)*.5,Math.max(rows.length,1)*rh0+(Math.max(rows.length,1)-1)*gap+u*1.4);scene={x:pad,y:top,w:W-pad*2,h:H-top-pad-ph-u*.2};panel={x:pad,y:H-pad-ph,w:W-pad*2,h:ph};}
    const hintH=u*1.2;const bh=panel.h-hintH;const rh=rows.length?Math.min(u*1.8,(bh-gap*(rows.length-1))/rows.length):0;const list=[];const y0=panel.y+hintH+Math.max(0,(bh-(rows.length*rh+(rows.length-1)*gap))/2);
    rows.forEach((row,r)=>{const w=(panel.w-gap*(row.length-1))/row.length;row.forEach((b,c)=>list.push(Object.assign({},b,{x:panel.x+c*(w+gap),y:y0+r*(rh+gap),w,h:rh})));});
    return{W,H,u,top,pad,land,scene,panel,list,hint:{x:panel.x,y:panel.y,w:panel.w,h:hintH}};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,t:[],sel:null,np:'',layers:[],burnt:0,ready:false,hint:'',cards:[],csel:null,cop:null,hist:[],ops:[],osel:0,okFlag:false,served:0,earned:0});this.newQ(p);},
  make(p,L){const R=p.R,q={};q.dish=R.pick(DISHES);const strip=s=>s.replace(/<[^>]+>/g,'');
    if(L==='d'){Object.assign(q,cardPuzzle(R));q.ty='cards';q.price=6000;q.pat=80;q.order='셰프 특선! 숫자 '+q.target+' 요리 주세요';q.text='카드 4장을 모두 써서 <b>'+q.target+'</b>'+pj(q.target,'을')+' 만들어요!';q.reveal='예: '+q.sol+' = '+q.target;q.review='['+q.nums.join(', ')+'] → '+q.target+' · '+q.reveal;q.speak='';return q;}
    if(L==='c'){for(let t=0;t<200;t++){const n=R.pick([3,3,4]);const nums=[];for(let k=0;k<n;k++)nums.push(R.int(2,9));const ops=[];for(let k=0;k<n-1;k++)ops.push(R.pick(OPS));const v=evalT(join(nums,ops));if(v==null||v<1||v>99)continue;q.nums=nums;q.target=v;q.ops=ops;break;}
      if(!q.nums){q.nums=[3,4,2];q.ops=['+','×'];q.target=11;}q.ty='ops';q.price=4000;q.pat=45;q.order='맛 점수 '+q.target+'짜리 비밀 소스 주세요!';q.text='□에 기호를 넣어 식의 값이 <b>'+q.target+'</b>'+pj(q.target,'이')+' 되게 해요!';q.reveal=fmtT(join(q.nums,q.ops))+' = '+q.target;q.review=strip(q.text)+' → '+q.reveal;q.speak='';return q;}
    let toks=null,v;for(let t=0;t<300;t++){const tp=R.pick(L==='a'?TPL_A:TPL_B);toks=fill(tp,R);if(!toks)continue;v=evalT(toks);if(v!=null&&v>=0&&v<1000)break;toks=null;}
    if(!toks){toks=[3,'+',4,'×',2];v=11;}q.toks=toks;q.ans=v;q.steps=toks.filter(x=>OPS.includes(x)).length;q.ty=L==='a'?'order':'steps';q.price=L==='a'?2000+500*q.steps:3000+1000*q.steps;q.pat=L==='a'?14+5*q.steps:18+13*q.steps;
    q.order=q.dish.name+' 하나 주세요! '+q.dish.icon;q.text=L==='a'?'레시피 식에서 <b>먼저 계산할 곳</b>을 차례로 눌러요':'먼저 계산할 곳을 누르고 <b>계산</b>해서 한 층씩 쌓아요';q.reveal=fmtT(toks)+' = '+v;q.review=fmtT(toks)+' → '+v;q.speak='';return q;},
  qtime(q){return q.pat;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return q.text;},askSub(q){return q.ty==='cards'?'카드 → 기호 → 카드 순서로 눌러요':q.ty==='ops'?'□를 고르고 기호를 눌러요':'계산 순서 규칙을 떠올려 봐요';},
  isOk(q,i,p){return !!p.state.okFlag;},tipOf(q){return q.reveal;},goodTip(q){return '맛있게 먹었어요! '+q.reveal;},
  ptsOf(p,q,frac){return Math.round(q.price/50*(.7+.6*frac));},
  onNew(p,q){const st=p.state;st.okFlag=false;st.layers=[];st.burnt=0;st.ready=false;st.sel=null;st.np='';st.hint=q.ty==='cards'?'카드를 고른 뒤 기호, 다른 카드를 눌러요':q.ty==='ops'?'□를 눌러 고르고 기호를 넣어요':'👆 먼저 계산할 기호를 눌러요';st.csel=null;st.cop=null;st.hist=[];
    if(q.toks)st.t=q.toks.slice();if(q.ty==='ops'){st.ops=q.nums.slice(1).map(()=>null);st.osel=0;}if(q.ty==='cards')st.cards=q.nums.map(n=>({v:n,e:String(n),op:null}));},
  onVerdict(p,q,ok){const st=p.state;if(ok){st.served++;}},
  addLayer(p,burnt){const st=p.state,q=st.q;const k=st.layers.length;st.layers.push({k,burnt,t:st.T,type:q.dish.layers[k%q.dish.layers.length]});if(burnt){st.burnt++;p.Snd.tone&&p.Snd.tone(150,.3,'sine',.07);}else p.Snd.tone&&p.Snd.tone(520+k*90,.12,'sine',.06);},
  finish(p){const st=p.state,q=st.q;st.ready=true;st.hint=st.burnt?'앗, 탄 곳이 있어요… 그래도 드려 볼까요?':'✨ 완성! 손님께 드려요';},
  collapse(p,k,val){const st=p.state;st.t.splice(k-1,3,val);let at=k-1;if(st.t[at-1]==='('&&st.t[at+1]===')'){st.t.splice(at+1,1);st.t.splice(at-1,1);at--;}st.sel=null;st.np='';if(st.t.length===1)this.finish(p);},
  /* 식 토큰 위치 */
  exprLayout(p,G){const st=p.state,q=st.q;const S=G.scene,u=G.u;const rc={x:S.x+u*.3,y:S.y+u*2.5,w:S.w-u*.6,h:Math.min(S.h*.26,u*4.2)};let items=[];
    if(q.ty==='ops'){q.nums.forEach((n,k)=>{if(k)items.push({k:k-1,txt:st.ops[k-1]||'□',op:true,slot:true});items.push({txt:String(n)});});items.push({txt:'= '+q.target,tail:true});}
    else if(q.ty==='cards')items=[{txt:'🎯 '+q.target,tail:true}];
    else st.t.forEach((x,k)=>items.push({k,txt:String(x),op:OPS.includes(x),paren:x==='('||x===')'}));
    const fs=Math.min(u*1.5,rc.h*.5);const meas=document.createElement('canvas').getContext('2d');meas.font=K.font(fs);
    const ws=items.map(it=>Math.max(meas.measureText(it.txt).width+fs*(it.op?.5:.3),fs*.55));let tot=ws.reduce((a,b)=>a+b,0)+fs*.1*items.length;let sc=Math.min(1,(rc.w-u*.4)/tot);const fs2=fs*sc;let x=rc.x+(rc.w-tot*sc)/2;
    items.forEach((it,i)=>{it.w=ws[i]*sc;it.h=fs2*1.35;it.x=x;it.y=rc.y+rc.h/2-it.h/2+u*.2;it.fs=fs2;x+=ws[i]*sc+fs2*.1;});return{items,rc,fs:fs2};},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);const b=G.list.find(b=>K.inRect(x,y,b));
    if(b){p.Snd.tap&&p.Snd.tap();
      if(b.id==='serve'){st.okFlag=st.burnt===0;this.verdict(p,st.okFlag?0:1,false);return;}
      if(b.id&&b.id[0]==='n'&&b.id.length===2){if(st.np.length<5)st.np+=b.id[1];return;}if(b.id==='bs'){st.np=st.np.slice(0,-1);return;}
      if(b.id==='go'){this.stepAnswer(p);return;}
      if(b.op&&q.ty==='ops'){st.ops[st.osel]=b.op;const nx=st.ops.findIndex(o=>!o);if(nx>=0)st.osel=nx;return;}
      if(b.id==='done'){if(st.ops.some(o=>!o)){p.Snd.bad&&p.Snd.bad();return;}const v=evalT(join(q.nums,st.ops));const ok=v===q.target;st.ops.forEach(()=>this.addLayer(p,!ok));st.opsRes=v;this.finish(p);return;}
      if(q.ty==='cards'){if(b.card!=null){this.cardTap(p,b.card);return;}if(b.op){if(st.csel!=null){st.cop=b.op;}return;}
        if(b.id==='reset'){st.cards=q.nums.map(n=>({v:n,e:String(n),op:null}));st.hist=[];st.csel=null;st.cop=null;st.layers=[];st.hint='처음부터 다시!';return;}
        if(b.id==='giveup'){st.okFlag=false;this.verdict(p,1,false);return;}}
      return;}
    const L=this.exprLayout(p,G);const it=L.items.find(i=>i.x!==undefined&&x>=i.x&&x<=i.x+i.w&&y>=i.y&&y<=i.y+i.h);if(!it)return;
    if((q.ty==='order'||q.ty==='steps')&&!st.ready&&it.op)this.pickOp(p,it.k);else if(q.ty==='ops'&&it.slot&&!st.ready)st.osel=it.k;},
  pickOp(p,k){const st=p.state,q=st.q;if(!allowed(st.t,k)){const first=st.t.map((x,i)=>i).find(i=>allowed(st.t,i));st.hint='🔥 '+why(st.t,k)+'! ('+st.t[first-1]+' '+st.t[first]+' '+st.t[first+1]+' 먼저)';this.addLayer(p,true);
      if(q.ty==='order'){this.collapse(p,first,calc1(st.t[first-1],st.t[first],st.t[first+1]));}else{st.sel=first;st.np='';}return;}
    if(q.ty==='order'){this.addLayer(p,false);st.hint='👍 다음에 계산할 기호를 눌러요';this.collapse(p,k,calc1(st.t[k-1],st.t[k],st.t[k+1]));return;}
    st.sel=k;st.np='';st.hint=st.t[k-1]+' '+st.t[k]+' '+st.t[k+1]+' = ?';},
  stepAnswer(p){const st=p.state;if(st.ready)return;if(st.sel==null){st.hint='👆 먼저 계산할 기호를 눌러요';p.Snd.bad&&p.Snd.bad();return;}if(st.np==='')return;const k=st.sel,val=calc1(st.t[k-1],st.t[k],st.t[k+1]);const right=Number(st.np)===val;this.addLayer(p,!right);
    st.hint=right?'👍 한 층 완성! 다음 기호를 눌러요':'🔥 '+st.t[k-1]+' '+st.t[k]+' '+st.t[k+1]+' = '+val+' 이었어요';this.collapse(p,k,val);},
  cardTap(p,k){const st=p.state,q=st.q;if(st.csel==null||st.cop==null){st.csel=k;return;}if(k===st.csel){st.csel=null;st.cop=null;return;}
    const x=st.cards[st.csel],y=st.cards[k],op=st.cop;const v=calc1(x.v,op,y.v);if(v<0||!Number.isInteger(v)){st.hint=v<0?'앗, 0보다 작아지면 안 돼요':'앗, 나누어떨어지지 않아요';p.Snd.bad&&p.Snd.bad();st.cop=null;return;}
    const wrap=(z,side)=>z.op&&(prec(z.op)<prec(op)||(side&&(op==='−'||op==='÷')&&prec(z.op)===prec(op)))?'('+z.e+')':z.e;const nc={v,e:wrap(x,0)+' '+op+' '+wrap(y,1),op};st.hist.push(x.v+' '+op+' '+y.v+' = '+v);this.addLayer(p,false);
    const keep=st.cards.filter((_,i)=>i!==st.csel&&i!==k);keep.splice(Math.min(st.csel,k),0,nc);st.cards=keep;st.csel=null;st.cop=null;st.hint='';
    if(st.cards.length===1){if(v===q.target){this.finish(p);}else{st.hint=v+'이(가) 되었어요. 다시 해 봐요!';p.Snd.bad&&p.Snd.bad();st.reset=1.0;}}},
  upd(p,dt){const st=p.state,q=st.q;if(!q)return;if(st.reset>0){st.reset-=dt;if(st.reset<=0){st.reset=0;if(!st.lock&&q.ty==='cards'&&!st.ready){st.cards=q.nums.map(n=>({v:n,e:String(n),op:null}));st.hist=[];st.layers=[];st.csel=null;st.cop=null;}}}},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();const cl=r=>({k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2});
    if(st.ready)return cl(G.list.find(b=>b.id==='serve'));
    if(q.ty==='order'){const L=this.exprLayout(p,G);const k=st.t.map((x,i)=>i).find(i=>allowed(st.t,i));const it=L.items.find(i=>i.k===k&&i.op);return cl(it);}
    if(q.ty==='steps'){if(st.sel==null){const L=this.exprLayout(p,G);const k=st.t.map((x,i)=>i).find(i=>allowed(st.t,i));return cl(L.items.find(i=>i.k===k&&i.op));}
      const val=String(calc1(st.t[st.sel-1],st.t[st.sel],st.t[st.sel+1]));if(st.np!==val){st.np=val;}return cl(G.list.find(b=>b.id==='go'));}
    if(q.ty==='ops'){const need=st.ops.findIndex(o=>!o);if(need>=0){const o=q.ops[need];st.osel=need;return cl(G.list.find(b=>b.op===o));}return cl(G.list.find(b=>b.id==='done'));}
    return null;},
  /* ── 그리기 ── */
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q,t=st.T,S=G.scene;if(!q)return;
    K.vgrad(g,0,0,W,H,['#fff4e0','#fed7aa']);g.fillStyle='rgba(194,65,12,.07)';for(let i=0;i<14;i++)g.fillRect((i*89)%W,G.top+(i*53)%(H*.4),u*.8,u*.8);
    /* 손님 */
    const cy=S.y+S.h*.08;K.emo(g,st.res==='bad'?'😖':st.res==='ok'?'😋':'🧑',S.x+u*1.2,cy+u*.5,u*1.5);K.card(g,S.x+u*2.3,cy-u*.2,S.w-u*2.5,u*1.5,u*.3,'#fffdf6',{stroke:'#7c2d12',lw:3,blur:0,dy:0});K.txt(g,q.order,S.x+u*2.3+(S.w-u*2.5)/2,cy+u*.4,{size:Math.min(u*.8,u*1.5*.35),color:INK,maxW:S.w-u*3});
    if(!st.lock&&st.qmax>0)QZ.bar(g,S.x+u*2.5,cy+u*1.05,S.w-u*2.9,Math.max(5,u*.2),st.qt/st.qmax,{good:GRN});
    /* 레시피 */
    const L=this.exprLayout(p,G);const rc=L.rc;K.card(g,rc.x,rc.y,rc.w,rc.h+u*.6,u*.3,'#fffbeb',{stroke:'#a16207',lw:3,blur:u*.2,dy:u*.06});K.txt(g,'📜 레시피',rc.x+u*1.7,rc.y+u*.35,{size:u*.5,color:'#92400e',maxW:u*3});
    L.items.forEach(it=>{const sel=(q.ty==='steps'&&st.sel===it.k&&it.op)||(q.ty==='ops'&&it.slot&&st.osel===it.k);const can=(q.ty==='order'||q.ty==='steps')&&it.op&&!st.ready;
      if(it.op&&(can||it.slot)){K.rr(g,it.x,it.y,it.w,it.h,it.fs*.2);g.fillStyle=sel?'#fde68a':it.slot?'#fff':'#ffedd5';g.fill();g.lineWidth=sel?4:2;g.strokeStyle=sel?ORG:'#d6a15a';g.stroke();}
      else if(q.ty==='steps'&&st.sel!=null&&!it.op&&typeof it.k==='number'&&Math.abs(it.k-st.sel)===1){g.fillStyle='rgba(250,204,21,.4)';K.rr(g,it.x,it.y,it.w,it.h,it.fs*.2);g.fill();}
      K.txt(g,it.txt,it.x+it.w/2,it.y+it.h/2+it.fs*.04,{size:it.fs,color:it.paren?'#7c2d12':it.tail?ORG:INK,maxW:it.w*1.05});});
    if(q.ty==='ops'&&st.ready&&st.opsRes!=null)K.txt(g,'(= '+st.opsRes+')',rc.x+rc.w/2,rc.y+rc.h+u*.3,{size:u*.6,color:st.okFlag||st.opsRes===q.target?GRN:'#dc2626',maxW:rc.w});
    if(q.ty==='cards'){const hy=rc.y+rc.h*.75;st.hist.slice(-3).forEach((h,i)=>K.txt(g,h,rc.x+rc.w/2,hy+i*u*.6-u*.6,{size:u*.5,color:'#78350f',maxW:rc.w}));}
    /* 접시와 음식 */
    const py=S.y+S.h-u*.9,px=S.x+S.w/2,pw=Math.min(S.w*.5,u*7);g.fillStyle='#fff';g.strokeStyle='#cbd5e1';g.lineWidth=3;g.beginPath();g.ellipse(px,py,pw/2,u*.45,0,0,TAU);g.fill();g.stroke();
    const lh=Math.min(u*.42,(py-(rc.y+rc.h+u*1.2))/8);const stack=[];if(st.layers.length||st.ready)stack.push({type:q.dish.base});st.layers.forEach(l=>stack.push(l));if(st.ready&&q.dish.top)stack.push({type:q.dish.top});
    stack.forEach((l,i)=>{const yy=py-u*.15-(i+1)*lh;const drop=l.t!=null?clamp((t-l.t)/.3,0,1):1;const off=(1-drop)*-u*1.5;g.save();g.globalAlpha=drop;K.rr(g,px-pw*.42,yy+off,pw*.84,lh*.95,lh*.35);g.fillStyle=l.burnt?'#1f1a17':(LCOL[l.type]||'#d6a15a');g.fill();g.strokeStyle='rgba(0,0,0,.25)';g.lineWidth=2;g.stroke();if(l.burnt)K.emo(g,'💨',px+pw*.3,yy+off+lh*.4,lh);g.restore();});
    K.txt(g,(q.ty==='ops'?'🥣 비밀 소스':q.ty==='cards'?'🃏 셰프 특선':q.dish.icon+' '+q.dish.name),px,py+u*.75,{size:u*.55,color:'#7c2d12',maxW:S.w*.6});
    /* 조작판 */
    const P=G.panel;K.txt(g,st.hint,P.x+P.w/2,P.y+G.hint.h*.5,{size:Math.min(u*.62,G.hint.h*.5),color:st.hint.startsWith('🔥')||st.hint.startsWith('앗')?'#b91c1c':INK,maxW:P.w});
    if(q.ty==='steps'&&!st.ready){const bx=P.x+P.w*.2,by=P.y+G.hint.h*.1;}
    G.list.forEach(b=>{let fill='#fffdf6',ink=INK,line='#7c2d12',sel=false;if(b.go){fill=ORG;ink='#fff';}if(b.op&&q.ty==='cards'&&st.cop===b.op)sel=true;
      if(b.card!=null){const c=st.cards[b.card];K.rr(g,b.x,b.y,b.w,b.h,u*.25);g.fillStyle=st.csel===b.card?'#fde68a':'#fffdf6';g.fill();g.lineWidth=st.csel===b.card?5:3;g.strokeStyle=st.csel===b.card?ORG:line;g.stroke();K.txt(g,String(c.v),b.x+b.w/2,b.y+b.h*(c.op?.38:.5),{size:Math.min(b.h*.55,u*1.4),color:INK,maxW:b.w*.9});if(c.op)K.txt(g,c.e,b.x+b.w/2,b.y+b.h*.8,{size:Math.min(b.h*.2,u*.42),color:'#92400e',maxW:b.w*.92});return;}
      K.rr(g,b.x,b.y,b.w,b.h,u*.25);g.fillStyle=sel?'#fde68a':fill;g.fill();g.lineWidth=sel?5:3;g.strokeStyle=sel?ORG:line;g.stroke();K.txt(g,b.t,b.x+b.w/2,b.y+b.h/2,{size:Math.min(b.h*.5,u*1.1),color:ink,maxW:b.w*.9});});
    if(q.ty==='steps'&&!st.ready){const ix=P.x+P.w*.1;K.card(g,P.x+P.w*.1,P.y-u*.0,0,0,0,'rgba(0,0,0,0)');}
    if(q.ty==='steps'&&!st.ready&&st.sel!=null){K.card(g,rc.x+rc.w*.3,rc.y+rc.h+u*.75,rc.w*.4,u*1.0,u*.25,'#fff',{stroke:ORG,lw:3,blur:0,dy:0});K.txt(g,(st.np||'?'),rc.x+rc.w*.5,rc.y+rc.h+u*1.25,{size:u*.8,color:INK,maxW:rc.w*.36});}
    K.card(g,u*.3,G.top-u*.15,u*3.2,u*.7,u*.35,'rgba(255,253,246,.95)',{stroke:'#7c2d12',lw:3,blur:0,dy:0});K.txt(g,'🛎️ '+st.served+'명 서빙',u*.3+u*1.6,G.top+u*.2,{size:u*.42,color:INK,maxW:u*2.9});
  },
};
QZ.mix(GAME,{say:false,pts0:55,pts1:50,okMs:1800,badMs:3500});
Engine.boot(GAME);
