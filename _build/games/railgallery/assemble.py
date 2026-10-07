import os,sys,shutil
D=os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0,D+'/../../common')
import assemble_plain
src=open(D+'/../../zipart/techniques/index.html',encoding='utf8').read()
a=src.index('    const SET=');b=src.index('    function artURL')
data=src[a:b].replace('}[deck];','};',1)
m=open(D+'/main.js',encoding='utf8').read()
shutil.copy(D+'/main.js',D+'/main_src.js')
open(D+'/main.js','w',encoding='utf8').write(m.replace('/*@@DATA@@*/',data))
try:
    assemble_plain.build(D,('gk.js',))
finally:
    shutil.copy(D+'/main_src.js',D+'/main.js')
