import axios from "../axios/axiosCustom";

const loginService = (data) => {
    return axios.post('/account/api/login', data)
}

const logoutService = () => {
    return axios.post('/account/api/logout')
}

const getOTPCode = (email) => {
    return axios.post('/account/api/forgot-password', { email })
}

const checkingOTP = (email, otp) => {
    return axios.post('/account/api/checking-otp', { email, otp })
}

const resetPassword = (email, newPass) => {
    return axios.post('/account/api/change-password', { email, newPass })
}

const createNewEmployeeService = (data) => {
    return axios.post('/account/api/create-user', data)
}

const getAllType = (type) => {
    return axios.get(`/account/api/get-allType?type=${type}`)
}

const getAllEmployee = () => {
    return axios.get(`/account/api/employees`)
}

const getEmployeesPagination = (page, limit) => {
    return axios.get(`/account/api/employees?page=${page}&limit=${limit}`)
}

const resetPasswordLoggedIn = (email, oldPass, newPass) => {
    return axios.post('/account/api/reset-password', { email, oldPass, newPass })
}

const updateProfileService = (dataProfile) => {
    return axios.patch('/account/api/update-profile-employee', dataProfile)
}

const getInfoEmployeeById = (idEmployee) => {
    return axios.get(`/account/api/get-employee?id=${idEmployee}`)
}

const deleteEmployee = (idEmployee) => {
    return axios.delete(`/account/api/user?id=${idEmployee}`)
}

const getAllEmployeesByDepartment = (department, page, limit) => {
    return axios.get(`/account/api/employees/${department}?page=${page}&limit=${limit}`);
}

const postDataUsersFromFile = (dataUsers) => {
    return axios.post(`/account/api/users`, dataUsers)
}

const getListEmployee = () => {
    return axios.get('/account/api/employees')
}

const postDataNewDepartment = (dataDepartment) => {
    return axios.post('/account/api/department', dataDepartment)
}

const getAllDepartments = () => {
    return axios.get('/account/api/departments')
}

export {
    loginService, logoutService, getOTPCode, checkingOTP, resetPassword, createNewEmployeeService,
    getAllType, getAllEmployee, resetPasswordLoggedIn, updateProfileService, getInfoEmployeeById,
    deleteEmployee, getAllEmployeesByDepartment, postDataUsersFromFile, getEmployeesPagination,
    getListEmployee, postDataNewDepartment, getAllDepartments
}