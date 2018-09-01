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
    UploadCVML,
    UploadAssignment,
    Teach
} = require("./middlewares");
const { getApplicant } = require("./data/update-sheet");
const { decryptData } = require("./utils/email-crypto.js");
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
    Apply(req, res);
});
app.post("/contact-us", (req, res) => {
    req.check("firstName", "first name is too short")
        .isLength({
            min: 3
        })
        .isString();
    req.check("lastName", "last name is too short")
        .isLength({
            min: 3
        })
        .isString();

    req.check("phone", "Invalid phone number")
        .isNumeric()
        .isLength({
            min: 9
        });
    req.check("email", "Invalid Email Address").isEmail();

    req.check("message", "This message is too short")
        .isLength({
            min: 3
        })
        .isString();

    let errors = req.validationErrors();

    if (errors) {
        console.error("Validation errors: ", errors);
        res.status(400).json({
            errors
        });
    } else {
        ContactUs(req, res);
    }
});
app.post("/apply", (req, res) => Apply(req, res));
app.post("/apply/upload", FileUpload, (req, res) => UploadCVML(req, res));
app.post("/apply/upload1", FileUpload, (req, res) =>
    UploadAssignment(req, res)
);
app.post("/teach", (req, res) => {
    req.check("firstName", "firstName is too short")
        .isLength({
            min: 2
        })
        .isString();
    req.check("lastName", "lastName is too short")
        .isLength({
            min: 2
        })
        .isString();
    req.check("email", "Invalid Email Address").isEmail();
    req.check("message", "The message is too short")
        .isLength({
            min: 3
        })
        .isString();

    let errors = req.validationErrors();

    if (errors) {
        console.error("Validation errors: ", errors);
        res.status(400).json({
            errors
        });
    } else {
        Teach(req, res);
    }
});
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
            .then(msg =>
                res.json({
                    message: msg
                })
            )
            .catch(err =>
                res.json({
                    message: err
                })
            );

        return;
    }

    res.status(400).json({
        message: "Not order id provided"
    });
});

module.exports = app;
