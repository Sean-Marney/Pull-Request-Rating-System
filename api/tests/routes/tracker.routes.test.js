// const chai = require("chai");
// const request = require("supertest");
// const app = require("../../index");
// const Tracker = require("../../models/tracker.model");

// describe("GET /management/trackers", () => {
//     it("should return all trackers and status code 200", (done) => {
//         request(app)
//             .get("/management/trackers")
//             .end((err, res) => {
//                 chai.expect(res.statusCode).to.equal(200);
//                 chai.expect(res.body).to.be.an("array");
//                 done();
//             });
//     }).timeout(100000); 
// });

// describe("GET /management/trackers/:id", () => {
//     let tracker;

//     beforeEach((done) => {
//         tracker = new Tracker({
//             name: "Design Patterns",
//         });

//         tracker.save((err) => {
//             if (err) return done(err);
//             done();
//         });
//     });

//     afterEach((done) => {
//         Tracker.deleteMany({}, (err) => {
//             if (err) return done(err);
//             done();
//         });
//     });

//     it("should return a tracker and status code 200", (done) => {
//         request(app)
//             .get(`/management/trackers/${tracker._id}`)
//             .end((err, res) => {
//                 chai.expect(res.statusCode).to.equal(200);
//                 chai.expect(res.body).to.be.an("object");
//                 chai.expect(res.body.name).to.equal("Design Patterns");
//                 done();
//             });
//     }).timeout(100000); 
// });

// describe("POST /management/trackers/create", () => {
//     afterEach(async () => {
//         await Tracker.deleteMany({});
//     });

//     it("should create a tracker and return status code 201", (done) => {
//         const tracker = {
//             name: "Design Patterns",
//         };

//         request(app)
//             .post("/management/trackers/create")
//             .send(tracker)
//             .end((err, res) => {
//                 chai.expect(res.statusCode).to.equal(201);
//                 chai.expect(res.body.name).to.equal("Design Patterns");
//                 done();
//             });
//     }).timeout(100000); 
// });

// describe("PATCH /management/trackers/:id", () => {
//     let tracker;

//     beforeEach((done) => {
//         tracker = new Tracker({
//             name: "design Patterns",
//         });

//         tracker.save((err) => {
//             if (err) return done(err);
//             done();
//         });
//     });

//     afterEach((done) => {
//         Tracker.deleteMany({}, (err) => {
//             if (err) return done(err);
//             done();
//         });
//     });

//     it("should update a tracker and return status code 200", (done) => {
//         request(app)
//             .patch(`/management/trackers/update/${tracker._id}`)
//             .send({ name: "Design Patterns new" })
//             .end((err, res) => {
//                 chai.expect(res.statusCode).to.equal(200);
//                 chai.expect(res.body).to.be.an("object");
//                 chai.expect(res.body.name).to.equal("Design Patterns new");
//                 done();
//             });
//     }).timeout(100000); 
// });

// describe("DELETE /management/trackers/:id", () => {
//     let tracker;

//     beforeEach((done) => {
//         tracker = new Tracker({
//             name: "Design Patterns",
//         });

//         tracker.save((err) => {
//             if (err) return done(err);
//             done();
//         });
//     });

//     afterEach((done) => {
//         Tracker.deleteMany({}, (err) => {
//             if (err) return done(err);
//             done();
//         });
//     });

//     it("should delete a tracker and return status code 200", (done) => {
//         request(app)
//             .delete(`/management/trackers/delete/${tracker._id}`)
//             .end((err, res) => {
//                 chai.expect(res.statusCode).to.equal(200);

//                 Tracker.findById(tracker._id, (err, tracker) => {
//                     if (err) return done(err);
//                     chai.expect(tracker).to.equal(null);
//                     done();
//                 });
//             });
//     }).timeout(100000); 
// });
