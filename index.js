const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  getContentType,
  fetchLatestBaileysVersion,
  downloadContentFromMessage
} = require('@whiskeysockets/baileys');
const fs = require('fs');
const P = require('pino');
const config = require('./setting');
const axios = require('axios');
const path = require('path');

// Owner numbers
const ownerNumber = ["917797099719"];

// ==================== LOCAL FILES LOADER ====================
function loadLocalFiles() {
  console.log("ðŸ“‚ Loading local lib and plugins...");
  
  if (!fs.existsSync('./lib')) {
    console.log("âŒ lib folder not found! Creating empty lib folder...");
    fs.mkdirSync('./lib', { recursive: true });
  } else {
    console.log("âœ… lib folder found");
    const libFiles = fs.readdirSync('./lib').filter(f => f.endsWith('.js'));
    console.log(`ðŸ“š Found ${libFiles.length} lib files`);
  }
  
  if (!fs.existsSync('./plugins')) {
    console.log("âŒ plugins folder not found! Creating empty plugins folder...");
    fs.mkdirSync('./plugins', { recursive: true });
  } else {
    console.log("âœ… plugins folder found");
    const pluginFiles = fs.readdirSync('./plugins').filter(f => f.endsWith('.js'));
    console.log(`ðŸ”Œ Found ${pluginFiles.length} plugin files`);
  }
  
  // Check for surya.html
  if (fs.existsSync('./lib/surya.html')) {
    console.log("âœ… surya.html found in lib folder");
  } else {
    console.log("âš ï¸ surya.html not found in lib folder");
  }
  
  console.log("âœ… Local files loaded successfully!");
}

loadLocalFiles();

// Message store for anti-delete
const messageStore = new Map();

// Group settings store (welcome on/off, welcome message, goodbye on/off, goodbye message)
const groupSettings = new Map();

// Default welcome message
const DEFAULT_WELCOME = "â•­â”€â”€â *WELCOME* ââ”€â”€â•®\nâ”‚\nâ”œâ”€â *User:* @user\nâ”œâ”€â *Group:* @group\nâ”œâ”€â *Members:* @count\nâ”‚\nâ•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â\n\n> Enjoy your stay! ðŸŽ‰";

// Default goodbye message
const DEFAULT_GOODBYE = "â•­â”€â”€â *GOODBYE* ââ”€â”€â•®\nâ”‚\nâ”œâ”€â *User:* @user\nâ”œâ”€â *Group:* @group\nâ”œâ”€â *Left the group*\nâ”‚\nâ•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â\n\n> We'll miss you! ðŸ‘‹";

// Session handling
const AUTH_DIR = path.join(__dirname, 'auth_info_baileys');
const CREDS = path.join(AUTH_DIR, 'creds.json');

if (!fs.existsSync(CREDS)) {
  if (!config.SESSION_ID) {
    console.log("âŒ SESSION_ID missing");
    process.exit(1);
  }
  
  let session = config.SESSION_ID.trim();
  if (!session.includes("SURYA-X~")) {
    console.log("âŒ Invalid SURYA-X session format");
    process.exit(1);
  }
  
  const decoded = Buffer.from(session.substring(7), 'base64').toString('utf8');
  JSON.parse(decoded);
  
  fs.mkdirSync(AUTH_DIR, { recursive: true });
  fs.writeFileSync(CREDS, decoded, { encoding: 'utf8' });
  console.log("â™»ï¸ SURYA-X session restored successfully");
}

// Load group settings from file if exists
const SETTINGS_FILE = path.join(__dirname, 'group_settings.json');
if (fs.existsSync(SETTINGS_FILE)) {
  try {
    const savedSettings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
    for (const [groupId, settings] of Object.entries(savedSettings)) {
      groupSettings.set(groupId, settings);
    }
    console.log("âœ… Group settings loaded from file");
  } catch (e) {
    console.log("âš ï¸ Could not load group settings");
  }
}

// Save group settings to file
function saveGroupSettings() {
  try {
    const settingsObj = {};
    for (const [groupId, settings] of groupSettings.entries()) {
      settingsObj[groupId] = settings;
    }
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settingsObj, null, 2), 'utf8');
  } catch (e) {
    console.error("âŒ Could not save group settings:", e);
  }
}

// Express server for web
const express = require('express');
const app = express();
const port = process.env.PORT || 9090;

// Serve HTML page
app.get('/', (req, res) => {
  const htmlPath = path.join(__dirname, 'lib', 'arslan.html');
  if (fs.existsSync(htmlPath)) {
    res.sendFile(htmlPath);
  } else {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>SURYA-X Bot</title>
        <style>
          body { font-family: Arial; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); text-align: center; padding: 50px; color: white; }
          .container { background: rgba(255,255,255,0.1); padding: 30px; border-radius: 10px; }
          h1 { font-size: 3em; }
          .status { color: #4CAF50; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>ðŸ¤– SURYA-X</h1>
          <p class="status">âœ… BOT IS CONNECTED</p>
          <p>Type .menu in WhatsApp to see commands</p>
          <p>Owner: ${config.OWNER_NAME || 'SURYA'}</p>
        </div>
      </body>
      </html>
    `);
  }
});

app.get('/lib/arslan.html', (req, res) => {
  res.redirect('/');
});

app.listen(port, '0.0.0.0', () => console.log(`ðŸŒ Web server running on port ${port}`));

// Function to get user profile picture
async function getProfilePicture(sock, jid) {
  try {
    const ppUrl = await sock.profilePictureUrl(jid, 'image');
    return ppUrl;
  } catch {
    return 'https://files.catbox.moe/jbrn0i.jpg'; // Default image
  }
}

// Main bot function
async function connectToWA() {
  console.log("âœ… Using local lib and plugins only");
  
  const prefix = config.PREFIX || '.';
  console.log(`ðŸ¤– SURYA-X Connecting with prefix: "${prefix}"`);
  
  const { state: authState, saveCreds: saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/');
  
  // Load required modules from lib
  let functions, sms, botConfig;
  
  try {
    functions = require('./lib/functions');
    sms = require('./lib/msg').sms;
    botConfig = require('./lib/bot');
    console.log("âœ… Lib files loaded successfully");
  } catch (err) {
    console.log("âŒ Error loading lib files:", err);
    process.exit(1);
  }
  
  const { getBuffer, getGroupAdmins, fetchJson, runtime, sleep, isUrl, getRandom } = functions;
  
  const { version } = await fetchLatestBaileysVersion();
  
  const sock = makeWASocket({
    logger: P({ level: 'silent' }),
    printQRInTerminal: false,
    browser: ['Ubuntu', 'Chrome', '20.0.04'],
    syncFullHistory: true,
    auth: authState,
    version: version
  });

  // Connection update handler
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    
    if (connection === 'close') {
      const statusCode = lastDisconnect.error?.output?.statusCode;
      
      if (statusCode === DisconnectReason.loggedOut) {
        console.log("âŒ Device Logged Out, please delete auth_info_baileys and rescan.");
        process.exit();
      } else if (statusCode === DisconnectReason.connectionReplaced) {
        console.log("âŒ Connection replaced. Another session is active.");
        process.exit();
      } else if (lastDisconnect.error?.message?.includes("Bad MAC")) {
        console.log("âš ï¸ Bad MAC error. Deleting session...");
        fs.rmSync(__dirname + '/auth_info_baileys', { recursive: true, force: true });
        connectToWA();
      } else {
        console.log("ðŸ”„ Connection closed, reconnecting...");
        connectToWA();
      }
    } else if (connection === 'open') {
      console.log("âœ… SURYA-X Bot connected to WhatsApp!");
      
      // Load plugins
      console.log("ðŸ”Œ Loading plugins...");
      const pluginFiles = fs.readdirSync('./plugins/').filter(f => f.endsWith('.js'));
      let loadedCount = 0;
      
      for (const file of pluginFiles) {
        try {
          require('./plugins/' + file);
          loadedCount++;
          console.log(`  âœ… Loaded: ${file}`);
        } catch (err) {
          console.log(`  âŒ Failed to load ${file}: ${err.message}`);
        }
      }
      
      console.log(`âœ… Plugins loaded: ${loadedCount}/${pluginFiles.length}`);
      
      // Send connection message with image
      const aliveMsg = `*╭──────────────●●►*\n> *SURYA-X CONNECTED SUCCESSFULLY*\n\n> *Type ${prefix}menu to view commands*  \n\n*╭⊱✫ SURYA-X ✫⊱╮*\n*│✫📂 Bot Name: ${botConfig.BOT_NAME}*\n*│✫🛡️ Owner: ${config.OWNER_NAME}*\n*│✫♻️ Prefix: ${prefix}*\n*│✫🌍 Mode: ${config.MODE}*\n*│✫⏰ Uptime: ${runtime(process.uptime())}*\n*╰──────────────●●►*\n\n> Enjoy Using SURYA-X`;
      
      // Image URL for connection message
      const imageUrl = 'https://files.catbox.moe/jbrn0i.jpg';
      
      try {
        // Send only to bot's own number (Myself)
        const botJid = sock.user.id.split(":")[0] + "@s.whatsapp.net";
        sock.sendMessage(botJid, {
          image: { url: imageUrl },
          caption: aliveMsg
        }).catch(() => {
          sock.sendMessage(botJid, { text: aliveMsg });
        });
        
        console.log("âœ… Connection message sent to bot's own number");
      } catch (err) {
        console.log("âš ï¸ Could not send connection message with image, sending text only");
        const botJid = sock.user.id.split(":")[0] + "@s.whatsapp.net";
        sock.sendMessage(botJid, { text: aliveMsg });
      }
    }
  });

  // Anti-call feature
  const callMsg = `âš ï¸ *ANTI-CALL IS ACTIVE* âš ï¸\n\nDear User,\n\nYou have attempted to call the bot. To ensure uninterrupted service, please refrain from calling.\n\nThank you for your understanding.\n\n${botConfig.COPYRIGHT || 'SURYA-X'}`;
  
  sock.ev.on('call', async (calls) => {
    if (config.ANTI_CALL === 'true') {
      for (const call of calls) {
        if (call.status === 'offer') {
          await sock.sendMessage(call.from, { text: callMsg });
          await sock.rejectCall(call.id, call.from);
          console.log(`ðŸ“ž Rejected call from ${call.from}`);
        }
      }
    }
  });

  // Emoji list for auto react
  const emojiList = ['ðŸ˜Š', 'ðŸ‘', 'ðŸ˜‚', 'â¤ï¸', 'ðŸ”¥', 'ðŸ¥°', 'ðŸ‘Œ', 'ðŸ’¯', 'ðŸ¤£', 'ðŸ˜Ž', 'âœ¨', 'â­', 'ðŸŒŸ', 'ðŸ’«', 'âš¡', 'ðŸ’¥', 'ðŸ™', 'ðŸŽ‰', 'ðŸ‘', 'ðŸ’¯', 'ðŸ‘‘', 'ðŸ¤–', 'ðŸ«¡', 'âœ…', 'ðŸ”°', 'ðŸ’š', 'ðŸ’™', 'ðŸ’œ', 'ðŸ–¤', 'ðŸ¤', 'ðŸ’›', 'ðŸ§¡', 'ðŸ’–', 'ðŸ’', 'ðŸ’ž'];
  
  // Creds update
  sock.ev.on('creds.update', saveCreds);
  
  // ==================== GROUP PARTICIPANTS UPDATE (WELCOME/GOODBYE) ====================
  sock.ev.on('group-participants.update', async (update) => {
    try {
      const { id, participants, action } = update;
      
      if (!id || !participants || !action) return;
      
      const groupMetadata = await sock.groupMetadata(id).catch(() => null);
      if (!groupMetadata) return;
      
      const groupName = groupMetadata.subject || 'Group';
      const groupDesc = groupMetadata.desc || 'No description';
      const memberCount = groupMetadata.participants.length;
      
      // Get group settings
      const settings = groupSettings.get(id) || {
        welcome: true,
        goodbye: true,
        welcomeMsg: DEFAULT_WELCOME,
        goodbyeMsg: DEFAULT_GOODBYE,
        antilink: true,
        antibad: true
      };
      
      for (const participant of participants) {
        const participantJid = participant.split('@')[0];
        const pushName = participant.split('@')[0];
        
        if (action === 'add') {
          // WELCOME MESSAGE - Only if enabled
          if (settings.welcome) {
            try {
              // Get user's profile picture
              const ppUrl = await getProfilePicture(sock, participant);
              
              // Format welcome message with variables
              let welcomeText = settings.welcomeMsg || DEFAULT_WELCOME;
              welcomeText = welcomeText
                .replace(/@user/g, `@${participantJid}`)
                .replace(/@group/g, groupName)
                .replace(/@count/g, memberCount)
                .replace(/@desc/g, groupDesc.substring(0, 100));
              
              // Send welcome message with user's DP
              await sock.sendMessage(id, {
                image: { url: ppUrl },
                caption: welcomeText,
                mentions: [participant]
              }).catch(async () => {
                // Fallback to text if image fails
                await sock.sendMessage(id, {
                  text: welcomeText,
                  mentions: [participant]
                });
              });
              
              console.log(`ðŸ‘‹ Welcome message sent to ${participantJid} in ${groupName}`);
            } catch (error) {
              console.error("âŒ Welcome message error:", error);
            }
          }
          
        } else if (action === 'remove') {
          // GOODBYE MESSAGE - Only if enabled
          if (settings.goodbye) {
            try {
              // Get user's profile picture
              const ppUrl = await getProfilePicture(sock, participant).catch(() => 'https://n.uguu.se/BlGoHUJU.jpg');
              
              // Format goodbye message with variables
              let goodbyeText = settings.goodbyeMsg || DEFAULT_GOODBYE;
              goodbyeText = goodbyeText
                .replace(/@user/g, `@${participantJid}`)
                .replace(/@group/g, groupName)
                .replace(/@count/g, memberCount);
              
              // Send goodbye message with user's DP
              await sock.sendMessage(id, {
                image: { url: ppUrl },
                caption: goodbyeText,
                mentions: [participant]
              }).catch(async () => {
                // Fallback to text if image fails
                await sock.sendMessage(id, {
                  text: goodbyeText,
                  mentions: [participant]
                });
              });
              
              console.log(`ðŸ‘‹ Goodbye message sent for ${participantJid} in ${groupName}`);
            } catch (error) {
              console.error("âŒ Goodbye message error:", error);
            }
          }
        }
      }
    } catch (error) {
      console.error("âŒ Welcome/Goodbye error:", error);
    }
  });

  // Main message handler
  sock.ev.on('messages.upsert', async (messageUpdate) => {
    try {
      const msg = messageUpdate.messages[0];
      
      if (!msg || !msg.message) {
        return;
      }
      
      // ============ STATUS HANDLING (FIXED) ============
      if (msg.key && msg.key.remoteJid === 'status@broadcast') {
        
        // AUTO STATUS SEEN - Yeh status ko read karega
        if (config.AUTO_STATUS_MSG === 'true') {
          try {
            await sock.readMessages([msg.key]);
            console.log("ðŸ“– Status seen");
            
            // Status par react bhi karega
            const botJid = await jidNormalizedUser(sock.user.id);
            await sock.sendMessage(msg.key.remoteJid, {
              react: {
                key: msg.key,
                text: 'ðŸ’š'
              }
            }, {
              statusJidList: [msg.key.participant, botJid]
            }).catch(() => {});
            
          } catch (error) {
            console.error("âŒ Failed to mark status as read:", error);
          }
        }
        
        // AUTO STATUS REPLY - Status uploader ko reply
        if (config.AUTO_STATUS_REPLY === 'true' && msg.key.participant) {
          try {
            const statusReplyMsg = botConfig.STATUS_MSG || 'Thanks for status! â¤ï¸';
            await sock.sendMessage(msg.key.participant, {
              text: statusReplyMsg
            }).catch(() => {});
          } catch (error) {}
        }
        
        return; // Status messages ko further process nahi karna
      }
      
      // Get message type and content
      const msgType = getContentType(msg.message) || 'conversation';
      
      // Get message text
      let body = '';
      if (msgType === 'conversation') {
        body = msg.message.conversation || '';
      } else if (msgType === 'extendedTextMessage') {
        body = msg.message.extendedTextMessage?.text || '';
      } else if (msgType === 'imageMessage') {
        body = msg.message.imageMessage?.caption || '';
      } else if (msgType === 'videoMessage') {
        body = msg.message.videoMessage?.caption || '';
      }
      
      // Create m object
      const m = sms(sock, msg);
      
      // Check if it's a command
      const isCmd = body.startsWith(prefix);
      const command = isCmd ? body.slice(prefix.length).split(' ')[0].toLowerCase().trim() : '';
      const args = body.split(' ').slice(1);
      const q = args.join(' ');
      const from = msg.key.remoteJid;
      const sender = msg.key.participant || msg.key.remoteJid;
      const senderNumber = sender.split('@')[0];
      const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
      const isGroup = from.endsWith('@g.us');
      const isOwner = ownerNumber.includes(senderNumber);
      const pushName = msg.pushName || senderNumber;
      const botNumberPure = sock.user.id.split(':')[0];
      const isMe = senderNumber === botNumberPure;
      
      // Get mentions
      let mentions = [];
      if (msgType === 'extendedTextMessage' && msg.message.extendedTextMessage?.contextInfo?.mentionedJid) {
        mentions = msg.message.extendedTextMessage.contextInfo.mentionedJid;
      }
      
      // Group metadata
      let groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins;
      if (isGroup) {
        groupMetadata = await sock.groupMetadata(from).catch(() => ({}));
        groupName = groupMetadata?.subject || '';
        participants = groupMetadata?.participants || [];
        groupAdmins = participants.filter(p => p.admin).map(p => p.id);
        isBotAdmins = groupAdmins.includes(botNumber);
        isAdmins = groupAdmins.includes(sender);
      }
      
      // Get group settings
      let groupSetting = groupSettings.get(from) || {
        welcome: true,
        goodbye: true,
        welcomeMsg: DEFAULT_WELCOME,
        goodbyeMsg: DEFAULT_GOODBYE,
        antilink: true,
        antibad: true
      };
      
      // Reply function
      const reply = (text) => {
        sock.sendMessage(from, { text }, { quoted: msg });
      };
      
      // Store message for anti-delete
      if (!msg.key.fromMe && msg.key.remoteJid !== 'status@broadcast') {
        messageStore.set(msg.key.id, msg);
        if (messageStore.size > 500) {
          const firstKey = messageStore.keys().next().value;
          messageStore.delete(firstKey);
        }
      }
      
      // Log command
      if (isCmd) {
        console.log(`ðŸ” Command: ${command} from ${pushName} (${senderNumber})`);
      }
      
      // ============ MODE HANDLING ============
      if (config.MODE === 'private' && isCmd && !isOwner) {
        return;
      }
      
      // ============ AUTO REACT ============
      if (config.AUTO_REACT === 'true' && !isCmd && !msg.key.fromMe && !isGroup) {
        const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
        await m.react(randomEmoji).catch(() => {});
      }
      
      // ============ PRESENCE UPDATES ============
      if (config.AUTO_TYPING === 'true' && !msg.key.fromMe) {
        await sock.sendPresenceUpdate('composing', from).catch(() => {});
      }
      
      if (config.ALWAYS_ONLINE === 'true') {
        await sock.sendPresenceUpdate('available').catch(() => {});
      }
      
      if (config.READ_MESSAGE === 'true' && !msg.key.fromMe) {
        await sock.readMessages([msg.key]).catch(() => {});
      }
      
      // ============ WELCOME/GOODBYE COMMANDS ============
      if (isCmd && isGroup) {
        
        // WELCOME ON/OFF
        if (command === 'welcome') {
          if (!isAdmins && !isOwner) {
            return reply('âŒ Only admins can use this command!');
          }
          
          const option = args[0]?.toLowerCase();
          
          if (option === 'on') {
            groupSetting.welcome = true;
            groupSettings.set(from, groupSetting);
            saveGroupSettings();
            reply('âœ… Welcome messages have been turned ON for this group!');
          } else if (option === 'off') {
            groupSetting.welcome = false;
            groupSettings.set(from, groupSetting);
            saveGroupSettings();
            reply('âœ… Welcome messages have been turned OFF for this group!');
          } else {
            reply(`Welcome messages are currently: ${groupSetting.welcome ? 'ON' : 'OFF'}\n\nUse:\n.welcome on - Turn ON\n.welcome off - Turn OFF`);
          }
        }
        
        // GOODBYE ON/OFF
        else if (command === 'goodbye') {
          if (!isAdmins && !isOwner) {
            return reply('âŒ Only admins can use this command!');
          }
          
          const option = args[0]?.toLowerCase();
          
          if (option === 'on') {
            groupSetting.goodbye = true;
            groupSettings.set(from, groupSetting);
            saveGroupSettings();
            reply('âœ… Goodbye messages have been turned ON for this group!');
          } else if (option === 'off') {
            groupSetting.goodbye = false;
            groupSettings.set(from, groupSetting);
            saveGroupSettings();
            reply('âœ… Goodbye messages have been turned OFF for this group!');
          } else {
            reply(`Goodbye messages are currently: ${groupSetting.goodbye ? 'ON' : 'OFF'}\n\nUse:\n.goodbye on - Turn ON\n.goodbye off - Turn OFF`);
          }
        }
        
        // SET WELCOME MESSAGE
        else if (command === 'setwelcome') {
          if (!isAdmins && !isOwner) {
            return reply('âŒ Only admins can use this command!');
          }
          
          if (!q) {
            return reply(`âŒ Please provide a welcome message!\n\nAvailable variables:\n@user - Mention user\n@group - Group name\n@count - Member count\n@desc - Group description\n\nExample:\n.setwelcome Hello @user! Welcome to @group`);
          }
          
          groupSetting.welcomeMsg = q;
          groupSettings.set(from, groupSetting);
          saveGroupSettings();
          reply('âœ… Welcome message has been updated!\n\nPreview:\n' + q.replace(/@user/g, '@user').replace(/@group/g, groupName).replace(/@count/g, participants.length));
        }
        
        // SET GOODBYE MESSAGE
        else if (command === 'setgoodbye') {
          if (!isAdmins && !isOwner) {
            return reply('âŒ Only admins can use this command!');
          }
          
          if (!q) {
            return reply(`âŒ Please provide a goodbye message!\n\nAvailable variables:\n@user - Mention user\n@group - Group name\n@count - Member count\n\nExample:\n.setgoodbye Goodbye @user! We'll miss you in @group`);
          }
          
          groupSetting.goodbyeMsg = q;
          groupSettings.set(from, groupSetting);
          saveGroupSettings();
          reply('âœ… Goodbye message has been updated!\n\nPreview:\n' + q.replace(/@user/g, '@user').replace(/@group/g, groupName).replace(/@count/g, participants.length));
        }
        
        // RESET WELCOME
        else if (command === 'resetwelcome') {
          if (!isAdmins && !isOwner) {
            return reply('âŒ Only admins can use this command!');
          }
          
          groupSetting.welcomeMsg = DEFAULT_WELCOME;
          groupSettings.set(from, groupSetting);
          saveGroupSettings();
          reply('âœ… Welcome message has been reset to default!');
        }
        
        // RESET GOODBYE
        else if (command === 'resetgoodbye') {
          if (!isAdmins && !isOwner) {
            return reply('âŒ Only admins can use this command!');
          }
          
          groupSetting.goodbyeMsg = DEFAULT_GOODBYE;
          groupSettings.set(from, groupSetting);
          saveGroupSettings();
          reply('âœ… Goodbye message has been reset to default!');
        }
        
        // SHOW WELCOME SETTINGS
        else if (command === 'welcomesettings' || command === 'wsettings') {
          if (!isAdmins && !isOwner) {
            return reply('âŒ Only admins can use this command!');
          }
          
          const settingsMsg = `â•­â”€â”€â *WELCOME SETTINGS* ââ”€â”€â•®
â”‚
â”œâ”€â *Status:* ${groupSetting.welcome ? 'âœ… ON' : 'âŒ OFF'}
â”œâ”€â *Goodbye:* ${groupSetting.goodbye ? 'âœ… ON' : 'âŒ OFF'}
â”‚
â”œâ”€â *Welcome Message:*
â”œâ”€â ${groupSetting.welcomeMsg.substring(0, 50)}...
â”‚
â”œâ”€â *Goodbye Message:*
â”œâ”€â ${groupSetting.goodbyeMsg.substring(0, 50)}...
â”‚
â•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â

Commands:
.welcome on/off
.goodbye on/off
.setwelcome <text>
.setgoodbye <text>
.resetwelcome
.resetgoodbye`;
          
          reply(settingsMsg);
        }
      }
      
      // ============ COMMAND HANDLER (for other commands) ============
      const commandsPath = './lib/command';
      if (fs.existsSync(commandsPath + '.js')) {
        const commands = require(commandsPath);
        
        if (commands.commands && Array.isArray(commands.commands)) {
          
          // Handle prefix commands (skip welcome/goodbye commands as we handled them above)
          if (isCmd && !['welcome', 'goodbye', 'setwelcome', 'setgoodbye', 'resetwelcome', 'resetgoodbye', 'welcomesettings', 'wsettings'].includes(command)) {
            const commandObj = commands.commands.find(cmd => cmd.pattern === command) || 
                             commands.commands.find(cmd => cmd.alias && cmd.alias.includes(command));
            
            if (commandObj) {
              
              // Check permissions
              if (commandObj.category === 'owner' && !isOwner) {
                return reply('âŒ This command is only for bot owner!');
              }
              
              if (commandObj.category === 'group' && !isGroup) {
                return reply('âŒ This command can only be used in groups!');
              }
              
              if (commandObj.category === 'admin' && !isAdmins && !isOwner) {
                return reply('âŒ This command is only for group admins!');
              }
              
              // Check if command is enabled for group
              if (commandObj.pattern === 'antilink' && groupSetting.antilink === false) {
                return reply('âŒ Anti-link is disabled in this group!');
              }
              
              // React if specified
              if (commandObj.react) {
                await sock.sendMessage(from, { 
                  react: { text: commandObj.react, key: msg.key } 
                }).catch(() => {});
              }
              
              // Execute command
              try {
                await commandObj.function(sock, msg, m, {
                  from, reply, body, isCmd, command: commandObj,
                  args, q, isGroup, sender, senderNumber, botNumber,
                  pushname: pushName, isMe, isOwner, groupMetadata,
                  groupName, participants, groupAdmins, isBotAdmins, isAdmins,
                  getBuffer, fetchJson, mentions, prefix, runtime, sleep, isUrl,
                  groupSettings: groupSetting
                });
                console.log(`âœ… Command executed: ${command}`);
              } catch (err) {
                console.error(`âŒ Command error:`, err);
                reply(`âŒ Error: ${err.message}`);
              }
            }
          }
          
          // Handle non-command triggers
          for (const cmd of commands.commands) {
            try {
              if (cmd.on === 'text' && body && !isCmd) {
                await cmd.function(sock, msg, m, {
                  from, reply, body, isCmd: false, command: cmd,
                  args, q, isGroup, sender, senderNumber, botNumber,
                  pushname: pushName, isMe, isOwner, groupMetadata,
                  groupName, participants, groupAdmins, isBotAdmins, isAdmins,
                  getBuffer, fetchJson, mentions, prefix, runtime, sleep, isUrl,
                  groupSettings: groupSetting
                });
              } else if ((cmd.on === 'image' || cmd.on === 'photo') && msgType === 'imageMessage') {
                await cmd.function(sock, msg, m, {
                  from, reply, body, isCmd, command: cmd,
                  args, q, isGroup, sender, senderNumber, botNumber,
                  pushname: pushName, isMe, isOwner, groupMetadata,
                  groupName, participants, groupAdmins, isBotAdmins, isAdmins,
                  getBuffer, fetchJson, mentions, prefix, runtime, sleep, isUrl,
                  groupSettings: groupSetting
                });
              } else if (cmd.on === 'sticker' && msgType === 'stickerMessage') {
                await cmd.function(sock, msg, m, {
                  from, reply, body, isCmd, command: cmd,
                  args, q, isGroup, sender, senderNumber, botNumber,
                  pushname: pushName, isMe, isOwner, groupMetadata,
                  groupName, participants, groupAdmins, isBotAdmins, isAdmins,
                  getBuffer, fetchJson, mentions, prefix, runtime, sleep, isUrl,
                  groupSettings: groupSetting
                });
              }
            } catch (e) {}
          }
        }
      }
      
      // ============ READ COMMANDS ============
      if (config.READ_CMD === 'true' && isCmd) {
        await sock.readMessages([msg.key]).catch(() => {});
      }
      
      // ============ AUTO RECORDING ============
      if (config.AUTO_RECORDING === 'true' && !msg.key.fromMe) {
        await sock.sendPresenceUpdate('recording', from).catch(() => {});
      }
      
      // ============ ANTI LINK ============
      if (config.ANTI_LINK === 'true' && isGroup && !isAdmins && !isOwner && !msg.key.fromMe && groupSetting.antilink !== false) {
        const linkRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|(chat\.whatsapp\.com\/[^\s]+)|(wa\.me\/[^\s]+)/gi;
        if (linkRegex.test(body)) {
          await sock.sendMessage(from, { delete: msg.key }).catch(() => {});
          reply('âš ï¸ *Links are not allowed in this group!*');
        }
      }
      
      // ============ ANTI DELETE ============
      if (config.ANTI_DELETE === 'true') {
        try {
          if (msg.message?.protocolMessage && msg.message.protocolMessage.type === 0) {
            if (msg.key.fromMe) return;
            
            const deletedMsgKey = msg.message.protocolMessage.key;
            const deletedMsg = messageStore.get(deletedMsgKey.id);
            
            if (deletedMsg) {
              const deletedBy = msg.key.participant || msg.key.remoteJid;
              const originalSender = deletedMsg.key.participant || deletedMsg.key.remoteJid;
              
              // Send to owner's inbox
              const sendTo = ownerNumber[0] + '@s.whatsapp.net';
              
              // Get original message content
              let originalContent = '';
              let messageType = '';
              const originalType = getContentType(deletedMsg.message);
              
              if (originalType === 'conversation') {
                originalContent = deletedMsg.message.conversation || '';
                messageType = 'Text';
              } else if (originalType === 'extendedTextMessage') {
                originalContent = deletedMsg.message.extendedTextMessage?.text || '';
                messageType = 'Text';
              } else if (originalType === 'imageMessage') {
                originalContent = deletedMsg.message.imageMessage?.caption || 'No caption';
                messageType = 'ðŸ–¼ï¸ Image';
              } else if (originalType === 'videoMessage') {
                originalContent = deletedMsg.message.videoMessage?.caption || 'No caption';
                messageType = 'ðŸŽ¥ Video';
              } else if (originalType === 'audioMessage') {
                originalContent = 'Audio message';
                messageType = 'ðŸŽµ Audio';
              } else if (originalType === 'stickerMessage') {
                originalContent = 'Sticker';
                messageType = 'ðŸŽ¨ Sticker';
              } else {
                originalContent = 'Media message';
                messageType = 'ðŸ“Ž Media';
              }
              
              const chatType = from.includes('@g.us') ? 'ðŸ‘¥ Group' : 'ðŸ‘¤ Private Chat';
              let groupNameText = '';
              
              if (from.includes('@g.us') && groupName) {
                groupNameText = `\nâ”œâ”€â *Group:* ${groupName}`;
              }
              
              const now = new Date();
              const timeStr = now.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
              const dateStr = now.toLocaleDateString('en-PK');
              
              const deleteMessage = `
â•­â”€â”€â *ðŸš« ANTI-DELETE ALERT* ââ”€â”€â•®
â”‚
â”œâ”€â *Time:* ${timeStr}
â”œâ”€â *Date:* ${dateStr}
â”œâ”€â *Chat Type:* ${chatType}${groupNameText}
â”‚
â”œâ”€â *Deleted By:* @${deletedBy.split('@')[0]}
â”œâ”€â *Original Sender:* @${originalSender.split('@')[0]}
â”‚
â”œâ”€â *Message Type:* ${messageType}
â”œâ”€â *Content:* 
â”œâ”€â \`${originalContent.substring(0, 500)}${originalContent.length > 500 ? '...' : ''}\`
â”‚
â•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â
        
> _Message was deleted but bot saved it_ ðŸ”°`;
              
              await sock.sendMessage(sendTo, {
                text: deleteMessage,
                mentions: [deletedBy, originalSender]
              }).catch(() => {});
              
              console.log(`ðŸš« Anti-delete: Message saved to inbox`);
            }
          }
        } catch (e) {
          console.error("Anti-delete error:", e);
        }
      }
      
    } catch (error) {
      console.error("âŒ Message handler error:", error);
    }
  });
}

// Start bot
setTimeout(() => {
  connectToWA();
}, 4000);

// BOT SALLERS KI MKC
