import os,sys,shutil
D=os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0,D+'/../../common')
import social,assemble_music
social.Z='/tmp/claude-0/-home-user-games/468d8a32-314f-509d-a8d2-96719987af43/scratchpad/zipm/'
src=social.script1('gayageum')
pre=src[src.index('function gyParse'):src.index('const GY_SONGS')]
m=open(D+'/main.js',encoding='utf8').read().replace('/*@@PARSE@@*/',pre)
for k,mk in {'/*@@YUL@@*/':'const GY_YUL=','/*@@HAN@@*/':'const GY_HAN=','/*@@KO@@*/':'const GY_KO=','/*@@SONGS@@*/':'const GY_SONGS='}.items():
    m=m.replace(k,social.literal(src,mk))
shutil.copy(D+'/main.js',D+'/main_src.js');open(D+'/main.js','w',encoding='utf8').write(m)
assemble_music.build(D)
shutil.copy(D+'/main_src.js',D+'/main.js')
