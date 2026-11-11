# Fejlesztési napló

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
