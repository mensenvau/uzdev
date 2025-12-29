const fs = require("fs");
const path = require("path");

/**
 * Get Google Forms credentials from environment variables
 * @returns {Object|null} Google API credentials
 */
function fnGetGoogleFormsCredentials() {
  // Service Account JSON file path
  const service_account_path = process.env.GOOGLE_SERVICE_ACCOUNT_PATH;

  if (service_account_path) {
    try {
      const full_path = path.resolve(service_account_path);
      if (fs.existsSync(full_path)) {
        const service_account = JSON.parse(fs.readFileSync(full_path, "utf8"));
        console.log("✓ Google Forms credentials loaded from:", service_account_path);
        return service_account;
      } else {
        console.error("✗ Service account file not found:", full_path);
      }
    } catch (error) {
      console.error("✗ Error reading service account file:", error.message);
    }
  }

  // No credentials found
  console.warn("⚠ Google Forms credentials not configured");
  console.warn("  Set GOOGLE_SERVICE_ACCOUNT_PATH in .env file");
  console.warn("  Example: GOOGLE_SERVICE_ACCOUNT_PATH=/path/to/service-account.json");

  return null;
}

module.exports = {
  fnGetGoogleFormsCredentials,
};
