const request = require('sync-request');
const fs = require('fs').promises;
const { SMS_ESKIZ_FROM, SMS_ESKIZ_TOKEN, SMS_ESKIZ_EMIAL } = process.env;

const smsToken = async () => {
    try {
        const res = request('POST', 'http://notify.eskiz.uz/api/auth/login', {
            body: `email=${SMS_ESKIZ_EMIAL}&password=${SMS_ESKIZ_TOKEN}`,
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        });

        if (res.statusCode !== 200) {
            throw new Error(`Message: ${res.statusCode}, Details: ${res.getBody('utf8')}, ErrorCode: CronJobs`);
        }

        const { token } = JSON.parse(res.getBody('utf8')).data;
        await fs.writeFile("./eskiz_token.txt", token, { encoding: "utf-8" });
    } catch (err) {
        console.log(err.message);
    }
};

const smsSender = async (phone, text, callback, step = 0) => {
    try {
        if (!text || !phone) {
            return callback(phone, 0, "sms matni yoki telefon raqam xato!");
        }

        let token;
        try {
            token = await fs.readFile('./eskiz_token.txt', { encoding: "utf-8" });
        } catch (err) {
            console.log(err.message);
        }

        const res = request('POST', 'https://notify.eskiz.uz/api/message/sms/send', {
            body: `mobile_phone=998${phone}&message=${text}&from=${SMS_ESKIZ_FROM}`,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                "Authorization": `Bearer ${token}`
            }
        });

        if (res.statusCode === 401 && step === 0) {
            await smsToken();
            return await smsSender(phone, text, callback, 1);
        }

        if (res.statusCode !== 200) {
            return callback(phone, 0, `Error status code: ${res.statusCode}`);
        }

        return callback(phone, 1, "Ok");
    } catch (err) {
        return callback(phone, 0, err.message);
    }
};

module.exports = { smsSender };
