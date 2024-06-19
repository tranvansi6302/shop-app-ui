import { Fragment } from 'react'
import { FaStar } from 'react-icons/fa'
import { FaRegHeart } from 'react-icons/fa6'
import { formatCurrencyVND } from '../../../../utils/format'
import { Link } from 'react-router-dom'
import { getMinMaxPrice } from '../../../../utils/helpers'
export default function ProductItem({ products }) {
    return (
        <Fragment>
            {products &&
                products.map((product) => {
                    const price = getMinMaxPrice(product.items)
                    return (
                        <Link to={`/products/${product.id}`} key={product.id} className='col-lg-4 col-md-6 col-sm-6'>
                            <div className='product__item'>
                                <div
                                    className='product__item__pic set-bg'
                                    data-setbg={product?.images[0].url}
                                    style={{ backgroundImage: `url(${product?.images[0].url})` }}
                                >
                                    <ul className='product__hover'>
                                        <li>
                                            <FaRegHeart />
                                        </li>
                                    </ul>
                                </div>
                                <div className='product__item__text '>
                                    <h5
                                        className='title-product'
                                        style={{
                                            color: '#3a3a3a'
                                        }}
                                    >
                                        {product.name}
                                    </h5>

                                    <div className='d-flex align-items-center mt-2'>
                                        <div className='rating ' style={{ display: 'flex', gap: '3px' }}>
                                            <FaStar color='#69580b' fontSize='12px' />
                                            <FaStar color='#69580b' fontSize='12px' />
                                            <FaStar color='#69580b' fontSize='12px' />
                                            <FaStar color='#69580b' fontSize='12px' />
                                            <FaStar color='#69580b' fontSize='12px' />
                                        </div>
                                        <p
                                            style={{
                                                fontSize: '14px',
                                                color: '#1b0e0e',
                                                margin: '0',
                                                paddingLeft: '5px'
                                            }}
                                        >
                                            Đã bán {product.sold}
                                        </p>
                                    </div>
                                    <h5 className='mt-3'>
                                        {formatCurrencyVND(price.minPrice)} - {formatCurrencyVND(price.maxPrice)}
                                    </h5>
                                </div>
                            </div>
                        </Link>
                    )
                })}
        </Fragment>
    )
}
