import React from 'react'
import './Navigation.scss'
import { NavLink } from 'react-router-dom'

const Navigation = (props) => {
    return (
        <div className="topnav">
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/news">News</NavLink>
            <NavLink to="/about">About</NavLink>
        </div>
    )
}

export default Navigation