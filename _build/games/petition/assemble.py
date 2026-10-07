import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+'/../../common')
import social
social.build(os.path.dirname(os.path.abspath(__file__)),'petition',extra={'/*@@SETS@@*/':'const DECKS='})
