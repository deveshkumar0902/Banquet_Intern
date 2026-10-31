import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@banquet/shared';
import { ErrorSummary, SuccessPanel } from './FormAlert.jsx';
import { FormField, Honeypot } from './FormField.jsx';
import { SubmitButton } from './SubmitButton.jsx';
import { useSubmit } from './useSubmit.js';

const EMPTY = { name: '', phone: '', email: '', subject: '', message: '', website: '' };

/** General questions (not bookings). Same shared-schema approach as EnquiryForm. */
export function ContactForm({ idPrefix = 'contact' }) {
  const [sentTo, setSentTo] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(contactSchema), defaultValues: EMPTY, mode: 'onTouched' });

  const { submit, onInvalid, failure } = useSubmit({
    path: '/api/contact',
    setError,
    onSuccess: (values) => {
      setSentTo(values.name);
      toast.success('Message sent. Thank you!');
      reset(EMPTY);
    },
  });

  if (sentTo) {
    return (
      <SuccessPanel
        title={`Thank you, ${sentTo}.`}
        resetText="Send another message"
        onReset={() => setSentTo(null)}
      >
        We’ve received your message and will reply soon.
      </SuccessPanel>
    );
  }

  const field = { register, idPrefix };
  return (
    <form
      noValidate
      onSubmit={handleSubmit(submit, onInvalid)}
      className="relative grid gap-4 sm:grid-cols-2"
      aria-label="Contact form"
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
        error={errors.phone}
      />
      <FormField
        {...field}
        name="email"
        label="Email"
        type="email"
        required
        autoComplete="email"
        error={errors.email}
        className="sm:col-span-2"
      />
      <FormField
        {...field}
        name="subject"
        label="Subject"
        required
        error={errors.subject}
        className="sm:col-span-2"
      />
      <FormField
        {...field}
        as="textarea"
        name="message"
        label="Message"
        required
        error={errors.message}
        className="sm:col-span-2"
      />
      <Honeypot register={register} />
      <div className="space-y-3 sm:col-span-2">
        <ErrorSummary message={failure} />
        <SubmitButton pending={isSubmitting} className="w-full sm:w-auto">
          Send message
        </SubmitButton>
      </div>
    </form>
  );
}
