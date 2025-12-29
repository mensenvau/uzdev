const fs = require("fs");
const path = require("path");

/**
 * Get Google Forms credentials from environment variables
 * Supports both Service Account JSON file and OAuth2 tokens
 * @returns {Object|null} Google API credentials
 */
function getGoogleFormsCredentials() {
  // Option 1: Service Account JSON file
  const serviceAccountPath = process.env.GOOGLE_SERVICE_ACCOUNT_PATH;
  if (serviceAccountPath) {
    try {
      const fullPath = path.resolve(serviceAccountPath);
      if (fs.existsSync(fullPath)) {
        const serviceAccount = JSON.parse(fs.readFileSync(fullPath, "utf8"));
        return serviceAccount;
      }
    } catch (error) {
      console.error("Error reading service account file:", error.message);
    }
  }

  // Option 2: OAuth2 tokens from environment
  const accessToken = process.env.GOOGLE_FORMS_OAUTH_ACCESS_TOKEN;
  const refreshToken = process.env.GOOGLE_FORMS_OAUTH_REFRESH_TOKEN;

  if (accessToken || refreshToken) {
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  // Option 3: Service account JSON from environment variable directly
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (serviceAccountJson) {
    try {
      return JSON.parse(serviceAccountJson);
    } catch (error) {
      console.error("Error parsing GOOGLE_SERVICE_ACCOUNT_JSON:", error.message);
    }
  }

  // No credentials found
  console.warn("Google Forms credentials not configured. Please set one of:");
  console.warn("  - GOOGLE_SERVICE_ACCOUNT_PATH (path to JSON file)");
  console.warn("  - GOOGLE_SERVICE_ACCOUNT_JSON (JSON string)");
  console.warn("  - GOOGLE_FORMS_OAUTH_ACCESS_TOKEN and GOOGLE_FORMS_OAUTH_REFRESH_TOKEN");

  return null;
}

module.exports = {
  getGoogleFormsCredentials,
};
