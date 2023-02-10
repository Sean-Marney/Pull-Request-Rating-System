const chai = require("chai");
const request = require("supertest");
const app = require("../../index");

describe("GET /management/rewards", () => {
  it("should return all rewards and status code 200", (done) => {
    request(app)
      .get("/management/rewards")
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(200);
        chai.expect(res.body).to.be.an("array");
        done();
      });
  });
});
