import re,sys,json,colorsys
U='/root/.claude/uploads/468d8a32-314f-509d-a8d2-96719987af43/'
C='common/'
gd=sys.argv[1];out=sys.argv[2]
cfg=json.load(open(gd+'/theme.json',encoding='utf8'))
css=open(C+cfg.get('css','head.css'),encoding='utf8').read()
eng=open(C+'engine_body.js',encoding='utf8').read()
net=open(C+'net_body.js',encoding='utf8').read()
setup=open(C+'setup_new.js',encoding='utf8').read()
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
eng=rep(eng,'''${f||"Jua"},"Gowun Dodum",sans-serif''','''${f||"%s"},"DH-fb","Noto Sans CJK KR",sans-serif'''%fd)
i=eng.index('  buildSetup(){');j=eng.index("W.appendChild(h('div','maker','제작 : 비춤이샘'));\n  },",i)+len("W.appendChild(h('div','maker','제작 : 비춤이샘'));\n  },")
eng=eng[:i]+setup.rstrip('\n')+eng[j:]
eng=rep(eng,"show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('on',s.id===id));},",
 "show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('on',s.id===id));if(this.hero){if(id==='setup')this.hero.start();else this.hero.stop();}},")
eng=rep(eng,"document.fonts.load('30px Jua')","Promise.all([document.fonts.load('30px \"%s\"'),document.fonts.load('30px \"DH-fb\"')])"%fd)
pc=cfg.get('players',['#4da3ff','#ff5c7a','#3fe08a','#c08bff'])
old="const PHEX=['#2f6fed','#e5484d','#12a150','#a35ae6'];"
eng=rep(eng,old,"const PHEX=%s;"%json.dumps(pc));net=rep(net,old,"const PHEX=%s;"%json.dumps(pc))
html=f'''<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="theme-color" content="{cfg['themeColor']}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>{cfg['title']} | 비춤이샘 수업용 게임</title>
<style>
{css}
</style>
</head>
<body>
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
