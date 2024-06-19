import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import orderApi from '../../../../apis/order.api'
import productApi from '../../../../apis/product.api'
import { AppContext } from '../../../../contexts/app.context'
import { formatCurrencyVND } from '../../../../utils/format'
import { getMinMaxPrice } from '../../../../utils/helpers'

export default function ProductDetail() {
    const { id: productId } = useParams()
    const { isAuthenticated } = useContext(AppContext)
    const navigate = useNavigate()
    const { data: product } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => productApi.getProductById(productId),
        placeholderData: keepPreviousData,

        enabled: !!productId // <=> Boolean(productId)
    })

    const price = getMinMaxPrice(product?.data.result.items)

    const [selectedSize, setSelectedSize] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
    const [activePrice, setActivePrice] = useState(0)
    const [quantity, setQuantity] = useState(1)

    const handleSelectedSize = (size) => {
        setSelectedSize(size)
    }

    const handleSelectedColor = (color) => {
        setSelectedColor(color)
    }

    const getUniqueSizeAndColor = (items) => {
        const colors = new Set()
        const sizes = new Set()

        items?.forEach((item) => {
            colors.add(item.color)
            sizes.add(item.size)
        })
        return {
            colors: Array.from(colors),
            sizes: Array.from(sizes)
        }
    }
    const { colors, sizes } = getUniqueSizeAndColor(product?.data.result.items)

    useEffect(() => {
        if (selectedSize && selectedColor) {
            const item = product?.data.result.items.find(
                (item) => item.size === selectedSize && item.color === selectedColor
            )
            setActivePrice(item.price)
        }
    }, [selectedSize, selectedColor, product?.data.result.items])

    const addToCartMutation = useMutation({
        mutationFn: (data) => orderApi.addToCart(data)
    })

    const handleAddCart = () => {
        console.log(isAuthenticated)
        if (!isAuthenticated) {
            navigate('/login')
            return
        }
        if (!selectedSize || !selectedColor) {
            toast.error('Vui lòng chọn kích thước và màu sắc')
            return
        }

        const item = product.data.result.items?.find(
            (item) => item.size === selectedSize && item.color === selectedColor
        )
        const data = {
            details: [
                {
                    productItemId: item.id,
                    quantity: quantity
                }
            ]
        }
        addToCartMutation.mutate(data, {
            onSuccess: () => {
                toast.success('Thêm vào giỏ hàng thành công')
            },
            onError: (error) => {
                toast.error(error.response.data.message)
            }
        })
        console.log(data)
    }
    return (
        <section className='shop-details'>
            <div style={{ background: '#ffffff', marginBottom: '0' }} className='product__details__pic'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-1 col-md-3'>
                            <ul className='nav nav-tabs' role='tablist'>
                                <li className='nav-item'>
                                    {product &&
                                        product.data.result.images.length > 0 &&
                                        product.data.result.images.map((item, index) => (
                                            <a
                                                key={item.id}
                                                className={`nav-link ${index == 0 ? 'active' : ''}`}
                                                data-toggle='tab'
                                                href={`#tabs-${index + 1}`}
                                                role='tab'
                                            >
                                                <div
                                                    className='product__thumb__pic set-bg'
                                                    data-setbg={item.url}
                                                    style={{
                                                        backgroundImage: `url(${item.url})`,
                                                        width: '65px',
                                                        height: '65px',
                                                        marginBottom: '5px'
                                                    }}
                                                ></div>
                                            </a>
                                        ))}
                                </li>
                            </ul>
                        </div>
                        <div className='col-lg-5 col-md-9'>
                            <div className='tab-content'>
                                {product &&
                                    product.data.result.images.length > 0 &&
                                    product.data.result.images.map((item, index) => (
                                        <div
                                            key={item.id}
                                            className={`tab-pane ${index == 0 ? 'active' : ''}`}
                                            id={`tabs-${index + 1}`}
                                            role='tabpanel'
                                        >
                                            <div style={{ height: '450px' }} className='product__details__pic__item'>
                                                <img
                                                    style={{ objectFit: 'cover' }}
                                                    width='100%'
                                                    height='100%'
                                                    alt={item.url}
                                                    src={item.url}
                                                />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className='col-lg-6 col-md-9'>
                            <div className='row d-flex'>
                                <div className='col-lg-12'>
                                    <div
                                        style={{ textAlign: 'left', width: '100%' }}
                                        className='product__details__text'
                                    >
                                        <p style={{ fontSize: '24px', color: '##000000cc', lineHeight: '1.2' }}>
                                            {product?.data.result.name}
                                        </p>
                                        <div className='d-flex align-items-center mt-2'>
                                            <div className='rating ' style={{ display: 'flex', gap: '3px' }}>
                                                <FaStar color='#69580b' fontSize='16px' />
                                                <FaStar color='#69580b' fontSize='16px' />
                                                <FaStar color='#69580b' fontSize='16px' />
                                                <FaStar color='#69580b' fontSize='16px' />
                                                <FaStar color='#69580b' fontSize='16px' />
                                            </div>
                                            <p
                                                style={{
                                                    fontSize: '16px',
                                                    color: '#1b0e0e',
                                                    margin: '0',
                                                    paddingLeft: '5px',
                                                    marginBottom: '16px'
                                                }}
                                            >
                                                Đã bán {product?.data.result.sold}
                                            </p>
                                        </div>
                                        <h3>
                                            {activePrice === 0
                                                ? formatCurrencyVND(price.minPrice)
                                                : formatCurrencyVND(activePrice)}
                                        </h3>

                                        <div className=''>
                                            <div
                                                style={{ display: 'block' }}
                                                className='product__details__option__size'
                                            >
                                                <span style={{ minWidth: '100px' }}>Kích thước:</span>
                                                {sizes.map((item) => (
                                                    <label
                                                        className={selectedSize === item ? 'active' : ''}
                                                        onClick={() => handleSelectedSize(item)}
                                                        key={item}
                                                        htmlFor={item}
                                                    >
                                                        {item}
                                                        <input type='radio' id={item} />
                                                    </label>
                                                ))}
                                            </div>

                                            <div
                                                style={{ display: 'block' }}
                                                className='product__details__option__size mt-3'
                                            >
                                                <span style={{ minWidth: '100px' }}>Màu sắc:</span>
                                                {colors.map((item) => (
                                                    <label
                                                        className={selectedColor === item ? 'active' : ''}
                                                        onClick={() => handleSelectedColor(item)}
                                                        key={item}
                                                        htmlFor={item}
                                                    >
                                                        {item}
                                                        <input type='radio' id={item} />
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='product__details__cart__option mt-5'>
                                            <div className='quantity'>
                                                <div className='pro-qty'>
                                                    <span className='fa fa-angle-up dec qtybtn' />
                                                    <input
                                                        onChange={(e) => setQuantity(e.target.value)}
                                                        value={quantity}
                                                        type='text'
                                                    />
                                                    <span className='fa fa-angle-down inc qtybtn' />
                                                </div>
                                            </div>
                                            <p onClick={handleAddCart} className='primary-btn'>
                                                add to cart
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='product__details__content'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='product__details__tab'>
                                <ul style={{ justifyContent: 'unset' }} className='nav nav-tabs' role='tablist'>
                                    <li className='nav-item'>
                                        <a className='nav-link active' data-toggle='tab' href='#tabs-5' role='tab'>
                                            Chi tiết sản phẩm
                                        </a>
                                    </li>
                                </ul>
                                <div className='tab-content' style={{ marginBottom: '80px' }}>
                                    <p className='mt-5'>{product?.data.result.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
