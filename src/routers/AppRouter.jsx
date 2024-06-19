import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import pathConfig from '../configs/path.config'
import ProductList from '../pages/Products/ProductList'
import ProductDetail from '../pages/Products/components/ProductDetail'
import Register from '../pages/Register'
import Login from '../pages/Login'
import { useContext } from 'react'
import { AppContext } from '../contexts/app.context'
import ListCart from '../pages/Cart/ListCart'

function ProtectedRouter() {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function PublicRouter() {
    const { isAuthenticated } = useContext(AppContext)
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

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
            path: '',
            element: <ProtectedRouter />,
            children: [
                {
                    path: pathConfig.cart,
                    element: <ListCart />
                }
            ]
        },
        {
            path: '',
            element: <PublicRouter />,
            children: [
                {
                    path: pathConfig.register,
                    element: <Register />
                },
                {
                    path: pathConfig.login,
                    element: <Login />
                }
            ]
        }
    ])
}
