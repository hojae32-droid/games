/* 비춤이샘 과학 게임 공통 틀 (실시간 액션형) — 수학 게임 공통 틀을 바탕으로 '게임 시간' 방식으로 바꿈 */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const h=(tag,cls,html)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;};
const PCOL=['var(--p1)','var(--p2)','var(--p3)','var(--p4)'];
const PHEX=['#2f6fed','#e5484d','#12a150','#a35ae6'];

/* ---------- 난수 ---------- */
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function makeR(seed){
  const f=mulberry32(seed);
  const R={f,
    int:(a,b)=>a+Math.floor(f()*(b-a+1)),
    num:(a,b)=>a+f()*(b-a),
    pick:a=>a[Math.floor(f()*a.length)],
    chance:p=>f()<p,
    shuffle:a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(f()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;},
    sample:(a,k)=>R.shuffle(a).slice(0,k),
    sign:()=>f()<.5?-1:1,
  };
  return R;
}

/* ---------- 소리: 부드러운 실로폰·마림바 느낌 ---------- */
function lsGet(k,d){try{const v=localStorage.getItem('bcs_'+k);return v==null?d:JSON.parse(v);}catch(e){return d;}}
function lsSet(k,v){try{localStorage.setItem('bcs_'+k,JSON.stringify(v));}catch(e){}}
const Snd={on:lsGet('sound',true),ac:null,out:null,
  ctx(){if(!this.ac){try{const ac=new (window.AudioContext||window.webkitAudioContext)();
      const lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=2600;
      const comp=ac.createDynamicsCompressor();const mg=ac.createGain();mg.gain.value=.7;
      lp.connect(comp);comp.connect(mg);mg.connect(ac.destination);this.ac=ac;this.out=lp;}catch(e){}}
    if(this.ac&&this.ac.state==='suspended')this.ac.resume();return this.ac;},
  tone(freq,dur=.12,type='sine',vol=.1,when=0){if(!this.on)return;const ac=this.ctx();if(!ac)return;const t=ac.currentTime+when;
    const o=ac.createOscillator(),g=ac.createGain();o.type=(type==='square'||type==='sawtooth')?'triangle':type;o.frequency.setValueAtTime(freq,t);
    const v=Math.min(vol,.12);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.012);g.gain.exponentialRampToValueAtTime(.0005,t+Math.max(.06,dur));
    o.connect(g);g.connect(this.out);o.start(t);o.stop(t+dur+.05);},
  slide(f1,f2,dur=.25,vol=.06,when=0){if(!this.on)return;const ac=this.ctx();if(!ac)return;const t=ac.currentTime+when;
    const o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.setValueAtTime(f1,t);o.frequency.exponentialRampToValueAtTime(f2,t+dur);
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(Math.min(vol,.1),t+.02);g.gain.exponentialRampToValueAtTime(.0005,t+dur);o.connect(g);g.connect(this.out);o.start(t);o.stop(t+dur+.05);},
  bell(f,when=0,vol=.09,dur=.35){this.tone(f,dur,'sine',vol,when);this.tone(f*2,dur*.6,'sine',vol*.25,when);},
  ok(){this.bell(784,0,.07);this.bell(1175,.08,.07);},
  bad(){this.tone(196,.22,'sine',.08);this.tone(165,.26,'sine',.06,.1);},
  tap(){this.tone(880,.05,'sine',.03);},
  pop(){this.slide(500,900,.09,.05);},
  whoosh(){this.slide(300,120,.25,.04);},
  win(){[523,659,784,1046].forEach((f,i)=>this.bell(f,i*.13,.08,.45));},
  drum(){this.tone(110,.18,'sine',.12);this.tone(70,.22,'sine',.1,.01);},
  noise(dur=.3,freq=600,vol=.25){if(!this.on)return;const ac=this.ctx();if(!ac)return;const t=ac.currentTime;const n=Math.floor(ac.sampleRate*dur);const b=ac.createBuffer(1,n,ac.sampleRate);const d=b.getChannelData(0);
    for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,2);const s=ac.createBufferSource();s.buffer=b;const f=ac.createBiquadFilter();f.type='lowpass';f.frequency.value=freq;
    const g=ac.createGain();g.gain.value=vol;s.connect(f);f.connect(g);g.connect(this.out);s.start(t);},
  boom(){this.noise(.4,420,.35);this.tone(70,.3,'sine',.1);},
};

/* ---------- 닉네임 ---------- */
const ADJ=['날쌘','용감한','반짝이는','씩씩한','슬기로운','튼튼한','신나는','재빠른','명랑한','꼼꼼한','느긋한','당당한','엉뚱한','배고픈','졸린','행복한','수줍은','힘센','똑똑한','멋쟁이'];
const NOUN=['수달','펭귄','다람쥐','고래','부엉이','치타','판다','거북이','여우','돌고래','햄스터','코알라','기린','오리','사자','토끼','고슴도치','너구리','미어캣','알파카'];
function randNick(used){for(let k=0;k<50;k++){const n=ADJ[Math.floor(Math.random()*ADJ.length)]+' '+NOUN[Math.floor(Math.random()*NOUN.length)];if(!used.includes(n))return n;}return '친구'+Math.floor(Math.random()*100);}

const N={comma:n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,',')};
function hasB(w){w=String(w).replace(/<[^>]+>/g,'').trim().replace(/\s*\([^)]*\)$/,'');const c=w[w.length-1];if(!c)return false;if(/[0-9]/.test(c))return '013678'.includes(c);if(/[a-zA-Z]/.test(c))return false;
  const k=c.charCodeAt(0)-0xAC00;if(k<0||k>11171)return false;return k%28!==0;}
function J(w,t){const b=hasB(w);const m={'은':['은','는'],'이':['이','가'],'을':['을','를'],'과':['과','와'],'아':['아','야'],'으로':['으로','로']}[t];
  if(t==='으로'){const c=String(w).replace(/<[^>]+>/g,'').trim().slice(-1);const k=c.charCodeAt(0)-0xAC00;if(k>=0&&k%28===8)return w+'로';}return w+(b?m[0]:m[1]);}

/* ---------- 캔버스 그리기 도우미 ---------- */
const FE='"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji","Twemoji Mozilla",sans-serif';
/* 입체 이모지 그림(Fluent Emoji 3D, MIT): 빌드할 때 이 게임에 쓰인 것만 파일 안에 넣어요 */
const EMO=window.EMOJI||{};const EIMG={};
let EREADY=0;for(const k in EMO){const im=new Image();im.decoding='async';im.onload=()=>{EREADY++;};im.src=EMO[k];EIMG[k]=im;}
const emoKey=ch=>EMO[ch]?ch:(EMO[ch.replace(/️/g,'')]?ch.replace(/️/g,''):(EMO[ch+'️']?ch+'️':null));
function emoImg(ch){const k=emoKey(ch);if(!k)return null;const im=EIMG[k];return im&&im.complete&&im.naturalWidth?im:null;}
const SEG=window.Intl&&Intl.Segmenter?new Intl.Segmenter('ko',{granularity:'grapheme'}):null;
const PICT=/\p{Extended_Pictographic}/u;
function splitEmo(str){/* [{t:'글자'},{e:'🧪'}…] */const out=[];const segs=SEG?Array.from(SEG.segment(str),x=>x.segment):Array.from(str);
  let cur='';for(const c of segs){if(PICT.test(c)&&emoKey(c)){if(cur)out.push({t:cur});cur='';out.push({e:c});}else cur+=c;}if(cur)out.push({t:cur});return out;}
function emojify(root){if(!Object.keys(EMO).length||!root)return;
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const pe=n.parentNode;if(!pe||/^(SCRIPT|STYLE|TEXTAREA|INPUT|OPTION|TITLE)$/.test(pe.nodeName))return NodeFilter.FILTER_REJECT;return PICT.test(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP;}});
  const list=[];while(w.nextNode())list.push(w.currentNode);
  for(const n of list){const parts=splitEmo(n.nodeValue);if(!parts.some(x=>x.e))continue;const fr=document.createDocumentFragment();
    for(const x of parts){if(x.t)fr.appendChild(document.createTextNode(x.t));else{const im=document.createElement('img');im.className='emj';im.alt=x.e;im.draggable=false;im.src=EMO[emoKey(x.e)];fr.appendChild(im);}}
    n.parentNode.replaceChild(fr,n);}}
if(Object.keys(EMO).length){const mo=new MutationObserver(ms=>{for(const m of ms){if(m.type==='characterData')emojify(m.target.parentNode);else m.addedNodes.forEach(n=>{if(n.nodeType===1)emojify(n);else if(n.nodeType===3&&n.parentNode)emojify(n.parentNode);});}});
  const go=()=>{emojify(document.body);mo.observe(document.body,{childList:true,subtree:true,characterData:true});};
  if(document.body)go();else document.addEventListener('DOMContentLoaded',go);}
const K={
  clamp:(v,a,b)=>Math.max(a,Math.min(b,v)),
  lerp:(a,b,t)=>a+(b-a)*t,
  dist:(a,b,c,d)=>Math.hypot(a-c,b-d),
  inRect:(x,y,r)=>r&&x>=r.x&&x<=r.x+r.w&&y>=r.y&&y<=r.y+r.h,
  emo(g,ch,x,y,s,rot=0,alpha=1){g.save();g.globalAlpha*=alpha;g.translate(x,y);if(rot)g.rotate(rot);const im=emoImg(ch);
    if(im){const z=s*1.08;g.drawImage(im,-z/2,-z/2,z,z);}else{g.font=`${Math.max(4,s)}px ${FE}`;g.textAlign='center';g.textBaseline='middle';g.fillText(ch,0,s*.06);}g.restore();},
  /* 글자 사이에 섞인 이모지도 그림으로 */
  mw(g,str,s){if(!PICT.test(str))return g.measureText(str).width;return splitEmo(str).reduce((a,x)=>a+(x.e?s*1.12:g.measureText(x.t).width),0);},
  mixed(g,str,x,y,s,align,stroke){const parts=splitEmo(str);const W=K.mw(g,str,s);let cx=align==='left'?x:align==='right'?x-W:x-W/2;const ta=g.textAlign;g.textAlign='left';
    for(const q of parts){if(q.e){const im=emoImg(q.e);const z=s*1.08;if(im)g.drawImage(im,cx+s*.02,y-z/2,z,z);cx+=s*1.12;}else{if(stroke)g.strokeText(q.t,cx,y);g.fillText(q.t,cx,y);cx+=g.measureText(q.t).width;}}g.textAlign=ta;},
  font:(s,f)=>`${Math.max(6,Math.round(s))}px ${f||"Jua"},"Gowun Dodum",sans-serif`,
  txt(g,str,x,y,o={}){str=String(str);let s=o.size||20;g.save();g.font=K.font(s,o.font);
    if(o.maxW){const w=g.measureText(str).width;if(w>o.maxW){s=s*o.maxW/w;g.font=K.font(s,o.font);}}
    g.textAlign=o.align||'center';g.textBaseline=o.base||'middle';if(o.alpha!=null)g.globalAlpha*=o.alpha;
    if(PICT.test(str)&&splitEmo(str).some(q=>q.e)){if(o.stroke){g.lineJoin='round';g.lineWidth=o.lw||Math.max(2,s/6);g.strokeStyle=o.stroke;}g.fillStyle=o.color||'#1f2937';K.mixed(g,str,x,y,s,g.textAlign,!!o.stroke);g.restore();return s;}
    if(o.stroke){g.lineJoin='round';g.lineWidth=o.lw||Math.max(2,s/6);g.strokeStyle=o.stroke;g.strokeText(str,x,y);}
    g.fillStyle=o.color||'#1f2937';g.fillText(str,x,y);g.restore();return s;},
  rr(g,x,y,w,h,r){r=Math.max(0,Math.min(r,w/2,h/2));g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath();},
  box(g,x,y,w,h,r,fill,stroke,lw=3){K.rr(g,x,y,w,h,r);if(fill){g.fillStyle=fill;g.fill();}if(stroke){g.lineWidth=lw;g.strokeStyle=stroke;g.stroke();}},
  wrap(g,str,maxW){const words=String(str).split(' ');const lines=[];let cur='';
    for(const w of words){const t=cur?cur+' '+w:w;if(g.measureText(t).width>maxW&&cur){lines.push(cur);cur=w;}else cur=t;}if(cur)lines.push(cur);return lines;},
  /* 말풍선 꼬리표: 글자가 길면 두세 줄로 접어요. 반환: 차지한 사각형 */
  tag(g,str,cx,cy,o={}){let s=o.size||18;const maxW=o.maxW||240;const pad=o.pad!=null?o.pad:s*.45;g.save();g.font=K.font(s,o.font);
    let lines=K.wrap(g,str,maxW-pad*2);const maxL=o.maxLines||3;
    while((lines.length>maxL||lines.some(l=>K.mw(g,l,s)>maxW-pad*2))&&s>9){s*=.9;g.font=K.font(s,o.font);lines=K.wrap(g,str,maxW-pad*2);}
    const lh=s*1.15;const w=Math.min(maxW,Math.max(...lines.map(l=>K.mw(g,l,s)))+pad*2);const hh=lines.length*lh+pad*1.2;
    const x=cx-w/2,y=cy-hh/2;if(o.alpha!=null)g.globalAlpha*=o.alpha;
    const rr=o.r!=null?o.r:s*.6;g.save();g.shadowColor='rgba(15,27,61,.22)';g.shadowBlur=s*.6;g.shadowOffsetY=s*.15;K.rr(g,x,y,w,hh,rr);g.fillStyle=o.fill||'#fff';g.fill();g.restore();
    K.rr(g,x,y,w,hh,rr);g.lineWidth=Math.min(o.lw||2,Math.max(1.5,s/12));g.strokeStyle=o.stroke||'rgba(15,27,61,.25)';g.stroke();
    g.fillStyle=o.color||'#1f2937';g.textAlign='center';g.textBaseline='middle';
    lines.forEach((l,i)=>{const yy=y+pad*.6+lh*(i+.5)+s*.03;if(PICT.test(l))K.mixed(g,l,cx,yy,s,'center');else g.fillText(l,cx,yy);});g.restore();return{x,y,w,h:hh,s};},
  /* 움직이지 않는 배경은 한 번만 그려 두고 다시 써요 (화면 크기가 바뀌면 다시 그림) */
  layer(p,key,fn,dep=''){const c=p._layers||(p._layers={});const sig=p.W+'x'+p.H+'@'+p.dpr+'#'+dep+'#'+EREADY;let L=c[key];
    if(!L||L.sig!==sig){const cv=(L&&L.cv)||document.createElement('canvas');cv.width=Math.max(1,Math.round(p.W*p.dpr));cv.height=Math.max(1,Math.round(p.H*p.dpr));const g2=cv.getContext('2d');g2.setTransform(p.dpr,0,0,p.dpr,0,0);g2.clearRect(0,0,p.W,p.H);fn(g2);L=c[key]={cv,sig};}
    p.g.drawImage(L.cv,0,0,p.W,p.H);},
  /* ===== 장면 꾸미기 도우미 (새 디자인) ===== */
  vgrad(g,x,y,w,h,stops){const gr=g.createLinearGradient(0,y,0,y+h);stops.forEach((c,i)=>gr.addColorStop(Array.isArray(c)?c[0]:i/Math.max(1,stops.length-1),Array.isArray(c)?c[1]:c));g.fillStyle=gr;g.fillRect(x,y,w,h);},
  sky(g,W,H,top='#7cc4ff',bot='#e8f6ff'){K.vgrad(g,0,0,W,H,[top,bot]);},
  glow(g,x,y,r,col='#fff6b0',a=.55){const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,K.rgba(col,a));gr.addColorStop(1,K.rgba(col,0));g.fillStyle=gr;g.beginPath();g.arc(x,y,r,0,7);g.fill();},
  shadow(g,x,y,rx,ry,a=.18){g.save();g.fillStyle=`rgba(15,27,61,${a})`;g.beginPath();g.ellipse(x,y,Math.max(1,rx),Math.max(1,ry),0,0,7);g.fill();g.restore();},
  rgba(hex,a){if(hex.startsWith('rgb'))return hex.replace(/rgba?\(([^)]+)\)/,(m,v)=>`rgba(${v.split(',').slice(0,3).join(',')},${a})`);let n=hex.slice(1);if(n.length===3)n=n.split('').map(c=>c+c).join('');const v=parseInt(n.slice(0,6),16);return`rgba(${v>>16},${v>>8&255},${v&255},${a})`;},
  /* 부드러운 구름 */
  cloud(g,x,y,s,a=.95){g.save();g.globalAlpha*=a;g.fillStyle='#ffffff';g.shadowColor='rgba(60,100,160,.18)';g.shadowBlur=s*.25;g.shadowOffsetY=s*.06;g.beginPath();
    g.ellipse(x,y,s*.62,s*.26,0,0,7);g.arc(x-s*.26,y-s*.08,s*.24,0,7);g.arc(x+s*.08,y-s*.2,s*.32,0,7);g.arc(x+s*.36,y-s*.04,s*.2,0,7);g.fill();g.restore();},
  clouds(g,W,H,t,y0=.16,n=3,sz){const s=sz||Math.min(W,H)*.16;for(let i=0;i<n;i++){const sp=8+i*5;const x=((i*W/n+t*sp)%(W+s*2))-s;K.cloud(g,x,H*(y0+(i%2)*.07),s*(1-(i%3)*.15),.92);}},
  /* 겹겹 언덕 */
  hills(g,W,H,y,far='#9be3b4',near='#5fcf8a',t=0){g.save();[[far,.0,H*.06,1.3],[near,.6,H*.03,2.1]].forEach(([c,ph,amp,fr],k)=>{const yy=y+k*H*.05;g.beginPath();g.moveTo(0,H);g.lineTo(0,yy);
      for(let x=0;x<=W;x+=W/40)g.lineTo(x,yy-amp*(Math.sin(x/W*Math.PI*fr+ph)*.5+.5));g.lineTo(W,H);g.closePath();const gr=g.createLinearGradient(0,yy-amp,0,H);gr.addColorStop(0,K.shade(c,.12));gr.addColorStop(1,K.shade(c,-.12));g.fillStyle=gr;g.fill();});g.restore();},
  /* 땅: 위쪽 밝은 테두리 + 아래로 어두워지는 그라데이션 */
  ground(g,y,W,H,c='#6ccf86',edge){K.vgrad(g,0,y,W,H-y,[K.shade(c,.08),K.shade(c,-.18)]);g.fillStyle=edge||K.shade(c,.3);g.fillRect(0,y,W,Math.max(2,(H-y)*.03));},
  /* 물결 수면 */
  water(g,y,W,H,top='#38bdf8',bot='#0c4a8a',t=0,amp){amp=amp||Math.min(W,H)*.012;g.save();g.beginPath();g.moveTo(0,H);g.lineTo(0,y);for(let x=0;x<=W;x+=8)g.lineTo(x,y+Math.sin(x*.025+t*2)*amp);g.lineTo(W,H);g.closePath();
    const gr=g.createLinearGradient(0,y,0,H);gr.addColorStop(0,top);gr.addColorStop(1,bot);g.fillStyle=gr;g.fill();g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=Math.max(2,amp*.5);g.beginPath();for(let x=0;x<=W;x+=8)g[x?'lineTo':'moveTo'](x,y+Math.sin(x*.025+t*2)*amp);g.stroke();g.restore();},
  /* 반짝이는 별 */
  stars(g,W,H,t,n=60,seed=7,col='#fff'){g.save();let a=seed;const r=()=>{a=(a*16807)%2147483647;return a/2147483647;};for(let i=0;i<n;i++){const x=r()*W,y=r()*H,z=r();g.globalAlpha=.25+.6*Math.abs(Math.sin(t*(.6+z)+i));g.fillStyle=col;g.beginPath();g.arc(x,y,.6+z*1.6,0,7);g.fill();}g.restore();},
  /* 은은한 무늬(모눈·점) */
  dots(g,W,H,gap,col='rgba(15,27,61,.06)'){g.save();g.fillStyle=col;for(let y=gap/2;y<H;y+=gap)for(let x=gap/2;x<W;x+=gap){g.beginPath();g.arc(x,y,Math.max(1,gap*.06),0,7);g.fill();}g.restore();},
  grid(g,W,H,gap,col='rgba(15,27,61,.06)'){g.save();g.strokeStyle=col;g.lineWidth=1;g.beginPath();for(let x=gap;x<W;x+=gap){g.moveTo(x+.5,0);g.lineTo(x+.5,H);}for(let y=gap;y<H;y+=gap){g.moveTo(0,y+.5);g.lineTo(W,y+.5);}g.stroke();g.restore();},
  /* 요즘 카드: 그림자 + 얇은 테두리 */
  card(g,x,y,w,h,r,fill='#fff',o={}){g.save();g.shadowColor=o.sc||'rgba(15,27,61,.18)';g.shadowBlur=o.blur!=null?o.blur:Math.min(w,h)*.12;g.shadowOffsetY=o.dy!=null?o.dy:Math.min(w,h)*.05;K.rr(g,x,y,w,h,r);g.fillStyle=fill;g.fill();g.restore();
    if(o.stroke){K.rr(g,x,y,w,h,r);g.lineWidth=o.lw||2;g.strokeStyle=o.stroke;g.stroke();}
    if(o.hi!==false){g.save();K.rr(g,x,y,w,h,r);g.clip();const gr=g.createLinearGradient(0,y,0,y+h);gr.addColorStop(0,'rgba(255,255,255,.35)');gr.addColorStop(.5,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(x,y,w,h);g.restore();}},
  /* 유리구슬 같은 동그라미 */
  orb(g,x,y,r,c){g.save();const gr=g.createRadialGradient(x-r*.35,y-r*.4,r*.1,x,y,r);gr.addColorStop(0,K.shade(c,.55));gr.addColorStop(.6,c);gr.addColorStop(1,K.shade(c,-.25));g.fillStyle=gr;g.shadowColor='rgba(15,27,61,.25)';g.shadowBlur=r*.4;g.shadowOffsetY=r*.15;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.restore();
    g.save();g.fillStyle='rgba(255,255,255,.45)';g.beginPath();g.ellipse(x-r*.3,y-r*.45,r*.38,r*.2,-.5,0,7);g.fill();g.restore();},
  vignette(g,W,H,a=.16){const gr=g.createRadialGradient(W/2,H*.45,Math.min(W,H)*.35,W/2,H/2,Math.max(W,H)*.75);gr.addColorStop(0,'rgba(15,27,61,0)');gr.addColorStop(1,`rgba(15,27,61,${a})`);g.fillStyle=gr;g.fillRect(0,0,W,H);},
  shade(hex,f){const n=parseInt(hex.slice(1),16);let r=n>>16,gg=n>>8&255,b=n&255;const m=v=>Math.round(f<0?v*(1+f):v+(255-v)*f);return`rgb(${m(r)},${m(gg)},${m(b)})`;},
};

const ICO={
  on:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5v5h3.5L12 19V5L7.5 9.5z" fill="currentColor"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>',
  off:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5v5h3.5L12 19V5L7.5 9.5z" fill="currentColor"/><path d="M16 9.5l5 5M21 9.5l-5 5"/></svg>',
  fs:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
};
/* ---------- 엔진 ---------- */
const Engine={
  G:null,cfg:{},players:[],
  boot(G){
    this.G=G;document.title=G.title+' | 비춤이샘 수업용 게임';
    const r=document.documentElement.style;
    if(G.theme)Object.entries(G.theme).forEach(([k,v])=>r.setProperty('--'+k,v));
    this.durs=G.durs||[60,90,120];
    if(window.Net)Net.init(this);
    this.buildSetup();this.show('setup');
    document.addEventListener('pointerdown',()=>Snd.ctx(),{once:true});
    this.loop=this.loop.bind(this);
  },
  clockText(s){s=Math.max(0,Math.ceil(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');},
  durText(s){return s%60?(s>=60?Math.floor(s/60)+'분 ':'')+s%60+'초':s/60+'분';},
  show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('on',s.id===id));},
  buildSetup(){
    const G=this.G,S=$('#setup');S.innerHTML='';
    const top=h('div','topbar-mini');
    const fsb=h('button','icon-btn',ICO.fs);fsb.title='전체 화면';fsb.onclick=toggleFS;top.appendChild(fsb);
    S.appendChild(top);
    const W=h('div','setup-wrap');S.appendChild(W);
    W.appendChild(h('div','hero',`<div class="emo">${G.emoji}</div><div><h1>${G.title}</h1><div class="unit">${G.subtitle||''}</div><div class="how">${G.howto||''}</div></div>`));
    const cfg=this.cfg={level:null,mode:null,n:null,dur:null,nicks:[],room:'',netRole:null,joinCode:'',watch:false};
    const secs={};
    const sec=(key,num,title)=>{const s=h('div','sec');s.innerHTML=`<h2><span class="n">${num}</span>${title}</h2>`;W.appendChild(s);secs[key]=s;return s;};
    const chips=(parent,items,onSel)=>{const c=h('div','chips');items.forEach(it=>{const b=h('button','chip',it.label+(it.small?`<small>${it.small}</small>`:''));
      b.onclick=()=>{Snd.tap();c.querySelectorAll('.chip').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');onSel(it.v);};c.appendChild(b);});parent.appendChild(c);return c;};
    let num=1;
    const s1=sec('level',num++,G.levelTitle||'배울 내용 고르기');
    const groups={};G.levels.forEach(l=>{(groups[l.g]=groups[l.g]||[]).push(l);});
    const allChipBoxes=[];
    Object.entries(groups).forEach(([g,ls])=>{const gg=h('div','grade-group');gg.appendChild(h('div','gl',g));s1.appendChild(gg);
      const box=chips(gg,ls.map(l=>({label:l.t,small:l.d,v:l.id})),v=>{allChipBoxes.forEach(b=>b!==box&&b.querySelectorAll('.chip').forEach(x=>x.classList.remove('sel')));cfg.level=v;s1.classList.remove('need');});
      allChipBoxes.push(box);});
    const s2=sec('mode',num++,'대결 방식');
    const maxP=G.maxPlayers||4;
    chips(s2,[{label:'🙋 혼자 하기',v:'solo'},{label:'🖥️ 한 화면 대결',small:`전자칠판 · 2~${maxP}명`,v:'board'},{label:'📱 각자 기기 대결',small:`2~${maxP}명 · 같은 방 코드`,v:'device'}],v=>{cfg.mode=v;s2.classList.remove('need');refresh();});
    const s3=sec('n',num++,'몇 명이 할까요?');
    const nOpts=[];for(let k=2;k<=maxP;k++)nOpts.push({label:k+'명',v:k});
    chips(s3,nOpts,v=>{cfg.n=v;s3.classList.remove('need');refresh();});
    const s4=sec('dur',num++,'게임 시간');
    chips(s4,this.durs.map(c=>({label:this.durText(c),v:c})),v=>{cfg.dur=v;s4.classList.remove('need');});
    const s5=sec('nick',num++,'닉네임');
    const nickBox=h('div');s5.appendChild(nickBox);
    s5.appendChild(h('div','hint','개인 정보 보호를 위해 이름 대신 닉네임을 써요. 🎲를 누르면 닉네임을 정해 줘요.'));
    const roomWrap=h('div');s5.appendChild(roomWrap);Net.ui(roomWrap,cfg,()=>refresh());
    const refresh=()=>{
      s3.style.display=cfg.mode==='board'?'':'none';
      roomWrap.style.display=cfg.mode==='device'?'':'none';
      const guest=Net.isGuestSetup(cfg);s1.style.display=guest?'none':'';s4.style.display=guest?'none':'';
      const n=cfg.mode==='board'?(cfg.n||0):(cfg.mode?(Net.isWatchSetup(cfg)?0:1):0);
      while(cfg.nicks.length<n)cfg.nicks.push('');cfg.nicks.length=n;
      nickBox.innerHTML=n?'':(cfg.mode?'<div class="hint">진행만 하면 닉네임이 필요 없어요.</div>':'<div class="hint">대결 방식을 먼저 골라 주세요.</div>');
      for(let i=0;i<n;i++){const r=h('div','nick-row');
        r.innerHTML=`<span class="dot" style="background:${PHEX[i]}"></span><input maxlength="10" placeholder="${n>1?(i+1)+'번 선수 ':''}닉네임"><button class="dice" title="랜덤 닉네임">🎲</button>`;
        const inp=$('input',r);inp.value=cfg.nicks[i];
        inp.oninput=()=>{cfg.nicks[i]=inp.value.trim();};
        $('.dice',r).onclick=()=>{Snd.tap();inp.value=randNick(cfg.nicks);cfg.nicks[i]=inp.value;};
        nickBox.appendChild(r);}
    };
    refresh();
    const st=h('button','start jua','게임 시작!');W.appendChild(st);
    st.onclick=()=>{
      const miss=[];const guest=Net.isGuestSetup(cfg);
      if(!cfg.level&&!guest)miss.push('level');if(!cfg.mode)miss.push('mode');
      if(cfg.mode==='board'&&!cfg.n)miss.push('n');
      if(!cfg.dur&&!guest)miss.push('dur');
      if(cfg.mode&&(cfg.nicks.some(x=>!x)||(cfg.mode==='device'&&Net.need(cfg).length)))miss.push('nick');
      Object.values(secs).forEach(s=>s.classList.remove('need'));
      if(miss.length){miss.forEach(k=>secs[k].classList.add('need'));secs[miss[0]].scrollIntoView({behavior:'smooth',block:'center'});Snd.bad();return;}
      if(cfg.mode==='device')Net.go(cfg);else this.start();
    };
    W.appendChild(h('div','maker','제작 : 비춤이샘'));
  },

  async start(){
    const G=this.G,cfg=this.cfg;
    const n=cfg.mode==='board'?cfg.n:1;
    const seed=cfg.mode==='device'&&Net.on?Net.seed:Math.floor(Math.random()*1e9);
    this.level=G.levels.find(l=>l.id===cfg.level);this.untimed=!!(G.untimed&&G.untimed(cfg.level));this.dur=this.untimed?3600:(cfg.dur||60);
    this.stopAll();this.over=false;
    const P=$('#play');P.innerHTML='';
    const bar=h('div','pbar',`<div class="clock"><i class="ring"></i><b>${this.clockText(this.dur)}</b></div><div class="ptitle"><span class="pe">${G.emoji}</span><span class="pt"><b>${G.title}</b><small>${this.level.g} · ${this.level.t}</small></span></div>`);
    this.clockEl=bar.querySelector('.clock');if(this.untimed){this.clockEl.querySelector('b').textContent='♪';this.clockEl.style.setProperty('--f',1);}
    const snd=h('button','icon-btn ico',Snd.on?ICO.on:ICO.off);snd.title='소리 켜기/끄기';snd.onclick=()=>{Snd.on=!Snd.on;lsSet('sound',Snd.on);snd.innerHTML=Snd.on?ICO.on:ICO.off;};
    const fs=h('button','icon-btn ico',ICO.fs);fs.title='전체 화면';fs.onclick=toggleFS;
    const quit=h('button','icon-btn quit','그만하기');quit.onclick=()=>{if(Net.on){if(confirm(Net.role==='host'?'방을 닫고 게임을 그만할까요?':'방에서 나갈까요?')){this.stopAll();Net.leave();this.show('setup');}return;}if(confirm('게임을 그만할까요?')){this.stopAll();this.show('setup');}};
    bar.append(snd,fs,quit);P.appendChild(bar);
    const arena=h('div','arena'+(n===1?' solo':''));P.appendChild(arena);
    this.players=[];this.finished=0;this.fpsT=0;this.fps=60;
    for(let i=0;i<n;i++)this.players.push(this.makePlayer(i,n,seed,arena));
    this.show('play');if(this.lowFx)this.setLowFx();
    if(Net.on)Net.mountStrip(P);
    try{await Promise.race([document.fonts.load('30px Jua'),new Promise(r=>setTimeout(r,1500))]);}catch(e){}
    this.players.forEach(p=>{this.fit(p);G.init&&G.init(p);});
    this.last=performance.now();cancelAnimationFrame(this.raf);this.raf=requestAnimationFrame(this.loop);
    // 준비: 놀이 방법 + 3·2·1
    let c=3;const covers=this.players.map(p=>{const r=h('div','howcard',`<div class="in"><div class="e">${G.emoji}</div><div class="t">${G.title}</div><div class="d">${(typeof G.how==='function'?G.how(p):G.how)||''}</div><div class="num">3</div></div>`);p.panel.appendChild(r);return r;});
    const tick=()=>{if(this.over)return;c--;if(c>0){covers.forEach(r=>{const n=r.querySelector('.num');n.textContent=c;n.classList.remove('go');void n.offsetWidth;n.classList.add('go');});Snd.tone(440,.1);this.cd=setTimeout(tick,900);}
      else{covers.forEach(r=>r.querySelector('.num').textContent='시작!');Snd.tone(880,.2);this.cd=setTimeout(()=>{covers.forEach(r=>r.remove());this.players.forEach(p=>{p.active=true;G.start&&G.start(p);});},450);}};
    Snd.tone(440,.1);this.cd=setTimeout(tick,1300);
  },
  setLowFx(){this.lowFx=true;K.lowFx=true;(this.players||[]).forEach(p=>{try{Object.defineProperty(p.g,'shadowBlur',{configurable:true,get(){return 0;},set(){}});Object.defineProperty(p.g,'filter',{configurable:true,get(){return 'none';},set(){}});}catch(e){}});},
  stopAll(){this.over=true;clearTimeout(this.cd);cancelAnimationFrame(this.raf);(this.players||[]).forEach(p=>{p.active=false;p.ro&&p.ro.disconnect();});},
  fit(p){const r=p.wrap.getBoundingClientRect();const dpr=Math.min(2,window.devicePixelRatio||1);const W=Math.max(10,r.width),H=Math.max(10,r.height);
    if(p.W===W&&p.H===H&&p.dpr===dpr)return;p.W=W;p.H=H;p.dpr=dpr;p.cv.width=Math.round(W*dpr);p.cv.height=Math.round(H*dpr);p.u=Math.min(W,H*.8)/10;
    if(p.inited&&this.G.resize)this.G.resize(p);},

  makePlayer(i,n,seed,arena){
    const G=this.G,cfg=this.cfg,E=this;
    const panel=h('div','panel');panel.style.setProperty('--pc',PCOL[i]);
    const head=h('div','phead');
    head.innerHTML=`<span class="no">${i+1}</span><span class="nm">${esc(cfg.nicks[i])}</span><span class="tm"></span><span class="sc">0<small>점</small></span>`;
    const prog=h('div','prog','<i style="width:0"></i>');
    const stage=h('div','stage');
    panel.append(head,prog,stage);
    const qbox=h('div','qbox ask');const wrap=h('div','cvwrap');const cv=h('canvas');wrap.appendChild(cv);const tip=h('div','tip');wrap.appendChild(tip);
    const ctrl=h('div','ctrl tools');
    stage.append(qbox,wrap,ctrl);
    const streak=h('div','streak');wrap.appendChild(streak);
    const done=h('div','done-cover');panel.appendChild(done);
    arena.appendChild(panel);
    const p={i,n,nick:cfg.nicks[i],color:PHEX[i],panel,stage,head,prog,qbox,wrap,cv,g:cv.getContext('2d'),tipEl:tip,ctrl,done,streakEl:streak,
      R:makeR(seed),Rf:makeR(seed^0x5bd1e995),level:this.level,levelId:this.level.id,dur:this.dur,t:0,score:0,correct:0,wrongN:0,streak:0,best:0,wrong:[],fx:[],
      active:false,finished:false,mode:cfg.mode,state:{},W:0,H:0,u:30,ptr:{},shakeT:0,
      Snd,K,h,J,
      ask(html,sub){qbox.innerHTML='<div>'+html+'</div>'+(sub?`<span class="s">${sub}</span>`:'');qbox.classList.remove('flash');void qbox.offsetWidth;qbox.classList.add('flash');setTimeout(()=>qbox.classList.remove('flash'),400);},
      tip(text,kind,ms=2600){tip.innerHTML=text;tip.className='tip on'+(kind?' '+kind:'');clearTimeout(p._tt);p._tt=setTimeout(()=>tip.className='tip',ms);},
      float(x,y,text,color='#16a34a',size){p.fx.push({k:'f',x,y,text,color,size:size||p.u*.75,t:0,life:1});},
      burst(x,y,color='#facc15',cnt=12,spd){spd=spd||p.u*4;for(let k=0;k<cnt;k++){const a=Math.random()*Math.PI*2,v=spd*(.4+Math.random()*.8);p.fx.push({k:'b',x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,color,r:p.u*(.08+Math.random()*.12),t:0,life:.6+Math.random()*.4});}},
      ring(x,y,color='#22c55e'){p.fx.push({k:'r',x,y,color,t:0,life:.45});},
      shake(){p.shakeT=.3;},
      deck(arr,key){/* 섞어서 하나씩, 다 쓰면 다시 섞기 */const st=p.state;key=key||'_deck';if(!st[key]||!st[key].length)st[key]=p.R.shuffle(arr);return st[key].pop();},
      tools(list,onSel,o={}){ctrl.innerHTML='';p.toolBtns=list.map((t,k)=>{const b=h('button','toolbtn'+(o.sel===k?' sel':''),(t.e?`<span class="e">${t.e}</span>`:'')+t.t);
        b.onpointerdown=e=>{e.preventDefault();if(!p.active)return;Snd.tap();if(o.toggle!==false){p.toolBtns.forEach(x=>x.classList.remove('sel'));b.classList.add('sel');}onSel(k,t);};ctrl.appendChild(b);return b;});return p.toolBtns;},
      hit(ok,o={}){return E.hit(p,ok,o);},
      add(n,x,y){/* 보너스·작은 감점: 맞힘/틀림 수에는 안 들어가요 */if(!p.active)return;const b=p.score;p.score=Math.max(0,p.score+n);if(x!=null)p.float(x,y,(n>=0?'+':'−')+Math.abs(n),n>=0?'#ca8a04':'#dc2626',p.u*.55);
        E.setScore(p);E.netReport(p,false);},
      timeLeft(){return Math.max(0,p.dur-p.t);},
    };
    // 터치·마우스 (전자칠판 여러 손가락 동시 사용 가능: 칸마다 따로 받아요)
    const pos=e=>{const r=cv.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top];};
    cv.addEventListener('pointerdown',e=>{e.preventDefault();try{cv.setPointerCapture(e.pointerId);}catch(_){}const[x,y]=pos(e);p.ptr[e.pointerId]={x,y,x0:x,y0:y,t0:performance.now()};if(p.active&&G.down)G.down(p,x,y,e);});
    cv.addEventListener('pointermove',e=>{const[x,y]=pos(e);const d=p.ptr[e.pointerId];if(d){d.x=x;d.y=y;}if(p.active&&G.move)G.move(p,x,y,!!d,e);});
    const up=e=>{const[x,y]=pos(e);const d=p.ptr[e.pointerId];delete p.ptr[e.pointerId];if(p.active&&G.up&&d)G.up(p,x,y,d,e);};
    cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
    cv.addEventListener('contextmenu',e=>e.preventDefault());
    p.ro=new ResizeObserver(()=>{if(p.inited)E.fit(p);});p.ro.observe(wrap);
    return p;
  },
  loop(now){
    if(this.over)return;
    const raw=Math.max(0,(now-this.last)/1000);const dt=Math.min(.05,raw);const rdt=Math.min(.25,raw);this.last=now;const G=this.G;this.fps=(this.fps||60)*.95+(raw>0?1/raw:60)*.05;
    /* 느린 기기(전자칠판 등)에서는 흐림 그림자를 꺼서 부드럽게 */
    this.fpsT=(this.fpsT||0)+raw;if(!this.lowFx&&(window.LOWFX||(this.fpsT>2.5&&this.fps<45)))this.setLowFx();
    for(const p of this.players){
      if(!p.inited){p.inited=true;}
      if(p.active){p.t+=rdt;const left=p.dur-p.t;const s=Math.ceil(left);
        if(!this.untimed&&p===this.players[0]&&this.clockEl){this.clockEl.style.setProperty('--f',Math.max(0,left/p.dur).toFixed(4));}
        if(s!==p._ls&&!this.untimed){p._ls=s;if(p===this.players[0]&&this.clockEl){this.clockEl.querySelector('b').textContent=this.clockText(left);this.clockEl.classList.toggle('hurry',s<=10);if(s<=5&&s>0)Snd.tone(660,.06,'sine',.04);}}
        p.prog.firstChild.style.width=Math.min(100,p.t/p.dur*100)+'%';
        if(left<=0){this.finish(p);}
        else if(G.update)G.update(p,dt);}
      const g=p.g;g.setTransform(p.dpr,0,0,p.dpr,0,0);g.globalAlpha=1;g.globalCompositeOperation='source-over';g.shadowBlur=0;g.shadowColor='transparent';g.setLineDash([]);g.filter='none';g.clearRect(0,0,p.W,p.H);
      if(p.shakeT>0){p.shakeT-=dt;g.translate((Math.random()-.5)*p.u*.3,(Math.random()-.5)*p.u*.3);}
      try{G.draw&&G.draw(p,g,dt);}catch(e){console.error(e);}
      if(G.vignette!==false){g.save();g.setTransform(p.dpr,0,0,p.dpr,0,0);K.vignette(g,p.W,p.H,G.vignette||.14);g.restore();}
      this.drawFx(p,g,dt);
    }
    this.raf=requestAnimationFrame(this.loop);
  },
  drawFx(p,g,dt){p.fx=p.fx.filter(f=>{f.t+=dt;const a=1-f.t/f.life;if(a<=0)return false;
    if(f.k==='f'){K.txt(g,f.text,f.x,f.y-f.t*p.u*1.6,{size:f.size*(1+.3*Math.max(0,.2-f.t)*5),color:f.color,stroke:'#fff',alpha:Math.min(1,a*2)});}
    else if(f.k==='b'){f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=p.u*6*dt;g.globalAlpha=a;g.fillStyle=f.color;g.beginPath();g.arc(f.x,f.y,f.r,0,7);g.fill();g.globalAlpha=1;}
    else if(f.k==='r'){g.globalAlpha=a;g.strokeStyle=f.color;g.lineWidth=p.u*.15;g.beginPath();g.arc(f.x,f.y,p.u*(.4+f.t*3),0,7);g.stroke();g.globalAlpha=1;}
    return true;});},
  /* 점수: ok면 +pts(기본 100, 3연속부터 +20), 틀리면 −(기본 30) · review는 '다시 보기'에 들어가요 */
  hit(p,ok,o={}){
    if(!p.active)return 0;let pts;
    if(ok){p.streak++;p.best=Math.max(p.best,p.streak);p.correct++;pts=o.pts!=null?o.pts:100;if(p.streak>=3&&pts>0)pts+=20;Snd.ok();}
    else{p.streak=0;p.wrongN++;pts=-(o.pen!=null?o.pen:30);Snd.bad();if(o.shake!==false)p.shake();
      if(o.review&&!p.wrong.includes(o.review)&&p.wrong.length<40)p.wrong.push(o.review);}
    const before=p.score;p.score=Math.max(0,p.score+pts);const real=p.score-before;
    if(o.x!=null&&o.quiet!==true){p.float(o.x,o.y,ok?'+'+pts:'−'+Math.abs(pts),ok?'#16a34a':'#dc2626');if(ok)p.burst(o.x,o.y,o.color||'#facc15',10);}
    if(o.tip)p.tip(o.tip,ok?'good':'bad',o.tipMs||(ok?1800:3200));
    this.setScore(p);
    p.streakEl.textContent=p.streak>=3?`🔥 ${p.streak}연속!`:'';p.streakEl.classList.toggle('on',p.streak>=3);
    this.netReport(p,false);return pts;
  },
  setScore(p){const sc=p.head.querySelector('.sc');sc.innerHTML=`${N.comma(p.score)}<small>점</small>`;sc.classList.remove('bump');void sc.offsetWidth;sc.classList.add('bump');},
  netReport(p,done){if(!window.Net||!Net.on)return;const now=performance.now();if(!done&&now-(p._nr||0)<350){clearTimeout(p._nrT);p._nrT=setTimeout(()=>this.netReport(p,false),360);return;}p._nr=now;
    Net.report({score:p.score,prog:Math.min(1,p.t/p.dur),done:!!done,k2:p.correct,k3:p.wrongN,line:`맞힘 ${p.correct} · 틀림 ${p.wrongN}`});},
  finish(p){
    if(p.finished)return;p.active=false;p.finished=true;this.finished++;clearTimeout(p._nrT);
    if(this.G.end)try{this.G.end(p);}catch(e){}
    p.done.classList.add('on');
    p.done.innerHTML=`<div class="big">⏰ 시간 끝!</div><div class="s2 sc2"><b>${N.comma(p.score)}</b>점</div><div class="s2">맞힘 ${p.correct} · 틀림 ${p.wrongN}${p.best>=3?` · 최고 ${p.best}연속`:''}</div><div class="s2 wait"></div>`;
    Snd.win();
    if(Net.on){p.done.querySelector('.wait').textContent='⏳ 다른 친구를 기다려요…';this.netReport(p,true);return;}
    if(this.finished>=this.players.length){setTimeout(()=>{if(!Net.on)this.results();},1500);}
    else p.done.querySelector('.wait').textContent='다른 친구를 기다려요…';
  },
  results(){
    const G=this.G,cfg=this.cfg;const R=$('#result');R.innerHTML='';this.stopAll();
    const W=h('div','res-wrap');R.appendChild(W);
    const revBox=(title,list)=>h('div','review',`<h3>${title}</h3>`+(list.length?'<ul>'+list.map(w=>`<li>${w}</li>`).join('')+'</ul>':'<div class="hint">헷갈린 내용이 없어요! 👏</div>'));
    if(Net.on||Net.final){Net.results(W,'점');const me=this.players[0];
      if(me&&!(Net.role==='host'&&Net.watch))W.appendChild(revBox('📝 내가 헷갈린 내용 다시 보기',me.wrong));
      if(G.summary)W.appendChild(h('div','review','<h3>📚 이것만은 꼭!</h3>'+G.summary));
      Net.buttons(W);W.appendChild(h('div','maker','제작 : 비춤이샘'));this.show('result');return;}
    const ps=this.players.slice().sort((a,b)=>b.score-a.score||b.correct-a.correct||a.wrongN-b.wrongN);
    const same=(a,b)=>a.score===b.score&&a.correct===b.correct&&a.wrongN===b.wrongN;
    ps.forEach((p,k)=>{p.rank=k&&same(p,ps[k-1])?ps[k-1].rank:k;});
    const tops=ps.filter(p=>p.rank===0);
    W.appendChild(h('div','res-title',ps.length>1?(tops.length>1?`🏆 공동 1등! ${tops.map(p=>esc(p.nick)).join(', ')}`:`🏆 ${esc(ps[0].nick)} 승리!`):`🎉 ${N.comma(ps[0].score)}점!`));
    W.appendChild(h('div','room-note',`${this.level.g} · ${this.level.t} · ${this.durText(this.dur)}`));
    const pod=h('div','podium');W.appendChild(pod);
    const medal=['🥇','🥈','🥉','🏅'];
    ps.forEach(p=>{const c=h('div','pcard');c.style.setProperty('--pc',PCOL[p.i]);
      c.innerHTML=`<div class="rk">${ps.length>1?medal[p.rank]:'⭐'}</div><div class="nm">${esc(p.nick)}</div><div class="pts">${N.comma(p.score)}점</div><div class="st">맞힘 ${p.correct} · 틀림 ${p.wrongN}${p.best>=3?' · 최고 '+p.best+'연속':''}</div>`;pod.appendChild(c);});
    const rv=h('div','review','<h3>📝 헷갈린 내용 다시 보기</h3>');
    this.players.forEach(p=>{const d=h('details');d.open=this.players.length===1;
      d.innerHTML=`<summary style="color:${p.color}">${esc(p.nick)} (${p.wrong.length}개)</summary>`+(p.wrong.length?'<ul>'+p.wrong.map(w=>`<li>${w}</li>`).join('')+'</ul>':'<div class="hint">헷갈린 내용이 없어요! 👏</div>');
      rv.appendChild(d);});
    W.appendChild(rv);
    if(G.summary)W.appendChild(h('div','review','<h3>📚 이것만은 꼭!</h3>'+G.summary));
    const bt=h('div','res-btns');
    const again=h('button','','🔁 다시 하기');again.onclick=()=>this.start();
    const back=h('button','sub','⚙️ 설정 바꾸기');back.onclick=()=>this.show('setup');
    bt.append(again,back);W.appendChild(bt);
    W.appendChild(h('div','maker','제작 : 비춤이샘'));
    this.show('result');
  },
};
function toggleFS(){try{if(!document.fullscreenElement)document.documentElement.requestFullscreen();else document.exitFullscreen();}catch(e){}}
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function strip(s){return String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();}

window.IEYO=w=>hasB(w)?'이에요':'예요';window.Engine=Engine;window.J=J;window.Snd=Snd;window.N=N;window.H=h;window.makeR=makeR;window.strip=strip;window.K=K;window.esc=esc;
})();

