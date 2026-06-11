// backend/tests/enquiry.test.js
    // Mock the mail module before we import the server so the fake transporter is used
    jest.mock('../mail', () => ({
      // Each test will get a fresh mock function
      sendMail: jest.fn().mockResolvedValue(),
    }));
    
    const request = require('supertest');
    const app = require('../server'); // adjust if your entry point is different
    
    describe('POST /enquiry (email template)', () => {
      // Reset the mock between tests so each test starts clean
      afterEach(() => {
        jest.clearAllMocks();
      });
    
      it('should render the email template with the submitted name', async () => {
        // Get a reference to the mocked sendMail so we can inspect calls later
        const { sendMail } = require('../mail');
    
        const res = await request(app)
          .post('/api/enquiries')          // note the '/api' prefix from server.js
          .send({
            name: 'Rohil Test',
            email: 'rohil@example.com',
            phone: '+155****4567',
            eventType: 'Wedding',
            eventDate: '2025-12-31',
            guests: 120,
            message: 'Looking forward to it!'
          })
          .expect(201)                     // your route returns 201 on success
          .expect('Content-Type', /json/);
    
        // ---- Basic response sanity check ----
        expect(res.body).toEqual({
          status: 'success',
          message: 'Enquiry received and email sent.'
        });
    
        // ---- Verify that sendMail was called exactly once ----
        expect(sendMail).toHaveBeenCalledTimes(1);
        const mailOptions = sendMail.mock.calls[0][0]; // first argument of sendMail
    
        // ---- Check that the HTML body contains the expected placeholders ----
        expect(mailOptions).toHaveProperty('html');
        expect(typeof mailOptions.html).toBe('string');
    
        // The template uses {{name}}, {{eventType}}, etc.
        expect(mailOptions.html).toContain('Hello Rohil Test,');
        expect(mailOptions.html).toContain('Wedding');
        expect(mailOptions.html).toContain('120');   // guests
        expect(mailOptions.html).toContain('rohil@example.com'); // email
        expect(mailOptions.html).toContain('Looking forward to it!'); // message
    
        // You can add more assertions for other placeholders if you wish.
      });
    });