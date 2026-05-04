const { cmd } = require('../lib/command');
const bot = require('../lib/bot');
const config = require('../setting');
const fs = require('fs');
const axios = require('axios');

// ============================================ Broadcast =============================================
cmd({
    pattern: "broadcast",
    alias: ["bc"],
    react: "📢",
    desc: "Broadcast message to all groups",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, q, isOwner, reply }) => {
    try {
        if (!isOwner) return reply("❌ Owner only command!");
        if (!q) return reply("❌ Please provide a message!\nExample: .broadcast Hello everyone!");
        const groups = await conn.groupFetchAllParticipating();
        const groupIds = Object.keys(groups);
        reply(`📢 *Broadcasting to ${groupIds.length} groups...*`);
        let sent = 0;
        for (const id of groupIds) {
            await conn.sendMessage(id, { text: `📢 *BROADCAST*\n\n${q}\n\n${bot.COPYRIGHT}` }).catch(() => {});
            sent++;
            await new Promise(r => setTimeout(r, 1000));
        }
        reply(`✅ Broadcast sent to ${sent} groups!`);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ Block =============================================
cmd({
    pattern: "block",
    react: "🚫",
    desc: "Block a user",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, quoted, isOwner, sender, reply }) => {
    try {
        if (!isOwner) return reply("❌ Owner only command!");
        const target = quoted?.sender || mek.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!target) return reply("❌ Reply to a message or mention a user!");
        await conn.updateBlockStatus(target, "block");
        reply(`✅ User blocked: @${target.split('@')[0]}`);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ Unblock =============================================
cmd({
    pattern: "unblock",
    react: "✅",
    desc: "Unblock a user",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, quoted, isOwner, reply }) => {
    try {
        if (!isOwner) return reply("❌ Owner only command!");
        const target = quoted?.sender || mek.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!target) return reply("❌ Reply to a message or mention a user!");
        await conn.updateBlockStatus(target, "unblock");
        reply(`✅ User unblocked: @${target.split('@')[0]}`);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ Restart =============================================
cmd({
    pattern: "restart",
    alias: ["reboot"],
    react: "🔄",
    desc: "Restart the bot",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    try {
        if (!isOwner) return reply("❌ Owner only command!");
        await reply("🔄 *Restarting bot...*");
        process.exit(0);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ Update Setting =============================================
cmd({
    pattern: "update",
    alias: ["setvar"],
    react: "⚙️",
    desc: "Update bot settings",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, q, isOwner, reply }) => {
    try {
        if (!isOwner) return reply("❌ Owner only command!");
        if (!q || !q.includes(':')) return reply("❌ Format: .update KEY:VALUE\nExample: .update MODE:public");
        const [key, value] = q.split(':');
        process.env[key.trim()] = value.trim();
        reply(`✅ Updated: *${key.trim()}* = *${value.trim()}*\nRestart bot to apply changes.`);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ Delete Message =============================================
cmd({
    pattern: "delete",
    alias: ["del", "d"],
    react: "🗑️",
    desc: "Delete a message",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, quoted, isOwner, reply }) => {
    try {
        if (!isOwner) return reply("❌ Owner only command!");
        if (!quoted) return reply("❌ Reply to a message to delete!");
        await conn.sendMessage(from, { delete: quoted.key });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// ============================================ Set Bio =============================================
cmd({
    pattern: "setbio",
    alias: ["setautobio"],
    react: "✏️",
    desc: "Set bot bio/status",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, q, isOwner, reply }) => {
    try {
        if (!isOwner) return reply("❌ Owner only command!");
        if (!q) return reply("❌ Please provide a bio!\nExample: .setbio SURYA-X is online ⚡");
        await conn.updateProfileStatus(q);
        reply(`✅ Bio updated: ${q}`);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});
