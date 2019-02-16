const aws = require("aws-sdk");
const path = require("path");
const multer = require("multer");
const multerS3 = require("multer-s3");

let s3;

if (process.env.DEVELOPMENT) {
    s3 = new aws.S3({
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY_ID
        }
    });
} else {
    s3 = new aws.S3();
}

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "hyf-website-uploads",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function(req, file, cb) {
            cb(
                null,
                file.fieldname +
                    "-" +
                    encodeURIComponent(req.body.token) +
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
const fieldsName = ["cv", "motivation", "screenshot"];

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

const Uploader = upload.fields([
    {
        name: "cv",
        maxCount: 1
    },
    {
        name: "motivation",
        maxCount: 1
    },
    {
        name: "screenshot",
        maxCount: 1
    }
]);

module.exports = Uploader;
