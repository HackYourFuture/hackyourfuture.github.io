const aws = require("aws-sdk");
const { encryptData } = require("../utils/email-crypto");
let s3;

if (process.env.DEVELOPMENT) {
    s3 = new aws.S3({
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY_ID
        }
    });
} else {
    s3 = new aws.S3();
}

module.exports = function(req, res) {
    const { type, fileExtension, fileName } = req.body;

    if (!type || !fileExtension) {
        console.log(req.body, req.params);
        res.status(400).json({
            error: "request file upload requires type and fileName"
        });
        return;
    }

    const presignedGETURL = s3.createPresignedPost(
        {
            Bucket: "hyf-website-uploads",
            Key: `${type}-${Date.now()}.${fileExtension}`, //filename
            Expires: 100 //time to expire in seconds
        },
        (err, data) => {
            if (err) {
                res.status(100).json({ error: "Something went wrong " });
                return;
            }

            res.status(200).json(data);
        }
    );
};
