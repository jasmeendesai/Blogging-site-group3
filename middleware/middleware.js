const jwt = require("jsonwebtoken");
const blogModel = require("../model/blogmodel")


const authentication = async function (req, res, next) {
    try {
        const token = req.headers["x-api-key"]

        // header validation
        // if (!Object.keys(req.headers).includes('x-api-key')) {
        //     return res.status(404).send({ status: false, message: "error ,header is missing" });
        // }
        if (!token) {
            return res.status(404).send({ status: false, message: "error ,token is missing" });
        }

        try {

            const decodedToken = jwt.verify(token, 'functionUp-tech1')
            req.decodedToken = decodedToken.authorId

            next()
        } catch (error) {
            return res.status(401).send({ status: false, message: "token is invalid" })
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const authorization = async function (req, res, next) {
    try {
      const blogId = req.params.blogId;
  
      const blog = await blogModel.findById(blogId);
      if (!blog) {
        return res.status(404).send({ status: false, message: "Blog not found" });
      }
  
      if (blog.isDeleted) {
        return res.status(400).send({ status: false , message : "Blog is already deleted"});
      }
  
      const userLoggedIn = req.decodedToken;
      const userToBeModified = blog.authorId;
  
      if (userToBeModified != userLoggedIn) {
        return res.status(403).send({ status: false, message: "User logged in is not allowed to modify the requested user's data" });
      }
  
      next();
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };


module.exports.authentication = authentication
module.exports.authorization = authorization



