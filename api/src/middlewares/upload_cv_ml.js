const { updateApplicant } = require("../data");
const { decryptEmail } = require("./../utils/email-crypto");
const emailTemplate = require("../utils/email");

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
    const bucketUrl =
        "https://hyf-website-uploads.s3.eu-central-1.amazonaws.com";
    const cvUrl = req.body.cv
        ? Array.isArray(req.body.cv)
            ? req.body.cv.map(i => `${bucketUrl}/${i}`).join("\n")
            : `${bucketUrl}/${req.body.cv}`
        : "";
    const mlUrl = req.body.motivation
        ? Array.isArray(req.body.motivation)
            ? req.body.motivation.map(i => `${bucketUrl}/${i}`).join("\n")
            : `${bucketUrl}/${req.body.motivation}`
        : "";

    const updatedFilesUrl = {
        cvUrl,
        mlUrl,
        textArea_message_cv,
        textArea_message_motivation
    };

    if (now <= deadline) {
        getApplicant(email)
            .then(() =>
                updateApplicant(email, updatedFilesUrl, req.files)
                    .then(() => {
                        sendEmail(
                            [email],
                            emailTemplate("confirmationCV.tpl"),
                            "We've received your files"
                        );
                        sendEmail(
                            [applicationMail],
                            emailTemplate("confirmationCV.tpl"),
                            `Applicant uploaded Cv successfully:${[email]}`
                        );
                    })
                    .then(() => {
                        res.send({
                            message:
                                "You received an email from us! (Check your spam folder in case you didn't)"
                        });
                    })
                    .catch(err => {
                        sendEmail(
                            [fromEmail],
                            emailTemplate("failedUploadCV.tpl"),
                            `Uploading CV file has failed:${[email]}`
                        );
                        console.log(err);
                        res.status(500).send({
                            message: "Something went wrong"
                        });
                    })
            )
            .catch(err => {
                console.log("this is the error for upload cv", err);
                res.status(404).send("Your name does not exist");
            });
    } else {
        res.status(400).send("the deadline has passed");
    }
};
