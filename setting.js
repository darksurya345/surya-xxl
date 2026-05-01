const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
// Add Your Session Id Start With SURYA-X Hear
SESSION_ID: process.env.SESSION_ID || "SURYA-X~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0lQWHExREVlbXZDaTJVV3VkcmN3ZlJESS85MFc3dDlVWFVicTc2RzFWWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZjFqdVhqVnZwb2hLSjA0cHFHaS9UVVRlMkY1aG5aalIvd05MTWtzMWVDTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPSW83cFRkQVVVWm1LcDFMZ3Q2VXRzQ01HbERJb3o3bytWSVRnbU40aWtvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2QWxSK3ZmaTRGVEtGZktOQmIvVG92dkdQRU5pNGVYN1NOZ0dxQTJQZmswPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9JVGhWMmUvdUtHclhwWFA2YWdRUmwycDNud0NGWW5OYWJ2RmZyMW43V0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFQUmZqRTZJV1R2TFpIdHUyY2l1L3RLcEdsL0tMSHNvUDVoK1ZBQUJ3UzQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUoxU202Um1jbFcvblJKSzU2cjFnd1dkVmM2cDl2cG5hVlVlS0RxZmdXZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRHU1WkVnS1o5dGtJMkxSQ1JOUlBjSVM2c3R0VFZtRXBJK3RhUWpEMFpuST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllwS3Vuc2tPVDMwQk5USFQ4RjBIYWhDd2dzNnRUcFNsYXh5ZzVhbVhBMGt6NWZxWFJESnpjRndMOGJaRm92eFNHM2piUGtJajBaN05ySGdPa21KRWlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTIsImFkdlNlY3JldEtleSI6IkpzOTRDdk5XbU5nZnp1WmR6SnVWdTlGd3RzeklkNExTbWxWaXJ4cU05WTA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTk4OTM2MjY3ODMwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkE1RDg2Njg5NTU4MjRBQTU0RjBCNTRFRjVDQTRDODAzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Nzc2MTI0OTB9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijk5ODkzNjI2NzgzMEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBNTFFMDYzNjQ1QTQ3MTM4REFCMEY5NkJCODg0RENEQyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzc3NjEyNDkwfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5OTg5MzYyNjc4MzBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQTVGRkVFRjQzMzMxRUU3MzhCMEIxRjNDMjMxQzVBOTgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc3NzYxMjQ5MH0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTk4OTM2MjY3ODMwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkE1MUJENDAxQ0UzMjlGRkFFNjMzQkY0MTZGQjJFRDNDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Nzc2MTI0OTB9XSwibmV4dFByZUtleUlkIjo4MTMsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo4MTMsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiWVVQUkFERVYiLCJtZSI6eyJpZCI6Ijk5ODkzNjI2NzgzMDoxQHMud2hhdHNhcHAubmV0IiwibmFtZSI6ImxvbCIsImxpZCI6IjE2NDgyODY2NDYxNTA1MjoxQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT1hLZ3BzREVMcnQwTThHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoicnlYOVVsWW51cWVndnRKVjVTZ09HQ0xwSTJPK3RvbFFTNGpKSHloZ0xnTT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiWWFRdzhsYmZPVzFKcjNWZWl3OHIwM1JTYjRmMDRrOTE5b2dIUzVPdlpqTlByUytLdTZ0RzhDQ0ppZmVlYVdYZm1GdWptQWg5QzVHZXZxcktrUzNFQkE9PSIsImRldmljZVNpZ25hdHVyZSI6InNKandETjRxK1lWMXFpU1FiSzRQazdNa2ZjYlpIRjNnMnZRWkc1Y01sUS9rM2pmdHdERTdzRU9PREtDdkJKbGlYY1V0K2VCMlZkdnRuL29uektER2hnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTk4OTM2MjY3ODMwOjFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYThsL1ZKV0o3cW5vTDdTVmVVb0RoZ2k2U05qdnJhSlVFdUl5UjhvWUM0RCJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FrSUJRZ04ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzc3NjEyNDg4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU5KWiJ9",
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







