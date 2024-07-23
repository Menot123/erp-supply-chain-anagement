import db from '../models/index'
const { Op } = require('sequelize');
const axios = require('axios');

const getInfoCustomerById = async (customerId) => {
    try {
        const response = await axios.get(`http://localhost:8000/customer/api/customer/${customerId}`);
        return response.data;
    } catch (e) {
        console.log('>>> error when get quotes sent: ', e)
    }
}

const getQuoteCustomersService = async (page, pageSize) => {
    try {
        let res = {}
        let updatedArray = []
        const response = await axios.get('http://localhost:8000/sale/api/quotes-sent', {
            params: {
                page: page,
                pageSize: pageSize
            }
        });
        if (response && response?.data && response?.data?.DT) {
            const detailPromises = response?.data?.DT.map(item => getInfoCustomerById(item?.customerId));
            const details = await Promise.all(detailPromises);

            updatedArray = response?.data?.DT.map((item, index) => ({
                ...item,
                dataCustomer: details[index]?.DT,
            }));
            res.EC = 0
            res.EM = 'Get all quotes sent and info customer successfully'
            res.DT = updatedArray
        } else {
            res.EC = -1
            res.EM = 'Get all quotes sent and info failed'
            res.DT = {}
        }
        return res;
    } catch (e) {
        console.log('>>> error when get quotes sent: ', e)
    }
}

const getQuoteSentService = async (quoteId) => {
    try {
        let res = {}
        const response = await axios.get(`http://localhost:8000/sale/api/data-preview-quote/${quoteId}`);
        if (response && response?.data?.DT && response?.data?.DT?.customerId) {
            const dataCustomer = await axios.get(`http://localhost:8000/customer/api/customer/${response?.data?.DT?.customerId}`)
            const responseData = {
                ...response?.data?.DT,
                dataCustomer: dataCustomer?.data?.DT
            }
            res.EC = 0
            res.EM = 'Get quote sent and info customer successfully'
            res.DT = responseData
        } else {
            res.EC = -1
            res.EM = 'Get quote sent and info customer failed'
            res.DT = {}
        }
        return res;
    } catch (e) {
        console.log('>>> error when get quotes sent: ', e)
    }
}

module.exports = {
    getQuoteCustomersService, getQuoteSentService
}