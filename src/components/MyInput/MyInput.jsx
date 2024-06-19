import { Fragment } from 'react'

export default function MyInput({ register = '', errors = '', type = 'text', label, name, placeholder = '' }) {
    const registerResult = register && name ? register(name) : null
    const errorResult = errors && name ? Boolean(errors[name]) : false
    return (
        <Fragment>
            <div>
                <label className='form-label' htmlFor={name}>
                    {label}
                </label>
            </div>
            <input
                {...registerResult}
                placeholder={placeholder}
                type={type}
                id={name}
                name={name}
                className={`form-control ${errorResult ? 'is-invalid' : ''}`}
            />
            {errorResult && (
                <span style={{ fontSize: '14px' }} className='text-danger'>
                    {errors[name].message}
                </span>
            )}
        </Fragment>
    )
}
