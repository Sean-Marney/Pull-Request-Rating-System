const jwt = require("jsonwebtoken");

// function checks if a JSON Web Token (JWT) exists in the "x-access-token" header of an HTTP request
function verifyJWTToken(req, res, next) {
    
    // Get the JWT from the "x-access-token" header of the request
    const token = req.headers["x-access-token"]?.split(" ")[1];
}

module.exports = verifyJWTToken;
