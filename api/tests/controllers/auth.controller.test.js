const chai = require("chai");
const chaiHttp = require("chai-http");
const auth = require("../../controllers/auth.controller");
const sinon = require("sinon");
var User = require("../../models/user.model");
const jwt = require("jsonwebtoken");

chai.use(chaiHttp);
chai.should();

describe("CREATE user at /auth using the registerUser controller method", () => {
    it("should create a user and save it to the database with a 201 response code", function () {
        this.timeout(500000);

        const userData = {
            name: "Test user",
            email: "test@gmail.com",
            password: "12345",
        };
        const req = { body: userData };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const user = new User(userData);
        sinon.stub(User.prototype, "save").resolves(user);

        auth.registerUser(req, res)
            .then(() => {
                sinon.assert.calledOnce(user.save);
                sinon.assert.calledOnceWithExactly(res.status, 201);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});



