const blogModel = require("../model/blogmodel")
const AuthorModel = require("../model/authormodel")

const createBlog = async (req, res) => {
    try {

        let data = req.body

        // title validation

        if (!data.title) return res.status(400).send({ status: false, message: "title is required" });
        if (typeof data.title !== "string") return res.status(400).send({ status: false, message: "enter valid title" })

        // body validation

        if (!data.body) return res.status(400).send({ status: false, message: "body is required" });
        if (typeof data.body !== "string") return res.status(400).send({ status: false, message: "enter valid body" })

        // tags validation

        if (data.tags) {
            if (data.tags.length == 0) return res.status(400).send({ status: false, message: "Tags can not Empty array" })
            let tags = data.tags
            var isValid = Array.isArray(tags) && tags.every(value => (typeof value === "string" && value.length>0));
            if (!isValid) return res.status(400).send({ status: false, message: "Tags Should be Array of String and it should not be empty string" })
        }


        // category validation

        if (!data.category) return res.status(400).send({ status: false, message: "category is required" });
        if (typeof data.category !== "string") return res.status(400).send({ status: false, message: "enter valid category" })

        // subcategory validation

        if (data.subcategory == "") return res.status(400).send({ status: false, message: "subcategory can not Empty" })
        if (data.subcategory) {

            let subcategory = data.subcategory
            var isValidate = Array.isArray(subcategory) && subcategory.every(value => typeof value === "string");
            if (!isValidate) return res.status(400).send({ status: false, message: "subcategory Should be Array of String" })
        }

        // authorId validation
        if (!data.authorId) return res.status(400).send({ status: false, message: "authorId is required" });

        data.isPublished = data.isPublished ? data.isPublished : false
        data.publishedAt = data.isPublished ? new Date() : null

        const authorId = await AuthorModel.findById(data.authorId)
        if (!authorId) return res.status(404).send({ status: false, message: 'Author id not Valid' })

        // auhtorization
        if(data.authorId !== req.decodedToken) return res.status(400).send({status: false, message: 'user is not authorised'})

        const blogData = await blogModel.create(data)
        return res.status(201).send({ status: true, data: blogData })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
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

        res.status(200).send({ status: true, message: "Blogs list", data: data })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

// ===========================================================================


const updateBlog = async function (req, res) {
    try {
        const blogId = req.params.blogId

        const data = req.body

        
        const updatedData = await blogModel.findOneAndUpdate(
            { _id: blogId },
            { $push: { tags: data.tags, subcategory: data.subcategory }, title: data.title, body: data.body, isPublished: true, publishedAt: new Date() },
            { new: true });

        res.status(200).send({ status: true, message: "Blog updated successfully", data: updatedData });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


// =====================================================================================


const deleteuser = async function (req, res) {
    try {
        const blog_Id = req.params.blogId

        await blogModel.findOneAndUpdate({ _id: blog_Id }, { isDeleted: true, deletedAt: new Date(),isPublished : false })

        res.status(200).json({ status: true, message: "Blog has been deleted now" })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

// ========================================================================

const deletequery = async function (req, res) {

    try {
        const filter = req.query;
        const userLoggedIn = req.decodedToken //unique
        
        const blog = await blogModel.find(filter);  //
        if (blog.length === 0) return res.status(404).send({ status: false, message: "No matching blogs found" });
        

        // authorisation

        const user = blog.filter((val) => val.authorId == userLoggedIn)
        if (user.length == 0) return res.status(404).send({ status: false, message: "User logged in not allowed to modify the requested users data" });

        const isdel = user.filter((val) => (val.isDeleted == true))
        if (isdel.length !== 0) return res.send({ status: false, message: "user is already deleted" })
        

        await blogModel.updateMany(filter, { $set: { isDeleted: true, deletedAt: new Date(), isPublished : false } });


        return res.status(200).json({ status: true, message: "Blog has been deleted now" })
    }
    catch (error) {
        res.status(500).json({ status: false, message: error.message })
    }
}


// ====================================================================


module.exports.updateBlog = updateBlog

module.exports.createBlog = createBlog

module.exports.getBlog = getBlog

module.exports.deletequery = deletequery

module.exports.deleteuser = deleteuser


