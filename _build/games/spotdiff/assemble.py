import os,sys,shutil
D=os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0,D+'/../../common')
import assemble_plain
src=open(D+'/../../zipart/spot-diff/index.html',encoding='utf8').read()
a=src.index('    const THEMES=');b=src.index('    root.innerHTML')
data=src[a:b]
m=open(D+'/main.js',encoding='utf8').read()
shutil.copy(D+'/main.js',D+'/main_src.js')
open(D+'/main.js','w',encoding='utf8').write(m.replace('/*@@DATA@@*/',data))
try:
    assemble_plain.build(D,('gk.js',))
finally:
    shutil.copy(D+'/main_src.js',D+'/main.js')
