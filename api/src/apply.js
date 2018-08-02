const AWS = require('aws-sdk');
const template = require('lodash.template');
const applyToStudentMessage = require('./../emails_template/apply_to_student.txt');
const applyToOrgTemplate = template(require('./../emails_template/apply_to_org.tpl'));
const appendData = require("./authentication/appendData");
const authuntication = require("./authentication/authentication")
const fromEmail = "info@hackyourfuture.net";

const AWS_CONFIG = {
    region: 'eu-west-1'
};

const ses = new AWS.SES(AWS_CONFIG);

const sendEmail = (toEmail, Data, Subject) => {

    return new Promise((resolve, reject) => {

        if (process.env.DEVELOPMENT) {
            resolve();
            return;
        }

        ses.sendEmail({
            Destination: {
                ToAddresses: [toEmail]
            },
            Message: {
                Body: {
                    Text: {
                        Data
                    }
                },
                Subject: {
                    Data: Subject
                }
            },
            Source: fromEmail
        }, (err, data) => {

            if (err) return reject(err);

            return resolve(data);

        });

    });
}

module.exports = (req, res) => {

    authuntication.authenticate().then(auth => appendData(req, auth));

    sendEmail(
        fromEmail,
        applyToOrgTemplate({ params: req.body }),
        'A new student applied'
    ).then(() => {

        return sendEmail(
            req.body.email,
            applyToStudentMessage,
            'Thank you for applying'
        );

    }).then(() => {

        console.log("=== ALL EMAILS ARE SENT!!!");
        res.status(200).json({ message: 'You got an email :-)' });

    }).catch((err) => {

        console.log("===EMAIL NOT SENT===");
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });

    });

};
