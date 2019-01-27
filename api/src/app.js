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
  GetApplicantFromToken,
  ContactUs,
  UploadCVML,
  UploadAssignment,
  Teach,
  DonationStatus
} = require("./middlewares");

const Teaser = require("./middlewares/teaser");
const { donate } = require("./donation/donate");

const app = express();

let s3;

if (process.env.DEVELOPMENT) {
  s3 = new aws.S3({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY_ID
    }
  });
} else {
  console.log("Should not need credentials");
  s3 = new aws.S3();
}

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "hyf-website-uploads",
    key: function(req, file, cb) {
      cb(
        null,
        file.fieldname +
          "-" +
          encodeURIComponent(req.query.token) +
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
const fieldsName = ["cv", "motivation_letter", "input_file_assignment"];

function fileType(file, cb) {
  const fileTypeAccepted = allowedMimeTypes.includes(file.mimetype);
  const fieldNameAccepted = fieldsName.includes(file.fieldname);
  if (fieldNameAccepted) {
    if (fileTypeAccepted) {
      return cb(null, true);
    } else {
      cb(
        new Error(
          "File upload only supports the following filetypes :" + fileTypes
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

app.post("/apply", Apply);
app.post("/contact", ContactUs);
app.post("/apply", Apply);
app.post("/apply/profile", FileUpload, UploadCVML);
app.post("/apply/assignment", FileUpload, UploadAssignment);
app.post("/teach", Teach);
app.post("/apply/teaser", Teaser);
app.post("/donate", (req, res) => donate(req.body, res));

app.get("/applicant", GetApplicantFromToken);
app.get("/donation/status", DonationStatus);

module.exports = app;
