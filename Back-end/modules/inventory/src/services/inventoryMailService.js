require('dotenv').config()
const nodemailer = require("nodemailer");

let sendNotification = async (dataInvoice) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.APP_MAIL_NAME,
            pass: process.env.APP_MAIL_PASS,
        },
    });

    const contentMail = () => {
        const content =
            `
                <h3>Xin chào, </h3>
                <p>Đây là thông báo tự động: hóa đơn INV${dataInvoice?.invoiceId} đã được thanh toán thành công.</p>
                Chúc quý khách hàng một ngày tốt lành, </br>
                Trân trọng.
                `
        return content
    }

    let info = await transporter.sendMail({
        from: 'Hóa đơn <From ERP Viet>',
        to: dataInvoice?.receiver,
        subject: `Thanh toán hóa đơn`,
        html: contentMail(dataInvoice),
    });

}

module.exports = { sendNotification }