const express = require('express');
const router = express.Router();
const { loadPromo, saveJson } = require('./lib/dataLoader');

router.get("/", async (req, res) => {
  const promo = await loadPromo() || [];
  const toast = req.session.toast || null;
  delete req.session.toast;
  res.render("promo", { promo, toast });
});

router.post("/add", async (req, res) => {
  let promoList = await loadPromo() || [];
  const { banner, active } = req.body;
  promoList.push({
    banner: banner.trim(),
    active: !!active
  });
  await saveJson('promo.json', promoList);
  req.session.toast = { type: "success", msg: "Promo berhasil ditambahkan!" };
  res.redirect('/promo');
});

router.post("/delete", async (req, res) => {
  let promoList = await loadPromo() || [];
  promoList.splice(req.body.index, 1);
  await saveJson('promo.json', promoList);
  req.session.toast = { type: "success", msg: "Promo dihapus!" };
  res.redirect('/promo');
});

module.exports = router;
