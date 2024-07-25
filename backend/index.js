const express = require("express");
const getConnection = require("./connections/connection.js");
getConnection();

const app = express();

app.listen(3000, ()=>{
    console.log("Listening on port 3000");
})