const email = require('../utils/email');
const sendEmail = require('../utils/send-emails');
const { updateApplicant } = require("../data/update-sheet");

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

  saveApplicant(insertRow, req.body).catch(e =>{
    console.log("Save Applicant FAILED:", e, req.body);
  });

  sendEmail(
    fromEmail,
    [fromEmail],
    email("apply_to_org.tpl", { params: req.body }),
    "A new student applied"
  ).catch(e => console.log("Send email to organization FAILED"), e, req.body);

  sendEmail(
    fromEmail,
    [req.body.email],
    email("apply_to_student.txt"),
    "Thank you for applying"
  ).catch(e => console.log("Send email to user FAILED"), e, req.body);
};
