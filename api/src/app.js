const express = require('express');
const expressValidator = require("express-validator");
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const {
    Apply,
    ContactUs,
    Upload,
} = require('./middlewares');

const app = express();

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        fileType(file, cb);
    }

});

function fileType(file, cb) {
    const fileTypes = ['.jpg', '.jpeg', '.bmp', '.gif', '.png', '.txt', '.doc', '.docs'];
    const mimeType = fileTypes.test(file.mimeType);
    if (mimeType) {
        return cb(null, true);
    }
    cb("Error: File upload only supports the following filetypes :" + fileTypes);
}


const FileUpload = upload.fields(
    [{
        name: 'files',
        maxCount: 2
    }]
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressValidator());

app.post('/apply', (req, res) => {
    req.check("userName", "Username is too short").isLength({
        min: 3
    }).isString();
    req.check("street", "Street name is too short").isLength({
        min: 3
    }).isString();
    req.check("city", "City name is too short or too long").isLength({
        min: 3
    }).isString();
    req.check("email", "Invalid Email Address").isEmail();
    req.check("phone", "Invalid phone number").isNumeric().isLength({
        min: 9
    });
    req.check("education", "The string must be between 2-15 letters").isLength({
        min: 3
    }).isString()
    req.check("how_hear", "Either not a String or the String is too long").isString().isLength({
        max: 20
    });
    req.check("computer", "Invalid boolean").isBoolean();

    let errors = req.validationErrors();

    if (errors) {
        console.error("Validation errors: ", errors);
        res.status(500).json({
            errors
        });
    } else {
        Apply(req, res)
    }
});
const allowedFileTypes = ['jpeg', 'jpg', 'png', 'gif'];
const fieldName = ['input_file_cv', 'input_file_motivation_letter '];
app.post('/contact-us', (req, res) => ContactUs(req, res));
app.post('/apply', (req, res) => Apply(req, res));
app.post('/upload', FileUpload, (req, res) => {

    fieldName.forEach((element) => {
        if (file.fieldname === element) {
            fileType(file, cb)
            Upload(req, res)
        }
    });
    if (file.fieldname === 'input_ file_assignment') {
        allowedFileTypes.forEach((element) => {
            if (file.mimetype !== element) {
                return cb(null, false, new Error("Error: File upload only supports the following filetypes :" + allowedFileTypes));
            }
            cb(null, true);
            Upload(req, res)
        });
    }
});

module.exports = app;
