const request = require('supertest');
    const app = require('../server');
    
    describe('GET /api/services', () => {
      it('should return 200 and an array of services', async () => {
        const res = await request(app).get('/api/services');
        
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        
        res.body.forEach(service => {
          expect(service).toHaveProperty('id');
          expect(service).toHaveProperty('title');
          expect(service).toHaveProperty('description');
        });
      });
    });
    
    describe('GET /api/services', () => {
      it('should return 200 and an array of services', async () => {
        const res = await request(app).get('/api/services');
        
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        
        // Check that each service has required fields
        res.body.forEach(service => {
          expect(service).toHaveProperty('id');
          expect(service).toHaveProperty('title');
          expect(service).toHaveProperty('description');
        });
      });
    });