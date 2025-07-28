const mongoose = require("mongoose");
const chatModel = mongoose.Schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [    //Array of objectIds
        {   
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
},
    {
        timestamps: true,     //Adds createdAt, updatedAt times
    }
);

const Chat = mongoose.model("Chat", chatModel);    //Compiles the schema into a model called Chat
module.exports = Chat;