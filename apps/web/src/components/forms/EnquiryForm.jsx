import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { EVENT_TYPES, GUESTS, enquirySchema, todayInIndia } from '@banquet/shared';
import venues from '../../content/venues.json';
import { ErrorSummary, SuccessPanel } from './FormAlert.jsx';
import { FormField, Honeypot } from './FormField.jsx';
import { SubmitButton } from './SubmitButton.jsx';
import { useSubmit } from './useSubmit.js';

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  eventType: '',
  eventDate: '',
  guests: '',
  venue: '',
  message: '',
  website: '',
};

const eventOptions = [
  { value: '', label: 'Choose an event' },
  ...EVENT_TYPES.map((t) => ({ value: t, label: t })),
];
const venueOptions = [
  { value: '', label: 'No preference' },
  ...venues.map((v) => ({ value: v.slug, label: v.name })),
];

/**
 * Booking enquiry form. Validation comes from the same Zod schema the API uses, so the
 * payload always has exactly the fields the server expects.
 * @param {{ defaultValues?: Partial<typeof EMPTY>, variant?: 'card' | 'inline', idPrefix?: string }} props
 */
export function EnquiryForm({ defaultValues, variant = 'inline', idPrefix = 'enquiry' }) {
  const { pathname } = useLocation();
  const [sentTo, setSentTo] = useState(null);
  const initial = { ...EMPTY, ...defaultValues };
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(enquirySchema), defaultValues: initial, mode: 'onTouched' });

  const { submit, onInvalid, failure } = useSubmit({
    path: '/api/enquiries',
    setError,
    onSuccess: (values) => {
      setSentTo(values.name);
      toast.success('Enquiry sent. We’ll be in touch soon.');
      reset(initial);
    },
  });

  if (sentTo) {
    return (
      <SuccessPanel
        title={`Thank you, ${sentTo}.`}
        resetText="Send another enquiry"
        onReset={() => setSentTo(null)}
      >
        We’ll call you within 24 hours.
      </SuccessPanel>
    );
  }

  const field = { register, idPrefix };
  return (
    <div className="@container">
      <form
        noValidate
        onSubmit={handleSubmit((values) => submit({ ...values, sourcePage: pathname }), onInvalid)}
        className="relative grid gap-4 @md:grid-cols-2"
        aria-label="Enquiry form"
      >
        <FormField
          {...field}
          name="name"
          label="Your name"
          required
          autoComplete="name"
          error={errors.name}
        />
        <FormField
          {...field}
          name="phone"
          label="Phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          error={errors.phone}
        />
        <FormField
          {...field}
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email}
          className="@md:col-span-2"
        />
        <FormField
          {...field}
          as="select"
          name="eventType"
          label="Event type"
          required
          options={eventOptions}
          error={errors.eventType}
        />
        <FormField
          {...field}
          name="eventDate"
          label="Event date"
          type="date"
          required
          min={todayInIndia()}
          error={errors.eventDate}
        />
        <FormField
          {...field}
          name="guests"
          label="Guests"
          type="number"
          required
          inputMode="numeric"
          min={GUESTS.min}
          max={GUESTS.max}
          error={errors.guests}
        />
        <FormField
          {...field}
          as="select"
          name="venue"
          label="Preferred venue"
          options={venueOptions}
          error={errors.venue}
        />
        <FormField
          {...field}
          as="textarea"
          name="message"
          label="Anything else?"
          rows={variant === 'card' ? 2 : 4}
          error={errors.message}
          className="@md:col-span-2"
        />
        <Honeypot register={register} />
        <div className="space-y-3 @md:col-span-2">
          <ErrorSummary message={failure} />
          <SubmitButton pending={isSubmitting} className="w-full">
            Send enquiry
          </SubmitButton>
          <p className="text-center text-xs text-ink-600">
            We only use your details to reply to this enquiry.
          </p>
        </div>
      </form>
    </div>
  );
}
