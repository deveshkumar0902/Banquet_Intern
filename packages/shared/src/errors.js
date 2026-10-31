/**
 * Flattens a ZodError into `{ fieldName: firstMessage }`, the shape the API returns
 * and the forms map onto their inputs. Unknown keys are reported under their own name.
 * @param {import('zod').ZodError} error
 * @returns {Record<string, string>}
 */
export function fieldErrors(error) {
  /** @type {Record<string, string>} */
  const fields = {};
  for (const issue of error.issues) {
    if (issue.code === 'unrecognized_keys') {
      for (const key of issue.keys) fields[key] ??= 'Unknown field';
      continue;
    }
    const key = issue.path.join('.') || '_form';
    fields[key] ??= issue.message;
  }
  return fields;
}
