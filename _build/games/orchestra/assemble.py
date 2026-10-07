import os,sys
D=os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0,D+'/../../common')
import social,assemble_music
os.environ['ZDIR']='/tmp/claude-0/-home-user-games/468d8a32-314f-509d-a8d2-96719987af43/scratchpad/zipm/'
social.Z=os.environ['ZDIR']
src=social.script1('orchestra')
m=open(D+'/main.js',encoding='utf8').read()
for k,mk in {'/*@@SEC@@*/':'const SEC=','/*@@ITEMS@@*/':'const ITEMS=','/*@@HINT@@*/':'const HINT=','/*@@VO@@*/':'const VO='}.items():
    m=m.replace(k,social.literal(src,mk))
open(D+'/main_x.js','w',encoding='utf8').write(m)
import shutil
shutil.copy(D+'/main.js',D+'/main_src.js');shutil.copy(D+'/main_x.js',D+'/main.js')
assemble_music.build(D)
shutil.copy(D+'/main_src.js',D+'/main.js')
