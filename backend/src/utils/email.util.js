import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { getDirname, resolveFrom } from "./path.util.js";

dotenv.config({});

const EMAIL_ENABLED = (process.env.EMAIL_ENABLED || "false").toLowerCase() === "true";
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = Number(process.env.EMAIL_PORT || 587);
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_FROM = process.env.EMAIL_FROM || "noreply@example.com";
const TEMPLATES_DIR = resolveFrom(getDirname(import.meta), "../templates");

let transporter = null;
if (EMAIL_ENABLED) {
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

export async function sendEmail({ to, subject, html }) {
  if (!EMAIL_ENABLED) {
    // eslint-disable-next-line no-console
    console.log("[email] Email disabled; skipping send", { to, subject });
    return;
  }
  if (!transporter) {
    throw new Error("Email transporter not configured");
  }

  await transporter.sendMail({
    from: EMAIL_FROM,
    to,
    subject,
    html,
  });
}

function loadTemplate(filename) {
  const template_path = path.join(TEMPLATES_DIR, filename);
  return fs.readFileSync(template_path, "utf8");
}

export async function sendPasswordResetEmail(to, resetUrl) {
  const html = loadTemplate("reset-password.html").replace(/{{reset_url}}/g, resetUrl);
  await sendEmail({
    to,
    subject: "Reset your password",
    html,
  });
}

export default {
  sendEmail,
  sendPasswordResetEmail,
};
