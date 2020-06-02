const request = require('supertest');
const app = require('../index'); //reference to you index.js file


//Testing to retrieve all users
describe('GET /information', function () {
    it('respond with json containing a list of all users', function (done) {
        request(app)
            .get('/information')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

// Testing for Retrieve user with id
describe('GET /mydata/:id', function () {
    it('respond with json containing a single user', function (done) {
        request(app)
            .get('/mydata/:id')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

// Testing for POST user

describe('POST /adduser', function() {
    it('responds with json add new user', function(done) {
      request(app)
        .post('/adduser')
        .send({fname: 'Ravi'})
        .send({lname: 'joshi'})
        .send({salary: '30000'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });

// Testing for PUT user
describe('PUT /update', function() {
    it('responds with json update user', function(done) {
      request(app)
        .put('/update')
        .send({fname: 'Ravi'})
        .send({lname: 'joshi'})
        .send({salary: '10000'})
        .send({id: '14'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });

// Testing for Delete user
describe('DELETE /deleteuser', function() {
    it('responds with json delete user', function(done) {
      request(app)
        .delete('/deleteuser')
        .send({id: '14'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });