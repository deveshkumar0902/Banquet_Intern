import pino from 'pino';

/**
 * @param {{ LOG_LEVEL: string, isProd: boolean, NODE_ENV: string }} config
 * @returns {import('pino').Logger}
 */
export function createLogger(config) {
  const pretty = !config.isProd && config.NODE_ENV !== 'test';
  return pino({
    level: config.LOG_LEVEL,
    ...(pretty && {
      transport: { target: 'pino-pretty', options: { translateTime: 'SYS:HH:MM:ss' } },
    }),
  });
}
