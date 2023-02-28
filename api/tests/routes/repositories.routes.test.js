const request = require("supertest");
const app = require("../../index");
const expect = require("chai").expect;

describe("Tests getting all pull requests", async() => {
    it("GET /management/repositories/allPulls", async () => {
      const res = await request(app).get("/management/repositories/allPulls");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });
});
