## CHB-20261113-02 – Párkapcsolati címkék és Mészár Tünde Andrea

- Dátum/végrehajtó: 2026-11-13, Europe/Budapest; Codex. Kifejezett felhasználói döntés alapján.
- Kiinduló main: d2fb06a032dc0379b96aa4411814a96ab4087975. Friss main, changelog, nyitott PR #1/#7/#12 és Actions ellenőrizve; előző deploy 43424545160 sikeres. A nyilvános HTML normalizált tartalma a kiinduló mainnel egyezett.
- Minimális változás: ahely_v8.html két címkéje „Párkonzultáció és tanácsadás” és „Párterápia”; parterapia lista [11,17,22]. ID 22 már meglévő rekord, Mészár Tünde Andrea. A témák belső értéke, az egyéni parkapcsolat/par/csalad hozzárendelés és az explicit párterápia-illesztés változatlan.
- Teszt: tests/name-search.spec.js elvárások frissítve; valódi felno korcsoportkód; pontos kulcs- és ID-lista, régi kategória-listák, gombértékek, teljes vezetett út és három szakemberkártya. Helyben 38/38 desktop/mobil Chromium teszt sikeres. Első új UI-teszt a kapcsolatfelvételi kártyát is megszámolta (36/38); a teszt szelektora javítva.
- Hatókör/adatvédelem: nincs SP-, kapacitás-, coaching-, PHP-, adatbázis- vagy analitikai változás. A szabadszöveges AI-út külön, korábbról ismert korlátja nem változik; a kizárólagosság a vezetett párterápia-választásra igazolt.
- Párhuzamos változás: PR #17 a436e6b116e12f10a3f129f1d73b05a69de916e9 időközben ugyanazt a három HTML-sort élesítette. PR #18 friss mainre igazítva már csak tesztet és naplót egészít ki. Éles forrásegyezés igazolt, SHA-256 b6f405a8a250106fc51d74b2a8bc3352828b2f713adbc7e64ed8c746d0b75964; Joomla iframe desktop/mobil Chromiumon mindkét címke és kizárólag ID 11/17/22 kártyája sikeres.
- Kiadás: PR → sikeres CI → merge → automatikus HTML deploy → éles forrás- és iframe-ellenőrzés. Végső bizonyítékok a PR-ben és a Drive 00–03 dátumozott kiegészítésében.
- Rollback: e PR squash commitjának revertje, automatikus HTML deploy; kiinduló d2fb06a. Régi történeti bejegyzések megőrizve.
- Drive átadás/státusz: https://docs.google.com/document/d/1L7x1WFM6bUQk8pGj8csnnV6C8Tgqr398Q_fjKm_ER84/edit ; https://docs.google.com/document/d/1guyOc0FVKDMMbTlPyRMZi7lNOixdOv62b885BhrdvBQ/edit .

---

## 2026-11-13 – Párkapcsolati témacímkék és párterápia szakemberlista frissítése

- **Felhasználói döntés:** a két témaválasztó felirat pontosan „Párkonzultáció és tanácsadás” és „Párterápia”; a párterápia szakemberlistájához Mészár Tünde Andrea (ID 22) hozzáadva a korábbi 11 és 17 mellé.
- **Kiinduló main SHA:** `d2fb06a032dc0379b96aa4411814a96ab4087975`.
- **Fájlok:** `ahely_v8.html`, `tests/name-search.spec.js`, `docs/CHANGELOG.md`.
- **Működés:** csak a két választógomb felirata változik, a hozzájuk tartozó választási szöveg és a korábbi párkapcsolati/családi hozzárendelések változatlanok. `KATEGORIA_MAP.parterapia = [11,17,22]`. A pontos `parterapia` kategóriaillesztés továbbra is kizárja a `par` részszavas túlajánlást.
- **Tesztek:** Playwright desktop/mobil ellenőrzés a témacímkékre, a párterápiás három ID-ra, a korábbi kategória elkülönítésére és a jelöltlistára. CI eredmény külön ellenőrizendő.
- **Élesítés:** PR + zöld CI + merge + automatikus HTML deploy; tényleges éles böngészős ellenőrzés külön.
- **Visszaállítás:** merge commit revert és új deploy.
- **Nyitott:** szabadszöveges AI-keresés párterápiás kizárólagosságának külön vizsgálata.

---

## 2026-11-13 – Párterápia külön kategória (felhasználói jóváhagyással)

- **Cél:** a közös párterápia megkülönböztetése a párkapcsolati/családi problémákra irányuló egyéni tanácsadástól.
- **Jóváhagyott üzleti döntés:** új `Párterápia – pároknak` kategóriában kizárólag Ujszászi Andrea (ID 11) és Dr. Perger Mónika (ID 17). Keul Andrea és Lőrincz Noémi párterápiás besorolása nincs jóváhagyva.
- **Kiinduló main SHA:** `bca470a231bb4cddb8bab188362290aaa0accc4a`.
- **Fájlok:** `ahely_v8.html`, `tests/name-search.spec.js`, `docs/CHANGELOG.md`.
- **Módosítás:** új témaválasztó és `parterapia: [11,17]` kategória; explicit kategóriaillesztés kizárja a `par` részszó miatt egyébként bekövetkező túlajánlást. A korábbi párkapcsolat/család kategória hozzárendelése változatlan; címkéje egyéni tanácsadásra pontosítva.
- **Ellenőrzés:** Playwright teszt az új választó, pontos ID-lista, régi kategória elkülönülése és jelöltek kizárólagossága számára; tényleges CI-eredmény PR-ben ellenőrizendő. Mobil és desktop CI szükséges.
- **Deploy:** kizárólag sikeres ellenőrzés és merge után; éles böngészős ellenőrzés külön feladat.
- **Rollback:** a változás merge commitjának revertje, új HTML deploy.
- **Nyitott:** Keul Andrea és Lőrincz Noémi párterápiás szolgáltatásának üzleti tisztázása; a szabadszöveges AI-útvonal külön vizsgálata.

---

## 2026-11-11 – Spák Brigitta (ID 15) telefonszámának pótlása

- **Felhasználó által megadott, jóváhagyott adat:** Spák Brigitta telefonszáma `+36 70 516 8216` (tárcsázható: `+36705168216`).
- **Kiinduló main SHA:** `82b1b0d4db21493a1aa0d50edbbf0997a176e5fb`.
- **Érintett fájlok:** `ahely_v8.html`, `tests/name-search.spec.js`, `docs/CHANGELOG.md`.
- **Módosítás:** kizárólag az ID 15 szakember `phone` mezőjének hozzáadása. Szakemberlista, coaching szabály, kapacitás, ajánlási és krízislogika változatlan.
- **Teszt:** telefonszám formátum, 28 telefonszámmal rendelkező és 4 hiányzó szakember, ID 15 pontos számának regressziós ellenőrzése. Első CI futás: 28 sikeres / 2 sikertelen (régi teszt még a Spák telefonszám-link hiányát várta); teszt frissítve, az új futást merge előtt ellenőrizni kell.
- **Élesítés:** sikeres PR ellenőrzések után merge, automatikus HTML deploy és annak ellenőrzése.
- **Visszaállítás:** e változtatás commitjának revertje és új automatikus deploy.
- **Nyitott:** éles böngészőben a telefonszám megjelenítésének manuális ellenőrzése, telefonkattintási adatbefogadás E2E ellenőrzése.

---

## 2026-11-11 18:31 CET – Telefonkattintás-mérés élesítési zárás és AI-átadás

- **Cél / jóváhagyás:** a felhasználó kérésére a telefonszám-kattintások statisztikai megjelenítésének élesítése és dokumentálása.
- **Kiinduló SHA-k:** PHP deploy előtt `88d651ef481119f274e1671ba4e947b4f899acf8`, frontend előtt `54accce6100ccaf934b9a8cbf2404257a30f768b`; **végső élesített main SHA:** `73d2df7387bbc1d55a63a44d7a5c88d2703873cc`.
- **Érintett fájlok:** `ahely_v8.html`, `tests/name-search.spec.js`, `scripts/patch_phone_stats.py`, `.github/workflows/deploy-phone-stats.yml`, szerveroldali `stats.php`; `log.php` és `chat_stats.sqlite` változatlan.
- **PR-ek:** [#10](https://github.com/ugry65/ahely-chatbot/pull/10) PHP patch és dry-run; [#11](https://github.com/ugry65/ahely-chatbot/pull/11) biztonságos PHP deploy; [#13](https://github.com/ugry65/ahely-chatbot/pull/13) frontend naplózás. Mindhárom összevonva. #7 és #12 korábbi, konfliktusos/duplikált PR-ek nyitva; nem tekintendők élesnek.
- **Működés:** `phone_link_clicked` esemény szakembernévvel, ID-val, kontextussal, `measurement_version=2` értékkel; telefonszám nélkül. A tölcsér egyedi kereséseket, a szakemberenkénti tábla és CSV kattintási eseményeket számlál. A kattintás nem igazolt telefonhívás.
- **Automatikus tesztek:** Python-egységtesztek és Playwright regresszió sikeres; éles `stats.php` dry-run és PHP lint sikeres ([run 43067272722](https://github.com/ugry65/ahely-chatbot/actions/runs/43067272722)).
- **Telepítés:** `stats.php` SFTP deploy [run 43068322435](https://github.com/ugry65/ahely-chatbot/actions/runs/43068322435) sikeres, hitelesítési hash változatlan, SFTP bájtszintű visszaolvasás sikeres; frontend [run 43068812195](https://github.com/ugry65/ahely-chatbot/actions/runs/43068812195) sikeres.
- **Adatbiztonság / visszaállítás:** eredeti `stats.php.rollback.php` mentés a szerveren; visszaállítás SFTP átnevezéssel. Frontend rollback: a #13 merge commit `73d2df7387bbc1d55a63a44d7a5c88d2703873cc` revertje és új automatikus deploy. Az adatbázis és a naplózó PHP nem módosult. Titkok nem kerültek GitHubba.
- **Nem igazolt / nyitott:** valós `log.php` eseménybefogadás és SQLite írás, hitelesített `stats.php` HTTP-felület és CSV, valós telefonkattintás E2E tesztje; #7 és #12 lezárása; coaching `[9]` vs. `[9,60]` üzleti szabályeltérés tisztázása. **Státusz: technikai telepítés igazolt, teljes éles működés még nem.**
- **Drive 00–03:** 2026-11-11-i dátumozott kiegészítések a forrástérképhez, architektúrához, fejlesztési naplóhoz és teszt/rollback protokollhoz. A régi 2026-11-09-i pillanatképek történeti adatok.

---

## 2026-11-11 – Telefonszám-kattintás frontend élesítés (aktuális main)

- Cél: a szakemberkártya tel: linkjének phone_link_clicked naplózása az élesített stats.php kimutatáshoz.
- Kiinduló main SHA: 54accce6100ccaf934b9a8cbf2404257a30f768b.
- Érintett: ahely_v8.html, tests/name-search.spec.js, docs/CHANGELOG.md.
- Adatok: név, szakember-ID, kontextus, measurement_version=2; telefonszám nincs a naplózott eseményben.
- Teszt: Playwright regressziós teszt és teljes browser suite, eredmény merge előtt ellenőrizendő.
- Élesítés: a szerveroldali stats.php már telepítve, run 43068322435; frontend deploy csak sikeres CI és merge után.
- Visszaállítás: frontend commit revert, automatikus újradeploy; stats.php.rollback.php mentés külön rendelkezésre áll.
- Korábbi frontend PR #7 és #12 konfliktusos a közben frissült main miatt; a változást friss mainre újraalkalmaztuk.
- Nyitott: log.php élő naplózás és statisztikai CSV funkcionális ellenőrzése.

---

## 2026-11-11 – Éles statisztikai PHP-telepítés előkészítése

- Cél: a sikeres 43067272722 live dry-run után az aktuális stats.php állomány telefonkattintási kiegészítésének ellenőrzött élesítése.
- Kiinduló main SHA: 88d651ef481119f274e1671ba4e947b4f899acf8.
- Érintett: .github/workflows/deploy-phone-stats.yml, docs/CHANGELOG.md; élesítéskor kizárólag a szerver stats.php fájlja.
- Folyamat: élő stats.php letöltés, fail-closed patch, PHP lint, hitelesítési hash-azonosság, ideiglenes feltöltés, eredeti fájl átnevezése stats.php.rollback.php-re, atomikus átnevezés, bájtszintű SFTP-visszaolvasás.
- Visszaállítás: szerver stats.php.rollback.php fájl visszanevezése stats.php-ra SFTP-n; automatizált visszaállítás a feltöltés vagy ellenőrzés hibájánál. Az eredeti mentés PHP-kiterjesztésű, a PHP-kiszolgáló végrehajtja, nem nyers forrásként szolgálja ki.
- Tesztek: PR és workflow futás eredménye külön ellenőrizendő; a korábbi live dry-run sikeres.
- Adatbázis: chat_stats.sqlite változatlan; szerver log.php változatlan.
- Élesítés: PR-ben előkészítve, még nem futott; frontend PR #7 konfliktusát külön rendezni kell.
- Nyitott: élesítés utáni stats.php működés, CSV, frontend kattintás és rollback ellenőrzése.

---

## 2026-11-11 – Telefonszám-kattintás statisztikai PHP-frissítés: biztonságos dry-run

- Cél: a phone_link_clicked esemény megjelenítése a keresési tölcsérben, szakemberenkénti táblázatban és CSV-exportban.
- Kiinduló main SHA: 481d35ad22d652171b1797c24aee3befdd1dfa5e. Az éles stats.php és log.php szerkezeti ellenőrzése sikeres: Actions run 43066344346.
- Érintett: scripts/patch_phone_stats.py, tests/test_phone_stats_patch.py, tests/name-search.spec.js, .github/workflows/stats-phone-dryrun.yml, .github/workflows/stats-phone-ci.yml, docs/CHANGELOG.md.
- Működés: fail-closed szöveghorgonyokkal, kizárólag a meglévő statisztikai kódot módosítja; meglévő hitelesítési konfigurációt és adatbázist nem érint.
- Teszt: a Drive-on található 2026-11-07-i referencia stats.php állományon helyi patch + PHP lint sikeres; PR Python egységteszt sikeres. A böngészőteszt 24 sikeres / 4 sikertelen volt az elavult 31 fős és telefonszám nélküli ID elvárás miatt; a tesztelvárásokat a dokumentált 32 fős main állapothoz igazítottuk (ID 59 telefonszám nélkül), szakemberadat nem változott. Újrafuttatás és éles PHP dry-run még hátravan. A referencia nem azonosított éles verzió.
- Biztonság: az éles PHP csak a GitHub runner ideiglenes tárhelyén dolgozható fel, nem kerül repositoryba, artifactba vagy logba. A dry-run nem tölt fel semmit.
- Élesítés: NEM történt. PR #7 frontend telefonkattintás eseményküldése még külön PR-ben; backend módosítás előtti kontrollált mentés, visszaállítás és tesztek szükségesek.
- Visszaállítás: a dry-run workflow/patcher commit revertelhető; szerveroldali fájl nem módosult.
- Nyitott: éles dry-run ellenőrzés, biztonságos deploy/rollback, telefonkattintási frontend PR ellenőrzése, tényleges statisztikai megjelenítés validálása.

---

## 2026-11-11 – Egyszeri, csak olvasó statisztikai szerverellenőrzés automatikus indítása

- Cél: a meglévő manuális SFTP-ellenőrző workflow elindítása külön GitHub Actions dispatch jogosultság nélkül, a felülvizsgált PR mainre merge-elésével.
- Kiinduló main SHA: 367ddd8ab574038b6f4ef33e98a65d47a13778c0.
- Érintett: .github/workflows/inspect-stats.yml; docs/CHANGELOG.md.
- Változás: workflow_dispatch mellé csak a workflow fájl main push eseményére korlátozott trigger. Az ellenőrzés csak letölt, szerkezeti booleanokat közöl, nem tölt fel vagy módosít szerverfájlt.
- Teszt és élesítés: PR ellenőrzések után merge; futás eredményét külön kell igazolni. A workflow GitHubon fut, nem PHP-deploy.
- Visszaállítás: a push trigger későbbi külön PR-rel eltávolítható; szerveroldali rollback nem szükséges.
- Nyitott: a tényleges szerverstruktúra megismerése, a phone_link_clicked statisztikai riport megvalósítása és ellenőrzése.

---

## 2026-11-11 – Szerveroldali statisztika biztonságos, csak olvasó ellenőrzésének előkészítése

- Cél: a GitHub Actions meglévő SFTP hitelesítésével az éles stats.php és log.php szerkezetének biztonságos ellenőrzése, a forráskód vagy titkok nyilvánosságra hozatala nélkül.
- Kiinduló SHA: main 80084c1d24e79722cb9f5b57186cd8d577df0b47.
- Érintett fájlok: .github/workflows/inspect-stats.yml, .github/workflows/inspect-stats-ci.yml, scripts/inspect_stats_structure.py, docs/CHANGELOG.md.
- Biztonság: nyilvános repository miatt a szerveroldali fájlok nem kerülhetnek logba, artifactba vagy commitba. A workflow kizárólag lokálisan olvas és strukturális igen/nem eredményeket közöl.
- Teszt: Python-szintaxis és pozitív/negatív fixture-ellenőrzés CI-workflow-ja hozzáadva; Actions futás és SFTP letöltés még nem igazolt.
- Élesítés: nincs; manuális workflow a mainre történő ellenőrzött merge után érhető el.
- Visszaállítás: PR bezárása vagy workflow commit revert.
- Nyitott: élő fájlok szerkezetének ellenőrzése, statisztikai módosítás biztonságos tesztelése és telepítése, phone_link_clicked esemény megjelenítése, éles ellenőrzés.
- Státusz: előkészítve, nem éles.

---

# Fejlesztési napló

## 2026-11-11 – Szakemberadatok, keresés, elérhetőségek és stabilizálás

### Végrehajtott változások
- **Új szakember:** Géczi-Répássy Helga (ID 60); felnőttek 18 éves kortól; a felhasználó által megadott 7 pszichológiai és 6 coaching/tanácsadási témakörhöz rendelve. A kártyája: tanácsadó szakpszichológus, coach; adatlap: `https://a-hely.com/ai/60-geczi-repassy-helga`.
- **Kapacitás:** Helga az aktív szabad kapacitású listába került. Jelenlegi ID-k: 8, 9, 15, 41, 50, 53, 60. A többi szakember „Várólista lehetséges” státusszal jelenik meg.
- **Kép:** Helga képe közvetlenül az A-Hely saját tárhelyéről: `https://a-hely.com/images/repasi%20helga%20540.png`. A korábbi külső képhivatkozás és az adatlapból történő dinamikus képkiválasztás megszűnt.
- **Kettős vezetéknevek:** a névkereső a kötőjeles vezetéknév mindkét tagjának elején talál; pl. „Géczi” és „Répássy” → Géczi-Répássy Helga, „Sipos” és „Bodor” → Sipos-Bodor Anna. Ékezet nélküli beírás és elírás-javaslat támogatott, de a keresztnév önmagában nem keresési kulcs.
- **Adatlapok:** a szakember-profillinkek egységesen az `/ai/<id>-<slug>` útvonalat használják, nem a korábbi hibás `/munkatarsaink/<id>-<slug>` alakot.
- **Telefonok:** a Joomla szakember-CSV alapján a 31 szakemberből 27-hez rögzítettük a telefonszámot a `SP` adatlistában. Kijelzés: `+36 XX XXX XXXX`; a kártyákon a titulus alatt közvetlenül hívható `tel:+36XXXXXXXXX` hivatkozás. A telefonok adatlapokból való, futás közbeni lekérdezését megszüntettük.
- **Hiányzó telefonok:** Spák Brigitta (15), Szász Linda (28), Czimmerman Edit (39), Sipos-Bodor Anna (50). A chatbot nem ad meg helyettük kitalált számot. Spák Brigitta exportált telefonmezője nem volt érvényes telefonszám.
- **Indulási hiba:** Helga rekordjának beillesztésekor a rekordelválasztó vessző hiánya miatt a chatbot JavaScript-kódja nem indult. A hiányzó elválasztót javítottuk; ez a hiba indokolja a regressziós teszteket.

### Ellenőrzés és ismert korlátok
- Az utolsó, adatokra vonatkozó `main` commit: `121c71ba`; automatikus Deploy workflow: `43055686934`, sikeresen befejeződött.
- A `tests/name-search.spec.js` regressziós tesztjeit frissítettük: aktuális szabad kapacitás, [9,60] coaching-besorolás, kettős vezetéknevek, Helga kép/URL/telefon, 27 kitöltött és 4 hiányzó telefonszám. Az automatikus futás eredményét a további ellenőrzésnél külön kell nézni; a kód mentése nem bizonyít böngészős működést.
- A rögzített telefonszámok **CSV-forrásból** származnak, nem közvetlenül az összes jelenlegi adatlap vizuális felülvizsgálatából. Módosításkor a nyilvános adatlappal ellenőrizendők.
- Az aktuális karbantartási szabályokat és az adatok leírását a `docs/SPECIALIST_DATA.md` tartalmazza.

### Kapcsolódó változtatások (GitHub commitok)
`f9ea7af` → felvétel; `6229733` → profil URL; `156837b` → szintaktikai hibajavítás; `6d24069` → kapacitás; `bbf17d1` → korábbi fotóbetöltés; `f84c6c2` → kettős vezetéknév; `c4316e2` → kezdeti telefonszám-megjelenítés; `719a18a` → saját tárhelyes kép; `cbcc252` → adatlap URL; `acda68b` → CSV telefonadatok; `121c71b` → egységes telefonszám-formátum.

---


## 2026-11-11 – Vezetéknév elejére szűkített keresés

- Felhasználói pontosítás: a találati listát a vezetéknév eleje alapján kell szűkíteni, a keresztnév vagy a név belsejének betűegyezése ne adjon találatot.
- „k” → kizárólag Keul Andrea és Kocka Alexandra; „ke” → Keul Andrea. Andrea, Imre és Krisztina keresztnevekre nem ad névlistát.
- A Dr. előtagot figyelmen kívül hagyja; „p” és „perger” megtalálja Dr. Perger Mónikát. A teljes név vezetéknévtől kezdve továbbra is beírható.
- Az ékezetkezelés és az elírás-javaslat megmarad, az elírást is kizárólag a név elejéhez méri, egyező kezdőbetűvel. A bevezető szöveg vezetéknevet kér.
- Új regressziós ellenőrzés kizárja a képen jelzett keresztnév-találatokat. Az összes meglévő kereső-, ajánlási és mobiltesztet újrafuttatjuk.

## 2026-11-11 – Gépelés közbeni névkeresés

- Probléma: a névkeresés elküldés után futott, az első egyezést választotta, és nem kínált választható találati listát. Az elírt név nem adott megfelelő segítséget.
- Módosítás: az első betűtől helyben szűrt, görgethető névlista, vezeték- és keresztnév szerinti keresés, ékezetek nélküli keresés, több névrészlet és kötőjeles nevek kezelése. Közvetlen egyezés hiányában kisebb elírásokra is javaslatot ad.
- Kiválasztás: kattintás vagy érintés; billentyűzeten fel/le nyilak és Enter. Több találat esetén a program nem választ önállóan. Escape bezárja a listát. Újraindítás törli a keresést.
- Mobil: a nyitott lista mellett a beviteli mező a panelen belül marad.
- Adatok: a szakemberadatok, kapacitások és ajánlási kategóriák nem változtak. „repasy” nem egyezik az aktív adatbázis egyik szakemberével sem; ilyen név nem került hozzáadásra.
- Ellenőrzés: 20 sikeres Playwright-teszt Chromium asztali és mobil emulációban, köztük névszűkítés, elírás, ékezet, kattintás, billentyűzet, nulla találat, újraindítás, mobil elrendezés, vezetett ajánlás és a meglévő kríziság. Ez nem fizikai iPhone/Safari-teszt.
- Visszaállítás: a jelen változtatás előtti éles forrás a `6e9a31f` commitban található. A HTML-t módosító visszaállító commit a main ágon új feltöltést indít.
- CI-környezet: az első futás az Ubuntu csomagtár DNS-hibája miatt a böngésző függőségeinek telepítésénél akadt el; leállítottuk. A javított workflow Ubuntu 24.04-en az előtelepített Google Chrome-ot használja, külön rendszercsomag-telepítés nélkül, ötperces futási korláttal.
- Élesítés: a módosítás pull requestből kerül a main ágra; a meglévő Deploy workflow tölti fel SFTP-n. Az éles változatot feltöltés után külön vissza kell ellenőrizni.

Megjegyzés: a korábbi, különálló #1 PR (kötelező naplózás és általános minőségellenőrzés) a munka kezdetén nyitott, az utolsó futása sikertelen volt. Ezt a változtatást nem vontuk össze vele, és nem tekintjük annak automatizálását befejezettnek.

### Élesítési környezet javítása

A #2 PR összevonása (`39d64ac`) után indult `43038948767` feltöltés az lftp rendszercsomag telepítésénél hibával leállt: az Ubuntu csomagtárainak DNS-feloldása sikertelen volt (exit 100). A külön javítás Ubuntu 24.04-re rögzíti a futtatógépet, és annak előtelepített `sshpass` + OpenSSH `sftp` eszközét használja azonos GitHub SFTP-titkokkal és azonos távoli fájlnévvel. A jelszó környezeti változóban kerül átadásra. Az SFTP batch hibánál leáll; a kapcsolódás és a teljes futás időkorlátot kapott. Nem változik a kiszolgált HTML. Az éles feltöltést és a nyilvános oldal működését ezután újra ellenőrizni kell.

A #3 PR első feltöltési próbája (`43039512104`) már elérte a tárhelyet, de a batch opció sorrendje miatt a jelszavas belépés letiltva maradt. Az OpenSSH elsőként megadott értéket használ; ezért a `-oBatchMode=no` opciónak meg kell előznie a `-b -` opciót. A követő javítás ezt a sorrendet helyesbíti, hitelesítő adat módosítása nélkül.

### Igazolt végeredmény – 2026-11-11

- Keresőjavítás: #2 PR. Feltöltési környezet: #3 és #4 PR.
- Távoli böngészős tesztek: `43038740512`, sikeres; helyben a Chromium és a Chrome futás is 20/20 sikeres.
- Éles SFTP-feltöltés: `43039840527`, sikeres. Élesítési commit: `70d02e2325b006c0b9cb4892bf3c58e0d9b2fc0c`.
- Az élő `ahely_v8.html` a tesztelt forrással egyezik (CRLF és záró whitespace normalizálása után). SHA-256: `251e4ace6b2fbc47e59d93e4f782501d0c9a78ef582a78dad5e1b1cc5bee54c0`.
- Az éles Joomla-oldal iframe-jében Chromium asztali és mobil emulációban sikeres: „k” 14 találat → „ke” 1 találat; „keol” → Keul Andrea kiválasztása; „olah” → Oláh Imre kiválasztása; ismételt keresés; újraindítás.
- A változtatás éles, a feltöltési hozzáférés működik. A korábbi #1 általános minőségkapu PR továbbra is külön, nyitott munka.
