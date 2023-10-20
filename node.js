var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Login');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})
var app=express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.post('/sign_up', function(req,res){
    var Email = req.body.email;
    var password = req.body.password;
    var data = {
        "MailId": Email,
        "Password":password,
    }
db.collection('Details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Thanks for Login into GoldCave Jewellery");       
    });
     return res.redirect('success.html');
})
app.listen(3000);
console.log("server listening at port 3000");