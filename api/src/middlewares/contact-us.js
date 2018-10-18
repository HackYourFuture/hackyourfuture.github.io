const sendEmail = require("../utils/send-emails");
const email = require("../utils/email");
const toEmail = "info@hackyourfuture.net";

const validate = req => {
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
