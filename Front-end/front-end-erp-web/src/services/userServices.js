import axios from "../axios/axiosCustom";

const loginService = (data) => {
    return axios.post('/api/login', data)
}

const logoutService = () => {
    return axios.post('/api/logout')
}

const getOTPCode = (email) => {
    return axios.post('/api/forgot-password', { email })
}

const checkingOTP = (email, otp) => {
    return axios.post('/api/checking-otp', { email, otp })
}

const resetPassword = (email, newPass) => {
    return axios.post('/api/change-password', { email, newPass })
}

const createNewEmployeeService = (data) => {
    return axios.post('/api/create-user', data)
}

const getAllType = (type) => {
    return axios.get(`/api/get-allType?type=${type}`)
}

const getAllEmployee = () => {
    return axios.get(`/api/employees`)
}

const updateProfileService = (dataProfile) => {
    return axios.patch('/api/update-profile-employee', dataProfile)
}

export {
    loginService, logoutService, getOTPCode, checkingOTP, resetPassword, createNewEmployeeService,
    getAllType, getAllEmployee, updateProfileService
}