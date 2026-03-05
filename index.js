const { default: makeWASocket } = require("@whiskeysockets/baileys")

async function startBot() {

const sock = makeWASocket({})

sock.ev.on("messages.upsert", async ({ messages }) => {

let m = messages[0]
if (!m.message) return

let text = m.message.conversation || m.message.imageMessage?.caption || ""

let from = m.key.remoteJid

// MENU
if (text === ".menu") {
await sock.sendMessage(from,{
text:`
🤖 MENU BOT

.stiker
.ping
.owner
.menu
`
})
}

// PING
if (text === ".ping") {
await sock.sendMessage(from,{text:"Bot aktif ✅"})
}

// OWNER
if (text === ".owner") {
await sock.sendMessage(from,{text:"Owner: Abid"})
}

// STICKER (contoh respon dulu)
if (text === ".stiker") {
await sock.sendMessage(from,{text:"Kirim gambar dengan caption .stiker"})
}

})

}

startBot()
