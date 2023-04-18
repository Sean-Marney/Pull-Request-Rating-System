const chai = require("chai");
const sinon = require("sinon");
const request = require("supertest");
const app = require("../../index");
const Reward = require("../../models/reward.model");
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

describe("GET /management/rewards", () => {
    chai.use(chaiHttp);
    const token = jwt.sign(
      {id: 'AB12345!', email: 'test2@test.com', hasRole:'Manager'},
      process.env.PASSPORTSECRET,
      {expiresIn: '7d'});

  it("should return all rewards and status code 200", (done) => {
    const mockReward = { rewardName: "Free Pizza", starsRequired: 100 };
    const rewardFindStub = sinon.stub(Reward, "find").resolves([mockReward]);

    request(app)
      .get("/management/rewards")
      .set ('Cookie', `jwt=${token}`)
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(200);
        chai.expect(res.body).to.be.an("array");
        chai.expect(res.body[0].rewardName).to.equal(mockReward.rewardName);
        chai
          .expect(res.body[0].starsRequired)
          .to.equal(mockReward.starsRequired);
        rewardFindStub.restore();
        done();
      });
  });
});

describe("POST /management/rewards/create", () => {
    chai.use(chaiHttp);
    const token = jwt.sign(
      {id: 'AB12345!', email: 'test2@test.com', hasRole:'Manager'},
      process.env.PASSPORTSECRET,
      {expiresIn: '7d'});

  afterEach((done) => {
    sinon.restore();
    Reward.deleteMany({}, (err) => {
      if (err) return done(err);
      done();
    });
  });

  it("should create a reward and return status code 201", (done) => {
    const mockReward = { rewardName: "Free Coffee", starsRequired: 50 };
    const rewardCreateStub = sinon.stub(Reward, "create").resolves(mockReward);

    request(app)
      .post("/management/rewards/create")
      .set ('Cookie', `jwt=${token}`)
      .send(mockReward)
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(201);
        chai.expect(res.body.rewardName).to.equal(mockReward.rewardName);
        chai.expect(res.body.starsRequired).to.equal(mockReward.starsRequired);
        rewardCreateStub.restore();
        done();
      });
  });
});

describe("PATCH /management/rewards/:id", () => {
    chai.use(chaiHttp);
    const token = jwt.sign(
      {id: 'AB12345!', email: 'test2@test.com', hasRole:'Manager'},
      process.env.PASSPORTSECRET,
      {expiresIn: '7d'});

  let reward;

  beforeEach((done) => {
    reward = new Reward({
      rewardName: "Free Pizza",
      starsRequired: 100,
    });
    reward.save((err) => {
      if (err) return done(err);
      done();
    });
  });

  afterEach((done) => {
    sinon.restore();
    Reward.deleteMany({}, (err) => {
      if (err) return done(err);
      done();
    });
  });

  it("should update a reward and return status code 200", (done) => {
    const findByIdAndUpdateStub = sinon
      .stub(Reward, "findByIdAndUpdate")
      .resolves({
        rewardName: "Free Ice Cream",
        starsRequired: 50,
      });

    request(app)
      .patch(`/management/rewards/update/${reward._id}`)
      .set ('Cookie', `jwt=${token}`)
      .send({ rewardName: "Free Ice Cream", starsRequired: 50 })
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(200);
        chai.expect(res.body).to.be.an("object");
        chai.expect(res.body.rewardName).to.equal("Free Ice Cream");
        chai.expect(res.body.starsRequired).to.equal(50);
        findByIdAndUpdateStub.restore();
        done();
      });
  });
});

describe("DELETE /management/rewards/:id", () => {
    chai.use(chaiHttp);
    const token = jwt.sign(
      {id: 'AB12345!', email: 'test2@test.com', hasRole:'Manager'},
      process.env.PASSPORTSECRET,
      {expiresIn: '7d'});

  let reward;

  beforeEach(async () => {
    reward = new Reward({
      rewardName: "Free Pizza",
      starsRequired: 100,
    });

    await reward.save();
  });

  afterEach(async () => {
    await Reward.deleteMany({});
  });

  it("should delete a reward and return status code 200", async () => {
    const res = await request(app).delete(
      `/management/rewards/delete/${reward._id}`
    ).set ('Cookie', `jwt=${token}`);

    chai.expect(res.statusCode).to.equal(200);

    const deletedReward = await Reward.findById(reward._id);

    chai.expect(deletedReward).to.be.null;
  });
});
