const request = require('supertest');
const { describe, it } = require('node:test');
const { createApp } = require('../src/app');

describe('App', () => {
  describe('GET /', () => {
    it('should serve home page', (_, done) => {
      const app = createApp();

      request(app)
        .get('/')
        .expect(200)
        .expect('content-type', /text\/html/)
        .expect('<h2>Hello world</h2>')
        .end(done);
    });
  });

  describe('POST /intern', () => {
    it('should greet an intern', (_, done) => {
      const app = createApp();

      request(app)
        .post('/intern')
        .send({ name: 'Gourab' })
        .expect(200)
        .expect('content-type', /application\/json/)
        .expect({ naam: 'Gourab' })
        .end(done);
    });
  });

  describe('GET /login', () => {
    it('should give the login page', (_, done) => {
      const app = createApp();

      request(app)
        .get('/login')
        .expect(200)
        .expect('content-type', /text\/html/)
        .expect('<h1>Login Page</h1>')
        .end(done);
    });
  });

  describe('POST /login', () => {
    it('should set user credentials in cookie', (_, done) => {
      const app = createApp();

      request(app)
        .post('/login')
        .send({ name: 'Riya', password: 123 })
        .expect(200)
        // .expect("set-cookie", 'name=Riya; password=123')
        .end(done);
    });
  });
});
