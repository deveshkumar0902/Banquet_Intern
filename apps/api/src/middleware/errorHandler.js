import { HttpError } from './httpError.js';

/** Turns any thrown error into `{ error: { code, message, fields? } }`. Never leaks stacks in production. */
export const errorHandler =
  ({ isProd }) =>
  // Express recognises error handlers by their four arguments.
  (err, req, res, _next) => {
    if (err instanceof HttpError) {
      return res.status(err.status).json({
        error: { code: err.code, message: err.message, ...(err.fields && { fields: err.fields }) },
      });
    }
    if (err.type === 'entity.parse.failed') {
      return res
        .status(400)
        .json({ error: { code: 'INVALID_JSON', message: 'Request body is not valid JSON.' } });
    }
    if (err.type === 'entity.too.large') {
      return res
        .status(413)
        .json({ error: { code: 'PAYLOAD_TOO_LARGE', message: 'Request body is too large.' } });
    }
    req.log?.error({ err }, 'unhandled error');
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: isProd ? 'Something went wrong. Please try again.' : String(err.message),
      },
    });
  };
