const crypto = require('crypto');
const querystring = require('querystring');

class PaymentService {
    constructor() {
        this.vnp_TmnCode = 'DNQ676BY'; // Mã website của bạn
        this.vnp_HashSecret = 'UR0Z0Z8CG28RQELGMRHFC5FSFW99SV6A'; // Chuỗi bí mật
        this.vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'; // URL cổng thanh toán VNPay
        this.vnp_ReturnUrl = 'http://localhost:3000/customer/payment-success'; // URL callback sau khi thanh toán
    }

    createPaymentUrl(orderId, amount, orderDescription, bankCode, locale, customer, employee) {
        const formattedOrderDescription = orderDescription.trim().replace(/ /g, '_');
        const vnp_Params = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: this.vnp_TmnCode,
            vnp_Locale: locale || 'vn',
            vnp_CurrCode: 'VND',
            vnp_TxnRef: orderId,
            vnp_OrderInfo: formattedOrderDescription ?? "",
            vnp_OrderType: 'other',
            vnp_Amount: amount * 100, // Số tiền tính bằng VND
            vnp_ReturnUrl: this.vnp_ReturnUrl,
            vnp_IpAddr: '127.0.0.1',
            vnp_CreateDate: this._getCurrentDateString(),
            vnp_BankCode: bankCode,
        };

        const sortedParams = this._sortObject(vnp_Params);
        const signData = querystring.stringify(sortedParams);
        const hmac = crypto.createHmac('sha512', this.vnp_HashSecret);
        const secureHash = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
        vnp_Params.vnp_SecureHash = secureHash;

        return `${this.vnp_Url}?${querystring.stringify(vnp_Params)}`;
    }

    _sortObject(obj) {
        const sorted = {};
        const keys = Object.keys(obj).sort();
        for (const key of keys) {
            sorted[key] = obj[key];
        }
        return sorted;
    }

    _getCurrentDateString() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2);
        const day = (`0${date.getDate()}`).slice(-2);
        const hour = (`0${date.getHours()}`).slice(-2);
        const minute = (`0${date.getMinutes()}`).slice(-2);
        const second = (`0${date.getSeconds()}`).slice(-2);
        return `${year}${month}${day}${hour}${minute}${second}`;
    }

    async verifyPayment(query) {
        const vnp_Params = { ...query };
        const vnp_SecureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        const sortedParams = this._sortObject(vnp_Params);
        const signData = querystring.stringify(sortedParams);

        const hmac = crypto.createHmac('sha512', this.vnp_HashSecret);
        const secureHash = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

        if (vnp_SecureHash === secureHash) {
            const amount = vnp_Params['vnp_Amount'] / 100;
            const orderId = vnp_Params['vnp_TxnRef'];
            const responseCode = vnp_Params['vnp_ResponseCode'];

            if (responseCode === '00') {
                // Payment success
                return {
                    success: true,
                    orderId,
                    amount,
                    message: 'Payment successful'
                };
            } else {
                // Payment failed
                return {
                    success: false,
                    orderId,
                    amount,
                    message: 'Payment failed'
                };
            }
        } else {
            return {
                success: false,
                message: 'Invalid checksum'
            };
        }
    }
}

module.exports = new PaymentService();