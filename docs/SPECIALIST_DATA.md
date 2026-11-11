# Szakemberadatok – működés és karbantartás

Utolsó felülvizsgálat: 2026-11-11.

## Hol találhatók az adatok?

- A chatbot forrása a GitHub `ugry65/ahely-chatbot` projekt `ahely_v8.html` fájlja.
- A `SP` JavaScript-tömb egy rekordja egy szakember. Legfontosabb mezők: `id` (Joomla-azonosító), `n` (név), `a` (URL-slug), `r` (titulus), `s` (korosztály), `g` (nem), `t` (szakembertípus), `bio`, `miben`, `img`, `phone`, `prio`; vegyes tevékenységnél `coaching:true`.
- A profil URL-je programozottan: `https://a-hely.com/ai/<id>-<slug>`. A kép abszolút A-Hely-URL; a képfájl közvetlen címe szükséges, a Joomla `#joomlaImage://...` utótag nem része a kép tényleges URL-jének.
- A `KATEGORIA_MAP` kategóriákhoz tartozó szakember-ID-k alapján ajánl a vezetett kereső. Az életkori, végzettségi és nem szerinti korlátozásokat nem szabad felülírni. A `SZABAD_KAPACITAS` tömb tartalmazza a jelenleg szabad szakemberek ID-jait; csak tényleges felhasználói információ alapján módosítsuk.

## Telefonszámok

- A telefonszámok egyszer ellenőrzött adatforrásból kerülnek a szakember rekord `phone` mezőjébe, **nem** futás közbeni weboldal-kaparásból.
- Adatforrás ehhez a feltöltéshez: a felhasználó által átadott Joomla-export, `wj0gg_spmedical_specialists.csv` (2026-11-11). A CSV-t nem másoltuk be a GitHubba; a kiválasztott telefonadatok a `SP` tömbben vannak.
- 2026-11-11 állapot: 31 szakemberből 27 rendelkezik telefonszámmal; a többi hiányzóként kezelendő.
- A kijelzés szabványa magyar mobiloknál: `+36 XX XXX XXXX`, például `+36 30 357 8003`. A kattintható hívási link: `tel:+36303578003` (szóköz nélkül). A kártyán a telefonszám a titulus alatt van.
- Csak valós, az adott kollégához tartozó számot szabad rögzíteni. Több vagy nem egyértelmű szám esetén ellenőrzés szükséges; e-mail-címet nem szabad telefonszámként beállítani.
- Ha nincs hiteles szám, a `phone` mező maradjon hiányzó, a kártyán nem jelenik meg telefonszám. Ne helyettesítsük központi vagy becsült számmal.

### Hiányzó számok – pótlásra várnak

| ID | Szakember |
|---:|---|
| 15 | Spák Brigitta |
| 28 | Szász Linda |
| 39 | Czimmerman Edit |
| 50 | Sipos-Bodor Anna |

Amikor megérkeznek a számok, ellenőrizni kell a szakember–szám megfeleltetést, az egységes alakot, a `tel:` linket, a felületi megjelenést, és frissíteni ezt a táblázatot.

## Géczi-Répássy Helga – referencia rekord

- ID: `60`, név: `Géczi-Répássy Helga`.
- Korcsoport: felnőttek **18 éves kortól**.
- Titulus a chatbotban: `Tanácsadó szakpszichológus, coach`. A további besorolásnál a `coaching:true` támogatja a coaching szűrőt.
- Pszichológiai témák: szorongás; stressz/kiégés; párkapcsolat/család; szülő-gyermek kapcsolat; szülői szerep/nevelés; önismeret/élethelyzet; beilleszkedési nehézségek.
- Coaching/tanácsadás: karrier/karrierváltás; célkeresés/iránykeresés; célkitűzés/célmegvalósítás; vezetők támogatása; munka-magánélet egyensúly; teljesítmény/motiváció.
- Profil: `https://a-hely.com/ai/60-geczi-repassy-helga`.
- Profilkép: `https://a-hely.com/images/repasi%20helga%20540.png`.
- Telefon: `+36 30 357 8003`.
- Szabad kapacitással rendelkezik (ID 60 a `SZABAD_KAPACITAS` listában).

## Névkeresési viselkedés

- Gépelés közben szűr; ékezet nélküli bemenet és kisebb elírások támogatottak.
- Csak a **vezetéknév eleje** vagy kötőjeles kettős vezetéknév esetén **bármely vezetéknév-tag eleje** kereshető. Példák: `Géczi`, `Répássy`, `repassy` → Helga; `Sipos`, `Bodor` → Sipos-Bodor Anna.
- Önálló keresztnév (például `Helga`, `Andrea`) nem ad találatot. Dr. előtagot a kereső figyelmen kívül hagyja.
- A felhasználó választ a javaslatok közül; több találatból nem dönt automatikusan.

## Biztonságos változtatási folyamat

1. Olvasd vissza a `main` aktuális forrását, azonosítsd az érintett szakembert ID és név szerint.
2. A név, korhatár, kompetenciák, kapacitás, telefonszám, fotó és profillink módosításához kérj/használj konkrét, ellenőrizhető adatot. Ne következtess szabad kapacitásra.
3. Külön munkakönyvtárban vagy fejlesztési ágon végezd a változtatást; ellenőrizd, hogy a `SP` tömb szintaktikailag helyes (rekordok között vessző), minden ID egyedi, minden `KATEGORIA_MAP`-ID létezik, és a `phone` formátuma helyes.
4. Futtasd a regressziós teszteket (`npm ci`, `npm test`), különösen a névkeresést, a korosztály-szűrést, a kapacitás-jelölést, a telefonszámot és a képet. Az offline tesztben a külső képfájl éles elérhetősége nem feltétlenül ellenőrzött.
5. A változtatást és ellenőrzést rögzítsd a `docs/CHANGELOG.md`-ben. Frissítsd ezt az adatdokumentációt, ha a nyilvántartás vagy a hiányzó számok listája megváltozik.
6. Ellenőrzött merge/main-commit után nézd meg a Deploy workflow eredményét. A sikeres SFTP-telepítés **nem** helyettesíti a nyilvános `https://a-hely.com/szakember-kereses` oldal valódi böngészős ellenőrzését.

## Ismert korlátok

- A telefonok CSV-exportból kerültek be; a számok jelenlegi helyességét későbbi adatfrissítéskor az érintett kollégákkal vagy adatlapjaikkal ellenőrizni kell.
- A profilfotó külső hálózatról betöltött, de saját A-Hely tárhelyes URL. A fájl tényleges HTTP-elérhetőségét és böngészős megjelenését szükség esetén külön tesztelni kell.
- A kód és a regressziós teszt mentése nem állítja önmagában, hogy az összes 31 kártya az éles Joomla-oldalon manuálisan végig lett nézve.
