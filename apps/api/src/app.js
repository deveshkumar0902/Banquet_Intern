import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';
import { contactSchema, enquirySchema } from '@banquet/shared';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import { adminRouter } from './routes/admin.js';
import { healthRouter } from './routes/health.js';
import { submissionRouter } from './routes/submissions.js';
import { createContactService } from './services/contactService.js';
import { createEnquiryService } from './services/enquiryService.js';
import { createMailService } from './services/mailService.js';

/**
 * Builds the Express app. Everything it talks to is passed in, so tests use an in-memory
 * database and a fake mailer instead of module mocks.
 * @param {{ config: ReturnType<typeof import('./config/env.js').loadConfig>,
 *   db: import('better-sqlite3').Database,
 *   mailer: { sendMail: (msg: object) => Promise<unknown> },
 *   logger: import('pino').Logger }} deps
 */
export function createApp({ config, db, mailer, logger }) {
  const app = express();

  // Emails are sent after the response. Track them so tests (and shutdown) can wait.
  const background = new Set();
  const runInBackground = (task) => {
    const p = Promise.resolve(task)
      .catch((err) => logger.error({ err }, 'background task failed'))
      .finally(() => background.delete(p));
    background.add(p);
  };
  app.locals.flush = () => Promise.allSettled([...background]);

  const mail = createMailService({ transport: mailer, config, logger });

  app.set('trust proxy', config.TRUST_PROXY);
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(
    pinoHttp({
      logger,
      redact: ['req.headers.authorization', 'req.body.phone', 'req.body.email'],
      autoLogging: { ignore: (req) => req.url === '/api/health' },
    }),
  );
  app.use(
    cors({
      origin: (origin, cb) => cb(null, Boolean(origin) && config.CORS_ORIGINS.includes(origin)),
      methods: ['GET', 'POST'],
    }),
  );
  app.use(express.json({ limit: '20kb' }));

  app.use('/api/health', healthRouter({ db }));
  app.use(
    '/api/enquiries',
    submissionRouter({
      schema: enquirySchema,
      service: createEnquiryService({ db, mail }),
      successMessage: "Thank you! We've received your enquiry and will call you within 24 hours.",
      rateLimitMax: config.RATE_LIMIT_MAX,
      runInBackground,
    }),
  );
  app.use(
    '/api/contact',
    submissionRouter({
      schema: contactSchema,
      service: createContactService({ db, mail }),
      successMessage: "Thank you for your message. We'll get back to you soon.",
      rateLimitMax: config.RATE_LIMIT_MAX,
      runInBackground,
    }),
  );
  app.use('/api/admin', adminRouter({ db, config }));

  app.use(notFound);
  app.use(errorHandler(config));
  return app;
}
