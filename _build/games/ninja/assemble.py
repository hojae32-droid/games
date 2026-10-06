import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+'/../../common')
from exthead import *
d=os.path.dirname(os.path.abspath(__file__))
code=load('a0608092')
m=open(d+'/main.js',encoding='utf8').read()
m=m.replace('/*@@DATA@@*/',between(code,'const MATS={','const GAME={').rstrip('\n'))
m=m.replace('/*@@HEAD@@*/',head(code,'쓱싹 베어라!',"{who:'누가 닌자가 될까요?',dur:'수련 시간',pace:'날아오는 속도',seat:'번 닌자 ',go:'수련 시작!',s1:'1. 수련',s2:'2. 방법',s3:'3. 이름'}",'어떤 수련을 할까요?','물질 닌자'))
open(d+'/game_a.js','w',encoding='utf8').write(m)
