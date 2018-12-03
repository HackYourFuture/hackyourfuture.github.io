const email = require("../utils/email");
const { getApplicant, saveApplicant } = require("../data/update-sheet");
const sendEmail = require("../utils/send-emails");
const { encryptEmail } = require("../utils/email-crypto");

const fromEmail = "info@hackyourfuture.net";

const ERROR_USER_FOUND = "User already exists";

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
    req.check("city")
        .isString()
        .isLength({
            min: 2,
            max: 100
        });
    req.check("country").isLength({
        min: 1
    });
    req.check("email").isEmail();
    req.check("phone")
        .isNumeric()
        .isLength({
            min: 9
        });
    req.check("computer");
    req.check("education")
        .isString()
        .isLength({
            min: 2,
            max: 100
        });
    req.check("how_hear")
        .isString()
        .isLength({
            min: 2,
            max: 200
        });
    req.check("note")
        .isString()
        .isLength({
            min: 0,
            max: 200
        });

    return req.validationErrors();
};

module.exports = async (req, res) => {
    let foundedAt;
    let totalRows;

    const requestErrors = validate(req);

    console.log(req.body, req.params);

    if (requestErrors) {
        console.error("Validation errors: ", requestErrors);
        res.status(400).json({
            requestErrors
        });
        return;
    }

    const website = "http://hyf-website.s3-website.eu-central-1.amazonaws.com";
    const encryptedEmail = encryptEmail(req.body.email);
    const verififactioURL = `${website}/apply/first-phase/?token=${encryptedEmail}`;
    console.log(verififactioURL);

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

    // Save the applicant on the spreadsheet
    try {
        await saveApplicant(totalRows || 1, req.body);
    } catch (error) {
        console.log("Save Applicant FAILED:", error, req.body);
    }

    // Send an email to the organization
    try {
        await sendEmail(
            [fromEmail],
            email("apply_to_org.tpl", { params: req.body }),
            "A new student applied"
        );
        console.log("Email to organization send");
    } catch (error) {
        console.log("Send email to organization FAILED", error, req.body);
    }

    // Send email to student
    const country = req.body.country !== "nl" ? `${req.body.country}/` : "";
    try {
        await sendEmail(
            [req.body.email],
            email(`${country}apply_to_student.tpl`, {
                params: { url: verififactioURL }
            }),
            "Thank you for applying"
        );
        console.log("Email to organization send");
    } catch (error) {
        console.log("Send email to user FAILED", error, req.body);
    }

    res.status(200).json({ message: "Application received" });
};
