require("dotenv").config({ path: `./.env` });

const redis = require("redis");

const client = redis.createClient({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD,
    legacyMode: true
});

(async () => {
    try {
        await client.connect();
        console.info("\x1b[32m%s\x1b[0m", "Connected to Redis!");
    } catch (err) {
        console.error("\x1b[31m%s\x1b[0m", `Could not connect to Redis: ${err}`);
        process.exit(1);
    }
})();

client.on("error", (err) => {
    console.error("\x1b[31m%s\x1b[0m", `Redis error: ${err}`);
});

// Export the client for external use
module.exports = { client };
