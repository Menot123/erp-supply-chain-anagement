import jwt from 'jsonwebtoken'
require('dotenv').config();

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET_KEY || 'my-secret-key'
    let token = null
    try {
        token = jwt.sign(payload, key, { expiresIn: '10d' });
    } catch (err) {
        console.log(err)
    }
    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET_KEY || 'my-secret-key'
    let dataDecoded = null;

    try {
        dataDecoded = jwt.verify(token, key);
    } catch (error) {
        console.log(error)
    }
    return dataDecoded;
}

const passCheckMiddleWare = ['/login', '/forgot-password', '/checking-otp', '/change-password'];
const checkUserJWT = (req, res, next) => {
    if (passCheckMiddleWare.includes(req.path)) {
        return next()
    }
    let cookies = req.cookies
    if (cookies && cookies.jwt) {
        let token = cookies.jwt
        let decode = verifyToken(token)
        if (decode) {
            req.user = decode
            req.token = token
            next()
        } else {
            return res.status(401).json({
                EC: -1,
                DT: {},
                EM: 'Not authenticated the user'
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: {},
            EM: 'Not authenticated the user'
        })
    }
}

const checkUserAuthenticated = (req, res, next) => {
    let cookies = req.cookies
    if (cookies && cookies.jwt) {
        let token = cookies.jwt
        let decode = verifyToken(token)
        if (decode) {
            req.user = decode
            req.token = token
            return res.status(200).json({
                EC: 0,
                DT: {},
                EM: 'User is authenticated'
            })
        } else {
            return res.status(401).json({
                EC: -1,
                DT: {},
                EM: 'Not authenticated the user'
            })
        }
    } else {
        return res.status(401).json({
            EC: -2,
            DT: {},
            EM: 'Not authenticated the user'
        })
    }
}

module.exports = {
    createJWT,
    verifyToken,
    checkUserJWT,
    checkUserAuthenticated
};