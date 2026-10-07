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

# 한글 블록 공장: 블록 장난감 느낌 (노랑·파랑·빨강 원색, 두툼한 외곽선)
skin('blocks','Hi Melody','Gowun Dodum','family=Hi+Melody&family=Gowun+Dodum',dict(
 page='#fff3c4',ink='#1e3a8a',sub='#5b6fa8',line='#1e3a8a',bw='3px',card='#ffffff',cardInk='#1e3a8a',hl='#e11d48',stage='#ffe58a',
 shCard='0 6px 0 #1e3a8a',shBtn='0 4px 0 #1e3a8a',shDown='0 1px 0 #1e3a8a',shGo='0 7px 0 #9f1239',rad='16px',rads='12px',
 tagBg='#e11d48',tagInk='#fff',chipBg='#fff9e0',chipLine='#1e3a8a',sub2='#5b6fa8',acc='#2563eb',accLine='#1e3a8a',go='#e11d48',hud='#1e3a8a',
 prog='linear-gradient(90deg,#facc15,#e11d48)',qbg='rgba(255,255,255,.97)',qink='#1e3a8a',veil='rgba(30,58,138,.65)',track='#ffe58a',title='#fff',title1='#fde047',title2='#fff',noR='10px'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#fff3c4;background-image:radial-gradient(circle,rgba(30,58,138,.12) 3px,transparent 4px);background-size:34px 34px}
.sign h1{text-shadow:0 4px 0 #1e3a8a,0 7px 0 #1e3a8a;letter-spacing:.02em}
.sign .sub{border:3px solid #1e3a8a;background:#fde047;color:#1e3a8a;box-shadow:0 4px 0 #1e3a8a}
.booth{background:#2563eb}
.chip{border-radius:12px}.chip.sel{box-shadow:0 5px 0 #1e3a8a}
.fire,.wz-next{border-radius:14px;font-size:30px}
.qbox.ask{border:3px solid #1e3a8a;border-radius:14px;font-size:clamp(18px,min(5.6cqw,4dvh),34px);box-shadow:0 5px 0 #1e3a8a}
.res-title{text-shadow:0 4px 0 #1e3a8a}
""")

# 흉내 내는 말 동물원: 초록 풀밭 + 해바라기 노랑 + 말랑한 둥근 모양
skin('zoo','Poor Story','Gowun Dodum','family=Poor+Story&family=Gowun+Dodum',dict(
 page='#dcfce7',ink='#14532d',sub='#4d7c5a',line='#15803d',bw='3px',card='#ffffff',cardInk='#14532d',hl='#ea580c',stage='#bbf7d0',
 shCard='0 6px 0 #86c99a',shBtn='0 4px 0 #86c99a',shDown='0 1px 0 #86c99a',shGo='0 7px 0 #b45309',rad='26px',rads='18px',
 tagBg='#f59e0b',tagInk='#fff',chipBg='#f0fdf4',chipLine='#86c99a',sub2='#4d7c5a',acc='#16a34a',accLine='#14532d',go='#f59e0b',hud='#14532d',
 prog='linear-gradient(90deg,#86efac,#f59e0b)',qbg='rgba(255,255,255,.97)',qink='#14532d',veil='rgba(20,83,45,.62)',track='#bbf7d0',title='#fff',title1='#fef08a',title2='#fff',noR='50%'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#dcfce7;background-image:radial-gradient(circle at 20% 20%,rgba(250,204,21,.35),transparent 28%),radial-gradient(circle at 85% 80%,rgba(34,197,94,.25),transparent 30%)}
.sign h1{text-shadow:0 4px 0 #166534,0 8px 18px rgba(0,60,20,.35);letter-spacing:.03em}
.sign .sub{border:0;background:#fef08a;color:#713f12;box-shadow:0 4px 0 #ca8a04}
.booth{background:#16a34a}
.chip{border-radius:18px}.chip.sel{box-shadow:0 5px 0 #14532d}
.fire,.wz-next{border-radius:999px;font-size:32px}
.qbox.ask{border:3px solid #16a34a;border-radius:22px;font-size:clamp(18px,min(5.8cqw,4.2dvh),36px);box-shadow:0 5px 0 #86c99a}
.res-title{text-shadow:0 4px 0 #166534}
""")

# 허들 셈 달리기: 운동회 — 하늘색 + 달리기 트랙 주황
skin('track','Bagel Fat One','Gowun Dodum','family=Bagel+Fat+One&family=Gowun+Dodum',dict(
 page='#e5f6ff',ink='#1e2a4a',sub='#5b6b8c',line='#1e2a4a',bw='3px',card='#ffffff',cardInk='#1e2a4a',hl='#e0633f',stage='#cfeaff',
 shCard='0 6px 0 #1e2a4a',shBtn='0 4px 0 #1e2a4a',shDown='0 1px 0 #1e2a4a',shGo='0 7px 0 #a8391a',rad='20px',rads='14px',
 tagBg='#e0633f',tagInk='#fff',chipBg='#f4fbff',chipLine='#1e2a4a',sub2='#5b6b8c',acc='#2f80ed',accLine='#1e2a4a',go='#f26b38',hud='#1e2a4a',
 prog='linear-gradient(90deg,#fde047,#f26b38)',qbg='rgba(255,255,255,.97)',qink='#1e2a4a',veil='rgba(30,42,74,.62)',track='#cfeaff',title='#fff',title1='#fde047',title2='#fff',noR='50%'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#e5f6ff;background-image:linear-gradient(180deg,#bfe6ff,#e5f6ff 55%,#fff6d6)}
.sign h1{text-shadow:0 4px 0 #1e2a4a,0 7px 0 #1e2a4a;letter-spacing:.02em}
.sign .sub{border:3px solid #1e2a4a;background:#fde047;color:#1e2a4a;box-shadow:0 4px 0 #1e2a4a}
.booth{background:#8fd3ff}
.chip{border-radius:14px}.chip.sel{box-shadow:0 5px 0 #1e2a4a}
.fire,.wz-next{border-radius:999px;font-size:30px}
.qbox.ask{border:3px solid #1e2a4a;border-radius:16px;font-size:clamp(17px,min(5.2cqw,3.8dvh),30px);box-shadow:0 5px 0 #1e2a4a}
.res-title{text-shadow:0 4px 0 #1e2a4a}
""")

# 곱셈 부스터 레이싱: 밤 서킷 — 남색 + 형광 빨강/노랑
skin('racing','Gugi','Gowun Dodum','family=Gugi&family=Gowun+Dodum',dict(
 page='#0d1128',ink='#fff7e6',sub='#9aa3d6',line='#e8412c',bw='3px',card='#1a2150',cardInk='#fff7e6',hl='#facc15',stage='#0b1030',
 shCard='0 0 0 1px rgba(250,204,21,.4),0 10px 28px rgba(0,0,0,.6)',shBtn='0 4px 0 #7f1d1d',shDown='0 1px 0 #7f1d1d',shGo='0 7px 0 #7f1d1d',rad='16px',rads='12px',
 tagBg='#facc15',tagInk='#14182b',chipBg='#232b63',chipLine='#3f4a9e',sub2='#9aa3d6',acc='#e8412c',accLine='#facc15',go='#e8412c',hud='#0b1030',
 prog='linear-gradient(90deg,#facc15,#e8412c)',qbg='rgba(26,33,80,.96)',qink='#fff7e6',qhl='#facc15',veil='rgba(11,16,48,.75)',track='#232b63',title='#fff',title1='#facc15',title2='#fff',dInk='#14182b',noR='8px',scR='10px',wz='#161c44'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#0d1128;background-image:repeating-linear-gradient(45deg,rgba(255,255,255,.04) 0 14px,transparent 14px 28px)}
.sign h1{text-shadow:0 0 18px rgba(232,65,44,.8),0 4px 0 #7f1d1d;letter-spacing:.03em;font-style:italic}
.sign .sub{border:2px solid #facc15;background:rgba(250,204,21,.12);color:#fde68a;box-shadow:none}
.booth{background:#0b1030}
.chip{border-radius:10px}.chip.sel{box-shadow:0 0 16px rgba(250,204,21,.6)}
.fire,.wz-next{border-radius:10px;font-size:30px;font-style:italic}
.review li b,.hint b{color:#fde68a}.review,.review summary{color:#fff7e6}.hint{color:#9aa3d6}.maker{color:#9aa3d6}
.qbox.ask{border:2px solid #e8412c;border-radius:12px;font-size:clamp(16px,min(5cqw,3.7dvh),28px);box-shadow:0 0 14px rgba(232,65,44,.45)}
.res-title{text-shadow:0 0 18px rgba(250,204,21,.7)}
""")

# 나눗셈 배달 트럭: 종이 상자 크라프트 + 테이프 + 우체국 빨강
skin('parcel','Cute Font','Gowun Dodum','family=Cute+Font&family=Gowun+Dodum',dict(
 page='#f3e2c3',ink='#3b2e2a',sub='#8a6b4a',line='#3b2e2a',bw='3px',card='#fffaf0',cardInk='#3b2e2a',hl='#d9482b',stage='#e8cfa0',
 shCard='0 6px 0 #a16207',shBtn='0 4px 0 #a16207',shDown='0 1px 0 #a16207',shGo='0 7px 0 #7c2d12',rad='12px',rads='10px',
 tagBg='#d9482b',tagInk='#fff',chipBg='#fff3d9',chipLine='#b89b6a',sub2='#8a6b4a',acc='#2f9e68',accLine='#14532d',go='#d9482b',hud='#5b3a1e',
 prog='linear-gradient(90deg,#fde68a,#d9482b)',qbg='rgba(255,250,240,.97)',qink='#3b2e2a',veil='rgba(91,58,30,.66)',track='#e8cfa0',title='#fff',title1='#fde68a',title2='#fff',noR='6px',scR='8px'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#f3e2c3;background-image:repeating-linear-gradient(0deg,rgba(161,98,7,.05) 0 2px,transparent 2px 9px),linear-gradient(90deg,transparent 48%,rgba(243,217,164,.9) 48% 52%,transparent 52%)}
.sign h1{text-shadow:0 4px 0 #7c2d12,0 7px 14px rgba(60,30,0,.3);letter-spacing:.03em}
.sign .sub{border:2px dashed #3b2e2a;background:#f3d9a4;color:#3b2e2a;box-shadow:none}
.booth{background:#d9a066}
.chip{border-radius:8px}.chip.sel{box-shadow:0 5px 0 #14532d}
.fire,.wz-next{border-radius:8px;font-size:32px}
.qbox.ask{border:3px solid #3b2e2a;border-radius:8px;font-size:clamp(18px,min(5.6cqw,4dvh),32px);box-shadow:0 5px 0 #a16207}
.res-title{text-shadow:0 4px 0 #7c2d12}
""")

# 약수·배수 크레인: 보랏빛 오락실 + 금색 코인
skin('arcade','Jua','Gowun Dodum','family=Jua&family=Gowun+Dodum',dict(
 page='#130828',ink='#fbefff',sub='#c7b3ea',line='#7c5fc7',bw='3px',card='#231050',cardInk='#fbefff',hl='#ffd23f',stage='#0c041c',
 shCard='0 0 0 1px rgba(255,210,63,.35),0 10px 28px rgba(0,0,0,.6)',shBtn='0 4px 0 #0c041c',shDown='0 1px 0 #0c041c',shGo='0 7px 0 #8a1f55',rad='18px',rads='12px',
 tagBg='#ffd23f',tagInk='#4a3300',chipBg='#30186a',chipLine='#5b3fa8',sub2='#c7b3ea',acc='#ff4f9a',accLine='#ffd23f',go='#ff4f9a',hud='#0c041c',
 prog='linear-gradient(90deg,#ffd23f,#ff4f9a)',qbg='rgba(35,16,80,.96)',qink='#fbefff',qhl='#ffd23f',veil='rgba(12,4,28,.76)',track='#30186a',title='#ffd23f',title1='#ffe9a0',title2='#ffd23f',dInk='#2a1440',noR='50%',wz='#1b0c3f'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#130828;background-image:radial-gradient(ellipse at 50% -10%,#3d1c80,transparent 60%),radial-gradient(circle,rgba(255,255,255,.07) 2px,transparent 3px);background-size:auto,38px 38px}
.sign h1{text-shadow:0 4px 0 #c42a6e,0 0 22px rgba(255,79,154,.6);letter-spacing:.02em}
.sign .sub{border:2px solid #ffd23f;background:rgba(255,210,63,.12);color:#ffe9a0;box-shadow:none}
.booth{background:#1b0c3f}
.chip{border-radius:12px}.chip.sel{box-shadow:0 0 16px rgba(255,210,63,.6)}
.fire,.wz-next{border-radius:999px;font-size:30px;color:#fff}
.review li b,.hint b{color:#ffe9a0}.review,.review summary{color:#fbefff}.hint{color:#c7b3ea}.maker{color:#c7b3ea}
.qbox.ask{border:2px solid #ffd23f;border-radius:14px;font-size:clamp(16px,min(5cqw,3.7dvh),28px);box-shadow:0 0 14px rgba(255,210,63,.4)}
.res-title{text-shadow:0 0 18px rgba(255,210,63,.7)}
""")

# 마음 우체국: 분홍 우체국 + 크림 편지지
skin('post','Gaegu','Gowun Dodum','family=Gaegu:wght@400;700&family=Gowun+Dodum',dict(
 page='#fde8f3',ink='#7a1d4b',sub='#b0507f',line='#9d174d',bw='3px',card='#fffdf5',cardInk='#7a1d4b',hl='#db2777',stage='#fbcfe8',
 shCard='0 6px 0 #f9a8d4',shBtn='0 4px 0 #f9a8d4',shDown='0 1px 0 #f9a8d4',shGo='0 7px 0 #9d174d',rad='24px',rads='16px',
 tagBg='#db2777',tagInk='#fff',chipBg='#fff1f7',chipLine='#f9a8d4',sub2='#b0507f',acc='#ec4899',accLine='#9d174d',go='#ec4899',hud='#9d174d',
 prog='linear-gradient(90deg,#fcd34d,#ec4899)',qbg='rgba(255,253,245,.97)',qink='#7a1d4b',veil='rgba(122,29,75,.6)',track='#fbcfe8',title='#fff',title1='#fef3c7',title2='#fff',noR='50%'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:700}
body{background:#fde8f3;background-image:radial-gradient(circle at 15% 20%,rgba(251,191,36,.25),transparent 30%),radial-gradient(circle,rgba(219,39,119,.1) 2px,transparent 3px);background-size:auto,30px 30px}
.sign h1{text-shadow:0 4px 0 #9d174d,0 8px 16px rgba(120,20,70,.3);letter-spacing:.03em}
.sign .sub{border:2px dashed #9d174d;background:#fff7ed;color:#9d174d;box-shadow:none}
.booth{background:#f9a8d4}
.chip{border-radius:20px}.chip.sel{box-shadow:0 5px 0 #9d174d}
.fire,.wz-next{border-radius:999px;font-size:32px}
.qbox.ask{border:3px solid #9d174d;border-radius:22px;font-size:clamp(18px,min(5.8cqw,4.2dvh),36px);box-shadow:0 5px 0 #f9a8d4}
.res-title{text-shadow:0 4px 0 #9d174d}
""")

# 낱말 시소 놀이터: 햇살 놀이터 — 보라 + 노랑 + 연두
skin('seesaw','Jua','Gowun Dodum','family=Jua&family=Gowun+Dodum',dict(
 page='#e6f7ff',ink='#3b1d8a',sub='#6d56b8',line='#3b1d8a',bw='3px',card='#ffffff',cardInk='#3b1d8a',hl='#7c3aed',stage='#cdeeff',
 shCard='0 6px 0 #3b1d8a',shBtn='0 4px 0 #3b1d8a',shDown='0 1px 0 #3b1d8a',shGo='0 7px 0 #4c1d95',rad='22px',rads='16px',
 tagBg='#fbbf24',tagInk='#3b1d8a',chipBg='#f6f1ff',chipLine='#3b1d8a',sub2='#6d56b8',acc='#7c3aed',accLine='#3b1d8a',go='#7c3aed',hud='#3b1d8a',
 prog='linear-gradient(90deg,#fbbf24,#7c3aed)',qbg='rgba(255,255,255,.97)',qink='#3b1d8a',veil='rgba(59,29,138,.6)',track='#cdeeff',title='#fff',title1='#fde68a',title2='#fff',noR='50%'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#e6f7ff;background-image:linear-gradient(180deg,#bfe9ff,#e6f7ff 55%,#dcfce7)}
.sign h1{text-shadow:0 4px 0 #3b1d8a,0 7px 0 #3b1d8a;letter-spacing:.02em}
.sign .sub{border:3px solid #3b1d8a;background:#fde68a;color:#3b1d8a;box-shadow:0 4px 0 #3b1d8a}
.booth{background:#8ad0ff}
.chip{border-radius:16px}.chip.sel{box-shadow:0 5px 0 #3b1d8a}
.fire,.wz-next{border-radius:999px;font-size:31px}
.qbox.ask{border:3px solid #3b1d8a;border-radius:18px;font-size:clamp(18px,min(5.6cqw,4dvh),34px);box-shadow:0 5px 0 #3b1d8a}
.res-title{text-shadow:0 4px 0 #3b1d8a}
""")

# 국어사전 탐험대: 가죽 표지 + 양피지 + 탐험 청록
skin('explorer','Hahmlet','Gowun Batang','family=Hahmlet:wght@700;800&family=Gowun+Batang:wght@400;700',dict(
 page='#f3e2bd',ink='#3b2412',sub='#8a6238',line='#7c3f0c',bw='3px',card='#fff8e6',cardInk='#3b2412',hl='#c2410c',stage='#e8cf9b',
 shCard='0 6px 0 #92400e',shBtn='0 4px 0 #92400e',shDown='0 1px 0 #92400e',shGo='0 7px 0 #064e3b',rad='14px',rads='10px',
 tagBg='#0e7490',tagInk='#fff',chipBg='#fdf1d6',chipLine='#b78545',sub2='#8a6238',acc='#0e7490',accLine='#134e4a',go='#0e7490',hud='#5b3213',
 prog='linear-gradient(90deg,#fbbf24,#0e7490)',qbg='rgba(255,248,230,.97)',qink='#3b2412',veil='rgba(59,36,18,.7)',track='#e8cf9b',title='#fff',title1='#fde68a',title2='#fff',noR='8px',scR='10px'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:800}
body{background:#f3e2bd;background-image:radial-gradient(circle at 50% 0,rgba(180,83,9,.15),transparent 50%),repeating-linear-gradient(0deg,rgba(124,63,12,.04) 0 2px,transparent 2px 7px)}
.sign h1{text-shadow:0 4px 0 #5b3213,0 8px 16px rgba(60,30,0,.4);letter-spacing:.02em}
.sign .sub{border:2px solid #fde68a;background:rgba(91,50,19,.6);color:#fde68a;box-shadow:none}
.booth{background:#7c4a1e}
.chip{border-radius:10px}.chip.sel{box-shadow:0 5px 0 #134e4a}
.fire,.wz-next{border-radius:10px;font-size:29px}
.qbox.ask{border:3px solid #7c3f0c;border-radius:12px;font-size:clamp(17px,min(5.2cqw,3.8dvh),31px);box-shadow:0 5px 0 #92400e}
.res-title{text-shadow:0 4px 0 #5b3213}
""")

# 문장 로봇 조립소: 하늘색 공장 + 로봇 노랑
skin('robolab','Do Hyeon','Gowun Dodum','family=Do+Hyeon&family=Gowun+Dodum',dict(
 page='#dff1ff',ink='#0c3a63',sub='#476b8f',line='#0c3a63',bw='3px',card='#ffffff',cardInk='#0c3a63',hl='#0369a1',stage='#bfe3ff',
 shCard='0 6px 0 #0c3a63',shBtn='0 4px 0 #0c3a63',shDown='0 1px 0 #0c3a63',shGo='0 7px 0 #b45309',rad='14px',rads='10px',
 tagBg='#f59e0b',tagInk='#0c3a63',chipBg='#eef8ff',chipLine='#0c3a63',sub2='#476b8f',acc='#0ea5e9',accLine='#0c3a63',go='#f59e0b',goInk='#0c3a63',hud='#0c3a63',
 prog='linear-gradient(90deg,#fbbf24,#0ea5e9)',qbg='rgba(255,255,255,.97)',qink='#0c3a63',veil='rgba(12,58,99,.65)',track='#bfe3ff',title='#fff',title1='#fde68a',title2='#fff',noR='8px',scR='10px'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#dff1ff;background-image:linear-gradient(rgba(3,105,161,.06) 2px,transparent 2px),linear-gradient(90deg,rgba(3,105,161,.06) 2px,transparent 2px);background-size:36px 36px}
.sign h1{text-shadow:0 4px 0 #0c3a63,0 8px 16px rgba(0,40,80,.3);letter-spacing:.02em}
.sign .sub{border:3px solid #0c3a63;background:#fbbf24;color:#0c3a63;box-shadow:0 4px 0 #0c3a63}
.booth{background:#7dc4f2}
.chip{border-radius:10px}.chip.sel{box-shadow:0 5px 0 #0c3a63}
.fire,.wz-next{border-radius:10px;font-size:30px}
.qbox.ask{border:3px solid #0c3a63;border-radius:12px;font-size:clamp(17px,min(5.2cqw,3.8dvh),31px);box-shadow:0 5px 0 #0c3a63}
.res-title{text-shadow:0 4px 0 #0c3a63}
""")

# 모양 택배 공장: 주황 공장 + 안전 노랑 줄무늬 + 하늘색
skin('shipping','Gasoek One','Gowun Dodum','family=Gasoek+One&family=Gowun+Dodum',dict(
 page='#fff1dc',ink='#7c2d12',sub='#b45309',line='#7c2d12',bw='3px',card='#fffaf0',cardInk='#7c2d12',hl='#ea580c',stage='#fed7aa',
 shCard='0 6px 0 #7c2d12',shBtn='0 4px 0 #7c2d12',shDown='0 1px 0 #7c2d12',shGo='0 7px 0 #7c2d12',rad='14px',rads='10px',
 tagBg='#facc15',tagInk='#1f2937',chipBg='#fff3e0',chipLine='#7c2d12',sub2='#b45309',acc='#ea580c',accLine='#7c2d12',go='#ea580c',hud='#7c2d12',
 prog='linear-gradient(90deg,#facc15,#ea580c)',qbg='rgba(255,250,240,.97)',qink='#7c2d12',veil='rgba(124,45,18,.66)',track='#fed7aa',title='#fff',title1='#fde047',title2='#fff',noR='8px',scR='10px'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#fff1dc;background-image:repeating-linear-gradient(135deg,rgba(250,204,21,.18) 0 18px,transparent 18px 36px)}
.sign h1{text-shadow:0 4px 0 #7c2d12,0 8px 14px rgba(80,30,0,.35);letter-spacing:.02em}
.sign .sub{border:3px solid #1f2937;background:#facc15;color:#1f2937;box-shadow:0 4px 0 #1f2937}
.booth{background:#9bd8ff}
.chip{border-radius:10px}.chip.sel{box-shadow:0 5px 0 #7c2d12}
.fire,.wz-next{border-radius:10px;font-size:29px}
.qbox.ask{border:3px solid #7c2d12;border-radius:10px;font-size:clamp(17px,min(5.2cqw,3.8dvh),30px);box-shadow:0 5px 0 #7c2d12}
.res-title{text-shadow:0 4px 0 #7c2d12}
""")

# 문장 기차: 알록달록 장난감 기차 — 빨강 + 노랑 + 하늘
skin('train','Single Day','Gowun Dodum','family=Single+Day&family=Gowun+Dodum',dict(
 page='#e3f6ff',ink='#7f1d1d',sub='#a04a4a',line='#7f1d1d',bw='3px',card='#ffffff',cardInk='#7f1d1d',hl='#dc2626',stage='#bfe9ff',
 shCard='0 6px 0 #7f1d1d',shBtn='0 4px 0 #7f1d1d',shDown='0 1px 0 #7f1d1d',shGo='0 7px 0 #7f1d1d',rad='24px',rads='16px',
 tagBg='#fbbf24',tagInk='#7f1d1d',chipBg='#fff5f5',chipLine='#7f1d1d',sub2='#a04a4a',acc='#2563eb',accLine='#1e3a8a',go='#dc2626',hud='#7f1d1d',
 prog='linear-gradient(90deg,#fbbf24,#dc2626)',qbg='rgba(255,255,255,.97)',qink='#7f1d1d',veil='rgba(127,29,29,.62)',track='#bfe9ff',title='#fff',title1='#fde68a',title2='#fff',noR='50%'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#e3f6ff;background-image:linear-gradient(180deg,#a5e1ff,#e3f6ff 55%,#d8f5d8)}
.sign h1{text-shadow:0 4px 0 #7f1d1d,0 8px 16px rgba(120,20,20,.3);letter-spacing:.03em}
.sign .sub{border:3px solid #7f1d1d;background:#fde68a;color:#7f1d1d;box-shadow:0 4px 0 #7f1d1d}
.booth{background:#8ed3ff}
.chip{border-radius:18px}.chip.sel{box-shadow:0 5px 0 #1e3a8a}
.fire,.wz-next{border-radius:999px;font-size:32px}
.qbox.ask{border:3px solid #7f1d1d;border-radius:20px;font-size:clamp(18px,min(5.8cqw,4.2dvh),36px);box-shadow:0 5px 0 #7f1d1d}
.res-title{text-shadow:0 4px 0 #7f1d1d}
""")

# 시계로 떠나는 하루 여행: 새벽 보라 + 아침 노랑 하늘
skin('clockday','Jua','Gowun Dodum','family=Jua&family=Gowun+Dodum',dict(
 page='#ede9fe',ink='#3b1d8a',sub='#6d56b8',line='#3b1d8a',bw='3px',card='#ffffff',cardInk='#3b1d8a',hl='#7c3aed',stage='#ddd6fe',
 shCard='0 6px 0 #5b3fb0',shBtn='0 4px 0 #5b3fb0',shDown='0 1px 0 #5b3fb0',shGo='0 7px 0 #92400e',rad='22px',rads='16px',
 tagBg='#f59e0b',tagInk='#3b1d8a',chipBg='#f6f1ff',chipLine='#5b3fb0',sub2='#6d56b8',acc='#7c3aed',accLine='#3b1d8a',go='#f59e0b',goInk='#3b1d8a',hud='#3b1d8a',
 prog='linear-gradient(90deg,#fbbf24,#7c3aed)',qbg='rgba(255,255,255,.97)',qink='#3b1d8a',veil='rgba(59,29,138,.62)',track='#ddd6fe',title='#fff',title1='#fde68a',title2='#fff',noR='50%'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#ede9fe;background-image:linear-gradient(180deg,#fed7aa,#ede9fe 40%,#c4b5fd)}
.sign h1{text-shadow:0 4px 0 #3b1d8a,0 8px 16px rgba(60,30,140,.3);letter-spacing:.02em}
.sign .sub{border:3px solid #3b1d8a;background:#fde68a;color:#3b1d8a;box-shadow:0 4px 0 #3b1d8a}
.booth{background:#c4b5fd}
.chip{border-radius:16px}.chip.sel{box-shadow:0 5px 0 #3b1d8a}
.fire,.wz-next{border-radius:999px;font-size:30px}
.qbox.ask{border:3px solid #3b1d8a;border-radius:18px;font-size:clamp(18px,min(5.5cqw,4dvh),33px);box-shadow:0 5px 0 #5b3fb0}
.res-title{text-shadow:0 4px 0 #3b1d8a}
""")

# 가을 운동회 (정답 과녁 슛): 청백 + 홍 + 노랑 깃발
skin('sportsday','Black Han Sans','Gowun Dodum','family=Black+Han+Sans&family=Gowun+Dodum',dict(
 page='#e8f6ff',ink='#1c2b4d',sub='#55658a',line='#1c2b4d',bw='3px',card='#ffffff',cardInk='#1c2b4d',hl='#e53935',stage='#cfeaff',
 shCard='0 6px 0 #1c2b4d',shBtn='0 4px 0 #1c2b4d',shDown='0 1px 0 #1c2b4d',shGo='0 7px 0 #8e1d1a',rad='16px',rads='12px',
 tagBg='#f2a900',tagInk='#1c2b4d',chipBg='#f2f9ff',chipLine='#1c2b4d',sub2='#55658a',acc='#1e66d0',accLine='#1c2b4d',go='#e53935',hud='#1c2b4d',
 prog='linear-gradient(90deg,#f2a900,#e53935)',qbg='rgba(255,255,255,.97)',qink='#1c2b4d',veil='rgba(28,43,77,.65)',track='#cfeaff',title='#fff',title1='#fde047',title2='#fff',noR='8px',scR='10px'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#e8f6ff;background-image:repeating-linear-gradient(90deg,rgba(229,57,53,.08) 0 28px,rgba(30,102,208,.08) 28px 56px)}
.sign h1{text-shadow:0 4px 0 #1c2b4d,0 8px 14px rgba(0,20,60,.35);letter-spacing:.02em}
.sign .sub{border:3px solid #1c2b4d;background:#fde047;color:#1c2b4d;box-shadow:0 4px 0 #1c2b4d}
.booth{background:#8fd3ff}
.chip{border-radius:12px}.chip.sel{box-shadow:0 5px 0 #1c2b4d}
.fire,.wz-next{border-radius:12px;font-size:30px}
.qbox.ask{border:3px solid #1c2b4d;border-radius:14px;font-size:clamp(17px,min(5.2cqw,3.8dvh),30px);box-shadow:0 5px 0 #1c2b4d}
.res-title{text-shadow:0 4px 0 #1c2b4d}
""")

# 친구 톡방: 말랑한 보라 + 민트 메신저
skin('chatroom','Sunflower','Gowun Dodum','family=Sunflower:wght@300;500;700&family=Gowun+Dodum',dict(
 page='#ede9fe',ink='#2d1b69',sub='#6d5cae',line='#6d28d9',bw='3px',card='#ffffff',cardInk='#2d1b69',hl='#7c3aed',stage='#ddd6fe',
 shCard='0 6px 0 #c4b5fd',shBtn='0 4px 0 #c4b5fd',shDown='0 1px 0 #c4b5fd',shGo='0 7px 0 #4c1d95',rad='22px',rads='16px',
 tagBg='#10b981',tagInk='#fff',chipBg='#f6f3ff',chipLine='#c4b5fd',sub2='#6d5cae',acc='#7c3aed',accLine='#4c1d95',go='#7c3aed',hud='#4c1d95',
 prog='linear-gradient(90deg,#34d399,#7c3aed)',qbg='rgba(255,255,255,.97)',qink='#2d1b69',veil='rgba(76,29,149,.62)',track='#ddd6fe',title='#fff',title1='#d1fae5',title2='#fff',noR='50%'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:700}
body{background:#ede9fe;background-image:radial-gradient(circle at 20% 15%,rgba(52,211,153,.25),transparent 30%),radial-gradient(circle,rgba(124,58,237,.1) 2px,transparent 3px);background-size:auto,32px 32px}
.sign h1{text-shadow:0 4px 0 #4c1d95,0 8px 16px rgba(60,20,140,.3);letter-spacing:.02em}
.sign .sub{border:0;background:#d1fae5;color:#064e3b;box-shadow:0 4px 0 #34d399}
.booth{background:#c4b5fd}
.chip{border-radius:18px}.chip.sel{box-shadow:0 5px 0 #4c1d95}
.fire,.wz-next{border-radius:999px;font-size:30px}
.qbox.ask{border:3px solid #7c3aed;border-radius:20px;font-size:clamp(17px,min(5.2cqw,3.8dvh),30px);box-shadow:0 5px 0 #c4b5fd}
.res-title{text-shadow:0 4px 0 #4c1d95}
""")

# 방위 탐험대: 보물 지도 — 바다색 + 양피지 + 먹갈색
skin('treasuremap','Gamja Flower','Gowun Dodum','family=Gamja+Flower&family=Gowun+Dodum',dict(
 page='#e0f0eb',ink='#4a2f12',sub='#7a6342',line='#4a2f12',bw='3px',card='#fffaf0',cardInk='#4a2f12',hl='#0f766e',stage='#bfe0d8',
 shCard='0 6px 0 #4a2f12',shBtn='0 4px 0 #4a2f12',shDown='0 1px 0 #4a2f12',shGo='0 7px 0 #134e4a',rad='16px',rads='12px',
 tagBg='#b45309',tagInk='#fff',chipBg='#fdf6e3',chipLine='#4a2f12',sub2='#7a6342',acc='#0f766e',accLine='#134e4a',go='#0f766e',hud='#134e4a',
 prog='linear-gradient(90deg,#fde68a,#0f766e)',qbg='rgba(255,250,240,.97)',qink='#4a2f12',veil='rgba(19,78,74,.65)',track='#bfe0d8',title='#fff',title1='#fde68a',title2='#fff',noR='8px',scR='10px'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#e0f0eb;background-image:radial-gradient(circle at 50% 120%,rgba(180,83,9,.2),transparent 50%),repeating-linear-gradient(0deg,rgba(15,118,110,.07) 0 3px,transparent 3px 22px)}
.sign h1{text-shadow:0 4px 0 #134e4a,0 8px 16px rgba(0,50,40,.3);letter-spacing:.03em}
.sign .sub{border:2px dashed #4a2f12;background:#fdf0cf;color:#4a2f12;box-shadow:none}
.booth{background:#5fb5a8}
.chip{border-radius:12px}.chip.sel{box-shadow:0 5px 0 #134e4a}
.fire,.wz-next{border-radius:12px;font-size:32px}
.qbox.ask{border:3px solid #4a2f12;border-radius:14px;font-size:clamp(17px,min(5.2cqw,3.8dvh),31px);box-shadow:0 5px 0 #4a2f12}
.res-title{text-shadow:0 4px 0 #134e4a}
""")

# 등고선 깃발 꽂기: 산악 탐험 — 숲 초록 + 나무 갈색 + 깃발 빨강
skin('summit','Stylish','Gowun Dodum','family=Stylish&family=Gowun+Dodum',dict(
 page='#e0efe0',ink='#2b2118',sub='#6b5a43',line='#2b2118',bw='3px',card='#fffdf5',cardInk='#2b2118',hl='#b45309',stage='#c9e2cb',
 shCard='0 6px 0 #5b3a1a',shBtn='0 4px 0 #5b3a1a',shDown='0 1px 0 #5b3a1a',shGo='0 7px 0 #14532d',rad='14px',rads='10px',
 tagBg='#ef4444',tagInk='#fff',chipBg='#f3f8ee',chipLine='#5b3a1a',sub2='#6b5a43',acc='#166534',accLine='#14532d',go='#166534',hud='#14532d',
 prog='linear-gradient(90deg,#fbbf24,#166534)',qbg='rgba(255,253,245,.97)',qink='#2b2118',veil='rgba(20,83,45,.65)',track='#c9e2cb',title='#fff',title1='#fde68a',title2='#fff',noR='8px',scR='10px'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#e0efe0;background-image:linear-gradient(180deg,#cfe6f5,#e0efe0 50%,#d9c9a3)}
.sign h1{text-shadow:0 4px 0 #14532d,0 8px 16px rgba(0,50,20,.3);letter-spacing:.03em}
.sign .sub{border:2px solid #fff;background:rgba(20,83,45,.7);color:#fff;box-shadow:none}
.booth{background:#4f9a5d}
.chip{border-radius:10px}.chip.sel{box-shadow:0 5px 0 #14532d}
.fire,.wz-next{border-radius:10px;font-size:31px}
.qbox.ask{border:3px solid #5b3a1a;border-radius:12px;font-size:clamp(17px,min(5.2cqw,3.8dvh),31px);box-shadow:0 5px 0 #5b3a1a}
.res-title{text-shadow:0 4px 0 #14532d}
""")

# 개념 낚시: 노을 항구 — 주황 노을 + 바다 청록
skin('harbor','Do Hyeon','Gowun Dodum','family=Do+Hyeon&family=Gowun+Dodum',dict(
 page='#ffe9d2',ink='#7c2d12',sub='#b45309',line='#7c2d12',bw='3px',card='#fffaf2',cardInk='#7c2d12',hl='#f97316',stage='#fed7aa',
 shCard='0 6px 0 #9a3412',shBtn='0 4px 0 #9a3412',shDown='0 1px 0 #9a3412',shGo='0 7px 0 #075985',rad='20px',rads='14px',
 tagBg='#0ea5e9',tagInk='#fff',chipBg='#fff3e6',chipLine='#9a3412',sub2='#b45309',acc='#0ea5e9',accLine='#075985',go='#f97316',hud='#0c4a6e',
 prog='linear-gradient(90deg,#fdba74,#0ea5e9)',qbg='rgba(255,250,242,.97)',qink='#7c2d12',veil='rgba(12,74,110,.62)',track='#fed7aa',title='#fff',title1='#fed7aa',title2='#fff',noR='50%'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#ffe9d2;background-image:linear-gradient(180deg,#ff9a62,#ffd9a8 40%,#2aa7c8 41%,#0a3d66)}
.sign h1{text-shadow:0 4px 0 #9a3412,0 8px 16px rgba(120,40,0,.35);letter-spacing:.03em}
.sign .sub{border:0;background:#fff3b0;color:#7c2d12;box-shadow:0 4px 0 #f59e0b}
.booth{background:#2aa7c8}
.chip{border-radius:16px}.chip.sel{box-shadow:0 5px 0 #075985}
.fire,.wz-next{border-radius:999px;font-size:31px}
.qbox.ask{border:3px solid #9a3412;border-radius:16px;font-size:clamp(17px,min(5.2cqw,3.8dvh),30px);box-shadow:0 5px 0 #9a3412}
.res-title{text-shadow:0 4px 0 #9a3412}
""")

# 지구본: 깊은 우주 + 놋쇠(황동) 아틀라스
skin('atlas','Black And White Picture','Gowun Dodum','family=Black+And+White+Picture&family=Gowun+Dodum',dict(
 page='#050b1f',ink='#f6e7b4',sub='#9fb4d9',line='#c89b3c',bw='2px',card='#0f1d3f',cardInk='#f6e7b4',hl='#ffd166',stage='#0a1633',
 shCard='0 5px 0 #6b4e16',shBtn='0 4px 0 #6b4e16',shDown='0 1px 0 #6b4e16',shGo='0 6px 0 #8a5a00',rad='14px',rads='10px',
 tagBg='#c89b3c',tagInk='#1a1204',chipBg='#14264f',chipLine='#3b5188',sub2='#9fb4d9',acc='#c89b3c',accInk='#1a1204',accLine='#ffe08a',accSub='#3b2a06',go='#ffd166',goInk='#1a1204',hud='#07112b',
 prog='linear-gradient(90deg,#c89b3c,#ffe08a)',qbg='rgba(10,20,48,.96)',qink='#f6e7b4',veil='rgba(3,8,24,.7)',track='#1d2d57',title='#ffe08a',title1='#9fb4d9',title2='#fff',noR='8px',dInk='#14264f'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400;letter-spacing:.02em}
body{background:#050b1f;background-image:radial-gradient(circle at 20% 15%,rgba(255,224,138,.10),transparent 28%),radial-gradient(circle at 80% 80%,rgba(80,140,255,.14),transparent 35%),radial-gradient(1px 1px at 12% 30%,#fff8,transparent),radial-gradient(1px 1px at 70% 20%,#fff8,transparent),radial-gradient(1.5px 1.5px at 40% 75%,#fff8,transparent),radial-gradient(1px 1px at 88% 55%,#fff8,transparent)}
.sign h1{text-shadow:0 3px 0 #6b4e16,0 10px 24px rgba(255,200,80,.35)}
.sign .sub{border:1px solid #c89b3c;background:#0f1d3f;color:#ffe08a;box-shadow:0 3px 0 #6b4e16}
.chip{border-radius:10px}.chip.sel{box-shadow:0 4px 0 #6b4e16}
.fire,.wz-next{border-radius:12px;font-size:30px}
.qbox.ask{border:2px solid #c89b3c;border-radius:12px;font-size:clamp(17px,min(5cqw,3.7dvh),29px);box-shadow:0 4px 0 #6b4e16}
.res-title{text-shadow:0 3px 0 #6b4e16}
""")

# 한밤의 박물관: 짙은 자주 + 금테 액자
skin('gallery','Jeju Myeongjo','Gowun Batang','family=Jeju+Myeongjo&family=Gowun+Batang',dict(
 page='#1a0a14',ink='#fbe9c0',sub='#d8b4a0',line='#d4a537',bw='2px',card='#2b1020',cardInk='#fbe9c0',hl='#f6c453',stage='#240d1a',
 shCard='0 5px 0 #6b1d2e',shBtn='0 4px 0 #6b1d2e',shDown='0 1px 0 #6b1d2e',shGo='0 6px 0 #7a1328',rad='6px',rads='4px',
 tagBg='#9b1c31',tagInk='#fff4d6',chipBg='#3a1628',chipLine='#7a3a50',sub2='#d8b4a0',acc='#9b1c31',accInk='#fff4d6',accLine='#f6c453',accSub='#ffe3b0',go='#d4a537',goInk='#2b1020',hud='#12060d',
 prog='linear-gradient(90deg,#9b1c31,#f6c453)',qbg='rgba(34,12,26,.96)',qink='#fbe9c0',veil='rgba(18,6,13,.72)',track='#4a2236',title='#f6c453',title1='#d8b4a0',title2='#fff4d6',noR='4px',dInk='#2b1020'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#1a0a14;background-image:radial-gradient(ellipse at 50% -10%,rgba(246,196,83,.22),transparent 55%),repeating-linear-gradient(90deg,rgba(255,255,255,.015) 0 2px,transparent 2px 46px)}
.sign h1{text-shadow:0 3px 0 #6b1d2e,0 10px 24px rgba(246,196,83,.3);letter-spacing:.04em}
.sign .sub{border:1px solid #d4a537;background:#2b1020;color:#f6c453;box-shadow:0 3px 0 #6b1d2e;border-radius:2px}
.chip{border-radius:4px;border-style:double;border-width:4px}.chip.sel{box-shadow:0 4px 0 #6b1d2e}
.fire,.wz-next{border-radius:4px;font-size:29px;letter-spacing:.05em}
.qbox.ask{border:3px double #d4a537;border-radius:4px;font-size:clamp(17px,min(5cqw,3.7dvh),29px);box-shadow:0 4px 0 #6b1d2e}
.res-title{text-shadow:0 3px 0 #6b1d2e}
""")

# 세계 여행 여권: 공항 출국장 전광판
skin('airport','Nanum Gothic Coding','Gowun Dodum','family=Nanum+Gothic+Coding:wght@400;700&family=Gowun+Dodum',dict(
 page='#0b1d33',ink='#fff7d6',sub='#9fc4e8',line='#ffd23f',bw='2px',card='#12294a',cardInk='#fff7d6',hl='#ffd23f',stage='#0f2542',
 shCard='0 5px 0 #06101f',shBtn='0 4px 0 #06101f',shDown='0 1px 0 #06101f',shGo='0 6px 0 #a67c00',rad='10px',rads='6px',
 tagBg='#ffd23f',tagInk='#0b1d33',chipBg='#173559',chipLine='#34608f',sub2='#9fc4e8',acc='#ffd23f',accInk='#0b1d33',accLine='#fff3a8',accSub='#3b3000',go='#ffd23f',goInk='#0b1d33',hud='#061426',
 prog='linear-gradient(90deg,#38bdf8,#ffd23f)',qbg='#0a1628',qink='#ffd23f',veil='rgba(4,12,24,.72)',track='#1d3a60',title='#ffd23f',title1='#9fc4e8',title2='#fff',noR='6px',dInk='#0b1d33'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:700}
body{background:#0b1d33;background-image:linear-gradient(180deg,#0b1d33,#143a63);}
.sign h1{text-shadow:0 3px 0 #06101f;letter-spacing:.02em}
.sign .sub{border:0;background:#ffd23f;color:#0b1d33;box-shadow:0 3px 0 #a67c00;border-radius:6px}
.chip{border-radius:8px}.chip.sel{box-shadow:0 4px 0 #a67c00}
.fire,.wz-next{border-radius:8px;font-size:28px}
.qbox.ask{background:#0a1628;color:#ffd23f;border:2px solid #34608f;border-radius:8px;font-size:clamp(17px,min(5cqw,3.7dvh),29px);box-shadow:0 4px 0 #06101f;letter-spacing:.01em}
.res-title{text-shadow:0 3px 0 #06101f}
""")

# 결재 서류 휙휙: 관공서 나무 책상 + 고무 도장
skin('office','Nanum Gothic','Gowun Dodum','family=Nanum+Gothic:wght@700;800&family=Gowun+Dodum',dict(
 page='#e9dcc3',ink='#3b2a1c',sub='#7a6246',line='#3b2a1c',bw='3px',card='#fffaf0',cardInk='#3b2a1c',hl='#2f6f4f',stage='#d9c7a2',
 shCard='0 5px 0 #6b4f2d',shBtn='0 4px 0 #6b4f2d',shDown='0 1px 0 #6b4f2d',shGo='0 6px 0 #7f1d1d',rad='6px',rads='4px',
 tagBg='#2f6f4f',tagInk='#fff',chipBg='#f4e8cc',chipLine='#6b4f2d',sub2='#7a6246',acc='#2f6f4f',accInk='#fff',accLine='#14452c',accSub='#d7f2e1',go='#c0392b',goInk='#fff',hud='#3b2a1c',
 prog='linear-gradient(90deg,#d9c7a2,#2f6f4f)',qbg='#fffaf0',qink='#3b2a1c',veil='rgba(40,26,12,.66)',track='#d9c7a2',title='#fffaf0',title1='#f4e8cc',title2='#fff',noR='4px',dInk='#3b2a1c'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:800}
body{background:#8a5a33;background-image:repeating-linear-gradient(0deg,rgba(0,0,0,.05) 0 3px,transparent 3px 22px),linear-gradient(180deg,#9c6a3e,#6f4524)}
.sign h1{text-shadow:0 3px 0 #3b2412,0 8px 14px rgba(0,0,0,.35)}
.sign .sub{border:3px dashed #3b2a1c;background:#fffaf0;color:#3b2a1c;box-shadow:0 4px 0 #3b2412;border-radius:4px;transform:rotate(-1.2deg)}
.chip{border-radius:4px}.chip.sel{box-shadow:0 4px 0 #14452c}
.fire,.wz-next{border-radius:6px;font-size:28px}
.qbox.ask{border:3px solid #3b2a1c;border-radius:4px;font-size:clamp(17px,min(5cqw,3.7dvh),29px);box-shadow:0 4px 0 #6b4f2d}
.res-title{text-shadow:0 3px 0 #3b2412}
""")

# 시·도 탐험: 보드게임 판 (헥사곤 타일)
skin('boardgame','Dongle','Gowun Dodum','family=Dongle:wght@400;700&family=Gowun+Dodum',dict(
 page='#fff1cf',ink='#1f3b4d',sub='#4b6b7d',line='#1f3b4d',bw='3px',card='#ffffff',cardInk='#1f3b4d',hl='#e8590c',stage='#bfe6e3',
 shCard='0 6px 0 #1f3b4d',shBtn='0 4px 0 #1f3b4d',shDown='0 1px 0 #1f3b4d',shGo='0 7px 0 #9a3412',rad='22px',rads='14px',
 tagBg='#e8590c',tagInk='#fff',chipBg='#e6f6f4',chipLine='#1f3b4d',sub2='#4b6b7d',acc='#12a594',accInk='#fff',accLine='#0a6b60',accSub='#e0fffb',go='#e8590c',goInk='#fff',hud='#0f4c5c',
 prog='linear-gradient(90deg,#ffd43b,#12a594)',qbg='#ffffff',qink='#1f3b4d',veil='rgba(15,76,92,.62)',track='#c7e8e4',title='#fff',title1='#fff1cf',title2='#fff',noR='50%',dInk='#1f3b4d'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:700;letter-spacing:.01em}
h1,.big,.qbox.ask,.fire,.wz-next{font-size:1.18em}
body{background:#fff1cf;background-image:radial-gradient(circle,#ffe2a1 2.5px,transparent 3px);background-size:26px 26px}
.sign h1{text-shadow:0 4px 0 #1f3b4d;-webkit-text-stroke:2px #1f3b4d}
.sign .sub{border:3px solid #1f3b4d;background:#ffd43b;color:#1f3b4d;box-shadow:0 4px 0 #1f3b4d}
.chip{border-radius:18px}.chip.sel{box-shadow:0 5px 0 #0a6b60}
.fire,.wz-next{border-radius:999px;font-size:36px}
.qbox.ask{border:3px solid #1f3b4d;border-radius:18px;font-size:clamp(20px,min(6cqw,4.3dvh),34px);box-shadow:0 5px 0 #1f3b4d}
.res-title{text-shadow:0 4px 0 #1f3b4d}
""")

# 계절 돌림판: 계절 놀이공원 (포스터 느낌)
skin('seasonpark','Poor Story','Gowun Dodum','family=Poor+Story&family=Gowun+Dodum',dict(
 page='#e9f7ff',ink='#2b3a55',sub='#5b7090',line='#2b3a55',bw='3px',card='#ffffff',cardInk='#2b3a55',hl='#ff6b8b',stage='#cfeaff',
 shCard='0 6px 0 #2b3a55',shBtn='0 4px 0 #2b3a55',shDown='0 1px 0 #2b3a55',shGo='0 7px 0 #b3203f',rad='24px',rads='16px',
 tagBg='#ff6b8b',tagInk='#fff',chipBg='#f4fbff',chipLine='#2b3a55',sub2='#5b7090',acc='#3bb273',accInk='#fff',accLine='#1f7a4d',accSub='#eafff3',go='#ff6b8b',goInk='#fff',hud='#2b3a55',
 prog='linear-gradient(90deg,#8bd36b,#3ba7e8,#f39a3d,#b9d7f2)',qbg='#ffffff',qink='#2b3a55',veil='rgba(43,58,85,.6)',track='#d4e9f7',title='#fff',title1='#fff',title2='#fff',noR='50%',dInk='#2b3a55'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#e9f7ff;background-image:linear-gradient(135deg,#ffd1dc 0 25%,#fff3b0 25% 50%,#ffc999 50% 75%,#cfeaff 75%);background-size:100% 100%}
.sign h1{text-shadow:0 4px 0 #2b3a55,0 8px 0 rgba(43,58,85,.25);-webkit-text-stroke:2px #2b3a55}
.sign .sub{border:3px solid #2b3a55;background:#fff;color:#2b3a55;box-shadow:0 4px 0 #2b3a55}
.chip{border-radius:20px}.chip.sel{box-shadow:0 5px 0 #1f7a4d}
.fire,.wz-next{border-radius:999px;font-size:34px}
.qbox.ask{border:3px solid #2b3a55;border-radius:20px;font-size:clamp(18px,min(5.4cqw,4dvh),31px);box-shadow:0 5px 0 #2b3a55}
.res-title{text-shadow:0 4px 0 #2b3a55}
""")

# 한 칸씩 계단 오르기: 구름 위 성
skin('cloudcastle','Cute Font','Gowun Dodum','family=Cute+Font&family=Gowun+Dodum',dict(
 page='#efe8ff',ink='#3b2f6b',sub='#6b5fa0',line='#3b2f6b',bw='3px',card='#ffffff',cardInk='#3b2f6b',hl='#ff5fa2',stage='#d9ccff',
 shCard='0 6px 0 #5b46b8',shBtn='0 4px 0 #5b46b8',shDown='0 1px 0 #5b46b8',shGo='0 7px 0 #b0286b',rad='26px',rads='16px',
 tagBg='#ff5fa2',tagInk='#fff',chipBg='#f8f4ff',chipLine='#5b46b8',sub2='#6b5fa0',acc='#7c5cff',accInk='#fff',accLine='#4a35b0',accSub='#ece6ff',go='#ff5fa2',goInk='#fff',hud='#4a35b0',
 prog='linear-gradient(90deg,#ffd6e8,#7c5cff)',qbg='#ffffff',qink='#3b2f6b',veil='rgba(59,47,107,.62)',track='#e0d6ff',title='#fff',title1='#fff',title2='#ffe3f1',noR='50%',dInk='#3b2f6b'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#efe8ff;background-image:radial-gradient(ellipse at 20% 12%,#fff 0 6%,transparent 7%),radial-gradient(ellipse at 28% 12%,#fff 0 5%,transparent 6%),radial-gradient(ellipse at 78% 22%,#fff 0 7%,transparent 8%),radial-gradient(ellipse at 86% 22%,#fff 0 5%,transparent 6%),linear-gradient(180deg,#a8d4ff,#e9d9ff 60%,#ffd9ec)}
.sign h1{text-shadow:0 4px 0 #5b46b8,0 8px 0 rgba(91,70,184,.25);-webkit-text-stroke:2px #5b46b8}
.sign .sub{border:3px solid #5b46b8;background:#fff;color:#3b2f6b;box-shadow:0 4px 0 #5b46b8}
.chip{border-radius:22px}.chip.sel{box-shadow:0 5px 0 #4a35b0}
.fire,.wz-next{border-radius:999px;font-size:34px}
.qbox.ask{border:3px solid #5b46b8;border-radius:22px;font-size:clamp(18px,min(5.4cqw,4dvh),31px);box-shadow:0 5px 0 #5b46b8}
.res-title{text-shadow:0 4px 0 #5b46b8}
""")

# 옛날↔오늘날: 시간 여행 (한지 + 유리 도시)
skin('timetravel','Yeon Sung','Gowun Dodum','family=Yeon+Sung&family=Gowun+Dodum',dict(
 page='#f4e6c8',ink='#4a2f16',sub='#8a6a3a',line='#4a2f16',bw='3px',card='#fff8e6',cardInk='#4a2f16',hl='#2f80ed',stage='#e8d3a6',
 shCard='0 6px 0 #4a2f16',shBtn='0 4px 0 #4a2f16',shDown='0 1px 0 #4a2f16',shGo='0 7px 0 #1b4f9c',rad='22px',rads='14px',
 tagBg='#2f80ed',tagInk='#fff',chipBg='#fff8e6',chipLine='#4a2f16',sub2='#8a6a3a',acc='#2f80ed',accInk='#fff',accLine='#1b4f9c',accSub='#e3f0ff',go='#2f80ed',goInk='#fff',hud='#4a2f16',
 prog='linear-gradient(90deg,#c9a46a,#2f80ed)',qbg='#fff8e6',qink='#4a2f16',veil='rgba(60,38,16,.62)',track='#e8d3a6',title='#fff',title1='#ffe9bf',title2='#fff',noR='50%',dInk='#4a2f16'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:linear-gradient(90deg,#d9b676 0 50%,#9fd0ff 50%);background-image:linear-gradient(90deg,transparent 49.4%,#fff 49.4% 50.6%,transparent 50.6%),linear-gradient(90deg,#d9b676 0 50%,#9fd0ff 50%)}
.sign h1{text-shadow:0 4px 0 #4a2f16,0 8px 0 rgba(74,47,22,.25);-webkit-text-stroke:2px #4a2f16}
.sign .sub{border:3px solid #4a2f16;background:#fff8e6;color:#4a2f16;box-shadow:0 4px 0 #4a2f16}
.chip{border-radius:18px}.chip.sel{box-shadow:0 5px 0 #1b4f9c}
.fire,.wz-next{border-radius:999px;font-size:34px}
.qbox.ask{border:3px solid #4a2f16;border-radius:18px;font-size:clamp(19px,min(5.6cqw,4.1dvh),32px);box-shadow:0 5px 0 #4a2f16}
.res-title{text-shadow:0 4px 0 #4a2f16}
""")

# 연표 두루마리: 역사 교실 칠판 + 분필
skin('chalkboard','Nanum Pen Script','Gowun Dodum','family=Nanum+Pen+Script&family=Gowun+Dodum',dict(
 page='#17382c',ink='#f4f1de',sub='#b9cfc2',line='#e8d9a8',bw='2px',card='#1f4a39',cardInk='#f4f1de',hl='#ffd166',stage='#143027',
 shCard='0 5px 0 #0b2118',shBtn='0 4px 0 #0b2118',shDown='0 1px 0 #0b2118',shGo='0 6px 0 #a3541d',rad='12px',rads='8px',
 tagBg='#ffd166',tagInk='#17382c',chipBg='#245a45',chipLine='#e8d9a8',sub2='#b9cfc2',acc='#ff8fab',accInk='#17382c',accLine='#ffd6e0',accSub='#4a1a2a',go='#ffd166',goInk='#17382c',hud='#0f2a20',
 prog='linear-gradient(90deg,#7bdff2,#ffd166)',qbg='#1f4a39',qink='#f4f1de',veil='rgba(8,28,20,.7)',track='#2b5d49',title='#ffd166',title1='#b9cfc2',title2='#f4f1de',noR='8px',dInk='#17382c',qhl='#ffd166'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#17382c;background-image:radial-gradient(ellipse at 30% 20%,rgba(255,255,255,.07),transparent 50%),radial-gradient(ellipse at 80% 70%,rgba(255,255,255,.05),transparent 45%)}
.sign h1{text-shadow:0 3px 0 #0b2118;letter-spacing:.03em;font-size:1.25em}
.sign .sub{border:2px dashed #e8d9a8;background:transparent;color:#ffd166;box-shadow:none;border-radius:10px}
.chip{border-radius:10px;border-style:dashed}.chip.sel{box-shadow:0 4px 0 #a3395a}
.fire,.wz-next{border-radius:12px;font-size:34px}
.qbox.ask{border:3px solid #8b5a2b;border-radius:10px;font-size:clamp(20px,min(5.8cqw,4.2dvh),34px);box-shadow:0 4px 0 #0b2118}
.res-title{text-shadow:0 3px 0 #0b2118}
""")

# 칙칙폭폭 꼬리 기차: 나무 장난감 기차놀이판
skin('toytrack','Kirang Haerang','Gowun Dodum','family=Kirang+Haerang&family=Gowun+Dodum',dict(
 page='#fff0d4',ink='#5a3a1a',sub='#8b6a3d',line='#5a3a1a',bw='3px',card='#fffaf0',cardInk='#5a3a1a',hl='#e5383b',stage='#f2d9a6',
 shCard='0 6px 0 #a47a3d',shBtn='0 4px 0 #a47a3d',shDown='0 1px 0 #a47a3d',shGo='0 7px 0 #1864ab',rad='24px',rads='16px',
 tagBg='#1c7ed6',tagInk='#fff',chipBg='#fff6e0',chipLine='#a47a3d',sub2='#8b6a3d',acc='#37b24d',accInk='#fff',accLine='#1f7a31',accSub='#e6ffe9',go='#e5383b',goInk='#fff',hud='#7a4f22',
 prog='linear-gradient(90deg,#fcc419,#37b24d)',qbg='#fffaf0',qink='#5a3a1a',veil='rgba(90,58,26,.62)',track='#f2d9a6',title='#fff',title1='#ffe9bf',title2='#fff',noR='50%',dInk='#5a3a1a'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#e9c58b;background-image:repeating-linear-gradient(90deg,rgba(120,80,30,.1) 0 4px,transparent 4px 60px),repeating-linear-gradient(0deg,rgba(120,80,30,.1) 0 4px,transparent 4px 60px)}
.sign h1{text-shadow:0 4px 0 #7a4f22,0 8px 0 rgba(90,58,26,.25);-webkit-text-stroke:2px #7a4f22}
.sign .sub{border:3px solid #7a4f22;background:#fcc419;color:#5a3a1a;box-shadow:0 4px 0 #7a4f22}
.chip{border-radius:20px}.chip.sel{box-shadow:0 5px 0 #1f7a31}
.fire,.wz-next{border-radius:999px;font-size:36px}
.qbox.ask{border:3px solid #7a4f22;border-radius:20px;font-size:clamp(19px,min(5.6cqw,4.1dvh),32px);box-shadow:0 5px 0 #a47a3d}
.res-title{text-shadow:0 4px 0 #7a4f22}
""")

# 역사 인물 스무고개: 탐정 수사 코르크 보드
skin('corkboard','Gaegu','Gowun Dodum','family=Gaegu:wght@400;700&family=Gowun+Dodum',dict(
 page='#c99a5f',ink='#3a2512',sub='#7a5a33',line='#3a2512',bw='3px',card='#fffdf3',cardInk='#3a2512',hl='#d62828',stage='#b98649',
 shCard='0 5px 0 #6b4520',shBtn='0 4px 0 #6b4520',shDown='0 1px 0 #6b4520',shGo='0 6px 0 #7f1d1d',rad='6px',rads='4px',
 tagBg='#d62828',tagInk='#fff',chipBg='#fff4d6',chipLine='#6b4520',sub2='#7a5a33',acc='#d62828',accInk='#fff',accLine='#7f1d1d',accSub='#ffe3e3',go='#d62828',goInk='#fff',hud='#4a2f14',
 prog='linear-gradient(90deg,#f4d58d,#d62828)',qbg='#fff4b8',qink='#3a2512',veil='rgba(50,30,12,.66)',track='#e2c48f',title='#fff',title1='#ffe9bf',title2='#fff',noR='4px',dInk='#3a2512'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:700}
body{background:#c99a5f;background-image:radial-gradient(circle at 20% 30%,rgba(110,70,30,.35) 0 2px,transparent 3px),radial-gradient(circle at 70% 60%,rgba(110,70,30,.3) 0 2px,transparent 3px),radial-gradient(circle at 45% 80%,rgba(255,255,255,.25) 0 2px,transparent 3px);background-size:38px 38px,52px 52px,44px 44px}
.sign h1{text-shadow:0 3px 0 #6b4520,0 7px 12px rgba(0,0,0,.3);font-size:1.15em}
.sign .sub{border:2px dashed #3a2512;background:#fff4b8;color:#3a2512;box-shadow:0 3px 0 #6b4520;transform:rotate(-1.5deg);border-radius:2px}
.chip{border-radius:3px}.chip.sel{box-shadow:0 4px 0 #7f1d1d}
.fire,.wz-next{border-radius:4px;font-size:32px}
.qbox.ask{border:3px solid #3a2512;border-radius:3px;font-size:clamp(19px,min(5.6cqw,4.1dvh),32px);box-shadow:0 4px 0 #6b4520;transform:rotate(-.4deg)}
.res-title{text-shadow:0 3px 0 #6b4520}
""")

# ── 간편 스킨 (음악 게임용): 핵심 색만 정하면 나머지는 채워요 ──
def mk(name,disp,imports,page,ink,card,hl,acc,go,hud,sh,extra='',sub=None,line=None,rad='18px',cardInk=None,qbg=None,qink=None,veil='rgba(0,0,0,.6)',sans='Gowun Dodum',bw='3px',dInk=None,accInk='#fff',goInk='#fff',tag=None,tagInk='#fff',chip=None,chipLine=None,stage=None,title='#fff',track=None):
    ci=cardInk or ink
    skin(name,disp,sans,imports,dict(page=page,ink=ink,sub=sub or ink,line=line or sh,bw=bw,card=card,cardInk=ci,hl=hl,stage=stage or card,
      shCard='0 6px 0 '+sh,shBtn='0 4px 0 '+sh,shDown='0 1px 0 '+sh,shGo='0 7px 0 '+sh,rad=rad,rads='12px',
      tagBg=tag or acc,tagInk=tagInk,chipBg=chip or card,chipLine=chipLine or sh,sub2=sub or ink,acc=acc,accInk=accInk,accLine=sh,accSub=accInk,go=go,goInk=goInk,hud=hud,
      prog='linear-gradient(90deg,%s,%s)'%(hl,acc),qbg=qbg or card,qink=qink or ci,veil=veil,track=track or 'rgba(0,0,0,.15)',title=title,title1=title,title2=title,noR='50%',dInk=dInk or ci),extra)

mk('meadow','Jua','family=Jua&family=Gowun+Dodum','#e3f6d1','#2f4a1e','#fffef4','#ff7a3d','#34a853','#ff7a3d','#2f6b2c','#4d7a2a',
 extra="""body{background:linear-gradient(180deg,#bfe9ff 0 45%,#a9e08a 45% 100%)}
.sign h1{text-shadow:0 4px 0 #2f6b2c,0 8px 0 rgba(47,107,44,.25);-webkit-text-stroke:2px #2f6b2c}
.sign .sub{border:3px solid #2f6b2c;background:#fff6c9;color:#2f4a1e;box-shadow:0 4px 0 #4d7a2a}
.chip{border-radius:20px}.fire,.wz-next{border-radius:999px;font-size:34px}
.qbox.ask{border:3px solid #2f6b2c;border-radius:20px;box-shadow:0 5px 0 #4d7a2a}
""",rad='22px',veil='rgba(30,70,20,.6)')

mk('skybird','Gamja Flower','family=Gamja+Flower&family=Gowun+Dodum','#d7efff','#1f4b7a','#ffffff','#ff8a3d','#4aa8ff','#ff8a3d','#2a6fb0','#2a6fb0',
 extra="""body{background:linear-gradient(180deg,#8fd0ff,#e8f6ff 70%,#fff8d6)}
.sign h1{text-shadow:0 4px 0 #2a6fb0,0 8px 0 rgba(42,111,176,.25);-webkit-text-stroke:2px #2a6fb0;font-size:1.2em}
.sign .sub{border:3px solid #2a6fb0;background:#fff;color:#1f4b7a;box-shadow:0 4px 0 #2a6fb0}
.chip{border-radius:22px}.fire,.wz-next{border-radius:999px;font-size:36px}
.qbox.ask{border:3px solid #2a6fb0;border-radius:22px;box-shadow:0 5px 0 #2a6fb0;font-size:clamp(20px,min(6cqw,4.4dvh),34px)}
""",rad='24px',veil='rgba(20,60,110,.6)')

mk('bricks','Black Han Sans','family=Black+Han+Sans&family=Gowun+Dodum','#fff2b8','#1b2a49','#ffffff','#e63946','#1d6fd1','#e63946','#1b2a49','#1b2a49',
 extra="""body{background:#ffe27a;background-image:radial-gradient(circle,#ffd23f 5px,transparent 6px);background-size:34px 34px}
.sign h1{text-shadow:0 5px 0 #1b2a49;-webkit-text-stroke:2px #1b2a49;font-size:1.15em}
.sign .sub{border:3px solid #1b2a49;background:#e63946;color:#fff;box-shadow:0 4px 0 #1b2a49;border-radius:6px}
.chip{border-radius:10px}.fire,.wz-next{border-radius:12px;font-size:32px}
.qbox.ask{border:4px solid #1b2a49;border-radius:10px;box-shadow:0 5px 0 #1b2a49;background:#fff}
""",rad='12px',veil='rgba(27,42,73,.62)',bw='4px')

mk('stardust','Gugi','family=Gugi&family=Gowun+Dodum','#150d38','#fff2c4','#241a5e','#ffd166','#7b5cff','#ff5fa2','#0e0828','#05031a',
 extra="""body{background:#150d38;background-image:radial-gradient(1.5px 1.5px at 15% 25%,#fff,transparent),radial-gradient(1px 1px at 65% 15%,#fff,transparent),radial-gradient(2px 2px at 80% 60%,#ffd166,transparent),radial-gradient(1px 1px at 35% 80%,#fff,transparent),radial-gradient(ellipse at 70% 20%,rgba(123,92,255,.35),transparent 55%)}
.sign h1{text-shadow:0 0 18px #7b5cff,0 4px 0 #05031a;font-size:1.1em}
.sign .sub{border:2px solid #7b5cff;background:#241a5e;color:#ffd166;box-shadow:0 0 14px rgba(123,92,255,.6)}
.chip{border-radius:12px;border-color:#5a45c8}.chip.sel{box-shadow:0 0 14px #7b5cff}
.fire,.wz-next{border-radius:12px;font-size:30px}
.qbox.ask{border:2px solid #7b5cff;border-radius:12px;background:#241a5e;color:#fff2c4;box-shadow:0 0 16px rgba(123,92,255,.5)}
""",rad='14px',veil='rgba(5,3,26,.72)',sub='#b9acff',bw='2px',chip='#2d2170',chipLine='#5a45c8',tag='#ffd166',tagInk='#150d38',dInk='#150d38')

mk('djbooth','Do Hyeon','family=Do+Hyeon&family=Gowun+Dodum','#1a1033','#f5f0ff','#2a1b52','#00e5ff','#ff2e93','#ff2e93','#0f0a24','#07041a',
 extra="""body{background:#1a1033;background-image:conic-gradient(from 0deg at 50% 120%,#ff2e9355,#00e5ff55,#ffd16655,#ff2e9355)}
.sign h1{text-shadow:0 0 18px #ff2e93,0 0 32px #00e5ff,0 4px 0 #07041a}
.sign .sub{border:2px solid #00e5ff;background:#2a1b52;color:#00e5ff;box-shadow:0 0 14px rgba(0,229,255,.6)}
.chip{border-radius:14px;border-color:#6b4bd1}.chip.sel{box-shadow:0 0 16px #ff2e93}
.fire,.wz-next{border-radius:999px;font-size:32px}
.qbox.ask{border:2px solid #00e5ff;border-radius:14px;background:#2a1b52;color:#f5f0ff;box-shadow:0 0 16px rgba(0,229,255,.5)}
""",rad='16px',veil='rgba(7,4,26,.74)',sub='#c6b8ff',bw='2px',chip='#34236a',chipLine='#6b4bd1',tag='#00e5ff',tagInk='#0f0a24',goInk='#fff',dInk='#1a1033')

mk('stagelight','Bagel Fat One','family=Bagel+Fat+One&family=Gowun+Dodum','#ffe9d1','#4a1d0a','#fff7ec','#ff5a1f','#e8590c','#ff5a1f','#4a1d0a','#8a2f0a',
 extra="""body{background:#ff9a52;background-image:radial-gradient(ellipse at 50% -20%,#fff3c4 0,transparent 55%),repeating-conic-gradient(from 0deg at 50% 120%,rgba(255,255,255,.14) 0 6deg,transparent 6deg 12deg)}
.sign h1{text-shadow:0 5px 0 #8a2f0a,0 10px 0 rgba(74,29,10,.25);-webkit-text-stroke:2px #8a2f0a;font-size:1.1em}
.sign .sub{border:3px solid #8a2f0a;background:#fff7ec;color:#4a1d0a;box-shadow:0 4px 0 #8a2f0a}
.chip{border-radius:18px}.fire,.wz-next{border-radius:999px;font-size:34px}
.qbox.ask{border:3px solid #8a2f0a;border-radius:18px;box-shadow:0 5px 0 #8a2f0a}
""",rad='22px',veil='rgba(74,29,10,.62)',bw='3px')

mk('gugak','Hahmlet','family=Hahmlet:wght@700;900&family=Gowun+Batang','#f3e7cf','#2b1b12','#fff9ec','#c1272d','#1d4e89','#c1272d','#2b1b12','#7a5230',
 extra="""h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:900}
body{background:#efe0c0;background-image:repeating-linear-gradient(90deg,rgba(150,110,60,.08) 0 2px,transparent 2px 28px),linear-gradient(180deg,#c1272d 0 14px,#1d4e89 14px 22px,#f3e7cf 22px)}
.sign h1{text-shadow:0 4px 0 #7a5230;letter-spacing:.04em}
.sign .sub{border:3px double #7a5230;background:#fff9ec;color:#2b1b12;box-shadow:0 4px 0 #7a5230;border-radius:4px}
.chip{border-radius:6px;border-style:double;border-width:4px}.chip.sel{box-shadow:0 5px 0 #0f2d52}
.fire,.wz-next{border-radius:8px;font-size:30px}
.qbox.ask{border:3px double #7a5230;border-radius:6px;box-shadow:0 4px 0 #7a5230;background:#fff9ec}
""",rad='8px',veil='rgba(43,27,18,.66)',bw='3px',sans='Gowun Batang')

mk('hall','Noto Serif KR','family=Noto+Serif+KR:wght@700;900&family=Gowun+Batang','#f5ecd7','#2a1f17','#fffaf0','#a4161a','#a4161a','#a4161a','#2a1f17','#6b1010',
 extra="""h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:900}
body{background:#f5ecd7;background-image:repeating-linear-gradient(90deg,rgba(164,22,26,.05) 0 40px,transparent 40px 80px),radial-gradient(ellipse at 50% -10%,#fff 0,transparent 60%)}
.sign h1{text-shadow:0 3px 0 #6b1010;letter-spacing:.03em}
.sign .sub{border:2px solid #2a1f17;background:#fffaf0;color:#a4161a;box-shadow:0 3px 0 #6b1010;border-radius:2px}
.chip{border-radius:4px}.chip.sel{box-shadow:0 4px 0 #3b0a0a}
.fire,.wz-next{border-radius:4px;font-size:28px}
.qbox.ask{border:3px solid #2a1f17;border-radius:3px;box-shadow:0 4px 0 #6b1010}
""",rad='6px',veil='rgba(42,31,23,.66)',bw='3px',sans='Gowun Batang')

mk('podium','Stylish','family=Stylish&family=Gowun+Dodum','#1b1a2e','#fff4d6','#2b2950','#ffd166','#ef476f','#ef476f','#10101f','#08081a',
 extra="""body{background:#1b1a2e;background-image:radial-gradient(ellipse at 50% -10%,rgba(255,209,102,.35),transparent 50%),linear-gradient(180deg,#1b1a2e,#2b2950)}
.sign h1{text-shadow:0 0 16px #ffd166,0 4px 0 #08081a}
.sign .sub{border:2px solid #ffd166;background:#2b2950;color:#ffd166;box-shadow:0 3px 0 #08081a}
.chip{border-radius:14px;border-color:#5b57a8}.chip.sel{box-shadow:0 0 14px #ef476f}
.fire,.wz-next{border-radius:999px;font-size:30px}
.qbox.ask{border:2px solid #ffd166;border-radius:14px;background:#2b2950;color:#fff4d6;box-shadow:0 0 14px rgba(255,209,102,.4)}
""",rad='16px',veil='rgba(8,8,26,.74)',sub='#c9c4ff',bw='2px',chip='#34316a',chipLine='#5b57a8',tag='#ffd166',tagInk='#1b1a2e',dInk='#1b1a2e')

mk('quizshow','Gasoek One','family=Gasoek+One&family=Gowun+Dodum','#2d0a5c','#fff6d6','#4a1a8c','#ffe14d','#ff3d7f','#ff3d7f','#1a0538','#12032e',
 extra="""body{background:#2d0a5c;background-image:radial-gradient(ellipse at 50% 0,#ff3d7f66,transparent 60%),repeating-conic-gradient(from 0deg at 50% 110%,rgba(255,225,77,.1) 0 7deg,transparent 7deg 14deg)}
.sign h1{text-shadow:0 0 20px #ff3d7f,0 5px 0 #12032e;-webkit-text-stroke:1px #12032e}
.sign .sub{border:3px solid #ffe14d;background:#4a1a8c;color:#ffe14d;box-shadow:0 0 14px rgba(255,225,77,.6)}
.chip{border-radius:16px;border-color:#7a3dc8}.chip.sel{box-shadow:0 0 16px #ff3d7f}
.fire,.wz-next{border-radius:999px;font-size:32px}
.qbox.ask{border:3px solid #ffe14d;border-radius:16px;background:#4a1a8c;color:#fff6d6;box-shadow:0 0 16px rgba(255,225,77,.5)}
""",rad='20px',veil='rgba(18,3,46,.74)',sub='#d6bdff',bw='3px',chip='#5a2aa0',chipLine='#7a3dc8',tag='#ffe14d',tagInk='#2d0a5c',dInk='#2d0a5c')

mk('ink','Nanum Myeongjo','family=Nanum+Myeongjo:wght@700;800&family=Gowun+Batang','#eef0ea','#1c2a2a','#fbfcf8','#c1272d','#2a9d8f','#c1272d','#1c3a3a','#2e4a4a',
 extra="""h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:800}
body{background:#e4e8df;background-image:radial-gradient(circle at 80% 20%,rgba(42,157,143,.18),transparent 40%),radial-gradient(circle at 15% 85%,rgba(28,58,58,.12),transparent 45%)}
.sign h1{text-shadow:0 3px 0 #2e4a4a;letter-spacing:.05em}
.sign .sub{border:2px solid #1c3a3a;background:#fbfcf8;color:#c1272d;box-shadow:0 3px 0 #2e4a4a;border-radius:2px}
.chip{border-radius:3px}.chip.sel{box-shadow:0 4px 0 #0f3d38}
.fire,.wz-next{border-radius:4px;font-size:28px}
.qbox.ask{border:2px solid #1c3a3a;border-radius:2px;box-shadow:0 4px 0 #2e4a4a}
""",rad='6px',veil='rgba(28,58,58,.66)',bw='2px',sans='Gowun Batang')

mk('decal','Hi Melody','family=Hi+Melody&family=Gowun+Dodum','#fbf3ff','#3b1f5e','#ffffff','#e11d8c','#7c3aed','#f97316','#4c1d95','#6d28d9',
 extra="""body{background:#fbf3ff;background-image:radial-gradient(circle at 12% 18%,#fbcfe8 0 60px,transparent 62px),radial-gradient(circle at 88% 22%,#bfdbfe 0 80px,transparent 82px),radial-gradient(circle at 80% 85%,#fde68a 0 70px,transparent 72px),radial-gradient(circle at 15% 88%,#ddd6fe 0 90px,transparent 92px)}
.sign h1{text-shadow:0 4px 0 #6d28d9,0 8px 0 rgba(109,40,217,.2);-webkit-text-stroke:1.5px #6d28d9}
.sign .sub{border:3px solid #6d28d9;background:#fff;color:#3b1f5e;box-shadow:0 4px 0 #6d28d9}
.chip{border-radius:16px}.chip.sel{box-shadow:0 5px 0 #4c1d95}
.fire,.wz-next{border-radius:999px;font-size:34px}
.qbox.ask{border:3px solid #6d28d9;border-radius:16px;box-shadow:0 5px 0 #6d28d9;font-size:clamp(19px,min(5.6cqw,4.1dvh),32px)}
""",rad='20px',veil='rgba(76,29,149,.62)',bw='3px')

mk('court','Sunflower','family=Sunflower:wght@300;500;700&family=Gowun+Dodum','#f1d3a1','#1c2a5e','#fff8ec','#ea580c','#1d4ed8','#ea580c','#1c2a5e','#1c2a5e',
 extra="""body{background:#f1d3a1;background-image:repeating-linear-gradient(90deg,rgba(150,90,30,.16) 0 2px,transparent 2px 70px),radial-gradient(circle at 50% 120%,rgba(234,88,12,.25),transparent 55%)}
.sign h1{text-shadow:0 4px 0 #1c2a5e;-webkit-text-stroke:1.5px #1c2a5e}
.sign .sub{border:3px solid #1c2a5e;background:#fff8ec;color:#1c2a5e;box-shadow:0 4px 0 #1c2a5e;border-radius:6px}
.chip{border-radius:8px}.chip.sel{box-shadow:0 5px 0 #7c2d12}
.fire,.wz-next{border-radius:10px;font-size:32px}
.qbox.ask{border:3px solid #1c2a5e;border-radius:8px;box-shadow:0 5px 0 #1c2a5e;background:#fff8ec}
""",rad='10px',veil='rgba(28,42,94,.62)',bw='3px')

mk('pond','Poor Story','family=Poor+Story&family=Gowun+Dodum','#d4f3ff','#0b4a6f','#ffffff','#f97316','#0284c7','#f97316','#075985','#0369a1',
 extra="""body{background:linear-gradient(180deg,#bae6fd 0 38%,#38bdf8 38% 100%);background-image:radial-gradient(ellipse 120px 14px at 20% 58%,rgba(255,255,255,.45),transparent 70%),radial-gradient(ellipse 160px 16px at 75% 70%,rgba(255,255,255,.4),transparent 70%),radial-gradient(ellipse 100px 12px at 55% 88%,rgba(255,255,255,.35),transparent 70%),linear-gradient(180deg,#bae6fd 0 38%,#38bdf8 38% 100%)}
.sign h1{text-shadow:0 4px 0 #075985,0 8px 0 rgba(7,89,133,.22);-webkit-text-stroke:2px #075985}
.sign .sub{border:3px solid #075985;background:#fff7d6;color:#0b4a6f;box-shadow:0 4px 0 #0369a1;border-radius:999px}
.chip{border-radius:18px}.chip.sel{box-shadow:0 6px 0 #075985}
.fire,.wz-next{border-radius:999px;font-size:30px}
.qbox.ask{border:3px solid #075985;border-radius:26px;box-shadow:0 5px 0 #0369a1;font-size:clamp(20px,min(5.8cqw,4.3dvh),34px)}
""",rad='18px',veil='rgba(7,89,133,.6)',bw='3px')

mk('jewel','Single Day','family=Single+Day&family=Gowun+Dodum','#fdeaf6','#6b1d5c','#ffffff','#db2777','#7c3aed','#db2777','#831843','#9d174d',
 extra="""body{background:#fdeaf6;background-image:radial-gradient(circle,#fff 0 3px,transparent 4px),radial-gradient(circle,#f9a8d4 0 4px,transparent 5px),radial-gradient(circle,#c4b5fd 0 3px,transparent 4px);background-size:90px 90px,130px 130px,170px 170px;background-position:10px 20px,60px 70px,100px 30px}
.sign h1{text-shadow:0 4px 0 #9d174d,0 8px 0 rgba(157,23,77,.2);-webkit-text-stroke:2px #9d174d}
.sign .sub{border:3px solid #9d174d;background:#fff;color:#6b1d5c;box-shadow:0 4px 0 #9d174d;border-radius:999px}
.chip{border-radius:18px}.chip.sel{box-shadow:0 5px 0 #6d28d9}
.fire,.wz-next{border-radius:999px;font-size:32px}
.qbox.ask{border:3px solid #9d174d;border-radius:24px;box-shadow:0 5px 0 #9d174d;font-size:clamp(20px,min(5.8cqw,4.3dvh),34px)}
""",rad='20px',veil='rgba(131,24,67,.6)',bw='3px')

mk('stitch','Gamja Flower','family=Gamja+Flower&family=Gowun+Dodum','#fff1c9','#134e4a','#fffdf5','#f43f5e','#0d9488','#f43f5e','#115e59','#0f766e',
 extra="""body{background:#fff1c9;background-image:radial-gradient(circle at 50% 50%,#fde68a 0 5px,transparent 6px),repeating-linear-gradient(45deg,rgba(13,148,136,.07) 0 14px,transparent 14px 28px);background-size:48px 48px,auto}
.sign h1{text-shadow:0 4px 0 #115e59,0 8px 0 rgba(17,94,89,.2);-webkit-text-stroke:2px #115e59}
.sign .sub{border:3px dashed #115e59;background:#fffdf5;color:#134e4a;box-shadow:0 4px 0 #0f766e;border-radius:999px}
.chip{border-radius:16px;border-style:dashed}.chip.sel{box-shadow:0 5px 0 #0f766e}
.fire,.wz-next{border-radius:999px;font-size:34px}
.qbox.ask{border:3px dashed #115e59;border-radius:22px;box-shadow:0 5px 0 #0f766e;font-size:clamp(20px,min(5.8cqw,4.3dvh),34px)}
""",rad='18px',veil='rgba(17,94,89,.6)',bw='3px')

mk('bunker','Black Han Sans','family=Black+Han+Sans&family=Gowun+Dodum','#d9dcc4','#2b3320','#f2f1e3','#dc2626','#4d5d2a','#dc2626','#2b3320','#2b3320',
 extra="""body{background:#c9cdb0;background-image:repeating-linear-gradient(135deg,rgba(77,93,42,.18) 0 22px,transparent 22px 44px),radial-gradient(circle at 20% 20%,rgba(220,38,38,.08),transparent 40%)}
.sign h1{text-shadow:0 4px 0 #2b3320;-webkit-text-stroke:1.5px #2b3320;letter-spacing:.02em}
.sign .sub{border:3px solid #2b3320;background:#f2f1e3;color:#2b3320;box-shadow:0 4px 0 #2b3320;border-radius:4px}
.chip{border-radius:6px}.chip.sel{box-shadow:0 5px 0 #7f1d1d}
.fire,.wz-next{border-radius:8px;font-size:30px}
.qbox.ask{border:3px solid #2b3320;border-radius:6px;box-shadow:0 5px 0 #2b3320;background:#f2f1e3}
""",rad='8px',veil='rgba(43,51,32,.66)',bw='3px')

mk('depot','Gugi','family=Gugi&family=Gowun+Dodum','#1e3a5f','#fff4cc','#274a75','#fbbf24','#f59e0b','#fbbf24','#0f2238','#0b1c30',
 extra="""body{background:#1e3a5f;background-image:repeating-linear-gradient(90deg,transparent 0 58px,rgba(251,191,36,.12) 58px 60px),linear-gradient(180deg,#16304f,#24507f)}
.sign h1{text-shadow:0 0 18px rgba(251,191,36,.7),0 4px 0 #0b1c30;color:#ffe9a8}
.sign .sub{border:3px solid #fbbf24;background:#0f2238;color:#ffe9a8;box-shadow:0 0 12px rgba(251,191,36,.5);border-radius:4px}
.chip{border-radius:6px;border-color:#fbbf24}.chip.sel{box-shadow:0 0 14px #fbbf24}
.fire,.wz-next{border-radius:8px;font-size:30px}
.qbox.ask{border:3px solid #fbbf24;border-radius:6px;background:#0f2238;color:#ffe9a8;box-shadow:0 0 14px rgba(251,191,36,.45)}
""",rad='10px',veil='rgba(11,28,48,.74)',sub='#ffe9a8',bw='3px',chip='#315b8e',chipLine='#fbbf24',tag='#fbbf24',tagInk='#0f2238',dInk='#0f2238',accInk='#0f2238',goInk='#0f2238')

mk('lilypond','Gaegu','family=Gaegu:wght@400;700&family=Gowun+Dodum','#d9f7ee','#0b4f48','#fbfffd','#ec4899','#0f766e','#ec4899','#115e59','#0f766e',
 extra="""body{background:#cdf3e6;background-image:radial-gradient(ellipse 80px 38px at 12% 22%,#4ade80 0 98%,transparent 100%),radial-gradient(ellipse 100px 46px at 86% 30%,#34d399 0 98%,transparent 100%),radial-gradient(ellipse 70px 32px at 78% 82%,#4ade80 0 98%,transparent 100%),radial-gradient(ellipse 90px 40px at 18% 86%,#34d399 0 98%,transparent 100%),radial-gradient(circle at 12% 22%,#f9a8d4 0 14px,transparent 15px),radial-gradient(circle at 78% 82%,#f9a8d4 0 12px,transparent 13px)}
.sign h1{text-shadow:0 4px 0 #115e59,0 8px 0 rgba(17,94,89,.2);-webkit-text-stroke:1.5px #115e59;font-weight:700}
.sign .sub{border:3px solid #115e59;background:#fff;color:#0b4f48;box-shadow:0 4px 0 #0f766e;border-radius:999px}
.chip{border-radius:18px}.chip.sel{box-shadow:0 5px 0 #0b4f48}
.fire,.wz-next{border-radius:999px;font-size:34px;font-weight:700}
.qbox.ask{border:3px solid #115e59;border-radius:22px;box-shadow:0 5px 0 #0f766e;font-weight:700}
""",rad='20px',veil='rgba(17,94,89,.6)',bw='3px')

mk('potion','Do Hyeon','family=Do+Hyeon&family=Gowun+Dodum','#2a1250','#f5e9ff','#3f2178','#a3e635','#c084fc','#a3e635','#150829','#12062a',
 extra="""body{background:#2a1250;background-image:radial-gradient(circle,#fff 0 1.5px,transparent 2px),radial-gradient(circle,#e9d5ff 0 1px,transparent 2px),radial-gradient(ellipse at 50% 110%,rgba(163,230,53,.28),transparent 55%);background-size:120px 120px,70px 70px,auto;background-position:10px 20px,50px 60px,0 0}
.sign h1{text-shadow:0 0 18px #a3e635,0 4px 0 #150829;color:#f7ffd6}
.sign .sub{border:3px solid #a3e635;background:#150829;color:#e9ffb3;box-shadow:0 0 12px rgba(163,230,53,.5);border-radius:999px}
.chip{border-radius:16px;border-color:#7c3aed}.chip.sel{box-shadow:0 0 16px #a3e635}
.fire,.wz-next{border-radius:999px;font-size:32px}
.qbox.ask{border:3px solid #a3e635;border-radius:18px;background:#3f2178;color:#f5e9ff;box-shadow:0 0 14px rgba(163,230,53,.45)}
""",rad='20px',veil='rgba(21,8,41,.76)',sub='#e9d5ff',bw='3px',chip='#4c2a94',chipLine='#7c3aed',tag='#a3e635',tagInk='#150829',dInk='#150829',accInk='#150829',goInk='#150829')

mk('auction','Stylish','family=Stylish&family=Gowun+Batang','#4a0d1a','#fff1c9','#6e1426','#facc15','#b91c1c','#facc15','#2a060e','#1f040a',
 extra="""body{background:#4a0d1a;background-image:repeating-linear-gradient(90deg,rgba(0,0,0,.18) 0 24px,rgba(255,255,255,.03) 24px 48px),radial-gradient(ellipse at 50% 0,rgba(250,204,21,.28),transparent 55%)}
.sign h1{color:#ffe9a8;text-shadow:0 0 16px rgba(250,204,21,.7),0 4px 0 #1f040a;letter-spacing:.04em}
.sign .sub{border:3px solid #facc15;background:#2a060e;color:#ffe9a8;box-shadow:0 0 12px rgba(250,204,21,.5);border-radius:4px}
.chip{border-radius:4px;border-color:#facc15}.chip.sel{box-shadow:0 0 16px #facc15}
.fire,.wz-next{border-radius:6px;font-size:30px}
.qbox.ask{border:3px solid #facc15;border-radius:4px;background:#2a060e;color:#ffe9a8;box-shadow:0 0 14px rgba(250,204,21,.45)}
""",rad='8px',veil='rgba(31,4,10,.76)',sub='#ffe9a8',bw='3px',chip='#7a1a30',chipLine='#facc15',tag='#facc15',tagInk='#2a060e',dInk='#2a060e',accInk='#fff',goInk='#2a060e')

mk('neonblock','Orbit','family=Orbit&family=Gowun+Dodum','#14123a','#e0e7ff','#221f5c','#22d3ee','#818cf8','#f97316','#0b0a26','#0b0a26',
 extra="""body{background:#14123a;background-image:linear-gradient(rgba(129,140,248,.14) 1px,transparent 1px),linear-gradient(90deg,rgba(129,140,248,.14) 1px,transparent 1px),radial-gradient(ellipse at 50% 120%,rgba(34,211,238,.25),transparent 55%);background-size:44px 44px,44px 44px,auto}
.sign h1{color:#c7f9ff;text-shadow:0 0 18px #22d3ee,0 4px 0 #0b0a26}
.sign .sub{border:2px solid #22d3ee;background:#0b0a26;color:#c7f9ff;box-shadow:0 0 12px rgba(34,211,238,.6);border-radius:4px}
.chip{border-radius:6px;border-color:#818cf8}.chip.sel{box-shadow:0 0 16px #22d3ee}
.fire,.wz-next{border-radius:8px;font-size:28px}
.qbox.ask{border:2px solid #22d3ee;border-radius:6px;background:#0b0a26;color:#e0e7ff;box-shadow:0 0 14px rgba(34,211,238,.5)}
""",rad='10px',veil='rgba(11,10,38,.78)',sub='#c7d2fe',bw='2px',chip='#2f2b7a',chipLine='#818cf8',tag='#22d3ee',tagInk='#0b0a26',dInk='#0b0a26',accInk='#0b0a26',goInk='#0b0a26')

mk('casefile','IBM Plex Sans KR','family=IBM+Plex+Sans+KR:wght@400;500;700&family=Gowun+Dodum','#d8dde3','#1f2a37','#fbf6e6','#dc2626','#334155','#eab308','#1f2a37','#1f2a37',
 extra="""body{background:#cfd6de;background-image:linear-gradient(135deg,rgba(51,65,85,.08) 25%,transparent 25%,transparent 50%,rgba(51,65,85,.08) 50%,rgba(51,65,85,.08) 75%,transparent 75%);background-size:30px 30px}
.sign h1{text-shadow:0 3px 0 #1f2a37;-webkit-text-stroke:1px #1f2a37;letter-spacing:.02em;font-weight:700}
.sign .sub{border:3px solid #1f2a37;background:#eab308;color:#1f2a37;box-shadow:0 4px 0 #1f2a37;border-radius:3px;font-weight:700}
.chip{border-radius:4px}.chip.sel{box-shadow:0 5px 0 #7f1d1d}
.fire,.wz-next{border-radius:6px;font-size:28px;font-weight:700}
.qbox.ask{border:3px solid #1f2a37;border-radius:4px;box-shadow:0 5px 0 #1f2a37;background:#fbf6e6;font-weight:700}
""",rad='6px',veil='rgba(31,42,55,.7)',bw='3px',goInk='#1f2a37',tagInk='#1f2a37',tag='#eab308',sans='IBM Plex Sans KR')

mk('studio','Do Hyeon','family=Do+Hyeon&family=Gowun+Dodum','#10243f','#e8f1ff','#173560','#f59e0b','#38bdf8','#ef4444','#08142a','#08142a',
 extra="""body{background:#10243f;background-image:radial-gradient(ellipse at 50% -10%,rgba(56,189,248,.35),transparent 60%),repeating-linear-gradient(0deg,rgba(255,255,255,.035) 0 2px,transparent 2px 6px)}
.sign h1{color:#fff;text-shadow:0 0 18px #38bdf8,0 4px 0 #08142a}
.sign .sub{border:3px solid #ef4444;background:#08142a;color:#fecaca;box-shadow:0 0 12px rgba(239,68,68,.6);border-radius:4px}
.chip{border-radius:8px;border-color:#38bdf8}.chip.sel{box-shadow:0 0 16px #38bdf8}
.fire,.wz-next{border-radius:10px;font-size:30px}
.qbox.ask{border:3px solid #38bdf8;border-radius:8px;background:#173560;color:#e8f1ff;box-shadow:0 0 14px rgba(56,189,248,.5)}
""",rad='12px',veil='rgba(8,20,42,.76)',sub='#bfdbfe',bw='3px',chip='#24508f',chipLine='#38bdf8',tag='#f59e0b',tagInk='#08142a',dInk='#08142a',accInk='#08142a',goInk='#fff')

mk('bistro','Jua','family=Jua&family=Gowun+Dodum','#fff4e0','#5b2a0e','#fffdf6','#c2410c','#16a34a','#c2410c','#7c2d12','#9a3412',
 extra="""body{background:#fff4e0;background-image:repeating-conic-gradient(#ffe8c7 0 25%,#fff4e0 0 50%);background-size:64px 64px}
.sign h1{text-shadow:0 4px 0 #7c2d12;-webkit-text-stroke:2px #7c2d12;color:#fff7ed}
.sign .sub{border:3px solid #7c2d12;background:#fff;color:#7c2d12;box-shadow:0 4px 0 #9a3412;border-radius:999px}
.chip{border-radius:14px}.chip.sel{box-shadow:0 5px 0 #7c2d12}
.fire,.wz-next{border-radius:999px;font-size:34px}
.qbox.ask{border:3px solid #7c2d12;border-radius:20px;box-shadow:0 5px 0 #9a3412;background:#fffdf6}
""",rad='20px',veil='rgba(124,45,18,.6)',bw='3px')

mk('matrix','Nanum Gothic Coding','family=Nanum+Gothic+Coding:wght@400;700&family=Gowun+Dodum','#04120c','#b6ffd3','#0b2a1c','#22ff88','#06b6d4','#22ff88','#021008','#021008',
 extra="""body{background:#04120c;background-image:linear-gradient(rgba(34,255,136,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(34,255,136,.07) 1px,transparent 1px);background-size:32px 32px}
.sign h1{color:#22ff88;text-shadow:0 0 18px #22ff88,0 0 4px #22ff88;font-weight:700;letter-spacing:.03em}
.sign .sub{border:2px solid #22ff88;background:#021008;color:#b6ffd3;box-shadow:0 0 12px rgba(34,255,136,.6);border-radius:3px}
.chip{border-radius:3px;border-color:#14b86a}.chip.sel{box-shadow:0 0 16px #22ff88}
.fire,.wz-next{border-radius:4px;font-size:28px;font-weight:700}
.qbox.ask{border:2px solid #22ff88;border-radius:3px;background:#0b2a1c;color:#b6ffd3;box-shadow:0 0 14px rgba(34,255,136,.5);font-weight:700}
""",rad='6px',veil='rgba(2,16,8,.8)',sub='#7be8ad',bw='2px',chip='#0f3d29',chipLine='#14b86a',tag='#22ff88',tagInk='#021008',dInk='#021008',accInk='#021008',goInk='#021008')

mk('landdeed','Gowun Batang','family=Gowun+Batang:wght@400;700&family=Gowun+Dodum','#e8efd0','#2c3b17','#fdfbec','#ca8a04','#15803d','#ca8a04','#365314','#3f6212',
 extra="""body{background:#dfe8c3;background-image:linear-gradient(rgba(63,98,18,.12) 2px,transparent 2px),linear-gradient(90deg,rgba(63,98,18,.12) 2px,transparent 2px);background-size:56px 56px;background-position:-2px -2px}
.sign h1{text-shadow:0 3px 0 #365314;-webkit-text-stroke:1px #365314;font-weight:700;letter-spacing:.02em}
.sign .sub{border:3px solid #365314;background:#fdfbec;color:#365314;box-shadow:0 4px 0 #3f6212;border-radius:3px;font-weight:700}
.chip{border-radius:5px}.chip.sel{box-shadow:0 5px 0 #713f12}
.fire,.wz-next{border-radius:6px;font-size:30px;font-weight:700}
.qbox.ask{border:3px solid #365314;border-radius:4px;box-shadow:0 5px 0 #3f6212;background:#fdfbec;font-weight:700}
""",rad='8px',veil='rgba(54,83,20,.66)',bw='3px',sans='Gowun Batang')

mk('carnival','Gasoek One','family=Gasoek+One&family=Gowun+Dodum','#ffe3f1','#5b1a46','#fffdfd','#db2777','#2563eb','#db2777','#831843','#9d174d',
 extra="""body{background:#ffe3f1;background-image:repeating-linear-gradient(90deg,rgba(219,39,119,.12) 0 40px,rgba(37,99,235,.1) 40px 80px),radial-gradient(circle at 50% -5%,#fff 0 18%,transparent 19%);}
.sign h1{text-shadow:0 4px 0 #831843,0 8px 0 rgba(131,24,67,.2);-webkit-text-stroke:2px #831843;color:#fff7fb}
.sign .sub{border:3px solid #831843;background:#fff;color:#831843;box-shadow:0 4px 0 #9d174d;border-radius:999px}
.chip{border-radius:16px}.chip.sel{box-shadow:0 5px 0 #1e3a8a}
.fire,.wz-next{border-radius:999px;font-size:30px}
.qbox.ask{border:3px solid #831843;border-radius:20px;box-shadow:0 5px 0 #9d174d;background:#fffdfd}
""",rad='20px',veil='rgba(131,24,67,.62)',bw='3px')

mk('fruitmarket','Kirang Haerang','family=Kirang+Haerang&family=Gowun+Dodum','#fff3d6','#5b2a0e','#fffdf4','#f97316','#7c3aed','#f97316','#7c2d12','#9a3412',
 extra="""body{background:#fff3d6;background-image:repeating-linear-gradient(90deg,#fb923c 0 56px,#fff7ed 56px 112px);background-size:auto 70px;background-repeat:repeat-x;background-position:0 0}
.sign h1{text-shadow:0 4px 0 #7c2d12;-webkit-text-stroke:2px #7c2d12;color:#fff7ed}
.sign .sub{border:3px solid #7c2d12;background:#fffdf4;color:#7c2d12;box-shadow:0 4px 0 #9a3412;border-radius:999px}
.chip{border-radius:16px}.chip.sel{box-shadow:0 5px 0 #4c1d95}
.fire,.wz-next{border-radius:999px;font-size:34px}
.qbox.ask{border:3px solid #7c2d12;border-radius:20px;box-shadow:0 5px 0 #9a3412;background:#fffdf4}
""",rad='20px',veil='rgba(124,45,18,.62)',bw='3px')
