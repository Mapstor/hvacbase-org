# ROUTES_FULL.md — every emitted route with rendered-HTML word count

This document enumerates every route the site emits, grouped by cluster/type, with rendered-HTML word counts. Counts come from parsing `.next/server/app/*.html` (the pre-rendered pages Next.js serves) — not raw MDX — which resolves the earlier reconciliation. Article counts split into SSR (visible in initial HTML), client-hydrated tables (`<ComparisonTable>` prop cells), and client-hydrated FAQ (`<FAQ>` question + answer text); those three components carry `'use client'` and are added on hydration by JS, so the hydrated column is what a full-browser reader sees while SSR is what a first-paint / non-JS crawler sees.

## Sitemap totals

- Static routes emitted by `app/sitemap.ts` STATIC_ROUTES: **20**
- Article routes emitted by `getAllSlugs()`: **355**
- **Total routes in sitemap: 375**
- Articles with rendered HTML in `.next/`: **354**
- Articles with no rendered HTML (held / no slug): **1**

## Static / hub routes (22)

These are the non-article routes emitted by `STATIC_ROUTES` in `app/sitemap.ts`. Counts are SSR-only because none of these pages use `<FAQ>` or `<ComparisonTable>` at page-body level.

| Path | Name | SSR words |
|---|---|---:|
| `//` | Home | 971 |
| `/about` | About | 288 |
| `/contact` | Contact | 152 |
| `/editorial-policy` | Editorial Policy | 279 |
| `/disclaimer` | Disclaimer | 1002 |
| `/privacy` | Privacy | 602 |
| `/terms` | Terms | 972 |
| `/articles` | Articles hub | 4473 |
| `/brand-reviews` | Brand reviews hub | 551 |
| `/buying-guides` | Buying guides hub | 474 |
| `/calculators` | Calculators hub | 364 |
| `/cost-guides` | Cost guides hub | 653 |
| `/how-to` | How-to hub | 599 |
| `/hvac-dictionary` | HVAC dictionary | 1564 |
| `/troubleshooting` | Troubleshooting hub | 360 |
| `/air-conditioning` | Air conditioning cluster hub | 2844 |
| `/air-quality` | Air quality cluster hub | 588 |
| `/energy-efficiency` | Energy efficiency cluster hub | 1919 |
| `/heat-pumps` | Heat pumps cluster hub | 716 |
| `/heating` | Heating cluster hub | 2211 |

## Article routes with no emitted HTML

- `content/mini-split-air-conditioners/mini-split-in-cold-climates.mdx` — slug: `mini-split-in-cold-climates` — cluster: `uncategorized` — title: `(no title)`

## Article routes grouped by cluster

Sorted alphabetically by cluster, then ascending by hydrated total within each cluster (thinnest first). Corpus totals across 354 article routes: **566,426 SSR words** + **141,299 table cells** + **179,280 FAQ words** = **887,005 hydrated total**.

### ac-sizing-selection (19 articles, 35,174 SSR / 43,035 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/ac-size-for-1000-sq-ft` | spoke | 1025 | 252 | 0 | **1277** |
| `/ac-size-for-2500-sq-ft` | spoke | 1040 | 257 | 0 | **1297** |
| `/ac-size-for-2000-sq-ft` | spoke | 1127 | 204 | 0 | **1331** |
| `/ac-size-for-3000-sq-ft` | spoke | 1122 | 264 | 0 | **1386** |
| `/ac-size-for-1500-sq-ft` | spoke | 1165 | 319 | 0 | **1484** |
| `/5000-btu-air-conditioner-room-size` | spoke | 1367 | 361 | 0 | **1728** |
| `/what-size-mini-split-for-garage` | spoke | 1542 | 296 | 0 | **1838** |
| `/ac-size-for-500-sq-ft` | spoke | 1475 | 371 | 0 | **1846** |
| `/is-it-ok-to-oversize-mini-split` | spoke | 1817 | 350 | 0 | **2167** |
| `/how-many-mini-splits-do-i-need` | spoke | 1537 | 641 | 0 | **2178** |
| `/water-heater-sizing-calculator` | spoke | 1920 | 380 | 0 | **2300** |
| `/what-size-tankless-water-heater` | spoke | 1971 | 485 | 0 | **2456** |
| `/ac-tonnage-calculator` | hub | 2036 | 423 | 0 | **2459** |
| `/how-many-btu-per-square-foot` | spoke | 2138 | 682 | 0 | **2820** |
| `/furnace-sizing-calculator` | hub | 2548 | 403 | 0 | **2951** |
| `/mini-split-sizing-calculator` | hub | 2565 | 431 | 0 | **2996** |
| `/heat-pump-size-calculator` | hub | 2657 | 363 | 0 | **3020** |
| `/what-size-generator-do-i-need` | spoke | 2771 | 759 | 0 | **3530** |
| `/air-conditioner-btu-calculator` | pillar | 3351 | 620 | 0 | **3971** |

### air-conditioners (3 articles, 9,069 SSR / 9,592 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/portable-vs-window-ac` | spoke | 2358 | 144 | 0 | **2502** |
| `/ac-troubleshooting-guide` | spoke | 2857 | 124 | 0 | **2981** |
| `/ac-not-cooling` | spoke | 3854 | 255 | 0 | **4109** |

### air-purifier-brands (13 articles, 13,954 SSR / 25,253 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/airdog-air-purifier-review` | spoke | 693 | 191 | 548 | **1432** |
| `/winix-air-purifiers` | spoke | 849 | 192 | 494 | **1535** |
| `/germguardian-air-purifiers` | spoke | 818 | 159 | 567 | **1544** |
| `/iqair-healthpro-plus-review` | spoke | 801 | 173 | 607 | **1581** |
| `/medify-air-purifiers` | spoke | 917 | 174 | 611 | **1702** |
| `/honeywell-air-purifiers` | spoke | 926 | 187 | 637 | **1750** |
| `/molekule-air-purifier-review` | spoke | 1027 | 145 | 625 | **1797** |
| `/blueair-air-purifiers` | spoke | 1000 | 223 | 646 | **1869** |
| `/coway-air-purifiers` | spoke | 1235 | 197 | 554 | **1986** |
| `/alen-breathesmart-air-purifiers` | hub | 1133 | 388 | 704 | **2225** |
| `/dyson-vs-levoit-vs-coway` | spoke | 1240 | 627 | 668 | **2535** |
| `/levoit-air-purifiers` | hub | 1716 | 214 | 712 | **2642** |
| `/dyson-air-purifiers` | hub | 1599 | 347 | 709 | **2655** |

### air-purifiers-air-quality (21 articles, 20,980 SSR / 40,078 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/best-dehumidifier-air-purifier-combo` | spoke | 484 | 224 | 498 | **1206** |
| `/wall-mounted-air-purifiers` | spoke | 611 | 179 | 496 | **1286** |
| `/best-air-purifiers-for-mold` | spoke | 564 | 229 | 502 | **1295** |
| `/best-hepa-air-purifiers` | spoke | 669 | 161 | 504 | **1334** |
| `/smallest-air-purifiers` | spoke | 674 | 205 | 474 | **1353** |
| `/best-air-purifier-humidifier-combo` | spoke | 648 | 197 | 510 | **1355** |
| `/air-purifier-placement` | spoke | 783 | 187 | 540 | **1510** |
| `/best-air-scrubbers` | spoke | 834 | 244 | 479 | **1557** |
| `/quietest-air-purifiers` | spoke | 718 | 326 | 559 | **1603** |
| `/best-air-purifiers-for-dust` | spoke | 711 | 235 | 662 | **1608** |
| `/best-bedroom-air-purifiers` | spoke | 826 | 214 | 681 | **1721** |
| `/best-air-curtains` | spoke | 851 | 357 | 524 | **1732** |
| `/best-air-purifiers-for-allergies` | spoke | 798 | 336 | 639 | **1773** |
| `/best-air-purifiers` | hub | 932 | 221 | 668 | **1821** |
| `/best-air-purifiers-for-smoke` | spoke | 935 | 329 | 687 | **1951** |
| `/best-large-room-air-purifiers` | spoke | 1259 | 369 | 676 | **2304** |
| `/do-air-purifiers-really-work` | spoke | 1521 | 294 | 692 | **2507** |
| `/air-changes-per-hour-calculator` | hub | 1728 | 257 | 696 | **2681** |
| `/hepa-filter-explained` | spoke | 1564 | 598 | 711 | **2873** |
| `/air-purifier-sizing-guide` | spoke | 1794 | 548 | 704 | **3046** |
| `/air-purifier-guide` | pillar | 2076 | 736 | 750 | **3562** |

### air-quality (4 articles, 9,052 SSR / 11,161 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/best-hvac-air-filters` | spoke | 2253 | 143 | 0 | **2396** |
| `/indoor-air-quality-testing` | hub | 1285 | 666 | 588 | **2539** |
| `/uv-light-hvac-systems` | — | 2467 | 5 | 366 | **2838** |
| `/allergen-control-guide` | — | 3047 | 6 | 335 | **3388** |

### batteries-solar (5 articles, 12,044 SSR / 18,599 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/battery-watt-hours` | spoke | 1962 | 589 | 594 | **3145** |
| `/how-many-watts-in-12v-battery` | spoke | 2229 | 712 | 657 | **3598** |
| `/home-battery-backup-guide` | spoke | 2550 | 413 | 807 | **3770** |
| `/solar-panel-calculator` | spoke | 2735 | 439 | 748 | **3922** |
| `/solar-panel-cost-by-state` | spoke | 2568 | 794 | 802 | **4164** |

### brand-reviews (1 articles, 1,204 SSR / 1,404 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/trane-vs-carrier` | pillar | 1204 | 200 | 0 | **1404** |

### central-air-hvac-systems (10 articles, 21,111 SSR / 28,064 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/goodman-ac-age-serial-number` | spoke | 1413 | 647 | 0 | **2060** |
| `/carrier-hvac-age-serial-number` | spoke | 1525 | 567 | 0 | **2092** |
| `/best-hvac-brands-ranked` | spoke | 1700 | 496 | 0 | **2196** |
| `/hvac-serial-number-decoder` | spoke | 1773 | 524 | 0 | **2297** |
| `/central-ac-vs-mini-split-vs-window` | spoke | 1796 | 752 | 0 | **2548** |
| `/what-size-generator-for-5-ton-ac` | spoke | 2146 | 670 | 0 | **2816** |
| `/central-ac-cost-to-install` | spoke | 2279 | 657 | 0 | **2936** |
| `/best-central-ac-brands` | hub | 2660 | 598 | 0 | **3258** |
| `/hvac-system-lifespan` | spoke | 2391 | 1113 | 0 | **3504** |
| `/central-air-conditioner-guide` | pillar | 3428 | 929 | 0 | **4357** |

### dehumidifiers-humidity (19 articles, 22,882 SSR / 39,122 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/quietest-dehumidifiers` | spoke | 509 | 425 | 517 | **1451** |
| `/best-humidifiers-for-large-rooms` | spoke | 959 | 186 | 436 | **1581** |
| `/does-dehumidifier-cool-a-room` | spoke | 986 | 121 | 482 | **1589** |
| `/dehumidifier-and-ac-same-time` | spoke | 1104 | 227 | 439 | **1770** |
| `/most-energy-efficient-dehumidifiers` | spoke | 868 | 421 | 488 | **1777** |
| `/how-does-humidity-affect-temperature` | spoke | 800 | 413 | 576 | **1789** |
| `/basement-dehumidifier-setting` | spoke | 1195 | 148 | 462 | **1805** |
| `/best-whole-house-dehumidifiers` | hub | 1060 | 253 | 520 | **1833** |
| `/best-small-dehumidifiers` | spoke | 993 | 304 | 542 | **1839** |
| `/dehumidifier-vs-air-purifier` | spoke | 1078 | 264 | 524 | **1866** |
| `/best-humidifiers-for-bedroom` | spoke | 1179 | 232 | 464 | **1875** |
| `/best-commercial-dehumidifiers` | spoke | 1263 | 260 | 491 | **2014** |
| `/ideal-indoor-humidity-level` | spoke | 1076 | 443 | 626 | **2145** |
| `/dehumidifier-running-cost` | spoke | 1426 | 264 | 586 | **2276** |
| `/dehumidifier-electricity-usage` | spoke | 1389 | 277 | 612 | **2278** |
| `/best-basement-dehumidifiers` | hub | 1531 | 255 | 697 | **2483** |
| `/what-size-dehumidifier-do-i-need` | spoke | 1619 | 434 | 665 | **2718** |
| `/how-does-a-dehumidifier-work` | spoke | 1903 | 306 | 688 | **2897** |
| `/dehumidifier-guide` | pillar | 1944 | 441 | 751 | **3136** |

### ductwork-ventilation (4 articles, 9,524 SSR / 14,909 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/flexible-vs-rigid-ductwork` | spoke | 2152 | 538 | 760 | **3450** |
| `/duct-leakage-testing` | spoke | 2006 | 646 | 818 | **3470** |
| `/ductwork-sizing-calculator` | hub | 2451 | 467 | 744 | **3662** |
| `/btucfm-ductwork-relationship` | spoke | 2915 | 638 | 774 | **4327** |

### electrical-wiring (14 articles, 30,281 SSR / 46,811 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/water-heater-amps` | spoke | 1055 | 246 | 513 | **1814** |
| `/water-heater-breaker-size` | spoke | 1616 | 275 | 520 | **2411** |
| `/10-2-or-10-3-wire-for-ac` | spoke | 1824 | 344 | 571 | **2739** |
| `/what-wire-size-for-50-amp` | spoke | 1724 | 436 | 611 | **2771** |
| `/water-heater-wattage` | spoke | 1815 | 634 | 501 | **2950** |
| `/what-wire-size-for-30-amp` | spoke | 2150 | 380 | 567 | **3097** |
| `/how-many-amps-does-a-house-use` | spoke | 1995 | 551 | 580 | **3126** |
| `/water-heater-wire-size` | spoke | 2103 | 511 | 542 | **3156** |
| `/electrical-panel-upgrade-cost` | spoke | 2196 | 610 | 525 | **3331** |
| `/3-phase-power-calculator` | spoke | 2141 | 757 | 591 | **3489** |
| `/wire-gauge-chart` | hub | 2479 | 939 | 605 | **4023** |
| `/wire-for-220-volt` | spoke | 2799 | 1041 | 530 | **4370** |
| `/power-consumption-calculator` | hub | 2736 | 1235 | 610 | **4581** |
| `/electrical-wiring-guide` | pillar | 3648 | 737 | 568 | **4953** |

### energy-costs (11 articles, 21,299 SSR / 34,952 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/heating-cost-calculator` | spoke | 1877 | 204 | 0 | **2081** |
| `/home-energy-audit-diy` | spoke | 1477 | 434 | 474 | **2385** |
| `/average-electric-bill-by-state` | spoke | 1271 | 652 | 711 | **2634** |
| `/time-of-use-rates-explained` | spoke | 1597 | 448 | 738 | **2783** |
| `/how-to-read-electric-meter` | spoke | 1720 | 412 | 802 | **2934** |
| `/electric-water-heating-cost-by-state` | spoke | 1651 | 770 | 881 | **3302** |
| `/specific-heat-capacity-calculator` | spoke | 2179 | 269 | 861 | **3309** |
| `/how-many-kwh-per-day-is-normal` | spoke | 1900 | 703 | 762 | **3365** |
| `/electricity-cost-by-state` | spoke | 2144 | 893 | 757 | **3794** |
| `/kwh-cost-calculator` | hub | 2423 | 691 | 729 | **3843** |
| `/energy-costs-guide` | pillar | 3060 | 638 | 824 | **4522** |

### energy-efficiency (1 articles, 2,889 SSR / 3,015 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/hvac-energy-saving-tips` | spoke | 2889 | 126 | 0 | **3015** |

### energy-efficiency-ratings (24 articles, 26,923 SSR / 41,941 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/ieer-explained` | spoke | 562 | 204 | 246 | **1012** |
| `/seer2-to-seer-conversion` | spoke | 676 | 174 | 218 | **1068** |
| `/eseer-explained` | spoke | 664 | 185 | 247 | **1096** |
| `/hspf-rating-explained` | spoke | 734 | 159 | 268 | **1161** |
| `/eer-rating-explained` | spoke | 811 | 125 | 272 | **1208** |
| `/eer-vs-seer` | spoke | 857 | 126 | 274 | **1257** |
| `/eer-chart-for-ac-units` | spoke | 706 | 282 | 293 | **1281** |
| `/eer2-rating-explained` | hub | 785 | 219 | 306 | **1310** |
| `/hvac-efficiency-texas` | spoke | 1202 | 145 | 0 | **1347** |
| `/seer-vs-seer2` | spoke | 846 | 223 | 340 | **1409** |
| `/merv-rating-chart` | hub | 591 | 490 | 381 | **1462** |
| `/minimum-seer-rating-by-state` | hub | 707 | 464 | 317 | **1488** |
| `/cadr-rating-explained` | hub | 833 | 348 | 312 | **1493** |
| `/ceer-rating-explained` | spoke | 886 | 326 | 322 | **1534** |
| `/what-is-seer-rating` | spoke | 1302 | 161 | 351 | **1814** |
| `/how-to-calculate-seer` | spoke | 1588 | 44 | 263 | **1895** |
| `/hvac-efficiency-ratings-compared` | spoke | 1297 | 387 | 413 | **2097** |
| `/hspf2-rating-explained` | hub | 1206 | 428 | 493 | **2127** |
| `/coefficient-of-performance` | hub | 1378 | 314 | 466 | **2158** |
| `/seer2-savings-calculator` | hub | 1453 | 328 | 408 | **2189** |
| `/good-seer-rating-for-ac` | spoke | 1998 | 148 | 484 | **2630** |
| `/seer-rating-tax-credits` | spoke | 1739 | 409 | 636 | **2784** |
| `/afue-rating-explained` | hub | 1960 | 397 | 564 | **2921** |
| `/seer2-rating-explained` | pillar | 2142 | 518 | 540 | **3200** |

### evaporative-coolers-fans (3 articles, 7,408 SSR / 11,505 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/evaporative-cooler-vs-ac` | spoke | 2002 | 688 | 683 | **3373** |
| `/best-evaporative-coolers` | hub | 2427 | 452 | 683 | **3562** |
| `/best-tower-fans` | spoke | 2979 | 741 | 850 | **4570** |

### fireplaces-stoves (5 articles, 9,007 SSR / 14,595 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/electric-fireplace-cost-to-run` | spoke | 1554 | 461 | 647 | **2662** |
| `/best-wall-mount-electric-fireplaces` | spoke | 1951 | 256 | 680 | **2887** |
| `/best-pellet-stoves` | hub | 1907 | 372 | 704 | **2983** |
| `/best-electric-fireplaces` | hub | 1907 | 419 | 660 | **2986** |
| `/pellet-stove-cost-to-run` | spoke | 1688 | 616 | 773 | **3077** |

### furnaces-heating (25 articles, 30,129 SSR / 50,192 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/upflow-vs-downflow-furnace` | spoke | 574 | 124 | 463 | **1161** |
| `/best-electric-furnace` | spoke | 554 | 161 | 482 | **1197** |
| `/pilot-light-gas-usage` | spoke | 543 | 190 | 522 | **1255** |
| `/furnace-filter-direction` | spoke | 697 | 142 | 459 | **1298** |
| `/how-long-do-furnaces-last` | spoke | 643 | 251 | 484 | **1378** |
| `/cold-air-return-vents` | spoke | 802 | 125 | 524 | **1451** |
| `/best-oil-furnace` | spoke | 703 | 255 | 525 | **1483** |
| `/gas-furnace-wattage` | spoke | 909 | 207 | 472 | **1588** |
| `/furnace-filter-merv-rating` | spoke | 703 | 410 | 531 | **1644** |
| `/do-furnaces-have-pilot-lights` | spoke | 920 | 200 | 543 | **1663** |
| `/furnace-efficiency-explained` | spoke | 1122 | 111 | 514 | **1747** |
| `/furnace-flame-sensor` | spoke | 1118 | 193 | 478 | **1789** |
| `/dirty-furnace-filter-photos` | spoke | 960 | 395 | 505 | **1860** |
| `/thermostat-temperature-winter` | spoke | 895 | 322 | 665 | **1882** |
| `/furnace-installation-cost` | spoke | 1129 | 269 | 689 | **2087** |
| `/boiler-vs-furnace` | spoke | 2088 | 63 | 0 | **2151** |
| `/furnace-blowing-cold-air` | spoke | 1394 | 85 | 750 | **2229** |
| `/cracked-heat-exchanger` | spoke | 1386 | 347 | 702 | **2435** |
| `/best-gas-furnace-brands` | hub | 1130 | 621 | 693 | **2444** |
| `/furnace-leaking-water` | spoke | 1670 | 178 | 702 | **2550** |
| `/thermostat-heat-on-but-no-heat` | spoke | 1721 | 189 | 743 | **2653** |
| `/furnace-maintenance` | spoke | 2494 | 212 | 0 | **2706** |
| `/gas-vs-electric-heating-cost` | hub | 1587 | 449 | 722 | **2758** |
| `/furnace-vs-heat-pump` | hub | 1904 | 561 | 786 | **3251** |
| `/furnace-guide` | pillar | 2483 | 381 | 668 | **3532** |

### generators (12 articles, 16,606 SSR / 29,664 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/how-long-do-generators-last` | spoke | 924 | 410 | 438 | **1772** |
| `/what-size-generator-for-fridge` | spoke | 932 | 411 | 628 | **1971** |
| `/generator-vs-solar-battery-backup` | spoke | 766 | 675 | 639 | **2080** |
| `/how-many-amps-does-generator-produce` | spoke | 1123 | 565 | 607 | **2295** |
| `/best-portable-generators` | spoke | 1375 | 369 | 592 | **2336** |
| `/how-long-generator-on-5-gallons` | spoke | 1523 | 314 | 575 | **2412** |
| `/best-whole-house-generators` | spoke | 1336 | 533 | 568 | **2437** |
| `/propane-generator-usage-per-hour` | spoke | 1252 | 659 | 531 | **2442** |
| `/generator-cost-per-kwh` | hub | 1672 | 282 | 520 | **2474** |
| `/natural-gas-generator-running-cost` | spoke | 1527 | 438 | 653 | **2618** |
| `/portable-generator-safety-tips` | spoke | 1557 | 746 | 646 | **2949** |
| `/generator-guide` | pillar | 2619 | 725 | 534 | **3878** |

### heat-pumps (13 articles, 24,832 SSR / 30,065 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/heat-pump-tax-credits-2026` | spoke | 1420 | 197 | 0 | **1617** |
| `/air-source-vs-ground-source-heat-pump` | spoke | 1155 | 539 | 0 | **1694** |
| `/heat-pump-running-cost-calculator` | spoke | 1405 | 433 | 0 | **1838** |
| `/heat-pump-vs-ac` | spoke | 1558 | 424 | 0 | **1982** |
| `/best-cold-climate-heat-pumps` | spoke | 1993 | 222 | 0 | **2215** |
| `/heat-pump-in-cold-weather` | spoke | 1772 | 493 | 0 | **2265** |
| `/heat-pump-cost-to-install` | spoke | 1738 | 538 | 0 | **2276** |
| `/heat-pump-vs-mini-split` | — | 1990 | 7 | 319 | **2316** |
| `/heat-pump-electricity-usage` | hub | 1979 | 397 | 0 | **2376** |
| `/heat-pump-cop-explained` | spoke | 2108 | 438 | 0 | **2546** |
| `/best-mini-split-heat-pumps` | hub | 2356 | 383 | 0 | **2739** |
| `/disadvantages-of-heat-pumps` | spoke | 2545 | 339 | 0 | **2884** |
| `/heat-pump-guide` | pillar | 2813 | 504 | 0 | **3317** |

### hvac-costs-location (6 articles, 12,483 SSR / 19,275 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/hvac-cost-texas` | spoke | 1980 | 231 | 740 | **2951** |
| `/hvac-cost-illinois` | spoke | 1895 | 351 | 767 | **3013** |
| `/hvac-cost-new-york` | spoke | 1951 | 334 | 780 | **3065** |
| `/hvac-cost-florida` | spoke | 2192 | 378 | 799 | **3369** |
| `/hvac-cost-california` | spoke | 2251 | 391 | 747 | **3389** |
| `/hvac-cost-by-state` | hub | 2214 | 622 | 652 | **3488** |

### hvac-maintenance (6 articles, 14,607 SSR / 23,049 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/air-duct-cleaning-worth-it` | spoke | 2140 | 341 | 838 | **3319** |
| `/how-often-change-hvac-filter` | spoke | 2144 | 422 | 853 | **3419** |
| `/hvac-maintenance-cost` | spoke | 2110 | 895 | 788 | **3793** |
| `/how-to-clean-ac-coils` | spoke | 2563 | 567 | 845 | **3975** |
| `/hvac-ductwork-guide` | spoke | 2583 | 782 | 886 | **4251** |
| `/hvac-maintenance-checklist` | pillar | 3067 | 518 | 707 | **4292** |

### hvac-noise (3 articles, 9,879 SSR / 14,118 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/quietest-mini-splits` | spoke | 3180 | 507 | 672 | **4359** |
| `/hvac-noise-levels-explained` | hub | 2903 | 899 | 666 | **4468** |
| `/how-to-reduce-hvac-noise` | spoke | 3796 | 764 | 731 | **5291** |

### indoor-air-quality (6 articles, 15,620 SSR / 26,072 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/best-indoor-air-quality-monitors` | spoke | 2483 | 592 | 703 | **3778** |
| `/whole-house-ventilation-systems` | spoke | 1988 | 896 | 905 | **3789** |
| `/carbon-monoxide-detector-guide` | spoke | 2268 | 1017 | 826 | **4111** |
| `/how-to-improve-indoor-air-quality` | spoke | 2830 | 1026 | 830 | **4686** |
| `/voc-in-home-sources` | spoke | 2695 | 1234 | 812 | **4741** |
| `/indoor-air-quality-guide` | pillar | 3356 | 893 | 718 | **4967** |

### insulation (1 articles, 2,392 SSR / 2,707 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/insulation-r-value-guide` | — | 2392 | 5 | 310 | **2707** |

### mini-split-air-conditioners (27 articles, 34,432 SSR / 56,856 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/cassette-ceiling-air-conditioners` | spoke | 300 | 131 | 296 | **727** |
| `/ac-dry-mode-vs-dehumidifier` | spoke | 362 | 118 | 288 | **768** |
| `/mini-split-line-set-covers` | spoke | 356 | 119 | 298 | **773** |
| `/smallest-mini-splits` | spoke | 425 | 124 | 298 | **847** |
| `/best-mini-split-for-garage` | spoke | 449 | 109 | 298 | **856** |
| `/senville-mini-split-reviews` | spoke | 598 | 115 | 293 | **1006** |
| `/best-2-zone-mini-split` | spoke | 525 | 200 | 472 | **1197** |
| `/mrcool-3rd-gen-vs-4th-gen` | spoke | 709 | 207 | 290 | **1206** |
| `/best-3-zone-mini-split` | spoke | 541 | 214 | 472 | **1227** |
| `/best-4-zone-mini-split` | spoke | 554 | 228 | 472 | **1254** |
| `/best-5-zone-mini-split` | spoke | 568 | 242 | 472 | **1282** |
| `/mini-split-amps` | spoke | 712 | 158 | 515 | **1385** |
| `/daikin-mini-split-reviews` | spoke | 738 | 289 | 477 | **1504** |
| `/mini-split-maintenance-guide` | spoke | 822 | 116 | 594 | **1532** |
| `/dry-mode-in-ac` | spoke | 1058 | 152 | 535 | **1745** |
| `/mini-split-for-bedroom` | spoke | 1167 | 311 | 570 | **2048** |
| `/best-diy-mini-splits` | spoke | 1452 | 475 | 526 | **2453** |
| `/what-is-a-mini-split` | spoke | 1587 | 255 | 680 | **2522** |
| `/how-does-a-mini-split-work` | spoke | 1736 | 211 | 587 | **2534** |
| `/mrcool-diy-mini-split-review` | spoke | 1960 | 413 | 693 | **3066** |
| `/mini-split-brands-ranked` | spoke | 1967 | 755 | 627 | **3349** |
| `/how-much-does-mini-split-cost-to-run` | spoke | 2171 | 412 | 769 | **3352** |
| `/best-mini-split-ac-units` | hub | 2316 | 475 | 635 | **3426** |
| `/mini-split-vs-central-air` | spoke | 2460 | 430 | 595 | **3485** |
| `/mini-split-electricity-usage` | spoke | 2362 | 373 | 755 | **3490** |
| `/mini-split-installation-cost` | spoke | 2170 | 989 | 688 | **3847** |
| `/mini-split-air-conditioners` | pillar | 4367 | 914 | 694 | **5975** |

### mold-moisture-control (4 articles, 9,141 SSR / 16,675 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/mold-remediation-cost` | spoke | 1958 | 990 | 795 | **3743** |
| `/mold-prevention-guide` | hub | 2199 | 813 | 788 | **3800** |
| `/moisture-barrier-crawl-space` | spoke | 2385 | 1144 | 868 | **4397** |
| `/how-to-identify-mold` | spoke | 2599 | 1254 | 882 | **4735** |

### portable-air-conditioners (18 articles, 26,445 SSR / 40,863 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/best-dual-hose-portable-acs` | spoke | 906 | 254 | 327 | **1487** |
| `/best-portable-ac-heater-combos` | spoke | 1061 | 288 | 292 | **1641** |
| `/portable-ac-electricity-cost` | spoke | 932 | 214 | 566 | **1712** |
| `/best-portable-ac-for-apartment` | spoke | 1148 | 133 | 442 | **1723** |
| `/can-you-use-portable-ac-without-hose` | spoke | 1096 | 144 | 493 | **1733** |
| `/cheapest-portable-air-conditioners` | spoke | 1113 | 236 | 396 | **1745** |
| `/do-portable-acs-pull-air-from-outside` | spoke | 1098 | 153 | 498 | **1749** |
| `/quietest-portable-air-conditioners` | spoke | 1301 | 284 | 411 | **1996** |
| `/how-to-drain-portable-ac` | spoke | 1307 | 138 | 632 | **2077** |
| `/portable-ac-window-seal-kits` | spoke | 1425 | 279 | 452 | **2156** |
| `/smallest-portable-acs` | spoke | 1552 | 231 | 388 | **2171** |
| `/single-hose-vs-dual-hose-portable-ac` | spoke | 1529 | 277 | 640 | **2446** |
| `/biggest-portable-acs` | spoke | 1737 | 280 | 608 | **2625** |
| `/how-do-portable-acs-work` | spoke | 2134 | 104 | 679 | **2917** |
| `/portable-air-conditioners` | pillar | 2005 | 233 | 690 | **2928** |
| `/best-portable-air-conditioners` | hub | 1931 | 405 | 635 | **2971** |
| `/how-to-vent-portable-ac-without-window` | spoke | 2033 | 264 | 676 | **2973** |
| `/portable-ac-vs-window-ac` | spoke | 2137 | 380 | 1296 | **3813** |

### refrigerants (3 articles, 7,848 SSR / 12,174 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/r410a-vs-r32-refrigerant` | hub | 2000 | 517 | 809 | **3326** |
| `/hvac-refrigerant-phase-out` | spoke | 2695 | 924 | 781 | **4400** |
| `/refrigerant-types-explained` | spoke | 3153 | 422 | 873 | **4448** |

### seer-comparisons (7 articles, 11,577 SSR / 19,934 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/15-2-seer2-vs-16-seer` | spoke | 1567 | 367 | 586 | **2520** |
| `/is-higher-seer-worth-it` | spoke | 1081 | 754 | 739 | **2574** |
| `/14-seer-vs-16-seer-vs-20-seer` | spoke | 1201 | 643 | 761 | **2605** |
| `/seer2-comparison-calculator` | spoke | 1553 | 478 | 638 | **2669** |
| `/14-3-seer2-vs-16-seer` | spoke | 1914 | 488 | 539 | **2941** |
| `/16-seer-vs-14-seer` | hub | 1915 | 494 | 681 | **3090** |
| `/16-seer-vs-20-seer` | spoke | 2346 | 519 | 670 | **3535** |

### smart-home-thermostats (5 articles, 9,378 SSR / 15,404 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/nest-vs-ecobee-vs-honeywell` | spoke | 1645 | 544 | 668 | **2857** |
| `/programmable-vs-smart-thermostat` | spoke | 1906 | 270 | 725 | **2901** |
| `/smart-thermostat-savings` | spoke | 1670 | 575 | 707 | **2952** |
| `/best-smart-thermostats` | hub | 1703 | 659 | 615 | **2977** |
| `/best-thermostat-for-heat-pump` | spoke | 2454 | 502 | 761 | **3717** |

### space-heaters (1 articles, 2,166 SSR / 2,223 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/radiant-floor-heating-pros-cons` | spoke | 2166 | 57 | 0 | **2223** |

### space-heaters-portable-heating (13 articles, 16,399 SSR / 28,098 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/electric-heater-running-cost` | hub | 681 | 343 | 657 | **1681** |
| `/best-infrared-heaters` | spoke | 921 | 401 | 483 | **1805** |
| `/best-small-heaters` | spoke | 1079 | 266 | 470 | **1815** |
| `/space-heater-vs-central-heat` | spoke | 1155 | 230 | 501 | **1886** |
| `/best-garage-heaters` | spoke | 1136 | 297 | 506 | **1939** |
| `/best-baseboard-heaters` | spoke | 1048 | 513 | 442 | **2003** |
| `/best-ventless-propane-heaters` | spoke | 1328 | 301 | 451 | **2080** |
| `/safest-space-heaters` | hub | 1353 | 293 | 625 | **2271** |
| `/battery-operated-heaters` | spoke | 1431 | 375 | 479 | **2285** |
| `/safest-heater-for-bedroom` | spoke | 1411 | 280 | 634 | **2325** |
| `/best-space-heaters-for-large-rooms` | spoke | 1227 | 435 | 721 | **2383** |
| `/best-energy-efficient-space-heaters` | spoke | 1453 | 313 | 668 | **2434** |
| `/space-heater-guide` | pillar | 2176 | 336 | 679 | **3191** |

### tankless-water-heaters (15 articles, 19,433 SSR / 34,475 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/outdoor-portable-tankless-heaters` | spoke | 753 | 168 | 331 | **1252** |
| `/tankless-water-heater-propane-usage` | spoke | 896 | 279 | 521 | **1696** |
| `/tankless-water-heater-electricity` | spoke | 950 | 290 | 659 | **1899** |
| `/tankless-water-heater-wire-size` | spoke | 1143 | 399 | 496 | **2038** |
| `/hot-water-recirculating-pump` | spoke | 1256 | 341 | 496 | **2093** |
| `/tankless-water-heater-breaker-size` | spoke | 1210 | 361 | 525 | **2096** |
| `/smallest-tankless-water-heaters` | spoke | 1112 | 531 | 516 | **2159** |
| `/tankless-vs-tank-water-heater` | spoke | 998 | 576 | 760 | **2334** |
| `/electric-vs-gas-tankless` | spoke | 1277 | 504 | 661 | **2442** |
| `/is-tankless-water-heater-worth-it` | spoke | 1605 | 221 | 764 | **2590** |
| `/best-tankless-gas-water-heaters` | spoke | 1598 | 337 | 742 | **2677** |
| `/best-electric-tankless-water-heaters` | spoke | 1629 | 409 | 683 | **2721** |
| `/tankless-water-heater-cost` | spoke | 1422 | 621 | 705 | **2748** |
| `/tankless-water-heater-guide` | pillar | 1757 | 294 | 716 | **2767** |
| `/best-tankless-water-heaters` | hub | 1827 | 420 | 716 | **2963** |

### tax-credits (4 articles, 8,562 SSR / 12,892 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/energy-star-tax-credits` | spoke | 1864 | 450 | 577 | **2891** |
| `/25c-tax-credit-explained` | spoke | 2104 | 418 | 542 | **3064** |
| `/hvac-tax-credits-2026` | pillar | 2209 | 419 | 687 | **3315** |
| `/hvac-rebates-by-state` | spoke | 2385 | 675 | 562 | **3622** |

### water-heaters (6 articles, 13,772 SSR / 20,748 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/water-heater-cost-to-install` | spoke | 1449 | 502 | 684 | **2635** |
| `/best-water-heaters` | spoke | 2424 | 282 | 701 | **3407** |
| `/heat-pump-water-heater-guide` | spoke | 2243 | 491 | 709 | **3443** |
| `/how-long-does-water-heater-last` | spoke | 2456 | 478 | 689 | **3623** |
| `/electric-water-heating-cost` | spoke | 2571 | 544 | 686 | **3801** |
| `/water-heater-guide` | pillar | 2629 | 474 | 736 | **3839** |

### window-air-conditioners (22 articles, 27,924 SSR / 47,485 hydrated)

| slug | role | SSR | +Tables | +FAQ | Hydrated |
|---|---|---:|---:|---:|---:|
| `/low-profile-window-acs` | spoke | 537 | 147 | 438 | **1122** |
| `/smallest-window-acs` | spoke | 603 | 217 | 417 | **1237** |
| `/casement-window-air-conditioners` | spoke | 628 | 232 | 420 | **1280** |
| `/window-ac-with-heater` | spoke | 662 | 213 | 431 | **1306** |
| `/best-10000-btu-air-conditioners` | spoke | 747 | 181 | 389 | **1317** |
| `/window-ac-support-brackets` | spoke | 738 | 198 | 440 | **1376** |
| `/best-12000-btu-air-conditioners` | spoke | 747 | 152 | 493 | **1392** |
| `/through-the-wall-air-conditioners` | spoke | 740 | 312 | 483 | **1535** |
| `/lightweight-window-acs` | spoke | 809 | 323 | 426 | **1558** |
| `/how-to-tilt-window-ac` | spoke | 957 | 190 | 460 | **1607** |
| `/saddle-u-shaped-air-conditioners` | spoke | 964 | 248 | 427 | **1639** |
| `/quietest-window-acs` | spoke | 900 | 364 | 449 | **1713** |
| `/biggest-window-acs` | spoke | 937 | 401 | 484 | **1822** |
| `/do-window-acs-pull-air-from-outside` | spoke | 1584 | 222 | 572 | **2378** |
| `/window-too-small-for-ac` | spoke | 1437 | 462 | 732 | **2631** |
| `/best-window-air-conditioners` | hub | 1324 | 590 | 737 | **2651** |
| `/most-energy-efficient-window-acs` | spoke | 1639 | 702 | 678 | **3019** |
| `/smallest-acs-for-small-rooms` | spoke | 1912 | 364 | 744 | **3020** |
| `/window-ac-vs-mini-split` | spoke | 1829 | 514 | 724 | **3067** |
| `/window-ac-installation-guide` | spoke | 2426 | 323 | 673 | **3422** |
| `/air-conditioner-types` | hub | 2468 | 585 | 686 | **3739** |
| `/window-air-conditioners` | pillar | 3336 | 624 | 694 | **4654** |

## Word-count distribution (article routes only)

The reconciliation between the earlier Phase 0 "158 under 600" and Batch 6 "0 under 600" claims. The truth measured from emitted HTML sits between them: 19 articles are under 600 in SSR (what a first-paint reader and non-JS social scrapers see, because `<FAQ>` and `<ComparisonTable>` are client-hydrated and not in initial HTML); 0 articles are under 600 in the hydrated total (what a JS-enabled reader eventually sees).

| Bucket | SSR only | Hydrated total |
|---|---:|---:|
| A: <300 | 0 | 0 |
| B: 300-600 | 19 | 0 |
| C: 600-1000 | 71 | 5 |
| D: 1000-1500 | 79 | 50 |
| E: >=1500 | 185 | 299 |
