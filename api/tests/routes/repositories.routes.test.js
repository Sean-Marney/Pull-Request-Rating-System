const request = require("supertest");
const app = require("../../index");
const expect = require("chai").expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');


describe("Tests getting all pull requests", () => {
    chai.use(chaiHttp);
    const token = jwt.sign(
      {id: 'AB12345!', email: 'test2@test.com', hasRole:'Manager'},
      process.env.PASSPORTSECRET,
      {expiresIn: '7d'});


    it('returns object with 200 status', (done) => {
      request(app).get("/management/repositories/allPulls").set ('Cookie', `jwt=${token}`).then((res, body) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
      done();
    }).catch(done);
  }).timeout(100000);;
});
