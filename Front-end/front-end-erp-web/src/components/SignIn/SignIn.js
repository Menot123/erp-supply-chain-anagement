import React, { useState, useRef } from 'react'
import './SignIn.scss'
import logo from '../../assets/img/logo.png'
import { FaKey, FaUser } from 'react-icons/fa'
// import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux';
import { translate } from '../../redux-toolkit/slices/langSlice'
import { loginSuccess } from '../../redux-toolkit/slices/userSlice'
import { LANGUAGES } from '../../utils/constant'
import { useEffect } from 'react'
import { loginService } from '../../services/userServices'
import { useHistory } from 'react-router-dom'



const SignIn = (props) => {

    const intl = useIntl();
    const language = useSelector(state => state.language.value)
    const dispatch = useDispatch()
    const history = useHistory();

    const handleChangeLanguage = (key) => {
        dispatch(translate(key))
    }

    useEffect(() => {
        dispatch(translate(language))
    }, [language, dispatch])

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const usernameRef = useRef(null);
    const passwordRef = useRef(null)

    // Check Email Structure
    const validateEmail = (email) => {
        return email.match(
            /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/
        );
    };

    // Submit button login
    const handleLogin = async () => {
        try {
            // is username empty
            if (!username) {
                toast.error(<FormattedMessage id='login-form.toast-empty-email' />)
                if (usernameRef.current) {
                    usernameRef.current.focus();
                }
                return
            }

            // is username wrong
            if (!validateEmail(username)) {
                toast.error(<FormattedMessage id='login-form.toast-invalid-email' />)
                if (usernameRef.current) {
                    usernameRef.current.focus();
                }
                return
            }

            // is password empty
            if (!password) {
                toast.error(<FormattedMessage id='login-form.toast-empty-password' />)
                if (passwordRef.current) {
                    passwordRef.current.focus();
                }
                return
            }

            // is password less than 6 character
            if (password.length < 6) {
                toast.error(<FormattedMessage id='login-form.toast-invalid-password' />)
                if (passwordRef.current) {
                    passwordRef.current.focus();
                }
                return
            }

            let res = await loginService({ email: username, password: password })
            if (res.EC === 0) {
                dispatch(loginSuccess({ email: username, firstName: res.DT?.firstName, lastName: res.DT?.lastName }))
                history.push('/home')
            } else {
                toast.error(<FormattedMessage id='login-form.toast-login-failed' />)
            }

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
                            <span onClick={() => handleChangeLanguage('vi')} className={language === LANGUAGES.VI ? 'selected-language' : 'unselected-language'}>VI</span>
                            <span className='ms-2'></span>
                            <span onClick={() => handleChangeLanguage('en')} className={language === LANGUAGES.EN ? 'selected-language' : 'unselected-language'}>EN</span>
                        </div>

                        {/* Logo */}
                        <div className='logo text-center mt-5'>
                            <img src={logo} alt="Logo" />
                        </div>

                        {/* Login text */}
                        <div className="login-text text-center"><FormattedMessage id="login-form.title" /></div>

                        {/* Username */}
                        <div className="form-group pe-5 ps-5">
                            <label htmlFor="inputEmail" className="form-label"><FormattedMessage id="login-form.email-field" /></label>
                            <div className="input-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="inputEmail"
                                    placeholder={intl.formatMessage({ id: "login-form.email-field-placeholder" })}
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
                            <label htmlFor="inputPassword" className="form-label"><FormattedMessage id="login-form.password-field" /></label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    id="inputPassword"
                                    placeholder={intl.formatMessage({ id: "login-form.password-field-placeholder" })}
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
                                    <input onChange={() => setShowPassword((prev) => !prev)} type="checkbox" id="showPwd" /> <label htmlFor="showPwd"><FormattedMessage id="login-form.show-pass" /></label>
                                </div>
                                <div className=' mt-2'>
                                    <a href="/forgot-password"><FormattedMessage id="login-form.forgot-pass" /></a>
                                </div>
                            </div>

                        </div>

                        {/* Login button */}
                        <div className="login-button pe-5 ps-5 mb-5 mt-3">
                            <div className="button-div d-grid gap-2">
                                <button onClick={() => handleLogin()} className="btn" type="button" style={{ backgroundColor: '#714B67', color: 'white' }}><FormattedMessage id="login-form.btn-login" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SignIn