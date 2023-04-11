const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const User = require("../../../models/user.model");
const expect = chai.expect;
const jwt = require("jsonwebtoken");
const { oAuth2Client } = require("../../../controllers/Auth/authentication.controller");
const bcrypt = require("bcrypt");
const {
    registerUser,
    loginUser,
} = require("../../../controllers/Auth/authentication.controller");

// Enable chaiHttp plugin for chai
chai.use(chaiHttp);
chai.should();

// // Test suite for the registerUser controller method
// describe("registerUser controller method", () => {
//     // Declare variables to hold stubs
//     let findOneStub, saveStub, hashStub;

//     beforeEach(() => {
//         // Create stubs before each test
//         findOneStub = sinon.stub(User, "findOne");
//         saveStub = sinon.stub(User.prototype, "save");
//         hashStub = sinon.stub(bcrypt, "hash");
//     });

//     afterEach(() => {
//         // Restore stubs after each test
//         findOneStub.restore();
//         saveStub.restore();
//         hashStub.restore();
//     });

//     // Test case for existing user
//     it("should return a 409 status and error message for an existing user", async () => {
//         const req = {
//             body: {
//                 name: "John Doe",
//                 email: "john.doe@example.com",
//                 password: "password123",
//             },
//         };
//         const res = {
//             status: sinon.stub().returns({ json: sinon.stub() }),
//         };

//         // Mock the findOne method of the User model to return an object with the email that matches the one in the request
//         findOneStub.resolves({ email: "john.doe@example.com" });

//         // Call the controller method with the mocked request and response objects
//         await registerUser(req, res);

//         // Assert that the status and json methods of the response object are being called correctly
//         expect(res.status.calledWith(409)).to.be.true;
//         expect(
//             res.status().json.calledWith({
//                 message: "Email already exists in the database",
//             })
//         ).to.be.true;
//     });

//     // Test case for new user
//     it("should successfully register a new user", async () => {
//         const req = {
//             body: {
//                 name: "Jane Doe",
//                 email: "jane.doe@example.com",
//                 password: "password123",
//             },
//         };
//         const res = {
//             json: sinon.stub(),
//         };

//         // Mock the findOne method of the User model to return null, indicating that there is no existing user with the email provided in the request
//         findOneStub.resolves(null);
//         // Mock the hash method to simulate the successful hashing of the user's password
//         hashStub.resolves("hashedPassword123");
//         // Mock the save method to simulate the successful creation of a new user in the database
//         saveStub.resolves();

//         // Call the controller method with the mocked request and response objects
//         await registerUser(req, res);

//         // Assert that the json method of the response object is being called correctly
//         expect(res.json.calledWith({ message: "Success", isRegistered: true }))
//             .to.be.true;
//     });
// });

// Test suite for the loginUser controller method
describe("loginUser controller method", () => {
    // Declare variables to hold stubs
    let findOneStub, compareStub, signStub;

    beforeEach(() => {
        // Create stubs before each test
        findOneStub = sinon.stub(User, "findOne");
        compareStub = sinon.stub(bcrypt, "compare");
        signStub = sinon.stub(jwt, "sign");
    });

    afterEach(() => {
        // Restore stubs after each test
        findOneStub.restore();
        compareStub.restore();
        signStub.restore();
    });

    // Test case for non-existent user
    it("should return a 401 status and error message for non-existent user", async () => {
        const req = {
            body: {
                email: "non.existent@example.com",
                password: "password123",
            },
        };
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        // Mock the findOne method of the User model to return null, indicating that there is no user with the email provided in the request
        findOneStub.resolves(null);

        // Call the controller method with the mocked request and response objects
        await loginUser(req, res);

        // Assert that the status and json methods of the response object are being called correctly
        expect(res.status.calledWith(401)).to.be.true;
        expect(
            res.status().json.calledWith({
                message: "User not found with the entered email",
            })
        ).to.be.true;
    });

    // Test case for incorrect password
    it("should return a 401 status and error message for incorrect password", async () => {
        const req = {
            body: {
                email: "john.doe@example.com",
                password: "wrongPassword",
            },
        };
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        // Mock the findOne method of the User model to return an object with the email and password that matches the one in the request
        findOneStub.resolves({
            email: "john.doe@example.com",
            password: "hashedPassword123",
        });
        // Mock the compare method of bcrypt to return false, indicating that the password in the request is incorrect
        compareStub.resolves(false);

        // Call the controller method with the mocked request and response objects
        await loginUser(req, res);

        // Assert that the status and json methods of the response object are being called correctly
        expect(res.status.calledWith(401)).to.be.true;
        expect(res.status().json.calledWith({ message: "Incorrect password" }))
            .to.be.true;
    });

    // Test case for successful login
    it("should successfully log in a user", async () => {
        const req = {
            body: {
                email: "john.doe@example.com",
                password: "password123",
            },
        };
        const res = {
            json: sinon.stub(),
        };

        // Mock the findOne method of the User model to return an object with the email and password that matches the one in the request
        findOneStub.resolves({
            _id: "1",
            email: "john.doe@example.com",
            password: "hashedPassword123",
            hasRole: "Manager",
        });
        // Mock the compare method of bcrypt to return true, indicating that the password in the request is correct
        compareStub.resolves(true);
        // Mock the sign method of jwt to return a fake token
        signStub.returns("fakeToken");

        // Call the controller method with the mocked request and response objects
        await loginUser(req, res);

        // Assert that the json method of the response object is being called correctly
        expect(
            res.json.calledWith({
                message: "Success",
                token: "Bearer fakeToken",
                hasRole: "Manager",
            })
        ).to.be.true;
    });
});