import { Router } from 'express';
import { formLimiter } from '../middleware/rateLimits.js';
import { validate } from '../middleware/validate.js';
import { hashIp } from '../utils/ipHash.js';

/**
 * Shared shape of the two form endpoints: rate limit → honeypot → validate → store →
 * respond 201 → send emails in the background.
 * @param {{ schema: import('zod').ZodType, service: { create: Function, notify: Function },
 *   successMessage: string, rateLimitMax: number, runInBackground: (task: Promise<unknown>) => void }} opts
 */
export function submissionRouter({
  schema,
  service,
  successMessage,
  rateLimitMax,
  runInBackground,
}) {
  const router = Router();

  router.post(
    '/',
    formLimiter(rateLimitMax),
    (req, res, next) => {
      // Bots fill every field. Pretend it worked so they don't adapt, but store nothing.
      if (typeof req.body?.website === 'string' && req.body.website.trim() !== '') {
        req.log?.warn('honeypot triggered');
        return res.status(201).json({ message: successMessage });
      }
      next();
    },
    validate(schema),
    (req, res) => {
      const { website: _honeypot, ...data } = req.validated;
      const id = service.create(data, { ipHash: hashIp(req.ip) });
      res.status(201).json({ id, message: successMessage });
      runInBackground(service.notify(id, data));
    },
  );

  return router;
}
