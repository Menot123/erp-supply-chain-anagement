import db from '../models/index'
const { Op } = require('sequelize');
const axios = require('axios');

const getInfoCustomerById = async (customerId, jwtToken) => {
    try {
        const response = await axios.get(`http://localhost:8000/customer/api/customer/${customerId}`, {
            headers: {
                'Authorization': jwtToken?.jwt // Truyền JWT khi gọi backend
            }
        });
        return response.data;
    } catch (e) {
        console.log('>>> error when get quotes sent: ', e)
    }
}

const getQuoteCustomersService = async (page, pageSize, jwtToken) => {
    try {
        let res = {}
        let updatedArray = []
        const response = await axios.get('http://localhost:8000/sale/api/quotes-sent', {
            params: {
                page: page,
                pageSize: pageSize
            }, headers: {
                'Authorization': jwtToken?.jwt // Truyền JWT khi gọi backend
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

const getQuoteSentService = async (quoteId, jwtToken) => {
    try {
        let res = {}
        const response = await axios.get(`http://localhost:8000/sale/api/data-preview-quote/${quoteId}`, {
            headers: {
                'Authorization': jwtToken?.jwt // Truyền JWT khi gọi backend
            }
        });
        if (response && response?.data?.DT && response?.data?.DT?.customerId) {
            const dataCustomer = await axios.get(`http://localhost:8000/customer/api/customer/${response?.data?.DT?.customerId}`, {
                headers: {
                    'Authorization': jwtToken?.jwt // Truyền JWT khi gọi backend
                }
            })
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

const getAllInvoicesService = async (jwtToken, page, pageSize) => {
    try {
        let res = {}
        // let updatedArray = []
        const responseInvoices = await axios.get(`http://localhost:8000/sale/api/invoices`, {
            headers: {
                'Authorization': jwtToken?.jwt // Truyền JWT khi gọi backend
            },
            params: {
                page: page,
                pageSize: pageSize
            }

        });
        // const responseInvoicesPaid = await axios.get(`http://localhost:8000/sale/api/invoices-paid`);
        if (responseInvoices && responseInvoices?.data?.DT) {
            const detailCustomerInvoice = responseInvoices?.data?.DT.map(item => getInfoCustomerById(item?.customerId));
            // const detailCustomerInvoicePaid = responseInvoicesPaid?.data?.DT.map(item => getInfoCustomerById(item?.customerId));
            const details = await Promise.all(detailCustomerInvoice);

            let updatedArrayInvoice = responseInvoices?.data?.DT.map((item, index) => ({
                ...item,
                dataCustomer: details[index]?.DT,
            }));

            // let updatedArrayInvoicePaid = responseInvoicesPaid?.data?.DT.map((item, index) => ({
            //     ...item,
            //     dataCustomer: details[index]?.DT,
            // }));

            // updatedArray = [...updatedArrayInvoice, ...updatedArrayInvoicePaid]
            res.EC = 0
            res.EM = 'Get all quotes sent and info customer successfully'
            res.DT = updatedArrayInvoice
            res.total = responseInvoices?.data?.total
        } else {
            res.EC = -1
            res.EM = 'Get all invoices and info customer failed'
            res.DT = {}
        }
        return res;
    } catch (e) {
        console.log('>>> error when get all invoices and customer info: ', e)
    }
}

const getInvoiceService = async (invoiceId, jwtToken) => {
    try {
        let res = {}
        const response = await axios.get(`http://localhost:8000/sale/api/data-preview-invoice/${invoiceId}`, {
            headers: {
                'Authorization': jwtToken?.jwt // Truyền JWT khi gọi backend
            }
        });
        if (response && response?.data?.DT && response?.data?.DT?.customerId) {
            const dataCustomer = await axios.get(`http://localhost:8000/customer/api/customer/${response?.data?.DT?.customerId}`, {
                headers: {
                    'Authorization': jwtToken?.jwt // Truyền JWT khi gọi backend
                }
            })
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
    getQuoteCustomersService, getQuoteSentService, getAllInvoicesService, getInvoiceService
}