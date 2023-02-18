const expect = require("chai").expect;
const sinon = require("sinon");
const User = require("../../models/userModel");
const manageUsers = require("../../controllers/manageUsers.controller");
const app = require("../../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.should();

describe("GET all users from /management/users using the getUsers controller method", () => {
    let mockUsers;

    beforeEach(() => {
        mockUsers = [
            {
                _id: "1",
                name: "Martin Dawes",
                email: "martin@gmail.com",
                password: "12345",
                hasRole: "Developer",
            },
            {
                _id: "1",
                name: "Martin Dawes",
                email: "martin@gmail.com",
                password: "12345",
                hasRole: "Developer",
            },
            {
                _id: "1",
                name: "Martin Dawes",
                email: "martin@gmail.com",
                password: "12345",
                hasRole: "Developer",
            },
        ];
        sinon.stub(User, "find").resolves(mockUsers);
    });

    afterEach(() => {
        User.find.restore();
    });

    it("should return an array of users with expected length", async () => {
        const req = {};
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        await manageUsers.getUsers(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.status().json.calledWith(mockUsers)).to.be.true;
    });

    it("should return users with expected properties", async () => {
        const req = {};
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        await manageUsers.getUsers(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.status().json.calledWith(mockUsers)).to.be.true;

        mockUsers.forEach((user) => {
            expect(user).to.have.property("_id");
            expect(user).to.have.property("name");
            expect(user).to.have.property("email");
            expect(user).to.have.property("password");
            expect(user).to.have.property("hasRole");
            expect(user._id).to.be.a("string");
            expect(user.name).to.be.a("string");
            expect(user.email).to.be.a("string");
            expect(user.password).to.be.a("string");
            expect(user.hasRole).to.be.a("string");
        });
    });
});

describe("GET user by ID from /management/users using the getUsers controller method", () => {
    let mockUser;

    beforeEach(() => {
        mockUser = 
        {
                _id: "1",
                name: "Martin Dawes",
                email: "martin@gmail.com",
                password: "12345",
                hasRole: "Developer",
            };
        sinon.stub(User, "findById").resolves(mockUser);
    });

    afterEach(() => {
        User.findById.restore();
    });

    it("should return a user with the expected ID", async () => {
        const req = { params: { id: "1" } };
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        await manageUsers.getUserById(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.status().json.calledWith(mockUser)).to.be.true;
    });

    it("should return a user with the expected length", async () => {
        const req = { params: { id: "1" } };
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        await manageUsers.getUserById(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.status().json.calledWith(mockUser)).to.be.true;
    });

    it("should return a user with the expected properties", async () => {
        const req = { params: { id: "1" } };
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        await manageUsers.getUserById(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.status().json.calledWith(mockUser)).to.be.true;

        expect(mockUser).to.have.property("_id");
        expect(mockUser).to.have.property("name");
        expect(mockUser).to.have.property("email");
        expect(mockUser).to.have.property("password");
        expect(mockUser).to.have.property("hasRole");
        expect(mockUser._id).to.be.a("string");
        expect(mockUser.name).to.be.a("string");
        expect(mockUser.email).to.be.a("string");
        expect(mockUser.password).to.be.a("string");
        expect(mockUser.hasRole).to.be.a("string");
    });
});

describe("CREATE user at /management/users/create using the createUser controller method", () => {
    it("should create a user and save it to the database with a 201 response code", async () => {
        const userData = {
            name: "Martin Dawes",
            email: "martin@gmail.com",
            password: "12345",
            hasRole: "Developer",
        };
        const req = { body: userData };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const user = new User(userData);
        sinon.stub(User.prototype, "save").resolves(user);

        await manageUsers.createUser(req, res);

        sinon.assert.calledOnce(user.save);
        sinon.assert.calledOnceWithExactly(res.status, 201);
    });
});

describe("DELETE user by ID from /management/users/delete/:id using the deleteUser controller method", () => {
    it("should delete a user with the given ID", async () => {
        const userId = "1234567890";
        const user = new User({ _id: userId });
        const req = { params: { id: userId } };
        const res = {
            status: sinon.stub().returns({
                json: sinon.stub(),
            }),
        };

        sinon.stub(User, "findById").resolves(user);
        sinon.stub(user, "remove").resolves();

        await manageUsers.deleteUser(req, res);

        sinon.assert.calledOnceWithExactly(User.findById, userId);
        sinon.assert.calledOnce(user.remove);
        sinon.assert.calledOnceWithExactly(res.status, 200);
    });
});

describe("UPDATE user by ID from /management/user/update/:id using the updateUser controller method", () => {
    it("should update a user with the given ID", async () => {
        const user = new User({
            name: "Martin Dawes",
            email: "martin@gmail.com",
            password: "12345",
            hasRole: "Developer",
        });
        await user.save();

        const res = await chai
            .request(app)
            .patch(`/management/users/update/${user.id}`)
            .send({
                name: "Developer Dawes",
                email: "martin@gmail.com",
                password: "12345",
                hasRole: "Developer",
            });

        res.should.have.status(200);
        res.body.should.have.property("name").eql("Developer Dawes");
        res.body.should.have.property("email").eql("martin@gmail.com");
        res.body.should.have.property("password").eql("12345");
        res.body.should.have.property("hasRole").eql("Developer");
    });
});
