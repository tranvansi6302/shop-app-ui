import http from '../utils/http'

const orderApi = {
    addToCart: (data) => http.post('/orders/carts', data),
    getCarts: () => http.get('/orders/carts'),
    updateQuantity: (data) => http.post('/orders/update-quantity', data),
    confirmOrder: (data) => http.post('/orders/confirm', data),
    deleteCartItem: (body) => http.delete('/orders/carts', { data: body })
}

export default orderApi
