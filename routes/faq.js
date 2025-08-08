const express = require('express');
const router = express.Router();
const { loadFAQ, saveJson } = require('./lib/dataLoader');

// Helper
function requireLogin(req, res, next) {
  if (req.session && req.session.isLoggedIn) return next();
  res.redirect("/login");
}

router.get("/", requireLogin, async (req, res) => {
  const faq = await loadFAQ() || [];
  const toast = req.session.toast || null;
  delete req.session.toast;
  res.render("faq", { faq, toast });
});
router.post('/add', requireLogin, async (req, res) => {
  let faqList = await loadFAQ() || [];
  const { keyword, response } = req.body;
  faqList.push({
    keyword: keyword.split(',').map(k => k.trim()),
    response: response.split('|').map(r => r.trim())
  });
  await saveJson('faq.json', faqList);
  req.session.toast = { type: "success", msg: "FAQ berhasil ditambahkan!" };
  res.redirect('/faq');
});
router.post('/delete', requireLogin, async (req, res) => {
  let faqList = await loadFAQ() || [];
  faqList.splice(req.body.index, 1);
  await saveJson('faq.json', faqList);
  req.session.toast = { type: "success", msg: "FAQ dihapus!" };
  res.redirect('/faq');
});

module.exports = router;
