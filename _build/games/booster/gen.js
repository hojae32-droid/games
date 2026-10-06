function mulberry32(a){return function(){a|=0;a=(a+0x6d2b79f5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
const R=(r,a,b)=>a+Math.floor(r()*(b-a+1));
const NZ=(r,a,b)=>{let v;do{v=R(r,a,b);}while(v%10===0);return v;};   // 끝자리가 0이 아닌 수
const mul=(a,b)=>({expr:`${a} × ${b} = @`,answer:a*b});

const TYPES={
  // 3-1  (두 자리 수) × (한 자리 수)
  tensX1:  {gen:r=>mul(R(r,2,9)*10,R(r,2,9))},                                       // 몇십 × 몇
  m21none: {gen:r=>{const b=R(r,2,4),m=Math.floor(9/b);return mul(R(r,1,m)*10+R(r,1,m),b);}},   // 올림 없음
  m21tens: {gen:r=>{const b=R(r,2,9),a0=R(r,1,Math.floor(9/b)),a1=R(r,Math.ceil(10/b),9);return mul(a1*10+a0,b);}}, // 십의 자리 올림
  m21ones: {gen:r=>{const b=R(r,2,4),a0=R(r,Math.ceil(10/b),9),c=Math.floor(a0*b/10),a1=R(r,1,Math.floor((9-c)/b));return mul(a1*10+a0,b);}}, // 일의 자리 올림
  m21both: {gen:r=>{const b=R(r,3,9),lo=Math.ceil(10/b);return mul(R(r,lo,9)*10+R(r,lo,9),b);}},                 // 두 번 올림
  // 3-2
  m31:     {gen:r=>mul(R(r,101,999),R(r,2,9))},              // (세 자리 수) × (한 자리 수)
  tt:      {gen:r=>mul(R(r,2,9)*10,R(r,2,9)*10)},            // 몇십 × 몇십
  tot:     {gen:r=>mul(NZ(r,11,99),R(r,2,9)*10)},            // 몇십몇 × 몇십
  oxt:     {gen:r=>mul(R(r,2,9),NZ(r,11,99))},               // 몇 × 몇십몇
  twotwo:  {gen:r=>mul(NZ(r,12,98),NZ(r,12,59))},            // 몇십몇 × 몇십몇
  // 4-1
  hxt:     {gen:r=>mul(R(r,1,9)*100,R(r,2,9)*10)},           // 몇백 × 몇십
  th3x10:  {gen:r=>mul(R(r,101,999),R(r,2,9)*10)},           // (세 자리 수) × (몇십)
  th3x2:   {gen:r=>mul(R(r,101,999),NZ(r,12,99))},           // (세 자리 수) × (두 자리 수)
};

const SEMESTERS={
  '3-1':{label:'3학년 1학기',desc:'(두 자리 수) × (한 자리 수)',boostT:15,
    types:[{id:'tensX1',w:1},{id:'m21none',w:2},{id:'m21tens',w:2},{id:'m21ones',w:2},{id:'m21both',w:3}]},
  '3-2':{label:'3학년 2학기',desc:'(세 자리 수) × (한 자리 수), (두 자리 수) × (두 자리 수)',boostT:25,
    types:[{id:'m31',w:3},{id:'tt',w:1},{id:'tot',w:2},{id:'oxt',w:2},{id:'twotwo',w:3}]},
  '4-1':{label:'4학년 1학기',desc:'(세 자리 수) × (몇십), (세 자리 수) × (두 자리 수)',boostT:45,
    types:[{id:'hxt',w:1},{id:'th3x10',w:2},{id:'th3x2',w:3}]},
  '4-2':{label:'4학년 2학기',desc:'3·4학년에 배운 곱셈 총복습',boostT:30,
    types:[{id:'m21both',w:1},{id:'m31',w:2},{id:'twotwo',w:2},{id:'th3x10',w:1},{id:'th3x2',w:2}]},
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
// 기본 50점 + 부스터 시간 안에 빨리 풀수록 최대 50점 + 3연속부터 10점
function scoreFor(elapsed,boostT,streak){return 50+Math.round(50*Math.max(0,1-elapsed/boostT))+(streak>=3?10:0);}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function fmtTime(sec){sec=Math.max(0,Math.ceil(sec));return Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0');}
