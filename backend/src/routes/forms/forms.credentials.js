const fs = require("fs");
const path = require("path");

function fnGetGoogleFormsCredentials() {
  const service_account_path = process.env.GOOGLE_SERVICE_ACCOUNT_PATH;

  if (!service_account_path) {
    console.warn("⚠ Google Forms credentials not configured");
    console.warn("  Set GOOGLE_SERVICE_ACCOUNT_PATH in .env file");
    console.warn("  Example: GOOGLE_SERVICE_ACCOUNT_PATH=/path/to/service-account.json");
    throw new Error("Google Forms credentials not configured. Please add GOOGLE_SERVICE_ACCOUNT_PATH to .env file.");
  }

  try {
    const full_path = path.resolve(service_account_path);

    if (!fs.existsSync(full_path)) {
      console.error("✗ Service account file not found:", full_path);
      throw new Error(`Service account file not found: ${full_path}`);
    }

    const service_account = JSON.parse(fs.readFileSync(full_path, "utf8"));
    console.log("✓ Google Forms credentials loaded from:", service_account_path);
    return service_account;
  } catch (error) {
    console.error("✗ Error reading service account file:", error.message);
    throw new Error(`Failed to load Google Forms credentials: ${error.message}`);
  }
}

module.exports = {
  fnGetGoogleFormsCredentials,
};
