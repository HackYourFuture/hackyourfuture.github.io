const AWS = require("aws-sdk");

const AWS_CONFIG = {
    region: "eu-west-1"
};

const ses = new AWS.SES(AWS_CONFIG);

const sendEmail = (ToAddresses, Data, Subject, ReplyToAddresses = []) => {
    const sourceEmail =
        ToAddresses[0] === "application@hackyourfuture.net"
            ? "application@hackyourfuture.net"
            : "info@hackyourfuture.net";

    console.log("toAddressess 1", sourceEmail);

    return new Promise((resolve, reject) => {
        if (process.env.DEVELOPMENT) {
            resolve();
            return;
        }

        ses.sendEmail(
            {
                Destination: {
                    ToAddresses: Array.isArray(ToAddresses)
                        ? ToAddresses
                        : [ToAddresses]
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
                Source: sourceEmail,
                ReplyToAddresses
            },
            (err, data) => {
                if (err) return reject(err);

                return resolve(data);
            }
        );
    });
};

module.exports = sendEmail;
