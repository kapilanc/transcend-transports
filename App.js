var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gfg');
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
    var Name = req.body.Name;
    var Age =req.body.Age;
    var proof = req.body.proof;
    var vehicleType=req.body.vehicleType;
    var Vehicle=req.body.Vehicle;
    var pickupDateTime =req.body.pickupDateTime;
    var returnDateTime=req.body.returnDateTime;
    var pickupLocation=req.body.pickupLocation;
    var returnLocation=req.body.returnLocation;



    var data = {
        "Name": Name,
        "Age":Age,
        "proof":proof,
        "vehicleType":vehicleType,
        "Vehicle":Vehicle,
        "pickupDateTime":pickupDateTime,
        "returnDateTime":returnDateTime,
        "pickupLocation":pickupLocation,
        "returnLocation":returnLocation,
    }
db.collection('details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
            
    });
        
    return res.redirect('signup_success.html');
})


app.get('/',function(req,res){
res.set({
    'Access-control-Allow-Origin': '*'
    });
return res.redirect('contact.html');
}).listen(3000)


console.log("server listening at port 3000");
