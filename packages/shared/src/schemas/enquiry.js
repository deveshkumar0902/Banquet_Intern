import { z } from 'zod';
import { EVENT_TYPES, GUESTS, todayInIndia } from '../constants.js';
import {
  honeypotField,
  nameField,
  optionalEmailField,
  optionalText,
  phoneField,
} from './fields.js';

export const enquirySchema = z.strictObject({
  name: nameField,
  phone: phoneField,
  email: optionalEmailField,
  eventType: z.enum(EVENT_TYPES, { error: 'Please choose an event type' }),
  eventDate: z.iso
    .date({ error: 'Please choose your event date' })
    .refine((d) => d >= todayInIndia(), 'Please choose today or a future date'),
  guests: z.coerce
    .number({ error: 'Please enter the number of guests' })
    .int('Please enter a whole number')
    .min(GUESTS.min, `Minimum ${GUESTS.min} guests`)
    .max(GUESTS.max, `For more than ${GUESTS.max} guests, please call us`),
  venue: optionalText(60),
  message: optionalText(1000),
  sourcePage: optionalText(200),
  website: honeypotField,
});
