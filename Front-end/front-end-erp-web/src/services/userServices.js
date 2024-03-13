import axios from "../axios/axiosCustom";

const loginService = (data) => {
    return axios.post('/api/login', data)
}

export { loginService }