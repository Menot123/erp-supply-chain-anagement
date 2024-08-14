import apiService from '../services/apiServices';

const getQuoteCustomers = async(req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        let jwtToken = req.cookies ? ? ''
        const response = await apiService.getQuoteCustomersService(page, pageSize, jwtToken)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get quotes of customers',
            EC: -1,
            DT: ''
        })
    }
}

const getQuoteProviders = async(req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        let jwtToken = req.cookies ? ? ''
        const response = await apiService.getQuoteProvidersService(page, pageSize, jwtToken)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get quotes of customers',
            EC: -1,
            DT: ''
        })
    }
}

const getQuoteSent = async(req, res, next) => {
    try {
        const quoteId = req.params ? .quoteId
        let jwtToken = req.cookies ? ? ''
        const response = await apiService.getQuoteSentService(quoteId, jwtToken)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get quotes of customers',
            EC: -1,
            DT: ''
        })
    }
}

const getQuoteSentProvider = async(req, res, next) => {
    try {
        const quoteId = req.params ? .quoteId
        let jwtToken = req.cookies ? ? ''
        const response = await apiService.getQuoteSentServiceProvider(quoteId, jwtToken)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get quotes of customers',
            EC: -1,
            DT: ''
        })
    }
}

const getAllInvoices = async(req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 40;
        let jwtToken = req.cookies ? ? ''
        const response = await apiService.getAllInvoicesService(jwtToken, page, pageSize)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT,
            total: response ? .total
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get all invoices by bff',
            EC: -1,
            DT: ''
        })
    }
}

const getInvoice = async(req, res, next) => {
    try {
        const invoiceId = req.params ? .invoiceId
        let jwtToken = req.cookies ? ? ''
        const response = await apiService.getInvoiceService(invoiceId, jwtToken)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get invoice of customers',
            EC: -1,
            DT: ''
        })
    }
}

const getStockDeliveryById = async(req, res, next) => {
    try {
        let stockDeliveryId = req.params.id
        let jwtToken = req.cookies ? ? ''
        let data = await apiService.getStockDeliveryByIdService(stockDeliveryId, jwtToken)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getStockDelivery controller',
            EC: -1,
            DT: ''
        })
    }
}

const getAllInvoicesByCustomer = async(req, res, next) => {
    try {
        const customerId = req.params ? .id
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        let jwtToken = req.cookies ? ? ''

        const response = await apiService.getAllInvoicesByCustomerService(jwtToken, page, pageSize, customerId)
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT,
            total: response ? .total
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get all invoices of customer by bff',
            EC: -1,
            DT: ''
        })
    }
}


module.exports = {
    getQuoteCustomers,
    getQuoteProviders,
    getQuoteSent,
    getQuoteSentProvider,
    getAllInvoices,
    getInvoice,
    getStockDeliveryById,
    getAllInvoicesByCustomer
}