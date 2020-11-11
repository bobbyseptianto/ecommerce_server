const request = require('supertest');
const app = require('../app');
const {sequelize} = require("../models/index");
const {queryInterface} = sequelize;

// Lifecycle
afterAll((done) => {
  queryInterface.bulkDelete("Products")
  .then((result) => {
    done();
  })
  .catch((err) => {
    done(err);
  });
});

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

let id_category = '';
beforeAll(async (done) => {
  request(app)
  .post('/categories')
  .set('access_token', access_token)
  .send({
    name: 'Ruang Makan'
  })
  .then((res) => {
    id_category = res.body.id;
    done();
  })
  .catch((err) => {
    console.log(err);
    done(err);
  })
});

let id = '';

// CREATE
describe('Test Endpoint POST /products', () => {

    // SUCCESS
    it('Test Create Product - Success', (done) => {
      request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Kabinet Modular BESTA',
        image_url: 'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/501/0350121_PE535204_S4.jpg',
        description: 'Kombinasi penyimpanan dengan laci, Lappviken putih',
        price: 4300000,
        stock: 10,
        CategoryId: id_category
      })
      .then((res) => {
        const {body, status} = res;
        id = res.body.id;
        expect(status).toBe(201);
        expect(body).toHaveProperty('id', expect.any(Number));
        expect(body).toHaveProperty('name', "Kabinet Modular BESTA");
        expect(body).toHaveProperty('image_url', "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/501/0350121_PE535204_S4.jpg");
        expect(body).toHaveProperty('description', "Kombinasi penyimpanan dengan laci, Lappviken putih");
        expect(body).toHaveProperty('price', 4300000);
        expect(body).toHaveProperty('stock', 10);
        expect(body).toHaveProperty('CategoryId', expect.any(Number));
        expect(body).toHaveProperty('UserId', expect.any(Number));
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      })
    })

    // FAILED
    it('Test Create Product - Access Token Not Being Sent', (done) => {
      request(app)
      .post('/products')
      .send({
        name: 'Kabinet Modular BESTA',
        image_url: 'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/501/0350121_PE535204_S4.jpg',
        description: 'Kombinasi penyimpanan dengan laci, Lappviken putih',
        price: 4300000,
        stock: 10,
        CategoryId: id_category
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

    it('Test Create Product - Access Token Not Belong To Admin', (done) => {
      request(app)
      .post('/products')
      .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsImlhdCI6MTYwNDkzNTcyOH0.XtetzO9tbJPvx7mMSx6kkUewmPKthYmUU31jzNiTb_8')
      .send({
        name: 'Kabinet Modular BESTA',
        image_url: 'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/501/0350121_PE535204_S4.jpg',
        description: 'Kombinasi penyimpanan dengan laci, Lappviken putih',
        price: 4300000,
        stock: 10,
        CategoryId: id_category
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

    it('Test Create Product - Empty Required Fields', (done) => {
      request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: '',
        image_url: '',
        description: 'Kombinasi penyimpanan dengan laci, Lappviken putih',
        price: '',
        stock: '',
        CategoryId: id_category
      })
      .then((res) => {
        const {body, status} = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty('msg', 'Name is required!, Image URL is required!, Wrong image URL format!, Price is required and must be an Integer!, Stock is required and must be an Integer!');
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      })
    })

    it('Test Create Product - Price Negative (Price < 0)', (done) => {
      request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Kabinet Modular BESTA',
        image_url: 'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/501/0350121_PE535204_S4.jpg',
        description: 'Kombinasi penyimpanan dengan laci, Lappviken putih',
        price: -4300000,
        stock: 10,
        CategoryId: id_category
      })
      .then((res) => {
        const {body, status} = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty('msg', 'Price must be greater than or equal 0!');
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      })
    })

    it('Test Create Product - Stock Negative (Stock < 0)', (done) => {
      request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Kabinet Modular BESTA',
        image_url: 'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/501/0350121_PE535204_S4.jpg',
        description: 'Kombinasi penyimpanan dengan laci, Lappviken putih',
        price: 4300000,
        stock: -10,
        CategoryId: id_category
      })
      .then((res) => {
        const {body, status} = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty('msg', 'Stock must be greater than or equal 0!');
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      })
    })

    it('Test Create Product - Wrong Data Type', (done) => {
      request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Kabinet Modular BESTA',
        image_url: 'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/501/0350121_PE535204_S4.jpg',
        description: 'Kombinasi penyimpanan dengan laci, Lappviken putih',
        price: 4300000,
        stock: "sepuluh",
        CategoryId: id_category
      })
      .then((res) => {
        const {body, status} = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty('msg', 'Stock is required and must be an Integer!');
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      })
    })

});

// UPDATE
describe('Test Endpoint PUT /products/:id', () => {

  // SUCCESS
  it('Test Update Product - Success', (done) => {
    request(app)
    .put(`/products/${id}`)
    .set('access_token', access_token)
    .send({
      name: 'Meja TV HEMNES',
      image_url: 'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/247/0824740_PE776188_S4.jpg',
      description: 'Kombinasi penyimpanan TV, hitam-cokelat/cokelat muda kaca bening',
      price: 12497000,
      stock: 5,
      CategoryId: id_category
    })
    .then((res) => {
      const {body, status} = res;
      expect(status).toBe(200);
      expect(body).toHaveProperty('id', expect.any(Number));
      expect(body).toHaveProperty('name', "Meja TV HEMNES");
      expect(body).toHaveProperty('image_url', "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/247/0824740_PE776188_S4.jpg");
      expect(body).toHaveProperty('description', "Kombinasi penyimpanan TV, hitam-cokelat/cokelat muda kaca bening");
      expect(body).toHaveProperty('price', 12497000);
      expect(body).toHaveProperty('stock', 5);
      expect(body).toHaveProperty('CategoryId', expect.any(Number));
      done();
    })
    .catch((err) => {
      console.log(err);
      done(err);
    })
  })

  // FAILED
  it('Test Update Product - Access Token Not Being Sent', (done) => {
    request(app)
    .put(`/products/${id}`)
    .send({
      name: 'Meja TV HEMNES',
      image_url: 'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/247/0824740_PE776188_S4.jpg',
      description: 'Kombinasi penyimpanan TV, hitam-cokelat/cokelat muda kaca bening',
      price: 12497000,
      stock: 5,
      CategoryId: id_category
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

  it('Test Update Product - Access Token Not Belong To Admin', (done) => {
    request(app)
    .put(`/products/${id}`)
    .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsImlhdCI6MTYwNDkzNTcyOH0.XtetzO9tbJPvx7mMSx6kkUewmPKthYmUU31jzNiTb_8')
    .send({
      name: 'Meja TV HEMNES',
      image_url: 'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/247/0824740_PE776188_S4.jpg',
      description: 'Kombinasi penyimpanan TV, hitam-cokelat/cokelat muda kaca bening',
      price: 12497000,
      stock: 5,
      CategoryId: id_category
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

  it('Test Update Product - Price Negative (Price < 0)', (done) => {
    request(app)
    .put(`/products/${id}`)
    .set('access_token', access_token)
    .send({
      name: 'Meja TV HEMNES',
      image_url: 'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/247/0824740_PE776188_S4.jpg',
      description: 'Kombinasi penyimpanan TV, hitam-cokelat/cokelat muda kaca bening',
      price: -12497000,
      stock: 5,
      CategoryId: id_category
    })
    .then((res) => {
      const {body, status} = res;
      expect(status).toBe(400);
      expect(body).toHaveProperty('msg', 'Price must be greater than or equal 0!');
      done();
    })
    .catch((err) => {
      console.log(err);
      done(err);
    })
  })

  it('Test Update Product - Stock Negative (Stock < 0)', (done) => {
    request(app)
    .put(`/products/${id}`)
    .set('access_token', access_token)
    .send({
      name: 'Meja TV HEMNES',
      image_url: 'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/247/0824740_PE776188_S4.jpg',
      description: 'Kombinasi penyimpanan TV, hitam-cokelat/cokelat muda kaca bening',
      price: 12497000,
      stock: -5,
      CategoryId: id_category
    })
    .then((res) => {
      const {body, status} = res;
      expect(status).toBe(400);
      expect(body).toHaveProperty('msg', 'Stock must be greater than or equal 0!');
      done();
    })
    .catch((err) => {
      console.log(err);
      done(err);
    })
  })

  it('Test Update Product - Wrong Data Type', (done) => {
    request(app)
    .put(`/products/${id}`)
    .set('access_token', access_token)
    .send({
      name: 'Meja TV HEMNES',
      image_url: 'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/247/0824740_PE776188_S4.jpg',
      description: 'Kombinasi penyimpanan TV, hitam-cokelat/cokelat muda kaca bening',
      price: 12497000,
      stock: "lima",
      CategoryId: id_category
    })
    .then((res) => {
      const {body, status} = res;
      expect(status).toBe(400);
      expect(body).toHaveProperty('msg', 'Stock is required and must be an Integer!');
      done();
    })
    .catch((err) => {
      console.log(err);
      done(err);
    })
  })

});

// DELETE
describe('Test Endpoint DELETE /products/:id', () => {

  // SUCCESS
  it('Test Delete Product - Success', (done) => {
    request(app)
    .delete(`/products/${id}`) // ID -> Lihat DB
    .set('access_token', access_token)
    .then((res) => {
      const {body, status} = res;
      expect(status).toBe(200);
      expect(body).toHaveProperty('msg', 'Successfully delete a product!');
      done();
    })
    .catch((err) => {
      console.log(err);
      done(err);
    })
  })

  // FAILED
  it('Test Delete Product - Access Token Not Being Sent', (done) => {
    request(app)
    .delete(`/products/${id}`)
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

  it('Test Delete Product - Access Token Not Belong To Admin', (done) => {
    request(app)
    .delete(`/products/${id}`)
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