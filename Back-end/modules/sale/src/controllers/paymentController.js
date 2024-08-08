// paymentController.js
import paymentService from "../services/paymentService";

const createPayment = async (req, res) => {
    const { orderId, amount, orderDescription, bankCode, locale } = req.body;
    const paymentUrl = paymentService.createPaymentUrl(orderId, amount, orderDescription, bankCode, locale);
    res.status(200).json({ paymentUrl });
};

const paymentReturn = async (req, res) => {
    const query = req.query;
    const result = await paymentService.verifyPayment(query);

    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(400).json(result);
    }
};

module.exports = { createPayment, paymentReturn };
