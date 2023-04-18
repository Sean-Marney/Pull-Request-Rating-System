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
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);
const expect = chai.expect;

describe("createRating", () => {
    chai.use(chaiHttp);
    const token = jwt.sign(
      {id: 'AB12345!', email: 'test2@test.com', hasRole:'Manager'},
      process.env.PASSPORTSECRET,
      {expiresIn: '7d'});

    let updateOneStub;
    let findOneStub;
    let findByIdStub;
    let userUpdateOneStub;

    before(() => {
        updateOneStub = sinon.stub(PullRequest, "updateOne");
        findOneStub = sinon.stub(PullRequest, "findOne");
        findByIdStub = sinon.stub(User, "findById");
        userUpdateOneStub = sinon.stub(User, "updateOne");

        // reset history before each test case
        sinon.resetHistory();
    });

    after(() => {
        updateOneStub.restore();
        findOneStub.restore();
        findByIdStub.restore();
    });

    it("should return a 400 error if missing rating input fields", (done) => {
        chai.request(app)
            .put("/ratings/update/1")
            .set ('Cookie', `jwt=${token}`)
            .send({})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.equal(
                    "Missing rating input fields"
                );
                done();
            });
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
    });

    it("should return a 404 error if pull request not found", (done) => {
        findOneStub.returns(null);

        chai.request(app)
            .put("/ratings/update/1")
            .set ('Cookie', `jwt=${token}`)
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
        findOneStub.returns({ _id: "1", rating: {}, rating_complete: false });
        findByIdStub.returns({ _id: "1", stars: 3, totalStarsEarned: 10 });

        updateOneStub.resolves({ nModified: 1 });
        userUpdateOneStub.resolves({ nModified: 1 });

        chai.request(app)
        
            .put("/ratings/update/1")
            .set ('Cookie', `jwt=${token}`)
            .send({
                rating: { a: 1, b: 2 },
                rating_complete: true,
                user_id: "1",
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equal(
                    "Rating updated successfully"
                );
                done();
            });
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
});
