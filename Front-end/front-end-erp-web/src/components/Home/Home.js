import React from 'react'
import './Home.scss'
import { FaSearch } from "react-icons/fa";
import inventory from '../../../src/assets/img/inventory2.png'
import mua_hang from '../../../src/assets/img/mua_hang.png'
import ban_hang from '../../../src/assets/img/ban_hang.png'
import ke_toan from '../../../src/assets/img/ke_toan.png'
import tai_khoan from '../../../src/assets/img/account.png'
import { useIntl, FormattedMessage } from 'react-intl'


function Home() {

    const intl = useIntl();

    return (
        <div className='wrapper-homepage'>
            <div className='container home-container '>
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
                                <span className='title-app'><FormattedMessage id='homepage.item-inventory-name' /></span>
                            </div>

                            <div className='wrap-description'>
                                <span className='description-app'><FormattedMessage id='homepage.item-inventory-des' /></span>
                            </div>
                        </div>


                    </div>

                    <div className='col-4 app-item'>
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

                    <div className='col-4 app-item'>
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

                    <div className='col-4 app-item'>
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
                    </div>

                    <div className='col-4 app-item'>
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