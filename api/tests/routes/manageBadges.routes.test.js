const chai = require("chai");
const request = require("supertest");
const app = require("../../index");
const sinon = require("sinon");
const Badge = require("../../models/badges.model");
var fs = require('fs');
let path = require('path');
const Binary = require('mongodb').Binary;
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const mockBadge = {
    _id: "60720497f99eeb23c42ec6a7",
    name: "Badge 1",
    value: 1
};


// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'images');
//     },
//     filename: function(req, file, cb) {   
//         cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// const fileFilter = (req, file, cb) => {
//     const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//     if(allowedFileTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

let upload = multer({ storage, fileFilter });

describe("GET /all", () => {
    it("should return all levels and status code 200", (done) => {
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

// describe("POST /management/trackers/create", () => {
//     it("should create a badge and return status code 201", async () => {
//         const reqBody = {
//             name: "Test Badge",
//             value: 1,
//             img: {contentType: 'image/png'}
//         };
//         const badge = new Badge({name: "Test Badge",value: 1,img: {contentType: 'image/png'}});
//         let saveStub = sinon.stub(Badge.prototype, "save").resolves(badge);
//         let fsStub = sinon.stub(fs, "readFileSync").resolves(await new Binary(Buffer.from("89504e470d0a1a0a0000000d4948445200000015000000160802000000a0e1406f000000017352474200aece1ce90000000467414d410000b18f0bfc61050000000970485973000016250000162501495224f00000003549444154384f63f84f191856fa190801a83a2430aa1f094055c100561134404bfb3101541d121856fac900a3fa290394e9ffff1f006fc8fe2ca56803f80000000049454e44ae426082", "hex"), 0));
//         let unlinkFsStub = sinon.stub(fs, "unlinkSync").resolves();
//         let uploadStub =  sinon.stub(upload,"single").resolves({file: {filename: 'test.png'}});

//         const res = await request(app)
//             .post("/management/badge/upload")
//             .send(reqBody);
//         chai.expect(res.statusCode).to.equal(201);
//         chai.expect(res.body).to.be.an("object");
//         chai.expect(res.body.name).to.equal(reqBody.name);
//         saveStub.restore();
//         fsStub.restore();
//         uploadStub.restore();
//         unlinkFsStub.restore();
//     });
// });