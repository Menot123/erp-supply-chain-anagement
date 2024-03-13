import axios from "../axios/axiosCustom";

const loginService = (data) => {
    return axios.post('/api/login', data)
}

const logoutService = () => {
    return axios.post('/api/logout')

}

export { loginService, logoutService }