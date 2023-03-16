// const chai = require("chai");
// const request = require("supertest");
// const app = require("../../index");
// const User = require("../../models/user.model");

// describe("GET /management/users", () => {
//     it("should return all users and status code 200", (done) => {
//         request(app)
//             .get("/management/users")
//             .end((err, res) => {
//                 chai.expect(res.statusCode).to.equal(200);
//                 chai.expect(res.body).to.be.an("array");
//                 done();
//             });
//     }).timeout(100000); 
// });

// describe("GET /management/users/:id", () => {
//     let user;

//     beforeEach((done) => {
//         user = new User({
//             name: "Martin Dawes",
//             email: "martin@gmail.com",
//             password: "12345",
//             hasRole: "Developer",
//         });

//         user.save((err) => {
//             if (err) return done(err);
//             done();
//         })
//     });

//     afterEach((done) => {
//         User.deleteMany({}, (err) => {
//             if (err) return done(err);
//             done();
//         });
//     });

//     it("should return a user and status code 200", (done) => {
//         request(app)
//             .get(`/management/users/${user._id}`)
//             .end((err, res) => {
//                 chai.expect(res.statusCode).to.equal(200);
//                 chai.expect(res.body).to.be.an("object");
//                 chai.expect(res.body.name).to.equal("Martin Dawes");
//                 chai.expect(res.body.email).to.equal("martin@gmail.com");
//                 chai.expect(res.body.password).to.equal("12345");
//                 chai.expect(res.body.hasRole).to.equal("Developer");
//                 done();
//             });
//     }).timeout(100000); 
// });


// describe("PATCH /management/users/:id", () => {
//     let user;

//     beforeEach((done) => {
//         user = new User({
//             name: "Martin Dawes",
//             email: "martin@gmail.com",
//             password: "12345",
//             hasRole: "Developer",
//         });

//         user.save((err) => {
//             if (err) return done(err);
//             done();
//         });
//     })

//     afterEach((done) => {
//         User.deleteMany({}, (err) => {
//             if (err) return done(err);
//             done();
//         });
//     });

//     it("should update a user and return status code 200", (done) => {
//         request(app)
//             .patch(`/management/users/update/${user._id}`)
//             .send({
//                 name: "Developer Dawes",
//                 email: "martin@gmail.com",
//                 password: "12345",
//                 hasRole: "Developer",
//             })
//             .end((err, res) => {
//                 chai.expect(res.statusCode).to.equal(200);
//                 chai.expect(res.body).to.be.an("object");
//                 chai.expect(res.body.name).to.equal("Developer Dawes");
//                 chai.expect(res.body.email).to.equal("martin@gmail.com");
//                 chai.expect(res.body.password).to.equal("12345");
//                 chai.expect(res.body.hasRole).to.equal("Developer");
//                 done();
//             });
//     }).timeout(100000); 
// });

// describe("DELETE /management/users/:id", () => {
//     let user;

//     beforeEach((done) => {
//         user = new User({
//             name: "Developer Dawes",
//             email: "martin@gmail.com",
//             password: "12345",
//             hasRole: "Developer",
//         });

//         user.save((err) => {
//             if (err) return done(err);
//             done();
//         });
//     });

//     afterEach((done) => {
//         User.deleteOne({ _id: user._id }, (err) => {
//             if (err) return done(err);
//             done();
//         });
//     });

//     it("should delete a user and return status code 200", (done) => {
//         request(app)
//             .delete(`/management/users/delete/${user._id}`)
//             .end((err, res) => {
//                 chai.expect(res.statusCode).to.equal(200);

//                 User.findById(user._id, (err, user) => {
//                     if (err) return done(err);
//                     chai.expect(user).to.equal(null);
//                     done();
//                 });
//             });
//     }).timeout(100000);
// });

