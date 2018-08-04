const express = require('express');
const multer  = require('multer');
const path = require("path");

const app = express();

//creat a folder to store the photos 
app.use(express.static("./uploads"));

app.use(express.json());

//destination of the storage
const destination = './uploads/';  

const storage = multer.diskStorage({
    destination :  destination,
    filename : (req,file,cb)=>{
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 1024*1024*5},
    fileFilter: (req,file,cb)=>{
        checkFileType(file,cb);
    }
    }).single('myImage'); // here should be entered the name of the input field of the file 

    function checkFileType (file,cb){
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const mimetype = allowedFileTypes.test(file.mimetype);
    if (mimetype) {
        return cb(null,true)
    } else{
        cb("Error : images only")
    }
}

let newAssignment

module.exports =  (req, res) => {
        upload(req,res,(err) => {
            if(err){
                res.send(err);
            } else {
                res.send('Your Assignment has been uploaded');
                newAssignment = {
                    applicantEmail : req.body.email,
                    assignmentUrl : req.body.url,
                    imageUrl : req.file.path
                }
            }
        });
    }