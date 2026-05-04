const { cmd } = require('../lib/command');
const axios = require('axios');
const bot = require('../lib/bot');

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

        // Try multiple APIs
        let videoId = null;
        let title = q;
        let thumb = null;
        let duration = 'N/A';

        // API 1: Try scraping YouTube
        try {
            const searchRes = await axios.get(
                `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
                { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }
            );
            const match = searchRes.data.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
            if (match) videoId = match[1];
        } catch {}

        // API 2: ytapi.com
        if (!videoId) {
            try {
                const res = await axios.get(`https://ytapi.cc/api/?query=${encodeURIComponent(q)}&mode=search&result=1`);
                const data = res.data;
                if (data?.[0]?.id) videoId = data[0].id;
                if (data?.[0]?.title) title = data[0].title;
                if (data?.[0]?.thumbnail) thumb = data[0].thumbnail;
            } catch {}
        }

        // API 3: invidious
        if (!videoId) {
            try {
                const res = await axios.get(`https://invidious.snopyta.org/api/v1/search?q=${encodeURIComponent(q)}&type=video`);
                const data = res.data;
                if (data?.[0]?.videoId) {
                    videoId = data[0].videoId;
                    title = data[0].title || q;
                }
            } catch {}
        }

        if (!videoId) return reply("❌ Song not found! Try with YouTube URL:\n.ytv https://youtube.com/watch?v=xxx");

        const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
        if (!thumb) thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        reply("🎵 *Found! Downloading...*");

        // Download MP3 - try multiple download APIs
        let audioUrl = null;

        // API 1
        try {
            const dlRes = await axios.get(`https://api.dreaded.site/api/ytmp3?url=${encodeURIComponent(youtubeUrl)}`, { timeout: 15000 });
            const data = dlRes.data?.result;
            audioUrl = data?.audio || data?.url || data?.link;
            if (data?.title) title = data.title;
            if (data?.thumbnail) thumb = data.thumbnail;
        } catch {}

        // API 2
        if (!audioUrl) {
            try {
                const dlRes = await axios.get(`https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(youtubeUrl)}`, { timeout: 15000 });
                audioUrl = dlRes.data?.data?.dl_url || dlRes.data?.download;
            } catch {}
        }

        // API 3
        if (!audioUrl) {
            try {
                const dlRes = await axios.get(`https://api.agatz.xyz/api/ytmp3?url=${encodeURIComponent(youtubeUrl)}`, { timeout: 15000 });
                audioUrl = dlRes.data?.data?.url || dlRes.data?.url;
            } catch {}
        }

        if (!audioUrl) return reply("❌ Failed to download! Please try again later.");

        // Send thumbnail
        await conn.sendMessage(from, {
            image: { url: thumb },
            caption: `*🎵 NOW PLAYING*\n\n*Title:* ${title}\n*Duration:* ${duration}\n\n${bot.COPYRIGHT}`
        }, { quoted: mek });

        // Send audio
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
        if (!data?.video) return reply("❌ Failed to download!");
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
