import os
d=os.path.dirname(os.path.abspath(__file__))
m=open(d+'/main.js',encoding='utf8').read().replace('/*@@DATA@@*/',open(d+'/data.js',encoding='utf8').read().rstrip('\n')).replace('/*@@SUMMARY@@*/',open(d+'/summary.js',encoding='utf8').read().rstrip('\n'))
open(d+'/game_a.js','w',encoding='utf8').write(m)
