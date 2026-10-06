import os
d=os.path.dirname(os.path.abspath(__file__))
open(d+'/game_a.js','w',encoding='utf8').write(open(d+'/main.js',encoding='utf8').read())
