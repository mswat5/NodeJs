const express = require("express");

const app = express();
app.get("/",(req,res)=>{
    return res.send("hello from hompage")
})
app.get("/about",(req,res)=>{
    return res.send("hello from about page")
})

app.listen(8000,()=>{
    console.log("server is running on 8000 port")
})