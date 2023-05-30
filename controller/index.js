const express = require('express')
const bodyParser = require('body-parser');
const route = require('./route/route.js')
const mongoose = require('mongoose')
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
mongoose.connect('',{
    useNewUrlParser:true
}).then(()=> console.log('MongoDB is connected'))
.catch((err)=>console.log(err))

app.use('/',route);

app.listen(process.env.PORT||3000,function(){
    console.log("Express app is running on Port "+(process.env.PORT||3000))
})