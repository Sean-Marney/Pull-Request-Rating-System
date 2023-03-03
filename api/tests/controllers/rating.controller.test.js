const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const PullRequest = require("../../models/pullRequest.model");
const app = require("../../index");

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
        chai.request(app)
            .put("/ratings/update/1")
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
            .send({ rating: {}, rating_complete: true })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.equal("No ratings provided");
                done();
            });
    });

    it("should return a 404 error if pull request not found", (done) => {
        updateOneStub.returns({ nModified: 0 });

        chai.request(app)
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

        chai.request(app)
            .put("/ratings/update/1")
            .send({ rating: { a: 1, b: 2 }, rating_complete: true })
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
