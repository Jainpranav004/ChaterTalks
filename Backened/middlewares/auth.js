const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (
        //if these both conditions are valid then only proceed
        //as this indicates we have jwt token (Jwt token starts with eg:  Bearer adsausbiwbw)
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            //access the token by i.e the 2nd part of token (not bearer)
            token = req.headers.authorization.split(" ")[1];

            //decode token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorised ,token failed")
        }
    }

    //if if condition is not satisfied do this
    if (!token) {
        res.status(401);
        throw new Error("Not authorized , no token")
    }
})

module.exports = { protect };