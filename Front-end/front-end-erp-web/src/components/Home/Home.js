import React from 'react'
import './Home.scss'
import { FaSearch } from "react-icons/fa";
import inventory from '../../../src/assets/img/inventory2.png'
import mua_hang from '../../../src/assets/img/mua_hang.png'
import ban_hang from '../../../src/assets/img/ban_hang.png'
import ke_toan from '../../../src/assets/img/ke_toan.png'
import tai_khoan from '../../../src/assets/img/account.png'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory } from 'react-router-dom'
import back_ground from '../../assets/img/background-light.svg'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


function Home() {

    const intl = useIntl();
    const history = useHistory()
    const department = useSelector(state => state.user?.department)

    const handleRedirectRoute = (userDepartment, url) => {
        if (department === 'admin') {
            history.push(url)
        } else if (department && department === userDepartment) {
            history.push(url)
        } else {
            toast.info("Bạn không thể truy cập chức năng này, Vui lòng kiểm tra lại!")
        }
    }

    return (
        <div className='wrapper-homepage' style={{ backgroundImage: `url(${back_ground})` }}>
            <div className='container home-container '>
                <div className='search-input-wrap '>
                    <div className='d-flex form-control item-search'>
                        <input type='text' className='input-search-text' placeholder={intl.formatMessage({ id: "homepage.search" })} />
                        <span className="icon-search"><FaSearch /></span>
                    </div>
                </div>

                <div className='row apps'>
                    <div onClick={() => handleRedirectRoute('D1', '/manage-inventory')} className='col-4 app-item'>
                        <div className='wrap-img-app'>
                            <img className='img-element-app' src={inventory} alt='img-element-app' />
                        </div>

                        <div className='content-item'>
                            <div className='wrap-title'>
                                <span className='title-app'><FormattedMessage id='homepage.item-inventory-name' /></span>
                            </div>

                            <div className='wrap-description'>
                                <span className='description-app'><FormattedMessage id='homepage.item-inventory-des' /></span>
                            </div>
                        </div>
                    </div>

                    <div onClick={() => handleRedirectRoute('D2', '/purchase')} className='col-4 app-item'>
                        <div className='wrap-img-app'>
                            <img className='img-element-app' src={mua_hang} alt='img-element-app' />
                        </div>

                        <div className='content-item'>
                            <div className='wrap-title'>
                                <span className='title-app'><FormattedMessage id='homepage.item-purchase-name' /></span>
                            </div>

                            <div className='wrap-description'>
                                <span className='description-app'><FormattedMessage id='homepage.item-purchase-des' /></span>
                            </div>
                        </div>
                    </div>

                    <div onClick={() => handleRedirectRoute('D3', '/sale-order')} className='col-4 app-item'>
                        <div className='wrap-img-app'>
                            <img className='img-element-app' src={ban_hang} alt='img-element-app' />
                        </div>

                        <div className='content-item'>
                            <div className='wrap-title'>
                                <span className='title-app'><FormattedMessage id='homepage.item-sales-name' /></span>
                            </div>

                            <div className='wrap-description'>
                                <span className='description-app'><FormattedMessage id='homepage.item-sales-des' /></span>
                            </div>
                        </div>
                    </div>

                    {/* <div onClick={() => handleRedirectRoute('D4', '/accounting')} className='col-4 app-item'>
                        <div className='wrap-img-app'>
                            <img className='img-element-app' src={ke_toan} alt='img-element-app' />
                        </div>

                        <div className='content-item'>
                            <div className='wrap-title'>
                                <span className='title-app'><FormattedMessage id='homepage.item-accounting-name' /></span>
                            </div>

                            <div className='wrap-description'>
                                <span className='description-app'><FormattedMessage id='homepage.item-accounting-des' /></span>
                            </div>
                        </div>
                    </div> */}

                    <div onClick={() => handleRedirectRoute('D5', '/manage-accounts')} className='col-4 app-item'>
                        <div className='wrap-img-app'>
                            <img className='img-element-app' src={tai_khoan} alt='img-element-app' />
                        </div>

                        <div className='content-item'>
                            <div className='wrap-title'>
                                <span className='title-app'><FormattedMessage id='homepage.item-account-name' /></span>
                            </div>

                            <div className='wrap-description'>
                                <span className='description-app'><FormattedMessage id='homepage.item-account-des' /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home