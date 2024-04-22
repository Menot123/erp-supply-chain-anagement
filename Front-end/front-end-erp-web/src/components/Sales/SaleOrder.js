import React from 'react'
import './SaleOrder.scss'
import SalesHeader from './SalesHeader/SalesHeader'
import { FaTimes } from "react-icons/fa";
import first_step from '../../assets/img/step1.png'
import third_step from '../../assets/img/step3.png'
import four_step from '../../assets/img/step4.png'
import img_file from '../../assets/img/smiling_face.svg'
import { FormattedMessage } from 'react-intl'
import DataCompanyModal from './Modal/DataCompanyModal';
import { useState } from 'react'
import { FaCheck } from "react-icons/fa";
import { ModalConfirmQuote } from './Modal/ModalConfirmQuote';

function SaleOrder() {

    const [showModalDataCompany, setShowModalDataCompany] = useState(false)
    const [isDoneStep1, setIsDoneStep1] = useState(false)
    const [isDoneStep2, setIsDoneStep2] = useState(false)
    const [showModalStep2, setShowModalStep2] = useState(false)

    const handleShowModalStep1 = () => {
        setShowModalDataCompany(true)
    }

    const handleCloseModalStep1 = () => {
        setShowModalDataCompany(false)
    }

    const handleShowModalStep2 = () => {
        setShowModalStep2(true)
    }

    const handleCloseModalStep2 = () => {
        setShowModalStep2(false)
    }


    return (
        <>
            <SalesHeader />
            <DataCompanyModal
                show={showModalDataCompany}
                handleClose={handleCloseModalStep1}
                isCreated={setIsDoneStep1}
            />
            <ModalConfirmQuote
                show={showModalStep2}
                handleClose={handleCloseModalStep2}
                isDone={setIsDoneStep2}
            />

            <div className='wrapper-config-data'>
                <div className='config-data'>
                    <div className='icon-close'>
                        <FaTimes className='hover-item' />
                    </div>
                    <div className='steps'>
                        <div className='data-company-step'>
                            <div className='first-line'>

                            </div>
                            <div className='img-first-step'>
                                <img className='element-logo-first-step' src={first_step} alt='element-logo-first-step' />
                            </div>
                            <div className='first-step-content'>
                                <span onClick={() => handleShowModalStep1()} className='main-content'>
                                    <FormattedMessage id="sales-title-step1" />
                                </span>
                                <span className='sub-content'>
                                    <FormattedMessage id="sales-sub-title-step1" />
                                </span>
                                {isDoneStep1
                                    ?
                                    <div className='btn-well-done'>
                                        <FaCheck color="green" />
                                        <span onClick={() => handleShowModalStep1()} className='text-well-done hover-item'><FormattedMessage id="sales-btn-doneStep" /></span>
                                    </div>
                                    :
                                    <button onClick={() => handleShowModalStep1()} className='btn btn-step1'><FormattedMessage id="sales-btn-step1" /></button>
                                }

                            </div>
                        </div>

                        <div className='data-document-step'>
                            <div className='first-line'>

                            </div>
                            <div className='img-first-step'>
                                <img className='element-logo-first-step' src={third_step} alt='element-logo-first-step' />
                            </div>
                            <div className='first-step-content'>
                                <span onClick={handleShowModalStep2} className='main-content'>
                                    <FormattedMessage id="sales-title-step2" />
                                </span>
                                <span className='sub-content'>
                                    <FormattedMessage id="sales-sub-title-step2" />
                                </span>
                                {isDoneStep2
                                    ?
                                    <div className='btn-well-done'>
                                        <FaCheck color="green" />
                                        <span onClick={() => handleShowModalStep2()} className='text-well-done hover-item'><FormattedMessage id="sales-btn-doneStep" /></span>
                                    </div>
                                    :
                                    <button onClick={() => handleShowModalStep2()} className='btn btn-step2'><FormattedMessage id="sales-btn-step2" /></button>
                                }
                            </div>
                        </div>

                        <div className='data-quote-step'>
                            <div className='final-line'>

                            </div>
                            <div className='img-first-step'>
                                <img className='element-logo-first-step' src={four_step} alt='element-logo-first-step' />
                            </div>
                            <div className='first-step-content'>
                                <span className='main-content'>
                                    <FormattedMessage id="sales-title-step3" />
                                </span>
                                <span className='sub-content'>
                                    <FormattedMessage id="sales-sub-title-step3" />
                                </span>
                                <button className='btn btn-step3'><FormattedMessage id="sales-btn-step3" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='wrapper-message-first-step'>
                <div className='img-file'>
                    <img className='element-img-file' src={img_file} alt='element-img-file' />
                </div>
                <div className='main-title'>
                    <span className='main-text'><FormattedMessage id="sales-main-message" /></span>
                </div>
                <div className='sub-title'>
                    <span className='sub-text'><FormattedMessage id="sales-sub-message" /></span>
                </div>
            </div>
        </>
    )
}

export default SaleOrder