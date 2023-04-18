const chai = require("chai");
const sinon = require("sinon");
const request = require("supertest");
const app = require("../../index");
const Faq = require("../../models/FAQ.model");

// get all faq route test
describe("GET /management/manageFaqs", () => {
  it("should return all faqs and status code 200", (done) => {
    const mockFaq = {
      question: "How to get a free pizza?",
      answer: "I want a free pizza!",
    };
    const faqFindStub = sinon.stub(Faq, "find").resolves([mockFaq]);
    request(app)
      .get("/management/manageFaqs")
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(200);
        chai.expect(res.body).to.be.an("array");
        chai.expect(res.body[0].question).to.equal(mockFaq.question);
        chai.expect(res.body[0].answer).to.equal(mockFaq.answer);
        faqFindStub.restore();
        done();
      });
  });
});

// get faq by id route test
// describe("GET /management/manageFaqs/:id", () => {
//   let faq;

//   beforeEach((done) => {
//     faq = new Faq({
//       question: "Test question",
//       answer: "Test answer",
//     });

//     faq.save((err) => {
//       if (err) return done(err);
//       done();
//     });
//   });

//   afterEach((done) => {
//     sinon.restore();
//     Faq.deleteMany({}, (err) => {
//       if (err) return done(err);
//       done();
//     });
//   });

//   it("should return a faq and status code 200", (done) => {
//     request(app)
//       .get(`/management/manageFaqs/${faq._id}`)
//       .end((err, res) => {
//         chai.expect(res.statusCode).to.equal(200);
//         chai.expect(res.body).to.be.an("object");
//         chai.expect(res.body.question).to.equal("Test question");
//         chai.expect(res.body.answer).to.equal("Test answer");
//         done();
//       });
//   });
// });

// update route test
// describe("PATCH /management/manageFaqs/:id", () => {
//   let faq;

//   beforeEach((done) => {
//     faq = new Faq({
//       question: "Test question",
//       answer: "Test answer",
//     });

//     faq.save((err) => {
//       if (err) return done(err);
//       done();
//     });
//   });

//   afterEach((done) => {
//     sinon.restore();
//     Faq.deleteMany({}, (err) => {
//       if (err) return done(err);
//       done();
//     });
//   });

//   it("should update a faq and return status code 200", (done) => {
//     const findByIdAndUpdateStub = sinon
//       .stub(Faq, "findByIdAndUpdate")
//       .resolves({
//         question: "Do you want free ice cream",
//         answer: "No you can't have one",
//       });

//     request(app)
//       .patch(`/management/manageFaqs/update/${faq._id}`)
//       .send({
//         question: "Do you want free ice cream",
//         answer: "Yes you can have one",
//       })
//       .end((err, res) => {
//         chai.expect(res.statusCode).to.equal(200);
//         chai.expect(res.body).to.be.an("object");
//         chai.expect(res.body.question).to.equal("Do you want free ice cream");
//         chai.expect(res.body.answer).to.equal("Yes you can have one");
//         findByIdAndUpdateStub.restore();
//         done();
//       });
//   });
// });

// create faq route test
describe("POST /management/manageFaqs/create", () => {
  afterEach((done) => {
    sinon.restore();
    Faq.deleteMany({}, (err) => {
      if (err) return done(err);
      done();
    });
  });

  it("should create an faq and return status code 201", (done) => {
    const mockFaq = {
      question: "Test question 2",
      answer: "Test answer 2",
    };
    const faqCreateStub = sinon.stub(Faq, "create").resolves(mockFaq);

    request(app)
      .post("/management/manageFaqs/create")
      .send(mockFaq)
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(201);
        chai.expect(res.body.question).to.equal(mockFaq.question);
        chai.expect(res.body.answer).to.equal(mockFaq.answer);
        faqCreateStub.restore();
        done();
      });
  });
});

// delete faq by id route test
// describe("DELETE /management/manageFaqs/:id", () => {
//   let faq;

//   beforeEach((done) => {
//     faq = new Faq({
//       question: "Test question",
//       answer: "Test answer",
//     });

//     faq.save((err) => {
//       if (err) return done(err);
//       done();
//     });
//   });

//   afterEach((done) => {
//     sinon.restore();
//     Faq.deleteMany({}, (err) => {
//       if (err) return done(err);
//       done();
//     });
//   });

//   it("should delete an faq and return status code 200", async () => {
//     const res = await request(app)
//       .delete(`/management/manageFaqs/delete/${faq._id}`);

//         chai.expect(res.statusCode).to.equal(200);
//         chai.expect(res.body).to.be.an("object");
//         chai.expect(res.body.question).to.equal("Test question");
//         chai.expect(res.body.answer).to.equal("Test answer");
//         done();
//       });
//   });
// });

// // update route test
// describe("PATCH /management/manageFaqs/:id", () => {
//     let faq;
  
//     beforeEach((done) => {
//       faq = new Faq({
//         question: "Test question",
//         answer: "Test answer",
//       });
  
//       faq.save((err) => {
//         if (err) return done(err);
//         done();
//       });
//     });
  
//     afterEach((done) => {
//       sinon.restore();
//       Faq.deleteMany({}, (err) => {
//         if (err) return done(err);
//         done();
//       });
//     });
  
//     it("should update a faq and return status code 200", (done) => {
//         const findByIdAndUpdateStub = sinon
//             .stub(Faq, "findByIdAndUpdate")
//             .resolves({
//             question: "Do you want free ice cream",
//             answer: "No you can't have one",
//             });


//       request(app)
//         .patch(`/management/manageFaqs/update/${faq._id}`)
//         .send({ question: "Do you want free ice cream", answer: "Yes you can have one" })
//         .end((err, res) => {
//           chai.expect(res.statusCode).to.equal(200);
//           chai.expect(res.body).to.be.an("object");
//           chai.expect(res.body.question).to.equal("Do you want free ice cream");
//           chai.expect(res.body.answer).to.equal("Yes you can have one");
//           findByIdAndUpdateStub.restore();
//           done();
//         });
//     });
//   });

// // create faq route test
// describe("POST /management/manageFaqs/create", () => {
//   afterEach((done) => {
//     sinon.restore();
//     Faq.deleteMany({}, (err) => {
//         if (err) return done(err);
//         done();
//     });
//   });

//   it("should create an faq and return status code 201", (done) => {
//     const mockFaq = {
//       question: "Test question 2",
//       answer: "Test answer 2"};
//     const faqCreateStub = sinon.stub(Faq, "create").resolves(mockFaq);

//     request(app)
//       .post("/management/manageFaqs/create")
//       .send(mockFaq)
//       .end((err, res) => {
//         chai.expect(res.statusCode).to.equal(201);
//         chai.expect(res.body.question).to.equal(mockFaq.question);
//         chai.expect(res.body.answer).to.equal(mockFaq.answer);
//         faqCreateStub.restore();
//         done();
//       });
//   });
// });

// // delete faq by id route test
// // describe("DELETE /management/manageFaqs/:id", () => {
// //   let faq;

// //   beforeEach(async () => {
// //     faq = new Faq({
// //       question: "Test question",
// //       answer: "Test answer",
// //     });

// //     await faq.save() ;
// //   });

// //   afterEach(async () => {
// //     await Faq.deleteMany({});
// //   });

// //   it("should delete an faq and return status code 200", async () => {
// //     const res = await request(app)
// //       .delete(`/management/manageFaqs/delete/${faq._id}`);
      
// //         chai.expect(res.statusCode).to.equal(200);

// //         const deletedFaq = await Faq.findById(faq._id);

// //         chai.expect(deletedFaq).to.be.null;
// //     });
// // })
