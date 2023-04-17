const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const PullRequest = require("../../models/pullRequest.model");
const User = require("../../models/user.model");
const { expect } = chai;

chai.use(chaiHttp);
const express = require("express");
const app = express();

// Import the controller method
const  createRating  = require("../../controllers/rating.controller");

// Mock the controller method
const createRatingMock = sinon.stub(createRating, "createRating");

// Create the update route for testing
app.put("/update/:id", (req, res) => {
    createRatingMock(req, res);
});

// Test suite for the PUT /update/:id route
describe("PUT /update/:id", () => {
    // Reset the mock after each test
    afterEach(() => {
        createRatingMock.reset();
    });

    // Test case for successful rating update
    it("should return 200 status code and call createRating controller on success", async () => {
        // Test rating data
        const ratingData = {
            rating: {
                quality: 4,
                readability: 5,
                functionality: 5,
            },
            rating_complete: true,
            user_id: "some-user-id",
        };

        const id = "some-id";

        // Stub the PullRequest and User models' methods
        const updateOneStub = sinon.stub(PullRequest, "updateOne").resolves({
            nModified: 1,
        });
        const findByIdStub = sinon.stub(PullRequest, "findById").resolves({
            _id: id,
            ...ratingData,
        });
        const userFindByIdStub = sinon.stub(User, "findById").resolves({
            _id: "some-user-id",
            stars: 10,
            totalStarsEarned: 15,
        });
        const userUpdateOneStub = sinon.stub(User, "updateOne").resolves({
            nModified: 1,
        });

        // Stub the controller to return a successful rating update response
        createRatingMock.callsFake((req, res) => {
            res.status(200).json({ message: "Rating updated successfully" });
        });

        // Send the request and verify the response
        const res = await chai
            .request(app)
            .put(`/update/${id}`)
            .send(ratingData);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property(
            "message",
            "Rating updated successfully"
        );
        expect(createRatingMock.calledOnce).to.be.true;

        // Restore the stubs
        updateOneStub.restore();
        findByIdStub.restore();
        userFindByIdStub.restore();
        userUpdateOneStub.restore();
    });

    // Test case for an error occurring during rating update
    it("should return 500 status code when an error occurs", async () => {

        // Test rating data
        const ratingData = {
            rating: {
                quality: 4,
                readability: 5,
                functionality: 5,
            },
            rating_complete: true,
            user_id: "some-user-id",
        };

        const id = "some-id";

        // Stub the controller to return an error response
        createRatingMock.callsFake((req, res) => {
            res.status(500).json({ message: "An error occurred" });
        });

        // Send the request and verify the response
        const res = await chai
            .request(app)
            .put(`/update/${id}`)
            .send(ratingData);
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property("message", "An error occurred");
        expect(createRatingMock.calledOnce).to.be.true;
    });

    // Test case for invalid rating data
    it("should return 400 status code when rating data is invalid", async () => {
        // Invalid test rating data
        const invalidRatingData = {
            rating: { invalid_key: 6 },
            rating_complete: true,
            user_id: "some-user-id",
        };

        const id = "some-id";

        // Stub the PullRequest and User models' methods
        const updateOneStub = sinon.stub(PullRequest, "updateOne");
        const findByIdStub = sinon.stub(PullRequest, "findById");
        const userFindByIdStub = sinon.stub(User, "findById");
        const userUpdateOneStub = sinon.stub(User, "updateOne");

        // Stub the controller to return a 400 response for invalid rating data
        createRatingMock.callsFake((req, res) => {
            res.status(400).json({ message: "Invalid rating data" });
        });

        // Send the request and verify the response
        const res = await chai
            .request(app)
            .put(`/update/${id}`)
            .send(invalidRatingData);
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message", "Invalid rating data");

        // Check that the controller and model methods were not called
        expect(createRatingMock.calledOnce).to.be.true;
        expect(updateOneStub.called).to.be.false;
        expect(findByIdStub.called).to.be.false;
        expect(userFindByIdStub.called).to.be.false;
        expect(userUpdateOneStub.called).to.be.false;

        // Restore the stubs
        updateOneStub.restore();
        findByIdStub.restore();
        userFindByIdStub.restore();
        userUpdateOneStub.restore();
    });

    // Test case for rating_complete not true
    it("should return 400 status code when rating_complete is not true", async () => {
        // Test rating data with rating_complete not true
        const ratingDataIncomplete = {
            rating: {
                quality: 4,
                readability: 5,
                functionality: 5,
            },
            rating_complete: false,
            user_id: "some-user-id",
        };

        const id = "some-id";

        // Stub the PullRequest and User models' methods
        const updateOneStub = sinon.stub(PullRequest, "updateOne");
        const findByIdStub = sinon.stub(PullRequest, "findById");
        const userFindByIdStub = sinon.stub(User, "findById");
        const userUpdateOneStub = sinon.stub(User, "updateOne");

        // Stub the controller to return a 400 response for rating_complete not true
        createRatingMock.callsFake((req, res) => {
            res.status(400).json({ message: "rating_complete must be true" });
        });

        // Send the request and verify the response
        const res = await chai
            .request(app)
            .put(`/update/${id}`)
            .send(ratingDataIncomplete);
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property(
            "message",
            "rating_complete must be true"
        );

        // Check that the controller and model methods were not called
        expect(createRatingMock.calledOnce).to.be.true;
        expect(updateOneStub.called).to.be.false;
        expect(findByIdStub.called).to.be.false;
        expect(userFindByIdStub.called).to.be.false;
        expect(userUpdateOneStub.called).to.be.false;

        // Restore the stubs
        updateOneStub.restore();
        findByIdStub.restore();
        userFindByIdStub.restore();
        userUpdateOneStub.restore();
    });
});
