const expect = require("chai").expect;
const sinon = require("sinon");
const PullRequest = require("../../models/PullRequest");
const {getPullRequestsForUser} = require("../../controllers/pullRequests");
const app = require("../../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.should();

describe("GET all pull requests for a user", () => {
  let pullRequests;

  beforeEach(() => {
    mockPullRequests = [
      {_id:"1",url:"https://git.cardiff.ac.uk/",assignee:"Owain Lansdowne",user_id:"1",rating_complete:true,ratings:{overall:15,code_quality:5,following_naming_convention:5,bug_free:5,additional_innovation:5,code_readibility:5},date:"2022-02-16T00:00:00.000+00:00",title:"Nav Bar has been fixed"},
      {_id:"2",url:"https://git.cardiff.ac.uk/",assignee:"Owain Lansdowne",user_id:"1",rating_complete:true,ratings:{overall:15,code_quality:5,following_naming_convention:5,bug_free:5,additional_innovation:5,code_readibility:5},date:"2022-02-16T00:00:00.000+00:00",title:"Nav Bar has been fixed"},
      {_id:"3",url:"https://git.cardiff.ac.uk/",assignee:"Owain Lansdowne",user_id:"2",rating_complete:true,ratings:{overall:15,code_quality:5,following_naming_convention:5,bug_free:5,additional_innovation:5,code_readibility:5},date:"2022-02-16T00:00:00.000+00:00",title:"Nav Bar has been fixed"},
      {_id:"4",url:"https://git.cardiff.ac.uk/",assignee:"Owain Lansdowne",user_id:"3",rating_complete:true,ratings:{overall:15,code_quality:5,following_naming_convention:5,bug_free:5,additional_innovation:5,code_readibility:5},date:"2022-02-16T00:00:00.000+00:00",title:"Nav Bar has been fixed"}
    ];
    sinon.stub(PullRequest, "find").resolves(mockPullRequests);
  });

  afterEach(() => {
    PullRequest.find.restore();
  });

  it("should return a 200 status code", async () => {
    const req = { params: { id: "1" } };;
    const res = {
      status: sinon.stub().returns({ json: sinon.stub() }),
    };
    await getPullRequestsForUser(req, res);    
    expect(res.status.calledWith(200)).to.be.true;
  });
  it("should return 2 pull requests for user 1", async () => {
    const req = { params: { id: "1" } };;
    const res = {
      status: sinon.stub().returns({ json: sinon.stub() }),
    };
    await getPullRequestsForUser(req, res);   
    expect(res.status().json.calledWith(mockPullRequests)).to.be.true; 
  });

} );  