const request = require('supertest')
const { server, closeServer } = require('./server')

describe('POST /health', () => {
    afterAll(() => {
        closeServer(); 
    });

    it('should respond with json containing uptime', async () => {
        const response = await request(server).post('/health').send({ uptime: true });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('uptime');
        expect(typeof response.body.uptime.value).toBe('number');
        expect(response.body.uptime.metric).toBe('seconds');
    }); 

    it('should respond with json containing cpuload', async () => {
        const response = await request(server).post('/health').send({ cpuload: true });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('cpuload');
        expect(typeof response.body.cpuload.value).toBe('number');
        expect(response.body.cpuload.metric).toBe('percentage');
    });

    it('should respond with json containing diskspace', async () => {
        const response = await request(server).post('/health').send({ diskspace: true });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('diskspace');
        expect(typeof response.body.diskspace.total.value).toBe('number');
        expect(response.body.diskspace.total.metric).toBe('GB');
        expect(typeof response.body.diskspace.used.value).toBe('number');
        expect(response.body.diskspace.used.metric).toBe('GB');
        expect(typeof response.body.diskspace.free.value).toBe('number');
        expect(response.body.diskspace.free.metric).toBe('GB');
    });

    it('should respond with json containing memoryusage', async () => {
        const response = await request(server).post('/health').send({ memoryusage: true });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('memoryusage');
        expect(typeof response.body.memoryusage.rss.value).toBe('number');
        expect(response.body.memoryusage.rss.metric).toBe('MB');
        expect(typeof response.body.memoryusage.heapTotal.value).toBe('number');
        expect(response.body.memoryusage.heapTotal.metric).toBe('MB');
        expect(typeof response.body.memoryusage.heapUsed.value).toBe('number');
        expect(response.body.memoryusage.heapUsed.metric).toBe('MB');
        expect(typeof response.body.memoryusage.external.value).toBe('number');
        expect(response.body.memoryusage.external.metric).toBe('MB');
    });
});
