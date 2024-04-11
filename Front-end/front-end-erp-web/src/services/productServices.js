import axios from "../axios/axiosCustom";

const getAllCode = (type) => {
    return axios.get(`/inventory/api/get-allCode?type=${type}`)
}

const createNewProduct = (data) => {
    return axios.post('/inventory/api/products', data)
}

const getAllProducts = () => {
    return axios.get(`/inventory/api/products`)
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

export {
    createNewProduct,
    getAllProducts,
    getProductWithId,
    updateProductInformation,
    getAllCode,
    deleteProduct
}