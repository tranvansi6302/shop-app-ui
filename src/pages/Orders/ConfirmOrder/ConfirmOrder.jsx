import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import orderApi from '../../../apis/order.api'
import MainLayout from '../../../layouts/MainLayout'
import { formatCurrencyVND } from '../../../utils/format'
import { queryClient } from '../../../main'

const checkoutSchema = yup.object({
    fullName: yup.string().required('Họ tên bắt buộc nhập'),
    phone: yup
        .string()
        .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ')
        .required('Số điện thoại bắt buộc nhập'),
    address: yup.string().required('Địa chỉ bắt buộc nhập'),
    note: yup.string()
})

function ConfirmOrder() {
    const location = useLocation()
    const navigate = useNavigate()
    const { updatedQuantities } = location.state

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(checkoutSchema)
    })

    const confirmOrderMutation = useMutation({
        mutationFn: (data) => orderApi.confirmOrder(data)
    })

    const onSubmit = (data) => {
        // Chuẩn bị dữ liệu gửi đi
        const formData = {
            note: data.note,
            address: data.address,
            fullname: data.fullName,
            phone: data.phone,
            confirm_orders: updatedQuantities.map((item) => ({
                order_detail_id: item.order_detail_id,
                quantity: item.quantity,
                price: item.price
            }))
        }
        confirmOrderMutation.mutate(formData, {
            onSuccess: () => {
                toast.success('Đặt hàng thành công')
                queryClient.invalidateQueries({
                    queryKey: ['carts']
                })
                navigate('/')
            },
            onError: (error) => {
                toast.error(error.response.data.message)
            }
        })
    }

    const calculateTotalPrice = () => {
        let totalPrice = 0
        updatedQuantities.forEach((item) => {
            totalPrice += item.quantity * item.price
        })
        return totalPrice
    }

    return (
        <MainLayout>
            <section className='checkout spad'>
                <div className='container'>
                    <div className='checkout__form'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='row'>
                                <div className='col-lg-8 col-md-6'>
                                    <h6 className='checkout__title'>Đơn hàng</h6>

                                    <div className='checkout__input'>
                                        <p style={{ margin: '0' }}>Họ tên</p>
                                        <Controller
                                            name='fullName'
                                            control={control}
                                            defaultValue='' // Giá trị mặc định là ''
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type='text'
                                                    className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                                                />
                                            )}
                                        />
                                        {errors.fullName && (
                                            <div className='invalid-feedback'>{errors.fullName.message}</div>
                                        )}
                                    </div>

                                    <div style={{ padding: '0' }} className='checkout__input'>
                                        <p style={{ margin: '0' }}>Số điện thoại</p>
                                        <Controller
                                            name='phone'
                                            control={control}
                                            defaultValue='' // Giá trị mặc định là ''
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type='text'
                                                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                                />
                                            )}
                                        />
                                        {errors.phone && <div className='invalid-feedback'>{errors.phone.message}</div>}
                                    </div>

                                    <div style={{ padding: '0' }} className='checkout__input'>
                                        <p style={{ margin: '0' }}>Địa chỉ</p>
                                        <Controller
                                            name='address'
                                            control={control}
                                            defaultValue='' // Giá trị mặc định là ''
                                            render={({ field }) => (
                                                <textarea
                                                    {...field}
                                                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                                />
                                            )}
                                        />
                                        {errors.address && (
                                            <div className='invalid-feedback'>{errors.address.message}</div>
                                        )}
                                    </div>

                                    <div style={{ padding: '0' }} className='checkout__input'>
                                        <p style={{ margin: '0' }}>Ghi chú (nếu có)</p>
                                        <Controller
                                            name='note'
                                            control={control}
                                            render={({ field }) => <textarea {...field} className='form-control' />}
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-4 col-md-6'>
                                    <div className='checkout__order'>
                                        <h4 className='order__title'>Thông tin đơn hàng</h4>
                                        <div className='checkout__order__products'>Sản phẩm</div>
                                        <ul className='checkout__total__products'>
                                            {updatedQuantities.map((item, index) => (
                                                <li key={index}>
                                                    <span className='confirm-order-name'>
                                                        {`${index + 1}. ${item.name}`}
                                                    </span>
                                                    <span>{formatCurrencyVND(item.quantity * item.price)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <ul className='checkout__total__all'>
                                            <li>
                                                Tổng tiền cần thanh toán{' '}
                                                <span>{formatCurrencyVND(calculateTotalPrice())}</span>
                                            </li>
                                        </ul>

                                        <button type='submit' className='site-btn'>
                                            XÁC NHẬN
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default ConfirmOrder
