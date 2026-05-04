const { cmd } = require('../lib/command');
const axios = require('axios');
const bot = require('../lib/bot');

// ============================================ Calculator =============================================
cmd({
    pattern: "calc",
    alias: ["calculate", "math"],
    react: "🧮",
    desc: "Calculate a math expression",
    category: "tools",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide an expression!\nExample: .calc 2 + 2 * 5");
        const result = eval(q.replace(/[^0-9+\-*/().%\s]/g, ''));
        reply(`*🧮 CALCULATOR*\n\n*Expression:* ${q}\n*Result:* ${result}\n\n${bot.COPYRIGHT}`);
    } catch (e) {
        reply("❌ Invalid math expression!");
    }
});

// ============================================ Weather =============================================
cmd({
    pattern: "weather",
    alias: ["climate"],
    react: "🌤️",
    desc: "Get weather info for a city",
    category: "tools",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a city!\nExample: .weather Mumbai");
        const res = await axios.get(`https://wttr.in/${encodeURIComponent(q)}?format=j1`);
        const data = res.data?.current_condition?.[0];
        const area = res.data?.nearest_area?.[0];
        if (!data) return reply("❌ City not found!");
        reply(`*🌤️ WEATHER*\n\n*City:* ${area?.areaName?.[0]?.value || q}\n*Temperature:* ${data.temp_C}°C / ${data.temp_F}°F\n*Feels Like:* ${data.FeelsLikeC}°C\n*Humidity:* ${data.humidity}%\n*Wind:* ${data.windspeedKmph} km/h\n*Condition:* ${data.weatherDesc?.[0]?.value}\n\n${bot.COPYRIGHT}`);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ Translate =============================================
cmd({
    pattern: "translate",
    alias: ["tr", "trans"],
    react: "🌐",
    desc: "Translate text",
    category: "tools",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("❌ Format: .translate [lang] [text]\nExample: .translate hi Hello World");
        const lang = args[0] || 'en';
        const text = args.slice(1).join(' ');
        if (!text) return reply("❌ Please provide text to translate!");
        const res = await axios.get(`https://api.dreaded.site/api/translate?text=${encodeURIComponent(text)}&lang=${lang}`);
        const result = res.data?.result || res.data?.translated;
        reply(`*🌐 TRANSLATE*\n\n*Original:* ${text}\n*Language:* ${lang}\n*Translated:* ${result}\n\n${bot.COPYRIGHT}`);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ QR Generate =============================================
cmd({
    pattern: "qr",
    alias: ["qrcode"],
    react: "📷",
    desc: "Generate QR code from text",
    category: "tools",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide text!\nExample: .qr https://github.com/darksurya345");
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(q)}`;
        await conn.sendMessage(from, {
            image: { url: qrUrl },
            caption: `*📷 QR CODE*\n\n*Text:* ${q}\n\n${bot.COPYRIGHT}`
        }, { quoted: mek });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ Short URL =============================================
cmd({
    pattern: "shorturl",
    alias: ["short", "tinyurl"],
    react: "🔗",
    desc: "Shorten a URL",
    category: "tools",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a URL!\nExample: .shorturl https://www.google.com");
        const res = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(q)}`);
        reply(`*🔗 SHORT URL*\n\n*Original:* ${q}\n*Shortened:* ${res.data}\n\n${bot.COPYRIGHT}`);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ View Once (VV) =============================================
cmd({
    pattern: "vv",
    alias: ["viewonce", "vo"],
    react: "👁️",
    desc: "View once image/video bypass",
    category: "tools",
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        if (!quoted) return reply("❌ Please reply to a view once message!");

        const type = quoted.type;
        if (type !== 'imageMessage' && type !== 'videoMessage' && type !== 'audioMessage') {
            return reply("❌ Please reply to a view once image or video!");
        }

        reply("👁️ *Opening view once...*");

        const media = await quoted.download();
        if (!media) return reply("❌ Failed to download media!");

        if (type === 'imageMessage') {
            await conn.sendMessage(from, {
                image: media,
                caption: `*👁️ VIEW ONCE IMAGE*\n\n${bot.COPYRIGHT}`
            }, { quoted: mek });
        } else if (type === 'videoMessage') {
            await conn.sendMessage(from, {
                video: media,
                caption: `*👁️ VIEW ONCE VIDEO*\n\n${bot.COPYRIGHT}`
            }, { quoted: mek });
        } else if (type === 'audioMessage') {
            await conn.sendMessage(from, {
                audio: media,
                mimetype: 'audio/mpeg',
                ptt: false
            }, { quoted: mek });
        }
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});
