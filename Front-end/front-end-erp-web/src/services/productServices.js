import axios from "../axios/axiosCustom";



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

export {
    createNewProduct,
    getAllProducts,
    getProductWithId,
    updateProductInformation
}