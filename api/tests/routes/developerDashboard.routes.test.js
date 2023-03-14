const request = require("supertest");
const assert = require("assert");
const app = require("../../index");
const sinon = require("sinon");
const PullRequest = require("../../models/pullRequest.model");
const ClaimedRewards = require("../../models/claimedRewards.model");

describe("Developer Dashboard Endpoints", () => {
  describe("Developer Dashboard Endpoints", () => {
    describe("GET /recent-pull-request/:userId", () => {
      it("should return the most recent pull request for the given user", async () => {
        // Mocking user data and pull request data
        const userId = "123";
        const pullRequest = {
          _id: "123456",
          git_id: "789",
          url: "https://github.com/example/repo/pull/1",
          user_id: userId,
          title: "Test Pull Request",
          repo: "example/repo",
          date: "2022-03-14T00:00:00.000Z",
          rating_complete: false,
          ratings: {},
          users_name: "Test User",
        };

        // Finding mocked rewards using stub
        const findOneStub = sinon.stub(PullRequest, "findOne").returns({
          sort: sinon
            .stub()
            .returns({ exec: sinon.stub().resolves(pullRequest) }),
        });

        // Calling endpoint
        const res = await request(app).get(
          `/dashboard/recent-pull-request/${userId}`
        );

        // Asserting that the data is as expected
        assert.strictEqual(res.statusCode, 200);
        assert.deepStrictEqual(res.body, pullRequest);

        assert.strictEqual(findOneStub.calledOnce, true);

        // Reseting the stubbed data
        findOneStub.restore();
      });
    });
  });

  describe("GET /claimed-rewards/:userId", () => {
    it("should return all claimed rewards for the given user", async () => {
      // Mocking user data and pull request data
      const userId = "123";
      const claimedRewards = [
        {
          _id: "123456",
          reward_id: "123",
          reward_name: "Test Reward",
          user_id: userId,
          user_email: "test@example.com",
          date_claimed: "2022-03-14T00:00:00.000Z",
          archived: false,
        },
        {
          _id: "1234567",
          reward_id: "456",
          reward_name: "Another Test Reward",
          user_id: userId,
          user_email: "test@example.com",
          date_claimed: "2022-03-14T00:00:00.000Z",
          archived: true,
        },
      ];

      // Finding mocked rewards using stub
      const findStub = sinon
        .stub(ClaimedRewards, "find")
        .resolves(claimedRewards);

      // Calling endpoint
      const res = await request(app).get(
        `/dashboard/claimed-rewards/${userId}`
      );

      // Asserting that the data is as expected
      assert.strictEqual(res.statusCode, 200);
      assert.deepStrictEqual(res.body, claimedRewards);

      assert.strictEqual(findStub.calledOnce, true);

      // Reseting the stubbed data
      findStub.restore();
    });
  });
});
