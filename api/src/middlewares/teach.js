const email = require("../utils/email");
const sendEmail = require("../utils/send-emails");

const fromEmail = "info@hackyourfuture.net";

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
    req.check("email").isEmail();
    req.check("note")
        .isString()
        .isLength({
            min: 0,
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
        fromEmail,
        email("apply_to_org.tpl", { params: req.body }),
        "A new teacher applied",
        [req.body.email]
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
