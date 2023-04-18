const sinon = require("sinon");
const expect = require("chai").expect;
const User = require("../../models/user.model");
const leaderboardController = require("../../controllers/leaderboard.controller");

describe("getLeaderboard function", () => {
  let findStub;

  before(() => {
    findStub = sinon.stub(User, "find");
  });

  after(() => {
    findStub.restore();
  });

  it("should return the top 4 developers by stars", async () => {
    // Create some test users with varying star counts and roles
    const users = [
      { name: "User A", hasRole: "Developer", totalStarsEarned: 10 },
      { name: "User B", hasRole: "Developer", totalStarsEarned: 20 },
      { name: "User C", hasRole: "Manager", totalStarsEarned: 30 },
      { name: "User D", hasRole: "Developer", totalStarsEarned: 15 },
    ];

    // Stub the User.find method to return the test users
    findStub.returns({
      sort: sinon.stub().returns({
        select: sinon.stub().resolves(users),
      }),
    });

    // Call the controller function to get the leaderboard
    const req = {};
    const res = {
      json: sinon.stub(),
    };
    await leaderboardController.getLeaderboard(req, res);

    // Expect the function to return the top 4 developers by stars
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.calledWith(users.slice(0, 4))).to.be.true;
  });

  it("should handle errors", async () => {
    // Stub the User.find method to throw an error
    findStub.throws(new Error("Test error"));

    // Call the controller function
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };
    await leaderboardController.getLeaderboard(req, res);

    // Expect the function to handle the error and send a 500 response
    expect(res.status.calledOnce).to.be.true;
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.send.calledOnce).to.be.true;
    expect(res.send.calledWith("Server Error")).to.be.true;
  });
});
