import React from 'react'
import './Navigation.scss'
import { NavLink } from 'react-router-dom'
import { HiSquares2X2 } from "react-icons/hi2";
import { FaBell } from "react-icons/fa6";
import tempAvatar from './tempAva.jpeg'

const Navigation = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light navigation-home">
            <div className="container-fluid">
                <div className="content-left d-flex align-items-center">
                    <div className='icon-header'>
                        <HiSquares2X2 />
                    </div>
                    <NavLink className="navbar-brand ms-3 current-app" to='/'>Ứng dụng</NavLink>
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
                        <span className='language-vi active'>VN</span>
                        <span className='language-en'>EN</span>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default Navigation