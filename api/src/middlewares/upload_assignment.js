const { updateApplicant } = require("../data");

const email = require("../utils/email");

const { getApplicant } = require("../data/update-sheet");

const sendEmail = require("../utils/send-emails");

const applicationMail = "application@hackyourfuture.net";
const deadline = new Date(); // to be filled later with the deadline
const now = new Date();

module.exports = (req, res) => {
    const { email } = req.body;
    const bucketUrl =
        "https://hyf-website-uploads.s3.eu-central-1.amazonaws.com";
    const assignmentUrl = req.body.url;
    const assignmentMessage = req.body.message;
    const assignmentFileUrl = req.body.screenshot
        ? Array.isArray(req.body.screenshot)
            ? req.body.cv.map(i => `${bucketUrl}/${i}`).join("\n")
            : `${bucketUrl}/${req.body.screenshot}`
        : "";
    const updatedUrlAssignment = {
        assignmentFileUrl,
        assignmentUrl,
        assignmentMessage
    };
    if (now <= deadline) {
        getApplicant(email)
            .then(() =>
                updateApplicant(email, updatedUrlAssignment, req.files)
                    .then(() => {
                        sendEmail(
                            [email],
                            email("confirmationCV.tpl"),
                            "We've received your files"
                        );
                        sendEmail(
                            [applicationMail],
                            email("confirmationCV.tpl"),
                            `Applicant uploaded Assignment successfully:${email}`
                        );
                    })
                    .then(() => {
                        res.send({
                            message: "You got an email :-)"
                        });
                    })
                    .catch(() => {
                        sendEmail(
                            [applicationMail],
                            email("confirmationCV.tpl"),
                            `Uploading Assignment file is failed:${email}`
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
        res.status(400).send("The deadline has passed");
    }
};
