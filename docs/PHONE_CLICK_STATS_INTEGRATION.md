# Telefonszám-kattintás – statisztikai integráció

## Cél
A szakemberkártyán megjelenő `tel:` linkre történő kattintást `phone_link_clicked` eseményként rögzítjük. Ez **kattintás**, nem bizonyított telefonhívás. A telefonszámot és más személyes adatot az esemény nem tartalmaz; a payload: `name`, `specialist_id`, `context`, `measurement_version:2`.

## Éles szerveroldali teendő (NINCS elvégezve)
A `stats.php` **nem található a GitHubban**. A Drive-ban szereplő `stats (3).php` 2026-11-07-i referenciaváltozat, nem igazolt éles forrás. Először menteni és összehasonlítani kell a szerver aktuális `stats.php` fájlját. Az élő SQLite adatbázist nem szabad lecserélni.

A jelenlegi statisztikai megoldásban:
1. A `$searches[$sid]` inicializálásánál adj hozzá `'phone'=>false` mezőt.
2. A `profile_link_clicked` feldolgozása mellé: `if ($type === 'phone_link_clicked') $v['phone'] = true;`
3. A `$funnelMap` tömbhöz: `'phone_link_clicked'=>0`.
4. A keresésenkénti aggregálásban: `if ($v['phone']) $funnelMap['phone_link_clicked']++;`
5. A `$funnelOrder` listához: `'phone_link_clicked' => 'Telefonszámra kattintott'`. Így a meglévő tölcsér és CSV-export megjeleníti az egyedi kattintó keresések számát.
6. A szakemberenkénti listához az `$spRows` SQL lekérdezés `event_type IN (...)` felsorolásába vedd fel a `'phone_link_clicked'` értéket; külön `$spPhoneCount = []` tömbbe számold a `name` szerinti kattintási eseményeket. Jeleníts meg egy `Telefonszámra kattintások szakemberenként` táblázatot, és vedd fel a CSV-be.
7. A kattintások számát ne nevezd tényleges hívások számának; a tölcsér egyedi keresést, a szakemberlista kattintási eseményt számol, ezért az értékek eltérhetnek.
8. Ellenőrizd a `log.php` eseményfogadását: `phone_link_clicked` esemény tárolása; ha van eseménytípus-engedélyezési lista, egészítsd ki.

## Teszt
- Böngészőben a `tel:` linkre kattintva pontosan egy `phone_link_clicked` esemény küldődik, és a hívóhivatkozás továbbra is működik.
- Az eseményben nincs telefonszám.
- `log.php` ténylegesen eltárolja a megfelelő eseményt.
- `stats.php` időszűrővel és CSV-exportban is mutatja az új adatot.
- A korábbi események, profilkattintások és tölcsérértékek nem sérülnek.
- A szerveroldali módosítás előtt mentés, utána PHP lint és éles ellenőrzés szükséges.

## Visszaállítás
A frontend PR revertelhető; a `stats.php` előző szerveroldali verzióját mentésből kell visszaállítani. A meglévő `chat_stats.sqlite` adatokat meg kell őrizni.
