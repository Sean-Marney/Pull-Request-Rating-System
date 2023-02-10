const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index"); // Check here
const Reward = require("../models/Reward");

const expect = chai.expect;
chai.use(chaiHttp);

describe("test /management/rewards GET endpoint", () => {
  beforeEach(async () => {
    // Clear database
    await Reward.deleteMany({});
  });

  it("should return an array of rewards", async () => {
    const rewards = [
      { rewardName: "Reward 1", starsRequired: "5" },
      { rewardName: "Reward 2", starsRequired: "10" },
      { rewardName: "Reward 3", starsRequired: "15" },
    ];
    // Insert the rewards
    await Reward.insertMany(rewards);

    const res = await chai.request(app).get("/management/rewards");

    expect(res).to.have.status(200);
  });

  it("should return a 404 error if there are no rewards", async () => {
    const res = await chai.request(app).get("/management/rewards");

    expect(res).to.have.status(404);
    expect(res.body).to.have.property("message", "No rewards found");
  });
});
