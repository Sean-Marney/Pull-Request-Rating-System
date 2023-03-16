const chai = require("chai");
const request = require("supertest");
const app = require("../../index");
const Faq = require("../../models/FAQ.model");

describe("GET /management/manageFaqs", () => {
    it("should return all faqs and status code 200", (done) => {
        request(app)
            .get("/management/manageFaqs")
            .end((err, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.be.an("array");
                done();
            });
    });
});

describe("GET /management/manageFaqs/:id", () => {
    let faq;

    beforeEach((done) => {
        faq = new Faq({
            question: "Test question",
            answer: "Test answer",
        });

        faq.save((err) => {
            if (err) return done(err);
            done();
        });
    });

    afterEach((done) => {
        Faq.deleteMany({}, (err) => {
            if (err) return done(err);
            done();
        });
    });

    it("should return a faq and status code 200", (done) => {
        request(app)
            .get(`/management/manageFaqs/${faq._id}`)
            .end((err, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.be.an("object");
                chai.expect(res.body.question).to.equal("Test question");
                chai.expect(res.body.answer).to.equal("Test answer");
                done();
            });
    });
});

describe("POST /management/manageFaqs/create", () => {
    afterEach(async () => {
        await Faq.deleteMany({});
    });

    it("should create a question and return status code 201", (done) => {
        const faq = {
            question: "Test question 2",
            answer: "Test answer 2",
        };

        request(app)
            .post("/management/manageFaqs/create")
            .send(faq)
            .end((err, res) => {
                chai.expect(res.statusCode).to.equal(201);
                chai.expect(res.body.question).to.equal("Test question 2");
                chai.expect(res.body.answer).to.equal("Test answer 2");
                done();
            });
    });
});

describe("DELETE /management/manageFaqs/:id", () => {
    let faq;

    beforeEach((done) => {
        faq = new Faq({
            question: "Test question",
            answer: "Test answer",
        });

        faq.save((err) => {
            if (err) return done(err);
            done();
        });
    });

    afterEach((done) => {
        Faq.deleteMany({}, (err) => {
            if (err) return done(err);
            done();
        });
    });

    it("should delete a question and return status code 200", (done) => {
        request(app)
            .delete(`/management/manageFaqs/delete/${faq._id}`)
            .end((err, res) => {
                chai.expect(res.statusCode).to.equal(200);

                Faq.findById(faq._id, (err, faq) => {
                    if (err) return done(err);
                    chai.expect(faq).to.equal(null);
                    done();
                });
            });
    });
});

