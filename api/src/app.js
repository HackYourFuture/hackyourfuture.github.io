const express = require("express");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const cors = require("cors");

const {
    Apply,
    GetApplicantFromToken,
    ContactUs,
    Uploader,
    UploadCVML,
    UploadAssignment,
    Teach,
    Teaser,
    DonationStatus
} = require("./middlewares");
const { donate } = require("./donation/donate");
const app = express();

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
app.post("/apply/profile", Uploader, UploadCVML);
app.post("/apply/assignment", Uploader, UploadAssignment);
app.post("/teach", Teach);
app.post("/apply/teaser", Teaser);
app.post("/donate", (req, res) => donate(req.body, res));
app.get("/applicant", GetApplicantFromToken);
app.get("/donation/status", DonationStatus);

module.exports = app;
