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

    sinon.stub(PullRequest, "findById").resolves({
      _id: "pr1",
    });

    sinon.stub(PullRequest, "findById").resolves({
      _id: "pr1",
    });

    it("should return a 400 error if no ratings provided", (done) => {
        chai.request(app)
            .put("/ratings/update/1")
            .set ('Cookie', `jwt=${token}`)
            .send({ rating: {}, rating_complete: true })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.equal("No ratings provided");
                done();
            });
    sinon.stub(User, "findById").resolves({
      _id: "user1",
      stars: 10,
      totalStarsEarned: 20,
    });

    it("should return a 404 error if pull request not found", (done) => {
        findOneStub.returns(null);

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

    it("should handle errors", (done) => {
        updateOneStub.throws();

        chai.request(app)
            .put("/ratings/update/1")
            .set ('Cookie', `jwt=${token}`)
            .send({ rating: { a: 1, b: 2 }, rating_complete: true })
            .end((err, res) => {
                expect(res).to.have.status(500);
                expect(res.body.message).to.equal(
                    "An error occurred while updating rating"
                );
                done();
            });
    });
=======
    // Verify results
    expect(res.status.calledWith(404)).to.be.true;
    expect(
      res.json.calledWith({
        message: "Pull request with that ID not found",
      })
    ).to.be.true;
  });
>>>>>>> cbfaf3328f3e6b1b5a9353b5f92efcdbf6daa778
});
