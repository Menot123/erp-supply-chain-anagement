import userService from '../services/loginService';
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
        let data = await userService.handleUserLogin(email, password)
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
            EC: '-1',
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
            EC: '-1',
            DT: ''
        })
    }
}

module.exports = { handleLogin, handleLogoutAccount };