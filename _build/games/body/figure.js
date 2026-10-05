  figure(g,cx,top,bw,bh,u,m){/* 해부도 스타일의 친근한 사람 */
    const parts=(ex)=>{const F=()=>{g.fill();if(ex>0)g.stroke();};g.lineCap='round';g.lineJoin='round';
      // 다리
      [-1,1].forEach(d=>{g.lineWidth=bw*.135+ex*2;g.beginPath();g.moveTo(cx+d*bw*.11,top+bh*.6);g.lineTo(cx+d*bw*.12,top+bh*.94);g.stroke();
        g.lineWidth=ex*2;g.beginPath();g.ellipse(cx+d*bw*.15,top+bh*.965,bw*.085,bh*.022,0,0,7);F();});
      // 팔
      [-1,1].forEach(d=>{g.lineWidth=bw*.095+ex*2;g.beginPath();g.moveTo(cx+d*bw*.27,top+bh*.235);g.quadraticCurveTo(cx+d*bw*.36,top+bh*.33,cx+d*bw*.385,top+bh*.56);g.stroke();
        g.lineWidth=ex*2;g.beginPath();g.ellipse(cx+d*bw*.39,top+bh*.585,bw*.055,bh*.03,d*.15,0,7);F();});
      // 목
      g.lineWidth=ex*2;K.rr(g,cx-bw*.055,top+bh*.13,bw*.11,bh*.09,bw*.03);F();
      // 몸통
      g.beginPath();g.moveTo(cx-bw*.08,top+bh*.195);g.bezierCurveTo(cx-bw*.22,top+bh*.195,cx-bw*.3,top+bh*.2,cx-bw*.3,top+bh*.27);
      g.bezierCurveTo(cx-bw*.29,top+bh*.34,cx-bw*.22,top+bh*.4,cx-bw*.21,top+bh*.47);g.bezierCurveTo(cx-bw*.21,top+bh*.54,cx-bw*.24,top+bh*.6,cx-bw*.19,top+bh*.645);
      g.quadraticCurveTo(cx-bw*.08,top+bh*.67,cx,top+bh*.645);g.quadraticCurveTo(cx+bw*.08,top+bh*.67,cx+bw*.19,top+bh*.645);g.bezierCurveTo(cx+bw*.24,top+bh*.6,cx+bw*.21,top+bh*.54,cx+bw*.21,top+bh*.47);
      g.bezierCurveTo(cx+bw*.22,top+bh*.4,cx+bw*.29,top+bh*.34,cx+bw*.3,top+bh*.27);g.bezierCurveTo(cx+bw*.3,top+bh*.2,cx+bw*.22,top+bh*.195,cx+bw*.08,top+bh*.195);g.closePath();F();
      // 머리
      g.beginPath();g.ellipse(cx,top+bh*.085,bh*.074,bh*.08,0,0,7);F();};
    // 바닥 그림자 + 뒤 빛
    K.shadow(g,cx,top+bh*.985,bw*.42,bh*.02,.18);K.glow(g,cx,top+bh*.42,bh*.5,'#ffffff',.7);
    g.save();g.shadowColor='rgba(120,60,60,.22)';g.shadowBlur=u*.5;g.shadowOffsetY=u*.15;g.fillStyle='#e9a985';g.strokeStyle='#e9a985';parts(Math.max(2,u*.06));g.restore();
    const gr=g.createRadialGradient(cx-bw*.08,top+bh*.3,bh*.05,cx,top+bh*.45,bh*.6);gr.addColorStop(0,'#ffe9dc');gr.addColorStop(.55,'#fcd5bd');gr.addColorStop(1,'#f3b996');
    g.save();g.fillStyle=gr;g.strokeStyle=gr;parts(0);g.restore();
    // 몸속(가슴·배) 은은한 영역
    g.save();const cav=g.createRadialGradient(cx,top+bh*.42,bw*.05,cx,top+bh*.42,bw*.32);cav.addColorStop(0,'rgba(255,255,255,.4)');cav.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=cav;g.beginPath();g.ellipse(cx,top+bh*.42,bw*.2,bh*.2,0,0,7);g.fill();
    // 가운데 선 · 갈비 느낌
    g.strokeStyle='rgba(214,140,110,.22)';g.lineWidth=Math.max(1.5,u*.04);g.lineCap='round';g.beginPath();g.moveTo(cx,top+bh*.24);g.lineTo(cx,top+bh*.6);g.stroke();
    // 얼굴
    const hy=top+bh*.085,hr=bh*.074;g.fillStyle='#7c4a2d';g.beginPath();g.ellipse(cx,hy-hr*.45,hr*1.02,hr*.62,0,Math.PI,0);g.quadraticCurveTo(cx+hr*.4,hy-hr*.6,cx,hy-hr*.55);g.quadraticCurveTo(cx-hr*.6,hy-hr*.5,cx-hr*1.02,hy-hr*.45);g.fill();
    g.fillStyle='#4b2e1e';g.strokeStyle='#4b2e1e';g.lineCap='round';if(m==='happy'){g.lineWidth=Math.max(1.6,hr*.1);[-1,1].forEach(d=>{g.beginPath();g.arc(cx+d*hr*.36,hy+hr*.14,hr*.13,Math.PI*1.1,Math.PI*1.9);g.stroke();});}else if(m==='ouch'){g.lineWidth=Math.max(1.6,hr*.1);[-1,1].forEach(d=>{const ex=cx+d*hr*.36,ey=hy+hr*.08;g.beginPath();g.moveTo(ex-d*hr*.12,ey-hr*.1);g.lineTo(ex+d*hr*.1,ey);g.lineTo(ex-d*hr*.12,ey+hr*.1);g.stroke();});}else{[-1,1].forEach(d=>{g.beginPath();g.ellipse(cx+d*hr*.36,hy+hr*.08,hr*.09,hr*.12,0,0,7);g.fill();});}
    g.fillStyle='rgba(244,114,182,.35)';[-1,1].forEach(d=>{g.beginPath();g.ellipse(cx+d*hr*.6,hy+hr*.35,hr*.16,hr*.1,0,0,7);g.fill();});
    g.strokeStyle='#b4533a';g.lineWidth=Math.max(1.5,hr*.08);g.beginPath();if(m==='happy'){g.fillStyle='#c0392b';g.arc(cx,hy+hr*.26,hr*.3,0,Math.PI);g.fill();}else if(m==='ouch'){g.arc(cx,hy+hr*.5,hr*.2,Math.PI*1.15,Math.PI*1.85);g.stroke();}else{g.arc(cx,hy+hr*.28,hr*.25,.3,Math.PI-.3);g.stroke();}
    g.restore();},
