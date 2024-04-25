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
import Form from 'react-bootstrap/Form';
import { IoTimeOutline } from "react-icons/io5";

function SaleOrder() {

    const [showModalDataCompany, setShowModalDataCompany] = useState(false)
    const [isDoneStep1, setIsDoneStep1] = useState(false)
    const [isDoneStep2, setIsDoneStep2] = useState(false)
    const [showModalStep2, setShowModalStep2] = useState(false)
    const [isHaveQuote, setIsHaveQuote] = useState(true)
    const [selectedItems, setSelectedItems] = useState([])

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

    const handleChangeCheckBox = (e) => {
        let isChecked = e.target?.checked
        let itemChecked = e?.target?.value
        if (isChecked) {
            setSelectedItems([...selectedItems, itemChecked])
        } else {
            setSelectedItems((prevState) => {
                return prevState.filter((id) => {
                    return id !== itemChecked
                })
            })
        }
    }

    const handleCheckAll = () => {
        if (2 === +selectedItems.length) {
            setSelectedItems([])
        } else {
            setSelectedItems(['quote1', 'quote2'])
        }
    }

    return (

        <>
            <SalesHeader />
            {!isHaveQuote ?
                <div>
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
                </div>
                :
                <table className="table table-striped table-hover table-quotes">
                    <thead>
                        <tr>
                            <th scope="col">
                                <Form.Check // prettier-ignore
                                    type={'checkbox'}
                                    id={`quote1}`}
                                    label={`Số`}
                                    onChange={handleCheckAll}
                                />
                            </th>
                            <th scope="col">Ngày tạo</th>
                            <th scope="col">Khách hàng</th>
                            <th scope="col">Nhân viên kinh doanh</th>
                            <th scope="col">Hoạt động</th>
                            <th scope="col">Tổng</th>
                            <th scope="col">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='hover-item'>
                            <th scope="row">
                                <Form.Check // prettier-ignore
                                    type={'checkbox'}
                                    id={`quote1}`}
                                    value={'quote1'}
                                    label={`S00001`}
                                    onChange={(e) => handleChangeCheckBox(e)}
                                    checked={selectedItems.includes('quote1')}
                                />
                            </th>
                            <td>22/04/2024 20:30:20</td>
                            <td>Huỳnh Khánh Duy</td>
                            <td>Huỳnh Khánh Duy</td>
                            <td><IoTimeOutline className='icon-activities' /></td>
                            <td><span className='cost'>1.458 ₫</span></td>
                            <td> <span className='status-quote'>Báo giá đã gửi</span> </td>
                        </tr>

                        <tr className='hover-item'>
                            <th scope="row">
                                <Form.Check // prettier-ignore
                                    type={'checkbox'}
                                    id={`quote1}`}
                                    value={'quote2'}
                                    label={`S00002`}
                                    onChange={(e) => handleChangeCheckBox(e)}
                                    checked={selectedItems.includes('quote2')}
                                />
                            </th>
                            <td>22/04/2024 20:30:20</td>
                            <td>Huỳnh Khánh Duy</td>
                            <td>Huỳnh Khánh Duy</td>
                            <td><IoTimeOutline className='icon-activities' /></td>
                            <td><span className='cost'>1.458 ₫</span></td>
                            <td> <span className='status-quote'>Báo giá đã gửi</span> </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr >
                            <th scope="row">

                            </th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><span className='total-cost' data-tooltip="Tổng đã gồm thuế" title>999.458 ₫</span></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table >
            }
        </>
    )
}

export default SaleOrder