const express = require('express');
const expressValidator = require("express-validator");
const bodyParser = require('body-parser');
const cors = require('cors');
const Apply = require('./apply');
const ContactUs = require('./contact-us');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use((req, res, next) => {
    console.log('--- Debug request ---');
    console.log(req);
    console.log('--- End Debug request ---');
    next();
});


app.post('/apply', (req, res) => {
    req.check("userName", "Username is too short").isLength({min: 3}).isString();
    req.check("street", "Street name is too short").isLength({min: 3}).isString();
    req.check("city", "City name is too short or too long").isLength({min: 3, max: 25}).isString();
    req.check("email", "Invalid Email Address").isEmail();
    req.check("phone", "Invalid phone number").isNumeric().isLength({min: 9, max: 14});
    req.check("education", "The string must be between 2-15 letters").isLength({min: 2, max: 15}).isString()
    req.check("how_hear", "Either not a String or the String is too long").isString().isLength({max: 20});
    req.check("computer", "Invalid boolean").isBoolean();

    let errors = req.validationErrors();

    if(errors){
        console.error(errors);
        res.status(500).json({ errors });
    } else{ 
        Apply(req, res)
    }
});
app.post('/contact-us', (req, res) => ContactUs(req, res));

module.exports = app;
