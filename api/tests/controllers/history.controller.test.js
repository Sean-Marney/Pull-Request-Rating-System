const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;
const PullRequest = require('../../models/pullRequest.model');
const User = require('../../models/user.model');
const { getPullRequestsForUser } = require('../../controllers/pullRequestHistory.controller');


describe('getPullRequestsForUser', () => {
  it('should return an array of pull requests', async () => {
    const parameter = { id: 'test@example.com' };
    const user = { _id: '1' };
    const pullRequests = [{id:"1"}, {id:"2"}, {id:"3"}];
    const sortByDate = { date: -1 };

    // Create stubs for User and PullRequest methods
    const findUserStub = sinon.stub(User, 'findOne').returns(user);
    const findPullRequestStub = sinon.stub(PullRequest, 'find').returns({
      sort: sinon.stub().withArgs(sortByDate).returns(pullRequests)
    });

    // Create fake request and response objects
    const req = { params: parameter };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };

    // Call the getPullRequestsForUser function
    await getPullRequestsForUser(req, res);

    // Make sure the correct methods were called and the correct data was returned
    expect(findUserStub.calledOnceWith({ email: parameter.id }, { _id: 1 })).to.be.true;
    expect(findPullRequestStub.calledOnceWith({ user_id: user._id })).to.be.true;
    expect(res.status.calledOnceWith(200)).to.be.true;
    expect(res.json.calledOnceWith(pullRequests)).to.be.true;

    // Restore the original methods
    findUserStub.restore();
    findPullRequestStub.restore();
  });
  it('should return an empty array', async () => {
    const parameter = { id: 'test@example.com' };
    const user = undefined;

    // Create stubs for User
    const findUserStub = sinon.stub(User, 'findOne').returns(user);

    // Create fake request and response objects
    const req = { params: parameter };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };

    // Call the getPullRequestsForUser function
    await getPullRequestsForUser(req, res);

    // Make sure the correct methods were called and the correct data was returned
    expect(findUserStub.calledOnceWith({ email: parameter.id }, { _id: 1 })).to.be.true;
    expect(res.status.calledOnceWith(404)).to.be.true;

    // Restore the original methods
    findUserStub.restore();
  });
});
