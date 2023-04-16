// Require the necessary dependencies
const expect = require("chai").expect;
const sinon = require("sinon");
const User = require("../../models/user.model");
const manageUsers = require("../../controllers/manageUsers.controller");
const app = require("../../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const sendEmail = require("../../controllers/Auth/emailUtils");
const bcrypt = require("bcrypt");

// Use the chai-http plugin and set the chai assertion library
chai.use(chaiHttp);
chai.should();

// Tests for the getUsers function
describe("GET all users from /management/users using the getUsers controller method", () => {
    let mockUsers;

    // Set up mock user data to use for testing
    beforeEach(() => {
        mockUsers = [
            {
                _id: "1",
                name: "Martin Dawes",
                email: "martin@gmail.com",
                password: "12345",
                hasRole: "Developer",
                git_username: "Martin Dawes",
            },
            {
                _id: "2",
                name: "Martin Dawes",
                email: "martin@gmail.com",
                password: "12345",
                hasRole: "Developer",
                git_username: "Martin Dawes",
            },
            {
                _id: "3",
                name: "Martin Dawes",
                email: "martin@gmail.com",
                password: "12345",
                hasRole: "Developer",
                git_username: "Martin Dawes",
            },
        ];
        // Stub the User model's find method to return the mock user data
        sinon.stub(User, "find").resolves(mockUsers);
    });

    // Clean up the stub after each test
    afterEach(() => {
        User.find.restore();
    });

    // Test that the getUsers function returns an array of users with the expected length
    it("should return an array of users with expected length", async () => {
        const req = {};
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        await manageUsers.getUsers(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.status().json.calledWith(mockUsers)).to.be.true;
    });

    // Test that the getUsers function returns users with the expected properties
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
            expect(user).to.have.property("git_username");
            expect(user._id).to.be.a("string");
            expect(user.name).to.be.a("string");
            expect(user.email).to.be.a("string");
            expect(user.password).to.be.a("string");
            expect(user.hasRole).to.be.a("string");
            expect(user.git_username).to.be.a("string");
        });
    });
});

// Test suite for getting a user by ID
describe("GET user by ID from /management/users using the getUsers controller method", () => {
    // Define a variable to hold the mock user object
    let mockUser;

    beforeEach(() => {
        // Create a mock user object
        mockUser = {
            _id: "1",
            name: "Martin Dawes",
            email: "martin@gmail.com",
            password: "12345",
            hasRole: "Developer",
            git_username: "Martin Dawes",
        };
        // Stub the User.findById method to resolve with the mock user object
        sinon.stub(User, "findById").resolves(mockUser);
    });

    afterEach(() => {
        // Restore the stubbed User.findById method
        User.findById.restore();
    });

    // Test case for returning a user with the expected ID
    it("should return a user with the expected ID", async () => {
        // Define a request object with a parameter for the user ID
        const req = { params: { id: "1" } };
        const res = {
            // Stub the status method to return an object with a json method
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        // Call the getUserById method with the request and response objects
        await manageUsers.getUserById(req, res);

        // Check that the status method was called with 200
        expect(res.status.calledWith(200)).to.be.true;

        // Check that the json method was called with the mock user object
        expect(res.status().json.calledWith(mockUser)).to.be.true;
    });

    // Test case for returning a user with the expected properties
    it("should return a user with the expected properties", async () => {
        // Define a request object with a parameter for the user ID
        const req = { params: { id: "1" } };
        const res = {
            // Stub the status method to return an object with a json method
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        // Call the getUserById method with the request and response objects
        await manageUsers.getUserById(req, res);

        // Check that the status method was called with 200
        expect(res.status.calledWith(200)).to.be.true;

        // Check that the json method was called with the mock user object
        expect(res.status().json.calledWith(mockUser)).to.be.true;

        // Check that the mock user object has the expected properties and data types
        expect(mockUser).to.have.property("_id");
        expect(mockUser).to.have.property("name");
        expect(mockUser).to.have.property("email");
        expect(mockUser).to.have.property("password");
        expect(mockUser).to.have.property("hasRole");
        expect(mockUser).to.have.property("git_username");
        expect(mockUser._id).to.be.a("string");
        expect(mockUser.name).to.be.a("string");
        expect(mockUser.email).to.be.a("string");
        expect(mockUser.password).to.be.a("string");
        expect(mockUser.hasRole).to.be.a("string");
        expect(mockUser.git_username).to.be.a("string");
    });
});

// // Test suite for the createUser controller method
// describe("CREATE user at /management/users/create using the createUser controller method", () => {
//     // Define a variable to hold the mock user object
//     let  saveStub, sendEmailStub;

//     beforeEach(() => {
//         saveStub = sinon.stub(User.prototype, "save");
//         sendEmailStub = sinon.stub(sendEmail, "sendEmail");
//     });

//     afterEach(() => {
//         saveStub.restore();
//         sendEmailStub.restore();
//     });
//     it("should create a user and save it to the database with a 201 response code", async () => {
//         const req = {
//             body: {
//                 name: "Martin Dawes",
//                 email: "martin@gmail.com",
//                 password: "12345",
//                 hasRole: "Developer",
//                 git_username: "Martin Dawes",
//             },
//         };
//         const res = {
//             json: sinon.stub(),
//             status: sinon.stub().returnsThis(),
//         };

//         // Mock the save method to simulate the successful creation of a new user in the database
//         saveStub.resolves();

//         // Call the controller method with the mocked request and response objects
//         await manageUsers.createUser(req, res);

//         // Check that the status method was called with 201
//         expect(res.status.calledWith(201));

//         // Check that the json method was called with the mock user object(req)
//         expect(res.status().json.calledWith(req));
//     });
// });

// Test suite for the deleteUser controller method
describe("DELETE user by ID from /management/users/delete/:id using the deleteUsers controller method", () => {
    it("should delete a user with the given ID", async () => {
        // Create a user ID (simple string)
        const userId = "1234567890";

        // Create a request object with the ID parameter
        const req = { params: { id: userId } };

        // Create a response object with a stubbed status function that returns a JSON object
        const res = {
            status: sinon.stub().returns({
                json: sinon.stub(),
            }),
        };

        // Create a user mock
        const user = { _id: userId };

        // Stub the findByIdAndDelete method of the User model to resolve with the tracker mock
        sinon.stub(User, "findByIdAndDelete").resolves(user);

        // Call the deleteUser controller method with the request and response objects
        await manageUsers.deleteUser(req, res);

        // Verify that the findByIdAndDelete method of the User model was called with the correct ID
        sinon.assert.calledOnceWithExactly(User.findByIdAndDelete, userId);

        // Verify that the status function of the response object was called with a 200 status code
        sinon.assert.calledOnceWithExactly(res.status, 200);
    });
});
