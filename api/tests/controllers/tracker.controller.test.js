const expect = require("chai").expect;
const sinon = require("sinon");
const Tracker = require("../../models/tracker.model");
const manageTrackers = require("../../controllers/tracker.controller");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.should();

describe("GET all trackers using getTrackers controller method", () => {
    let mockTrackers;

    beforeEach(() => {
        mockTrackers = [
            {
                _id: "1",
                name: "Readability",
            },
        ];
        sinon.stub(Tracker, "find").resolves(mockTrackers);
    });

    afterEach(() => {
        Tracker.find.restore();
    });

    it("should return an array of trackers with expected length", async () => {
        const req = {};
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        await manageTrackers.getTrackers(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.status().json.calledWith(mockTrackers)).to.be.true;
    });
    it("should return trackers with expected properties", async () => {
        const req = {};
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        await manageTrackers.getTrackers(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.status().json.calledWith(mockTrackers)).to.be.true;

        mockTrackers.forEach((tracker) => {
            expect(tracker).to.have.property("_id");
            expect(tracker).to.have.property("name");
            expect(tracker._id).to.be.a("string");
            expect(tracker.name).to.be.a("string");
        });
    });
});

describe("GET tracker by ID from /management/trackers using the getTrackers controller method", () => {
    let mockTracker;

    beforeEach(() => {
        mockTracker = {
            _id: "1",
            name: "Design Patterns",
        };
        sinon.stub(Tracker, "findById").resolves(mockTracker);
    });

    afterEach(() => {
        Tracker.findById.restore();
    });

    it("should return a tracker with the expected ID", async () => {
        const req = { params: { id: "1" } };
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        await manageTrackers.getTrackerById(req, res);

        expect(res.status().json.calledWith(mockTracker)).to.be.true;
    });

    it("should return a tracker with the expected length", async () => {
        const req = { params: { id: "1" } };
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        await manageTrackers.getTrackerById(req, res);

        
        expect(res.status().json.calledWith(mockTracker)).to.be.true;
    });

    it("should return a tracker with the expected properties", async () => {
        const req = { params: { id: "1" } };
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        await manageTrackers.getTrackerById(req, res);

        
        expect(res.status().json.calledWith(mockTracker)).to.be.true;

        expect(mockTracker).to.have.property("_id");
        expect(mockTracker).to.have.property("name");
        expect(mockTracker._id).to.be.a("string");
        expect(mockTracker.name).to.be.a("string");
    });
});

describe("CREATE tracker at /management/trackers/create using the createTracker controller method", () => {
    it("should create a tracker and save it to the database with a 201 response code", async () => {
        const trackerData = {
            name: "Design Patterns",
        };
        const req = { body: trackerData };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const tracker = new Tracker(trackerData);
        sinon.stub(Tracker.prototype, "save").resolves(tracker);

        await manageTrackers.createTracker(req, res);

        sinon.assert.calledOnce(tracker.save);
        sinon.assert.calledOnceWithExactly(res.status, 201);
    });
});


describe("DELETE tracker by ID from /management/trackers/delete/:id using the deleteTracker controller method", () => {
    let mockTracker;

    beforeEach(() => {
        // Create a mock tracker object
        mockTracker = {
            _id: "1",
            name: "Tracker 1",
            description: "This is a tracker",
            createdBy: "user1",
        };
        // Stub the findByIdAndDelete method to resolve with the mock tracker object
        sinon.stub(Tracker, "findByIdAndDelete").resolves(mockTracker);
    });

    afterEach(() => {
        // Restore the stubbed findByIdAndDelete method
        Tracker.findByIdAndDelete.restore();
    });

    // Test case for deleting a tracker with the expected ID
    it("should delete a tracker with the given ID", async () => {
        // Define a request object with a parameter for the tracker ID
        const req = { params: { id: "1" } };
        const res = {
            // Stub the status method to return an object with a json method
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        // Call the deleteTracker method with the request and response objects
        await manageTrackers.deleteTracker(req, res);

        // Check that the findByIdAndDelete method was called with the expected ID
        sinon.assert.calledOnceWithExactly(Tracker.findByIdAndDelete, "1");

        // Check that the status method was called with 200
        expect(res.status.calledWith(200)).to.be.true;

        // Check that the json method was called with the expected success message
        expect(res.status().json.calledWith({ message: "Tracker deleted" })).to
            .be.true;
    });

    // Test case for returning a 404 status code and error message when the tracker is not found
    it("should return a 404 status code and error message when the tracker is not found", async () => {
        // Stub the findByIdAndDelete method to resolve with null, indicating that the tracker was not found
        Tracker.findByIdAndDelete.resolves(null);

        // Define a request object with a parameter for the tracker ID
        const req = { params: { id: "1" } };
        const res = {
            // Stub the status method to return an object with a json method
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        // Call the deleteTracker method with the request and response objects
        await manageTrackers.deleteTracker(req, res);

        // Check that the findByIdAndDelete method was called with the expected ID
        sinon.assert.calledOnceWithExactly(Tracker.findByIdAndDelete, "1");

        // Check that the status method was called with 404
        expect(res.status.calledWith(404)).to.be.true;

        // Check that the json method was called with the expected error message
        expect(
            res
                .status()
                .json.calledWith({ message: "Tracker with that ID not found" })
        ).to.be.true;
    });
});


