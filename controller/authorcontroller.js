const AuthorModel= require("../model/authormodel")

let createauthor= async function(req,res){
    try{
    data= req.body
    createdata=await AuthorModel.create(data)
    res.send({msg:createdata})}
    catch(error){
        res.send({msg:error.message})
    }
}

module.exports.createauthor=createauthor