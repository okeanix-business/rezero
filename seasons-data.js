/* seasons-data.js - TEK DOSYA
   Birincil Google Drive için episodeDriveIds/driveId kullanılır.
   İsteğe bağlı ikinci ve üçüncü Google Drive için bölüm numarasını anahtar yap:
   episodeDriveIds2: { 3: "DOSYA_ID_VEYA_PAYLASIM_LINKI" }
   episodeDriveIds3: { 3: "DOSYA_ID_VEYA_PAYLASIM_LINKI" }
   (Özel ve ara bölümlerde doğrudan driveId2 ve driveId3 alanları kullanılabilir.)
*/

var SEASON_CONFIGS = {
  1: {
    seasonNumber: 1,

    episodeTitles: [
      "Başlangıcın Sonu ve Sonun Başlangıcı", //1 REMASTERED (2026)
      "Kavuşma Cadısı", //2 REMASTERED (2026)
      "Başka Bir Dünyada Sıfırdan Başlayan Hayat", //3 REMASTERED (2026)
      "Roswaal Malikânesi’nde Aile Saadeti", //4 REMASTERED (2026)
      "Sözümüzün Sabahı Hâlâ Uzak", //5 REMASTERED (2026)
      "Zincirlerin Sesi", //6 REMASTERED (2026) 
      "Natsuki Subaru’nun Yeniden Başlangıcı", //7 REMASTERED (2026)
      "Ağladım, Haykıra Haykıra Ağladım ve Sonunda Ağlamam Dindi", //8 REMASTERED (2026)
      "Cesaretin Anlamı", //9 REMASTERED (2026)
      "Oni Gibi Bir Yöntem", //10 REMASTERED (2026)
      "Rem", //11 REMASTERED (2026)
      "Kraliyet Başkenti’ne Dönüş", //12 REMASTERED (2026)
      "Kendini Şövalye İlan Eden Kişi", //13 REMASTERED (2026)
      "Çaresizlik Denen Hastalık", //14 REMASTERED (2026)
      "Deliliğin Ötesinde", //15 REMASTERED (2026)
      "Bir Domuzun Açgözlülüğü", //16 REMASTERED (2026)
      "Utancın Son Noktasında", //17 REMASTERED (2026)
      "Sıfırdan", //18 REMASTERED (2026)
      "Beyaz Balina Savaşı", //19 REMASTERED (2026)
      "Wilhelm van Astrea", //20 REMASTERED (2026)
      "Umutsuzluğu Aşan Kumar", //21 REMASTERED (2026)
      "Tembelliğin Ani Belirişi", //22 REMASTERED (2026)
      "Alçak Tembellik", //23 REMASTERED (2026)
      "Sözde Şövalye ile En Seçkin Şövalye", //24 REMASTERED (2026)
      "Yalnızca Bundan İbaret Bir Hikâye" //25 REMASTERED (2026)
    ],

    episodeDriveIds: [
      "10P68er2R1e2mrb851mf7Tg55tZRldzZM", //1 REMASTERED (2026)
      "1OiUgLCMi8kecTO7u1fy3Zfwo0ivd-Alj", //2 REMASTERED (2026)
      "1QwYXBTvbny3ndouHDAKDxluqjLHOjts_", //3 REMASTERED (2026)
      "1l9cT1V0U1_-4Xvfg3Iy6VAiDlJ1J9Q7Q", //4 REMASTERED (2026)
      "1VGxgcgHOlhoNsti5IQ7v_XRngtePrD1J", //5 REMASTERED (2026)
      "1gFPM90dfgPPJjkStm7aAVNp0yTbzjCgM", //6 REMASTERED (2026)
      "1QlkSDPGX6wGgoAeq64QpQLtLAl3DD0mg", //7 REMASTERED (2026)
      "10ViNTKNLBk_6y-FXIpVgVHpJX6mNIJOS", //8 REMASTERED (2026)
      "1Q2cUkHwvEsbzZRsILP6CxcvBjDXJd2Dm", //9 REMASTERED (2026)
      "1DfNzmwT1zEBijaJSeQnJj6Yn6-P7LCYD", //10 REMASTERED (2026)
      "1Tg7CgFWwNVDX3DAY0W08il0otqvgslQA", //11 REMASTERED (2026)
      "1mccdQ6JlQSCDiBA5A61CYPxH4OAWwOIk", //12 REMASTERED (2026)
      "1AlKsi4lfz7m2Wdmr1ZXBWbY9VTArMc4u", //13 REMASTERED (2026)
      "1_Y4Uw_CDJM3qeyaoeZcnpIG4wI2ZBum7", //14 REMASTERED (2026)
      "1LJAPoH_r4yAhX7dyjuMCbDVnc9jr9qHF", //15 REMASTERED (2026)
      "12W0I7bq65iuxRnsfb_FVVSscUjk7zDIK", //16 REMASTERED (2026)
      "1k8Q81uERbLv5Ny4aejiPdSc8jSYd_yQ8", //17 REMASTERED (2026)
      "1sI2JtCGwh-4hL-rZZyE0Fs_iaVCR4qJM", //18 REMASTERED (2026)
      "1mpkYhNV18fRPen6yyCsqXlkrxLf2pEYT", //19 REMASTERED (2026)
      "1BCZFzveOWUjcXbVjlIQqpwiunIgAH2Kn", //20 REMASTERED (2026)
      "1YUUDLVccpRr2NrZBHXqyFOHbOGiETwHR", //21 REMASTERED (2026)
      "178IdqPQhhLOMShHzFYDceWnV_nV5qlF0", //22 REMASTERED (2026)
      "1vGYpxbgc5y5cExvn4aTtwc7wjfv7sbhR", //23 REMASTERED (2026)
      "1JXh5jQX2mVQ5QmizVVOsW0fH4ueI69Ve", //24 REMASTERED (2026)
      "1gS01BmHXt4XYJwSVFgol-ixMY_Qcfgu9" //25 REMASTERED (2026)
    ],

    episodeDriveIds2: {},
    episodeDriveIds3: {},

    episodeAnimecixUrls: [
      "https://tau-video.xyz/embed/6a5aca71ec3223a31a1eced4?vid=758753", //1 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a5acb04f342e3f8d7f9045b?vid=758756", //2 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a5acb8ff342e3f8d7f9045c?vid=758759", //3 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a5bcaafa4f5f9e71074dd0c?vid=758789", //4 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a5bcb4075c86a0b6f67b759?vid=758792", //5 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a5cabb4d5ce148fbbb3392c?vid=758831", //6 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a5cc914002a74333f66ae6b?vid=758840", //7 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a5cf0bdf342e3f8d7f90462?vid=758846", //8 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a5d1b08002a74333f66ae71?vid=758894", //9 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a5d5987002a74333f66ae73?vid=758909", //10 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a5e65caf342e3f8d7f90469?vid=758951", //11 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a5feedf59edd8529b3122c9?vid=759020", //12 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a5fef6aa4f5f9e71074dd1b?vid=759023", //13 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a5feff4002a74333f66ae7e?vid=759026", //14 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a5ff07da4f5f9e71074dd1c?vid=759029", //15 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a5ff1d1f2c0587e0fd8b97c?vid=759032", //16 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a60ac3e002a74333f66ae81?vid=759047", //17 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a60acd3d5ce148fbbb3393f?vid=759050", //18 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a60ad65002a74333f66ae82?vid=759053", //19 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a60f125f2c0587e0fd8b97e?vid=759068", //20 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a611bab002a74333f66ae87?vid=759086", //21 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a624554f2c0587e0fd8b987?vid=759116", //22 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a6246abf342e3f8d7f9047d?vid=759122", //23 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a646ab5002a74333f66ae93?vid=759236", //24 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a646b41a4f5f9e71074dd28?vid=759239"  //25 REMASTERED (2026)
    ],

    breakTimes: {
    },

    specials: [
      {
        insertAfter: 11,
        kind: "special",
        extraType: "snow",
        number: 11,
        title: "Kar Altındaki Hatıralar (Memory Snow OVA)",
        driveId: "1904Fem662P68xR2D0ZNR_iziH3rj7ceW",
        animecix: "https://tau-video.xyz/embed/6a5f8987002a74333f66ae78?vid=758990"
      }
    ],

    finalEpisodeNumber: 25
  },

  // ====== SEZON 2 (25 bölüm) + 25 BREAKTIME + 0. BÖLÜM ÖZEL ======
  2: {
    seasonNumber: 2,

    episodeTitles: [
      "Her Birinin Sözü", //1 REMASTERED (2026)
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
      "Betelgeuse’ün Güldüğü Gün", //18 REMASTERED (2026)
      "Büyük Elior Ormanı’nın Donmuş Toprağı", //19 FINAL DAHA ELLENMEYECEK
      "Kutsal Bölge’nin Doğuşu ve Çöküşün Başlangıcı", //20 FINAL DAHA ELLENMEYECEK
      "Kükreyişlerin Kavuşması", //21 FINAL DAHA ELLENMEYECEK
      "Su Yüzüne Yansıyan Mutluluk", //22 FINAL DAHA ELLENMEYECEK
      "Kanıma ve Bağırsaklarıma Kadar Sev Beni", //23 FINAL DAHA ELLENMEYECEK
      "Beni Seç", //24 FINAL DAHA ELLENMEYECEK 
      "Ay Işığında Gelişigüzel Adımlar" //25 FINAL DAHA ELLENMEYECEK
    ],

    episodeDriveIds: [
      "1YAj-fxcBnGqBDUneVIV4TPPd20XtqO7L", //1 REMASTERED (2026)
      "1c5g4LM2oTSEzt8mu5lGElSrjQ5xDDm-t", //2 REMASTERED (2026)
      "1fea2vrbKlVYpeg9bHosGhJ2GkQi_iylD", //3 REMASTERED (2026)
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
      "19fpACc5Fc4jSKBJxsIA4Ju0xn2gVITBw", //21
      "16HsKpsasUm-xsuc8BgDyXKXdJ_Grw8ZA", //22
      "1bpjCD9PGmqR19Ql5El06c4OmPZ75kJ5L", //23
      "1LA954BPBF8mJlL01YkaAW5eMeSPuccb4", //24
      "1pwZMpUXdUBPQF4FOZki76UgitWN0rdPD"  //25
    ],

    episodeDriveIds2: {},
    episodeDriveIds3: {},

    episodeAnimecixUrls: [
      "https://tau-video.xyz/embed/6a652475a4f5f9e71074dd2b?vid=759269", //1 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a652507ec3223a31a1ecef2?vid=759272", //2 REMASTERED (2026)
      "https://tau-video.xyz/embed/6a6629bff342e3f8d7f90483?vid=759284", //3 REMASTERED (2026)
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
      "https://tau-video.xyz/embed/6a53efc8002a74333f66ae43?vid=758242", //21
      "https://tau-video.xyz/embed/6a553fdad5ce148fbbb33909?vid=758311", //22
      "https://tau-video.xyz/embed/6a555791a4f5f9e71074dcf3?vid=758320", //23
      "https://tau-video.xyz/embed/6a569c9475c86a0b6f67b747?vid=758539", //24
      "https://tau-video.xyz/embed/6a58b680f2c0587e0fd8b958?vid=758668"  //25
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
        driveId: "13bqGz0XivQi9yaMmrZoRnxF54v-byY9B",
        animecix: "https://tau-video.xyz/embed/6a5fb88aa4f5f9e71074dd15?vid=759002"
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

    episodeDriveIds2: {},
    episodeDriveIds3: {},

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
      "Seni Yanımda Götürme Sebebim / Yeniden Doğan Muhteşem Kaplan", //1
	  "Kum Zamanını Aşmak", //2
	  "Gözetleme Kulesi’nin Bekçisi", //3
	  "Beyaz Gökyüzünün Asterizmi", //4
	  "Çubuk Sallayan",  //5
	  "Julius Juukulius", //6
	  "Marketin Kapısından Çıkıp Harikalarla Dolu Bir Dünyaya Adım Attım", //7
	  "Sen Kimsin?", //8
	  "Kalıntı", //9tt
	  "Öldürmek Alışkanlığa Dönüşür", //10
	  "Re: Sıfırdan Başka Bir Dünyada Hayata Başlamak",  //11
	  "Bundan Sonrası Üzerine", //12
	  "Ayağa Kalk", //13
	  "Beş Engel", //14
	  "Bölüm 15", //15
      "Bölüm 16", //16
	  "Bölüm 17", //17
	  "Bölüm 18", //18
	  "Bölüm 19" //19
    ],
    episodeDriveIds: [
      "1QX5Ci-qo7gAh71hvqPiyKb2VRjbKfQBc", //1
	  "1JfeHf0uqoDy8ixEs_XgGYHqLOw42Y02H", //2
	  "1DXE79eMB-VVJ0KSoVYSDBdWbSppRTeZc", //3
	  "1xPtLpdv7xfFFkZoDNtnN4tpqAwXmG3kh", //4
	  "1bS5pCgmGPlwi3Hqu2Jf3f2ghAkcXt4ci", //5
	  "1Z5YcR-8wBW2qec27TAxXfHySLRJwZ9Io", //6
	  "1Smh9gH3o3PNXbUqOXktf0kDkcbKc8OOF", //7
	  "19EtnNefYAbpOQ-D23xFvKchDn14AvYzZ", //8
	  "1RF6CQwSkMQG-tSkc4dRxjaGPQumUeCtW", //9
	  "1IxzeEfGR-xKPBHfrQktjnxaiopRUyuPa", //10
	  "1VFbcKH_7qF21Uzun-iaUg6qx5_1wnh8N", //11
	  "1PSQs9zPTRawjAiaXgaYqZC8Pdm8_Q50c", //12
	  "1zHySDUjP68x5hBPdN7zH_Y8u6yJCO8TC", //13
	  "17k9-1LrZzQ7d10cMMt4Nhw-wil3N8M_q", //14
	  "", //15
	  "", //16
	  "", //17
	  "", //18
	  "" //19
    ],
	episodeDriveIds2: {
	  14: "1k7omeMC2KPAgsS4t-A7DrtxKvn_-wg-K",
	},
    episodeDriveIds3: {
      //13: "1QX5Ci-qo7gAh71hvqPiyKb2VRj6bKfQBc",
    },
    episodeAnimecixUrls: [
      "https://tau-video.xyz/embed/69e8ceb7b067130deed1c092?vid=750688",
	  "https://tau-video.xyz/embed/69e8bf60140a125ba83716c3?vid=750685",
	  "https://tau-video.xyz/embed/69e8fec698be3e47efffd83a?vid=750724",
	  "https://tau-video.xyz/embed/69f251d0b067130deed1c0a9?vid=751376",
	  "https://tau-video.xyz/embed/69fc9193b067130deed1c0c8?vid=752258",
	  "https://tau-video.xyz/embed/6a04c6cb3729057a605fd310?vid=752950", 
	  "https://tau-video.xyz/embed/6a0df516a885b85179cd7eeb?vid=753720",
	  "https://tau-video.xyz/embed/6a17385f5ff7bff04ed66d5f?vid=754671",
	  "https://tau-video.xyz/embed/6a205b5748d0c9a296abef0b?vid=755401", 
	  "https://tau-video.xyz/embed/6a29b418224010c9ef3ebc1a?vid=755865",
	  "https://tau-video.xyz/embed/6a32e69ef2c0587e0fd8b8b7?vid=756201",
	  "https://tau-video.xyz/embed/6a7c9bc5f342e3f8d7f904dc?vid=760481",
	  "https://tau-video.xyz/embed/6a86a42f59edd8529b31236d", // 13
	  "https://tau-video.xyz/embed/6a8f15ea59edd8529b31239b?vid=761522", // 14
	  "",
	  "",
	  "",
	  "",
	  ""
    ],
    breakTimes: {},
    specials: [],
    finalEpisodeNumber: 19
  }
};

function getEpisodeDriveId2(cfg, index, number) {
  var values = cfg.episodeDriveIds2;
  if (!values) return "";

  // Dizi kullanılırsa episodeDriveIds ile aynı sıra; nesne kullanılırsa bölüm numarası anahtardır.
  var value = Array.isArray(values) ? values[index] : values[number];
  return String(value || "").trim();
}

function getEpisodeDriveId3(cfg, index, number) {
  var values = cfg.episodeDriveIds3;
  if (!values) return "";

  var value = Array.isArray(values) ? values[index] : values[number];
  return String(value || "").trim();
}

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
    var sId20 = String(s.driveId2 || "").trim();
    var sId30 = String(s.driveId3 || "").trim();
    var sAni = s.animecix ? String(s.animecix).trim() : null;
    list.push({
      number: (typeof s.number !== "undefined" ? s.number : 0),
      title: s.title,
      driveId: sId0 ? sId0 : null,
      driveId2: sId20 ? sId20 : null,
      driveId3: sId30 ? sId30 : null,
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
    var driveId2 = getEpisodeDriveId2(cfg, i, number);
    var driveId3 = getEpisodeDriveId3(cfg, i, number);
    var animecix = cfg.episodeAnimecixUrls ? String(cfg.episodeAnimecixUrls[i] || "").trim() : null;

    list.push({
      number: number,
      title: title,
      driveId: driveId ? driveId : null,
      driveId2: driveId2 ? driveId2 : null,
      driveId3: driveId3 ? driveId3 : null,
      animecix: animecix ? animecix : null,
      kind: "episode",
      isExtra: false,
      isFinal: number === cfg.finalEpisodeNumber
    });

    if (cfg.breakTimes && Object.prototype.hasOwnProperty.call(cfg.breakTimes, number)) {
      var bk = cfg.breakTimes[number];
      var bId = typeof bk === "string" ? bk.trim() : (bk ? String(bk.driveId || "").trim() : "");
      var bId2 = (typeof bk === "object" && bk.driveId2) ? String(bk.driveId2).trim() : "";
      var bId3 = (typeof bk === "object" && bk.driveId3) ? String(bk.driveId3).trim() : "";
      var bAni = (typeof bk === "object" && bk.animecix) ? String(bk.animecix).trim() : null;
      list.push({
        number: number,
        title: number + ". Mola Zamanı",
        driveId: bId ? bId : null,
        driveId2: bId2 ? bId2 : null,
        driveId3: bId3 ? bId3 : null,
        animecix: bAni ? bAni : null,
        kind: "break",
        isExtra: true,
        extraType: "break"
      });
    }

    var specialsHere = specialsByAfter[number] || [];
    specialsHere.forEach(function (s) {
      var sId = String(s.driveId || "").trim();
      var sId2 = String(s.driveId2 || "").trim();
      var sId3 = String(s.driveId3 || "").trim();
      var sAni = s.animecix ? String(s.animecix).trim() : null;
      list.push({
        number: (typeof s.number !== "undefined" ? s.number : number),
        title: s.title,
        driveId: sId ? sId : null,
        driveId2: sId2 ? sId2 : null,
        driveId3: sId3 ? sId3 : null,
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
