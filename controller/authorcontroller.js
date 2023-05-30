const AuthorModel = require("../model/authormodel")
const jwt = require("jsonwebtoken")

//-------------------------------------------------

//create author function

let createauthor = async function (req, res) {
    try {
        const data = req.body
         const isEmail = await AuthorModel.find({ email: data.email }) //unique emailId
        if (isEmail.length > 0) {
            return res.status(409).send({ status: false, message: "email address is already registered", });
        }
        createdata = await AuthorModel.create(data)
        return res.status(201).send({ status: true, data: createdata })
    }

    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

//-------------------------------------------------

// author login function

const authorLogin = async function (req, res) {
    try {
        const data = req.body; //email & password

        const userLogin = await AuthorModel.findOne(data);
        if (!userLogin) return res.status(401).send({ status: false, message: "username or the password is not correct" })

        //generate token
        const token = jwt.sign({ authorId: userLogin._id.toString() }, 'functionUp-tech1');

        res.setHeader("x-api-key", token)

        return res.status(201).send({ status: true, data: { token: token } })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { createauthor, authorLogin }


