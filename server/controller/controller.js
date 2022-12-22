const UploadModel = require('../model/schema');
const fs = require('fs');
exports.home =  async (req, res) => {
    const all_images = await UploadModel.find() //asyncrous function,rturn all images in the array
    res.render('main', { images : all_images });
    //res.render('main')
    
}

exports.uploads = (req, res , next) => {
    const files = req.files;         //access all images,post method

    if(!files){
        const error = new Error('Please choose files');         //no file err
        error.httpStatusCode = 400;
        return next(error)
    }
// convert images into base64 encoding
let imgArray = files.map((file) => {
    let img = fs.readFileSync(file.path)

    return encode_image = img.toString('base64')
})




//res.json(imgArray);
let result = imgArray.map((src, index) => {

    // create object to store data in the collection
    let finalImg = {
        filename : files[index].originalname,
        contentType : files[index].mimetype,
        imageBase64 : src
    }

    let newUpload = new UploadModel(finalImg);

    return newUpload
            .save()        //save data into mongo db
            .then(() => {
                return { msg : `${files[index].originalname} Uploaded Successfully...!`}        //image sucessfullupload then return message and error go to catch methode
            })
            .catch(error =>{
                if(error){
                    if(error.name === 'MongoError' && error.code === 11000){
                        return Promise.reject({ error : `Duplicate ${files[index].originalname}. File Already exists! `});       //file already exist get error message not in that image get promise
                    }
                    return Promise.reject({ error : error.message || `Cannot Upload ${files[index].originalname} Something Missing!`})
                }
            })
});

Promise.all(result)
    .then( msg => {
             //res.json(msg);
        res.redirect('/')
    })
    .catch(err =>{
        res.json(err);
    })
}