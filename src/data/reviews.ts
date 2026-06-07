export interface Review {
  author: string;
  text: { lt: string; en: string; ru: string; lv: string };
}

export const googleRating = "4.2";
export const googleUrl =
  "https://www.google.com/maps/search/?api=1&query=Vakar%C5%B3+kemperiai+Klaip%C4%97da";

export const reviews: Review[] = [
  {
    author: "Laimis",
    text: {
      lt: "Ši kompanija išgelbėjo mūsų iš anksto suplanuotas atostogas. Dėl daugeliui jau žinomos vienos įmonės aferų buvome per plauką nuo kelionės žlugimo. Vyrukai atsiliepė ir operatyviai pasiūlė kemperį. Kemperis ne pirmos jaunystės, bet viskas puikiai veikė. Aprodė, papasakojo kas ir kaip ir išlydėjo į kelionę. Turėjome fantastišką dešimties dienų kelionę. Grįžus iš karto atgavome depozitą. Savo draugams tikrai rekomenduočiau šią įmonę.",
      en: "This company saved our pre-planned holiday. Because of the now well-known scams of another company, we were a hair's breadth from the trip falling apart. The guys answered and quickly offered us a camper. It wasn't brand new, but everything worked perfectly. They showed us around, explained how everything works and sent us off. We had a fantastic ten-day trip. As soon as we returned we got our deposit back. I would definitely recommend this company to my friends.",
      ru: "Эта компания спасла наш заранее запланированный отпуск. Из-за уже многим известных афер другой фирмы мы были на волосок от срыва поездки. Ребята ответили и оперативно предложили кемпер. Кемпер не первой молодости, но всё прекрасно работало. Всё показали, рассказали что и как и проводили в путь. У нас было фантастическое десятидневное путешествие. По возвращении сразу вернули депозит. Своим друзьям однозначно рекомендую эту компанию.",
      lv: "Šis uzņēmums izglāba mūsu jau ieplānoto atvaļinājumu. Kādas citas firmas plaši zināmo krāpniecību dēļ bijām uz mata no ceļojuma izjukšanas. Puiši atsaucās un operatīvi piedāvāja kemperi. Tas nebija no jaunākajiem, taču viss lieliski darbojās. Visu parādīja, izstāstīja un izvadīja ceļā. Mums bija fantastisks desmit dienu ceļojums. Pēc atgriešanās uzreiz atguvām depozītu. Saviem draugiem noteikti ieteiktu šo uzņēmumu.",
    },
  },
  {
    author: "Baiba Sveile-Nelsone",
    text: {
      lt: "Viskas labai gerai, šaunus, žmogiškas požiūris. Neieško dirbtinių pažeidimų; grąžinant kemperį iškart grąžino užstatą. Buvo problema su ratu, bet tokių dalykų reikia tikėtis būnant kelyje. Rekomenduoju!",
      en: "Everything is very good, a cool, humane attitude. They don't look for artificial violations; when returning the camper they immediately returned the deposit. There was a problem with a wheel, but you have to expect such things on the road. I recommend it!",
      ru: "Всё очень хорошо, классное, человеческое отношение. Не ищут искусственных нарушений; при возврате кемпера сразу вернули залог. Была проблема с колесом, но в дороге к таким вещам нужно быть готовым. Рекомендую!",
      lv: "Viss ļoti labi, lieliska, cilvēcīga attieksme. Nemeklē mākslīgus pārkāpumus; atdodot kemperi, uzreiz atgrieza depozītu. Bija problēma ar riteni, taču ceļā ar tādām lietām jārēķinās. Iesaku!",
    },
  },
  {
    author: "Jurga Voida",
    text: {
      lt: "Mums labai patiko, paėmėme „vidutinio amžiaus\" kemperį, apvažiavome Baltijos šalis, jis važiuoja labai gerai, daug geriau nei nauji kemperiai 😉 automatinė pavarų dėžė buvo puikus pasirinkimas lygiose vietovėse! Tik geriausi atsiliepimai ir kemperiams, ir aptarnavimui :)",
      en: "We really liked it, we took a \"middle-aged\" camper and toured the Baltic countries. It drives very well, much better than new campers 😉 the automatic gearbox was a great choice on flat country roads! Only the best reviews for both the campers and the service :)",
      ru: "Нам очень понравилось, взяли кемпер «среднего возраста», объехали страны Балтии, он едет очень хорошо, гораздо лучше новых кемперов 😉 автоматическая коробка была отличным выбором на ровных дорогах! Только лучшие отзывы и о кемперах, и о сервисе :)",
      lv: "Mums ļoti patika, paņēmām „vidēja vecuma\" kemperi, apceļojām Baltijas valstis, tas brauc ļoti labi, daudz labāk nekā jaunie kemperi 😉 automātiskā ātrumkārba bija lielisks risinājums līdzenos apvidos! Tikai vislabākās atsauksmes gan par kemperiem, gan par apkalpošanu :)",
    },
  },
  {
    author: "Ainis",
    text: {
      lt: "Platus pasirinkimas ir profesionalus požiūris.",
      en: "Wide selection and a professional approach.",
      ru: "Широкий выбор и профессиональный подход.",
      lv: "Plašs piedāvājums un profesionāla pieeja.",
    },
  },
  {
    author: "Julius Šepikas",
    text: {
      lt: "Puikus aptarnavimas, aiškiai paaiškino kaip viskuo naudotis. Kemperiai labai švarūs ir tvarkingi.",
      en: "Excellent service, they clearly explained how to use everything. The campers are very clean and well kept.",
      ru: "Отличный сервис, понятно объяснили, как всем пользоваться. Кемперы очень чистые и ухоженные.",
      lv: "Lielisks serviss, skaidri paskaidroja, kā visu lietot. Kemperi ir ļoti tīri un kārtīgi.",
    },
  },
  {
    author: "Edvardas Vilimas",
    text: {
      lt: "Labai geri ir patogūs kemperiai už priimtiną kainą. Ypač patogu čia nuomotis juos keliantis keltu į Skandinaviją.",
      en: "Very good and comfortable campers at a reasonable price. Especially convenient to rent here when taking the ferry to Scandinavia.",
      ru: "Очень хорошие и удобные кемперы по приемлемой цене. Особенно удобно арендовать здесь, отправляясь на пароме в Скандинавию.",
      lv: "Ļoti labi un ērti kemperi par pieņemamu cenu. Īpaši ērti tos nomāt šeit, dodoties ar prāmi uz Skandināviju.",
    },
  },
  {
    author: "Donatas Želvys",
    text: {
      lt: "Puikūs kemperiai.",
      en: "Great campers.",
      ru: "Отличные кемперы.",
      lv: "Lieliski kemperi.",
    },
  },
];
