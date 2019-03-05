process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

let User = require('../api/models/user');
let Product = require('../api/models/product');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

/**
 * Before each request delete
 * all products from database
 */
describe('Products', () => {

  beforeEach((done) => {
    User.remove({}, (err) => {
      let user = {
        email: "user@user",
        username: "user",
        password: "user",
      };
      chai.request(server)
      .post('/observatory/api/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
    });
  });

  beforeEach((done) => {
    Product.remove({}, (err) => {
      done();
    });
  });

  /**
   * Test /GET route
   */
  describe('/GET', () => {
    it('it should GET all the products', (done) => {
      chai.request(server)
      .get('/observatory/api/products')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.products.should.be.a('array');
        res.body.products.length.should.be.eql(0);
        done();
      });
    });
  });

  /**
   * Test /POST route
   */
  describe('/POST', () => {
    /**
     * No authentication
     */
    it('it should not add a product without authentication', (done) => {
      let product = {
        name: "Unleaded",
        category: "Car Fuel",
        description: "Car fuel with 95 octanes",
        tags: [
          "Fuel",
          "Car",
        ],
      };
      chai.request(server)
      .post('/observatory/api/products')
      .send(product)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
    });
    /**
     * With authentication
     */
    it('it should add a product with authentication', (done) => {
      let user = {
        username: "user",
        password: "user",
      };
      chai.request(server)
      .post('/observatory/api/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        let token = res.body.token;
        let product = {
          name: "Unleaded",
          category: "Car Fuel",
          description: "Car fuel with 95 octanes",
          tags: [
            "Fuel",
            "Car",
          ],
        };
        chai.request(server)
        .post('/observatory/api/products')
        .set('x-observatory-auth', token)
        .send(product)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('createdProduct');
          res.body.createdProduct.should.have.property('name').eql('Unleaded');
          res.body.createdProduct.should.have.property('category').eql('Car Fuel');
          res.body.createdProduct.should.have.property('tags');
          res.body.createdProduct.tags.length.should.be.eql(2);
          done();
        });
      });
    });
  });

  /**
   * Get by id
   */
  describe('/GET/:id', () => {
    it('it should GET a product by the given id', (done) => {
      let product = new Product({
        _id: "000000000000000000000000",
        name: "Unleaded",
        category: "Car Fuel",
        description: "Car fuel with 95 octanes",
        tags: [
          "Fuel",
          "Car",
        ],
      });
      product.save((err, product) => {
        chai.request(server)
        .get('/observatory/api/products/' + product._id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('_id');
          res.body.should.have.property('name').eql('Unleaded');
          res.body.should.have.property('category').eql('Car Fuel');
          res.body.should.have.property('description');
          res.body.should.have.property('tags');
          res.body.tags.length.should.be.eql(2);
          res.body.should.have.property('withdrawn');
          done();
        });
      });
    });
  });

  /**
   * Delete by id
   */
  describe('/DELETE/:id', () => {
    it('it should DELETE a product by the given id', (done) => {
      let product = new Product({
        _id: "000000000000000000000000",
        name: "Unleaded",
        category: "Car Fuel",
        description: "Car fuel with 95 octanes",
        tags: [
          "Fuel",
          "Car",
        ],
      });
      product.save((err, product) => {
        let user = {
          username: "user",
          password: "user",
        };
        chai.request(server)
        .post('/observatory/api/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('token');
          let token = res.body.token;
          chai.request(server)
          .delete('/observatory/api/products/' + product._id)
          .set('x-observatory-auth', token)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        });
      });
    });
  });

  /**
   * Put by id
   */
  describe('/PUT/:id', () => {
    it('it should not PUT a product by the given id with missing info', (done) => {
      let product = new Product({
        _id: "000000000000000000000000",
        name: "Unleaded",
        category: "Car Fuel",
        description: "Car fuel with 95 octanes",
        tags: [
          "Fuel",
          "Car",
        ],
      });
      product.save((err, product) => {
        let user = {
          username: "user",
          password: "user",
        };
        chai.request(server)
        .post('/observatory/api/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('token');
          let token = res.body.token;
          chai.request(server)
          .put('/observatory/api/products/' + product._id)
          .set('x-observatory-auth', token)
          .send({name: "Super Unleaded"})
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
        });
      });
    });
    it('it should PUT a product by the given id with all info', (done) => {
      let product = new Product({
        _id: "000000000000000000000000",
        name: "Unleaded",
        category: "Car Fuel",
        description: "Car fuel with 95 octanes",
        tags: [
          "Fuel",
          "Car",
        ],
      });
      product.save((err, product) => {
        let user = {
          username: "user",
          password: "user",
        };
        chai.request(server)
        .post('/observatory/api/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('token');
          let token = res.body.token;
          let newProduct = {
            name: "Super Unleaded",
            category: "Car Fuel",
            description: "Car fuel with 100+ octanes",
            tags: ["tag1"],
          }
          chai.request(server)
          .put('/observatory/api/products/' + product._id)
          .set('x-observatory-auth', token)
          .send(newProduct)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Product FULLY updated');
            done();
          });
        });
      });
    });
  });

});
