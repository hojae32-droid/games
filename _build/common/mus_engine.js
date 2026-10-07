const MUS=(()=>{
  let ctx=null,master=null,dry=null,wet=null,muted=false;
  const live=new Set(),ksCache=new Map();let capture=null;
  function ac(){
    if(!ctx){
      const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;
      ctx=new C({latencyHint:'interactive'});
      const comp=ctx.createDynamicsCompressor();comp.threshold.value=-16;comp.knee.value=12;comp.ratio.value=3.5;comp.attack.value=.004;comp.release.value=.2;
      master=ctx.createGain();master.gain.value=muted?0:.85;
      master.connect(comp);comp.connect(ctx.destination);
      dry=ctx.createGain();dry.gain.value=1;dry.connect(master);
      // 작은 홀 울림
      const conv=ctx.createConvolver(),len=Math.floor(ctx.sampleRate*1.6),ir=ctx.createBuffer(2,len,ctx.sampleRate);
      for(let c=0;c<2;c++){const d=ir.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3.2);}
      conv.buffer=ir;wet=ctx.createGain();wet.gain.value=.16;const wf=ctx.createBiquadFilter();wf.type='lowpass';wf.frequency.value=4200;
      wet.connect(wf);wf.connect(conv);conv.connect(master);
    }
    if(ctx.state==='suspended')ctx.resume();
    return ctx;
  }
  ['pointerdown','keydown','touchstart'].forEach(ev=>document.addEventListener(ev,()=>ac(),{capture:true,passive:true}));
  const now=()=>(ac()?ctx.currentTime:0);
  const hz=m=>440*Math.pow(2,(m-69)/12);
  function bus(vol,rev,parent){const g=ctx.createGain();g.gain.value=vol;g.connect(parent||dry);if(rev){const s=ctx.createGain();s.gain.value=rev;g.connect(s);s.connect(wet);}return g;}
  function track(n,end){live.add(n);if(capture)capture.add(n);n.onended=()=>live.delete(n);try{n.start(n.__t||0);n.stop(end);}catch(e){}}
  function osc(type,f,t,end,dest,detune){const o=ctx.createOscillator();o.type=type;o.frequency.setValueAtTime(f,t);if(detune)o.detune.value=detune;o.connect(dest);o.__t=t;track(o,end);return o;}
  function env(t,peak,att,decay,end,dest){const g=ctx.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(peak,t+att);g.gain.setTargetAtTime(0,t+att,decay);g.gain.setTargetAtTime(0,end-.05,.03);g.connect(dest);return g;}
  let noiseBuf=null;
  function noise(t,dur,dest){if(!noiseBuf){noiseBuf=ctx.createBuffer(1,ctx.sampleRate*1,ctx.sampleRate);const d=noiseBuf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;}const s=ctx.createBufferSource();s.buffer=noiseBuf;s.connect(dest);s.__t=t;track(s,t+dur);return s;}

  function ksBuf(f,dec,soft,secs){
    const key=Math.round(f*10)+'|'+dec+'|'+soft;
    if(!ksCache.has(key)){
      const sr=ctx.sampleRate,len=Math.floor(sr*secs),buf=ctx.createBuffer(1,len,sr),d=buf.getChannelData(0);
      const N=sr/f,Ni=Math.floor(N),fr=N-Ni,line=new Float32Array(Ni+2);
      let prev=0;for(let i=0;i<line.length;i++){const r=Math.random()*2-1;prev=prev*soft+r*(1-soft);line[i]=prev;}
      let p=0;for(let i=0;i<len;i++){const a=line[p],b=line[(p+1)%line.length];d[i]=a*(1-fr)+b*fr;line[p]=dec*.5*(a+b);p=(p+1)%line.length;}
      ksCache.set(key,buf);
    }
    return ksCache.get(key);
  }
  function pluck(m,t,dur,v,out,dec,soft,lpMul,gain,ring){
    const f=hz(m),s=ctx.createBufferSource();s.buffer=ksBuf(f,dec,soft,ring||2);
    const g=ctx.createGain();g.gain.setValueAtTime(gain*v,t);g.gain.setTargetAtTime(0,t+Math.max(.3,dur+(ring||2)*.4),.2);
    const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=Math.min(9000,f*lpMul);
    s.connect(lp);lp.connect(g);g.connect(out);s.__t=t;track(s,t+(ring||2)+.1);return s;
  }
  function vib(o,t,end,f,rate,depth,delay){const lfo=ctx.createOscillator(),lg=ctx.createGain();lfo.frequency.value=rate;lg.gain.setValueAtTime(0,t);lg.gain.linearRampToValueAtTime(f*depth,t+(delay||.3));lfo.connect(lg);lg.connect(o.frequency);lfo.__t=t;track(lfo,end);}
  function sus(t,end,peak,att,rel,dest){const g=ctx.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(peak,t+att);g.gain.setValueAtTime(peak,Math.max(t+att,end-rel));g.gain.linearRampToValueAtTime(0,end);g.connect(dest);return g;}
  /* ---------- 가락 악기 ---------- */
  const INST={
    piano(m,t,dur,v,out){
      const f=hz(m),end=t+dur+1.6,lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.setValueAtTime(Math.min(9000,f*9),t);lp.frequency.setTargetAtTime(f*3,t,.4);lp.connect(out);
      const keep=Math.max(.25,1.3-(m-60)*.025);
      [[1,1,keep],[2,.42,keep*.6],[3,.2,keep*.35],[4,.1,keep*.25],[5,.05,keep*.18]].forEach(([k,a,dc],i)=>{const g=env(t,.22*v*a,.004,dc,end,lp);g.gain.setTargetAtTime(0,t+dur+.04,.11);osc(i?'sine':'triangle',f*k*(1+i*.0007),t,end,g);});
      const hammer=env(t,.05*v,.001,.012,t+.05,out);noise(t,.04,hammer);
    },
    xylo(m,t,dur,v,out){
      const f=hz(m),end=t+1.2;
      osc('sine',f,t,end,env(t,.32*v,.002,.32,end,out));
      osc('sine',f*3.98,t,t+.25,env(t,.09*v,.001,.035,t+.25,out));
      osc('sine',f*9.2,t,t+.08,env(t,.03*v,.001,.01,t+.08,out));
      const bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=Math.min(8000,f*4);bp.Q.value=2;bp.connect(out);noise(t,.03,env(t,.06*v,.001,.006,t+.03,bp));
    },
    bell(m,t,dur,v,out){const f=hz(m),end=t+2.2;osc('sine',f,t,end,env(t,.2*v,.002,.7,end,out));osc('sine',f*2.76,t,t+1,env(t,.06*v,.002,.25,t+1,out));osc('sine',f*5.4,t,t+.4,env(t,.03*v,.001,.08,t+.4,out));},
    gayageum(m,t,dur,v,out,opt){
      const f=hz(m),key=Math.round(f*10);
      if(!ksCache.has(key)){
        const sr=ctx.sampleRate,len=Math.floor(sr*2.4),buf=ctx.createBuffer(1,len,sr),d=buf.getChannelData(0);
        const N=sr/f,Ni=Math.floor(N),fr=N-Ni,line=new Float32Array(Ni+2);
        let prev=0;for(let i=0;i<line.length;i++){const r=Math.random()*2-1;prev=prev*.45+r*.55;line[i]=prev;}
        let p=0;const decay=.9965+Math.min(.0025,(60-m)*.00008);
        for(let i=0;i<len;i++){const a=line[p],b=line[(p+1)%line.length];const y=(a*(1-fr)+b*fr);d[i]=y;line[p]=decay*.5*(a+b);p=(p+1)%line.length;}
        // 몸통 울림처럼 살짝 걸러요
        ksCache.set(key,buf);
      }
      const s=ctx.createBufferSource();s.buffer=ksCache.get(key);
      const g=ctx.createGain();g.gain.setValueAtTime(.55*v,t);g.gain.setTargetAtTime(0,t+Math.max(.6,dur+.9),.25);
      const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=Math.min(7000,f*7);lp.Q.value=.7;
      s.connect(lp);lp.connect(g);g.connect(out);
      if(opt&&opt.nong&&s.detune){s.detune.setValueAtTime(0,t+.25);for(let k=0;k<8;k++)s.detune.setValueAtTime(k%2?-30:30,t+.32+k*.11);s.detune.linearRampToValueAtTime(0,t+1.3);}
      s.__t=t;track(s,t+dur+2);
    },
    flute(m,t,dur,v,out){
      const f=hz(m),end=t+dur+.25,g=ctx.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.2*v,t+.06);g.gain.setValueAtTime(.2*v,end-.2);g.gain.linearRampToValueAtTime(0,end);g.connect(out);
      const o=osc('sine',f,t,end,g);osc('sine',f*2,t,end,(()=>{const h=ctx.createGain();h.gain.value=.12;h.connect(g);return h;})());
      const lfo=ctx.createOscillator(),lg=ctx.createGain();lfo.frequency.value=5.2;lg.gain.setValueAtTime(0,t);lg.gain.linearRampToValueAtTime(f*.006,t+.35);lfo.connect(lg);lg.connect(o.frequency);lfo.__t=t;track(lfo,end);
      const bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=f*2;bp.Q.value=1.2;bp.connect(out);
      const nb=ctx.createGain();nb.gain.setValueAtTime(.025*v,t);nb.gain.setTargetAtTime(.008*v,t+.08,.1);nb.gain.setTargetAtTime(0,end-.1,.05);nb.connect(bp);noise(t,dur+.3,nb);
    },
    brass(m,t,dur,v,out){
      const f=hz(m),end=t+dur+.2,lp=ctx.createBiquadFilter();lp.type='lowpass';lp.Q.value=2;lp.frequency.setValueAtTime(f*1.2,t);lp.frequency.linearRampToValueAtTime(f*5,t+.08);lp.frequency.setTargetAtTime(f*3,t+.1,.2);lp.connect(out);
      const g=ctx.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.12*v,t+.05);g.gain.setValueAtTime(.1*v,end-.15);g.gain.linearRampToValueAtTime(0,end);g.connect(lp);
      osc('sawtooth',f,t,end,g);osc('sawtooth',f,t,end,g,8);
    },
    bowed(m,t,dur,v,out){
      const f=hz(m),end=t+dur+.3,lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=Math.min(5000,f*6);lp.connect(out);
      const g=ctx.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.08*v,t+.12);g.gain.setValueAtTime(.08*v,end-.25);g.gain.linearRampToValueAtTime(0,end);g.connect(lp);
      const o=osc('sawtooth',f,t,end,g);const lfo=ctx.createOscillator(),lg=ctx.createGain();lfo.frequency.value=5.5;lg.gain.setValueAtTime(0,t);lg.gain.linearRampToValueAtTime(f*.007,t+.3);lfo.connect(lg);lg.connect(o.frequency);lfo.__t=t;track(lfo,end);
    },
    harp(m,t,dur,v,out){pluck(m,t,dur,v,out,.9975,.3,9,.5,2.6);},
    guitar(m,t,dur,v,out){pluck(m,t,dur,v,out,.996,.5,5,.55,2);},
    uke(m,t,dur,v,out){pluck(m,t,dur,v,out,.992,.4,6,.5,1.2);},
    dulcimer(m,t,dur,v,out){pluck(m,t,dur,v,out,.9965,.15,12,.38,1.6);const f=hz(m);osc('sine',f*2,t,t+.5,env(t,.05*v,.001,.12,t+.5,out));},
    geomungo(m,t,dur,v,out){pluck(m,t,dur,v,out,.994,.65,4,.75,1.8);PERC.wood(t,v*.35,out,false);},
    haegeum(m,t,dur,v,out){
      const f=hz(m),end=t+dur+.2,bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=Math.min(4000,f*3.2);bp.Q.value=1.4;bp.connect(out);
      const g=sus(t,end,.16*v,.08,.15,bp);const o=osc('sawtooth',f*.96,t,end,g);o.frequency.linearRampToValueAtTime(f,t+.14);vib(o,t,end,f,5.8,.016,.25);
      const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=f*2;lp.connect(out);osc('sawtooth',f,t,end,sus(t,end,.03*v,.08,.15,lp));
    },
    ajaeng(m,t,dur,v,out){
      const f=hz(m),end=t+dur+.3,lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=Math.min(3000,f*5);lp.Q.value=2;lp.connect(out);
      const g=sus(t,end,.11*v,.1,.2,lp);const o=osc('sawtooth',f,t,end,g);vib(o,t,end,f,4.5,.012,.4);osc('sawtooth',f,t,end,g,12);
      const bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=f*4;bp.Q.value=3;bp.connect(out);noise(t,dur+.3,sus(t,end,.02*v,.05,.2,bp));
    },
    reed(m,t,dur,v,out,o){
      const f=hz(m),end=t+dur+.12,bright=(o&&o.bright)||1,bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=Math.min(5000,Math.max(900,f*2.2))*bright;bp.Q.value=1.1;bp.connect(out);
      const g=sus(t,end,.13*v,.03,.08,bp);const a=osc('square',f,t,end,g);const b=osc('sawtooth',f,t,end,g,6);vib(a,t,end,f,5.5,.008,.3);vib(b,t,end,f,5.5,.008,.3);
    },
    clarinet(m,t,dur,v,out){const f=hz(m),end=t+dur+.12,lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=Math.min(4000,f*4);lp.connect(out);const g=sus(t,end,.14*v,.04,.1,lp);const o=osc('square',f,t,end,g);vib(o,t,end,f,5,.004,.4);},
    harmonica(m,t,dur,v,out){const f=hz(m),end=t+dur+.1,bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=1600;bp.Q.value=.8;bp.connect(out);const g=sus(t,end,.09*v,.05,.08,bp);const o=osc('square',f,t,end,g);const lfo=ctx.createOscillator(),lg=ctx.createGain();lfo.frequency.value=6;lg.gain.value=.03*v;lfo.connect(lg);lg.connect(g.gain);lfo.__t=t;track(lfo,end);},
    horn(m,t,dur,v,out){const f=hz(m),end=t+dur+.25,lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=f*2.2;lp.connect(out);const g=sus(t,end,.16*v,.09,.2,lp);osc('sawtooth',f,t,end,g);osc('triangle',f,t,end,g,-5);},
    tuba(m,t,dur,v,out){const f=hz(m),end=t+dur+.2,lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=f*3;lp.connect(out);const g=sus(t,end,.22*v,.07,.15,lp);osc('sawtooth',f,t,end,g);osc('sine',f,t,end,g);},
    recorder(m,t,dur,v,out){const f=hz(m),end=t+dur+.08,g=sus(t,end,.17*v,.03,.06,out);osc('triangle',f,t,end,g);osc('sine',f*2,t,end,sus(t,end,.025*v,.03,.06,out));const hp=ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=f*3;hp.connect(out);noise(t,dur+.1,sus(t,end,.012*v,.02,.06,hp));},
    hun(m,t,dur,v,out){const f=hz(m),end=t+dur+.3,g=sus(t,end,.22*v,.12,.25,out);const o=osc('sine',f,t,end,g);vib(o,t,end,f,4.5,.006,.4);const bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=f*1.5;bp.Q.value=2;bp.connect(out);noise(t,dur+.3,sus(t,end,.03*v,.1,.25,bp));},
    daegeum(m,t,dur,v,out){INST.flute(m,t,dur,v,out);const f=hz(m),end=t+dur+.25,bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=f*3;bp.Q.value=4;bp.connect(out);const g=sus(t,end,.05*v,.15,.15,bp);noise(t,dur+.3,g);osc('sawtooth',f,t,end,(()=>{const h=ctx.createGain();h.gain.value=.012*v;const b2=ctx.createBiquadFilter();b2.type='bandpass';b2.frequency.value=f*4;b2.Q.value=5;h.connect(b2);b2.connect(out);return h;})());},
    sheng(m,t,dur,v,out){[0,7,12].forEach((k,i)=>{const f=hz(m+k),end=t+dur+.2,lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=f*3;lp.connect(out);osc('sawtooth',f,t,end,sus(t,end,.05*v,.12,.15,lp),i*4);});},
    stone(m,t,dur,v,out){const f=hz(m),end=t+1.4;osc('sine',f,t,end,env(t,.24*v,.001,.35,end,out));osc('sine',f*2.92,t,t+.5,env(t,.07*v,.001,.1,t+.5,out));osc('sine',f*4.8,t,t+.2,env(t,.03*v,.001,.04,t+.2,out));},
    musicbox(m,t,dur,v,out){const f=hz(m),end=t+2;osc('sine',f,t,end,env(t,.26*v,.003,.6,end,out));osc('sine',f*2,t,t+1.1,env(t,.08*v,.003,.32,t+1.1,out));osc('sine',f*3.01,t,t+.5,env(t,.025*v,.002,.12,t+.5,out));osc('sine',f*5.04,t,t+.2,env(t,.012*v,.001,.04,t+.2,out));},
    pad(m,t,dur,v,out){
      const f=hz(m),end=t+dur+.5,lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1600;lp.connect(out);
      const g=ctx.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.075*v,t+.09);g.gain.setValueAtTime(.075*v,t+dur);g.gain.linearRampToValueAtTime(0,end);g.connect(lp);
      osc('triangle',f,t,end,g,-7);osc('triangle',f,t,end,g,7);osc('sine',f/2,t,end,g);
    },
  };
  /* ---------- 타악기 ---------- */
  const PERC={
    kick(t,v,out){const o=osc('sine',150,t,t+.5,env(t,.9*v,.002,.13,t+.5,out));o.frequency.exponentialRampToValueAtTime(42,t+.25);},
    snare(t,v,out){const hp=ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=1400;hp.connect(out);noise(t,.25,env(t,.35*v,.001,.06,t+.25,hp));osc('triangle',190,t,t+.15,env(t,.3*v,.001,.04,t+.15,out));},
    hat(t,v,out){const hp=ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=7500;hp.connect(out);noise(t,.08,env(t,.18*v,.001,.018,t+.08,hp));},
    clap(t,v,out){const bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=1300;bp.Q.value=.8;bp.connect(out);[0,.012,.024].forEach((d,i)=>noise(t+d,i<2?.02:.2,env(t+d,.45*v,.001,i<2?.006:.05,t+d+(i<2?.02:.2),bp)));},
    wood(t,v,out,hi){const f=hi?1900:1450;osc('sine',f,t,t+.08,env(t,.35*v,.001,.018,t+.08,out));const bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=f*1.6;bp.Q.value=6;bp.connect(out);noise(t,.03,env(t,.12*v,.001,.006,t+.03,bp));},
    // 장구: 북편(왼손, 낮고 둥근 소리) / 채편(오른손 열채, 맑고 딱딱한 소리)
    kung(t,v,out){const o=osc('sine',118,t,t+.7,env(t,.85*v,.003,.16,t+.7,out));o.frequency.exponentialRampToValueAtTime(74,t+.3);osc('sine',236,t,t+.2,env(t,.18*v,.002,.05,t+.2,out));const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=600;lp.connect(out);noise(t,.12,env(t,.25*v,.001,.025,t+.12,lp));},
    deok(t,v,out){const bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=2600;bp.Q.value=1.1;bp.connect(out);noise(t,.14,env(t,.5*v,.0008,.028,t+.14,bp));const o=osc('triangle',420,t,t+.18,env(t,.32*v,.001,.045,t+.18,out));o.frequency.exponentialRampToValueAtTime(300,t+.12);const hp=ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=5000;hp.connect(out);noise(t,.02,env(t,.25*v,.0005,.004,t+.02,hp));},
    kkwaeng(t,v,out){[[880,1],[1240,.7],[1660,.5],[2410,.35],[3150,.2]].forEach(([f,a])=>osc('sine',f,t,t+.5,env(t,.16*v*a,.001,.09,t+.5,out)));const hp=ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=3000;hp.connect(out);noise(t,.1,env(t,.14*v,.001,.02,t+.1,hp));},
    jing(t,v,out){[[150,1],[205,.6],[278,.45],[367,.3],[512,.15]].forEach(([f,a])=>{const o=osc('sine',f,t,t+3.2,env(t,.3*v*a,.03,1.1,t+3.2,out));o.frequency.linearRampToValueAtTime(f*.985,t+2.5);});const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=500;lp.connect(out);noise(t,.15,env(t,.2*v,.005,.04,t+.15,lp));},
    cymbal(t,v,out){const hp=ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=4500;hp.connect(out);noise(t,1,env(t,.3*v,.002,.35,t+1,hp));[3200,4700,6100].forEach(f=>osc('square',f,t,t+.8,env(t,.012*v,.002,.25,t+.8,hp)));},
    triangle(t,v,out){osc('sine',2650,t,t+1.6,env(t,.13*v,.001,.6,t+1.6,out));osc('sine',6900,t,t+1,env(t,.05*v,.001,.35,t+1,out));osc('sine',4120,t,t+1.2,env(t,.04*v,.001,.4,t+1.2,out));},
    bak(t,v,out){const bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=2200;bp.Q.value=2;bp.connect(out);noise(t,.06,env(t,.9*v,.0005,.012,t+.06,bp));osc('sine',900,t,t+.07,env(t,.25*v,.001,.015,t+.07,out));},
    sogo(t,v,out){const o=osc('sine',330,t,t+.25,env(t,.5*v,.002,.06,t+.25,out));o.frequency.exponentialRampToValueAtTime(220,t+.15);const bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=1500;bp.connect(out);noise(t,.06,env(t,.2*v,.001,.015,t+.06,bp));},
    timpani(t,v,out){const o=osc('sine',98,t,t+1.4,env(t,.75*v,.003,.45,t+1.4,out));o.frequency.exponentialRampToValueAtTime(94,t+.6);osc('sine',147,t,t+.8,env(t,.2*v,.003,.25,t+.8,out));const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=900;lp.connect(out);noise(t,.1,env(t,.2*v,.001,.03,t+.1,lp));},
    castanet(t,v,out){[0,.07].forEach(d=>{const bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=3000;bp.Q.value=3;bp.connect(out);noise(t+d,.03,env(t+d,.6*v,.0005,.006,t+d+.03,bp));});},
    chuk(t,v,out){const o=osc('sine',160,t,t+.35,env(t,.6*v,.002,.08,t+.35,out));o.frequency.exponentialRampToValueAtTime(110,t+.2);const bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=700;bp.Q.value=2;bp.connect(out);noise(t,.08,env(t,.3*v,.001,.02,t+.08,bp));},
    eo(t,v,out){for(let i=0;i<9;i++)PERC.wood(t+i*.035,v*(.35+i*.04),out,i%2===0);},
    bu(t,v,out){const o=osc('sine',260,t,t+.3,env(t,.45*v,.001,.06,t+.3,out));o.frequency.exponentialRampToValueAtTime(240,t+.2);osc('sine',610,t,t+.12,env(t,.12*v,.001,.025,t+.12,out));},
    deong(t,v,out){PERC.kung(t,v,out);PERC.deok(t,v*.9,out);},
    gideok(t,v,out,dur){const g=Math.min(.09,(dur||.3)*.35);PERC.deok(t,v*.4,out);PERC.deok(t+g,v,out);},
    roll(t,v,out,dur){const n=5,step=Math.min(.05,(dur||.3)/n);for(let i=0;i<n;i++)PERC.deok(t+i*step,v*(.55+i*.1),out);},
  };
  return{
    ac,now,hz,
    ready:()=>!!ctx&&ctx.state==='running',
    setMute(m){muted=m;if(master)master.gain.setTargetAtTime(m?0:.85,ctx.currentTime,.02);},
    // 악기 소리: inst 이름, midi, 시작 시각(없으면 지금), 길이(초), 세기(0~1)
    play(inst,m,when,dur=.5,vel=.8,o={}){if(!ac())return;const t=Math.max(ctx.currentTime,when==null?ctx.currentTime:when);const pc=capture;const g=o.ch?o.ch._g():o.group;if(o.ch)capture=o.ch.set;try{INST[inst](m,t,dur,vel,bus(o.vol==null?1:o.vol,g?0:(o.rev==null?.25:o.rev),g&&g.node),o);}finally{capture=pc;}},
    hit(name,when,vel=.8,o={}){if(!ac())return;const t=Math.max(ctx.currentTime,when==null?ctx.currentTime:when);const pc=capture;const g=o.ch?o.ch._g():o.group;if(o.ch)capture=o.ch.set;try{PERC[name](t,vel,bus(o.vol==null?1:o.vol,g?0:(o.rev==null?.12:o.rev),g&&g.node),o.hi||o.dur);}finally{capture=pc;}},
    // 멈출 수 있는 소리 묶음: 새 문제가 나오면 이전 소리를 부드럽게 줄이며 멈춰요
    channel(){
      const C={set:new Set(),g:null,
        _g(){if(!C.g){const n=ctx.createGain();n.gain.value=1;n.connect(dry);const sd=ctx.createGain();sd.gain.value=.22;n.connect(sd);sd.connect(wet);C.g={node:n};}return C.g;},
        stop(fade=.15){if(!ctx||!C.g)return;const n=C.g.node,set=C.set;n.gain.setTargetAtTime(0,ctx.currentTime,fade/3);C.g=null;C.set=new Set();setTimeout(()=>{set.forEach(x=>{try{x.stop();}catch(e){}});try{n.disconnect();}catch(e){}},fade*1000+120);}};
      return C;
    },
    chord(inst,ms,when,dur,vel,o){ms.forEach((m,i)=>this.play(inst,m,when==null?null:when+(o&&o.strum?i*o.strum:0),dur,vel,o));},
    // 소리 크기를 실시간으로 바꿀 수 있는 묶음 (지휘용)
    group(level=1){if(!ac())return null;const g=ctx.createGain();g.gain.value=level;g.connect(dry);const sd=ctx.createGain();sd.gain.value=.18;g.connect(sd);sd.connect(wet);return{node:g,set(v,tc=.06){g.gain.setTargetAtTime(Math.max(0.0001,v),ctx.currentTime,tc);},ramp(v,at){g.gain.linearRampToValueAtTime(v,at);}};},
    stopAll(){live.forEach(n=>{try{n.stop();}catch(e){}});live.clear();},
    // 음표·쉼표 그림 (SVG 문자열). kind: w h hd q dq e s / wr hr qr er
    noteSVG(kind,x,y,sz,cls=''){
      const r=sz*.21,st=sz*.95,hx=r*1.12;
      const head=f=>`<ellipse cx="${x}" cy="${y}" rx="${r*1.25}" ry="${r*.95}" transform="rotate(-22 ${x} ${y})" class="${f?'hf':'ho'}"/>`;
      const stem=`<line x1="${x+hx}" y1="${y-2}" x2="${x+hx}" y2="${y-st}" class="stem"/>`;
      const flag=k=>`<path d="M${x+hx} ${y-st+k*st*.24} q${r*1.7} ${st*.25} ${r*1.25} ${st*.62}" class="flag"/>`;
      const dot=`<circle cx="${x+r*2.3}" cy="${y-r*.2}" r="${r*.34}" class="dot"/>`;
      const m={w:head(0),h:head(0)+stem,hd:head(0)+stem+dot,q:head(1)+stem,dq:head(1)+stem+dot,e:head(1)+stem+flag(0),s:head(1)+stem+flag(0)+flag(1),
        wr:`<rect x="${x-r*1.3}" y="${y-sz*.32}" width="${r*2.6}" height="${r*.9}" class="restf"/><line x1="${x-r*2}" x2="${x+r*2}" y1="${y-sz*.32}" y2="${y-sz*.32}" class="restl"/>`,
        hr:`<rect x="${x-r*1.3}" y="${y-sz*.12-r*.9}" width="${r*2.6}" height="${r*.9}" class="restf"/><line x1="${x-r*2}" x2="${x+r*2}" y1="${y-sz*.12}" y2="${y-sz*.12}" class="restl"/>`,
        qr:`<path d="M${x-r*.4} ${y-st*.7} l${r*1} ${r*1.3} l-${r*1} ${r*1.2} l${r*1} ${r*1.3} q-${r*1.5} -${r*.5} -${r*.3} ${r*1.7}" class="rest"/>`,
        er:`<circle cx="${x-r*.3}" cy="${y-r*1.4}" r="${r*.5}" class="restf"/><path d="M${x-r*.3} ${y-r*1.2} q${r*1} ${r*.3} ${r*1.3} -${r*.55} l-${r*1} ${r*3}" class="rest"/>`};
      return `<g class="${cls}">${m[kind]||''}</g>`;
    },
    // 높은음자리표 (y = 솔 줄 위치, g = 줄 간격)
    clefSVG(x,y,g,cls='clef'){const s=g*.062;return `<path class="${cls}" transform="translate(${x} ${y-g*.35}) scale(${s})" d="M3 -52 C 14 -40 16 -26 2 -14 C -14 -2 -16 12 -6 20 C 4 28 20 24 22 12 C 24 0 12 -6 4 -2 C -4 2 -4 12 4 14 M 3 -52 C -6 -44 -6 -32 -2 -20 L 8 44 C 9 54 0 58 -6 54 C -11 50 -8 42 -2 44" fill="none" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`;},
    DUR:{w:4,h:2,hd:3,q:1,dq:1.5,e:.5,s:.25,wr:4,hr:2,qr:1,er:.5},
    KNAME:{w:'온음표',h:'2분음표',hd:'점2분음표',q:'4분음표',dq:'점4분음표',e:'8분음표',s:'16분음표',wr:'온쉼표',hr:'2분쉼표',qr:'4분쉼표',er:'8분쉼표'},
    // 음 이름 (고정도: C=도)
    SOL:['도','도#','레','레#','미','파','파#','솔','솔#','라','라#','시'],
    solfa(m){return this.SOL[((m%12)+12)%12];},
    /* ---------- 함께 듣는 문제(라운드) ----------
       한 화면 대결에서는 첫 번째 칸이 진행자가 되어 소리를 한 번만 내고, 모든 칸에 문제를 동시에 보여 줘요. */
    rounds(opt,inst,cfg){
      const S=opt.shared;S.list=S.list||[];S.list.push(inst);
      const leader=opt.idx===0;
      const R={
        start(){if(!leader)return;S.stopped=false;S.n=0;setTimeout(()=>R.next(),300);},
        stop(){S.stopped=true;clearTimeout(S.t1);clearTimeout(S.t2);clearInterval(S.iv);},
        next(){
          if(S.stopped)return;
          S.n++;S.q=cfg.make(opt.rng,S.n);if(!S.q){S.stopped=true;cfg.onEnd&&cfg.onEnd();return;}S.done=new Set();S.revealed=false;
          S.list.forEach(i=>i.show(S.q));
          const len=cfg.play?cfg.play(S.q)||0:0;
          S.ansT0=performance.now()+len*1000*(cfg.waitPlay?1:0);
          S.list.forEach(i=>i.open&&i.open(S.q,len));
          clearTimeout(S.t1);S.t1=setTimeout(()=>R.timeout(),(len*(cfg.waitPlay?1:0)+cfg.time)*1000);
        },
        replay(){if(S.stopped||S.revealed||!cfg.play)return;cfg.play(S.q);},
        done(idx){
          if(S.revealed)return;S.done.add(idx);
          if(S.done.size>=S.list.filter(x=>!x.isOut).length){clearTimeout(S.t1);S.t2=setTimeout(()=>R.reveal(),cfg.afterAll||700);}
        },
        timeout(){if(S.revealed||S.stopped)return;S.list.forEach((x,i)=>{if(!S.done.has(x.idx))x.timeout&&x.timeout(S.q);});R.reveal();},
        reveal(){if(S.revealed||S.stopped)return;S.revealed=true;S.list.forEach(x=>x.reveal&&x.reveal(S.q));if(cfg.onReveal)cfg.onReveal(S.q);S.t2=setTimeout(()=>R.next(),cfg.gap||1800);},
        elapsed(){return Math.max(0,(performance.now()-S.ansT0)/1000);},
        get q(){return S.q;},
        isLeader:leader,
      };
      return R;
    },
  };
})();
window.MUS=MUS;
