const chai = require("chai");
const request = require("supertest");
const app = require("../../index");
const sinon = require("sinon");
const Badge = require("../../models/badges.model");
const mockBadge = {
    _id: "60720497f99eeb23c42ec6a7",
    name: "Badge 1",
    value: 1
};

describe("GET /all", () => {
    it("should return all badges and status code 200", (done) => {
        const sortByValue = { value: 1 };
        let badgeFindStub = sinon.stub(Badge, 'find').returns({
            sort: sinon.stub().withArgs(sortByValue).returns([mockBadge])
        });
        request(app)
            .get("/badge/all")
            .end((err, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.be.an("array");
                chai.expect(res.body[0].name).to.equal(mockBadge.name);
                badgeFindStub.restore();
                done();
            });
    }); 
});

describe("GET /management/badge/get/:id", () => {
    it("should return a badge and status code 200", (done) => {
        let badge = {
            _id: "60720497f99eeb23c42ec6a7",
            name: "Badge 1",
            value: 1
        };
        const badgeFindByID = sinon.stub(Badge, "findById").resolves(badge);

        request(app)
            .get(`/management/badge/get/${badge._id}`)
            .end((err, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.be.an("object");
                chai.expect(res.body.name).to.equal(badge.name);
                badgeFindByID.restore();
                done();
            });
    });
});

describe("DELETE /management/badge/delete/:id", () => {
    it("should delete a badge and return status code 200", (done) => {
        let badge = new Badge({
            _id: "60720497f99eeb23c42ec6a7",
            name: "Badge 1",
            value: 1
        });
        const findByID = sinon.stub(Badge, "findById").resolves(badge);
        const deleteStub = sinon.stub(badge, "remove").resolves();

        request(app)
            .delete(`/management/badge/delete/${badge._id}`)
            .end((err, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body.message).to.equal("Badge deleted");
                findByID.restore();
                deleteStub.restore();
                done();
            });
    });
});

describe("PATCH /management/badge/update/:id", () => {
    it("should update a badge and return status code 200", (done) => {
        const mockUpdatedBadge= new Badge({
            _id: "60720497f99eeb23c42ec6a7",
            name: "Badge 2",
            value: 2
        });
        const badge = new Badge({
            _id: "60720497f99eeb23c42ec6a7",
            name: "Badge 1",
            value: 1
        });
        let params = {badgeName:"Badge 2", starsRequired:2};
        const badgeFindByIDStub = sinon.stub(Badge, "findById").resolves(badge);
        const badgeSaveStub = sinon.stub(badge, "save").resolves(mockUpdatedBadge);
        request(app)
            .patch(`/management/badge/update/${badge._id}`)
            .send(params)
            .end((err, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.be.an("object");
                chai.expect(res.body.name).to.equal(mockUpdatedBadge.name);
                chai.expect(res.body.value).to.equal(mockUpdatedBadge.value);
                badgeFindByIDStub.restore();
                badgeSaveStub.restore();
                done();
            });
    });
});