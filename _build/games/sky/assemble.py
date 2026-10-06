import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+'/../../common')
from exthead import *
d=os.path.dirname(os.path.abspath(__file__))
code=load('1200e033')
m=open(d+'/main.js',encoding='utf8').read()
m=m.replace('/*@@DATA@@*/',between(code,'const MOONS=','const GAME={').rstrip('\n'))
m=m.replace('/*@@HEAD@@*/',head(code,'별 보러 가자!',"{who:'누가 탐험대원이 될까요?',dur:'탐험 시간',pace:'한 문제 시간',seat:'번 탐험대원 ',go:'탐험 출발!',s1:'1. 하늘',s2:'2. 방법',s3:'3. 이름'}",'무엇을 관찰할까요?','밤하늘 탐험대'))
open(d+'/game_a.js','w',encoding='utf8').write(m)
