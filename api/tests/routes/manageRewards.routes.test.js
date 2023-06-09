const request = require("supertest");
const app = require("../../index");
const assert = require("assert");
const sinon = require("sinon");
const chai = require("chai");
const Reward = require("../../models/reward.model");
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

describe("GET /management/rewards", () => {

  chai.use(chaiHttp);
    const token = jwt.sign(
      {id: 'AB12345!', email: 'test2@test.com', hasRole:'Manager'},
      process.env.PASSPORTSECRET,
      {expiresIn: '7d'});

      
  it("should return all rewards and status code 200", async () => {
    // Send a get request to get all rewards
    const res = await request(app).get("/management/rewards").set('Cookie', `jwt=${token}`);
    // Assert that the status code and response body is as expected
    assert.strictEqual(res.statusCode, 200);
    console.log(res.body);
    assert.strictEqual(Array.isArray(res.body), true);
  });
});

describe("GET /management/rewards/:id", () => {
  it("should get a reward by ID and return status code 200", async () => {
    // Mocking an existing reward
    const existingReward = {
      rewardName: "Existing Reward",
      starsRequired: 20,
    };

    // Sending a POST request to create a new reward
    const createResponse = await request(app)
      .post("/management/rewards/create")
      .send(existingReward);

    // Sending a GET request to retrieve the reward by ID
    const getResponse = await request(app).get(
      `/management/rewards/${createResponse.body._id}`
    );

    // Expect that the status code is as expected
    assert.strictEqual(getResponse.statusCode, 200);
  });
});

describe("POST /management/rewards/create", () => {
  chai.use(chaiHttp);
    const token = jwt.sign(
      {id: 'AB12345!', email: 'test2@test.com', hasRole:'Manager'},
      process.env.PASSPORTSECRET,
      {expiresIn: '7d'});

  it("should create a reward and return status code 201", async () => {
    // Mocking a reward object
    const newReward = {
      rewardName: "New Reward",
      starsRequired: 30,
    };

    // Sending a POST request to create the reward
    const response = await request(app)
      .post("/management/rewards/create")
      .set ('Cookie', `jwt=${token}`)
      .send(newReward);

    // Expect that the status code and response body are as expected
    assert.strictEqual(response.statusCode, 201);
    assert.deepStrictEqual(response.body.rewardName, newReward.rewardName);
    assert.deepStrictEqual(
      response.body.starsRequired,
      newReward.starsRequired
    );
  });
});

describe("PATCH /management/rewards/update/:id", () => {

  chai.use(chaiHttp);
    const token = jwt.sign(
      {id: 'AB12345!', email: 'test2@test.com', hasRole:'Manager'},
      process.env.PASSPORTSECRET,
      {expiresIn: '7d'});

  it("should update a reward and return status code 200", async () => {
    // Mocking an existing reward
    const existingReward = {
      rewardName: "Existing Reward",
      starsRequired: 20,
    };

    // Sending a POST request to create a new reward
    const createResponse = await request(app)
      .post("/management/rewards/create")
      .set ('Cookie', `jwt=${token}`)
      .send(existingReward);

    // Mocking updated reward information
    const updatedReward = {
      rewardName: "Updated Reward",
      starsRequired: 30,
    };

    // Sending a PATCH request to update the reward
    const updateResponse = await request(app)
      .patch(`/management/rewards/update/${createResponse.body._id}`)
      .set ('Cookie', `jwt=${token}`)
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
});

describe("DELETE /management/rewards/:id", () => {

  chai.use(chaiHttp);
    const token = jwt.sign(
      {id: 'AB12345!', email: 'test2@test.com', hasRole:'Manager'},
      process.env.PASSPORTSECRET,
      {expiresIn: '7d'});

  it("should delete a reward and return status code 200", async () => {
    // Mocking a reward object
    const newReward = {
      rewardName: "New Reward",
      starsRequired: 30,
    };

    // Sending a POST request to create the reward
    const response = await request(app)
      .post("/management/rewards/create")
      .set ('Cookie', `jwt=${token}`)
      .send(newReward);

    // Sending a DELETE request to delete the reward
    const deleteResponse = await request(app).delete(
      `/management/rewards/delete/${response.body._id}`
    ).set ('Cookie', `jwt=${token}`);

    assert.strictEqual(deleteResponse.statusCode, 200);
    assert.deepStrictEqual(deleteResponse.body.message, "Reward deleted");
  });
});
