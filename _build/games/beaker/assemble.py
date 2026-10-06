import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+'/../../common')
from exthead import *
d=os.path.dirname(os.path.abspath(__file__))
code=load('66fc66f2')
m=open(d+'/main.js',encoding='utf8').read()
m=m.replace('/*@@DATA@@*/',between(code,'const SOL={','const GAME={').rstrip('\n'))
m=m.replace('/*@@HEAD@@*/',head(code,'주르륵 떨어진다!',"{who:'누가 실험할까요?',dur:'실험 시간',pace:'떨어지는 속도',seat:'번 연구원 ',go:'실험 시작!',s1:'1. 실험',s2:'2. 방법',s3:'3. 이름'}",'어떤 실험을 할까요?','비커 받기 대작전'))
open(d+'/game_a.js','w',encoding='utf8').write(m)
