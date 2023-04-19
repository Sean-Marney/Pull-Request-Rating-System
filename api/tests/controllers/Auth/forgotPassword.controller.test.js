const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const User = require("../../../models/user.model");
const expect = chai.expect;
const Otp = require("../../../models/otp.model");
const {
    oAuth2Client,
    CLIENT_ID
} = require("../../../controllers/Auth/authentication.controller");
const nodemailer = require("nodemailer");
const {
    sendOTP,
    verifyOTP,
} = require("../../../controllers/Auth/forgotPassword.controller");

// Enable chaiHttp plugin for chai
chai.use(chaiHttp);
chai.should();

// Test suite for the sendOTP controller method
describe("sendOTP controller method", () => {
    // Declare variables for the stubs used in this test suite
    let findOneStub, createStub, sendMailStub, getAccessTokenStub;

    // Set up the stubs before each test case
    beforeEach(() => {
        findOneStub = sinon.stub(User, "findOne");
        createStub = sinon.stub(Otp, "create");
        sendMailStub = sinon.stub(nodemailer, "createTransport").returns({
            sendMail: sinon.stub(),
        });
        getAccessTokenStub = sinon.stub(oAuth2Client, "getAccessToken");
    });

    // Restore the stubs after each test case
    afterEach(() => {
        findOneStub.restore();
        createStub.restore();
        sendMailStub.restore();
        getAccessTokenStub.restore();
    });

    // Test case for handling an invalid email
    it("should return a 400 status and error message for an invalid email", async () => {
        // Define the request object for this test case
        const req = {
            params: {
                email: "invalidemail",
            },
        };
        // Define the response object with stubs for the status and json methods
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        // Call the sendOTP function with the test request and response objects
        await sendOTP(req, res);

        // Assert that the status method was called with a 400 status code
        expect(res.status.calledWith(400)).to.be.true;
        // Assert that the json method was called with the expected error message
        expect(
            res.status().json.calledWith({
                message: "Please provide a valid email address",
            })
        ).to.be.true;
    });

    // Test case for handling a non-existent user
    it("should return a 404 status and error message for a non-existent user", async () => {
        // Define the request object for this test case
        const req = {
            params: {
                email: "nonexistent@example.com",
            },
        };
        // Define the response object with stubs for the status and json methods
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        // Set the findOneStub to resolve with null (no user found)
        findOneStub.resolves(null);

        // Call the sendOTP function with the test request and response objects
        await sendOTP(req, res);

        // Assert that the status method was called with a 404 status code
        expect(res.status.calledWith(404)).to.be.true;
        // Assert that the json method was called with the expected error message
        expect(
            res.status().json.calledWith({
                message: "User with that email was not found",
            })
        ).to.be.true;
    });

    // Test case for sending an OTP and returning a success message for an existing user
    it("should send an OTP and return a success message for an existing user", async () => {
        // Define the request object for this test case
        const req = {
            params: {
                email: "existing@example.com",
            },
        };
        // Define the response object with stubs for the status and json methods
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        // Set the findOneStub to resolve with an existing user object
        findOneStub.resolves({
            email: "existing@example.com",
            name: "Existing User",
        });
        // Set the createStub to resolve (OTP created successfully)
        createStub.resolves();
        // Set the getAccessTokenStub to resolve with a fake access token
        getAccessTokenStub.resolves({ token: "fake_access_token" });

        // Call the sendOTP function with the test request and response objects
        await sendOTP(req, res);

        // Assert that the status method was called with a 200 status code
        expect(res.status.calledWith(200)).to.be.true;
        // Assert that the json method was called with the expected success message
        expect(
            res.status().json.calledWith({
                success: true,
                message: "OTP sent successfully",
            })
        ).to.be.true;
    });

    // Test case for handling an error that occurs during the process
    it("should return a 500 status and error message when an error occurs", async () => {
        // Define the request object for this test case
        const req = {
            params: {
                email: "error@example.com",
            },
        };
        // Define the response object with stubs for the status and json methods
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        // Set the findOneStub to throw an error (simulate an error occurring)
        findOneStub.throws();

        // Call the sendOTP function with the test request and response objects
        await sendOTP(req, res);

        // Assert that the status method was called with a 500 status code
        expect(res.status.calledWith(500)).to.be.true;
        // Assert that the json method was called with the expected error message
        expect(
            res.status().json.calledWith({
                message: "An error occurred while sending the OTP",
            })
        ).to.be.true;
    });
});

// Test suite for the verifyOTP controller method
describe("verifyOTP controller method", () => {
    // Declare variables for the stubs used in this test suite
    let findOneStub, removeStub;

    // Set up the stubs before each test case
    beforeEach(() => {
        findOneStub = sinon.stub(Otp, "findOne");
        removeStub = sinon.stub(Otp.prototype, "remove");
    });

    // Restore the stubs after each test case
    afterEach(() => {
        findOneStub.restore();
        removeStub.restore();
    });

    it("should return a 400 status and error message for an invalid OTP", async () => {
        // Setup request and response objects
        const req = {
            body: {
                email: "test@example.com",
                otp: "invalidOTP",
            },
        };
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        // Set findOneStub to resolve with null (no matching OTP found)
        findOneStub.resolves(null);

        // Call the verifyOTP function with the test request and response objects
        await verifyOTP(req, res);

        // Assert that the status method was called with a 400 status code
        expect(res.status.calledWith(400)).to.be.true;
        // Assert that the json method was called with the expected error message
        expect(
            res.status().json.calledWith({
                message:
                    "The number you entered doesn’t match your code. Please try again.",
            })
        ).to.be.true;
    });

    // Test case: Valid OTP
    it("should return a 200 status and success message for a valid OTP", async () => {
        // Setup request and response objects
        const req = {
            body: {
                email: "test@example.com",
                otp: "validOTP",
            },
        };
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        // Set findOneStub to resolve with a matching OTP
        findOneStub.resolves({ email: "test@example.com", otp: "validOTP" });
        // Set removeStub to resolve (simulate successful removal of OTP)
        removeStub.resolves();

        // Call the verifyOTP function with the test request and response objects
        await verifyOTP(req, res);

        // Assert that the json method was called with the success message
        expect(
            res.status().json.calledWith({
                success: true,
                message: "OTP verified successfully",
            })
        );
    });

    // Test case for when an error occurs while verifying the OTP
    it("should return a 500 status and error message when an error occurs", async () => {
        // Setup request and response objects
        const req = {
            body: {
                email: "error@example.com",
                otp: "errorOTP",
            },
        };
        const res = {
            status: sinon.stub().returns({ json: sinon.stub() }),
        };

        // Set findOneStub to throw an error
        findOneStub.throws();

        // Call the verifyOTP function with the test request and response objects
        await verifyOTP(req, res);

        // Assert that the status method was called with a 500 status code
        expect(res.status.calledWith(500)).to.be.true;
        // Assert that the json method was called with the expected error message
        expect(
            res.status().json.calledWith({
                message: "An error occurred while verifying the OTP",
            })
        ).to.be.true;
    });
});
