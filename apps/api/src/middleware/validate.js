import { fieldErrors } from '@banquet/shared';
import { HttpError } from './httpError.js';

/**
 * Validates `req[source]` with a Zod schema and stores the parsed value on `req.validated`.
 * @param {import('zod').ZodType} schema
 * @param {'body' | 'query'} [source]
 */
export const validate =
  (schema, source = 'body') =>
  (req, _res, next) => {
    const result = schema.safeParse(req[source] ?? {});
    if (!result.success) {
      throw new HttpError(
        400,
        'VALIDATION_ERROR',
        'Please check the highlighted fields.',
        fieldErrors(result.error),
      );
    }
    req.validated = result.data;
    next();
  };
