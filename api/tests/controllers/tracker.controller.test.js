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
    let saveStub;

    beforeEach(() => {
        saveStub = sinon.stub(Tracker.prototype, "save");
    });

    afterEach(() => {
        saveStub.restore();
    });

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
        saveStub.resolves(tracker);

        await manageTrackers.createTracker(req, res);

        sinon.assert.calledOnce(saveStub);
        sinon.assert.calledOnceWithExactly(res.status, 201);
    });
});


describe("DELETE tracker by ID from /management/trackers/delete/:id using the deleteTracker controller method", () => {
    let findByIdAndDeleteStub;

    beforeEach(() => {
        findByIdAndDeleteStub = sinon.stub(Tracker, "findByIdAndDelete");
    });

    afterEach(() => {
        findByIdAndDeleteStub.restore();
    });

    it("should delete a tracker with the given ID", async () => {
        const trackerId = "1234567890";
        const req = { params: { id: trackerId } };
        const res = {
            status: sinon.stub().returns({
                json: sinon.stub(),
            }),
        };

        const tracker = { _id: trackerId };
        findByIdAndDeleteStub.resolves(tracker);

        await manageTrackers.deleteTracker(req, res);

        sinon.assert.calledOnceWithExactly(
            Tracker.findByIdAndDelete,
            trackerId
        );

        sinon.assert.calledOnceWithExactly(res.status, 200);
    });
});

