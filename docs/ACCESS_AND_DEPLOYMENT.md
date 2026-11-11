# Hozzáférés és élesítés

Ellenőrizve: 2026-11-11.

- Forrás: https://github.com/ugry65/ahely-chatbot – főág: `main`.
- Fő fájl: `ahely_v8.html`.
- Nyilvános oldal: https://a-hely.com/szakember-kereses – a Joomla oldal iframe-ben tölti be a https://a-hely.com/ahely_v8.html fájlt.
- A GitHub-kapcsolat hozzáfér a tárolóhoz. Ezen a gépen a GitHub CLI (`gh`) az `ugry65` fiókkal be van jelentkezve; a jövőbeli munkák kezdetén a bejelentkezést újra ellenőrizni kell. Hitelesítő adatot nem szabad a naplóba vagy a kódba másolni.
- Az élesítéshez nem kell kiolvasni a tárhely jelszavát: a `.github/workflows/deploy.yml` a GitHubban tárolt SFTP-hozzáférést használja. A main ágra kerülő HTML-módosítás automatikusan elindítja.
- Az ellenőrzött korábbi feltöltés: `42353139149` GitHub Actions futás, sikeres (2026-11-07).

## Munkamenet

1. Frissítsd a forrást, ellenőrizd a nyitott PR-eket és az éles HTML-t.
2. Külön ágon készítsd el a módosítást, a célzott teszteket és a fejlesztési naplót.
3. Teszt: `npm ci`, első alkalommal `npx playwright install chromium`, majd `npm test`.
4. Pull request és sikeres automatikus ellenőrzés után vond össze a módosítást a main ággal, ha az aktuális felhasználói felhatalmazás ezt tartalmazza.
5. Várd meg a Deploy workflow eredményét. Töltsd vissza az éles HTML-t, hasonlítsd össze a main változatával, és böngészőben is ellenőrizd a Joomla oldalba ágyazott keresőt.

Az SFTP-feltöltés működése nem bizonyítja a repository ág-védelmét vagy a korábbi #1 PR által tervezett általános minőségkapu működését. Az itt bevezetett névkereső-tesztek külön workflow-ban futnak.
