 const request = require('supertest');
    const app = require('../server');
    
    describe('GET /api/gallery', () => {
      it('should return 200 and an array of image URLs', async () => {
        const res = await request(app).get('/api/gallery');
        
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        
        res.body.forEach(url => {
          expect(url).toMatch(/^\/gallery\/.*\.(jpg|jpeg|png|gif)$/);
        });
      });
    });