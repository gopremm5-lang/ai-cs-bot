const fs = require('fs').promises;
const path = require('path');

// Loader TXT untuk file di /data
async function loadTxt(filename) {
  const filePath = path.join(__dirname, '../data', filename);
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch {
    return null;
  }
}

// Loader TXT untuk produk di /data/produk
async function loadProdukTxt(nama) {
  const filePath = path.join(__dirname, '../data/produk', `${nama}.txt`);
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch {
    return null;
  }
}

// Loader JSON universal (untuk data/*.json)
async function loadJson(filename) {
  const filePath = path.join(__dirname, '../data', filename);
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Gagal load file ${filename}:`, err.message);
    return null;
  }
}

// Save JSON universal
async function saveJson(filename, data) {
  const filePath = path.join(__dirname, '../data', filename);
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Gagal save file ${filename}:`, err.message);
    return false;
  }
}

// Loader Khusus
async function loadFAQ()         { return loadTxt('faq.txt'); }
async function loadSOP()         { return loadTxt('sop.txt'); }
async function loadBlacklist()   { return loadJson('blacklist.json'); }
async function loadPromo()       { return loadJson('promo.json'); }
async function loadLogClaim()    { return loadJson('log_claim.json'); }
async function loadFeedback()    { return loadJson('feedback.json'); }

// Export
module.exports = {
  loadTxt, loadJson, saveJson,
  loadFAQ, loadSOP, loadProdukTxt,
  loadBlacklist, loadPromo, loadLogClaim, loadFeedback
};
