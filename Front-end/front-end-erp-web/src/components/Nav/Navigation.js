import React from 'react'
import './Navigation.scss'
import './NavigationManageEmployee.scss'
import './NavigationManageInventory.scss'
import './NavigationSales.scss'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import { HiSquares2X2 } from "react-icons/hi2";
import { FaBell } from "react-icons/fa6";
import logo from '../../assets/img/logo.png'
import logo_manage_employees from '../../assets/img/employee_app.png'
import logo_manage_inventory from '../../assets/img/inventory_app.png'
import logo_sales from '../../assets/img/logo_sales.png'
import { FormattedMessage } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux';
import { translate } from '../../redux-toolkit/slices/langSlice'
import { logOut, changeLanguage } from '../../redux-toolkit/slices/userSlice'
import { LANGUAGES } from '../../utils/constant'
import { useRef, useEffect, useState } from 'react'
import { logoutService } from '../../services/userServices'
import { toast } from 'react-toastify';
import { path } from '../../utils/constant'
import ResetPassword from './ResetPassword';
import { openModalProfile } from '../../redux-toolkit/slices/userSlice'

const Navigation = (props) => {

    const language = useSelector(state => state.language.value)
    const userLogin = useSelector(state => state.user.isLogin)
    const firstName = useSelector(state => state.user.firstName)
    const lastName = useSelector(state => state.user.lastName)
    const avatar = useSelector(state => state.user.avatar)
    const location = useLocation();
    const history = useHistory()
    const url = location.pathname;
    const dispatch = useDispatch()
    const [isShowMenuApp, setIsShowMenuApp] = useState(false)
    const [isShowMenuUser, setIsShowMenuUser] = useState(false)
    const dropdownMenuRef = useRef(null);
    const dropdownUserRef = useRef(null);


    const handleChangeLanguage = (key) => {
        Promise.all([dispatch(translate(key)), dispatch(changeLanguage(key))])
    }

    const handleLogout = async () => {
        let res = await logoutService()
        if (res.EC !== 0) {
            toast.error(res.EM)
        } else {
            dispatch(logOut())
            localStorage.removeItem('persist:root')
            history.push('/login')
        }
    }


    useEffect(() => {
        dispatch(translate(language))

        // Handle hidden dropdown when click outside
        const handleClickOutside = (event) => {
            if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target)) {
                setIsShowMenuApp(false);
            }
            if (dropdownUserRef.current && !dropdownUserRef.current.contains(event.target)) {
                setIsShowMenuUser(false)
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [language, dispatch])


    const handleShowMenuApp = (status) => {
        setIsShowMenuApp(!status)
    }

    const handleShowMenuUser = (status) => {
        setIsShowMenuUser(!status)
    }

    const redirectDropdownApp = (path) => {
        history.push(path)
    }

    const handleShowModalProfile = () => {
        dispatch(openModalProfile())
    }

    return (
        <>
            <div className='wrap-navigation-home'>
                <nav className="navbar navbar-expand-lg navbar-light navigation-home">
                    <div className="container-fluid">
                        <div className="content-left d-flex align-items-center">
                            <div ref={dropdownMenuRef} onClick={() => handleShowMenuApp(isShowMenuApp)} className='icon-header'>
                                <HiSquares2X2 />
                            </div>

                            {url.includes(path.MANAGE_EMPLOYEES) ?
                                <>
                                    <div className='logo-employee-page ms-4'>
                                        <img className='img-logo-employee-app' src={logo_manage_employees} alt='img-logo-page' />
                                    </div>
                                    <NavLink className="navbar-brand ms-1 current-app" to='/manage-accounts'><FormattedMessage id='nav.manage-account-app' /></NavLink>
                                    <div className='nav-manage-employees'>
                                        <NavLink className='nav-link-me-employees' to='/manage-accounts'><FormattedMessage id='nav.manage-account-app' /></NavLink>
                                        <NavLink className='nav-link-me-department' to='/manage-accounts/department'><FormattedMessage id='nav.manage-account-department' /></NavLink>
                                    </div>
                                </>
                                :
                                ''
                            }
                            {url.includes(path.MANAGE_INVENTORY) ?
                                <>
                                    <div className='logo-inventory-page ms-4'>
                                        <img className='img-logo-inventory-app' src={logo_manage_inventory} alt='img-logo-page' />
                                    </div>
                                    <NavLink className="navbar-brand ms-1 current-app" to='/manage-inventory'><FormattedMessage id='nav.manage-inventory-app' /></NavLink>
                                    <div className='nav-manage-inventory'>
                                        <NavLink className='nav-link-me-inventory' to='/manage-inventory'><FormattedMessage id='nav.manage-inventory-overview' /></NavLink>
                                        <NavLink className='nav-link-me-products' to='/manage-inventory/products'><FormattedMessage id='nav.manage-inventory-product' /></NavLink>
                                        <NavLink className='nav-link-me-products' to='/manage-inventory/input-warehouse'><FormattedMessage id='nav.manage-inventory-input-warehouse' /></NavLink>
                                        <NavLink className='nav-link-me-products' to='/manage-inventory/output-warehouse'><FormattedMessage id='nav.manage-inventory-output-warehouse' /></NavLink>
                                    </div>
                                </>
                                :
                                ''
                            }
                            {url.includes(path.SALE_ORDER) ?
                                <>
                                    <div className='logo-sales-page ms-4'>
                                        <img className='img-logo-sales-app' src={logo_sales} alt='img-logo-sale' />
                                    </div>
                                    <NavLink className="navbar-brand ms-1 current-app" to='/sale-order'><FormattedMessage id='sales-nav-name-app' /></NavLink>
                                    <div className='nav-sales'>
                                        <NavLink className='nav-link-me-sales' to='/manage-inventory'><FormattedMessage id='sales-nav-title-orders' /></NavLink>
                                        <NavLink className='nav-link-me-sales' to='/manage-inventory'><FormattedMessage id='sales-nav-title-to-invoices' /></NavLink>
                                        <NavLink className='nav-link-me-sales' to='/manage-inventory'><FormattedMessage id='sales-nav-title-products' /></NavLink>
                                        <NavLink className='nav-link-me-sales' to='/manage-inventory'><FormattedMessage id='sales-nav-title-reporting' /></NavLink>
                                    </div>
                                </>
                                :
                                ''
                            }
                            {url === path.HOME || url === path.HOME2 ?
                                <>
                                    <div className='logo-page ms-2'>
                                        <img className='img-avatar' src={logo} alt='img-logo-page' />
                                    </div>
                                    <NavLink className="navbar-brand ms-3 current-app" to='/'><FormattedMessage id='homepage.app' /></NavLink>
                                </>
                                :
                                ''
                            }

                        </div>

                        <div className="content-right d-flex align-items-center">
                            {userLogin ?
                                <>
                                    <div className='icon-notifications'>
                                        <FaBell />
                                    </div>
                                    <div ref={dropdownUserRef} onClick={() => handleShowMenuUser(isShowMenuUser)} className='d-flex user-profile align-items-center'>
                                        <div className='avatar-user '>
                                            <img className='img-avatar' src={avatar ? avatar : ''} alt='avatar User' />
                                        </div>
                                        <span className='name-user'>{language === LANGUAGES.VI ? (lastName === 'NULL' ? '' : lastName) + ' ' + firstName
                                            :
                                            firstName + ' ' + (lastName === 'NULL' ? '' : lastName)
                                        }</span>

                                    </div>
                                </>
                                :
                                <NavLink className="navbar-brand ms-3 current-app text-login" to='/login'><FormattedMessage id='navigation.button-login' /></NavLink>
                            }

                            <div className='languages'>
                                <span onClick={() => handleChangeLanguage('vi')} className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>VN</span>
                                <span onClick={() => handleChangeLanguage('en')} className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>EN</span>
                            </div>
                        </div>

                    </div>
                </nav >
                <div className={isShowMenuApp === false ? 'drop-down-menu-apps d-none' : 'drop-down-menu-apps'}>
                    <span onClick={() => redirectDropdownApp('/manage-inventory')} className='item-app-menu'><FormattedMessage id='navigation.dropdown-app-inventory' /></span>
                    <span onClick={() => redirectDropdownApp()} className='item-app-menu'><FormattedMessage id='navigation.dropdown-app-purchase' /></span>
                    <span onClick={() => redirectDropdownApp('/sale-order')} className='item-app-menu'><FormattedMessage id='navigation.dropdown-app-sales' /></span>
                    <span onClick={() => redirectDropdownApp()} className='item-app-menu'><FormattedMessage id='navigation.dropdown-app-accounting' /></span>
                    <span onClick={() => redirectDropdownApp('/manage-accounts')} className='item-app-menu'><FormattedMessage id='navigation.dropdown-app-employees' /></span>
                    <span onClick={() => redirectDropdownApp('/home')} className='item-app-menu'><FormattedMessage id='navigation.dropdown-app-home' /></span>
                </div>

                <div className={isShowMenuUser === false ? 'drop-down-user-apps d-none' : 'drop-down-user-apps'}>
                    <span onClick={() => handleShowModalProfile()} className='item-app-user'><FormattedMessage id='navigation.dropdown-user-personal' /></span>
                    {/* <span onClick={() => handleShowResetPasswordModal()} className='item-app-user'>Đổi mật khẩu</span> */}
                    <ResetPassword />
                    <span onClick={() => handleLogout()} className='item-app-user'><FormattedMessage id='navigation.dropdown-user-logout' /></span>
                </div>

            </div>
        </>
    )
}

export default Navigation