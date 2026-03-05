// index.js
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")

// === Variable Bot ===
const BOT_NAME = "Bot Abid"
const OWNER = "Abid"
const MENU_TEXT = `
🤖 MENU BOT

.stiker
.ping
.owner
.menu
`

async function startBot() {
    // buat session auth otomatis (folder auth_info)
    const { state, saveCreds } = await useMultiFileAuthState('auth_info')

    const sock = makeWASocket({
        auth: state
    })

    // simpan session otomatis
    sock.ev.on('creds.update', saveCreds)

    // handle pesan masuk
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const m = messages[0]
        if (!m.message) return
        const from = m.key.remoteJid
        const text = m.message.conversation || m.message.imageMessage?.caption || ""

        // MENU
        if (text === ".menu") {
            await sock.sendMessage(from, { text: MENU_TEXT })
        }

        // PING
        if (text === ".ping") {
            await sock.sendMessage(from, { text: `${BOT_NAME} aktif ✅` })
        }

        // OWNER
        if (text === ".owner") {
            await sock.sendMessage(from, { text: `Owner: ${OWNER}` })
        }

        // STICKER placeholder
        if (text === ".stiker") {
            await sock.sendMessage(from, { text: "Kirim gambar dengan caption .stiker" })
        }
    })
}

startBot()
