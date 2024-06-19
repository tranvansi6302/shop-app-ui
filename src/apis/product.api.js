import http from '../utils/http'

const productApi = {
    getAllProducts: () => http.get('/products'),
    getProductById: (id) => http.get(`/products/${id}`)
}

export default productApi
