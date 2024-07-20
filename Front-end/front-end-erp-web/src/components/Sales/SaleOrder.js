import React, { useEffect } from 'react'
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
import { getAllPaidInvoice, getAllQuotesSent } from '../../services/saleServices'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { Pagination } from 'antd';

function SaleOrder() {

    const history = useHistory()

    const [showModalDataCompany, setShowModalDataCompany] = useState(false)
    const [isDoneStep1, setIsDoneStep1] = useState(false)
    const [isDoneStep2, setIsDoneStep2] = useState(false)
    const [showModalStep2, setShowModalStep2] = useState(false)
    const [isHaveQuote, setIsHaveQuote] = useState(true)
    const [selectedItems, setSelectedItems] = useState([])
    const [invoices, setInvoices] = useState([])
    const [totalQuotes, setTotalQuotes] = useState(0)
    const [quotesSent, setQuotesSent] = useState([])
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [totalQuotesSent, setTotalQuotesSent] = useState(0)
    const [searchQuotesSent, setSearchQuotesSent] = useState("")
    const [isCheckAll, setIsCheckAll] = useState(false)

    const onChangePagination = (page, pageSize) => {
        setPage(page);
        setPageSize(pageSize);
    };

    const fetchAllQuotesSent = async (page, pageSize) => {
        const res = await getAllQuotesSent(page, pageSize)
        if (res?.EC === 0) {
            setQuotesSent(res?.DT)
            setTotalQuotesSent(res?.total)
        }
    }

    useEffect(() => {
        const calculateTotalQuotesSent = () => {
            let totalCurrent = 0
            if (quotesSent && quotesSent.length > 0) {
                quotesSent.forEach((quoteSent) => {
                    totalCurrent += Number(quoteSent?.totalPrice)
                })
                setTotalQuotes(totalCurrent)
            }
        }
        calculateTotalQuotesSent()
    }, [quotesSent])

    useEffect(() => {
        fetchAllQuotesSent(page, pageSize);
    }, [page, pageSize]);

    // useEffect(() => {
    //     const fetchAllPaidInvoices = async () => {
    //         const res = await getAllPaidInvoice()
    //         if (res?.EC === 0) {
    //             calculateTotalQuotesSent(res?.DT)
    //             setInvoices(res?.DT)
    //         }
    //     }



    //     // fetchAllPaidInvoices()
    //     // fetchAllQuotesSent()
    // }, [])

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
        let currentStatus = isCheckAll
        setIsCheckAll(!currentStatus)
        if (currentStatus) {
            setSelectedItems([])
        } else {
            setSelectedItems(quotesSent.map(item => item?.quoteId?.toString()))
        }
    }

    const handleUnCheckAll = () => {
        setIsCheckAll(false)
        setSelectedItems([])
    }

    const convertDateTime = (input) => {
        // Tách chuỗi thành ngày và giờ
        let datePart = input.split('T')[0];
        let timePart = input.split('T')[1].split('.')[0];

        // Kết hợp ngày và giờ theo định dạng mong muốn
        let output = datePart + ' ' + timePart;

        return output;
    }

    const handleViewQuoteFromSaleOrder = (invoiceId) => {
        history.push(`/sale-order/${invoiceId}`)
    }

    return (

        <>
            <SalesHeader changeFilter={setSearchQuotesSent} selectedItems={selectedItems} handleUncheckAll={handleUnCheckAll}
                reloadData={() => fetchAllQuotesSent(page, pageSize)} />
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
                <div className='pb-3'>
                    <table className="table table-striped table-hover table-quotes">
                        <thead>
                            <tr>
                                <th scope="col">
                                    <Form.Check // prettier-ignore
                                        type={'checkbox'}
                                        id={`checkAll}`}
                                        label={`Số`}
                                        onChange={handleCheckAll}
                                        checked={isCheckAll}
                                    />
                                </th>
                                <th scope="col">Ngày tạo</th>
                                <th scope="col">Khách hàng</th>
                                <th scope="col">Nhân viên kinh doanh</th>
                                <th scope="col">Tổng</th>
                                <th scope="col">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices && invoices.length > 0 &&
                                invoices.map((item, index) => {
                                    return (
                                        <tr className='hover-item' key={uuidv4()} >
                                            <th scope="row">
                                                <Form.Check // prettier-ignore
                                                    type={'checkbox'}
                                                    id={item?.invoiceId}
                                                    value={item?.invoiceId}
                                                    label={`INV${item?.invoiceId}`}
                                                    onChange={(e) => handleChangeCheckBox(e)}
                                                    checked={selectedItems.includes(item?.invoiceId)}
                                                />
                                            </th>
                                            <td onClick={() => handleViewQuoteFromSaleOrder(item?.invoiceId)}>{convertDateTime(item?.createdAt)}</td>
                                            <td onClick={() => handleViewQuoteFromSaleOrder(item?.invoiceId)}>Huỳnh Khánh Duy</td>
                                            <td onClick={() => handleViewQuoteFromSaleOrder(item?.invoiceId)}>Nguyễn Bá Thành</td>
                                            <td onClick={() => handleViewQuoteFromSaleOrder(item?.invoiceId)}><span className='cost'>
                                                {Number(item?.total).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                            </span></td>
                                            <td onClick={() => handleViewQuoteFromSaleOrder(item?.invoiceId)}> <span className='status-quote'>Báo giá đã gửi</span> </td>
                                        </tr>

                                    )
                                })
                            }

                            {
                                quotesSent && quotesSent.length > 0 ?
                                    (
                                        (() => {
                                            const filteredQuotes = quotesSent.filter((item) => {
                                                return searchQuotesSent.toLowerCase() === '' ||
                                                    (item?.dataCustomer?.fullName.toLowerCase().includes(searchQuotesSent.toLowerCase()) ||
                                                        ("QUO" + item?.quoteId.toString()).toLowerCase().includes(searchQuotesSent.toLowerCase()));
                                            })

                                            if (filteredQuotes.length > 0) {
                                                return filteredQuotes.map((item, index) => (
                                                    <tr className='hover-item' >
                                                        <th scope="row">
                                                            <Form.Check // prettier-ignore
                                                                type={'checkbox'}
                                                                id={item?.quoteId}
                                                                value={item?.quoteId}
                                                                label={`QUO${item?.quoteId}`}
                                                                onChange={(e) => handleChangeCheckBox(e)}
                                                                checked={selectedItems.includes(item?.quoteId.toString())}
                                                            />
                                                        </th>
                                                        <td onClick={() => handleViewQuoteFromSaleOrder(item?.quoteId)}>{convertDateTime(item?.createdAt)}</td>
                                                        <td onClick={() => handleViewQuoteFromSaleOrder(item?.quoteId)}>{item?.dataCustomer?.fullName}</td>
                                                        <td onClick={() => handleViewQuoteFromSaleOrder(item?.quoteId)}>Nguyễn Bá Thành</td>
                                                        <td onClick={() => handleViewQuoteFromSaleOrder(item?.quoteId)}><span className='cost'>
                                                            {Number(item?.totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                        </span></td>
                                                        <td onClick={() => handleViewQuoteFromSaleOrder(item?.quoteId)}>
                                                            {item?.status === 'S1' ?
                                                                <span className='status-quote'>Báo giá đã gửi</span>
                                                                :
                                                                <span className='status-wait-invoice'>Đơn bán hàng</span>
                                                            }
                                                        </td>
                                                    </tr>

                                                )
                                                )
                                            } else {
                                                return (
                                                    <tr>
                                                        <td colSpan="6">
                                                            <div className='text-center w-100 fw-medium'>
                                                                <span>Báo giá hoặc hóa đơn không tồn tại</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        })()
                                    )
                                    :
                                    <span>no data filter</span>

                            }


                            {/* <tr className='hover-item'>
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
                        </tr> */}
                        </tbody>
                        <tfoot>
                            <tr >
                                <th scope="row">

                                </th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <span className='total-cost' data-tooltip="Tổng đã gồm thuế">
                                        {Number(totalQuotes).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </span>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table >
                    <div className='d-flex justify-content-end pe-4'>
                        <Pagination defaultCurrent={page} total={totalQuotesSent} pageSize={pageSize} onChange={onChangePagination} />
                    </div>
                </div >
            }
        </>
    )
}

export default SaleOrder