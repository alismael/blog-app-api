import * as request from 'supertest'
import * as express from 'express'

import { blogRouter } from './../../src/modules/blog/routes/BlogRouter'

const app = express();
app.use(blogRouter);


describe('GET /', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});