import axios from "../axios/axiosCustom";

const getProviders = () => {
    return axios.get(`/provider/api/providers`)
}

const getProvider = (id) => {
    return axios.get(`/provider/api/provider/${id}`)
}

const postDataQuote = (data) => {
    return axios.post('/purchase/api/quote', data)
}

const getLatestQuoteCode = () => {
    return axios.get('/purchase/api/quote')
}

const getQuotesSentAndProviderInfo = (page, pageSize) => {
    return axios.get('/bff/api/quotes-sent-providers', {
        params: {
            page: page,
            pageSize: pageSize
        }
    });
}

const getDataQuotePreview = (quoteId) => {
    return axios.get(`/bff/api/quote-sent-provider/${quoteId}`)
}

const getAllProviders = () => {
    return axios.get(`/provider/api/providers`)
}

const postDataProvider = (dataProvider) => {
    return axios.post('/provider/api/provider', dataProvider);
}

const updateProvider = (providerId, dataProvider) => {
    return axios.put(`/provider/api/provider/${providerId}`, dataProvider);
}

// const deleteProvider = (providerId) => {
//     return axios.delete(`/provider/api/provider/${providerId}`);
// }
const deleteProvider = (listIdProvider) => {
    return axios.delete(`/provider/api/provider`, { data: listIdProvider })
}

const getProviderPagination = (page, pageSize) => {
    return axios.get('/provider/api/providers-pagination', {
        params: {
            page: page,
            pageSize: pageSize
        }
    });
}

export {
    getProviders,
    postDataQuote,
    getLatestQuoteCode,
    getQuotesSentAndProviderInfo,
    getDataQuotePreview,
    getProvider,
    getAllProviders,
    getProviderPagination,
    postDataProvider,
    updateProvider,
    deleteProvider
}