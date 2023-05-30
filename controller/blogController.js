const blogModel = require("../model/blogmodel")

const createBlog = async (req, res) => {
    try {

        let data = req.body

        data.isPublished = data.isPublished ? data.isPublished : false
        data.publishedAt = data.isPublished ? new Date() : null
    
        const blogData = await blogModel.create(data)
        return res.status(201).send({ status: true, data: blogData })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



//========================================================

const getBlog = async function (req, res) {
    try {

        const filter = req.query
        filter.isDeleted = false
        filter.isPublished = true

        const data = await blogModel.find(filter)

        if (data.length == 0) return res.status(404).send({ status: false, message: "data not found" })

        return res.status(200).send({ status: true, message: "Blogs list", data: data })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

// ===========================================================================


const updateBlog = async function (req, res) {
    try {
        const blogId = req.params.blogId

        const data = req.body
        if(!req.body || Object.keys(req.body).length === 0){
            return res.status(400).send({ status: false, message: "No data is present in body" });
        }
        
        const updatedData = await blogModel.findOneAndUpdate(
            { _id: blogId },
            { $push: { tags: data.tags, subcategory: data.subcategory }, title: data.title, body: data.body, isPublished: true, publishedAt: new Date() },
            { new: true });

        return res.status(200).send({ status: true, message: "Blog updated successfully", data: updatedData });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


// =====================================================================================


const deleteuser = async function (req, res) {
    try {
        const blog_Id = req.params.blogId

        await blogModel.findOneAndUpdate({ _id: blog_Id }, { isDeleted: true, deletedAt: new Date(),isPublished : false })

        return res.status(200).json({ status: true, message: "Blog has been deleted now" })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

// ========================================================================

const deletequery = async function (req, res) {

    try {
        const filter = req.query;
        const userLoggedIn = req.decodedToken //unique
        filter.isDeleted =false;
        const blog = await blogModel.find(filter);  //
     
        if (blog.length === 0) {
            return res.status(404).send({ status: false, message: "No matching blogs found" });
        }
        

        // authorisation

        const user = blog.filter((val) => val.authorId == userLoggedIn)
 
        if (user.length == 0) {
            return res.status(403).send({ status: false, message: "User logged in not allowed to modify the requested users data" });
        }

        const deletedBlogs = await blogModel.updateMany({ _id: { $in: user }}, { $set: { isDeleted: true, deletedAt: new Date(), isPublished : false } });
   
     
        return res.status(200).json({ status: true, message: `${deletedBlogs.modifiedCount} Blog has been deleted now` })
    }
    catch (error) {
        res.status(500).json({ status: false, message: error.message })
    }
}


// ====================================================================


module.exports = {updateBlog, createBlog, getBlog, deletequery, deleteuser}



