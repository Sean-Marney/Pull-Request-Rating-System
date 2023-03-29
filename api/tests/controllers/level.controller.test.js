const expect = require("chai").expect;
const sinon = require("sinon");
const LevelModel = require("../../models/level.model");
const Level = require("../../controllers/level.controller");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.should();

describe("GET all level using getAll controller method", () => {
    let mockLevels;

    beforeEach(() => {
        mockLevels = [
            {
                _id: "1",
                level: 1,
                value: 20,
                name: "Beginner",
            },
            {
                _id: "2",
                level: 2,
                value: 40,
                name: "Amateur",
            }
        ];
        sinon.stub(LevelModel, "find").resolves(mockLevels);
    });

    afterEach(() => {
        LevelModel.find.restore();
    });

    it("should return an array of levels with expected length", async () => {
        const req = {};
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        await Level.getAll(req, res);
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.status().json.calledWith(mockLevels)).to.be.true;
    });
});
describe("GET specific level using getNameForLevel controller method", () => {
    let mockLevels;

    beforeEach(() => {
        mockLevels = [
            {
                _id: "1",
                name: "Beginner",
            }
        ];
        sinon.stub(LevelModel, "findOne").resolves(mockLevels);
    });

    afterEach(() => {
        LevelModel.findOne.restore();
    });

    it("should return just the one level", async () => {
        
        const req = {params: {id:1}};
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        await Level.getNameForLevel(req, res);
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.status().json.calledWith(mockLevels)).to.be.true;
    });
});