const mongoose= require('mongoose');


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
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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

// { fname: { mandatory}, lname: {mandatory}, title: {mandatory, enum[Mr, Mrs, Miss]}, email: {mandatory, valid email, unique}, password: {mandatory} }

