const express = require('express');
const mongoose = require('mongoose');
const app = express();

//connection
mongoose.connect('mongodb://127.0.0.1:27017/ytapp1')
    .then(() => console.log('mongo connected'))
    .catch((err) => console.log('mongo ki error', err))

//schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: "string",
        required: "true",
    },
    lastName: {
        type: "string",
    },
    email: {
        type: "string",
        required: "true",
        unique: true,
    },
    jobTitle: {
        type: "string",
    },
    gender: {
        type: "string",
    },
},{timestamps: true})
const User = mongoose.model("user", userSchema)

//middleware
app.use(express.urlencoded({ extended: false }));

//routes
app.get('/users',async (req, res) => {
    const alldbusers = await User.find({});
   const html = `<ul>
   ${alldbusers.map((user) =>`<li>${user.firstName}-${user.email}</li>`).join("")}
   </ul>`;
   res.send(html);
})

app.route('/api/users/:id')
    .get(async (req, res) => {
       const user = await User.findById(req.params.id);
       if(!user) {
           return res.status(404).json({
               message: "user not found"
           });
       }
        return res.json(user);
    }) 
    .patch(async(req, res) => {
        await User.findByIdAndUpdate(req.params.id, {lastName: "changed"});
        return res.json({
            message: "user updated"
        });
    })
    .delete(async(req, res) => {
await User.findByIdAndDelete(req.params.id);
return res.json({
    message: "user deleted successfully"
});
    })

app.post('/api/users', async(req, res) => {
    const body = req.body;
    if ( !body.firstName || !body.lastName || !body.email || !body.jobTitle || !body.gender) {
        return res.status(400).json({
            message: "all fields are required"
        });
    }
    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        jobTitle: body.jobTitle,
        gender: body.gender
    });
    return res.status(201).json({msg:"user created"});
})

app.listen(8000, () => {
    console.log('server is running on port 8000')
})