<!-- omit in toc -->

# Szerveroldali webprogramozás - Node.js zárthelyi

Tartalom:
- [Szerveroldali webprogramozás - Node.js pót/javító zárthelyi](#szerveroldali-webprogramozás---nodejs-pótjavító-zárthelyi)
  - [Tudnivalók](#tudnivalók)
  - [Hasznos hivatkozások](#hasznos-hivatkozások)
  - [Kezdőcsomag segédlet](#kezdőcsomag-segédlet)
  - [Feladatok](#feladatok)
    - [I. rész: Sequelize (10 pont, min. 4 pont elérése szükséges!)](#i-rész-sequelize-10-pont-min-4-pont-elérése-szükséges)
      - [1. feladat: Modellek és kapcsolatok (5 pont)](#1-feladat-modellek-és-kapcsolatok-5-pont)
      - [2. feladat: Seeder (5 pont)](#2-feladat-seeder-5-pont)
    - [II. rész: REST API (20 pont, min. 8 pont elérése szükséges!)](#ii-rész-rest-api-20-pont-min-8-pont-elérése-szükséges)
      - [3. feladat: `GET /players` (4 pont)](#3-feladat-get-players-4-pont)
      - [4. feladat: `GET /players/:id` (3 pont)](#4-feladat-get-playersid-3-pont)
      - [5. feladat: `POST /players` (4 pont)](#5-feladat-post-players-4-pont)
      - [6. feladat: `POST /login` (2 pont)](#6-feladat-post-login-2-pont)
      - [7. feladat: `GET /my-team` (3 pont)](#7-feladat-get-my-team-3-pont)
      - [8. feladat: `GET /stats` (4 pont)](#8-feladat-get-stats-4-pont)
    - [III. rész: GraphQL (20 pont, min. 8 pont elérése szükséges!)](#iii-rész-graphql-20-pont-min-8-pont-elérése-szükséges)
      - [9. feladat: `Query.players` (2 pont)](#9-feladat-queryplayers-2-pont)
      - [10. feladat: `Query.player` (2 pont)](#10-feladat-queryplayer-2-pont)
      - [11. feladat: `Player.teamName` (2 pont)](#11-feladat-playerteamname-2-pont)
      - [12. feladat: `Player.scores` (2 pont)](#12-feladat-playerscores-2-pont)
      - [13. feladat: `Mutation.createResult` (6 pont)](#13-feladat-mutationcreateresult-6-pont)
      - [14. feladat: `Query.intervals` (3 pont)](#14-feladat-queryintervals-3-pont)
      - [15. feladat: `Mutation.setPlayerActive` (3 pont)](#15-feladat-mutationsetplayeractive-3-pont)


## Tudnivalók

<details>
<summary>Tudnivalók megjelenítése</summary>

- A zárthelyi megoldására **180 perc** áll rendelkezésre, amely a kidolgozás mellett **magába foglalja** a kötelező
    nyilatkozat értelmezésére és kitöltésére, a feladatok elolvasására, az anyagok letöltésére, összecsomagolására és feltöltésére szánt időt is.
- A kidolgozást a Canvas rendszeren keresztül kell beadni egyetlen **.zip** állományként. **A rendszer határidő után azonnal lezár!**
- A beadást és nyilatkozat kitöltését megkönnyítendő létrehoztunk egy parancsot a kezdőcsomagban, amely `npm run zip`
    hívásával futtatható. Igyekeztünk a legjobb tudásunk szerint elkészíteni csomagolót, de beadás előtt mindenképpen
    ellenőrizd a `zipfiles` mappában létrejött állomány tartalmát! **A helyes és hiánytalan feltöltés ellenőrzése a hallgató feladata, az ebből fakadó hibákért felelősséget nem vállalunk!**
- A `node_modules` könyvtár beadása **TILOS!**
- A megfelelően kitöltött `statement.txt` (nyilatkozat) nélküli megoldásokat **nem értékeljük**. Ha esetleg a
    nyilatkozat kimaradt vagy hibás, utólag Canvas hozzászólásban pótolható.
- A feladatok megoldásához **bármilyen segédanyag használható** (pl. dokumentáció, előadás, órai anyag, cheat sheet,
    stb.), viszont a **zárthelyi időtartamában emberi segítség** (pl. szinkron, aszinkron, chat, fórum, stb.)
    **és mesterséges intelligencia** (pl. ChatGPT, Bing AI, GitHub Copilot, Tabnine, stb.) igénybe vétele tilos! Aki vét a felsorolt feltétélek ellen, az a tárgyból **elégtelen** érdemjegyet kap, illetve **elveszíti a pót/javító ZH lehetőségét!**
- A feladatokat **Node.js** környezetben, **JavaScript** nyelven kell megoldani, a **tantárgy keretein belül tanult**
    technológiák használatával és a biztosított **kezdőcsomagból kiindulva**!

</details>

## Hasznos hivatkozások

<details>
<summary>Hasznos hivatkozások megjelenítése</summary>

- Dokumentációk
    - [Sequelize dokumentáció](https://sequelize.org/master/)
    - [Model querying - basics](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)
    - [Model querying - finders](https://sequelize.org/docs/v6/core-concepts/model-querying-finders/)
    - [Sequelize asszociációk](https://github.com/szerveroldali/leirasok/blob/main/SequelizeAsszociaciok.md)
        (tantárgyi leírás)
    - [GraphQL dokumentáció](https://graphql.org/learn/)
    - [GraphQL skalárok (kezdőcsomag tartalmazza)](https://www.graphql-scalars.dev/docs)
    - [Fastify dokumentáció](https://www.fastify.io/docs/latest/)
    - [AJV (sémavalidátor) dokumentáció](https://ajv.js.org/)
- Javasolt fejlesztőeszközök:
    - [**SQLite Viewer (VS Code kiegészítő)**](https://marketplace.visualstudio.com/items?itemName=qwtel.sqlite-viewer)
    - [**Thunder Client (VS Code kiegészítő)**](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)
    - [DB Browser for SQLite](https://sqlitebrowser.org/)
    - [Firecamp (Chrome kiegészítő)](https://chrome.google.com/webstore/detail/firecamp-a-campsite-for-d/eajaahbjpnhghjcdaclbkeamlkepinbl)
    - [Postman](https://www.postman.com/)
</details>

## Kezdőcsomag segédlet

<details>
<summary>Kezdőcsomag segédlet megjelenítése</summary>

A zárthelyihez kezdőcsomagot biztosítunk, amelynek használata **kötelező!** A csomagot GitHub-ról lehet letölteni, a
függőségek telepítése után (`npm i`) kezdhető meg a fejlesztés.

- A kezdőcsomag elérhető ebben a GitHub repository-ban:
    - https://github.com/szerveroldali/zh_kezdocsomag
    - vagy: [Közvetlen letöltési link](https://github.com/szerveroldali/zh_kezdocsomag/archive/refs/heads/main.zip)
        _(.zip fájl)_
- Hasznos parancsok:
    - `npm run db` - adatbázis migrációk futtatása (üres adatbázisból indulva) és seedelés
    - `npm run dev` - `server.js` futtatása watch módban (változtatásra a szerver újraindul)
    - `npm run zip` - zárthelyi becsomagolása
    - `npm run test` - automatikus tesztelő frissítése és futtatása
    - `npm run oldtest` - automatikus tesztelő futtatása frissítés keresése nélkül
- Automatikus tesztelőről:
    - **FONTOS! Nem az a feladat, hogy addig futtasd a tesztelőt, amíg minden át nem megy; hanem az, hogy a dolgozatot
        oldd meg a legjobb tudásod szerint! Ehhez a tesztelő csak egy segédlet, ami lehetőség szerint egy gyors
        visszajelzést ad a munkádról azáltal, hogy leteszteli a főbb eseteket, és ha azokon átmegy a megoldásod, akkor
        _valószínűleg_ jó.**
    - A tesztelő használata nem kötelező!
    - A tesztelő által adott eredmények csak tájékoztató jellegűek, melyektől a végleges értékelés **pozitív és negatív irányba is** eltérhet!
    - Használat módja:
        - `npm run test` - frissítés és minden feladat tesztelése
        - pl. `npm run test 3 5` - frissítés és csak a 3. és 5. feladat tesztelése
        -  `npm run oldtest` - frissítés nélkül minden feladat tesztelése

</details>

## Feladatok

Készíts _Node.js_ környezetben, _JavaScript_ nyelv használatával egy **REST API**-t és **GraphQL API**-t az alábbi
pontoknak megfelelően! A tantárgy gyakorlati tematikájához illeszkedve adatbázisként _SQLite3_, ORM-ként _Sequelize_,
kiszolgálóként pedig _Fastify_ keretrendszer használata **kötelező!**
(A zárthelyihez kiadott [kezdőcsomagban](https://github.com/szerveroldali/zh_kezdocsomag) ezen csomagok már
inicializálva vannak.)

### I. rész: Sequelize (10 pont, min. 4 pont elérése szükséges!)

#### 1. feladat: Modellek és kapcsolatok (5 pont)

Hozd létre az alábbi modelleket Sequelize CLI használatával!

> Az `id`, `createdAt` és `updatedAt` mezők a alapértelmezetten létrejönnek, így ezeket a feladat bővebben nem fejti ki.
> Alapesetben egyik mező értéke sem lehet `null`, hacsak nem adtunk külön `nullable` kikötést! Tehát alapértelmezés
> szerint a migráció minden mezőjére
>
> ```js
> allowNull: false;
> ```
>
> van érvényben, ahol a feladat ettől eltérően nem jelzi.

- `Team`: a csapatokat reprezentáló modell
    - `id`
    - `name`: a csapat teljes neve (string, unique)
    - `createdAt`
    - `updatedAt`
- `Player`: a játékosokat reprezentáló modell
    - `id`
    - `name`: a játékos teljes neve (string)
    - `email`: a játékos e-mail címe (string, unique)
    - `age`: a játékos életkora (integer)
    - `active`: a játékos jelenleg aktív-e (boolean, alapértelmezetten igaz)
    - `createdAt`
    - `updatedAt`
- `Result`: az elért eredményeket reprezentáló modell
    - `id`
    - `score`: az elért pontszám (integer, min: 0, max: 999999)
    - `verifiedAt`: a pontszám hitelesítésének időpontja (datetime, nullable)
    - `createdAt`
    - `updatedAt`

A fenti modellek közötti asszociációk (kapcsolatok):

- a játékos csapata: `Team` 1:N `Player` (idegen kulcs: `TeamId`)
- az eredményt elérő játékos: `Player` 1:N `Result` (idegen kulcs: `PlayerId`)

> **Figyelem!** Az egyes mezőknél zárójelben megadott megkötéseket (pl. unique, nullable, alapértelmezett érték, min-max, stb.) és a hivatkozási épségeket biztosítani kell az **adatbáziskezelő-rendszer** szintjén a migráció megfelelő módosításával!

> **Figyelem!** A zárójelesen megadott idegen kulcs elnevezésekre ügyelj! A teljes pontszámot csak akkor kapod meg, ha mindenben megfelelsz a feladatnak; illetve az automatikus tesztelő is ezeket a neveket várja, tehát ha nem tartod be, nem fog működni a tesztelő!

#### 2. feladat: Seeder (5 pont)

Hozz létre egy seedert, melynek segítségével feltölthető az adatbázis mintaadatokkal!

A megoldás akkor számít teljes értékűnek (tehát csak akkor jár a teljes pontszám),
ha az alábbiak **mindegyike** teljesül:

1. A seeder mindegyik modellből generál észszerű számban.
2. A generált modellek minden esetet helyesen lefednek (pl. egy nullable mező néhol ki van töltve adattal, néhol pedig `null` értékű; logikai mező változatosan igaz vagy hamis; egyedi értékek esetén figyelsz az egyediség biztosítására, stb.).
3. A kapcsolatok (relációk / asszociációk) is minden esetben létrejönnek a modellek között. Tartozzon minden csapathoz legalább három játékos, illetve minden játékosnak legyen legalább három eredménye!

A seedert az automatikus tesztelő nem tudja értékelni, minden esetben a gyakorlatvezető fogja kézzel pontozni.

> **Tipp:** Ne fordíts túl sok időt a seederre, hogy biztosan maradjon időd a többi feladatra is! Nem az a lényeg, hogy megtaláld a legszebb adatot generáló függvényt, hanem felelj meg a típusoknak és megkötéseknek, így pl. egy macska neve nyugodtan lehet _Felix the Walking Overlord of Furniture and Food Destruction_ helyett _a63ed12f_ is.

### II. rész: REST API (20 pont, min. 8 pont elérése szükséges!)

#### 3. feladat: `GET /players` (4 pont)

Lekéri az aktív játékosok azonosítóját, nevét és életkorát. A válasz legyen név szerint növekvő sorrendbe rendezett, illetve csak a felsorolt mezőket tartalmazza!

- Mintakérés: `GET http://localhost:4000/players`
- Válasz helyes kérés esetén: `200 OK`
```json
[
  {
    "id": 38,
    "name": "Andre Gislason PhD",
    "age": 89
  },
  {
    "id": 1,
    "name": "Cameron Fritsch",
    "age": 20
  }
]
```

#### 4. feladat: `GET /players/:id` (3 pont)

Visszaadja a megadott azonosítójú játékos adatait. A válasz a tárolt adatokon túl azt is megadja a `personalBest` mezőben, hogy melyik az adott játékoshoz tartozó legnagyobb pontszám.

- Mintakérés: `GET http://localhost:4000/players/4`
- Válasz, ha az `id` paraméter hiányzik vagy nem egész szám: `400 BAD REQUEST`
- Válasz, ha a megadott `id`-vel nem létezik a játékos: `404 NOT FOUND`
- Válasz helyes kérés esetén: `200 OK`
```json
{
  "id": 4,
  "name": "Claudia Ward",
  "email": "Frederick_Gutmann50@hotmail.com",
  "age": 42,
  "active": true,
  "TeamId": 1,
  "createdAt": "2024-05-29T16:53:25.594Z",
  "updatedAt": "2024-05-29T16:53:25.594Z",
  "personalBest": 861095
}
```

#### 5. feladat: `POST /players` (4 pont)

A végpont létrehoz egy új **játékost** a kérés törzsében (body) megadott adatokkal. A törzsnek minden kötelezően kitöltendő mezőt tartalmaznia kell; viszont az `active` mező hiányozhat, amely esetben a visszaadott objektum és az adatbázis ezen mezője logikai igaz értéket kell kapjon.

_(A valóságban nyilván egy nagyobb jogosultságú, hitelesített felhasználó hozna létre játékost, de a zárthelyi ezen feladatánál egyelőre nem szükséges ezzel foglalkozni, bárki meghívhatja a végpontot.)_

- Mintakérés: `POST http://localhost:4000/players`
```json
{
  "name": "Buzz Lightyear",
  "email": "bly@nasa.gov.us",
  "age": 33,
  "TeamId": 1
}
```
- Válasz, ha a kérés törzse (body) hiányos vagy típushibás adatot tartalmaz: `400 BAD REQUEST`
- Válasz, ha a megadott `TeamId`-vel nem létezik csapat: `404 NOT FOUND`
- Válasz, ha a csapat megfelelő, de ezzel az e-mail címmel már létezik játékos: `409 CONFLICT`
- Válasz helyes kérés esetén: `201 CREATED`
```json
{
  "id": 47,
  "name": "Buzz Lightyear",
  "email": "bly@nasa.gov.us",
  "age": 33,
  "TeamId": 1,
  "active": true,
  "updatedAt": "2024-05-29T17:06:38.279Z",
  "createdAt": "2024-05-29T17:06:38.279Z"
}
```

#### 6. feladat: `POST /login` (2 pont)

**Bejelentkező végpont.** Az egyszerűség kedvéért nincs jelszókezelés, csak egy létező **játékos** e-mail címét kell felküldeni a kérés törzsében (body). Ha a megadott e-mail címmel létezik fiók az adatbázisban, azt sikeres bejelentkezésnek vesszük és kiállítjuk a tokent. Ne felejtsd el a payload-ba a játékos adatait elhelyezni!

_(Technikai részletek: A token aláírásához `HS256` algoritmust használj `secret` titkosító kulccsal! A kiadott kezdőcsomag alapbeállításon erre a működésre van konfigurálva, de ha szükségessé válna a [tokent ellenőrizni](https://jwt.io/), akkor hasznos ezekről tudni.)_

- Mintakérés: `POST http://localhost:4000/login`
```json
{
  "email": "gipsz.jakab@szerveroldali.hu"
}
```
- Válasz, ha a kérés hibás: `400 BAD REQUEST`
- Válasz, ha a megadott e-mail címmel nem létezik játékos: `404 NOT FOUND`
- Válasz helyes kérés esetén: `200 OK`
```json
{
  "token": "ey..."
}
```

#### 7. feladat: `GET /my-team` (3 pont)

**Hitelesített végpont!** Lekéri annak a csapatnak az adatait, amelynek tagja a bejelentkezett játékos. A csapat alapvető adatai mellett a válasz válaszba helyezzük el az összes csapattagot tartalmazó `Players` mezőt is! Távolítsuk el a játékosok adatai közül a feleslegesen ismétlődő `TeamId` mezőt, viszont minden más mezőt tartsunk meg!

Emlékeztető! A hitelesített végpontokra a következő fejléccel kell kérést küldeni:
```
Authorization: Bearer <token>
```

- Mintakérés: `GET http://localhost:4000/my-team`
- Válasz hitelesítetlen kérés esetén: `401 UNAUTHORIZED`
- Válasz helyes kérés esetén: `200 OK`
```json
{
  "id": 1,
  "name": "cado degenero nostrum",
  "createdAt": "2024-05-29T16:53:25.581Z",
  "updatedAt": "2024-05-29T16:53:25.581Z",
  "Players": [
    {
      "id": 1,
      "name": "Cameron Fritsch",
      "email": "Leonie_OKon36@yahoo.com",
      "age": 20,
      "active": true,
      "createdAt": "2024-05-29T16:53:25.594Z",
      "updatedAt": "2024-05-29T16:53:25.594Z"
    },
    {
      "id": 2,
      "name": "Elijah Dare",
      "email": "Dax.OConner@yahoo.com",
      "age": 77,
      "active": false,
      "createdAt": "2024-05-29T16:53:25.594Z",
      "updatedAt": "2024-05-29T16:53:25.594Z"
    }
  ]
}
```

#### 8. feladat: `GET /stats` (4 pont)

Legyen lehetőség egy végponton lekérni a következő statisztikákat tartalmazó objektumot:
- `totalActivePlayers`: összesen hány aktív játékos van
- `maxActivePlayers`: mennyi az egy csapatba tartozó aktív játékosok maximális száma
- `highestVerifiedScore`: a legnagyobb megerősített (`verifiedAt` mező nem `null` értékű) pontszám
- `highestScoringTeam`: annak a csapatnak a neve, amihez a legjobb megerősített pontszámot elérő játékos tartozik

A fenti négy mező egymástól függetlenül is kiszámítható egy-egy lekérdezéssel, de készíthető akár egyetlen minden adatot lekérő lekérdezés is, amelyből JavaScript nyelvi elemekkel állítható elő az eredmény.

- Mintakérés: `GET http://localhost:4000/stats`
- Válasz helyes kérés esetén: `200 OK`
```json
{
  "totalActivePlayers": 25,
  "maxActivePlayers": 12,
  "highestVerifiedScore": 999560,
  "highestScoringTeam": "hodie mihi crac tibi"
}
```


### III. rész: GraphQL (20 pont, min. 8 pont elérése szükséges!)

A GraphQL feladatokhoz használd a következő sémát:

```graphql
type Query {
  helloWorld: String
  helloName(name: String!): String
  players(activeOnly: Boolean!): [Player]!
  player(id: ID!): Player
  intervals: [Interval]!
}

type Mutation {
  createResult(playerEmail: String!, score: Int!, verified: Boolean!): String!
  setPlayerActive(id: ID!, active: Boolean!): Player
}

type Player {
  id: ID!
  name: String!
  email: String!
  age: Int!
  active: Boolean!
  TeamId: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  teamName: String!
  scores: [Int]!
}

type Interval {
  lower: Int!
  upper: Int!
  count: Int!
}
```

#### 9. feladat: `Query.players` (2 pont)

A játékosok adatmezőinek lekérése. Amennyiben az `activeOnly` paraméter igaz, akkor csak az aktív játékosokat kell megmutatni.

Mintakérés:
```graphql
query {
  players (activeOnly: true) {
    id
    name
    email
    age
    active
    TeamId
    createdAt
    updatedAt
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "players": [
      {
        "id": "1",
        "name": "Cameron Fritsch",
        "email": "Leonie_OKon36@yahoo.com",
        "age": 20,
        "active": true,
        "TeamId": "1",
        "createdAt": "2024-05-29T16:53:25.594Z",
        "updatedAt": "2024-05-29T16:53:25.594Z"
      },
      {
        "id": "4",
        "name": "Claudia Ward",
        "email": "Frederick_Gutmann50@hotmail.com",
        "age": 42,
        "active": true,
        "TeamId": "1",
        "createdAt": "2024-05-29T16:53:25.594Z",
        "updatedAt": "2024-05-29T16:53:25.594Z"
      }
    ]
  }
}
```

#### 10. feladat: `Query.player` (2 pont)

Lekéri egy adott játékos adatmezőit azonosító alapján. Ha nem létezik ilyen azonosítóval játékos, akkor `null` értéket adjon vissza!

Mintakérés:
```graphql
query {
  player (id: 4) {
    id
    name
    email
    age
    active
    TeamId
    createdAt
    updatedAt
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "player": {
      "id": "4",
      "name": "Claudia Ward",
      "email": "Frederick_Gutmann50@hotmail.com",
      "age": 42,
      "active": true,
      "TeamId": "1",
      "createdAt": "2024-05-29T16:53:25.594Z",
      "updatedAt": "2024-05-30T19:37:22.136Z"
    }
  }
}
```

#### 11. feladat: `Player.teamName` (2 pont)

Legyen lehetőség a játékosok felől indulva lekérdezni annak a csapatnak a nevét, amelyhez tartozik!

Mintakérés:
```graphql
query {
  players (activeOnly: false) {
    id
    teamName
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "players": [
      {
        "id": "1",
        "teamName": "cado degenero nostrum"
      },
      {
        "id": "2",
        "teamName": "talio velociter cursim"
      }
    ]
  }
}
```

#### 12. feladat: `Player.scores` (2 pont)

Legyen lehetőség a játékosok felől indulva lekérdezni az adott játékos minden pontszámát tartalmazó számtömböt! A tömb elemeinek sorrendje nem számít.

Mintakérés:
```graphql
query {
  players (activeOnly: true) {
    id
    scores
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "players": [
      {
        "id": "1",
        "scores": [786386, 950577, 930989, 948215, 214405, 250487]
      },
      {
        "id": "4",
        "scores": [765371, 666718, 412820, 861095]
      }
    ]
  }
}
```

#### 13. feladat: `Mutation.createResult` (6 pont)

Ezzel a mutációval legyen lehetőség a megadott e-mail címmel rendelkező játékoshoz új eredményt felvenni. Amennyiben a `verified` paraméter értéke hamis, akkor az adatbázisban legyen a `verifiedAt` értéke `null`; különben pedig a jelenlegi dátum és idő kerüljön be!

Ha a kérés hibával zárul, akkor a következő szövegeket egyikét add vissza eredményként:
1. `PLAYER NOT FOUND` - ha nem található ilyen e-mail címmel játékos
1. `INVALID SCORE` - ha a pontszám nem 0 és 999999 közé (határokat beleértve) esik

Amennyiben a mutáció sikeres, akkor a létrejött `Result` entitás azonosítóját (ID) add vissza!

> **Figyelem!** A tesztelő csak akkor fogadja el a megoldást, ha **pontosan** ezeket a szövegeket adod vissza!

Mintakérés:
```graphql
mutation {
  createResult (
    playerEmail: "example@player.js",
    score: 80000,
    verified: true
  )
}
```

Mintaválasz:
```json
{
  "data": {
    "createResult": "42"
  }
}
```

#### 14. feladat: `Query.intervals` (3 pont)

Egy `Interval` típusú elemekből álló tömböt ad vissza, amely megmutatja, hogy hány megerősített pontszám esik az intervallum alsó és felső határa közé (határokat is beleértve). Az intervallumokat neked kell kigenerálni úgy, hogy az első intervallum alsó határa 0, felső határa 9999; a második határai 10000 és 19999; és így tovább egészen a 999999-es felső határig.

Mintakérés:
```graphql
query {
  intervals {
    lower
    upper
    count
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "intervals": [
      {
        "lower": 0,
        "upper": 9999,
        "count": 3
      },
      {
        "lower": 10000,
        "upper": 19999,
        "count": 2
      },
      ...,
      {
        "lower": 980000,
        "upper": 989999,
        "count": 4
      },
      {
        "lower": 990000,
        "upper": 999999,
        "count": 1
      }
    ]
  }
}
```

#### 15. feladat: `Mutation.setPlayerActive` (3 pont)

Ezzel a mutációval legyen lehetőség a megadott azonosítójú játékos `active` mezőjét beállítani. A válasz legyen `null`, ha nem létezik ilyen azonosítójú játékos; különben pedig a megváltozott entitást add vissza!


Mintakérés:
```graphql
mutation {
  setPlayerActive(id: 4, active: false) {
    id
    name
    email
    age
    active
    createdAt
    updatedAt
  }
}
```

Mintaválasz:
```json
{
  "data": {
    "setPlayerActive": {
      "id": "4",
      "name": "Claudia Ward",
      "email": "Frederick_Gutmann50@hotmail.com",
      "age": 42,
      "active": false,
      "createdAt": "2024-05-29T16:53:25.594Z",
      "updatedAt": "2024-05-30T19:37:22.136Z"
    }
  }
}
```
