import customerService from '../services/customerService';
let handleGetCustomers = async(req, res) => {
    try {

        let data = await customerService.handleGetCustomersService()
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get customers controller',
            EC: -1,
            DT: ''
        })
    }
}

// Get customer with id
const handleGetCustomer = async(req, res, next) => {
    try {
        let customerId = req.params.id
        let data = await customerService.handleGetCustomerWithIdService(customerId)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getCustomer controller',
            EC: -1,
            DT: ''
        })
    }
}

// Create a new customer
const handleCreateCustomer = async(req, res, next) => {
    try {
        let dataCustomer = req.body;
        let response = await customerService.handleCreateCustomerService(dataCustomer);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in createCustomer controller',
            EC: -1,
            DT: ''
        })
    }
}


// Update a customer with id
const handleUpdateCustomer = async(req, res, next) => {
    try {
        let customerId = req.params.id;
        let dataCustomer = req.body;
        let response = await customerService.handleUpdatecustomerService(customerId, dataCustomer);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in updateCustomer controller',
            EC: -1,
            DT: ''
        })
    }
}

// Delete a customer with id
const handleDeleteCustomer = async(req, res, next) => {
    try {
        let customerId = req.params.id;
        let response = await customerService.handleDeleteCustomerService(customerId);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in deleteCustomer controller',
            EC: -1,
            DT: ''
        })
    }
}

module.exports = {
    handleGetCustomers,
    handleGetCustomer,
    handleCreateCustomer,
    handleUpdateCustomer,
    handleDeleteCustomer
}