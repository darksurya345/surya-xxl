const { cmd } = require('../lib/command');
const axios = require('axios');
const bot = require('../lib/bot');

// ============================================ Joke =============================================
cmd({
    pattern: "joke",
    alias: ["jokes"],
    react: "😂",
    desc: "Get a random joke",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const res = await axios.get("https://official-joke-api.appspot.com/random_joke");
        const joke = res.data;
        reply(`*😂 JOKE*\n\n*Setup:* ${joke.setup}\n\n*Punchline:* ${joke.punchline}\n\n${bot.COPYRIGHT}`);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ Quote =============================================
cmd({
    pattern: "quote",
    alias: ["quotes", "motivation"],
    react: "💬",
    desc: "Get a random motivational quote",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const res = await axios.get("https://api.quotable.io/random");
        const data = res.data;
        reply(`*💬 QUOTE*\n\n_"${data.content}"_\n\n*— ${data.author}*\n\n${bot.COPYRIGHT}`);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ Meme =============================================
cmd({
    pattern: "meme",
    react: "😂",
    desc: "Get a random meme",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const res = await axios.get("https://meme-api.com/gimme");
        const data = res.data;
        await conn.sendMessage(from, {
            image: { url: data.url },
            caption: `*😂 MEME*\n\n*${data.title}*\n\n${bot.COPYRIGHT}`
        }, { quoted: mek });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ Fact =============================================
cmd({
    pattern: "fact",
    alias: ["facts"],
    react: "🧠",
    desc: "Get a random fun fact",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const res = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en");
        const data = res.data;
        reply(`*🧠 RANDOM FACT*\n\n${data.text}\n\n${bot.COPYRIGHT}`);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ Dare =============================================
cmd({
    pattern: "dare",
    react: "🎯",
    desc: "Get a random dare",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const dares = [
            "Send a voice message singing your favorite song!",
            "Change your profile picture to something funny for 1 hour!",
            "Send a selfie with a funny face!",
            "Write a poem about the person above you!",
            "Do 10 push-ups and send proof!",
            "Text your crush right now!",
            "Post a funny status for 30 minutes!",
            "Speak in rhymes for the next 5 messages!"
        ];
        const dare = dares[Math.floor(Math.random() * dares.length)];
        reply(`*🎯 DARE*\n\n${dare}\n\n${bot.COPYRIGHT}`);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ Truth =============================================
cmd({
    pattern: "truth",
    react: "💭",
    desc: "Get a random truth question",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const truths = [
            "What is your biggest fear?",
            "Have you ever lied to your best friend?",
            "What is your most embarrassing moment?",
            "Who was your first crush?",
            "What is the worst thing you've ever done?",
            "Have you ever cheated on a test?",
            "What is your biggest regret?",
            "What is a secret you've never told anyone?"
        ];
        const truth = truths[Math.floor(Math.random() * truths.length)];
        reply(`*💭 TRUTH*\n\n${truth}\n\n${bot.COPYRIGHT}`);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});
