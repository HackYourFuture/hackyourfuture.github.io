const {
    updateApplicant
} = require("../data");

const sendEmail = require("../sendEmail");

const fromEmail = "info@hackyourfuture.net";


module.exports = (req, res) => {
    const {
        email,
        assignmentLink
    } = req.body;

    updateApplicant(email, assignmentLink, req.files)
        .then(() => {
            return sendEmail(
                fromEmail,
                [email],
                '** Confirmation email **',
                'We\'ve received your files'
            );
        }).then(() => {
            res.send({
                message: 'you got an email :-)'
            });
        }).catch(() => {
            res.status(500).send({
                message: 'Something went wrong'
            });
        })
};
