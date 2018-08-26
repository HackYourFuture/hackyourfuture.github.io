const { updateApplicant } = require("../data");

const { getApplicant } = require("../data/update-sheet");

const sendEmail = require("../utils/send-emails");

const fromEmail = "info@hackyourfuture.net";
const applicationMail = "application@hackyourfuture.net";
const deadline = new Date(); // to be filled later with the deadline
const now = new Date();

module.exports = (req, res) => {
    const { email, url, textArea_message } = req.body;
    const cvUrl = req.files.input_file_cv[0].location;
    const mlUrl = req.files.input_file_motivation_letter[0].location;
    const updatedFilesUrl = {
        cvUrl,
        mlUrl,
        textArea_message,
        url
    };
    if (now <= deadline) {
        getApplicant(email)
            .then(() =>
                updateApplicant(email, updatedFilesUrl, req.files)
                    .then(() => {
                        sendEmail(
                            fromEmail,
                            [email],
                            "** Confirmation email **",
                            "We've received your files"
                        );
                        sendEmail(
                            fromEmail,
                            applicationMail,
                            "** Confirmation email **",
                            "Applicant uploaded Cv successfully"
                        );
                    })
                    .then(() => {
                        res.send({
                            message: "you got an email :-)"
                        });
                    })
                    .catch(() => {
                        sendEmail(
                            fromEmail,
                            fromEmail,
                            "** Confirmation email **",
                            `Uploading CV file is failed:${[email]}`
                        );
                        res.status(500).send({
                            message: "Something went wrong"
                        });
                    })
            )
            .catch(() => {
                res.status(404).send("Your name does not exist");
            });
    } else {
        res.status(400).send("the deadline has passed");
    }
};
