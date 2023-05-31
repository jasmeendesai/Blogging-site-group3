const AuthorModel = require("../model/authormodel")
const jwt = require("jsonwebtoken")

//-------------------------------------------------

//create author function

const createauthor = async function (req, res) {
    try {
      const data = req.body;
      const isEmail = await AuthorModel.findOne({ email: data.email });
      if (isEmail) {
        return res.status(409).send({ status: false, message: "Email address is already registered" });
      }
      const createdata = await AuthorModel.create(data);
      return res.status(201).send({ status: true, message: "Author created successfully", data: createdata });
    } catch (error) {
      res.status(500).send({ status: false, message: error.message });
    }
  };

//-------------------------------------------------

// author login function

const authorLogin = async function (req, res) {
    try {
        const data = req.body; //email & password

        const userLogin = await AuthorModel.findOne({email: data.email, password: data.password});
        if (!userLogin) return res.status(401).send({ status: false, message: "username or the password is not correct" })

        //generate token
        const token = jwt.sign({ authorId: userLogin }, 'functionUp-tech1');

        res.setHeader("x-api-key", token)

        return res.status(201).send({ status: true, data: { token: token } })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { createauthor, authorLogin }


