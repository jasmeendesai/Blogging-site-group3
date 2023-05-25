const blogModel = require("../model/blogmodel")
const AuthorModel= require("../model/authormodel")

const createBlog = async (req, res) =>{
    try {
        let blogData = req.body
        if(!blogData.authorId){
            return res.status(404).send('authorId is missing')
        }else{
            let findauthorid = await AuthorModel.findById({_id : blogData.authorId})
            if(!findauthorid){
                return res.status(404).send('Author id not Valid')
            }else{
                let data = await blogModel.create(blogData)
                return res.status(201).send({
                    status : true,
                    data
                })
            }
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}




const updateBlog = async function(req, res){
	try {
    const blogId = req.params.blogId
    const data = req.body
    
    let Blog = await blogModel.findById(blogId);

    if (!Blog) return res.status(404).send({ status: false, msg: "No such blog found" });
    if(Blog.isDeleted == true) return res.status(404).send({ status: false, msg: "User already deleted from data" })
    const updatedData = await blogModel.findOneAndUpdate(
        {_id : blogId}, 
        { title : data.title, body : data.body, tag : data.tag, subcategory : data.subcategory, isPublished : true, publishedAt : new Date() },
        {new : true});

    res.status(200).send({status : true, "message": "Blog updated successfully",data : updatedData});
    } catch(err){
        res.status(500).send(err.message)
    }
}


module.exports.updateBlog = updateBlog

module.exports.createBlog = createBlog