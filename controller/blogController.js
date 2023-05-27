const blogModel = require("../model/blogmodel")
const AuthorModel= require("../model/authormodel")

const createBlog = async (req, res) =>{
    try {
        let data = req.body
        // title: {mandatory}
        if(!data.title) return res.status(400).send({status : false, message:"title is required"});
        if(typeof data.title !=="string") return res.status(400).send({status : false, message:"enter valid title"})

        // body: {mandatory}}
        if(!data.body) return res.status(400).send({status : false, message:"body is required"});
        if(typeof data.body !=="string") return res.status(400).send({status : false, message:"enter valid body"})

        // tags: {array of string}
        
        const tags = data.tags.every(val => typeof val == 'string')
        if(typeof data.tags !=="array" || !tags) return res.status(400).send({status : false, message:"enter tags in proper format"})

        // category: {string, mandatory}
        if(!data.category) return res.status(400).send({status : false, message:"fname is required"});
        if(typeof data.category !=="string") return res.status(400).send({status : false, message:"enter valid category"})

        // subcategory: {array of string, examples[technology-[web development, mobile development, AI, ML etc]] }
        const subcategory = data.subcategory.every(val => typeof val == 'string')
        if(typeof data.subcategory !=="array" || !subcategory) return res.status(400).send({status : false, message:"enter subcategory in proper format"})

          // authorId: {mandatory, refs to author model}
          if(!data.authorId) return res.status(400).send({status : false, message:"authorId is required"});

        data.isPublished = data.isPublished ? data.isPublished : false
        data.publishedAt = data.isPublished ? new Date() : null


        const authorId = await await AuthorModel.findById(data.authorId)
        if(!authorId) return res.status(404).send({status: false, message:'Author id not Valid'})
        const blogData = await blogModel.create(data)
        return res.status(201).send({status : true, data : blogData})

    } catch (error) {
        res.status(500).send({status: false, message: error.message})
    }
}



//========================================================

const getBlog = async function(req, res){
    try{
 
    const filter = req.query
    filter.isDeleted = false
    filter.isPublished = true
    // console.log(filter)
    
    const data = await blogModel.find(filter)

    if(data.length==0) return res.status(404).send({status : false, message : "data not found"})
    
    res.status(200).send({status: true, message: "Blogs list", data:data})
}catch(error){
    res.status(500).send({status: false, message: error.message})
}
}

// ===========================================================================

const updateBlog = async function(req, res){
	try {
    const blogId = req.params.blogId
    const data = req.body
    
    // let Blog = await blogModel.findById(blogId);

    // if (!Blog) return res.status(404).send({ status: false, msg: "No such blog found" });
    // if(Blog.isDeleted == true) return res.status(404).send({ status: false, message: "User already deleted from data" })
    const updatedData = await blogModel.findOneAndUpdate(
        {_id : blogId}, 
        { $push :{tags : data.tags, subcategory : data.subcategory},title : data.title, body : data.body, isPublished : true, publishedAt : new Date() },
        {new : true});

      
    res.status(200).send({status: true, message: "Blog updated successfully", data : updatedData});
    } catch(err){
        res.status(500).send({status: false, message: error.message})
    }
}


// =====================================================================================

const deleteuser= async function(req, res){
    try{
    const blog_Id = req.params.blogId
   
    // const del = await blogModel.findById(blog_Id);
    // if(!del) return res.status(404).send({status : false, message : "Blog id doesn't matched"})
    // if(del.isDeleted) return res.status(404).send({status : false, message: "The blog already deleted"})
    
    await blogModel.findOneAndUpdate({_id:blog_Id},{isDeleted:true},{new:true})
    
    res.status(200).json({status: true, message: "Blog is deleted"})
    }
    catch(error){
        res.status(500).send({status: false, message: error.message});
    }
}

// ========================================================================

const deletequery= async function(req, res){

    try{
    const filter = req.query;
    const blog = await blogModel.findOne(filter);

    // authorization
    
    const userLoggedIn = req.decodedToken  //decodedToken.authorId
    const userToBeModified = blog.authorId
    
    if(userToBeModified != userLoggedIn) return res.status(403).send({status: false, message : 'User logged in not allowed to modify the requested users data'})

    //data verification
    if(!blog) return res.status(404).json({status: true, message: "Blog not found"})

    if(blog.isDeleted) return res.status(404).json({status: true, message: "Blog is already deleted"})

    await blogModel.findOneAndUpdate(filter, { isDeleted: true, deletedAt: new Date() });
   
    return res.status(200).json({status: true, message: "Blog is deleted"})
    }
    catch(error){
        res.status(500).json({status: false, message: error.message})
    }
}


// ====================================================================


module.exports.updateBlog = updateBlog

module.exports.createBlog = createBlog

module.exports.getBlog = getBlog

module.exports.deletequery = deletequery

module.exports.deleteuser = deleteuser




