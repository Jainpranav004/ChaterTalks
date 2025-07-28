const { chats } = require('./data/data');
const dotenv = require("dotenv");
const express = require("express");
const connectDB = require('./config/db');
const user_route =require('./routes/user_route')
const {notFound , errorHandler} = require("./middlewares/errorMiddleware");
const chat_route = require ('./routes/chat_route')


const app = express()
dotenv.config();
connectDB();
app.use(express.json()); //To accept express data

app.use("/user", user_route);
app.use("/chat", chat_route);



app.use(notFound)
app.use(errorHandler)


const port = process.env.PORT || 5000 ;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
