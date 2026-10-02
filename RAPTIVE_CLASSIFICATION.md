# hvacbase.org — Raptive Remediation Step 1: Full Crawl + Classification
_Read-only classification of all 281 live pages against the Aug 20–Sep 16 GA4 export (28 days). Nothing changed. For Marko's review before any cut/edit._

## Method & honest caveats
- **Live page set = 281 MDX** (frontmatter `slug`), the exact set `getAllSlugs()` feeds the router + sitemap. The `_archived-product-pages/` tree (70 files) is code-excluded from routes and was not classified.
- **Sessions** joined from the GA4 CSV by slug; 0 if absent. sessions/day = 4-week ÷ 28.
- **HTTP status could NOT be curled** — this environment has no outbound network. Status below is derived from the routing code, which is authoritative for what the deploy serves: live slug → **200**; path in `next.config.mjs` redirects → **308 permanent**; otherwise `notFound()` → **404**. Nothing emits **410**. NOTE: production reflects the last *pushed* commit; the repo is ~30 commits ahead unpushed, so a couple of statuses may differ on prod until Marko pushes.
- **`unsourced_stat_est` is a density estimate, not an exact tally.** Sources on this site sit in a trailing `SourcesBox`, not inline — so most numbers read as 'unsourced inline.' Two scanners (electrical/generators, and the 50-state cost pages) counted every code-table / state-table cell, yielding 40–90; prose-heavy pages counted fact-asserting sentences (12–30). Compare within a cluster, not across.

## Summary counts (live 281 MDX)
| Bucket | Pages | 4-wk sessions | Share of traffic |
|---|--:|--:|--:|
| CUT-FABRICATED | 46 | 950 | 4.4% |
| CUT-THIN-DEAD | 0 | 0 | 0.0% |
| KEEP-REWRITE | 189 | 13,602 | 62.4% |
| KEEP-GOOD | 46 | 7,261 | 33.3% |
| **TOTAL** | **281** | **21,813** | 100% |

_Plus 2 fabricated **app-route** hub pages not in the MDX set: `/brand-reviews` (12 sess) and `/buying-guides` (6 sess) — see Sitewide._

## 1. CUT-FABRICATED — every URL (46 MDX + 2 app-route)
Product/brand rankings, single-product reviews, and superlative roundups. Cut regardless of traffic.

| Sessions | URL | Type | Named products |
|--:|---|---|---|
| 71 | https://www.hvacbase.org/casement-window-air-conditioners | product-or-brand | Y:Soleus Air Exclusive,LG LP0823GSSM,Frigidaire FHWC084WB1 |
| 53 | https://www.hvacbase.org/quietest-window-acs | product-or-brand | Y:Midea MAW06V1QWT,LG LW6023IVSM,LG LW8023IVSM |
| 53 | https://www.hvacbase.org/coway-air-purifiers | product-or-brand | Y:Coway Airmega 400/250S/200M/150, AP-1512HH |
| 49 | https://www.hvacbase.org/mrcool-diy-mini-split-review | product-or-brand | Y:MrCool DIY 4th Gen, 3rd Gen, multi-zone |
| 47 | https://www.hvacbase.org/levoit-air-purifiers | product-or-brand | Y:Levoit Core 600S/400S/300S/200S, EverestAir, Vital 200S |
| 45 | https://www.hvacbase.org/smallest-window-acs | product-or-brand | Y:Frigidaire FFRE053WAE,Koldfront WAC6002WCO,Haier QHNG06AC |
| 41 | https://www.hvacbase.org/quietest-mini-splits | comparison | Y:Fujitsu RLS3H,Mitsubishi MSZ-FH,Daikin DERA,LG,Samsung |
| 37 | https://www.hvacbase.org/smallest-mini-splits | product-or-brand | Y:Mitsubishi MSZ-FH09, Daikin Aurora 09, Fujitsu RLS3H, LG, Senville |
| 32 | https://www.hvacbase.org/honeywell-air-purifiers | product-or-brand | Y:Honeywell HPA300/HPA250B/HPA200/HPA5300B/HPA100/HPA5150B/HPA020B |
| 29 | https://www.hvacbase.org/most-energy-efficient-dehumidifiers | product-or-brand | Y:LG PuriCare, Midea, Frigidaire, GE, hOmeLabs, Tosot, SantaFe, AprilA |
| 27 | https://www.hvacbase.org/winix-air-purifiers | product-or-brand | Y:Winix 5500-2/C545/AM90/D360/5300-2/HR900 |
| 25 | https://www.hvacbase.org/dyson-air-purifiers | product-or-brand | Y:Dyson Big Quiet, Purifier Cool/Hot+Cool/Humidify+Cool lines |
| 24 | https://www.hvacbase.org/through-the-wall-air-conditioners | product-or-brand | Y:Friedrich WCT12A30A,Friedrich WET12A33A,LG LT1237HNR |
| 24 | https://www.hvacbase.org/quietest-portable-air-conditioners | product-or-brand | Y:LG LP1419IVSM, Midea Duo, Midea MAP05R1BWT, Whynter Elite, GE APCA14 |
| 23 | https://www.hvacbase.org/iqair-healthpro-plus-review | product-or-brand | Y:IQAir HealthPro Plus |
| 22 | https://www.hvacbase.org/safest-space-heaters | product-or-brand |  |
| 22 | https://www.hvacbase.org/blueair-air-purifiers | product-or-brand | Y:Blueair HealthProtect 7470i, DustMagnet 5410i/5240i, Blue Pure 311i+ |
| 21 | https://www.hvacbase.org/quietest-dehumidifiers | product-or-brand | Y:LG PuriCare, Midea Cube, Frigidaire, GE, Tosot, hOmeLabs, SantaFe, H |
| 19 | https://www.hvacbase.org/biggest-window-acs | product-or-brand | Y:Friedrich CCF24A30A,LG LW2521ERSM,Frigidaire FFRA252WAE |
| 18 | https://www.hvacbase.org/quietest-air-purifiers | product-or-brand | Y:Blueair 411a/411i Max, Dyson Big Quiet, IQAir HealthPro Plus, Coway  |
| 17 | https://www.hvacbase.org/cassette-ceiling-air-conditioners | product-or-brand | Y:Mitsubishi MLZ-KP, Daikin FFQ, Fujitsu, LG, Carrier/Midea |
| 16 | https://www.hvacbase.org/portable-ac-window-seal-kits | product-or-brand | Y:Gulrear, Brosyda, Forestchill, AC-Safe, custom plexiglass |
| 16 | https://www.hvacbase.org/airdog-air-purifier-review | product-or-brand | Y:Airdog X5, X3, X5 FitAir, X8 |
| 16 | https://www.hvacbase.org/smallest-air-purifiers | product-or-brand | Y:Blueair 411i Max/411a, Levoit Core 300S/200S/Vital 100S, Coway AP-10 |
| 15 | https://www.hvacbase.org/battery-operated-heaters | product-or-brand | Y:Mr Heater Buddy,EcoFlow,Bluetti,Jackery,ORORO |
| 14 | https://www.hvacbase.org/most-energy-efficient-window-acs | product-or-brand | Y:LG LW8023IVSM,Midea MAW06V1QWT,LG LW1023IVSM |
| 13 | https://www.hvacbase.org/mini-split-line-set-covers | product-or-brand | Y:Rectorseal Slimduct, DiversiTech, Inaba Denko, MrCool, Pioneer |
| 13 | https://www.hvacbase.org/biggest-portable-acs | product-or-brand | Y:Midea Duo, Whynter Elite ARC-1230WNH, Honeywell MN14CHCSBB, Whynter  |
| 13 | https://www.hvacbase.org/smallest-portable-acs | product-or-brand | Y:SereneLife SLPAC805W, Honeywell MO08CESWK, Black+Decker BPACT08WT, M |
| 13 | https://www.hvacbase.org/outdoor-portable-tankless-heaters | product-or-brand | Y:Eccotemp L10/CEL10, Fogatti InstaShower 8, Camplux, Camp Chef, Gasla |
| 12 | https://www.hvacbase.org/molekule-air-purifier-review | product-or-brand | Y:Molekule Air Pro, Air Mini+ |
| 12 | https://www.hvacbase.org/smallest-tankless-water-heaters | product-or-brand | Y:Bosch Tronic 3000T, Stiebel DHC/Tempra, EcoSmart, Rheem RTEX, Rinnai |
| 11 | https://www.hvacbase.org/low-profile-window-acs | product-or-brand | Y:GE Profile PHC06LY,PHC08LY,PHC10LY |
| 11 | https://www.hvacbase.org/mini-split-brands-ranked | product-or-brand | Y:Daikin Aurora 12K, Senville LETO SENL-12CD, Mitsubishi MSZ-FS12NA |
| 11 | https://www.hvacbase.org/best-electric-furnace | product-or-brand | Y:Goodman,Rheem,Carrier,Lennox,York |
| 10 | https://www.hvacbase.org/safest-heater-for-bedroom | product-or-brand | Y:De'Longhi,Pelonis,Cadet,Dreo,Lasko,Envi |
| 8 | https://www.hvacbase.org/smallest-acs-for-small-rooms | product-or-brand | Y:Midea MAW06V1QWT,Frigidaire FFRE053WAE,LG LW6023IVSM |
| 8 | https://www.hvacbase.org/wall-mounted-air-purifiers | product-or-brand | Y:Rabbit Air MinusA2/A3/BioGS 2.0, Blueair Protect 7470i, Airmega Icon |
| 7 | https://www.hvacbase.org/cheapest-portable-air-conditioners | product-or-brand | Y:Tosot Shiny, Black+Decker BPACT08WT, SereneLife SLPAC805W, Honeywell |
| 7 | https://www.hvacbase.org/alen-breathesmart-air-purifiers | product-or-brand | Y:Alen BreatheSmart 75i, 45i, FLEX |
| 7 | https://www.hvacbase.org/germguardian-air-purifiers | product-or-brand | Y:GermGuardian AC5350B/AC5250PT/AC4825/AC4300/AC4100/AC4700 |
| 5 | https://www.hvacbase.org/lightweight-window-acs | product-or-brand | Y:Frigidaire FFRA051WAE,TCL 8W3E1-A,Frigidaire GHWQ103WC1 |
| 5 | https://www.hvacbase.org/mini-split-for-bedroom | product-or-brand | Y:Mitsubishi MSZ-FH, Daikin Aurora, Fujitsu RLS3H, LG, MrCool |
| 3 | https://www.hvacbase.org/window-ac-support-brackets | product-or-brand | Y:AC Safe AC-080,Jeacent Universal,AC Safe AC-160 |
| 3 | https://www.hvacbase.org/window-ac-with-heater | product-or-brand | Y:Friedrich CCW10B10A,LG LW1221HRSM,Frigidaire FHWH082WA1 |
| 2 | https://www.hvacbase.org/medify-air-purifiers | product-or-brand | Y:Medify MA-112/MA-40/MA-25/MA-15/MA-14 |
| 12 | https://www.hvacbase.org/brand-reviews | app-route hub | 15 hardcoded brands w/ strengths-weaknesses (American Standard, Carrier, Lennox, Trane, Goodman, Rheem, Daikin, LG, Mitsubishi…) |
| 6 | https://www.hvacbase.org/buying-guides | app-route hub | hardcoded 'buying guide' cards |

## 2. KEEP-REWRITE — pages with an EMBEDDED product table (keep the page, STRIP the table on rewrite)
These have a real informational spine but carry a fabricated named-model table that must go.

| Sessions | URL | Type | Embedded models |
|--:|---|---|---|
| 387 | https://www.hvacbase.org/carbon-monoxide-detector-guide | explainer | Y:Kidde Nighthawk/Smart Detect, First Alert CO615/OneLink, N |
| 271 | https://www.hvacbase.org/what-size-generator-for-fridge | explainer | Y:Honda EU2200i, Micro-Air EasyStart |
| 199 | https://www.hvacbase.org/how-to-reduce-hvac-noise | explainer | Y:Brinmar,Quiet Fence |
| 128 | https://www.hvacbase.org/how-to-clean-ac-coils | explainer | Y:Nu-Calgon,Frost King,Web,ZEP,SpeedClean |
| 112 | https://www.hvacbase.org/home-battery-backup-guide | comparison | Y:Tesla Powerwall 3, Enphase IQ 5P, Franklin WH, Sonnen |
| 107 | https://www.hvacbase.org/how-to-improve-indoor-air-quality | explainer | Y:Levoit Core 300, Coway Airmega 200M/400, Aprilaire 5000, T |
| 77 | https://www.hvacbase.org/voc-in-home-sources | explainer | Y:AirThings View/Wave Plus, Temtop M10i, uHoo, Lennox PureAi |
| 72 | https://www.hvacbase.org/dehumidifier-electricity-usage | explainer | Y:LG UD501KOG5, AprilAire E100, Pro Breeze PB-02-US |
| 65 | https://www.hvacbase.org/hspf2-rating-explained | explainer | Y:Mitsubishi Hyper-Heat, Fujitsu Halcyon XLTH, Daikin Fit, C |
| 65 | https://www.hvacbase.org/indoor-air-quality-testing | explainer | Y:Airthings Wave Plus, Temtop M2000/M10i, RadonEye RD200, TS |
| 54 | https://www.hvacbase.org/eer-chart-for-ac-units | explainer | Y:Lennox XC25, Carrier Infinity 24, Daikin DX20VC, Trane XV2 |
| 52 | https://www.hvacbase.org/mini-split-air-conditioners | category-hub | Y:Mitsubishi, Daikin, Fujitsu, MrCool, Senville |
| 50 | https://www.hvacbase.org/air-purifier-guide | explainer | Y:Blueair 211i Max, Coway Airmega 400, Winix 5500-2, Levoit  |
| 47 | https://www.hvacbase.org/indoor-air-quality-guide | explainer | Y:Aranet4, AirThings View Plus/Wave Plus, Temtop M10i, IQAir |
| 45 | https://www.hvacbase.org/uv-light-hvac-systems | explainer | Y:Fresh-Aire UV, RGF REME, Steril-Aire, Lumalier, Atlantic U |
| 43 | https://www.hvacbase.org/tankless-water-heater-cost | cost-guide | Y:Navien, Rinnai, Noritz, Rheem, EcoSmart, Stiebel Eltron |
| 43 | https://www.hvacbase.org/heat-pump-water-heater-guide | other | Y:Rheem ProTerra, A.O. Smith HPTU, Bradford White AeroTherm, |
| 37 | https://www.hvacbase.org/hot-water-recirculating-pump | other | Y:Grundfos Comfort PM, Watts 500800, Taco 006-CT, Navien, Ri |
| 35 | https://www.hvacbase.org/moisture-barrier-crawl-space | explainer | Y:Stego Wrap, Americover, CleanSpace/Dura-Skrim, Santa Fe Co |
| 34 | https://www.hvacbase.org/smart-thermostat-savings | explainer | Y:Ecobee,Nest,Honeywell T9,Emerson Sensi,Mysa |
| 33 | https://www.hvacbase.org/generator-guide | comparison | Y:Generac, Honda, Kohler |
| 33 | https://www.hvacbase.org/tankless-water-heater-wire-size | other | Y:EcoSmart ECO 11/27/36, Rheem RTEX-18 |
| 32 | https://www.hvacbase.org/duct-leakage-testing | explainer | Y:Aeroseal |
| 32 | https://www.hvacbase.org/tankless-water-heater-breaker-size | other | Y:EcoSmart, Rheem RTEX, Stiebel Eltron Tempra |
| 29 | https://www.hvacbase.org/saddle-u-shaped-air-conditioners | explainer | Y:Midea MAW06V1QWT,MAW14V1QWT |
| 29 | https://www.hvacbase.org/tankless-water-heater-guide | other | Y:Rinnai RU199iN, EcoSmart ECO 27 |
| 28 | https://www.hvacbase.org/5000-btu-air-conditioner-room-size | explainer | Y:Midea MAW05M1BWT, GE AHQ05LZ, LG LW5024, Frigidaire, Haier |
| 28 | https://www.hvacbase.org/whole-house-ventilation-systems | comparison | Y:Broan AI ERV200/HRV200, Panasonic Intelli-Balance 100/200, |
| 26 | https://www.hvacbase.org/what-size-generator-for-5-ton-ac | explainer | Y:Generac Guardian 22/24kW,Kohler 20RCAL,Briggs&Stratton,Cum |
| 25 | https://www.hvacbase.org/what-size-mini-split-for-garage | explainer | Y:Mitsubishi MSZ-GL24NA/GL12NA, Fujitsu 12RLS3Y, MrCool, Pio |
| 23 | https://www.hvacbase.org/how-long-do-generators-last | explainer | Y:Honda, Kohler |
| 16 | https://www.hvacbase.org/mold-prevention-guide | explainer | Y:Panasonic WhisperGreen, Govee H5075/H5054, Ecobee Premium, |
| 14 | https://www.hvacbase.org/cadr-rating-explained | explainer | Y:Coway Airmega 400, Blueair 211+, Honeywell HPA300, Levoit |
| 14 | https://www.hvacbase.org/ceer-rating-explained | explainer | Y:Midea U-Shaped, LG LW8023IVSM, Frigidaire, GE Profile |
| 13 | https://www.hvacbase.org/thermostat-temperature-winter | explainer | Y:Nest,Ecobee,Honeywell T9,Amazon,Emerson Sensi |
| 10 | https://www.hvacbase.org/eer2-rating-explained | explainer | Y:Lennox XC25, Carrier Infinity 24, Daikin DX20VC, Trane XV2 |
| 10 | https://www.hvacbase.org/mold-remediation-cost | cost-guide | Y:Concrobium Mold Control, Zinsser Mold Killing Primer |
| 8 | https://www.hvacbase.org/tankless-vs-tank-water-heater | comparison | Y:Rinnai RU160iN, Navien NPE-2 240S, EcoSmart ECO 27/36 |

## 3. KEEP-GOOD (46) — verified calculators + tax pages
Calculator math + rate constants were remediated in the prior project. **Caveat:** they still carry inline-sourcing debt (sources in SourcesBox, not inline) and 13 name specific models in prose — review, don't cut.

| Sessions | URL | Type | Names models? |
|--:|---|---|---|
| 1019 | https://www.hvacbase.org/ac-tonnage-calculator | calculator | Y: Y:Carrier/Trane/Goodman/Lennox/Rheem model li |
| 901 | https://www.hvacbase.org/air-conditioner-btu-calculator | calculator | — |
| 624 | https://www.hvacbase.org/mini-split-sizing-calculator | calculator | Y: Y:Mitsubishi MSZ-GL09NA/MXZ-4C36NAHZ, Fujitsu |
| 592 | https://www.hvacbase.org/what-size-generator-do-i-need | calculator | Y: Y:EasyStart 368, Hyper Engineering Micro-Air  |
| 558 | https://www.hvacbase.org/furnace-sizing-calculator | calculator | — |
| 436 | https://www.hvacbase.org/ductwork-sizing-calculator | calculator | — |
| 357 | https://www.hvacbase.org/heat-pump-size-calculator | calculator | Y: Y:Mitsubishi H2i, Carrier Greenspeed, Bosch I |
| 305 | https://www.hvacbase.org/what-size-tankless-water-heater | calculator | Y: Y:Rinnai RU130iN/RU199iN, EcoSmart ECO 24/18, |
| 299 | https://www.hvacbase.org/3-phase-power-calculator | calculator | — |
| 285 | https://www.hvacbase.org/kwh-cost-calculator | calculator | — |
| 186 | https://www.hvacbase.org/what-size-dehumidifier-do-i-need | calculator | Y: Y:Santa Fe Compact70 |
| 173 | https://www.hvacbase.org/seer2-comparison-calculator | calculator | — |
| 169 | https://www.hvacbase.org/hvac-tax-credits-2026 | explainer | — |
| 109 | https://www.hvacbase.org/gas-vs-electric-heating-cost | calculator | — |
| 98 | https://www.hvacbase.org/heat-pump-tax-credits-2026 | explainer | — |
| 85 | https://www.hvacbase.org/water-heater-sizing-calculator | calculator | — |
| 85 | https://www.hvacbase.org/dehumidifier-running-cost | calculator | Y: Y:hOmeLabs, Frigidaire, GE, LG, Midea, Tosot, |
| 72 | https://www.hvacbase.org/heating-cost-calculator | calculator | — |
| 68 | https://www.hvacbase.org/seer2-rating-explained | calculator | Y: Y:Carrier Infinity 24, Trane XV20i, Lennox XC |
| 63 | https://www.hvacbase.org/how-much-does-mini-split-cost-to-run | calculator | — |
| 60 | https://www.hvacbase.org/power-consumption-calculator | calculator | — |
| 59 | https://www.hvacbase.org/heat-pump-electricity-usage | calculator | — |
| 55 | https://www.hvacbase.org/how-many-watts-in-12v-battery | calculator | Y: Y:Renogy, SOK, Battle Born, Victron |
| 55 | https://www.hvacbase.org/how-long-does-water-heater-last | calculator | — |
| 51 | https://www.hvacbase.org/air-changes-per-hour-calculator | calculator | — |
| 49 | https://www.hvacbase.org/air-purifier-sizing-guide | calculator | Y: Y:Levoit Core 300S, Coway AP-1512HH/Airmega 4 |
| 41 | https://www.hvacbase.org/energy-star-tax-credits | explainer | — |
| 41 | https://www.hvacbase.org/good-seer-rating-for-ac | calculator | — |
| 39 | https://www.hvacbase.org/heat-pump-running-cost-calculator | calculator | — |
| 38 | https://www.hvacbase.org/portable-ac-electricity-cost | calculator | — |
| 30 | https://www.hvacbase.org/solar-panel-calculator | calculator | — |
| 27 | https://www.hvacbase.org/how-many-amps-does-generator-produce | calculator | — |
| 26 | https://www.hvacbase.org/hvac-rebates-by-state | explainer | — |
| 26 | https://www.hvacbase.org/how-to-calculate-seer | calculator | — |
| 24 | https://www.hvacbase.org/battery-watt-hours | calculator | — |
| 23 | https://www.hvacbase.org/seer2-savings-calculator | calculator | — |
| 23 | https://www.hvacbase.org/specific-heat-capacity-calculator | calculator | — |
| 20 | https://www.hvacbase.org/furnace-efficiency-explained | calculator | — |
| 19 | https://www.hvacbase.org/furnace-vs-heat-pump | calculator | — |
| 15 | https://www.hvacbase.org/btucfm-ductwork-relationship | calculator | — |
| 15 | https://www.hvacbase.org/25c-tax-credit-explained | explainer | — |
| 13 | https://www.hvacbase.org/afue-rating-explained | calculator | Y: Y:Lennox SL298NV, Carrier 59MN7A, Trane S9V2- |
| 11 | https://www.hvacbase.org/electric-water-heating-cost | calculator | Y: Y:Rheem ProTerra XE80 |
| 7 | https://www.hvacbase.org/seer-rating-tax-credits | cost-guide | Y: Y:Carrier Infinity 24, Trane XV20i, Lennox XC |
| 6 | https://www.hvacbase.org/gas-furnace-wattage | calculator | — |
| 4 | https://www.hvacbase.org/is-tankless-water-heater-worth-it | calculator | — |

## 4. Full master table (all 281, sorted by bucket then sessions)
| Bucket | Sessions | /day | URL | Type | Recs | Stat(est) | Note |
|---|--:|--:|---|---|:-:|--:|---|
| CUT-FABRICATED | 71 | 2.54 | https://www.hvacbase.org/casement-window-air-conditioners | product-or-brand | Y | 4 | ranked casement/vertical AC models with spec tables |
| CUT-FABRICATED | 53 | 1.89 | https://www.hvacbase.org/quietest-window-acs | product-or-brand | Y | 7 | dB-ranked model roundup; Midea recall noted |
| CUT-FABRICATED | 53 | 1.89 | https://www.hvacbase.org/coway-air-purifiers | product-or-brand | Y | 46 | 5-model brand review, 4-stage, filter/5yr tables |
| CUT-FABRICATED | 49 | 1.75 | https://www.hvacbase.org/mrcool-diy-mini-split-review | product-or-brand | Y | 18 | Single-brand review with full spec tables |
| CUT-FABRICATED | 47 | 1.68 | https://www.hvacbase.org/levoit-air-purifiers | product-or-brand | Y | 50 | 7-model hub, value framing, filter/5yr tables |
| CUT-FABRICATED | 45 | 1.61 | https://www.hvacbase.org/smallest-window-acs | product-or-brand | Y | 3 | dimension-ranked compact model roundup |
| CUT-FABRICATED | 41 | 1.46 | https://www.hvacbase.org/quietest-mini-splits | comparison | Y | 30 | Ranks named models; dB framed manufacturer-published, p |
| CUT-FABRICATED | 37 | 1.32 | https://www.hvacbase.org/smallest-mini-splits | product-or-brand | Y | 12 | Ranks smallest 6K-9K units |
| CUT-FABRICATED | 32 | 1.14 | https://www.hvacbase.org/honeywell-air-purifiers | product-or-brand | Y | 40 | 7-model review, no-smart critique, 5yr costs |
| CUT-FABRICATED | 29 | 1.04 | https://www.hvacbase.org/most-energy-efficient-dehumidifiers | product-or-brand | Y | 55 | IEF-ranked model tables across size classes |
| CUT-FABRICATED | 27 | 0.96 | https://www.hvacbase.org/winix-air-purifiers | product-or-brand | Y | 34 | 6-model review, PlasmaWave, washable carbon |
| CUT-FABRICATED | 25 | 0.89 | https://www.hvacbase.org/dyson-air-purifiers | product-or-brand | Y | 55 | 12-model hub, est. CADR flagged, 5yr costs |
| CUT-FABRICATED | 24 | 0.86 | https://www.hvacbase.org/through-the-wall-air-conditioners | product-or-brand | Y | 7 | TTW model roundup + sleeve/install specs |
| CUT-FABRICATED | 24 | 0.86 | https://www.hvacbase.org/quietest-portable-air-conditioners | product-or-brand | Y | 15 | Ranks quietest units by decibels |
| CUT-FABRICATED | 23 | 0.82 | https://www.hvacbase.org/iqair-healthpro-plus-review | product-or-brand | Y | 32 | Single-product deep review, HyperHEPA, 5yr costs |
| CUT-FABRICATED | 22 | 0.79 | https://www.hvacbase.org/safest-space-heaters | product-or-brand | N | 12 | Ranks heater TYPES not models; NFPA/CPSC stats cited in |
| CUT-FABRICATED | 22 | 0.79 | https://www.hvacbase.org/blueair-air-purifiers | product-or-brand | Y | 48 | 6-model brand review, HEPASilent, 5yr costs |
| CUT-FABRICATED | 21 | 0.75 | https://www.hvacbase.org/quietest-dehumidifiers | product-or-brand | Y | 40 | dB-ranked model tables by room |
| CUT-FABRICATED | 19 | 0.68 | https://www.hvacbase.org/biggest-window-acs | product-or-brand | Y | 6 | ranked roundup of large 18-25k BTU window ACs |
| CUT-FABRICATED | 18 | 0.64 | https://www.hvacbase.org/quietest-air-purifiers | product-or-brand | Y | 25 | Ranked roundup by dB + CADR/dB ratio |
| CUT-FABRICATED | 17 | 0.61 | https://www.hvacbase.org/cassette-ceiling-air-conditioners | product-or-brand | Y | 12 | Ranks 5 cassette models with prices/SEER2 |
| CUT-FABRICATED | 16 | 0.57 | https://www.hvacbase.org/portable-ac-window-seal-kits | product-or-brand | Y | 12 | Ranks 5 seal kits with prices/CFM |
| CUT-FABRICATED | 16 | 0.57 | https://www.hvacbase.org/airdog-air-purifier-review | product-or-brand | Y | 35 | Filterless TPA review, cost tables, ozone caveats |
| CUT-FABRICATED | 16 | 0.57 | https://www.hvacbase.org/smallest-air-purifiers | product-or-brand | Y | 22 | Ranked compact roundup, CADR-density tables |
| CUT-FABRICATED | 15 | 0.54 | https://www.hvacbase.org/battery-operated-heaters | product-or-brand | Y | 18 | Debunk + recommends propane/power-station/heated-clothi |
| CUT-FABRICATED | 14 | 0.5 | https://www.hvacbase.org/most-energy-efficient-window-acs | product-or-brand | Y | 15 | CEER-ranked model roundup; imports CalcWrapper but unus |
| CUT-FABRICATED | 13 | 0.46 | https://www.hvacbase.org/mini-split-line-set-covers | product-or-brand | Y | 10 | Ranks 5 line-set cover kits with prices |
| CUT-FABRICATED | 13 | 0.46 | https://www.hvacbase.org/biggest-portable-acs | product-or-brand | Y | 20 | Roundup; embeds large-room calc |
| CUT-FABRICATED | 13 | 0.46 | https://www.hvacbase.org/smallest-portable-acs | product-or-brand | Y | 25 | Compact roundup; embeds small-room calc; RV/dorm depth |
| CUT-FABRICATED | 13 | 0.46 | https://www.hvacbase.org/outdoor-portable-tankless-heaters | product-or-brand | Y | 35 | Ranks 8 portable models; empty externalLinks |
| CUT-FABRICATED | 12 | 0.43 | https://www.hvacbase.org/molekule-air-purifier-review | product-or-brand | Y | 24 | Skeptical PECO review; recommends only for niche |
| CUT-FABRICATED | 12 | 0.43 | https://www.hvacbase.org/smallest-tankless-water-heaters | product-or-brand | Y | 40 | Compact models ranked by dimensions |
| CUT-FABRICATED | 11 | 0.39 | https://www.hvacbase.org/low-profile-window-acs | product-or-brand | Y | 6 | GE ClearView low-profile model roundup |
| CUT-FABRICATED | 11 | 0.39 | https://www.hvacbase.org/mini-split-brands-ranked | product-or-brand | Y | 6 | Most specs carry inline AHRI cert citations |
| CUT-FABRICATED | 11 | 0.39 | https://www.hvacbase.org/best-electric-furnace | product-or-brand | Y | 15 | Ranks brands; long HDD/ECM worked examples labeled illu |
| CUT-FABRICATED | 10 | 0.36 | https://www.hvacbase.org/safest-heater-for-bedroom | product-or-brand | Y | 14 | Ranks specific bedroom heater models; 53% NFPA cited |
| CUT-FABRICATED | 8 | 0.29 | https://www.hvacbase.org/smallest-acs-for-small-rooms | product-or-brand | Y | 8 | small-room BTU guide + model picks; embeds BTUCalculato |
| CUT-FABRICATED | 8 | 0.29 | https://www.hvacbase.org/wall-mounted-air-purifiers | product-or-brand | Y | 20 | Ranked roundup + mounting/NEC install guide |
| CUT-FABRICATED | 7 | 0.25 | https://www.hvacbase.org/cheapest-portable-air-conditioners | product-or-brand | Y | 18 | Budget roundup with CEER/prices |
| CUT-FABRICATED | 7 | 0.25 | https://www.hvacbase.org/alen-breathesmart-air-purifiers | product-or-brand | Y | 45 | Brand hub; filter matrix + competitor + 5yr tables |
| CUT-FABRICATED | 7 | 0.25 | https://www.hvacbase.org/germguardian-air-purifiers | product-or-brand | Y | 38 | 6-model review, UV-C focus, 5yr costs |
| CUT-FABRICATED | 5 | 0.18 | https://www.hvacbase.org/lightweight-window-acs | product-or-brand | Y | 3 | weight-ranked model roundup + NIOSH lifting math |
| CUT-FABRICATED | 5 | 0.18 | https://www.hvacbase.org/mini-split-for-bedroom | product-or-brand | Y | 12 | Ranks bedroom units by noise/SEER2 |
| CUT-FABRICATED | 3 | 0.11 | https://www.hvacbase.org/window-ac-support-brackets | product-or-brand | Y | 4 | bracket model roundup + NDS/LL30 fastener engineering |
| CUT-FABRICATED | 3 | 0.11 | https://www.hvacbase.org/window-ac-with-heater | product-or-brand | Y | 10 | heat-combo model roundup + COP/climate-zone economics |
| CUT-FABRICATED | 2 | 0.07 | https://www.hvacbase.org/medify-air-purifiers | product-or-brand | Y | 35 | 5-model review, dual-intake H13, 5yr costs |
| KEEP-REWRITE | 1790 | 63.93 | https://www.hvacbase.org/ac-not-cooling | troubleshooting | N | 24 | genuine 12-fix diagnostic steps; many uncited cost/effi |
| KEEP-REWRITE | 617 | 22.04 | https://www.hvacbase.org/refrigerant-types-explained | explainer | N | 55 | master refrigerant comparison table |
| KEEP-REWRITE | 482 | 17.21 | https://www.hvacbase.org/ideal-indoor-humidity-level | explainer | N | 35 | Seasonal RH targets; hygrometer brands in passing |
| KEEP-REWRITE | 387 | 13.82 | https://www.hvacbase.org/carbon-monoxide-detector-guide | explainer | Y | 35 | Best-detectors table with star ratings |
| KEEP-REWRITE | 345 | 12.32 | https://www.hvacbase.org/merv-rating-chart | explainer | N | 18 | no tax content; ScaleDiagram |
| KEEP-REWRITE | 343 | 12.25 | https://www.hvacbase.org/hvac-serial-number-decoder | other | N | 55 | multi-brand decoder reference |
| KEEP-REWRITE | 304 | 10.86 | https://www.hvacbase.org/ac-troubleshooting-guide | troubleshooting | N | 15 | 12 common problems, real step-by-step; uncited repair-c |
| KEEP-REWRITE | 285 | 10.18 | https://www.hvacbase.org/wire-for-220-volt | explainer | N | 70 | 220V master chart; heavy uncited NEC ampacity data |
| KEEP-REWRITE | 271 | 9.68 | https://www.hvacbase.org/what-size-generator-for-fridge | explainer | Y | 40 | Fridge sizing; recommends specific inverter + soft-star |
| KEEP-REWRITE | 254 | 9.07 | https://www.hvacbase.org/dry-mode-in-ac | explainer | N | 15 | Dry mode explainer; energy-savings tables uncited |
| KEEP-REWRITE | 254 | 9.07 | https://www.hvacbase.org/hvac-refrigerant-phase-out | explainer | N | 55 | GWP/dates/price projections; 25C expired framing correc |
| KEEP-REWRITE | 214 | 7.64 | https://www.hvacbase.org/how-often-change-hvac-filter | explainer | N | 30 | DOE inline once; Filtrete/FilterBuy brands in passing o |
| KEEP-REWRITE | 204 | 7.29 | https://www.hvacbase.org/mini-split-vs-central-air | comparison | N | 20 | 8-difference comparison; brands in examples only |
| KEEP-REWRITE | 199 | 7.11 | https://www.hvacbase.org/how-to-reduce-hvac-noise | explainer | Y | 30 | Names compressor-blanket products in options table |
| KEEP-REWRITE | 162 | 5.79 | https://www.hvacbase.org/wire-gauge-chart | explainer | N | 90 | AWG reference hub; large uncited Table 310.16 data |
| KEEP-REWRITE | 159 | 5.68 | https://www.hvacbase.org/mini-split-electricity-usage | explainer | N | 20 | Data-analysis; embeds kwh-cost calc; meters named in pa |
| KEEP-REWRITE | 159 | 5.68 | https://www.hvacbase.org/dehumidifier-guide | explainer | N | 55 | Pillar; brands (AprilAire/SantaFe) only in passing |
| KEEP-REWRITE | 151 | 5.39 | https://www.hvacbase.org/how-many-kwh-per-day-is-normal | explainer | N | 80 | 50-state kWh tables, RECS-based |
| KEEP-REWRITE | 146 | 5.21 | https://www.hvacbase.org/how-to-vent-portable-ac-without-window | other | N | 12 | 5 venting methods how-to with cost ranges |
| KEEP-REWRITE | 146 | 5.21 | https://www.hvacbase.org/minimum-seer-rating-by-state | explainer | N | 12 | no tax content |
| KEEP-REWRITE | 144 | 5.14 | https://www.hvacbase.org/hvac-noise-levels-explained | explainer | N | 25 | Role=hub; branded model dB examples illustrative, not b |
| KEEP-REWRITE | 141 | 5.04 | https://www.hvacbase.org/heat-pump-cost-to-install | cost-guide | N | 70 | brand price tables; cheapest-model names incidental |
| KEEP-REWRITE | 138 | 4.93 | https://www.hvacbase.org/water-heater-wire-size | explainer | N | 50 | Wire chart; tankless models as spec refs, IRA rebates |
| KEEP-REWRITE | 128 | 4.57 | https://www.hvacbase.org/how-to-clean-ac-coils | explainer | Y | 20 | Branded coil-cleaner comparison table with ratings |
| KEEP-REWRITE | 121 | 4.32 | https://www.hvacbase.org/furnace-guide | explainer | N | 25 | Pillar; BTUCalculator (not CalcWrapper); market-share/c |
| KEEP-REWRITE | 120 | 4.29 | https://www.hvacbase.org/mini-split-installation-cost | cost-guide | N | 26 | Cost breakdown + rebates; brands in examples only |
| KEEP-REWRITE | 120 | 4.29 | https://www.hvacbase.org/single-hose-vs-dual-hose-portable-ac | comparison | N | 18 | Single vs dual-hose; DOE-cited plus uncited cost figure |
| KEEP-REWRITE | 117 | 4.18 | https://www.hvacbase.org/electrical-panel-upgrade-cost | cost-guide | N | 60 | 100-to-200A cost tables; Span/Lumin named in passing |
| KEEP-REWRITE | 116 | 4.14 | https://www.hvacbase.org/air-conditioner-types | category-hub | N | 12 | hub comparing 8 AC types; brands named only as passing  |
| KEEP-REWRITE | 116 | 4.14 | https://www.hvacbase.org/electrical-wiring-guide | explainer | N | 70 | Pillar wiring guide; heavy uncited NEC/ampacity figures |
| KEEP-REWRITE | 112 | 4.0 | https://www.hvacbase.org/home-battery-backup-guide | comparison | Y | 55 | Ranks home batteries w/ Best-For picks; OBBBA credit so |
| KEEP-REWRITE | 107 | 3.82 | https://www.hvacbase.org/how-to-improve-indoor-air-quality | explainer | Y | 40 | Ranked 10-method guide, named-model tables |
| KEEP-REWRITE | 103 | 3.68 | https://www.hvacbase.org/water-heater-breaker-size | explainer | N | 40 | Breaker chart; uncited NEC 422.13 sizing figures |
| KEEP-REWRITE | 102 | 3.64 | https://www.hvacbase.org/coefficient-of-performance | explainer | N | 15 | no tax content; EfficiencyCurve chart |
| KEEP-REWRITE | 93 | 3.32 | https://www.hvacbase.org/hepa-filter-explained | explainer | N | 30 | Brands/models in passing; EN1822 class data |
| KEEP-REWRITE | 91 | 3.25 | https://www.hvacbase.org/dehumidifier-and-ac-same-time | explainer | N | 24 | AC+dehum decision logic; cost table est-footnoted |
| KEEP-REWRITE | 87 | 3.11 | https://www.hvacbase.org/portable-vs-window-ac | comparison | N | 25 | type comparison, no named models; very stat-heavy uncit |
| KEEP-REWRITE | 87 | 3.11 | https://www.hvacbase.org/ac-size-for-1500-sq-ft | explainer | N | 26 | Sizing by zone/ductwork; cost tables, no brands |
| KEEP-REWRITE | 87 | 3.11 | https://www.hvacbase.org/how-to-drain-portable-ac | other | N | 12 | Drainage how-to; condensate/humidity figures uncited |
| KEEP-REWRITE | 86 | 3.07 | https://www.hvacbase.org/furnace-leaking-water | troubleshooting | N | 14 | 7-cause leak diagnosis |
| KEEP-REWRITE | 85 | 3.04 | https://www.hvacbase.org/r410a-vs-r32-refrigerant | comparison | N | 45 | GWP/spec/price tables uncited inline |
| KEEP-REWRITE | 84 | 3.0 | https://www.hvacbase.org/carrier-hvac-age-serial-number | other | N | 40 | serial decoder reference, not product pick |
| KEEP-REWRITE | 82 | 2.93 | https://www.hvacbase.org/furnace-filter-direction | explainer | N | 10 | How-to arrow direction guide |
| KEEP-REWRITE | 77 | 2.75 | https://www.hvacbase.org/how-many-mini-splits-do-i-need | explainer | N | 15 | Zone-count guide; layouts+cost, no named models |
| KEEP-REWRITE | 77 | 2.75 | https://www.hvacbase.org/voc-in-home-sources | explainer | Y | 40 | VOC guide; monitor + carbon-filter tables |
| KEEP-REWRITE | 74 | 2.64 | https://www.hvacbase.org/what-wire-size-for-50-amp | explainer | N | 45 | 50A NEC guide; ChargePoint example, uncited figures |
| KEEP-REWRITE | 73 | 2.61 | https://www.hvacbase.org/water-heater-wattage | explainer | N | 50 | Wattage guide; recovery/COP tables uncited |
| KEEP-REWRITE | 72 | 2.57 | https://www.hvacbase.org/air-purifier-placement | explainer | N | 15 | Placement guide; Austin Air named only in passing |
| KEEP-REWRITE | 72 | 2.57 | https://www.hvacbase.org/dehumidifier-electricity-usage | explainer | Y | 45 | Models named in worked examples with specs |
| KEEP-REWRITE | 71 | 2.54 | https://www.hvacbase.org/propane-generator-usage-per-hour | explainer | N | 60 | Propane gal/hr + tank runtime; uncited consumption tabl |
| KEEP-REWRITE | 70 | 2.5 | https://www.hvacbase.org/furnace-filter-merv-rating | explainer | N | 14 | MERV chart; EPA/ASHRAE cited inline |
| KEEP-REWRITE | 68 | 2.43 | https://www.hvacbase.org/how-do-portable-acs-work | explainer | N | 15 | Refrigeration-cycle explainer; energy-flow figures unci |
| KEEP-REWRITE | 66 | 2.36 | https://www.hvacbase.org/flexible-vs-rigid-ductwork | comparison | N | 30 | Cost/airflow tables; FSEC 4.3x stat cited; no brand rec |
| KEEP-REWRITE | 65 | 2.32 | https://www.hvacbase.org/hspf2-rating-explained | explainer | Y | 20 | 25C framed expired |
| KEEP-REWRITE | 65 | 2.32 | https://www.hvacbase.org/indoor-air-quality-testing | explainer | Y | 40 | Hub; broken relatedArticles/RelatedArticles slugs |
| KEEP-REWRITE | 64 | 2.29 | https://www.hvacbase.org/how-does-humidity-affect-temperature | explainer | N | 40 | Heat-index chart from NWS; no products |
| KEEP-REWRITE | 59 | 2.11 | https://www.hvacbase.org/hvac-maintenance-checklist | explainer | N | 20 | Seasonal DIY guide; Ecobee/Nest passing; R-454B AIM not |
| KEEP-REWRITE | 59 | 2.11 | https://www.hvacbase.org/can-you-use-portable-ac-without-hose | explainer | N | 12 | Thermodynamics + 4 hoseless alternatives |
| KEEP-REWRITE | 58 | 2.07 | https://www.hvacbase.org/ac-size-for-1000-sq-ft | explainer | N | 26 | Sq-ft sizing guide; costs+SEER2, no named products |
| KEEP-REWRITE | 58 | 2.07 | https://www.hvacbase.org/air-source-vs-ground-source-heat-pump | comparison | N | 55 | 25C/25D expired framing correct |
| KEEP-REWRITE | 57 | 2.04 | https://www.hvacbase.org/how-to-tilt-window-ac | other | N | 4 | detailed how-to tilt + slinger-ring physics; models nam |
| KEEP-REWRITE | 57 | 2.04 | https://www.hvacbase.org/hvac-ductwork-guide | explainer | N | 25 | ENERGY STAR duct-loss inline; no product recs |
| KEEP-REWRITE | 56 | 2.0 | https://www.hvacbase.org/hvac-maintenance-cost | cost-guide | N | 45 | Tune-up/repair price tables; slug ends -cost; no produc |
| KEEP-REWRITE | 55 | 1.96 | https://www.hvacbase.org/do-air-purifiers-really-work | explainer | N | 18 | Study table cited by author/year; products passing |
| KEEP-REWRITE | 54 | 1.93 | https://www.hvacbase.org/eer-chart-for-ac-units | explainer | Y | 18 | 25C framed historical/expired |
| KEEP-REWRITE | 54 | 1.93 | https://www.hvacbase.org/water-heater-amps | explainer | N | 35 | Amp-draw reference; uncited amperage/breaker figures |
| KEEP-REWRITE | 52 | 1.86 | https://www.hvacbase.org/mini-split-air-conditioners | category-hub | Y | 30 | Pillar guide; embeds BTUCalculator; brand recs section |
| KEEP-REWRITE | 51 | 1.82 | https://www.hvacbase.org/ac-size-for-2000-sq-ft | explainer | N | 25 | Single vs two-story sizing; cost/SEER2 tables |
| KEEP-REWRITE | 51 | 1.82 | https://www.hvacbase.org/heat-pump-guide | explainer | N | 60 | pillar guide; 25C expired framing correct |
| KEEP-REWRITE | 50 | 1.79 | https://www.hvacbase.org/how-does-a-mini-split-work | explainer | N | 14 | Refrigeration-cycle explainer; temps/percentages uncite |
| KEEP-REWRITE | 50 | 1.79 | https://www.hvacbase.org/air-purifier-guide | explainer | Y | 30 | Pillar guide with named-model cost/energy tables |
| KEEP-REWRITE | 49 | 1.75 | https://www.hvacbase.org/mini-split-amps | explainer | N | 15 | Amp/wire sizing guide; models in examples only |
| KEEP-REWRITE | 47 | 1.68 | https://www.hvacbase.org/indoor-air-quality-guide | explainer | Y | 40 | Pillar guide; monitor comparison table |
| KEEP-REWRITE | 46 | 1.64 | https://www.hvacbase.org/central-air-conditioner-guide | explainer | N | 70 | pillar; embeds BTUCalculator; R-454B 2026 transition |
| KEEP-REWRITE | 45 | 1.61 | https://www.hvacbase.org/seer2-to-seer-conversion | explainer | N | 14 | no CalcWrapper despite title; no tax content |
| KEEP-REWRITE | 45 | 1.61 | https://www.hvacbase.org/uv-light-hvac-systems | explainer | Y | 45 | Dedicated brand-recommendations section |
| KEEP-REWRITE | 44 | 1.57 | https://www.hvacbase.org/portable-air-conditioners | category-hub | N | 22 | Pillar buyer's guide; brands in passing only |
| KEEP-REWRITE | 43 | 1.54 | https://www.hvacbase.org/tankless-water-heater-cost | cost-guide | Y | 55 | 25C correctly flagged expired; HEAR/HOMES active |
| KEEP-REWRITE | 43 | 1.54 | https://www.hvacbase.org/heat-pump-water-heater-guide | other | Y | 50 | Guide; ranks HPWH models; 25C correctly expired |
| KEEP-REWRITE | 42 | 1.5 | https://www.hvacbase.org/pilot-light-gas-usage | explainer | N | 14 | Pilot cost math; EIA cited |
| KEEP-REWRITE | 41 | 1.46 | https://www.hvacbase.org/hspf-rating-explained | explainer | N | 16 | no tax content |
| KEEP-REWRITE | 39 | 1.39 | https://www.hvacbase.org/cracked-heat-exchanger | troubleshooting | N | 14 | CO safety; 400+ deaths and costs uncited |
| KEEP-REWRITE | 39 | 1.39 | https://www.hvacbase.org/how-many-amps-does-a-house-use | explainer | N | 50 | Panel sizing; NEC 220 examples, mostly uncited stats |
| KEEP-REWRITE | 38 | 1.36 | https://www.hvacbase.org/how-does-a-dehumidifier-work | explainer | N | 40 | Tech explainer; DampRid mentioned in passing |
| KEEP-REWRITE | 37 | 1.32 | https://www.hvacbase.org/ac-size-for-3000-sq-ft | explainer | N | 26 | Dual-system sizing; monthly cost tables |
| KEEP-REWRITE | 37 | 1.32 | https://www.hvacbase.org/hot-water-recirculating-pump | other | Y | 40 | Guide; ranks pump models, Grundfos best-overall |
| KEEP-REWRITE | 37 | 1.32 | https://www.hvacbase.org/disadvantages-of-heat-pumps | explainer | N | 55 | brands appear as workarounds, not picks |
| KEEP-REWRITE | 36 | 1.29 | https://www.hvacbase.org/do-window-acs-pull-air-from-outside | explainer | N | 7 | solid airflow/smoke explainer; Coway kit mentioned in p |
| KEEP-REWRITE | 35 | 1.25 | https://www.hvacbase.org/pellet-stove-cost-to-run | cost-guide | N | 45 | 25C correctly framed EXPIRED per OBBBA; Harman/Comfortb |
| KEEP-REWRITE | 35 | 1.25 | https://www.hvacbase.org/moisture-barrier-crawl-space | explainer | Y | 35 | Material + dehumidifier comparison tables |
| KEEP-REWRITE | 34 | 1.21 | https://www.hvacbase.org/window-air-conditioners | category-hub | N | 18 | pillar buyer's guide; brand-strength table, embeds BTUC |
| KEEP-REWRITE | 34 | 1.21 | https://www.hvacbase.org/smart-thermostat-savings | explainer | Y | 25 | Branded savings-claim table; recommends Mysa for basebo |
| KEEP-REWRITE | 34 | 1.21 | https://www.hvacbase.org/generator-cost-per-kwh | cost-guide | N | 45 | Fuel cost/kWh; EIA-sourced box, table figures illustrat |
| KEEP-REWRITE | 34 | 1.21 | https://www.hvacbase.org/heat-pump-in-cold-weather | explainer | N | 50 | performance-by-temp tables; model specs cited to spec s |
| KEEP-REWRITE | 33 | 1.18 | https://www.hvacbase.org/programmable-vs-smart-thermostat | comparison | N | 20 | Nest/Ecobee generic mentions; ENERGY STAR floors cited |
| KEEP-REWRITE | 33 | 1.18 | https://www.hvacbase.org/seer-vs-seer2 | explainer | N | 15 | no tax content |
| KEEP-REWRITE | 33 | 1.18 | https://www.hvacbase.org/generator-guide | comparison | Y | 70 | Pillar buying guide; ranks brands, embeds sizing calc |
| KEEP-REWRITE | 33 | 1.18 | https://www.hvacbase.org/tankless-water-heater-wire-size | other | Y | 35 | Reference; imports CalcWrapper but not embedded |
| KEEP-REWRITE | 33 | 1.18 | https://www.hvacbase.org/how-to-read-electric-meter | explainer | N | 30 | meter reading guide; low stat density |
| KEEP-REWRITE | 32 | 1.14 | https://www.hvacbase.org/duct-leakage-testing | explainer | Y | 30 | Recommends Aeroseal + Minneapolis Duct Blaster; 25C cor |
| KEEP-REWRITE | 32 | 1.14 | https://www.hvacbase.org/do-portable-acs-pull-air-from-outside | explainer | N | 12 | Smoke/infiltration; equipment table generic categories |
| KEEP-REWRITE | 32 | 1.14 | https://www.hvacbase.org/tankless-water-heater-breaker-size | other | Y | 40 | Reference; imports CalcWrapper but not embedded |
| KEEP-REWRITE | 31 | 1.11 | https://www.hvacbase.org/hvac-cost-california | cost-guide | N | 40 | 25C correctly expired per OBBBA; Title24/rebate stack f |
| KEEP-REWRITE | 31 | 1.11 | https://www.hvacbase.org/air-duct-cleaning-worth-it | explainer | N | 20 | EPA/ENERGY STAR inline citations; evidence-based, no pr |
| KEEP-REWRITE | 30 | 1.07 | https://www.hvacbase.org/tankless-water-heater-propane-usage | other | N | 40 | Propane usage guide; no named models in body |
| KEEP-REWRITE | 30 | 1.07 | https://www.hvacbase.org/heat-pump-cop-explained | explainer | N | 45 | COP tables; costs flagged illustrative |
| KEEP-REWRITE | 29 | 1.04 | https://www.hvacbase.org/saddle-u-shaped-air-conditioners | explainer | Y | 5 | U-shaped design explainer + Midea model table; CPSC rec |
| KEEP-REWRITE | 29 | 1.04 | https://www.hvacbase.org/tankless-water-heater-guide | other | Y | 50 | Pillar; imports CalcWrapper/BTU but not embedded |
| KEEP-REWRITE | 29 | 1.04 | https://www.hvacbase.org/water-heater-guide | other | N | 50 | Pillar; imports BTUCalculator but not embedded; 25C exp |
| KEEP-REWRITE | 28 | 1.0 | https://www.hvacbase.org/5000-btu-air-conditioner-room-size | explainer | Y | 32 | Ranks top 5 window AC models; pricing/operating-cost ta |
| KEEP-REWRITE | 28 | 1.0 | https://www.hvacbase.org/whole-house-ventilation-systems | comparison | Y | 40 | ERV vs HRV; top-models spec tables |
| KEEP-REWRITE | 27 | 0.96 | https://www.hvacbase.org/how-to-identify-mold | explainer | N | 30 | Test kits named only as passing e.g. list |
| KEEP-REWRITE | 26 | 0.93 | https://www.hvacbase.org/boiler-vs-furnace | comparison | N | 30 | Dense uncited cost/efficiency/lifespan bullet lists; ge |
| KEEP-REWRITE | 26 | 0.93 | https://www.hvacbase.org/cold-air-return-vents | explainer | N | 12 | Return-air sizing guide; ACCA cited inline in places |
| KEEP-REWRITE | 26 | 0.93 | https://www.hvacbase.org/natural-gas-generator-running-cost | cost-guide | N | 60 | NG hourly cost; EIA-sourced, CFH tables illustrative |
| KEEP-REWRITE | 26 | 0.93 | https://www.hvacbase.org/what-size-generator-for-5-ton-ac | explainer | Y | 50 | recommends specific generator + hard-start models |
| KEEP-REWRITE | 25 | 0.89 | https://www.hvacbase.org/window-ac-installation-guide | other | N | 6 | step-by-step DIY install how-to, no product picks |
| KEEP-REWRITE | 25 | 0.89 | https://www.hvacbase.org/how-many-btu-per-square-foot | explainer | N | 16 | BTU/sqft by zone; heating+cooling+commercial tables |
| KEEP-REWRITE | 25 | 0.89 | https://www.hvacbase.org/what-size-mini-split-for-garage | explainer | Y | 15 | Garage sizing by car-count/insulation; names models |
| KEEP-REWRITE | 25 | 0.89 | https://www.hvacbase.org/eer-rating-explained | explainer | N | 15 | no active tax claim |
| KEEP-REWRITE | 24 | 0.86 | https://www.hvacbase.org/evaporative-cooler-vs-ac | comparison | N | 35 | Many unsourced $/dB/temp tables; illustrative rate note |
| KEEP-REWRITE | 24 | 0.86 | https://www.hvacbase.org/what-wire-size-for-30-amp | explainer | N | 45 | 30A NEC guide; uncited ampacity/voltage-drop tables |
| KEEP-REWRITE | 23 | 0.82 | https://www.hvacbase.org/ac-size-for-2500-sq-ft | explainer | N | 27 | Single vs dual system; cost tables, no brands |
| KEEP-REWRITE | 23 | 0.82 | https://www.hvacbase.org/ac-dry-mode-vs-dehumidifier | comparison | N | 18 | Dry mode vs dehumidifier; EPA/AHRI cited generically, m |
| KEEP-REWRITE | 23 | 0.82 | https://www.hvacbase.org/portable-ac-vs-window-ac | comparison | N | 20 | Efficiency/cost/noise comparison; TCO tables uncited |
| KEEP-REWRITE | 23 | 0.82 | https://www.hvacbase.org/radiant-floor-heating-pros-cons | explainer | N | 22 | Long but generic AI filler; uncited efficiency/cost cla |
| KEEP-REWRITE | 23 | 0.82 | https://www.hvacbase.org/how-long-do-generators-last | explainer | Y | 45 | Lifespan-hours guide; ranks engine brands by reputation |
| KEEP-REWRITE | 22 | 0.79 | https://www.hvacbase.org/is-it-ok-to-oversize-mini-split | explainer | N | 15 | Oversizing problems; Mitsubishi i-see in passing only |
| KEEP-REWRITE | 22 | 0.79 | https://www.hvacbase.org/portable-generator-safety-tips | explainer | N | 30 | CO safety guide; CPSC stats cited, ppm tables |
| KEEP-REWRITE | 22 | 0.79 | https://www.hvacbase.org/central-ac-cost-to-install | cost-guide | N | 60 | embeds BTUCalculator; 25C expired framing correct |
| KEEP-REWRITE | 22 | 0.79 | https://www.hvacbase.org/hvac-system-lifespan | explainer | N | 65 | embeds hvac-lifespan calc; ASHRAE lifespan data |
| KEEP-REWRITE | 21 | 0.75 | https://www.hvacbase.org/is-higher-seer-worth-it | comparison | N | 24 | no CalcWrapper despite import; 25C framed expired |
| KEEP-REWRITE | 20 | 0.71 | https://www.hvacbase.org/what-is-seer-rating | explainer | N | 16 | no tax content |
| KEEP-REWRITE | 20 | 0.71 | https://www.hvacbase.org/electric-heater-running-cost | cost-guide | N | 10 | Imports CalcWrapper but no embed; cost tables labeled i |
| KEEP-REWRITE | 17 | 0.61 | https://www.hvacbase.org/what-is-a-mini-split | explainer | N | 15 | Beginner explainer; comparison table stats uncited |
| KEEP-REWRITE | 17 | 0.61 | https://www.hvacbase.org/eer-vs-seer | explainer | N | 12 | no tax content |
| KEEP-REWRITE | 17 | 0.61 | https://www.hvacbase.org/hvac-efficiency-texas | cost-guide | N | 22 | 25C framed expired |
| KEEP-REWRITE | 17 | 0.61 | https://www.hvacbase.org/10-2-or-10-3-wire-for-ac | explainer | N | 35 | AC wire reference; NEC figures uncited; Carrier example |
| KEEP-REWRITE | 16 | 0.57 | https://www.hvacbase.org/space-heater-guide | explainer | N | 16 | Pillar buyer's guide; Dr. Infrared named in passing; NF |
| KEEP-REWRITE | 16 | 0.57 | https://www.hvacbase.org/mold-prevention-guide | explainer | Y | 30 | Hub guide; named-product monitoring/materials tables |
| KEEP-REWRITE | 16 | 0.57 | https://www.hvacbase.org/central-ac-vs-mini-split-vs-window | comparison | N | 65 | embeds BTUCalculator; dollar figures not rate-recompute |
| KEEP-REWRITE | 15 | 0.54 | https://www.hvacbase.org/ieer-explained | explainer | N | 16 | commercial; no tax content |
| KEEP-REWRITE | 15 | 0.54 | https://www.hvacbase.org/electricity-cost-by-state | cost-guide | N | 90 | rate tables; note duplicate "2026" rows in trend table |
| KEEP-REWRITE | 15 | 0.54 | https://www.hvacbase.org/heat-pump-vs-ac | comparison | N | 45 | 25C shown expired; costs illustrative |
| KEEP-REWRITE | 14 | 0.5 | https://www.hvacbase.org/cadr-rating-explained | explainer | Y | 15 | no tax content; AHAM-sourced |
| KEEP-REWRITE | 14 | 0.5 | https://www.hvacbase.org/ceer-rating-explained | explainer | Y | 18 | no tax content |
| KEEP-REWRITE | 14 | 0.5 | https://www.hvacbase.org/energy-costs-guide | cost-guide | N | 70 | pillar; fuel prices illustrative; 25C/25D expired frami |
| KEEP-REWRITE | 13 | 0.46 | https://www.hvacbase.org/hvac-efficiency-ratings-compared | explainer | N | 16 | no active tax claim |
| KEEP-REWRITE | 13 | 0.46 | https://www.hvacbase.org/thermostat-temperature-winter | explainer | Y | 16 | Ranks smart thermostats w/ prices; WHO/AAP cited |
| KEEP-REWRITE | 13 | 0.46 | https://www.hvacbase.org/how-long-generator-on-5-gallons | explainer | N | 40 | Runtime chart; Honda/Champion as spec examples |
| KEEP-REWRITE | 13 | 0.46 | https://www.hvacbase.org/tankless-water-heater-electricity | explainer | N | 30 | Many kWh/cost figures explicitly marked illustrative |
| KEEP-REWRITE | 13 | 0.46 | https://www.hvacbase.org/water-heater-cost-to-install | cost-guide | N | 45 | 25C/25D correctly flagged expired; generic types |
| KEEP-REWRITE | 12 | 0.43 | https://www.hvacbase.org/window-too-small-for-ac | explainer | N | 7 | alternatives guide (TTW vs portable); discusses types n |
| KEEP-REWRITE | 12 | 0.43 | https://www.hvacbase.org/hvac-cost-by-state | cost-guide | N | 60 | 50-state table; 25C correctly expired, IRA HEAR/HOMES a |
| KEEP-REWRITE | 12 | 0.43 | https://www.hvacbase.org/furnace-maintenance | explainer | N | 25 | 15-task guide; heavy uncited %/cost claims, generic |
| KEEP-REWRITE | 12 | 0.43 | https://www.hvacbase.org/dehumidifier-vs-air-purifier | comparison | N | 18 | Function comparison; generic product specs only |
| KEEP-REWRITE | 12 | 0.43 | https://www.hvacbase.org/goodman-ac-age-serial-number | other | N | 40 | YYMM serial decoder reference, not product pick |
| KEEP-REWRITE | 11 | 0.39 | https://www.hvacbase.org/insulation-r-value-guide | explainer | N | 40 | 25C correctly framed expired per OBBBA; IECC/DOE source |
| KEEP-REWRITE | 10 | 0.36 | https://www.hvacbase.org/mini-split-maintenance-guide | other | N | 15 | Maintenance/how-to + refrigerant-leak decision tree |
| KEEP-REWRITE | 10 | 0.36 | https://www.hvacbase.org/eer2-rating-explained | explainer | Y | 16 | 25C framed historical/expired |
| KEEP-REWRITE | 10 | 0.36 | https://www.hvacbase.org/how-long-do-furnaces-last | explainer | N | 16 | Lifespan + replace thresholds |
| KEEP-REWRITE | 10 | 0.36 | https://www.hvacbase.org/allergen-control-guide | explainer | N | 45 | Generic MERV/HEPA/ERV only; heavy uncited stats |
| KEEP-REWRITE | 10 | 0.36 | https://www.hvacbase.org/mold-remediation-cost | cost-guide | Y | 40 | Cost guide; named products in DIY-supply table |
| KEEP-REWRITE | 9 | 0.32 | https://www.hvacbase.org/hvac-energy-saving-tips | explainer | N | 45 | 25C correctly framed expired in FAQ; DOE/ENERGY STAR in |
| KEEP-REWRITE | 9 | 0.32 | https://www.hvacbase.org/14-seer-vs-16-seer-vs-20-seer | comparison | N | 22 | 25C framed expired; brand table lists no models |
| KEEP-REWRITE | 9 | 0.32 | https://www.hvacbase.org/dirty-furnace-filter-photos | explainer | N | 16 | Filter-stage visual guide; many uncited cost/% claims |
| KEEP-REWRITE | 9 | 0.32 | https://www.hvacbase.org/basement-dehumidifier-setting | explainer | N | 22 | RH setpoint guidance; no products; no lingering active  |
| KEEP-REWRITE | 9 | 0.32 | https://www.hvacbase.org/does-dehumidifier-cool-a-room | explainer | N | 22 | Heat-index/waste-heat physics; no products |
| KEEP-REWRITE | 9 | 0.32 | https://www.hvacbase.org/time-of-use-rates-explained | explainer | N | 45 | utility TOU rate examples uncited inline |
| KEEP-REWRITE | 8 | 0.29 | https://www.hvacbase.org/hvac-cost-illinois | cost-guide | N | 35 | 25C correctly framed expired per OBBBA; dual-fuel focus |
| KEEP-REWRITE | 8 | 0.29 | https://www.hvacbase.org/furnace-flame-sensor | troubleshooting | N | 12 | DIY clean/replace guide |
| KEEP-REWRITE | 8 | 0.29 | https://www.hvacbase.org/tankless-vs-tank-water-heater | comparison | Y | 55 | 20-yr TCO; 25C correctly flagged expired |
| KEEP-REWRITE | 8 | 0.29 | https://www.hvacbase.org/average-electric-bill-by-state | cost-guide | N | 90 | 50-state bill tables; 25C correctly shown expired |
| KEEP-REWRITE | 7 | 0.25 | https://www.hvacbase.org/window-ac-vs-mini-split | comparison | N | 18 | type comparison, no named models; heavy uncited cost/CO |
| KEEP-REWRITE | 7 | 0.25 | https://www.hvacbase.org/do-furnaces-have-pilot-lights | explainer | N | 18 | Ignition types; deep igniter/DSI technical detail |
| KEEP-REWRITE | 7 | 0.25 | https://www.hvacbase.org/solar-panel-cost-by-state | cost-guide | N | 90 | 50-state pricing tables; OBBBA credit sourced inline |
| KEEP-REWRITE | 7 | 0.25 | https://www.hvacbase.org/electric-water-heating-cost-by-state | cost-guide | N | 85 | 25C expired framing correct; heavy state tables |
| KEEP-REWRITE | 5 | 0.18 | https://www.hvacbase.org/hvac-cost-new-york | cost-guide | N | 40 | 25C correctly framed expired; NYSERDA/IRA HEAR active |
| KEEP-REWRITE | 5 | 0.18 | https://www.hvacbase.org/ac-size-for-500-sq-ft | explainer | N | 30 | Studio sizing; window/mini/portable costs, no models |
| KEEP-REWRITE | 4 | 0.14 | https://www.hvacbase.org/hvac-cost-florida | cost-guide | N | 35 | 25C correctly framed expired Dec 31 2025 per OBBBA |
| KEEP-REWRITE | 4 | 0.14 | https://www.hvacbase.org/eseer-explained | explainer | N | 15 | European; no tax content |
| KEEP-REWRITE | 4 | 0.14 | https://www.hvacbase.org/furnace-installation-cost | cost-guide | N | 22 | Brand pricing table (not a buy rec); tax-credit facts c |
| KEEP-REWRITE | 4 | 0.14 | https://www.hvacbase.org/thermostat-heat-on-but-no-heat | troubleshooting | N | 12 | 14-cause no-heat guide |
| KEEP-REWRITE | 4 | 0.14 | https://www.hvacbase.org/upflow-vs-downflow-furnace | comparison | N | 8 | Orientation guide; low stat density |
| KEEP-REWRITE | 3 | 0.11 | https://www.hvacbase.org/furnace-blowing-cold-air | troubleshooting | N | 12 | 7-cause fix list |
| KEEP-REWRITE | 3 | 0.11 | https://www.hvacbase.org/space-heater-vs-central-heat | comparison | N | 14 | Break-even scenarios; per-BTU labeled illustrative; DOE |
| KEEP-REWRITE | 3 | 0.11 | https://www.hvacbase.org/home-energy-audit-diy | explainer | N | 55 | DIY audit checklist; 25C audit credit expired noted |
| KEEP-REWRITE | 2 | 0.07 | https://www.hvacbase.org/electric-fireplace-cost-to-run | cost-guide | N | 45 | State rate table unsourced inline (EIA in box); no 25C  |
| KEEP-REWRITE | 1 | 0.04 | https://www.hvacbase.org/hvac-cost-texas | cost-guide | N | 35 | 25C correctly framed expired per OBBBA; DSIRE reference |
| KEEP-GOOD | 1019 | 36.39 | https://www.hvacbase.org/ac-tonnage-calculator | calculator | Y | 24 | CalcWrapper; lists specific brand model lines per ton |
| KEEP-GOOD | 901 | 32.18 | https://www.hvacbase.org/air-conditioner-btu-calculator | calculator | N | 20 | CalcWrapper+BTUCalculator; 12-factor Manual J guide |
| KEEP-GOOD | 624 | 22.29 | https://www.hvacbase.org/mini-split-sizing-calculator | calculator | Y | 18 | CalcWrapper; names models+recommends brands in FAQ |
| KEEP-GOOD | 592 | 21.14 | https://www.hvacbase.org/what-size-generator-do-i-need | calculator | Y | 20 | CalcWrapper; wattage tables; CPSC 70/yr cited inline |
| KEEP-GOOD | 558 | 19.93 | https://www.hvacbase.org/furnace-sizing-calculator | calculator | N | 15 | CalcWrapper; gas-cost table flagged illustrative |
| KEEP-GOOD | 436 | 15.57 | https://www.hvacbase.org/ductwork-sizing-calculator | calculator | N | 25 | Embeds CalcWrapper; ACCA Manual D; no product recs |
| KEEP-GOOD | 357 | 12.75 | https://www.hvacbase.org/heat-pump-size-calculator | calculator | Y | 18 | CalcWrapper; cold-climate models w/specs; 25C cited inl |
| KEEP-GOOD | 305 | 10.89 | https://www.hvacbase.org/what-size-tankless-water-heater | calculator | Y | 16 | CalcWrapper; GPM/temp-rise; DOE savings cited inline |
| KEEP-GOOD | 299 | 10.68 | https://www.hvacbase.org/3-phase-power-calculator | calculator | N | 80 | kW/amp conversion; some NEC 430.250 cited, most uncited |
| KEEP-GOOD | 285 | 10.18 | https://www.hvacbase.org/kwh-cost-calculator | calculator | N | 55 | embeds CalcWrapper kwh-cost; $0.18 flagged illustrative |
| KEEP-GOOD | 186 | 6.64 | https://www.hvacbase.org/what-size-dehumidifier-do-i-need | calculator | Y | 45 | CalcWrapper dehumidifier-sizing + DataChart; AHAM chart |
| KEEP-GOOD | 173 | 6.18 | https://www.hvacbase.org/seer2-comparison-calculator | calculator | N | 18 | scenario tables cite $600 credit without expiry caveat |
| KEEP-GOOD | 169 | 6.04 | https://www.hvacbase.org/hvac-tax-credits-2026 | explainer | N | 12 | Correctly frames both 25C and 25D expired per OBBBA; hi |
| KEEP-GOOD | 109 | 3.89 | https://www.hvacbase.org/gas-vs-electric-heating-cost | calculator | N | 15 | Embeds CalcWrapper; per-MMBtu labeled illustrative; eGR |
| KEEP-GOOD | 98 | 3.5 | https://www.hvacbase.org/heat-pump-tax-credits-2026 | explainer | N | 30 | tax-credit guide; 25C/25D expired framing correct |
| KEEP-GOOD | 85 | 3.04 | https://www.hvacbase.org/water-heater-sizing-calculator | calculator | N | 18 | CalcWrapper; tank vs tankless vs HPWH, no named models |
| KEEP-GOOD | 85 | 3.04 | https://www.hvacbase.org/dehumidifier-running-cost | calculator | Y | 50 | CalcWrapper dehumidifier-cost; popular-models cost tabl |
| KEEP-GOOD | 72 | 2.57 | https://www.hvacbase.org/heating-cost-calculator | calculator | N | 45 | embeds CalcWrapper gas-vs-electric; many illustrative |
| KEEP-GOOD | 68 | 2.43 | https://www.hvacbase.org/seer2-rating-explained | calculator | Y | 22 | pillar; CalcWrapper=seer2; 25C framed expired |
| KEEP-GOOD | 63 | 2.25 | https://www.hvacbase.org/how-much-does-mini-split-cost-to-run | calculator | N | 26 | Embeds kwh-cost calc; brands named only in examples |
| KEEP-GOOD | 60 | 2.14 | https://www.hvacbase.org/power-consumption-calculator | calculator | N | 90 | Bill estimator; massive wattage/rate tables, $0.18 illu |
| KEEP-GOOD | 59 | 2.11 | https://www.hvacbase.org/heat-pump-electricity-usage | calculator | N | 50 | embeds CalcWrapper/BTUCalculator; hub role |
| KEEP-GOOD | 55 | 1.96 | https://www.hvacbase.org/how-many-watts-in-12v-battery | calculator | Y | 60 | 12V watt guide; pricing table + best-value brand pick |
| KEEP-GOOD | 55 | 1.96 | https://www.hvacbase.org/how-long-does-water-heater-last | calculator | N | 45 | CalcWrapper water-heater-lifespan; lifespan/hardness da |
| KEEP-GOOD | 51 | 1.82 | https://www.hvacbase.org/air-changes-per-hour-calculator | calculator | N | 18 | Models named only in illustrative worked examples |
| KEEP-GOOD | 49 | 1.75 | https://www.hvacbase.org/air-purifier-sizing-guide | calculator | Y | 22 | Named-model claims-critique table (not buy-rec) |
| KEEP-GOOD | 41 | 1.46 | https://www.hvacbase.org/energy-star-tax-credits | explainer | N | 15 | Correctly frames 25C expired Dec 31 2025 per OBBBA; sta |
| KEEP-GOOD | 41 | 1.46 | https://www.hvacbase.org/good-seer-rating-for-ac | calculator | N | 20 | CalcWrapper=seer2; 25C framed expired |
| KEEP-GOOD | 39 | 1.39 | https://www.hvacbase.org/heat-pump-running-cost-calculator | calculator | N | 30 | embeds CalcWrapper; most tables labeled illustrative |
| KEEP-GOOD | 38 | 1.36 | https://www.hvacbase.org/portable-ac-electricity-cost | calculator | N | 30 | Embeds calc; 50-state rate table labeled approximate |
| KEEP-GOOD | 30 | 1.07 | https://www.hvacbase.org/solar-panel-calculator | calculator | N | 55 | Panel-count calc; brands named in passing only |
| KEEP-GOOD | 27 | 0.96 | https://www.hvacbase.org/how-many-amps-does-generator-produce | calculator | N | 60 | Amps=W÷V chart; embeds calc, uncited amp tables |
| KEEP-GOOD | 26 | 0.93 | https://www.hvacbase.org/hvac-rebates-by-state | explainer | N | 15 | Correctly frames 25C AND 25D expired per OBBBA; HOMES/H |
| KEEP-GOOD | 26 | 0.93 | https://www.hvacbase.org/how-to-calculate-seer | calculator | N | 12 | CalcWrapper=seer2; 25C framed expired |
| KEEP-GOOD | 24 | 0.86 | https://www.hvacbase.org/battery-watt-hours | calculator | N | 60 | Wh=V×Ah guide, huge spec/conversion tables, sourced box |
| KEEP-GOOD | 23 | 0.82 | https://www.hvacbase.org/seer2-savings-calculator | calculator | N | 18 | CalcWrapper=seer2; 25C framed expired |
| KEEP-GOOD | 23 | 0.82 | https://www.hvacbase.org/specific-heat-capacity-calculator | calculator | N | 35 | embeds CalcWrapper specific-heat; costs illustrative |
| KEEP-GOOD | 20 | 0.71 | https://www.hvacbase.org/furnace-efficiency-explained | calculator | N | 12 | Embeds CalcWrapper afue; AFUE cost table footnoted illu |
| KEEP-GOOD | 19 | 0.68 | https://www.hvacbase.org/furnace-vs-heat-pump | calculator | N | 20 | Embeds CalcWrapper; COP tables footnoted illustrative;  |
| KEEP-GOOD | 15 | 0.54 | https://www.hvacbase.org/btucfm-ductwork-relationship | calculator | N | 25 | Embeds CalcWrapper; ACCA/ASHRAE sourced; brands (Carrie |
| KEEP-GOOD | 15 | 0.54 | https://www.hvacbase.org/25c-tax-credit-explained | explainer | N | 10 | Correctly frames 25C TERMINATED Dec 31 2025 per OBBBA;  |
| KEEP-GOOD | 13 | 0.46 | https://www.hvacbase.org/afue-rating-explained | calculator | Y | 22 | CalcWrapper=afue; 25C framed expired |
| KEEP-GOOD | 11 | 0.39 | https://www.hvacbase.org/electric-water-heating-cost | calculator | Y | 60 | CalcWrapper water-heating-cost; 50-state table; 25C/25D |
| KEEP-GOOD | 7 | 0.25 | https://www.hvacbase.org/seer-rating-tax-credits | cost-guide | Y | 22 | 25C thoroughly framed expired; no active 30% claim |
| KEEP-GOOD | 6 | 0.21 | https://www.hvacbase.org/gas-furnace-wattage | calculator | N | 14 | Embeds CalcWrapper furnace-electrical; wattage/generato |
| KEEP-GOOD | 4 | 0.14 | https://www.hvacbase.org/is-tankless-water-heater-worth-it | calculator | N | 40 | CalcWrapper ROI; 25C correctly flagged expired |
