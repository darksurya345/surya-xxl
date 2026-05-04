const { cmd } = require('../lib/command');
const axios = require('axios');
const bot = require('../lib/bot');
const config = require('../setting');

// ============================================ GPT =============================================
cmd({
    pattern: "gpt",
    alias: ["ai", "chatgpt"],
    react: "🤖",
    desc: "Chat with AI (GPT)",
    category: "ai",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a question!\nExample: .gpt What is AI?");
        reply("🤖 *Thinking...*");
        const res = await axios.get(`https://api.dreaded.site/api/chatgpt?text=${encodeURIComponent(q)}`);
        const answer = res.data?.result || res.data?.answer || res.data?.response || "No response";
        await conn.sendMessage(from, {
            text: `*🤖 AI RESPONSE*\n\n*Question:* ${q}\n\n*Answer:* ${answer}\n\n${bot.COPYRIGHT}`
        }, { quoted: mek });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ Gemini =============================================
cmd({
    pattern: "gemini",
    alias: ["bard"],
    react: "✨",
    desc: "Chat with Google Gemini AI",
    category: "ai",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a question!\nExample: .gemini Tell me about space");
        reply("✨ *Gemini is thinking...*");
        const res = await axios.get(`https://api.dreaded.site/api/gemini?text=${encodeURIComponent(q)}`);
        const answer = res.data?.result || res.data?.answer || "No response";
        await conn.sendMessage(from, {
            text: `*✨ GEMINI AI*\n\n*Question:* ${q}\n\n*Answer:* ${answer}\n\n${bot.COPYRIGHT}`
        }, { quoted: mek });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ Imagine (AI Image) =============================================
cmd({
    pattern: "imagine",
    alias: ["aiimg", "dalle"],
    react: "🎨",
    desc: "Generate AI image from text",
    category: "ai",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a prompt!\nExample: .imagine a beautiful sunset");
        reply("🎨 *Generating image...*");
        const res = await axios.get(`https://api.dreaded.site/api/imagine?prompt=${encodeURIComponent(q)}`);
        const imgUrl = res.data?.result || res.data?.url;
        if (!imgUrl) return reply("❌ Failed to generate image!");
        await conn.sendMessage(from, {
            image: { url: imgUrl },
            caption: `*🎨 AI GENERATED IMAGE*\n\n*Prompt:* ${q}\n\n${bot.COPYRIGHT}`
        }, { quoted: mek });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});
