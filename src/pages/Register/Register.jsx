import { useForm } from 'react-hook-form'
import MyInput from '../../components/MyInput/MyInput'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { useMutation } from '@tanstack/react-query'
import authApi from '../../apis/auth.api'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import pathConfig from '../../configs/path.config'

const registerSchema = yup.object({
    fullname: yup.string().required('Họ tên bắt buộc nhập').trim(),
    email: yup.string().email('Email chưa đúng định dạng').required('Email bắt buộc nhập').trim(),
    password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu bắt buộc nhập').trim(),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
        .required('Nhập lại mật khẩu bắt buộc nhập')
        .trim()
})

export default function Register() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            fullname: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        resolver: yupResolver(registerSchema)
    })

    const registerMutation = useMutation({
        mutationFn: (data) => authApi.register(data)
    })

    const onSubmit = handleSubmit((data) => {
        const finalData = omit(data, 'confirmPassword')
        registerMutation.mutate(finalData, {
            onSuccess: (data) => {
                toast.success(data.data.message)
                navigate(pathConfig.login)
            },
            onError: (error) => {
                toast.error(error.response.data.message)
            }
        })
    })
    return (
        <div className='container h-100'>
            <div className='row d-flex justify-content-center align-items-center h-100'>
                <div className='col-lg-12 col-xl-11'>
                    <div className='card text-black' style={{ borderRadius: 25 }}>
                        <div className='card-body p-md-5'>
                            <div className='row justify-content-center'>
                                <div className='col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1'>
                                    <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>Đăng ký tài khoản</p>
                                    <form onSubmit={onSubmit} className='mx-1 mx-md-4'>
                                        <div className='d-flex flex-row align-items-center mb-4'>
                                            <div className='form-outline flex-fill mb-0'>
                                                <MyInput
                                                    register={register}
                                                    errors={errors}
                                                    name='fullname'
                                                    label='Họ tên'
                                                />
                                            </div>
                                        </div>
                                        <div className='d-flex flex-row align-items-center mb-4'>
                                            <div className='form-outline flex-fill mb-0'>
                                                <MyInput
                                                    register={register}
                                                    errors={errors}
                                                    name='email'
                                                    label='Email'
                                                />
                                            </div>
                                        </div>
                                        <div className='d-flex flex-row align-items-center mb-4'>
                                            <div className='form-outline flex-fill mb-0'>
                                                <div className='form-outline flex-fill mb-0'>
                                                    <MyInput
                                                        register={register}
                                                        errors={errors}
                                                        name='password'
                                                        type='password'
                                                        label='Mật khẩu'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-flex flex-row align-items-center mb-4'>
                                            <div className='form-outline flex-fill mb-0'>
                                                <MyInput
                                                    register={register}
                                                    errors={errors}
                                                    type='password'
                                                    name='confirmPassword'
                                                    label='Nhập lại mật khẩu'
                                                />
                                            </div>
                                        </div>

                                        <div className='d-flex justify-content-center mx-4 mb-4 mb-lg-5'>
                                            <button type='submit' className='btn btn-primary btn-lg'>
                                                Đăng ký
                                            </button>
                                        </div>
                                        <p className='text-center'>
                                            Bạn đã có tài khoản?
                                            <Link style={{ color: '#174ad6' }} to={pathConfig.login}>
                                                Đăng nhập
                                            </Link>
                                        </p>
                                    </form>
                                </div>
                                <div className='col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2'>
                                    <img
                                        src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp'
                                        className='img-fluid'
                                        alt='Sample image'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
