const AWS = require('aws-sdk');
const template = require('lodash.template');
const applyToStudentMessage = require('./../../emails_template/apply_to_student.txt');
const applyToOrgTemplate = template(require('./../../emails_template/apply_to_org.tpl'));

const createApplicant = require("../data/create-applicant");

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

let form = {

    "userName": "string",
    "email": "string",
    "city": "string",
    "street": "string",
    "phone": "number",
    "education": "string",
    "how-hear": "string",
    "computer": "boolean"
};


const check = (data, form) => {
    return new Promise((resolve, reject) => {
        const result = { "isValid": true };
        for (let key in form) {
            if (form.hasOwnProperty(key)) {
                if (typeof data[key] === 'object' && typeof form[key] == 'object') {
                    resolve(data[key], form[key]);
                } else {
                    if (typeof data[key] !== form[key]) {
                        result.isValid = false;
                        return reject(result.msg = key + " doesn't exist or is not of the correct type.");
                    }
                }
            }
        }
        console.log("We have a new applicant")
    });
}

module.exports = (req, res) => {
    check(req.body, form).then(() => createApplicant(req.body).then(() => {
        sendEmail(
            fromEmail,
            applyToOrgTemplate({ params: req.body }),
            'A new student applied'
        )
    }).then(() => {

        sendEmail(
            req.body.email,
            applyToStudentMessage,
            'Thank you for applying'
        )

    }).catch((err) => {

        console.log("===EMAIL NOT SENT===");
        console.log(err);

        res.status(500).json({ message: 'Something went wrong' });

    })).then(() => {

        console.log("=== ALL EMAILS ARE SENT!!!");

        res.status(200).json({ message: req.body });

    }).catch((err) => {

        console.log("===EMAIL NOT SENT===");
        console.log(err);

        res.status(500).json({ message: 'Something went wrong' });

    });
};
