import re,sys
U='/root/.claude/uploads/468d8a32-314f-509d-a8d2-96719987af43/'
def load(fid):
    src=open(U+fid+'-index.html',encoding='utf8').read().split('\n')
    n=max(i for i,l in enumerate(src) if l.strip()=='<script>')
    return '\n'.join(src[n+1:])
def between(code,a,b):
    i=code.index(a);j=code.index(b,i);return code[i:j]
def head(code,title1,txt,levelTitle,title2=None):
    """const GAME={ 부터 첫 메서드 직전까지 (id·title·howto·levels·summary) + 새 필드"""
    h=between(code,'const GAME={','\n  init(p)')
    m=re.search(r"title:'([^']*)',emoji:'[^']*',",h);t=m.group(1)
    h=h.replace(m.group(0),f"title:'{t}',title1:'{title1}',title2:'{title2 or t}',emoji:LOGO,")
    h=re.sub(r"\n  theme:\{[^}]*\},","\n  theme:{c1:'#e8541a',c2:'#2563eb'},hero:heroScene,vignette:.05,durs:[60,90,120],levelTitle:'"+levelTitle+"',\n  txt:"+txt+",",h,1)
    return h

def load_game(fid):
    src=open(U+fid+'-index.html',encoding='utf8').read()
    i=src.index('const GAME={');a=src.rfind('<script>',0,i);b=src.index('</script>',i)
    return src[a+8:b]
