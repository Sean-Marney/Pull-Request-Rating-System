const assert = require("assert");
const sinon = require("sinon");
const ClaimedRewards = require("../../models/claimedRewards.model");
const {
  getClaimedRewards,
  saveClaimedReward,
  updateArchiveStatus,
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

describe("testing saveClaimedReward controller method", function () {
  it("should save the claimed reward and return a 201 status code", async function () {
    // Mocking claimed rewards
    const req = {
      body: {
        rewardId: "1",
        rewardName: "Reward 1",
        userId: "user1",
        userEmail: "user1@example.com",
        dateClaimed: "2022-01-01",
      },
    };
    const res = {
      status: sinon.stub().returns({
        json: sinon.stub().withArgs(sinon.match.has("reward_id", "1")),
      }),
    };
    // Saving mocked rewards
    const saveStub = sinon.stub(ClaimedRewards.prototype, "save").resolves({
      reward_id: "1",
      reward_name: "Reward 1",
      user_id: "user1",
      user_email: "user1@example.com",
      date_claimed: "2022-01-01",
    });

    await saveClaimedReward(req, res);

    // Assert that the save method has been called and it has a 201 status code
    assert.ok(saveStub.calledOnce);
    assert.ok(res.status.calledWith(201));
    saveStub.restore();
  });

  it("should return a 500 status with an error message if an error occurs", async function () {
    const error = new Error("Internal server error");
    const saveStub = sinon
      .stub(ClaimedRewards.prototype, "save")
      .rejects(error);
    const req = {
      body: {
        rewardId: "1",
        rewardName: "Reward 1",
        userId: "user1",
        userEmail: "user1@example.com",
        dateClaimed: "2022-01-01",
      },
    };
    const res = {
      status: sinon.stub().returns({
        json: sinon.stub().withArgs({
          message: error.message,
        }),
      }),
    };

    await saveClaimedReward(req, res);

    assert.ok(saveStub.calledOnce);
    assert.ok(res.status.calledWith(500));
    assert.deepStrictEqual(res.status().json.firstCall.args[0], {
      message: error.message,
    });
    saveStub.restore();
  });
});

describe("testing updateArchiveStatus controller method", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should return a 404 status with an error message if the claimed reward is not found", async () => {
    const req = { params: { id: "123" } };
    const res = { status: sinon.stub(), json: sinon.stub() };

    sandbox.stub(ClaimedRewards, "findById").resolves(null);
    res.status.returns(res);

    await updateArchiveStatus(req, res);

    sinon.assert.calledOnce(ClaimedRewards.findById);
    sinon.assert.calledWith(ClaimedRewards.findById, "123");
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(
      res.json,
      sinon.match({ message: "Reward with that ID not found" })
    );
  });

  it("should return a 500 status with an error message if an error occurs", async () => {
    const req = { params: { id: "123" } };
    const res = { status: sinon.stub(), json: sinon.stub() };

    sandbox
      .stub(ClaimedRewards, "findById")
      .rejects(new Error("Database error"));
    res.status.returns(res);

    await updateArchiveStatus(req, res);

    sinon.assert.calledOnce(ClaimedRewards.findById);
    sinon.assert.calledWith(ClaimedRewards.findById, "123");
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(
      res.json,
      sinon.match({ message: "Database error" })
    );
  });
});
