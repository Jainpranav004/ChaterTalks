const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const {generateToken} = require("../config/generateToken");


const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password, pic } = req.body;
    
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the fields");
    }

    //Searching for email in db
    const userExists = await User.findOne({ email });
    // console.log("User exists?", userExists);

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }


    const user = await User.create({
        name, email, password, pic
    });
    
    //create new user
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id),   //generate awt token for every user
            });

        } else {
            res.status(400);
            throw new Error("Failed to create user");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (user.matchPassword(password))) {
        res.json({
            _id : user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    } 
});

const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        //use or operator , any of them is true return true
        $or: [ //i for uppercase and lowercase
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ]
    }:{}

    //finding users other than the logged in one
    //Not equals to req.user.id 
    const user = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(user);

});
    
    
module.exports = {registerUser ,authUser, allUsers};