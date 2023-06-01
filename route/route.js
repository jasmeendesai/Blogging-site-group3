const express = require('express');
const route = express.Router();

const authorcontroller = require("../controller/authorcontroller")

const blogController = require("../controller/blogController")

const middleware = require("../middleware/middleware")


//create author

route.post("/authors",authorcontroller.createauthor)

//author/login

route.post("/login", authorcontroller.authorLogin)

//create blogs

route.post("/blogs", 
    middleware.authentication, 
    blogController.createBlog)

//get blogs

route.get("/blogs", 
    middleware.authentication, 
    blogController.getBlog)

//update blog
route.put("/blogs/:blogId", 
    middleware.authentication, 
    middleware.authorization, 
    blogController.updateBlog);

//delete blog by Id
route.delete("/blogs/:blogId", 
    middleware.authentication, 
    middleware.authorization, 
    blogController.deleteuser);

//delete query
route.delete("/blogs", 
    middleware.authentication, 
    blogController.deletequery);

route.use("*",(req,res)=>{
    return res.status(404).send({status : true, message :"invalid urls"})
})

module.exports = route;

