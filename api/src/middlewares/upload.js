const {
    updateApplicant,
} = require("../data");

const {getApplicant} = require("../data/update-sheet");

const sendEmail = require("../sendEmail");

const fromEmail = "info@hackyourfuture.net";

const deadline = new Date(); // to be filled later with the deadline
const now = new Date();

module.exports = (req, res) => {
    const {
        email,
        assignmentLink
    } = req.body;

    if(now <= deadline) {
        getApplicant(email)
            .then(()=>
                updateApplicant(email, assignmentLink, req.files)
                    .then(() => {
                        return sendEmail(
                        fromEmail,
                        [email],
                        '** Confirmation email **',
                        'We\'ve received your files'
                        );
                    })
                    .then(() => {
                        res.send({
                        message: 'you got an email :-)'
                    });
                    })
                    .catch(() => {
                        res.status(500).send({
                        message: 'Something went wrong'
                        });
                    })
            )
            .catch(() => {
                res.status(404).send("Your name does not exist")
            })
    } else {
            res.status(400).send("the deadline has passed")
        }
};
