import apiService from '../service/apiServices';

const getCustomers = async (req, res, next) => {
    try {
        let response = await apiService.getCustomerService();
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get list customer',
            EC: -1,
            DT: ''
        })
    }
}

const getCustomerById = async (req, res, next) => {
    try {
        const customerId = req.params?.id
        let response = await apiService.getCustomerByIdService(customerId);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get info customer',
            EC: -1,
            DT: ''
        })
    }
}

module.exports = {
    getCustomers, getCustomerById
}