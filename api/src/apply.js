const AWS = require('aws-sdk');
const template = require('lodash.template');
const applyToStudentMessage = require('./../emails_template/apply_to_student.txt');
const applyToOrgTemplate = template(require('./../emails_template/apply_to_org.tpl'));

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

const createApplicant = (body) => {

    return new Promise((resolve, reject) => {
        for (var i in body) {
            if (body[i] === "") {
                return reject("you have to fill all fields");
            }
        }
        console.log("We have a new applicant")
        return resolve(body)


    });
}

module.exports = (req, res) => {
    createApplicant(req.body).then(() => {
        sendEmail(
            fromEmail,
            applyToOrgTemplate({ params: req.body }),
            'A new student applied'
        )
    }).then(() => {

        return sendEmail(
            req.body.email,
            applyToStudentMessage,
            'Thank you for applying'
        );

    }).then(() => {

        console.log("=== ALL EMAILS ARE SENT!!!");

        res.status(200).json(req.body);

    }).catch((err) => {

        console.log("===EMAIL NOT SENT===");
        console.log(err);

        res.status(500).json({ message: 'Something went wrong' });

    });
};
