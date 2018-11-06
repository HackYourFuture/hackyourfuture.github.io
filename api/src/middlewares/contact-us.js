const sendEmail = require("../utils/send-emails");
const email = require("../utils/email");
const toEmail = "info@hackyourfuture.net";

const validate = req => {
    req.check("firstName")
        .isString()
        .isLength({
            min: 2,
            max: 100
        });
    req.check("lastName")
        .isString()
        .isLength({
            min: 2,
            max: 100
        });
    req.check("country").isLength({
        min: 1
    });
    req.check("phone")
        .isNumeric()
        .isLength({
            min: 9
        });
    req.check("email").isEmail();
    req.check("note")
        .isString()
        .isLength({
            min: 2,
            max: 200
        });

    return req.validationErrors();
};

module.exports = (req, res) => {
    const isValid = !validate(req);

    if (!isValid) {
        const errors = validate(req);
        console.error("Validation errors: ", errors);
        res.status(400).json({
            errors
        });
        return;
    }

    sendEmail(
        [toEmail],
        email("contact_us.tpl", { params: req.body }),
        "New contact request",
        req.body.email
    )
        .then(() => {
            console.log("=== ALL EMAILS ARE SENT!!!");
            res.json({ message: "You got an email :-)" });
        })
        .catch(err => {
            console.log("===EMAIL NOT SENT===");
            console.log(err);
            res.setState(500).json({ message: "Something went wrong" });
        });
};
