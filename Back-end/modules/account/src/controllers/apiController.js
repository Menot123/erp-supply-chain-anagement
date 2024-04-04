import apiService from '../services/apiService';

const getAllTypeByType = async (req, res) => {
    try {
        let data = await apiService.getAllTypeService(req.query?.type)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getAllTypeByType controller',
            EC: -1,
            DT: ''
        })
    }
}

const getEmployeesByDepartment = async (req, res) => {
    try {
        let data = await apiService.getEmployeesByDepartmentService(req?.params, req?.query)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getEmployeesByDepartment controller',
            EC: -1,
            DT: ''
        })
    }
}

const handleCreateUsers = async (req, res, next) => {
    try {
        let usersData = req.body;
        let response = await apiService.handleCreateUsersService(usersData);
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

module.exports = {
    getAllTypeByType, getEmployeesByDepartment, handleCreateUsers
};