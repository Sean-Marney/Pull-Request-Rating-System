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
                currently_used: "true",
            },
            {
                _id: "2",
                name: "Conventions",
                currently_used: "true",
            },
            {
                _id: "3",
                name: "Quality",
                currently_used: "true",
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
            expect(tracker).to.have.property("currently_used");
            expect(tracker._id).to.be.a("string");
            expect(tracker.name).to.be.a("string");
            expect(tracker.currently_used).to.be.a("string");
        });
    });
});
