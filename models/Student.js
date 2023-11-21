let mongoose = require('mongoose');
const multer = require('multer');

let imagepath = "/upload";

let path = require('path');



let Studentdetail = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    hobby : {
        type : Array,
        required : true
    },
    city :{
        type : String,
        required : true
    },
    adminImage:{
        type : String,
        required : true
    },
    mes :{
        type :String,
        required : true
    },
});

let imgstorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, path.join(__dirname,"..",imagepath));
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now())
    }
});

Studentdetail.statics.uploadImage = multer({storage : imgstorage}).single('adminimg');
Studentdetail.statics.imagemodelpath = imagepath;

let Student = mongoose.model('Student',Studentdetail);
module.exports = Student;