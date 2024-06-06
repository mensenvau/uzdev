const { execute } = require("uzdev/mysql")
const { smsSender } = require("uzdev/sender")
const { randomCode, enCode, deCode } = require("uzdev/function")

exports.authPhone = async (req, res, next) => {
    try {
        let phone = req.body?.phone;
        let code = randomCode(5);

        let data = await execute("SELECT * FROM tmp_sms_codes WHERE phone = ? AND is_active = 1 AND TIMESTAMPDIFF(minute, savetime, NOW()) < 31", [phone], 1);

        if (data) {
            throw new Error("Sizga SMS yuborilgan, 30 daqiqa kuting va qayta urinib ko‘ring.");
        }

        let ins = await execute("INSERT INTO tmp_sms_codes (phone, code) VALUES(?, ?)", [phone, code]);

        smsSender(phone, code, async (phone, status, message) => {
            await execute("UPDATE tmp_sms_codes SET is_sent = ? WHERE sms_id = ?", [status, ins.insertId]);
        });

        res.json({ sms_token: enCode({ sms_id: ins.insertId, type: "sms_token" }), message: "SMS yuborildi!" });
    } catch (err) {
        next(new Error(JSON.stringify({ message: err.message, code: "router" })));
    }
};


exports.authCode = async (req, res, next) => {
    try {
        let { sms_token, code } = req.body;
        let { sms_id, type } = deCode(sms_token);

        let data = await execute("SELECT * FROM tmp_sms_codes WHERE sms_id = ? AND is_active = 1", [sms_id], 1);

        if (!data || type !== "sms_token") {
            throw new Error("Token muddati tugagan.");
        }

        if (data.attempt_count > 5) {
            throw new Error("Urinishlar soni 5 tadan oshdi.");
        }

        if (data.code !== code) {
            await execute("UPDATE tmp_sms_codes SET attempt_count = attempt_count + 1 WHERE sms_id = ?", [sms_id]);
            throw new Error("Kod noto'g'ri.");
        }

        await execute("UPDATE tmp_sms_codes SET is_active = 0 WHERE sms_id = ?", [sms_id]);

        let slt = await execute("SELECT * FROM fact_users WHERE phone = ?", [data.phone], 1);

        if (!slt) {
            let ins = await execute("INSERT INTO fact_users (phone) VALUES (?)", [data.phone]);
            slt = { user_id: ins.insertId };
        }

        res.json({ user_token: enCode({ user_id: slt.user_id, type: "user_token" }), message: "Xush kelibsiz!" });
    } catch (err) {
        next(new Error(JSON.stringify({ message: err.message, code: "router" })));
    }
};
