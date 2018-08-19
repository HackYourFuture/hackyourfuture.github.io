const express = require("express");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

const { Apply, ContactUs, Upload } = require("./middlewares");
const { getApplicant } = require("./data/update-sheet");
const { decryptData } = require("./utils/crypto.js");
const { donate, paymentStatus } = require("./donation/donate");

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const FileUpload = upload.fields([
  {
    name: "files",
    maxCount: 2
  }
]);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.post("/apply", (req, res) => {
  req
    .check("userName", "Username is too short")
    .isLength({ min: 3 })
    .isString();
  req
    .check("street", "Street name is too short")
    .isLength({ min: 3 })
    .isString();
  req
    .check("city", "City name is too short or too long")
    .isLength({ min: 3 })
    .isString();
  req.check("email", "Invalid Email Address").isEmail();
  req
    .check("phone", "Invalid phone number")
    .isNumeric()
    .isLength({ min: 9 });
  req
    .check("education", "The string must be between 2-15 letters")
    .isLength({ min: 3 })
    .isString();
  req
    .check("how_hear", "Either not a String or the String is too long")
    .isString()
    .isLength({ max: 20 });
  req.check("computer", "Invalid boolean").isBoolean();

  let errors = req.validationErrors();

  if (errors) {
    console.error("Validation errors: ", errors);
    res.status(500).json({ errors });
  } else {
    Apply(req, res);
  }
});
app.post("/contact-us", (req, res) => ContactUs(req, res));
app.post("/apply", (req, res) => Apply(req, res));
app.post("/upload", FileUpload, (req, res) => Upload(req, res));
app.get("/get-applicant", (req, res) => {
  const { id, url } = req.query;
  const email = decryptData(id);
  getApplicant(email)
    .then(() => res.redirect(`${url}`))
    .catch(() =>
      res
        .status(404)
        .send("Email address is not associated with any open applications.")
    );
});

app.post("/donate", (req, res) => {
  donate(req.body, res);
});

app.get("/donationstatus", (req, res) => {
  const orderId = decryptData(req.query.orderId);
  if (orderId) {
    paymentStatus(orderId)
      .then(msg => res.status(200).json({ msg }))
      .catch(err => res.status(500).json({ err }));
  }
});

module.exports = app;
