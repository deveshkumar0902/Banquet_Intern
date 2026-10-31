import { rateLimit } from 'express-rate-limit';

/** One limiter per form endpoint: `max` submissions per 15 minutes per IP. */
export const formLimiter = (max) =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: max,
    standardHeaders: 'draft-6',
    legacyHeaders: false,
    handler: (_req, res) =>
      res.status(429).json({
        error: {
          code: 'RATE_LIMITED',
          message: 'Too many submissions. Please wait a few minutes or call us directly.',
        },
      }),
  });
