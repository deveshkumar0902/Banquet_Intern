import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { enquirySchema, todayInIndia } from '@banquet/shared';
import { ContactForm } from '../src/components/forms/ContactForm.jsx';
import { EnquiryForm } from '../src/components/forms/EnquiryForm.jsx';
import { ApiError } from '../src/lib/api.js';
import ContactPage from '../src/pages/ContactPage.jsx';
import { renderWithRouter } from './utils.jsx';

vi.mock('../src/lib/api.js', async (importOriginal) => ({
  ...(await importOriginal()),
  postJson: vi.fn(),
}));
const { postJson } = await import('../src/lib/api.js');

beforeEach(() => {
  postJson.mockReset();
  postJson.mockResolvedValue({ id: 1, message: 'ok' });
});

const futureDate = () => {
  const d = new Date(`${todayInIndia()}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 20);
  return d.toISOString().slice(0, 10);
};

async function fillEnquiry(user) {
  await user.type(screen.getByLabelText(/Your name/), 'Asha Verma');
  await user.type(screen.getByLabelText(/^Phone/), '98765 43210');
  await user.selectOptions(screen.getByLabelText(/Event type/), 'Reception');
  await user.type(screen.getByLabelText(/Event date/), futureDate());
  await user.type(screen.getByLabelText(/Guests/), '200');
}

describe('EnquiryForm', () => {
  it('shows required errors, focuses the first invalid field and sends nothing', async () => {
    const user = userEvent.setup();
    renderWithRouter(<EnquiryForm />);
    await user.click(screen.getByRole('button', { name: 'Send enquiry' }));
    expect(await screen.findByText('Please enter your name')).toBeInTheDocument();
    expect(screen.getByText('Please choose an event type')).toBeInTheDocument();
    expect(screen.getByLabelText(/Your name/)).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText(/Your name/)).toHaveFocus();
    expect(screen.getByRole('alert')).toHaveTextContent('Please check the highlighted fields.');
    expect(postJson).not.toHaveBeenCalled();
  });

  // Regression for audit bug #1: payload must match the shared schema exactly.
  it('submits exactly the shared-schema keys (eventDate, never eventName)', async () => {
    const user = userEvent.setup();
    renderWithRouter(<EnquiryForm />, { route: '/venues' });
    await fillEnquiry(user);
    await user.click(screen.getByRole('button', { name: 'Send enquiry' }));
    await waitFor(() => expect(postJson).toHaveBeenCalledTimes(1));

    const [path, payload] = postJson.mock.calls[0];
    expect(path).toBe('/api/enquiries');
    expect(payload).not.toHaveProperty('eventName');
    expect(payload).toMatchObject({
      name: 'Asha Verma',
      phone: '9876543210',
      eventType: 'Reception',
      eventDate: futureDate(),
      guests: 200,
      sourcePage: '/venues',
    });
    const allowed = Object.keys(enquirySchema.shape);
    expect(Object.keys(payload).every((k) => allowed.includes(k))).toBe(true);
    expect(enquirySchema.safeParse(payload).success).toBe(true);
  });

  it('shows the success panel and resets the form', async () => {
    const user = userEvent.setup();
    renderWithRouter(<EnquiryForm />);
    await fillEnquiry(user);
    await user.click(screen.getByRole('button', { name: 'Send enquiry' }));
    expect(await screen.findByText('Thank you, Asha Verma.')).toBeInTheDocument();
    expect(screen.getByText(/call you within 24 hours/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Send another enquiry' }));
    expect(screen.getByLabelText(/Your name/)).toHaveValue('');
  });

  it('puts server field errors under the right inputs', async () => {
    postJson.mockRejectedValue(
      new ApiError('Bad', {
        status: 400,
        code: 'VALIDATION_ERROR',
        fields: { phone: 'Server says no' },
      }),
    );
    const user = userEvent.setup();
    renderWithRouter(<EnquiryForm />);
    await fillEnquiry(user);
    await user.click(screen.getByRole('button', { name: 'Send enquiry' }));
    const phone = screen.getByLabelText(/^Phone/);
    expect(await screen.findByText('Server says no')).toHaveAttribute(
      'id',
      phone.getAttribute('aria-describedby'),
    );
    expect(phone).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows a friendly message on rate limiting', async () => {
    postJson.mockRejectedValue(new ApiError('Too many', { status: 429, code: 'RATE_LIMITED' }));
    const user = userEvent.setup();
    renderWithRouter(<EnquiryForm />);
    await fillEnquiry(user);
    await user.click(screen.getByRole('button', { name: 'Send enquiry' }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/wait a few minutes/);
  });

  it('pre-fills the event type from ?event= on the contact page', async () => {
    renderWithRouter(
      <Routes>
        <Route path="/contact" element={<ContactPage />} />
      </Routes>,
      { route: '/contact?event=Corporate%20Event' },
    );
    const select = await screen.findByLabelText(/Event type/, { selector: '#enquiry-eventType' });
    expect(select).toHaveValue('Corporate Event');
  });

  it('ignores an unknown ?event= value', async () => {
    renderWithRouter(
      <Routes>
        <Route path="/contact" element={<ContactPage />} />
      </Routes>,
      { route: '/contact?event=Rave' },
    );
    expect(
      await screen.findByLabelText(/Event type/, { selector: '#enquiry-eventType' }),
    ).toHaveValue('');
  });
});

describe('ContactForm', () => {
  it('submits a valid message', async () => {
    const user = userEvent.setup();
    renderWithRouter(<ContactForm />);
    await user.type(screen.getByLabelText(/Your name/), 'Ravi Kumar');
    await user.type(screen.getByLabelText(/^Phone/), '9876543210');
    await user.type(screen.getByLabelText(/^Email/), 'ravi@example.com');
    await user.type(screen.getByLabelText(/Subject/), 'Site visit');
    await user.type(screen.getByLabelText(/Message/), 'Can we visit on Saturday?');
    await user.click(screen.getByRole('button', { name: 'Send message' }));
    await waitFor(() =>
      expect(postJson).toHaveBeenCalledWith(
        '/api/contact',
        expect.objectContaining({ subject: 'Site visit' }),
      ),
    );
    expect(await screen.findByText('Thank you, Ravi Kumar.')).toBeInTheDocument();
  });

  it('requires an email', async () => {
    const user = userEvent.setup();
    renderWithRouter(<ContactForm />);
    await user.click(screen.getByRole('button', { name: 'Send message' }));
    expect(await screen.findByText('Please enter your email address')).toBeInTheDocument();
  });
});
