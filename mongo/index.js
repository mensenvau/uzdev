const mongoose = require("mongoose");

const getConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("\x1b[32m%s\x1b[0m", `Database connected successfully!`);
    return connection;
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", `Database connection error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = { getConnection };
