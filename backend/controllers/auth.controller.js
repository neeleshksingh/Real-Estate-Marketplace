const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SignUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({
            status: 'failed',
            message: 'All fields are required'
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(500).json({
                status: "failed",
                message: "User already exists !"
            })
        } else {
            await newUser.save();
            return res.status(200).json({
                status: "success",
                message: "User data created successfully",
                data: newUser
            })
        }
    } catch (e) {
        next(e);
    }
}

const SignIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validUser || !validPassword) {
            return res.status(401).json({
                status: 'failed',
                message: 'Wrong credentials!'
            })
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json({rest,token:token});
    } catch (error) {
        next(error);
    }
}

module.exports = { SignUp, SignIn }