import React, { useEffect } from 'react'
import './ManagePurchase.scss'
import PurchaseHeader from './PurchaseHeader/PurchaseHeader'
import { FaTimes } from "react-icons/fa";
import first_step from '../../assets/img/step1.png'
import third_step from '../../assets/img/step3.png'
import four_step from '../../assets/img/step4.png'
import img_file from '../../assets/img/smiling_face.svg'
import avatarUser from '../../assets/img/avatarUser.jpg'
import { FormattedMessage } from 'react-intl'
import DataCompanyModal from './Modal/DataCompanyModal';
import { useState } from 'react'
import { FaCheck } from "react-icons/fa";
import { ModalConfirmQuote } from './Modal/ModalConfirmQuote';
import Form from 'react-bootstrap/Form';
// import { getCustomerPagination } from '../../services/saleServices'
import { getProviderPagination } from '../../services/purchaseServices'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { Empty, Skeleton } from 'antd';
import { MdEmail } from "react-icons/md";


function ListProvider() {

    const history = useHistory()

    const [showModalDataCompany, setShowModalDataCompany] = useState(false)
    const [isDoneStep1, setIsDoneStep1] = useState(false)
    const [isDoneStep2, setIsDoneStep2] = useState(false)
    const [showModalStep2, setShowModalStep2] = useState(false)
    const [isHaveQuote, setIsHaveQuote] = useState(true)
    const [selectedItems, setSelectedItems] = useState([])
    const [customers, setCustomer] = useState([])
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(21);
    const [totalQuotesSent, setTotalQuotesSent] = useState(0)
    const [searchCustomer, setSearchCustomer] = useState("")
    const [isCheckAll, setIsCheckAll] = useState(false)
    const [isFetchingData, setIsFetchingData] = useState(false)
    const [isShowModalCreateCustomer, setIsShowModalCreateCustomer] = useState(false)
    const [currentView, setCurrentView] = useState('block')

    const onChangePagination = (page, pageSize) => {
        setPage(page);
        setPageSize(pageSize);
    };

    const fetchAllCustomer = async (page, pageSize) => {
        const res = await getProviderPagination(page, pageSize)
        if (res?.EC === 0) {
            setCustomer(res?.DT)
            console.log(res.DT)
            setTotalQuotesSent(res?.total)
        }
        setIsFetchingData(false)

    }

    useEffect(() => {
        setIsFetchingData(true)
        fetchAllCustomer(page, pageSize);
    }, [page, pageSize]);

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
                return prevState.filter((providerId) => {
                    return providerId !== itemChecked
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
            setSelectedItems(customers.map(item => item?.providerId?.toString()))
        }
    }

    const handleUnCheckAll = () => {
        setIsCheckAll(false)
        setSelectedItems([])
    }

    const handleViewDetailCustomer = (customerId) => {
        history.push(`/manage-purchase/providers/${customerId}`)
    }

    return (

        <>
            <PurchaseHeader changeFilter={setSearchCustomer} selectedItems={selectedItems} handleUncheckAll={handleUnCheckAll}
                reloadData={() => fetchAllCustomer(page, pageSize)} showModalCreateCustomer={() => setIsShowModalCreateCustomer(true)}
                page={page} totalQuotesSent={totalQuotesSent} pageSize={pageSize} onChangePagination={onChangePagination}
                customers={customers} currentView={currentView} setCurrentViewEmployee={setCurrentView}
            />
            {!isHaveQuote &&
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
            }

            {
                isFetchingData
                    ?
                    <>

                        <div>
                            <Skeleton active />
                        </div>
                    </>
                    :
                    <> {
                        currentView && currentView === 'block'
                            ?
                            <div className='manage-customer-container container mt-3'>
                                <div className='customer-items-wrap row'>
                                    {
                                        customers && customers.length > 0 ?
                                            (
                                                (() => {
                                                    const filteredCustomers = customers.filter((item) => {
                                                        return searchCustomer.toLowerCase() === '' ||
                                                            (item?.nameVi.toLowerCase().includes(searchCustomer.toLowerCase())
                                                                || item?.email.toLowerCase().includes(searchCustomer.toLowerCase()));
                                                    })

                                                    if (filteredCustomers.length > 0) {
                                                        return filteredCustomers.map((item, index) => (
                                                            <div onClick={() => handleViewDetailCustomer(item?.providerId)} key={index} className='customer-item d-flex col-4  '>
                                                                <div className='avatar-customer'>
                                                                    <img className='img-customer' src={avatarUser} alt='avatar-customer' />
                                                                </div>
                                                                <div className='des-customer'>
                                                                    <span className='name-customer '>{item?.nameVi}</span>
                                                                    <span className='email-customer'><MdEmail />{item.email}</span>
                                                                </div>
                                                            </div>

                                                        )
                                                        )
                                                    } else {
                                                        return (
                                                            <tr>
                                                                <td colSpan="6">
                                                                    <div className='text-center w-100 fw-medium'>
                                                                        <span>Không tìm thấy khách hàng.Hãy tạo một khách hàng mới trong hệ thống của bạn</span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                })()
                                            )
                                            :
                                            <tr >
                                                <td colSpan={6}>
                                                    <Empty />
                                                </td>
                                            </tr>
                                    }
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
                                                    label={`Tên`}
                                                    onChange={handleCheckAll}
                                                    checked={isCheckAll}
                                                />
                                            </th>
                                            <th scope="col">Điện thoại</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Địa chỉ</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            customers && customers.length > 0 ?
                                                (
                                                    (() => {
                                                        const filteredCustomers = customers.filter((item) => {
                                                            return searchCustomer.toLowerCase() === '' ||
                                                                (item?.nameVi.toLowerCase().includes(searchCustomer.toLowerCase())
                                                                    || item?.email.toLowerCase().includes(searchCustomer.toLowerCase()));
                                                        })

                                                        if (filteredCustomers.length > 0) {
                                                            return filteredCustomers.map((item, index) => (
                                                                <tr className='hover-item' key={uuidv4()} >
                                                                    <th scope="row">
                                                                        <Form.Check // prettier-ignore
                                                                            type={'checkbox'}
                                                                            id={item?.providerId}
                                                                            value={item?.providerId}
                                                                            label={item?.nameVi}
                                                                            onChange={(e) => handleChangeCheckBox(e)}
                                                                            checked={selectedItems.includes(item?.providerId.toString())}
                                                                        />
                                                                    </th>
                                                                    <td onClick={() => handleViewDetailCustomer(item?.providerId)}>{item?.contact}</td>
                                                                    <td onClick={() => handleViewDetailCustomer(item?.providerId)}>{item?.email}</td>
                                                                    <td onClick={() => handleViewDetailCustomer(item?.providerId)}>{item?.addressVi}</td>
                                                                </tr>

                                                            )
                                                            )
                                                        } else {
                                                            return (
                                                                <tr>
                                                                    <td colSpan="6">
                                                                        <div className='text-center w-100 fw-medium'>
                                                                            <span>Không tìm thấy khách hàng.Hãy tạo một khách hàng mới trong hệ thống của bạn</span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    })()
                                                )
                                                :
                                                <tr >
                                                    <td colSpan={6}>
                                                        <Empty />
                                                    </td>
                                                </tr>

                                        }
                                    </tbody >
                                </table >

                            </div >
                    }

                    </>


            }

        </>
    )
}

export default ListProvider