const zones=[["Z1",30,1000,40],["Z2",35,2000,30],["Z3",40,2700,20],["Z4",45,5000,10],["Z5",50,6500,0],["Z6",55,8000,-10],["Z7",60,10000,-30]];
const std=[40000,60000,80000,100000,120000,140000];
const rec=x=>std.find(s=>s>=x)||140000;
const eff=0.95, ducts=1.10, price=1.35;
const UAnew={poor:0.604,average:0.270,good:0.189,excellent:0.177};
const insulOld={poor:1.25,average:1.0,good:0.9,excellent:0.8};
// OLD model: output = sqft*btuPerSqFt*insul*ducts (other adj 1.0 at defaults); annual=0.25*sqft*envF*hdd*24/(eff*1e5)
function oldF(sqft,btu,hdd,insul){ const base=sqft*btu; const adj=base*insulOld[insul]*ducts; const out=Math.round(adj); const inp=Math.round(out/eff); const envF=adj/base; const therms=0.25*sqft*envF*hdd*24/(eff*1e5); return {out,inp,rec:rec(inp),therms:+therms.toFixed(1),cost:Math.round(therms*price)}; }
// NEW model: output = UA*sqft*adjustments*(70-dt); annual=UA*sqft*adjustments*hdd*24/(eff*1e5)
function newF(sqft,hdd,dt,insul){ const ua=UAnew[insul]; const adj=ducts; const uaTot=ua*sqft*adj; const out=Math.round(uaTot*(70-dt)); const inp=Math.round(out/eff); const therms=ua*sqft*adj*hdd*24/(eff*1e5); const smallOver=out>0 && 40000*eff>1.4*out; return {out,inp,rec:rec(inp),therms:+therms.toFixed(1),cost:Math.round(therms*price),smallOver}; }
console.log("=== PART A table: 2000 sqft, defaults (average insul, 95% AFUE), each zone — BEFORE -> AFTER ===");
console.log("zone | OLD out/in/rec/therms/$ | NEW out/in/rec/therms/$ | smallest-oversized msg?");
for(const [z,btu,hdd,dt] of zones){ const o=oldF(2000,btu,hdd,"average"); const n=newF(2000,hdd,dt,"average");
  console.log(`${z} | ${o.out}/${o.inp}/${o.rec}/${o.therms}/$${o.cost} | ${n.out}/${n.inp}/${n.rec}/${n.therms}/$${n.cost} | ${n.smallOver?"YES":"no"}`); }
console.log("\n=== PART A: Zone 4 (2000 sqft, defaults) each insulation — BEFORE -> AFTER ===");
for(const ins of ["poor","average","good","excellent"]){ const o=oldF(2000,45,5000,ins); const n=newF(2000,5000,10,ins);
  console.log(`${ins} | OLD out ${o.out} in ${o.inp} rec ${o.rec} therms ${o.therms} $${o.cost} | NEW out ${n.out} in ${n.inp} rec ${n.rec} therms ${n.therms} $${n.cost} | smallOver ${n.smallOver}`); }
