const { cmd } = require('../lib/command');
const axios = require('axios');
const bot = require('../lib/bot');

// ============================================ Pair =============================================
cmd({
    pattern: "pair",
    alias: ["session"],
    react: "🔗",
    desc: "Get bot pairing site link",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        reply(`*🔗 SURYA-X PAIRING SITE*\n\n👉 pair.darksurya.indevs.in\n\n_Use this site to generate your session ID and connect your WhatsApp to the bot._\n\n${bot.COPYRIGHT}`);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ Lyrics =============================================
cmd({
    pattern: "lyrics",
    alias: ["lyric"],
    react: "🎵",
    desc: "Get song lyrics",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a song name!\nExample: .lyrics Shape of You");
        reply("🎵 *Searching lyrics...*");
        const res = await axios.get(`https://api.dreaded.site/api/lyrics?q=${encodeURIComponent(q)}`);
        const data = res.data?.result;
        if (!data) return reply("❌ Lyrics not found!");
        const lyrics = data.lyrics?.substring(0, 3000) || "Lyrics not available";
        await conn.sendMessage(from, {
            text: `*🎵 LYRICS*\n\n*Song:* ${data.title || q}\n*Artist:* ${data.artist || 'Unknown'}\n\n${lyrics}\n\n${bot.COPYRIGHT}`
        }, { quoted: mek });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ News =============================================
cmd({
    pattern: "news",
    react: "📰",
    desc: "Get latest news",
    category: "news",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        reply("📰 *Fetching news...*");
        const res = await axios.get(`https://api.dreaded.site/api/news?q=${encodeURIComponent(q || 'latest')}`);
        const articles = res.data?.result;
        if (!articles || !articles.length) return reply("❌ No news found!");
        let text = `*📰 LATEST NEWS*\n\n`;
        articles.slice(0, 5).forEach((a, i) => {
            text += `*${i + 1}.* ${a.title}\n📅 ${a.date || 'N/A'}\n🔗 ${a.url || ''}\n\n`;
        });
        text += bot.COPYRIGHT;
        reply(text);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ Movie =============================================
cmd({
    pattern: "movie",
    alias: ["film", "imdb"],
    react: "🎬",
    desc: "Search movie info",
    category: "movie",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a movie name!\nExample: .movie Avengers");
        reply("🎬 *Searching movie...*");
        const res = await axios.get(`https://www.omdbapi.com/?t=${encodeURIComponent(q)}&apikey=b6c5e897`);
        const data = res.data;
        if (data.Response === 'False') return reply("❌ Movie not found!");
        await conn.sendMessage(from, {
            image: { url: data.Poster !== 'N/A' ? data.Poster : bot.ALIVE_IMG },
            caption: `*🎬 MOVIE INFO*\n\n*Title:* ${data.Title}\n*Year:* ${data.Year}\n*Genre:* ${data.Genre}\n*Rating:* ⭐ ${data.imdbRating}/10\n*Director:* ${data.Director}\n*Actors:* ${data.Actors}\n*Plot:* ${data.Plot}\n*Language:* ${data.Language}\n*Runtime:* ${data.Runtime}\n\n${bot.COPYRIGHT}`
        }, { quoted: mek });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});
