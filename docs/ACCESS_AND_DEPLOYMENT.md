# Hozzáférés és élesítés

Ellenőrizve: 2026-11-11.

- Forrás: https://github.com/ugry65/ahely-chatbot – főág: `main`.
- Fő fájl: `ahely_v8.html`.
- Nyilvános oldal: https://a-hely.com/szakember-kereses – a Joomla oldal iframe-ben tölti be a https://a-hely.com/ahely_v8.html fájlt.
- A GitHub-kapcsolat hozzáfér a tárolóhoz. Ezen a gépen a GitHub CLI (`gh`) az `ugry65` fiókkal be van jelentkezve; a jövőbeli munkák kezdetén a bejelentkezést újra ellenőrizni kell. Hitelesítő adatot nem szabad a naplóba vagy a kódba másolni.
- Az élesítéshez nem kell kiolvasni a tárhely jelszavát: a `.github/workflows/deploy.yml` a GitHubban tárolt SFTP-hozzáférést használja. A main ágra kerülő HTML-módosítás automatikusan elindítja.
- A jelenlegi workflow Ubuntu 24.04-en az előtelepített `sshpass` és OpenSSH `sftp` eszközt használja; nem telepít Ubuntu-csomagokat. Az SFTP batch használatakor a `-oBatchMode=no` opciónak a `-b -` előtt kell állnia a jelszavas belépéshez.
- Korábbi teljes körűen visszaellenőrzött böngészős élesítés: `43039840527`, sikeres (2026-11-11), main commit: `70d02e2`. Az akkori élő HTML egyezett a tesztelt forrással, és az iframe-ben asztali és mobil emulációban a névkereső működött.
- **Újabb adatmódosítások:** 2026-11-11-én Helga szakemberrekordja, profilképe, keresési besorolásai és kapacitása, a két-tagú vezetéknevek keresése, 27 telefonszám és egységes formátum. Utolsó élesítési ellenőrzés az adatverzióra: Deploy run `43055686934`, `121c71ba`, sikeres. Ez SFTP-telepítésre vonatkozó státusz, nem teljes körű, új böngészős ellenőrzés.
- Adatkarbantartás, hiányzó telefonszámok és források: [`SPECIALIST_DATA.md`](SPECIALIST_DATA.md). Változástörténet: [`CHANGELOG.md`](CHANGELOG.md).
- Ha a helyi Git hitelesítője várakozik, a már bejelentkezett GitHub CLI használható a parancshoz kötött `git -c credential.helper= -c 'credential.helper=!gh auth git-credential' push` beállítással. Ez nem írja át a gép általános hitelesítési beállításait.

## Munkamenet

1. Frissítsd a forrást, ellenőrizd a nyitott PR-eket és az éles HTML-t.
2. Külön ágon készítsd el a módosítást, a célzott teszteket és a fejlesztési naplót.
3. Teszt: `npm ci`, első alkalommal `npx playwright install chromium`, majd `npm test`.
   A GitHub Actions az Ubuntu 24.04 gépen előtelepített Chrome-ot használja; a helyi futás a Playwright Chromiumot.
4. Pull request és sikeres automatikus ellenőrzés után vond össze a módosítást a main ággal, ha az aktuális felhasználói felhatalmazás ezt tartalmazza.
5. Várd meg a Deploy workflow eredményét. Töltsd vissza az éles HTML-t, hasonlítsd össze a main változatával, és böngészőben is ellenőrizd a Joomla oldalba ágyazott keresőt.

Az SFTP-feltöltés működése nem bizonyítja a repository ág-védelmét vagy a korábbi #1 PR által tervezett általános minőségkapu működését. Az itt bevezetett névkereső-tesztek külön workflow-ban futnak.
