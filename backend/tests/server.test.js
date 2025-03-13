const request = require('supertest');
const app = require('../server');

describe('GET /api/hello', () => {
    it('should return Hello, World!', async () => {
        const res = await request(app).get('/api/hello');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Hello, World!');
    });
});
