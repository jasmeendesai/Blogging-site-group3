const express = require('express');
const route = express.Router();

const authorcontroller = require("../controller/authorcontroller")

const blogController = require("../controller/blogController")

const middleware = require("../middleware/middleware")

const authorValidate = require("../middleware/authorValidations")

const blogValidation = require("../middleware/blogValidation")

//create author

route.post("/authors", 
    authorValidate.validateNameAndTitle, 
    authorValidate.validateEmailAndPassword, 
    authorcontroller.createauthor)

//author/login

route.post("/login", 
    authorValidate.validateEmailAndPassword, 
    authorcontroller.authorLogin)

//create blogs

route.post("/blogs", 
    middleware.authentication, 
    blogValidation.blogValidation ,
    blogController.createBlog)

//get blogs

route.get("/blogs", middleware.authentication, blogController.getBlog)

//update blog
route.put("/blogs/:blogId", middleware.authentication, middleware.authorization, blogController.updateBlog);

//delete blog by Id
route.delete("/blogs/:blogId", middleware.authentication, middleware.authorization, blogController.deleteuser);

//delete query
route.delete("/blogs", middleware.authentication, blogController.deletequery);


module.exports = route;

