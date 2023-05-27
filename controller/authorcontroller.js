const AuthorModel= require("../model/authormodel")
const jwt = require("jsonwebtoken")


let createauthor= async function(req,res){
    try{
    const data= req.body
    let validkeys = /^[A-Za-z]+$/;
    
    // fname validation
    if(!data.fname) return res.status(400).send({status : false, message:"fname is required"});
    if(typeof data.fname !=="string" || !validkeys.test(data.fname)) return res.status(400).send({status : false, message:"enter valid fname"})
    
    // lname validation
    if(!data.lname) return res.status(400).send({status : false, message:"lname is required"});
    if(typeof data.lname !=="string" || !validkeys.test(data.lname)) return res.status(400).send({status : false, message:"enter valid lname"})

    // title validation
    const enm = ['Mr', 'Mrs', 'Miss']

    const title = data.title.every(val => typeof val == 'string')
    if(!title) return res.status(400).send({status : false, message:"title is required"});
    if(typeof data.title !=="array" || !title || !enm.includes(data.title)) return res.status(400).send({status : false, message:"enter valid title"})

    // email validation
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!data.email) return res.status(400).send({status : false, message:"email is required"});
    if(typeof data.email !=="string" || !email.test(data.email)) return res.status(400).send({status : false, message:"enter valid email"})

    const isEmail = await AuthorModel.find(data.email) //unique emailId
    if(isEmail.length>1) return res.status(400).send({status: false,message: `${email} email address is already registered`,});

    // password validation
    if(!data.password) return res.status(400).send({status : false, message:"password is required"});
    if(typeof data.password !=="string") return res.status(400).send({status : false, message:"enter valid password"})
    
    createdata=await AuthorModel.create(data)
    res.send({status: true , data:createdata})}
    
    catch(error){
        res.status(500).send({status : false, message:error.message})
    }
}



const authorLogin = async function(req,res){
    try{
    const data = req.body; //email & password
    
    //email val

    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!data.email) return res.status(400).send({status : false, message:"email is required"});
    if(typeof data.email !=="string" || !email.test(data.email)) return res.status(400).send({status : false, message:"enter valid email"})

    //password val
    if(!data.password) return res.status(400).send({ status: false, message: 'Password is required' });

    const userLogin = await AuthorModel.findOne(data);
    if(!userLogin) return res.status(401).send({status : false, message : "username or the password is not correct"})
    const token = jwt.sign({authorId : userLogin._id.toString()}, 'functionUp-tech1');

    res.setHeader("x-api-key",token)

    res.status(201).send({status : true, data:{token:token}})
    }catch(error){
        res.status(500).send({status : false, message : error.message})
    }
}



module.exports.createauthor=createauthor

module.exports.authorLogin = authorLogin
