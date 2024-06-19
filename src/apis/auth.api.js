import http from '../utils/http'

const authApi = {
    register: (data) => http.post('/auth/register', data)
}

export default authApi
