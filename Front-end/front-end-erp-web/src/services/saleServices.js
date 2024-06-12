import axios from "../axios/axiosCustom";

const getCustomers = () => {
    return axios.get(`/sale/api/customers`)
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

const postDataQuote = (data) => {
    return axios.post('/sale/api/quote', data)
}

const confirmQuote = (quoteId) => {
    return axios.put(`/sale/api/quote/${quoteId}`)
}

const getDataQuotePreview = (quoteId) => {
    return axios.get(`/sale/api/data-preview-quote/${quoteId}`)
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


export {
    getCustomers, getAllCodes, getComments, createAComment, editComment, deleteComment, getLatestQuoteCode,
    sendingQuoteToCustomer, postDataQuote, confirmQuote, getDataQuotePreview, postDataCancelQuote, postDataInvoice,
    getDataInvoicePreview
}