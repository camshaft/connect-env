/**
 * Module dependencies
 */

var should = require('should');
var env = require('..');
var request = require('supertest');

/**
 * Setup the test app
 */

var app = require('connect')();
app.use('/defaults', env());
app.use('/options', env({header: 'x-environment', default: 'other'}));
app.use(function(req, res, next) {
  res.end(req.env);
});

describe('connect-env', function(){
  it('should default to NODE_ENV', function(done) {
    request(app)
      .get('/defaults')
      .expect('test', done);
  });

  it('should use x-env header', function(done) {
    request(app)
      .get('/defaults')
      .set('x-env', 'production')
      .expect('production', done);
  });

  it('should default to the "default" option', function(done) {
    request(app)
      .get('/options')
      .expect('other', done);
  });

  it('should use x-env header', function(done) {
    request(app)
      .get('/options')
      .set('x-environment', 'production')
      .expect('production', done);
  });
});
