import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import pathConfig from '../configs/path.config'
import { AppContext } from '../contexts/app.context'
import MainLayout from '../layouts/MainLayout'
import ListCart from '../pages/Cart/ListCart'
import Login from '../pages/Login'
import ConfirmOrder from '../pages/Orders/ConfirmOrder'
import ProductList from '../pages/Products/ProductList'
import ProductDetail from '../pages/Products/components/ProductDetail'
import Register from '../pages/Register'

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
            element: (
                <MainLayout>
                    <ProductList />
                </MainLayout>
            )
        },
        {
            path: pathConfig.productDetail,
            element: (
                <MainLayout>
                    <ProductDetail />
                </MainLayout>
            )
        },

        {
            path: '',
            element: <ProtectedRouter />,
            children: [
                {
                    path: pathConfig.cart,
                    element: (
                        <MainLayout>
                            <ListCart />
                        </MainLayout>
                    )
                },
                {
                    path: pathConfig.confirmOrder,
                    element: (
                        <MainLayout>
                            <ConfirmOrder />
                        </MainLayout>
                    )
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
