import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+'/../../common')
from exthead import *
d=os.path.dirname(os.path.abspath(__file__))
code=load('886ab7ff')
m=open(d+'/main.js',encoding='utf8').read()
m=m.replace('/*@@DATA@@*/',between(code,'const W_STATE=','const GAME={').rstrip('\n'))
m=m.replace('/*@@HEAD@@*/',head(code,'변신! 변신!',"{who:'누가 달릴까요?',dur:'달리기 시간',pace:'달리는 속도',seat:'번 물방울 ',go:'출발!',s1:'1. 코스',s2:'2. 방법',s3:'3. 이름'}",'어떤 코스를 달릴까요?','물방울 변신 러너'))
open(d+'/game_a.js','w',encoding='utf8').write(m)
