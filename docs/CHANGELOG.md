## 2026-11-11 – Szerveroldali statisztika biztonságos, csak olvasó ellenőrzésének előkészítése

- Cél: a GitHub Actions meglévő SFTP hitelesítésével az éles stats.php és log.php szerkezetének biztonságos ellenőrzése, a forráskód vagy titkok nyilvánosságra hozatala nélkül.
- Kiinduló SHA: main 80084c1d24e79722cb9f5b57186cd8d577df0b47.
- Érintett fájlok: .github/workflows/inspect-stats.yml, scripts/inspect_stats_structure.py, docs/CHANGELOG.md.
- Biztonság: nyilvános repository miatt a szerveroldali fájlok nem kerülhetnek logba, artifactba vagy commitba. A workflow kizárólag lokálisan olvas és strukturális igen/nem eredményeket közöl.
- Teszt: Actions futás és SFTP letöltés még nem igazolt.
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
