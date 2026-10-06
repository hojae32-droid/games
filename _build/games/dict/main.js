/* 3~4학년 국어 · 국어사전 찾기 · 낱말의 기본형 · 뜻이 여러 가지인 낱말 — 국어사전 탐험대
   디자인: 가죽 표지의 두꺼운 국어사전과 탐험 모자. 낱말을 찾아 도장(🏅)을 모아요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#3b2412';
const strip=s=>String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="5" y="7" width="38" height="34" rx="4" fill="#92400e" stroke="#3b2412" stroke-width="3"/><path d="M24 11v26" stroke="#3b2412" stroke-width="2.5"/><rect x="9" y="11" width="14" height="26" rx="1.5" fill="#fff7e0"/><rect x="25" y="11" width="14" height="26" rx="1.5" fill="#fff7e0"/><path d="M12 17h8M12 21h8M12 25h6M28 17h8M28 21h8" stroke="#b45309" stroke-width="2" stroke-linecap="round"/><path d="M35 7v10l2-2 2 2V7z" fill="#dc2626"/></svg>';
/*@@DATA@@*/
const EMO_RE=/^([\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}](?:[️‍\p{Extended_Pictographic}])*)\s*/u;
/* <u>밑줄</u> 표시가 있는 글을 한 덩어리로 그려요 (줄바꿈·크기 줄이기 포함) */
function marked(g,html,cx,cy,maxW,maxH,fs0,col,hl){const chars=[];let on=false;const re=/<u>|<\/u>|[^<]/g;let m;const text=String(html);let i=0;while(i<text.length){if(text.startsWith('<u>',i)){on=true;i+=3;}else if(text.startsWith('</u>',i)){on=false;i+=4;}else{chars.push({c:text[i],u:on});i++;}}
  const words=[];let cur=[];chars.forEach(ch=>{if(ch.c===' '){if(cur.length)words.push(cur);cur=[];}else cur.push(ch);});if(cur.length)words.push(cur);
  const run=(w)=>{const out=[];w.forEach(ch=>{const l=out[out.length-1];if(l&&l.u===ch.u)l.t+=ch.c;else out.push({t:ch.c,u:ch.u});});return out;};
  let fs=fs0,lines,lh=1.4;for(let t=0;t<40;t++){g.font=K.font(fs);const sp=g.measureText(' ').width;lines=[];let line=[],lw=0;words.forEach(w=>{const ww=g.measureText(w.map(c=>c.c).join('')).width;if(line.length&&lw+sp+ww>maxW){lines.push(line);line=[];lw=0;}lw+=(line.length?sp:0)+ww;line.push({w,ww});});if(line.length)lines.push(line);
    if((lines.length*fs*lh<=maxH&&lines.every(l=>l.reduce((a,x,k)=>a+x.ww+(k?sp:0),0)<=maxW))||fs<9)break;fs*=.93;}
  g.save();g.font=K.font(fs);g.textBaseline='middle';g.textAlign='left';const sp=g.measureText(' ').width;
  lines.forEach((l,li)=>{const tw=l.reduce((a,x,k)=>a+x.ww+(k?sp:0),0);let x=cx-tw/2;const y=cy+(li-(lines.length-1)/2)*fs*lh;l.forEach(({w})=>{run(w).forEach(r=>{const rw=g.measureText(r.t).width;g.fillStyle=r.u?hl:col;g.fillText(r.t,x,y);if(r.u){g.fillStyle=hl;g.fillRect(x,y+fs*.52,rw,Math.max(2,fs*.07));}x+=rw;});x+=sp;});});
  g.restore();return fs;}
function bookArt(g,x,y,w,h,u,flip){const lw=Math.max(3,u*.09);K.card(g,x,y,w,h,u*.35,'#92400e',{stroke:INK,lw,blur:u*.3,dy:u*.12,sc:'rgba(0,0,0,.35)'});
  const m=u*.35,pw=(w-m*2)/2;[0,1].forEach(k=>{const px=x+m+k*pw;const gr=g.createLinearGradient(px,0,px+pw,0);gr.addColorStop(k?0:1,'#e8d6a8');gr.addColorStop(k?.12:.88,'#fffaf0');gr.addColorStop(1-(k?0:1),k?'#fffaf0':'#fffaf0');
    g.fillStyle=k?gr:gr;K.rr(g,px,y+m,pw-(k?0:0),h-m*2,k?u*.15:u*.15);g.fill();g.strokeStyle='rgba(120,53,15,.5)';g.lineWidth=2;g.stroke();});
  g.save();g.strokeStyle='rgba(180,83,9,.14)';g.lineWidth=1.5;for(let yy=y+m+u*.9;yy<y+h-m-u*.3;yy+=u*.52){g.beginPath();g.moveTo(x+m+u*.3,yy);g.lineTo(x+w-m-u*.3,yy);g.stroke();}g.restore();
  g.fillStyle='rgba(120,53,15,.28)';g.fillRect(x+w/2-u*.06,y+m,u*.12,h-m*2);
  g.fillStyle='#dc2626';g.beginPath();g.moveTo(x+w*.8,y+m);g.lineTo(x+w*.8,y+m+u*1.5);g.lineTo(x+w*.8+u*.3,y+m+u*1.2);g.lineTo(x+w*.8+u*.6,y+m+u*1.5);g.lineTo(x+w*.8+u*.6,y+m);g.closePath();g.fill();}
/* 탐험 대장 */
function explorer(g,x,y,s,mood,t){g.save();g.translate(x,y+Math.sin(t*3)*s*.02);g.lineJoin='round';g.lineWidth=Math.max(2,s*.05);g.strokeStyle=INK;K.shadow(g,0,s*.55,s*.4,s*.07,.25);
  g.fillStyle='#65a30d';g.beginPath();g.moveTo(-s*.38,s*.55);g.quadraticCurveTo(-s*.4,s*.14,0,s*.12);g.quadraticCurveTo(s*.4,s*.14,s*.38,s*.55);g.closePath();g.fill();g.stroke();
  g.fillStyle='#f5cfa8';g.beginPath();g.arc(0,-s*.1,s*.34,0,TAU);g.fill();g.stroke();
  g.fillStyle='#d6a15f';g.beginPath();g.ellipse(0,-s*.3,s*.5,s*.1,0,0,TAU);g.fill();g.stroke();g.beginPath();g.moveTo(-s*.3,-s*.3);g.quadraticCurveTo(0,-s*.75,s*.3,-s*.3);g.closePath();g.fill();g.stroke();g.fillStyle='#92400e';g.fillRect(-s*.3,-s*.38,s*.6,s*.07);
  g.fillStyle=INK;g.strokeStyle=INK;g.lineWidth=Math.max(1.6,s*.04);g.lineCap='round';
  for(const d of[-1,1]){const ex=d*s*.13,ey=-s*.08;if(mood==='oops'){g.beginPath();g.moveTo(ex-s*.05,ey-s*.05);g.lineTo(ex+s*.05,ey+s*.05);g.moveTo(ex+s*.05,ey-s*.05);g.lineTo(ex-s*.05,ey+s*.05);g.stroke();}else if(mood==='happy'){g.beginPath();g.arc(ex,ey+s*.02,s*.06,Math.PI*1.1,Math.PI*1.9);g.stroke();}else{g.beginPath();g.arc(ex,ey,s*.05,0,TAU);g.fill();}}
  g.beginPath();if(mood==='happy'){g.fillStyle='#be123c';g.arc(0,s*.04,s*.09,0,Math.PI);g.fill();g.stroke();}else if(mood==='oops'){g.arc(0,s*.12,s*.07,1.15*Math.PI,1.85*Math.PI);g.stroke();}else{g.moveTo(-s*.07,s*.05);g.lineTo(s*.07,s*.05);g.stroke();}
  /* 돋보기 */
  g.strokeStyle=INK;g.lineWidth=Math.max(2,s*.05);g.beginPath();g.moveTo(s*.34,s*.4);g.lineTo(s*.5,s*.22);g.stroke();g.fillStyle='rgba(186,230,253,.7)';g.beginPath();g.arc(s*.55,s*.15,s*.14,0,TAU);g.fill();g.stroke();
  g.restore();}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/6:Math.min(W,H)/6;K.vgrad(g,0,0,W,H,['#f2dfb4','#e7c98c','#c9a15f']);g.save();g.globalAlpha=.12;g.strokeStyle='#7c3f0c';g.lineWidth=2;for(let k=0;k<6;k++){g.beginPath();g.arc(W*.1+k*W*.17,H*.5,u*(1+k*.2),0,TAU);g.stroke();}g.restore();
    const bw=Math.min(W*.6,u*8),bh=bw*.55;const bx=W*(wide?.5:.5)-bw/2+(wide?W*.06:0),by=H*.4;bookArt(g,bx,by,bw,bh,u*.8);
    const words=['가방','가위','감자','개구리'];words.forEach((w,i)=>{K.txt(g,w,bx+bw*(i<2?.27:.73),by+bh*(.32+(i%2)*.28),{size:u*.5,color:INK});});
    const f=(T*.5)%1,mx=bx+bw*(.15+.7*f),my=by+bh*(.45+.15*Math.sin(f*TAU*2));K.glow(g,mx,my,u*.9,'#fde047',.5);K.emo(g,'🔍',mx,my,u*.9);
    explorer(g,wide?W*.12:W*.16,H*.84,u*1.5,Math.sin(T*2)>.5?'happy':'neutral',T);K.emo(g,'🧭',W*.9,H*.88,u*.9,Math.sin(T)*.3);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const OPC=['#fef3c7','#cffafe','#fce7f3','#dcfce7'];
const GAME={
  id:'k06-dictionary-explorer',title:'국어사전 탐험대',title1:'낱말 보물을 찾아라',title2:'국어사전 탐험대',emoji:LOGO,
  subtitle:'3~4학년 · 국어사전 찾기 · 낱말의 뜻',
  howto:'두꺼운 국어사전 속으로 탐험을 떠나요! 바뀐 낱말의 <b>기본형</b>을 찾아 사전을 펼치고, 낱말 카드를 <b>사전에 실린 순서</b>대로 책장에 꽂고, 문장에 맞는 <b>뜻</b>을 골라 보물 도장을 모아요.',
  how:p=>({a:'바뀐 낱말의 <b>기본형</b>을 찾아요 (먹었어요 → 먹다)',b:'<b>사전에 실린 순서</b>대로 카드를 꽂아요',c:'문장에 맞는 <b>낱말의 뜻</b>을 골라요'}[p.levelId]),
  theme:{c1:'#92400e',c2:'#0e7490'},hero:heroScene,vignette:.05,durs:[90,150,240],levelTitle:'어떤 탐험을 떠날까요?',
  txt:{who:'누가 탐험대원이 될까요?',dur:'탐험 시간',pace:'한 문제 시간',seat:'번 대원 ',go:'탐험 출발!',s1:'1. 탐험',s2:'2. 방법',s3:'3. 이름'},
  levels:[{id:'a',g:'3~4학년',t:'낱말의 기본형',d:'먹었어요 → 먹다'},{id:'b',g:'3~4학년',t:'사전에 실린 순서',d:'첫 자음자 → 모음자 → 받침 순서'},{id:'c',g:'3~4학년',t:'뜻이 여러 가지인 낱말',d:'배가 아파요 · 배를 타요'}],
  summary:`<ul><li>국어사전에서는 <b>기본형</b>으로 찾아요. 문장에서 모양이 바뀐 낱말은 <b>“-다”</b>가 붙은 기본형으로 바꿔서 찾아요 (먹었어요 → 먹다, 예쁜 → 예쁘다).</li>
    <li>사전에는 <b>첫 자음자 → 모음자 → 받침</b> 순서로 실려 있어요. 자음자 순서는 ㄱ ㄲ ㄴ ㄷ ㄸ ㄹ ㅁ ㅂ ㅃ ㅅ ㅆ ㅇ ㅈ ㅉ ㅊ ㅋ ㅌ ㅍ ㅎ 이에요.</li>
    <li>하나의 낱말이 <b>뜻이 여러 가지</b>일 수 있어요 (배: 몸의 배 / 과일 배 / 타는 배). 문장을 읽고 알맞은 뜻을 골라요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=(p.top||0)+u*1.2;const land=W>=H*1.2;const pad=Math.max(8,u*.3),gap=Math.max(7,u*.22);const A=H-Z0-pad;const q=p.state.q;
    let bk,oR;if(land){const bw=W*.56;bk={x:pad,y:Z0,w:bw,h:A*.82};oR={x:pad*2+bw,y:Z0,w:W-bw-pad*3,h:A};}else{const bh=A*.42;bk={x:pad,y:Z0,w:W-pad*2,h:bh};oR={x:pad,y:Z0+bh+gap,w:W-pad*2,h:A-bh-gap};}
    let rects=[],reset=null;const n=q?(q.ty==='order'?q.ws.length:q.opts.length):3;
    if(q&&q.ty==='order'){const rh=Math.min(u*1.5,oR.h*.14);const gh=oR.h-rh-gap;const cw=(oR.w-gap)/2,ch=Math.min((gh-gap)/2,u*3.6);const oy=(gh-(ch*2+gap))/2;for(let i=0;i<n;i++)rects.push({x:oR.x+(i%2)*(cw+gap),y:oR.y+oy+Math.floor(i/2)*(ch+gap),w:cw,h:ch});reset={x:oR.x+oR.w*.2,y:oR.y+oR.h-rh,w:oR.w*.6,h:rh};}
    else{const ch=Math.min((oR.h-(n-1)*gap)/n,q&&q.ty==='mean'?u*3:u*3.6);const oy=(oR.h-(n*ch+(n-1)*gap))/2;for(let i=0;i<n;i++)rects.push({x:oR.x,y:oR.y+oy+i*(ch+gap),w:oR.w,h:ch});}
    return{W,H,u,Z0,land,pad,gap,bk,oR,rects,reset,mascot:{x:land?bk.x+bk.w*.5:W-pad-u*1.1,y:land?bk.y+bk.h+(A-bk.h)*.55:(p.top||0)+u*.75,s:u*(land?1.5:1.25)}};},
  init(p){Object.assign(p.state,{T:0,q:null,n:0,okN:0,stamp:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,got:[],used:{}});this.newQ(p);},
  make(p,L){const R=p.R,q={};
    if(L==='a'){const v=p.deck(BASE,'dk_a');q.ty='base';q.sent=v[1].replace(v[0],`<u>${v[0]}</u>`);q.form=v[0];q.ans=v[2];q.text=`밑줄 친 <b>${v[0]}</b>${J(v[0],'을').slice(v[0].length)} 국어사전에서 찾으려면?`;q.opts=R.shuffle([v[2],v[3],v[4]]).map(t=>({t:'🔍 '+t,ok:t===v[2]}));q.reveal=`${v[0]} → ${v[2]}`;q.speak=v[1];q.review=v[1]+' : '+q.reveal;}
    else if(L==='b'){const mode=R.pick(['first','first','vowel','fin']);let ws;
      for(let t=0;t<200;t++){ws=R.sample(DICT,4);const f=ws.map(w=>w[0]);if(new Set(ws).size<4)continue;if(mode==='first'&&new Set(f).size===4)break;
        if(mode==='vowel'){const g=R.pick(DICT.map(w=>cho(w[0])));const pool=DICT.filter(w=>cho(w[0])===g);if(pool.length<4)continue;ws=R.sample(pool,4);if(new Set(ws.map(w=>w[0])).size>=3)break;}
        if(mode==='fin'){const g=R.pick(DICT);const pool=DICT.filter(w=>w[0]===g[0]);if(pool.length<3)continue;ws=R.sample(pool,Math.min(4,pool.length));if(ws.length<3)continue;break;}}
      q.ty='order';q.ws=R.shuffle(ws);q.ans=ws.slice().sort((a,b)=>a<b?-1:a>b?1:0);q.text='국어사전에 <b>먼저 나오는 낱말</b>부터 차례로 콕콕!';q.reveal=q.ans.join(' → ');q.speak='국어사전에 먼저 나오는 낱말부터 차례로 눌러요';q.review=q.ws.join(', ')+' → '+q.reveal;q.okIdx=0;}
    else{const w=p.deck(MEAN,'dk_c');const k=R.int(0,w[2].length-1);const s=w[2][k];q.ty='mean';q.word=w[0];q.sent=s[0].replace(w[0]+'@',`<u>${w[0]}</u>`).replace(/\[([^\]]+)\]/,'<u>$1</u>');q.ans=s[1];q.text=`밑줄 친 낱말 <b>‘${w[0]}’</b>의 뜻으로 알맞은 것은?`;q.opts=w[1].map((m,j)=>({t:m,ok:j===s[1]}));q.reveal=w[1][s[1]];q.speak=strip(q.sent);q.review=strip(q.sent)+' : '+q.reveal;}
    if(q.ty!=='order')q.okIdx=q.opts.findIndex(o=>o.ok);return q;},
  qtime(q){return q.ty==='order'?26:q.ty==='mean'?24:18;},askHtml(q){return '📖 '+q.text;},askSub(q){return q.ty==='order'?'먼저 나오는 낱말부터 눌러요':'알맞은 것을 눌러요';},
  isOk(q,i){return i===q.okIdx;},tipOf(q,to){const st=null;return q.ty==='order'?`사전 순서: ${q.reveal}`:`${q.reveal}`;},
  onNew(p,q){const st=p.state;st.got=[];st.used={};},
  onVerdict(p,q,ok){const st=p.state;if(ok)st.stamp++;},
  hold(p){return false;},
  orderTap(p,k){const st=p.state,q=st.q;if(st.lock||st.used[k])return;st.used[k]=1;st.got.push(q.ws[k]);p.Snd.tone&&p.Snd.tone(500+st.got.length*90,.08,'sine',.05);
    if(st.got.length===q.ans.length){const ok=st.got.every((x,j)=>x===q.ans[j]);st.myOrder=st.got.join(' → ');this.verdict(p,ok?q.okIdx:q.okIdx+1,false);}},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);const sr=this.sayRect(p);if(K.inRect(x,y,sr)){QK.say(q.speak);return;}
    if(q.ty==='order'){if(G.reset&&K.inRect(x,y,G.reset)){st.got=[];st.used={};p.Snd.tap&&p.Snd.tap();return;}const i=G.rects.findIndex(r=>K.inRect(x,y,r));if(i>=0)this.orderTap(p,i);return;}
    const i=G.rects.findIndex(r=>K.inRect(x,y,r));if(i>=0){p.Snd.tap&&p.Snd.tap();this.verdict(p,i,false);}},
  sayRect(p){const G=this.geo(p);const s=Math.min(G.u*1,G.bk.h*.11);return{x:G.bk.x+G.bk.w-s*3.7,y:G.bk.y+G.bk.h-s*1.9,w:s*3.1,h:s};},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();let r;if(q.ty==='order'){const nxt=q.ans[st.got.length];const k=q.ws.findIndex((w,j)=>w===nxt&&!st.used[j]);r=G.rects[k];}else r=G.rects[q.okIdx];return r?{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2}:null;},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;K.vgrad(g,0,0,W,H,['#f6e7c8','#ecd5a4']);g.save();g.globalAlpha=.1;g.strokeStyle='#7c3f0c';g.lineWidth=2;for(let k=0;k<8;k++){g.beginPath();g.arc(W*.9,H*.2,u*(1+k*.9),0,TAU);g.stroke();}g.restore();
    if(!st.lock&&st.qmax>0){const bw=Math.min(W*.5,u*10);QZ.bar(g,W/2-bw/2,(p.top||0)+u*.2,bw,Math.max(5,u*.2),st.qt/st.qmax,{good:'#0e7490'});}
    const bk=G.bk;bookArt(g,bk.x,bk.y,bk.w,bk.h,u,0);
    /* 도장 줄 */
    const top0=G.land?u*1.5:u*.6;if(G.land){K.txt(g,'🧭 탐험 도장',bk.x+u*1.3,bk.y+u*.95,{size:Math.min(u*.5,bk.h*.07),color:INK,align:'left',maxW:bk.w*.3});for(let i=0;i<Math.min(st.stamp,8);i++)K.emo(g,'🏅',bk.x+u*4.9+i*u*.6,bk.y+u*.95,u*.55);if(st.stamp>8)K.txt(g,'+'+(st.stamp-8),bk.x+u*4.9+8*u*.6+u*.3,bk.y+u*.95,{size:u*.45,color:INK});}
    const ix=bk.x+bk.w*.07,iw=bk.w*.86,iy=bk.y+top0,ih=bk.h-top0-u*1.6;
    if(q.ty==='base'){marked(g,'“'+q.sent+'”',bk.x+bk.w/2,iy+ih*.5,iw,ih,Math.min(u*1.15,bk.h*.15),INK,'#c2410c');}
    else if(q.ty==='mean'){K.txt(g,'📕 '+q.word,bk.x+bk.w/2,iy+ih*.1,{size:Math.min(u*.8,bk.h*.1),color:'#7c2d12',maxW:iw*.6});marked(g,'“'+q.sent+'”',bk.x+bk.w/2,iy+ih*.6,iw,ih*.7,Math.min(u*1.05,bk.h*.14),INK,'#c2410c');}
    else{/* 책장 칸 */const n=q.ans.length;const sw=iw/n-u*.2;const shown=st.res?q.ans:null;
      K.txt(g,'📚 책장에 꽂은 순서',bk.x+bk.w/2,iy+ih*.1,{size:Math.min(u*.6,bk.h*.08),color:'#7c2d12'});
      for(let i=0;i<n;i++){const sx=ix+i*(sw+u*.2)+u*.1,sy=iy+ih*.3,sh=ih*.5;const w=st.got[i];const wrong=st.res==='bad'&&w&&w!==q.ans[i];K.rr(g,sx,sy,sw,sh,u*.18);g.fillStyle=w?(st.res?(wrong?'#fecaca':'#bbf7d0'):'#fde68a'):'rgba(146,64,14,.12)';g.fill();g.lineWidth=Math.max(2,u*.06);g.strokeStyle=w?'#92400e':'rgba(146,64,14,.5)';g.setLineDash(w?[]:[u*.15,u*.12]);g.stroke();g.setLineDash([]);
        K.txt(g,String(i+1),sx+u*.35,sy+u*.4,{size:u*.5,color:'#92400e'});if(w)QK.txt(g,w,sx+sw/2,sy+sh*.58,sw*.9,sh*.7,Math.min(u*.9,sw*.5),INK);}
      if(st.res==='bad')K.txt(g,'정답 순서: '+q.reveal,bk.x+bk.w/2,iy+ih*.9,{size:Math.min(u*.6,bk.h*.08),color:'#15803d',maxW:iw});}
    if(st.res==='ok'&&st.rT<1){const f=clamp(st.rT/.5,0,1);K.emo(g,'🏅',bk.x+bk.w/2,bk.y+bk.h*.5,u*(1+f*1.8),Math.sin(st.rT*10)*.2);}
    const sr=this.sayRect(p);K.card(g,sr.x,sr.y,sr.w,sr.h,sr.h/2,'#fef3c7',{stroke:INK,lw:2,blur:0,dy:3,sc:INK});K.txt(g,'🔈 읽어 줘',sr.x+sr.w/2,sr.y+sr.h/2,{size:sr.h*.5,color:INK,maxW:sr.w*.88});
    explorer(g,G.mascot.x,G.mascot.y,G.mascot.s,st.mood,t);
    G.rects.forEach((r,i)=>{if(q.ty==='order'){const used=st.used[i];const w=q.ws[i];g.save();g.globalAlpha=used?.35:1;QK.card(g,u,r,w,'idle',{fill:OPC[i%4],bd:'#92400e',ink:INK,blur:0});g.restore();return;}
      const isAns=i===q.okIdx,picked=st.pick===i;let s2='idle';if(st.lock){if(isAns)s2='ok';else if(picked)s2='bad';else s2='dim';}
      if(q.ty==='mean'){const t0=q.opts[i].t;const m=t0.match(EMO_RE);const em=m?m[1]:'',txt=m?t0.slice(m[0].length):t0;QK.card(g,u,r,txt,s2,{fill:OPC[i%4],bd:'#92400e',ink:INK,blur:0,left:u*1.9});K.txt(g,String(i+1),r.x+u*.5,r.y+r.h/2,{size:Math.min(u*.8,r.h*.4),color:'#92400e'});if(em)K.emo(g,em,r.x+u*1.3,r.y+r.h/2,Math.min(u*1.1,r.h*.5));}
      else QK.card(g,u,r,q.opts[i].t.replace('🔍 ',''),s2,{fill:OPC[i%4],bd:'#92400e',ink:INK,blur:0,left:u*1.1}),K.emo(g,'🔍',r.x+u*.8,r.y+r.h/2,Math.min(u*.9,r.h*.45));});
    if(q.ty==='order'&&G.reset){const r=G.reset;K.card(g,r.x,r.y,r.w,r.h,r.h/2,'#fff',{stroke:'#92400e',lw:2,blur:0,dy:3,sc:'#92400e'});K.txt(g,'↩ 다시 꽂기',r.x+r.w/2,r.y+r.h/2,{size:r.h*.5,color:INK,maxW:r.w*.9});}
    K.card(g,G.pad,(p.top||0)+u*.4,u*3.9,u*.8,u*.4,'rgba(255,250,240,.92)',{stroke:INK,lw:2,blur:0,dy:0});K.txt(g,'🏅 도장 '+st.stamp+'개',G.pad+u*1.95,(p.top||0)+u*.8,{size:u*.5,color:INK,maxW:u*3.5});
  },
};
QZ.mix(GAME,{say:true,pts0:60,pts1:70});
Engine.boot(GAME);
