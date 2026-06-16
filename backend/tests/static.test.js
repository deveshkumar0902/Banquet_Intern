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
          expect(service).toHaveProperty('tagline');
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
          expect(service).toHaveProperty('tagline');
        });
      });
    });

    describe('GET /api/venues', () => {
      it('should return 200 and an array of venues', async () => {
        const res = await request(app).get('/api/venues');
        
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        
        res.body.forEach(venue => {
          expect(venue).toHaveProperty('id');
          expect(venue).toHaveProperty('name');
          expect(venue).toHaveProperty('capacity');
          expect(venue).toHaveProperty('features');
          expect(Array.isArray(venue.features)).toBe(true);
        });
      });
    });

    describe('GET /api/packages', () => {
      it('should return 200 and an array of packages', async () => {
        const res = await request(app).get('/api/packages');
        
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        
        res.body.forEach(pkg => {
          expect(pkg).toHaveProperty('id');
          expect(pkg).toHaveProperty('name');
          expect(pkg).toHaveProperty('price');
          expect(pkg).toHaveProperty('currency');
          expect(pkg).toHaveProperty('inclusions');
          expect(Array.isArray(pkg.inclusions)).toBe(true);
        });
      });
    });

    describe('GET /api/testimonials', () => {
      it('should return 200 and an array of testimonials', async () => {
        const res = await request(app).get('/api/testimonials');
        
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        
        res.body.forEach(t => {
          expect(t).toHaveProperty('id');
          expect(t).toHaveProperty('name');
          expect(t).toHaveProperty('quote');
          expect(t).toHaveProperty('rating');
        });
      });
    });

    describe('GET /api/stats', () => {
      it('should return 200 and a stats object with numeric values', async () => {
        const res = await request(app).get('/api/stats');
        
        expect(res.statusCode).toBe(200);
        expect(typeof res.body).toBe('object');
        expect(res.body).toHaveProperty('eventsHosted');
        expect(res.body).toHaveProperty('guestsServed');
        expect(res.body).toHaveProperty('weddingsConducted');
        expect(res.body).toHaveProperty('yearsInBusiness');
        expect(typeof res.body.eventsHosted).toBe('number');
        expect(typeof res.body.yearsInBusiness).toBe('number');
      });
    });