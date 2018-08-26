const express = require("express");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const path = require("path");

const {
    Apply,
    ContactUs,
    upload_cv_ml,
    upload_assignment
} = require("./middlewares");
const { getApplicant } = require("./data/update-sheet");
const { decryptData } = require("./utils/crypto.js");
const { donate, paymentStatus } = require("./donation/donate");

const app = express();

const s3 = new aws.S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY_ID
    }
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "hyf-website-uploads",
        key: function(req, file, cb) {
            cb(
                null,
                file.fieldname +
                    "-" +
                    encodeURIComponent(req.body.email) +
                    "-" +
                    Date.now() +
                    path.extname(file.originalname)
            );
        }
    }),
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
    ".docx"
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
app.post("/apply/upload", FileUpload, (req, res) => upload_cv_ml(req, res));
app.post("/apply/upload1", FileUpload, (req, res) =>
    upload_assignment(req, res)
);
app.get("/get-applicant", (req, res) => {
    const { id, url } = req.query;
    const email = decryptData(id);
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

app.post("/donate", (req, res) => {
    donate(req.body, res);
});

app.get("/donation/status", (req, res) => {
    const { orderid } = req.query;

    if (orderid) {
        paymentStatus(orderid)
            .then(msg => res.json({ message: msg }))
            .catch(err => res.json({ message: err }));

        return;
    }

    res.status(400).json({ message: "Not order id provided" });
});

module.exports = app;
