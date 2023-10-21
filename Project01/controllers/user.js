
const User = require('../models/user');
async function handleGetAllUsers(req, res) {
    const alldbusers = await User.find({});
   return res.json(alldbusers);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if(!user) {
        return res.status(404).json({
            message: "user not found"
        });
    }
     return res.json(user);
}

async function handleUpdateUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, {lastName: "changed"});
        return res.json({
            message: "user updated"
        });
}

async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({
        message: "user deleted successfully"
    });
}

async function handleCreateNewUser(req, res) {
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
    return res.status(201).json({msg:"user created",id:result._id});
}


module.exports = {
    handleGetAllUsers,handleGetUserById,handleUpdateUserById,handleDeleteUserById,handleCreateNewUser,
}