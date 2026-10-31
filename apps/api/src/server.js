import { config as loadDotenv } from 'dotenv';
import nodemailer from 'nodemailer';
import { createApp } from './app.js';
import { loadConfig } from './config/env.js';
import { openDb } from './db/index.js';
import { createLogger } from './utils/logger.js';

loadDotenv({ quiet: true });

const config = loadConfig();
const logger = createLogger(config);
for (const w of config.warnings) logger.warn(w);

const db = openDb(config.DATABASE_PATH);

/** Real SMTP when configured; otherwise a JSON transport that logs each email. */
function createMailer() {
  if (config.SMTP_HOST) {
    return nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: config.SMTP_SECURE,
      auth: config.SMTP_USER ? { user: config.SMTP_USER, pass: config.SMTP_PASS } : undefined,
    });
  }
  const transport = nodemailer.createTransport({ jsonTransport: true });
  return {
    async sendMail(msg) {
      const info = await transport.sendMail(msg);
      const { to, subject, text } = JSON.parse(info.message);
      logger.info({ email: { to, subject, text } }, 'email (not sent: no SMTP_HOST)');
      return info;
    },
  };
}

const app = createApp({ config, db, mailer: createMailer(), logger });
const server = app.listen(config.PORT, () => {
  logger.info(`API listening on http://localhost:${config.PORT} (${config.NODE_ENV})`);
});

async function shutdown(signal) {
  logger.info(`${signal} received, shutting down`);
  server.close();
  await app.locals.flush();
  db.close();
  process.exit(0);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
