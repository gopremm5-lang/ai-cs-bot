const express = require('express');
const router = express.Router();
const { loadLogClaim, saveJson } = require('../lib/dataLoader');

router.get("/", async (req, res) => {
  const claim = await loadLogClaim() || [];
  const toast = req.session.toast || null;
  delete req.session.toast;
  res.render("claim", { claim, toast });
});

router.post("/resolve", async (req, res) => {
  let claimList = await loadLogClaim() || [];
  const { index } = req.body;
  if (claimList[index]) claimList[index].status = "RESOLVED";
  await saveJson('log_claim.json', claimList);
  req.session.toast = { type: "success", msg: "Claim di-mark as resolved!" };
  res.redirect('/claim');
});

router.post("/delete", async (req, res) => {
  let claimList = await loadLogClaim() || [];
  claimList.splice(req.body.index, 1);
  await saveJson('log_claim.json', claimList);
  req.session.toast = { type: "success", msg: "Claim dihapus!" };
  res.redirect('/claim');
});

module.exports = router;
