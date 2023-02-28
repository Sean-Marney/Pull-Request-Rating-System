const axios = require("axios");
const sinon = require("sinon");
const { expect } = require("chai");
// const PullRequestModel = require("../models/pullRequest.model");
const User = require("../../models/user.model");
const { readListOfFullNames, readUserID, changeName, updatePullRequestsToDatabase} = require("../../controllers/repositories.controller");
const PullRequest = require("../../models/pullRequest.model");

describe("Getting list of users", () => {
  it("should return all the list of users", async () => {
    const mockResponse = [
      { name: "name1" },
      { name: "name2" },
      { name: "name3" },
    ];
    const userGetStub = sinon.stub(User, "find").resolves({
      status: 200,
      data: mockResponse,
    });

    let result = await readListOfFullNames();
    expect(result.status).to.equal(200);
    expect(result.data).to.equal(mockResponse);
    userGetStub.restore();
  });

  it("return no users", async () => {
    const mockResponse = [];
    const userGetStub = sinon.stub(User, "find").resolves({
      status: 200,
      data: mockResponse,
    });
    let result = await readListOfFullNames();
    expect(result.status).to.equal(200);
    expect(result.data).to.equal(mockResponse);
    userGetStub.restore();
  });
});


describe("changing name", () => {
  it("user in the list", async () => {
    const mockResponse = [ { _id: "63fc7fe7e7a93fe9e636159e" }];
    const userIDStub = sinon.stub(User, "find").resolves(mockResponse);
    let result = await readUserID("name1");
    expect(result).to.equal("63fc7fe7e7a93fe9e636159e");
    userIDStub.restore();
  });

  it("user not in the list", async () => {
    const mockResponse = [ {}];
    const userIDStub = sinon.stub(User, "find").resolves(mockResponse);
    let result = await readUserID("name1");
    expect(result).to.equal(undefined);
    userIDStub.restore();
  });
});


describe("change name", () => {
  it("user in the list", async () => {
    const mockResponse = [ { _id: "1", name: "name1" }, { _id: "2", name: "name2" }];
    const userIDStub = sinon.stub(User, "find").resolves(mockResponse);
    let result = await changeName([{user_id:"1"},{user_id:"2"}]);
    expect(result[0].user_id).to.equal('name1');
    expect(result[1].user_id).to.equal('name2');
    userIDStub.restore();
  });
  it("user not in list", async () => {
    const mockResponse = [ { _id: "1", name: "name1" }];
    const userIDStub = sinon.stub(User, "find").resolves(mockResponse);
    let result = await changeName([{user_id:"5"}]);
    expect(result[0].user_id).to.equal('5');
    userIDStub.restore();
  });
});

describe("Updating the Database", () => {
  it("adding item to the list", async () => {
    const mockPRFromDB = [];
    const readPullRequestsFromDBStub  = sinon.stub(PullRequest, "find").resolves(mockPRFromDB);

    const mockSaving = new PullRequest({git_id: "1", url: "www.cardiff.ac.uk", user_id: "1", title: "title", repo: "name", date: "2020/02/27", rating_complete: "false" });
    const savingStub = sinon.stub(PullRequest.prototype, "save").resolves(mockSaving);

    const nameResponse = [ { _id: "1", name: "name1" }, { _id: "2", name: "name2" }];
    const nameStub = sinon.stub(User, "find").resolves(nameResponse);

    let result = await updatePullRequestsToDatabase([{id:"1", created_at:"2020/02/27",user:{login:"name1"}, html_url : "www.cardiff.ac.uk",title : "title" , head:{repo:{name:"name"}} }]);
    expect(result[0].git_id).to.equal(mockSaving.git_id);
    expect(result[0].title).to.equal(mockSaving.title);
    expect(result[0].user_id ).to.equal(mockSaving.user_id);
    expect(result[0].url).to.equal(mockSaving.url);
    expect(result[0].repo ).to.equal(mockSaving.repo);
    expect(result[0].date.toDateString() ).to.equal(mockSaving.date.toDateString());

    readPullRequestsFromDBStub.restore();
    savingStub.restore();
    nameStub.restore();
  });
  it("no need to update list", async () => {
    const mockPRFromDB = [{"git_id":"1"},{"git_id":"2"}];
    const readPullRequestsFromDBStub  = sinon.stub(PullRequest, "find").resolves(mockPRFromDB);

    const mockSaving = new PullRequest({git_id: "1", url: "www.cardiff.ac.uk", user_id: "1", title: "title", repo: "name", date: "2020/02/27", rating_complete: "false" });
    const savingStub = sinon.stub(PullRequest.prototype, "save").resolves(mockSaving);

    const nameResponse = [ { _id: "1", name: "name1" }, { _id: "2", name: "name2" }];
    const nameStub = sinon.stub(User, "find").resolves(nameResponse);

    let result = await updatePullRequestsToDatabase([{id:"1", created_at:"2020/02/27",user:{login:"name1"}, html_url : "www.cardiff.ac.uk",title : "title" , head:{repo:{name:"name"}} },{id:"2", created_at:"2020/02/27",user:{login:"name1"}, html_url : "www.cardiff.ac.uk",title : "title" , head:{repo:{name:"name"}} }]);
    expect(mockPRFromDB).to.equal(result);


    readPullRequestsFromDBStub.restore();
    savingStub.restore();
    nameStub.restore();
  });
  it("adding one item to the list", async () => {
    const mockPRFromDB = [{"git_id":"1"},{"git_id":"2"}];
    const readPullRequestsFromDBStub  = sinon.stub(PullRequest, "find").resolves(mockPRFromDB);

    const mockSaving = new PullRequest({git_id: "3", url: "www.cardiff.ac.uk", user_id: "1", title: "title", repo: "name", date: "2020/02/27", rating_complete: "false" });
    const savingStub = sinon.stub(PullRequest.prototype, "save").resolves(mockSaving);

    const nameResponse = [ { _id: "1", name: "name1" }, { _id: "2", name: "name2" }];
    const nameStub = sinon.stub(User, "find").resolves(nameResponse);

    let result = await updatePullRequestsToDatabase([{id:"3", created_at:"2020/02/27",user:{login:"name1"}, html_url : "www.cardiff.ac.uk",title : "title" , head:{repo:{name:"name"}} },{id:"2", created_at:"2020/02/27",user:{login:"name1"}, html_url : "www.cardiff.ac.uk",title : "title" , head:{repo:{name:"name"}} }]);
    expect(mockPRFromDB[0]).to.equal(result[0]);
    expect(mockPRFromDB[1]).to.equal(result[1]);
    expect(result[2].git_id).to.equal(mockSaving.git_id);
    expect(result[2].title).to.equal(mockSaving.title);
    expect(result[2].user_id ).to.equal(mockSaving.user_id);
    expect(result[2].url).to.equal(mockSaving.url);
    expect(result[2].repo ).to.equal(mockSaving.repo);
    expect(result[2].date.toDateString() ).to.equal(mockSaving.date.toDateString());


    readPullRequestsFromDBStub.restore();
    savingStub.restore();
    nameStub.restore();
  });

});



