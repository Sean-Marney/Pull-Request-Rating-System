const request = require("supertest");
const app = require("../../index");
const assert = require("assert");
const sinon = require("sinon");
const Reward = require("../../models/reward.model");

describe("GET /management/rewards", () => {
  it("should return all rewards and status code 200", async () => {
    // Send a get request to get all rewards
    const res = await request(app).get("/management/rewards");
    // Assert that the status code and response body is as expected
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(Array.isArray(res.body), true);
  });
});

describe("GET /rewards/:id", () => {
  let sandbox;

  // Creating sandbox to isolate test code
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should call findById with correct parameter and return status code 200", async () => {
    const mockReward = {
      _id: "test-id",
      rewardName: "Test Reward",
      starsRequired: 10,
    };

    // Stubbing the reward's findById method
    const findByIdStub = sandbox.stub(Reward, "findById").resolves(mockReward);

    // Sending a request to get a reward by ID
    const res = await request(app).get(`/rewards/${mockReward._id}`);

    // Expect the status code and response body are as expected
    assert.strictEqual(res.statusCode, 200);
    assert.deepStrictEqual(res.body.rewardName, mockReward.rewardName);
    assert.deepStrictEqual(res.body.starsRequired, mockReward.starsRequired);

    // Expect the stub has been called
    sinon.assert.calledOnce(findByIdStub);
    sinon.assert.calledWithExactly(findByIdStub, mockReward._id);
  });

  // it("should return 404 if reward ID does not exist", async () => {
  //   const nonExistentRewardId = "non-existent-id";

  //   // Stubbing the reward's findById method, but this time it returns null
  //   const findByIdStub = sandbox.stub(Reward, "findById").resolves(null);

  //   // Sending a request to get a reward by ID, but with a reward that doesn't exist
  //   const res = await request(app).get(`/rewards/${nonExistentRewardId}`);

  //   // Expect that the status code and response body are as expected
  //   assert.strictEqual(res.statusCode, 404);
  //   assert.deepStrictEqual(
  //     res.body.message,
  //     "Reward with that ID was not found"
  //   );

  //   /// Expect that the stub has been called
  //   sinon.assert.calledOnce(findByIdStub);
  //   sinon.assert.calledWithExactly(findByIdStub, nonExistentRewardId);
  // });
});

// describe("POST /management/rewards/create", () => {
//   it("should create a reward and return status code 201", async () => {
//     // Mocking a reward
//     const newReward = {
//       rewardName: "Test Reward",
//       starsRequired: 10,
//     };

//     // Using mock data to send a request to create a reward
//     const res = await request(app)
//       .post("/management/rewards/create")
//       .send(newReward);

//     // Expect that the status code and resposne body are as expected
//     assert.strictEqual(res.statusCode, 201);
//     assert.deepStrictEqual(res.body.rewardName, newReward.rewardName);
//     assert.deepStrictEqual(res.body.starsRequired, newReward.starsRequired);
//   });
// });

// describe("PATCH /management/rewards/update/:id", () => {
//   let sandbox;

//   // Creating sandbox to isolate test code
//   beforeEach(() => {
//     sandbox = sinon.createSandbox();
//   });

//   afterEach(() => {
//     sandbox.restore();
//   });

//   it("should call updateReward with correct parameters and return status code 200", async () => {
//     // Creating a mock reward
//     const mockReward = {
//       _id: "test-id",
//       rewardName: "Updated Reward Name",
//       starsRequired: 20,
//       save: sandbox.stub().resolves(),
//     };

//     // Stubbing the reward's findById method
//     const findByIdStub = sandbox.stub(Reward, "findById").resolves(mockReward);

//     // Creating mock data to update the mocked reward with
//     const rewardToUpdate = {
//       rewardName: "Updated Reward Name",
//       starsRequired: 20,
//     };

//     // Sending a request to update the reward by ID
//     const res = await request(app)
//       .patch(`/management/rewards/update/${mockReward._id}`)
//       .send(rewardToUpdate);

//     // Expect that the status code and response body are as expected
//     assert.strictEqual(res.statusCode, 200);
//     assert.deepStrictEqual(res.body.rewardName, mockReward.rewardName);
//     assert.deepStrictEqual(res.body.starsRequired, mockReward.starsRequired);

//     // Expect that the stub has been called
//     sinon.assert.calledOnce(findByIdStub);
//     sinon.assert.calledOnce(mockReward.save);
//     sinon.assert.calledWithExactly(mockReward.save);
//   });

//   it("should return 404 if reward ID does not exist", async () => {
//     const nonExistentRewardId = "non-existent-id";

//     // Stubbing the reward's findById method
//     const findByIdStub = sandbox.stub(Reward, "findById").resolves(null);

//     // Sending request to update a reward, but with an ID that doesn't exist
//     const res = await request(app)
//       .patch(`/management/rewards/update/${nonExistentRewardId}`)
//       .send({ rewardName: "Updated Reward Name" });

//     // Expect that the status code and response body are as expected
//     assert.strictEqual(res.statusCode, 404);
//     assert.deepStrictEqual(res.body.message, "Reward with that ID not found");

//     // Expect that the stub has been called
//     sinon.assert.calledOnce(findByIdStub);
//   });
// });

// describe("DELETE /management/rewards/delete/:id", () => {
//   let sandbox;

//   // Creating sandbox to isolate test code
//   beforeEach(() => {
//     sandbox = sinon.createSandbox();
//   });

//   afterEach(() => {
//     sandbox.restore();
//   });

//   it("should call findById and remove with correct parameters and return status code 200", async () => {
//     // Creating a mock reward
//     const mockReward = {
//       _id: "test-id",
//       rewardName: "Test Reward",
//       starsRequired: 10,
//       remove: sandbox.stub().resolves(),
//     };

//     // Stubbing the reward's findById method
//     const findByIdStub = sandbox.stub(Reward, "findById").resolves(mockReward);

//     // Sending a request to delete the mocked reward by ID
//     const res = await request(app).delete(
//       `/management/rewards/delete/${mockReward._id}`
//     );

//     // Expect that the status code and response body are as expected
//     assert.strictEqual(res.statusCode, 200);
//     assert.deepStrictEqual(res.body.message, "Reward deleted");

//     // Expect that the stub has been called
//     sinon.assert.calledOnce(findByIdStub);
//     sinon.assert.calledWithExactly(findByIdStub, mockReward._id);
//     sinon.assert.calledOnce(mockReward.remove);
//     sinon.assert.calledWithExactly(mockReward.remove);
//   });

//   it("should return 404 if reward ID does not exist", async () => {
//     const nonExistentRewardId = "non-existent-id";

//     // Stubbing the reward's findById method, but it returns null
//     const findByIdStub = sandbox.stub(Reward, "findById").resolves(null);

//     // Sending a request to delete a reward using an ID that doesn't exist
//     const res = await request(app).delete(
//       `/management/rewards/delete/${nonExistentRewardId}`
//     );

//     // Expect that the status code and response body are as expected
//     assert.strictEqual(res.statusCode, 404);
//     assert.deepStrictEqual(res.body.message, "Reward with that ID not found");

//     // Expect that the stub has been called
//     sinon.assert.calledOnce(findByIdStub);
//     sinon.assert.calledWithExactly(findByIdStub, nonExistentRewardId);
//   });
// });
