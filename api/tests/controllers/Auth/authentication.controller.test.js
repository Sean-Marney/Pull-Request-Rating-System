const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const User = require("../../../models/user.model");
const expect = chai.expect;
const jwt = require("jsonwebtoken");
const {
    oAuth2Client,
} = require("../../../controllers/Auth/authentication.controller");
const bcrypt = require("bcrypt");
const {
    registerUser,
    loginUser,
} = require("../../../controllers/Auth/authentication.controller");
const nodemailer = require("nodemailer");


// Enable chaiHttp plugin for chai
chai.use(chaiHttp);
chai.should();

/// Test suite for the registerUser controller method
describe("registerUser controller method", () => {
    // Declare variables to hold stubs
    let findOneStub, saveStub, hashStub, sendMailStub;

    beforeEach(() => {
        // Create stubs before each test
        findOneStub = sinon.stub(User, "findOne");
        saveStub = sinon.stub(User.prototype, "save");
        hashStub = sinon.stub(bcrypt, "hash");

        // Create a mock transport with a sendMail function
        const mockTransport = {
            sendMail: sinon.stub().resolves(),
        };

        // Stub the createTransport function to return the mock transport
        sinon.stub(nodemailer, "createTransport").returns(mockTransport);

        // Set sendMailStub to reference the sendMail function from the mock transport
        sendMailStub = mockTransport.sendMail;
    });

    afterEach(() => {
        // Restore stubs after each test
        findOneStub.restore();
        saveStub.restore();
        hashStub.restore();
        nodemailer.createTransport.restore();
    });

    it("should successfully register a new user", async () => {
        const req = {
            body: {
                name: "Jane Doe",
                email: "jane.doe@example.com",
                password: "password123",
            },
        };
        const res = {
            status: sinon.stub().returnsThis(), // create a mock `status` method that returns `this` for chaining
            json: sinon.stub(), // create a mock `json` method
        };

        findOneStub.resolves(null);
        hashStub.resolves("hashedPassword123");
        saveStub.resolves();

        await registerUser(req, res);

        // Assert that the status method was called with a 200 status code
        expect(res.status.calledWith(200)).to.be.true;

        // Assert that the json method was called with the expected success message
        expect(
            res.status().json.calledWith({
                success: true,
                message: "Email sent successfully",
                isRegistered: true,
            })
        ).to.be.true;
        // Assert that the sendMail function was called with the correct arguments
        expect(sendMailStub.calledOnce).to.be.true;
        const sendMailArgs = sendMailStub.args[0][0];
        expect(sendMailArgs.to).to.equal("jane.doe@example.com");
        expect(sendMailArgs.subject).to.equal(
            "PullMaster.io Onboarding Confirmation"
        );
    });
});

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
