const chai = require("chai");
const sinon = require("sinon");
const request = require("supertest");
const app = require("../../index");
const User = require("../../models/user.model");
const bcrypt = require("bcrypt");
const controller = require("../../controllers/manageUsers.controller");
const express = require("express");
const emailUtils = require("../../controllers/Auth/emailUtils");

const mockUser = {
    _id: "60720497f99eeb23c42ec6a7",
    name: "John Doe",
    email: "johndoe@example.com",
    hasRole: "admin",
    stars: 50,
    totalStarsEarned: 200,
    git_username: "johndoe",
    bio: "A software engineer",
};

describe("GET /management/users", () => {
    it("should return all users and status code 200", (done) => {
        const userFindStub = sinon.stub(User, "find").resolves([mockUser]);

        request(app)
            .get("/management/users")
            .end((err, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.be.an("array");
                chai.expect(res.body[0].name).to.equal(mockUser.name);
                chai.expect(res.body[0].email).to.equal(mockUser.email);
                chai.expect(res.body[0].hasRole).to.equal(mockUser.hasRole);
                chai.expect(res.body[0].stars).to.equal(mockUser.stars);
                chai.expect(res.body[0].totalStarsEarned).to.equal(
                    mockUser.totalStarsEarned
                );
                chai.expect(res.body[0].git_username).to.equal(
                    mockUser.git_username
                );
                chai.expect(res.body[0].bio).to.equal(mockUser.bio);
                userFindStub.restore();
                done();
            });
    });
});

describe("GET /management/users/:id", () => {
    it("should return a user and status code 200", (done) => {
        const userFindStub = sinon.stub(User, "findById").resolves(mockUser);

        request(app)
            .get(`/management/users/${mockUser._id}`)
            .end((err, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.be.an("object");
                chai.expect(res.body.name).to.equal(mockUser.name);
                chai.expect(res.body.email).to.equal(mockUser.email);
                chai.expect(res.body.hasRole).to.equal(mockUser.hasRole);
                chai.expect(res.body.stars).to.equal(mockUser.stars);
                chai.expect(res.body.totalStarsEarned).to.equal(
                    mockUser.totalStarsEarned
                );
                chai.expect(res.body.git_username).to.equal(
                    mockUser.git_username
                );
                chai.expect(res.body.bio).to.equal(mockUser.bio);
                userFindStub.restore();
                done();
            });
    });
});

describe("DELETE /management/users/delete/:id", () => {
    afterEach(() => {
        sinon.restore();
    });
    it("should delete a user and return status code 200", (done) => {
        const userfindByIdAndDeleteStub = sinon
            .stub(User, "findByIdAndDelete")
            .resolves(mockUser);

        request(app)
            .delete(`/management/users/delete/${mockUser._id}`)
            .end((err, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body.message).to.equal("User deleted");
                userfindByIdAndDeleteStub.restore();
                done();
            });
    });
});


describe("POST /management/users/create/:id", () => {
    it("should create a user and return status code 201", async () => {
        const reqBody = {
            name: "John Doe",
            email: "johndoe@example.com",
            password: "password123",
            git_username: "johndoe",
        };
        const hashedPassword = await bcrypt.hash(reqBody.password, 10);
        const userSaveStub = sinon.stub(User.prototype, "save").resolves({
            name: reqBody.name,
            email: reqBody.email,
            password: hashedPassword,
            hasRole: "Developer",
            git_username: reqBody.git_username,
        });

        // Stub the sendEmail function
        const sendEmailStub = sinon.stub(emailUtils, "sendEmail").resolves();

        // Stub the route handler
        const routeHandlerStub = sinon.stub(controller, "createUser");
        routeHandlerStub.callsFake(async (req, res) => {
            res.status(201).json(await User.prototype.save());
        });

        // Use a test app with the isolated route handler
        const testApp = express();
        testApp.use(express.json());
        testApp.post("/management/users/create", controller.createUser);

        const res = await request(testApp)
            .post("/management/users/create")
            .send(reqBody);

        chai.expect(res.statusCode).to.equal(201);
        chai.expect(res.body).to.be.an("object");
        chai.expect(res.body.name).to.equal(reqBody.name);
        chai.expect(res.body.email).to.equal(reqBody.email);
        chai.expect(res.body.hasRole).to.equal("Developer");
        chai.expect(res.body.git_username).to.equal(reqBody.git_username);

        // Check if the hashed password matches the actual password
        const passwordMatches = await bcrypt.compare(
            reqBody.password,
            hashedPassword
        );
        chai.expect(passwordMatches).to.equal(true);

        // Restore the stubs
        userSaveStub.restore();
        routeHandlerStub.restore();
        sendEmailStub.restore();
    });
});


describe("PATCH /management/users/update/:id", () => {
    it("should update a user and return status code 200", (done) => {
        const mockUpdatedUser = {
            name: "John Doe Wo",
            email: "johndoe2@example.com",
            stars: 20,
            totalStarsEarned: 300,
            git_username: "johndoe3",
        };
        const mockUser = {
            _id: "mockUserId",
            name: "John Doe",
            email: "johndoe@example.com",
            hasRole: "Developer",
            stars: 3,
            totalStarsEarned: 15,
            git_username: "johndoe",
            bio: "Lorem ipsum dolor sit amet",
            save: sinon.stub().resolves(),
        };
        const userFindStub = sinon.stub(User, "findById").resolves(mockUser);

        request(app)
            .patch(`/management/users/update/${mockUser._id}`)
            .send(mockUpdatedUser)
            .end((err, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.be.an("object");
                chai.expect(res.body._id).to.equal(mockUser._id);
                chai.expect(res.body.name).to.equal(mockUpdatedUser.name);
                chai.expect(res.body.email).to.equal(mockUpdatedUser.email);
                chai.expect(res.body.stars).to.equal(mockUpdatedUser.stars);
                chai.expect(res.body.totalStarsEarned).to.equal(
                    mockUpdatedUser.totalStarsEarned
                );
                chai.expect(res.body.git_username).to.equal(
                    mockUpdatedUser.git_username
                );
                chai.expect(res.body.bio).to.equal(mockUser.bio);
                userFindStub.restore();
                done();
            });
    });
});
