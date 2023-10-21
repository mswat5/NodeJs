const express = require('express');
const users = require('./MOCK_DATA.json')
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();



const userSchema = new mongoose.Schema({
    firstName:{
        type:string,
        required:true,
    },
    lastName:{
        type:string,
    },
    email:{
        type:string,
        required:true,
        unique:true,
    },
    jobTitle:{
        type:string,
    },
    gender:{
        type:string,
    }
})

//middleware
app.use(express.urlencoded({ extended: false }));


//routes

app.get('/api/users',(req, res) => {
    return res.json(users);
})

app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    .patch((req, res) => {

    })
    .delete((req, res) => {

    })

app.get('/api/users/:id', (req, res) => {

})
app.post('/api/users', (req, res) => {
    const user = req.body;
    users.push({ ...user, id: users.length + 1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "success", id: users.length })
    })
})

app.listen(8000, () => {
    console.log('server is running on port 8000')
})