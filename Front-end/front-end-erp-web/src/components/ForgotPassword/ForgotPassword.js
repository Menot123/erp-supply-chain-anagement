import React, { useState, useRef } from 'react'
import './ForgotPassword.scss'
import logo from '../../assets/img/logo.png'
import { FaUser, FaKey, FaCheckSquare } from 'react-icons/fa'
// import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux';
import { translate } from '../../redux-toolkit/slices/langSlice'
import { changeLanguage } from '../../redux-toolkit/slices/userSlice'
import { LANGUAGES } from '../../utils/constant'
import { useEffect } from 'react'
import { getOTPCode, checkingOTP, resetPassword } from '../../services/userServices'
import { useHistory } from 'react-router-dom'



const ForgotPassword = (props) => {

    const intl = useIntl();
    const language = useSelector(state => state.language.value)
    const dispatch = useDispatch()
    const history = useHistory();

    const handleChangeLanguage = (key) => {
        dispatch(translate(key))
        dispatch(changeLanguage(key))
    }

    useEffect(() => {
        dispatch(translate(language))
    }, [language, dispatch])

    // Loading
    const [isLoading, setIsLoading] = useState(false);

    // Email Step
    const [username, setUsername] = useState("");
    const [isCorrectEmail, setIsCorrectEmail] = useState(false);

    // OTP Step
    const [OTP, setOTP] = useState("");
    const [countdown, setCountdown] = useState(60);

    // Reset Password Step
    const [isCorrectOTP, setIsCorrectOTP] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const usernameRef = useRef(null);
    const otpRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);



    // Check Email Structure
    const validateEmail = (email) => {
        return email.match(
            /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/
        );
    };

    // Encode Email Address
    const encodeEmail = (email) => {
        var atIndex = email.indexOf('@');
        var dotIndex = email.lastIndexOf('.');
        var username = email.substring(0, atIndex);
        var domain = email.substring(atIndex + 1, dotIndex);

        // Mã hóa ký tự trong phần username
        var encodedUsername = username.substring(0, 4) + '****';

        return encodedUsername + '@' + domain + '.' + email.substring(dotIndex + 1);
    }

    // Sending OTP Code
    const sendOTP = async () => {
        setIsLoading(true);
        const res = await getOTPCode(username)
        setIsLoading(false);
        // is username empty
        if (!username) {
            toast.error(<FormattedMessage id='forgot-password.toast-empty-email' />)
            if (usernameRef.current) {
                usernameRef.current.focus();
            }
            return
        }
        // is username wrong
        if (!validateEmail(username)) {
            toast.error(<FormattedMessage id='forgot-password.toast-invalid-email' />)
            if (usernameRef.current) {
                usernameRef.current.focus();
            }
            return
        }
        // sending otp to email
        if (res.EC === 0) {
            setIsCorrectEmail(true)
            setCountdown(60);

            // Countdown from 60 to 0
            const interval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
            // Set end countdown
            setTimeout(() => {
                clearInterval(interval);
            }, 60000);
        }
        else {
            toast.error(<FormattedMessage id='forgot-password.toast-invalid-email' />)
        }
    }

    // Validate OTP
    const validateOTP = async () => {
        setIsLoading(true);
        const res = await checkingOTP(username, OTP);
        setIsLoading(false);
        // is otp empty
        if (!OTP) {
            toast.error(<FormattedMessage id='forgot-password.toast-empty-otp' />)
            if (otpRef.current) {
                otpRef.current.focus();
            }
            return
        }
        // checking otp
        if (res.EC === 0) {
            setIsCorrectOTP(true)
        }
        else {
            toast.error(<FormattedMessage id='forgot-password.toast-invalid-otp' />)
        }
    }

    // Reset Password
    const changePassword = async () => {
        // is password empty
        if (!password) {
            toast.error(<FormattedMessage id='forgot-password.toast-empty-password' />)
            if (passwordRef.current) {
                passwordRef.current.focus();
            }
            return
        }

        // is password less than 6 character
        if (password.length < 6) {
            toast.error(<FormattedMessage id='forgot-password.toast-invalid-password' />)
            if (passwordRef.current) {
                passwordRef.current.focus();
            }
            return
        }
        if (password === confirmPassword && password !== '') {
            const res = await resetPassword(username, password)
            if (res.EC === 0) {
                toast.success(<FormattedMessage id='forgot-password.toast-change-password-success' />);
                setTimeout(() => {
                    setIsCorrectOTP(false)
                    setOTP("")
                    history.push('/login')
                }, 3000)
            }
            else {
                toast.error(<FormattedMessage id='forgot-password.toast-invalid-confirm-password' />)
                if (confirmPasswordRef.current) {
                    confirmPasswordRef.current.focus();
                }
            }
        }
        else {
            toast.error(<FormattedMessage id='forgot-password.toast-invalid-confirm-password' />)
            if (confirmPasswordRef.current) {
                confirmPasswordRef.current.focus();
            }
        }
    }

    // Enter Forgot Password
    const handleEnterForgotPassword = (e) => {
        if (e.charCode === 13 && e.code === "Enter") {
            sendOTP()
        }
    }

    // Enter Confirm OTP
    // const handleEnterConfirmOTP = (e) => {
    //     if (e.charCode === 13 && e.code === "Enter") {
    //         validateOTP()
    //     }
    // }

    // Enter Reset Password
    const handleEnterResetPassword = (e) => {
        if (e.charCode === 13 && e.code === "Enter") {
            changePassword()
        }
    }

    return (
        <div className="forgot-password-container">
            <div className='container'>
                {isLoading
                    ?
                    <div className="loading-overlay">
                        <div className="loading-spinner"></div>
                    </div>
                    : ''
                }
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="forgot-password-box col-md-6">
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

                        {isCorrectOTP && isCorrectEmail
                            ?
                            <>
                                {/* Reset Password */}
                                <div className="forgot-password-text text-center"><FormattedMessage id="forgot-password.reset-password-title" /></div>

                                <div className="form-group pe-5 ps-5">

                                    <label htmlFor="inputPassword" className="form-label"><FormattedMessage id="forgot-password.new-password-field" /></label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputPassword"
                                            placeholder={intl.formatMessage({ id: "forgot-password.new-password-field-placeholder" })}
                                            ref={passwordRef}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onKeyPress={(e) => confirmPasswordRef.current.focus()}
                                        />
                                        <div className="input-group-append">
                                            <span className="icon input-group-text">
                                                <i> <FaKey /></i>
                                            </span>
                                        </div>
                                    </div>

                                    <label htmlFor="inputConfirmPassword" className="form-label"><FormattedMessage id="forgot-password.confirm-password-field" /></label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputConfirmPassword"
                                            placeholder={intl.formatMessage({ id: "forgot-password.confirm-password-field-placeholder" })}
                                            ref={confirmPasswordRef}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            onKeyPress={(e) => handleEnterResetPassword(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <span className="icon input-group-text">
                                                <i> <FaKey /></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="forgot-password-button pe-5 ps-5 mb-5 mt-3">
                                    <div className="button-div d-grid gap-2">
                                        <button onClick={() => changePassword()} className="btn" type="button" style={{ backgroundColor: '#714B67', color: 'white' }}><FormattedMessage id="forgot-password.btn-reset-password" /></button>
                                    </div>
                                </div>
                            </>
                            :
                            isCorrectEmail
                                ?
                                <>
                                    {/* Checking OTP */}

                                    <div className="forgot-password-text text-center"><FormattedMessage id="forgot-password.confirm-otp-title" /></div>

                                    <div className="form-group pe-5 ps-5">
                                        <div className='fst-italic text-bold text-success text-end'><FormattedMessage id="forgot-password.confirm-otp-msg" /></div>
                                        <div className='text-end text-bold'><span className='text-success'><FormattedMessage id="forgot-password.confirm-otp-msg-email" /> </span> <span className='text-primary'>{encodeEmail(username)}</span></div>

                                        <label htmlFor="inputOTP" className="form-label"><FormattedMessage id="forgot-password.otp-field" /></label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputOTP"
                                                placeholder={intl.formatMessage({ id: "forgot-password.otp-field-placeholder" })}
                                                ref={otpRef}
                                                value={OTP}
                                                onChange={(e) => setOTP(e.target.value)}
                                                onKeyPress={(e) => handleEnterForgotPassword(e.target.value)}
                                            />
                                            <div className="input-group-append">
                                                <span className="icon input-group-text">
                                                    <i> <FaCheckSquare /></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            {countdown === 0
                                                ? <span onClick={() => sendOTP()} className='text-primary' style={{ cursor: 'pointer' }}><FormattedMessage id="forgot-password.resend-otp" /></span>
                                                : <span><FormattedMessage id="forgot-password.resend-otp-after" /> {countdown}</span>
                                            }

                                        </div>
                                    </div>

                                    <div className="forgot-password-button pe-5 ps-5 mb-5 mt-3">
                                        <div className="button-div d-grid gap-2">
                                            <button onClick={() => validateOTP()} className="btn" type="button" style={{ backgroundColor: '#714B67', color: 'white' }}><FormattedMessage id="forgot-password.btn-confirm-otp" /></button>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    {/* Forgot Password */}
                                    <div className="forgot-password-text text-center"><FormattedMessage id="forgot-password.title" /></div>

                                    <div className="form-group pe-5 ps-5">
                                        <label htmlFor="inputEmail" className="form-label"><FormattedMessage id="forgot-password.email-field" /></label>
                                        <div className="input-group">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="inputEmail"
                                                placeholder={intl.formatMessage({ id: "forgot-password.email-field-placeholder" })}
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

                                    <div className="forgot-password-button pe-5 ps-5 mb-5 mt-3">
                                        <div className="button-div d-grid gap-2">
                                            <button onClick={() => sendOTP()} className="btn" type="button" style={{ backgroundColor: '#714B67', color: 'white' }}><FormattedMessage id="forgot-password.btn-get-otp" /></button>
                                        </div>
                                    </div>
                                </>
                        }

                    </div>
                </div>
            </div>

        </div >
    )
}

export default ForgotPassword