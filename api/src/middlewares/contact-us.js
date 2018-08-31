const sendEmail = require("../utils/send-emails");
const email = require("../utils/email");
const toEmail = "info@hackyourfuture.net";

module.exports = (req, res) => {
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
