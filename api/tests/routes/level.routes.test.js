const request = require("supertest");
const assert = require("assert");
const app = require("../../index");
const sinon = require("sinon");
const Level = require("../../models/level.model");

  describe("All the Routes for Levels", () => {
    describe("GET /all", () => {
      it("should return all the levels", async () => {
        // Mocking the levels
        const levels = [{
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
        }];

        // Finding mocked rewards using stub
        const findStub = sinon.stub(Level, "find").returns({levels});

        // Calling endpoint
        const res = await request(app).get(
          `/level/all`
        );

        // Asserting that the data is as expected
        assert.strictEqual(res.statusCode, 200);
        assert.deepStrictEqual(res.body.levels, levels);
        assert.strictEqual(findStub.calledOnce, true);

        // Reseting the stubbed data
        findStub.restore();
      });
    });
    describe("GET /name/id", () => {
        it("should return one level", async () => {
          // Mocking one level
          const level = [{
            _id: "1",
            name: "Beginner"
        }];
  
          // Finding mocked rewards using stub
          const findOneStub = sinon.stub(Level, "findOne").returns({level});
  
          // Calling endpoint
          const res = await request(app).get(
            `/level/name/1`
          );
  
          // Asserting that the data is as expected
          assert.strictEqual(res.statusCode, 200);
          assert.deepStrictEqual(res.body.level, level);
          assert.strictEqual(findOneStub.calledOnce, true);
  
          // Reseting the stubbed data
          findOneStub.restore();
        });
      });
});
