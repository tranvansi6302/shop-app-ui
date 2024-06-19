import http from '../utils/http'

const authApi = {
    register: (data) => http.post('/auth/register', data),
    login: (data) => http.post('/auth/login', data)
}

export default authApi
