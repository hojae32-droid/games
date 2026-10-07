/* 5학년 1학기 수학 · 규칙과 대응 — 규칙 해커: 비밀 기계
   디자인: 초록 글자가 흐르는 해커의 터미널. 비밀 기계에 내가 고른 수를 넣어 실험하고, 규칙을 알아내 잠금을 해제해요. 실험을 적게 할수록 해커 점수가 높아요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#021008',GRN='#22ff88',CYA='#06b6d4';
const LOGO=gkLogo('#0b2a1c','#22ff88','⚙️');
const LV={
  a:{t:'대응 관계 찾기',d:'실험하고 큰 수의 결과 맞히기'},
  b:{t:'식으로 나타내기',d:'○ = △ × 4 처럼 식 조립하기'},
  c:{t:'거꾸로 찾기',d:'나온 수를 보고 넣은 수 구하기'},
};
const J=(w,j)=>{const c=w.charCodeAt(w.length-1);if(c<0xAC00||c>0xD7A3)return w+(j==='을'?'를':j==='과'?'와':'가');const b=(c-0xAC00)%28===0;return w+(j==='을'?(b?'를':'을'):j==='은'?(b?'는':'은'):j==='과'?(b?'와':'과'):(b?'가':'이'));};
const CTX=[
  {a:'자동차 수',au:'대',b:'바퀴 수',bu:'개',ic:'🚗',x0:0,rule:()=>({f:x=>4*x,e:'○ = △ × 4'})},{a:'문어 수',au:'마리',b:'다리 수',bu:'개',ic:'🐙',x0:0,rule:()=>({f:x=>8*x,e:'○ = △ × 8'})},{a:'세발자전거 수',au:'대',b:'바퀴 수',bu:'개',ic:'🚲',x0:0,rule:()=>({f:x=>3*x,e:'○ = △ × 3'})},
  {a:'내 나이',au:'살',b:'언니 나이',bu:'살',ic:'👧',x0:3,lo:3,hi:10,alo:20,ahi:45,rule:R=>{const d=R.int(2,6);return{f:x=>x+d,e:'○ = △ + '+d};}},{a:'서울의 시각',au:'시',b:'방콕의 시각',bu:'시',ic:'🕘',x0:2,lo:3,hi:7,alo:8,ahi:12,rule:()=>({f:x=>x-2,e:'○ = △ − 2'})},
  {a:'사각형 조각 수',au:'개',b:'성냥개비 수',bu:'개',ic:'🟧',x0:0,rule:()=>({f:x=>3*x+1,e:'○ = △ × 3 + 1'})},{a:'삼각형 조각 수',au:'개',b:'성냥개비 수',bu:'개',ic:'🔺',x0:0,rule:()=>({f:x=>2*x+1,e:'○ = △ × 2 + 1'})},
  {a:'팔찌 수',au:'개',b:'구슬 수',bu:'개',ic:'📿',x0:0,rule:R=>{const d=R.int(5,9);return{f:x=>d*x,e:'○ = △ × '+d};}},{a:'접은 횟수',au:'번',b:'자른 조각 수',bu:'개',ic:'✂️',x0:0,rule:()=>({f:x=>x+1,e:'○ = △ + 1'})},
  {a:'달린 시간(분)',au:'분',b:'달린 거리(m)',bu:'m',ic:'🏃',x0:0,rule:R=>{const d=R.pick([100,150,200,250]);return{f:x=>d*x,e:'○ = △ × '+d};}},
];
const EOPS=['×','+','−','÷'];
function hero(g,W,H,T,u){g.fillStyle='#04120c';g.fillRect(0,0,W,H);g.font=(u*.5)+'px "Nanum Gothic Coding",monospace';g.fillStyle='rgba(34,255,136,.35)';for(let c=0;c<W/(u*.6);c++){const x=c*u*.6,off=((T*60+c*37)%H);for(let r=0;r<6;r++){g.fillText(String((c*7+r*3)%10),x,(off+r*u*.6)%H);}}
  const cx=W/2,cy=H/2;g.strokeStyle=GRN;g.lineWidth=3;g.fillStyle='#0b2a1c';K.rr(g,cx-u*1.6,cy-u*1.1,u*3.2,u*2.2,u*.2);g.fill();g.stroke();g.save();g.translate(cx,cy);g.rotate(T);K.emo(g,'⚙️',0,0,u*1.4);g.restore();
  K.txt(g,'△ → ○',cx,cy+u*1.7,{size:u*.8,color:GRN,maxW:W*.5});}
const GAME={
  id:'hacker',title:'규칙 해커: 비밀 기계',title1:'해커의 터미널',title2:'규칙 해커: 비밀 기계',emoji:LOGO,
  subtitle:'5학년 1학기 수학 · 규칙과 대응',
  howto:'비밀 기계에 <b>내가 고른 수</b>를 넣어 실험해요! 나온 수를 보고 규칙을 알아냈으면 <b>🔓 규칙 알았다!</b> 실험을 <b>적게</b> 할수록 해커 점수가 높아요. 마지막엔 기계가 내는 문제를 풀어 잠금을 해제해요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:'#14b86a',c2:CYA},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 기계를 해킹할까요?',
  txt:{who:'누가 해커일까요?',dur:'해킹 시간',pace:'생각하는 시간',seat:'번 해커 ',go:'해킹 시작!',s1:'1. 기계',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'5학년 1학기',t:v.t,d:v.d})),
  summary:`<ul><li><b>대응 관계</b>: 한 양이 변할 때 다른 양이 어떻게 따라 변하는지 살펴보면 규칙을 찾을 수 있어요. 예) 자동차 수(△)가 1, 2, 3대일 때 바퀴 수(○)는 4, 8, 12개 → ○ = △ × 4</li>
    <li>규칙을 <b>식</b>으로 나타낼 때는 ○, △ 같은 기호로 두 양의 관계를 써요. ○ = △ + 3 은 △보다 ○가 3 큰 관계예요.</li>
    <li>식이 있으면 △ 값에서 ○ 값을 구할 수 있고, 거꾸로 ○ 값에서 △ 값도 구할 수 있어요.</li></ul>`,
  rowsFor(p){const st=p.state,q=st.q;if(!q)return[];const pad=[[1,2,3],[4,5,6],[7,8,9]].map(r=>r.map(n=>({id:'n'+n,t:String(n)})));pad.push([{id:'bs',t:'⌫'},{id:'n0',t:'0'},{id:'go',t:st.ph===1?'▶':'🔓',go:1}]);if(st.ph===1)pad.push([{id:'hack',t:'🔓 규칙 알았다!',hack:1}]);return pad;},
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2,pad=u*.35,land=W>=H*1.1;const rows=this.rowsFor(p);const gap=u*.18;let scene,panel;
    if(land){const sw=W*.56;scene={x:pad,y:top,w:sw,h:H-top-pad};panel={x:pad*2+sw,y:top,w:W-sw-pad*3,h:H-top-pad};}
    else{const rh0=Math.min(u*1.5,(H-top)*.085);const ph=Math.min((H-top)*.5,rows.length*rh0+(rows.length-1)*gap+u*.2);scene={x:pad,y:top,w:W-pad*2,h:H-top-pad-ph-u*.2};panel={x:pad,y:H-pad-ph,w:W-pad*2,h:ph};}
    const rh=Math.min(u*1.7,(panel.h-gap*(Math.max(rows.length,1)-1))/Math.max(rows.length,1));const list=[];const y0=panel.y+Math.max(0,(panel.h-(rows.length*rh+(rows.length-1)*gap))/2);
    rows.forEach((row,r)=>{const w=(panel.w-gap*(row.length-1))/row.length;row.forEach((b,c)=>list.push(Object.assign({},b,{x:panel.x+c*(w+gap),y:y0+r*(rh+gap),w,h:rh})));});
    return{W,H,u,top,pad,land,scene,panel,list};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,ph:1,tries:0,log:[],np:'',busy:0,show:null,out:null,msg:'',e:{o:['×','+'],n:['','']},f:0,part:1,okFlag:false,spin:0,solved:0});this.newQ(p);},
  make(p,L){const R=p.R,q={};const ctx=R.pick(CTX);const rule=ctx.rule(R);q.ctx=ctx;q.rule=rule;q.lo=ctx.lo||1;q.hi=ctx.hi||10;q.ex=R.int(q.lo,q.hi);q.ty=L==='b'?'expr':L==='c'?'back':'fwd';
    const ax=R.int(ctx.alo||15,ctx.ahi||40);q.ax=ax;q.ay=rule.f(ax);const strip=s=>s.replace(/<[^>]+>/g,'');
    if(L==='a'){q.ans=q.ay;q.text=J(ctx.a,'이')+' <b>'+ax+'</b>일 때, '+J(ctx.b,'은')+'?';q.reveal=q.ay+' '+ctx.bu+' ('+rule.e+')';}
    else if(L==='c'){q.ans=ax;q.text=J(ctx.b,'이')+' <b>'+q.ay+'</b>'+J(String(q.ay),'이').slice(String(q.ay).length)+' 되려면 '+J(ctx.a,'은')+'?';q.reveal=ax+' '+ctx.au+' ('+rule.e+')';}
    else{q.text=ctx.a+'(△)'+J(ctx.a,'과').slice(ctx.a.length)+' '+ctx.b+'(○)의 대응 관계를 식으로!';q.reveal=rule.e;q.two=/[+−] \d+$/.test(rule.e)&&/×/.test(rule.e);}
    q.review='['+ctx.a+'→'+ctx.b+': '+rule.e+'] '+strip(q.text)+' → '+q.reveal;q.speak='';return q;},
  qtime(q){return q.ty==='expr'?90:75;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return '🧪 '+(q.ctx.lo||1)+'~'+(q.ctx.hi||10)+' 사이의 수를 넣어 실험해요!';},askSub(q){return '숫자를 누르고 ▶ — 규칙이 보이면 🔓';},
  isOk(q,i,p){return !!p.state.okFlag;},tipOf(q){return '규칙: '+q.rule.e+' → '+q.reveal;},goodTip(q){return '해킹 성공! '+q.rule.e;},
  ptsOf(p,q,frac){return Math.round((55+50*frac)*(p.state.part||1));},
  onNew(p,q){const st=p.state;st.ph=1;st.tries=0;st.log=[[q.ex,q.rule.f(q.ex)]];st.np='';st.busy=0;st.show=null;st.out=null;st.msg='';st.e={o:['×','+'],n:['','']};st.f=0;st.part=1;st.okFlag=false;st.spin=0;},
  onVerdict(p,q,ok){if(ok)p.state.solved++;},
  phase2(p){const st=p.state,q=st.q;if(st.ph===2)return;st.ph=2;st.np='';st.part=Math.max(.5,1-.12*Math.max(0,st.tries-2));p.ask(q.text,q.ty==='expr'?'○ = △ 식을 완성해요 (기호를 눌러 바꿔요)':'🔓 잠금 해제: 답을 입력해요');
    if(q.ty!=='expr'){st.show=q.ty==='fwd'?q.ax:null;st.out=q.ty==='fwd'?null:q.ay;}},
  run(p,x){const st=p.state,q=st.q,c=q.ctx;if(st.busy>0)return;if(x<(c.lo||1)||x>(c.hi||10)){st.msg='⚠️ '+(c.lo||1)+'~'+(c.hi||10)+' 사이의 수만 넣을 수 있어요!';p.Snd.bad&&p.Snd.bad();return;}
    st.tries++;st.msg='🧪 실험 '+st.tries+'번! 규칙이 보이나요?';st.show=x;st.out=null;st.busy=.7;st.spin=.7;st.runX=x;p.Snd.tone&&p.Snd.tone(330,.1,'sine',.05);p.Snd.tone&&p.Snd.tone(440,.1,'sine',.05,.15);},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);const b=G.list.find(b=>K.inRect(x,y,b));
    if(b){p.Snd.tap&&p.Snd.tap();if(b.hack){if(st.busy<=0)this.phase2(p);return;}
      const maxLen=st.ph===1?2:(q.ty==='expr'?3:4);
      if(b.id[0]==='n'&&b.id.length===2){if(q.ty==='expr'&&st.ph===2){const k=st.f;if(st.e.n[k].length<3)st.e.n[k]+=b.id[1];}else if(st.np.length<maxLen)st.np+=b.id[1];return;}
      if(b.id==='bs'){if(q.ty==='expr'&&st.ph===2)st.e.n[st.f]=st.e.n[st.f].slice(0,-1);else st.np=st.np.slice(0,-1);return;}
      if(b.id==='go'){if(st.ph===1){if(st.np==='')return;const v=Number(st.np);st.np='';this.run(p,v);}else this.submit(p);}return;}
    if(q.ty==='expr'&&st.ph===2){const R=this.exprRects(p,G);for(const r of R){if(K.inRect(x,y,r)){if(r.op!=null){st.e.o[r.op]=EOPS[(EOPS.indexOf(st.e.o[r.op])+1)%4];p.Snd.tap&&p.Snd.tap();}else st.f=r.num;return;}}}},
  submit(p){const st=p.state,q=st.q,c=q.ctx;if(q.ty!=='expr'){if(st.np==='')return;st.okFlag=Number(st.np)===q.ans;this.verdict(p,0,false);return;}
    const ns=q.two?2:1;if(st.e.n.slice(0,ns).some(x=>x==='')){p.Snd.bad&&p.Snd.bad();return;}const g=x=>{let v=x;for(let k=0;k<ns;k++){const n=Number(st.e.n[k]),o=st.e.o[k];v=o==='×'?v*n:o==='+'?v+n:o==='−'?v-n:v/n;}return v;};
    st.okFlag=[1,2,3,5,7,10,13].every(x=>Math.abs(g(x+(c.x0||0))-q.rule.f(x+(c.x0||0)))<1e-9);st.mine='○ = △ '+st.e.o.slice(0,ns).map((o,k)=>o+' '+st.e.n[k]).join(' ');this.verdict(p,0,false);},
  exprRects(p,G){const st=p.state,q=st.q,S=G.scene,u=G.u;const ns=q.two?2:1;const fs=Math.min(u*1.2,S.h*.1);const parts=[{t:'○',w:fs*1.2},{t:'=',w:fs*.8},{t:'△',w:fs*1.2}];for(let k=0;k<ns;k++){parts.push({op:k,w:fs*1.3});parts.push({num:k,w:fs*2});}
    const tw=parts.reduce((a,b)=>a+b.w+fs*.25,0);let x=S.x+(S.w-tw)/2;const y=S.y+S.h*.66;parts.forEach(pt=>{pt.x=x;pt.y=y-fs*.7;pt.h=fs*1.4;pt.fs=fs;x+=pt.w+fs*.25;});return parts;},
  upd(p,dt){const st=p.state,q=st.q;if(!q)return;if(st.spin>0)st.spin=Math.max(0,st.spin-dt);if(st.busy>0){st.busy-=dt;if(st.busy<=0){st.busy=0;const x=st.runX,y=q.rule.f(x);st.out=y;p.Snd.tone&&p.Snd.tone(880,.12,'sine',.06);if(!st.log.some(r=>r[0]===x))st.log.push([x,y]);if(st.tries>=6)setTimeout(()=>{if(p.active&&!st.lock)this.phase2(p);},1300);}}},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();const cl=r=>({k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2});
    if(st.ph===1){if(st.busy>0)return null;return cl(G.list.find(b=>b.hack));}
    if(q.ty!=='expr'){st.np=String(q.ans);return cl(G.list.find(b=>b.id==='go'));}
    const m=q.rule.e.replace('○ = △ ','').split(' ');st.e.o[0]=m[0];st.e.n[0]=m[1];if(q.two){st.e.o[1]=m[2];st.e.n[1]=m[3];}return cl(G.list.find(b=>b.id==='go'));},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q,t=st.T,S=G.scene,c=q&&q.ctx;if(!q)return;
    g.fillStyle='#04120c';g.fillRect(0,0,W,H);g.font=(u*.45)+'px "Nanum Gothic Coding",monospace';g.fillStyle='rgba(34,255,136,.1)';for(let cc=0;cc<W/(u*.55);cc++){const off=((t*30+cc*53)%H);for(let r=0;r<5;r++)g.fillText(String((cc*7+r*3)%10),cc*u*.55,(off+r*u*.55)%H);}
    /* 기계 */
    const my=S.y+S.h*.26,bw=Math.min(S.w*.26,u*5),bh=Math.min(S.h*.24,u*3);const box=(x,label,val,col)=>{K.card(g,x-bw/2,my-bh/2,bw,bh,u*.2,'#0b2a1c',{stroke:col,lw:3,blur:u*.3,dy:0,sc:col});K.txt(g,label,x,my-bh*.28,{size:Math.min(u*.5,bh*.18),color:col,maxW:bw*.92});K.txt(g,val==null?'?':String(val),x,my+bh*.13,{size:Math.min(bh*.5,u*1.8),color:'#e8fff3',maxW:bw*.9});};
    box(S.x+S.w*.17,c.a+' △',st.show,GRN);box(S.x+S.w*.83,c.b+' ○',st.busy>0?'…':st.out,CYA);
    const mx=S.x+S.w/2,ms=Math.min(bh*.55,u*1.6);K.card(g,mx-ms*1.2,my-ms*.9,ms*2.4,ms*1.8,u*.25,'#06241a',{stroke:st.lock?(st.okFlag?GRN:'#ef4444'):'#14b86a',lw:3,blur:u*.2,dy:0});g.save();g.translate(mx-ms*.55,my);g.rotate(st.spin>0?(.7-st.spin)*9:t*.4);K.emo(g,'⚙️',0,0,ms*.9);g.restore();g.save();g.translate(mx+ms*.6,my+ms*.1);g.rotate(st.spin>0?-(.7-st.spin)*9:-t*.4);K.emo(g,'⚙️',0,0,ms*.7);g.restore();K.emo(g,st.lock?(st.okFlag?'🔓':'🔒'):st.ph===2?'❓':'🔒',mx,my-ms*.65,ms*.55);
    g.strokeStyle='#14b86a';g.lineWidth=3;g.setLineDash([8,6]);g.lineDashOffset=-t*30;[[S.x+S.w*.17+bw/2,mx-ms*1.2],[mx+ms*1.2,S.x+S.w*.83-bw/2]].forEach(([a,b])=>{g.beginPath();g.moveTo(a,my);g.lineTo(b,my);g.stroke();});g.setLineDash([]);
    /* 아이콘 줄 */
    if(st.show!=null&&!c.x0&&st.ph===1||st.show!=null&&st.ph===2&&q.ty==='fwd'&&!c.x0){const n=st.show;K.txt(g,n<=12?c.ic.repeat(n):c.ic+' × '+n,S.x+S.w*.17,my+bh*.75,{size:u*.55,color:'#e8fff3',maxW:S.w*.4});}
    /* 실험 기록 표 */
    if(st.ph===1||q.ty!=='expr'){const n=st.log.length,cw=Math.min(u*1.9,(S.w-u*2.6)/(n+0.01)),ty0=S.y+S.h*.56,rh=Math.min(u*1.2,S.h*.09);const x0=S.x+u*.3;
      ['△','○'].forEach((lab,r)=>{const y=ty0+r*rh;g.fillStyle='#0b2a1c';g.fillRect(x0,y,u*1.6,rh);g.strokeStyle='#14b86a';g.lineWidth=2;g.strokeRect(x0,y,u*1.6,rh);K.txt(g,(r===0?c.ic+' ':'')+lab,x0+u*.8,y+rh/2,{size:Math.min(rh*.55,u*.7),color:r?CYA:GRN,maxW:u*1.5});
        st.log.forEach((row,k)=>{const x=x0+u*1.6+k*cw;const isNew=k===st.log.length-1&&st.busy<=0&&st.tries>0;g.fillStyle=isNew?'#14532d':'#06241a';g.fillRect(x,y,cw,rh);g.strokeStyle='#14b86a';g.strokeRect(x,y,cw,rh);K.txt(g,String(row[r]),x+cw/2,y+rh/2,{size:Math.min(rh*.6,u*.8),color:'#e8fff3',maxW:cw*.92});});});
      K.card(g,S.x+S.w-u*5,S.y+S.h*.45,u*4.7,u*.8,u*.2,'#0b2a1c',{stroke:'#14b86a',lw:2,blur:0,dy:0});K.txt(g,'🧪 실험 '+st.tries+'번',S.x+S.w-u*2.65,S.y+S.h*.45+u*.4,{size:u*.5,color:GRN,maxW:u*4.2});}
    /* 식 조립 */
    if(q.ty==='expr'&&st.ph===2){const R=this.exprRects(p,G);R.forEach(r=>{if(r.op!=null||r.num!=null){const sel=r.num!=null&&st.f===r.num;K.rr(g,r.x,r.y,r.w,r.h,r.fs*.2);g.fillStyle=sel?'#14532d':'#06241a';g.fill();g.lineWidth=sel?4:2;g.strokeStyle=sel?GRN:'#14b86a';g.stroke();K.txt(g,r.op!=null?st.e.o[r.op]:(st.e.n[r.num]||'□'),r.x+r.w/2,r.y+r.h/2,{size:r.fs,color:'#e8fff3',maxW:r.w*.9});}else K.txt(g,r.t,r.x+r.w/2,r.y+r.h/2,{size:r.fs,color:r.t==='='?'#e8fff3':r.t==='○'?CYA:GRN,maxW:r.w});});
      K.txt(g,'기호를 눌러 ×  +  −  ÷ 로 바꾸고, 빈 칸을 눌러 수를 써요',S.x+S.w/2,S.y+S.h*.82,{size:u*.5,color:'#7be8ad',maxW:S.w*.95});}
    /* 입력 표시 */
    const inp=q.ty==='expr'&&st.ph===2?'':st.np;if(!(q.ty==='expr'&&st.ph===2)){K.card(g,S.x+S.w*.3,S.y+S.h*.84,S.w*.4,u*1.2,u*.2,'#0b2a1c',{stroke:GRN,lw:3,blur:0,dy:0});K.txt(g,(st.ph===1?'△ = ':'답 = ')+(inp||'_'),S.x+S.w*.5,S.y+S.h*.84+u*.6,{size:u*.8,color:GRN,maxW:S.w*.36});}
    if(st.msg&&st.ph===1)K.txt(g,st.msg,S.x+S.w/2,S.y+S.h*.08,{size:Math.min(u*.6,S.h*.05),color:'#fde047',maxW:S.w*.95});
    if(st.lock){K.txt(g,st.okFlag?'🔓 해킹 성공!':'🔒 해킹 실패',S.x+S.w/2,S.y+S.h*.9,{size:u*.9,color:st.okFlag?GRN:'#fca5a5',stroke:INK,lw:u*.2,maxW:S.w*.9});K.txt(g,'규칙: '+q.rule.e,S.x+S.w/2,S.y+S.h*.97,{size:u*.55,color:'#e8fff3',maxW:S.w*.9});}
    /* 키패드 */
    G.list.forEach(b=>{let fill='#0b2a1c',ink='#e8fff3',line='#14b86a';if(b.go){fill=GRN;ink=INK;}if(b.hack){fill='#14532d';ink='#e8fff3';line=GRN;}if(st.lock)fill='#06150e';
      K.rr(g,b.x,b.y,b.w,b.h,u*.22);g.fillStyle=fill;g.fill();g.lineWidth=2;g.strokeStyle=line;g.stroke();K.txt(g,b.t,b.x+b.w/2,b.y+b.h/2,{size:Math.min(b.h*.5,u*1.1),color:ink,maxW:b.w*.9});});
    if(!st.lock&&st.qmax>0)QZ.bar(g,G.panel.x,G.top-u*.0,Math.min(G.panel.w,u*8),Math.max(5,u*.16),st.qt/st.qmax,{good:GRN});
    K.card(g,u*.3,G.top-u*.15,u*3.2,u*.7,u*.2,'#0b2a1c',{stroke:'#14b86a',lw:2,blur:0,dy:0});K.txt(g,'🔓 '+st.solved+'개 해킹',u*.3+u*1.6,G.top+u*.2,{size:u*.42,color:GRN,maxW:u*2.9});
  },
};
QZ.mix(GAME,{say:false,pts0:55,pts1:50,okMs:1800,badMs:3400});
Engine.boot(GAME);
