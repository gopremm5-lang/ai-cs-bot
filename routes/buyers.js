const express = require('express');
const router = express.Router();
const { loadJson, saveJson } = require("../lib/dataLoader");
const { requireOwner } = require('../lib/auth');

// Daftar APK valid (harus sama dengan dropdown form)
const VALID_APK = [
  "alight motion", "apple music", "bstation", "canva", "capcut", "catchplay", "chatgpt", "disney",
  "get contact", "hbo max", "iqiyi", "netflix", "picsart", "prime vidio", "remini",
  "vidio", "vision+", "viu", "wetv", "youtube"
];

// Helper normalisasi input APK/durasi
function normalisasi(text) {
  if (!text) return '';
  return text.trim().toLowerCase();
}

// ====== ROUTE SAVE ======
router.post('/save', requireOwner, async (req, res) => {
  const { user, apk, email, durasi, dateGiven, exp, invite } = req.body;

  // Validasi input kosong
  if (!user || !apk || !email || !durasi || !dateGiven || !exp || !invite) {
    req.session.toast = { type: "error", msg: "Semua kolom wajib diisi." };
    return res.redirect('/buyers');
  }

  // Normalisasi
  const apkNorm = normalisasi(apk);
  const durasiNorm = durasi.trim(); // durasi bisa bebas

  // Validasi APK
  if (!VALID_APK.includes(apkNorm)) {
    req.session.toast = { type: "error", msg: "Kategori APK tidak valid." };
    return res.redirect('/buyers');
  }

  // Validasi durasi
  if (!durasiNorm) {
    req.session.toast = { type: "error", msg: "Durasi tidak boleh kosong." };
    return res.redirect('/buyers');
  }

  // Load buyers.json
  let buyersData = await loadJson("buyers.json");
  if (!Array.isArray(buyersData)) buyersData = [];

  // Cari user
  let idx = buyersData.findIndex(b => b.user === user);

  // Data transaksi baru
  const transaksi = {
    apk: apkNorm,
    email,
    durasi: durasiNorm,
    dateGiven,
    exp,
    invite
  };

  if (idx === -1) {
    // User baru
    buyersData.push({
      user,
      statistik: {
        [apkNorm]: {
          total: 1,
          rincian: { [durasiNorm]: 1 }
        }
      },
      data: [ transaksi ]
    });
  } else {
    // User sudah ada
    buyersData[idx].data.push(transaksi);

    // Update statistik
    if (!buyersData[idx].statistik[apkNorm]) {
      buyersData[idx].statistik[apkNorm] = { total: 0, rincian: {} };
    }
    buyersData[idx].statistik[apkNorm].total += 1;
    if (!buyersData[idx].statistik[apkNorm].rincian[durasiNorm]) {
      buyersData[idx].statistik[apkNorm].rincian[durasiNorm] = 0;
    }
    buyersData[idx].statistik[apkNorm].rincian[durasiNorm] += 1;
  }

  // Simpan file
  await saveJson("buyers.json", buyersData);

  req.session.toast = { type: "success", msg: "Transaksi berhasil ditambahkan." };
  res.redirect('/buyers');
});

module.exports = router;
