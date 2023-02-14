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

    // Verify the JWT with the secret key and decode its payload
    jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
        // If the token is invalid, return an error response
        if (err) {
            return res.json({
                isLoggedIn: false,
                message: "Failed To Authenticate",
            });
        }

        
    });
}

module.exports = verifyJWTToken;
