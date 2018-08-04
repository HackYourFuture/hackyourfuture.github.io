const AWS = require('aws-sdk');
// const template = require('');
// const message = require('');
// const emailTemplate = template(require(''));


const AWS_CONFIG = {
    region: 'eu-west-1'
};


const ses = new AWS.SES(AWS_CONFIG);


const sendEmail = (toEmail,fromEmail, Data, Subject) => {

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
//    Nothing to send
};
