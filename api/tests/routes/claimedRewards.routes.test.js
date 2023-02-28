const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../index");
const ClaimedRewards = require("../../models/claimedRewards.model");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Claimed Rewards API", () => {
  describe("testing /get endpoint which gets all claimed rewards", () => {
    beforeEach(async () => {
      // Create mock data
      const claimedRewards = [
        {
          reward_id: "1",
          reward_name: "Reward 1",
          user_id: "user1",
          user_email: "user1@example.com",
          date_claimed: "2022-01-01",
          archived: false,
        },
        {
          reward_id: "2",
          reward_name: "Reward 2",
          user_id: "user2",
          user_email: "user2@example.com",
          date_claimed: "2022-02-01",
          archived: true,
        },
      ];
      await ClaimedRewards.insertMany(claimedRewards);
    });

    afterEach(async () => {
      // Remove mock data
      await ClaimedRewards.deleteMany();
    });

    it("should return all claimed rewards", (done) => {
      chai
        .request(app)
        .get("/management/rewards/claimed/get")
        .end((err, res) => {
          // Expect that the response is 200 and that it returns an array of 2 objects
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body).to.have.lengthOf(2);
          done();
        });
    });
  });
});
