import { toast } from "react-toastify";
import axios from "../axios/axiosCustom";

const getCustomers = () => {
    return axios.get(`/customer/api/customers`)
}

const getAllCodes = () => {
    return axios.get('/sale/api/all-codes')
}

const getComments = (quoteId) => {
    return axios.get(`/sale/api/comments/${quoteId}`)
}

const createAComment = (dataComment) => {
    return axios.post(`/sale/api/comment`, dataComment)
}

const editComment = (content, commentId) => {
    return axios.patch('/sale/api/comment', { content: content, commentId: commentId })
}

const deleteComment = (commentId) => {
    return axios.delete(`/sale/api/comment/${commentId}`)
}

const getLatestQuoteCode = () => {
    return axios.get('/sale/api/quote')
}

// const sendingQuoteToCustomer = (dataQuote) => {
//     return axios.post('/sale/api/sending-quote', dataQuote)
// }

const sendingQuoteToCustomer = (data) => {
    return axios.post('/sale/api/sending-quote', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

const sendingInvoiceToCustomer = (data) => {
    return axios.post('/sale/api/sending-invoice', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

const postDataQuote = (data) => {
    return axios.post('/sale/api/quote', data)
}

const confirmQuote = (quoteId, dataSignature) => {
    return axios.put(`/sale/api/quote/${quoteId}`, dataSignature)
}

const getDataQuotePreview = (quoteId) => {
    return axios.get(`/bff/api/quote-sent/${quoteId}`)
}

const postDataCancelQuote = (data) => {
    return axios.post('/sale/api/cancel-quote', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

const postDataInvoice = (data) => {
    return axios.post('/sale/api/invoice', data)
}

const getDataInvoicePreview = (invoiceId) => {
    return axios.get(`/sale/api/data-preview-invoice/${invoiceId}`)
}

const confirmInvoice = (dataInvoice) => {
    return axios.put(`/sale/api/invoice`, dataInvoice)
}

const updateStatusInvoice = (invoiceId, status) => {
    return axios.put(`/sale/api/invoice-status/${invoiceId}`, status)
}

const createPaidInvoice = (dataPaidInvoice) => {
    return axios.post(`/sale/api/invoice/paid`, dataPaidInvoice)
}

const getAllPaidInvoice = () => {
    return axios.get(`/sale/api/invoices`)
}

const getAllQuotesSent = (page, pageSize) => {
    return axios.get('/sale/api/quotes-sent', {
        params: {
            page: page,
            pageSize: pageSize
        }
    });
}

const deleteQuotesSent = (listQuote) => {
    return axios.delete(`/sale/api/delete-quotes-sent`, { data: listQuote })
}

const deleteInvoices = (listInvoices) => {
    return axios.delete(`/sale/api/delete-invoices`, { data: listInvoices })
}

const getCustomer = (customerId) => {
    return axios.get(`/customer/api/customer/${customerId}`)
}

const getQuotesSentAndCustomerInfo = (page, pageSize) => {
    return axios.get('/bff/api/quotes-sent-customers',
        {
            params: {
                page: page,
                pageSize: pageSize
            }
        });
}

const getAllInvoice = (page, pageSize, customerId) => {
    return axios.get('/bff/api/invoices',
        {
            params: {
                page: page,
                pageSize: pageSize,
                customerId: customerId
            }
        });
}

const getInvoice = (invoiceId) => {
    return axios.get(`/bff/api/invoice/${invoiceId}`)
}

const getCustomerPagination = (page, pageSize) => {
    return axios.get('/customer/api/customers-pagination',
        {
            params: {
                page: page,
                pageSize: pageSize
            }
        });
}

const postDataCustomer = (dataCustomer) => {
    return axios.post('/customer/api/customer', dataCustomer);
}

const deleteCustomer = (listIdCustomer) => {
    return axios.delete(`/customer/api/customer`, { data: listIdCustomer })
}

const updateCustomer = (customerId, dataCustomer) => {
    return axios.put(`/customer/api/customer/${customerId}`, dataCustomer);
}

const getInvoicePaid = (invoiceId) => {
    return axios.get(`/sale/api/invoice-paid/${invoiceId}`)
}

const getStatistic = (startDate, endDate) => {
    return axios.get(`/sale/api/statistic/invoices-paid`, {
        params: {
            startDate: startDate,
            endDate: endDate
        }
    });
}

const getEmployeeById = (employeeId) => {
    return axios.get(`/account/api/get-employee?id=${employeeId}`)
}

const getSaleEmployees = () => {
    return axios.get(`/account/api/sale-employees`)
}

const createStockDelivery = (dataStockDelivery) => {
    return axios.post(`/inventory/api/stockDeliverys`, dataStockDelivery)
}

const createStockDeliveryItems = (dataStockDeliveryItems) => {
    return axios.post(`/inventory/api/stockDeliveryItemsList`, dataStockDeliveryItems)
}

const getAllCustomerInvoices = (page, pageSize, customerId) => {
    return axios.get(`/bff/api/customer/invoices/${customerId}`,
        {
            params: {
                page: page,
                pageSize: pageSize,
            }
        });
}

const createVNPayPayment = (invoiceId, total, receivers) => {
    const paymentData = {
        orderId: invoiceId,
        amount: total,
        orderDescription: receivers,
        bankCode: "NCB",
        locale: "vn",
    };
    return axios.post('/sale/api/create-payment', paymentData)
}

const sendCustomMail = (data) => {
    return axios.post('/sale/api/sending-mail-custom', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

const cancelQuote = (quoteId) => {
    return axios.put(`/sale/api/cancel-quote/${quoteId}`);
}

export {
    getCustomers, getAllCodes, getComments, createAComment, editComment, deleteComment, getLatestQuoteCode,
    sendingQuoteToCustomer, postDataQuote, confirmQuote, getDataQuotePreview, postDataCancelQuote, postDataInvoice,
    getDataInvoicePreview, confirmInvoice, sendingInvoiceToCustomer, createPaidInvoice, getAllPaidInvoice, getAllQuotesSent,
    deleteQuotesSent, getCustomer, getQuotesSentAndCustomerInfo, getAllInvoice, getInvoice, getCustomerPagination,
    postDataCustomer, deleteCustomer, updateCustomer, getInvoicePaid, getStatistic, getEmployeeById, getSaleEmployees,
    createStockDelivery, deleteInvoices, createStockDeliveryItems, getAllCustomerInvoices, createVNPayPayment,
    updateStatusInvoice, sendCustomMail, cancelQuote
}