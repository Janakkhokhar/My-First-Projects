let express = require('express'); 
let router = express.Router();
let Student = require('../models/Student');

let adminController = require('../controllers/admincontroller');

router.get('/',adminController.home);

router.post('/addstudentDetalis',Student.uploadImage,adminController.addstudentDetalis);

router.get("/view",adminController.view);

router.get('/deleterecord/:id',adminController.deleterecord);

router.get('/updaterecord/:id',adminController.updaterecord);

router.post('/EditstudentDetalis',Student.uploadImage,adminController.EditstudentDetalis);





module.exports = router;
