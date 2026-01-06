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
      "1EO4kdniSwOh_EiBdM4BzILB5Cennmn2h", //3
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

    breakTimes: {
      1: "1CGapULNS1POrTmYmXnKBlO_wDkKHaeMe",
      2: "1dwYy4k2U81Q8y1vUC8Ey6pIjCIFo1scR",
      3: "15Iwc2XhEmtdzPRP_o5lddjgnF39ClIt9",
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
        driveId: "1FWsfLE2MozttOzZgFNjLStK80jCbLEwp"
      }
    ],

    finalEpisodeNumber: 25
  },

  // ====== SEZON 2 (25 bölüm) + 25 BREAKTIME + 0. BÖLÜM ÖZEL ======
  2: {
    seasonNumber: 2,

    episodeTitles: [
      "Bölüm 1", //1
      "Bölüm 2", //2
      "Bölüm 3", //3
      "Bölüm 4", //4
      "Bölüm 5", //5
      "Bölüm 6", //6
      "Bölüm 7", //7
      "Bölüm 8", //8
      "Bölüm 9", //9
      "Bölüm 10", //10
      "Bölüm 11", //11
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
      "", //1
      "", //2
      "", //3
      "", //4
      "", //5
      "", //6
      "", //7
      "", //8
      "", //9
      "", //10
      "", //11
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
      1: "",  // break after 1
      2: "",  // break after 2
      3: "",  // break after 3
      4: "",  // break after 4
      5: "",  // break after 5
      6: "",  // break after 6
      7: "",  // break after 7
      8: "",  // break after 8
      9: "",  // break after 9
      10: "", // break after 10
      11: "", // break after 11
      12: "", // break after 12
      13: "", // break after 13
      14: "", // break after 14
      15: "", // break after 15
      16: "", // break after 16
      17: "", // break after 17
      18: "", // break after 18
      19: "", // break after 19
      20: "", // break after 20
      21: "", // break after 21
      22: "", // break after 22
      23: "", // break after 23
      24: "", // break after 24
      25: ""  // break after 25
    },

    // 0. bölüm özel (liste başına gelsin diye insertAfter: 0)
    specials: [
      {
        insertAfter: 0,
        kind: "special",
        extraType: "special0",
        number: 0,
        title: "The Frozen Bond",
        driveId: ""
      }
    ],

    finalEpisodeNumber: 25
  },

  // ====== SEZON 3 (16 bölüm) + 16 BREAKTIME ======
  3: {
    seasonNumber: 3,

    episodeTitles: [
      "Bölüm 1", //1
      "Bölüm 2", //2
      "Bölüm 3", //3
      "Bölüm 4", //4
      "Bölüm 5", //5
      "Bölüm 6", //6
      "Bölüm 7", //7
      "Bölüm 8", //8
      "Bölüm 9", //9
      "Bölüm 10", //10
      "Bölüm 11", //11
      "Bölüm 12", //12
      "Bölüm 13", //13
      "Bölüm 14", //14
      "Bölüm 15", //15
      "Bölüm 16" //16
    ],

    episodeDriveIds: [
      "", //1
      "", //2
      "", //3
      "", //4
      "", //5
      "", //6
      "", //7
      "", //8
      "", //9
      "", //10
      "", //11
      "", //12
      "", //13
      "", //14
      "", //15
      ""  //16
    ],

    breakTimes: {
      1: "",  // break after 1
      2: "",  // break after 2
      3: "",  // break after 3
      4: "",  // break after 4
      5: "",  // break after 5
      6: "",  // break after 6
      7: "",  // break after 7
      8: "",  // break after 8
      9: "",  // break after 9
      10: "", // break after 10
      11: "", // break after 11
      12: "", // break after 12
      13: "", // break after 13
      14: "", // break after 14
      15: "", // break after 15
      16: ""  // break after 16
    },

    specials: [],
    finalEpisodeNumber: 16
  },

  // ====== SEZON 4 (1 bölüm) — finalEpisodeNumber'a DOKUNMADIM ======
  4: {
    seasonNumber: 4,
    episodeTitles: ["Bölüm 1"], //1
    episodeDriveIds: [""], //1
    breakTimes: {},
    specials: [],
    finalEpisodeNumber: 99
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
    list.push({
      number: (typeof s.number !== "undefined" ? s.number : 0),
      title: s.title,
      driveId: sId0 ? sId0 : null,
      kind: s.kind || "special",
      isExtra: true,
      extraType: s.extraType || "special"
    });
  });

  for (var i = 0; i < cfg.episodeTitles.length; i++) {
    var number = i + 1;
    var title = cfg.episodeTitles[i] || ("Bölüm " + number);
    var driveId = String(cfg.episodeDriveIds[i] || "").trim();

    list.push({
      number: number,
      title: title,
      driveId: driveId ? driveId : null,
      kind: "episode",
      isExtra: false,
      isFinal: number === cfg.finalEpisodeNumber
    });

    if (cfg.breakTimes && Object.prototype.hasOwnProperty.call(cfg.breakTimes, number)) {
      var bId = String(cfg.breakTimes[number] || "").trim();
      list.push({
        number: number,
        title: number + ". Mola Zamanı",
        driveId: bId ? bId : null,
        kind: "break",
        isExtra: true,
        extraType: "break"
      });
    }

    var specialsHere = specialsByAfter[number] || [];
    specialsHere.forEach(function (s) {
      var sId = String(s.driveId || "").trim();
      list.push({
        number: (typeof s.number !== "undefined" ? s.number : number),
        title: s.title,
        driveId: sId ? sId : null,
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
