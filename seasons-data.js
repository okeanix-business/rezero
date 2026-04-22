/* seasons-data.js - TEK DOSYA
   driveId boşsa ("") veya null ise bölüm “yayınlanmadı” olur.
*/

var SEASON_CONFIGS = {
  1: {
    seasonNumber: 1,

    episodeTitles: [
      "Başlangıcın Sonu Ve Sonun Başlangıcı", //1
      "Cadıyla Yeniden Buluşma", //2
      "Hayat Başka Bir Dünyada Sıfırdan Başladı", //3
      "Mutlu Roswaal Malikanesi Ailesi", //4
      "Sözümüzün Sabahı Hala Uzak", //5
      "Zincirlerin Sesi", //6
      "Natsuki Subaru'nun Yeniden Başlaması", //7
      "Ağladım, Ciğerlerim Çıkana Kadar Ağladım ve Ağlamayı Bıraktım", //8
      "Cesaretin Anlamı", //9
      "Bir Oni Gibi Fanatik Yöntemler", //10
      "Rem", //11
      "Başkente Dönüş", //12
      "Kendini Şövalye İlan Eden Kişi", //13
      "Çaresizlik Adındaki Hastalık", //14
      "Deliliğin Ötesinde", //15
      "Bir Domuzun Açgözlülüğü", //16
      "Aşırı Utanç", //17
      "Sıfırdan", //18
      "Beyaz Balina'ya Karşı Savaş", //19
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
      "18HljC_vgaJQgUqqdC78dQ6WOcs8D2Qwi", //12
      "1WamXGfq1phJZaSLnXmC8siDYCXy419VG", //13
      "19v2-TcvENgKDTOt3HNeKFuC4aTISRcQa", //14
      "1JVc99h0JZ74UH9q45KXuvbC2LdKbx6N8", //15
      "1Gseu5ao1BnF2RjIhXNc1y3aBvKs7QqJ5", //16
      "1s8yptmVl6RXiwXN9epgOxRECltJp_t_j", //17
      "1cJOr7dB9a1DDFMRlKCFcFVDxIpR931i_", //18
      "1RTDAuNtemX_vGCXivKq6IyB3tpoJHWvQ", //19
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
      "https://tau-video.xyz/embed/695aca961d66f6c39d140425?vid=739972", //12
      "https://tau-video.xyz/embed/695acb3fc0da000447f8c927?vid=739975", //13
      "https://tau-video.xyz/embed/695acbeef8d39f6943842994?vid=739978", //14
      "https://tau-video.xyz/embed/695acc9df8d39f6943842995?vid=739981", //15
      "https://tau-video.xyz/embed/695acde6c0da000447f8c928?vid=739987", //16
      "https://tau-video.xyz/embed/695ace91eb1a5915e492abd2?vid=739990", //17
      "https://tau-video.xyz/embed/695c48c0eb1a5915e492abdc?vid=740086", //18
      "https://tau-video.xyz/embed/695c4963faa4f0fe3c1460f8?vid=740089", //19
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
      "Bölüm 12", //12
      "Bölüm 13", //13
      "Bölüm 14", //14
      "Bölüm 15", //15
      "Bölüm 16", //16
      "Bölüm 17", //17
      "Bölüm 18", //18
      "Bölüm 19", //19
      "Bölüm 20", //20
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
      "", //12
      "", //13
      "", //14
      "", //15
      "", //16
      "", //17
      "", //18
      "", //19
      "", //20
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
      "", //12
      "", //13
      "", //14
      "", //15
      "", //16
      "", //17
      "", //18
      "", //19
      "", //20
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
        driveId: "1ppB2BsVB9X5J-pzf4dABzEkCFLBPyaaX",
        animecix: "https://tau-video.xyz/embed/6960fd841d66f6c39d140436?vid=740359"
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
      "Bir Gün Aşık Olacağım O Kişi", //8
      "Kaos İçindeki Şehir", //9
      "Açgözlülüğü Alt Etme Savaşı", //10
      "Liliana Masquerade", //11
      "Regulus Corneas", //12
      "Bir Savaşçının Övgüsü", //13
      "Bölüm 14", //14
      "Bölüm 15", //15
      "Bölüm 16" //16
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
      "", //14
      "", //15
      ""  //16
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
      "", //14
      "", //15
      ""  //16
    ],

    breakTimes: {
    },

    specials: [],
    finalEpisodeNumber: 16
  },

  // ====== SEZON 4 (19 bölüm) ======
  4: {
    seasonNumber: 4,
    episodeTitles: [
      "Seni Yanımda Götürme Sebebim / Yeniden Doğan Muhteşem Kaplan", "Kum Zamanını Aşmak", "Bölüm 3", "Bölüm 4", "Bölüm 5",
      "Bölüm 6", "Bölüm 7", "Bölüm 8", "Bölüm 9", "Bölüm 10",
      "Bölüm 11", "Bölüm 12", "Bölüm 13", "Bölüm 14", "Bölüm 15",
      "Bölüm 16", "Bölüm 17", "Bölüm 18", "Bölüm 19"
    ],
    episodeDriveIds: [
      "16DtSCF9rkbhDIMM4ZVtl8gD8xIfk-FZ5", "1JfeHf0uqoDy8ixEs_XgGYHqLOw42Y02H", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""
    ],
    episodeAnimecixUrls: [
      "https://tau-video.xyz/embed/69d7d217b923b3ffeb12b5bc?vid=749249", "https://tau-video.xyz/embed/69dfd51bb923b3ffeb12b5da?vid=750103", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""
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
