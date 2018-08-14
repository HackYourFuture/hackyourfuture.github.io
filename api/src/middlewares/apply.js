const email = require('../utils/email');
const sendEmail = require('../utils/send-emails');
const { updateApplicant } = require("../data/update-sheet");

const fromEmail = "info@hackyourfuture.net";

module.exports = async (req, res) => {
  let foundedAt;
  let insertRow;
  try {
    ({ foundedAt, insertRow } = await getApplicant(req.body.email));
    if (foundedAt !== -1) {
      throw new Error("User already exists");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
    return;
  }

  saveApplicant(insertRow, req.body);

  sendEmail(
    fromEmail,
    [fromEmail],
    email("apply_to_org.tpl", { params: req.body }),
    "A new student applied"
  )
    .then(() => {
      return sendEmail(
        fromEmail,
        [req.body.email],
        email("apply_to_student.txt"),
        "Thank you for applying"
      );
    })
    .then(() => {
      console.log("=== ALL EMAILS ARE SENT!!!");
      res.status(200).json({ message: "You got an email :-)" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Something went wrong" });
    });
};
