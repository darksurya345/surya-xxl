const { cmd } = require('../lib/command');
const axios = require('axios');
const bot = require('../lib/bot');

// ============================================ YouTube Video =============================================
cmd({
    pattern: "ytv",
    alias: ["ytvideo", "yvideo"],
    react: "🎥",
    desc: "Download YouTube video by URL",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a YouTube URL!\nExample: .ytv https://youtube.com/watch?v=xxx");
        reply("⬇️ *Downloading video...*");
        const res = await axios.get(`https://api.dreaded.site/api/ytdl?url=${encodeURIComponent(q)}`);
        const data = res.data?.result;
        if (!data?.video) return reply("❌ Failed to download video!");
        await conn.sendMessage(from, {
            video: { url: data.video },
            caption: `*🎥 YouTube Video*\n\n*Title:* ${data.title || 'Unknown'}\n\n${bot.COPYRIGHT}`
        }, { quoted: mek });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ Song by Name =============================================
cmd({
    pattern: "song",
    alias: ["music", "play", "yta", "ytmp3"],
    react: "🎵",
    desc: "Download song by name",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a song name!\nExample: .song Tum Hi Ho Arijit Singh");

        reply("🔍 *Searching song...*");

        // Step 1: Search YouTube
        let videoId = null;
        try {
            const searchRes = await axios.get(`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}&sp=EgIQAQ%3D%3D`);
            const match = searchRes.data.match(/videoIds":"([a-zA-Z0-9_-]{11})/);
            if (match) videoId = match[1];
        } catch {}

        if (!videoId) {
            // fallback API search
            const fallback = await axios.get(`https://api.dreaded.site/api/ytsearch?q=${encodeURIComponent(q)}`);
            const results = fallback.data?.result;
            if (!results || !results.length) return reply("❌ Song not found!");
            const url = results[0]?.url || '';
            const idMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
            if (idMatch) videoId = idMatch[1];
        }

        if (!videoId) return reply("❌ Could not find the song!");

        const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
        reply("🎵 *Found! Downloading...*");

        // Step 2: Download MP3
        const dlRes = await axios.get(`https://api.dreaded.site/api/ytmp3?url=${encodeURIComponent(youtubeUrl)}`);
        const data = dlRes.data?.result;

        if (!data?.audio && !data?.url) return reply("❌ Failed to download song!");

        const audioUrl = data.audio || data.url;
        const title = data.title || q;
        const thumb = data.thumbnail || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        const duration = data.duration || 'N/A';

        // Step 3: Send thumbnail
        await conn.sendMessage(from, {
            image: { url: thumb },
            caption: `*🎵 NOW PLAYING*\n\n*Title:* ${title}\n*Duration:* ${duration}\n\n${bot.COPYRIGHT}`
        }, { quoted: mek });

        // Step 4: Send audio
        await conn.sendMessage(from, {
            audio: { url: audioUrl },
            mimetype: 'audio/mpeg',
            fileName: `${title}.mp3`,
            ptt: false
        }, { quoted: mek });

    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ TikTok =============================================
cmd({
    pattern: "tiktok",
    alias: ["tt", "tik"],
    react: "🎵",
    desc: "Download TikTok video",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a TikTok URL!\nExample: .tiktok https://vm.tiktok.com/xxx");
        reply("⬇️ *Downloading TikTok...*");
        const res = await axios.get(`https://api.dreaded.site/api/tiktok?url=${encodeURIComponent(q)}`);
        const data = res.data?.result;
        if (!data?.video) return reply("❌ Failed to download TikTok video!");
        await conn.sendMessage(from, {
            video: { url: data.video },
            caption: `*🎵 TikTok Video*\n\n${bot.COPYRIGHT}`
        }, { quoted: mek });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ Instagram =============================================
cmd({
    pattern: "instagram",
    alias: ["ig", "insta"],
    react: "📸",
    desc: "Download Instagram video/photo",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide an Instagram URL!\nExample: .instagram https://www.instagram.com/p/xxx");
        reply("⬇️ *Downloading from Instagram...*");
        const res = await axios.get(`https://api.dreaded.site/api/igdl?url=${encodeURIComponent(q)}`);
        const data = res.data?.result;
        if (!data) return reply("❌ Failed to download!");
        await conn.sendMessage(from, {
            video: { url: data.video || data.url },
            caption: `*📸 Instagram*\n\n${bot.COPYRIGHT}`
        }, { quoted: mek });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});
