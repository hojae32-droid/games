/* 1~2학년 수학 · 비교하기 · 길이 재기(cm·m) — 꼬마 낚시왕
   디자인: 동글동글 귀여운 연못 낚시터. 낚싯대를 던지고 찌가 쏙 들어가면 당겨서, 잡은 물고기의 길이를 비교하고 자로 재요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#0b4a6f';
const LOGO=gkLogo('#bae6fd','#0369a1','🎣');
const FC=['#ef4444','#3b82f6','#eab308'],FN=['빨간','파란','노란'];
const LV={
  '1-1':{g:'1~2학년',t:'비교하기',d:'더 길다 · 더 짧다',time:16},
  '2-1a':{g:'1~2학년',t:'자로 길이 재기',d:'몇 cm일까요?',time:22},
  '2-1b':{g:'1~2학년',t:'길이 어림하기',d:'약 몇 cm일까요?',time:22},
  '2-2':{g:'1~2학년',t:'m와 cm',d:'1 m = 100 cm · 길이의 합과 차',time:30},
};
const mc=t=>{const m=Math.floor(t/100),c=t%100;return((m?m+' m':'')+(m&&c?' ':'')+(c?c+' cm':''))||'0 cm';};
function opts3(R,ans,cands,fmt){const u=[];cands.forEach(c=>{if(c!==ans&&!u.includes(c))u.push(c);});const o=[ans,...R.shuffle(u).slice(0,2)];let k=1;while(o.length<3){o.push(ans+k*9);k++;}const sh=R.shuffle(o);return{labels:sh.map(fmt),okIdx:sh.indexOf(ans)};}
function fishArt(g,x0,y,w,ry,c,o){o=o||{};const t=Math.min(w*.28,ry*1.4),bx=x0+t,rx=(w-t)/2;g.save();g.lineJoin='round';g.lineWidth=Math.max(2,ry*.14);g.strokeStyle=INK;
  if(o.glow)K.glow&&K.glow(g,x0+w/2,y,w*.8,'#fde047',.6);
  g.fillStyle=c;g.beginPath();g.moveTo(x0,y-ry*.9);g.lineTo(bx+2,y);g.lineTo(x0,y+ry*.9);g.closePath();g.fill();g.stroke();
  g.beginPath();g.moveTo(bx+rx*.55,y-ry*.9);g.quadraticCurveTo(bx+rx*.8,y-ry*1.6,bx+rx*1.2,y-ry*.85);g.fill();g.stroke();
  g.beginPath();g.ellipse(bx+rx,y,rx,ry,0,0,TAU);g.fill();g.stroke();
  g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.ellipse(bx+rx,y+ry*.35,rx*.8,ry*.4,0,0,TAU);g.fill();
  g.strokeStyle='rgba(11,74,111,.28)';g.lineWidth=Math.max(1.5,ry*.1);g.beginPath();g.arc(bx+rx*.55,y,ry*.75,-1,1);g.stroke();
  const ex=bx+rx*1.6,er=Math.max(3,ry*.34);g.fillStyle='#fff';g.strokeStyle=INK;g.lineWidth=Math.max(1.5,ry*.1);g.beginPath();g.arc(ex,y-ry*.2,er,0,TAU);g.fill();g.stroke();g.fillStyle=INK;g.beginPath();g.arc(ex+er*.2,y-ry*.2,er*.5,0,TAU);g.fill();
  g.strokeStyle=INK;g.beginPath();g.arc(bx+rx*1.8,y+ry*.28,ry*.22,.2,Math.PI*.85);g.stroke();g.restore();}
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#bae6fd','#38bdf8']);g.fillStyle='#0ea5e9';g.fillRect(0,H*.4,W,H*.6);
  g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=3;for(let i=0;i<5;i++){g.beginPath();for(let x=0;x<=W;x+=12){const y=H*(.5+i*.1)+Math.sin(x/40+T*2+i)*4;x?g.lineTo(x,y):g.moveTo(x,y);}g.stroke();}
  const fx=((T*60)%(W+u*4))-u*2;fishArt(g,fx,H*.62+Math.sin(T*3)*6,u*1.8,u*.45,'#fb923c');fishArt(g,W-fx,H*.78,u*1.2,u*.3,'#facc15');
  const bx=W*.55,by=H*.5+Math.sin(T*3)*3;g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();g.moveTo(W*.2,H*.1);g.quadraticCurveTo(W*.4,H*.2,bx,by-u*.3);g.stroke();
  g.fillStyle='#ef4444';g.beginPath();g.arc(bx,by,u*.3,Math.PI,TAU);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(bx,by,u*.3,0,Math.PI);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.arc(bx,by,u*.3,0,TAU);g.stroke();
  g.fillStyle='#92400e';g.fillRect(0,H*.3,W*.28,u*.4);g.strokeStyle='#78350f';g.lineWidth=u*.12;g.beginPath();g.moveTo(W*.12,H*.1);g.lineTo(W*.2,H*.1);g.stroke();}
const GAME={
  id:'fishlen',title:'꼬마 낚시왕',title1:'연못 낚시터',title2:'꼬마 낚시왕',emoji:LOGO,
  subtitle:'1~2학년 수학 · 비교하기 · 길이 재기',
  howto:'🎣 낚싯대를 던지고 찌가 <b>쏙!</b> 들어가면 당겨요. 잡은 물고기의 <b>길이</b>를 재서 맞히면 양동이에 쏙! <b>황금 물고기</b>는 2배!',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:'#0284c7',c2:'#f97316'},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 물고기를 낚을까요?',
  txt:{who:'누가 낚시왕일까요?',dur:'낚시 시간',pace:'낚는 속도',seat:'번 낚시꾼 ',go:'낚시 시작!',s1:'1. 낚시터',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li><b>길이 비교</b>: 한쪽 끝을 맞추고 다른 쪽 끝을 보면 어느 것이 더 길고 짧은지 알 수 있어요.</li>
    <li><b>자로 재기</b>: 물건의 한쪽 끝을 자의 눈금 <b>0</b>에 맞추고, 다른 쪽 끝이 가리키는 눈금을 읽어요. 0이 아닌 눈금에서 시작하면 (끝 눈금 − 시작 눈금)이 길이예요.</li>
    <li><b>1 m = 100 cm</b>: 2 m 30 cm = 230 cm. 길이를 더하거나 뺄 때는 m는 m끼리, cm는 cm끼리 계산해요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2,q=p.state.q;const n=q?q.labels.length:3;const port=W<H*1.1;const m=q&&q.ty==='m';const cols=m&&port?1:n;const rows=Math.ceil(n/cols);
    const oh=Math.min(m&&port?H*.3:H*.2,rows*u*2.3+(rows-1)*u*.2);const pad=u*.35;const oy=H-pad-oh;const list=QK.grid(W,oy,oy+oh,n,cols,pad,u*.25);
    return{W,H,u,top,pad,oy,oh,list,bx:pad,by:top+u*.7,bw:W-pad*2,bh:oy-top-u*1.1};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,bucket:0,ph:'cast',phT:0,msg:'',msgT:0,jump:0,bobX:.5,bobY:.6,waitT:2});this.newQ(p);},
  make(p,L){const R=p.R,q={golden:R.chance(.12)};
    if(L==='1-1'){const n=R.pick([2,3]);const ls=R.sample([3,4,5,6,7,8,9,10,11,12,13,14],n);const w=R.pick(['long','short']);q.ty='cmp';q.fish=ls.map((l,k)=>({l,c:FC[k],name:FN[k]}));const t=w==='long'?Math.max(...ls):Math.min(...ls);q.okIdx=ls.indexOf(t);q.labels=q.fish.map(f=>f.name+' 물고기');
      q.text=(n===2?'더 ':'가장 ')+'<b>'+(w==='long'?'긴':'짧은')+'</b> 물고기는?';q.reveal=FN[q.okIdx]+' 물고기가 '+(w==='long'?'가장 길어요':'가장 짧아요');}
    else if(L==='2-1a'){const l=R.int(3,11),s=R.chance(.55)?0:R.int(1,15-l);q.ty='ruler';q.l=l;q.s=s;q.text=s?'물고기의 길이는 몇 cm일까요? <small>0이 아닌 곳에서 시작했어요!</small>':'물고기의 길이는 몇 cm일까요?';q.reveal=s?'끝 눈금 '+(s+l)+' − 시작 눈금 '+s+' = '+l+' cm':l+' cm';
      const c=[l+1,l-1,l+2].filter(x=>x>0);if(s)c.unshift(s+l);Object.assign(q,opts3(R,l,c,v=>v+' cm'));}
    else if(L==='2-1b'){const l=R.int(3,15);q.ty='est';q.l=l;q.text='물고기의 길이는 <b>약</b> 몇 cm일까요?';q.reveal='1 cm가 '+l+'번 들어가서 약 '+l+' cm';Object.assign(q,opts3(R,l,[l+3,l-3,l+5,l-5,l+6].filter(x=>x>=1&&x<=18),v=>'약 '+v+' cm'));}
    else{q.ty='m';const k=R.pick(['toCm','toM','add','sub']);
      if(k==='toCm'){const t=R.int(101,399),m=Math.floor(t/100),c=t%100;q.text='낚싯대 길이 <b>'+mc(t)+'</b>는 몇 cm일까요?';q.reveal=mc(t)+' = '+t+' cm';q.rod=t;Object.assign(q,opts3(R,t,[m*10+c,m*1000+c,t+100,t-100],v=>v+' cm'));}
      else if(k==='toM'){const t=R.int(101,499);q.text='줄의 길이 <b>'+t+' cm</b>는 몇 m 몇 cm?';q.reveal=t+' cm = '+mc(t);q.rod=t;Object.assign(q,opts3(R,t,[t+100,t-100,t+10,t-10],v=>mc(v)));}
      else{const a=R.int(110,350),b=R.int(20,150),add=k==='add',t=add?a+b:a-b;q.text=add?'낚싯대 <b>'+mc(a)+'</b>에 <b>'+mc(b)+'</b>를 이으면?':'밧줄 <b>'+mc(a)+'</b>에서 <b>'+mc(b)+'</b>를 자르면 남는 길이는?';q.reveal=mc(a)+(add?' + ':' − ')+mc(b)+' = '+mc(t);q.rod=Math.max(a,t);Object.assign(q,opts3(R,t,[t+100,t-100,t+10,t-10,add?a-b:a+b],v=>mc(v)));}}
    q.review=q.text.replace(/<[^>]+>/g,'')+' → '+q.reveal;q.speak=q.text.replace(/<[^>]+>/g,'');return q;},
  qtime(q){return LV[this._p.levelId].time;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return '🎣 낚싯대를 던져 물고기를 잡아요';},askSub(q){return '화면을 눌러 던져요';},
  isOk(q,i){return i===q.okIdx;},tipOf(q){return q.reveal;},goodTip(q){return '딩동댕! '+q.reveal;},
  ptsOf(p,q,frac){return Math.round((55+45*frac)*(q.golden?2:1));},
  onNew(p,q){const st=p.state;st.ph='cast';st.phT=0;st.msg='';st.jump=0;},
  hold(p){return p.state.ph!=='measure';},
  castIt(p){const st=p.state;st.ph='wait';st.phT=0;st.waitT=1.1+p.R.f()*1.7;st.bobX=.4+p.R.f()*.3;st.bobY=.55+p.R.f()*.25;p.Snd.tone&&p.Snd.tone(500,.12,'sine',.05);p.ask('🤫 쉿! 찌가 쏙 들어갈 때까지 기다려요','');},
  pull(p){const st=p.state;st.ph='caught';st.phT=0;p.Snd.tone&&p.Snd.tone(660,.12,'sine',.06);p.ask('와! 물고기가 잡혔어요','');},
  down(p,x,y){const st=p.state,q=st.q;if(!q)return;if(st.ph==='cast'){this.castIt(p);return;}if(st.ph==='bite'){this.pull(p);return;}if(st.ph==='wait'){st.msg='아직이에요! 쉿~';st.msgT=1;return;}
    if(st.ph==='measure'&&!st.lock){const G=this.geo(p);const i=gkHit(G.list,x,y);if(i>=0)this.verdict(p,i,false);}},
  upd(p,dt){const st=p.state,q=st.q;if(!q)return;st.phT+=dt;if(st.msgT>0)st.msgT-=dt;
    if(st.ph==='wait'&&st.phT>=st.waitT){st.ph='bite';st.phT=0;p.Snd.tone&&p.Snd.tone(988,.08,'sine',.07);p.ask('⚡ 지금이에요! 눌러서 당겨요','');}
    else if(st.ph==='bite'&&st.phT>=1.7){st.ph='cast';st.phT=0;st.msg='앗, 놓쳤어요! 다시 던져요';st.msgT=1.6;p.ask('🎣 다시 던져 봐요','화면을 눌러 던져요');}
    else if(st.ph==='caught'&&st.phT>=.9){st.ph='measure';st.phT=0;p.ask((q.golden?'✨ <b>황금 물고기!</b> ':'')+q.text,'알맞은 답을 눌러요');if(p.n===1&&this.say)QK.say(q.speak);}},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();
    if(st.ph==='cast'||st.ph==='bite')return{k:'click',x:rc.left+G.W/2,y:rc.top+G.H*.4};
    if(st.ph==='measure'){const r=G.list[q.okIdx];return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};}return null;},
  /* ── 그리기 ── */
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q,t=st.T;if(!q)return;
    K.vgrad(g,0,0,W,H,['#bae6fd','#7dd3fc']);const wy=G.top+u*1.4;K.vgrad(g,0,wy,W,H-wy,['#38bdf8','#0369a1']);
    g.strokeStyle='rgba(255,255,255,.3)';g.lineWidth=Math.max(2,u*.06);for(let i=0;i<6;i++){g.beginPath();for(let x=0;x<=W;x+=14){const y=wy+u*(.8+i*1.5)+Math.sin(x/60+t*1.5+i)*u*.12;x?g.lineTo(x,y):g.moveTo(x,y);}g.stroke();}
    /* 연잎 */
    [[.82,.2],[.15,.45],[.9,.55],[.5,.85]].forEach(([a,b],i)=>{const x=W*a,y=wy+(H-wy)*b+Math.sin(t+i)*u*.1;g.fillStyle='#4ade80';g.beginPath();g.ellipse(x,y,u*.8,u*.32,0,.3,TAU-.3);g.fill();g.strokeStyle='#15803d';g.lineWidth=2;g.stroke();});
    if(st.ph==='measure')this.drawMeasure(p,g,G);else this.drawFishing(p,g,G,wy);
    /* 양동이와 황금 표시 */
    K.card(g,u*.3,G.top+u*.15,u*3.3,u*.8,u*.4,'rgba(255,255,255,.95)',{stroke:INK,lw:3,blur:0,dy:0});K.emo(g,'🪣',u*.3+u*.55,G.top+u*.55,u*.6);K.txt(g,st.bucket+'마리',u*.3+u*2.2,G.top+u*.57,{size:u*.5,color:INK,maxW:u*2});
    if(!st.lock&&st.ph==='measure'&&st.qmax>0){const bw=Math.min(W*.4,u*8);QZ.bar(g,W-bw-u*.3,G.top+u*.4,bw,Math.max(6,u*.22),st.qt/st.qmax,{good:'#22c55e'});}
    if(st.msgT>0&&st.msg)K.txt(g,st.msg,W/2,G.top+u*2.6,{size:u*.8,color:'#fff',stroke:INK,lw:u*.18,maxW:W*.9});
  },
  drawFishing(p,g,G,wy){const st=p.state,q=st.q,W=G.W,H=G.H,u=G.u,t=st.T;
    /* 부두 */
    g.fillStyle='#a16207';g.fillRect(0,G.top+u*1.0,W*.3,u*.4);g.fillStyle='#78350f';g.fillRect(W*.04,G.top+u*1.4,u*.25,u*2);g.fillRect(W*.24,G.top+u*1.4,u*.25,u*2);
    K.emo(g,'🧒',W*.12,G.top+u*.55,u*1.4);const tipX=W*.2,tipY=G.top+u*.2;g.strokeStyle='#78350f';g.lineWidth=u*.12;g.lineCap='round';g.beginPath();g.moveTo(W*.14,G.top+u*.8);g.lineTo(tipX,tipY);g.stroke();
    /* 그림자 물고기 */
    for(let i=0;i<4;i++){const x=((t*(30+i*12)+i*W*.3)%(W+u*3))-u*1.5,y=wy+u*(2.2+i*1.3);g.save();g.globalAlpha=.25;fishArt(g,i%2?W-x:x,y,u*1.6,u*.4,'#0c4a6e');g.restore();}
    const bx=W*(st.bobX||.5),by0=wy+(H-wy)*((st.bobY||.6)*.55);
    if(st.ph==='cast'){g.strokeStyle='rgba(255,255,255,.9)';g.lineWidth=2;g.beginPath();g.moveTo(tipX,tipY);g.lineTo(tipX,tipY+u*1.4);g.stroke();
      this.btn(g,G,'🎣 낚싯대 던지기!',true);}
    else{const bite=st.ph==='bite',by=by0+(bite?Math.abs(Math.sin(st.phT*18))*u*.35:Math.sin(t*3)*u*.04);
      g.strokeStyle='rgba(255,255,255,.95)';g.lineWidth=2;g.beginPath();g.moveTo(tipX,tipY);g.quadraticCurveTo((tipX+bx)/2,tipY-u*.2,bx,by-u*.2);g.stroke();
      if(st.ph==='caught'){const k=Math.min(1,st.phT/.9);const x=bx+(W/2-bx)*k,y=by0-Math.sin(k*Math.PI)*u*3-(by0-(G.top+u*4.5))*k;fishArt(g,x-u*1.2,y,u*2.4,u*.6,q.golden?'#facc15':'#fb923c',{glow:q.golden});}
      else{g.fillStyle='#ef4444';g.beginPath();g.arc(bx,by,u*.3,Math.PI,TAU);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(bx,by,u*.3,0,Math.PI);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.arc(bx,by,u*.3,0,TAU);g.stroke();
        if(bite){g.strokeStyle='#fff';g.lineWidth=3;for(let i=0;i<3;i++){g.beginPath();g.arc(bx,by+u*.1,u*(.5+i*.35+(st.phT*2)%.4),0,TAU);g.stroke();}K.txt(g,'⚡ 지금!',bx,by-u*1.3,{size:u*.9,color:'#fff',stroke:'#dc2626',lw:u*.2,maxW:u*5});}
        this.btn(g,G,bite?'⚡ 당겨!':'🤫 쉿! 기다려요…',bite);}}},
  btn(g,G,label,on){const u=G.u,w=Math.min(G.W*.7,u*10),h=u*1.9,x=G.W/2-w/2,y=G.H-h-u*.9;K.rr(g,x,y+(on?0:u*.08),w,h,h/2);g.fillStyle=on?'#f97316':'#94a3b8';g.fill();g.lineWidth=Math.max(3,u*.1);g.strokeStyle=INK;g.stroke();K.txt(g,label,G.W/2,y+h/2,{size:Math.min(h*.5,u*1.1),color:'#fff',stroke:INK,lw:u*.16,maxW:w*.88});},
  drawMeasure(p,g,G){const st=p.state,q=st.q,W=G.W,u=G.u,t=st.T;
    K.card(g,G.bx,G.by,G.bw,G.bh,u*.4,'rgba(255,251,235,.97)',{stroke:'#92400e',lw:Math.max(3,u*.1),blur:u*.3,dy:u*.1});
    const mg=u*.7,ucm=(G.bw-mg*2)/16,x0=G.bx+mg,cy=G.by+G.bh*.42;const gold=q.golden;const col=gold?'#facc15':'#fb923c';
    const out=st.lock&&st.res==='ok'?Math.min(1,st.rT/.8):0,esc=st.lock&&st.res==='bad'?Math.min(1,st.rT/.9):0;
    g.save();if(out>0){g.translate((G.bx+u*.8-x0)*out*.3,-G.bh*.4*out);g.globalAlpha=1-out*.8;}if(esc>0){g.translate(esc*W*.4,esc*u*.4);g.globalAlpha=1-esc;}
    const bob=Math.sin(t*3)*u*.05;
    if(q.ty==='cmp'){const n=q.fish.length,gap=Math.min(G.bh*.26,u*1.5);q.fish.forEach((f,k)=>{const y=G.by+G.bh*(.17+k*.26);const ry=Math.min(gap*.36,u*.95);fishArt(g,x0,y+bob,f.l*ucm,ry,f.c);});
      g.strokeStyle='rgba(120,53,15,.45)';g.setLineDash([u*.2,u*.2]);g.lineWidth=2;g.beginPath();g.moveTo(x0,G.by+G.bh*.05);g.lineTo(x0,G.by+G.bh*.95);g.stroke();g.setLineDash([]);}
    else if(q.ty==='ruler'){const ry=Math.min(u*1.0,Math.max(ucm*.5,q.l*ucm*.1));fishArt(g,x0+q.s*ucm,cy-ucm*.2+bob,q.l*ucm,ry,col,{glow:gold});
      const ry2=cy+ucm*1.3,rh=Math.min(u*1.9,G.bh*.28);K.rr(g,x0-ucm*.4,ry2,16*ucm+ucm*.8,rh,u*.1);g.fillStyle='#fef08a';g.fill();g.strokeStyle='#a16207';g.lineWidth=2;g.stroke();
      for(let k=0;k<=150;k++){const x=x0+k*ucm/10,hh=k%10?(k%5?rh*.2:rh*.3):rh*.45;g.strokeStyle='#422006';g.lineWidth=k%10?1:2;g.beginPath();g.moveTo(x,ry2);g.lineTo(x,ry2+hh);g.stroke();if(k%10===0)K.txt(g,String(k/10),x,ry2+rh*.72,{size:Math.min(rh*.3,ucm*.55),color:'#422006',maxW:ucm*.9});}
      g.strokeStyle='rgba(239,68,68,.55)';g.setLineDash([6,5]);g.lineWidth=2;[q.s,q.s+q.l].forEach(c=>{g.beginPath();g.moveTo(x0+c*ucm,cy-ry*1.2);g.lineTo(x0+c*ucm,ry2);g.stroke();});g.setLineDash([]);}
    else if(q.ty==='est'){const ry=Math.min(u*1.0,Math.max(ucm*.5,q.l*ucm*.1));fishArt(g,x0+ucm*.5,cy+bob,q.l*ucm,ry,gold?'#facc15':'#f472b6',{glow:gold});
      const by=cy+ry+ucm*.9;g.fillStyle='#fde047';g.fillRect(x0+ucm*.5,by,ucm,ucm*.7);g.strokeStyle='#713f12';g.lineWidth=2;g.strokeRect(x0+ucm*.5,by,ucm,ucm*.7);K.txt(g,'← 1 cm',x0+ucm*2.9,by+ucm*.35,{size:Math.min(u*.7,ucm*.8),color:'#713f12',maxW:ucm*4});}
    else{const L=q.rod,sc=Math.min(1,(G.bw-mg*2)/(Math.max(L,200)/100*u*3.4));const len=L/100*u*3.4*sc;const y=G.by+G.bh*.38;g.strokeStyle='#78350f';g.lineWidth=u*.28;g.lineCap='round';g.beginPath();g.moveTo(x0,y);g.lineTo(x0+len,y);g.stroke();g.strokeStyle='#d97706';g.lineWidth=u*.1;g.beginPath();g.moveTo(x0,y);g.lineTo(x0+len,y);g.stroke();
      for(let m=0;m<=L/100;m++){const x=x0+m*u*3.4*sc;g.strokeStyle='#dc2626';g.lineWidth=3;g.beginPath();g.moveTo(x,y-u*.5);g.lineTo(x,y+u*.5);g.stroke();K.txt(g,m+' m',x,y+u*.9,{size:u*.5,color:'#7c2d12',maxW:u*2});}
      K.txt(g,'1 m = 100 cm',G.bx+G.bw/2,G.by+G.bh*.72,{size:Math.min(u*1.1,G.bh*.16),color:'#c2410c',maxW:G.bw*.8});}
    g.restore();
    if(gold&&!st.lock)K.txt(g,'✨ 황금 물고기! 점수 2배',G.bx+G.bw/2,G.by+u*.45,{size:u*.55,color:'#b45309',maxW:G.bw*.9});
    /* 보기 */
    G.list.forEach((r,i)=>{let s='idle';if(st.lock){s=i===q.okIdx?'ok':(i===st.pick?'bad':'dim');}QK.card(g,u,r,q.labels[i],s,{fill:'#fff',bd:INK,ink:INK,rad:u*.4,blur:0,left:q.ty==='cmp'?u*.5:0});
      if(q.ty==='cmp'){g.fillStyle=q.fish[i].c;g.beginPath();g.arc(r.x+u*.55,r.y+r.h/2,u*.28,0,TAU);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();}});
  },
};
QZ.mix(GAME,{say:true,pts0:55,pts1:45,okMs:1500,badMs:2900});
Engine.boot(GAME);
