const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
// Add Your Session Id Start With SURYA-X Hear
SESSION_ID: process.env.SESSION_ID || "SURYA-X~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0phME1zTlM0d3ROTFpEbGFZYTlZRmxjV1VSNi9SaGpCTUQ0bHlRelZYND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMzMydkRmRkI2c1VOWVBBQ3J5R0FNM1F6QkFvU3IxS1pUOHI3Q2I1NDBtbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzSk93NThSSGR3eThMZ01TelBxdmdoSFhwc0xaUHNVREZ5OXhqUGVrbjM0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlSUxlVUdndmhIenoydWd4OEJ2SXVJMlJxRzNGZ0pUM3NiTE5SY1BvUVNnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNGREZybjlQUGRKbVFUK1E1T1M3dE9DaG5HdDdIM294Z3k0MjJtYU1sVzQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlM4NFlzbzVubVVVTjd6RTBobVBsaXFlZHRXaFo5Mkl1K2dBOTNyRjNPRXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0Q1UFA3am1sQVhvU3MwblludmwwQ0xxWE5RTDBUUnRidjVsRTdlc3drUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUhSdzVQL0NodlBxdTlBNXQ0c2JoK3lyMnY2NGliUjlSYnBGUkdmeU9Vdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJ2eEdJZFRIOWZGUTBGK1VJWVFSekJTdG50VWpLQzNTNEExWkRpMTFZeHVzeU1pQWZCQ3FNdU5WK2luVmRSQXBTTEYyaENYYk5BUGlYTTJMYWRkbENnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAxLCJhZHZTZWNyZXRLZXkiOiJUK0VWdDlzMXBob1ZwT2xkUjhqT1FydnlBRC92cDhRbGtDN1hFb3ZMOXowPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6Ijg0ODk5NTU3NDI4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkFDQzE3Q0MyODcyRUQzOENGMUQ1Q0VGOTlFOEQ2NDQ0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Nzc5MzQ2MzF9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijg0ODk5NTU3NDI4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkFDRDhDQjhENTJCREZCRTMyNjhERjE4Q0I2N0JEMEQ3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Nzc5MzQ2MzF9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijg0ODk5NTU3NDI4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkFDNjE0NkE1Q0FEMEM2NjA4RjA0NDJEODk1RUM4OTAyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Nzc5MzQ2MzF9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijg0ODk5NTU3NDI4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkFDNkRBODU0MzIyNkJFNDAzNzhGNTYzREU5RTZGRDMzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Nzc5MzQ2MzN9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijg0ODk5NTU3NDI4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkFDRUM4MTM3MjIyQTFGQ0FBNjhBQTg0NTVCRUQ1NjI5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Nzc5MzQ2MzV9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijg0ODk5NTU3NDI4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkFDRjAzOUMzQUE1QjJBMTBDMkU2MzRFRjc3OTI2MTVDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Nzc5MzQ2MzZ9XSwibmV4dFByZUtleUlkIjo4MTMsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo4MTMsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiWVVQUkFERVYiLCJtZSI6eyJpZCI6Ijg0ODk5NTU3NDI4OjFAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxMzYwNjA5NDAwNzA5MjY6MUBsaWQiLCJuYW1lIjoiQWxsIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJeTF1dHNGRUpuQzVNOEdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJCVUJrNnZ4bGk0bmE4c042MGEvNlRrdDdOYzJyZFpwQ3crbmhiV3pCUVhRPSIsImFjY291bnRTaWduYXR1cmUiOiJJRk82L1NnZExtYW51WitJeGtqYkk1MXJoYTlmYnhTeVNNQWN5dnkwVCtwL1Q1ekluNk9oOHBpR3RPL3B4RENNb2FTWDUwbDVkNFczcU5TT0FSTGdEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoia3NFQW9Nc3E2OGF2cjBDRE44dVMzaDlSRURXYWFPT1FvTlJZQUVSN3VGNWU2R05JTWRVcTlJNGxKa3F0cUQ3eWN5SEsyb3UxQzYwZ0JyVjN3WisrRGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI4NDg5OTU1NzQyODoxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFWQVpPcjhaWXVKMnZMRGV0R3YrazVMZXpYTnEzV2FRc1BwNFcxc3dVRjAifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBc0lEUWdTIn0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc3NzkzNDYzMCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFKb1EifQ==",
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







