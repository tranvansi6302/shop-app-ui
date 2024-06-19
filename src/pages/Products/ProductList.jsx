import { keepPreviousData, useQuery } from '@tanstack/react-query'
import productApi from '../../apis/product.api'
import Asidebar from './components/Asidebar'
import ProductItem from './components/ProductItem'

export default function ProductList() {
    const { data: products } = useQuery({
        queryKey: ['products'],
        queryFn: () => productApi.getAllProducts(),
        placeholderData: keepPreviousData
    })

    return (
        <div className='container mt-5'>
            <div className='row'>
                <Asidebar />
                <div className='col-lg-9'>
                    <div className='shop__product__option'>
                        <div className='row'>
                            <div className='col-lg-6 col-md-6 col-sm-6'>
                                <div className='shop__product__option__left'>
                                    <p>Showing 1–12 of 126 results</p>
                                </div>
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-6'>
                                <div className='shop__product__option__right'>
                                    <p>Sort by Price:</p>
                                    <select style={{ display: 'none' }}>
                                        <option value>Low To High</option>
                                        <option value>$0 - $55</option>
                                        <option value>$55 - $100</option>
                                    </select>
                                    <div className='nice-select' tabIndex={0}>
                                        <span className='current'>Low To High</span>
                                        <ul className='list'>
                                            <li data-value className='option selected'>
                                                Low To High
                                            </li>
                                            <li data-value className='option'>
                                                $0 - $55
                                            </li>
                                            <li data-value className='option'>
                                                $55 - $100
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <ProductItem products={products?.data?.result} />
                    </div>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <nav className='d-flex justify-content-center' aria-label='Page navigation example'>
                                <ul className='pagination'>
                                    <li className='page-item'>
                                        <a className='page-link' href='#' aria-label='Previous'>
                                            <span aria-hidden='true'>«</span>
                                        </a>
                                    </li>
                                    <li className='page-item'>
                                        <a className='page-link' href='#'>
                                            1
                                        </a>
                                    </li>
                                    <li className='page-item'>
                                        <a className='page-link' href='#'>
                                            2
                                        </a>
                                    </li>
                                    <li className='page-item'>
                                        <a className='page-link' href='#'>
                                            3
                                        </a>
                                    </li>
                                    <li className='page-item'>
                                        <a className='page-link' href='#' aria-label='Next'>
                                            <span aria-hidden='true'>»</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
