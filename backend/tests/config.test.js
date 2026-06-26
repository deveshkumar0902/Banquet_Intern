const ORIGINAL_ENV = process.env;
    
    beforeEach(() => {
      jest.resetModules();
      process.env = { ...ORIGINAL_ENV };
    });
    
    afterAll(() => {
      process.env = ORIGINAL_ENV;
    });
    
    describe('Environment Configuration', () => {
      it('should load and validate config when all required vars are present', () => {
        // STEP 1: Set env vars on process.env (the real thing)
        process.env.CORS_ORIGIN = 'http://localhost:5173';
        process.env.SMTP_HOST = 'smtp.mailtrap.io';
        process.env.SMTP_PORT = '2525';
        process.env.SMTP_USER = 'testuser';
        process.env.SMTP_PASS = 'testpass';
        process.env.FROM_EMAIL = 'test@example.com';
    
        // STEP 2: Now load config (it reads process.env internally)
        const config = require('../config');
    
        // STEP 3: Assert using config.* (typed, validated values)
        expect(config.PORT).toBe(5000);
        expect(config.CORS_ORIGIN).toBe('http://localhost:5173');
        expect(config.SMTP_PORT).toBe(2525);  // number, not string!
      });
      // ...second test same pattern...
    });