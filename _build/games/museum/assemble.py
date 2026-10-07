import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+'/../../common')
import social
D=os.path.dirname(os.path.abspath(__file__))
src=social.script1('museum')
lit=social.literal(src,'const DATA=')
# DATA 는 {treasure:[...],world:[...],living:[...]}[deck] 형태라 객체만 따로 가져와요
import re
m=open(D+'/main.js',encoding='utf8').read().replace('/*@@DATA@@*/',lit).replace('/*@@DECKS@@*/',social.decks(src))
C=D+'/../../common/'
m=open(C+'quizkit.js',encoding='utf8').read()+'\n'+open(C+'qz.js',encoding='utf8').read()+'\n'+m
open(D+'/game_a.js','w',encoding='utf8').write(m)
