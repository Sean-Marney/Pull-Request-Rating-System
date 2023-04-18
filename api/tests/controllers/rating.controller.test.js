const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const expect = chai.expect;
chai.use(chaiHttp);
const { createRating } = require("../../controllers/rating.controller");
const PullRequest = require("../../models/pullRequest.model");
const User = require("../../models/user.model");
const sandbox = sinon.createSandbox();

describe("createRating controller method", () => {
    let sandbox;

    beforeEach(() => {
        // Create a new sandbox before each test case
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        // Restore the sandbox after each test case
        sandbox.restore();
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
        expect(res.json.calledWith({ message: "Rating updated successfully" }))
            .to.be.true;
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
        expect(res.json.calledWith({ message: "Missing rating input fields" }))
            .to.be.true;
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
        expect(res.json.calledWith({ message: "No ratings provided" })).to.be
            .true;
    });

    // Test case: Pull request not found
    it("should respond with an error when pull request is not found", async () => {
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

        // Replace PullRequest.updateOne with a stub that resolves with nModified: 0
        sandbox.replace(
            PullRequest,
            "updateOne",
            sandbox.stub().resolves({ nModified: 0 })
        );

        // Replace PullRequest.findById with a stub that resolves with null
        sandbox.replace(PullRequest, "findById", sandbox.stub().resolves(null));

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
