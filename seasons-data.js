/* seasons-data.js - TEK DOSYA
   driveId boşsa ("") veya null ise bölüm “yayınlanmadı” olur.
*/

var SEASON_CONFIGS = {
  1: {
    seasonNumber: 1,

    episodeTitles: [
      "Başlangıcın Sonu ve Sonun Başlangıcı", //1
      "Cadıyla Yeniden Buluşma", //2
      "Hayat Başka Bir Dünyada Sıfırdan Başladı", //3
      "Mutlu Roswaal Malikânesi Ailesi", //4
      "Sözümüzün Sabahı Hâlâ Uzak", //5
      "Zincirlerin Sesi", //6
      "Natsuki Subaru’nun Yeniden Başlaması", //7
      "Ağladım, Ciğerlerim Çıkana Kadar Ağladım ve Ağlamayı Bıraktım", //8
      "Cesaretin Anlamı", //9
      "Bir Oni Gibi Fanatik Yöntemler", //10
      "Rem", //11
      "Kraliyet Başkenti’ne Dönüş", //12 REMASTERED
      "Kendini Şövalye İlan Eden Kişi", //13 REMASTERED
      "Çaresizlik Denen Hastalık", //14 REMASTERED
      "Deliliğin Ötesinde", //15 REMASTERED
      "Bir Domuzun Açgözlülüğü", //16 REMASTERED
      "Utancın Son Noktasında", //17 REMASTERED
      "Sıfırdan", //18 REMASTERED
      "Beyaz Balina Savaşı", //19 REMASTERED
      "Wilhelm van Astrea", //20
      "Umutsuzluğu Aşan Kumar", //21
      "Tembelliğin Ani Belirişi", //22
      "Alçak Tembellik", //23
      "Sözde Şövalye ile Şövalyelerin En Yücesi", //24
      "Bu Hikâye Sadece Bundan İbaret" //25
    ],

    episodeDriveIds: [
      "147GHfOyt5_dKEpN505SqiHenjgrNUNp0", //1
      "1kGssTBbkhJLV7WZWKbHcB4aabSVvJEC-", //2
      "1OaoZ47Da6a_3JAC4pKQx_W5a2INKKiG-", //3
      "122p7sBnGCngVKZXXyxujetQgHXo4ZzPp", //4
      "1du2c2JzgyXdgXync8U15szqGRhW6x27U", //5
      "15NzMzBSoO9y9fgeKvztgBYu3aWNmTfM0", //6
      "1YFLZMas9tGlbaqIXs2uG3qYyfmdqMwp6", //7
      "1BmZBuO6K4e4RGV68ts4ocySUskaAL2bR", //8
      "1KeqHAI9fUUHH_LlQt2qcF7_zUAAHm14t", //9
      "1-CVvSJ9HmgtsWL28mdc4HmMhLlLCFAKN", //10
      "1FvLCPBPKqSgoEKGmp5qOoreDreuh7QUO", //11
      "1R54bUmtYhMqbKAHhRo7IxIaNxZzzMvS9", //12 REMASTERED
      "11mikDuHoPe9e5OO_Cp9LQhGaV-RrPhBw", //13 REMASTERED
      "18uG4fj0YO20tOOLYHn0pEit7lwsdHPTa", //14 REMASTERED
      "1sUnz_fW7Sda3VBrOQ2KTYZ79JFuGbEJA", //15 REMASTERED
      "1pqBA6JNRRruEBuLAo7iknU_D0oOvtps3", //16 REMASTERED
      "1pq-GsljUngeMiaHD_Z4WTsImktE7gwiD", //17 REMASTERED
      "1haUah3-E3gLdgIxeamUebwLJI0EjUpEZ", //18 REMASTERED
      "1bYMOebheg00c5BsrzIqbXV8NMP6_2psV", //19 REMASTERED
      "1dDaS0EAraz7dJqocM3dXJGk20IhsAOiM", //20
      "1Osl-QEoeXCN19Bme6QiKp258k5UGLej5", //21
      "1lPD80YS2bT8yLCm0cALhtzTJy7pqJmSZ", //22
      "1j_yQKUdkASx_g3qJZSrymM_T1gOxjESs", //23
      "1Pr2HGzyxHLjkyMprr2SuFTJREmDxoKx0", //24
      "1pH5B3iEVy_sSIj_k35IlYFKM1Nlh9EDD" //25
    ],

    episodeAnimecixUrls: [
      "https://tau-video.xyz/embed/69590465c0da000447f8c912?vid=739612", //1
      "https://tau-video.xyz/embed/69590517c0da000447f8c913?vid=739615", //2
      "https://tau-video.xyz/embed/695959a5eb1a5915e492abbf?vid=739624", //3
      "https://tau-video.xyz/embed/69595a4df8d39f6943842987?vid=739627", //4
      "https://tau-video.xyz/embed/69595b011d66f6c39d140413?vid=739630", //5
      "https://tau-video.xyz/embed/6959a2d3faa4f0fe3c1460ed?vid=739786", //6
      "https://tau-video.xyz/embed/6959a324e4b357250ada9225?vid=739789", //7
      "https://tau-video.xyz/embed/6959a395c0da000447f8c91e?vid=739792", //8
      "https://tau-video.xyz/embed/6959a3e1c0da000447f8c91f?vid=739795", //9
      "https://tau-video.xyz/embed/695a75591d66f6c39d140421?vid=739900", //10
      "https://tau-video.xyz/embed/695a75fffaa4f0fe3c1460f3?vid=739903", //11
      "https://tau-video.xyz/embed/6a4beb6ef2c0587e0fd8b927?vid=757780", //12 REMASTERED
      "https://tau-video.xyz/embed/6a4bc510002a74333f66ae18?vid=757762", //13 REMASTERED
      "https://tau-video.xyz/embed/6a4bd0b675c86a0b6f67b715?vid=757765", //14 REMASTERED
      "https://tau-video.xyz/embed/6a4bb089ec3223a31a1ece91?vid=757753", //15 REMASTERED
      "https://tau-video.xyz/embed/6a4b9bc7002a74333f66ae17?vid=757750", //16 REMASTERED
      "https://tau-video.xyz/embed/6a4c4ca9ec3223a31a1ece93?vid=757795", //17 REMASTERED
      "https://tau-video.xyz/embed/6a4d28eea4f5f9e71074dccd?vid=757816", //18 REMASTERED
      "https://tau-video.xyz/embed/6a4d8580f342e3f8d7f90409?vid=757837", //19 REMASTERED
      "https://tau-video.xyz/embed/695c4a081d66f6c39d14042a?vid=740092", //20
      "https://tau-video.xyz/embed/695c4aacfaa4f0fe3c1460f9?vid=740095", //21
      "https://tau-video.xyz/embed/695c4b55faa4f0fe3c1460fa?vid=740098", //22
      "https://tau-video.xyz/embed/695e85a0eb1a5915e492abde?vid=740129", //23
      "https://tau-video.xyz/embed/695e8656a09ea30ace4838c8?vid=740132", //24
      "https://tau-video.xyz/embed/695e8717c0da000447f8c92c?vid=740135"  //25
    ],

    breakTimes: {
      1: "1CGapULNS1POrTmYmXnKBlO_wDkKHaeMe",
      2: "1dwYy4k2U81Q8y1vUC8Ey6pIjCIFo1scR",
      4: "1gKCWIRI9t3LyjgnQubgRdCWhjsbWJu-H",
      5: "1lv7LdOzUdXCoF_Elnf3kdnBeiWhP573g",
      6: "1RKzi37yb1xByAy-ZQi5zHpveBAxpyGjD",
      7: "1-GYhbc3uCN5nUCG21B40vuE91OMa9dIv",
      8: "1B-SZgEam7BccEorYHdwwE8GLVqnS6LtC",
      9: "1mZT2EmXn-Ag3ZBc4g5D1Na-g_DCAPkuP",
      10: "1elORZUp1fXF1_83i8qXHLPNNNJzVh4Vv",
      11: "1_Yf-yO5LIU-3mDKiWTpesUFVdvREGCNv"
    },

    specials: [
      {
        insertAfter: 11,
        kind: "special",
        extraType: "snow",
        number: 11,
        title: "Kar Altındaki Hatıralar (Memory Snow OVA)",
        driveId: "1FWsfLE2MozttOzZgFNjLStK80jCbLEwp",
        animecix: "https://tau-video.xyz/embed/695a7c18c0da000447f8c924?vid=739918"
      }
    ],

    finalEpisodeNumber: 25
  },

  // ====== SEZON 2 (25 bölüm) + 25 BREAKTIME + 0. BÖLÜM ÖZEL ======
  2: {
    seasonNumber: 2,

    episodeTitles: [
      "Her Birinin Sözü", //1
      "Sıradaki Yer", //2
      "Uzun Zamandır Beklenen Kavuşma", //3
      "Ebeveyn ve Çocuk", //4
      "İleriye Atılan Bir Adım", //5
      "Genç Kızın Kutsal Kitabı", //6
      "Arkadaş", //7
      "Hayatın Değeri", //8
      "Seviyorum Seviyorum Seviyorum Seviyorum Seviyorum Seviyorum Seni", //9
      "Cehennemi Biliyorum", //10
      "Ölümün Tadı", //11
      "Cadıların Çay Partisi", //12
      "İnsanı Ağlatacak Ses", //13
      "Doğrudan Bahis", //14
      "Otto Suwen / İnanmak İçin Bir Sebep", //15
      "Kuwein Taşı'nı Kimse Tek Başına Kaldıramaz", //16
      "Anılarda Bir Yolculuk", //17
      "Betelgeuse’ün Güldüğü Gün", //18
      "Büyük Elior Ormanı’nın Donmuş Toprağı", //19
      "Kutsal Bölge’nin Doğuşu ve Çöküşün Başlangıcı", //20
      "Bölüm 21", //21
      "Bölüm 22", //22
      "Bölüm 23", //23
      "Bölüm 24", //24
      "Bölüm 25" //25
    ],

    episodeDriveIds: [
      "1oMTN-MJVNsRbH_GY8fxeaClbdMIRoyCX", //1
      "11CQUTlU1VjfOb_QcXP-x2OQWLVMg65SL", //2
      "1MIUr8XVv6JavzdrOsTil_K9xIxIP8zJ8", //3
      "13_686vCmUY2GiJgptKsvRidMM04ba-IV", //4
      "1AwLqPyXIF0ZbDhIm8kkYhDsPK1w4P-RT", //5
      "1uPumls8bWxuxrAy_S-trjCNOgR-2hmxY", //6
      "1KtoZ6cEfTPMP86yCBUNudxYymHiq9gdk", //7
      "1LeTJu1wubb1MWZrnZfMr5zPpC2U8WbUI", //8
      "1QG6Ux6ajTYuhc9OEPBclmPyL7aUm46pG", //9
      "1gU9fvuwqBCigz_HCl7Md7a2rP6jnXG0s", //10
      "1ws2FR9gCkoMLISheEFVsN0FgXsQLr_HW", //11
      "18xovlR6DxDJtCWYA53e39jSyzGO7XpSV", //12
      "1VOkvOyyvyKpNc0pJuEcwYoDUPM9YFIFo", //13
      "1z428JvmHpEa7n-A03a29f9GB5Mwch3GV", //14
      "1WiMv7-oM6zqSWRqNTxXARKDnLJ_yJdWP", //15
      "1GUeJoRikG-JbeHDDLXDOl4axlDDZVBbv", //16
      "13nU4GzG_K3hRHmkDgRx-N3AjgKwHMZsv", //17
      "1ocAkWSaPl28_PoaF5Gb0raRQvMelszm7", //18
      "1sSnZ7rLhCKJXe4Twxv-2bPV12vRu45EV", //19
      "1WfUmzjDI6ldGLA5HSFeT37XyyUQxDtJw", //20
      "", //21
      "", //22
      "", //23
      "", //24
      ""  //25
    ],

    episodeAnimecixUrls: [
      "https://tau-video.xyz/embed/696391021d66f6c39d140442?vid=740560", //1
      "https://tau-video.xyz/embed/696391b1eb1a5915e492abef?vid=740563", //2
      "https://tau-video.xyz/embed/69655933fd4c16eef7c23fe4?vid=740683", //3
      "https://tau-video.xyz/embed/69842511fd4c16eef7c24079?vid=744304", //4
      "https://tau-video.xyz/embed/6984e4ecfaa4f0fe3c1461b3?vid=744356", //5
      "https://tau-video.xyz/embed/6985f876fd4c16eef7c2407d?vid=744404", //6
      "https://tau-video.xyz/embed/698670b2a09ea30ace48397f?vid=744428", //7
      "https://tau-video.xyz/embed/69876e3dfd4c16eef7c24081?vid=744512", //8
      "https://tau-video.xyz/embed/69879541f8d39f6943842a55?vid=744524", //9
      "https://tau-video.xyz/embed/69886ace1d66f6c39d1404ee?vid=744581", //10
      "https://tau-video.xyz/embed/6989164aeb1a5915e492acad?vid=744678", //11
      "https://tau-video.xyz/embed/6a3cdde9f342e3f8d7f903b9?vid=756522", //12
      "https://tau-video.xyz/embed/6a3fba73002a74333f66add6?vid=756595", //13
      "https://tau-video.xyz/embed/6a441bdbf2c0587e0fd8b8e7?vid=756981", //14
      "https://tau-video.xyz/embed/6a469f7ad5ce148fbbb338b2?vid=757205", //15
      "https://tau-video.xyz/embed/6a4804e859edd8529b31224f?vid=757265", //16
      "https://tau-video.xyz/embed/6a49917ef2c0587e0fd8b912?vid=757414", //17
      "https://tau-video.xyz/embed/6a4e753e59edd8529b31226c?vid=757855", //18
      "https://tau-video.xyz/embed/6a4fe4e5a4f5f9e71074dcd4?vid=757938", //19
      "https://tau-video.xyz/embed/6a5154d9d5ce148fbbb338e3?vid=758103", //20
      "", //21
      "", //22
      "", //23
      "", //24
      ""  //25
    ],

    // 25 breaktime (her bölümün arkasına)
    breakTimes: {
    },

    // 0. bölüm özel (liste başına gelsin diye insertAfter: 0)
    specials: [
      {
        insertAfter: 0,
        kind: "special",
        extraType: "frozenbond",
        number: 0,
        title: "Donmuş Bağlar (Frozen Bonds)",
        driveId: "1mCqTf2q6BDimWzlcyx8Ksi8Ny3vONsSE",
        animecix: "https://tau-video.xyz/embed/6a48f26bec3223a31a1ece76?vid=757342"
      }
    ],

    finalEpisodeNumber: 25
  },

  // ====== SEZON 3 (16 bölüm) + 16 BREAKTIME ======
  3: {
    seasonNumber: 3,

    episodeTitles: [
      "Tiyatral Kötülük", //1
      "Buz ve Ateşin Karşılaşması", //2
      "Muhteşem Kaplan", //3
      "Belediye Binasını Geri Alma Operasyonu", //4
      "Karanlık Sel", //5
      "Şövalyeliğin Kitabı", //6
      "Kahramanların En Yenisi ve Kahramanların En Eskisi", //7
      "Bir Gün Âşık Olacağım O Kişi", //8
      "Kaos İçindeki Şehir", //9
      "Açgözlülüğü Alt Etme Savaşı", //10
      "Liliana Masquerade", //11
      "Regulus Corneas", //12
      "Bir Savaşçının Övgüsü", //13
      "Theresia van Astrea", //14
      "Korkunç Bir Ziyafet", //15
      "Priestella Muharebesi’nin Sonuçları" //16
    ],

    episodeDriveIds: [
      "1vhTvM7cKVTJohTnOInjShmIHFAsI3kUD", //1
      "1Ar0hH6a2__qwdvtk3_pHVzXABZLpszFx", //2
      "1FDeZIgqJFNs9wj49tVpULwp-ga9p0fuH", //3
      "1U6TVGLDsmsPL6kks0oZC_0dAEDsCMQ8A", //4
      "1sDNR4kJDNPFwTtwfh-cHegS31w6VCYNB", //5
      "11HslSzqN8V5M2X_QFtyzaGAoPRsmsKIQ", //6
      "1Grs6lBbXgSMwOFAL-E7F7xG04n1_u-yQ", //7
      "1ri8xIDeooaMNZQ-Nlz0B8dFs2hnjjE-J", //8
      "1iWfa7U_Xc6GOm_cLjnKIu7mxy4yXZfTc", //9
      "1WnNCs_EJSmF2DH8o88zBpDWIr5B2_ltD", //10
      "1CEDhVMOPGclzHbduBgMecPv1lxvqvJ_1", //11
      "1xQIfhIdi19IlMRi0pCWjcsqboeU1sz01", //12
      "1rpn73-lLMiNJeLxMrL3K7z8Tdx_o6u1s", //13
      "1jfFT0MqTE5jbUGzPwhMExbX0atoQ0eIL", //14
      "1HUsXrPFj7Humn49TsSAT1h4iGyDJ77de", //15
      "1y6VE-maPbisreKwMYsucFHlvdYk1mQsf"  //16
    ],

    episodeAnimecixUrls: [
      "https://tau-video.xyz/embed/69ac3c1198be3e47efffd799?vid=746656", //1
      "https://tau-video.xyz/embed/696caae5e4b357250ada9261?vid=741449", //2
      "https://tau-video.xyz/embed/69adf2bcb923b3ffeb12b549?vid=746751", //3
      "https://tau-video.xyz/embed/69b02adcb923b3ffeb12b54c?vid=746820", //4
      "https://tau-video.xyz/embed/69b0949fb067130deed1bfe4?vid=746883", //5
      "https://tau-video.xyz/embed/69b1e728140a125ba837161b?vid=746949", //6
      "https://tau-video.xyz/embed/69b4b2055d4202aa1736c069?vid=747138", //7
      "https://tau-video.xyz/embed/69b5d40e98be3e47efffd7ad?vid=747180", //8
      "https://tau-video.xyz/embed/69b72e02b923b3ffeb12b561?vid=747330", //9
      "https://tau-video.xyz/embed/69b9aa175d4202aa1736c079?vid=747471", //10
      "https://tau-video.xyz/embed/69badd20b84256f1db55ea77?vid=747630", //11
      "https://tau-video.xyz/embed/69bc6ab276acb7a32c35377d?vid=747787", //12
      "https://tau-video.xyz/embed/69bdb0f8cb8083ded340b946?vid=747814", //13
      "https://tau-video.xyz/embed/6a161c2981d720339fcc0e40?vid=754584", //14
      "https://tau-video.xyz/embed/6a2ff80948d66c80c1527e0b?vid=756075", //15
      "https://tau-video.xyz/embed/6a2f22ee48d66c80c1527e06?vid=756006"  //16
    ],

    breakTimes: {
    },

    specials: [],
    finalEpisodeNumber: 16
  },

  // ====== SEZON 4 (19 bölüm) ======-
  4: {
    seasonNumber: 4,
    episodeTitles: [
      "Seni Yanımda Götürme Sebebim / Yeniden Doğan Muhteşem Kaplan", "Kum Zamanını Aşmak", "Gözetleme Kulesi’nin Bekçisi",
	  "Beyaz Gökyüzünün Asterizmi", "Çubuk Sallayan", "Julius Juukulius", "Marketin Kapısından Çıkıp Harikalarla Dolu Bir Dünyaya Adım Attım",
	  "Sen Kimsin?", "Kalıntı", "Öldürmek Alışkanlığa Dönüşür", "Re: Sıfırdan Başka Bir Dünyada Hayata Başlamak", 
	  "Bölüm 12", "Bölüm 13", "Bölüm 14", "Bölüm 15",
      "Bölüm 16", "Bölüm 17", "Bölüm 18", "Bölüm 19"
    ],
    episodeDriveIds: [
      "1QX5Ci-qo7gAh71hvqPiyKb2VRjbKfQBc", "1JfeHf0uqoDy8ixEs_XgGYHqLOw42Y02H", "1DXE79eMB-VVJ0KSoVYSDBdWbSppRTeZc",
	  "1xPtLpdv7xfFFkZoDNtnN4tpqAwXmG3kh", "1bS5pCgmGPlwi3Hqu2Jf3f2ghAkcXt4ci", "1Z5YcR-8wBW2qec27TAxXfHySLRJwZ9Io", 
	  "1Smh9gH3o3PNXbUqOXktf0kDkcbKc8OOF", "19EtnNefYAbpOQ-D23xFvKchDn14AvYzZ", "1RF6CQwSkMQG-tSkc4dRxjaGPQumUeCtW", 
	  "1IxzeEfGR-xKPBHfrQktjnxaiopRUyuPa", "1VFbcKH_7qF21Uzun-iaUg6qx5_1wnh8N", "", "", "", "", "", "", "", ""
    ],
    episodeAnimecixUrls: [
      "https://tau-video.xyz/embed/69e8ceb7b067130deed1c092?vid=750688", "https://tau-video.xyz/embed/69e8bf60140a125ba83716c3?vid=750685", "https://tau-video.xyz/embed/69e8fec698be3e47efffd83a?vid=750724",
	  "https://tau-video.xyz/embed/69f251d0b067130deed1c0a9?vid=751376", "https://tau-video.xyz/embed/69fc9193b067130deed1c0c8?vid=752258", "https://tau-video.xyz/embed/6a04c6cb3729057a605fd310?vid=752950", 
	  "https://tau-video.xyz/embed/6a0df516a885b85179cd7eeb?vid=753720", "https://tau-video.xyz/embed/6a17385f5ff7bff04ed66d5f?vid=754671", "https://tau-video.xyz/embed/6a205b5748d0c9a296abef0b?vid=755401", 
	  "https://tau-video.xyz/embed/6a29b418224010c9ef3ebc1a?vid=755865", "https://tau-video.xyz/embed/6a32e69ef2c0587e0fd8b8b7?vid=756201", "", "", "", "", "", "", "", ""
    ],
    breakTimes: {},
    specials: [],
    finalEpisodeNumber: 19
  }
};

function buildEpisodes(seasonNumber) {
  var cfg = SEASON_CONFIGS[seasonNumber];
  if (!cfg) throw new Error("Season config not found: " + seasonNumber);

  var specialsByAfter = {};
  (cfg.specials || []).forEach(function (s) {
    if (!specialsByAfter[s.insertAfter]) specialsByAfter[s.insertAfter] = [];
    specialsByAfter[s.insertAfter].push(s);
  });

  var list = [];

  // ✅ insertAfter: 0 specials (en başa)
  var specialsZero = specialsByAfter[0] || [];
  specialsZero.forEach(function (s) {
    var sId0 = String(s.driveId || "").trim();
    var sAni = s.animecix ? String(s.animecix).trim() : null;
    list.push({
      number: (typeof s.number !== "undefined" ? s.number : 0),
      title: s.title,
      driveId: sId0 ? sId0 : null,
      animecix: sAni ? sAni : null,
      kind: s.kind || "special",
      isExtra: true,
      extraType: s.extraType || "special"
    });
  });

  for (var i = 0; i < cfg.episodeTitles.length; i++) {
    var number = i + 1;
    var title = cfg.episodeTitles[i] || ("Bölüm " + number);
    var driveId = String(cfg.episodeDriveIds[i] || "").trim();
    var animecix = cfg.episodeAnimecixUrls ? String(cfg.episodeAnimecixUrls[i] || "").trim() : null;

    list.push({
      number: number,
      title: title,
      driveId: driveId ? driveId : null,
      animecix: animecix ? animecix : null,
      kind: "episode",
      isExtra: false,
      isFinal: number === cfg.finalEpisodeNumber
    });

    if (cfg.breakTimes && Object.prototype.hasOwnProperty.call(cfg.breakTimes, number)) {
      var bk = cfg.breakTimes[number];
      var bId = typeof bk === "string" ? bk.trim() : (bk ? String(bk.driveId || "").trim() : "");
      var bAni = (typeof bk === "object" && bk.animecix) ? String(bk.animecix).trim() : null;
      list.push({
        number: number,
        title: number + ". Mola Zamanı",
        driveId: bId ? bId : null,
        animecix: bAni ? bAni : null,
        kind: "break",
        isExtra: true,
        extraType: "break"
      });
    }

    var specialsHere = specialsByAfter[number] || [];
    specialsHere.forEach(function (s) {
      var sId = String(s.driveId || "").trim();
      var sAni = s.animecix ? String(s.animecix).trim() : null;
      list.push({
        number: (typeof s.number !== "undefined" ? s.number : number),
        title: s.title,
        driveId: sId ? sId : null,
        animecix: sAni ? sAni : null,
        kind: s.kind || "special",
        isExtra: true,
        extraType: s.extraType || "special"
      });
    });
  }

  return list;
}

window.REZERO_SEASONS = {
  configs: SEASON_CONFIGS,
  buildEpisodes: buildEpisodes
};

console.log("[OK] seasons-data.js loaded", window.REZERO_SEASONS);
