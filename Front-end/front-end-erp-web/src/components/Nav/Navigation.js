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
import { LANGUAGES } from '../../utils/constant'
import { useEffect } from 'react'


const Navigation = (props) => {

    const language = useSelector(state => state.language.value)
    const dispatch = useDispatch()

    const handleChangeLanguage = (key) => {
        dispatch(translate(key))
    }

    useEffect(() => {
        dispatch(translate(language))
    }, [language])

    return (
        <nav className="navbar navbar-expand-lg navbar-light navigation-home">
            <div className="container-fluid">
                <div className="content-left d-flex align-items-center">
                    <div className='icon-header'>
                        <HiSquares2X2 />
                    </div>
                    <div className='logo-page'>
                        <img className='img-avatar' src={logo} alt='img-logo-page' />
                    </div>
                    <NavLink className="navbar-brand ms-3 current-app" to='/'><FormattedMessage id='homepage.app' /></NavLink>
                </div>

                <div className="content-right d-flex align-items-center">
                    <div className='icon-notifications'>
                        <FaBell />
                    </div>
                    <div className='d-flex user-profile align-items-center'>
                        <div className='avatar-user '>
                            <img className='img-avatar' src={tempAvatar} alt='avatar User' />
                        </div>
                        <span className='name-user'>Long Shadow</span>

                    </div>
                    <div className='languages'>
                        <span onClick={() => handleChangeLanguage('vi')} className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>VN</span>
                        <span onClick={() => handleChangeLanguage('en')} className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>EN</span>
                    </div>
                </div>

            </div>
        </nav >
    )
}

export default Navigation