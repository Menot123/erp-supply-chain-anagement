require('dotenv').config()
const nodemailer = require("nodemailer");

let sendOTPForgotPasswordCode = async(user, OTP) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.APP_MAIL_NAME,
            pass: process.env.APP_MAIL_PASS,
        },
    });

    const contentMail = (user) => {
        let content = ''
        content =
            `<h3>Xin chào, ${user.name}</h3>
        <p style='font-style: italic'>Đây là mã xác thực email của bạn:</p>
        <br/>
        <div>
        <h1 style='text-align: center'>${OTP}</h1>
        </div>
        <br/>
        <p>Vui lòng bảo quản mã xác thực cẩn thận và không để người khác nhìn thấy.</p>

        <div>Xin cảm ơn</div>`

        return content
    }

    const info = await transporter.sendMail({
        from: '"ERP Viet" <' + process.env.APP_MAIL_NAME + '>', // sender address
        to: user.email, // list of receivers
        subject: "Mã xác thực OTP", // Subject line
        html: contentMail(user)
    });

}





module.exports = { sendOTPForgotPasswordCode }