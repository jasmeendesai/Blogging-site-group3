const AuthorModel = require("../model/authormodel")
const jwt = require("jsonwebtoken")
const validator = require('../util/validator')


//-------------------------------------------------

//create author function

const createauthor = async function (req,res) {
  try {
    
    const enm = ['Mr', 'Mrs', 'Miss'];
    const data = req.body;
    const { fname, lname, title,email,password} = data

    if(!validator.isValidRequestBody(req.body) ){
          return res.status(400).send({ status: false, message: "No data is present in body" });
    }
   
    if (!fname) {
        return res.status(400).send({ status: false, message: "fname is required" });
     }
      
    if (!lname) {
        return res.status(400).send({ status: false, message: "lname is required" });
    }
  
    if (!title || !enm.includes(title)) {
        return res.status(400).send({ status: false, message: "title is required" });
    }

    if (!validator.isValid(title)) {
        return res.status(400).send({ status: false, message: "Enter a valid title" });
    } 
    
    //     const { email, password } = req.body;
       
    if (!email) {
        return res.status(400).send({ status: false, message: "Email is required" });
    }

    if (!validator.isValid(email) || !validator.isValidEmail(email)) {
        return res.status(400).send({ status: false, message: "Enter a valid email" });
    }

    if (!password) {
        return res.status(400).send({ status: false, message: "Password is required" });
    }

    if (!validator.isValid(password)) {
        return res.status(400).send({ status: false, message: "Enter a valid password" });
    }

    
    const isEmail = await AuthorModel.findOne({ email: email });
    if (isEmail) {
      return res.status(400).send({ status: false, message: "Email address is already registered" });
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
      if(!validator.isValidRequestBody(req.body) ){
        return res.status(400).send({ status: false, message: "No data is present in body" });
      }
      const { email, password } = req.body;

      if (!email ||!password) {
        return res.status(400).send({ status: false, message: "Please enter email and password" });
      }

      if (!validator.isValid(email) || !validator.isValidEmail(email)) {
        return res.status(400).send({ status: false, message: "Enter a valid email" });
      }
    
      if (!validator.isValid(password)) {
        return res.status(400).send({ status: false, message: "Enter a valid password" });
      }

      const userLogin = await AuthorModel.findOne({email: email, password: password});
      if (!userLogin) {
        return res.status(401).send({ status: false, message: "username or the password is not correct" })
      }

        //generate token

      if (password) {
        const token = jwt.sign({ authorId: userLogin._id }, 'functionUp-tech1');

        return res.status(200).send({ status: true, data: { token: token } })
      } else {
        return res.status(401).send({status: false,message: "not a authenticate user"})
      }
  
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { createauthor, authorLogin }


