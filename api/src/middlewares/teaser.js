const email = require("../utils/email");
const sendEmail = require("../utils/send-emails");

const fromEmail = "info@hackyourfuture.net";

const validate = req => {
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
        fromEmail,
        [fromEmail],
        email("apply_to_org.tpl", { params: req.body }),
        "A new teacher applied"
    )
        .then(() => {
            res.send({
                message: "Thanks for applying"
            });
        })
        .catch(() => {
            res.status(500).send({
                message: "Something went wrong"
            });
        });
};
