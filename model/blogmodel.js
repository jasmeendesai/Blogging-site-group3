const mongoose= require('mongoose');
const ObjectId= mongoose.Schema.Types.ObjectId

const blog= new mongoose.Schema({

    title: {
        type: String,
        trim : true,
        required: true
      },
      body: {
        type: String,
        trim : true,
        required: true
      },
      authorId: {
        type: ObjectId,
        required: true,
        ref: "Author"
      },
      tags: {
        type: [{type : String, trim : true}]

      },
      category: {
        type: String,
        trim : true,
        required: true
      },
      subcategory: {
        type: [{type : String, trim : true}],
    
      },
      isDeleted: {
        type: Boolean,
        default: false
      },
      deletedAt: {
        type: Date,
        default : null
      },
      isPublished: {
        type: Boolean,
        default: false
      },
      publishedAt: {
        type: Date,
        default : null
      }
      
},{timestamps:true})

module.exports= mongoose.model('Blog',blog)


