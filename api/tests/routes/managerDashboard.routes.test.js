const request = require("supertest");
const app = require("../../index");
const assert = require("assert");

describe("Manager Dashboard Routes", () => {
  describe("GET /management/dashboard/get-number-of-pending-pull-requests", () => {
    it("should return a status code of 200", async () => {
      const res = await request(app).get(
        "/management/dashboard/get-number-of-pending-pull-requests"
      );
      assert.strictEqual(res.statusCode, 200);
    });
  });

  describe("GET /management/dashboard/get-number-of-claimed-rewards", () => {
    it("should return a status code of 200", async () => {
      const res = await request(app).get(
        "/management/dashboard/get-number-of-claimed-rewards"
      );
      assert.strictEqual(res.statusCode, 200);
    });
  });

  describe("GET /management/dashboard/get-claimed-rewards", () => {
    it("should return a status code of 200", async () => {
      const res = await request(app).get(
        "/management/dashboard/get-claimed-rewards"
      );
      assert.strictEqual(res.statusCode, 200);
    });
  });

  describe("GET /management/dashboard/get-top-developers", () => {
    it("should return a status code of 200", async () => {
      const res = await request(app).get(
        "/management/dashboard/get-top-developers"
      );
      assert.strictEqual(res.statusCode, 200);
    });
  });
});
