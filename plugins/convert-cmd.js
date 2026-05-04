const { cmd } = require('../lib/command');
const axios = require('axios');
const bot = require('../lib/bot');
const fs = require('fs');
const path = require('path');

// ============================================ Sticker =============================================
cmd({
    pattern: "sticker",
    alias: ["s", "stiker"],
    react: "🎨",
    desc: "Convert image/video to sticker",
    category: "convert",
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        const type = quoted?.type || mek.message?.imageMessage ? 'imageMessage' : mek.message?.videoMessage ? 'videoMessage' : null;
        if (!type) return reply("❌ Please reply to an image or video!");

        const media = await quoted?.download() || await conn.downloadMediaMessage(mek);
        if (!media) return reply("❌ Failed to download media!");

        await conn.sendMessage(from, {
            sticker: media
        }, { quoted: mek });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ To Image =============================================
cmd({
    pattern: "toimage",
    alias: ["toimg", "stickertoimg"],
    react: "🖼️",
    desc: "Convert sticker to image",
    category: "convert",
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        if (!quoted || quoted.type !== 'stickerMessage') return reply("❌ Please reply to a sticker!");
        const media = await quoted.download();
        await conn.sendMessage(from, {
            image: media,
            caption: `*🖼️ Sticker converted to image!*\n\n${bot.COPYRIGHT}`
        }, { quoted: mek });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ To MP3 =============================================
cmd({
    pattern: "tomp3",
    alias: ["toaudio", "mp3"],
    react: "🎵",
    desc: "Convert video to MP3",
    category: "convert",
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        if (!quoted || quoted.type !== 'videoMessage') return reply("❌ Please reply to a video!");
        const media = await quoted.download();
        await conn.sendMessage(from, {
            audio: media,
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: mek });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ To Voice Note =============================================
cmd({
    pattern: "tovoice",
    alias: ["toptt", "tovn"],
    react: "🎙️",
    desc: "Convert audio to voice note",
    category: "convert",
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        if (!quoted || quoted.type !== 'audioMessage') return reply("❌ Please reply to an audio!");
        const media = await quoted.download();
        await conn.sendMessage(from, {
            audio: media,
            mimetype: 'audio/mpeg',
            ptt: true
        }, { quoted: mek });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});
