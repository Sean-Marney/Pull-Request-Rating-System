// const request = require("supertest");
// const app = require("../../index");
// const assert = require("assert");

// describe("Claimed Rewards Endpoints", () => {
//   describe("GET /get", () => {
//     it("should return a list of claimed rewards", async () => {
//       const res = await request(app).get("/management/rewards/claimed/get");
//       assert.strictEqual(res.statusCode, 200);
//       assert.strictEqual(Array.isArray(res.body), true);
//     });
//   });

//   describe("GET /archived", () => {
//     it("should return a list of archived claimed rewards", async () => {
//       const res = await request(app).get(
//         "/management/rewards/claimed/archived"
//       );
//       assert.strictEqual(res.statusCode, 200);
//       assert.strictEqual(Array.isArray(res.body), true);
//     });
//   });

//   describe("POST /save", () => {
//     it("should save a claimed reward", async () => {
//       const res = await request(app)
//         .post("/management/rewards/claimed/save")
//         .send({
//           rewardId: "1",
//           rewardName: "Test Reward",
//           userId: "1",
//           userEmail: "test@gmail.com",
//           dateClaimed: "01/01/2023",
//         });
//       // console.log(res.body);
//       assert.strictEqual(res.statusCode, 201);
//       assert.strictEqual(res.body.reward_id, "1");
//       assert.strictEqual(res.body.reward_name, "Test Reward");
//       assert.strictEqual(res.body.user_id, "1");
//       assert.strictEqual(res.body.user_email, "test@gmail.com");
//       assert.strictEqual(res.body.date_claimed, "01/01/2023");
//       assert.strictEqual(res.body.archived, false);
//     });
//   });
// });
