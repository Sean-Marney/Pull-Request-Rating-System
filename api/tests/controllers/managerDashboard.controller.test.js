const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const app = require("../../index");
const PullRequest = require("../../models/pullRequest.model");
const ClaimedRewards = require("../../models/claimedRewards.model");
const User = require("../../models/user.model");

chai.use(chaiHttp);
const expect = chai.expect;

describe("testing getNumberOfPendingPullRequests controller method", () => {
  let countDocumentsStub;

  beforeEach(() => {
    // Create a stub for the countDocuments method of the PullRequest model
    countDocumentsStub = sinon.stub(PullRequest, "countDocuments");
  });

  afterEach(() => {
    // Restore the original method of the PullRequest model
    countDocumentsStub.restore();
  });

  it("should return 0 when there are no pending pull requests", async () => {
    // Stub the countDocuments method to return 0
    countDocumentsStub.returns(0);

    const res = await chai
      .request(app)
      .get("/management/dashboard/get-number-of-pending-pull-requests");
    expect(res).to.have.status(200);
    expect(res.body).to.equal(0);
  });

  it("should return the correct number of pending pull requests", async () => {
    // Stub the countDocuments method to return 2
    countDocumentsStub.returns(2);

    const res = await chai
      .request(app)
      .get("/management/dashboard/get-number-of-pending-pull-requests");
    expect(res).to.have.status(200);
    expect(res.body).to.equal(2);
  });

  it("should return an error response when an error occurs", async () => {
    // Stub the countDocuments method to throw an error
    countDocumentsStub.throws(new Error("Mock error"));

    const res = await chai
      .request(app)
      .get("/management/dashboard/get-number-of-pending-pull-requests");
    expect(res).to.have.status(500);
    expect(res.body.message).to.equal("Mock error");
  });
});

describe("testing getNumberOfClaimedRewards controller method", () => {
  let countDocumentsStub;

  beforeEach(() => {
    // Create a stub for the countDocuments method of the ClaimedRewards model
    countDocumentsStub = sinon.stub(ClaimedRewards, "countDocuments");
  });

  afterEach(() => {
    // Restore the original method of the ClaimedRewards model
    countDocumentsStub.restore();
  });

  it("should return 0 when there are no claimed rewards", async () => {
    // Stub the countDocuments method to return 0
    countDocumentsStub.returns(0);

    const res = await chai
      .request(app)
      .get("/management/dashboard/get-number-of-claimed-rewards");
    expect(res).to.have.status(200);
    expect(res.body).to.equal(0);
  });

  it("should return the correct number of claimed rewards", async () => {
    // Stub the countDocuments method to return 2
    countDocumentsStub.returns(2);

    const res = await chai
      .request(app)
      .get("/management/dashboard/get-number-of-claimed-rewards");
    expect(res).to.have.status(200);
    expect(res.body).to.equal(2);
  });

  it("should return an error response when an error occurs", async () => {
    // Stub the countDocuments method to throw an error
    countDocumentsStub.throws(new Error("Mock error"));

    const res = await chai
      .request(app)
      .get("/management/dashboard/get-number-of-claimed-rewards");
    expect(res).to.have.status(500);
    expect(res.body.message).to.equal("Mock error");
  });
});

describe("testing getClaimedRewards controller method", () => {
  let findStub;

  beforeEach(() => {
    // Create a stub for the find method of the ClaimedRewards model
    findStub = sinon.stub(ClaimedRewards, "find");
  });

  afterEach(() => {
    // Restore the original method of the ClaimedRewards model
    findStub.restore();
  });

  it("should return an empty array when there are no claimed rewards", async () => {
    // Stub the find method to return an empty array
    findStub.returns([]);

    const res = await chai
      .request(app)
      .get("/management/dashboard/get-claimed-rewards");
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal([]);
  });

  it("should return the correct claimed rewards", async () => {
    // Stub the find method to return an array of two claimed rewards
    findStub.returns([{ name: "Reward 1" }, { name: "Reward 2" }]);

    const res = await chai
      .request(app)
      .get("/management/dashboard/get-claimed-rewards");
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal([
      { name: "Reward 1" },
      { name: "Reward 2" },
    ]);
  });

  it("should return an error response when an error occurs", async () => {
    // Stub the find method to throw an error
    findStub.throws(new Error("Mock error"));

    const res = await chai
      .request(app)
      .get("/management/dashboard/get-claimed-rewards");
    expect(res).to.have.status(500);
    expect(res.body.message).to.equal("Mock error");
  });
});

describe("testing getTopDevelopers controller method", () => {
  let findStub;

  beforeEach(() => {
    // Create a stub for the find method of the User model
    findStub = sinon.stub(User, "find");
  });

  afterEach(() => {
    // Restore the original method of the User model
    findStub.restore();
  });

  it("should return the top 3 developers with most totalStarsEarned", async () => {
    // Stub the find method to return an array of users
    const users = [
      { hasRole: "Developer", totalStarsEarned: 10 },
      { hasRole: "Developer", totalStarsEarned: 20 },
      { hasRole: "Developer", totalStarsEarned: 30 },
      { hasRole: "Developer", totalStarsEarned: 40 },
      { hasRole: "Developer", totalStarsEarned: 50 },
    ];
    findStub.returns({
      sort: sinon
        .stub()
        .returns({ limit: sinon.stub().resolves(users.slice(0, 3)) }),
    });

    const res = await chai
      .request(app)
      .get("/management/dashboard/get-top-developers");
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(users.slice(0, 3));
  });

  it("should return a 500 error if an error occurs", async () => {
    // Stub the find method to throw an error
    findStub.throws(new Error("Mock error"));

    const res = await chai
      .request(app)
      .get("/management/dashboard/get-top-developers");
    expect(res).to.have.status(500);
    expect(res.body.message).to.equal("Mock error");
  });
});
