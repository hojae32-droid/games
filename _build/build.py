import re,sys,json,colorsys
U='/root/.claude/uploads/468d8a32-314f-509d-a8d2-96719987af43/'
C='common/'
gd=sys.argv[1];out=sys.argv[2]
cfg=json.load(open(gd+'/theme.json',encoding='utf8'))
if cfg.get('skin'):
    sk=open(C+'skins/'+cfg['skin']+'.css',encoding='utf8').read()
    a,b=sk.split('/*==EXTRA==*/') if '/*==EXTRA==*/' in sk else (sk,'')
    imp=''.join(re.findall(r'@import[^;]+;\n?',a));a=a.replace(imp,'')
    pv=cfg.get('players',['#4da3ff','#ff5c7a','#3fe08a','#c08bff']);a+=':root{'+''.join(f'--p{i+1}:{c};' for i,c in enumerate(pv))+'}\n'
    css=imp+a+open(C+'structure.css',encoding='utf8').read()+(open(C+'full.css',encoding='utf8').read() if cfg.get('full') else '')+b
else:
    css=open(C+cfg.get('css','head.css'),encoding='utf8').read()
eng=open(C+'engine_body.js',encoding='utf8').read()
net=open(C+'net_body.js',encoding='utf8').read()
setup=open(C+('wiz.js' if cfg.get('full') else 'setup_new.js'),encoding='utf8').read()
game=''.join(open(f'{gd}/game_{x}.js',encoding='utf8').read()+'\n' for x in cfg['parts'])
if cfg.get('emoji_src'):
    emo=open(U+cfg['emoji_src'],encoding='utf8').read().split('\n')[cfg.get('emoji_line',280)].rstrip()
else:
    emo=open(C+'emoji_line.js',encoding='utf8').read().rstrip()
ref=open(U+'2e6cf02a-index.html',encoding='utf8').read().split('\n')[349]
for k in ['❌','⭕']:
    m=re.search(r'"'+k+r'": "(data:image[^"]+)"',ref)
    if m and ('"'+k+'"') not in emo:
        assert emo.endswith('};'),emo[-20:]
        emo=emo[:-2]+',"'+k+'": "'+m.group(1)+'"};'
def rep(s,a,b,cnt=1):
    assert s.count(a)==cnt,(a[:60],s.count(a))
    return s.replace(a,b)
# 색 바꾸기
def recolor(s,rules):
    def f(m):
        h=m.group(1);a=h[6:] if len(h)==8 else ''
        r,g,b=[int(h[i:i+2],16)/255 for i in (0,2,4)]
        hh,l,ss=colorsys.rgb_to_hls(r,g,b);deg=hh*360
        for lo,hi,dh,smin in rules:
            if lo<=deg<=hi and ss>=smin:
                deg=(deg+dh)%360;break
        r,g,b=colorsys.hls_to_rgb(deg/360,l,ss)
        return '#%02x%02x%02x%s'%(round(r*255),round(g*255),round(b*255),a)
    return re.sub(r'#([0-9a-fA-F]{8}|[0-9a-fA-F]{6})\b',f,s)
if cfg.get('recolor'):css=recolor(css,cfg['recolor'])
for a,b in cfg.get('css_replace',[]):css=css.replace(a,b)
css+=cfg.get('extra_css','')
fd=cfg.get('font','Do Hyeon');ff=cfg.get('font_from','Do Hyeon')
if fd!=ff:
    css=css.replace('family='+ff.replace(' ','+'),'family='+fd.replace(' ','+')).replace("'"+ff+"'","'"+fd+"'")
# 엔진
if cfg.get('font_prefix'):eng=rep(eng,"font:(s,f)=>`${Math.max(6,Math.round(s))}px","font:(s,f)=>`"+cfg['font_prefix']+"${Math.max(6,Math.round(s))}px")
eng=rep(eng,'''${f||"Jua"},"Gowun Dodum",sans-serif''','''${f||"%s"},"DH-fb","Noto Sans CJK KR",sans-serif'''%fd)
i=eng.index('  buildSetup(){');j=eng.index("W.appendChild(h('div','maker','제작 : 비춤이샘'));\n  },",i)+len("W.appendChild(h('div','maker','제작 : 비춤이샘'));\n  },")
eng=eng[:i]+setup.rstrip('\n')+eng[j:]
eng=rep(eng,"show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('on',s.id===id));},",
 "show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('on',s.id===id));if(this.hero){if(id==='setup')this.hero.start();else this.hero.stop();}},")
eng=rep(eng,"document.fonts.load('30px Jua')","Promise.all([document.fonts.load('30px \"%s\"'),document.fonts.load('30px \"DH-fb\"')])"%fd)
pc=cfg.get('players',['#4da3ff','#ff5c7a','#3fe08a','#c08bff'])
old="const PHEX=['#2f6fed','#e5484d','#12a150','#a35ae6'];"
eng=rep(eng,old,"const PHEX=%s;"%json.dumps(pc));net=rep(net,old,"const PHEX=%s;"%json.dumps(pc))

if cfg.get('full'):
    eng=rep(eng,"'use strict';\n","'use strict';\nconst FULL=document.body.classList.contains('G-full');\n")
    eng=rep(eng,"Snd,K,h,J,","Snd,K,h,J,pace:(cfg.pace||1),")
    eng=rep(eng,"const P=$('#play');P.innerHTML='';","const P=$('#play');P.innerHTML='';P.classList.toggle('solo',n===1);")
    eng=rep(eng,"for(let i=0;i<n;i++)this.players.push(this.makePlayer(i,n,seed,arena));","for(let i=0;i<n;i++)this.players.push(this.makePlayer(i,n,seed,arena));\n    if(FULL&&n===1)bar.insertBefore(this.players[0].head,bar.querySelector('.ptitle').nextSibling);")
    eng=rep(eng,"p.u=Math.min(W,H*.8)/10;","p.u=FULL?Math.min(W,H*.58)/10:Math.min(W,H*.8)/10;")
    eng=rep(eng,"    for(const p of this.players){\n      if(!p.inited){p.inited=true;}","    for(const p of this.players){\n      if(FULL)this.zone(p);\n      if(!p.inited){p.inited=true;}")
    eng=rep(eng,"  loop(now){","""  zone(p){const f=(p._zf=(p._zf||0)+1);if(p.top!=null&&f%8!==1)return;const w=p.wrap.getBoundingClientRect(),q=p.qbox.getBoundingClientRect(),c=p.ctrl.getBoundingClientRect(),qs=getComputedStyle(p.qbox);
    let top=(q.height>4&&qs.display!=='none')?q.bottom-w.top+8:Math.round(parseFloat(qs.top)||56)+8;const bot=(p.ctrl.children.length&&c.height>4)?Math.max(0,w.bottom-c.top+6):0;
    top=Math.max(0,Math.round(top));p.top=top;const tb=this.G.tipBot?Math.round(this.G.tipBot(p)):Math.round(bot);
    if(top!==p._t2||Math.round(bot)!==p.bot||tb!==p._tb){p._t2=top;p.bot=Math.round(bot);p._tb=tb;p.panel.style.setProperty('--bot',tb+'px');p.panel.style.setProperty('--qh',Math.max(0,Math.round(q.height))+'px');}},
  tabify(){const W=document.querySelector('#result .res-wrap');if(!W||W.classList.contains('tabbed')||Net.on||Net.final)return;
    const kids=[...W.children];const revs=kids.filter(k=>k.classList.contains('review'));const btns=kids.find(k=>k.classList.contains('res-btns'));
    const names=['🏆 결과','📝 다시 보기','📚 꼭 알기'];const panes=[h('div','res-pane'),h('div','res-pane scroll'),h('div','res-pane scroll')];
    kids.forEach(k=>{if(k===btns||k.classList.contains('maker'))return;if(k===revs[0]&&revs.length>1)panes[1].appendChild(k);else if(k.classList.contains('review'))panes[revs.length>1?2:1].appendChild(k);else panes[0].appendChild(k);});
    const use=panes.map((p,i)=>({p,i})).filter(x=>x.p.children.length);const tabs=h('div','res-tabs');
    const sel=j=>use.forEach((x,k)=>{x.p.classList.toggle('on',k===j);x.t.classList.toggle('on',k===j);});
    use.forEach((x,k)=>{x.t=h('button','res-tab'+(k?'':' on'),names[x.i]);x.t.type='button';x.t.onclick=()=>{Snd.tap();sel(k);};tabs.appendChild(x.t);});
    W.innerHTML='';W.classList.add('tabbed');W.appendChild(tabs);use.forEach(x=>W.appendChild(x.p));if(btns)W.appendChild(btns);sel(0);},
  loop(now){""")
    eng=rep(eng,"if(this.hero){if(id==='setup')this.hero.start();else this.hero.stop();}},","if(this.hero){if(id==='setup')this.hero.start();else this.hero.stop();}if(FULL&&id==='result')this.tabify();},")
    net=rep(net,"pickSet(cfg){return{level:cfg.level,count:cfg.count,dur:cfg.dur};},","pickSet(cfg){return{level:cfg.level,count:cfg.count,dur:cfg.dur,pace:cfg.pace};},")
    net=rep(net,"if(msg.set.dur)c.dur=msg.set.dur;","if(msg.set.dur)c.dur=msg.set.dur;if(msg.set.pace)c.pace=msg.set.pace;")

html=f'''<!doctype html>
<html lang="ko">
<head>
<script src="https://cdn.jsdelivr.net/npm/peerjs@1.5.5/dist/peerjs.min.js"></script>
<meta charset="utf-8">
<meta name="theme-color" content="{cfg['themeColor']}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no{",viewport-fit=cover" if cfg.get("full") else ""}">
<title>{cfg['title']} | 비춤이샘 수업용 게임</title>
<style>
{css}
</style>
</head>
<body class="{('G-full ' if cfg.get('full') else '')+cfg.get('layout','')}">
<div id="setup" class="screen"></div>
<div id="play" class="screen"></div>
<div id="result" class="screen"></div>
<script>
{emo}
</script>
<script>
{eng}
</script>
<script>
{net}
</script>
<script>
{game}
</script>
</body>
</html>
'''
open(out,'w',encoding='utf8').write(html)
print(out,len(html))
