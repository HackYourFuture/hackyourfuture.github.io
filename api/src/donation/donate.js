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

const apiKey = process.env.MOLLIE_API_KEY;

const mollieClient = require("@mollie/api-client")({
    apiKey
});
const { encryptData, decryptData } = require("../utils/email-crypto");

function donate({ method, amount, description }, res) {
    const orderId = new Date().getTime(); //
    let baseURL = `http://localhost:3000/`;
    if (process.env.ENVIRONMENT === "prod") baseURL = process.env.PROD_BASE_URL;

    const encryptedOrderId = encryptData(orderId.toString());
    const redirectUrl = baseURL.concat(
        "support/donate?orderid=",
        encryptedOrderId
    );

    mollieClient.payments
        .create({
            amount: {
                value: Number.parseFloat(amount).toFixed(2),
                currency: "EUR"
            },
            description,
            redirectUrl,
            webhookUrl: process.env.WEBHOOK_URL,
            method: method || undefined,
            metadata: { orderId }
        })
        .then(payment => {
            res.json({
                paymentURL: payment.getPaymentUrl()
            });
        })
        .catch(error => {
            res.json({ error: error });
        });
}

function paymentStatus(encryptedOrderId) {
    let orderId;

    return new Promise(resolve => {
        orderId = decryptData(encryptedOrderId);
        resolve();
    })
        .then(() => mollieClient.payments.all())
        .then(payments => {
            const isPaid =
                payments.filter(
                    payment =>
                        payment.isPaid() &&
                        payment.metadata.orderId !== Number(orderId)
                ).length > 0;

            if (isPaid) {
                return "Donation went ok";
            }

            throw new Error("Donation failed");
        })
        .catch(err => console.log(`Error: ${err.message}`));
}

module.exports = {
    donate,
    paymentStatus
};
