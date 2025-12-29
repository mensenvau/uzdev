/**
 * Environment Variables Utility
 * Loads environment variables from .env file
 */

require("dotenv").config();
require("dotenv").config({ path: "../.env" });

// Export for verification (optional)
module.exports = {
  loaded: true,
};
