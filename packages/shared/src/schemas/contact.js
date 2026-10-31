import { z } from 'zod';
import { honeypotField, nameField, phoneField, requiredEmailField } from './fields.js';

export const contactSchema = z.strictObject({
  name: nameField,
  phone: phoneField,
  email: requiredEmailField,
  subject: z
    .string({ error: 'Please add a subject' })
    .trim()
    .min(2, 'Please add a subject')
    .max(150, 'Keep the subject under 150 characters'),
  message: z
    .string({ error: 'Please write a message' })
    .trim()
    .min(10, 'Please write at least 10 characters')
    .max(2000, 'Keep it under 2000 characters'),
  website: honeypotField,
});
