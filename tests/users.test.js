const request = require('supertest');
const app = require('../app');

// LOGIN
describe('Test Endpoint POST /login', () => {

  // SUCCESS
  it('Test Login - Success', (done) => {
    request(app)
    .post('/loginAdmin')
    .send({
      email: "admin@mail.com",
      password: "1234"
    })
    .then((res) => {
      const {body, status} = res;
      expect(status).toBe(200);
      expect(body).toHaveProperty('id', expect.any(Number));
      expect(body).toHaveProperty('email', 'admin@mail.com');
      expect(body).toHaveProperty('access_token', expect.any(String));
      done();
    })
    .catch((err) => {
      console.log(err);
      done(err);
    })
  })

  // FAILED
  it('Test Login - Invalid Password', (done) => {
    request(app)
    .post('/loginAdmin')
    .send({
      // Email Ada & Password Salah
      email: "admin@mail.com",
      password: 'aiueo'
    })
    .then((res) => {
      const {body, status} = res;
      expect(status).toBe(401);
      expect(body).toHaveProperty('msg', 'Invalid email or password!');
      done();
    })
    .catch((err) => {
      console.log(err);
      done(err);
    })
  })

  it('Test Login - Invalid User No Data', (done) => {
    request(app)
    .post('/loginAdmin')
    .send({
      // Email Tidak Ada
      email: 'tidakada@mail.com',
      password: 'tidakada'
    })
    .then((res) => {
      const {body, status} = res;
      expect(status).toBe(401);
      expect(body).toHaveProperty('msg', 'Authentication failed!');
      done();
    })
    .catch((err) => {
      console.log(err);
      done(err);
    })
  })

  it('Test Login - Invalid Email and Password Empty', (done) => {
    request(app)
    .post('/loginAdmin')
    .send({
      // Email & Password Kosong
      email: '',
      password: ''
    })
    .then((res) => {
      const {body, status} = res;
      expect(status).toBe(401);
      expect(body).toHaveProperty('msg', 'Authentication failed!');
      done();
    })
    .catch((err) => {
      console.log(err);
      done(err);
    })
  })

});