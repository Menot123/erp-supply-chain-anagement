import axios from "../axios/axiosCustom";

const loginCustomer = (dataLogin) => {
    return axios.post('/customer/api/auth/login', dataLogin)
}

export {
    loginCustomer
}