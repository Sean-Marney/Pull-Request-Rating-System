const jwt = require("jsonwebtoken");

// function checks if a JSON Web Token (JWT) exists in the "x-access-token" header of an HTTP request
function verifyJWTToken(req, res, next) {
    
    // Get the JWT from the "x-access-token" header of the request
    const token = req.headers["x-access-token"]?.split(" ")[1];

    // If no token is provided, return an error response
    if (!token) {
        return res.json({
            message: "Incorrect Token Given",
            isLoggedIn: false,
        });
    }

    
}

module.exports = verifyJWTToken;
