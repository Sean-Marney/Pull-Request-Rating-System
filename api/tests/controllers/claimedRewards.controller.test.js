const assert = require("assert");
const sinon = require("sinon");
const ClaimedRewards = require("../../models/claimedRewards.model");
const {
  getClaimedRewards,
} = require("../../controllers/claimedRewards.controller");

describe("testing getClaimedRewards controller method", function () {
  it("should return an array of claimed rewards", async function () {
    // Mocking claimed rewards
    const mockClaimedRewards = [
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
        date_claimed: "2022-01-02",
        archived: false,
      },
    ];
    // Finding mocked rewards
    const findStub = sinon
      .stub(ClaimedRewards, "find")
      .resolves(mockClaimedRewards);
    // Create mock request and response objects
    const req = {};
    const res = {
      status: sinon.stub().returns({
        json: sinon.stub().withArgs(mockClaimedRewards),
      }),
    };
    // Call getClaimedReward controller method with mock request/response
    await getClaimedRewards(req, res);
    // Assert that the status and JSON data match the expected mock data
    assert.ok(findStub.calledOnce);
    assert.deepStrictEqual(
      res.status().json.firstCall.args[0],
      mockClaimedRewards
    );
    findStub.restore();
  });

  it("should return a 500 status with an error message if an error occurs", async function () {
    const error = new Error("Internal server error");
    const findStub = sinon.stub(ClaimedRewards, "find").rejects(error);
    const req = {};
    const res = {
      status: sinon.stub().returns({
        json: sinon.stub().withArgs({ message: error.message }),
      }),
    };
    await getClaimedRewards(req, res);
    assert.ok(findStub.calledOnce);
    assert.deepStrictEqual(res.status().json.firstCall.args[0], {
      message: error.message,
    });
    findStub.restore();
  });
});
