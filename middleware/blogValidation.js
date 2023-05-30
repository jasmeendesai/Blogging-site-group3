const AuthorModel = require("../model/authormodel")

//----------------------------------------------------

// Blog validations

const blogValidation = async function (req, res, next) {
    try {
        if(!req.body || Object.keys(req.body).length === 0){
            return res.status(400).send({ status: false, message: "No data is present in body" });
        }
        
        let {title,body,tags,category,subcategory,authorId} = req.body

        // title validation

        if(!title) {
            return res.status(400).send({ status: false, message: "title is required" });
        }
        if(typeof title !== "string") {
            return res.status(400).send({ status: false, message: "enter valid title" })
        }

        // body validation

        if(!body) {
            return res.status(400).send({ status: false, message: "body is required" });
        }
        if(typeof body !== "string") {
            return res.status(400).send({ status: false, message: "enter valid body" })
        }

        // // authorId validation
        if (!authorId) {
            return res.status(400).send({ status: false, message: "authorId is required" })
        };

        if(authorId.length != 24) {
            return res.status(400).send({status : false, message : "enter valid authorId"})
        }
        const authorIdData = await AuthorModel.findById(authorId)
        if (!authorIdData) {
            return res.status(404).send({ status: false, message: 'Author not found' })
        }

        // auhtorization
        if(authorId !== req.decodedToken) {
            return res.status(403).send({status: false, message: 'user is not authorised'})
        }

        // tags validation
       
        

        if (tags === "" || (Array.isArray(tags) && tags.length === 0)) {
            return res.status(400).send({ status: false, message: "Tags cannot be an empty array or string" });
        }
          
        if (Array.isArray(tags)) {
            const isValid = tags.every(value => typeof value === "string" && value.length > 0);
            if (!isValid) {
              return res.status(400).send({ status: false, message: "Tags should be an array of non-empty strings" });
            }
        }

        // category validation

        if(!category) {
            return res.status(400).send({ status: false, message: "category is required" });
        }
        if(typeof category !== "string") {
            return res.status(400).send({ status: false, message: "enter valid category" })
        }

        // subcategory validation

        if (subcategory === "" || (Array.isArray(subcategory) && subcategory.length === 0)) {
            return res.status(400).send({ status: false, message: "subcategory cannot be an empty array or string" });
        }
          
        if (Array.isArray(subcategory)) {
            const isValid = subcategory.every(value => typeof value === "string" && value.length > 0);
            if (!isValid) {
              return res.status(400).send({ status: false, message: "subcategory should be an array of non-empty strings" });
            }
        }

        next();
    }catch(error){
        return res.status(500).send({ status: false, message: error.message })
    }

}

module.exports.blogValidation = blogValidation