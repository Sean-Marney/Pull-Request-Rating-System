const axios = require("axios");
const sinon = require("sinon");
const { expect } = require("chai");

const {
  getAllRepositories,
  getAllPullRequests,
} = require("../../controllers/repositories.controller");

describe("getAllRepositories", () => {
  it("should return all repositories from the GitHub service account", async () => {
    const mockResponse = [
      { name: "repo1" },
      { name: "repo2" },
      { name: "repo3" },
    ];
    const axiosGetStub = sinon.stub(axios, "get").resolves({
      status: 200,
      data: mockResponse,
    });
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };
    await getAllRepositories(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.send.calledWith(mockResponse)).to.be.true;
    axiosGetStub.restore();
  });

  it("should return an error if it fails to fetch repositories from GitHub API", async () => {
    const axiosGetStub = sinon.stub(axios, "get").rejects();
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };
    await getAllRepositories(req, res);
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.send.calledOnce).to.be.true;
    axiosGetStub.restore();
  });
});
