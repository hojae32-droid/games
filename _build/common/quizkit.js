/* 퀴즈형 게임 공통 부품: 글자 맞춤·보기 카드·격자 배치 */
const QK={
  /* 글자를 상자에 맞춰 줄바꿈/축소. 반환 {lines,fs} */
  fit(g,text,maxW,maxH,fs0,lh,minFs){lh=lh||1.25;minFs=minFs||8;let fs=fs0;g.font=K.font(fs);let lines=K.wrap(g,text,maxW);
    for(let t=0;t<40&&(lines.length*fs*lh>maxH||lines.some(l=>g.measureText(l).width>maxW))&&fs>minFs;t++){fs*=.93;g.font=K.font(fs);lines=K.wrap(g,text,maxW);}
    return{lines,fs,lh};},
  txt(g,text,cx,cy,maxW,maxH,fs0,color,lh){const f=this.fit(g,String(text),maxW,maxH,fs0,lh);g.save();g.font=K.font(f.fs);g.fillStyle=color;g.textAlign='center';g.textBaseline='middle';
    f.lines.forEach((l,i)=>g.fillText(l,cx,cy+(i-(f.lines.length-1)/2)*f.fs*f.lh));g.restore();return f;},
  /* y0~y1 영역에 n개의 격자 칸 */
  grid(W,y0,y1,n,cols,pad,gap){const rows=Math.ceil(n/cols);const w=(W-pad*2-gap*(cols-1))/cols,h=(y1-y0-gap*(rows-1))/rows;const out=[];
    for(let i=0;i<n;i++){const c=i%cols,r=Math.floor(i/cols);out.push({x:pad+c*(w+gap),y:y0+r*(h+gap),w,h});}return out;},
  /* 보기 카드: st = idle|ok|bad|dim */
  card(g,u,r,text,st,o){o=o||{};const fillMap={idle:o.fill||'#ffffff',ok:'#dcfce7',bad:'#fee2e2',dim:o.fill||'#ffffff'};const bd={idle:o.bd||'#1f2937',ok:'#16a34a',bad:'#dc2626',dim:o.bd||'#1f2937'}[st];
    g.save();g.globalAlpha=st==='dim'?.5:1;K.card(g,r.x,r.y,r.w,r.h,o.rad||u*.25,fillMap[st],{stroke:bd,lw:Math.max(2,u*.06),blur:o.blur==null?u*.2:o.blur,dy:u*.08,sc:o.sc});
    const padL=(o.left||0)+u*.3;this.txt(g,text,r.x+padL+(r.w-padL-u*.3)/2,r.y+r.h/2,r.w-padL-u*.3,r.h-u*.3,Math.min(u*.7,r.h*.4),o.ink||'#1f2937');
    if(st==='ok'||st==='bad')K.emo(g,st==='ok'?'✅':'❌',r.x+r.w-u*.35,r.y+u*.35,u*.5);g.restore();},
};
