require("dotenv").config({ path: `./.env` });

const redis_core = require("redis");

const redis = redis_core.createClient({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD,
    legacyMode: true
});

(async () => {
    try {
        await redis.connect();
        console.info("\x1b[32m%s\x1b[0m", "Connected to Redis!");
    } catch (err) {
        console.error("\x1b[31m%s\x1b[0m", `Could not connect to Redis: ${err}`);
        process.exit(1);
    }
})();

redis.on("error", (err) => {
    console.error("\x1b[31m%s\x1b[0m", `Redis error: ${err}`);
});

// Export the redis for external use
module.exports = { redis };
