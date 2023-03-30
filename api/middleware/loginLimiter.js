const rateLimit = require('express-rate-limit')

const loginLmiter = reatLimit({
    // windowMs: 1000 * 60 * 60, // 1 hour
    windowMs: 60 * 1000, // 1 minute 
    max: 5, // Limit each IP to 5 login requests per window per minute
    massage: {message: 'Too many login attempts. Please try again later after 60 seconds.'},
    stadardHeaders: true, // Return rate limit info in the 'RateLimit-*' headers
    lagacyHeaders:false, // Disable the 'X-RateLimit-*' headers
    
})
 
module.exports = loginLmiter