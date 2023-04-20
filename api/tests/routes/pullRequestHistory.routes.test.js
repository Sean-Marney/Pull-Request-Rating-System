const chai = require("chai");
const request = require("supertest");
const app = require("../../index");
const PullRequest = require("../../models/pullRequest.model");
const User = require("../../models/user.model");
const sinon = require("sinon");

describe("GET /pullrequests/history", () => {
  it("should return the list of pull requests and status code 200", (done) => {
    let user = new User({_id:2});
    let history = [{
        _id: "60720497f99eeb23c42ec6a7",
        name: "Pull Request 1"
    },{
        _id: "60720497f99eeb23c42ec6a7",
        name: "Pull Request 2"
    }];
    const userStub = sinon.stub(User, "findOne").resolves(user);
    const sortByDate = { date: -1 };
    let requestFindStub = sinon.stub(PullRequest, 'find').returns({
        sort: sinon.stub().withArgs(sortByDate).returns(history)
    });
    request(app)
      .get("/pullrequests/history/lansdowneop@cardiff.ac.uk")
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(200);
        chai.expect(res.body).to.be.an("array");
        userStub.restore();
        requestFindStub.restore();
        done();
      });

  });
  it("should return status code 404", (done) => {
    const userStub = sinon.stub(User, "findOne").resolves(null);
    request(app)
      .get("/pullrequests/history/lansdowneop@cardiff.ac.uk")
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(404);
        userStub.restore();
        done();
      });
  });
});