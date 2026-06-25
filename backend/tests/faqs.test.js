const request = require('supertest');
    const app = require('../server');
    
    describe('GET /api/faqs', () => {
      it('should return 200 and an array of FAQs', async () => {
        const res = await request(app).get('/api/faqs');
    
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    
        res.body.forEach(faq => {
          expect(faq).toHaveProperty('id');
          expect(faq).toHaveProperty('question');
          expect(faq).toHaveProperty('answer');
        });
      });
    });