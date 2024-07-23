import axios from "../axios/axiosCustom";

const getCustomers = () => {
    return axios.get(`/customer/api/customers`)
}

const getAllCodes = () => {
    return axios.get('/sale/api/all-codes')
}

const getComments = () => {
    return axios.get('/sale/api/comments')
}

const createAComment = (dataComment) => {
    return axios.post('/sale/api/comment', dataComment)
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

const confirmQuote = (quoteId) => {
    return axios.put(`/sale/api/quote/${quoteId}`)
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

const getCustomer = (customerId) => {
    return axios.get(`/customer/api/customer/${customerId}`)
}

const getQuotesSentAndCustomerInfo = (page, pageSize) => {
    return axios.get('/bff/api/quotes-sent-customers', {
        params: {
            page: page,
            pageSize: pageSize
        }
    });
}


export {
    getCustomers, getAllCodes, getComments, createAComment, editComment, deleteComment, getLatestQuoteCode,
    sendingQuoteToCustomer, postDataQuote, confirmQuote, getDataQuotePreview, postDataCancelQuote, postDataInvoice,
    getDataInvoicePreview, confirmInvoice, sendingInvoiceToCustomer, createPaidInvoice, getAllPaidInvoice, getAllQuotesSent,
    deleteQuotesSent, getCustomer, getQuotesSentAndCustomerInfo
}