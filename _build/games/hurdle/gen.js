function mulberry32(a){return function(){a|=0;a=(a+0x6d2b79f5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
const R=(r,a,b)=>a+Math.floor(r()*(b-a+1));
const eq=(a,op,b,ans)=>({expr:`${a} ${op} ${b} = @`,answer:ans});
const PL='+', MI='−';

const TYPES={
  add9:{gen:r=>{const a=R(r,1,8),b=R(r,1,9-a);return eq(a,PL,b,a+b);}},
  sub9:{gen:r=>{const a=R(r,2,9),b=R(r,1,a);return eq(a,MI,b,a-b);}},
  blank9:{gen:r=>{const a=R(r,1,8),s=R(r,a+1,9);return r()<.5?{expr:`${a} + @ = ${s}`,answer:s-a}:{expr:`${s} ${MI} @ = ${a}`,answer:s-a};}},
  make10:{gen:r=>{const a=R(r,1,9);return r()<.5?{expr:`${a} + @ = 10`,answer:10-a}:eq(10,MI,a,10-a);}},
  carryAdd1:{gen:r=>{const a=R(r,2,9),b=R(r,11-a,9);return eq(a,PL,b,a+b);}},
  borrowSub1:{gen:r=>{const a=R(r,11,18),b=R(r,a-9,9);return eq(a,MI,b,a-b);}},
  three1:{gen:r=>{
    if(r()<.5){const a=R(r,1,9),c=R(r,1,9);return{expr:`${a} + ${10-a} + ${c} = @`,answer:10+c};}
    const a=R(r,1,7),b=R(r,1,9-a),c=R(r,1,a+b);return{expr:`${a} + ${b} ${MI} ${c} = @`,answer:a+b-c};}},
  twoNoCarry:{gen:r=>{
    if(r()<.5){const a1=R(r,1,8),a0=R(r,0,8),a=a1*10+a0;const b=r()<.4?R(r,1,9-a0):R(r,1,9-a1)*10+R(r,0,9-a0);return eq(a,PL,b,a+b);}
    const A1=R(r,2,9),A0=R(r,1,9),A=A1*10+A0;const b=r()<.4?R(r,1,A0):R(r,1,A1-1)*10+R(r,0,A0);return eq(A,MI,b,A-b);}},
  add2carry:{gen:r=>{
    if(r()<.35){const a=R(r,1,9)*10+R(r,2,9),b=R(r,10-(a%10),9);return eq(a,PL,b,a+b);}
    const a0=R(r,1,9),b0=R(r,10-a0,9),a1=R(r,1,7),b1=r()<.6?R(r,1,8-a1):R(r,1,9);
    const a=a1*10+a0,b=b1*10+b0;return eq(a,PL,b,a+b);}},
  sub2borrow:{gen:r=>{
    const a0=R(r,0,8),a=R(r,2,9)*10+a0;
    if(r()<.35){const b=R(r,a0+1,9);return eq(a,MI,b,a-b);}
    const b=R(r,1,Math.floor(a/10)-1)*10+R(r,a0+1,9);return eq(a,MI,b,a-b);}},
  three2:{gen:r=>{
    const t=r();
    if(t<.4){const a=R(r,11,49),b=R(r,11,39),c=R(r,5,Math.min(40,99-a-b));return{expr:`${a} + ${b} + ${c} = @`,answer:a+b+c};}
    if(t<.7){const a=R(r,11,59),b=R(r,11,39),c=R(r,11,Math.min(90,a+b-1));return{expr:`${a} + ${b} ${MI} ${c} = @`,answer:a+b-c};}
    const a=R(r,30,89),b=R(r,11,a-10),c=R(r,11,40);return{expr:`${a} ${MI} ${b} + ${c} = @`,answer:a-b+c};}},
  blank2:{gen:r=>{const a=R(r,12,48),b=R(r,12,48),s=a+b;return r()<.5?{expr:`@ + ${b} = ${s}`,answer:a}:{expr:`${s} ${MI} @ = ${a}`,answer:b};}},
};

const SEMESTERS={
  '1-1':{label:'1학년 1학기',desc:'9까지의 수 덧셈과 뺄셈',qTime:8,
    types:[{id:'add9',w:3},{id:'sub9',w:3},{id:'blank9',w:1}]},
  '1-2':{label:'1학년 2학기',desc:'10 만들기, 받아올림·받아내림, 두 자리 수',qTime:10,
    types:[{id:'make10',w:1},{id:'carryAdd1',w:2},{id:'borrowSub1',w:2},{id:'three1',w:1},{id:'twoNoCarry',w:2}]},
  '2-1':{label:'2학년 1학기',desc:'받아올림·받아내림이 있는 두 자리 수',qTime:15,
    types:[{id:'add2carry',w:3},{id:'sub2borrow',w:3},{id:'three2',w:1},{id:'blank2',w:1}]},
  '2-2':{label:'2학년 2학기',desc:'1년 동안 배운 덧셈·뺄셈 복습',qTime:15,
    types:[{id:'carryAdd1',w:1},{id:'borrowSub1',w:1},{id:'add2carry',w:2},{id:'sub2borrow',w:2},{id:'three2',w:1},{id:'blank2',w:1}]},
};

function makeQuestionFactory(semKey,seed){
  const sem=SEMESTERS[semKey],rng=mulberry32(seed),total=sem.types.reduce((s,t)=>s+t.w,0);
  let last='';
  return{next(){
    let q=null;
    for(let i=0;i<10;i++){
      let x=rng()*total,pick=sem.types[0];
      for(const t of sem.types){x-=t.w;if(x<0){pick=t;break;}}
      q=TYPES[pick.id].gen(rng);
      if(q.expr!==last)break;
    }
    last=q.expr;return q;
  }};
}
function scoreFor(remain,qTime,streak){return 50+Math.round(50*Math.max(0,remain)/qTime)+(streak>=3?10:0);}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function fmtTime(sec){sec=Math.max(0,Math.ceil(sec));return Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0');}
