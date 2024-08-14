import React from 'react'
import './Navigation.scss'
import './NavigationManageEmployee.scss'
import './NavigationManageInventory.scss'
import './NavigationManageAccounting.scss'
import './NavigationPurchase.scss'
import './NavigationSales.scss'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import { HiSquares2X2 } from "react-icons/hi2";
import { FaBell } from "react-icons/fa6";
import logo from '../../assets/img/logo.png'
import logo_manage_employees from '../../assets/img/employee_app.png'
import logo_manage_inventory from '../../assets/img/inventory_app.png'
import logo_manage_accounting from '../../assets/img/accounting_app.png'
import logo_sales from '../../assets/img/logo_sales.png'
import logo_purchase from '../../assets/img/purchase.png'
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
import userDefault from '../../assets/img/userDefault.png'

const Navigation = (props) => {

    const language = useSelector(state => state.language.value)
    const userLogin = useSelector(state => state.user ? .isLogin)
    const firstName = useSelector(state => state.user ? .firstName)
    const lastName = useSelector(state => state.user ? .lastName)
    const avatar = useSelector(state => state.user ? .avatar)
    const location = useLocation();
    const history = useHistory()
    const url = location.pathname;
    const nameUser = useSelector(state => state.user ? .lastName) ? ? ""
    const idUser = useSelector(state => state.user ? .id) ? ? ""

    const dispatch = useDispatch()
    const [isShowMenuApp, setIsShowMenuApp] = useState(false)
    const [isShowMenuUser, setIsShowMenuUser] = useState(false)
    const [isShowMenuOrder, setIsShowMenuOrder] = useState(false)
    const dropdownMenuRef = useRef(null);
    const dropdownUserRef = useRef(null);
    const dropdownOrderRef = useRef(null);


    const handleChangeLanguage = (key) => {
        Promise.all([dispatch(translate(key)), dispatch(changeLanguage(key))])
    }

    const handleLogout = async() => {
        let res = await logoutService()
        if (res.EC !== 0) {
            toast.error(res.EM)
        } else {
            dispatch(logOut())
            localStorage.removeItem('persist:root')
            history.push('/login')
        }
    }

    const handleCustomerLogout = async() => {
        let res = await logoutService()
        if (res.EC !== 0) {
            toast.error(res.EM)
        } else {
            dispatch(logOut())
            localStorage.removeItem('persist:root')
            history.push('/customer/login')
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
            if (dropdownOrderRef.current && !dropdownOrderRef.current.contains(event.target)) {
                setIsShowMenuOrder(false)
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

    const handleShowMenuOrder = (status) => {
        setIsShowMenuOrder(!status)
    }

    const redirectDropdownApp = (path) => {
        history.push(path)
    }

    const handleShowModalProfile = () => {
        dispatch(openModalProfile())
    }

    return ( <
        >
        <
        div className = 'wrap-navigation-home' >
        <
        nav className = "navbar navbar-expand-lg navbar-light navigation-home" >
        <
        div className = "container-fluid" >
        <
        div className = "content-left d-flex align-items-center" > {!url.startsWith(path.URL_CUSTOMER) &&
            <
            div ref = { dropdownMenuRef }
            onClick = {
                () => handleShowMenuApp(isShowMenuApp) }
            className = 'icon-header' >
            <
            HiSquares2X2 / >
            <
            /div>
        }

        {
            url.includes(path.MANAGE_EMPLOYEES) ?
                <
                >
                <
                div className = 'logo-employee-page ms-4' >
                <
                img className = 'img-logo-employee-app'
            src = { logo_manage_employees }
            alt = 'img-logo-page' / >
                <
                /div> <
                NavLink className = "navbar-brand ms-1 current-app"
            to = '/manage-accounts' > < FormattedMessage id = 'nav.manage-account-app' / > < /NavLink> <
                div className = 'nav-manage-employees' >
                <
                NavLink className = 'nav-link-me-employees'
            to = '/manage-accounts' > < FormattedMessage id = 'nav.manage-account-app' / > < /NavLink> <
                NavLink className = 'nav-link-me-department'
            to = '/manage-accounts/department' > < FormattedMessage id = 'nav.manage-account-department' / > < /NavLink> <
                /div> <
                />:
                ''
        }

        {
            url.startsWith(path.URL_CUSTOMER) ?
                <
                >
                <
                div className = 'logo-sales-page' >
                <
                img className = 'img-logo-sales-app'
            src = { logo_sales }
            alt = 'img-logo-sale' / >
                <
                /div> <
                NavLink className = "navbar-brand ms-1 current-app"
            to = '/customer' > < FormattedMessage id = 'new_quote.customer' / > < /NavLink> <
                />:
                ''
        }

        {
            url.includes(path.MANAGE_INVENTORY) ?
                <
                >
                <
                div className = 'logo-inventory-page ms-4' >
                <
                img className = 'img-logo-inventory-app'
            src = { logo_manage_inventory }
            alt = 'img-logo-page' / >
                <
                /div> <
                NavLink className = "navbar-brand ms-1 current-app"
            to = '/manage-inventory' > < FormattedMessage id = 'nav.manage-inventory-app' / > < /NavLink> <
                div className = 'nav-manage-inventory' >
                <
                NavLink className = 'nav-link-me-inventory'
            to = '/manage-inventory' > < FormattedMessage id = 'nav.manage-inventory-overview' / > < /NavLink> <
                NavLink className = 'nav-link-me-products'
            to = '/manage-inventory/products' > < FormattedMessage id = 'nav.manage-inventory-product' / > < /NavLink> <
                NavLink className = 'nav-link-me-products'
            to = '/manage-inventory/input-warehouse' > < FormattedMessage id = 'nav.manage-inventory-input-warehouse' / > < /NavLink> <
                NavLink className = 'nav-link-me-products'
            to = '/manage-inventory/output-warehouse' > < FormattedMessage id = 'nav.manage-inventory-output-warehouse' / > < /NavLink> <
                NavLink className = 'nav-link-me-products'
            to = '/manage-inventory/warehouse' > Tồn kho < /NavLink> <
                /div> <
                />:
                ''
        } {
            url.includes(path.SALE_ORDER) ?
                <
                >
                <
                div className = 'logo-sales-page ms-4' >
                <
                img className = 'img-logo-sales-app'
            src = { logo_sales }
            alt = 'img-logo-sale' / >
                <
                /div> <
                NavLink className = "navbar-brand ms-1 current-app"
            to = '/sale-order' > < FormattedMessage id = 'sales-nav-name-app' / > < /NavLink> <
                div className = 'nav-sales' >
                <
                div className = 'nav-link-me-sales'
            ref = { dropdownOrderRef }
            onClick = {
                    () => handleShowMenuOrder(isShowMenuOrder) } > < FormattedMessage id = 'sales-nav-title-orders' / > < /div> <
                NavLink className = 'nav-link-me-sales'
            to = '/sale-order/products' > < FormattedMessage id = 'sales-nav-title-products' / > < /NavLink> <
                NavLink className = 'nav-link-me-sales'
            to = '/sale-order/statistics' > < FormattedMessage id = 'sales-nav-title-reporting' / > < /NavLink> <
                /div> <
                />:
                ''
        } {
            url.includes(path.MANAGE_PURCHASE) ?
                <
                >
                <
                div className = 'logo-purchase-page ms-4' >
                <
                img className = 'img-logo-purchase-app'
            src = { logo_purchase }
            alt = 'img-logo-purchase' / >
                <
                /div> <
                NavLink className = "navbar-brand ms-1 current-app"
            to = '/manage-purchase' > Mua hàng < /NavLink> <
                div className = 'nav-purchase' >
                <
                NavLink className = 'nav-link-me-purchase'
            to = '/manage-purchase' > Yêu cầu báo giá < /NavLink> <
                NavLink className = 'nav-link-me-purchase'
            to = '/manage-purchase/orders' > Đơn mua hàng < /NavLink> <
                NavLink className = 'nav-link-me-purchase'
            to = '/manage-purchase/products' > Sản phẩm < /NavLink> <
                NavLink className = 'nav-link-me-purchase'
            to = '/manage-purchase/providers' > Nhà cung cấp < /NavLink> <
                /div> <
                />:
                ''
        } {
            url.includes(path.MANAGE_ACCOUNTING) ?
                <
                >
                <
                div className = 'logo-accounting-page ms-4' >
                <
                img className = 'img-logo-accounting-app'
            src = { logo_manage_accounting }
            alt = 'img-logo-page' / >
                <
                /div> <
                NavLink className = "navbar-brand ms-1 current-app"
            to = '/accounting' > Kế toán < /NavLink> <
                div className = 'nav-manage-accounting' >
                <
                NavLink className = 'nav-link-me-accounting'
            to = '/accounting' > Trang chủ < /NavLink> <
                NavLink className = 'nav-link-me-sub-accounting'
            to = '/accounting/customer' > Khách hàng < /NavLink> <
                NavLink className = 'nav-link-me-sub-accounting'
            to = '/accounting/provider' > Nhà cung cấp < /NavLink> <
                NavLink className = 'nav-link-me-sub-accounting'
            to = '/accounting/accounting' > Kế toán < /NavLink> <
                NavLink className = 'nav-link-me-sub-accounting'
            to = '/accounting/report' > Thống kê < /NavLink> <
                /div> <
                />:
                ''
        } {
            url === path.HOME || url === path.HOME2 ?
                <
                >
                <
                div className = 'logo-page ms-2' >
                <
                img className = 'img-avatar'
            src = { logo }
            alt = 'img-logo-page' / >
                <
                /div> <
                NavLink className = "navbar-brand ms-3 current-app"
            to = '/' > < FormattedMessage id = 'homepage.app' / > < /NavLink> <
                />:
                ''
        }

        <
        /div>

        <
        div className = "content-right d-flex align-items-center" > {
            userLogin ?
            <
            > {
                (url.includes(path.URL_CUSTOMER) || (idUser.toString()).includes("CU")) ?
                <
                >
                <
                span > Xin chào,
                < /span> <
                div ref = { dropdownUserRef }
                onClick = {
                    () => handleShowMenuUser(isShowMenuUser) }
                className = 'd-flex customer-profile align-items-center' >
                <
                span className = 'name-user' > { nameUser } < /span> <
                /div> <
                /> :
                    <
                    >
                    <
                    div className = 'icon-notifications' > { /* <FaBell /> */ } <
                    /div> <
                    div ref = { dropdownUserRef }
                onClick = {
                    () => handleShowMenuUser(isShowMenuUser) }
                className = 'd-flex user-profile align-items-center' >
                <
                div className = 'avatar-user ' >
                <
                img className = 'img-avatar'
                src = { avatar ? ? userDefault }
                alt = 'avatar User' / >
                <
                /div> <
                span className = 'name-user' > {
                    language === LANGUAGES.VI ? (lastName === 'NULL' ? '' : firstName) + ' ' + lastName :
                        firstName + ' ' + (lastName === 'NULL' ? '' : lastName)
                } < /span>

                <
                /div> <
                />
            } <
            /> :
                <
                NavLink className = "navbar-brand ms-3 current-app text-login"
            to = '/login' > < FormattedMessage id = 'navigation.button-login' / > < /NavLink>
        }

        {
            (!url.includes(path.URL_CUSTOMER) && !(idUser.toString()).includes("CU")) &&
            <
            div className = 'languages' >
                <
                span onClick = {
                    () => handleChangeLanguage('vi') }
            className = { language === LANGUAGES.VI ? 'language-vi active' : 'language-vi' } > VN < /span> <
                span onClick = {
                    () => handleChangeLanguage('en') }
            className = { language === LANGUAGES.EN ? 'language-en active' : 'language-en' } > EN < /span> <
                /div>

        } <
        /div>

        <
        /div> <
        /nav > <
        div className = { isShowMenuApp === false ? 'drop-down-menu-apps d-none' : 'drop-down-menu-apps' } >
        <
        span onClick = {
            () => redirectDropdownApp('/manage-inventory') }
        className = 'item-app-menu' > < FormattedMessage id = 'navigation.dropdown-app-inventory' / > < /span> { /* <span onClick={() => redirectDropdownApp('/accounting')} className='item-app-menu'>Kế toán</span> */ } <
        span onClick = {
            () => redirectDropdownApp('/manage-purchase') }
        className = 'item-app-menu' > < FormattedMessage id = 'navigation.dropdown-app-purchase' / > < /span> <
        span onClick = {
            () => redirectDropdownApp('/sale-order') }
        className = 'item-app-menu' > < FormattedMessage id = 'navigation.dropdown-app-sales' / > < /span> { /* <span onClick={() => redirectDropdownApp()} className='item-app-menu'><FormattedMessage id='navigation.dropdown-app-accounting' /></span> */ } <
        span onClick = {
            () => redirectDropdownApp('/manage-accounts') }
        className = 'item-app-menu' > < FormattedMessage id = 'navigation.dropdown-app-employees' / > < /span> <
        span onClick = {
            () => redirectDropdownApp('/home') }
        className = 'item-app-menu' > < FormattedMessage id = 'navigation.dropdown-app-home' / > < /span> <
        /div>

        <
        div className = { isShowMenuUser === false ? 'drop-down-user-apps d-none' : 'drop-down-user-apps' } > {
            (!url.includes(path.URL_CUSTOMER) && !(idUser.toString()).includes("CU")) ?
            <
            >
            <
            span onClick = {
                () => handleShowModalProfile() }
            className = 'item-app-user' > < FormattedMessage id = 'navigation.dropdown-user-personal' / > < /span> { /* <span onClick={() => handleShowResetPasswordModal()} className='item-app-user'>Đổi mật khẩu</span> */ } <
            ResetPassword / >
            <
            span onClick = {
                () => handleLogout() }
            className = 'item-app-user' > < FormattedMessage id = 'navigation.dropdown-user-logout' / > < /span> <
            /> :
                <
                span onClick = {
                    () => handleCustomerLogout() }
            className = 'item-app-user' > < FormattedMessage id = 'navigation.dropdown-user-logout' / > < /span>


        }

        <
        /div>

        <
        div className = { isShowMenuOrder === false ? 'drop-down-menu-order d-none' : 'drop-down-menu-order' } >
        <
        span onClick = {
            () => redirectDropdownApp('/sale-order') }
        className = 'item-order-menu' > Báo giá < /span> <
        span onClick = {
            () => redirectDropdownApp('/sale-order/invoices') }
        className = 'item-order-menu' > Đơn hàng < /span> <
        span onClick = {
            () => redirectDropdownApp('/sale-order/customers') }
        className = 'item-order-menu' > Khách hàng < /span> <
        /div>

        <
        /div> <
        />
    )
}

export default Navigation