const axios = require("axios");
const sinon = require("sinon");
const { expect } = require("chai");
var fs = require('fs');
let path = require('path');
const { getAll, deleteBadge, createBadge} = require("../../controllers/badges.controller");
const Badge = require("../../models/badges.model");

describe('getAll function', () => {
  it('should return an array of badges in ascending order by value', async () => {
    const mockBadges = [      { name: 'Bronze', value: 1 },      { name: 'Silver', value: 2 },      { name: 'Gold', value: 3 }    ];
    const sortByValue = { value: 11 };
    sinon.stub(Badge, 'find').returns({
      sort: sinon.stub().withArgs(sortByValue).returns(mockBadges)
    });
    const mockReq = {};
    const mockRes = {
      status: sinon.stub().returns({ json: sinon.stub() }),
    };
    await getAll(mockReq, mockRes);
    console.log(mockRes.status);
    expect(mockRes.status.calledOnceWith(200)).to.be.true;
    expect(mockRes.status().json.calledOnceWith(mockBadges)).to.be.true;
    Badge.find.restore();
  });
});

describe('deleteBadge function', () => {
  it('should return an array of badges in ascending order by value', async () => {
    const badge = new Badge({ _id: '1'});
    sinon.stub(Badge, 'findById').returns(badge);
    sinon.stub(badge, "remove").resolves();


    const mockReq = {params : { id: '1'}};
    const mockRes = {
      status: sinon.stub().returns({ json: sinon.stub() }),
    };


    await deleteBadge(mockReq, mockRes);
    sinon.assert.calledOnceWithExactly(Badge.findById, "1");
    sinon.assert.calledOnce(badge.remove);
    sinon.assert.calledOnceWithExactly(mockRes.status, 200);
  });
});
  describe('CreateBadge function', () => {
    it('should return an array of badges in ascending order by value', async () => {
      const badgeData = {
        name: "Test Badge",
        value: "5",
      };
      const req = { body: badgeData };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      const badge = new Badge(badgeData);
      sinon.stub(badge, "save").resolves(badge);
      sinon.stub(fs, "readFileSync").resolves({data:"test",contentType: 'image/png'});
      sinon.stub(fs, "unlinkSync").resolves();
  
      await createBadge(req, res);
  
      sinon.assert.calledOnce(badge.save);
      sinon.assert.calledOnceWithExactly(res.status, 201);
    });
});