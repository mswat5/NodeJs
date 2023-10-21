const express = require('express');
const app = express();
const userRouter = require('./routes/user');
const {connectMongoDb} = require('./connection');
const {logReqRes}=require("./middlewares");
//connection
connectMongoDb("mongodb://127.0.0.1:27017/ytapp1");

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//routes
app.use('/api/users', userRouter);

app.listen(8000, () => {
    console.log('server is running on port 8000')
})