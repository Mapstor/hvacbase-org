const STANDARD_TON_SIZES=[1.5,2,2.5,3,3.5,4,4.5,5];
const climate={ 'mixed-humid':{coolingBTU:21,heatingBTU:45,coldestTemp:15,coolingEFLH:1000,heatingEFLH:2000},
  'cold':{coolingBTU:18,heatingBTU:50,coldestTemp:0,coolingEFLH:700,heatingEFLH:3000},
  'very-cold':{coolingBTU:16,heatingBTU:55,coldestTemp:-10,coolingEFLH:400,heatingEFLH:4000} };
function capAt(T,c47,c17,c5){ if(T>=47)return c47; if(T>=17)return c47+((T-47)/30)*(c47-c17); return Math.max(0,c17+((T-17)/12)*(c17-c5)); }
function loadAt(T,dl,dt){ if(T>=65||65-dt<=0)return 0; return dl*(65-T)/(65-dt); }
function balance(dl,dt,c47,c17,c5){ if(dl<=0||c47<=0)return null; for(let T=65;T>=dt-10;T-=0.5){ if(capAt(T,c47,c17,c5)<=loadAt(T,dl,dt))return Math.round(T*2)/2; } return null; }
// ccC17/ccC5 = cold-climate retention factors (OLD 0.90/0.85 or NEW 0.79/0.70). Standard is ALWAYS 0.60/0.40.
function run({cl,isCc,eff,coolingCap,hspf,ccC17,ccC5,occ=4,rate=0.18}){
  const C=climate[cl], envF=1.0, occAdj=Math.max(0,occ-2)*400;
  const coolingLoad=2000*C.coolingBTU*envF+occAdj, heatingLoad=2000*C.heatingBTU*envF;
  const coolingTons=coolingLoad/12000, heatingTons=heatingLoad/12000;
  const sizingTarget=isCc?Math.min(heatingTons,coolingTons*1.25):coolingTons;
  let rec; if(isCc){ rec=STANDARD_TON_SIZES.find(s=>s>=sizingTarget)??5; }
  else { const v=STANDARD_TON_SIZES.filter(s=>s>=coolingTons*0.95&&s<=coolingTons*coolingCap); rec=v.length?v[0]:(STANDARD_TON_SIZES.find(s=>s>=coolingTons*0.95)??5); }
  const c47=rec*12000;
  const c17=isCc?c47*ccC17:c47*0.60;   // matches code
  const c5 =isCc?c47*ccC5 :c47*0.40;
  const bp=balance(heatingLoad,C.coldestTemp,c47,c17,c5);
  const hpD=capAt(C.coldestTemp,c47,c17,c5);
  const suppBTU=Math.round(Math.max(0,heatingLoad-hpD)*1.10), suppKW=suppBTU/3412;
  const cost=Math.round((coolingLoad*C.coolingEFLH/(eff*1000)+heatingLoad*C.heatingEFLH/(hspf*1000))*rate);
  return {rec,bp,suppKW:+suppKW.toFixed(1),suppBTU,cost,c17:Math.round(c17),c5:Math.round(c5),hpD:Math.round(hpD)};
}
const es={isCc:false,eff:15.2,coolingCap:1.20}, cc={isCc:true,eff:16,coolingCap:1.25,hspf:10.0};
const OLD={ccC17:0.90,ccC5:0.85}, NEW={ccC17:0.79,ccC5:0.70};
const p=(t,o,n)=>{console.log(t);console.log("  BEFORE:",JSON.stringify(o));console.log("  AFTER :",JSON.stringify(n));};
p("CASE 1 DEFAULT (energy-star, mixed-humid): standard 60/40 unchanged; only hspf 8.1->7.8",
  run({cl:'mixed-humid',...es,hspf:8.1,...OLD}), run({cl:'mixed-humid',...es,hspf:7.8,...NEW}));
p("CASE 2 cold-climate tier @ mixed-humid (design 15F)",
  run({cl:'mixed-humid',...cc,...OLD}), run({cl:'mixed-humid',...cc,...NEW}));
p("CASE 3 cold-climate tier @ 'cold' (design 0F)",
  run({cl:'cold',...cc,...OLD}), run({cl:'cold',...cc,...NEW}));
p("CASE 4 cold-climate tier @ 'very-cold' (design -10F)",
  run({cl:'very-cold',...cc,...OLD}), run({cl:'very-cold',...cc,...NEW}));
