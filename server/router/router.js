const route= require('express').Router();
const controller = require('../controller/controller')
const store =require('../middleware/multer'); //multer import



//routes
route.get('/',controller.home);


route.post('/uploadmultiple', store.array('images', 12) , controller.uploads) //"/uploader" from index ,post uploader and arry for images,get all images and stor pass as array,and given arry limit


module.exports =route;
