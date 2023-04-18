const request = require("supertest");
const app = require("../../index");
const assert = require("assert");
const chai = require('chai')
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');



describe("Claimed Rewards Endpoints", () => {
    chai.use(chaiHttp);
    const token = jwt.sign(
      {id: 'AB12345!', email: 'test2@test.com', hasRole:'Manager'},
      process.env.PASSPORTSECRET,
      {expiresIn: '7d'});

    describe("GET /get", () => {
    it("should return a list of claimed rewards", async () => {
      const res = await request(app).get("/management/rewards/claimed/get") .set ('Cookie', `jwt=${token}`);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(Array.isArray(res.body), true);
    });
  });

  describe("GET /archived", () => {
    it("should return a list of archived claimed rewards", async () => {
      const res = await request(app).get(
        "/management/rewards/claimed/archived"
      ).set ('Cookie', `jwt=${token}`);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(Array.isArray(res.body), true);
    });
  });

  describe("POST /save", () => {
    it("should save a claimed reward", async () => {
      const res = await request(app)
        .post("/management/rewards/claimed/save")
        .set ('Cookie', `jwt=${token}`)
        .send({
          rewardId: "1",
          rewardName: "Test Reward",
          userId: "1",
          userEmail: "test@gmail.com",
          dateClaimed: "01/01/2023",
        });
      assert.strictEqual(res.statusCode, 201);
      assert.strictEqual(res.body.reward_id, "1");
      assert.strictEqual(res.body.reward_name, "Test Reward");
      assert.strictEqual(res.body.user_id, "1");
      assert.strictEqual(res.body.user_email, "test@gmail.com");
      assert.strictEqual(res.body.date_claimed, "01/01/2023");
      assert.strictEqual(res.body.archived, false);
    });
  });
});
