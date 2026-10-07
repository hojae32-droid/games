import os,sys,shutil
D=os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0,D+'/../../common')
import social,assemble_music
social.Z='/tmp/claude-0/-home-user-games/468d8a32-314f-509d-a8d2-96719987af43/scratchpad/zipm/'
src=social.script1('maestro')
pre=src[src.index('const MX_NOTE='):src.index('const GAME=')]
# MX_SONGS 이하 함수들
for k,mk in {'/*@@MEL@@*/':'const MEL=','/*@@BASS@@*/':'const BASS=','/*@@DYN@@*/':'const DYN=','/*@@TEMPO@@*/':'const TEMPO='}.items():pass
m=open(D+'/main.js',encoding='utf8').read().replace('/*@@PRE@@*/',pre)
for k,mk in {'/*@@MEL@@*/':'const MEL=','/*@@BASS@@*/':'const BASS=','/*@@DYN@@*/':'const DYN=','/*@@TEMPO@@*/':'const TEMPO='}.items():
    m=m.replace(k,social.literal(src,mk))
shutil.copy(D+'/main.js',D+'/main_src.js');open(D+'/main.js','w',encoding='utf8').write(m)
assemble_music.build(D)
shutil.copy(D+'/main_src.js',D+'/main.js')
