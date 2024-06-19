import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom' // Import useHistory
import orderApi from '../../apis/order.api'
import { formatCurrencyVND } from '../../utils/format'
import { toast } from 'react-toastify'
import { queryClient } from '../../main'

export default function ListCart() {
    const navigate = useNavigate() // Khởi tạo useHistory

    const {
        data: carts,
        isLoading,
        refetch
    } = useQuery({
        queryKey: ['carts'],
        queryFn: () => orderApi.getCarts(),
        placeholderData: keepPreviousData
    })

    const [quantities, setQuantities] = useState({})

    const updateQuantityMutation = useMutation({
        mutationFn: (data) => orderApi.updateQuantity(data),
        onSuccess: () => {
            refetch() // Gọi lại API để lấy lại dữ liệu giỏ hàng mới nhất sau khi cập nhật
        },
        onError: (error) => {
            console.error('Error updating quantity:', error)
            // Xử lý lỗi (nếu cần)
        }
    })

    // Sử dụng useEffect để lấy dữ liệu ban đầu từ DB và cập nhật state quantities
    useEffect(() => {
        if (carts?.data?.result) {
            const initialQuantities = {}
            carts.data.result.forEach((item) => {
                initialQuantities[item.id] = item.quantity // Lấy số lượng ban đầu từ db
            })
            setQuantities(initialQuantities)
        }
    }, [carts])

    const decreaseQuantity = (itemId) => {
        if (quantities[itemId] > 0) {
            const updatedQuantity = quantities[itemId] - 1 // Giảm số lượng mới
            setQuantities((prevState) => ({
                ...prevState,
                [itemId]: updatedQuantity
            }))
            const data = {
                orderId: carts?.data?.result[0].orderId,
                orderDetailId: itemId,
                quantity: updatedQuantity // Sử dụng giá trị mới đã cập nhật
            }

            updateQuantityMutation.mutate(data)
        }
    }

    const increaseQuantity = (itemId) => {
        const updatedQuantity = (quantities[itemId] || 0) + 1 // Tăng số lượng mới
        setQuantities((prevState) => ({
            ...prevState,
            [itemId]: updatedQuantity
        }))
        const data = {
            orderId: carts?.data?.result[0].orderId,
            orderDetailId: itemId,
            quantity: updatedQuantity // Sử dụng giá trị mới đã cập nhật
        }

        updateQuantityMutation.mutate(data)
    }

    const calculateTotalPrice = () => {
        let totalPrice = 0
        carts?.data?.result.forEach((item) => {
            const price = item.product_items.price
            const quantity = quantities[item.id] || 0
            totalPrice += price * quantity
        })
        return formatCurrencyVND(totalPrice)
    }

    const handleOrderConfirm = () => {
        // Chuẩn bị dữ liệu cần truyền qua trang mới
        const updatedQuantities = carts?.data.result.map((item) => ({
            order_detail_id: item.id,
            quantity: quantities[item.id], // Lấy số lượng từ state quantities
            price: item.product_items.price,
            name: item.product_items.product.name
        }))

        // Điều hướng đến trang mới và truyền dữ liệu
        navigate('/confirm-order', { state: { updatedQuantities } })
    }

    const deleteCartItemMutation = useMutation({
        mutationFn: (data) => orderApi.deleteCartItem(data)
    })

    const handleDeleteCartItem = (id) => {
        const data = {
            orderDetailId: id
        }
        console.log(id)
        console.log(data)
        deleteCartItemMutation.mutate(data, {
            onSuccess: () => {
                toast.success('Xóa thành công')
                queryClient.invalidateQueries({
                    queryKey: ['carts']
                })
            },
            onError: (error) => {
                toast.error(error.response.data.message)
            }
        })
    }
    if (isLoading) return <div>Loading...</div>
    return (
        <section className='shopping-cart spad'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-8'>
                        <div className='shopping__cart__table'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th>Số lượng</th>
                                        <th>Thành tiền</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {carts?.data.result?.map((item) => (
                                        <tr key={item.id}>
                                            <td className='product__cart__item'>
                                                <div className='product__cart__item__pic'>
                                                    <img
                                                        width='80px'
                                                        src={item?.product_items?.product?.images[0]?.url}
                                                        alt='product'
                                                    />
                                                </div>
                                                <div style={{ paddingTop: 0 }} className='product__cart__item__text'>
                                                    <h6>{item?.product_items?.product?.name}</h6>
                                                    <h5>{formatCurrencyVND(item?.product_items?.price)}</h5>
                                                    <p>
                                                        <span>Size: {item?.product_items?.size}</span>
                                                        <span className='ml-2'>
                                                            Color: {item?.product_items?.color}
                                                        </span>
                                                    </p>
                                                </div>
                                            </td>
                                            <td className='quantity__item'>
                                                <div className='quantity'>
                                                    <div
                                                        style={{ display: 'flex', alignItems: 'center' }}
                                                        className='pro-qty-2'
                                                    >
                                                        <FaMinus
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => decreaseQuantity(item.id)}
                                                        />
                                                        <span style={{ margin: '0 10px' }}>
                                                            {quantities[item.id] || 0}
                                                        </span>
                                                        <FaPlus
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => increaseQuantity(item.id)}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='cart__price'>
                                                {formatCurrencyVND(
                                                    (quantities[item.id] || 0) * item?.product_items?.price
                                                )}
                                            </td>
                                            <td
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleDeleteCartItem(item.id)}
                                                className='cart__close'
                                            >
                                                <i className='fa fa-close' />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className='cart__discount'>
                            <h6>Mã giảm giá</h6>
                            <form action='#'>
                                <input type='text' placeholder='Mã giảm giá' />
                                <button type='submit'>Áp dụng</button>
                            </form>
                        </div>
                        <div className='cart__total'>
                            <h6>Thông tin giỏ hàng</h6>
                            <ul>
                                <li>
                                    Tổng số tiền <span>{calculateTotalPrice()}</span>
                                </li>
                            </ul>
                            <button
                                onClick={handleOrderConfirm}
                                style={{ width: '100%' }}
                                className='primary-btn text-white'
                            >
                                Đặt hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
