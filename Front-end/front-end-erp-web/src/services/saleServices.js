import axios from "../axios/axiosCustom";

const getCustomers = () => {
    return axios.get(`/sale/api/customers`)
}

const getAllCodes = () => {
    return axios.get('/sale/api/all-codes')
}

export {
    getCustomers, getAllCodes
}