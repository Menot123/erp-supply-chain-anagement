import userService from '../services/userService';
let handleGetUsers = async(req, res) => {
    try {
        let data = await userService.handleGetAllUsersService()
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getUsers controller',
            EC: -1,
            DT: ''
        })
    }

}

// Get user with id
const handleGetUser = async(req, res, next) => {
    try {
        let userIdCard = req.params.id
        let data = await userService.handleGetUserService(userIdCard)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getUser controller',
            EC: -1,
            DT: ''
        })
    }
}

// Create new user
const handleCreateUser = async(req, res, next) => {
    try {
        let userData = req.body;
        let response = await userService.handleCreateUserService(userData);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in createUser controller',
            EC: -1,
            DT: ''
        })
    }
}

// Update user data
const handleUpdateUser = async(req, res, next) => {
    try {
        let userData = req.body;
        let userIdCard = req.params.id;
        let response = await userService.handleUpdateUserService(userIdCard, userData);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in updateUser controller',
            EC: -1,
            DT: ''
        })
    }
}

// Delete user with id
const handleDeleteUser = async(req, res, next) => {
    try {
        let userIdCard = req.params.id;
        let response = await userService.handleDeleteUserService(userIdCard);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in deleteUser controller',
            EC: -1,
            DT: ''
        })
    }
}

module.exports = {
    handleGetUsers,
    handleGetUsers,
    handleGetUser,
    handleUpdateUser,
    handleCreateUser,
    handleDeleteUser
};