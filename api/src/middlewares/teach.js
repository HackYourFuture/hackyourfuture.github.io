const email = require("../utils/email");
const sendEmail = require("../utils/send-emails");

const fromEmail = "info@hackyourfuture.net";

module.exports = (req, res) => {
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
