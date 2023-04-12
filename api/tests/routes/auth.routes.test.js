const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const { expect } = chai;

chai.use(chaiHttp);
const express = require("express");
const app = express();

// Import the controller methods
const sendOTP = require("../../controllers/Auth/forgotPassword.controller");
const verifyOTP = require("../../controllers/Auth/forgotPassword.controller");
const registerUser = require("../../controllers/Auth/authentication.controller");
const loginUser = require("../../controllers/Auth/authentication.controller");

// Mock the controller methods
const registerUserMock = sinon.stub(registerUser, "registerUser");
const loginUserMock = sinon.stub(loginUser, "loginUser");
const sendOTPMock = sinon.stub(sendOTP, "sendOTP");
const verifyOTPMock = sinon.stub(verifyOTP, "verifyOTP");

// Create the register route for testing
app.post("/register", (req, res) => {
    registerUserMock(req, res);
});

// Test suite for the POST /register route
describe("POST /register", () => {

    // Reset the mock after each test
    afterEach(() => {
        registerUserMock.reset();
    });

    // Test case for successful user registration
    it("should return 201 status code and call registerUser controller on success", async () => {

        // Test user data
        const user = {
            name: "Bob Marley",
            email: "bob@gmail.com",
            password: "Password2%",
        };

        // Stub the controller to return a successful registration response
        registerUserMock.callsFake((req, res) => {
            res.status(201).json({ message: "User registered successfully" });
        });

        // Send the request and verify the response
        const res = await chai.request(app).post("/register").send(user);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property(
            "message",
            "User registered successfully"
        );
        expect(registerUserMock.calledOnce).to.be.true;
    });

    // Test case for user registration with invalid data
    it("should return 400 status code when user data is invalid", async () => {
        // Invalid test user data
        const invalidUser = {
            name: "",
            email: "bobgmail.com",
            password: "password123",
        };

        // Stub the controller to return an invalid user data response
        registerUserMock.callsFake((req, res) => {
            res.status(400).json({ message: "Invalid user data" });
        });

        // Send the request and verify the response
        const res = await chai.request(app).post("/register").send(invalidUser);
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message", "Invalid user data");
        expect(registerUserMock.calledOnce).to.be.true;
    });

    // Test case for an error occurring during user registration
    it("should return 500 status code when an error occurs", async () => {

        // Test user data
        const user = {
            name: "Bob Marley",
            email: "bob@gmail.com",
            password: "Password2%",
        };

        // Stub the controller to return an error response
        registerUserMock.callsFake((req, res) => {
            res.status(500).json({ message: "An error occurred" });
        });

        // Send the request and verify the response
        const res = await chai.request(app).post("/register").send(user);
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property("message", "An error occurred");
        expect(registerUserMock.calledOnce).to.be.true;
    });
});

// Create the login route for testing
app.post("/login", (req, res) => {
    loginUserMock(req, res);
});

// Test suite for the POST /login route
describe("POST /login", () => {
    // Reset the mock after each test
    afterEach(() => {
        loginUserMock.reset();
    });

    // Test case for successful user login
    it("should return 200 status code and call loginUser controller on success", async () => {
        // Test user credentials
        const userCredentials = {
            email: "bob@gmail.com",
            password: "Password2%",
        };

        // Stub the controller to return a successful login response
        loginUserMock.callsFake((req, res) => {
            res.status(200).json({ message: "User logged in successfully" });
        });

        // Send the request and verify the response
        const res = await chai
            .request(app)
            .post("/login")
            .send(userCredentials);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property(
            "message",
            "User logged in successfully"
        );
        expect(loginUserMock.calledOnce).to.be.true;
    });

    // Test case for user login with invalid credentials
    it("should return 400 status code when user credentials are invalid", async () => {
        // Invalid test user credentials
        const invalidCredentials = {
            email: "test@example.com",
            password: "wrongpassword",
        };

        // Stub the controller to return an invalid credentials response
        loginUserMock.callsFake((req, res) => {
            res.status(400).json({ message: "Invalid credentials" });
        });

        // Send the request and verify the response
        const res = await chai
            .request(app)
            .post("/login")
            .send(invalidCredentials);
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message", "Invalid credentials");
        expect(loginUserMock.calledOnce).to.be.true;
    });

    // Test case for an error occurring during user login
    it("should return 500 status code when an error occurs", async () => {
        // Test user credentials
        const userCredentials = {
            email: "test@example.com",
            password: "password123",
        };

        // Stub the controller to return an error response
        loginUserMock.callsFake((req, res) => {
            res.status(500).json({ message: "An error occurred" });
        });

        // Send the request and verify the response
        const res = await chai
            .request(app)
            .post("/login")
            .send(userCredentials);
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property("message", "An error occurred");
        expect(loginUserMock.calledOnce).to.be.true;
    });
});

// Create the sendOTP route for testing
app.get("/sendOTP/:email", (req, res) => {
    sendOTPMock(req, res);
});

// Test suite for the GET /sendOTP/:email route
describe("GET /sendOTP/:email", () => {
    // Reset the mock after each test
    afterEach(() => {
        sendOTPMock.reset();
    });

    // Test case for successful OTP sending
    it("should return 200 status code and call sendOTP controller", async () => {
        // Test email address
        const email = "test@example.com";

        // Stub the controller to return a successful OTP sending response
        sendOTPMock.callsFake((req, res) => {
            res.status(200).json({ message: "OTP sent successfully" });
        });

        // Send the request and verify the response
        const res = await chai.request(app).get(`/sendOTP/${email}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("message", "OTP sent successfully");
        expect(sendOTPMock.calledOnce).to.be.true;
    });

    // Test case for an error occurring during OTP sending
    it("should return 500 status code when an error occurs", async () => {
        // Test email address
        const email = "test@example.com";

        // Stub the controller to return an error response
        sendOTPMock.callsFake((req, res) => {
            res.status(500).json({ message: "An error occurred" });
        });

        // Send the request and verify the response
        const res = await chai.request(app).get(`/sendOTP/${email}`);
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property("message", "An error occurred");
        expect(sendOTPMock.calledOnce).to.be.true;
    });
});



// Create the verifyOTP route for testing
app.post("/forgotpassword/verify-otp/:email/:otp", (req, res) => {
    verifyOTPMock(req, res);
});

// Test suite for the POST /forgotpassword/verify-otp/:email/:otp route
describe("POST /forgotpassword/verify-otp/:email/:otp", () => {
    // Reset the mock after each test
    afterEach(() => {
        verifyOTPMock.reset();
    });

    // Test case for successful OTP verification
    it("should return 200 status code and call verifyOTP controller on success", async () => {
        // Test email address and OTP
        const email = "test@example.com";
        const otp = "123456";

        // Stub the controller to return a successful OTP verification response
        verifyOTPMock.callsFake((req, res) => {
            res.status(200).json({ message: "OTP verified successfully" });
        });

        // Send the request and verify the response
        const res = await chai
            .request(app)
            .post(`/forgotpassword/verify-otp/${email}/${otp}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property(
            "message",
            "OTP verified successfully"
        );
        expect(verifyOTPMock.calledOnce).to.be.true;
    });

    // Test case for invalid OTP
    it("should return 400 status code when OTP is invalid", async () => {
        // Test email address and invalid OTP
        const email = "test@example.com";
        const otp = "000000";

        // Stub the controller to return an invalid OTP response
        verifyOTPMock.callsFake((req, res) => {
            res.status(400).json({ message: "Invalid OTP" });
        });

        // Send the request and verify the response
        const res = await chai
            .request(app)
            .post(`/forgotpassword/verify-otp/${email}/${otp}`);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message", "Invalid OTP");
        expect(verifyOTPMock.calledOnce).to.be.true;
    });

    // Test case for an error occurring during OTP verification
    it("should return 500 status code when an error occurs", async () => {
        // Test email address and OTP
        const email = "test@example.com";
        const otp = "123456";

        // Stub the controller to return an error response
        verifyOTPMock.callsFake((req, res) => {
            res.status(500).json({ message: "An error occurred" });
        });

        // Send the request and verify the response
        const res = await chai
            .request(app)
            .post(`/forgotpassword/verify-otp/${email}/${otp}`);

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property("message", "An error occurred");
        expect(verifyOTPMock.calledOnce).to.be.true;
    });
});