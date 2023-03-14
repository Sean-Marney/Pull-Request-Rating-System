const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const PullRequest = require("../../models/pullRequest.model");
const app = require("../../index");
const assert = require("assert");
const {
  getUserByPullRequestRating,
} = require("../../controllers/rating.controller");
const User = require("../../models/user.model");

chai.use(chaiHttp);
const expect = chai.expect;

describe("createRating", () => {
  let updateOneStub;

  before(() => {
    updateOneStub = sinon.stub(PullRequest, "updateOne");
  });

  after(() => {
    updateOneStub.restore();
  });

  it("should return a 400 error if missing rating input fields", (done) => {
    chai
      .request(app)
      .put("/ratings/update/1")
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("Missing rating input fields");
        done();
      });
  });

  it("should return a 400 error if no ratings provided", (done) => {
    chai
      .request(app)
      .put("/ratings/update/1")
      .send({ rating: {}, rating_complete: true })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("No ratings provided");
        done();
      });
  });

  it("should return a 404 error if pull request not found", (done) => {
    updateOneStub.returns({ nModified: 0 });

    chai
      .request(app)
      .put("/ratings/update/1")
      .send({ rating: { a: 1, b: 2 }, rating_complete: true })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal(
          "Pull request with that ID not found"
        );
        done();
      });
  });

  it("should update pull request and return a success response", (done) => {
    updateOneStub.returns({ nModified: 1 });

    chai
      .request(app)
      .put("/ratings/update/1")
      .send({ rating: { a: 1, b: 2 }, rating_complete: true })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Rating updated successfully");
        done();
      });
  });

  it("should handle errors", (done) => {
    updateOneStub.throws();

    chai
      .request(app)
      .put("/ratings/update/1")
      .send({ rating: { a: 1, b: 2 }, rating_complete: true })
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body.message).to.equal(
          "An error occurred while updating rating"
        );
        done();
      });
  });
});

describe("getUserByPullRequestRating", () => {
  beforeEach(() => {
    sinon.stub(PullRequest, "findById");
    sinon.stub(User, "findById");
    sinon.stub(User, "updateOne");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should update user's stars and totalStarsEarned fields", async () => {
    // Mock data
    const pullRequestId = "123";
    const userId = "456";
    const ratingSum = 5;

    // Create mock pull request
    const pullRequest = { user_id: userId };
    PullRequest.findById.resolves(pullRequest);

    // Create mock user
    const user = { _id: userId, stars: 3, totalStarsEarned: 10 };
    User.findById.resolves(user);

    // Do calculations for the new star count and new total star count, according to the ratings received for that pull request
    const updatedStarCount = user.stars + ratingSum;
    const updatedTotalStarCount = user.totalStarsEarned + ratingSum;

    // Call method with rating received and the pull request its for
    await getUserByPullRequestRating(ratingSum, pullRequestId);

    // Assert it was called with the expected data
    assert(User.findById.calledOnceWith(userId));
    assert(
      User.updateOne.calledOnceWith(
        { _id: user._id },
        {
          $set: {
            stars: updatedStarCount,
            totalStarsEarned: updatedTotalStarCount,
          },
        }
      )
    );
  });

  it("should return 404 if pull request is not found", async () => {
    // Create a spy for the res.json method
    const jsonSpy = sinon.spy();

    // Mock data
    const res = {
      status: sinon.stub().returns({ json: jsonSpy }),
      json: jsonSpy,
    };
    const pullRequestId = "123";
    const ratingSum = 5;

    // Set up the mock PullRequest.findById to return null
    PullRequest.findById.resolves(null);

    // Call the method with the mock pull request ID
    await getUserByPullRequestRating(ratingSum, pullRequestId, res);

    // Check that the method returned a 404 response
    assert(res.status.calledWith(404));
    assert(
      jsonSpy.calledWith({ message: "Pull request with that ID not found" })
    );
  });
});
