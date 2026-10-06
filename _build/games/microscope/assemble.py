import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+'/../../common')
from exthead import *
d=os.path.dirname(os.path.abspath(__file__))
code=load('c9bc7566')
m=open(d+'/main.js',encoding='utf8').read()
m=m.replace('/*@@DATA@@*/',between(code,'const MIC={','const GAME={').rstrip('\n'))
m=m.replace('/*@@HEAD@@*/',head(code,'수상한 미생물',"{who:'누가 탐정이 될까요?',dur:'수사 시간',pace:'한 문제 시간',seat:'번 탐정 ',go:'수사 시작!',s1:'1. 사건',s2:'2. 방법',s3:'3. 이름'}",'어떤 사건을 수사할까요?','현미경 탐정'))
open(d+'/game_a.js','w',encoding='utf8').write(m)
