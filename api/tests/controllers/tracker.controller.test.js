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
        sinon.replace(
            Tracker.prototype,
            "save",
            sinon.stub().resolves(tracker)
        );


        await manageTrackers.createTracker(req, res);

        sinon.assert.calledOnce(tracker.save);
        sinon.assert.calledOnceWithExactly(res.status, 201);
    });
});

describe("DELETE tracker by ID from /management/trackers/delete/:id using the deleteTracker controller method", () => {
    it("should delete a tracker with the given ID", async () => {
        // Create a tracker ID (simple string)
        const trackerId = "1234567890";

        // Create a request object with the ID parameter
        const req = { params: { id: trackerId } };

        // Create a response object with a stubbed status function that returns a JSON object
        const res = {
            status: sinon.stub().returns({
                json: sinon.stub(),
            }),
        };

        // Create a tracker mock
        const tracker = { _id: trackerId };

        // Stub the findByIdAndDelete method of the Tracker model to resolve with the tracker mock
        sinon.replace(
            Tracker,
            "findByIdAndDelete",
            sinon.stub().resolves(tracker)
        );


        // Call the deleteTracker controller method with the request and response objects
        await manageTrackers.deleteTracker(req, res);

        // Verify that the findByIdAndDelete method of the Tracker model was called with the correct ID
        sinon.assert.calledOnceWithExactly(
            Tracker.findByIdAndDelete,
            trackerId
        );

        // Verify that the status function of the response object was called with a 200 status code
        sinon.assert.calledOnceWithExactly(res.status, 200);
    });
});
