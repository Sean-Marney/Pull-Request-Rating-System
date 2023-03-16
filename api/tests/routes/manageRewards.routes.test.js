const chai = require("chai");
const request = require("supertest");
const app = require("../../index");
const Reward = require("../../models/reward.model");

describe("GET /management/rewards", () => {
    it("should return all rewards and status code 200", (done) => {
        request(app)
            .get("/management/rewards")
            .end((err, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.be.an("array");
                done();
            });
    });
});

describe("GET /management/rewards/:id", () => {
    let reward;

    beforeEach((done) => {
        reward = new Reward({
            rewardName: "Free Pizza",
            starsRequired: 100,
        });

        reward.save((err) => {
            if (err) return done(err);
            done();
        });
    });

    afterEach((done) => {
        Reward.deleteMany({}, (err) => {
            if (err) return done(err);
            done();
        });
    });

    it("should return a reward and status code 200", (done) => {
        request(app)
            .get(`/management/rewards/${reward._id}`)
            .end((err, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.be.an("object");
                chai.expect(res.body.rewardName).to.equal("Free Pizza");
                chai.expect(res.body.starsRequired).to.equal(100);
                done();
            });
    });
});

describe("POST /management/rewards/create", () => {
    afterEach(async () => {
        await Reward.deleteMany({});
    });

    it("should create a reward and return status code 201", (done) => {
        const reward = {
            rewardName: "Free Coffee",
            starsRequired: 50,
        };

        request(app)
            .post("/management/rewards/create")
            .send(reward)
            .end((err, res) => {
                chai.expect(res.statusCode).to.equal(201);
                chai.expect(res.body.rewardName).to.equal("Free Coffee");
                chai.expect(res.body.starsRequired).to.equal(50);
                done();
            });
    });
});

describe("PATCH /management/rewards/:id", () => {
    let reward;

    beforeEach((done) => {
        reward = new Reward({
            rewardName: "Free Pizza",
            starsRequired: 100,
        });

        reward.save((err) => {
            if (err) return done(err);
            done();
        });
    });

    afterEach((done) => {
        Reward.deleteMany({}, (err) => {
            if (err) return done(err);
            done();
        });
    });

    it("should update a reward and return status code 200", (done) => {
        request(app)
            .patch(`/management/rewards/update/${reward._id}`)
            .send({ rewardName: "Free Ice Cream", starsRequired: 50 })
            .end((err, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.be.an("object");
                chai.expect(res.body.rewardName).to.equal("Free Ice Cream");
                chai.expect(res.body.starsRequired).to.equal(50);
                done();
            });
    });
});

describe("DELETE /management/rewards/:id", () => {
    let reward;

    beforeEach((done) => {
        reward = new Reward({
            rewardName: "Free Pizza",
            starsRequired: 100,
        });

        reward.save((err) => {
            if (err) return done(err);
            done();
        });
    });

    afterEach((done) => {
        Reward.deleteMany({}, (err) => {
            if (err) return done(err);
            done();
        });
    });

    it("should delete a reward and return status code 200", (done) => {
        request(app)
            .delete(`/management/rewards/delete/${reward._id}`)
            .end((err, res) => {
                chai.expect(res.statusCode).to.equal(200);

                Reward.findById(reward._id, (err, reward) => {
                    if (err) return done(err);
                    chai.expect(reward).to.equal(null);
                    done();
                });
            });
    });
});
