const express = require('express');
const bodyParser = require('body-parser')
const route = require('./route/route')
const app= express();
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));


mongoose.connect("mongodb+srv://jasmeendesai2597:Uy1yQhrmV3pWAsYj@cluster0.wi2wctr.mongodb.net/group3Database",{
    useNewUrlParser : true
})
.then(()=>console.log("you are now connected to MongoDB"))
.catch(err=> console.log(err))

app.use('/',route);

app.listen(process.env.PORT||3000,function(){
    console.log('the app is running at port '+(process.env.PORT||3000));
});
