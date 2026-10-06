# 5개 새 스킨 생성: python3 genskins.py  (결과는 skins/*.css)
def skin(name,disp,sans,imports,P,extra):
    d=dict(
     page=P['page'],ink=P['ink'],sub=P['sub'],focus=P.get('focus','#ffb703'),bw=P.get('bw','2px'),line=P['line'],rad=P.get('rad','18px'),**{'rad-s':P.get('rads','12px')},
     card=P['card'],**{'card-ink':P['cardInk']},hl=P['hl'],
     **{'sh-card':P['shCard'],'sh-btn':P['shBtn'],'sh-btn-down':P.get('shDown','0 1px 0 rgba(0,0,0,.2)'),'sh-go':P['shGo']},
     **{'btn-bg':P['card'],'btn-ink':P['cardInk']},stage=P['stage'],
     **{'tag-bg':P['tagBg'],'tag-ink':P['tagInk']},title=P.get('title','#fff'),title1=P.get('title1','#fff'),title2=P.get('title2','#fff'),
     **{'lamp-r':P.get('lampR','50%'),'lamp-bg':P['chipBg'],'lamp-ink':P['cardInk'],'lamp-on':P.get('ok','#2fbf71')},bad=P.get('bad','#e5383b'),
     **{'chip-bg':P['chipBg'],'chip-ink':P['cardInk'],'chip-line':P['chipLine'],'chip-sub':P['sub2'],'sel-bg':P['acc'],'sel-ink':P.get('accInk','#fff'),'sel-line':P['accLine'],'sel-sub':P.get('accSub','#fff')},
     **{'input-bg':'#fff','input-ink':P.get('dInk',P['cardInk']),'input-ph':P.get('ph','#9aa')},
     **{'go-bg':P['go'],'go-ink':P.get('goInk','#fff')},
     **{'bar-bg':P['hud'],'bar-ink':'#fff','bar-sub':'#ddd'},
     **{'clock-bg':'#fff','clock-ring':P['acc'],'clock-track':P.get('track','#ddd'),'clock-ink':P.get('dInk',P['cardInk'])},
     arena=P['hud'],gap='3px',
     **{'phead-ink':'#fff','no-r':P.get('noR','50%'),'sc-bg':'#fff','sc-ink':P.get('dInk',P['cardInk']),'sc-sub':P['sub2'],'sc-r':P.get('scR','999px')},
     **{'prog-bg':'rgba(255,255,255,.25)','prog-fill':P['prog']},
     **{'q-bg':P['qbg'],'q-ink':P['qink'],'q-hl':P.get('qhl',P['hl']),'q-sub':P['sub2']},
     **{'tip-bg':'#fff','tip-ink':P.get('dInk',P['cardInk']),'tip-hl':P.get('qhl',P['hl']),'tip-bad':'#ffe3e0','tip-good':'#dcf7ea'},
     **{'streak-bg':P['tagBg'],'streak-ink':P['tagInk']},
     **{'tools-bg':P['hud'],'tool-bg':'#fff','tool-ink':P.get('dInk',P['cardInk']),'tool-line':P['line'],'tool-sel':P['acc'],'tool-sel-ink':P.get('accInk','#fff')},
     veil=P['veil'],num=P['go'],
     **{'done-bg':P['veil'].replace('.6','.93').replace('.7','.93'),'done-ink':'#fff','done-hl':P['tagBg']},
     **{'res-title':P['hl'],'pname-b':P.get('pnb','.9'),'acc':P['acc'],'hud-bg':P['hud'],'wz-bg':P.get('wz',P['card']),'tools-fade':'linear-gradient(transparent,rgba(0,0,0,.45))'},
    )
    css=f"@import url('https://fonts.googleapis.com/css2?{imports}&display=swap');\n@font-face{{font-family:'DH-fb';src:local('Noto Sans CJK KR Black'),local('Noto Sans KR Black'),local('Malgun Gothic Bold'),local('AppleSDGothicNeo-Heavy');}}\n:root{{\n --disp:'{disp}','DH-fb','Noto Sans CJK KR','Malgun Gothic',sans-serif; --sans:'{sans}','Noto Sans CJK KR','Apple SD Gothic Neo','Malgun Gothic',sans-serif;\n"
    css+=''.join(f" --{k}:{v};\n" for k,v in d.items())+"}\n/*==EXTRA==*/\n"+extra
    open('skins/'+name+'.css','w',encoding='utf8').write(css)

# 1) 클리닉: 하얀 병원 + 민트 + 산호
skin('clinic','Sunflower','Gowun Dodum','family=Sunflower:wght@300;500;700&family=Gowun+Dodum',dict(
 page='#e9f7f4',ink='#0f4c4a',sub='#4f8c88',line='#0f766e',card='#ffffff',cardInk='#0f4c4a',hl='#e11d48',stage='#dff5f1',
 shCard='0 8px 24px rgba(15,118,110,.18)',shBtn='0 3px 0 #a7dbd4',shDown='0 1px 0 #a7dbd4',shGo='0 6px 0 #9f1239',rad='20px',rads='14px',
 tagBg='#ff5d73',tagInk='#fff',chipBg='#f1fbf9',chipLine='#a7dbd4',sub2='#4f8c88',acc='#14b8a6',accLine='#0f766e',go='#ff5d73',hud='#0b3d3a',
 prog='linear-gradient(90deg,#5eead4,#ff5d73)',qbg='rgba(255,255,255,.96)',qink='#0f4c4a',veil='rgba(11,61,58,.6)',track='#cdeee9',title='#fff',title1='#d1fae5',title2='#fff',noR='8px'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:700}
body{background:#e9f7f4;background-image:linear-gradient(rgba(20,184,166,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,.07) 1px,transparent 1px);background-size:36px 36px}
.sign h1{text-shadow:0 3px 0 #0f766e,0 6px 16px rgba(0,60,50,.35);letter-spacing:.01em}
.sign .sub{border:0;box-shadow:0 3px 0 #b3243d}
.booth{background:#0f766e}
.stn{border-top:5px solid #14b8a6}
.chip{border-radius:14px}.chip.sel{box-shadow:0 4px 0 #0f766e}
.fire,.wz-next{border-radius:16px}
.wz-dot{border-radius:12px}
.res-title{text-shadow:none}
.qbox.ask{border:0;border-bottom:4px solid #14b8a6}
""")

# 2) 오로라: 밤하늘 오로라 + 얼음
skin('aurora','Single Day','Gowun Dodum','family=Single+Day&family=Gowun+Dodum',dict(
 page='linear-gradient(#0a1233,#173a6b 55%,#2a7a8c) fixed',ink='#eaf6ff',sub='#a9cde6',line='rgba(180,230,255,.6)',bw='2px',card='rgba(255,255,255,.14)',cardInk='#f0faff',hl='#7ff0d0',stage='#12335f',
 shCard='0 10px 30px rgba(0,10,40,.45)',shBtn='0 4px 12px rgba(0,10,40,.35)',shDown='0 1px 3px rgba(0,10,40,.35)',shGo='0 8px 24px rgba(70,255,200,.35)',rad='22px',rads='16px',
 tagBg='#7ff0d0',tagInk='#06324a',chipBg='rgba(255,255,255,.14)',chipLine='rgba(180,230,255,.45)',sub2='#b5d8ee',acc='#38bdf8',accInk='#04263d',accLine='#bfeaff',accSub='#05405f',go='#2dd4a8',goInk='#04302b',hud='rgba(6,20,52,.9)',
 prog='linear-gradient(90deg,#7ff0d0,#a78bfa)',qbg='rgba(240,250,255,.95)',qink='#0b2a4a',veil='rgba(6,20,52,.7)',track='#9cc8e6',title='#fff',title1='#b8f5ff',title2='#fff',ph='#7b93a8',pnb='1.3',dInk='#0b2a4a',qhl='#0a7d6a'),
 """.stn,.wz,.review,.pcard,.room-note,body .nl-card,.howcard .in{-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}
.howcard .in{background:rgba(10,30,70,.85)}
.sign h1{text-shadow:0 0 22px rgba(120,255,230,.55),0 4px 0 rgba(0,20,60,.6);letter-spacing:.02em}
.sign .sub{border:1px solid rgba(255,255,255,.6);background:rgba(255,255,255,.14);color:#fff;box-shadow:none}
.chip{border-radius:999px;padding-left:18px}.chips.md .chip{border-radius:18px}
.chip.sel{box-shadow:0 0 18px rgba(56,189,248,.6)}
.fire,.wz-next{border-radius:999px}
.wz-dot{background:rgba(255,255,255,.12);color:#cfe8f7}.wz-dot.on{color:#04263d}
.nick-row .dot{border-radius:50%}
.pcard .nm{filter:none;color:#fff}
.review li b,.hint b{color:#7ff0d0}.review,.review summary{color:#f0faff}.hint{color:#b5d8ee}.maker{color:#a9cde6}
.qbox.ask{border:0;font-size:clamp(17px,min(5.4cqw,3.8dvh),30px)}
.booth{background:#0a1233}
.toolbtn{border-radius:999px}
""")

# 3) 야생: 사바나 흙빛 + 노랑 + 거친 붓글씨
skin('wild','Yeon Sung','Gowun Dodum','family=Yeon+Sung&family=Gowun+Dodum',dict(
 page='#f0d9a8',ink='#3b2410',sub='#8a6a3c',line='#3b2410',bw='3px',card='#fff6dc',cardInk='#3b2410',hl='#c2410c',stage='#9bcf6a',
 shCard='5px 5px 0 #3b2410',shBtn='3px 3px 0 #3b2410',shDown='0 0 0 #3b2410',shGo='5px 6px 0 #3b2410',rad='10px',rads='8px',
 tagBg='#ffcb2e',tagInk='#3b2410',chipBg='#fff0c4',chipLine='#3b2410',sub2='#8a6a3c',acc='#ff8a1f',accLine='#3b2410',accSub='#3b2410',accInk='#3b2410',go='#e8541a',hud='#3b2410',
 prog='linear-gradient(90deg,#ffcb2e,#e8541a)',qbg='#fff6dc',qink='#3b2410',veil='rgba(59,36,16,.7)',track='#e8d6a8',title='#fff7d6',title1='#ffe08a',title2='#fff',noR='4px',scR='6px',lampR='6px'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#f0d9a8;background-image:radial-gradient(rgba(139,94,40,.18) 2px,transparent 2.5px);background-size:22px 22px}
.sign h1{text-shadow:4px 4px 0 #3b2410;letter-spacing:.02em;transform:rotate(-2deg)}
.sign .sub{border-radius:4px;box-shadow:3px 3px 0 #3b2410;transform:rotate(1.5deg)}
.stn,.wz,.review,.pcard{border-radius:10px}
.chip{border-radius:6px;font-weight:700}
.chip.sel{transform:translate(2px,2px);box-shadow:1px 1px 0 #3b2410}
.fire,.wz-next{border-radius:8px;font-size:30px;letter-spacing:.04em}
.toolbtn{border-radius:8px;border-width:3px}
.qbox.ask{border:3px solid #3b2410;border-radius:10px;box-shadow:4px 4px 0 #3b2410;font-size:clamp(18px,min(5.6cqw,4dvh),32px)}
.res-title{text-shadow:3px 3px 0 #3b2410;color:#ffcb2e}
.booth{background:#9bcf6a}
.nick-row .dot{border-radius:3px}
""")

# 4) 놀이터: 장난감 블록 — 빨강·파랑·노랑
skin('toybox','Kirang Haerang','Gowun Dodum','family=Kirang+Haerang&family=Gowun+Dodum',dict(
 page='#fff3c9',ink='#1f2d5a',sub='#6b6fa0',line='#1f2d5a',bw='3px',card='#ffffff',cardInk='#1f2d5a',hl='#e63946',stage='#8fd3ff',
 shCard='0 8px 0 #1f2d5a',shBtn='0 5px 0 #1f2d5a',shDown='0 1px 0 #1f2d5a',shGo='0 8px 0 #9d1d28',rad='22px',rads='16px',
 tagBg='#ffd23f',tagInk='#1f2d5a',chipBg='#fff',chipLine='#1f2d5a',sub2='#6b6fa0',acc='#2d7ff9',accLine='#1f2d5a',accSub='#dbe8ff',go='#e63946',hud='#1f2d5a',
 prog='linear-gradient(90deg,#ffd23f,#e63946)',qbg='#fff',qink='#1f2d5a',veil='rgba(31,45,90,.65)',track='#ffe9a0',title='#fff',title1='#ffe27a',title2='#fff',noR='8px',lampR='8px'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#fff3c9;background-image:radial-gradient(circle,#ffe08a 8px,transparent 9px),radial-gradient(circle,#bfe0ff 8px,transparent 9px);background-size:64px 64px;background-position:0 0,32px 32px}
.sign h1{text-shadow:0 5px 0 #1f2d5a,3px 3px 0 #1f2d5a,-3px 3px 0 #1f2d5a;letter-spacing:.02em}
.sign .sub{border-radius:999px;box-shadow:0 3px 0 #1f2d5a}
.stn{border-radius:26px}
.stn-h h2{font-size:22px}
.chip{border-radius:18px;font-weight:700}
.chip.sel{box-shadow:0 5px 0 #14408f}
.lamp{font-family:var(--disp);font-weight:400;border-radius:8px}
.wz-dot{font-family:var(--disp);font-weight:400;font-size:17px;border-radius:14px}
.fire,.wz-next{border-radius:20px;font-size:30px}
.toolbtn{border-radius:18px;border-bottom-width:6px}
.qbox.ask{border:3px solid #1f2d5a;font-size:clamp(18px,min(5.8cqw,4dvh),34px)}
.res-title{text-shadow:0 4px 0 #ffd23f}
.booth{background:#8fd3ff}
.res-tab{font-family:var(--disp);font-weight:400;font-size:clamp(15px,2.4dvh,19px)}
.nick-row .dot{border-radius:5px;width:16px;height:16px}
""")

# 5) 탐사: 양피지 + 놋쇠 현장 노트
skin('expedition','Stylish','Gowun Dodum','family=Stylish&family=Gowun+Dodum',dict(
 page='#3a2a1d',ink='#fff1d6',sub='#d9bf94',line='#6b4a2a',bw='2px',card='#f6e8c8',cardInk='#3a2a1d',hl='#b4451f',stage='#8a6a45',
 shCard='inset 0 0 0 3px #f6e8c8,inset 0 0 0 5px #b8893f,0 10px 24px rgba(0,0,0,.45)',shBtn='0 4px 0 #8a6a45',shDown='0 1px 0 #8a6a45',shGo='0 6px 0 #6b2a10',rad='10px',rads='8px',
 tagBg='#c99a3e',tagInk='#2a1c10',chipBg='#fbf1d8',chipLine='#b8893f',sub2='#7a6244',acc='#0d9488',accLine='#064e46',accSub='#d1fae5',go='#d9531e',hud='#241810',
 prog='linear-gradient(90deg,#e0b252,#d9531e)',qbg='#f6e8c8',qink='#3a2a1d',veil='rgba(36,24,16,.7)',track='#d9c49a',title='#fff1d6',title1='#f0cf8a',title2='#fff',ph='#a89070',noR='4px',scR='6px',lampR='4px'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#3a2a1d;background-image:repeating-linear-gradient(0deg,rgba(255,255,255,.025) 0 2px,transparent 2px 6px)}
.sign h1{text-shadow:0 3px 0 #1c120a,0 8px 18px rgba(0,0,0,.5);letter-spacing:.03em}
.sign .sub{border-radius:4px;border:1px solid #1c120a;box-shadow:0 3px 0 #7a5a20}
.chip{border-radius:6px;font-weight:700}
.chip.sel{box-shadow:0 4px 0 #064e46}
.wz-dot{border-radius:4px}
.fire,.wz-next{border-radius:8px;letter-spacing:.05em}
.toolbtn{border-radius:8px}
.qbox.ask{border:2px solid #b8893f;border-radius:8px;box-shadow:inset 0 0 0 3px #f6e8c8,inset 0 0 0 4px #b8893f,0 6px 16px rgba(0,0,0,.4);font-size:clamp(16px,min(5cqw,3.6dvh),28px)}
.res-title{text-shadow:0 3px 0 #1c120a}
.booth{background:#4a3524}
.review,.review summary,.pcard{color:#3a2a1d}
.stn-h h2{letter-spacing:.02em}
.maker{color:#d9bf94}.hint{color:#7a6244}
""")

# ---- 3차 묶음 ----
# 열기구: 노을 + 하늘
skin('balloon','Gamja Flower','Gowun Dodum','family=Gamja+Flower&family=Gowun+Dodum',dict(
 page='linear-gradient(#ffd9b8,#ffeedd 45%,#cfeaff) fixed',ink='#5a2d1a',sub='#9a6a4c',line='#c2410c',bw='2px',card='#fffaf2',cardInk='#5a2d1a',hl='#e0451f',stage='#8fcfff',
 shCard='0 8px 22px rgba(194,65,12,.18)',shBtn='0 4px 0 #f0b98a',shDown='0 1px 0 #f0b98a',shGo='0 7px 0 #b32d10',rad='24px',rads='16px',
 tagBg='#ffcf6b',tagInk='#5a2d1a',chipBg='#fff1e0',chipLine='#f0b98a',sub2='#9a6a4c',acc='#ff7a45',accLine='#c2410c',accSub='#fff0e6',go='#ff5a36',hud='#7c2d12',
 prog='linear-gradient(90deg,#ffd36b,#ff5a36)',qbg='rgba(255,250,242,.96)',qink='#5a2d1a',veil='rgba(124,45,18,.6)',track='#f6d9bf',title='#fff',title1='#fff1c9',title2='#fff'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:700}
.sign h1{text-shadow:0 3px 0 #c2410c,0 6px 16px rgba(120,40,0,.4);letter-spacing:.02em}
.sign .sub{border:0;box-shadow:0 3px 0 #b8860b}
.booth{background:#ffb27a}
.chip{border-radius:18px}.chip.sel{box-shadow:0 4px 0 #b32d10}
.fire,.wz-next{border-radius:999px}
.wz-dot{border-radius:999px}
.qbox.ask{border:0;font-size:clamp(17px,min(5.4cqw,3.8dvh),30px)}
.res-title{text-shadow:0 3px 0 #ffe29a}
""")

# 세균 방어대: 비누 거품 + 민트·핑크
skin('germ','Jua','Gowun Dodum','family=Jua&family=Gowun+Dodum',dict(
 page='#d7f7ee',ink='#0f5a4a',sub='#4d8f7f',line='#0f9e82',bw='3px',card='#ffffff',cardInk='#0f5a4a',hl='#e11d6a',stage='#bff0e4',
 shCard='0 7px 0 #8fdcc9',shBtn='0 4px 0 #8fdcc9',shDown='0 1px 0 #8fdcc9',shGo='0 7px 0 #b0124f',rad='28px',rads='20px',
 tagBg='#ffe066',tagInk='#5a4300',chipBg='#effcf8',chipLine='#8fdcc9',sub2='#4d8f7f',acc='#ff5c8a',accLine='#b0124f',accSub='#ffe3ec',go='#ff5c8a',hud='#0b6b57',
 prog='linear-gradient(90deg,#7ee8c9,#ff5c8a)',qbg='#ffffff',qink='#0f5a4a',veil='rgba(11,107,87,.6)',track='#c6efe4',title='#fff',title1='#e6fff7',title2='#fff'),
 """body{background:#d7f7ee;background-image:radial-gradient(circle,rgba(255,255,255,.9) 14px,transparent 15px),radial-gradient(circle,rgba(143,220,201,.5) 8px,transparent 9px);background-size:90px 90px;background-position:0 0,45px 45px}
.sign h1{text-shadow:0 5px 0 #0b6b57,3px 3px 0 #0b6b57,-3px 3px 0 #0b6b57,0 8px 14px rgba(0,60,50,.3);letter-spacing:.02em}
.sign .sub{border-radius:999px;box-shadow:0 3px 0 #b8860b}
.booth{background:#7ee8c9}
.stn{border-radius:30px}.chip{border-radius:22px;font-weight:700}.chip.sel{box-shadow:0 4px 0 #b0124f}
.fire,.wz-next{border-radius:999px;font-family:var(--disp);letter-spacing:.03em}
.toolbtn{border-radius:999px;border-bottom-width:6px}
.qbox.ask{border:3px solid #0f9e82;font-size:clamp(17px,min(5.6cqw,3.9dvh),32px)}
.res-title{text-shadow:0 4px 0 #ffe066}
.nick-row .dot{border-radius:50%;width:16px;height:16px}
""")

# 한살이 탑: 그림책(색연필)
skin('storybook','Gaegu','Gowun Dodum','family=Gaegu:wght@400;700&family=Gowun+Dodum',dict(
 page='#fdf1d8',ink='#4b3a7a',sub='#8a7bb8',line='#7a63c9',bw='3px',card='#fffdf6',cardInk='#4b3a7a',hl='#d9436a',stage='#cfc4ff',
 shCard='5px 5px 0 #cfc4ff',shBtn='3px 3px 0 #cfc4ff',shDown='0 0 0 #cfc4ff',shGo='5px 6px 0 #b4506a',rad='18px',rads='12px',
 tagBg='#ffd36b',tagInk='#4b3a7a',chipBg='#fff8e6',chipLine='#b7a8f0',sub2='#8a7bb8',acc='#8b6bea',accLine='#4b3a7a',accSub='#ece6ff',go='#ff8fa3',hud='#5b47b0',
 prog='linear-gradient(90deg,#ffd36b,#ff8fa3)',qbg='#fffdf6',qink='#4b3a7a',veil='rgba(75,58,122,.6)',track='#e8e0ff',title='#fff',title1='#fff1c9',title2='#fff'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:700}
body{background:#fdf1d8;background-image:repeating-linear-gradient(0deg,rgba(122,99,201,.07) 0 1px,transparent 1px 28px)}
.stn,.wz,.review,.pcard,.qbox.ask,.chip,.fire,.wz-next,.wz-dot{border-style:dashed}
.sign h1{text-shadow:3px 3px 0 #4b3a7a,0 8px 14px rgba(40,20,90,.3);letter-spacing:.03em;transform:rotate(-1.5deg)}
.sign .sub{border-radius:8px;box-shadow:3px 3px 0 #4b3a7a}
.booth{background:#cfc4ff}
.chip.sel{box-shadow:2px 2px 0 #4b3a7a}
.qbox.ask{font-size:clamp(18px,min(5.8cqw,4dvh),34px)}
.res-title{text-shadow:3px 3px 0 #ffd36b}
""")

# 빛 반사: 어두운 광학 실험실 + 무지개
skin('laser','Orbit','Gowun Dodum','family=Orbit&family=Gowun+Dodum',dict(
 page='#0b0a1a',ink='#e8e6ff',sub='#a9a4d8',line='rgba(180,170,255,.5)',bw='1.5px',card='rgba(255,255,255,.07)',cardInk='#f0eeff',hl='#fde047',stage='#14123a',
 shCard='0 10px 30px rgba(0,0,0,.5)',shBtn='0 3px 10px rgba(0,0,0,.4)',shDown='0 1px 2px rgba(0,0,0,.4)',shGo='0 8px 26px rgba(167,139,250,.5)',rad='16px',rads='12px',
 tagBg='#fde047',tagInk='#1e1b4b',chipBg='rgba(255,255,255,.08)',chipLine='rgba(180,170,255,.4)',sub2='#b6b1e6',acc='#a78bfa',accInk='#10092e',accLine='#ddd6fe',accSub='#2a1d66',go='linear-gradient(90deg,#f472b6,#a78bfa,#38bdf8)',goInk='#10092e',hud='rgba(10,8,30,.92)',
 prog='linear-gradient(90deg,#f472b6,#fde047,#38bdf8)',qbg='rgba(22,20,60,.94)',qink='#f0eeff',qhl='#fde047',veil='rgba(8,6,28,.72)',track='#4a4580',title='#fff',title1='#c7d2fe',title2='#fff',dInk='#10092e',pnb='1.4',wz='rgba(16,13,48,.86)'),
 """.stn,.wz,.review,.pcard,.room-note,body .nl-card,.howcard .in{-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}
.howcard .in{background:rgba(20,18,60,.9)}
body{background:#0b0a1a;background-image:radial-gradient(circle at 20% 10%,rgba(167,139,250,.18),transparent 40%),radial-gradient(circle at 80% 90%,rgba(56,189,248,.14),transparent 40%)}
.sign h1{text-shadow:0 0 24px rgba(167,139,250,.7);letter-spacing:.04em;font-weight:700}
.sign .sub{border:1px solid rgba(255,255,255,.5);background:rgba(255,255,255,.1);color:#fff;box-shadow:none}
.chip{border-radius:12px}.chip.sel{box-shadow:0 0 18px rgba(167,139,250,.7)}
.fire,.wz-next{border-radius:12px;font-weight:700;letter-spacing:.06em}
.wz-dot.on{color:#10092e}
.pcard .nm{filter:none;color:#fff}
.review li b,.hint b{color:#fde047}.review,.review summary{color:#f0eeff}.hint{color:#b6b1e6}.maker{color:#a9a4d8}
.qbox.ask{border:1px solid rgba(180,170,255,.5);font-size:clamp(16px,min(5cqw,3.6dvh),28px)}
.booth{background:#0b0a1a}
.toolbtn{border-radius:12px}
.res-title{text-shadow:0 0 22px rgba(167,139,250,.7)}
""")

# 자석: 빨강·파랑 장난감 실험실
skin('magnet','Do Hyeon','Gowun Dodum','family=Do+Hyeon&family=Gowun+Dodum',dict(
 page='#f4efe6',ink='#1b2a4a',sub='#6a7592',line='#1b2a4a',bw='3px',card='#ffffff',cardInk='#1b2a4a',hl='#dc2626',stage='#dbe7ff',
 shCard='0 7px 0 #1b2a4a',shBtn='0 4px 0 #1b2a4a',shDown='0 1px 0 #1b2a4a',shGo='0 7px 0 #1a3fa8',rad='14px',rads='10px',
 tagBg='#facc15',tagInk='#1b2a4a',chipBg='#ffffff',chipLine='#1b2a4a',sub2='#6a7592',acc='#dc2626',accLine='#7f1d1d',accSub='#ffe4e4',go='#2563eb',hud='#1b2a4a',
 prog='linear-gradient(90deg,#dc2626,#2563eb)',qbg='#ffffff',qink='#1b2a4a',veil='rgba(27,42,74,.65)',track='#dfe6f5',title='#fff',title1='#ffd9d9',title2='#cfe0ff'),
 """body{background:#f4efe6;background-image:linear-gradient(90deg,rgba(220,38,38,.07) 50%,rgba(37,99,235,.07) 50%);background-size:80px 80px}
.sign h1{text-shadow:0 4px 0 #1b2a4a,3px 3px 0 #1b2a4a;letter-spacing:.02em}
.sign .sub{border-radius:6px;box-shadow:0 3px 0 #1b2a4a}
.booth{background:#2b3f73}
.chip{border-radius:10px;font-weight:700}.chip.sel{box-shadow:0 4px 0 #7f1d1d}
.fire,.wz-next{border-radius:10px;font-size:30px}
.toolbtn{border-radius:12px;border-bottom-width:6px}
.qbox.ask{border:3px solid #1b2a4a;font-size:clamp(18px,min(5.6cqw,4dvh),32px);box-shadow:0 5px 0 #1b2a4a}
.res-title{text-shadow:0 3px 0 #facc15}
""")

# 현미경 탐정: 탐정 사무소 (짙은 남청 + 형광 라임, 명조 굵은 글씨)
skin('noir','Hahmlet','Gowun Dodum','family=Hahmlet:wght@700;900&family=Gowun+Dodum',dict(
 page='#0d1b2a',ink='#e7f6ee',sub='#8fb3a4',line='#a3e635',card='#13283d',cardInk='#e7f6ee',hl='#a3e635',stage='#0a1522',
 shCard='0 0 0 1px rgba(163,230,53,.35),0 12px 30px rgba(0,0,0,.5)',shBtn='0 3px 0 #0a1522',shDown='0 1px 0 #0a1522',shGo='0 6px 0 #4d7c0f',rad='10px',rads='8px',
 tagBg='#a3e635',tagInk='#0d1b2a',chipBg='#1b3550',chipLine='#2f5a7c',sub2='#8fb3a4',acc='#a3e635',accInk='#0d1b2a',accLine='#d9f99d',accSub='#365314',go='#a3e635',goInk='#0d1b2a',hud='#07111c',
 prog='linear-gradient(90deg,#34d399,#a3e635)',qbg='rgba(13,27,42,.94)',qink='#e7f6ee',qhl='#bef264',veil='rgba(7,17,28,.7)',track='#1b3550',title='#fff',title1='#bef264',title2='#fff',dInk='#0d1b2a',noR='6px',scR='8px',wz='#10233a'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:900}
body{background:#0d1b2a;background-image:radial-gradient(circle at 15% 20%,rgba(163,230,53,.12),transparent 40%),radial-gradient(circle at 85% 80%,rgba(56,189,248,.1),transparent 40%)}
.sign h1{text-shadow:0 0 22px rgba(163,230,53,.6);letter-spacing:.02em}
.sign .sub{border:1px solid rgba(163,230,53,.6);background:rgba(163,230,53,.12);color:#d9f99d;box-shadow:none}
.booth{background:#06101a}
.chip{border-radius:8px}.chip.sel{box-shadow:0 0 16px rgba(163,230,53,.6)}
.fire,.wz-next{border-radius:8px;letter-spacing:.04em}
.review li b,.hint b{color:#bef264}.review,.review summary{color:#e7f6ee}.hint{color:#8fb3a4}.maker{color:#8fb3a4}
.pcard .nm{filter:none;color:#fff}
.qbox.ask{border:1px solid rgba(163,230,53,.55);font-size:clamp(16px,min(5cqw,3.6dvh),28px)}
.toolbtn{border-radius:10px}
.res-title{text-shadow:0 0 20px rgba(163,230,53,.6)}
""")

# 물질 닌자: 대나무 숲 + 붉은 도장 (붓글씨)
skin('ninja','East Sea Dokdo','Gowun Dodum','family=East+Sea+Dokdo&family=Gowun+Dodum',dict(
 page='#f3ead2',ink='#2b1d14',sub='#7a6347',line='#2b1d14',bw='3px',card='#fffaf0',cardInk='#2b1d14',hl='#c81e1e',stage='#e9dcb8',
 shCard='0 6px 0 #2b1d14',shBtn='0 4px 0 #2b1d14',shDown='0 1px 0 #2b1d14',shGo='0 7px 0 #7f1212',rad='6px',rads='4px',
 tagBg='#c81e1e',tagInk='#fff',chipBg='#fffaf0',chipLine='#2b1d14',sub2='#7a6347',acc='#c81e1e',accLine='#7f1212',accSub='#ffe0d6',go='#c81e1e',hud='#1c1410',
 prog='linear-gradient(90deg,#16a34a,#facc15,#c81e1e)',qbg='#fffaf0',qink='#2b1d14',veil='rgba(28,20,16,.7)',track='#e3d6b0',title='#fff',title1='#ffe9a8',title2='#fff',noR='4px',scR='6px'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#f3ead2;background-image:repeating-linear-gradient(90deg,rgba(60,90,40,.07) 0 14px,transparent 14px 46px)}
.sign h1{text-shadow:0 4px 0 #2b1d14,3px 3px 0 #2b1d14;letter-spacing:.03em;font-size-adjust:none}
.sign .sub{border-radius:4px;box-shadow:0 3px 0 #2b1d14;border:2px solid #2b1d14}
.booth{background:#1f3a24}
.chip{border-radius:4px;font-weight:700}.chip.sel{box-shadow:0 4px 0 #7f1212}
.fire,.wz-next{border-radius:4px;font-size:34px}
.toolbtn{border-radius:6px;border-bottom-width:6px}
.qbox.ask{border:3px solid #2b1d14;font-size:clamp(18px,min(5.6cqw,4dvh),34px);box-shadow:0 5px 0 #2b1d14}
.res-title{text-shadow:0 3px 0 #facc15}
""")

# 바다 탐험 잠수정: 깊은 바다 + 노란 잠수정 (둥글고 귀여운)
skin('deepsea','Dongle','Gowun Dodum','family=Dongle:wght@400;700&family=Gowun+Dodum',dict(
 page='#0b3a5e',ink='#fff',sub='#a5d8f5',line='#0b3a5e',card='#ffffff',cardInk='#0b3a5e',hl='#f59e0b',stage='#06263f',
 shCard='0 7px 0 #062b47',shBtn='0 4px 0 #0a5a8a',shDown='0 1px 0 #0a5a8a',shGo='0 7px 0 #b45309',rad='26px',rads='18px',
 tagBg='#fcd34d',tagInk='#0b3a5e',chipBg='#e6f6ff',chipLine='#7cc4ee',sub2='#4d86ad',acc='#0ea5e9',accLine='#0369a1',go='#f59e0b',goInk='#3b1d00',hud='#06263f',
 prog='linear-gradient(90deg,#22d3ee,#fcd34d)',qbg='rgba(255,255,255,.96)',qink='#0b3a5e',veil='rgba(6,38,63,.7)',track='#bfe6fb',title='#fff',title1='#bdeaff',title2='#fff',noR='50%',wz='#ffffff'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:700}
body{background:linear-gradient(#0e5a8c,#06263f)}
.sign h1{text-shadow:0 5px 0 #062b47,0 10px 20px rgba(0,20,40,.4);letter-spacing:.02em;font-size-adjust:none}
.sign .sub{border:0;box-shadow:0 4px 0 #b45309}
.booth{background:#0a4a78}
.chip{border-radius:999px;font-size:1.12em}.chip.sel{box-shadow:0 5px 0 #075985}
.fire,.wz-next{border-radius:999px;font-size:1.3em}
.toolbtn{border-radius:999px;font-size:1.25em}
.qbox.ask{border:0;font-size:clamp(20px,min(6.4cqw,4.6dvh),38px);border-radius:999px;box-shadow:0 5px 0 #062b47}
.res-title{text-shadow:0 4px 0 #062b47}
""")

# 밤하늘 탐험대: 보랏빛 밤하늘 + 금빛 별
skin('night','Song Myung','Gowun Batang','family=Song+Myung&family=Gowun+Batang',dict(
 page='#120a2e',ink='#f5f0ff',sub='#b3a5e6',line='#fcd34d',card='#1f1550',cardInk='#f5f0ff',hl='#fcd34d',stage='#0c0620',
 shCard='0 0 0 1px rgba(252,211,77,.45),0 12px 30px rgba(0,0,0,.55)',shBtn='0 3px 0 #0c0620',shDown='0 1px 0 #0c0620',shGo='0 6px 0 #92400e',rad='16px',rads='12px',
 tagBg='#fcd34d',tagInk='#1e1245',chipBg='#2a1d6a',chipLine='#5a47b8',sub2='#b3a5e6',acc='#fcd34d',accInk='#1e1245',accLine='#fde68a',accSub='#6b4f0a',go='#fcd34d',goInk='#1e1245',hud='#0a0520',
 prog='linear-gradient(90deg,#a78bfa,#fcd34d)',qbg='rgba(20,12,56,.92)',qink='#f5f0ff',qhl='#fde68a',veil='rgba(10,5,32,.72)',track='#2a1d6a',title='#fff',title1='#fde68a',title2='#fff',dInk='#1e1245',noR='50%',wz='#190f45'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#120a2e;background-image:radial-gradient(circle at 20% 15%,rgba(167,139,250,.25),transparent 40%),radial-gradient(circle at 80% 85%,rgba(252,211,77,.12),transparent 40%)}
.sign h1{text-shadow:0 0 26px rgba(252,211,77,.7);letter-spacing:.06em;font-size-adjust:none}
.sign .sub{border:1px solid rgba(252,211,77,.7);background:rgba(252,211,77,.12);color:#fde68a;box-shadow:none}
.booth{background:#0a0520}
.chip.sel{box-shadow:0 0 18px rgba(252,211,77,.6)}
.fire,.wz-next{border-radius:999px;letter-spacing:.08em}
.review li b,.hint b{color:#fde68a}.review,.review summary{color:#f5f0ff}.hint{color:#b3a5e6}.maker{color:#b3a5e6}
.pcard .nm{filter:none;color:#fff}
.qbox.ask{border:1px solid rgba(252,211,77,.55);font-size:clamp(17px,min(5.2cqw,3.8dvh),30px)}
.res-title{text-shadow:0 0 22px rgba(252,211,77,.7)}
""")

# 비커 받기 대작전: 하얀 실험실 + 청록 (Gothic A1 굵게)
skin('lab','Gothic A1','Gowun Dodum','family=Gothic+A1:wght@700;900&family=Gowun+Dodum',dict(
 page='#f4f8fb',ink='#0f2a3d',sub='#5b7a90',line='#0f2a3d',bw='2px',card='#ffffff',cardInk='#0f2a3d',hl='#0891b2',stage='#e3eef6',
 shCard='0 8px 24px rgba(15,42,61,.16)',shBtn='0 3px 0 #bcd2e0',shDown='0 1px 0 #bcd2e0',shGo='0 6px 0 #0e7490',rad='14px',rads='10px',
 tagBg='#0891b2',tagInk='#fff',chipBg='#f1f7fb',chipLine='#bcd2e0',sub2='#5b7a90',acc='#0891b2',accLine='#0e7490',go='#f97316',hud='#0f2a3d',
 prog='linear-gradient(90deg,#22d3ee,#f97316)',qbg='rgba(255,255,255,.97)',qink='#0f2a3d',veil='rgba(15,42,61,.65)',track='#d3e4ef',title='#fff',title1='#cffafe',title2='#fff',noR='6px'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:900}
body{background:#f4f8fb;background-image:radial-gradient(rgba(8,145,178,.12) 2px,transparent 2px);background-size:26px 26px}
.sign h1{text-shadow:0 3px 0 #0e7490,0 8px 18px rgba(15,42,61,.3);letter-spacing:-.01em}
.sign .sub{border:0;box-shadow:0 3px 0 #9a3412;background:#f97316;color:#fff}
.booth{background:#0e7490}
.chip{border-radius:10px}.chip.sel{box-shadow:0 4px 0 #155e75}
.fire,.wz-next{border-radius:12px}
.toolbtn{border-radius:12px}
.qbox.ask{border:2px solid #0f2a3d;font-size:clamp(17px,min(5.4cqw,3.9dvh),30px);box-shadow:0 4px 0 #0f2a3d}
.res-title{text-shadow:0 3px 0 #67e8f9}
""")

# 소리 리듬 탭: 팝스타 무대 (분홍·노랑·하늘, 굵은 보라 테두리)
skin('popstar','Do Hyeon','Gowun Dodum','family=Do+Hyeon&family=Gowun+Dodum',dict(
 page='#fff0f7',ink='#3b0764',sub='#8b5fb0',line='#3b0764',bw='3px',card='#ffffff',cardInk='#3b0764',hl='#ec4899',stage='#fde7f3',
 shCard='0 7px 0 #3b0764',shBtn='0 4px 0 #3b0764',shDown='0 1px 0 #3b0764',shGo='0 7px 0 #9d174d',rad='22px',rads='14px',
 tagBg='#facc15',tagInk='#3b0764',chipBg='#ffffff',chipLine='#3b0764',sub2='#8b5fb0',acc='#ec4899',accLine='#9d174d',go='#ec4899',hud='#3b0764',
 prog='linear-gradient(90deg,#ec4899,#facc15,#22d3ee)',qbg='#ffffff',qink='#3b0764',veil='rgba(59,7,100,.7)',track='#f3d4ea',title='#fff',title1='#fde68a',title2='#fff'),
 """body{background:#fff0f7;background-image:radial-gradient(circle,rgba(236,72,153,.16) 3px,transparent 3.5px),radial-gradient(circle,rgba(34,211,238,.18) 3px,transparent 3.5px);background-size:44px 44px,44px 44px;background-position:0 0,22px 22px}
.sign h1{text-shadow:0 5px 0 #3b0764,3px 3px 0 #3b0764,-2px -2px 0 #3b0764;letter-spacing:.03em}
.sign .sub{border-radius:999px;box-shadow:0 3px 0 #3b0764}
.booth{background:#5b21b6}
.chip{border-radius:999px;font-weight:700}.chip.sel{box-shadow:0 5px 0 #9d174d}
.fire,.wz-next{border-radius:999px;font-size:30px}
.toolbtn{border-radius:18px;border-bottom-width:6px}
.qbox.ask{border:3px solid #3b0764;border-radius:999px;font-size:clamp(17px,min(5.4cqw,3.9dvh),30px);box-shadow:0 5px 0 #3b0764}
.res-title{text-shadow:0 4px 0 #3b0764}
""")

# 화산 돌 새총: 현무암 + 용암 (어두운 돌색, 주황 포인트)
skin('lava','Gasoek One','Gowun Dodum','family=Gasoek+One&family=Gowun+Dodum',dict(
 page='#1f1412',ink='#ffe9d6',sub='#c9a592',line='#ff7a3d',bw='2px',card='#2e1c18',cardInk='#ffe9d6',hl='#ff9e5e',stage='#170d0b',
 shCard='0 0 0 1px rgba(255,122,61,.4),0 12px 28px rgba(0,0,0,.55)',shBtn='0 3px 0 #120a08',shDown='0 1px 0 #120a08',shGo='0 6px 0 #9a3412',rad='12px',rads='8px',
 tagBg='#ff6a2b',tagInk='#2a0f05',chipBg='#3a2420',chipLine='#6b4036',sub2='#c9a592',acc='#ff6a2b',accInk='#2a0f05',accLine='#ffb27a',accSub='#7c2d12',go='#ff6a2b',goInk='#2a0f05',hud='#120a08',
 prog='linear-gradient(90deg,#fbbf24,#ef4444)',qbg='rgba(31,20,18,.94)',qink='#ffe9d6',qhl='#ffb27a',veil='rgba(18,10,8,.74)',track='#3a2420',title='#fff',title1='#ffd2a8',title2='#fff',dInk='#2a1410',noR='6px',scR='8px',wz='#2a1814'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#1f1412;background-image:radial-gradient(circle at 50% 110%,rgba(255,106,43,.35),transparent 55%),repeating-linear-gradient(115deg,rgba(255,255,255,.025) 0 2px,transparent 2px 26px)}
.sign h1{text-shadow:0 0 24px rgba(255,106,43,.8),0 4px 0 #7c2d12;letter-spacing:.02em}
.sign .sub{border:1px solid rgba(255,122,61,.7);background:rgba(255,106,43,.14);color:#ffd2a8;box-shadow:none}
.booth{background:#170d0b}
.chip{border-radius:8px}.chip.sel{box-shadow:0 0 16px rgba(255,106,43,.7)}
.fire,.wz-next{border-radius:8px;letter-spacing:.04em}
.review li b,.hint b{color:#ffb27a}.review,.review summary{color:#ffe9d6}.hint{color:#c9a592}.maker{color:#c9a592}
.pcard .nm{filter:none;color:#fff}
.qbox.ask{border:1px solid rgba(255,122,61,.6);font-size:clamp(16px,min(5cqw,3.7dvh),28px)}
.res-title{text-shadow:0 0 20px rgba(255,106,43,.8)}
""")

# 물방울 변신 러너: 산뜻한 물빛 + 주황 포인트
skin('dew','Jua','Gowun Dodum','family=Jua&family=Gowun+Dodum',dict(
 page='#e8fbff',ink='#05445e',sub='#4f93ad',line='#0e7490',bw='2px',card='#ffffff',cardInk='#05445e',hl='#0891b2',stage='#cdf3fb',
 shCard='0 8px 22px rgba(5,68,94,.18)',shBtn='0 3px 0 #9dd9e8',shDown='0 1px 0 #9dd9e8',shGo='0 6px 0 #c2410c',rad='26px',rads='16px',
 tagBg='#fb923c',tagInk='#fff',chipBg='#f0fcff',chipLine='#9dd9e8',sub2='#4f93ad',acc='#06b6d4',accLine='#0e7490',go='#fb923c',hud='#075985',
 prog='linear-gradient(90deg,#67e8f9,#fb923c)',qbg='rgba(255,255,255,.96)',qink='#05445e',veil='rgba(7,89,133,.65)',track='#c4eaf4',title='#fff',title1='#cffafe',title2='#fff',noR='50%'),
 """body{background:#e8fbff;background-image:radial-gradient(circle at 20% 20%,rgba(6,182,212,.14),transparent 40%),radial-gradient(circle at 85% 80%,rgba(251,146,60,.12),transparent 40%)}
.sign h1{text-shadow:0 4px 0 #0e7490,0 10px 22px rgba(5,68,94,.3);letter-spacing:.01em}
.sign .sub{border:0;box-shadow:0 3px 0 #c2410c}
.booth{background:#0e7490}
.chip{border-radius:18px}.chip.sel{box-shadow:0 5px 0 #155e75}
.fire,.wz-next{border-radius:999px}
.toolbtn{border-radius:22px;border-bottom-width:6px}
.qbox.ask{border:0;border-radius:24px;font-size:clamp(17px,min(5.4cqw,3.9dvh),30px);box-shadow:0 5px 0 rgba(5,68,94,.25)}
.res-title{text-shadow:0 3px 0 #67e8f9}
""")

# 토론 배틀 아레나: 토론 무대 (짙은 남색 + 금색, 찬성 파랑/반대 빨강)
skin('arena','Noto Serif KR','Gowun Dodum','family=Noto+Serif+KR:wght@700;900&family=Gowun+Dodum',dict(
 page='#0f172a',ink='#f8fafc',sub='#94a3b8',line='#d4a72c',bw='2px',card='#1e293b',cardInk='#f8fafc',hl='#fbbf24',stage='#0b1220',
 shCard='0 0 0 1px rgba(212,167,44,.5),0 12px 30px rgba(0,0,0,.55)',shBtn='0 3px 0 #0b1220',shDown='0 1px 0 #0b1220',shGo='0 6px 0 #9f1239',rad='10px',rads='8px',
 tagBg='#d4a72c',tagInk='#0f172a',chipBg='#27364f',chipLine='#3b4d6e',sub2='#94a3b8',acc='#d4a72c',accInk='#0f172a',accLine='#fde68a',accSub='#5b4710',go='#e11d48',goInk='#fff',hud='#080e1c',
 prog='linear-gradient(90deg,#3b82f6,#fbbf24,#ef4444)',qbg='rgba(15,23,42,.94)',qink='#f8fafc',qhl='#fde68a',veil='rgba(8,14,28,.74)',track='#27364f',title='#fff',title1='#fde68a',title2='#fff',dInk='#0f172a',noR='6px',scR='8px',wz='#16203a'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:900}
body{background:#0f172a;background-image:linear-gradient(90deg,rgba(59,130,246,.18),transparent 40%,transparent 60%,rgba(239,68,68,.18))}
.sign h1{text-shadow:0 3px 0 #000,0 0 22px rgba(251,191,36,.45);letter-spacing:.02em}
.sign .sub{border:1px solid rgba(212,167,44,.7);background:rgba(212,167,44,.12);color:#fde68a;box-shadow:none}
.booth{background:#080e1c}
.chip{border-radius:6px}.chip.sel{box-shadow:0 0 16px rgba(212,167,44,.6)}
.fire,.wz-next{border-radius:6px;letter-spacing:.05em}
.review li b,.hint b{color:#fde68a}.review,.review summary{color:#f8fafc}.hint{color:#94a3b8}.maker{color:#94a3b8}
.pcard .nm{filter:none;color:#fff}
.qbox.ask{border:1px solid rgba(212,167,44,.6);font-size:clamp(16px,min(5cqw,3.7dvh),28px)}
.res-title{text-shadow:0 0 20px rgba(251,191,36,.55)}
""")

FRCSS=""".fr{display:inline-block;vertical-align:middle;white-space:nowrap}.fs{display:inline-flex;flex-direction:column;text-align:center;line-height:1.05;font-size:.82em;vertical-align:middle;margin:0 .1em}.fs i{font-style:normal;padding:0 .2em}.fs i:first-child{border-bottom:.1em solid currentColor}
.tg{font-weight:900;color:var(--q-hl);font-size:1.15em}
"""
# 약수·배수 두더지: 칠판 + 나무 틀
skin('mole','Gamja Flower','Gowun Dodum','family=Gamja+Flower&family=Gowun+Dodum',dict(
 page='#1e3a2a',ink='#f6f1e0',sub='#b9d4be',line='#e8d9a8',bw='2px',card='#27483a',cardInk='#f6f1e0',hl='#fde68a',stage='#16301f',
 shCard='0 0 0 3px #a16207,0 10px 24px rgba(0,0,0,.45)',shBtn='0 3px 0 #122418',shDown='0 1px 0 #122418',shGo='0 6px 0 #92400e',rad='14px',rads='10px',
 tagBg='#fde68a',tagInk='#3b2a14',chipBg='#2f5744',chipLine='#527a64',sub2='#b9d4be',acc='#f59e0b',accInk='#2b1a05',accLine='#fde68a',accSub='#6b3f05',go='#f59e0b',goInk='#2b1a05',hud='#122418',
 prog='linear-gradient(90deg,#86efac,#fde68a)',qbg='rgba(30,58,42,.95)',qink='#f6f1e0',qhl='#fde68a',veil='rgba(18,36,24,.74)',track='#2f5744',title='#fff',title1='#fde68a',title2='#fff',dInk='#1e3a2a',noR='6px',scR='8px',wz='#223f31'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#1e3a2a;background-image:radial-gradient(circle at 20% 15%,rgba(255,255,255,.08),transparent 40%),repeating-linear-gradient(0deg,rgba(255,255,255,.03) 0 2px,transparent 2px 30px)}
.sign h1{text-shadow:0 4px 0 #14532d,0 0 18px rgba(253,230,138,.35);letter-spacing:.02em}
.sign .sub{border:2px dashed rgba(253,230,138,.8);background:transparent;color:#fde68a;box-shadow:none}
.booth{background:#2d6a3e}
.chip{border-radius:10px}.chip.sel{box-shadow:0 0 0 3px #fde68a}
.fire,.wz-next{border-radius:12px;font-size:30px}
.review li b,.hint b{color:#fde68a}.review,.review summary{color:#f6f1e0}.hint{color:#b9d4be}.maker{color:#b9d4be}
.pcard .nm{filter:none;color:#fff}
.qbox.ask{border:4px solid #a16207;border-radius:12px;font-size:clamp(20px,min(6.2cqw,4.4dvh),38px);box-shadow:0 5px 0 rgba(0,0,0,.4)}
.res-title{text-shadow:0 3px 0 #92400e}
"""+FRCSS)

# 상자 공장: 파란 설계도 + 주황 포인트
skin('blueprint','IBM Plex Sans KR','IBM Plex Sans KR','family=IBM+Plex+Sans+KR:wght@400;700&display=swap',dict(
 page='#0b2a52',ink='#e8f1ff',sub='#9cc2f5',line='#7fb2ff',bw='2px',card='#12396f',cardInk='#e8f1ff',hl='#ffb34d',stage='#082042',
 shCard='0 0 0 1px rgba(127,178,255,.55),0 12px 28px rgba(0,0,0,.45)',shBtn='0 3px 0 #061a38',shDown='0 1px 0 #061a38',shGo='0 6px 0 #9a3f00',rad='8px',rads='6px',
 tagBg='#ff8a1f',tagInk='#2a1200',chipBg='#164a8a',chipLine='#3f77c4',sub2='#9cc2f5',acc='#ff8a1f',accInk='#2a1200',accLine='#ffd199',accSub='#7a3a00',go='#ff8a1f',goInk='#2a1200',hud='#061a38',
 prog='linear-gradient(90deg,#60a5fa,#ff8a1f)',qbg='rgba(11,42,82,.95)',qink='#e8f1ff',qhl='#ffd199',veil='rgba(6,26,56,.74)',track='#164a8a',title='#fff',title1='#ffd199',title2='#fff',dInk='#0b2a52',noR='4px',scR='6px',wz='#0f3366'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:700}
body{background:#0b2a52;background-image:linear-gradient(rgba(127,178,255,.13) 1px,transparent 1px),linear-gradient(90deg,rgba(127,178,255,.13) 1px,transparent 1px),linear-gradient(rgba(127,178,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(127,178,255,.06) 1px,transparent 1px);background-size:80px 80px,80px 80px,16px 16px,16px 16px}
.sign h1{text-shadow:0 0 0 #000,2px 2px 0 #ff8a1f;letter-spacing:.01em}
.sign .sub{border:1px solid rgba(127,178,255,.8);background:rgba(127,178,255,.12);color:#cfe3ff;box-shadow:none;border-radius:4px}
.booth{background:#061a38}
.chip{border-radius:4px}.chip.sel{box-shadow:0 0 0 2px #ffd199}
.fire,.wz-next{border-radius:4px;letter-spacing:.04em}
.review li b,.hint b{color:#ffd199}.review,.review summary{color:#e8f1ff}.hint{color:#9cc2f5}.maker{color:#9cc2f5}
.pcard .nm{filter:none;color:#fff}
.qbox.ask{border:1px solid rgba(127,178,255,.7);font-size:clamp(16px,min(5cqw,3.7dvh),28px)}
.res-title{text-shadow:2px 2px 0 #ff8a1f}
""")

# 문장 수리 공방: 종이 + 타자기 + 슬레이트
skin('workshop','Nanum Myeongjo','Gowun Batang','family=Nanum+Myeongjo:wght@700;800&family=Gowun+Batang',dict(
 page='#f4ead8',ink='#3b2f26',sub='#7d6b5a',line='#3b2f26',bw='2px',card='#fffaf0',cardInk='#3b2f26',hl='#c2410c',stage='#eadcc2',
 shCard='5px 5px 0 #3b2f26',shBtn='3px 3px 0 #3b2f26',shDown='1px 1px 0 #3b2f26',shGo='5px 5px 0 #1e293b',rad='4px',rads='3px',
 tagBg='#334155',tagInk='#fff',chipBg='#fffaf0',chipLine='#3b2f26',sub2='#7d6b5a',acc='#c2410c',accLine='#7c2d12',accSub='#ffe7d6',go='#334155',goInk='#fff',hud='#2b3340',
 prog='linear-gradient(90deg,#c2410c,#f59e0b)',qbg='#fffaf0',qink='#3b2f26',veil='rgba(43,51,64,.7)',track='#e0d1b5',title='#fff',title1='#fed7aa',title2='#fff',noR='3px',scR='4px'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:800}
body{background:#f4ead8;background-image:repeating-linear-gradient(0deg,transparent 0 31px,rgba(125,107,90,.14) 31px 32px)}
.sign h1{text-shadow:3px 3px 0 #1e293b;letter-spacing:.01em}
.sign .sub{border:2px solid #3b2f26;background:#fffaf0;color:#3b2f26;box-shadow:3px 3px 0 #3b2f26;border-radius:2px}
.booth{background:#475569}
.chip{border-radius:2px}.chip.sel{box-shadow:3px 3px 0 #7c2d12}
.fire,.wz-next{border-radius:3px;letter-spacing:.03em}
.qbox.ask{border:2px solid #3b2f26;border-radius:3px;font-size:clamp(17px,min(5.2cqw,3.8dvh),30px);box-shadow:4px 4px 0 #3b2f26}
.res-title{text-shadow:3px 3px 0 #1e293b}
""")

# 이야기 만화 편집부: 만화책 (하프톤 점, 굵은 테두리, 오프셋 그림자)
skin('comic','Dokdo','Gowun Dodum','family=Dokdo&family=Gowun+Dodum',dict(
 page='#fff3c4',ink='#1a1a2e',sub='#6b6b8a',line='#1a1a2e',bw='3px',card='#ffffff',cardInk='#1a1a2e',hl='#e11d48',stage='#ffe58a',
 shCard='6px 6px 0 #1a1a2e',shBtn='4px 4px 0 #1a1a2e',shDown='1px 1px 0 #1a1a2e',shGo='6px 6px 0 #1a1a2e',rad='8px',rads='6px',
 tagBg='#facc15',tagInk='#1a1a2e',chipBg='#ffffff',chipLine='#1a1a2e',sub2='#6b6b8a',acc='#e11d48',accLine='#1a1a2e',accSub='#ffe4e9',go='#4338ca',goInk='#fff',hud='#1a1a2e',
 prog='linear-gradient(90deg,#e11d48,#facc15,#4338ca)',qbg='#ffffff',qink='#1a1a2e',veil='rgba(26,26,46,.72)',track='#f3e3a0',title='#fff',title1='#fde047',title2='#fff',noR='4px',scR='6px'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#fff3c4;background-image:radial-gradient(circle,rgba(225,29,72,.22) 2.5px,transparent 3px);background-size:20px 20px}
.sign h1{text-shadow:3px 3px 0 #1a1a2e,-2px -2px 0 #1a1a2e,2px -2px 0 #1a1a2e,-2px 2px 0 #1a1a2e;letter-spacing:.03em;transform:rotate(-2deg)}
.sign .sub{border:3px solid #1a1a2e;background:#facc15;color:#1a1a2e;box-shadow:3px 3px 0 #1a1a2e;transform:rotate(1.5deg)}
.booth{background:#4338ca}
.chip{border-radius:6px;font-weight:700}.chip.sel{box-shadow:4px 4px 0 #1a1a2e}
.fire,.wz-next{border-radius:8px;font-size:32px}
.qbox.ask{border:3px solid #1a1a2e;border-radius:18px 18px 18px 4px;font-size:clamp(18px,min(5.6cqw,4dvh),34px);box-shadow:5px 5px 0 #1a1a2e}
.res-title{text-shadow:3px 3px 0 #1a1a2e,-1px -1px 0 #1a1a2e}
""")

# 낱말 연구소: 짙은 청록 콘솔 + 마젠타·청록 원소 타일
skin('chem','Do Hyeon','Gowun Dodum','family=Do+Hyeon&family=Gowun+Dodum',dict(
 page='#0f2a2e',ink='#e6fffb',sub='#8bc9c3',line='#5eead4',bw='2px',card='#17393f',cardInk='#e6fffb',hl='#5eead4',stage='#0a1d20',
 shCard='0 0 0 1px rgba(94,234,212,.4),0 12px 28px rgba(0,0,0,.5)',shBtn='0 3px 0 #08181a',shDown='0 1px 0 #08181a',shGo='0 6px 0 #86198f',rad='12px',rads='8px',
 tagBg='#d946ef',tagInk='#fff',chipBg='#1d4a52',chipLine='#2f7c86',sub2='#8bc9c3',acc='#d946ef',accInk='#fff',accLine='#f0abfc',accSub='#fae8ff',go='#d946ef',goInk='#fff',hud='#08181a',
 prog='linear-gradient(90deg,#5eead4,#d946ef)',qbg='rgba(15,42,46,.95)',qink='#e6fffb',qhl='#5eead4',veil='rgba(8,24,26,.74)',track='#1d4a52',title='#fff',title1='#99f6e4',title2='#fff',dInk='#0f2a2e',noR='6px',scR='8px',wz='#123237'),
 """body{background:#0f2a2e;background-image:radial-gradient(circle at 15% 20%,rgba(217,70,239,.16),transparent 40%),radial-gradient(circle at 85% 80%,rgba(94,234,212,.14),transparent 40%)}
.sign h1{text-shadow:0 0 22px rgba(94,234,212,.6);letter-spacing:.03em}
.sign .sub{border:1px solid rgba(94,234,212,.7);background:rgba(94,234,212,.12);color:#99f6e4;box-shadow:none}
.booth{background:#08181a}
.chip{border-radius:8px}.chip.sel{box-shadow:0 0 16px rgba(217,70,239,.7)}
.fire,.wz-next{border-radius:8px;letter-spacing:.04em}
.review li b,.hint b{color:#99f6e4}.review,.review summary{color:#e6fffb}.hint{color:#8bc9c3}.maker{color:#8bc9c3}
.pcard .nm{filter:none;color:#fff}
.qbox.ask{border:1px solid rgba(94,234,212,.6);font-size:clamp(17px,min(5.2cqw,3.8dvh),30px)}
.res-title{text-shadow:0 0 20px rgba(94,234,212,.6)}
""")

# 비유 화가의 아틀리에: 크림 종이 + 보라·주황 물감
skin('atelier','Gaegu','Gowun Dodum','family=Gaegu:wght@400;700&family=Gowun+Dodum',dict(
 page='#fbf3e4',ink='#3b1d5a',sub='#8a6aa8',line='#3b1d5a',bw='3px',card='#ffffff',cardInk='#3b1d5a',hl='#c026d3',stage='#f3e6cc',
 shCard='0 6px 0 #3b1d5a',shBtn='0 4px 0 #3b1d5a',shDown='0 1px 0 #3b1d5a',shGo='0 6px 0 #581c87',rad='22px',rads='14px',
 tagBg='#f97316',tagInk='#fff',chipBg='#ffffff',chipLine='#3b1d5a',sub2='#8a6aa8',acc='#c026d3',accLine='#581c87',go='#7e22ce',hud='#3b1d5a',
 prog='linear-gradient(90deg,#c026d3,#f97316,#facc15)',qbg='#ffffff',qink='#3b1d5a',veil='rgba(59,29,90,.68)',track='#eadcf5',title='#fff',title1='#fde68a',title2='#fff'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:700}
body{background:#fbf3e4;background-image:radial-gradient(circle at 12% 18%,rgba(192,38,211,.16),transparent 22%),radial-gradient(circle at 88% 22%,rgba(249,115,22,.18),transparent 22%),radial-gradient(circle at 70% 85%,rgba(34,211,238,.14),transparent 24%)}
.sign h1{text-shadow:0 4px 0 #581c87,3px 3px 0 #3b1d5a;letter-spacing:.02em}
.sign .sub{border-radius:999px;box-shadow:0 3px 0 #3b1d5a}
.booth{background:#7e22ce}
.chip{border-radius:18px;font-weight:700;font-size:1.1em}.chip.sel{box-shadow:0 5px 0 #581c87}
.fire,.wz-next{border-radius:999px;font-size:1.3em}
.qbox.ask{border:3px solid #3b1d5a;border-radius:24px;font-size:clamp(19px,min(5.8cqw,4.2dvh),34px);box-shadow:0 5px 0 #3b1d5a}
.res-title{text-shadow:0 4px 0 #581c87}
""")

# 어린이 뉴스룸: 신문 인쇄 느낌 (파랑·빨강)
skin('news','Black Han Sans','Gowun Dodum','family=Black+Han+Sans&family=Gowun+Dodum',dict(
 page='#eef2ff',ink='#0f1f5c',sub='#5b6aa6',line='#0f1f5c',bw='3px',card='#fffffa',cardInk='#0f1f5c',hl='#dc2626',stage='#dfe6ff',
 shCard='5px 5px 0 #0f1f5c',shBtn='3px 3px 0 #0f1f5c',shDown='1px 1px 0 #0f1f5c',shGo='5px 5px 0 #7f1d1d',rad='4px',rads='3px',
 tagBg='#dc2626',tagInk='#fff',chipBg='#fffffa',chipLine='#0f1f5c',sub2='#5b6aa6',acc='#1e3a8a',accLine='#0f1f5c',go='#dc2626',hud='#0f1f5c',
 prog='linear-gradient(90deg,#1e3a8a,#dc2626)',qbg='#fffffa',qink='#0f1f5c',veil='rgba(15,31,92,.7)',track='#cfd8f5',title='#fff',title1='#fecaca',title2='#fff',noR='3px',scR='4px'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#eef2ff;background-image:repeating-linear-gradient(0deg,transparent 0 19px,rgba(15,31,92,.07) 19px 20px)}
.sign h1{text-shadow:3px 3px 0 #0f1f5c;letter-spacing:.01em}
.sign .sub{border:2px solid #0f1f5c;background:#fffffa;color:#0f1f5c;box-shadow:3px 3px 0 #0f1f5c;border-radius:2px}
.booth{background:#1e3a8a}
.chip{border-radius:2px}.chip.sel{box-shadow:3px 3px 0 #7f1d1d}
.fire,.wz-next{border-radius:3px;font-size:28px}
.qbox.ask{border:3px solid #0f1f5c;border-radius:3px;font-size:clamp(18px,min(5.4cqw,3.9dvh),32px);box-shadow:5px 5px 0 #0f1f5c}
.res-title{text-shadow:3px 3px 0 #0f1f5c}
""")

# 속담 카드 짝 맞추기: 한지 + 먹 + 도장 빨강
skin('hanji','Yeon Sung','Gowun Batang','family=Yeon+Sung&family=Gowun+Batang',dict(
 page='#f3e6c8',ink='#3a2414',sub='#8a6a47',line='#3a2414',bw='2px',card='#fff8e6',cardInk='#3a2414',hl='#b91c1c',stage='#ead8b0',
 shCard='0 6px 14px rgba(58,36,20,.28)',shBtn='0 3px 0 #b89b6a',shDown='0 1px 0 #b89b6a',shGo='0 6px 0 #7f1d1d',rad='10px',rads='8px',
 tagBg='#b91c1c',tagInk='#fff',chipBg='#fff8e6',chipLine='#b89b6a',sub2='#8a6a47',acc='#0f766e',accLine='#134e4a',go='#b91c1c',hud='#3a2414',
 prog='linear-gradient(90deg,#0f766e,#b91c1c)',qbg='rgba(255,248,230,.97)',qink='#3a2414',veil='rgba(58,36,20,.7)',track='#e3d0a4',title='#fff',title1='#fde7c8',title2='#fff'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#f3e6c8;background-image:linear-gradient(rgba(139,106,71,.08) 2px,transparent 2px),linear-gradient(90deg,rgba(139,106,71,.08) 2px,transparent 2px);background-size:38px 38px}
.sign h1{text-shadow:3px 3px 0 #7f1d1d,0 0 14px rgba(0,0,0,.3);letter-spacing:.04em}
.sign .sub{border:2px solid #fde7c8;background:rgba(58,36,20,.55);color:#fde7c8;box-shadow:none}
.booth{background:#0f766e}
.chip{border-radius:8px}.chip.sel{box-shadow:0 4px 0 #134e4a}
.fire,.wz-next{border-radius:8px;font-size:30px}
.qbox.ask{border:2px solid #3a2414;border-radius:8px;font-size:clamp(18px,min(5.5cqw,4dvh),32px);box-shadow:0 5px 0 rgba(58,36,20,.3)}
.res-title{text-shadow:0 3px 0 #7f1d1d}
""")

# 높임말 호텔: 자주색 + 금색 (우아한 호텔 로비)
skin('hotel','Gowun Batang','Gowun Batang','family=Gowun+Batang:wght@400;700',dict(
 page='#2a0a14',ink='#fdeccf',sub='#d2a99a',line='#d4a72c',bw='2px',card='#3d1020',cardInk='#fdeccf',hl='#f2c14e',stage='#1d0710',
 shCard='0 0 0 1px rgba(212,167,44,.5),0 12px 30px rgba(0,0,0,.55)',shBtn='0 3px 0 #1d0710',shDown='0 1px 0 #1d0710',shGo='0 6px 0 #854d0e',rad='14px',rads='10px',
 tagBg='#d4a72c',tagInk='#2a0a14',chipBg='#51162b',chipLine='#7d2a45',sub2='#d2a99a',acc='#d4a72c',accInk='#2a0a14',accLine='#fde68a',accSub='#5b4710',go='#d4a72c',goInk='#2a0a14',hud='#1d0710',
 prog='linear-gradient(90deg,#9f1239,#f2c14e)',qbg='rgba(42,10,20,.95)',qink='#fdeccf',qhl='#f2c14e',veil='rgba(29,7,16,.74)',track='#51162b',title='#fff',title1='#fde68a',title2='#fff',dInk='#2a0a14',noR='50%',scR='10px',wz='#350d1a'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:700}
body{background:#2a0a14;background-image:radial-gradient(circle at 50% -10%,rgba(242,193,78,.25),transparent 45%),repeating-linear-gradient(90deg,rgba(255,255,255,.02) 0 2px,transparent 2px 40px)}
.sign h1{text-shadow:0 0 20px rgba(242,193,78,.55),0 3px 0 #000;letter-spacing:.04em}
.sign .sub{border:1px solid rgba(212,167,44,.8);background:rgba(212,167,44,.12);color:#fde68a;box-shadow:none}
.booth{background:#1d0710}
.chip{border-radius:10px}.chip.sel{box-shadow:0 0 16px rgba(212,167,44,.65)}
.fire,.wz-next{border-radius:10px;letter-spacing:.05em}
.review li b,.hint b{color:#fde68a}.review,.review summary{color:#fdeccf}.hint{color:#d2a99a}.maker{color:#d2a99a}
.pcard .nm{filter:none;color:#fff}
.qbox.ask{border:1px solid rgba(212,167,44,.65);font-size:clamp(16px,min(5cqw,3.7dvh),28px)}
.res-title{text-shadow:0 0 20px rgba(242,193,78,.6)}
""")
