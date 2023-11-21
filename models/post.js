let mongoose = require('mongoose');
let path = require('path');
let multer = require('multer');

let imgpath = "/upload/postimage"

let postschema = mongoose.Schema({

    title : {
        type :String,
        required : true
    },
    content : {
        type :String,
        required : true
    },
    adminimg : {
        type :String,
        required : true
    }
})

let imgstorage = multer.diskStorage({
    destination :function(req,file,cb){
        cb(null,path.join(__dirname,'..',imgpath));
    },
    filename : function(req,file,cb){
        cb(null,file.filename+"-"+Date.now());
    }
})


postschema.statics.uploadimgpost = multer({storage : imgstorage}).single('adminimg');
postschema.statics.imgmodelpost = imgpath;

let post = mongoose.model('post',postschema);
module.exports = post;