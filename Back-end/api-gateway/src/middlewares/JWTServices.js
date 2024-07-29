const jwt = require('jsonwebtoken');
require('dotenv').config();

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

const urlSalePermission = ['/sale', '/inventory', '/customer']

const checkPermissionAccess = (department, currentUrl, urlPermissions) => {
    switch (department) {
        case 'D3':
            return urlPermissions.includes(currentUrl)
        default:
            return false
    }
}

const passCheckMiddleWare = ['/login', '/api/login', '/logout', '/api/logout', '/forgot-password', '/api/forgot-password',
    '/checking-otp', '/api/checking-otp', '/api/change-password', '/change-password'];
const checkUserJWT = (req, res, next) => {
    let tokenFromHeader = req.headers['authorization'];

    if (passCheckMiddleWare.includes(req.path)) {
        return next()
    }
    let cookies = req.cookies

    if (cookies && cookies.jwt) {
        let token = cookies.jwt
        let decode = verifyToken(token)
        if (decode) {
            switch (decode?.department) {
                case 'D3':
                    if (checkPermissionAccess(decode?.department, req?.baseUrl, urlSalePermission)) {
                        req.user = decode
                        req.token = token
                        next()
                        break;
                    } else {
                        return res.status(401).json({
                            EC: -1,
                            DT: {},
                            EM: 'Not authenticated the user'
                        })
                    }
                default:
                    checkPermissionAccess(decode?.department, urlSalePermission)
                    req.user = decode
                    req.token = token
                    next()
            }

        } else {
            return res.status(401).json({
                EC: -1,
                DT: {},
                EM: 'Not authenticated the user'
            })
        }
    } else if (tokenFromHeader) {
        let decode = verifyToken(tokenFromHeader)
        if (decode) {
            req.user = decode
            req.token = tokenFromHeader
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

module.exports = {
    verifyToken,
    checkUserJWT
};