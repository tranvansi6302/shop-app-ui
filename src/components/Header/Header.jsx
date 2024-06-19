import { Link } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import pathConfig from '../../configs/path.config'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
export default function Header() {
    const { profile, isAuthenticated } = useContext(AppContext)
    return (
        <header className='header'>
            <div className='header__top'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6 col-md-7'>
                            <div className='header__top__left'>
                                <p>Free shipping, 30-day return or refund guarantee.</p>
                            </div>
                        </div>
                        <div className='col-lg-6 col-md-5'>
                            <div className='header__top__right'>
                                <div className='header__top__links'>
                                    {isAuthenticated ? (
                                        <p className='text-primary m-0'>{profile.fullName}</p>
                                    ) : (
                                        <Link to={pathConfig.login}>Đăng nhập</Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-3 col-md-3'>
                        <div className='header__logo'>
                            <a href='./index.html'>
                                <img src={logo} alt='logo' />
                            </a>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6'>
                        <nav className='header__menu mobile-menu'>
                            <ul>
                                <li>
                                    <a href='./index.html'>Home</a>
                                </li>
                                <li className='active'>
                                    <a href='./shop.html'>Shop</a>
                                </li>
                                <li>
                                    <a href='#'>Pages</a>
                                    <ul className='dropdown'>
                                        <li>
                                            <a href='./about.html'>About Us</a>
                                        </li>
                                        <li>
                                            <a href='./shop-details.html'>Shop Details</a>
                                        </li>
                                        <li>
                                            <a href='./shopping-cart.html'>Shopping Cart</a>
                                        </li>
                                        <li>
                                            <a href='./checkout.html'>Check Out</a>
                                        </li>
                                        <li>
                                            <a href='./blog-details.html'>Blog Details</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href='./blog.html'>Blog</a>
                                </li>
                                <li>
                                    <a href='./contact.html'>Contacts</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className='canvas__open'>
                    <i className='fa fa-bars' />
                </div>
            </div>
        </header>
    )
}
