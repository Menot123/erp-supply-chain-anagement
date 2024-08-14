import db from '../models/index'
const { Op } = require('sequelize');
const axios = require('axios');
const apiGatewayUrlDocker = "http://api-gateway:8000";


const getInfoCustomerById = async (customerId, jwtToken) => {
    try {
        const response = await axios.get(`http://api-gateway:8000/customer/api/customer/${customerId}`, {
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
        const response = await axios.get('http://api-gateway:8000/sale/api/quotes-sent', {
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

const getQuoteProvidersService = async (page, pageSize, jwtToken) => {
    try {
        let res = {}
        let updatedArray = []
        const response = await axios.get('http://localhost:8000/purchase/api/quotes-sent', {
            params: {
                page: page,
                pageSize: pageSize
            }, headers: {
                'Authorization': jwtToken?.jwt // Truyền JWT khi gọi backend
            }
        });
        if (response && response?.data && response?.data?.DT) {
            const detailPromises = response?.data?.DT.map(item => getInfoProviderById(item?.providerId));
            const details = await Promise.all(detailPromises);

            updatedArray = response?.data?.DT.map((item, index) => ({
                ...item,
                dataProvider: details[index]?.DT,
            }));
            res.EC = 0
            res.EM = 'Get all quotes sent and info provider successfully'
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
        const response = await axios.get(`http://api-gateway:8000/sale/api/data-preview-quote/${quoteId}`, {
            headers: {
                'Authorization': jwtToken?.jwt // Truyền JWT khi gọi backend
            }
        });
        if (response && response?.data?.DT && response?.data?.DT?.customerId) {
            const dataCustomer = await axios.get(`http://api-gateway:8000/customer/api/customer/${response?.data?.DT?.customerId}`, {
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

const getQuoteSentServiceProvider = async (quoteId, jwtToken) => {
    try {
        let res = {}
        const response = await axios.get(`http://localhost:8000/purchase/api/data-preview-quote/${quoteId}`, {
            headers: {
                'Authorization': jwtToken?.jwt // Truyền JWT khi gọi backend
            }
        });
        if (response && response?.data?.DT && response?.data?.DT?.providerId) {
            const dataProvider = await axios.get(`http://localhost:8000/provider/api/provider/${response?.data?.DT?.providerId}`, {
                headers: {
                    'Authorization': jwtToken?.jwt // Truyền JWT khi gọi backend
                }
            })
            const responseData = {
                ...response?.data?.DT,
                dataProvider: dataProvider?.data?.DT
            }
            res.EC = 0
            res.EM = 'Get quote sent and info provider successfully'
            res.DT = responseData
        } else {
            res.EC = -1
            res.EM = 'Get quote sent and info provider failed'
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
        const responseInvoices = await axios.get(`http://api-gateway:8000/sale/api/invoices`, {
            headers: {
                'Authorization': jwtToken?.jwt // Truyền JWT khi gọi backend
            },
            params: {
                page: page,
                pageSize: pageSize
            }

        });
        // const responseInvoicesPaid = await axios.get(`http://api-gateway:8000/sale/api/invoices-paid`);
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
        const response = await axios.get(`http://api-gateway:8000/sale/api/data-preview-invoice/${invoiceId}`, {
            headers: {
                'Authorization': jwtToken?.jwt // Truyền JWT khi gọi backend
            }
        });
        if (response && response?.data?.DT && response?.data?.DT?.customerId) {
            const dataCustomer = await axios.get(`http://api-gateway:8000/customer/api/customer/${response?.data?.DT?.customerId}`, {
                headers: {
                    'Authorization': jwtToken?.jwt // Truyền JWT khi gọi backend
                }
            })
            const dataEmployee = await axios.get(`http://api-gateway:8000/account/api/get-employee?id=${response?.data?.DT?.employeeId}`, {
                headers: {
                    'Authorization': jwtToken?.jwt // Truyền JWT khi gọi backend
                }
            })

            const responseData = {
                ...response?.data?.DT,
                dataCustomer: dataCustomer?.data?.DT,
                dataEmployee: dataEmployee?.data?.DT?.lastName + " " + dataEmployee?.data?.DT?.firstName
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

const getStockDeliveryByIdService = async (stockDeliveryId, jwtToken) => {
    try {
        let res = {}
        stockDeliveryId = encodeURIComponent(stockDeliveryId)
        console.log(">>>> : ", stockDeliveryId);
        const response = await axios.get(`http://api-gateway:8000/inventory/api/stockDeliverys/${stockDeliveryId}`, {
            headers: {
                'Authorization': jwtToken?.jwt // Truyền JWT khi gọi backend
            }
        });
        console.log(">>>> check response: ", response);

        if (response && response?.data?.DT && response?.data?.DT?.customerId) {
            const dataCustomer = await axios.get(`http://api-gateway:8000/customer/api/customer/${response?.data?.DT?.customerId}`, {
                headers: {
                    'Authorization': jwtToken?.jwt // Truyền JWT khi gọi backend
                }
            })
            const responseData = {
                ...response?.data?.DT,
                customerData: dataCustomer?.data?.DT
            }
            res.EC = 0
            res.EM = 'Get stockDelivery successfully'
            res.DT = responseData
        } else {
            res.EC = -1
            res.EM = 'Get stockDelivery failed'
            res.DT = {}
        }
        return res;
    } catch (e) {
        console.log('>>> error when get stockDelivery: ', e)
    }
}

const getAllInvoicesByCustomerService = async (jwtToken, page, pageSize, customerId) => {
    try {
        let res = {}
        // let updatedArray = []
        const responseInvoices = await axios.get(`http://api-gateway:8000/sale/api/invoices`, {
            headers: {
                'Authorization': jwtToken?.jwt // Truyền JWT khi gọi backend
            },
            params: {
                page: page,
                pageSize: pageSize,
                customerId: customerId
            }

        });

        // const responseInvoicesPaid = await axios.get(`http://api-gateway:8000/sale/api/invoices-paid`);
        if (responseInvoices && responseInvoices?.data?.DT) {
            const detailCustomerInvoice = await getInfoCustomerById(customerId);

            // const detailCustomerInvoicePaid = responseInvoicesPaid?.data?.DT.map(item => getInfoCustomerById(item?.customerId));

            let updatedArrayInvoice = responseInvoices?.data?.DT.map((item, index) => ({
                ...item,
                dataCustomer: detailCustomerInvoice?.DT,
            }));

            // let updatedArrayInvoicePaid = responseInvoicesPaid?.data?.DT.map((item, index) => ({
            //     ...item,
            //     dataCustomer: details[index]?.DT,
            // }));

            // updatedArray = [...updatedArrayInvoice, ...updatedArrayInvoicePaid]
            res.EC = 0
            res.EM = 'Get all invoices of the customer successfully'
            res.DT = updatedArrayInvoice
            res.total = responseInvoices?.data?.total
        } else {
            res.EC = -1
            res.EM = 'Get all invoices of the customer failed'
            res.DT = {}
        }
        return res;
    } catch (e) {
        console.log('>>> error when get all invoices and customer info: ', e)
    }
}

module.exports = {
    getQuoteCustomersService, getQuoteProvidersService, getQuoteSentService, getQuoteSentServiceProvider, getAllInvoicesService, getInvoiceService,
    getStockDeliveryByIdService, getAllInvoicesByCustomerService
}