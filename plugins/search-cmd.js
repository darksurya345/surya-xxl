const { cmd } = require('../lib/command');
const axios = require('axios');
const bot = require('../lib/bot');

// ============================================ Google Search =============================================
cmd({
    pattern: "google",
    alias: ["search", "gsearch"],
    react: "🔍",
    desc: "Search on Google",
    category: "search",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a search query!\nExample: .google What is WhatsApp");
        reply("🔍 *Searching...*");
        const res = await axios.get(`https://api.dreaded.site/api/google?q=${encodeURIComponent(q)}`);
        const results = res.data?.result;
        if (!results) return reply("❌ No results found!");
        let text = `*🔍 GOOGLE SEARCH RESULTS*\n\n*Query:* ${q}\n\n`;
        results.slice(0, 5).forEach((r, i) => {
            text += `*${i + 1}.* ${r.title}\n${r.link}\n${r.description || ''}\n\n`;
        });
        text += bot.COPYRIGHT;
        reply(text);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ YouTube Search =============================================
cmd({
    pattern: "ytsearch",
    alias: ["yts", "youtube"],
    react: "▶️",
    desc: "Search YouTube videos",
    category: "search",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a search query!\nExample: .yts Alan Walker Faded");
        reply("▶️ *Searching YouTube...*");
        const res = await axios.get(`https://api.dreaded.site/api/ytsearch?q=${encodeURIComponent(q)}`);
        const results = res.data?.result;
        if (!results) return reply("❌ No results found!");
        let text = `*▶️ YOUTUBE SEARCH*\n\n*Query:* ${q}\n\n`;
        results.slice(0, 5).forEach((r, i) => {
            text += `*${i + 1}.* ${r.title}\n🔗 ${r.url}\n⏱️ ${r.duration || 'N/A'}\n\n`;
        });
        text += bot.COPYRIGHT;
        reply(text);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ Wikipedia =============================================
cmd({
    pattern: "wiki",
    alias: ["wikipedia"],
    react: "📖",
    desc: "Search Wikipedia",
    category: "search",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a search query!\nExample: .wiki Albert Einstein");
        reply("📖 *Searching Wikipedia...*");
        const res = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`);
        const data = res.data;
        if (!data?.extract) return reply("❌ No results found!");
        await conn.sendMessage(from, {
            image: { url: data.thumbnail?.source || bot.ALIVE_IMG },
            caption: `*📖 WIKIPEDIA*\n\n*${data.title}*\n\n${data.extract.substring(0, 800)}...\n\n🔗 ${data.content_urls?.desktop?.page || ''}\n\n${bot.COPYRIGHT}`
        }, { quoted: mek });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ Dictionary =============================================
cmd({
    pattern: "dict",
    alias: ["define", "meaning"],
    react: "📚",
    desc: "Get word definition",
    category: "search",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a word!\nExample: .dict Eloquent");
        const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(q)}`);
        const data = res.data[0];
        if (!data) return reply("❌ Word not found!");
        const meaning = data.meanings[0];
        const def = meaning?.definitions[0];
        reply(`*📚 DICTIONARY*\n\n*Word:* ${data.word}\n*Type:* ${meaning?.partOfSpeech || 'N/A'}\n*Definition:* ${def?.definition || 'N/A'}\n*Example:* ${def?.example || 'N/A'}\n\n${bot.COPYRIGHT}`);
    } catch (e) {
        reply(`❌ Word not found!`);
    }
});
