import { useRoutes } from 'react-router-dom'
import pathConfig from '../configs/path.config'
import ProductList from '../pages/Products/ProductList'
import ProductDetail from '../pages/Products/components/ProductDetail'
import Register from '../pages/Register'
import Login from '../pages/Login'

export default function AppRouter() {
    return useRoutes([
        {
            path: pathConfig.home,
            element: <ProductList />
        },
        {
            path: pathConfig.productDetail,
            element: <ProductDetail />
        },
        {
            path: pathConfig.register,
            element: <Register />
        },
        {
            path: pathConfig.login,
            element: <Login />
        }
    ])
}
