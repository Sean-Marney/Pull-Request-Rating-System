const jwt = require("jsonwebtoken");

// function checks if a JSON Web Token (JWT) exists in the "x-access-token" header of an HTTP request
function verifyJWTToken(req, res, next) {

    console.log(req.headers)

    // new defining the auth header
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer')){
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token =authHeader.split(' ')[1]

    // // Get the JWT from the "x-access-token" header of the request
    // const token = req.headers["x-access-token"];

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

        // Set the decoded user information on the request object
        req.user = { id: decoded.id, name: decoded.name, hasRole: decoded.hasRole };

        // Call the next middleware function
        next();
    });
}

const verifyTokenAndAuth = (req, res, next) => {
    verifyJWTToken(req, res, () => {
    if (req.user.id == req.params.id || req.user.hasRole == "manager") {
        next();
        } else {
            res.status(403).json("You are not authorized for this action");
        }
    });
}

const verifyManger = (req, res, next) => {
    verifyJWTToken(req, res, () => {
    if (req.user.hasRole == "manager") {
        next();
        } else {
            res.status(403).json("You are not authorized for this action");
        }
    });
}


module.exports = {verifyJWTToken, verifyManger, verifyTokenAndAuth};
