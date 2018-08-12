const email = require('../utils/email');
const { updateApplicant } = require("../data/update-sheet");
const sendEmail = require('../sendEmail');

const fromEmail = "info@hackyourfuture.net";

module.exports = (req, res) => {

    updateApplicant(req.body.email, req.body)
    .then(()=>{

        return sendEmail(
            fromEmail,
            [fromEmail],
            email('apply_to_org.tpl', { params: req.body }),
            'A new student applied'
        )

    })
    .then(() => {

        return sendEmail(
            fromEmail,
            [req.body.email],
            email('apply_to_student.txt'),
            'Thank you for applying'
        );

    })
    .then(() => {

        console.log("=== ALL EMAILS ARE SENT!!!");
        res.status(200).json({ message: 'You got an email :-)' });

    })
    .catch((err) => {

        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });

    });

};
