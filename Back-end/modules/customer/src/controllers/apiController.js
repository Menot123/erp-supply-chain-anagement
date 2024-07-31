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

const getCustomersPagination = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 20;

        let response = await apiService.getCustomersPaginationService(page, pageSize);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT,
            total: response?.total
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get list customer pagination',
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

const createNewCustomer = async (req, res, next) => {
    try {
        const dataCustomer = req.body
        let response = await apiService.createNewCustomerService(dataCustomer);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in create a new customer',
            EC: -1,
            DT: ''
        })
    }
}

const deleteCustomer = async (req, res, next) => {
    try {
        const customerIds = req.body
        let response = await apiService.deleteCustomerService(customerIds);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in delete a customer',
            EC: -1,
            DT: ''
        })
    }
}

const updateCustomer = async (req, res, next) => {
    try {
        const customerId = req.params?.id
        const dataCustomerUpdate = req.body
        let response = await apiService.updateCustomerService(customerId, dataCustomerUpdate);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in update a customer',
            EC: -1,
            DT: ''
        })
    }
}

const createListCustomer = async (req, res, next) => {
    try {
        const customerList = req.body
        let response = await apiService.createListCustomerService(customerList);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in create a new customer',
            EC: -1,
            DT: ''
        })
    }
}

module.exports = {
    getCustomers, getCustomerById, getCustomersPagination, createNewCustomer, deleteCustomer,
    updateCustomer, createListCustomer
}