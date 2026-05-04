const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
// Add Your Session Id Start With SURYA-X Hear
SESSION_ID: process.env.SESSION_ID || "SURYA-X~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVU1hRHp0b2RZVTZRdnk3REE0QjFkeDMxNkYwSmJUZ2R4VjhjN1FGalVrTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTEc1Wk5LcjZRT1J1ZnJQUHJ2K1BIcCtaRzlQczlHalBXY0hzdlhGS0dIWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTQkF6N3llOHFjelB4NW9qSHZjRXQwZGVLTXdsZkJuVVFkeitJYmcwNlUwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2QzJrcDE4QTFxOVFQWTZ0d1JyK2htMm03aUtoOUlVaWRLQkNrZmx5TlVVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBNUG5PV1FWMG80akJzc0xQSmRGeXBZMzlNWWtBcXRtN1hJbWs2a3NlbjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRJNHFybEN4NTE1d2dkT1FWaURHeFY1V2Q0MUovU1pacXBCaWFNck9sM009In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEw5RS9MdGZid1UwNU9kR1pxMUpyemRhTW1BZ20yY05RUEdVYXhjQ3VXTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYkVOcUcwL2ozQzMwSnc3RnlIM245Y21oS0h1UFROMDROUXgvQisxZzNoRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxWUkdteTBLa2Q5ekQwSnlhN0dmb2J3eDdNb1FHNTI4bk9JcGJyOWFlalV0d2pocGwwLzgzRHRQZW5zTmp0TExrN3lsV2Z6ZGxseDFzQTNIS1M5cGpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjEsImFkdlNlY3JldEtleSI6ImxhSWxaTEtCa0t3WWwzdXFSWFRvcEtuNXJxN09WSzZseTZNN0dvQlc0d1U9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjo4MTMsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo4MTMsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiWVVQUkFERVYiLCJtZSI6eyJpZCI6IjQ4NzI5NzU5ODQ2OjI0QHMud2hhdHNhcHAubmV0IiwibGlkIjoiNzE3NDgyMTcyMTcxNTI6MjRAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMVGFnL3dIRUptcTVNOEdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ3b3NMbUhqK0M1RTUrL2xTbVB5R2hoSzRQb3dDZkVOZVV6Z2VERStFbXdRPSIsImFjY291bnRTaWduYXR1cmUiOiJXckNqSEtuT3R4cENyV0pTNEszanA0RlJZK0lXUVpFbjBMWldyaDB5c0M2bGNnWEZsZDVOcHlqVzRjSzNSQThwYytsbk9tRGJxRXVDbkQ4SXF0a05CQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiUWhSU1V5QVNEb2ZwbG05bGlYMnMxNkZGRVJrQ0gzTThLNmJQOHNyVjN2TG5hVktiQUNyS29CMDhadVRrY3dEOWZxMkZqT01OTU11czBMZHRyb1p4aVE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI0ODcyOTc1OTg0NjoyNEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjS0xDNWg0L2d1Uk9mdjVVcGo4aG9ZU3VENk1BbnhEWGxNNEhneFBoSnNFIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQU1JQ0FnRiJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Nzc5MzE1NjEsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBREFWIn0=",
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
OWNER_NUMBER: process.env.OWNER_NUMBER || "917797099719",
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







