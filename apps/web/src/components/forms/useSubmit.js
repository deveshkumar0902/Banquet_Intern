import { useState } from 'react';
import { toast } from 'sonner';
import { postJson } from '../../lib/api.js';

/**
 * Shared submit flow for both forms: POST, map server field errors onto the inputs,
 * toast on rate limits and network failures.
 * @param {{ path: string, setError: Function, onSuccess: (values: object) => void }} opts
 */
export function useSubmit({ path, setError, onSuccess }) {
  const [failure, setFailure] = useState(null);

  async function submit(values) {
    setFailure(null);
    try {
      await postJson(path, values);
      onSuccess(values);
    } catch (err) {
      if (err.code === 'VALIDATION_ERROR' && err.fields) {
        Object.entries(err.fields).forEach(([field, message], i) =>
          setError(field, { type: 'server', message }, { shouldFocus: i === 0 }),
        );
        setFailure('Please check the highlighted fields.');
        return;
      }
      const message =
        err.code === 'RATE_LIMITED'
          ? 'You have sent several requests in a short time. Please wait a few minutes, or contact us directly.'
          : 'We couldn’t send your request right now. Please try again, or contact us directly.';
      setFailure(message);
      toast.error(message);
    }
  }

  /** Client-side validation failed: announce it (fields show their own messages). */
  const onInvalid = () => setFailure('Please check the highlighted fields.');

  return { submit, onInvalid, failure };
}
