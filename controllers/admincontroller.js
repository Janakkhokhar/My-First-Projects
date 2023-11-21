let Student = require('../models/Student');
let path = require('path');
let fs = require('fs');



module.exports.home = function(req,res){
     res.render('home');
}

module.exports.addstudentDetalis = async (req,res) => {
    let imagep = '';
    if(req.file){
        imagep = Student.imagemodelpath+"/"+req.file.filename
    }
    req.body.adminImage = imagep;
    await Student.create(req.body);
    return res.redirect('back');
}


module.exports.view = async (req,res) =>{
    let data = await Student.find({});
    return res.render('view',{
        Stdata : data
    });
}

module.exports.deleterecord = async (req,res)=> { 
    let olddata = await Student.findById(req.params.id);
        if(olddata.adminImage){
            let fullpath =path.join(__dirname,".."+olddata.adminImage);
            await fs.unlinkSync(fullpath);
        }
        await Student.findByIdAndDelete(req.params.id);
        return res.redirect('back');
}


module.exports.updaterecord = async (req,res) => {
    let record = await Student.findById(req.params.id);
        return res.render('update',{
            oldst : record
        });
}


module.exports.EditstudentDetalis = async(req,res) =>{
    if(! req.file){
        let oldData = await Student.findById(req.body.editdata);
        req.body.adminImage = oldData.adminImage;
    }
    else{
        // old image delete from folder upload
            let oldData = await Student.findById(req.body.editdata);
            if(oldData.adminImage){
                let fullpath =path.join(__dirname,"..",oldData.adminImage);
                await fs.unlinkSync(fullpath);
            }

       // set new image name in database mongodb
       let imagep = '';
       if(req.file){
           imagep = Student.imagemodelpath+"/"+req.file.filename
       }
       req.body.adminImage = imagep;
        
        // edit record with new image
    }
    await Student.findByIdAndUpdate(req.body.editdata,req.body);
    return res.redirect('/view');
}