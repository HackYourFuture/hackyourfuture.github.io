const email = require("../utils/email");
const { getApplicant, saveApplicant } = require("../data/update-sheet");
const sendEmail = require("../utils/send-emails");
const { encryptEmail } = require("../utils/email-crypto");

const fromEmail = "info@hackyourfuture.net";

const ERROR_USER_FOUND = "User already exists";

module.exports = async (req, res) => {
    let foundedAt;
    let totalRows;
    try {
        const res = await getApplicant(req.body.email);
        totalRows = res.totalRows;
        foundedAt = res.foundedAt;
        if (foundedAt) {
            throw new Error(ERROR_USER_FOUND);
        }
    } catch (error) {
        if (error.message === ERROR_USER_FOUND) {
            res.status(400).json({ error: error.message });
            return;
        }
    }

    // eslint-disable-next-line
    saveApplicant(totalRows || 1, req.body).catch(error => {
        console.log("Save Applicant FAILED:", error, req.body);
    });

    sendEmail(
        fromEmail,
        [fromEmail],
        email("apply_to_org.tpl", { params: req.body }),
        "A new student applied"
    )
        .then(() => {
            console.log("Email to organization send");
        })
        .catch(error =>
            console.log("Send email to organization FAILED", error, req.body)
        );

    const encryptedEmail = encryptEmail(req.body.email);
    const redirectURL = `${process.env.lambdaUrl}apply/upload1`;
    const verififactioURL = `${
        process.env.lambdaUrl
    }/get-applicant?id=${encryptedEmail}&redirectLocation=${redirectURL}`;

    sendEmail(
        fromEmail,
        [req.body.email],
        email("apply_to_student.tpl", { params: { url: verififactioURL } }),
        "Thank you for applying"
    )
        .then(() => {
            console.log("Email to organization send");
        })
        .catch(error =>
            console.log("Send email to user FAILED", error, req.body)
        );

    res.status(200).json({ message: "Application received" });
};
