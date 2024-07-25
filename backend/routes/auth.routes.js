const express = require("express");
const { SignUp } = require("../controllers/auth.controller");
const router = express.Router();

router.post('/signUp', SignUp);

module.exports = router;