Sumber API: https://indocast.site/

example hit : https://indocast.site/api/idlix/home/network?network=netflix&page=1&limit=36&sort=latest

Catatan: Jangan lupa sertakan header x-api-key di setiap request Anda untuk melewati otentikasi API.

---

Endpoint 1:
```
https://indocast.site/api/idlix/home
```
```
curl -X GET "https://indocast.site/api/idlix/home" -H "x-api-key: indocast_c0116...."
```

Response:
```json
{
  "sliderItems": [
    {
      "id": "54624fe2-96f2-4fd9-aeaa-4f73f86fdcc7",
      "contentType": "tv_series",
      "title": "VisionQuest",
      "slug": "visionquest-2026",
      "overview": "With a bounty on his head, Vision must confront his nature and resist Ultron's influence to survive.",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/WGyAyBPncfuu8MZhLY9RtfZPM0.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/uoXXbN2PrOxH6UKyP7kYwmGpAAP.jpg",
      "logoPath": "/mQwaoWvWJGiuVY6CT1V6AiuSIqi.png",
      "releaseDate": "2026-10-13",
      "runtimeMinutes": null,
      "voteAverage": 9.3,
      "viewCount": 64048,
      "genres": [
        "Drama",
        "Fantasy",
        "Science Fiction"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "859b0000-7e53-4bfc-9dc5-a45d8940adbd",
      "contentType": "movie",
      "title": "Hope",
      "slug": "hope-2026",
      "overview": "In the remote South Korean village of Hope Harbor, police chief Bum-seok and officer Sung-ae are called to investigate a mysterious creature wreaking havoc on the community. But all is not as it seems, and perceptions can be misleading. What begins as ignorance plants the seed of disaster, escalating through human conflict into a tragedy of cosmic proportions.",
      "tagline": "Is this how it ends?",
      "posterPath": "https://image.tmdb.org/t/p/w500/bcK5naYzzfY0JBCgrPrsrbV6NO1.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/3KvGTuNX47Pdqlg9ossua2TFKrZ.jpg",
      "logoPath": "/hJG3cSi9z40smOi4Fac07xIlAqZ.png",
      "releaseDate": "2026-07-15",
      "runtimeMinutes": 157,
      "voteAverage": 7.2,
      "viewCount": 82582,
      "genres": [
        "Action",
        "Mystery",
        "Science Fiction"
      ],
      "hasVideo": true
    },
    {
      "id": "2187b8ba-3969-4f83-b094-0ba5ec75de69",
      "contentType": "movie",
      "title": "Sacrifice",
      "slug": "sacrifice-2026",
      "overview": "During a star-studded charity gala brimming with celebrities, billionaires and empty speeches, a movie star in the midst of an existential crisis is taken hostage by a radical warrior and her devoted followers. As the night descends into chaos, both an inward journey and an outward adventure ensue, where the line between performance and belief, salvation and sacrifice, begins to blur.",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/SGH7mlgfDyGgRCi2At62Ljg3zV.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/1mImp4LczEYMx7c6LZUlUyAilJu.jpg",
      "logoPath": "/umsFgheNo6N37cUG3gT0wBo7p4Z.png",
      "releaseDate": "2026-04-09",
      "runtimeMinutes": 103,
      "voteAverage": 5.3,
      "viewCount": 3779,
      "genres": [
        "Action",
        "Adventure",
        "Comedy"
      ],
      "hasVideo": true
    },
    {
      "id": "927ac3d8-6fdf-4c9f-83ff-661c0f74dfe4",
      "contentType": "tv_series",
      "title": "Avatar: Seven Havens",
      "slug": "avatar-seven-havens-2026",
      "overview": "In a world shattered by a devastating cataclysm, a young Earthbender discovers she's the new Avatar after Korra. But in this dangerous era, that title marks her as humanity's destroyer, not its savior. Hunted by both human and spirit enemies, she and her long-lost twin must uncover their mysterious origins and save the Seven Havens before civilization's last strongholds collapse.",
      "tagline": "New legends will rise.",
      "posterPath": "https://image.tmdb.org/t/p/w500/vYNar1VtdNyQXXUt16uPbIT6wzr.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/z0Y4vjd0WhMdWYEySd6wooVQQaH.jpg",
      "logoPath": "/zH6NyZ6vMzdvLZreSHj7HGTkYbu.png",
      "releaseDate": "2026-10-09",
      "runtimeMinutes": null,
      "voteAverage": 10,
      "viewCount": 64217,
      "genres": [
        "Action",
        "Family",
        "Animation",
        "Adventure",
        "Fantasy",
        "Science Fiction"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1,
      "numberOfEpisodes": 3
    },
    {
      "id": "76299c3d-7675-479c-9791-879446d3c191",
      "contentType": "movie",
      "title": "Kung Fu Soccer",
      "slug": "kung-fu-soccer-2026",
      "overview": "The \"Supreme Invincible Cup\" is about to begin, and a host of top teams are about to engage in an unprecedented showdown! But the Kung Fu Women's Soccer Team has been dealt a hellish script right from the start?! Their opponents are all highly skilled, and external pressure is mounting. The schemes on the field are one after another... Can they use their kung fu to turn the tide on the green field?",
      "tagline": "One kick can ignite the world.",
      "posterPath": "https://image.tmdb.org/t/p/w500/6QgJQrClh9ej357yzLWgCxrjAmJ.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/J1UgJwRxDQS92kw75KgeVFZMHf.jpg",
      "logoPath": "/t6FfksdELAPDrULgnTQshEIPVP9.png",
      "releaseDate": "2026-07-11",
      "runtimeMinutes": 106,
      "voteAverage": 6,
      "viewCount": 53746,
      "genres": [],
      "hasVideo": true
    },
    {
      "id": "4ed2974b-fe5c-449f-b070-bd52e3e466ce",
      "contentType": "movie",
      "title": "Insidious: Out of the Further",
      "slug": "insidious-out-of-the-further-2026",
      "overview": "Gemma, a young mother raising her daughter in the house she grew up in, discovers she can travel into The Further, where she possesses an ability to bring what lives there back to the real world.",
      "tagline": "Evil found a way out.",
      "posterPath": "https://image.tmdb.org/t/p/w500/4tTrW9dXCByS5wt2pXVWb58zNjz.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/w2xDGa1252imRPgCbiY48AbkRBn.jpg",
      "logoPath": "/iGjbP4jYzzbINDtd9kScypQOlmw.png",
      "releaseDate": "2026-08-19",
      "runtimeMinutes": 106,
      "voteAverage": 6.5,
      "viewCount": 196078,
      "genres": [
        "Thriller",
        "Horror"
      ],
      "hasVideo": true
    },
    {
      "id": "3d5344cb-82d8-44ad-bb54-1845878721c5",
      "contentType": "movie",
      "title": "Spider-Man: Brand New Day",
      "slug": "spider-man-brand-new-day-2026",
      "overview": "Fighting crime full-time as Spider-Man in a world that doesn't remember him—and the pressure of seeing his old friends move on without him—sparks a change in Peter Parker he may not have the power to control. But that transformation might also be the only thing that can stop a shocking new threat to the city and those he loves - a powerful villain no one can even see.",
      "tagline": "A brand new day starts now.",
      "posterPath": "https://image.tmdb.org/t/p/w500/iPOn6DinuVyLY17YM9mKuPofV08.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/subj7knTn4DeS6KS7qI66EQKe9i.jpg",
      "logoPath": "/vbZcDHC5IFylYuRnp3eyOs5rTV1.png",
      "releaseDate": "2026-07-29",
      "runtimeMinutes": 145,
      "voteAverage": 7.88,
      "viewCount": 1312393,
      "genres": [
        "Action",
        "Adventure",
        "Science Fiction"
      ],
      "hasVideo": true
    },
    {
      "id": "397b6518-a62f-422e-958f-5aeb3fb2d3f4",
      "contentType": "tv_series",
      "title": "Doctor X: Mafia in White",
      "slug": "doctor-x-mafia-in-white-2026",
      "overview": "In a hospital dominated by ego and corruption, an enigmatic but brilliant surgeon arrives — taking on seemingly impossible cases amid fierce opposition.",
      "tagline": "I don't fail. I don't compromise.",
      "posterPath": "https://image.tmdb.org/t/p/w500/nDDVzQfv95PGwj9nV2fJvUrkcvU.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/gEIYUsH0V2tDUTwnA2NNCw1cD0f.jpg",
      "logoPath": "/sU3HlqW8J1rtLigitz2rBiTLTUC.png",
      "releaseDate": "2026-10-09",
      "runtimeMinutes": null,
      "voteAverage": 10,
      "viewCount": 215840,
      "genres": [
        "Drama",
        "Crime",
        "Mystery"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1,
      "numberOfEpisodes": 1
    },
    {
      "id": "f1f28848-071c-4c0a-921d-6d01c8fa3528",
      "contentType": "movie",
      "title": "Runner",
      "slug": "runner-2026",
      "overview": "A former soldier is thrown into a brutal race against time when a critical medical delivery makes him and his unlikely partner the targets of a ruthless cartel. As the mission spirals into a deadly manhunt, every detour, delay, and bullet pushes them closer to failure. With betrayal closing in from every side, they must survive the chase and deliver their cargo to save the life of a little girl.",
      "tagline": "Next-day delivery isn't an option.",
      "posterPath": "https://image.tmdb.org/t/p/w500/yBKMAIj7clP42UkFejhGDBBoTpb.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/npXZNWjOEYrqdMDPQ11SGBrXqAG.jpg",
      "logoPath": "/pAnbApoi6DHwXzoKBfQU4M5Wr8t.png",
      "releaseDate": "2026-09-07",
      "runtimeMinutes": 97,
      "voteAverage": 8,
      "viewCount": 75744,
      "genres": [
        "Action",
        "Comedy"
      ],
      "hasVideo": true
    },
    {
      "id": "7260f822-b86c-44d7-bc68-6bbf3a7bbfe6",
      "contentType": "tv_series",
      "title": "MobLand",
      "slug": "mobland-2025",
      "overview": "Two mob families clash in a war that threatens to topple empires and lives.",
      "tagline": "Chaos reigns.",
      "posterPath": "https://image.tmdb.org/t/p/w500/5Xc7WpWsgflfgEMoBlf9TmWhfbH.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/fptFWS11Ris8Yd94f1NvHj3xyRh.jpg",
      "logoPath": "/a9YLMuK3MoQr1Au5SJPVp4dMn3o.png",
      "releaseDate": "2025-03-30",
      "runtimeMinutes": null,
      "voteAverage": 8.33,
      "viewCount": 230685,
      "genres": [
        "Drama",
        "Crime"
      ],
      "hasVideo": false,
      "numberOfSeasons": 2,
      "numberOfEpisodes": 14
    }
  ],
  "sections": [
    {
      "sectionId": "32bfdf11-e777-42eb-ab0a-a504b306ba68",
      "type": "trending",
      "title": "Trending Now",
      "slug": "trending-now",
      "items": [
        {
          "id": "32b47770-fed5-4579-a89a-af13a98c92ac",
          "contentType": "tv_series",
          "title": "Take Charge of My Heart",
          "slug": "take-charge-of-my-heart-2026",
          "overview": "A corporate heir with an artificial heart meets a woman who's literally electric. They strike a deal that makes his heart beat — in more ways than one.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/ecRrKGXfflZmDZBD4irdkybClT.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/cHO75BxLM6sz7NsiVyaBmkKnmgg.jpg",
          "logoPath": "/gkBFyWEjj9iJgwLVGZkxZ7Lh2fu.png",
          "releaseDate": "2026-10-09",
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 388824,
          "genres": [
            "Comedy",
            "Fantasy",
            "Science Fiction"
          ],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "6d232e0c-7f9b-43f6-a323-6e78ff6763f9",
          "contentType": "tv_series",
          "title": "The Mentalist",
          "slug": "the-mentalist-2008",
          "overview": "Patrick Jane, a former celebrity psychic medium, uses his razor sharp skills of observation and expertise at \"reading\" people to solve serious crimes with the California Bureau of Investigation.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/acYXu4KaDj1NIkMgObnhe4C4a0T.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/q3pCsNvJ7CmdJUz2sJEEUY3pOPC.jpg",
          "logoPath": "/aB5jf4O14dykrksrPgtOlvVk0pi.svg",
          "releaseDate": "2008-09-23",
          "runtimeMinutes": null,
          "voteAverage": 8.36,
          "viewCount": 2793592,
          "genres": [
            "Drama",
            "Crime",
            "Mystery"
          ],
          "hasVideo": false,
          "numberOfSeasons": 7,
          "numberOfEpisodes": 149
        },
        {
          "id": "54624fe2-96f2-4fd9-aeaa-4f73f86fdcc7",
          "contentType": "tv_series",
          "title": "VisionQuest",
          "slug": "visionquest-2026",
          "overview": "With a bounty on his head, Vision must confront his nature and resist Ultron's influence to survive.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/WGyAyBPncfuu8MZhLY9RtfZPM0.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/uoXXbN2PrOxH6UKyP7kYwmGpAAP.jpg",
          "logoPath": "/mQwaoWvWJGiuVY6CT1V6AiuSIqi.png",
          "releaseDate": "2026-10-13",
          "runtimeMinutes": null,
          "voteAverage": 9.3,
          "viewCount": 64048,
          "genres": [
            "Drama",
            "Fantasy",
            "Science Fiction"
          ],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "859b0000-7e53-4bfc-9dc5-a45d8940adbd",
          "contentType": "movie",
          "title": "Hope",
          "slug": "hope-2026",
          "overview": "In the remote South Korean village of Hope Harbor, police chief Bum-seok and officer Sung-ae are called to investigate a mysterious creature wreaking havoc on the community. But all is not as it seems, and perceptions can be misleading. What begins as ignorance plants the seed of disaster, escalating through human conflict into a tragedy of cosmic proportions.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/bcK5naYzzfY0JBCgrPrsrbV6NO1.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/3KvGTuNX47Pdqlg9ossua2TFKrZ.jpg",
          "logoPath": "/hJG3cSi9z40smOi4Fac07xIlAqZ.png",
          "releaseDate": "2026-07-15",
          "runtimeMinutes": 157,
          "voteAverage": 7.2,
          "viewCount": 82582,
          "genres": [
            "Action",
            "Mystery",
            "Science Fiction"
          ],
          "hasVideo": false
        },
        {
          "id": "eb95fa3f-bdf8-4557-bb73-d27e7350f656",
          "contentType": "tv_series",
          "title": "Carrie",
          "slug": "carrie-2026",
          "overview": "Misfit teenager Carrie White has spent her life in seclusion with her domineering mother, Margaret. After her father's sudden death, Carrie finds herself contending with the challenges of attending public high school, a bullying scandal, and the emergence of mysterious telekinetic powers.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/eXjk4W4robXs7l1YXwaXMv4f2qb.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/vVaNTaRHlL1i8JVsZsNtRHGBhPm.jpg",
          "logoPath": "/p7lOufvkG9Od7280KE91ca5TLW5.png",
          "releaseDate": "2026-10-07",
          "runtimeMinutes": null,
          "voteAverage": 7.8,
          "viewCount": 172559,
          "genres": [
            "Drama",
            "Mystery"
          ],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "397b6518-a62f-422e-958f-5aeb3fb2d3f4",
          "contentType": "tv_series",
          "title": "Doctor X: Mafia in White",
          "slug": "doctor-x-mafia-in-white-2026",
          "overview": "In a hospital dominated by ego and corruption, an enigmatic but brilliant surgeon arrives — taking on seemingly impossible cases amid fierce opposition.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/nDDVzQfv95PGwj9nV2fJvUrkcvU.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/gEIYUsH0V2tDUTwnA2NNCw1cD0f.jpg",
          "logoPath": "/sU3HlqW8J1rtLigitz2rBiTLTUC.png",
          "releaseDate": "2026-10-09",
          "runtimeMinutes": null,
          "voteAverage": 10,
          "viewCount": 215840,
          "genres": [
            "Drama",
            "Crime",
            "Mystery"
          ],
          "hasVideo": false,
          "numberOfSeasons": 1,
          "numberOfEpisodes": 1
        },
        {
          "id": "3932672a-57da-4321-afbf-514f704f0ee6",
          "contentType": "tv_series",
          "title": "Black Clover",
          "slug": "black-clover-2017",
          "overview": "Asta and Yuno are two orphans who want the same thing: to become the Wizard King. Locked in a friendly rivalry, they work hard towards their goal. While Yuno excels at magic, Asta has a problem uncommon in this world: he has no powers! But, on the day they receive their grimoires, they surprise everyone. To reach their goal, they’ll each find their own path to greatness—with or without magic.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/kaMisKeOoTBPxPkbC3OW7Wgt6ON.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/oUsm3pq6rUga7lVGQFS3g84etVE.jpg",
          "logoPath": "/j9ZZ7WV5pwLLXbbebyGdMUxbqrc.png",
          "releaseDate": "2017-10-03",
          "runtimeMinutes": null,
          "voteAverage": 8.5,
          "viewCount": 336103,
          "genres": [
            "Action",
            "Animation",
            "Adventure",
            "Fantasy",
            "Science Fiction"
          ],
          "hasVideo": false,
          "numberOfSeasons": 2,
          "numberOfEpisodes": 170
        },
        {
          "id": "5e88de20-ad60-447c-8701-55c35d97f4c8",
          "contentType": "tv_series",
          "title": "Flex x Cop",
          "slug": "flex-x-cop-2024",
          "overview": "A chaebol cop joins forces with a gritty detective to take down criminals with a touch of wealth and a whole lot of wit.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/2eWH2RDxpbIfEs17BpJTQhcOqRs.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/zKruyrpu45wgs1PNBmgASAMVMXe.jpg",
          "logoPath": "/42Dzr3D1YEeCsFFE7OD2nm4dH1p.png",
          "releaseDate": "2024-01-26",
          "runtimeMinutes": null,
          "voteAverage": 7.9,
          "viewCount": 1573577,
          "genres": [
            "Action",
            "Drama",
            "Adventure",
            "Crime",
            "Mystery"
          ],
          "hasVideo": false,
          "numberOfSeasons": 2,
          "numberOfEpisodes": 29
        },
        {
          "id": "3d5344cb-82d8-44ad-bb54-1845878721c5",
          "contentType": "movie",
          "title": "Spider-Man: Brand New Day",
          "slug": "spider-man-brand-new-day-2026",
          "overview": "Fighting crime full-time as Spider-Man in a world that doesn't remember him—and the pressure of seeing his old friends move on without him—sparks a change in Peter Parker he may not have the power to control. But that transformation might also be the only thing that can stop a shocking new threat to the city and those he loves - a powerful villain no one can even see.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/iPOn6DinuVyLY17YM9mKuPofV08.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/subj7knTn4DeS6KS7qI66EQKe9i.jpg",
          "logoPath": "/vbZcDHC5IFylYuRnp3eyOs5rTV1.png",
          "releaseDate": "2026-07-29",
          "runtimeMinutes": 145,
          "voteAverage": 7.88,
          "viewCount": 1312393,
          "genres": [
            "Action",
            "Adventure",
            "Science Fiction"
          ],
          "hasVideo": false
        },
        {
          "id": "495e5055-9f48-48ed-8b06-a9e002c92cb0",
          "contentType": "tv_series",
          "title": "A Love Other Than Yours",
          "slug": "a-love-other-than-yours-2026",
          "overview": "A realistic, emotionally resonant romance about a couple in their tenth year together whose comfortable relationship is tested by unexpected feelings.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/jvNFIc9qy9ynCuKMar9YC258gJP.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/aamqCMt8yjcLqfSWvrJk7qApGyT.jpg",
          "logoPath": "/rxCkzjbWlVnclpLDSsr69rVTBQE.png",
          "releaseDate": "2026-09-12",
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 379480,
          "genres": [
            "Drama",
            "Comedy"
          ],
          "hasVideo": false,
          "numberOfSeasons": 1,
          "numberOfEpisodes": 7
        },
        {
          "id": "4ed2974b-fe5c-449f-b070-bd52e3e466ce",
          "contentType": "movie",
          "title": "Insidious: Out of the Further",
          "slug": "insidious-out-of-the-further-2026",
          "overview": "Gemma, a young mother raising her daughter in the house she grew up in, discovers she can travel into The Further, where she possesses an ability to bring what lives there back to the real world.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/4tTrW9dXCByS5wt2pXVWb58zNjz.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/w2xDGa1252imRPgCbiY48AbkRBn.jpg",
          "logoPath": "/iGjbP4jYzzbINDtd9kScypQOlmw.png",
          "releaseDate": "2026-08-19",
          "runtimeMinutes": 106,
          "voteAverage": 6.5,
          "viewCount": 196078,
          "genres": [
            "Thriller",
            "Horror"
          ],
          "hasVideo": false
        },
        {
          "id": "6a07d203-e8c5-4031-af8a-0a780cae9dd2",
          "contentType": "tv_series",
          "title": "Modern Family",
          "slug": "modern-family-2009",
          "overview": "The Pritchett-Dunphy-Tucker clan is a wonderfully large and blended family. They give us an honest and often hilarious look into the sometimes warm, sometimes twisted, embrace of the modern family.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/k5Qg5rgPoKdh3yTJJrLtyoyYGwC.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/nO7EzksrBzlNpAg5rgv8HzaBIkx.jpg",
          "logoPath": "/rbKhglYrECjMZNYtT2QyihOQ5F.png",
          "releaseDate": "2009-09-23",
          "runtimeMinutes": null,
          "voteAverage": 7.9,
          "viewCount": 1004642,
          "genres": [
            "Comedy"
          ],
          "hasVideo": false,
          "numberOfSeasons": 11,
          "numberOfEpisodes": 249
        },
        {
          "id": "af1a088f-fea1-4a51-a623-76790f66f611",
          "contentType": "tv_series",
          "title": "100 Days of Deception",
          "slug": "100-days-of-deception-2026",
          "overview": "Hoping for freedom, Gyeongseong's top pickpocket infiltrates the Japanese colonial government to steal secrets — only to fall for her target's son.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/bZHEU42QynnMrHUWK1Hhvj2cdPA.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/3SvKCITqMtjgPIhFBjRc4yTAc4H.jpg",
          "logoPath": "/diaeNWjfalIuCEv1Eca5q1Yc9kS.png",
          "releaseDate": "2026-10-10",
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 55184,
          "genres": [
            "Action",
            "Adventure"
          ],
          "hasVideo": false,
          "numberOfSeasons": 1,
          "numberOfEpisodes": 1
        },
        {
          "id": "f5976061-f8a1-478e-b0cd-e8ea2ac5061d",
          "contentType": "tv_series",
          "title": "A Bona Fide Killer",
          "slug": "a-bona-fide-killer-2026",
          "overview": "A seemingly ordinary working mother secretly lives as a legendary sniper who delivers justice where the law fails. After returning from a three-year hiatus, she must balance protecting her family with eliminating dangerous criminals, all while a determined journalist and a relentless detective close in on her hidden identity.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/u2lBLMgnALtgU8hQ3gCR2UrPPq6.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/j9AqsMJxuq7NEYJX4Q1vSfKb5CG.jpg",
          "logoPath": "/6xQDL4hDXOFVaaEaIgFX0gfvXgs.png",
          "releaseDate": "2026-07-31",
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 2131596,
          "genres": [
            "Action",
            "Drama",
            "Adventure",
            "Crime",
            "Mystery"
          ],
          "hasVideo": false,
          "numberOfSeasons": 1,
          "numberOfEpisodes": 13
        },
        {
          "id": "e96a9f19-cad1-443c-8700-e8e957e706b4",
          "contentType": "tv_series",
          "title": "Game of Thrones",
          "slug": "game-of-thrones-2011",
          "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg",
          "logoPath": "/6pObznbCoxVpY1lPQwJxETd7Phe.png",
          "releaseDate": "2011-04-17",
          "runtimeMinutes": null,
          "voteAverage": 8.5,
          "viewCount": 2107302,
          "genres": [
            "Action",
            "Drama",
            "Adventure",
            "Fantasy",
            "Science Fiction"
          ],
          "hasVideo": false,
          "numberOfSeasons": 8,
          "numberOfEpisodes": 73
        }
      ]
    },
    {
      "sectionId": "9c06c5ee-9648-49f5-adaf-5c657db5b42b",
      "type": "trending",
      "title": "Trending in Indonesia",
      "slug": "trending-country",
      "items": [
        {
          "id": "32b47770-fed5-4579-a89a-af13a98c92ac",
          "contentType": "tv_series",
          "title": "Take Charge of My Heart",
          "slug": "take-charge-of-my-heart-2026",
          "overview": "A corporate heir with an artificial heart meets a woman who's literally electric. They strike a deal that makes his heart beat — in more ways than one.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/ecRrKGXfflZmDZBD4irdkybClT.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/cHO75BxLM6sz7NsiVyaBmkKnmgg.jpg",
          "logoPath": "/gkBFyWEjj9iJgwLVGZkxZ7Lh2fu.png",
          "releaseDate": "2026-10-09",
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 388824,
          "genres": [
            "Comedy",
            "Fantasy",
            "Science Fiction"
          ],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "6d232e0c-7f9b-43f6-a323-6e78ff6763f9",
          "contentType": "tv_series",
          "title": "The Mentalist",
          "slug": "the-mentalist-2008",
          "overview": "Patrick Jane, a former celebrity psychic medium, uses his razor sharp skills of observation and expertise at \"reading\" people to solve serious crimes with the California Bureau of Investigation.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/acYXu4KaDj1NIkMgObnhe4C4a0T.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/q3pCsNvJ7CmdJUz2sJEEUY3pOPC.jpg",
          "logoPath": "/aB5jf4O14dykrksrPgtOlvVk0pi.svg",
          "releaseDate": "2008-09-23",
          "runtimeMinutes": null,
          "voteAverage": 8.36,
          "viewCount": 2793592,
          "genres": [
            "Drama",
            "Crime",
            "Mystery"
          ],
          "hasVideo": false,
          "numberOfSeasons": 7,
          "numberOfEpisodes": 149
        },
        {
          "id": "54624fe2-96f2-4fd9-aeaa-4f73f86fdcc7",
          "contentType": "tv_series",
          "title": "VisionQuest",
          "slug": "visionquest-2026",
          "overview": "With a bounty on his head, Vision must confront his nature and resist Ultron's influence to survive.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/WGyAyBPncfuu8MZhLY9RtfZPM0.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/uoXXbN2PrOxH6UKyP7kYwmGpAAP.jpg",
          "logoPath": "/mQwaoWvWJGiuVY6CT1V6AiuSIqi.png",
          "releaseDate": "2026-10-13",
          "runtimeMinutes": null,
          "voteAverage": 9.3,
          "viewCount": 64048,
          "genres": [
            "Drama",
            "Fantasy",
            "Science Fiction"
          ],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "859b0000-7e53-4bfc-9dc5-a45d8940adbd",
          "contentType": "movie",
          "title": "Hope",
          "slug": "hope-2026",
          "overview": "In the remote South Korean village of Hope Harbor, police chief Bum-seok and officer Sung-ae are called to investigate a mysterious creature wreaking havoc on the community. But all is not as it seems, and perceptions can be misleading. What begins as ignorance plants the seed of disaster, escalating through human conflict into a tragedy of cosmic proportions.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/bcK5naYzzfY0JBCgrPrsrbV6NO1.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/3KvGTuNX47Pdqlg9ossua2TFKrZ.jpg",
          "logoPath": "/hJG3cSi9z40smOi4Fac07xIlAqZ.png",
          "releaseDate": "2026-07-15",
          "runtimeMinutes": 157,
          "voteAverage": 7.2,
          "viewCount": 82582,
          "genres": [
            "Action",
            "Mystery",
            "Science Fiction"
          ],
          "hasVideo": false
        },
        {
          "id": "eb95fa3f-bdf8-4557-bb73-d27e7350f656",
          "contentType": "tv_series",
          "title": "Carrie",
          "slug": "carrie-2026",
          "overview": "Misfit teenager Carrie White has spent her life in seclusion with her domineering mother, Margaret. After her father's sudden death, Carrie finds herself contending with the challenges of attending public high school, a bullying scandal, and the emergence of mysterious telekinetic powers.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/eXjk4W4robXs7l1YXwaXMv4f2qb.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/vVaNTaRHlL1i8JVsZsNtRHGBhPm.jpg",
          "logoPath": "/p7lOufvkG9Od7280KE91ca5TLW5.png",
          "releaseDate": "2026-10-07",
          "runtimeMinutes": null,
          "voteAverage": 7.8,
          "viewCount": 172559,
          "genres": [
            "Drama",
            "Mystery"
          ],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "397b6518-a62f-422e-958f-5aeb3fb2d3f4",
          "contentType": "tv_series",
          "title": "Doctor X: Mafia in White",
          "slug": "doctor-x-mafia-in-white-2026",
          "overview": "In a hospital dominated by ego and corruption, an enigmatic but brilliant surgeon arrives — taking on seemingly impossible cases amid fierce opposition.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/nDDVzQfv95PGwj9nV2fJvUrkcvU.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/gEIYUsH0V2tDUTwnA2NNCw1cD0f.jpg",
          "logoPath": "/sU3HlqW8J1rtLigitz2rBiTLTUC.png",
          "releaseDate": "2026-10-09",
          "runtimeMinutes": null,
          "voteAverage": 10,
          "viewCount": 215840,
          "genres": [
            "Drama",
            "Crime",
            "Mystery"
          ],
          "hasVideo": false,
          "numberOfSeasons": 1,
          "numberOfEpisodes": 1
        },
        {
          "id": "3932672a-57da-4321-afbf-514f704f0ee6",
          "contentType": "tv_series",
          "title": "Black Clover",
          "slug": "black-clover-2017",
          "overview": "Asta and Yuno are two orphans who want the same thing: to become the Wizard King. Locked in a friendly rivalry, they work hard towards their goal. While Yuno excels at magic, Asta has a problem uncommon in this world: he has no powers! But, on the day they receive their grimoires, they surprise everyone. To reach their goal, they’ll each find their own path to greatness—with or without magic.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/kaMisKeOoTBPxPkbC3OW7Wgt6ON.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/oUsm3pq6rUga7lVGQFS3g84etVE.jpg",
          "logoPath": "/j9ZZ7WV5pwLLXbbebyGdMUxbqrc.png",
          "releaseDate": "2017-10-03",
          "runtimeMinutes": null,
          "voteAverage": 8.5,
          "viewCount": 336103,
          "genres": [
            "Action",
            "Animation",
            "Adventure",
            "Fantasy",
            "Science Fiction"
          ],
          "hasVideo": false,
          "numberOfSeasons": 2,
          "numberOfEpisodes": 170
        },
        {
          "id": "5e88de20-ad60-447c-8701-55c35d97f4c8",
          "contentType": "tv_series",
          "title": "Flex x Cop",
          "slug": "flex-x-cop-2024",
          "overview": "A chaebol cop joins forces with a gritty detective to take down criminals with a touch of wealth and a whole lot of wit.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/2eWH2RDxpbIfEs17BpJTQhcOqRs.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/zKruyrpu45wgs1PNBmgASAMVMXe.jpg",
          "logoPath": "/42Dzr3D1YEeCsFFE7OD2nm4dH1p.png",
          "releaseDate": "2024-01-26",
          "runtimeMinutes": null,
          "voteAverage": 7.9,
          "viewCount": 1573577,
          "genres": [
            "Action",
            "Drama",
            "Adventure",
            "Crime",
            "Mystery"
          ],
          "hasVideo": false,
          "numberOfSeasons": 2,
          "numberOfEpisodes": 29
        },
        {
          "id": "3d5344cb-82d8-44ad-bb54-1845878721c5",
          "contentType": "movie",
          "title": "Spider-Man: Brand New Day",
          "slug": "spider-man-brand-new-day-2026",
          "overview": "Fighting crime full-time as Spider-Man in a world that doesn't remember him—and the pressure of seeing his old friends move on without him—sparks a change in Peter Parker he may not have the power to control. But that transformation might also be the only thing that can stop a shocking new threat to the city and those he loves - a powerful villain no one can even see.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/iPOn6DinuVyLY17YM9mKuPofV08.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/subj7knTn4DeS6KS7qI66EQKe9i.jpg",
          "logoPath": "/vbZcDHC5IFylYuRnp3eyOs5rTV1.png",
          "releaseDate": "2026-07-29",
          "runtimeMinutes": 145,
          "voteAverage": 7.88,
          "viewCount": 1312393,
          "genres": [
            "Action",
            "Adventure",
            "Science Fiction"
          ],
          "hasVideo": false
        },
        {
          "id": "495e5055-9f48-48ed-8b06-a9e002c92cb0",
          "contentType": "tv_series",
          "title": "A Love Other Than Yours",
          "slug": "a-love-other-than-yours-2026",
          "overview": "A realistic, emotionally resonant romance about a couple in their tenth year together whose comfortable relationship is tested by unexpected feelings.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/jvNFIc9qy9ynCuKMar9YC258gJP.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/aamqCMt8yjcLqfSWvrJk7qApGyT.jpg",
          "logoPath": "/rxCkzjbWlVnclpLDSsr69rVTBQE.png",
          "releaseDate": "2026-09-12",
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 379480,
          "genres": [
            "Drama",
            "Comedy"
          ],
          "hasVideo": false,
          "numberOfSeasons": 1,
          "numberOfEpisodes": 7
        },
        {
          "id": "4ed2974b-fe5c-449f-b070-bd52e3e466ce",
          "contentType": "movie",
          "title": "Insidious: Out of the Further",
          "slug": "insidious-out-of-the-further-2026",
          "overview": "Gemma, a young mother raising her daughter in the house she grew up in, discovers she can travel into The Further, where she possesses an ability to bring what lives there back to the real world.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/4tTrW9dXCByS5wt2pXVWb58zNjz.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/w2xDGa1252imRPgCbiY48AbkRBn.jpg",
          "logoPath": "/iGjbP4jYzzbINDtd9kScypQOlmw.png",
          "releaseDate": "2026-08-19",
          "runtimeMinutes": 106,
          "voteAverage": 6.5,
          "viewCount": 196078,
          "genres": [
            "Thriller",
            "Horror"
          ],
          "hasVideo": false
        },
        {
          "id": "af1a088f-fea1-4a51-a623-76790f66f611",
          "contentType": "tv_series",
          "title": "100 Days of Deception",
          "slug": "100-days-of-deception-2026",
          "overview": "Hoping for freedom, Gyeongseong's top pickpocket infiltrates the Japanese colonial government to steal secrets — only to fall for her target's son.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/bZHEU42QynnMrHUWK1Hhvj2cdPA.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/3SvKCITqMtjgPIhFBjRc4yTAc4H.jpg",
          "logoPath": "/diaeNWjfalIuCEv1Eca5q1Yc9kS.png",
          "releaseDate": "2026-10-10",
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 55184,
          "genres": [
            "Action",
            "Adventure"
          ],
          "hasVideo": false,
          "numberOfSeasons": 1,
          "numberOfEpisodes": 1
        },
        {
          "id": "6a07d203-e8c5-4031-af8a-0a780cae9dd2",
          "contentType": "tv_series",
          "title": "Modern Family",
          "slug": "modern-family-2009",
          "overview": "The Pritchett-Dunphy-Tucker clan is a wonderfully large and blended family. They give us an honest and often hilarious look into the sometimes warm, sometimes twisted, embrace of the modern family.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/k5Qg5rgPoKdh3yTJJrLtyoyYGwC.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/nO7EzksrBzlNpAg5rgv8HzaBIkx.jpg",
          "logoPath": "/rbKhglYrECjMZNYtT2QyihOQ5F.png",
          "releaseDate": "2009-09-23",
          "runtimeMinutes": null,
          "voteAverage": 7.9,
          "viewCount": 1004642,
          "genres": [
            "Comedy"
          ],
          "hasVideo": false,
          "numberOfSeasons": 11,
          "numberOfEpisodes": 249
        },
        {
          "id": "f5976061-f8a1-478e-b0cd-e8ea2ac5061d",
          "contentType": "tv_series",
          "title": "A Bona Fide Killer",
          "slug": "a-bona-fide-killer-2026",
          "overview": "A seemingly ordinary working mother secretly lives as a legendary sniper who delivers justice where the law fails. After returning from a three-year hiatus, she must balance protecting her family with eliminating dangerous criminals, all while a determined journalist and a relentless detective close in on her hidden identity.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/u2lBLMgnALtgU8hQ3gCR2UrPPq6.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/j9AqsMJxuq7NEYJX4Q1vSfKb5CG.jpg",
          "logoPath": "/6xQDL4hDXOFVaaEaIgFX0gfvXgs.png",
          "releaseDate": "2026-07-31",
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 2131596,
          "genres": [
            "Action",
            "Drama",
            "Adventure",
            "Crime",
            "Mystery"
          ],
          "hasVideo": false,
          "numberOfSeasons": 1,
          "numberOfEpisodes": 13
        },
        {
          "id": "e96a9f19-cad1-443c-8700-e8e957e706b4",
          "contentType": "tv_series",
          "title": "Game of Thrones",
          "slug": "game-of-thrones-2011",
          "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg",
          "logoPath": "/6pObznbCoxVpY1lPQwJxETd7Phe.png",
          "releaseDate": "2011-04-17",
          "runtimeMinutes": null,
          "voteAverage": 8.5,
          "viewCount": 2107302,
          "genres": [
            "Action",
            "Drama",
            "Adventure",
            "Fantasy",
            "Science Fiction"
          ],
          "hasVideo": false,
          "numberOfSeasons": 8,
          "numberOfEpisodes": 73
        }
      ]
    },
    {
      "sectionId": "23378b43-999c-4b31-ba1c-642d8fb3fa9a",
      "type": "network",
      "title": "Network Originals",
      "slug": "network-originals",
      "items": [
        {
          "id": "17f0a60c-6a91-4db7-a23b-48669d1fc992",
          "contentType": "tv_series",
          "title": "Monster: The Lizzie Borden Story",
          "slug": "monster-the-lizzie-borden-story-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/57XScX1aYtKi1LvHYFQLPUxVhTG.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/3JVjgaqfX5MhxxHKpGWz05QV7Dz.jpg",
          "logoPath": null,
          "releaseDate": "2026-09-17",
          "runtimeMinutes": null,
          "voteAverage": 8,
          "viewCount": 98443,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "18aa1890-7812-46be-bda6-7bbc19f69ed2",
          "contentType": "tv_series",
          "title": "The Trauma Code: Heroes on Call",
          "slug": "the-trauma-code-heroes-on-call-2025",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/y8h2RwUZM5chv9tuaKVwSPoo3KE.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/58XBnfKhP569SuZuXks3fNYpLBm.jpg",
          "logoPath": null,
          "releaseDate": "2025-01-24",
          "runtimeMinutes": null,
          "voteAverage": 8.51,
          "viewCount": 233577,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "1f989a39-c087-4f0b-b6e4-50ae67939357",
          "contentType": "movie",
          "title": "Irish Wish",
          "slug": "irish-wish-2024",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/v4Bb70dpIIQoEnZAHnm3nzCPauU.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/kYtxAK6zamj1tN9i2yUuPMiRa2M.jpg",
          "logoPath": null,
          "releaseDate": "2024-03-14",
          "runtimeMinutes": null,
          "voteAverage": 6.1,
          "viewCount": 1246,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "32b47770-fed5-4579-a89a-af13a98c92ac",
          "contentType": "tv_series",
          "title": "Take Charge of My Heart",
          "slug": "take-charge-of-my-heart-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/ecRrKGXfflZmDZBD4irdkybClT.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/cHO75BxLM6sz7NsiVyaBmkKnmgg.jpg",
          "logoPath": null,
          "releaseDate": "2026-10-09",
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 388824,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "884ce88c-3b1d-4d06-9e0e-33733400a6ef",
          "contentType": "movie",
          "title": "Joe's College Road Trip",
          "slug": "joes-college-road-trip-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/jWGOCUlzF4aCVLwHoiuqWWfhcrA.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/dbr3eceKuGnKc9v5GaVTVtegZNK.jpg",
          "logoPath": null,
          "releaseDate": "2026-02-12",
          "runtimeMinutes": null,
          "voteAverage": 5.7,
          "viewCount": 506,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "f68f2d9a-eb14-44cc-888e-338d6d83c9c8",
          "contentType": "movie",
          "title": "Adam by Eve: A Live in Animation",
          "slug": "adam-by-eve-a-live-in-animation-2022",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/vI3aahilqPyMpNQQ7421GSEHRLX.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/9GU2FxuR4mUs4lP855woWLAOYpN.jpg",
          "logoPath": null,
          "releaseDate": "2022-03-15",
          "runtimeMinutes": null,
          "voteAverage": 6.99,
          "viewCount": 1597,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "9c52bdae-65f3-4984-9f28-d1a12e0dedda",
          "contentType": "movie",
          "title": "Mank",
          "slug": "mank-2020",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/4yzTcAtvzyZLLto4z04xobUK9el.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/hBOH4PNnhcGPgZbZjBwkx9gnNxI.jpg",
          "logoPath": null,
          "releaseDate": "2020-11-13",
          "runtimeMinutes": null,
          "voteAverage": 6.68,
          "viewCount": 409,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "8633eb09-b57f-4450-890f-e90564a20097",
          "contentType": "tv_series",
          "title": "Crew Girl",
          "slug": "crew-girl-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/tzf21i1ETZEu7i787ED3WThROH.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/lmtTtOjsIBxwKD7LsAD5eeyhq1g.jpg",
          "logoPath": null,
          "releaseDate": "2026-09-10",
          "runtimeMinutes": null,
          "voteAverage": 7.4,
          "viewCount": 201187,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "09b3a44e-79e5-4fbc-99b7-dee744a538d1",
          "contentType": "movie",
          "title": "In Love and Deep Water",
          "slug": "in-love-and-deep-water-2023",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/jiLBqxb1AceLSWy8oPKn4w7DXOE.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/4B3oS9lESptSBvlZxFw2ymLhUJd.jpg",
          "logoPath": null,
          "releaseDate": "2023-11-16",
          "runtimeMinutes": null,
          "voteAverage": 5.7,
          "viewCount": 742,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "e4c1e466-0eed-4c54-90e5-f7a9ec3a9161",
          "contentType": "movie",
          "title": "This Is I",
          "slug": "this-is-i-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/3aMYB238ZU2GPjP7YAvcIzPjQaN.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/6aa0MMYI0cnrAw2ra3E5CmfHfUV.jpg",
          "logoPath": null,
          "releaseDate": "2026-02-10",
          "runtimeMinutes": null,
          "voteAverage": 7.19,
          "viewCount": 1183,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "70151d9e-1079-4227-84de-07786a73e190",
          "contentType": "movie",
          "title": "10DANCE",
          "slug": "10dance-2025",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/gwWzQvuQhxngTiGmX70PcYW99mB.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/hsuT5b5EcDAVCY3Oe0Iyez2lTES.jpg",
          "logoPath": null,
          "releaseDate": "2025-12-17",
          "runtimeMinutes": null,
          "voteAverage": 7.48,
          "viewCount": 2367,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "5edd51d8-e3d5-46f4-813c-99a941d5b967",
          "contentType": "tv_series",
          "title": "The Scandal",
          "slug": "the-scandal-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/pJsIzlTjmx07ilwEkl0cglrMVa1.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/uc1p1PEbEMpdIHqnU9TESNC6Jhp.jpg",
          "logoPath": null,
          "releaseDate": "2026-09-18",
          "runtimeMinutes": null,
          "voteAverage": 6.5,
          "viewCount": 585511,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "a7f858c8-6a46-4abe-b1a6-5598ddabe041",
          "contentType": "movie",
          "title": "The Twits",
          "slug": "the-twits-2025",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/zNP1nMRFqa9qAkpCkLeHa1V7kDR.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/i4o2aPGlnsxfPmDPF5lmlgjScyv.jpg",
          "logoPath": null,
          "releaseDate": "2025-10-17",
          "runtimeMinutes": null,
          "voteAverage": 6.01,
          "viewCount": 2472,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "0ef816a2-a397-40c6-bd13-e88a3e29cde0",
          "contentType": "tv_series",
          "title": "Teach You a Lesson",
          "slug": "teach-you-a-lesson-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/gN7Tq35raryabkPGcKlb4ZKeutm.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/vAlyMWbVUWImy0SFsDdROjy23mK.jpg",
          "logoPath": null,
          "releaseDate": "2026-06-05",
          "runtimeMinutes": null,
          "voteAverage": 7.6,
          "viewCount": 5866544,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "34c01dd6-aec0-4189-aedc-c59c8bca87ef",
          "contentType": "tv_series",
          "title": "Our Sticky Love",
          "slug": "our-sticky-love-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/tSZ4aFpTGc8Oj52SuzPUUZ7WKL0.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/mp2AFsWsuyxCzenJh3DTKw7z4jG.jpg",
          "logoPath": null,
          "releaseDate": "2026-08-07",
          "runtimeMinutes": null,
          "voteAverage": 8,
          "viewCount": 1627016,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        }
      ]
    },
    {
      "sectionId": "a3e1baed-9d60-47b2-9bf0-6f2070d516d8",
      "type": "collection",
      "title": "Collections",
      "slug": "collections",
      "items": [
        {
          "id": "20480545-e2fb-4cd4-9b17-aa85c5dddb5d",
          "contentType": "tv_series",
          "title": "Legend of the Female General",
          "slug": "legend-of-the-female-general-2025",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/r1EMXYnqFDk9tzkkoxFwFjxCEvC.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/mwiG510fVcOrzWUSDSV7B5tRMrb.jpg",
          "logoPath": null,
          "releaseDate": "2025-08-06",
          "runtimeMinutes": null,
          "voteAverage": 8.28,
          "viewCount": 36469,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "8de1ec3b-cca6-4a50-bc37-aff63887992a",
          "contentType": "tv_series",
          "title": "Everyone Loves Me",
          "slug": "everyone-loves-me-2024",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/sgWR52ebu4rRCgJjYxCliCITh7H.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/cT0BHScPLuvpWywZ04gLxF7q3K5.jpg",
          "logoPath": null,
          "releaseDate": "2024-03-01",
          "runtimeMinutes": null,
          "voteAverage": 8.1,
          "viewCount": 13144,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "a9d3ecc7-7718-41b3-b8ec-111ff938d865",
          "contentType": "movie",
          "title": "Big World",
          "slug": "big-world-2024",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/rLj287mA1tp4hZmd69umb1rOZu8.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/fK8aA2X9EANs9Bfc5fZ6q9Gj7la.jpg",
          "logoPath": null,
          "releaseDate": "2024-12-27",
          "runtimeMinutes": 131,
          "voteAverage": 8.04,
          "viewCount": 24947,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "9834c688-d291-4f33-b498-63b0a8c3e040",
          "contentType": "tv_series",
          "title": "Veil of Shadows",
          "slug": "veil-of-shadows-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/y5d81ViUlIBXxeEKsDAayxvEdAv.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/aiB8FUWA2suTybceLsOnfBWk8L6.jpg",
          "logoPath": null,
          "releaseDate": "2026-04-01",
          "runtimeMinutes": null,
          "voteAverage": 8.5,
          "viewCount": 44456,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "a87c1c08-fd68-4c3a-805e-6335e61fe8cb",
          "contentType": "tv_series",
          "title": "Derailment",
          "slug": "derailment-2023",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/eVnw1ATwtaTjcbZjUe61JK6OuzH.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/xzp1qssjzGwhjynTSSreIZyvfoZ.jpg",
          "logoPath": null,
          "releaseDate": "2023-12-14",
          "runtimeMinutes": null,
          "voteAverage": 6.78,
          "viewCount": 14382,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "c0fb3982-7cf3-4a32-9a2f-d64221c7f35f",
          "contentType": "tv_series",
          "title": "The White Olive Tree",
          "slug": "the-white-olive-tree-2025",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/sLJ7z9IT0nLXJbuszYbZ4uy8AOO.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/hb3azgm5IrLHb7vr9YHs5GqN1Vl.jpg",
          "logoPath": null,
          "releaseDate": "2025-02-01",
          "runtimeMinutes": null,
          "voteAverage": 8.9,
          "viewCount": 23341,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "3954884a-4ceb-4bc1-9c64-622815f66d07",
          "contentType": "tv_series",
          "title": "Love Story in the 1970s",
          "slug": "love-story-in-the-1970s-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/oHJEOqCThfhyLthWV9NldZketwU.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/ufgYAZofbUE7x7MGHaJ5wKj7Or8.jpg",
          "logoPath": null,
          "releaseDate": "2026-02-21",
          "runtimeMinutes": null,
          "voteAverage": 7.33,
          "viewCount": 14387,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "4feebf16-7190-4fa2-9be2-9c4b1c301cef",
          "contentType": "tv_series",
          "title": "Moonlight Mystique",
          "slug": "moonlight-mystique-2025",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/4tqNdo1e3dwxPUGGidcuT9IMfJ1.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/a6t5tRwdNh9MlYub0fr2HetALeh.jpg",
          "logoPath": null,
          "releaseDate": "2025-01-07",
          "runtimeMinutes": null,
          "voteAverage": 7.9,
          "viewCount": 18053,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "2423ad65-312e-42f5-bd17-205541a1df83",
          "contentType": "tv_series",
          "title": "Love Has Fireworks",
          "slug": "love-has-fireworks-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/6CgxIE21h2EofyrbTja1Jscgx35.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/xEUcPKH4Nfm6XSuyzgkox6mh775.jpg",
          "logoPath": null,
          "releaseDate": "2026-06-15",
          "runtimeMinutes": null,
          "voteAverage": 7.67,
          "viewCount": 33797,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "baa67e3e-bd84-4bfd-ad6b-9cd33c9c634a",
          "contentType": "tv_series",
          "title": "Our Generation",
          "slug": "our-generation-2025",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/hj0m5txbc6bNftNHPdU95KEQInL.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/8yfPXapjvJhFnpSEXrGN8cqV1fD.jpg",
          "logoPath": null,
          "releaseDate": "2025-07-14",
          "runtimeMinutes": null,
          "voteAverage": 8.5,
          "viewCount": 23376,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "2ca794b7-fdf7-4ffc-bde1-079b00d33cbc",
          "contentType": "movie",
          "title": "Man in Love",
          "slug": "man-in-love-2021",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/sGFS01I30wgAtsWF2HXFPVmRAmd.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/nKNAWa7ATTHUP90lEMA00h7L26P.jpg",
          "logoPath": null,
          "releaseDate": "2021-04-01",
          "runtimeMinutes": 115,
          "voteAverage": 7.1,
          "viewCount": 23262,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "d80e25d0-5bcf-49d1-8a89-182c1f37cf21",
          "contentType": "tv_series",
          "title": "Youthful Glory",
          "slug": "youthful-glory-2025",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/qnvUc7dlsvRj807HbmkReWYJ77t.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/hAqIdjKhUVCLKB94w4fawIujJFF.jpg",
          "logoPath": null,
          "releaseDate": "2025-05-19",
          "runtimeMinutes": null,
          "voteAverage": 9.4,
          "viewCount": 23460,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "7dfc6ae6-c4fc-43f9-844c-40f394eebb47",
          "contentType": "tv_series",
          "title": "The First Jasmine",
          "slug": "the-first-jasmine-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/ygvVoUa6S88aT3vPMi1WVUt2meo.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/gxkcHgZJfyGZOtVPdfGOtFnmwHT.jpg",
          "logoPath": null,
          "releaseDate": "2026-06-09",
          "runtimeMinutes": null,
          "voteAverage": 9,
          "viewCount": 40911,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "8dc5bf66-2ecb-4717-8c8c-9e94f3aea3e9",
          "contentType": "tv_series",
          "title": "Generation to Generation",
          "slug": "generation-to-generation-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/gKaa3F5dvrkRTq0h94SipCLGK5m.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/6640A10Z0aysTCroNQQPK8ZB4FH.jpg",
          "logoPath": null,
          "releaseDate": "2026-02-22",
          "runtimeMinutes": null,
          "voteAverage": 8.2,
          "viewCount": 42164,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "aace3786-b192-45ff-b166-75804aacec72",
          "contentType": "tv_series",
          "title": "Amidst a Snowstorm of Love",
          "slug": "amidst-a-snowstorm-of-love-2024",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/1v5ABzgSMlVJG2acb6S6JAkEM2S.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/2EiNPJuZMTY7Bm9setnS1GqhGAl.jpg",
          "logoPath": null,
          "releaseDate": "2024-02-02",
          "runtimeMinutes": null,
          "voteAverage": 8.1,
          "viewCount": 21007,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        }
      ]
    },
    {
      "sectionId": "f924e937-05da-4c54-b5b0-4a867cb84497",
      "type": "latest_movies",
      "title": "Recently Added Movies",
      "slug": "latest-movies",
      "items": [
        {
          "id": "9af82c4e-5f0f-4577-979b-69aeb9c8a518",
          "contentType": "movie",
          "title": "The Storm",
          "slug": "the-storm-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/5YNjTi5AhbSM4hDOynJcgFfvKRn.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/zN5mRDu6jOYt5EJGYGjhWgOGwor.jpg",
          "logoPath": null,
          "releaseDate": "2026-10-15",
          "runtimeMinutes": null,
          "voteAverage": 9.25,
          "viewCount": 52,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "51280778-a6ea-4c4e-a0db-4f8d78d4cadb",
          "contentType": "movie",
          "title": "Sunny Dancer",
          "slug": "sunny-dancer-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/mXdejPfToSVFlEzv1QYoIh2N53e.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/hRsl1RMijpUCtLH3nZzRMnTjFYl.jpg",
          "logoPath": null,
          "releaseDate": "2026-08-12",
          "runtimeMinutes": 106,
          "voteAverage": 7.11,
          "viewCount": 9,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "0b4cc177-bb4f-4018-a2db-798d9ad16fca",
          "contentType": "movie",
          "title": "Love of Your Life",
          "slug": "love-of-your-life-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/gOaRyRpilYPEsVLEPHOH9eHNw5E.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/4hneB0UFKOZAGJHqJ3VhDcG72uH.jpg",
          "logoPath": null,
          "releaseDate": "2026-10-07",
          "runtimeMinutes": 109,
          "voteAverage": 6.3,
          "viewCount": 85,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "36eaa691-15b2-41b7-bd2b-c0c7c7214412",
          "contentType": "movie",
          "title": "Tad and The Magic Lamp",
          "slug": "tad-and-the-magic-lamp-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/AdDxZgNmRYgDuweY8899buyVqlr.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/zbpimMxf6Ms96v3Zypuv8WltMSO.jpg",
          "logoPath": null,
          "releaseDate": "2026-08-26",
          "runtimeMinutes": 94,
          "voteAverage": 7.14,
          "viewCount": 26,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "bb0040cd-40c0-44a7-b043-2b58086346f3",
          "contentType": "movie",
          "title": "The Incomer",
          "slug": "the-incomer-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/iccroKK1eUTdCnLfmp7I3YXwAKF.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/tcm829PtxDSomGOEXxzO7c0sK3p.jpg",
          "logoPath": null,
          "releaseDate": "2026-09-04",
          "runtimeMinutes": 102,
          "voteAverage": 7.46,
          "viewCount": 21,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "5a17d2a9-56dc-46d2-9a2e-61326e385cd6",
          "contentType": "movie",
          "title": "The Florist",
          "slug": "the-florist-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/4tnRvIiWMzVA2Tw9c7INLo4sfo0.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/jpH1VRw74w0vvPTY0ryKEtMIXc.jpg",
          "logoPath": null,
          "releaseDate": "2026-09-24",
          "runtimeMinutes": 99,
          "voteAverage": 6.72,
          "viewCount": 26,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "e18879bc-c841-4afc-a3c5-43893374c5d6",
          "contentType": "movie",
          "title": "The Sun Never Sets",
          "slug": "the-sun-never-sets-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/hpzzGHyVN4nE0GzqoAu12ko6ER3.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/9lU1L5xW0GPt3YGgmgcCoxREzhM.jpg",
          "logoPath": null,
          "releaseDate": "2026-08-28",
          "runtimeMinutes": 103,
          "voteAverage": 9.5,
          "viewCount": 35,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "82e2cc61-196b-4755-8075-edcd26cfbd27",
          "contentType": "movie",
          "title": "Don't Move",
          "slug": "dont-move-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/uh0ZSdM8iOQgHwnUlhhanP8Dkl6.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/1b0RrVxLAMhfT0vQXfWtDLwg1ke.jpg",
          "logoPath": null,
          "releaseDate": "2026-09-11",
          "runtimeMinutes": 94,
          "voteAverage": 5.83,
          "viewCount": 42,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "f0d6b8de-ffbc-411e-a62f-c48b3a7ac288",
          "contentType": "movie",
          "title": "Life of a King",
          "slug": "life-of-a-king-2013",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/b5dpHRk7Vuw54JocWGDTuRK22nU.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/xUpoUFez8y5DCNT6CUVemEHsSPd.jpg",
          "logoPath": null,
          "releaseDate": "2013-06-22",
          "runtimeMinutes": 101,
          "voteAverage": 7.3,
          "viewCount": 9,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "446fbae7-b474-4aad-86d3-a5ae04b6b3dc",
          "contentType": "movie",
          "title": "Love Actually",
          "slug": "love-actually-2003",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/7QPeVsr9rcFU9Gl90yg0gTOTpVv.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/xUWf5xX0AnZgAnYXAMk03zTbsef.jpg",
          "logoPath": null,
          "releaseDate": "2003-09-07",
          "runtimeMinutes": 135,
          "voteAverage": 7.1,
          "viewCount": 3,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "6490d24c-fc9d-433c-bd63-0a648f24753d",
          "contentType": "movie",
          "title": "The Last Castle",
          "slug": "the-last-castle-2001",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/pYnUfauPVK6g8IRO2REYl4TUZ2p.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/mYnCnyGxdtXo2PDhhyFT0er9sp5.jpg",
          "logoPath": null,
          "releaseDate": "2001-10-19",
          "runtimeMinutes": 131,
          "voteAverage": 7.2,
          "viewCount": 21,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "814396ec-747d-4fac-b8ca-6be9dbb9b63c",
          "contentType": "movie",
          "title": "Barbie in the Pink Shoes",
          "slug": "barbie-in-the-pink-shoes-2013",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/4HSPgeq04YUghXbSO5tSPP0jZ4k.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/fpTjdag7KBAj5yubi37AYgtIb9c.jpg",
          "logoPath": null,
          "releaseDate": "2013-02-14",
          "runtimeMinutes": 75,
          "voteAverage": 6.9,
          "viewCount": 11,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "3e83dd2a-44e5-44c4-b458-aa364be9c049",
          "contentType": "movie",
          "title": "Barbie in A Mermaid Tale 2",
          "slug": "barbie-in-a-mermaid-tale-2-2012",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/iVCfTtVDAECpbMSokSNilIR6wPr.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/pXurmwRwzq7UwTf9MdWGLiiDKN6.jpg",
          "logoPath": null,
          "releaseDate": "2012-02-22",
          "runtimeMinutes": 74,
          "voteAverage": 7.05,
          "viewCount": 11,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "7694c6e9-924e-427c-8d01-678cedd70a58",
          "contentType": "movie",
          "title": "Barbie in A Mermaid Tale",
          "slug": "barbie-in-a-mermaid-tale-2010",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/jtOlo3AaXVBnqfMeKGFrZUMPFui.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/csSEukCACMBPgqDgujDBHG4bfpj.jpg",
          "logoPath": null,
          "releaseDate": "2010-01-25",
          "runtimeMinutes": 75,
          "voteAverage": 7.26,
          "viewCount": 19,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "6fba35d4-7af9-43b9-a9b6-02ab579e94b7",
          "contentType": "movie",
          "title": "Barbie and the Three Musketeers",
          "slug": "barbie-and-the-three-musketeers-2009",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/zR0ts7zL2P1kQIQXYlnS4KCqqmu.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/7azfW8hJFlayltIW2Mc1jC78smZ.jpg",
          "logoPath": null,
          "releaseDate": "2009-09-15",
          "runtimeMinutes": 81,
          "voteAverage": 7.3,
          "viewCount": 15,
          "genres": [],
          "hasVideo": false
        }
      ]
    },
    {
      "sectionId": "0b5a5bf6-9684-476b-a1ac-357841df41d3",
      "type": "latest_series",
      "title": "Recently Added Series",
      "slug": "latest-series",
      "items": [
        {
          "id": "ea0c44b0-c3a3-4021-b700-abf291f2ca7e",
          "contentType": "tv_series",
          "title": "Make Me Tingle",
          "slug": "make-me-tingle-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/e4MlbtE02So4D5DJy197DbiAxqs.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/voAufY8Jv3AVfG15sxY5H6XWFKr.jpg",
          "logoPath": null,
          "releaseDate": "2026-10-15",
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 192,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "54624fe2-96f2-4fd9-aeaa-4f73f86fdcc7",
          "contentType": "tv_series",
          "title": "VisionQuest",
          "slug": "visionquest-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/WGyAyBPncfuu8MZhLY9RtfZPM0.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/uoXXbN2PrOxH6UKyP7kYwmGpAAP.jpg",
          "logoPath": null,
          "releaseDate": "2026-10-13",
          "runtimeMinutes": null,
          "voteAverage": 9.3,
          "viewCount": 64048,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "dd53ca45-d9f9-4782-8697-65da2eb28865",
          "contentType": "tv_series",
          "title": "The Trap",
          "slug": "the-trap-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/dkLTaC44QqnCAgzCf180TxMmmG5.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/69XNjGvcopgPz9Hte0ny1Swk2vW.jpg",
          "logoPath": null,
          "releaseDate": "2026-10-13",
          "runtimeMinutes": null,
          "voteAverage": 7,
          "viewCount": 1148,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "b49a66f1-396f-4162-b6d7-5b4b75f7fac9",
          "contentType": "tv_series",
          "title": "TYSON",
          "slug": "tyson-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/mdtpJEWW1j5Ns7bIcbw1UeIdvhp.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/qFNAWAHCXWtS4EMlLxTAetTpZAR.jpg",
          "logoPath": null,
          "releaseDate": "2026-10-13",
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 444,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "01e5920d-6258-4134-b3bb-bcaec356b5a0",
          "contentType": "tv_series",
          "title": "Kindred",
          "slug": "kindred-2022",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/iSrPT4PQmrVDGdp55cCShrpBMlj.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/nCy0y2zbHt8y7Behadt9SaYfE0Q.jpg",
          "logoPath": null,
          "releaseDate": "2022-12-13",
          "runtimeMinutes": null,
          "voteAverage": 6.4,
          "viewCount": 77,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "709455f9-b892-4ed2-9f45-5515806e723c",
          "contentType": "tv_series",
          "title": "Hitori No Shita - The Outcast",
          "slug": "hitori-no-shita-the-outcast-2016",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/i3Vg5SKaWWNjMvK3CsuK5itIrzG.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/tRQMZPYWQTOygIeGZ7rmmQaeq1z.jpg",
          "logoPath": null,
          "releaseDate": "2016-07-09",
          "runtimeMinutes": null,
          "voteAverage": 7,
          "viewCount": 210,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "4354d4e7-2265-4e06-94d6-55c32962c854",
          "contentType": "tv_series",
          "title": "The Great North",
          "slug": "the-great-north-2021",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/7Ww56dPIuXn4NZGrJJPdoafLHGu.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/61sQakosFlSETNNCS9Mn2SqFVUf.jpg",
          "logoPath": null,
          "releaseDate": "2021-01-03",
          "runtimeMinutes": null,
          "voteAverage": 6.9,
          "viewCount": 329,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 5
        },
        {
          "id": "2cc8d2cd-fe86-420e-b224-090431dd0ede",
          "contentType": "tv_series",
          "title": "Full-Time Magister",
          "slug": "full-time-magister-2016",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/csprfx9Vp7n5eINBT9DWKPa6r4g.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/9fOVK3e3SXQgkjPkCtEN5SRdpEg.jpg",
          "logoPath": null,
          "releaseDate": "2016-09-02",
          "runtimeMinutes": null,
          "voteAverage": 7.34,
          "viewCount": 2015,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 7
        },
        {
          "id": "bcbf57c2-f3ca-412b-bb19-31e014123d13",
          "contentType": "tv_series",
          "title": "Mobile Suit Gundam: Iron-Blooded Orphans",
          "slug": "mobile-suit-gundam-iron-blooded-orphans-2015",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/x5M9yxvBhrUP4rsKSl3d9VzK7O.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/52mp7oFltDUkw3kx1ArlRZkLyr3.jpg",
          "logoPath": null,
          "releaseDate": "2015-10-04",
          "runtimeMinutes": null,
          "voteAverage": 7.5,
          "viewCount": 3533,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "f05d7b91-31b1-49aa-827f-ef0426ed3512",
          "contentType": "tv_series",
          "title": "New Recruit",
          "slug": "new-recruit-2022",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/yB9eZWC7LR5Lz1uomfCojPFBOzI.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/59L3nBw75WmT0fkgHfib6eayRc6.jpg",
          "logoPath": null,
          "releaseDate": "2022-07-22",
          "runtimeMinutes": null,
          "voteAverage": 8.5,
          "viewCount": 3916,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 4
        },
        {
          "id": "74bd9dec-53f5-45d8-9073-5f68196227c8",
          "contentType": "tv_series",
          "title": "Grow Up Show",
          "slug": "grow-up-show-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/f5xG4oxOWnGVpAqgOj1RgIT3qOi.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/kVX2lGqrPfXcRypZGnV2jn3h9rm.jpg",
          "logoPath": null,
          "releaseDate": "2026-07-05",
          "runtimeMinutes": null,
          "voteAverage": 6.8,
          "viewCount": 239,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "06806184-b600-4a2a-a313-6930eeda42de",
          "contentType": "tv_series",
          "title": "Dara-san of Reiwa",
          "slug": "dara-san-of-reiwa-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/s0rPBaoGFTVR5KglSEzbBQ2u256.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/t9pxS8JUIya68VOIRVAu8rhbGZL.jpg",
          "logoPath": null,
          "releaseDate": "2026-07-02",
          "runtimeMinutes": null,
          "voteAverage": 8.18,
          "viewCount": 2974,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "af1a088f-fea1-4a51-a623-76790f66f611",
          "contentType": "tv_series",
          "title": "100 Days of Deception",
          "slug": "100-days-of-deception-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/bZHEU42QynnMrHUWK1Hhvj2cdPA.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/3SvKCITqMtjgPIhFBjRc4yTAc4H.jpg",
          "logoPath": null,
          "releaseDate": "2026-10-10",
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 55184,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "02bae586-9dd0-4058-83cd-fb1d884b0211",
          "contentType": "tv_series",
          "title": "Matori & Kyoken Men in the Back Alleys",
          "slug": "matori-and-kyoken-men-in-the-back-alleys-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/yfySM9i4pSTJy5WMbGB7ct9kNzc.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/1quBFuyulJfThLrtdllalN3ihcb.jpg",
          "logoPath": null,
          "releaseDate": "2026-01-21",
          "runtimeMinutes": null,
          "voteAverage": 7,
          "viewCount": 661,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "22fc4e8e-bb81-49b7-9598-d4eb004f0db4",
          "contentType": "tv_series",
          "title": "Live Forever",
          "slug": "live-forever-2026",
          "overview": "",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/xy7nZn7cTcroJjyiUA4gzxtrLEr.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/4ipPELpw6fwBclwFjWYdNXN6kJw.jpg",
          "logoPath": null,
          "releaseDate": "2026-09-24",
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 473,
          "genres": [],
          "hasVideo": false,
          "numberOfSeasons": 1
        }
      ]
    },
    {
      "sectionId": "6d24a2be-8f22-41e1-a008-f71c97d0075a",
      "type": "tmdb_trending",
      "title": "TMDB TRENDING",
      "slug": "tmdb-trending",
      "items": [
        {
          "id": "32b47770-fed5-4579-a89a-af13a98c92ac",
          "contentType": "tv_series",
          "title": "Take Charge of My Heart",
          "slug": "take-charge-of-my-heart-2026",
          "overview": "A corporate heir with an artificial heart meets a woman who's literally electric. They strike a deal that makes his heart beat — in more ways than one.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/ecRrKGXfflZmDZBD4irdkybClT.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/cHO75BxLM6sz7NsiVyaBmkKnmgg.jpg",
          "logoPath": "/gkBFyWEjj9iJgwLVGZkxZ7Lh2fu.png",
          "releaseDate": "2026-10-09",
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 388824,
          "genres": [
            "Comedy",
            "Fantasy",
            "Science Fiction"
          ],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "6d232e0c-7f9b-43f6-a323-6e78ff6763f9",
          "contentType": "tv_series",
          "title": "The Mentalist",
          "slug": "the-mentalist-2008",
          "overview": "Patrick Jane, a former celebrity psychic medium, uses his razor sharp skills of observation and expertise at \"reading\" people to solve serious crimes with the California Bureau of Investigation.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/acYXu4KaDj1NIkMgObnhe4C4a0T.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/q3pCsNvJ7CmdJUz2sJEEUY3pOPC.jpg",
          "logoPath": "/aB5jf4O14dykrksrPgtOlvVk0pi.svg",
          "releaseDate": "2008-09-23",
          "runtimeMinutes": null,
          "voteAverage": 8.36,
          "viewCount": 2793592,
          "genres": [
            "Drama",
            "Crime",
            "Mystery"
          ],
          "hasVideo": false,
          "numberOfSeasons": 7,
          "numberOfEpisodes": 149
        },
        {
          "id": "397b6518-a62f-422e-958f-5aeb3fb2d3f4",
          "contentType": "tv_series",
          "title": "Doctor X: Mafia in White",
          "slug": "doctor-x-mafia-in-white-2026",
          "overview": "In a hospital dominated by ego and corruption, an enigmatic but brilliant surgeon arrives — taking on seemingly impossible cases amid fierce opposition.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/nDDVzQfv95PGwj9nV2fJvUrkcvU.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/gEIYUsH0V2tDUTwnA2NNCw1cD0f.jpg",
          "logoPath": "/sU3HlqW8J1rtLigitz2rBiTLTUC.png",
          "releaseDate": "2026-10-09",
          "runtimeMinutes": null,
          "voteAverage": 10,
          "viewCount": 215840,
          "genres": [
            "Drama",
            "Crime",
            "Mystery"
          ],
          "hasVideo": false,
          "numberOfSeasons": 1,
          "numberOfEpisodes": 1
        },
        {
          "id": "eb95fa3f-bdf8-4557-bb73-d27e7350f656",
          "contentType": "tv_series",
          "title": "Carrie",
          "slug": "carrie-2026",
          "overview": "Misfit teenager Carrie White has spent her life in seclusion with her domineering mother, Margaret. After her father's sudden death, Carrie finds herself contending with the challenges of attending public high school, a bullying scandal, and the emergence of mysterious telekinetic powers.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/eXjk4W4robXs7l1YXwaXMv4f2qb.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/vVaNTaRHlL1i8JVsZsNtRHGBhPm.jpg",
          "logoPath": "/p7lOufvkG9Od7280KE91ca5TLW5.png",
          "releaseDate": "2026-10-07",
          "runtimeMinutes": null,
          "voteAverage": 7.8,
          "viewCount": 172559,
          "genres": [
            "Drama",
            "Mystery"
          ],
          "hasVideo": false,
          "numberOfSeasons": 1
        },
        {
          "id": "3932672a-57da-4321-afbf-514f704f0ee6",
          "contentType": "tv_series",
          "title": "Black Clover",
          "slug": "black-clover-2017",
          "overview": "Asta and Yuno are two orphans who want the same thing: to become the Wizard King. Locked in a friendly rivalry, they work hard towards their goal. While Yuno excels at magic, Asta has a problem uncommon in this world: he has no powers! But, on the day they receive their grimoires, they surprise everyone. To reach their goal, they’ll each find their own path to greatness—with or without magic.",
          "tagline": null,
          "posterPath": "https://image.tmdb.org/t/p/w500/kaMisKeOoTBPxPkbC3OW7Wgt6ON.jpg",
          "backdropPath": "https://image.tmdb.org/t/p/original/oUsm3pq6rUga7lVGQFS3g84etVE.jpg",
          "logoPath": "/j9ZZ7WV5pwLLXbbebyGdMUxbqrc.png",
          "releaseDate": "2017-10-03",
          "runtimeMinutes": null,
          "voteAverage": 8.5,
          "viewCount": 336103,
          "genres": [
            "Action",
            "Animation",
            "Adventure",
            "Fantasy",
            "Science Fiction"
          ],
          "hasVideo": false,
          "numberOfSeasons": 2,
          "numberOfEpisodes": 170
        }
      ]
    },
    {
      "sectionId": "75241795-6dc6-4fd9-811f-2449a716aebb",
      "type": "latest_episodes",
      "title": "Recently Added Episodes",
      "slug": "latest-episodes",
      "items": [
        {
          "id": "6dcbcb51-b0b1-4570-9570-ba35aaef4706",
          "contentType": "episode",
          "title": "Birdland",
          "slug": "",
          "overview": "",
          "tagline": null,
          "posterPath": "",
          "backdropPath": "",
          "logoPath": null,
          "releaseDate": null,
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 0,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "c0ae2fde-0861-4bcf-a9dd-eb4f57280b15",
          "contentType": "episode",
          "title": "Check-Ins",
          "slug": "",
          "overview": "",
          "tagline": null,
          "posterPath": "",
          "backdropPath": "",
          "logoPath": null,
          "releaseDate": null,
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 0,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "a64c55d1-9f8a-42a1-8ba4-f8db1d281118",
          "contentType": "episode",
          "title": "My Chief",
          "slug": "",
          "overview": "",
          "tagline": null,
          "posterPath": "",
          "backdropPath": "",
          "logoPath": null,
          "releaseDate": null,
          "runtimeMinutes": null,
          "voteAverage": 7,
          "viewCount": 0,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "c67817c4-df45-4472-a088-dbfb5500fa75",
          "contentType": "episode",
          "title": "Episode 4",
          "slug": "",
          "overview": "",
          "tagline": null,
          "posterPath": "",
          "backdropPath": "",
          "logoPath": null,
          "releaseDate": null,
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 0,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "96527bee-6158-4183-8f83-ed0b7005f81d",
          "contentType": "episode",
          "title": "Episode 3",
          "slug": "",
          "overview": "",
          "tagline": null,
          "posterPath": "",
          "backdropPath": "",
          "logoPath": null,
          "releaseDate": null,
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 0,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "b051e0e2-f589-4a33-8606-cdec553efde8",
          "contentType": "episode",
          "title": "Episode 2",
          "slug": "",
          "overview": "",
          "tagline": null,
          "posterPath": "",
          "backdropPath": "",
          "logoPath": null,
          "releaseDate": null,
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 0,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "75f8bc75-660f-48e0-9deb-5b5e6f160667",
          "contentType": "episode",
          "title": "Episode 1",
          "slug": "",
          "overview": "",
          "tagline": null,
          "posterPath": "",
          "backdropPath": "",
          "logoPath": null,
          "releaseDate": null,
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 0,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "4b86f190-2861-41d7-9524-bcc56cb7ad22",
          "contentType": "episode",
          "title": "There's No Place Like Home (3)",
          "slug": "",
          "overview": "",
          "tagline": null,
          "posterPath": "",
          "backdropPath": "",
          "logoPath": null,
          "releaseDate": null,
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 0,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "32374801-be7f-4d80-b742-34543641916b",
          "contentType": "episode",
          "title": "Exodus (3)",
          "slug": "",
          "overview": "",
          "tagline": null,
          "posterPath": "",
          "backdropPath": "",
          "logoPath": null,
          "releaseDate": null,
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 0,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "db077b51-65a3-4bcb-871b-677d82c5ce29",
          "contentType": "episode",
          "title": "Episode 2",
          "slug": "",
          "overview": "",
          "tagline": null,
          "posterPath": "",
          "backdropPath": "",
          "logoPath": null,
          "releaseDate": null,
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 0,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "c9bb4225-36d8-4e8f-a2ba-10aec1eab323",
          "contentType": "episode",
          "title": "Better Luck Tomorrow",
          "slug": "",
          "overview": "",
          "tagline": null,
          "posterPath": "",
          "backdropPath": "",
          "logoPath": null,
          "releaseDate": null,
          "runtimeMinutes": null,
          "voteAverage": 9,
          "viewCount": 0,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "5032c905-de16-4342-b5d2-c7b7debad5dc",
          "contentType": "episode",
          "title": "Exit Wounds",
          "slug": "",
          "overview": "",
          "tagline": null,
          "posterPath": "",
          "backdropPath": "",
          "logoPath": null,
          "releaseDate": null,
          "runtimeMinutes": null,
          "voteAverage": 10,
          "viewCount": 0,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "660debe2-4bc9-4e83-8543-a10ca0351532",
          "contentType": "episode",
          "title": "Gimpy Gimpy",
          "slug": "",
          "overview": "",
          "tagline": null,
          "posterPath": "",
          "backdropPath": "",
          "logoPath": null,
          "releaseDate": null,
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 0,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "fb96347f-ed96-4140-8d66-a5ab7ec6a043",
          "contentType": "episode",
          "title": "Bad Reputation",
          "slug": "",
          "overview": "",
          "tagline": null,
          "posterPath": "",
          "backdropPath": "",
          "logoPath": null,
          "releaseDate": null,
          "runtimeMinutes": null,
          "voteAverage": 0,
          "viewCount": 0,
          "genres": [],
          "hasVideo": false
        },
        {
          "id": "8e2a3581-9835-420e-ad2d-52f49931423c",
          "contentType": "episode",
          "title": "Turtle Emoji",
          "slug": "",
          "overview": "",
          "tagline": null,
          "posterPath": "",
          "backdropPath": "",
          "logoPath": null,
          "releaseDate": null,
          "runtimeMinutes": null,
          "voteAverage": 10,
          "viewCount": 0,
          "genres": [],
          "hasVideo": false
        }
      ]
    }
  ]
}
```
---

Endpoint 2:
```
https://indocast.site/api/idlix/home/network?network=netflix&page=1&limit=36&sort=latest
```
- untuk network itu adalah list yang berisi: Netflix, hbo, prime-video,  disney-plus, apple-tv-plus

- untuk short: latest, populer, realese, views, rating

Response:
```json
{
  "networkName": "netflix",
  "sortBy": "latest",
  "pagination": {
    "page": 1,
    "limit": 36,
    "total": 1387,
    "totalPages": 39
  },
  "data": [
    {
      "id": "dd53ca45-d9f9-4782-8697-65da2eb28865",
      "contentType": "tv_series",
      "title": "The Trap",
      "slug": "the-trap-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/dkLTaC44QqnCAgzCf180TxMmmG5.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/69XNjGvcopgPz9Hte0ny1Swk2vW.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-13",
      "runtimeMinutes": null,
      "voteAverage": 7,
      "viewCount": 1148,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "b49a66f1-396f-4162-b6d7-5b4b75f7fac9",
      "contentType": "tv_series",
      "title": "TYSON",
      "slug": "tyson-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/mdtpJEWW1j5Ns7bIcbw1UeIdvhp.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/qFNAWAHCXWtS4EMlLxTAetTpZAR.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-13",
      "runtimeMinutes": null,
      "voteAverage": 0,
      "viewCount": 444,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "32b47770-fed5-4579-a89a-af13a98c92ac",
      "contentType": "tv_series",
      "title": "Take Charge of My Heart",
      "slug": "take-charge-of-my-heart-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/ecRrKGXfflZmDZBD4irdkybClT.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/cHO75BxLM6sz7NsiVyaBmkKnmgg.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-09",
      "runtimeMinutes": null,
      "voteAverage": 0,
      "viewCount": 388824,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "ab1f108d-7bb9-43ab-9436-71628f7d160e",
      "contentType": "tv_series",
      "title": "Take a Hike!",
      "slug": "take-a-hike-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/ya3p0meUJJ92gjFRFcZ1C3TJ0nO.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/giJzZvC9p6QdSi9tCgcOJZcw2hY.jpg",
      "logoPath": null,
      "releaseDate": "2026-08-18",
      "runtimeMinutes": null,
      "voteAverage": 10,
      "viewCount": 2647,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "e48a09ba-0dcf-4b42-981b-cd24ec0829ee",
      "contentType": "tv_series",
      "title": "Wonka's The Golden Ticket",
      "slug": "wonkas-the-golden-ticket-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/5padVOGD7QxyFLlTAWdCFY2FQf1.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/vlG9Kc5Y82CwafLceR9CUkTe7U0.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-23",
      "runtimeMinutes": null,
      "voteAverage": 6,
      "viewCount": 3255,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "13e83bfc-04eb-41cb-ab22-d5e75485cf62",
      "contentType": "tv_series",
      "title": "Below",
      "slug": "below-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/wQcG0qZGRYAwfg3rfLCR1RwrBDZ.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/cn0feYcDvVzVjUDoXa1O8sRgzz.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-08",
      "runtimeMinutes": null,
      "voteAverage": 7.22,
      "viewCount": 12149,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "3fcbd828-a23b-4093-9cac-00ae9bac57b8",
      "contentType": "tv_series",
      "title": "Chumbak",
      "slug": "chumbak-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/r2TJ9s9uhfxTssar1gBAWcxIXx7.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/2N1kH7314XUfMw80iLZh1d2UoHY.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-10",
      "runtimeMinutes": null,
      "voteAverage": 3.5,
      "viewCount": 207,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "3b61bef3-f341-41c2-97f1-3f3e3b105430",
      "contentType": "tv_series",
      "title": "#Love",
      "slug": "love-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/cyJKP6Fsg8ds4O4g1Q1SCOKJQdn.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/xrm5XNKMuAnvnG9sokNYlaAng2G.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-02",
      "runtimeMinutes": null,
      "voteAverage": 10,
      "viewCount": 260,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "37288931-6d66-4f66-8b22-09c99d5c0be2",
      "contentType": "tv_series",
      "title": "Your Personal Taxi",
      "slug": "your-personal-taxi-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/600463FEirm57sAsFcD55iGbVrE.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/vk1wrUULLVeFNfVKSV5Q1L7ViGF.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-01",
      "runtimeMinutes": null,
      "voteAverage": 0,
      "viewCount": 2495,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "cca96aee-b00b-4251-94b3-8e6f93c39fa4",
      "contentType": "tv_series",
      "title": "Inside The Circle",
      "slug": "inside-the-circle-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/3JpnP8fYVb9B9FuvdGT4ZkRRYZJ.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/mnxeCdKE3mtVT8mB9lWs4JY3Mla.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-07",
      "runtimeMinutes": null,
      "voteAverage": 0,
      "viewCount": 585,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "55703be3-0d39-4fb2-9f78-ec3d8db28072",
      "contentType": "tv_series",
      "title": "East of Eden",
      "slug": "east-of-eden-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/axdUor6gLMTrrB1UF4Qfy0TTSyX.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/70RZX7kNjA0Qjn6HigB1oMvFJ8R.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-01",
      "runtimeMinutes": null,
      "voteAverage": 7.93,
      "viewCount": 7736,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "d35cc7c1-7d5b-4d54-a5ec-b3123de77bdf",
      "contentType": "tv_series",
      "title": "Physical 100: Italy",
      "slug": "physical-100-italy-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/AtYUDT5nEoFDOtR464mFlZCfcB5.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/li2io9zeJYJNWAf41J7fQIPtBR5.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-11",
      "runtimeMinutes": null,
      "voteAverage": 7.4,
      "viewCount": 1736,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "8d2ac205-bdd4-4bfa-82a6-a35aa621ccdd",
      "contentType": "movie",
      "title": "Doing Life",
      "slug": "doing-life-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/5nZVjsCk5tWyyhLGt5U2TxsR85w.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/nDScZ6YR2nfNCeK5bmJ1ujb355b.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-02",
      "runtimeMinutes": 112,
      "voteAverage": 5.89,
      "viewCount": 606,
      "genres": [],
      "hasVideo": false
    },
    {
      "id": "eefae65b-5bc9-4c40-b0d4-2c85d9a63ee7",
      "contentType": "tv_series",
      "title": "LEGO ONE PIECE",
      "slug": "lego-one-piece-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/hTUHZ337JzqPvRXBQ3lu0GBkOvz.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/1ftqNLph1CxcXxSXJsijjlw7ZkX.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-29",
      "runtimeMinutes": null,
      "voteAverage": 8.6,
      "viewCount": 4150,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "943f5ed7-72f3-4664-8aaa-5f9648a24c1f",
      "contentType": "tv_series",
      "title": "The Final Problem",
      "slug": "the-final-problem-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/v7LQJ8GUvvvKhGRNp8F4hiRzwiI.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/m9QKL9smb61v1XSYJoHdl7p5yUd.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-25",
      "runtimeMinutes": null,
      "voteAverage": 6.68,
      "viewCount": 1761,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "00469f8e-1af1-4feb-be0d-70f022331975",
      "contentType": "tv_series",
      "title": "A Different World",
      "slug": "a-different-world-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/mmE4RNbsPOwwRo5rnVRd1IXzgcZ.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/1lVbKPOVjTV02FtLqiPk9F9z1Fh.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-24",
      "runtimeMinutes": null,
      "voteAverage": 5.25,
      "viewCount": 3544,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "70cc0440-35eb-4d98-852f-514b3bfe8168",
      "contentType": "tv_series",
      "title": "My Sad Dead",
      "slug": "my-sad-dead-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/ojtRXQj7MvVw7oPkJwf0FPp61He.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/y3q1LeVYBU00ASSyjFSX9KerLzz.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-24",
      "runtimeMinutes": null,
      "voteAverage": 3,
      "viewCount": 192,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "b11b3073-b720-4269-81db-d5c5f1b5f64b",
      "contentType": "tv_series",
      "title": "Delusion",
      "slug": "delusion-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/9Z7Jsj6woszXLpXcs9TZtU4Fibr.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/cae4gjklRHnzQTmVCxpZnOdPw71.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-24",
      "runtimeMinutes": null,
      "voteAverage": 0,
      "viewCount": 2085,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "db19db93-3fd0-4366-9fcc-29edabe57188",
      "contentType": "tv_series",
      "title": "Shaque: Trust No One",
      "slug": "shaque-trust-no-one-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/xddc9KBcqffXjLEYLX8cZzRwYkS.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/uBk4ho8aHGnAG5zNX182mGMeAeZ.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-24",
      "runtimeMinutes": null,
      "voteAverage": 0,
      "viewCount": 1346,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "15f8c246-5e8d-47a5-9030-e2435de33164",
      "contentType": "tv_series",
      "title": "Physical 100: Mexico",
      "slug": "physical-100-mexico-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/vPsjiq0O8PCX9vdMCmXbbvVQmlC.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/u1D8LJejEZA0HqoPYKg9MAgHfYc.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-16",
      "runtimeMinutes": null,
      "voteAverage": 9,
      "viewCount": 5467,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "512a651b-b4dc-4319-8a48-602fd31ee35b",
      "contentType": "tv_series",
      "title": "Habeas Corpus",
      "slug": "habeas-corpus-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/cojcROwZe8681XzroVIOE9VK4zV.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/ssglI1XmPx5ks84jq1uGDwVZqD5.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-23",
      "runtimeMinutes": null,
      "voteAverage": 6.1,
      "viewCount": 580,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "1d3d9ef5-84a1-45b7-be63-915af87f87dc",
      "contentType": "tv_series",
      "title": "Minerva Academy",
      "slug": "minerva-academy-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/mVXUJjlOSiYMpApFoPyWTnqBhUm.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/zynoUI9kwDQKkGW5KqvxQp8Kj1Q.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-22",
      "runtimeMinutes": null,
      "voteAverage": 0,
      "viewCount": 23635,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "5edd51d8-e3d5-46f4-813c-99a941d5b967",
      "contentType": "tv_series",
      "title": "The Scandal",
      "slug": "the-scandal-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/pJsIzlTjmx07ilwEkl0cglrMVa1.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/uc1p1PEbEMpdIHqnU9TESNC6Jhp.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-18",
      "runtimeMinutes": null,
      "voteAverage": 6.5,
      "viewCount": 585511,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "b1f70066-548d-42d4-a994-b4fa029437de",
      "contentType": "tv_series",
      "title": "Plastic Beauty",
      "slug": "plastic-beauty-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/u0mCeqVvQW2HEfrRy1we9UklsQd.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/tvw5ipvdNBDSm8IazdVB5pm1yGw.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-17",
      "runtimeMinutes": null,
      "voteAverage": 7,
      "viewCount": 15330,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "17f0a60c-6a91-4db7-a23b-48669d1fc992",
      "contentType": "tv_series",
      "title": "Monster: The Lizzie Borden Story",
      "slug": "monster-the-lizzie-borden-story-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/57XScX1aYtKi1LvHYFQLPUxVhTG.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/3JVjgaqfX5MhxxHKpGWz05QV7Dz.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-17",
      "runtimeMinutes": null,
      "voteAverage": 8,
      "viewCount": 98443,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "b4157b4b-76c6-4118-8d2c-d8ee41d01052",
      "contentType": "tv_series",
      "title": "The Fixers",
      "slug": "the-fixers-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/hwEfhJNLii8oUfuiRBPk11DDv8y.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/iyHgIyMJ6Vd5w79dLeGOTOkqDS5.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-17",
      "runtimeMinutes": null,
      "voteAverage": 8,
      "viewCount": 14803,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "d60cfb44-c4a5-4fce-91d0-13c426c744bd",
      "contentType": "tv_series",
      "title": "Not a Stranger",
      "slug": "not-a-stranger-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/tgBRNtynz81e0DE4bWo8XwTbCw9.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/vPQ4Ctn8MS6NBP73duf0GHtbziU.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-17",
      "runtimeMinutes": null,
      "voteAverage": 0,
      "viewCount": 3392,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "fab5af64-1e55-456c-b853-9bebdb263954",
      "contentType": "tv_series",
      "title": "The Doll",
      "slug": "the-doll-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/zJSceCJMF7C6AtdRycZjNjavCT.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/7Q8H2rxsNzoNHagDEMcTlmAKtfb.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-16",
      "runtimeMinutes": null,
      "voteAverage": 5.5,
      "viewCount": 2171,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "8633eb09-b57f-4450-890f-e90564a20097",
      "contentType": "tv_series",
      "title": "Crew Girl",
      "slug": "crew-girl-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/tzf21i1ETZEu7i787ED3WThROH.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/lmtTtOjsIBxwKD7LsAD5eeyhq1g.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-10",
      "runtimeMinutes": null,
      "voteAverage": 7.4,
      "viewCount": 201187,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "1d21bcbd-3886-492d-afe6-2d230cbb72d7",
      "contentType": "tv_series",
      "title": "The Perfect Lie",
      "slug": "the-perfect-lie-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/a8qjbVX7lo1v7m5Awzhx7Ptk8gO.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/vYO9OkYHSNfYuqz6VMS4aCCfRb8.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-10",
      "runtimeMinutes": null,
      "voteAverage": 7,
      "viewCount": 4334,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "f50445ed-10c0-41af-be96-5c2c3a97370e",
      "contentType": "tv_series",
      "title": "DANG!",
      "slug": "dang-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/wSDM4tIC5praLH9GxZisiIBIkz.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/xcjvlbVkVvGodPdfv3c6NzknMIB.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-08",
      "runtimeMinutes": null,
      "voteAverage": 10,
      "viewCount": 5533,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "c6849673-0957-46a7-8b3a-d1a7f1939342",
      "contentType": "tv_series",
      "title": "Lovesick",
      "slug": "lovesick-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/91s80WxRqIirFSpGVtiXJoS1GA5.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/avfnPYtyKXjgnhqtKAt1PZO2h5I.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-02",
      "runtimeMinutes": null,
      "voteAverage": 8,
      "viewCount": 8852,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "b7722ed2-be85-4b7d-83ae-d07b8f001c80",
      "contentType": "tv_series",
      "title": "Mousetrap",
      "slug": "mousetrap-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/2mwgHfOyrFrmvozjFoEXHRdfGhv.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/bYtQiIibQzvMeXvLMKVcZ5DlT31.jpg",
      "logoPath": null,
      "releaseDate": "2026-08-28",
      "runtimeMinutes": null,
      "voteAverage": 0,
      "viewCount": 284187,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "d3517acd-80de-40f2-861f-b6ad59cf5b3c",
      "contentType": "tv_series",
      "title": "All the Truth In My Lies",
      "slug": "all-the-truth-in-my-lies-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/2udseY0mzsvkytPcSL4Vp612M1D.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/2udseY0mzsvkytPcSL4Vp612M1D.jpg",
      "logoPath": null,
      "releaseDate": "2026-08-28",
      "runtimeMinutes": null,
      "voteAverage": 0,
      "viewCount": 1342,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "c36ffd17-658c-4127-8a4f-84822b25e9b4",
      "contentType": "tv_series",
      "title": "Blood Sacrifice",
      "slug": "blood-sacrifice-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/8iFUWLKBAWDrJ9rOunscgIDrGQ1.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/z6mnJhvFbAgM1UTL87NWjJLhK26.jpg",
      "logoPath": null,
      "releaseDate": "2026-08-20",
      "runtimeMinutes": null,
      "voteAverage": 6.4,
      "viewCount": 1579,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "6c91c3e0-9c79-49f2-b536-5130846a7bb8",
      "contentType": "tv_series",
      "title": "S&X",
      "slug": "sandx-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/iyBgwNr5I7CW1Mf7ulPgdz3Y5Ax.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/iTmOvi8vZeFntt3q7BuWsPugmal.jpg",
      "logoPath": null,
      "releaseDate": "2026-08-20",
      "runtimeMinutes": null,
      "voteAverage": 0,
      "viewCount": 27767,
      "genres": [],
      "hasVideo": false,
      "numberOfSeasons": 1
    }
  ]
}
```
---

Endpoint 3:
```
https://indocast.site/api/idlix/movie/filters
```

Response:
```json
{
  "success": true,
  "message": "Filter options fetched successfully",
  "data": {
    "sort": [
      {
        "id": 1,
        "code": "releaseDate",
        "name": "Release Date"
      },
      {
        "id": 2,
        "code": "popularity",
        "name": "Popularity"
      },
      {
        "id": 3,
        "code": "views",
        "name": "Most Viewed"
      },
      {
        "id": 4,
        "code": "rating",
        "name": "Rating"
      },
      {
        "id": 5,
        "code": "createdAt",
        "name": "Recently Added"
      }
    ],
    "genres": [
      {
        "id": 1,
        "code": "action",
        "name": "Action"
      },
      {
        "id": 2,
        "code": "adventure",
        "name": "Adventure"
      },
      {
        "id": 3,
        "code": "animation",
        "name": "Animation"
      },
      {
        "id": 4,
        "code": "comedy",
        "name": "Comedy"
      },
      {
        "id": 5,
        "code": "crime",
        "name": "Crime"
      },
      {
        "id": 6,
        "code": "documentary",
        "name": "Documentary"
      },
      {
        "id": 7,
        "code": "drama",
        "name": "Drama"
      },
      {
        "id": 8,
        "code": "family",
        "name": "Family"
      },
      {
        "id": 9,
        "code": "fantasy",
        "name": "Fantasy"
      },
      {
        "id": 10,
        "code": "history",
        "name": "History"
      },
      {
        "id": 11,
        "code": "horror",
        "name": "Horror"
      },
      {
        "id": 12,
        "code": "kids",
        "name": "Kids"
      },
      {
        "id": 13,
        "code": "music",
        "name": "Music"
      },
      {
        "id": 14,
        "code": "mystery",
        "name": "Mystery"
      },
      {
        "id": 15,
        "code": "reality",
        "name": "Reality"
      },
      {
        "id": 16,
        "code": "romance",
        "name": "Romance"
      },
      {
        "id": 17,
        "code": "science-fiction",
        "name": "Science Fiction"
      },
      {
        "id": 18,
        "code": "soap",
        "name": "Soap"
      },
      {
        "id": 19,
        "code": "talk",
        "name": "Talk"
      },
      {
        "id": 20,
        "code": "thriller",
        "name": "Thriller"
      },
      {
        "id": 21,
        "code": "tv-movie",
        "name": "TV Movie"
      },
      {
        "id": 22,
        "code": "war",
        "name": "War"
      },
      {
        "id": 23,
        "code": "western",
        "name": "Western"
      }
    ],
    "countries": [
      {
        "id": 1,
        "code": "US",
        "name": "United States"
      },
      {
        "id": 2,
        "code": "ID",
        "name": "Indonesia"
      },
      {
        "id": 3,
        "code": "KR",
        "name": "South Korea"
      },
      {
        "id": 4,
        "code": "JP",
        "name": "Japan"
      },
      {
        "id": 5,
        "code": "CN",
        "name": "China"
      },
      {
        "id": 6,
        "code": "HK",
        "name": "Hong Kong"
      },
      {
        "id": 7,
        "code": "TW",
        "name": "Taiwan"
      },
      {
        "id": 8,
        "code": "TH",
        "name": "Thailand"
      },
      {
        "id": 9,
        "code": "IN",
        "name": "India"
      },
      {
        "id": 10,
        "code": "GB",
        "name": "United Kingdom"
      },
      {
        "id": 11,
        "code": "FR",
        "name": "France"
      },
      {
        "id": 12,
        "code": "DE",
        "name": "Germany"
      },
      {
        "id": 13,
        "code": "IT",
        "name": "Italy"
      },
      {
        "id": 14,
        "code": "ES",
        "name": "Spain"
      },
      {
        "id": 15,
        "code": "AU",
        "name": "Australia"
      },
      {
        "id": 16,
        "code": "CA",
        "name": "Canada"
      },
      {
        "id": 17,
        "code": "BR",
        "name": "Brazil"
      },
      {
        "id": 18,
        "code": "MX",
        "name": "Mexico"
      },
      {
        "id": 19,
        "code": "PH",
        "name": "Philippines"
      },
      {
        "id": 20,
        "code": "MY",
        "name": "Malaysia"
      },
      {
        "id": 21,
        "code": "SG",
        "name": "Singapore"
      },
      {
        "id": 22,
        "code": "VN",
        "name": "Vietnam"
      }
    ],
    "years": [
      {
        "id": 1,
        "code": "2026",
        "name": "2026"
      },
      {
        "id": 2,
        "code": "2025",
        "name": "2025"
      },
      {
        "id": 3,
        "code": "2024",
        "name": "2024"
      },
      {
        "id": 4,
        "code": "2023",
        "name": "2023"
      },
      {
        "id": 5,
        "code": "2022",
        "name": "2022"
      },
      {
        "id": 6,
        "code": "2021",
        "name": "2021"
      },
      {
        "id": 7,
        "code": "2020",
        "name": "2020"
      },
      {
        "id": 8,
        "code": "2019",
        "name": "2019"
      },
      {
        "id": 9,
        "code": "2018",
        "name": "2018"
      },
      {
        "id": 10,
        "code": "2017",
        "name": "2017"
      },
      {
        "id": 11,
        "code": "2016",
        "name": "2016"
      },
      {
        "id": 12,
        "code": "2015",
        "name": "2015"
      },
      {
        "id": 13,
        "code": "2014",
        "name": "2014"
      },
      {
        "id": 14,
        "code": "2013",
        "name": "2013"
      },
      {
        "id": 15,
        "code": "2012",
        "name": "2012"
      },
      {
        "id": 16,
        "code": "2011",
        "name": "2011"
      },
      {
        "id": 17,
        "code": "2010",
        "name": "2010"
      }
    ],
    "qualities": [
      {
        "id": 1,
        "code": "WEB-DL",
        "name": "WEB-DL"
      },
      {
        "id": 2,
        "code": "HD",
        "name": "HD"
      },
      {
        "id": 3,
        "code": "BLU-RAY",
        "name": "BluRay"
      },
      {
        "id": 4,
        "code": "4K",
        "name": "4K Ultra HD"
      }
    ]
  }
}
```
---

Endpoint 4:
```
https://indocast.site/api/idlix/movie?page=1&limit=36&sort=releaseDate
```

Response:
```json
{
  "pagination": {
    "page": 1,
    "limit": 36,
    "total": 7606,
    "totalPages": 212
  },
  "items": [
    {
      "id": "9af82c4e-5f0f-4577-979b-69aeb9c8a518",
      "contentType": "movie",
      "title": "The Storm",
      "slug": "the-storm-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/5YNjTi5AhbSM4hDOynJcgFfvKRn.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/zN5mRDu6jOYt5EJGYGjhWgOGwor.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-15",
      "runtimeMinutes": null,
      "voteAverage": 9.25,
      "viewCount": 56,
      "genres": [
        "Drama",
        "Comedy"
      ],
      "hasVideo": true
    },
    {
      "id": "8c353052-f980-414c-b591-9c478634330d",
      "contentType": "movie",
      "title": "Let's Have Kids!",
      "slug": "lets-have-kids-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/ciHBHFWAUn9tXNpm5NfDOkcgcMx.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/A42JE6WJDMsICN3NU6XkUyYEF5F.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-13",
      "runtimeMinutes": null,
      "voteAverage": 0,
      "viewCount": 1040,
      "genres": [
        "Comedy"
      ],
      "hasVideo": true
    },
    {
      "id": "c0493a0d-b9e8-42d4-83d8-eafd7f5fb5d2",
      "contentType": "movie",
      "title": "V/H/S/Mixtape",
      "slug": "vhsmixtape-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/uS8yoiA6NfsuYeOTbVfpem8Ib9.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/yeGO5vvfwMc4HLJJHIN2vvtvPX0.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-09",
      "runtimeMinutes": 98,
      "voteAverage": 3,
      "viewCount": 2461,
      "genres": [
        "Music",
        "Thriller",
        "Horror"
      ],
      "hasVideo": true
    },
    {
      "id": "ab9f3b1f-c2c8-4826-94b3-6108e342447b",
      "contentType": "movie",
      "title": "Animals",
      "slug": "animals-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/cyltXU1lAGhRFBuHQIMWBAPj8fI.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/tzoarEu7TsG959upiELyYPm5kO9.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-09",
      "runtimeMinutes": 106,
      "voteAverage": 6.4,
      "viewCount": 9852,
      "genres": [
        "Drama",
        "Thriller"
      ],
      "hasVideo": true
    },
    {
      "id": "2213978a-8b73-410f-898a-2e69d06d248c",
      "contentType": "movie",
      "title": "The Legend of Aang: The Last Airbender",
      "slug": "the-legend-of-aang-the-last-airbender-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/AbUa37L0mRs4RtMLvSD6cWZcPJP.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/sS3zGYFPcfM5pArVNWl6qLyaSmU.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-08",
      "runtimeMinutes": 99,
      "voteAverage": 0,
      "viewCount": 322439,
      "genres": [
        "Action",
        "Family",
        "Animation",
        "Adventure",
        "Fantasy"
      ],
      "hasVideo": true
    },
    {
      "id": "0b4cc177-bb4f-4018-a2db-798d9ad16fca",
      "contentType": "movie",
      "title": "Love of Your Life",
      "slug": "love-of-your-life-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/gOaRyRpilYPEsVLEPHOH9eHNw5E.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/4hneB0UFKOZAGJHqJ3VhDcG72uH.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-07",
      "runtimeMinutes": 109,
      "voteAverage": 6.3,
      "viewCount": 87,
      "genres": [
        "Romance",
        "Drama"
      ],
      "hasVideo": true
    },
    {
      "id": "e491a4cd-cbe7-46cc-acf5-6635ee7295ee",
      "contentType": "movie",
      "title": "Family Guy Happy Hell-o-ween",
      "slug": "family-guy-happy-hell-o-ween-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/fqFqmOOpobLLCHVHYMH2PhvlhFh.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/i5XAKlLzmbGsBtr8T3vyGZHkanT.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-05",
      "runtimeMinutes": 21,
      "voteAverage": 0,
      "viewCount": 5002,
      "genres": [
        "Animation",
        "Horror"
      ],
      "hasVideo": true
    },
    {
      "id": "5454c017-953c-4e4c-886a-179ed9ce891b",
      "contentType": "movie",
      "title": "Matchbox the Movie",
      "slug": "matchbox-the-movie-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/lFKA4GMz36dImEy3DQPdPF7G4V9.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/jdJsnhHfkIi3J7jwfiCFT4gXNx5.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-05",
      "runtimeMinutes": 127,
      "voteAverage": 7,
      "viewCount": 21532,
      "genres": [
        "Action",
        "Adventure",
        "Comedy"
      ],
      "hasVideo": true
    },
    {
      "id": "8d2ac205-bdd4-4bfa-82a6-a35aa621ccdd",
      "contentType": "movie",
      "title": "Doing Life",
      "slug": "doing-life-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/5nZVjsCk5tWyyhLGt5U2TxsR85w.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/nDScZ6YR2nfNCeK5bmJ1ujb355b.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-02",
      "runtimeMinutes": 112,
      "voteAverage": 5.89,
      "viewCount": 606,
      "genres": [
        "Romance",
        "Drama"
      ],
      "hasVideo": true
    },
    {
      "id": "85ec2743-b882-4b48-b342-f0824e94b70d",
      "contentType": "movie",
      "title": "Stranglehold",
      "slug": "stranglehold-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/l5qjpG401icYMQC4aaCYZFElD7B.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/wboMxtzj5I7Af8PkgdKfLIMjQfh.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-02",
      "runtimeMinutes": null,
      "voteAverage": 4,
      "viewCount": 1048,
      "genres": [
        "Crime",
        "Thriller",
        "Comedy"
      ],
      "hasVideo": true
    },
    {
      "id": "2a0c7f25-08e5-4a3f-98b7-51be4eb8cef8",
      "contentType": "movie",
      "title": "Schumacher '94 - The Birth of a Legend",
      "slug": "schumacher-94-the-birth-of-a-legend-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/em19DrMkLSinf04NEhiRxTnVupI.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/8ADvnUHcEyt2247A1EL9WK4IdMI.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-02",
      "runtimeMinutes": 105,
      "voteAverage": 9.2,
      "viewCount": 1351,
      "genres": [
        "Documentary"
      ],
      "hasVideo": true
    },
    {
      "id": "030c6c1f-da1b-4e78-979a-4be2a97866d2",
      "contentType": "movie",
      "title": "Detective Conan: The Counterfeit Case of Ultra 30",
      "slug": "detective-conan-the-counterfeit-case-of-ultra-30-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/pT9RIHf4K9OyOB3eqYj97E5h0YA.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/v0T74v8LPZBSL247oGeTOp06tnm.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-02",
      "runtimeMinutes": 93,
      "voteAverage": 6.6,
      "viewCount": 9184,
      "genres": [
        "Action",
        "Animation",
        "Crime",
        "Mystery"
      ],
      "hasVideo": true
    },
    {
      "id": "b5581912-70fb-4496-ab7b-a532bcac76ba",
      "contentType": "movie",
      "title": "Crazy Rich, Incredibly Broke",
      "slug": "crazy-rich-incredibly-broke-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/zXrxCpD6UR96mk3umb93ub3RmSs.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/e20V500lJHkQbf1iGet34Jc5h8r.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-01",
      "runtimeMinutes": null,
      "voteAverage": 2,
      "viewCount": 2443,
      "genres": [
        "Drama",
        "Comedy"
      ],
      "hasVideo": true
    },
    {
      "id": "bf8b3364-8eb1-4094-9377-fd6136de4546",
      "contentType": "movie",
      "title": "Livestream from Hell",
      "slug": "livestream-from-hell-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/2bKGy1SoXZEUa69HRSy51rVM5KF.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/eJ4vMJJlnxnKqdJCBDXvNmE0LVp.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-30",
      "runtimeMinutes": 77,
      "voteAverage": 5.69,
      "viewCount": 3216,
      "genres": [
        "Comedy",
        "Horror"
      ],
      "hasVideo": true
    },
    {
      "id": "eb2afcbc-2700-4967-a294-8f4d4ba74179",
      "contentType": "movie",
      "title": "The Nice Ones",
      "slug": "the-nice-ones-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/oUHs4mwfNfe8oatqKwOFT9YvuZ1.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/zQmaXGt8MYNRZaV2YVqkFbCoTWq.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-29",
      "runtimeMinutes": 89,
      "voteAverage": 0,
      "viewCount": 4698,
      "genres": [
        "Drama",
        "Fantasy",
        "Horror",
        "Science Fiction"
      ],
      "hasVideo": true
    },
    {
      "id": "ffb5e44e-32d1-42c8-99ff-77e864e25c80",
      "contentType": "movie",
      "title": "UNABOMBER",
      "slug": "unabomber-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/39aMkR8Y5vhCG9dTkjiqRl8AVqp.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/58D9nalUYW5L5K0guw7hcpsEJBH.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-25",
      "runtimeMinutes": 101,
      "voteAverage": 6.97,
      "viewCount": 5263,
      "genres": [
        "Drama",
        "Crime",
        "Thriller"
      ],
      "hasVideo": true
    },
    {
      "id": "e218ebac-db4e-4225-b539-2be94a5faf85",
      "contentType": "movie",
      "title": "The Deputy",
      "slug": "the-deputy-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/qL654LNOfBu49e12jnnQIv6mny.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/qEfh8IM4KjwkdHEJ4p8NE7kaZ3g.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-25",
      "runtimeMinutes": 100,
      "voteAverage": 7.25,
      "viewCount": 3496,
      "genres": [
        "Action",
        "Crime",
        "Thriller"
      ],
      "hasVideo": true
    },
    {
      "id": "5a17d2a9-56dc-46d2-9a2e-61326e385cd6",
      "contentType": "movie",
      "title": "The Florist",
      "slug": "the-florist-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/4tnRvIiWMzVA2Tw9c7INLo4sfo0.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/jpH1VRw74w0vvPTY0ryKEtMIXc.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-24",
      "runtimeMinutes": 99,
      "voteAverage": 6.72,
      "viewCount": 27,
      "genres": [
        "Action",
        "Thriller"
      ],
      "hasVideo": true
    },
    {
      "id": "e09a21eb-f1e7-4bd9-979a-4eaa1afeea3e",
      "contentType": "movie",
      "title": "The Love Hypothesis",
      "slug": "the-love-hypothesis-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/vfZxVHextAGC70zrNhS8lsROqP1.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/c8hvRzN5nijvp1VcSs8nqHly1bK.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-23",
      "runtimeMinutes": 110,
      "voteAverage": 8.75,
      "viewCount": 232525,
      "genres": [
        "Romance",
        "Comedy"
      ],
      "hasVideo": true
    },
    {
      "id": "107103ad-03fa-45ee-9250-2e45caab6c2b",
      "contentType": "movie",
      "title": "One Last Shot",
      "slug": "one-last-shot-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/niQ4NBh2jqAf1hDZP5m6ReWFAb7.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/8giIQcHpxgsPVP6c7aQtHl3txuh.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-22",
      "runtimeMinutes": 97,
      "voteAverage": 8.1,
      "viewCount": 34232,
      "genres": [
        "Action",
        "Thriller"
      ],
      "hasVideo": true
    },
    {
      "id": "6f0b0e04-a19e-4e5d-b593-51d784ff6b52",
      "contentType": "movie",
      "title": "You+Me – Against the World",
      "slug": "youme-against-the-world-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/bAbBNVplg7h79sm94OyHeKk8Phz.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/nkEhDomjmPHJSA4Tx8pxv0NlKEy.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-18",
      "runtimeMinutes": 93,
      "voteAverage": 5,
      "viewCount": 58282,
      "genres": [
        "Romance",
        "Drama"
      ],
      "hasVideo": true
    },
    {
      "id": "49db1852-2dda-47ca-a226-999f07531d2c",
      "contentType": "movie",
      "title": "Lust Stories 3",
      "slug": "lust-stories-3-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/1GBe4TeCeXa1ENg0rv2JH8cH0ry.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/ygMNjFOBuLVoInEoPzqPU2U0pfg.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-18",
      "runtimeMinutes": null,
      "voteAverage": 0,
      "viewCount": 1577,
      "genres": [
        "Romance",
        "Drama"
      ],
      "hasVideo": true
    },
    {
      "id": "3986b13c-ff5d-4267-81d4-6b65850d5f5a",
      "contentType": "movie",
      "title": "Best of the Best",
      "slug": "best-of-the-best-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/Zm5i6MmXp5cfIT3LffiuAX1uZ6.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/5m1j7Wibh3HnZq5QHm97v8dI3GH.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-18",
      "runtimeMinutes": null,
      "voteAverage": 0,
      "viewCount": 3313,
      "genres": [
        "Comedy"
      ],
      "hasVideo": true
    },
    {
      "id": "71be4f68-1dd4-418e-89ec-a0572eda55fc",
      "contentType": "movie",
      "title": "The Runner",
      "slug": "the-runner-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/uxCaBoYXsDC4A0SqTm3SISj0OwK.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/ziXF8wIBguHNCeplNthUlDTCZP8.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-17",
      "runtimeMinutes": 86,
      "voteAverage": 0,
      "viewCount": 31523,
      "genres": [
        "Action",
        "Thriller"
      ],
      "hasVideo": true
    },
    {
      "id": "c9bfbfa8-4552-4015-8525-06438063c2ef",
      "contentType": "movie",
      "title": "The Weight",
      "slug": "the-weight-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/8i5iZV50CoEtmDCFM7RSxCkpE8h.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/zLeq2fbHU6UdA7mhsYnIULORTgq.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-16",
      "runtimeMinutes": 115,
      "voteAverage": 0,
      "viewCount": 6616,
      "genres": [
        "Drama",
        "Crime",
        "Thriller"
      ],
      "hasVideo": true
    },
    {
      "id": "6d88c57d-f73a-44bd-a52a-ee2d02ec0c36",
      "contentType": "movie",
      "title": "The Last Kiss",
      "slug": "the-last-kiss-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/cLZ7iFZc25vluSIKt3XtdSTait4.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/klLupmrAUykQMrmFVBjbr0nreiI.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-15",
      "runtimeMinutes": 97,
      "voteAverage": 6.33,
      "viewCount": 4292,
      "genres": [
        "Mystery",
        "Thriller",
        "Horror"
      ],
      "hasVideo": true
    },
    {
      "id": "927b677b-95a2-46d1-a738-4a166a68c56f",
      "contentType": "movie",
      "title": "Drive Through Fire",
      "slug": "drive-through-fire-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/jCZ9cJR8DY0sxSuwUX0tDQBtDAS.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/cQjiLpk1zHNJLEQ4BZmEVFbheJr.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-11",
      "runtimeMinutes": 87,
      "voteAverage": 2,
      "viewCount": 4545,
      "genres": [
        "Action",
        "Crime",
        "Thriller"
      ],
      "hasVideo": true
    },
    {
      "id": "82e2cc61-196b-4755-8075-edcd26cfbd27",
      "contentType": "movie",
      "title": "Don't Move",
      "slug": "dont-move-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/uh0ZSdM8iOQgHwnUlhhanP8Dkl6.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/1b0RrVxLAMhfT0vQXfWtDLwg1ke.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-11",
      "runtimeMinutes": 94,
      "voteAverage": 5.83,
      "viewCount": 44,
      "genres": [
        "Thriller",
        "Horror"
      ],
      "hasVideo": true
    },
    {
      "id": "22e5e713-8939-4df3-a04c-c685916f50d5",
      "contentType": "movie",
      "title": "Go Team!",
      "slug": "go-team-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/brPyXyvpYI87ybV3LXtaeLijVnw.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/1hwrvoeqSe6oM59BHR8zFO082kF.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-11",
      "runtimeMinutes": 93,
      "voteAverage": 5.6,
      "viewCount": 1005,
      "genres": [
        "Comedy"
      ],
      "hasVideo": true
    },
    {
      "id": "c0e38709-5f2f-48ee-904b-9fbe109d4d22",
      "contentType": "movie",
      "title": "The Uprising",
      "slug": "the-uprising-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/7TUl15TOsIvndKlgMWTtLgtEzZP.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/y0reRTsewsPh0ePtgvDeLIsb5Wk.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-10",
      "runtimeMinutes": 128,
      "voteAverage": 7.2,
      "viewCount": 124517,
      "genres": [
        "Action",
        "Drama",
        "History"
      ],
      "hasVideo": true
    },
    {
      "id": "234f006c-9807-4214-b526-1afc6ac8d5f6",
      "contentType": "movie",
      "title": "The Fix",
      "slug": "the-fix-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/9iSkee8DPpwBQI3GhXSTGZJKNYM.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/bQQ3UGOJcCTRjVAjOwR17eQuwJC.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-10",
      "runtimeMinutes": 142,
      "voteAverage": 7.18,
      "viewCount": 9726,
      "genres": [
        "Action",
        "Thriller"
      ],
      "hasVideo": true
    },
    {
      "id": "f5f3175c-dd6a-419c-8ee6-dff86cbf650e",
      "contentType": "movie",
      "title": "Drawn Together",
      "slug": "drawn-together-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/6rpvddXbaQPOi0fB2HKWbZ3uUSg.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/oZkk6B15Ak4uTa2aVrJaDmSk3Xl.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-09",
      "runtimeMinutes": 104,
      "voteAverage": 7.18,
      "viewCount": 42110,
      "genres": [
        "Romance",
        "Drama",
        "Thriller"
      ],
      "hasVideo": true
    },
    {
      "id": "7e4fbddc-ea6c-4360-91d9-130ac524d0ed",
      "contentType": "movie",
      "title": "Oasis: Don't Look Back in Anger",
      "slug": "oasis-dont-look-back-in-anger-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/5XoHhKZ1IROW6f5UlRpADHnTL2l.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/2WlfEvFGJBlKKCD9XFChcI9F6Ks.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-09",
      "runtimeMinutes": 123,
      "voteAverage": 7.5,
      "viewCount": 6243,
      "genres": [
        "Documentary",
        "Music"
      ],
      "hasVideo": true
    },
    {
      "id": "5280f96f-c24e-4e8a-8f50-587328f276df",
      "contentType": "movie",
      "title": "Band of Brothers: Legacy",
      "slug": "band-of-brothers-legacy-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/n29MsV1m2OCbDp6PLeHxziOVOLG.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/mMLVXM8UOKSxVSxnXcmuBPMiHsC.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-09",
      "runtimeMinutes": 60,
      "voteAverage": 10,
      "viewCount": 17363,
      "genres": [
        "War",
        "Documentary"
      ],
      "hasVideo": true
    },
    {
      "id": "2438fd02-a2a3-408f-ba8a-2bc446cebbcd",
      "contentType": "movie",
      "title": "Practical Magic 2",
      "slug": "practical-magic-2-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/ogwQOLbCfncjvBhFb5l0OmQH8KC.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/zNxg4QlWnFbuHBDOhja6VAqb46G.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-09",
      "runtimeMinutes": 130,
      "voteAverage": 6.29,
      "viewCount": 4026,
      "genres": [
        "Romance",
        "Comedy",
        "Fantasy"
      ],
      "hasVideo": true
    },
    {
      "id": "48b80115-325e-4f66-bc46-4bd3a449c6a8",
      "contentType": "movie",
      "title": "Why Did I Get Married Again?",
      "slug": "why-did-i-get-married-again-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/rwaxLuOkJ5mMvJU5juNaPcKADOW.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/lJYniNRM2i9wXnfWVHOB4PxygFZ.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-08",
      "runtimeMinutes": 112,
      "voteAverage": 7.2,
      "viewCount": 1151,
      "genres": [
        "Romance",
        "Drama",
        "Comedy"
      ],
      "hasVideo": true
    }
  ]
}
```
---
Endpoint 5:
```url
https://indocast.site/api/idlix/series?page=1&limit=36&sort=releaseDate
```
```cURL
curl -X GET "https://indocast.site/api/idlix/series?page=1&limit=36&sort=releaseDate" -H "x-api-key: indocast_c011..."
```

Response:
```json
{
  "pagination": {
    "page": 1,
    "limit": 36,
    "total": 5016,
    "totalPages": 140
  },
  "items": [
    {
      "id": "ea0c44b0-c3a3-4021-b700-abf291f2ca7e",
      "contentType": "tv_series",
      "title": "Make Me Tingle",
      "slug": "make-me-tingle-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/e4MlbtE02So4D5DJy197DbiAxqs.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/voAufY8Jv3AVfG15sxY5H6XWFKr.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-15",
      "runtimeMinutes": null,
      "voteAverage": 0,
      "viewCount": 200,
      "genres": [
        "Drama",
        "Comedy"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "54624fe2-96f2-4fd9-aeaa-4f73f86fdcc7",
      "contentType": "tv_series",
      "title": "VisionQuest",
      "slug": "visionquest-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/WGyAyBPncfuu8MZhLY9RtfZPM0.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/uoXXbN2PrOxH6UKyP7kYwmGpAAP.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-13",
      "runtimeMinutes": null,
      "voteAverage": 9.3,
      "viewCount": 64087,
      "genres": [
        "Drama",
        "Fantasy",
        "Science Fiction"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "dd53ca45-d9f9-4782-8697-65da2eb28865",
      "contentType": "tv_series",
      "title": "The Trap",
      "slug": "the-trap-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/dkLTaC44QqnCAgzCf180TxMmmG5.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/69XNjGvcopgPz9Hte0ny1Swk2vW.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-13",
      "runtimeMinutes": null,
      "voteAverage": 7,
      "viewCount": 1149,
      "genres": [
        "Drama",
        "Mystery"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "b49a66f1-396f-4162-b6d7-5b4b75f7fac9",
      "contentType": "tv_series",
      "title": "TYSON",
      "slug": "tyson-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/mdtpJEWW1j5Ns7bIcbw1UeIdvhp.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/qFNAWAHCXWtS4EMlLxTAetTpZAR.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-13",
      "runtimeMinutes": null,
      "voteAverage": 0,
      "viewCount": 444,
      "genres": [
        "Documentary"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "01e5920d-6258-4134-b3bb-bcaec356b5a0",
      "contentType": "tv_series",
      "title": "Kindred",
      "slug": "kindred-2022",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/iSrPT4PQmrVDGdp55cCShrpBMlj.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/nCy0y2zbHt8y7Behadt9SaYfE0Q.jpg",
      "logoPath": null,
      "releaseDate": "2022-12-13",
      "runtimeMinutes": null,
      "voteAverage": 6.4,
      "viewCount": 77,
      "genres": [
        "Drama",
        "Fantasy",
        "Science Fiction"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "709455f9-b892-4ed2-9f45-5515806e723c",
      "contentType": "tv_series",
      "title": "Hitori No Shita - The Outcast",
      "slug": "hitori-no-shita-the-outcast-2016",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/i3Vg5SKaWWNjMvK3CsuK5itIrzG.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/tRQMZPYWQTOygIeGZ7rmmQaeq1z.jpg",
      "logoPath": null,
      "releaseDate": "2016-07-09",
      "runtimeMinutes": null,
      "voteAverage": 7,
      "viewCount": 210,
      "genres": [
        "Action",
        "Animation",
        "Adventure",
        "Comedy",
        "Fantasy",
        "Science Fiction"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "4354d4e7-2265-4e06-94d6-55c32962c854",
      "contentType": "tv_series",
      "title": "The Great North",
      "slug": "the-great-north-2021",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/7Ww56dPIuXn4NZGrJJPdoafLHGu.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/61sQakosFlSETNNCS9Mn2SqFVUf.jpg",
      "logoPath": null,
      "releaseDate": "2021-01-03",
      "runtimeMinutes": null,
      "voteAverage": 6.9,
      "viewCount": 329,
      "genres": [
        "Animation",
        "Comedy"
      ],
      "hasVideo": false,
      "numberOfSeasons": 5
    },
    {
      "id": "2cc8d2cd-fe86-420e-b224-090431dd0ede",
      "contentType": "tv_series",
      "title": "Full-Time Magister",
      "slug": "full-time-magister-2016",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/csprfx9Vp7n5eINBT9DWKPa6r4g.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/9fOVK3e3SXQgkjPkCtEN5SRdpEg.jpg",
      "logoPath": null,
      "releaseDate": "2016-09-02",
      "runtimeMinutes": null,
      "voteAverage": 7.34,
      "viewCount": 2016,
      "genres": [
        "Action",
        "Animation",
        "Adventure",
        "Comedy",
        "Fantasy",
        "Science Fiction"
      ],
      "hasVideo": false,
      "numberOfSeasons": 7
    },
    {
      "id": "bcbf57c2-f3ca-412b-bb19-31e014123d13",
      "contentType": "tv_series",
      "title": "Mobile Suit Gundam: Iron-Blooded Orphans",
      "slug": "mobile-suit-gundam-iron-blooded-orphans-2015",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/x5M9yxvBhrUP4rsKSl3d9VzK7O.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/52mp7oFltDUkw3kx1ArlRZkLyr3.jpg",
      "logoPath": null,
      "releaseDate": "2015-10-04",
      "runtimeMinutes": null,
      "voteAverage": 7.5,
      "viewCount": 3536,
      "genres": [
        "War",
        "Action",
        "Animation",
        "Adventure",
        "Fantasy",
        "Science Fiction"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "f05d7b91-31b1-49aa-827f-ef0426ed3512",
      "contentType": "tv_series",
      "title": "New Recruit",
      "slug": "new-recruit-2022",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/yB9eZWC7LR5Lz1uomfCojPFBOzI.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/59L3nBw75WmT0fkgHfib6eayRc6.jpg",
      "logoPath": null,
      "releaseDate": "2022-07-22",
      "runtimeMinutes": null,
      "voteAverage": 8.5,
      "viewCount": 3918,
      "genres": [
        "Drama",
        "Comedy"
      ],
      "hasVideo": false,
      "numberOfSeasons": 4
    },
    {
      "id": "74bd9dec-53f5-45d8-9073-5f68196227c8",
      "contentType": "tv_series",
      "title": "Grow Up Show",
      "slug": "grow-up-show-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/f5xG4oxOWnGVpAqgOj1RgIT3qOi.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/kVX2lGqrPfXcRypZGnV2jn3h9rm.jpg",
      "logoPath": null,
      "releaseDate": "2026-07-05",
      "runtimeMinutes": null,
      "voteAverage": 6.8,
      "viewCount": 239,
      "genres": [
        "Animation",
        "Comedy"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "06806184-b600-4a2a-a313-6930eeda42de",
      "contentType": "tv_series",
      "title": "Dara-san of Reiwa",
      "slug": "dara-san-of-reiwa-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/s0rPBaoGFTVR5KglSEzbBQ2u256.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/t9pxS8JUIya68VOIRVAu8rhbGZL.jpg",
      "logoPath": null,
      "releaseDate": "2026-07-02",
      "runtimeMinutes": null,
      "voteAverage": 8.18,
      "viewCount": 2974,
      "genres": [
        "Animation",
        "Comedy"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "af1a088f-fea1-4a51-a623-76790f66f611",
      "contentType": "tv_series",
      "title": "100 Days of Deception",
      "slug": "100-days-of-deception-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/bZHEU42QynnMrHUWK1Hhvj2cdPA.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/3SvKCITqMtjgPIhFBjRc4yTAc4H.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-10",
      "runtimeMinutes": null,
      "voteAverage": 0,
      "viewCount": 55197,
      "genres": [
        "Action",
        "Adventure"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1,
      "numberOfEpisodes": 1
    },
    {
      "id": "02bae586-9dd0-4058-83cd-fb1d884b0211",
      "contentType": "tv_series",
      "title": "Matori & Kyoken Men in the Back Alleys",
      "slug": "matori-and-kyoken-men-in-the-back-alleys-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/yfySM9i4pSTJy5WMbGB7ct9kNzc.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/1quBFuyulJfThLrtdllalN3ihcb.jpg",
      "logoPath": null,
      "releaseDate": "2026-01-21",
      "runtimeMinutes": null,
      "voteAverage": 7,
      "viewCount": 661,
      "genres": [
        "Action",
        "Drama",
        "Adventure",
        "Crime"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "22fc4e8e-bb81-49b7-9598-d4eb004f0db4",
      "contentType": "tv_series",
      "title": "Live Forever",
      "slug": "live-forever-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/xy7nZn7cTcroJjyiUA4gzxtrLEr.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/4ipPELpw6fwBclwFjWYdNXN6kJw.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-24",
      "runtimeMinutes": null,
      "voteAverage": 0,
      "viewCount": 473,
      "genres": [
        "Drama"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "397b6518-a62f-422e-958f-5aeb3fb2d3f4",
      "contentType": "tv_series",
      "title": "Doctor X: Mafia in White",
      "slug": "doctor-x-mafia-in-white-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/nDDVzQfv95PGwj9nV2fJvUrkcvU.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/gEIYUsH0V2tDUTwnA2NNCw1cD0f.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-09",
      "runtimeMinutes": null,
      "voteAverage": 10,
      "viewCount": 215866,
      "genres": [
        "Drama",
        "Crime",
        "Mystery"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1,
      "numberOfEpisodes": 1
    },
    {
      "id": "6a2281b1-d9e2-4818-a9cc-5e36537ec529",
      "contentType": "tv_series",
      "title": "Spring of the Blade",
      "slug": "spring-of-the-blade-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/uRWqHI4R4nOSPpRnbr8JjnpCmgx.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/k3aKIWf48yCKnbCjk2b2Tea32Vk.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-17",
      "runtimeMinutes": null,
      "voteAverage": 8.2,
      "viewCount": 3894,
      "genres": [
        "Drama"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "03e01d8f-b886-4ca9-b799-ff772cace57f",
      "contentType": "tv_series",
      "title": "A Prophet",
      "slug": "a-prophet-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/giSXBUuCfCXV9ALQAmcZd659J0r.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/eTlMy2amueTqJBFZm5x14GGhZxH.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-24",
      "runtimeMinutes": null,
      "voteAverage": 6.75,
      "viewCount": 616,
      "genres": [
        "Drama",
        "Mystery"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "32b47770-fed5-4579-a89a-af13a98c92ac",
      "contentType": "tv_series",
      "title": "Take Charge of My Heart",
      "slug": "take-charge-of-my-heart-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/ecRrKGXfflZmDZBD4irdkybClT.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/cHO75BxLM6sz7NsiVyaBmkKnmgg.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-09",
      "runtimeMinutes": null,
      "voteAverage": 0,
      "viewCount": 388901,
      "genres": [
        "Comedy",
        "Fantasy",
        "Science Fiction"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "00d7a240-4f65-4481-b290-5a6f2d79ac65",
      "contentType": "tv_series",
      "title": "Unlucky Bae",
      "slug": "unlucky-bae-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/1jPxJWwPIEy6wmFt3444RjqSz6X.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/opFWidR2ITRQv6fjukb7hJk7xsi.jpg",
      "logoPath": null,
      "releaseDate": "2026-08-06",
      "runtimeMinutes": null,
      "voteAverage": 7.2,
      "viewCount": 642,
      "genres": [
        "Drama",
        "Comedy",
        "Fantasy",
        "Science Fiction"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "3b421bb8-7bb6-48c3-9909-e54620095746",
      "contentType": "tv_series",
      "title": "Against the Current",
      "slug": "against-the-current-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/euBlF64efQmsl2y54LeNmLQPNob.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/mZSewqVlY4F2F2Axm7hiG6KBOBp.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-11",
      "runtimeMinutes": null,
      "voteAverage": 7.2,
      "viewCount": 6557,
      "genres": [
        "Family",
        "Drama"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "927ac3d8-6fdf-4c9f-83ff-661c0f74dfe4",
      "contentType": "tv_series",
      "title": "Avatar: Seven Havens",
      "slug": "avatar-seven-havens-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/vYNar1VtdNyQXXUt16uPbIT6wzr.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/z0Y4vjd0WhMdWYEySd6wooVQQaH.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-09",
      "runtimeMinutes": null,
      "voteAverage": 10,
      "viewCount": 64220,
      "genres": [
        "Action",
        "Family",
        "Animation",
        "Adventure",
        "Fantasy",
        "Science Fiction"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1,
      "numberOfEpisodes": 3
    },
    {
      "id": "27b7057c-fe95-4856-be0e-1cbe8f4148f8",
      "contentType": "tv_series",
      "title": "THE GHOST IN THE SHELL",
      "slug": "the-ghost-in-the-shell-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/nUXjSyXAQZhOf32e6lkLX6C6Rf3.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/app8YXZ4NS0hMTYZuIA6zx92xVm.jpg",
      "logoPath": null,
      "releaseDate": "2026-07-07",
      "runtimeMinutes": null,
      "voteAverage": 8.1,
      "viewCount": 1194,
      "genres": [
        "Action",
        "Animation",
        "Adventure",
        "Fantasy",
        "Science Fiction"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "a0d5e30f-e6bf-4b51-8320-d32486f6b3f8",
      "contentType": "tv_series",
      "title": "Thunder 3",
      "slug": "thunder-3-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/sAWjEgblLSXWHMKJCKC0UYjK5AN.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/7HTP5m1BTMMHhBpLqkjfGvHbVZJ.jpg",
      "logoPath": null,
      "releaseDate": "2026-07-09",
      "runtimeMinutes": null,
      "voteAverage": 8,
      "viewCount": 451,
      "genres": [
        "Animation",
        "Fantasy",
        "Science Fiction"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "ab1f108d-7bb9-43ab-9436-71628f7d160e",
      "contentType": "tv_series",
      "title": "Take a Hike!",
      "slug": "take-a-hike-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/ya3p0meUJJ92gjFRFcZ1C3TJ0nO.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/giJzZvC9p6QdSi9tCgcOJZcw2hY.jpg",
      "logoPath": null,
      "releaseDate": "2026-08-18",
      "runtimeMinutes": null,
      "voteAverage": 10,
      "viewCount": 2647,
      "genres": [
        "Reality"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "e48a09ba-0dcf-4b42-981b-cd24ec0829ee",
      "contentType": "tv_series",
      "title": "Wonka's The Golden Ticket",
      "slug": "wonkas-the-golden-ticket-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/5padVOGD7QxyFLlTAWdCFY2FQf1.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/vlG9Kc5Y82CwafLceR9CUkTe7U0.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-23",
      "runtimeMinutes": null,
      "voteAverage": 6,
      "viewCount": 3255,
      "genres": [
        "Reality"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "13e83bfc-04eb-41cb-ab22-d5e75485cf62",
      "contentType": "tv_series",
      "title": "Below",
      "slug": "below-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/wQcG0qZGRYAwfg3rfLCR1RwrBDZ.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/cn0feYcDvVzVjUDoXa1O8sRgzz.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-08",
      "runtimeMinutes": null,
      "voteAverage": 7.22,
      "viewCount": 12151,
      "genres": [
        "Drama",
        "Mystery"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "ef382ebd-2943-425d-9365-d1c1500ae888",
      "contentType": "tv_series",
      "title": "Coven Academy",
      "slug": "coven-academy-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/f4R4YGeMQrXEu6jm3oAbSPeGC3M.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/mGFtH5pUXDd4hSXUfl8HnHlRWJV.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-01",
      "runtimeMinutes": null,
      "voteAverage": 7.1,
      "viewCount": 25807,
      "genres": [
        "Drama",
        "Mystery",
        "Fantasy",
        "Science Fiction"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1,
      "numberOfEpisodes": 11
    },
    {
      "id": "3fcbd828-a23b-4093-9cac-00ae9bac57b8",
      "contentType": "tv_series",
      "title": "Chumbak",
      "slug": "chumbak-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/r2TJ9s9uhfxTssar1gBAWcxIXx7.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/2N1kH7314XUfMw80iLZh1d2UoHY.jpg",
      "logoPath": null,
      "releaseDate": "2026-09-10",
      "runtimeMinutes": null,
      "voteAverage": 3.5,
      "viewCount": 207,
      "genres": [
        "Family",
        "Comedy"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "3b61bef3-f341-41c2-97f1-3f3e3b105430",
      "contentType": "tv_series",
      "title": "#Love",
      "slug": "love-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/cyJKP6Fsg8ds4O4g1Q1SCOKJQdn.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/xrm5XNKMuAnvnG9sokNYlaAng2G.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-02",
      "runtimeMinutes": null,
      "voteAverage": 10,
      "viewCount": 260,
      "genres": [
        "Drama",
        "Comedy"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "d28ed66e-bae6-4afa-8ddf-0b17350c606e",
      "contentType": "tv_series",
      "title": "Kill Jackie",
      "slug": "kill-jackie-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/vvMpr6wO4EMtA7lqftffTel5c1R.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/twc2YYBXTjdv52TShVumB1voT3Q.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-02",
      "runtimeMinutes": null,
      "voteAverage": 6.89,
      "viewCount": 2044,
      "genres": [
        "Drama",
        "Crime"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "16e95399-5c62-421d-abb9-4f948668a075",
      "contentType": "tv_series",
      "title": "I Would Rather Die",
      "slug": "i-would-rather-die-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/1HehlJEDVfHf9nt36Ygq8apTWQD.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/339M5JkUc4DeXBGoK2lp9QZ3Y5e.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-02",
      "runtimeMinutes": null,
      "voteAverage": 7.9,
      "viewCount": 1252,
      "genres": [
        "Action",
        "Adventure",
        "Comedy"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "33d2662b-d043-4bbd-8687-e629036f2861",
      "contentType": "tv_series",
      "title": "Class Crush Crisis",
      "slug": "class-crush-crisis-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/c0GONDHxQjDYEy46Km333QKiub9.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/r8HQOxPBy9fwByVCRYov3xMeOBS.jpg",
      "logoPath": null,
      "releaseDate": "2026-07-24",
      "runtimeMinutes": null,
      "voteAverage": 8.1,
      "viewCount": 1418,
      "genres": [
        "Drama"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "37288931-6d66-4f66-8b22-09c99d5c0be2",
      "contentType": "tv_series",
      "title": "Your Personal Taxi",
      "slug": "your-personal-taxi-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/600463FEirm57sAsFcD55iGbVrE.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/vk1wrUULLVeFNfVKSV5Q1L7ViGF.jpg",
      "logoPath": null,
      "releaseDate": "2026-10-01",
      "runtimeMinutes": null,
      "voteAverage": 0,
      "viewCount": 2495,
      "genres": [
        "Drama"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "597e456f-8e79-40ae-89fd-0eafc7a2dd17",
      "contentType": "tv_series",
      "title": "Digimon Beatbreak",
      "slug": "digimon-beatbreak-2025",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/qcy74ZdijvhaIyiPKFVZJZZrpJt.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/7Sz41DFZZpnkbLVJFKSF1cbCMyz.jpg",
      "logoPath": null,
      "releaseDate": "2025-10-05",
      "runtimeMinutes": null,
      "voteAverage": 7.5,
      "viewCount": 854,
      "genres": [
        "Action",
        "Animation",
        "Adventure",
        "Fantasy",
        "Science Fiction",
        "Kids"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    },
    {
      "id": "fdd78a10-2f14-43ad-9002-d4b05123845f",
      "contentType": "tv_series",
      "title": "Young Ladies Don't Play Fighting Games",
      "slug": "young-ladies-dont-play-fighting-games-2026",
      "overview": "",
      "tagline": null,
      "posterPath": "https://image.tmdb.org/t/p/w500/kN8or9S0PLClMR2QKSPJAEi2C3L.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/yCRq49YINwI7psAK5VEzbKLLSFk.jpg",
      "logoPath": null,
      "releaseDate": "2026-07-07",
      "runtimeMinutes": null,
      "voteAverage": 7.64,
      "viewCount": 271,
      "genres": [
        "Animation",
        "Comedy"
      ],
      "hasVideo": false,
      "numberOfSeasons": 1
    }
  ]
}
```
---

Endpoint 6:
```url
https://indocast.site/api/idlix/detail?slug=michael-2026&type=movies
```
```curl
curl -X GET "https://indocast.site/api/idlix/detail?slug=michael-2026&type=movies" -H "x-api-key: indocast_c0116...."
```

Response:
```json
{
  "id": "074d46f6-a071-4303-86a4-172192ff0563",
  "tmdbId": 936075,
  "imdbId": "tt11378946",
  "contentType": "movie",
  "title": "Michael",
  "originalTitle": "Michael",
  "slug": "michael-2026",
  "overview": "The story of Michael Jackson, one of the most influential artists the world has ever known, and his life beyond the music. His journey from the discovery of his extraordinary talent as the lead of the Jackson Five, to the visionary artist whose creative ambition fueled a relentless pursuit to become the biggest entertainer in the world, highlighting both his life off-stage and some of the most iconic performances from his early solo career.",
  "tagline": "Discover the making of a king.",
  "posterPath": "https://image.tmdb.org/t/p/w500/zm0KAbOjlt9eR5y7vDiL2dEOwMl.jpg",
  "backdropPath": "https://image.tmdb.org/t/p/original/lRg80r08ure2a4rrcvmAe9ij3nv.jpg",
  "logoPath": "/wJHlHY0t6iBq6JRyCZNCH7cKzl1.png",
  "backdrops": [
    "https://image.tmdb.org/t/p/original/xBT0oNq6rsTFv4SxG5uGRIEOrq6.jpg",
    "https://image.tmdb.org/t/p/original/ufSwlnECLoUbBjPrFqEQcWBzHwc.jpg",
    "https://image.tmdb.org/t/p/original/xh3v9v8RRbJgjcubewQ0wBjp8Qv.jpg",
    "https://image.tmdb.org/t/p/original/tpqqJyEo6wHE9xyADKesT8Jyv1F.jpg",
    "https://image.tmdb.org/t/p/original/q4rkoLp1k5jReEkt21rqMt0oOzO.jpg",
    "https://image.tmdb.org/t/p/original/izRUJlYpEruJAWxCsMAlDgaBpUf.jpg",
    "https://image.tmdb.org/t/p/original/dVsHY2PPAiFhhPD5x9pmOBZd8tB.jpg",
    "https://image.tmdb.org/t/p/original/Ot6qdM97VWfCB2pR73t8SjgJDY.jpg",
    "https://image.tmdb.org/t/p/original/cCVPBfpVhWUqDVbSyb2aGTW0oH9.jpg",
    "https://image.tmdb.org/t/p/original/eKIykXgEU9GpQWmYAUeTQ2baYEc.jpg"
  ],
  "releaseDate": "2026-04-22",
  "runtimeMinutes": 128,
  "voteAverage": 7.6,
  "viewCount": 105427,
  "country": "US",
  "status": "Released",
  "trailerUrl": "https://www.youtube.com/watch?v=k-YAcjaLuSI",
  "quality": "WEB-DL",
  "director": {
    "name": "Antoine Fuqua",
    "profilePath": "https://image.tmdb.org/t/p/w185/h58HRBCQOtWIR8zMqOIVgkHjssU.jpg"
  },
  "productionCompanies": [
    {
      "id": 1632,
      "name": "Lionsgate",
      "logoPath": "https://image.tmdb.org/t/p/w200/cisLn1YAUuptXVBa0xjq7ST9cH0.png"
    },
    {
      "id": 3281,
      "name": "GK Films",
      "logoPath": "https://image.tmdb.org/t/p/w200/8tMybAieh64uzvm8knSjXOFX8Qc.png"
    },
    {
      "id": 19222,
      "name": "Optimum Productions",
      "logoPath": "https://image.tmdb.org/t/p/w200/aQrYO4ziZbm24huYBahFKG4TfrJ.png"
    }
  ],
  "genres": [
    "Drama",
    "Music"
  ],
  "keywords": [
    "child abuse",
    "sibling relationship",
    "1970s",
    "abusive father",
    "ambition",
    "biography",
    "singer",
    "period drama",
    "music history",
    "price of fame",
    "singer-songwriter",
    "rise to fame",
    "1980s",
    "1960s",
    "music",
    "sentimental",
    "approving",
    "biographical drama",
    "music drama",
    "biopic"
  ],
  "cast": [
    {
      "id": "12167d1e-b400-471f-a16b-374b08d14179",
      "name": "Jaafar Jackson",
      "character": "Michael Jackson",
      "profilePath": "https://image.tmdb.org/t/p/w185/tVSzFjQxOrLOcvnzFto0772Q9Bw.jpg",
      "order": 0
    },
    {
      "id": "65de3eab-aa2a-4f48-a172-9cd931a52823",
      "name": "Colman Domingo",
      "character": "Joseph Jackson",
      "profilePath": "https://image.tmdb.org/t/p/w185/2tu6T9ugnf82qIMGVKWSb0dvvq5.jpg",
      "order": 1
    },
    {
      "id": "b27f6205-b9ce-4e8a-bf73-86eeb07a15ad",
      "name": "Nia Long",
      "character": "Katherine Jackson",
      "profilePath": "https://image.tmdb.org/t/p/w185/heVQkCGKUuKKRjRJaZIBrEKGhYA.jpg",
      "order": 2
    },
    {
      "id": "f63e5351-c5e3-49b6-b0e8-bb2251178722",
      "name": "Juliano Krue Valdi",
      "character": "Young Michael Jackson",
      "profilePath": "https://image.tmdb.org/t/p/w185/1rQYmcxdPD1IwHpa78DcfVEu1EN.jpg",
      "order": 3
    },
    {
      "id": "828045e1-5617-4488-b8ea-7cb7723ee524",
      "name": "Miles Teller",
      "character": "John Branca",
      "profilePath": "https://image.tmdb.org/t/p/w185/kDf3sW3USjEBDQ3Ua7lbwOfwty6.jpg",
      "order": 4
    },
    {
      "id": "1d0a5e6f-e33e-4644-a85e-927fb8cd762e",
      "name": "KeiLyn Durrel Jones",
      "character": "Bill Bray",
      "profilePath": "https://image.tmdb.org/t/p/w185/4wDO3Zt9KJg9CARCEgjuVdhWa8x.jpg",
      "order": 5
    },
    {
      "id": "e4f75b6d-ba97-40d2-b69f-914b84f28270",
      "name": "Kendrick Sampson",
      "character": "Quincy Jones",
      "profilePath": "https://image.tmdb.org/t/p/w185/AoZGTujNZEfabaXR5kUwmDUmxfe.jpg",
      "order": 6
    },
    {
      "id": "a25fb257-8f15-4490-a5d9-f5adb739e14a",
      "name": "Joseph David-Jones",
      "character": "Jackie Jackson",
      "profilePath": "https://image.tmdb.org/t/p/w185/qwX7ciIV8jwssmIqHv1eyzzqEvh.jpg",
      "order": 7
    },
    {
      "id": "4a34b422-dfa7-4bde-9b77-ba5a2f399690",
      "name": "Rhyan Hill",
      "character": "Tito Jackson",
      "profilePath": "https://image.tmdb.org/t/p/w185/iPNBMJL9kKtUYmqJzbarQfQcPp4.jpg",
      "order": 8
    },
    {
      "id": "a136b6f4-5d3c-4543-a0c8-0901c840c626",
      "name": "Jamal Henderson",
      "character": "Jermaine Jackson",
      "profilePath": "https://image.tmdb.org/t/p/w185/8yI9c3utD4EcEteNwHlFkdR8Rhv.jpg",
      "order": 9
    },
    {
      "id": "6c92e850-f407-4624-806a-97d62af04e8c",
      "name": "Trey Horton",
      "character": "Marlon Jackson",
      "profilePath": "https://image.tmdb.org/t/p/w185/bS5tAhkEYanomvhQURQTMnOjg79.jpg",
      "order": 10
    },
    {
      "id": "c691e70c-935b-4056-9f48-9981d554f9f0",
      "name": "Jessica Sula",
      "character": "LaToya Jackson",
      "profilePath": "https://image.tmdb.org/t/p/w185/2lLET7EhRy98ad5Mgc9jMk4Sb0S.jpg",
      "order": 11
    },
    {
      "id": "6fbe629b-4eba-4282-84ed-b7340b175d66",
      "name": "Larenz Tate",
      "character": "Berry Gordy",
      "profilePath": "https://image.tmdb.org/t/p/w185/6BWajF1sbuwsvXHmdQDxP5MfZ5R.jpg",
      "order": 12
    },
    {
      "id": "ba0d28fd-a863-4825-a455-39b0a112021c",
      "name": "Laura Harrier",
      "character": "Suzanne de Passe",
      "profilePath": "https://image.tmdb.org/t/p/w185/hYS8z1DxP6jvsBNXMRALiSI3nhw.jpg",
      "order": 13
    },
    {
      "id": "80a801de-f976-4dcb-a033-1a524732b1fe",
      "name": "Mike Myers",
      "character": "Walter Yetnikoff",
      "profilePath": "https://image.tmdb.org/t/p/w185/gjfDl52Kk02MPgUYFjs9bOy33OY.jpg",
      "order": 14
    },
    {
      "id": "0bb58843-6e84-48c8-a338-437b3a87b947",
      "name": "Nathaniel Logan McIntyre",
      "character": "Young Jackie Jackson",
      "profilePath": "https://image.tmdb.org/t/p/w185/ijhDtOElLvBX1KRGKZKnv6cettW.jpg",
      "order": 15
    },
    {
      "id": "a405fa1f-ad5b-4188-84e9-ad2678631923",
      "name": "Judah Edwards",
      "character": "Young Tito Jackson",
      "profilePath": "https://image.tmdb.org/t/p/w185/jnAlGbdduksL3eLOat2v0TxcB78.jpg",
      "order": 16
    },
    {
      "id": "52f19e58-bf89-42cd-a06e-8068f22cf81f",
      "name": "Jayden Harville",
      "character": "Young Jermaine Jackson",
      "profilePath": "https://image.tmdb.org/t/p/w185/7FKp7a9jL5reRJCwn6InsbgMOKz.jpg",
      "order": 17
    },
    {
      "id": "846d6f6c-dbc6-4840-9deb-eb413257664f",
      "name": "Jaylen Hunter",
      "character": "Young Marlon Jackson",
      "profilePath": "https://image.tmdb.org/t/p/w185/1OtOhjLCqwItHh2pnknqw2wsFCZ.jpg",
      "order": 18
    },
    {
      "id": "cf68b151-2f73-4086-8caf-c489f3f4a5fa",
      "name": "Deon Cole",
      "character": "Don King",
      "profilePath": "https://image.tmdb.org/t/p/w185/3QTNxodSEL6HLDuv7Ub3vQzcNij.jpg",
      "order": 19
    }
  ],
  "hasVideo": true,
  "seasons": [
    {
      "id": "season-1-074d46f6-a071-4303-86a4-172192ff0563",
      "tmdbId": 936075,
      "seasonNumber": 1,
      "title": "Season 1",
      "episodes": [
        {
          "id": "074d46f6-a071-4303-86a4-172192ff0563",
          "tmdbId": 936075,
          "episodeNumber": 1,
          "title": "Michael",
          "thumbnail": "https://image.tmdb.org/t/p/w500/lRg80r08ure2a4rrcvmAe9ij3nv.jpg",
          "overview": "The story of Michael Jackson, one of the most influential artists the world has ever known, and his life beyond the music. His journey from the discovery of his extraordinary talent as the lead of the Jackson Five, to the visionary artist whose creative ambition fueled a relentless pursuit to become the biggest entertainer in the world, highlighting both his life off-stage and some of the most iconic performances from his early solo career.",
          "airDate": "2026-04-22",
          "runtimeMinutes": 128,
          "voteAverage": 7.6,
          "hasVideo": true
        }
      ]
    }
  ]
}
```
---
Endpoint 7:
```url
https://indocast.site/api/idlix/getplay?slug=michael-2026&id=074d46f6-a071-4303-86a4-172192ff0563&type=movie
```
```curl
curl -X GET "https://indocast.site/api/idlix/getplay?slug=michael-2026&id=074d46f6-a071-4303-86a4-172192ff0563&type=movie" -H "x-api-key: indocast_c0116b...."
```

Response:
```json
{
  "success": true,
  "data": {
    "videoId": "jl2b5Esv1b47",
    "vidUrl": "https://e2e.majorplay.net/v/z4/jl2b5Esv1b47/config-925822.json?t=c1_/v/z4/jl2b5Esv1b47/.1792111826-xjjggFLTPLrIS-2PCYMsfwS-Pz0dITE0HFQIQeCiVYQ&pm=browser",
    "vidurl_proxy": "https://indocast.site/api/idlix/stream-proxy?url=https%3A%2F%2Fe2e.majorplay.net%2Fv%2Fz4%2Fjl2b5Esv1b47%2Fconfig-925822.json%3Ft%3Dc1_%2Fv%2Fz4%2Fjl2b5Esv1b47%2F.1792111826-xjjggFLTPLrIS-2PCYMsfwS-Pz0dITE0HFQIQeCiVYQ%26pm%3Dbrowser&provider=idlix&type=stream",
    "mode": "browser",
    "playbackCode": "ok",
    "sessionTimeout": {
      "expiresAtUnix": 1792111826,
      "expiresAtReadable": "16/10/2026, 07.50.26",
      "ttlSeconds": 3600
    },
    "subtitles": [
      {
        "lang": "en",
        "label": "English",
        "subUrl": "https://e2e.majorplay.net/v/z4/jl2b5Esv1b47/i18n/en/e40b2b83074ee753.vtt",
        "suburl_proxy": "https://indocast.site/api/idlix/stream-proxy?url=https%3A%2F%2Fe2e.majorplay.net%2Fv%2Fz4%2Fjl2b5Esv1b47%2Fi18n%2Fen%2Fe40b2b83074ee753.vtt&provider=idlix&type=sub"
      },
      {
        "lang": "id",
        "label": "Indonesian",
        "subUrl": "https://e2e.majorplay.net/v/z4/jl2b5Esv1b47/i18n/id/fa467859a9899733.vtt",
        "suburl_proxy": "https://indocast.site/api/idlix/stream-proxy?url=https%3A%2F%2Fe2e.majorplay.net%2Fv%2Fz4%2Fjl2b5Esv1b47%2Fi18n%2Fid%2Ffa467859a9899733.vtt&provider=idlix&type=sub"
      }
    ]
  }
}
```