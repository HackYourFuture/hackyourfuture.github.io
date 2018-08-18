/**
 * @param {function}
 * @param {object} req.body
 * @param {string} req.body.method
 * @param {number} req.body.amount
 * @param {string} req.body.description
 */

/**
 * @param {function} encryptOrderId
 * @param {string} orderId
 */

/**
 * @param {function} decryptOrderId
 * @param {string} encryptedOrderId
 */

/**
 * @param {function} paymentStatus
 * @param {string} req.query.orderId
 */

let apiKey = "";
if (process.env.ENVIRONMENT === "dev")
    apiKey = process.env.TEST_API_PAYMENT_KEY;
else apiKey = process.env.PROD_API_PAYMENT_KEY;

const mollieClient = require("@mollie/api-client")({
    apiKey
});
const urljoin = require("proper-url-join");
const crypto = require("crypto");

const key = process.env.ENCRYPT_KEY || "class14";

function encryptOrderId(orderId) {
    const cipher = crypto.createCipher("aes192", key);
    let encrypted = cipher.update(orderId, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}

function decryptOrderId(orderId) {
    const decipher = crypto.createDecipher("aes192", key);
    let decrypted = decipher.update(orderId, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

function donate({ method, amount, description }, res) {
    const orderId = new Date().getTime();
    let baseURL = `http://localhost:3000/`;
    if (process.env.ENVIRONMENT === "prod") baseURL = process.env.PROD_BASE_URL;

    const encryptedOrderId = encryptOrderId(orderId.toString());
    const redirectUrlFull = urljoin(baseURL, "?orderid=", encryptedOrderId);

    mollieClient.payments
        .create({
            amount: {
                value: Number.parseFloat(amount).toFixed(2),
                currency: "EUR"
            },
            description: description,
            redirectUrl: redirectUrlFull,
            webhookUrl: `https://sarbast.heroku.com`,
            method: method,
            metadata: { orderId }
        })
        .then(payment => {
            res.redirect(payment.getPaymentUrl());
        })
        .catch(error => {
            res.json({ error: error });
        });
}

function paymentStatus(encryptedOrderId) {
    const orderId = decryptOrderId(encryptedOrderId);
    return new Promise((resolve, reject) => {
        mollieClient.payments
            .all()
            .then(payments => {
                payments.map(payment => {
                    if (payment.metadata.orderId === parseInt(orderId)) {
                        if (payment.isPaid()) {
                            resolve("Thanks for the donation");
                            return;
                        }
                        reject("Something went wrong");
                    }
                });
            })
            .catch(err => console.log("Error: ", err.message));
    });
}

module.exports = {
    donate,
    paymentStatus,
    encryptOrderId,
    decryptOrderId
};
