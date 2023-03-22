const expect = require("chai").expect;
const sinon = require("sinon");
const Questions = require("../../models/questions.model.js");
const manageQuestions = require("../../controllers/newQuestions.controller");
const app = require("../../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.should();

describe("GET all new questions from /management/questions using the getQuestions controller method", () => {
    let testQuestion;

    beforeEach(() => {
        testQuestion = [
            { _id: "1", question: "test 1" },
            { _id: "2", question: "test 2" },
            { _id: "3", question: "test 3" },
        ];
        sinon.stub(Questions, "find").resolves(testQuestion);
    });

    afterEach(() => {
        Questions.find.restore();
    });

    it("should return an array of questions with expected length", async () => {
        const req = {};
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        await manageQuestions.getQuestions(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.status().json.calledWith(testQuestion)).to.be.true;
    });

    it("should return questions with expected properties", async () => {
        const req = {};
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        await manageQuestions.getQuestions(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.status().json.calledWith(testQuestion)).to.be.true;

        testQuestion.forEach((questions) => {
            expect(questions).to.have.property("_id");
            expect(questions).to.have.property("question");
            expect(questions._id).to.be.a("string");
            expect(questions.question).to.be.a("string");
        });
    });
});


describe("GET question by ID from /management/questions using the getQuestions controller method", () => {
    let mockQuestion;
  
    beforeEach(() => {
        mockQuestion = { _id: "1", question: "Question 1" };
      sinon.stub(Questions, "findById").resolves(mockQuestion);
    });
  
    afterEach(() => {
        Questions.findById.restore();
    });
  
    it("should return a question with the expected ID", async () => {
      const req = { params: { id: "1" } };
      const res = {
        status: sinon.stub().returns({ json: sinon.stub() }),
      };
  
      await manageQuestions.getQuestionById(req, res);
  
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.status().json.calledWith(mockQuestion)).to.be.true;
    });
  
    it("should return a question with the expected length", async () => {
      const req = { params: { id: "1" } };
      const res = {
        status: sinon.stub().returns({ json: sinon.stub() }),
      };
  
      await manageQuestions.getQuestionById(req, res);
  
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.status().json.calledWith(mockQuestion)).to.be.true;
    });
  
    it("should return a question with the expected properties", async () => {
      const req = { params: { id: "1" } };
      const res = {
        status: sinon.stub().returns({ json: sinon.stub() }),
      };
  
      await manageQuestions.getQuestionById(req, res);
  
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.status().json.calledWith(mockQuestion)).to.be.true;
  
      expect(mockQuestion).to.have.property("_id");
      expect(mockQuestion).to.have.property("question");
      expect(mockQuestion._id).to.be.a("string");
      expect(mockQuestion.question).to.be.a("string");
    });
});

describe("DELETE Question by ID from /management/questions/delete/:id using the deleteQuestions controller method", () => {
    it("should delete a question with the given ID", async () => {
        const questionId = "3";
        const question = new Questions({ _id: questionId });
        const req = { params: { id: questionId } };
        const res = {
            status: sinon.stub().returns({
                json: sinon.stub(),
            }),
        };

        sinon.stub(Questions, "findById").resolves(question);
        sinon.stub(question, "remove").resolves();

        await manageQuestions.deleteQuestions(req, res);

        sinon.assert.calledOnceWithExactly(Questions.findById, questionId);
        sinon.assert.calledOnce(question.remove);
        sinon.assert.calledOnceWithExactly(res.status, 200);
    });
});
