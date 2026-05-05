const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
// Add Your Session Id Start With SURYA-X Hear
SESSION_ID: process.env.SESSION_ID || "SURYA-X~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ09mMXpnSVc2dHN4VmRQYXBOUFlNYjRyR2dKZUhTOVdSSDBIeHR0eklXND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUnAzSWZBc3VkTmNUb3JERE9rQWluTGEwZllNbWJ2TWxOMTVod2NyWERrbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4TEc0VXc4YjNTd0crbnZiNnR6ZFBVYWxQNXJhUC9kOGJNY214ZFZ5ZVdJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCNjdrN3MxTWloRks0NHcza09rbTdrb2tobFY5aCtmaWpFRjhSeXZmQ3kwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFJTGdOVS9Sc0xkR0IrS243VitmbDc2MldsTTcvc3o0SEVCakNEL01aRUU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJxLzJkSWZuZXZMeXVVNE9MUkxWTmlyRVEwMEluMkdyUHhIbzlmbnk2VEE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUpTRmJIM0x6ME8rcS92VVovSzJXOWpONnJJU2ZybmJSNndnWURISlhsRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic1JxL2M5SFJDZ0p4ZXpIaWpOcVo4SWc4b0VSRWwwbjR2Y1J4cUtMNkVCYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjEvdktDL1hPcFNVOGM5L3djRk5ZY21hZk9oZlNPL0RNMWwvMy9zbHFNcWdBWDVzaUxtVis1Zk11SEFBT0JRUlg2cW5tTWtwZlE0UVpsdmkwczFwZ0J3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzEsImFkdlNlY3JldEtleSI6Ik00eTVZN005eE9ZVnZ2dEtRaE0zTWJZVzVRWG8ydnZMaXdGZWhldE1hWUE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjo4MTMsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo4MTMsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiUENORjhFRlciLCJtZSI6eyJpZCI6IjQ5MTU1MTE3Njc5MTQ6MUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjExMzY0OTkwMTQwNDIyOToxQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTjZpbTYwRUVKeXc1czhHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoibjF0Z3lkOXlyK1hOODVYdC9kSDcrSHhIL3dnOXRvWCtSM2todXpXOXBrUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoidmdmM0RpbUhtQ2VrejFBY3Rob1dCV2dCV2Z6Nlh5YS9yTmc4OEhDQTFLSmhWTk1sZGRlNTA4bnovSTZHd0Rxb2NoWTVlUjJZZ3Z5OXdidzIrUFhlQVE9PSIsImRldmljZVNpZ25hdHVyZSI6IjlsUzIybnNxUm4zdENTanM4YVBLQ1pHeE1zbms3Z3Z5bzZ5WXFtM0M2aC9DbFBpM2lQZkEyY0RJNVk3b2lPei9Pa2JTaWRLRGJiQTNzODlJK2d4bkRnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMTEzNjQ5OTAxNDA0MjI5OjFAbGlkIiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlo5YllNbmZjcS9semZPVjdmM1IrL2g4Ui84SVBiYUYva2Q1SWJzMXZhWkUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ1FBeEFBIn0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc3Nzk2NTA5MX0=",
// SURYA-X Api Site Url
API_BASE: process.env.API_BASE || "https://api-key-surya.up.railway.app/",
// SURYA-X Api Key -- Add This To Your Api Key Form Api Site
API_KEY: process.env.API_KEY || "suryaX_9f3kL2pQ7z",
// Auto Status Seen
AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",
// make true or false status auto seen
AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
// make true if you want auto reply on status 
AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "false",
// make true if you want auto reply on status 
AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*SEEN YOUR STATUS BY SURYA-X 🤍*",

AUTO_BIO: process.env.AUTO_BIO || "true",
// true if want welcome msg in groups
GOODBYE: process.env.GOODBYE || "false",
// true if want goodbye msg in groups    
ADMIN_EVENTS: process.env.ADMIN_EVENTS || "false",
// make true to know who dismiss or promoted a member in group
PREFIX: process.env.PREFIX || ".",
// add your prifix for bot   
BOT_NAME: process.env.BOT_NAME || "SURYA-X",
// add bot namw here for menu
STICKER_NAME: process.env.STICKER_NAME || "SURYA-X",
// type sticker pack name 
CUSTOM_REACT: process.env.CUSTOM_REACT || "false",
// make this true for custum emoji react    
CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",
// chose custom react emojis by yourself 
DELETE_LINKS: process.env.DELETE_LINKS || "false",
// automatic delete links witho remove member 
OWNER_NUMBER: process.env.OWNER_NUMBER || "4915511767914",
// add your bot owner number
OWNER_NAME: process.env.OWNER_NAME || "DARK SURYA",

SEND_WELCOME: process.env.SEND_WELCOME || "true",
// add alive msg here 
READ_MESSAGE: process.env.READ_MESSAGE || "true",
// make true for auto read message
READ_CMD_ONLY: process.env.READ_CMD_ONLY || "true",
// Turn true or false for automatic read msgs
AUTO_REACT: process.env.AUTO_REACT || "false",
// make this true or false for auto react on all msgs
ANTI_BAD: process.env.ANTI_BAD || "true",
// false or true for anti Calls
ANTI_CALL: process.env.ANTI_CALL || "true",
// false or true for anti bad words  
MODE: process.env.MODE || "public",
// make bot public-private-inbox-group 
ANTI_LINK: process.env.ANTI_LINK || "true",
// make anti link true,false for groups 
AUTO_VOICE: process.env.AUTO_VOICE || "true",
// make true for send automatic voices
AUTO_STICKER: process.env.AUTO_STICKER || "false",
// make true for automatic stickers 
AUTO_REPLY: process.env.AUTO_REPLY || "true",
// make true or false automatic text reply 
ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "true",
// maks true for always online 
 //Bot olways offline
PUBLIC_MODE: process.env.PUBLIC_MODE || "true",
// make false if want private mod
AUTO_TYPING: process.env.AUTO_TYPING || "true",
// true for automatic show typing   
READ_CMD: process.env.READ_CMD || "false",
// true if want mark commands as read 
DEV: process.env.DEV || "917797099719",
//replace with your whatsapp number        
ANTI_VV: process.env.ANTI_VV || "true",

ANTI_BOT: process.env.ANTI_BOT || "true",
// true for anti once view 

ANTI_DELETE: process.env.ANTI_DELETE || "true",
// true for anti delete 
ANTI_DELETE_TYPE: process.env.ANTI_DELETE_TYPE || "same", 
// change it to 'same' if you want to resend deleted message in same chat 
AUTO_RECORDING: process.env.AUTO_RECORDING || "true",
// make it true for auto recoding 
AUTO_BLOCK: process.env.AUTO_BLOCK || "false"
// make it true for auto block
};







