const request = require('sync-request');

let botSender = (message) => {
    try {
        console.log(message)
        const msg = `#### NEW LINE ####\nApp name: ${process.env.APP_NAME}\nDetails: ${JSON.stringify(message)}\n\nTime: ${new Date()}`;
        const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${process.env.MAIN_CHAT}&text=${encodeURIComponent(msg)}`;
        const res = request('GET', url, { timeout: 5000 });

        if (res.statusCode !== 200) {
            throw new Error(res.body.toString('utf-8'))
        }
    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', err.message);
    }
}

module.exports = {
    botSender
}