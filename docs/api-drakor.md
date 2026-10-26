Sumber API: https://indocast.site/

example hit : https://indocast.site/api/drakorid/ongoing?page=1

Catatan: Jangan lupa sertakan header x-api-key di setiap request Anda untuk melewati otentikasi API.


Endpoint 1
```
/api/drakorid/ongoing
```
response:
```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "page": 1,
    "total": 30,
    "items": [
      {
        "id": "first-love-again-2026",
        "url": "https://drakorid.co/nonton/first-love-again-2026/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMTAvNzAzLXlheWQwZDRmLmpwZw--/180x200/1.jpg",
        "episode": "Episode  8",
        "title": "First Love Again (2026)"
      },
      {
        "id": "light-the-dark-2026",
        "url": "https://drakorid.co/nonton/light-the-dark-2026/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMTAvMjY2LWIzYXc4ejRmLmpwZw--/180x200/1.jpg",
        "episode": "Episode  3",
        "title": "Light the Dark (2026)"
      },
     .....
     ]
  }
}
```

Endpoint 2:
```
/api/drakorid/trending
```
response:
```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "hari_ini": [
      {
        "rank": 1,
        "id": "take-charge-of-my-heart-2026",
        "url": "https://drakorid.co/nonton/take-charge-of-my-heart-2026/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMTAvMTU0LXRha2VjaGFyZ2VvZm15aGVhcnQtcDEuanBn/180x200/1.jpg",
        "title": "Take Charge of My Heart (2026)"
      },
      {
        "rank": 2,
        "id": "doctor-x-mafia-in-white-2026",
        "url": "https://drakorid.co/nonton/doctor-x-mafia-in-white-2026/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMTAvODMzLXBleG9wMDRmLmpwZw--/180x200/1.jpg",
        "title": "Doctor X: Mafia in White (2026)"
      },
      {
        "rank": 3,
        "id": "the-lament-of-autumn-2026",
        "url": "https://drakorid.co/nonton/the-lament-of-autumn-2026/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMTAvNzkzLWtucDJyajNmLmpwZw--/180x200/1.jpg",
        "title": "The Lament of Autumn (2026)"
      },
      ...
    ],
    "minggu_ini": [
      {
        "rank": 1,
        "id": "take-charge-of-my-heart-2026",
        "url": "https://drakorid.co/nonton/take-charge-of-my-heart-2026/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMTAvMTU0LXRha2VjaGFyZ2VvZm15aGVhcnQtcDEuanBn/180x200/1.jpg",
        "title": "Take Charge of My Heart (2026)"
      },
      {
        "rank": 2,
        "id": "doctor-x-mafia-in-white-2026",
        "url": "https://drakorid.co/nonton/doctor-x-mafia-in-white-2026/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMTAvODMzLXBleG9wMDRmLmpwZw--/180x200/1.jpg",
        "title": "Doctor X: Mafia in White (2026)"
      },
      {
        "rank": 3,
        "id": "a-love-other-than-yours-2026",
        "url": "https://drakorid.co/nonton/a-love-other-than-yours-2026/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDkvOTY0LW84enlycTRmLmpwZw--/180x200/1.jpg",
        "title": "A Love Other than Yours (2026)"
      },
      ...
    ],
    "bulan_ini": [
      {
        "rank": 1,
        "id": "a-love-other-than-yours-2026",
        "url": "https://drakorid.co/nonton/a-love-other-than-yours-2026/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDkvOTY0LW84enlycTRmLmpwZw--/180x200/1.jpg",
        "title": "A Love Other than Yours (2026)"
      },
      {
        "rank": 2,
        "id": "the-scandal-2026",
        "url": "https://drakorid.co/nonton/the-scandal-2026/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDkvMi1qanBrcnk0Zi5qcGc-/180x200/1.jpg",
        "title": "The Scandal (2026)"
      },
      {
        "rank": 3,
        "id": "against-the-current-2026",
        "url": "https://drakorid.co/nonton/against-the-current-2026/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDkvODk0LWIzZGIydzRmLmpwZw--/180x200/1.jpg",
        "title": "Against the Current (2026)"
      },
      ...
    ]
  }
}
```

endpoint 3:
```
/api/drakorid/terbaru?page=1
```
response:
```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "page": 1,
    "total": 30,
    "items": [
      {
        "id": "first-love-again-2026",
        "url": "https://drakorid.co/nonton/first-love-again-2026/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMTAvNzAzLXlheWQwZDRmLmpwZw--/180x200/1.jpg",
        "title": "First Love Again (2026)"
      },
      {
        "id": "light-the-dark-2026",
        "url": "https://drakorid.co/nonton/light-the-dark-2026/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMTAvMjY2LWIzYXc4ejRmLmpwZw--/180x200/1.jpg",
        "title": "Light the Dark (2026)"
      },
      {
        "id": "quite-the-girl-2026",
        "url": "https://drakorid.co/nonton/quite-the-girl-2026/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMTAvNDExLWIyOWU1YTkyYWMuanBn/180x200/1.jpg",
        "title": "Quite The Girl (2026)"
      },
      ....
    ]
  }
}
```

endpoint 4:
```
https://indocast.site/api/drakorid/cari?page=1
```

response:
```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "success": true,
    "query": "Love in Disguise",
    "pagination": {
      "currentPage": 1,
      "hasNextPage": true,
      "nextPageUrl": "/api/drakorid/cari?q=Love%20in%20Disguise&page=2"
    },
    "total": 40,
    "items": [
      {
        "id": "love-in-a-secret-2026",
        "slug": "love-in-a-secret-2026",
        "title": "Love in a Secret (2026)",
        "poster": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDMvNjA1LW9xcG13djRmLmpwZw--/180x200/1.jpg"
      },
      {
        "id": "love-in-the-desert-2024",
        "slug": "love-in-the-desert-2024",
        "title": "Love in the Desert (2024)",
        "poster": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9pbWFnZS1kcmFrb3IuYi1jZG4ubmV0L2ltZy8yMDI0LzA5LzQ0OS1nMG16MW40Zi5qcGc-/180x200/1.jpg"
      },
      {
        "id": "love-and-destiny-2019",
        "slug": "love-and-destiny-2019",
        "title": "Love and Destiny (2019)",
        "poster": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9pbWcyLmRyYWtvci5jYy91cGxvYWRzLzIwMTkvMDcvNzA1LWxvdmUtYW5kLWRlc3RpbnkuanBn/180x200/1.jpg"
      },
      ....
    ]
  }
}

endpoint 5:
```
https://indocast.site/api/drakorid/kategori
```

response:
```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "total": 63,
    "items": [
      {
        "id": "film-korea",
        "url": "https://drakorid.co/kategori/film-korea/1",
        "title": "Film Korea",
        "count": 635
      },
      {
        "id": "drama-korea",
        "url": "https://drakorid.co/kategori/drama-korea/1",
        "title": "Drama Korea",
        "count": 1450
      },
      {
        "id": "variety-show",
        "url": "https://drakorid.co/kategori/variety-show/1",
        "title": "Variety Show",
        "count": 1124
      },
      ...
    ]
  }
}
```

endpoint 6:
```
https://indocast.site/api/drakorid/kategori/detail?slug=film-korea&page=1
```

response:
```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "kategori": "film-korea",
    "page": 1,
    "total": 30,
    "items": [
      {
        "id": "lost-2025-",
        "url": "https://drakorid.co/nonton/lost-2025-/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDgvNjktbG9zdGttLXAuanBlZw--/180x200/1.jpg",
        "title": "Lost (2025-)"
      },
      {
        "id": "wild-sing-2026",
        "url": "https://drakorid.co/nonton/wild-sing-2026/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDgvODk1LW5vb3l5MjRmLmpwZw--/180x200/1.jpg",
        "title": "Wild Sing (2026)"
      },
      {
        "id": "second-sister-2025",
        "url": "https://drakorid.co/nonton/second-sister-2025/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDcvNjA3LTE0MTc0MjYtc2Vjb25kLXNpc3Rlci0wLTEwMDAtMC0xNTAwLWNyb3AuanBn/180x200/1.jpg",
        "title": "Second Sister (2025)"
      },
      {
        "id": "colony-2026",
        "url": "https://drakorid.co/nonton/colony-2026/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDcvNTgyLW5kNno0dzRmLmpwZw--/180x200/1.jpg",
        "title": "Colony (2026)"
      },
      {
        "id": "husbands-in-action-2026",
        "url": "https://drakorid.co/nonton/husbands-in-action-2026/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDYvMjQyLW5vcW4zbDRmLmpwZw--/180x200/1.jpg",
        "title": "Husbands in Action (2026)"
      },
      {
        "id": "salmokji-whispering-water-2026",
        "url": "https://drakorid.co/nonton/salmokji-whispering-water-2026/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDUvNDUxLWtweXhkdjRmLmpwZw--/180x200/1.jpg",
        "title": "Salmokji: Whispering Water (2026)"
      },
      {
        "id": "the-ugly-2025",
        "url": "https://drakorid.co/nonton/the-ugly-2025/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDUvMjM2LWwwbnpyZTRmLmpwZw--/180x200/1.jpg",
        "title": "The Ugly (2025)"
      },
      {
        "id": "the-kings-warden-2026",
        "url": "https://drakorid.co/nonton/the-kings-warden-2026/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDUvMzY0LWcwN25tdzRmLmpwZw--/180x200/1.jpg",
        "title": "The Kings Warden (2026)"
      },
      {
        "id": "the-informant-2025",
        "url": "https://drakorid.co/nonton/the-informant-2025/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDQvOTA3LXpieHF6dzRmLmpwZw--/180x200/1.jpg",
        "title": "The Informant (2025)"
      },
      {
        "id": "the-favor-2025",
        "url": "https://drakorid.co/nonton/the-favor-2025/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDQvNjA0LXRoZWZhdm9ya20tcC5qcGVn/180x200/1.jpg",
        "title": "The Favor (2025)"
      },
      {
        "id": "green-in-my-heart-2020",
        "url": "https://drakorid.co/nonton/green-in-my-heart-2020/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDQvNDA4LXdyd241Zi5qcGc-/180x200/1.jpg",
        "title": "Green in My Heart (2020)"
      },
      {
        "id": "humint-2026",
        "url": "https://drakorid.co/nonton/humint-2026/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDQvNTgxLWh1bWludGtkLXAuanBn/180x200/1.jpg",
        "title": "Humint (2026)"
      },
      {
        "id": "you-will-die-in-6-hours-2024",
        "url": "https://drakorid.co/nonton/you-will-die-in-6-hours-2024/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDQvNTIzLXlvdXdpbGxkaWVpbjZob3Vycy1wMS5qcGVn/180x200/1.jpg",
        "title": "You Will Die in 6 Hours (2024)"
      },
      {
        "id": "no-parking-2025",
        "url": "https://drakorid.co/nonton/no-parking-2025/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDQvMzA3LXB4cWV2ODRmLmpwZw--/180x200/1.jpg",
        "title": "No Parking (2025)"
      },
      {
        "id": "boss-2025",
        "url": "https://drakorid.co/nonton/boss-2025/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDQvOTIxLWIzbHduZTRmLmpwZw--/180x200/1.jpg",
        "title": "Boss (2025)"
      },
      {
        "id": "homeward-bound-2025",
        "url": "https://drakorid.co/nonton/homeward-bound-2025/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDQvNTI0LWhvbWV3YXJkYm91bmQtcC5qcGVn/180x200/1.jpg",
        "title": "Homeward Bound (2025)"
      },
      {
        "id": "home-behind-bars-2025",
        "url": "https://drakorid.co/nonton/home-behind-bars-2025/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDQvMjQ0LXpid29hYTRmLmpwZw--/180x200/1.jpg",
        "title": "Home Behind Bars (2025)"
      },
      {
        "id": "boy-in-the-pool-2025",
        "url": "https://drakorid.co/nonton/boy-in-the-pool-2025/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDQvOTk5LWFiNGpvNDRmLmpwZw--/180x200/1.jpg",
        "title": "Boy in the Pool (2025)"
      },
      {
        "id": "abroad-2025",
        "url": "https://drakorid.co/nonton/abroad-2025/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDQvMTE1LWthN2sxdjRmLmpwZw--/180x200/1.jpg",
        "title": "Abroad (2025)"
      },
      {
        "id": "only-god-knows-everything-2025",
        "url": "https://drakorid.co/nonton/only-god-knows-everything-2025/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDQvNzY4LW5vZXhwODRmLmpwZw--/180x200/1.jpg",
        "title": "Only God Knows Everything (2025)"
      },
      {
        "id": "the-first-ride-2025",
        "url": "https://drakorid.co/nonton/the-first-ride-2025/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDMvODYyLXl3bDUzbjNmLmpwZw--/180x200/1.jpg",
        "title": "The First Ride (2025)"
      },
      {
        "id": "new-normal-2023",
        "url": "https://drakorid.co/nonton/new-normal-2023/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDMvMjkwLXdqMHIxbjRmLmpwZw--/180x200/1.jpg",
        "title": "New Normal (2023)"
      },
      {
        "id": "once-we-were-us-2025",
        "url": "https://drakorid.co/nonton/once-we-were-us-2025/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDMvMzUwLTNvcGJlajNmLmpwZw--/180x200/1.jpg",
        "title": "Once We Were Us (2025)"
      },
      {
        "id": "its-okay-2025",
        "url": "https://drakorid.co/nonton/its-okay-2025/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDMvNzcwLW1vZDM1azRmLmpwZw--/180x200/1.jpg",
        "title": "Its Okay (2025)"
      },
      {
        "id": "virus-2025",
        "url": "https://drakorid.co/nonton/virus-2025/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDMvOTk1LWwwMW5uNDRmLmpwZw--/180x200/1.jpg",
        "title": "Virus (2025)"
      },
      {
        "id": "project-y-2026",
        "url": "https://drakorid.co/nonton/project-y-2026/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDIvMTEzLXByb2plY3R5LXAxLmpwZWc-/180x200/1.jpg",
        "title": "Project Y (2026)"
      },
      {
        "id": "the-limit-2022",
        "url": "https://drakorid.co/nonton/the-limit-2022/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDIvNjQ2LWxpbWl0LWttLXB0MS5qcGc-/180x200/1.jpg",
        "title": "Limit (2022)"
      },
      {
        "id": "ghost-train-2025",
        "url": "https://drakorid.co/nonton/ghost-train-2025/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDIvNTQxLWRrbDF2bjRmLmpwZw--/180x200/1.jpg",
        "title": "Ghost Train (2025)"
      },
      {
        "id": "pavane-2026",
        "url": "https://drakorid.co/nonton/pavane-2026/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDIvODY1LW5kazVudzRmLmpwZw--/180x200/1.jpg",
        "title": "Pavane (2026)"
      },
      {
        "id": "even-if-this-love-disappears-tonight-2025",
        "url": "https://drakorid.co/nonton/even-if-this-love-disappears-tonight-2025/",
        "imageUrl": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDIvMjgyLWV2ZW5pZnRoaXNsb3ZlZGlzYXBwZWFyc2Zyb210aGV3b3JsZHRvbmlnaHRrbS1wLmpwZw--/180x200/1.jpg",
        "title": "Even if This Love Disappears Tonight (2025)"
      }
    ]
  }
}
```
endpoint 7:
```
https://indocast.site/api/drakorid/details?slug=fifties-professionals-2026
```

response:
```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "id": "fifties-professionals-2026",
    "slug": "fifties-professionals-2026",
    "title": "Fifties Professionals (2026)",
    "poster": "https://convert.d-cdn.me/convert/aHR0cHM6Ly9hc3NldHMuZC1jZG4ubWUvaW1nLzIwMjYvMDUvNTgwLW1vNHd6MzRmLmpwZw--/256x368/1.jpg",
    "synopsis": "Tiga pria, yang semuanya dikenal sebagai yang terbaik di bidangnya, diturunkan pangkatnya ke Pulau Yeongseon yang terpencil setelah sebuah insiden. Mereka mencari kebenaran tentang apa yang terjadi hari itu. Jung Ho-Myung (Shin Ha-Kyun) dulunya adalah agen rahasia terbaik di Dinas Intelijen Nasional. Setelah dituduh secara salah, ia meninggalkan Dinas Intelijen Nasional. Sambil menyembunyikan identitas aslinya, ia bekerja sebagai koki di Restoran Cina Oran di Pulau Yeongseon. Ia mengejar 'sesuatu' yang membuatnya seperti ini. Bong Je-Soon (Oh Jung-Se) adalah mantan agen khusus Korea Utara, yang telah kehilangan ingatannya. Ia adalah senjata manusia paling ampuh, dikenal sebagai Anjing Api. Selama operasi, ia terdampar di Pulau Yeongseon setelah kecelakaan yang tak terduga. Ia mencari ingatannya, sementara ia menderita kebingungan identitas dan pelecehan dari bosnya di tempat kerja. Kang Beom-Ryong (Heo Sung-Tae) menjalankan toko serba ada di Pulau Yeongseon. Dia dulunya adalah seorang gangster legendaris dan orang nomor 2 di Geng Gunung Berapi. Sebuah insiden menyebabkan bubarnya Geng Gunung Berapi. Untuk membalas dendam, dia datang ke Pulau Yeongseon untuk mengejar \"kejadian\" itu dan Jung Ho-Myung. Karena peduli pada bosnya di penjara, Kang Beom-Ryong memiliki rencana besar untuk mengembalikan semuanya seperti semula.",
    "details": {
      "Drama": "Fifties Professionals",
      "Revised romanization": "Oshibpeuro",
      "Hangul": "ì˜¤ì‹­í”„ë¡œ",
      "Director": "Han Dong-Hwa",
      "Writer": "Jang Won-Seob",
      "Network": "MBC",
      "Episodes": "12",
      "Release Date": "May 22, 2026 --",
      "Runtime": "Friday & Saturday 21:50",
      "Genres": "Action, Thriller, Mystery, Comedy",
      "Language": "Korean",
      "Country": "South Korea"
    },
    "cast": [
      {
        "name": "Shin Ha-Kyun",
        "url": "https://asianwiki.com/Shin_Ha-Kyun",
        "role": "Kyun"
      },
      {
        "name": "Oh Jung-Se",
        "url": "https://asianwiki.com/Oh_Jung-Se",
        "role": "Se"
      },
      {
        "name": "Heo Sung-Tae",
        "url": "https://asianwiki.com/Heo_Sung-Tae_(1977)",
        "role": "Tae"
      }
    ],
    "episodes": [
      {
        "episode": "Episode 1",
        "number": 1
      },
      {
        "episode": "Episode 2",
        "number": 2
      },
      {
        "episode": "Episode 3",
        "number": 3
      },
      {
        "episode": "Episode 4",
        "number": 4
      },
      {
        "episode": "Episode 5",
        "number": 5
      },
      {
        "episode": "Episode 6",
        "number": 6
      },
      {
        "episode": "Episode 7",
        "number": 7
      },
      {
        "episode": "Episode 8",
        "number": 8
      },
      {
        "episode": "Episode 9",
        "number": 9
      },
      {
        "episode": "Episode 10",
        "number": 10
      },
      {
        "episode": "Episode 11",
        "number": 11
      },
      {
        "episode": "Episode 12",
        "number": 12
      }
    ]
  }
}
```

endpoint 8:
```
https://indocast.site/api/drakorid/play
```
response:
```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "id": "fate-chooses-you-2026",
    "episode": 1,
    "quality": 720,
    "format": "HLS",
    "vid_url": "https://hls.drakor.cc/jakarta/www/vod28/sk14.drakor.cc/files/22-2026-04-25-440b574589a6da2e50a59323e28b4eb4.mp4/mono.m3u8?token=d8115943ae30ebaa0e4a9abe2fb83884dc5f6f41ganteng1792089121ganteng1792078321",
    "vid_url_proxy": "https://hls.drakor.cc/jakarta/www/vod28/sk14.drakor.cc/files/22-2026-04-25-440b574589a6da2e50a59323e28b4eb4.mp4/mono.m3u8?token=d8115943ae30ebaa0e4a9abe2fb83884dc5f6f41ganteng1792089121ganteng1792078321"
  }
}
```