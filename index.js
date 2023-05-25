const express = require('express');
const route = require('./route/route')
const app= express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use('/',route);


mongoose.connect("mongodb+srv://parwezwasfa:FrEKcgz9j1UIuir3@cluster0.r5dosiq.mongodb.net/test",{
    useNewUrlParser:true
})
.then(()=>console.log("you are now connected to MongoDB"))
.catch(err=> console.log(err))

app.listen(process.env.PORT||3000,function(){
    console.log('the app is running at port '+(process.env.PORT||3000));
});
