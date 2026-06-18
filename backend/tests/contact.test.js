// backend/tests/contact.test.js
// Mock the mail module before we import the server so the fake transporter is used
jest.mock('../mail', () => ({
  // Each test will get a fresh mock function
  sendMail: jest.fn().mockResolvedValue(),
}));

const request = require('supertest');
const app = require('../server');

describe('POST /api/contact', () => {
  // Reset the mock between tests so each test starts clean
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 when required fields are missing', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({}) // empty body — all fields missing
      .expect(400)
      .expect('Content-Type', /json/);

    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('Validation failed');
    expect(res.body.details).toBeDefined();
    // Should list 4 missing required fields: name, email, phone, subject
    expect(res.body.details.length).toBeGreaterThanOrEqual(4);
  });

  it('should return 400 when email is invalid', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'Rohil Test',
        email: 'not-an-email',
        phone: '+15551234567',
        subject: 'General Inquiry',
        message: 'Just saying hi!'
      })
      .expect(400)
      .expect('Content-Type', /json/);

    expect(res.body.status).toBe('error');
    expect(res.body.details[0]).toContain('email');
  });

  it('should return 201 and send email when all fields are valid', async () => {
    const { sendMail } = require('../mail');

    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'Rohil Test',
        email: 'rohil@example.com',
        phone: '+15551234567',
        subject: 'General Inquiry',
        message: 'Looking forward to hearing from you!'
      })
      .expect(201)
      .expect('Content-Type', /json/);

    // ---- Basic response sanity check ----
    expect(res.body).toEqual({
      status: 'success',
      message: 'Contact received and email sent.'
    });

    // ---- Verify that sendMail was called exactly once ----
    expect(sendMail).toHaveBeenCalledTimes(1);
    const mailOptions = sendMail.mock.calls[0][0]; // first argument of sendMail

    // ---- Check that the email has the expected properties ----
    expect(mailOptions).toHaveProperty('html');
    expect(typeof mailOptions.html).toBe('string');

    // The template uses {{name}}, {{eventType}} (mapped from subject), etc.
    expect(mailOptions.html).toContain('Hello Rohil Test,');
    expect(mailOptions.html).toContain('General Inquiry');  // subject mapped to eventType
    expect(mailOptions.html).toContain('rohil@example.com');
    expect(mailOptions.html).toContain('+15551234567');
    expect(mailOptions.html).toContain('Looking forward to hearing from you!');

    // ---- Check the email subject line ----
    expect(mailOptions.subject).toContain('Contact Form Submission');
    expect(mailOptions.subject).toContain('General Inquiry');
  });

  it('should accept contact without a message field', async () => {
    const { sendMail } = require('../mail');

    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'No Message',
        email: 'nomsg@example.com',
        phone: '+15559876543',
        subject: 'Quick Question'
        // no 'message' field
      })
      .expect(201)
      .expect('Content-Type', /json/);

    expect(res.body.status).toBe('success');
    expect(sendMail).toHaveBeenCalledTimes(1);
  });
});