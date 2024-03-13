import React from 'react'
import './Navigation.scss'
import { NavLink } from 'react-router-dom'
import { HiSquares2X2 } from "react-icons/hi2";
import { FaBell } from "react-icons/fa6";
import tempAvatar from './tempAva.jpeg'
import logo from '../../assets/img/logo.png'
import { FormattedMessage } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux';
import { translate } from '../../redux-toolkit/slices/langSlice'
import { logOut } from '../../redux-toolkit/slices/userSlice'
import { LANGUAGES } from '../../utils/constant'
import { useRef, useEffect, useState } from 'react'
import { logoutService } from '../../services/userServices'
import { toast } from 'react-toastify';


const Navigation = (props) => {

    const language = useSelector(state => state.language.value)
    const userLogin = useSelector(state => state.user.isLogin)
    const dispatch = useDispatch()
    const [isShowMenuApp, setIsShowMenuApp] = useState(false)
    const [isShowMenuUser, setIsShowMenuUser] = useState(false)
    const dropdownMenuRef = useRef(null);
    const dropdownUserRef = useRef(null);


    const handleChangeLanguage = (key) => {
        dispatch(translate(key))
    }

    const handleLogout = async () => {
        let res = await logoutService()
        if (res.EC !== 0) {
            toast.error(res.EM)
        } else {
            dispatch(logOut())
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

    return (
        <>
            <div className='wrap-navigation-home'>
                <nav className="navbar navbar-expand-lg navbar-light navigation-home">
                    <div className="container-fluid">
                        <div className="content-left d-flex align-items-center">
                            <div ref={dropdownMenuRef} onClick={() => handleShowMenuApp(isShowMenuApp)} className='icon-header'>
                                <HiSquares2X2 />
                            </div>
                            <div className='logo-page ms-2'>
                                <img className='img-avatar' src={logo} alt='img-logo-page' />
                            </div>
                            <NavLink className="navbar-brand ms-3 current-app" to='/'><FormattedMessage id='homepage.app' /></NavLink>
                        </div>

                        <div className="content-right d-flex align-items-center">
                            {userLogin ?
                                <>
                                    <div className='icon-notifications'>
                                        <FaBell />
                                    </div>
                                    <div ref={dropdownUserRef} onClick={() => handleShowMenuUser(isShowMenuUser)} className='d-flex user-profile align-items-center'>
                                        <div className='avatar-user '>
                                            <img className='img-avatar' src={tempAvatar} alt='avatar User' />
                                        </div>
                                        <span className='name-user'>Joan Felix</span>

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
                    <span className='item-app-menu'><FormattedMessage id='navigation.dropdown-app-inventory' /></span>
                    <span className='item-app-menu'><FormattedMessage id='navigation.dropdown-app-purchase' /></span>
                    <span className='item-app-menu'><FormattedMessage id='navigation.dropdown-app-sales' /></span>
                    <span className='item-app-menu'><FormattedMessage id='navigation.dropdown-app-accounting' /></span>
                    <span className='item-app-menu'><FormattedMessage id='navigation.dropdown-app-employees' /></span>
                </div>

                <div className={isShowMenuUser === false ? 'drop-down-user-apps d-none' : 'drop-down-user-apps'}>
                    <span className='item-app-user'><FormattedMessage id='navigation.dropdown-user-personal' /></span>
                    <span onClick={() => handleLogout()} className='item-app-user'><FormattedMessage id='navigation.dropdown-user-logout' /></span>
                </div>
            </div>
        </>
    )
}

export default Navigation