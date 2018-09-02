const { paymentStatus } = require("./../donation/donate");

module.exports = function DonationStatus(req, res) {
    const { orderid } = req.query;

    if (orderid) {
        paymentStatus(orderid)
            .then(msg =>
                res.json({
                    message: msg
                })
            )
            .catch(err =>
                res.json({
                    message: err
                })
            );

        return;
    }

    res.status(400).json({
        message: "Not order id provided"
    });
};
