import axios from 'axios'
import { getAccessToken, saveAccessToken, setProfile } from './helpers'

class Http {
    instance
    accessToken

    constructor() {
        this.accessToken = getAccessToken()
        this.instance = axios.create({
            baseURL: 'http://localhost:3000/api/v1',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        this.instance.interceptors.request.use(
            (config) => {
                if (this.accessToken) {
                    config.headers.authorization = `Bearer ${this.accessToken}`
                    return config
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

        this.instance.interceptors.response.use(
            (response) => {
                console.log('...')
                const { url } = response.config
                console.log(response)
                if (url === '/auth/login') {
                    const { user, access_token } = response.data.result

                    this.accessToken = access_token
                    this.tempToken = access_token
                    saveAccessToken(this.accessToken)
                    setProfile(user)
                }

                return response
            },
            (error) => {
                console.log(error.response?.status)
                return Promise.reject(error)
            }
        )
    }
}

const http = new Http().instance
export default http
