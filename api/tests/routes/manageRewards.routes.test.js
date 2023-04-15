const request = require("supertest");
const app = require("../../index");
const assert = require("assert");

describe("GET /management/rewards", () => {
  it("should return all rewards and status code 200", async () => {
    // Send a get request to get all rewards
    const res = await request(app).get("/management/rewards");
    // Assert that the status code and response body is as expected
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(Array.isArray(res.body), true);
  });
});

// describe("GET /management/rewards/:id", () => {
//   it("should get a reward by ID and return status code 200", async () => {
//     // Mocking an existing reward
//     const existingReward = {
//       rewardName: "Existing Reward",
//       starsRequired: 20,
//     };

//     // Sending a POST request to create a new reward
//     const createResponse = await request(app)
//       .post("/management/rewards/create")
//       .send(existingReward);

//     // Sending a GET request to retrieve the reward by ID
//     const getResponse = await request(app).get(
//       `/management/rewards/${createResponse.body._id}`
//     );

//     // Expect that the status code and response body are as expected
//     assert.strictEqual(getResponse.statusCode, 200);
//     assert.deepStrictEqual(
//       getResponse.body.rewardName,
//       existingReward.rewardName
//     );
//     assert.deepStrictEqual(
//       getResponse.body.starsRequired,
//       existingReward.starsRequired
//     );
//   });

//   it("should return 404 if the reward with the specified ID does not exist", async () => {
//     // Mocking an invalid reward ID
//     const invalidId = "123456789012";

//     // Sending a GET request to retrieve the reward with the invalid ID
//     const getResponse = await request(app).get(
//       `/management/rewards/${invalidId}`
//     );

//     // Expect that the status code and response body are as expected
//     assert.strictEqual(getResponse.statusCode, 404);
//     assert.deepStrictEqual(
//       getResponse.body.message,
//       "Reward with that ID was not found"
//     );
//   });
// });

describe("POST /management/rewards/create", () => {
  it("should create a reward and return status code 201", async () => {
    // Mocking a reward object
    const newReward = {
      rewardName: "New Reward",
      starsRequired: 30,
    };

    // Sending a POST request to create the reward
    const response = await request(app)
      .post("/management/rewards/create")
      .send(newReward);

    // Expect that the status code and response body are as expected
    assert.strictEqual(response.statusCode, 201);
    assert.deepStrictEqual(response.body.rewardName, newReward.rewardName);
    assert.deepStrictEqual(
      response.body.starsRequired,
      newReward.starsRequired
    );
  });

  // it("should return 500 if there is an error creating the reward", async () => {
  //   // Mocking an invalid reward object (missing required field)
  //   const invalidReward = {
  //     starsRequired: 30,
  //   };

  //   // Sending a POST request to create the invalid reward
  //   const response = await request(app)
  //     .post("/management/rewards/create")
  //     .send(invalidReward);

  //   // Expect that the status code and response body are as expected
  //   assert.strictEqual(response.statusCode, 500);
  //   assert.deepStrictEqual(
  //     response.body.message,
  //     "Reward validation failed: rewardName: Path `rewardName` is required."
  //   );
  // });
});

describe("PATCH /management/rewards/update/:id", () => {
  it("should update a reward and return status code 200", async () => {
    // Mocking an existing reward
    const existingReward = {
      rewardName: "Existing Reward",
      starsRequired: 20,
    };

    // Sending a POST request to create a new reward
    const createResponse = await request(app)
      .post("/management/rewards/create")
      .send(existingReward);

    // Mocking updated reward information
    const updatedReward = {
      rewardName: "Updated Reward",
      starsRequired: 30,
    };

    // Sending a PATCH request to update the reward
    const updateResponse = await request(app)
      .patch(`/management/rewards/update/${createResponse.body._id}`)
      .send(updatedReward);

    // Expect that the status code and response body are as expected
    assert.strictEqual(updateResponse.statusCode, 200);
    assert.deepStrictEqual(
      updateResponse.body.rewardName,
      updatedReward.rewardName
    );
    assert.deepStrictEqual(
      updateResponse.body.starsRequired,
      updatedReward.starsRequired
    );
  });

  // it("should return 404 if the reward with the specified ID does not exist", async () => {
  //   // Mocking an invalid reward ID
  //   const invalidId = "123456789012";

  //   // Mocking updated reward information
  //   const updatedReward = {
  //     rewardName: "Updated Reward",
  //     starsRequired: 30,
  //   };

  //   // Sending a PATCH request to update the reward with the invalid ID
  //   const updateResponse = await request(app)
  //     .patch(`/management/rewards/update/${invalidId}`)
  //     .send(updatedReward);

  //   // Expect that the status code and response body are as expected
  //   assert.strictEqual(updateResponse.statusCode, 404);
  //   assert.deepStrictEqual(
  //     updateResponse.body.message,
  //     "Reward with that ID not found"
  //   );
  // });
});

// describe("DELETE /management/rewards/delete/:id", () => {
//   it("should delete a reward and return status code 200", async () => {
//     // Mocking an existing reward
//     const existingReward = {
//       rewardName: "Existing Reward",
//       starsRequired: 20,
//     };

//     // Sending a POST request to create a new reward
//     const createResponse = await request(app)
//       .post("/management/rewards/create")
//       .send(existingReward);

//     // Sending a DELETE request to delete the reward
//     const deleteResponse = await request(app).delete(
//       `/management/rewards/delete/${createResponse.body._id}`
//     );

//     // Expect that the status code and response body are as expected
//     assert.strictEqual(deleteResponse.statusCode, 200);
//     assert.deepStrictEqual(deleteResponse.body.message, "Reward deleted");

//     // Sending a GET request to check that the reward has been deleted
//     const getResponse = await request(app).get(
//       `/management/rewards/${createResponse.body._id}`
//     );

//     // Expect that the status code is 404, indicating that the reward does not exist
//     assert.strictEqual(getResponse.statusCode, 404);
//   });

//   it("should return 404 if the reward with the specified ID does not exist", async () => {
//     // Mocking an invalid reward ID
//     const invalidId = "123456789012";

//     // Sending a DELETE request to delete the reward with the invalid ID
//     const deleteResponse = await request(app).delete(
//       `/management/rewards/delete/${invalidId}`
//     );

//     // Expect that the status code and response body are as expected
//     assert.strictEqual(deleteResponse.statusCode, 404);
//     assert.deepStrictEqual(
//       deleteResponse.body.message,
//       "Reward with that ID not found"
//     );
//   });
// });
