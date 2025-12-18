/**
 * Email Utility
 * Email sending functionality using Nodemailer
 */

const nodemailer = require('nodemailer');

const EMAIL_ENABLED = process.env.EMAIL_ENABLED === 'true';
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT) || 587;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@example.com';

let transporter = null;

if (EMAIL_ENABLED && EMAIL_HOST && EMAIL_USER && EMAIL_PASSWORD) {
  transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_PORT === 465,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });
}

async function sendEmail(to, subject, text, html) {
  if (!EMAIL_ENABLED || !transporter) {
    console.log('Email not configured or disabled');
    console.log('Email would be sent to:', to);
    console.log('Subject:', subject);
    console.log('Body:', text);
    return { messageId: 'email-disabled' };
  }

  try {
    const info = await transporter.sendMail({
      from: EMAIL_FROM,
      to,
      subject,
      text,
      html,
    });

    return info;
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
}

async function sendPasswordResetEmail(email, resetLink) {
  const subject = 'Password Reset Request';
  const text = `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}\n\nThis link expires in 1 hour.`;
  const html = `
    <p>You requested a password reset.</p>
    <p>Click the link below to reset your password:</p>
    <p><a href="${resetLink}">${resetLink}</a></p>
    <p>This link expires in 1 hour.</p>
  `;

  return await sendEmail(email, subject, text, html);
}

module.exports = {
  sendEmail,
  sendPasswordResetEmail,
};
