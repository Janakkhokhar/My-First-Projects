
let post  = require('../models/post');

let path = require('path');

let fs = require('fs');

module.exports.addpost = async (req,res)=>{
    return res.render('add_post');
}

module.exports.addpostdetails = async (req,res)=>{
    let postPath = "";
    if(req.file){
        postPath = post.imgmodelpost+'/'+req.file.filename
    }
    req.body.adminimg = postPath;
    await post.create(req.body);
    return res.redirect('back');
}

module.exports.view_post = async(req,res)=>{
    let data = await post.find({});
    return res.render('view_post',{
        postdata : data
    });
}


module.exports.deleterecordpost = async(req,res)=>{
    let olddata = await post.findById(req.params.id);
        if(olddata.adminimg){
            let fullpath =path.join(__dirname,".."+olddata.adminimg);
            await fs.unlinkSync(fullpath);
        }
        await post.findByIdAndDelete(req.params.id);
        return res.redirect('back');
}



module.exports.updaterecordpost = async(req,res)=>{
    let record = await post.findById(req.params.id);
        return res.render('update_post',{
            oldpost : record
        });
}


module.exports.EditpostDetalis = async(req,res)=>{
    if(! req.file){
        let oldData = await post.findById(req.body.Editpost);
        req.body.adminimg = oldData.adminimg;
    }
    else{
        // old image delete from folder upload
            let oldData = await post.findById(req.body.Editpost);
            if(oldData.adminimage){
                let fullpath =path.join(__dirname,"..",oldData.adminimg);
                await fs.unlinkSync(fullpath);
            }

       // set new image name in database mongodb
       let Imgpath = '';
       if(req.file){
        Imgpath = post.imagemodelpath+"/"+req.file.filename
       }
       req.body.adminimg = Imgpath;
        
        // edit record with new image
    }   
    await post.findByIdAndUpdate(req.body.Editpost,req.body);
    return res.redirect('/post/view_post');
}