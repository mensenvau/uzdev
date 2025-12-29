/**
 * Path Utility
 * Helper functions for working with file paths
 */

const path = require("path");
const { fileURLToPath } = require("url");

// For CommonJS, __dirname is available directly
// This utility is kept for compatibility if needed

function getRootPath() {
  return path.join(__dirname, "../..");
}

function getSrcPath() {
  return path.join(__dirname, "..");
}

module.exports = {
  getRootPath,
  getSrcPath,
};
