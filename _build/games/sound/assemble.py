import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+'/../../common')
from exthead import *
d=os.path.dirname(os.path.abspath(__file__))
code=load('f9d36ee0')
m=open(d+'/main.js',encoding='utf8').read()
m=m.replace('/*@@DATA@@*/',between(code,'const SND_SET={','const GAME={').rstrip('\n'))
m=m.replace('/*@@HEAD@@*/',head(code,'두근두근 라이브!',"{who:'누가 연주할까요?',dur:'공연 시간',pace:'음표 속도',seat:'번 연주자 ',go:'공연 시작!',s1:'1. 곡',s2:'2. 방법',s3:'3. 이름'}",'어떤 곡을 연주할까요?','소리 리듬 탭'))
open(d+'/game_a.js','w',encoding='utf8').write(m)
