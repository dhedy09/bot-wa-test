const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

console.log("Memulai client...");

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', qr => {
    console.log('QR Code diterima, silahkan scan:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Client sudah siap dan terhubung!');
});

client.on('message', message => {
    if (message.body === '!ping') {
        message.reply('pong');
    }
});

client.initialize();
