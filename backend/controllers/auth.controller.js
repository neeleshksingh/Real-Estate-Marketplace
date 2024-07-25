const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

const SignUp = async (req,res,next)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({
            status: 'failed',
            message: 'All fields are required'
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({username, email, password: hashedPassword});
    try{
        await newUser.save();
        return res.status(200).json({
            status: "success",
            message : "User data created successfully",
            data: newUser
        })
    } catch(e){
        next(e);
    }
}

module.exports = {SignUp}