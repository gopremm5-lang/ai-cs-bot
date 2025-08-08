const express = require('express');
const router = express.Router();
const { loadSOP, saveJson } = require('./lib/dataLoader');

router.get("/", async (req, res) => {
  const sop = await loadSOP() || [];
  const toast = req.session.toast || null;
  delete req.session.toast;
  res.render("sop", { sop, toast });
});

router.post("/add", async (req, res) => {
  let sopList = await loadSOP() || [];
  const { trigger, response } = req.body;
  sopList.push({
    trigger: trigger.split(',').map(k => k.trim()),
    response: response.split('|').map(r => r.trim())
  });
  await saveJson('sop.json', sopList);
  req.session.toast = { type: "success", msg: "SOP berhasil ditambahkan!" };
  res.redirect('/sop');
});

router.post("/delete", async (req, res) => {
  let sopList = await loadSOP() || [];
  sopList.splice(req.body.index, 1);
  await saveJson('sop.json', sopList);
  req.session.toast = { type: "success", msg: "SOP dihapus!" };
  res.redirect('/sop');
});

module.exports = router;
