/**
 * @param {function}
 * @param {object} req.body
 * @param {string} req.body.method
 * @param {number} req.body.amount
 * @param {string} req.body.description
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
const { encryptData, decryptData } = require("../utils/crypto");

function donate({ method, amount, description }, res) {
    const orderId = new Date().getTime();
    let baseURL = `http://localhost:3000/`;
    if (process.env.ENVIRONMENT === "prod") baseURL = process.env.PROD_BASE_URL;

    const encryptedOrderId = encryptData(orderId.toString());
    const redirectUrl = baseURL.concat("?orderid=", encryptedOrderId);

    mollieClient.payments
        .create({
            amount: {
                value: Number.parseFloat(amount).toFixed(2),
                currency: "EUR"
            },
            description,
            redirectUrl,
            webhookUrl: process.env.WEBHOOK_URL,
            method,
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
    const orderId = decryptData(encryptedOrderId);
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
    paymentStatus
};
