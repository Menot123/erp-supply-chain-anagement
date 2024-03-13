import db from '../models/index'
import { createJWT } from '../middleware/JWTServices'
import bcrypt from 'bcryptjs';
const { Op } = require("sequelize");


const salt = bcrypt.genSaltSync(8);


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

module.exports = {
    handleUserLogin
}