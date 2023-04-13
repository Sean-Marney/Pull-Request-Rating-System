const axios = require("axios");
const sinon = require("sinon");
const { expect } = require("chai");

const { getAll} = require("../../controllers/badges.controller");
const Badge = require("../../models/badges.model");

describe('getAll function', () => {
  it('should return an array of badges in ascending order by value', async () => {
    const mockBadges = [      { name: 'Bronze', value: 1 },      { name: 'Silver', value: 2 },      { name: 'Gold', value: 3 }    ];

    const findUserStub = sinon.stub(Badge, "find").returns(mockBadges);

    const mockReq = {};
    const mockRes = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };

    let result = await getAll(mockReq, mockRes);
    console.log(result);
    expect(mockRes.status.calledOnceWith(200)).to.be.true;
    expect(mockRes.json.calledOnceWith(mockBadges)).to.be.true;
  });
});