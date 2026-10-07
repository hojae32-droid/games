/* 음악 게임 공통 부품: 소리(M), 함께 듣기 맞춤(gate), 음표·오선 그리기 */
const M={
  ok(){return !(window.Snd&&Snd.on===false);},
  now(){return MUS.now();},
  play(inst,m,when,dur,vel,o){if(M.ok())MUS.play(inst,m,when,dur,vel,o);},
  hit(name,when,vel,o){if(M.ok())MUS.hit(name,when,vel,o);},
  chord(inst,ms,when,dur,vel,o){if(M.ok())MUS.chord(inst,ms,when,dur,vel,o);},
  /* 한 화면에 여러 칸이 있으면 소리는 첫 번째로 활동 중인 칸만 내요 */
  lead(p){const a=(window.Engine&&Engine.players||[]).filter(x=>x.active&&!x.finished);return !a.length||a[0]===p||!a.includes(p);},
  vol(p){return (Engine.players.length>1)?.55:.9;},
  /* 모두 준비되면 같이 다음 문제로: 한 화면 대결에서 '함께 듣고 동시에 답해요' */
  _ready:new Map(),
  gate(p,fn){const act=Engine.players.filter(x=>x.active&&!x.finished);if(act.length<2||!act.includes(p)){fn();return;}M._ready.set(p,fn);M.check();},
  check(){if(!M._ready.size)return;const act=Engine.players.filter(x=>x.active&&!x.finished);for(const k of [...M._ready.keys()])if(!act.includes(k))M._ready.delete(k);
    if(act.length&&act.every(x=>M._ready.has(x))){const f=[...M._ready.values()];M._ready.clear();f.forEach(g=>g());}},
  waiting(p){return M._ready.has(p);},
  /* QZ 퀴즈에 '함께 듣기'를 끼워 넣어요 */
  mix(G,o){QZ.mix(G,o);const nq=G.newQ;G.newQ=function(p){const st=p.state;if(!st.begun){st.q=null;return;}st.q=null;st.lock=false;M.gate(p,()=>{if(p.active)nq.call(this,p);});};
    G.start=function(p){p.state.begun=true;nq.call(this,p);};
    const up=G.update;G.update=function(p,dt){M.check();up.call(this,p,dt);};},
  SOL:['도','도#','레','레#','미','파','파#','솔','솔#','라','라#','시'],
  solfa(m){return M.SOL[((m%12)+12)%12];},
  /* 음표 그리기: kind = w h hd q dq e s / wr hr qr er */
  note(g,kind,x,y,sz,col,o){o=o||{};col=col||'#222';const r=sz*.21,st=sz*.95,hx=r*1.12;g.save();g.fillStyle=col;g.strokeStyle=col;g.lineWidth=Math.max(1.6,sz*.055);g.lineCap='round';
    const head=f=>{g.save();g.translate(x,y);g.rotate(-.38);g.beginPath();g.ellipse(0,0,r*1.25,r*.95,0,0,Math.PI*2);if(f)g.fill();else{g.lineWidth=Math.max(2,sz*.07);g.stroke();}g.restore();};
    const stem=()=>{g.beginPath();g.moveTo(x+hx,y-2);g.lineTo(x+hx,y-st);g.stroke();};
    const flag=k=>{g.beginPath();g.moveTo(x+hx,y-st+k*st*.24);g.quadraticCurveTo(x+hx+r*1.7,y-st+k*st*.24+st*.25,x+hx+r*1.25,y-st+k*st*.24+st*.62);g.stroke();};
    const dot=()=>{g.beginPath();g.arc(x+r*2.3,y-r*.2,r*.34,0,Math.PI*2);g.fill();};
    switch(kind){
      case'w':head(0);break;case'h':head(0);stem();break;case'hd':head(0);stem();dot();break;case'q':head(1);stem();break;case'dq':head(1);stem();dot();break;
      case'e':head(1);stem();flag(0);break;case's':head(1);stem();flag(0);flag(1);break;
      case'wr':g.fillRect(x-r*1.3,y-sz*.32,r*2.6,r*.9);g.beginPath();g.moveTo(x-r*2,y-sz*.32);g.lineTo(x+r*2,y-sz*.32);g.stroke();break;
      case'hr':g.fillRect(x-r*1.3,y-sz*.12-r*.9,r*2.6,r*.9);g.beginPath();g.moveTo(x-r*2,y-sz*.12);g.lineTo(x+r*2,y-sz*.12);g.stroke();break;
      case'qr':g.beginPath();g.moveTo(x-r*.4,y-st*.7);g.lineTo(x+r*.6,y-st*.7+r*1.3);g.lineTo(x-r*.4,y-st*.7+r*2.5);g.lineTo(x+r*.6,y-st*.7+r*3.8);g.quadraticCurveTo(x-r*.9,y-st*.7+r*3.3,x+r*.3,y-st*.7+r*5.5);g.stroke();break;
      case'er':g.beginPath();g.arc(x-r*.3,y-r*1.4,r*.5,0,Math.PI*2);g.fill();g.beginPath();g.moveTo(x-r*.3,y-r*1.2);g.quadraticCurveTo(x+r*.7,y-r*.9,x+r*1.0,y-r*1.75);g.lineTo(x+r*.1,y+r*1.25);g.stroke();break;}
    g.restore();},
  KNAME:{w:'온음표',h:'2분음표',hd:'점2분음표',q:'4분음표',dq:'점4분음표',e:'8분음표',s:'16분음표',wr:'온쉼표',hr:'2분쉼표',qr:'4분쉼표',er:'8분쉼표'},
  DUR:{w:4,h:2,hd:3,q:1,dq:1.5,e:.5,s:.25,wr:4,hr:2,qr:1,er:.5},
  /* 높은음자리표 */
  _clef:null,
  clef(g,x,yG,gap,col){if(!M._clef)M._clef=new Path2D('M3 -52 C 14 -40 16 -26 2 -14 C -14 -2 -16 12 -6 20 C 4 28 20 24 22 12 C 24 0 12 -6 4 -2 C -4 2 -4 12 4 14 M 3 -52 C -6 -44 -6 -32 -2 -20 L 8 44 C 9 54 0 58 -6 54 C -11 50 -8 42 -2 44');
    const s=gap*.062;g.save();g.translate(x,yG-gap*.35);g.scale(s,s);g.lineWidth=Math.max(1.6,gap*.16)/s;g.strokeStyle=col||'#222';g.lineCap='round';g.lineJoin='round';g.stroke(M._clef);g.restore();},
  /* 오선: 아래 줄 p=0 … 위 줄 p=8 (한 칸 = 반 간격). yOf(p) 함수를 돌려줘요 */
  staff(g,x0,x1,mid,gap,col,lw){const yOf=p=>mid+(4-p)*gap/2;g.save();g.strokeStyle=col||'#222';g.lineWidth=lw||Math.max(1.2,gap*.06);for(let p=0;p<=8;p+=2){g.beginPath();g.moveTo(x0,yOf(p));g.lineTo(x1,yOf(p));g.stroke();}g.restore();return yOf;},
  /* 오선 위 음표 머리 (p = 칸 번호, 0=미(E4)줄 아래 첫 줄) */
  head(g,x,y,gap,col,o){o=o||{};const r=gap*.58;g.save();g.fillStyle=col||'#222';g.translate(x,y);g.rotate(-.38);g.beginPath();g.ellipse(0,0,r*1.22,r*.92,0,0,Math.PI*2);g.fill();g.restore();},
  /* 둥근 버튼 눌림 효과용 */
  press(st,key,ms){st.pr=st.pr||{};st.pr[key]=ms||.18;},
  decay(st,dt){if(!st.pr)return;for(const k in st.pr){st.pr[k]-=dt;if(st.pr[k]<=0)delete st.pr[k];}},
};
/* 키보드로 연주하기 (혼자 할 때만) */
document.addEventListener('keydown',e=>{const G=window.Engine&&Engine.G;if(!G||!G.key||e.repeat||e.ctrlKey||e.metaKey||e.altKey)return;if(/INPUT|TEXTAREA/.test((e.target||{}).tagName||''))return;const ps=Engine.players||[];if(ps.length!==1)return;const p=ps[0];if(p&&p.active&&!p.finished)G.key(p,e);});
