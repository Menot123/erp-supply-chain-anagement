import React, { useState, useRef, useEffect } from 'react'
import './SignIn.scss'
import logo from '../../assets/img/logo.png'
import { FaKey, FaUser } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

const SignIn = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory()

    const defaultIsValidInput = {
        usernameValid: true,
        passwordValid: true,
    }

    const [isValidInput, setIsValidInput] = useState(defaultIsValidInput)
    const usernameRef = useRef(null);
    const passwordRef = useRef(null)

    // Check Email Structure
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    // Submit button login
    const handleLogin = async () => {

        // is username empty
        if (!username) {
            setIsValidInput({ ...defaultIsValidInput, usernameValid: false })
            alert('Please enter your username')
            // toast.error('Please enter your username')
            if (usernameRef.current) {
                usernameRef.current.focus();
            }
            return
        }

        // is username wrong
        if (!validateEmail(username)) {
            setIsValidInput({ ...defaultIsValidInput, usernameValid: false })
            alert('This email is invalid')
            // toast.error('Please enter your username')
            if (usernameRef.current) {
                usernameRef.current.focus();
            }
            return
        }

        // is password empty
        if (!password) {
            setIsValidInput({ ...defaultIsValidInput, passwordValid: false })
            alert('Please enter your password')
            // toast.error('Please enter your password')
            if (passwordRef.current) {
                passwordRef.current.focus();
            }
            return
        }

        // is password less than 6 character
        if (password.length < 6) {
            setIsValidInput({ ...defaultIsValidInput, passwordValid: false })
            alert('Password must be at least 6 characters')
            // toast.error('Please enter your password')
            if (passwordRef.current) {
                passwordRef.current.focus();
            }
            return
        }

        try {

        } catch (error) {
            console.error(error);
        }
    };

    // Enter Login
    const handleEnterLogin = (e) => {
        if (e.charCode === 13 && e.code === "Enter") {
            handleLogin()
        }
    }

    return (
        <div className="login-container">
            <div className='container'>
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="login-box col-md-6">
                        {/* Translate */}
                        <div className='text-end me-5 mt-4'>
                            <span className='unselected-language'>VI</span>
                            <span className='ms-2'></span>
                            <span className='selected-language'>EN</span>
                        </div>

                        {/* Logo */}
                        <div className='logo text-center mt-5'>
                            <img src={logo} alt="Logo" />
                        </div>

                        {/* Login text */}
                        <div className="login-text text-center">Login into your account</div>

                        {/* Username */}
                        <div className="form-group pe-5 ps-5">
                            <label htmlFor="inputEmail" className="form-label">Email address</label>
                            <div className="input-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="inputEmail"
                                    placeholder='Enter your email address'
                                    ref={usernameRef}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <span className="icon input-group-text">
                                        <i> <FaUser /></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="form-group pe-5 ps-5 mb-5 mt-3">
                            <label htmlFor="inputPassword" className="form-label">Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    id="inputPassword"
                                    placeholder='Enter your password'
                                    ref={passwordRef}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={(e) => handleEnterLogin(e)}
                                />
                                <div className="input-group-append">
                                    <span className="icon input-group-text">
                                        <i> <FaKey /></i>
                                    </span>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div className='mt-2'>
                                    <input onChange={() => setShowPassword((prev) => !prev)} type="checkbox" id="showPwd" /> <label htmlFor="showPwd">Show Password</label>
                                </div>
                                <div className=' mt-2'>
                                    <a href="#">Forgot password?</a>
                                </div>
                            </div>

                        </div>

                        {/* Login button */}
                        <div className="login-button pe-5 ps-5 mb-5 mt-3">
                            <div className="button-div d-grid gap-2">
                                <button onClick={() => handleLogin()} className="btn" type="button" style={{ backgroundColor: '#714B67', color: 'white' }}>Login Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SignIn