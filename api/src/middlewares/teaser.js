const email = require("../utils/email");
const sendEmail = require("../utils/send-emails");

const fromEmail = "wct@hackyourfuture.net";

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
    req.check("email").isEmail();
    req.check("phone")
        .isNumeric()
        .isLength({
            min: 9
        });
    req.check("computer")
        .not()
        .isEmpty();
    req.check("education")
        .isString()
        .isLength({
            min: 2,
            max: 100
        });
    req.check("note")
        .isString()
        .isLength({
            min: 0,
            max: 1000
        });

    return req.validationErrors();
};

module.exports = (req, res) => {
    const errors = validate(req);

    if (!errors.length) {
        console.error("Validation errors: ", errors);
        res.status(400).json({
            errors
        });
        return;
    }

    sendEmail(
        fromEmail,
        email("apply_to_org.tpl", { params: req.body }),
        "A new lady applied for women coding teaser",
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
