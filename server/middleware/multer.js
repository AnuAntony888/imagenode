
const multer = require('multer');

// set storage store all images inside node application and pass paarameters
var storage = multer.diskStorage({
    destination : function ( req , file , cb ){
        cb(null, 'uploads')     //callback function first value is null and second is uploder
    },

filename : function (req, file , cb){  //each image given name
        // image.jpg this functin give extention to exe varibale
        var ext = file.originalname.substring(file.originalname.lastIndexOf('.'));

        cb(null, file.fieldname + '-' + Date.now() + ext)    //concatination



    }
})


module.exports = store = multer({ storage : storage })