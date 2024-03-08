import React from 'react'
import './Navigation.scss'
import { NavLink } from 'react-router-dom'
import { HiSquares2X2 } from "react-icons/hi2";
import { FaBell } from "react-icons/fa6";

const Navigation = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light navigation-home">
            <div className="container-fluid">
                <div className="content-left d-flex justify-content-center">
                    <div className='icon-header'>
                        <HiSquares2X2 />
                    </div>
                    <NavLink className="navbar-brand ms-3" to='/'>Ứng dụng</NavLink>
                </div>

                <div className="content-left">
                </div>

            </div>
        </nav>
    )
}

export default Navigation