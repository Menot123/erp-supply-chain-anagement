require('dotenv').config()
const nodemailer = require("nodemailer");

let sendEmail = async (dataMail) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.APP_EMAIL,
            pass: process.env.APP_EMAIL_PASSWORD,
        },
    });

    const contentMail = (dataMail) => {

        let content = ''
        if (dataMail.currentLang === 'vi') {
            content =
                `
                <h3>Xin chào, ${dataMail.name}</h3>
                <textarea style="border: none; width: 100%; outline: none; overflow: hidden;" class="form-control w-100" rows="10">${dataMail?.bodySendQuote}</textarea>
                `
        } else {
            content =
                `
            <h3>Dear, ${dataMail.name}</h3>
            <p style='font-style: italic'>You received this email because you made a booking on the Booking Health healthcare website</p>
            <br/>
            
            <div>Thank you for trusting Booking Health</div>
            `
        }
        return content
    }

    const attachment = {
        filename: 'quote.pdf',
        content: dataMail?.quoteFile?.buffer,
        contentType: 'application/pdf'
    };


    let info = await transporter.sendMail({
        from: 'Báo giá <From ERP Viet>',
        to: dataMail?.receiver,
        subject: dataMail?.currentLang === 'vi' ? `Thông tin báo giá ${dataMail?.quoteCode}` : `Information for quote ${dataMail?.quoteCode}`,
        html: contentMail(dataMail),
        attachments: [
            attachment
        ]
    });

}

module.exports = { sendEmail }