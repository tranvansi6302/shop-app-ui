import { useRoutes } from 'react-router-dom'
import pathConfig from '../configs/path.config'
import ProductList from '../pages/Products/ProductList'
import ProductDetail from '../pages/Products/components/ProductDetail'

export default function AppRouter() {
    return useRoutes([
        {
            path: pathConfig.home,
            element: <ProductList />
        },
        {
            path: pathConfig.productDetail,
            element: <ProductDetail />
        }
    ])
}
