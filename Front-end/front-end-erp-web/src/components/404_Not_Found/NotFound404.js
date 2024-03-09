import React, { useState, useRef, useEffect } from 'react'
import './NotFound404.scss'
import logo from '../../assets/img/logo.png'
import notFound404 from '../../assets/img/404_not_found.png'
import { FaKey, FaUser } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { directive } from '@babel/types'

const NotFound404 = (props) => {
    const history = useHistory();
    const handleNavigateToPage = (path) => {
        history.push(path);
    }
    return (
        <>
            <div className='not-found-container w-100'>
                <div className='not-found'>
                    <img
                        className='w-100 mt-3'
                        src={notFound404}
                        alt="not-found"
                    />
                    <button onClick={() => handleNavigateToPage('/')} className="btn" type="button" style={{ backgroundColor: '#714B67', color: 'white' }}>Back to Home</button>
                </div>
            </div>

        </>
    )
}

export default NotFound404;