const express = require("express");
const { SignUp, SignIn } = require("../controllers/auth.controller");
const router = express.Router();

router.post('/signUp', SignUp);
router.post('/login', SignIn);

module.exports = router;