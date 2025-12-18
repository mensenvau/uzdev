/**
 * JWT Utility
 * Token generation and verification
 */

const jwt = require('jsonwebtoken');

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret-key';
const JWT_PASSWORD_RESET_SECRET = process.env.JWT_PASSWORD_RESET_SECRET || 'password-reset-secret-key';
const JWT_FORM_ACCESS_SECRET = process.env.JWT_FORM_ACCESS_SECRET || 'form-access-secret-key';

function signAccessToken(payload) {
  return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '15m' });
}

function signRefreshToken(payload) {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

function signPasswordResetToken(payload) {
  return jwt.sign(payload, JWT_PASSWORD_RESET_SECRET, { expiresIn: '1h' });
}

function signFormAccessToken(payload) {
  return jwt.sign(payload, JWT_FORM_ACCESS_SECRET, { expiresIn: '30d' });
}

function verifyAccessToken(token) {
  return jwt.verify(token, JWT_ACCESS_SECRET);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, JWT_REFRESH_SECRET);
}

function verifyPasswordResetToken(token) {
  return jwt.verify(token, JWT_PASSWORD_RESET_SECRET);
}

function verifyFormAccessToken(token) {
  return jwt.verify(token, JWT_FORM_ACCESS_SECRET);
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  signPasswordResetToken,
  signFormAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
  verifyPasswordResetToken,
  verifyFormAccessToken,
};
