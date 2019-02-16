const { updateApplicant } = require("../data");
const { decryptEmail } = require("./../utils/email-crypto");

const { getApplicant } = require("../data/update-sheet");

const sendEmail = require("../utils/send-emails");

const fromEmail = "info@hackyourfuture.net";
const applicationMail = "application@hackyourfuture.net";
const deadline = new Date(); // to be filled later with the deadline
const now = new Date();

module.exports = (req, res) => {
    const { token } = req.body;

    const email = decryptEmail(token);
    const textArea_message_cv = req.body.cv_txt;
    const textArea_message_motivation = req.body.motivation_txt;
    const cvUrl = req.files.cv[0].location;
    const mlUrl = req.files.motivation[0].location;
    const updatedFilesUrl = {
        cvUrl,
        mlUrl,
        textArea_message_cv
    };
    if (now <= deadline) {
        getApplicant(email)
            .then(() =>
                updateApplicant(email, updatedFilesUrl, req.files)
                    .then(() => {
                        sendEmail(
                            [email],
                            "** Confirmation email **",
                            "We've received your files"
                        );
                        sendEmail(
                            [applicationMail],
                            "** Confirmation email **",
                            `Applicant uploaded Cv successfully:${[email]}`
                        );
                    })
                    .then(() => {
                        res.send({
                            message: "you got an email :-)"
                        });
                    })
                    .catch(err => {
                        sendEmail(
                            [fromEmail],
                            "** Confirmation email **",
                            `Uploading CV file is failed:${[email]}`
                        );
                        console.log(err);
                        res.status(500).send({
                            message: "Something went wrong"
                        });
                    })
            )
            .catch(err => {
                console.log(err);
                res.status(404).send("Your name does not exist");
            });
    } else {
        res.status(400).send("the deadline has passed");
    }
};
