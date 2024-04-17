import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify';

function PrivateRoutes(props) {

    let isAuthenticated = useSelector(state => state.user.isLogin)

    if (isAuthenticated === true) {
        return (
            <Route path={props.path} component={props.component} />
        )
    } else {
        if (!toast.isActive('loginToast')) {
            toast.info('Vui lòng đăng nhập để tiếp tục', { toastId: 'loginToast' });
        }
        return <Redirect to='/login'></Redirect>
    }
}

export default PrivateRoutes