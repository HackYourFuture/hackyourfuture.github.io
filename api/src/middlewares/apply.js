const email = require("../utils/email");
const { getApplicant, saveApplicant } = require("../data/update-sheet");
const sendEmail = require("../utils/send-emails");

const fromEmail = "info@hackyourfuture.net";

module.exports = async (req, res) => {
    let foundedAt;
    let insertRow;
    const ERROR_USER_FOUND = "User already exists";
    try {
        ({ foundedAt, insertRow } = await getApplicant(req.body.email));
        if (foundedAt !== -1) {
            throw new Error(ERROR_USER_FOUND);
        }
    } catch (error) {
        console.log(error);

        if (error.message === ERROR_USER_FOUND) {
            res.status(400).json({ error: error.message });
            return;
        }
    }

    res.status(200).json({ message: "Application received" });

    // eslint-disable-next-line
  saveApplicant(insertRow, req.body).catch(error => {
        console.log("Save Applicant FAILED:", error, req.body);
    });

    sendEmail(
        fromEmail,
        [fromEmail],
        email("apply_to_org.tpl", { params: req.body }),
        "A new student applied"
    ).catch(error =>
        console.log("Send email to organization FAILED", error, req.body)
    );

    sendEmail(
        fromEmail,
        [req.body.email],
        email("apply_to_student.txt"),
        "Thank you for applying"
    ).catch(error => console.log("Send email to user FAILED", error, req.body));
};
