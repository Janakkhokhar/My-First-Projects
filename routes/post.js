let express =require('express');

let routes = express.Router();

let post = require('../models/post');

let postcontroller = require('../controllers/postcontroller');



routes.get('/',postcontroller.addpost);

routes.get('/view_post',postcontroller.view_post);

routes.post('/addpostdetails',post.uploadimgpost,postcontroller.addpostdetails);

routes.get('/deleterecordpost/:id',postcontroller.deleterecordpost);

routes.get('/updaterecordpost/:id',postcontroller.updaterecordpost);

routes.post('/EditpostDetalis',post.uploadimgpost,postcontroller.EditpostDetalis)

module.exports = routes;