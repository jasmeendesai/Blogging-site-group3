const express = require('express');
const route = express.Router();
const authorcontroller= require("../controller/authorcontroller")
const blogController = require("../controller/blogController")
const middleware = require("../middleware/validation")

route.get("/myfirstapi",function(req, res){
    res.send("This is working")
})


route.post("/createauthor",authorcontroller.createauthor)
route.post("/login",authorcontroller.authorLogin)

route.post("/createBlog",middleware.authentication,blogController.createBlog)
route.get("/getBlog",middleware.authentication,blogController.getBlog)

route.put("/blogs/:blogId",middleware.authentication,middleware.authorization,blogController.updateBlog);

route.delete("/deleteuser/:blogId",middleware.authentication,middleware.authorization,blogController.deleteuser);

route.delete("/deletequery",middleware.authentication,blogController.deletequery);
module.exports = route;

