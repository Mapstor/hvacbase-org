import re,sys
def lint(path):
    s=open(path).read(); W,H=map(float,re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"',s).groups())
    fs={'lbl':13,'zone':11,'head':19,'key':13,'chk':14,'cap':12,'num':13,'big':16}
    T=[]
    for m in re.finditer(r'<text([^>]*)>(.*?)</text>',s,re.S):
        a=m.group(1); txt=re.sub(r'<[^>]+>','',m.group(2)).strip()
        x=float(re.search(r'\bx="([\d.]+)"',a).group(1)); y=float(re.search(r'\by="([\d.]+)"',a).group(1))
        c=re.search(r'class="(\w+)"',a).group(1); f=fs.get(c,13); w=len(txt)*f*(0.62 if c in('head','zone') else 0.56)
        if 'text-anchor' in a: return [f"{path}: anchored text not allowed (render quirk): {txt}"]
        T.append((txt[:24],x,y-f*0.8,x+w,y+f*0.25))
    S=[(m.group(0)[:30],float(m.group(1)),float(m.group(2)),float(m.group(1))+float(m.group(3)),float(m.group(2))+float(m.group(4)))
       for m in re.finditer(r'<rect class="solid" x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"',s)]
    L=[]  # straight stroked paths M x y H x / V y with stroke-width>=2
    for m in re.finditer(r'<path[^>]*d="M([\d.]+) ([\d.]+) ([HV])([\d.]+)"[^>]*stroke-width="([\d.]+)"',s):
        x,y,k,v,sw=float(m.group(1)),float(m.group(2)),m.group(3),float(m.group(4)),float(m.group(5))
        if sw<2: continue
        if k=='H': L.append(('line',min(x,v),y-sw/2,max(x,v),y+sw/2))
        else: L.append(('line',x-sw/2,min(y,v),x+sw/2,max(y,v)))
    ov=lambda a,b,p=0: a[1]+p<b[3] and b[1]+p<a[3] and a[2]+p<b[4] and b[2]+p<a[4]
    bad=[]
    for i,t in enumerate(T):
        for u in T[i+1:]:
            if ov(t,u): bad.append(f"text/text: {t[0]} | {u[0]}")
        for o in S+L:
            if ov(t,o): bad.append(f"text/{o[0][:5]}: {t[0]}")
        if t[1]<0 or t[3]>W or t[2]<0 or t[4]>H: bad.append(f"off-canvas: {t[0]}")

    R=[(float(m.group(1)),float(m.group(2)),float(m.group(1))+float(m.group(3)),float(m.group(2))+float(m.group(4)))
       for m in re.finditer(r'<rect(?: class="[^"]*")? x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"',s)]
    for t in T:
        tx,ty=t[1],t[4]-2
        inside=[r for r in R if r[0]<=tx<=r[2] and r[1]<=ty<=r[3] and not (r[0]==0 and r[1]==0)]
        if inside:
            r=min(inside,key=lambda r:(r[2]-r[0])*(r[3]-r[1]))
            if t[1]<r[0]+6 or t[3]>r[2]-6 or t[2]<r[1]+4 or t[4]>r[3]-4: bad.append(f"text overflows its panel: {t[0]}")
    for o in S:
        for l in L:
            if ov(o,l,3): bad.append(f"line crosses shape: {o[0]}")
    for need in ['<title','<desc','role="img"','viewBox','prefers-reduced-motion']:
        if need not in s and not (need=='prefers-reduced-motion' and 'animation' not in s): bad.append(f"missing {need}")
    if re.search(r'<script|foreignObject|href="http',s): bad.append("external/script content")
    return bad or [f"{path}: OK ({len(T)} texts, {len(S)} solids, {len(L)} lines, {len(s.encode())} bytes)"]
for p in sys.argv[1:]: print("\n".join(lint(p)))
