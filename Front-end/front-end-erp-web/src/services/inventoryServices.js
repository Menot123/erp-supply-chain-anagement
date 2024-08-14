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
    return axios.get(`/provider/api/providers`)
}

const getCustomers = () => {
    return axios.get(`/customer/api/customers`)
}

const getStocks = () => {
    return axios.get(`/inventory/api/stocks`)
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

const updateReceiptItem = (id, data) => {
    return axios.put(`/inventory/api/stockEntryItems/${id}`, data)
}

const updateDeliveryItem = (id, data) => {
    return axios.put(`/inventory/api/stockDeliveryItems/${id}`, data)
}

const addToStock = (data) => {
    return axios.post(`/inventory/api/stocks/add`, data)
}

const checkMinusStock = (listItem) => {
    return axios.post(`/inventory/api/stocks/checkStock`, listItem)
}

const minusToStock = (data) => {
    return axios.post(`/inventory/api/stocks/minus`, data)
}

const getStockDeliverys = () => {
    return axios.get(`/inventory/api/stockDeliverys`)
}

const getStockDeliveryInfo = (id) => {
    return axios.get(`/inventory/api/stockDeliverys/${id}`)
}

const getDeliveryListItems = (id) => {
    return axios.get(`/inventory/api/stockDeliveryItemsBaseOnDelivery/${id}`)
}

const createNewReceipt = (data) => {
    return axios.post(`/inventory/api/stockEntrys`, data)
}

const updateReceipt = (id, data) => {
    return axios.put(`/inventory/api/stockEntrys/${id}`, data)
}

const updateDelivery = (id, data) => {
    return axios.put(`/inventory/api/stockDeliverys/${id}`, data)
}

const createNewDelivery = (data) => {
    return axios.post(`/inventory/api/stockDeliverys`, data)
}

const getProductByProviderId = (id) => {
    return axios.get(`/inventory/api/productProviders/provider/${id}`)
}

const getProviderByProductId = (id) => {
    return axios.get(`/inventory/api/productProviders/product/${id}`)
}

const createProductProvider = (data) => {
    return axios.post(`/inventory/api/productProviders`, data)
}

const deleteProductProvider = (data) => {
    return axios.post(`/inventory/api/productProvidersDel`, data)
}

const createProductListOfReceipt = (data) => {
    return axios.post(`/inventory/api/stockEntryItems`, data)
}

const createProductListOfReceiptArray = (data) => {
    return axios.post(`/inventory/api/stockEntryItemsList`, data)
}

const createProductListOfDelivery = (data) => {
    return axios.post(`/inventory/api/stockDeliveryItems`, data)
}

const createProductListOfDeliveryArray = (data) => {
    return axios.post(`/inventory/api/stockDeliveryItemsList`, data)
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
    getStocks,
    getStockEntrys,
    getStockEntryInfo,
    getReceiptListItems,
    getStockDeliverys,
    getStockDeliveryInfo,
    getDeliveryListItems,
    createNewReceipt,
    updateReceipt,
    updateDelivery,
    addToStock,
    checkMinusStock,
    minusToStock,
    updateReceiptItem,
    updateDeliveryItem,
    createNewDelivery,
    getProductByProviderId,
    getProviderByProductId,
    createProductProvider,
    deleteProductProvider,
    createProductListOfReceipt,
    createProductListOfReceiptArray,
    createProductListOfDelivery,
    createProductListOfDeliveryArray
}