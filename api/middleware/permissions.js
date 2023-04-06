module.exports = function (roles) {
    /**
     * @description Role based permission handler
     * 
     * @param {String} roles 
     */
    return async (req, res, next) => {
        try{
            console.log("permit")
        const allowed_roles = roles.split(" ");

        if (!allowed_roles.includes(req.user.hasRole)) {
            // return res.status(401)
            throw new Error("You are not authorized to access this resource");
        }

        next();

    }catch(error){
        console.log(error)
        return res.status(500)
    }
    };
};