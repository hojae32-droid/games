/* 수 계산 게임 공통 부품: 숫자 키패드·식 그리기·키보드 입력 */
const MK={
  /* 5열 3줄: 1~5 / 6~9,0 / 지우기(2칸) 확인(3칸) */
  keys(r,gap,lab){lab=lab||{};const cw=(r.w-gap*4)/5,ch=(r.h-gap*2)/3;const out=[];
    for(let i=0;i<10;i++){const row=i<5?0:1,c=i%5;out.push({k:i<9?String(i+1):'0',x:r.x+c*(cw+gap),y:r.y+row*(ch+gap),w:cw,h:ch});}
    /* 9 다음이 0: 6 7 8 9 0 순서로 */
    out.forEach((o,i)=>{if(i>=5){o.k=['6','7','8','9','0'][i-5];}});
    out.push({k:'del',label:lab.del||'지우기',x:r.x,y:r.y+2*(ch+gap),w:cw*2+gap,h:ch});
    out.push({k:'ok',label:lab.ok||'확인',x:r.x+cw*2+gap*2,y:r.y+2*(ch+gap),w:cw*3+gap*2,h:ch});
    return out;},
  hit(keys,x,y){const o=keys.find(k=>K.inRect(x,y,k));return o?o.k:null;},
  /* th: {face,ink,bd,delFace,okFace,okInk,sh} */
  draw(g,u,keys,th,press,ok){keys.forEach(o=>{const isOk=o.k==='ok',isDel=o.k==='del';const down=press&&press.k===o.k&&press.t>0;
      const face=isOk?(ok===false?th.okOff||th.okFace:th.okFace):isDel?th.delFace:th.face;const dy=down?o.h*.05:0;const lip=Math.max(3,o.h*.08);
      g.save();K.rr(g,o.x,o.y+dy+lip,o.w,o.h-lip,Math.min(o.h*.3,u*.4));g.fillStyle=th.sh;g.fill();
      K.rr(g,o.x,o.y+dy,o.w,o.h-lip,Math.min(o.h*.3,u*.4));g.fillStyle=face;g.fill();g.lineWidth=Math.max(2,u*.06);g.strokeStyle=th.bd;g.stroke();
      const lab=o.label||o.k;K.txt(g,lab,o.x+o.w/2,o.y+dy+(o.h-lip)/2+o.h*.02,{size:Math.min(o.h*(o.label?.42:.6),u*1.1),color:isOk?th.okInk:th.ink,maxW:o.w*.9});g.restore();});},
  /* 식을 한 줄로: expr 안의 @ 자리에 답 칸을 그려요. 칸 너비는 글자 크기에 맞춰요 */
  expr(g,expr,typed,cx,cy,maxW,maxH,fs0,col,th){const parts=String(expr).split('@');let fs=fs0;
    const meas=f=>{g.font=K.font(f);const l=g.measureText(parts[0]).width,r=g.measureText(parts[1]||'').width;const bw=Math.max(f*1.5,g.measureText(typed||'?').width+f*.7);return{l,r,bw,tot:l+bw+r};};
    let m=meas(fs);for(let t=0;t<40&&(m.tot>maxW||fs>maxH);t++){fs*=.94;m=meas(fs);}
    let x=cx-m.tot/2;g.save();g.textBaseline='middle';g.textAlign='left';g.fillStyle=col;g.font=K.font(fs);g.fillText(parts[0],x,cy);x+=m.l;
    K.rr(g,x+fs*.04,cy-fs*.62,m.bw-fs*.08,fs*1.24,fs*.22);g.fillStyle=th.box;g.fill();g.lineWidth=Math.max(2,fs*.07);g.strokeStyle=th.boxBd;g.stroke();
    g.textAlign='center';g.fillStyle=typed?th.boxInk:th.ph;g.fillText(typed||'?',x+m.bw/2,cy+fs*.03);g.textAlign='left';g.fillStyle=col;g.fillText(parts[1]||'',x+m.bw,cy);g.restore();return{fs,x:x,bw:m.bw};},
  /* 키보드 (혼자 할 때만) */
  kb(fn){if(MK._kb)return;MK._kb=1;window.addEventListener('keydown',e=>{const E=window.Engine;if(!E||!E.players||E.players.length!==1||E.over)return;const p=E.players[0];if(!p.active)return;
      if(/^[0-9]$/.test(e.key))fn(p,e.key);else if(e.key==='Backspace'){e.preventDefault();fn(p,'del');}else if(e.key==='Enter'){e.preventDefault();fn(p,'ok');}
      else if(e.key==='Tab'||e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();fn(p,'sw');}});},
};
