const { getApplicant } = require("./../data/update-sheet");
const { decryptData } = require("./../utils/email-crypto.js");

module.exports = function GetApplicantFromToken(req, res) {
    const { token } = req.query;
    const email = decryptData(token);
    getApplicant(email)
        .then(() => {
            res.status(200).send({ email });
        })
        .catch(() => {
            res.status(404).send(
                "Email address is not associated with any open applications."
            );
        });
};
