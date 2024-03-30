import loginService from '../services/loginService';
let handleLogin = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(200).json({
                EM: 'Missing parameters!',
                EC: '1',
                DT: ''
            })
        }
        // Checking email and Password
        let data = await loginService.handleUserLogin(email, password)
        if (data && data.DT.access_token) {
            res.cookie('jwt', data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: ''
        })
    }

}

const handleLogoutAccount = (req, res, next) => {
    try {
        res.clearCookie('jwt')
        return res.status(200).json({
            EM: 'Clear cookie done',
            EC: 0,
            DT: ''
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from logout service server',
            EC: -1,
            DT: ''
        })
    }
}

const handleForgotPassword = async (req, res, next) => {
    try {
        // let userData = req.body.data
        req.session.canChangePassword = false
        let response = await loginService.sendOTPCodeService(req.body.email)
        if (response.EC == 0) {
            req.session.otp = response.DT.OTP
            setTimeout(function () {
                req.session.destroy();
            }, 70000);
        }
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: {}
        })

    } catch (e) {
        console.log('Something went wrong from send code OTP')
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: ''
        })
    }
}

const handleCheckingOTP = async (req, res, next) => {
    try {
        let response = await loginService.chekingOTPService(req.body.email)
        if (response.EC == 0) {
            if (req.session.otp == req.body.otp) {
                req.session.canChangePassword = true
                return res.status(200).json({
                    EM: 'OTP is true',
                    EC: response.EC,
                    DT: response.DT
                })
            } else {
                return res.status(200).json({
                    EM: 'OTP is false',
                    EC: -1,
                    DT: response.DT
                })
            }
        } else
            return res.status(200).json({
                EM: response.EM,
                EC: response.EC,
                DT: response.DT
            })

    } catch (e) {
        console.log('Something went wrong from checkingOTP')
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: ''
        })
    }
}

const handleChangePassword = async (req, res, next) => {
    try {
        // let userData = req.body.data
        if (req.session.canChangePassword) {
            let response = await loginService.changePasswordService(req.body.email, req.body.newPass)
            if (response.EC == 0) {
                req.session.canChangePassword = false
            }
            return res.status(200).json({
                EM: response.EM,
                EC: response.EC,
                DT: response.DT
            })
        } else {
            return res.status(200).json({
                EM: "You do not have permission to change password",
                EC: -1,
                DT: {}
            })
        }

    } catch (e) {
        console.log('Something went wrong from change password')
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: ''
        })
    }
}

module.exports = {
    handleLogin,
    handleLogoutAccount,
    handleForgotPassword,
    handleCheckingOTP,
    handleChangePassword
};