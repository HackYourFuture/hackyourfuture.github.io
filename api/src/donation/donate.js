const mollieClient = require("@mollie/api-client")({
    apiKey: "test_cc4R8u25pJ7CH7QvRhqHPNtqqMBeWp" //test API key
});

function donate({ method, amount, description }, res) {
    const orderId = new Date().getTime();

    mollieClient.payments
        .create({
            amount: { value: `${amount}.00`, currency: "EUR" },
            description: description,
            redirectUrl: `http://localhost:3000/`,
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

function paymentStatus(orderId) {
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
