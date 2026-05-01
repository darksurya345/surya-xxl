const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
// Add Your Session Id Start With SURYA-X Hear
SESSION_ID: process.env.SESSION_ID || "SURYA-X~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0VCeGNvS0dNRUNRS0xuMUdKaWs4K0lZd2lJUElNYWQrTi9pZ0pDSjBWVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicXFNTTB3NnJUdmZCWnFyN0FyVjZoNkNVekZHRUFOd28waUxJaFZGNEZnQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTSGZYVFdHQzdRS2FaQXRzRHBVZlkxSGxTdlAzTEV3OFdaYXVmWUp4NDNZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHd05JUTNGOGFpOERjUlZGNStVUm5FZlJDM1l1a1BoSGc2bmlhNEU2SEdjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtPOGJKTnBrUElsM3kyVmJsVHVpZUZ2dnJLMUFhd2Y5SUtWM2ZUSmdpbmc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5KbysxMXFOWk1UNW01Mkdwak1LWXdhd0hWd3dZTzRVS0JvZWFHSlI5bG89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU92SXFJSlJ1VHhhbm5SblowSFl1dUEvaC95MHdSc1RZUmF1SWNOdmxuRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRHBnbDFSOG9TTXdaakpQUUkyWUExcTgya3dGbnUwMEo1Q0ZGOGttbWgxVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldxNFgrUjI3dTdLZWZPNVBnaSs1SGNpL3JnRCt3M2xNYlBOenFHZURlNTlIWU1XZlJGS0lkUDA4d2NKVzlScEp3V1BOamRXMVdxQ0R3YVU3UEZ0cGlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODcsImFkdlNlY3JldEtleSI6IjIzQ0crekNtR3RNRUhrTk9tQTJYN1N2M1c4bFR6QXM4QjBJVHJIdnZHTEE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTk4OTM2MjY3ODMwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkE1NTlEMjBCNTFGQ0ZDOEQxMTA4RTlCMTMzOTIyNEM1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Nzc2Mjk0ODl9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijk5ODkzNjI2NzgzMEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBNTIwRUM2QTEyREI5MTgyRjlCOEU3MzZBNThDQjA1NiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzc3NjI5NDg5fV0sIm5leHRQcmVLZXlJZCI6ODEzLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6ODEzLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IllVUFJBREVWIiwibWUiOnsiaWQiOiI5OTg5MzYyNjc4MzA6MkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJsb2wiLCJsaWQiOiIxNjQ4Mjg2NjQ2MTUwNTI6MkBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09YS2dwc0RFS0x5MGM4R0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InJ5WDlVbFludXFlZ3Z0SlY1U2dPR0NMcEkyTyt0b2xRUzRqSkh5aGdMZ009IiwiYWNjb3VudFNpZ25hdHVyZSI6Ii8wTmFQc2x0YmJPZ2VlV2p6dEhaNTM1N3hBMGszMFZCQ1loTWNjMzJ5TmlpU1RhZFhRUGN5ZkJLQ0wwemxBNkNRY2ptOEdSWS9RYXN6cXdLZUhjTUJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJRMjJUVGlvTGtzc1k1bzdwV1FCOFNjSWVVeWx1eUQ2WHRha0RYeGhmSVBGMytMbktkRXRIV05iSXVCVTd3Ui9ObldIMFlJM3U4bTI4UWFjbTY5N0JoUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk5ODkzNjI2NzgzMDoyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmE4bC9WSldKN3Fub0w3U1ZlVW9EaGdpNlNOanZyYUpVRXVJeVI4b1lDNEQifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBa0lCUWdOIn0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc3NzYyOTQ4NywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFOSloifQ==",
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







