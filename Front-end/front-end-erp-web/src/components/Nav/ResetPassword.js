import React from 'react'
import { useDispatch } from 'react-redux';
// import { translate } from '../../redux-toolkit/slices/langSlice'
import { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { resetPasswordLoggedIn } from '../../services/userServices'
import { toast } from 'react-toastify';
import { FormattedMessage, useIntl } from 'react-intl'
// import { path } from '../../utils/constant'
import { logOut } from '../../redux-toolkit/slices/userSlice'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';


const ResetPassword = (props) => {

    const history = useHistory();
    const dispatch = useDispatch()
    const intl = useIntl();
    // const language = useSelector(state => state.language.value)
    const email = useSelector(state => state.user.email)


    const [showPassword, setShowPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const oldPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    // Reset Password
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
    const handleCloseResetPasswordModal = () => setShowResetPasswordModal(false);
    const handleShowResetPasswordModal = () => setShowResetPasswordModal(true);

    const handleChangePassword = async () => {
        // is old password empty
        if (!oldPassword) {
            toast.error(<FormattedMessage id='reset-password.toast-empty-old-password' />)
            if (oldPasswordRef.current) {
                oldPasswordRef.current.focus();
            }
            return
        }

        // is old password less than 6 character
        if (oldPassword.length < 6) {
            toast.error(<FormattedMessage id='reset-password.toast-invalid-old-password' />)
            if (oldPasswordRef.current) {
                oldPasswordRef.current.focus();
            }
            return
        }

        // is new password empty
        if (!newPassword) {
            toast.error(<FormattedMessage id='reset-password.toast-empty-new-password' />)
            if (newPasswordRef.current) {
                newPasswordRef.current.focus();
            }
            return
        }

        // is new password less than 6 character
        if (newPassword.length < 6) {
            toast.error(<FormattedMessage id='reset-password.toast-invalid-new-password' />)
            if (newPasswordRef.current) {
                newPasswordRef.current.focus();
            }
            return
        }

        if (newPassword === confirmPassword && newPassword !== '') {

            try {
                const res = await resetPasswordLoggedIn(email, oldPassword, newPassword)
                if (res.EC === 0) {
                    toast.success(<FormattedMessage id='reset-password.toast-change-password-success' />);
                    history.push('/login')
                    dispatch(logOut())
                }
                else {
                    toast.error(<FormattedMessage id='reset-password.toast-wrong-old-password' />)
                    if (oldPasswordRef.current) {
                        oldPasswordRef.current.focus();
                    }
                }
            } catch (error) {
                toast.error(<FormattedMessage id='reset-password.toast-wrong-old-password' />)
                if (oldPasswordRef.current) {
                    oldPasswordRef.current.focus();
                }
            }
        }
        else {
            toast.error(<FormattedMessage id='reset-password.toast-invalid-confirm-password' />)
            if (confirmPasswordRef.current) {
                confirmPasswordRef.current.focus();
            }
        }
    }

    return (
        <>
            <Modal
                show={showResetPasswordModal}
                onHide={handleCloseResetPasswordModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title><FormattedMessage id='reset-password.title' /></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="Form.OldPasswordControlInput">
                            <Form.Label><FormattedMessage id='reset-password.old-password-field' /></Form.Label>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder={intl.formatMessage({ id: "reset-password.old-password-field-placeholder" })}
                                value={oldPassword}
                                ref={oldPasswordRef}
                                onChange={(e) => setOldPassword(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Form.NewPasswordControlInput">
                            <Form.Label><FormattedMessage id='reset-password.new-password-field' /></Form.Label>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder={intl.formatMessage({ id: "reset-password.new-password-field-placeholder" })}
                                value={newPassword}
                                ref={newPasswordRef}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Form.ConfirmPasswordControlInput">
                            <Form.Label><FormattedMessage id='reset-password.confirm-password-field' /></Form.Label>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder={intl.formatMessage({ id: "reset-password.confirm-password-field-placeholder" })}
                                value={confirmPassword}
                                ref={confirmPasswordRef}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                        <div className='mt-2 float-end'>
                            <input onChange={() => setShowPassword((prev) => !prev)} id="showPwd" type="checkbox" /> <label htmlFor="showPwd"><FormattedMessage id='reset-password.show-pass' /></label>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseResetPasswordModal}>
                        <FormattedMessage id='reset-password.btn-close-tab' />
                    </Button>
                    <Button variant="primary" onClick={handleChangePassword}><FormattedMessage id='reset-password.btn-confirm' /></Button>
                </Modal.Footer>
            </Modal>

            <span onClick={() => handleShowResetPasswordModal()} className='item-app-user'><FormattedMessage id='reset-password.title' /></span>
        </>
    )
}

export default ResetPassword