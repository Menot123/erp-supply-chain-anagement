import db from '../models/index'
import { createJWT } from '../middleware/JWTServices'
import { sendOTPForgotPasswordCode } from './mailerService'
import bcrypt from 'bcryptjs';
const { Op } = require("sequelize");


const salt = bcrypt.genSaltSync(Number(process.env.SALT_HASH_CODE));


const handleUserLogin = async(email, pwd) => {
    try {
        let user = await db.User.findOne({
            where: {
                email: email,
            }
        });
        if (user) {
            let checkPass = true
            if (user.email !== 'admin@gmail.com') {
                checkPass = bcrypt.compareSync(pwd, user.password);
            } else {
                if (pwd !== user.password)
                    checkPass = false;
            }
            if (checkPass) {
                let payload = {
                    email: user.email,
                    name: user.email === 'admin@gmail.com' ? 'Admin' : user.name
                }
                let token = createJWT(payload)
                return {
                    EM: 'OK',
                    EC: 0,
                    DT: {
                        access_token: token,
                        email: user.email,
                        name: user.name,
                    }
                }
            }
        }
        return {
            EM: 'Your email or password is incorrect',
            EC: 1,
            DT: ''
        }
    } catch (e) {
        console.log('>>> error: ', e)
        return {
            EM: 'Something wrong in handle login userService',
            EC: 1,
            DT: ''
        }
    }
}

const sendOTPCodeService = async(email) => {
    try {
        let res = {}
        let user = await db.User.findOne({
            where: {
                email: email,
                status: {
                    [Op.not]: 'deleted'
                },
                role: {
                    [Op.not]: 'admin'
                }
            },
            attributes: {
                include: ['email', 'name', 'password']
            }
        })
        if (user) {
            const OTP = Math.floor(100000 + Math.random() * 900000);
            const sendOTP = await sendOTPForgotPasswordCode(user, OTP);
            res.EC = 0
            res.EM = `Send OTP Code Completed`
            res.DT = { OTP: OTP }
        } else {
            res.EC = 1
            res.EM = `User not found`
            res.DT = {}
        }

        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with get code',
            EC: 1,
            DT: ''
        }
    }
}

const chekingOTPService = async(email) => {
    try {
        let res = {}
        let user = await db.User.findOne({
            where: {
                email: email,
                status: {
                    [Op.not]: 'deleted'
                },
                role: {
                    [Op.not]: 'admin'
                }
            },
            attributes: {
                include: ['email']
            }
        })
        if (user) {
            res.EC = 0
            res.EM = `User is found`
            res.DT = {}
        } else {
            res.EC = 1
            res.EM = `User not found`
            res.DT = {}
        }

        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with checking otp service',
            EC: 1,
            DT: ''
        }
    }
}

// Hash password function
let hashUserPassword = async(password) => {
    try {
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    } catch (err) {
        throw err;
    }
};

const changePasswordService = async(userEmail, newPwd) => {
    try {
        let res = {}
        let email = userEmail
        let user = await db.User.findOne({
            where: {
                email: email,
                role: {
                    [Op.not]: 'admin'
                }
            }
        })
        let hashPassword = await hashUserPassword(newPwd)
        if (user) {
            await user.update({ password: hashPassword })
            res.EC = 0
            res.EM = `Change password user ${userEmail} successfully`
            res.DT = {}
        } else {
            res.EC = 1
            res.EM = `Change pass for user ${userEmail} failed`
            res.DT = {}
        }

        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with change password user service',
            EC: 1,
            DT: ''
        }
    }
}

module.exports = {
    handleUserLogin,
    sendOTPCodeService,
    chekingOTPService,
    changePasswordService,
}