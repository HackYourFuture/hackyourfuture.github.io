const AWS = require('aws-sdk');

const AWS_CONFIG = {
    region: 'eu-west-1'
};

const ses = new AWS.SES(AWS_CONFIG);

const sendEmail = (Source, ToAddresses, Data, Subject) => {

    return new Promise((resolve, reject) => {

        if (process.env.DEVELOPMENT) {
            resolve();
            return;
        }

        ses.sendEmail({
            Destination: {
                ToAddresses,
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
            Source,
        }, (err, data) => {

            if (err) return reject(err);

            return resolve(data);

        });

    });
}

module.exports = sendEmail;
