// Replicates HeatPumpSizeCalculator.calc for REBUILD-1 before/after.
const UA = { excellent:0.177, good:0.189, average:0.270, older:0.45, poor:0.604 };
const STORIES_F = { '1':1.00, '2':0.96, '3':0.94 };
const HEATING_UA_LEVEL = { new:'excellent', modern:'good', standard:'average', older:'older', vintage:'poor' };
const TON = [1.5,2,2.5,3,3.5,4,4.5,5];

function capAtTemp(T,c47,c17,c5){ if(T>=47)return c47; if(T>=17)return c47+((T-47)/30)*(c47-c17); return Math.max(0,c17+((T-17)/12)*(c17-c5)); }
function loadAtTemp(T,dl,dt){ if(T>=65||65-dt<=0)return 0; return dl*(65-T)/(65-dt); }
function balancePoint(dl,dt,c47,c17,c5){ if(dl<=0||c47<=0)return null; const stop=dt-10; for(let T=65;T>=stop;T-=0.5){ if(capAtTemp(T,c47,c17,c5)<=loadAtTemp(T,dl,dt)) return Math.round(T*2)/2; } return null; }

function run(o){
  const {sqFt, coolingBTU, heatingBTU, coldestTemp, coolingEFLH, heatingEFLH,
    ageFactor, ageValue, storiesFactorCool, storiesValue, windowFactor, occN, eff, hspf, coolingCap, isCc, kwhRate, mode} = o;
  const baseCool = sqFt*coolingBTU;
  const envelopeFactor = ageFactor*storiesFactorCool*windowFactor;
  const occupantAdj = Math.max(0,occN-2)*400;
  const coolingLoad = baseCool*envelopeFactor + occupantAdj;
  let heatingLoad;
  if(mode==='old'){ heatingLoad = sqFt*heatingBTU*envelopeFactor; }
  else { heatingLoad = UA[HEATING_UA_LEVEL[ageValue]] * sqFt * STORIES_F[storiesValue] * windowFactor * (70-coldestTemp); }
  const coolingTons=coolingLoad/12000, heatingTons=heatingLoad/12000;
  const sizingTarget = isCc ? Math.min(heatingTons, coolingTons*1.25) : coolingTons;
  let recommendedSize;
  if(isCc){ recommendedSize = TON.find(s=>s>=sizingTarget) ?? 5; }
  else { const valid=TON.filter(s=>s>=coolingTons*0.95 && s<=coolingTons*coolingCap); recommendedSize = valid.length? valid[0] : (TON.find(s=>s>=coolingTons*0.95)??5); }
  const c47=recommendedSize*12000;
  const c17= isCc? c47*0.79 : c47*0.60;
  const c5 = isCc? c47*0.70 : c47*0.40;
  const bp = balancePoint(heatingLoad, coldestTemp, c47, c17, c5);
  const hpCapAtDesign = capAtTemp(coldestTemp, c47, c17, c5);
  const suppBTU = Math.round(Math.max(0, heatingLoad-hpCapAtDesign)*1.10);
  const suppKW = suppBTU/3412;
  const coolingKWh = coolingLoad*coolingEFLH/(eff*1000);
  const heatingKWh = heatingLoad*heatingEFLH/(hspf*1000);
  const annualCost = (coolingKWh+heatingKWh)*kwhRate;
  return {heatingLoad:Math.round(heatingLoad), recommendedSize, bp, suppKW:+suppKW.toFixed(1), annualCost:Math.round(annualCost)};
}

const scenarios = [
  { name:'DEFAULTS mixed-humid / ENERGY STAR', base:{ sqFt:2000, coolingBTU:21, heatingBTU:45, coldestTemp:15, coolingEFLH:1000, heatingEFLH:2000,
      ageFactor:1.0, ageValue:'standard', storiesFactorCool:1.0, storiesValue:'2', windowFactor:1.0, occN:4, eff:15.2, hspf:7.8, coolingCap:1.20, isCc:false, kwhRate:0.18 } },
  { name:'COLD 0°F / cold-climate tier', base:{ sqFt:2000, coolingBTU:18, heatingBTU:50, coldestTemp:0, coolingEFLH:700, heatingEFLH:3000,
      ageFactor:1.0, ageValue:'standard', storiesFactorCool:1.0, storiesValue:'2', windowFactor:1.0, occN:4, eff:16, hspf:10.0, coolingCap:1.25, isCc:true, kwhRate:0.18 } },
  { name:'VERY-COLD −10°F / cold-climate tier', base:{ sqFt:2000, coolingBTU:16, heatingBTU:55, coldestTemp:-10, coolingEFLH:400, heatingEFLH:4000,
      ageFactor:1.0, ageValue:'standard', storiesFactorCool:1.0, storiesValue:'2', windowFactor:1.0, occN:4, eff:16, hspf:10.0, coolingCap:1.25, isCc:true, kwhRate:0.18 } },
];
for(const s of scenarios){
  const oldR = run({...s.base, mode:'old'});
  const newR = run({...s.base, mode:'new'});
  console.log(`\n### ${s.name}`);
  console.log(`heating load : ${oldR.heatingLoad} -> ${newR.heatingLoad} BTU`);
  console.log(`recommended  : ${oldR.recommendedSize} -> ${newR.recommendedSize} tons`);
  console.log(`balance pt   : ${oldR.bp}°F -> ${newR.bp}°F`);
  console.log(`supplemental : ${oldR.suppKW} -> ${newR.suppKW} kW`);
  console.log(`annual cost  : $${oldR.annualCost} -> $${newR.annualCost}`);
}
