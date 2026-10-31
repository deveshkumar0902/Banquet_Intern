import { Router } from 'express';
import { z } from 'zod';
import { adminAuth } from '../middleware/adminAuth.js';
import { validate } from '../middleware/validate.js';
import { buildWorkbook, EXPORT_TYPES, listRows } from '../services/exportService.js';

const querySchema = z.object({
  format: z.enum(['json', 'xlsx']).default('json'),
  from: z.iso.date().optional(),
  to: z.iso.date().optional(),
});

export function adminRouter({ db, config }) {
  const router = Router();
  router.use(adminAuth(config.ADMIN_TOKEN));

  for (const type of EXPORT_TYPES) {
    router.get(`/${type}`, validate(querySchema, 'query'), async (req, res) => {
      const { format, from, to } = req.validated;
      const rows = listRows(db, type, { from, to });
      if (format === 'json') return res.json({ count: rows.length, items: rows });
      const stamp = new Date().toISOString().slice(0, 10);
      res
        .type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        .attachment(`${type}-${stamp}.xlsx`)
        .send(await buildWorkbook(type, rows));
    });
  }
  return router;
}
