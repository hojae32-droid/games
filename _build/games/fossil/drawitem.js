  drawItem(p,g){const st=p.state,s=st.size,it=st.item;g.save();g.translate(st.cx,st.asked?Math.max(s*.9,Math.min(st.cy,p.H-s*1.02)):st.cy);
    // 바탕 암석
    g.save();g.shadowColor='rgba(60,35,10,.4)';g.shadowBlur=s*.12;g.shadowOffsetY=s*.05;const rg=g.createRadialGradient(-s*.35,-s*.35,s*.1,0,0,s*1.1);rg.addColorStop(0,'#b39a7a');rg.addColorStop(1,'#7a6247');g.fillStyle=rg;g.beginPath();g.ellipse(0,0,s*1.05,s*.85,st.rot,0,7);g.fill();g.restore();
    g.strokeStyle='rgba(255,240,215,.35)';g.lineWidth=Math.max(2,s*.025);g.beginPath();g.ellipse(0,0,s*1.0,s*.8,st.rot,Math.PI*1.05,Math.PI*1.6);g.stroke();
    if(st.k==='rock'){const Rf=makeR(it.n.length*97);g.save();g.beginPath();g.ellipse(0,0,s,s*.8,st.rot,0,7);g.clip();
      const base={이암:'#6b7280',사암:'#d6b98c',역암:'#a8a29e'}[it.n];g.fillStyle=base;g.fillRect(-s,-s,s*2,s*2);
      if(it.n==='이암'){for(let i=0;i<900;i++){g.fillStyle=Rf.pick(['#4b5563','#9ca3af']);g.fillRect(Rf.num(-s,s),Rf.num(-s,s),1.2,1.2);}}
      else if(it.n==='사암'){for(let i=0;i<500;i++){g.fillStyle=Rf.pick(['#b45309','#fde68a','#a16207','#e7c88a']);g.beginPath();g.arc(Rf.num(-s,s),Rf.num(-s,s),Rf.num(1.5,3),0,7);g.fill();}}
      else{for(let i=0;i<300;i++){g.fillStyle=Rf.pick(['#d6b98c','#a16207']);g.beginPath();g.arc(Rf.num(-s,s),Rf.num(-s,s),2,0,7);g.fill();}
        for(let i=0;i<16;i++){g.fillStyle=Rf.pick(['#57534e','#78716c','#e7e5e4','#92400e']);g.beginPath();g.ellipse(Rf.num(-s*.8,s*.8),Rf.num(-s*.7,s*.7),Rf.num(s*.08,s*.18),Rf.num(s*.06,s*.13),Rf.num(0,3),0,7);g.fill();g.strokeStyle='#0003';g.stroke();}}
      const sh=g.createRadialGradient(-s*.4,-s*.4,s*.1,0,0,s*1.1);sh.addColorStop(0,'rgba(255,255,255,.28)');sh.addColorStop(.5,'rgba(255,255,255,0)');sh.addColorStop(1,'rgba(30,20,10,.35)');g.fillStyle=sh;g.fillRect(-s,-s,s*2,s*2);
      g.restore();g.restore();return;}
    g.rotate(st.rot);g.filter='grayscale(1) sepia(.7) brightness(.9)';
    if(it.draw==='tri'){g.fillStyle='#78716c';g.strokeStyle='#44403c';g.lineWidth=2;g.beginPath();g.ellipse(0,0,s*.45,s*.7,0,0,7);g.fill();g.stroke();
      g.beginPath();g.ellipse(0,-s*.5,s*.42,s*.22,0,Math.PI,0);g.fill();g.stroke();for(let k=-4;k<=5;k++){g.beginPath();g.moveTo(-s*.42,k*s*.11);g.quadraticCurveTo(0,k*s*.11+s*.05,s*.42,k*s*.11);g.stroke();}
      g.beginPath();g.moveTo(-s*.14,-s*.6);g.lineTo(-s*.14,s*.65);g.moveTo(s*.14,-s*.6);g.lineTo(s*.14,s*.65);g.stroke();}
    else if(it.draw==='foot'){g.fillStyle='#57534e';[[-.3,.3],[.25,-.35]].forEach(([dx,dy])=>{g.save();g.translate(dx*s,dy*s);g.beginPath();g.ellipse(0,s*.08,s*.14,s*.12,0,0,7);g.fill();
        [-.5,0,.5].forEach(a=>{g.save();g.rotate(a);g.beginPath();g.ellipse(0,-s*.14,s*.05,s*.16,0,0,7);g.fill();g.restore();});g.restore();});}
    else K.emo(g,it.e,0,0,s*1.25);
    g.filter='none';g.restore();},
