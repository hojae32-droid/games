function mulberry32(a){return function(){a|=0;a=(a+0x6d2b79f5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
const R=(r,a,b)=>a+Math.floor(r()*(b-a+1));
const NZ=(r,a,b)=>{let v;do{v=R(r,a,b);}while(v%10===0);return v;};   // 끝자리가 0이 아닌 수
const dv=(a,b,hasR)=>({a,b,q:Math.floor(a/b),r:a%b,hasR:!!hasR,key:a+'÷'+b});
// 조건에 맞을 때까지 다시 뽑아요
function pickTry(r,make,ok){let v;for(let i=0;i<60;i++){v=make(r);if(ok(v))return v;}return v;}

// (몇십) ÷ (몇) 중 나누어떨어지고 몫이 두 자리인 것
const TENS_LIST=[];
for(let a=20;a<=90;a+=10)for(let b=2;b<=9;b++)if(a%b===0&&a/b>=10)TENS_LIST.push([a,b]);

const TYPES={
  // 3-1 곱셈구구로 몫 구하기
  g25:    {gen:r=>{const b=R(r,2,5);return dv(b*R(r,2,9),b);}},
  g69:    {gen:r=>{const b=R(r,6,9);return dv(b*R(r,2,9),b);}},
  // 3-2
  tensD:  {gen:r=>{const[a,b]=TENS_LIST[R(r,0,TENS_LIST.length-1)];return dv(a,b);}},                  // (몇십) ÷ (몇)
  d2none: {gen:r=>{const b=R(r,2,9);return dv(b*R(r,10,Math.floor(99/b)),b);}},                        // (몇십몇) ÷ (몇), 나누어떨어짐
  d2rem:  {gen:r=>pickTry(r,r=>{const b=R(r,2,9);return dv(R(r,11,99),b,true);},v=>v.r>0)},            // (몇십몇) ÷ (몇), 나머지 있음
  d3:     {gen:r=>dv(R(r,100,999),R(r,2,9),true)},                                                      // (세 자리 수) ÷ (한 자리 수)
  // 4-1
  hTens:  {gen:r=>{const b=R(r,2,9)*10;return dv(b*R(r,2,9),b);}},                                     // (몇백몇십) ÷ (몇십)
  d3t:    {gen:r=>pickTry(r,r=>{const b=R(r,2,9)*10;return dv(b*R(r,1,9)+R(r,1,b-1),b,true);},v=>v.a>=100&&v.a<=999)},       // (세 자리 수) ÷ (몇십)
  d22:    {gen:r=>pickTry(r,r=>{const b=NZ(r,11,45);return dv(R(r,b*2,99),b,true);},v=>v.a<=99&&v.q>=2)},                 // (두 자리 수) ÷ (두 자리 수)
  d3x2a:  {gen:r=>pickTry(r,r=>{const b=NZ(r,12,99);return dv(b*R(r,2,9)+R(r,0,b-1),b,true);},v=>v.a>=100&&v.a<=999)},  // (세 자리 수) ÷ (두 자리 수), 몫 한 자리
  d3x2b:  {gen:r=>pickTry(r,r=>{const b=NZ(r,11,49);return dv(b*R(r,10,Math.floor(999/b))+R(r,0,b-1),b,true);},v=>v.a<=999)}, // 몫 두 자리
};

const SEMESTERS={
  '3-1':{label:'3학년 1학기',desc:'곱셈구구로 몫 구하기 (나머지 없는 나눗셈)',boostT:12,hasR:false,
    types:[{id:'g25',w:2},{id:'g69',w:3}]},
  '3-2':{label:'3학년 2학기',desc:'(두 자리 수) ÷ (한 자리 수), (세 자리 수) ÷ (한 자리 수)',boostT:25,hasR:true,
    types:[{id:'tensD',w:1},{id:'d2none',w:2},{id:'d2rem',w:3},{id:'d3',w:3}]},
  '4-1':{label:'4학년 1학기',desc:'(세 자리 수) ÷ (몇십), (두·세 자리 수) ÷ (두 자리 수)',boostT:45,hasR:true,
    types:[{id:'hTens',w:1},{id:'d3t',w:2},{id:'d22',w:2},{id:'d3x2a',w:2},{id:'d3x2b',w:2}]},
  '4-2':{label:'4학년 2학기',desc:'3·4학년에 배운 나눗셈 총복습',boostT:35,hasR:true,
    types:[{id:'g69',w:1},{id:'d2rem',w:2},{id:'d3',w:2},{id:'d3t',w:1},{id:'d3x2a',w:2},{id:'d3x2b',w:1}]},
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
      if(q.key!==last)break;
    }
    last=q.key;return q;
  }};
}
// 기본 50점 + 드론 시간 안에 빨리 풀수록 최대 50점 + 3연속부터 10점
function scoreFor(elapsed,boostT,streak){return 50+Math.round(50*Math.max(0,1-elapsed/boostT))+(streak>=3?10:0);}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function fmtTime(sec){sec=Math.max(0,Math.ceil(sec));return Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0');}
