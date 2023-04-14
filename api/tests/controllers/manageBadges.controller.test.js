const axios = require("axios");
const sinon = require("sinon");
const { expect } = require("chai");
var fs = require('fs');
let path = require('path');
const { getAll, deleteBadge, createBadge, updateBadge, updateBadgeImage} = require("../../controllers/badges.controller");
const Badge = require("../../models/badges.model");
const Binary = require('mongodb').Binary;

describe('getAll function', () => {
  it('should return an array of badges in ascending order by value', async () => {
    const mockBadges = [      { name: 'Bronze', value: 1 },      { name: 'Silver', value: 2 },      { name: 'Gold', value: 3 }    ];
    const sortByValue = { value: 1 };
    let findStub = sinon.stub(Badge, 'find').returns({
      sort: sinon.stub().withArgs(sortByValue).returns(mockBadges)
    });
    const mockReq = {};
    const mockRes = {
      status: sinon.stub().returns({ json: sinon.stub() }),
    };
    await getAll(mockReq, mockRes);
    expect(mockRes.status.calledOnceWith(200)).to.be.true;
    expect(mockRes.status().json.calledOnceWith(mockBadges)).to.be.true;
    findStub.restore();
  });
});

describe('deleteBadge function', () => {
  it('should return an array of badges in ascending order by value', async () => {
    const badge = new Badge({ _id: '1'});
    let findStub = sinon.stub(Badge, 'findById').returns(badge);
    let removeStub = sinon.stub(badge, "remove").resolves();


    const mockReq = {params : { id: '1'}};
    const mockRes = {
      status: sinon.stub().returns({ json: sinon.stub() }),
    };


    await deleteBadge(mockReq, mockRes);
    sinon.assert.calledOnceWithExactly(Badge.findById, "1");
    sinon.assert.calledOnce(badge.remove);
    sinon.assert.calledOnceWithExactly(mockRes.status, 200);
    findStub.restore();
    removeStub.restore();
  });
});
  describe('CreateBadge function', () => {
    it('should return an array of badges in ascending order by value', async () => {
      const badgeData = {
        name: "Test Badge",
        value: "5",
        img: {contentType: 'image/png'}
      };
      const req = { body: badgeData, file : {filename: 'test.png'}};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      
      const badge = new Badge(badgeData);
      let saveStub = sinon.stub(Badge.prototype, "save").resolves(badge);
      let fsStub = sinon.stub(fs, "readFileSync").resolves(await new Binary(Buffer.from("89504e470d0a1a0a0000000d4948445200000015000000160802000000a0e1406f000000017352474200aece1ce90000000467414d410000b18f0bfc61050000000970485973000016250000162501495224f00000003549444154384f63f84f191856fa190801a83a2430aa1f094055c100561134404bfb3101541d121856fac900a3fa290394e9ffff1f006fc8fe2ca56803f80000000049454e44ae426082", "hex"), 0));
      let unlinkFsStub = sinon.stub(fs, "unlinkSync").resolves();
  
      await createBadge(req, res);
  
      sinon.assert.calledOnce(badge.save);
      sinon.assert.calledOnceWithExactly(res.status, 201);
      saveStub.restore();
      fsStub.restore();
      unlinkFsStub.restore();
    });
});

describe('updateBadge function', () => {
  it('should return an array of badges in ascending order by value', async () => {
    const badge = new Badge({ _id: '1', name: 'Bronze', value: 1});
    let updateStub = sinon.stub(Badge, 'findById').returns(badge);


    const updateBadged = new Badge({ _id: '1', name: 'Test', value: 2});
    let badgeStub = sinon.stub(badge, "save").resolves(updateBadged);


    const mockReq = {params : {id : 1},body : { badgeName: 'Test', starsRequired : 2}};
    const mockRes = {
      status: sinon.stub().returns({ json: sinon.stub() }),
    };


    await updateBadge(mockReq, mockRes);
    sinon.assert.calledOnceWithExactly(Badge.findById, 1);
    sinon.assert.calledOnce(badge.save);
    sinon.assert.calledOnceWithExactly(mockRes.status, 200);
    updateStub.restore();
    badgeStub.restore();
  });
  it('update badge with new image', async () => {
    const newBadge = new Badge({ _id: '1', name: 'Bronze', value: 1,  img: {contentType: 'image/png'}});
    let updateStub = sinon.stub(Badge, 'findById').returns(newBadge);

    const updateBadged = new Badge({ _id: '1', name: 'Test', value: 2, img: {contentType: 'image/png'}});
    let badgeStub = sinon.stub(newBadge, "save").resolves(updateBadged);

    const mockReq = {params : {id : 1},body : { badgeName: 'Test', starsRequired : 2}, file : {filename: 'test.png'}};
    const mockRes = {
      status: sinon.stub().returns({ json: sinon.stub() }),
    };
    
    let fsStub = sinon.stub(fs, "readFileSync").resolves(await new Binary(Buffer.from("89504e470d0a1a0a0000000d4948445200000015000000160802000000a0e1406f000000017352474200aece1ce90000000467414d410000b18f0bfc61050000000970485973000016250000162501495224f00000003549444154384f63f84f191856fa190801a83a2430aa1f094055c100561134404bfb3101541d121856fac900a3fa290394e9ffff1f006fc8fe2ca56803f80000000049454e44ae426082", "hex"), 0));
    let unlinkFsStub = sinon.stub(fs, "unlinkSync").resolves();

    await updateBadgeImage(mockReq, mockRes);

    sinon.assert.calledOnce(newBadge.save);
    sinon.assert.calledOnceWithExactly(mockRes.status, 201);
    updateStub.restore();
    badgeStub.restore();
    fsStub.restore();
    unlinkFsStub.restore();
  });
});