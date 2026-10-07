import os,sys,json
D=os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0,D+'/../../common')
import social
social.build(D,'globe',extra={'/*@@CONT@@*/':'const CONT=','/*@@L@@*/':'const L=','/*@@KO@@*/':'const KO=','/*@@ASK@@*/':'const ASK=','/*@@OCEAN@@*/':'const OCEAN='})
w=json.load(open(D+'/world.json'))
w['objects']={'countries':w['objects']['countries']}
s=open(D+'/game_a.js',encoding='utf8').read().replace('/*@@WORLD@@*/',json.dumps(w,separators=(',',':'),ensure_ascii=False))
open(D+'/game_a.js','w',encoding='utf8').write(s)
