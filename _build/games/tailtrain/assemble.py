import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+'/../../common')
import social
D=os.path.dirname(os.path.abspath(__file__))
src=social.script1('train')
m=open(D+'/main.js',encoding='utf8').read().replace('/*@@DECKS@@*/',social.decks(src)).replace('/*@@CATS@@*/',social.literal(src,'const CATS='))
C=D+'/../../common/'
m=open(C+'quizkit.js',encoding='utf8').read()+'\n'+open(C+'qz.js',encoding='utf8').read()+'\n'+m
open(D+'/game_a.js','w',encoding='utf8').write(m)
