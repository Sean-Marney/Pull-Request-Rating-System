const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const expect = chai.expect;
chai.use(chaiHttp);
const { createRating } = require("../../controllers/rating.controller");
const PullRequest = require("../../models/pullRequest.model");
const User = require("../../models/user.model");
const jwt = require('jsonwebtoken');

describe("createRating controller method", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should update rating and user stars successfully", async () => {
    // Mock request
    const req = {
      body: {
        rating: { quality: 4, readability: 5 },
        rating_complete: true,
        user_id: "user1",
      },
      params: {
        id: "pr1",
      },
    };

    // Mock response
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Mock MongoDB methods
    sinon.stub(PullRequest, "updateOne").resolves({
      nModified: 1,
    });

    sinon.stub(PullRequest, "findById").resolves({
      _id: "pr1",
    });

    sinon.stub(User, "findById").resolves({
      _id: "user1",
      stars: 10,
      totalStarsEarned: 20,
    });

    sinon.stub(User, "updateOne").resolves({});

    // Call the createRating function
    await createRating(req, res);

    // Verify results
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ message: "Rating updated successfully" })).to
      .be.true;
  });

  // Test case: Missing rating input fields
  it("should respond with an error when missing rating input fields", async () => {
    // Mock request
    const req = {
      body: {
        rating_complete: true,
        user_id: "user1",
      },
      params: {
        id: "pr1",
      },
    };

    // Mock response
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Call the createRating function
    await createRating(req, res);

    // Verify results
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ message: "Missing rating input fields" })).to
      .be.true;
  });

  // Test case: No ratings provided
  it("should respond with an error when no ratings are provided", async () => {
    // Mock request
    const req = {
      body: {
        rating: {},
        rating_complete: true,
        user_id: "user1",
      },
      params: {
        id: "pr1",
      },
    };

    // Mock response
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Call the createRating function
    await createRating(req, res);

    // Verify results
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ message: "No ratings provided" })).to.be.true;
  });

  // Test case: Pull request not found
  it("should respond with an error when pull request is not found", async () => {
    // Mock request
    const req = {
      body: {
        rating: { quality: 4, readability: 5 },
        rating_complete: true,
        user_id: "user1", // Replace userId with a string
      },
      params: {
        id: "pr1",
      },
    };

    // Mock response
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Mock MongoDB methods
    sinon.stub(PullRequest, "updateOne").resolves({
      nModified: 0,
    });

    // Add a mock for PullRequest.findById with null result
    sinon.stub(PullRequest, "findById").callsFake((id) => {
      if (id === "pr1") {
        return null;
      }
    });

    // Call the createRating function
    await createRating(req, res);

    // Verify results
    expect(res.status.calledWith(404)).to.be.true;
    expect(
      res.json.calledWith({
        message: "Pull request with that ID not found",
      })
    ).to.be.true;
  });
});
