import { Router } from 'express';

export function healthRouter({ db }) {
  const router = Router();
  router.get('/', (_req, res) => {
    let dbStatus = 'ok';
    try {
      db.prepare('SELECT 1').get();
    } catch {
      dbStatus = 'error';
    }
    res.status(dbStatus === 'ok' ? 200 : 503).json({
      status: dbStatus === 'ok' ? 'ok' : 'error',
      db: dbStatus,
      uptime: Math.round(process.uptime()),
    });
  });
  return router;
}
