const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel")
 
const accessChat = asyncHandler(async (req, res) => {
    //get userId of the reciver from body
    const { userId } = req.body;

    //if no id or chat is sent in request
    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    //searches in Chat collection
    var isChat = await Chat.find({
        //chat should not be group chat , both reciver and loggedin (Sender's) - and operation , both should be there i.e; true
        isGroupChat: false,
        //Matches arrays that contains both ids
        users: { $all: [req.user._id, userId] },
    })
        
        //fills user details
        .populate("users", "-password")
        //fills last message sent in chat
        .populate("latestMessage");
    
    //poultes sender of latest message to make name pic email availale in final data
    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    //Access chat is exist else create it
    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };
        
        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users", "-password"
            );

            res.status(200).send(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }


    }
});

const fetchChats = asyncHandler(async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")

            //sort in descenfing order on updateAt stamp
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email",
                });
                res.status(200).send(results);
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

const createGroupChat = asyncHandler(async (req, res) => {
    //For creating groupchat we req grpname , and members
    if (!req.body.users || !req.body.name) {
        return res.sendStatus(400).send({ message: "Please fill all the fields" });
    }
    
    var users = JSON.parse(req.body.users);
    if (users.length < 2) {
        return res
            .status(400)
            .send("More than 2 users are required to form a grooup chat")
        
    }

    //in group chat logged in user is also a part
    users.push(req.user);
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        //sending group chat ooto user
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);

    }
});

const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId, { chatName }, { new: true }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    
    if (!updatedChat) {
        res.status(404);
        throw new Error("chat not found");
    } else {
        res.json(updatedChat);
    }
}
);

const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
    const added = await Chat.findByIdAndUpdate(
        chatId, { $push: { users: userId } }, { new: true }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    
    if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(added);
    }



});

const removeFromGroup = asyncHandler(async (req, res) => {
     const { chatId, userId } = req.body;
    const removed = await Chat.findByIdAndUpdate(
        chatId, { $pull: { users: userId } }, { new: true }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    
    if (!removed) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(removed);
    }


})

module.exports = { accessChat, fetchChats, createGroupChat ,renameGroup ,addToGroup, removeFromGroup};