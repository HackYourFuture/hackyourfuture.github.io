const sendEmail = require("../utils/send-emails");
const email = require("../utils/email");
const countryEmail = require("../utils/countryEmail");
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
    req.check("about")
        .isString()
        .isLength({
            min: 2
        });

    return req.validationErrors();
};

module.exports = (req, res) => {
    const { body } = req;
    const isValid = !validate(req);

    if (!isValid) {
        const errors = validate(req);

        res.status(400).json({
            errors
        });
        return;
    }

    sendEmail(
        [toEmail],
        email("contact_us.tpl", { params: body }),
        "New contact request",
        [body.email]
    )
        .then(() => {
            console.log("=== ALL EMAILS ARE SENT!!!");
            res.json({
                message:
                    "Thanks for reaching out. We will get back to you as soon as possible"
            });
        })
        .catch(err => {
            console.log("===EMAIL NOT SENT===");
            console.log(err);
            res.setState(500).json({ message: "Something went wrong" });
        });
};
