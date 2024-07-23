import apiService from '../services/apiServices';

const getQuoteCustomers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const response = await apiService.getQuoteCustomersService(page, pageSize)
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

const getQuoteSent = async (req, res, next) => {
    try {
        const quoteId = req.params?.quoteId
        const response = await apiService.getQuoteSentService(quoteId)
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

module.exports = {
    getQuoteCustomers, getQuoteSent
}