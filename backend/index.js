const express = require("express");
const getConnection = require("./connections/connection.js");
getConnection();
const cors = require("cors");
const SignUp = require('./routes/auth.routes.js');
const Error = require('./middleware/error.middleware.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//api routes
app.use('/auth', SignUp);

//error middleware
app.use(Error);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT || 3000}`);
})