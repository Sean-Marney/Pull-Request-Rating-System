const chai = require("chai");
const request = require("supertest");
const app = require("../../index");
const PullRequest = require("../../models/pullRequest.model");

describe("GET /pullrequests/history", () => {
  it("should return the list of pull requests and status code 200", (done) => {
    request(app)
      .get("/pullrequests/history/2")
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(200);
        chai.expect(res.body).to.be.an("array");
        done();
      });
  });
});

describe("GET /pullrequest/history/:id", () => {
    let pullRequest;
  
    beforeEach((done) => {
      pullRequest = new PullRequest(
        {git_id:"1",url:"https://git.cardiff.ac.uk/",assignee:"Owain Lansdowne",user_id:"1",rating_complete:true,date:"2023/02/14",title:"Nav Bar has been fixed"
      });
  
      pullRequest.save((err) => {
        if (err) return done(err);
        done();
      });
    });
  
    afterEach((done) => {
        PullRequest.deleteMany({}, (err) => {
        if (err) return done(err);
        done();
      });
    });
  
    it("should return a reward and status code 200", (done) => {
      request(app)
        .get(`/pullrequests/history/1`)
        .end((err, res) => {
          chai.expect(res.statusCode).to.equal(200);
          chai.expect(res.body).to.be.an("array");
          done();
          console.log(res.body)
        });
    });
  });
  

