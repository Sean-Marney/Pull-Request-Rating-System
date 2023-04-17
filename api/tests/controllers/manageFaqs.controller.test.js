const expect = require("chai").expect;
const sinon = require("sinon");
const Faq = require("../../models/FAQ.model");
const manageFaqs = require("../../controllers/faq.controller");
const app = require("../../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.should();

describe("GET all faqs from /management/manageFaqs using the getFaqs controller method", () => {
    let testFaqs;

    beforeEach(() => {
        testFaqs = [
            { _id: "1", question: "test 1", answer: "answer 1" },
            { _id: "2", question: "test 2", answer: "answer 2" },
            { _id: "3", question: "test 3", answer: "answer 3" },
        ];
        sinon.stub(Faq, "find").resolves(testFaqs);
    });

    afterEach(() => {
        Faq.find.restore();
    });

    it("should return an array of questions with expected length", async () => {
        const req = {};
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        await manageFaqs.getFaq(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.status().json.calledWith(testFaqs)).to.be.true;
    });

    it("should return questions with expected properties", async () => {
        const req = {};
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        await manageFaqs.getFaq(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.status().json.calledWith(testFaqs)).to.be.true;

        testFaqs.forEach((faq) => {
            expect(faq).to.have.property("_id");
            expect(faq).to.have.property("question");
            expect(faq).to.have.property("answer");
            expect(faq._id).to.be.a("string");
            expect(faq.question).to.be.a("string");
            expect(faq.answer).to.be.a("string");
        });
    });
});

// describe("GET question by ID from /management/manageFaqs using the getFaqs controller method", () => {
//     let testFaqs;

//     beforeEach(() => {
//         testFaqs = { _id: "1", question: "test question", answer: "test answer" };
//         sinon.stub(Faq, "findById").resolves(testFaqs);
//     });

//     afterEach(() => {
//         Faq.findById.restore();
//     });

//     it("should return a question with the expected ID", async () => {
//         const req = { params: { id: "1" } };
//         const res = {
//             status: sinon.stub().returns({ json: sinon.stub() }),
//         };

//         await manageFaqs.getFaqById(req, res);

//         expect(res.status.calledWith(200)).to.be.true;
//         expect(res.status().json.calledWith(testFaqs)).to.be.true;
//     });

//     it("should return a questions with the expected length", async () => {
//         const req = { params: { id: "1" } };
//         const res = {
//             status: sinon.stub().returns({ json: sinon.stub() }),
//         };

//         await testFaqs.getFaqById(req, res);

//         expect(res.status.calledWith(200)).to.be.true;
//         expect(res.status().json.calledWith(testFaqs)).to.be.true;
//     });

//     it("should return a question with the expected properties", async () => {
//         const req = { params: { id: "1" } };
//         const res = {
//             status: sinon.stub().returns({ json: sinon.stub() }),
//         };

//         await testFaqs.getFaqById(req, res);

//         expect(res.status.calledWith(200)).to.be.true;
//         expect(res.status().json.calledWith(testFaqs)).to.be.true;

//         expect(testFaqs).to.have.property("_id");
//         expect(testFaqs).to.have.property("question");
//         expect(testFaqs).to.have.property("answer");
//         expect(testFaqs._id).to.be.a("string");
//         expect(testFaqs.question).to.be.a("string");
//         expect(testFaqs.answer).to.be.a("string");
//     });
// });

describe("CREATE faq at /management/manageFaq/create using the createFaq controller method", () => {
    it("should create an faq and save it to the database with a 201 response code", async () => {
        const faqData = {
            question: "Test question",
            answer: "test answer",
        };
        const req = { body: faqData };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const faq = new Faq(faqData);
        sinon.stub(Faq.prototype, "save").resolves(faq);

        await manageFaqs.createFAQs(req, res);

        sinon.assert.calledOnce(faq.save);
        sinon.assert.calledOnceWithExactly(res.status, 201);
    });
});

// describe("DELETE FAQ by ID from /management/manageFaq/delete/:id using the deleteFAQs controller method", () => {
//     it("should delete a faqs with the given ID", async () => {
//         const faqId = "1";
//         const faq = new Faq({ _id: faqId });
//         const req = { params: { id: faqId } };
//         const res = {
//             status: sinon.stub().returns({
//                 json: sinon.stub(),
//             }),
//         };

//         sinon.stub(Faq, "findById").resolves(faq);
//         sinon.stub(faq, "remove").resolves();

//         await manageFaqs.deleteFAQs(req, res);

//         sinon.assert.calledOnceWithExactly(Faq.findById, faqId);
//         sinon.assert.calledOnce(faq.remove);
//         sinon.assert.calledOnceWithExactly(res.status, 200);
//     });
// });

// describe("UPDATE faq by ID from /management/manageFaq/update/:id using the updateFaqs controller method", () => {
//     it("should update a faq with the given ID", async () => {
//         const faq = new Faq({
//             question: "Test question",
//             answer: "Test answer",
//         });
//         await faq.save();

//         const res = await chai
//             .request(app)
//             .patch(`/management/manageFaqs/update/${faq.id}`)
//             .send({
//                 question: "Updated Test Question",
//                 answer: "Updated Test Answer",
//             });

//         res.should.have.status(200);
//         res.body.should.have.property("question").eql("Updated Test Question");
//         res.body.should.have.property("answer").eql("Updated Test Answer");
//     });
// });
