const express = require('express');
const route = express.Router();
const authorcontroller= require("../controller/authorcontroller")

route.get("/myfirstapi",function(req, res){
    res.send("hello i am wasfa")
})


route.post("/createauthor",authorcontroller.createauthor)





module.exports = route;