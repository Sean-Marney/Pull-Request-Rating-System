const expect = require("chai").expect;
const sinon = require("sinon");
const Reward = require("../../models/reward.model");
const manageRewards = require("../../controllers/manageRewards.controller");
const app = require("../../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.should();

describe("GET all rewards from /management/rewards using the getRewards controller method", () => {
  let mockRewards;

  beforeEach(() => {
    mockRewards = [
      { _id: "1", rewardName: "Reward 1", starsRequired: "10" },
      { _id: "2", rewardName: "Reward 2", starsRequired: "20" },
      { _id: "3", rewardName: "Reward 3", starsRequired: "30" },
    ];
    sinon.stub(Reward, "find").resolves(mockRewards);
  });

  afterEach(() => {
    Reward.find.restore();
  });

  it("should return an array of rewards with expected length", async () => {
    const req = {};
    const res = {
      status: sinon.stub().returns({ json: sinon.stub() }),
    };

    await manageRewards.getRewards(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.status().json.calledWith(mockRewards)).to.be.true;
  });

  it("should return rewards with expected properties", async () => {
    const req = {};
    const res = {
      status: sinon.stub().returns({ json: sinon.stub() }),
    };

    await manageRewards.getRewards(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.status().json.calledWith(mockRewards)).to.be.true;

    mockRewards.forEach((reward) => {
      expect(reward).to.have.property("_id");
      expect(reward).to.have.property("rewardName");
      expect(reward).to.have.property("starsRequired");
      expect(reward._id).to.be.a("string");
      expect(reward.rewardName).to.be.a("string");
      expect(reward.starsRequired).to.be.a("string");
    });
  });
});

describe("GET reward by ID from /management/rewards using the getRewards controller method", () => {
  let mockReward;

  beforeEach(() => {
    mockReward = { _id: "1", rewardName: "Reward 1", starsRequired: "10" };
    sinon.stub(Reward, "findById").resolves(mockReward);
  });

  afterEach(() => {
    Reward.findById.restore();
  });

  it("should return a reward with the expected ID", async () => {
    const req = { params: { id: "1" } };
    const res = {
      status: sinon.stub().returns({ json: sinon.stub() }),
    };

    await manageRewards.getRewardsById(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.status().json.calledWith(mockReward)).to.be.true;
  });

  it("should return a reward with the expected length", async () => {
    const req = { params: { id: "1" } };
    const res = {
      status: sinon.stub().returns({ json: sinon.stub() }),
    };

    await manageRewards.getRewardsById(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.status().json.calledWith(mockReward)).to.be.true;
  });

  it("should return a reward with the expected properties", async () => {
    const req = { params: { id: "1" } };
    const res = {
      status: sinon.stub().returns({ json: sinon.stub() }),
    };

    await manageRewards.getRewardsById(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.status().json.calledWith(mockReward)).to.be.true;

    expect(mockReward).to.have.property("_id");
    expect(mockReward).to.have.property("rewardName");
    expect(mockReward).to.have.property("starsRequired");
    expect(mockReward._id).to.be.a("string");
    expect(mockReward.rewardName).to.be.a("string");
    expect(mockReward.starsRequired).to.be.a("string");
  });
});

describe("CREATE reward at /management/rewards/create using the createReward controller method", () => {
  it("should create a reward and save it to the database with a 201 response code", async () => {
    const rewardData = {
      rewardName: "Test Reward",
      starsRequired: "5",
    };
    const req = { body: rewardData };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const reward = new Reward(rewardData);
    sinon.stub(Reward.prototype, "save").resolves(reward);

    await manageRewards.createReward(req, res);

    sinon.assert.calledOnce(reward.save);
    sinon.assert.calledOnceWithExactly(res.status, 201);
  });
});
