import React from 'react'
import './Home.scss'
import { toast } from 'react-toastify'
import { FaSearch } from "react-icons/fa";
import inventory from '../../../src/assets/img/inventory2.png'
import mua_hang from '../../../src/assets/img/mua_hang.png'
import ban_hang from '../../../src/assets/img/ban_hang.png'
import ke_toan from '../../../src/assets/img/ke_toan.png'
import tai_khoan from '../../../src/assets/img/account.png'
import { useSelector, useDispatch } from 'react-redux';
import { translate } from '../../redux-toolkit/slices/langSlice'
import { FormattedMessage, useIntl } from 'react-intl'


function Home() {

    const intl = useIntl();
    const language = useSelector(state => state.language.value)
    const dispatch = useDispatch()

    const handleToast = () => {
        toast.success('Hi guys')
    }


    const handleChangeLanguage = () => {
        dispatch(translate('en'))
    }

    return (
        <div className='wrapper-homepage'>
            <div className='container home-container '>
                <h3><FormattedMessage id='homepage.language' />{language}</h3>
                <button onClick={() => handleChangeLanguage()}>Change language</button>
                <div className='search-input-wrap '>
                    <div className='d-flex form-control item-search'>
                        <input type='text' className='input-search-text' placeholder={intl.formatMessage({ id: "homepage.search" })} />
                        <span className="icon-search"><FaSearch /></span>
                    </div>
                </div>

                <div className='row apps'>
                    <div className='col-4 app-item'>
                        <div className='wrap-img-app'>
                            <img className='img-element-app' src={inventory} alt='img-element-app' />
                        </div>

                        <div className='content-item'>
                            <div className='wrap-title'>
                                <span className='title-app'>Quản lý Kho </span>
                            </div>

                            <div className='wrap-description'>
                                <span className='description-app'>Quản lý kho của bạn và các hoạt động logistics</span>
                            </div>
                        </div>


                    </div>

                    <div className='col-4 app-item'>
                        <div className='wrap-img-app'>
                            <img className='img-element-app' src={mua_hang} alt='img-element-app' />
                        </div>

                        <div className='content-item'>
                            <div className='wrap-title'>
                                <span className='title-app'>Mua hàng</span>
                            </div>

                            <div className='wrap-description'>
                                <span className='description-app'>Đơn mua hàng, nhà cung cấp và các thỏa thuận</span>
                            </div>
                        </div>


                    </div>

                    <div className='col-4 app-item'>
                        <div className='wrap-img-app'>
                            <img className='img-element-app' src={ban_hang} alt='img-element-app' />
                        </div>

                        <div className='content-item'>
                            <div className='wrap-title'>
                                <span className='title-app'>Bán hàng</span>
                            </div>

                            <div className='wrap-description'>
                                <span className='description-app'>Từ báo giá tới hóa đơn</span>
                            </div>
                        </div>


                    </div>

                    <div className='col-4 app-item'>
                        <div className='wrap-img-app'>
                            <img className='img-element-app' src={ke_toan} alt='img-element-app' />
                        </div>

                        <div className='content-item'>
                            <div className='wrap-title'>
                                <span className='title-app'>Kế toán</span>
                            </div>

                            <div className='wrap-description'>
                                <span className='description-app'>Quản lý kế toán và phân tích tài chính</span>
                            </div>
                        </div>
                    </div>

                    <div className='col-4 app-item'>
                        <div className='wrap-img-app'>
                            <img className='img-element-app' src={tai_khoan} alt='img-element-app' />
                        </div>

                        <div className='content-item'>
                            <div className='wrap-title'>
                                <span className='title-app'>Quản lý tài khoản</span>
                            </div>

                            <div className='wrap-description'>
                                <span className='description-app'>Tổng hợp chung thông tin nhân viên và tài khoản</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home