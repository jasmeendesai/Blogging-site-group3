const jwt = require("jsonwebtoken");
const blogModel = require("../model/blogmodel")


const authentication = async function (req, res, next) {

    const token = req.headers["x-api-key"]

    // header validation
    if (!Object.keys(req.headers).includes('x-api-key')) return res.status(404).send({ status: false, message: "error ,header is missing" });
    if (!token) return res.status(404).send({ status: false, message: "error ,token is missing" });

    try {

        const decodedToken = jwt.verify(token, 'functionUp-tech1')
        req.decodedToken = decodedToken.authorId

        next()
    } catch (error) {
        res.status(401).send({ status: false, message: "token is invalid" })
    }
}

const authorization = async function (req, res, next) {


    const blogId = req.params.blogId
    const blog = await blogModel.findById(blogId);

    if (!blog) return res.status(404).send({ status: false, message: 'Blog not found' })

    if (blog.isDeleted) return res.status(404).send({ status: false, message: "The blog is already deleted" })

    const userLoggedIn = req.decodedToken  //decodedToken.authorId
    const userToBeModified = blog.authorId


    if (userToBeModified != userLoggedIn) return res.status(403).send({ status: false, msg: 'User logged in not allowed to modify the requested users data' })
    next()
}

module.exports.authentication = authentication
module.exports.authorization = authorization



