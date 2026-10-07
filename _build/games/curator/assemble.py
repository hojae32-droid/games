import os,sys,re
D=os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0,D+'/../../common')
import assemble_plain
src=open(D+'/../../zipart/principles/index.html',encoding='utf8').read()
a=src.index('    const PALS=');b=src.index('    const SET=')
data=src[a:b]
m=open(D+'/main.js',encoding='utf8').read().replace('/*@@DATA@@*/',data)
open(D+'/main_built.js','w',encoding='utf8').write(m)
import shutil
shutil.copy(D+'/main.js',D+'/main_src.js')
shutil.copy(D+'/main_built.js',D+'/main.js')
try:
    assemble_plain.build(D,('gk.js',))
finally:
    shutil.copy(D+'/main_src.js',D+'/main.js')
