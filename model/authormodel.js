const mongoose = require('mongoose');


const author= new mongoose.Schema({

    fname: {
        type: String,
        trim : true,
        required: true
    },
    lname: {
        type: String,
        trim : true,
        required: true
    },
    title: {
        type: String,
        trim : true,
        required: true,
        enum: ['Mr', 'Mrs', 'Miss'] 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim : true,
      validate: {
        validator: function(value) {
          // Regular expression to validate email format
          return  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value); //check
              ///^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/

        },
            message: 'Invalid email format'
      }
    },

    password: {
      type: String,
      trim : true,
      required: true
    }
},{timestamps : true});

module.exports= mongoose.model('Author',author)


