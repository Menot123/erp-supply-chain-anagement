import userService from '../services/userService';

let handleGetUsers = async (req, res) => {
    try {
        let data = await userService.handleGetAllUsersService()
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get employees controller',
            EC: -1,
            DT: ''
        })
    }

}

let handleGetEmployees = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let { page, limit } = req.query
            let data = await userService.getEmployeesPaginationService(+page, +limit)

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } else {
            let data = await userService.handleGetEmployeesService()
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }


    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get employees controller',
            EC: -1,
            DT: ''
        })
    }

}



// Get user with id
const handleGetEmployee = async (req, res, next) => {
    try {
        let employeeId = req.query?.id
        let data = await userService.handleGetEmployeeService(employeeId)
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
const handleCreateUser = async (req, res, next) => {
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
const handleUpdateEmployee = async (req, res, next) => {
    try {
        let dataEmployee = req.body;
        let response = await userService.handleUpdateEmployeeService(dataEmployee);
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
const handleDeleteUser = async (req, res, next) => {
    try {
        let userId = req.query?.id;
        let response = await userService.handleDeleteUserService(userId);
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

// Reset user password if they already logged in
const handleResetPassword = async (req, res, next) => {
    try {
        // let userData = req.body.data
        if (req.body.email) {
            let response = await userService.resetPasswordService(req.body.email, req.body.oldPass, req.body.newPass)
            if (response.EC == 0) {
                res.clearCookie('jwt')
                return res.status(200).json({
                    EM: response.EM,
                    EC: response.EC,
                    DT: response.DT
                })
            } else {
                return res.status(404).json({
                    EM: response.EM,
                    EC: response.EC,
                    DT: response.DT
                })
            }
        } else {
            return res.status(404).json({
                EM: "You need to confirm your account email",
                EC: -1,
                DT: {}
            })
        }

    } catch (e) {
        console.log('Something went wrong from reset password')
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: ''
        })
    }
}

module.exports = {
    handleGetUsers,
    handleGetEmployees,
    handleGetEmployee,
    handleUpdateEmployee,
    handleCreateUser,
    handleDeleteUser,
    handleResetPassword
};