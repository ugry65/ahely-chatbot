# AI átadás – A Hely chatbot

Közös szabályzat: https://docs.google.com/document/d/1eDwhP0dGtUUowuvDcMBolIk1mZWbIKJe3dgoHmXZlRg/edit
Projekt belépési pont: https://docs.google.com/document/d/1L7x1WFM6bUQk8pGj8csnnV6C8Tgqr398Q_fjKm_ER84/edit

## Minden AI számára kötelező
1. Olvasd el a Drive projekt 00–03 dokumentumait, a jelen CHANGELOG-ot és a legfrissebb GitHub main állapotot.
2. Minden változtatás külön branch + PR. Ugyanabban a PR-ben legyen a naplóbejegyzés.
3. A quality CI ellenőrzésnek sikeresnek kell lennie; main ruleset és required checks szükséges a valódi kikényszerítéshez.
4. Rutin módosítások sikeres ellenőrzés után automatikusan élesíthetők, de a kritikus üzleti, szakemberadat-, adatvédelmi vagy destruktív módosításokhoz felhasználói döntés kell.
5. Élesítés után frissítsd a Drive státuszt és naplót; ha a Drive szinkron nem sikerül, ezt dokumentáld.
6. Titkokat, jelszavakat, tokeneket, érzékeny felhasználói adatokat ne írj a naplóba.

## Jelenleg kötelező chatbot-invariánsok
31 SP rekord, egyedi ID-k; tiltott 23, 30, 37; coaching kulcsok kizárólag [9]; ID 9 más kategóriában nem szerepelhet; SZABAD_KAPACITAS [8,9,15,41,50,53]. Minden fejlesztés előtt a mainben újra ellenőrizni.

## Bevezetési korlát
A GitHub ruleset admin hozzáférés nélkül nem állítható be a jelenlegi kapcsolattal. A quality workflow és naplóellenőrzés PR-ben készül; addig nem garantált, hogy megkerülhetetlen. A Google Drive automatikus frissítése nincs konfigurálva: külön hitelesítési és biztonsági munka.
