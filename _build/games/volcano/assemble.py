import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+'/../../common')
from exthead import *
d=os.path.dirname(os.path.abspath(__file__))
code=load('f97d595d')
m=open(d+'/main.js',encoding='utf8').read()
m=m.replace('/*@@DATA@@*/',between(code,'const LAND_Q={','const GAME={').rstrip('\n'))
m=m.replace('/*@@HEAD@@*/',head(code,'쾅! 용암이 부글부글',"{who:'누가 명사수가 될까요?',dur:'사냥 시간',pace:'과녁 움직임',seat:'번 명사수 ',go:'발사 준비!',s1:'1. 지역',s2:'2. 방법',s3:'3. 이름'}",'어디를 탐사할까요?','화산 돌 새총'))
open(d+'/game_a.js','w',encoding='utf8').write(m)
