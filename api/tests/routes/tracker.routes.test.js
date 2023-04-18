const chai = require("chai");
const request = require("supertest");
const app = require("../../index");
const sinon = require("sinon");
const Tracker = require("../../models/tracker.model");

const mockTracker = {
    _id: "60720497f99eeb23c42ec6a7",
    name: "Performance"
};

describe("GET /management/trackers", () => {
    afterEach(() => {
        sinon.restore();
    });
    it("should return all trackers and status code 200", (done) => {
        const trackerFindStub = sinon.stub(Tracker, "find").resolves([mockTracker]);

        request(app)
            .get("/management/trackers")
            .end((err, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.be.an("array");
                chai.expect(res.body[0].name).to.equal(mockTracker.name);
                trackerFindStub.restore();
                done();
            });
    }); 
});

describe("GET /management/trackers/:id", () => {
    afterEach(() => {
        sinon.restore();
    });
    it("should return a tracker and status code 200", (done) => {
        const trackerFindStub = sinon.stub(Tracker, "findById").resolves(mockTracker);

        request(app)
            .get(`/management/trackers/${mockTracker._id}`)
            .end((err, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.be.an("object");
                chai.expect(res.body.name).to.equal(mockTracker.name);
                trackerFindStub.restore();
                done();
            });
    });
});

describe("DELETE /management/trackers/delete/:id", () => {
    afterEach(() => {
        sinon.restore();
    });
    it("should delete a tracker and return status code 200", (done) => {
        const trackerfindByIdAndDeleteStub = sinon
            .stub(Tracker, "findByIdAndDelete")
            .resolves(mockTracker);

        request(app)
            .delete(`/management/trackers/delete/${mockTracker._id}`)
            .end((err, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body.message).to.equal("Tracker deleted");
                trackerfindByIdAndDeleteStub.restore();
                done();
            });
    });
});

describe("PATCH /management/trackers/update/:id", () => {
    afterEach(() => {
        sinon.restore();
    });
    it("should update a tracker and return status code 200", (done) => {
        const mockUpdatedTracker = {
            name: "Code quality",
        };
        const mockTracker = {
            _id: "mockUserId",
            name: "Performance",
            save: sinon.stub().resolves(),
        };
        const trackerFindStub = sinon.stub(Tracker, "findById").resolves(mockTracker);

        request(app)
            .patch(`/management/trackers/update/${mockTracker._id}`)
            .send(mockUpdatedTracker)
            .end((err, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.be.an("object");
                chai.expect(res.body._id).to.equal(mockTracker._id);
                chai.expect(res.body.name).to.equal(mockUpdatedTracker.name);
                trackerFindStub.restore();
                done();
            });
    });
});

describe("POST /management/trackers/create", () => {
    afterEach(() => {
        sinon.restore();
    });
    it("should create a tracker and return status code 201", async () => {
        const reqBody = {
            name: "Performance",
        };
        const trackerMock = sinon.mock(Tracker.prototype);
        trackerMock.expects("save").once().resolves({
            name: reqBody.name,
        });

        const res = await request(app)
            .post("/management/trackers/create")
            .send(reqBody);
        chai.expect(res.statusCode).to.equal(201);
        chai.expect(res.body).to.be.an("object");
        chai.expect(res.body.name).to.equal(reqBody.name);

        trackerMock.verify();
        trackerMock.restore();
    });
});
