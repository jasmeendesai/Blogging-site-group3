
//----------------------------------------
// author body data validations

const validateNameAndTitle = async function (req, res, next) {
  try {
    if(!req.body || Object.keys(req.body).length === 0){
      return res.status(400).send({ status: false, message: "No data is present in body" });
    }
    const validkeys = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const enm = ['Mr', 'Mrs', 'Miss'];

    const { fname, lname, title } = req.body

    if (!fname) {
      return res.status(400).send({ status: false, message: "fname is required" });
    }
    if (typeof fname !== "string" || !validkeys.test(fname) || fname.trim().length === 0) {  // value.trim().length===0 return false if true then run if block
      return res.status(400).send({ status: false, message: "Enter a valid fname" });
    }
    if (fname.length < 2) {
      return res.status(400).send({ status: false, message: "Length of fname should be more than 2 characters" });
    }

    if (!lname) {
      return res.status(400).send({ status: false, message: "lname is required" });
    }
    if (typeof lname !== "string" || !validkeys.test(lname) || lname.trim().length === 0) {
      return res.status(400).send({ status: false, message: "Enter a valid lname" });
    }
    if (lname.length < 2) {
      return res.status(400).send({ status: false, message: "Length of lname should be more than 2 characters" });
    }

    if (!title) {
      return res.status(400).send({ status: false, message: "title is required" });
    }
    if (typeof title !== "string" || !enm.includes(title) || title.trim().length === 0) {
      return res.status(400).send({ status: false, message: "Enter a valid title" });
    }

    next();
  }
  catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}

//-------------------------------------------------------------------------


const validateEmailAndPassword = async function (req, res, next) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({ status: false, message: "No data is present in body" });
    }
    const { email, password } = req.body;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/;
    if (!email) {
      return res.status(400).send({ status: false, message: "Email is required" });
    }
    if (typeof email !== "string" || !emailRegex.test(email) || email.trim().length === 0) {
      return res.status(400).send({ status: false, message: "Enter a valid email" });
    }

    if (!password) {
      return res.status(400).send({ status: false, message: "Password is required" });
    }
    if (typeof password !== "string" || !passwordRegex.test(password) || password.trim().length === 0) {
      return res.status(400).send({ status: false, message: "Enter a valid password" });
    }
    if (password.length < 5) {
      return res.status(400).send({ status: false, message: "Length of password should be more than 5 characters" });
    }
    next();
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};





module.exports = { validateEmailAndPassword, validateNameAndTitle }