const mongoose = require('mongoose');


const author= new mongoose.Schema({

    fname: {
        type: String,
        required: true
      },
      lname: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true,
        enum: ['Mr', 'Mrs', 'Miss']
      },
      email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
              // Regular expression to validate email format
              return  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value);
            },
            message: 'Invalid email format'
          }
      },

    password: {
            type: String,
            required: true
          }
})

module.exports= mongoose.model('Author',author)


