/*
⚠️ PERINGATAN:
Script ini **TIDAK BOLEH DIPERJUALBELIKAN** dalam bentuk apa pun!

╔══════════════════════════════════════════════╗
║                🛠️ INFORMASI SCRIPT           ║
╠══════════════════════════════════════════════╣
║ 📦 Version   : 1.0.5
║ 👨‍💻 Developer  : Azhari Creative              ║
║ 🌐 Website    : https://autoresbot.com       ║
║ 💻 GitHub     : github.com/autoresbot/resbot-ai
╚══════════════════════════════════════════════╝

📌 Mulai 11 April 2025,
Script **Autoresbot** resmi menjadi **Open Source** dan dapat digunakan secara gratis:
🔗 https://autoresbot.com
*/

require('dotenv').config();
const moment = require("moment-timezone");

const config = {
    AutoUpdate          : process.env.AUTO_UPDATE || 'off', // on atau off
    API_KEY             : process.env.API_KEY || '',
    GEMINI_API_KEY      : process.env.GEMINI_API_KEY || '',
    phone_number_bot    : process.env.PHONE_NUMBER_BOT || '', // Nomor BOT
    type_connection     : process.env.TYPE_CONNECTION || 'qr', // qr atau pairing
    bot_destination     : process.env.BOT_DESTINATION || 'private', // group , private, both
    name_bot            : process.env.NAME_BOT || 'Resbot Ai',
    owner_name          : process.env.OWNER_NAME || 'Bold',
    owner_number        : process.env.OWNER_NUMBER || '',
    owner_website       : process.env.OWNER_WEBSITE || '',
    version             : global.version,
    rate_limit          : parseInt(process.env.RATE_LIMIT || '300', 10), // 3 detik
    total_limit         : parseInt(process.env.TOTAL_LIMIT || '100', 10), // limit perhari -  user biasa || kalo premium unlimited
    sticker_packname    : process.env.STICKER_PACKNAME || 'Bold',
    sticker_author      : process.env.STICKER_AUTHOR || `Date: ${moment.tz('Asia/Jakarta').format('DD/MM/YY')}\\Owner 0895-1282-2345`,
    notification        : {
        limit           : process.env.NOTIFICATION_LIMIT || 'Hai kak, Limit harian anda sudah habis silakan tunggu besok ya atau berlangganan premium untuk menikmati fitur tanpa limit',
        reset           : process.env.NOTIFICATION_RESET || 'Dialog berhasil dihapus. Semua percakapan kita telah di-reset dan siap memulai dari awal!',
        ig              : process.env.NOTIFICATION_IG || 'kirimkan link instagramnya ya kak',
        fb              : process.env.NOTIFICATION_FB || 'kirimkan link facebooknya ya kak',
        tt              : process.env.NOTIFICATION_TT || 'kirimkan link tiktoknya ya kak',
        waiting         : process.env.NOTIFICATION_WAITING || 'Hai kak mohon tunggu beberapa saat lagi ya, proses sebelumnya belum selesai',
        qc_help         : process.env.NOTIFICATION_QC_HELP || 'Tulis textnya ya kak, misal *qc halo*',
        only_owner      : process.env.NOTIFICATION_ONLY_OWNER || '_❗Perintah Ini Hanya Bisa Digunakan Oleh Owner !_'
    },
    success             : {
        hd : process.env.SUCCESS_HD || 'Ini kak hasil gambarnya, Maaf kalau masih blur',
    },
    error               : {
       FILE_TOO_LARGE : process.env.ERROR_FILE_TOO_LARGE || 'File terlalu besar. Maksimal ukuran file adalah 99 Mb',
       THROW          : process.env.ERROR_THROW || '_Ada masalah saat terhubung ke server_',
       PLAY_ERROR     : process.env.ERROR_PLAY_ERROR || 'Yahh Gagal, Sepertinya ada masalah saat mendowload audio',
       HD_ERROR       : process.env.ERROR_HD_ERROR || 'Yahh Gagal, Mohon maaf kak, tidak bisa hd in gambar',
       IMAGE_ERROR    : process.env.ERROR_IMAGE_ERROR || 'Yahh Gagal, Mohon maaf kak, tidak bisa carikan kamu gambar',
       qc             : process.env.ERROR_QC || 'Yah gagal bikin qc nya kak'
    }
};

module.exports = config;
