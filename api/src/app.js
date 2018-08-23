const express = require("express");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

const { Apply, ContactUs, Upload } = require("./middlewares");
const { getApplicant } = require("./data/update-sheet");
const { decryptEmail } = require("./utils/email-crypto.js");

const app = express();

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        fileType(file, cb);
    }
});
const fileTypes = [
    ".jpg",
    ".jpeg",
    ".bmp",
    ".gif",
    ".png",
    ".txt",
    ".doc",
    ".docs"
];
const allowedMimeTypes = [
    "text/plain",
    "application/msword",
    "application/x-pdf",
    "application/pdf",
    "image/gif",
    "image/jpeg",
    "image/png",
    "text/plain"
];
const fieldsName = [
    "input_file_cv",
    "input_file_motivation_letter",
    "input_file_assignment"
];

function fileType(file, cb) {
    const fileTypeAccepted = allowedMimeTypes.includes(file.mimetype);
    const fieldNameAccepted = fieldsName.includes(file.fieldname);
    if (fieldNameAccepted) {
        if (fileTypeAccepted) {
            return cb(null, true);
        } else {
            cb(
                new Error(
                    "File upload only supports the following filetypes :" +
                        fileTypes
                )
            );
        }
    } else {
        cb("Error : something went wrong ");
    }
}

const FileUpload = upload.fields([
    {
        name: "input_file_cv",
        maxCount: 1
    },
    {
        name: "input_file_motivation_letter",
        maxCount: 1
    },
    {
        name: "input_file_assignment",
        maxCount: 1
    }
]);

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(expressValidator());

app.post("/apply", (req, res) => {
    req.check("userName", "Username is too short")
        .isLength({
            min: 3
        })
        .isString();
    req.check("street", "Street name is too short")
        .isLength({
            min: 3
        })
        .isString();
    req.check("city", "City name is too short or too long")
        .isLength({
            min: 3
        })
        .isString();
    req.check("email", "Invalid Email Address").isEmail();
    req.check("phone", "Invalid phone number")
        .isNumeric()
        .isLength({
            min: 9
        });
    req.check("education", "The string must be between 2-15 letters")
        .isLength({
            min: 3
        })
        .isString();
    req.check("how_hear", "Either not a String or the String is too long")
        .isString()
        .isLength({
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
        Apply(req, res);
    }
});
app.post("/contact-us", (req, res) => ContactUs(req, res));
app.post("/apply", (req, res) => Apply(req, res));
app.post("/upload", FileUpload, (req, res) => Upload(req, res));
app.get("/get-applicant", (req, res) => {
    const { id, url } = req.query;
    const email = decryptEmail(id);
    getApplicant(email)
        .then(() => res.redirect(`${url}`))
        .catch(() =>
            res
                .status(404)
                .send(
                    "Email address is not associated with any open applications."
                )
        );
});

module.exports = app;
