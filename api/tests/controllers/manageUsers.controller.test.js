// Require the necessary dependencies
const expect = require("chai").expect;
const sinon = require("sinon");
const User = require("../../models/user.model");
const manageUsers = require("../../controllers/manageUsers.controller");
const app = require("../../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

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

// Test suite for the createUser controller method
describe("CREATE user at /management/users/create using the createUser controller method", () => {

  // Test case to verify that a user can be created and saved to the database with a 201 response code
  it("should create a user and save it to the database with a 201 response code", async () => {
  
    // Mock data for the user to be created
    const userData = {
        name: "Martin Dawes",
        email: "martin@gmail.com",
        password: "12345",
        hasRole: "Developer",
        git_username: "Martin Dawes",
    };
    
    // Mock request object with user data in the body
    const req = { body: userData };
    
    // Mock response object with stubbed status and json methods
    const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
    };

    // Create a new user object with the mock user data
    const user = new User(userData);
    
    // Stub the save method of the User prototype to return the user object
    sinon.stub(User.prototype, "save").resolves(user);

    // Call the createUser controller method with the mock request and response objects
    await manageUsers.createUser(req, res);

    // Verify that the save method was called once and returned the user object
    sinon.assert.calledOnce(user.save);
    
    // Verify that the status method was called once with a 201 response code
    sinon.assert.calledOnceWithExactly(res.status, 201);
  });
});

describe("DELETE user by ID from /management/users/delete/:id using the deleteUser controller method", () => {
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
        sinon.stub(User, "findByIdAndDelete").resolves(mockUser);
    });

    afterEach(() => {
        // Restore the stubbed findByIdAndDelete method
        User.findByIdAndDelete.restore();
    });

    // Test case for deleting a user with the expected ID
    it("should delete a user with the given ID", async () => {
        // Define a request object with a parameter for the user ID
        const req = { params: { id: "1" } };
        const res = {
            // Stub the status method to return an object with a json method
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        // Call the deleteUser method with the request and response objects
        await manageUsers.deleteUser(req, res);

        // Check that the findByIdAndDelete method was called with the expected ID
        sinon.assert.calledOnceWithExactly(User.findByIdAndDelete, "1");

        // Check that the status method was called with 200
        expect(res.status.calledWith(200)).to.be.true;

        // Check that the json method was called with the expected success message
        expect(res.status().json.calledWith({ message: "User deleted" })).to
            .be.true;
    });

    // Test case for returning a 404 status code and error message when the user is not found
    it("should return a 404 status code and error message when the user is not found", async () => {
        // Stub the findByIdAndDelete method to resolve with null, indicating that the user was not found
        User.findByIdAndDelete.resolves(null);

        // Define a request object with a parameter for the user ID
        const req = { params: { id: "1" } };
        const res = {
            // Stub the status method to return an object with a json method
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        // Call the deleteUser method with the request and response objects
        await manageUsers.deleteUser(req, res);

        // Check that the findByIdAndDelete method was called with the expected ID
        sinon.assert.calledOnceWithExactly(User.findByIdAndDelete, "1");

        // Check that the status method was called with 404
        expect(res.status.calledWith(404)).to.be.true;

        // Check that the json method was called with the expected error message
        expect(
            res
                .status()
                .json.calledWith({ message: "User with that ID not found" })
        ).to.be.true;
    });
});


