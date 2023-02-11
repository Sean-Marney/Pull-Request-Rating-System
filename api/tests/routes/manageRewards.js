const chai = require("chai");
const request = require("supertest");
const app = require("../../index");
const Reward = require("../../models/Reward");
const mongoose = require("mongoose");

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

describe("GET /management/rewards/:id", () => {
  let reward;

  beforeEach((done) => {
    reward = new Reward({
      rewardName: "Free Pizza",
      starsRequired: "100",
    });

    reward.save((err) => {
      if (err) return done(err);
      done();
    });
  });

  afterEach((done) => {
    Reward.deleteMany({}, (err) => {
      if (err) return done(err);
      done();
    });
  });

  it("should return a reward and status code 200", (done) => {
    request(app)
      .get(`/management/rewards/${reward._id}`)
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(200);
        chai.expect(res.body).to.be.an("object");
        chai.expect(res.body.rewardName).to.equal("Free Pizza");
        chai.expect(res.body.starsRequired).to.equal("100");
        done();
      });
  });
});
