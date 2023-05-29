const mongoose= require('mongoose');
const ObjectId= mongoose.Schema.Types.ObjectId

const blog= new mongoose.Schema({

    title: {
        type: String,
        required: true
      },
      body: {
        type: String,
        required: true
      },
      authorId: {
        type: ObjectId,
        required: true,
        ref: "Author"
      },
      tags: {
        type: [String],
        // type : String,
        // default: []
      },
      category: {
        type: String,
        required: true
      },
      subcategory: {
        type: [String],
        // default: []
      },
      isDeleted: {
        type: Boolean,
        default: false
      },
      deletedAt: {
        type: Date,
        // default: Date.now()
      },
      isPublished: {
        type: Boolean,
        default: false
      },
      publishedAt: {
        type: Date,
        // default: Date.now()
      }
      
},{timestamps:true})

module.exports= mongoose.model('Blog',blog)


