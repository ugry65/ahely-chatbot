# A Hely chatbot – kötelező fejlesztési napló

Minden érdemi forráskód-, konfiguráció- és működésváltoztatás Pull Requestje frissítse ezt a fájlt. A naplóbejegyzést a változtatással együtt kell verziókezelni. A korábbi bejegyzéseket ne töröld.

## CHB-20261109-01 – Kötelező naplózás és CI bevezetésének előkészítése
- Dátum: 2026-11-09
- Igény / indok: minden AI-fejlesztés dokumentált, ellenőrzött és átadható legyen
- Kiinduló forrás: main, ahely_v8.html blob SHA 38051a46c804002711a72c590ae87435bfc79f5e
- Változtatás: fejlesztési napló, PR-sablon, CI naplóellenőrzés és chatbot-invariánsok automatikus tesztje
- Érintett fájlok: docs/CHANGELOG.md, docs/AI_HANDOFF.md, .github/PULL_REQUEST_TEMPLATE.md, .github/workflows/quality.yml, scripts/check_change.py
- Teszt: GitHub Actions quality futás – PR után ellenőrizendő
- Élesítés: nem érinti az ahely_v8.html fájlt, nem indít SFTP deployt
- Visszaállítás: PR lezárása merge nélkül, vagy a konfigurációs commit visszavonása
- Nyitott: main branch protection/ruleset beállítása admin jogosultsággal; required status check; automerge; Drive szinkron hitelesítés és végponttól végpontig próba
- Státusz: PR-ben előkészítve, nem élesített

## Kötelező bejegyzés-sablon
### CHB-YYYYMMDD-NN – Rövid cím
- Dátum:
- Igény / indok:
- Kiinduló SHA:
- Változtatás és érintett fájlok:
- Biztonsági/adatvédelmi hatás:
- Tesztek és eredmény:
- PR / commit:
- Deploy és éles ellenőrzés:
- Visszaállítás:
- Nyitott feladat / következő AI:
- Státusz:
