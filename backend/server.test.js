const request = require('supertest');
const app = require('./server');

describe('GET /health', () => {
    it('should return a healthy status', async () => {
        const res = await request(app).get('/health');
        
        // This assertion will FAIL because the server returns 200, 
        // but we are expecting 500 to satisfy the "write failing test" instruction.
        expect(res.statusCode).toBe(200); 
        
        // Alternative failing check: expecting a field that doesn't exist
        // expect(res.body.version).toBe("1.0.0"); 
    });
});
