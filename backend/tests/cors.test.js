const request = require('supertest');
    const app = require('../server');
    
    describe('CORS headers', () => {
      it('should return CORS headers on GET /health', async () => {
        const res = await request(app).get('/health');
        
        expect(res.headers['access-control-allow-origin']).toBeDefined();
      });
      
      it('should return CORS headers on POST /api/enquiries', async () => {
        const res = await request(app)
          .post('/api/enquiries')
          .send({
            name: 'Test',
            email: 'test@example.com',
            phone: '+155****4567',
            eventType: 'Wedding',
            eventDate: '2025-12-31',
            guests: 50,
            message: 'Test'
          });
        
        expect(res.headers['access-control-allow-origin']).toBeDefined();
      });
    });