import axios from "../axios/axiosCustom";

const getAllCode = (type) => {
    return axios.get(`/inventory/api/get-allCode?type=${type}`)
}

const createNewProduct = (data) => {
    return axios.post('/inventory/api/products', data)
}

const importNewProducts = (data) => {
    return axios.post('/inventory/api/import-products', data)
}

const getAllProducts = () => {
    return axios.get(`/inventory/api/products`)
}

const getProductsPagination = (page, limit) => {
    return axios.get(`/inventory/api/products?page=${page}&limit=${limit}`)
}

const getProductWithId = (id) => {
    return axios.get(`/inventory/api/products/${id}`)
}

const updateProductInformation = (id, data) => {
    return axios.put(`/inventory/api/products/${id}`, data)
}

const deleteProduct = (id) => {
    return axios.delete(`/inventory/api/products/${id}`)
}

const getProviders = () => {
    return axios.get(`/inventory/api/providers`)
}

const getCustomers = () => {
    return axios.get(`/inventory/api/customers`)
}

const getStockEntrys = () => {
    return axios.get(`/inventory/api/stockEntrys`)
}

const getStockEntryInfo = (id) => {
    return axios.get(`/inventory/api/stockEntrys/${id}`)
}

const getReceiptListItems = (id) => {
    return axios.get(`/inventory/api/stockEntryItemsBaseOnReceipt/${id}`)
}

const getStockDeliverys = () => {
    return axios.get(`/inventory/api/stockDeliverys`)
}

const createNewReceipt = (data) => {
    return axios.post(`/inventory/api/stockEntrys`, data)
}

const createNewDelivery = (data) => {
    return axios.post(`/inventory/api/stockDeliverys`, data)
}

const getProductByProviderId = (id) => {
    return axios.get(`/inventory/api/productProviders/provider/${id}`)
}

const createProductListOfReceipt = (data) => {
    return axios.post(`/inventory/api/stockEntryItems`, data)
}

const createProductListOfDelivery = (data) => {
    return axios.post(`/inventory/api/stockDeliveryItems`, data)
}

export {
    createNewProduct,
    importNewProducts,
    getAllProducts,
    getProductsPagination,
    getProductWithId,
    updateProductInformation,
    getAllCode,
    deleteProduct,
    getProviders,
    getCustomers,
    getStockEntrys,
    getStockEntryInfo,
    getReceiptListItems,
    getStockDeliverys,
    createNewReceipt,
    createNewDelivery,
    getProductByProviderId,
    createProductListOfReceipt,
    createProductListOfDelivery
}