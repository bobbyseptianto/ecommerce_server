const request = require('supertest');
const app = require('../app');
// const {sequelize} = require("../models/index");
// const {queryInterface} = sequelize;

// // Lifecycle
// afterAll((done) => {
//   queryInterface.bulkDelete("Categories")
//   .then((result) => {
//     done();
//   })
//   .catch((err) => {
//     done(err);
//   });
// });

// Butuh Access Token => Generate di beforeAll
let access_token = '';
beforeAll(async (done) => {
  request(app)
  .post('/loginAdmin')
  .send({
    email: "admin@mail.com",
    password: "1234"
  })
  .then((res) => {
    access_token = res.body.access_token; // Save the access_token!
    done();
  })
  .catch((err) => {
    console.log(err);
    done(err);
  })
});

let id = '';

// CREATE
describe('Test Endpoint POST /categories', () => {

    // SUCCESS
    it('Test Create Category - Success', (done) => {
      request(app)
      .post('/categories')
      .set('access_token', access_token)
      .send({
        name: 'Ruang Makan'
      })
      .then((res) => {
        const {body, status} = res;
        id = res.body.id;
        expect(status).toBe(201);
        expect(body).toHaveProperty('id', expect.any(Number));
        expect(body).toHaveProperty('name', "Ruang Makan");
        expect(body).toHaveProperty('UserId', expect.any(Number));
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      })
    })

    // FAILED
    it('Test Create Category - Access Token Not Being Sent', (done) => {
      request(app)
      .post('/categories')
      .send({
        name: 'Ruang Makan'
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

    it('Test Create Category - Access Token Not Belong To Admin', (done) => {
      request(app)
      .post('/categories')
      .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsImlhdCI6MTYwNDkzNTcyOH0.XtetzO9tbJPvx7mMSx6kkUewmPKthYmUU31jzNiTb_8')
      .send({
        name: 'Ruang Makan'
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

    it('Test Create Category - Empty Required Fields', (done) => {
      request(app)
      .post('/categories')
      .set('access_token', access_token)
      .send({
        name: ''
      })
      .then((res) => {
        const {body, status} = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty('msg', 'Category name is required!');
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      })
    })

});

// DELETE
describe('Test Endpoint DELETE /categories/:id', () => {

  // SUCCESS
  it('Test Delete Category - Success', (done) => {
    request(app)
    .delete(`/categories/${id}`) // ID -> Lihat DB
    .set('access_token', access_token)
    .then((res) => {
      const {body, status} = res;
      expect(status).toBe(200);
      expect(body).toHaveProperty('msg', 'Successfully delete a category!');
      done();
    })
    .catch((err) => {
      console.log(err);
      done(err);
    })
  })

  // FAILED
  it('Test Delete Category - Access Token Not Being Sent', (done) => {
    request(app)
    .delete(`/categories/${id}`)
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

  it('Test Delete Category - Access Token Not Belong To Admin', (done) => {
    request(app)
    .delete(`/categories/${id}`)
    .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsImlhdCI6MTYwNDkzNTcyOH0.XtetzO9tbJPvx7mMSx6kkUewmPKthYmUU31jzNiTb_8')
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