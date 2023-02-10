const expect = require("chai").expect;
const sinon = require("sinon");
const Reward = require("../../models/Reward");
const manageRewards = require("../../controllers/manageRewards");

describe("Get all rewards", () => {
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
