const assert = require("assert");
const sinon = require("sinon");
const PullRequest = require("../../models/pullRequest.model");
const ClaimedRewards = require("../../models/claimedRewards.model");
const {
  getUsersLatestPullRequest,
  getUsersClaimedRewards,
} = require("../../controllers/developerDashboard.controller");

describe("Testing the developer dashboard", () => {
  describe("testing the getUsersLatestPullRequest controller method", () => {
    it("should return the most recent pull request created by the user", async () => {
      const req = {
        params: {
          userId: "123",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const pullRequestStub = sinon.stub(PullRequest, "findOne").returns({
        sort: sinon.stub().returns({
          exec: sinon.stub().returns({
            git_id: "abc123",
            url: "https://github.com/user/repo/pull/1",
            user_id: "123",
            title: "Add new feature",
            repo: "user/repo",
            date: "2022-01-01",
            rating_complete: true,
            ratings: { user1: 4, user2: 5 },
            users_name: "John Doe",
          }),
        }),
      });

      await getUsersLatestPullRequest(req, res);

      assert.strictEqual(res.status.calledWith(200), true);
      assert.deepStrictEqual(res.json.firstCall.args[0], {
        git_id: "abc123",
        url: "https://github.com/user/repo/pull/1",
        user_id: "123",
        title: "Add new feature",
        repo: "user/repo",
        date: "2022-01-01",
        rating_complete: true,
        ratings: { user1: 4, user2: 5 },
        users_name: "John Doe",
      });

      pullRequestStub.restore();
    });

    it("should return an error response when an error occurs", async () => {
      const req = {
        params: {
          userId: "123",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const pullRequestStub = sinon
        .stub(PullRequest, "findOne")
        .throws(new Error("Internal Server Error"));

      await getUsersLatestPullRequest(req, res);

      assert.strictEqual(res.status.calledWith(500), true);
      assert.deepStrictEqual(res.json.firstCall.args[0], {
        message: "Internal Server Error",
      });

      pullRequestStub.restore();
    });
  });

  describe("Testing the getUsersClaimedRewards controller method", () => {
    it("should return all claimed rewards created by the user", async () => {
      const req = {
        params: {
          userId: "123",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const claimedRewardsStub = sinon.stub(ClaimedRewards, "find").returns([
        {
          reward_id: "abc123",
          reward_name: "10% discount coupon",
          user_id: "123",
          user_email: "john.doe@example.com",
          date_claimed: "2022-01-01",
          archived: false,
        },
        {
          reward_id: "def456",
          reward_name: "$50 gift card",
          user_id: "123",
          user_email: "john.doe@example.com",
          date_claimed: "2022-01-15",
          archived: true,
        },
      ]);

      await getUsersClaimedRewards(req, res);

      assert.strictEqual(res.status.calledWith(200), true);
      assert.deepStrictEqual(res.json.firstCall.args[0], [
        {
          reward_id: "abc123",
          reward_name: "10% discount coupon",
          user_id: "123",
          user_email: "john.doe@example.com",
          date_claimed: "2022-01-01",
          archived: false,
        },
        {
          reward_id: "def456",
          reward_name: "$50 gift card",
          user_id: "123",
          user_email: "john.doe@example.com",
          date_claimed: "2022-01-15",
          archived: true,
        },
      ]);

      claimedRewardsStub.restore();
    });

    it("should return an error response when an error occurs", async () => {
      const req = {
        params: {
          userId: "123",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const claimedRewardsStub = sinon
        .stub(ClaimedRewards, "find")
        .throws(new Error("Internal Server Error"));

      await getUsersClaimedRewards(req, res);

      assert.strictEqual(res.status.calledWith(500), true);
      assert.deepStrictEqual(res.json.firstCall.args[0], {
        message: "Internal Server Error",
      });

      claimedRewardsStub.restore();
    });
  });
});
