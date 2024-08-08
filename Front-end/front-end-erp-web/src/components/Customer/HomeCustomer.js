import React, { useEffect } from 'react'
import '../Sales/SaleOrder.scss'
import { useState } from 'react'
import { FaCheck } from "react-icons/fa";
// import { ModalConfirmQuote } from './Modal/ModalConfirmQuote';
import Form from 'react-bootstrap/Form';
import { getAllInvoice, getInvoicePaid, getInvoice } from '../../services/saleServices'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { Pagination, Empty, Skeleton, Modal, Button } from 'antd';
import { getAllCustomerInvoices } from '../../services/saleServices'
import { useSelector } from 'react-redux';
import CustomerHeader from './CustomerHeader';

const HomeCustomer = () => {

    const history = useHistory()
    const customerId = useSelector(state => state?.user?.id)

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
    const [isFetchingData, setIsFetchingData] = useState(false)
    const [isShowModalInvoicePaid, setIsShowModalInvoicePaid] = useState(false)
    const [titleNameModalInvoicePaid, setTitleNameModalInvoicePaid] = useState("Hóa đơn đã thanh toán")

    const defaultDataInvoicePaid = {
        customer: '',
        byEmployee: '',
    }

    const [dataInvoicePaid, setDataInvoicePaid] = useState(defaultDataInvoicePaid)

    const onChangePagination = (page, pageSize) => {
        setPage(page);
        setPageSize(pageSize);
    };

    const fetchAllQuotesSent = async (page, pageSize) => {
        const res = await getAllCustomerInvoices(page, pageSize, customerId)
        if (res?.EC === 0) {
            setQuotesSent(res?.DT)
            setTotalQuotesSent(res?.total)
        }
        setIsFetchingData(false)
    }

    const reloadData = () => {
        fetchAllQuotesSent(page, pageSize)
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
        setIsFetchingData(true)
        fetchAllQuotesSent(page, pageSize);
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
            setSelectedItems(quotesSent.map(item => item?.invoiceId?.toString()))
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

    const fetchDataInvoicePaid = async (invoiceId) => {
        let res = await getInvoicePaid(invoiceId)
        let resInfoInvoice = await getInvoice(invoiceId)
        if (res && res?.EC === 0 && res?.DT && resInfoInvoice?.EC === 0) {
            setDataInvoicePaid((prevState) => ({
                ...prevState,
                ...res?.DT,
                byEmployee: resInfoInvoice?.DT?.dataEmployee
            }))
        }
    }

    const handleViewInvoiceFromSaleOrder = (invoiceId, status, customer, employee) => {
        if (status && status === 'S2') {
            fetchDataInvoicePaid(invoiceId)
            setDataInvoicePaid((prevState) => ({
                ...prevState,
                customer: customer,
                byEmployee: employee,
            }))
            setTitleNameModalInvoicePaid(`Hóa đơn ${invoiceId}`)
            setIsShowModalInvoicePaid(true)
        } else {
            history.push(`/customer/invoice/${invoiceId}`)
        }
    }

    const handleViewDetailInvoicePaid = invoiceId => {
        history.push(`/customer/invoice/${invoiceId}`)
    }

    return (

        <>
            <CustomerHeader changeFilter={setSearchQuotesSent} selectedItems={selectedItems}
                handleUncheckAll={handleUnCheckAll} reloadData={reloadData}
            />

            {
                isFetchingData
                    ?
                    <>
                        <div>
                            <Skeleton active />
                        </div>
                    </>
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
                            <tbody >

                                {
                                    quotesSent && quotesSent.length > 0 ?
                                        (
                                            (() => {
                                                const filteredQuotes = quotesSent.filter((item) => {
                                                    return searchQuotesSent.toLowerCase() === '' ||
                                                        (item?.createdUser.toLowerCase().includes(searchQuotesSent.toLowerCase()) ||
                                                            ("INV" + item?.invoiceId.toString()).toLowerCase().includes(searchQuotesSent.toLowerCase()));
                                                })

                                                if (filteredQuotes.length > 0) {
                                                    return filteredQuotes.map((item, index) => (
                                                        <tr className='hover-item' key={uuidv4()} >
                                                            <th scope="row">
                                                                <Form.Check // prettier-ignore
                                                                    type={'checkbox'}
                                                                    id={item?.invoiceId}
                                                                    value={item?.invoiceId}
                                                                    label={`INV${item?.invoiceId}`}
                                                                    onChange={(e) => handleChangeCheckBox(e)}
                                                                    checked={selectedItems.includes(item?.invoiceId.toString())}
                                                                />
                                                            </th>
                                                            <td onClick={() => handleViewInvoiceFromSaleOrder(item?.invoiceId, item?.status, item?.dataCustomer?.fullName, dataInvoicePaid?.byEmployee)}>{convertDateTime(item?.createdAt)}</td>
                                                            <td onClick={() => handleViewInvoiceFromSaleOrder(item?.invoiceId, item?.status, item?.dataCustomer?.fullName, dataInvoicePaid?.byEmployee)}>{item?.dataCustomer?.fullName}</td>
                                                            <td onClick={() => handleViewInvoiceFromSaleOrder(item?.invoiceId, item?.status, item?.dataCustomer?.fullName, dataInvoicePaid?.byEmployee)}>{item?.createdUser}</td>
                                                            <td onClick={() => handleViewInvoiceFromSaleOrder(item?.invoiceId, item?.status, item?.dataCustomer?.fullName, dataInvoicePaid?.byEmployee)}><span className='cost'>
                                                                {Number(item?.totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                            </span></td>
                                                            <td onClick={() => handleViewInvoiceFromSaleOrder(item?.invoiceId, item?.status, item?.dataCustomer?.fullName, dataInvoicePaid?.byEmployee)}>
                                                                {item?.status === 'S0' &&
                                                                    <span className='status-quote'>Chờ xác nhận</span>
                                                                }
                                                                {item?.status === 'S1' &&
                                                                    <span className='status-quote-draft'>Chờ thanh toán</span>
                                                                }
                                                                {
                                                                    item?.status === 'S2' &&
                                                                    <span className='status-quote-s2' > Đã thanh toán</span>
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
                                        <tr >
                                            <td colSpan={6}>
                                                <Empty />
                                            </td>
                                        </tr>

                                }
                            </tbody >
                            {quotesSent && quotesSent.length > 0 &&
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
                            }

                        </table >
                        {quotesSent && quotesSent.length > 0 &&
                            <div className='d-flex justify-content-end pe-4'>
                                <Pagination defaultCurrent={page} total={totalQuotesSent} pageSize={pageSize} onChange={onChangePagination} />
                            </div>
                        }
                    </div >
            }

            <Modal title={titleNameModalInvoicePaid}
                open={isShowModalInvoicePaid}
                width={1000}
                onCancel={() => setIsShowModalInvoicePaid(false)}
                footer={[
                    <Button key="back" onClick={() => setIsShowModalInvoicePaid(false)}>
                        Hủy bỏ
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => handleViewDetailInvoicePaid(dataInvoicePaid?.invoiceId)}>
                        Chi tiết
                    </Button>,
                ]}
            >
                <div className='row'>
                    <div className='wrap-line-invoice mt-2 col-4'>
                        <label> <strong>Khách hàng: </strong> </label>
                        <span className='ms-1'>{dataInvoicePaid?.customer ?? ''}</span>
                    </div>
                    <div className='wrap-line-invoice mt-2 col-4'>
                        <label> <strong>Thời gian thanh toán: </strong></label>
                        <span className='ms-1'>{dataInvoicePaid?.datePaid ?? ''}</span>
                    </div>
                    <div className='wrap-line-invoice mt-2 col-4'>
                        <label> <strong>Hình thức thanh toán:  </strong></label>
                        <span className='ms-1'>{dataInvoicePaid?.paymentMethod ?? ''}</span>
                    </div>
                    <div className='wrap-line-invoice mt-2 col-4'>
                        <label> <strong>Nhân viên phụ trách:</strong> </label>
                        <span className='ms-1'>{dataInvoicePaid?.byEmployee ?? ''}</span>
                    </div>
                    <div className='wrap-line-invoice mt-2 col-4'>
                        <label> <strong>Số tiền: </strong></label>
                        <span className='ms-1'>{Number(dataInvoicePaid?.total).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) ?? ''}</span>
                    </div>
                    <div className='wrap-line-invoice mt-2 col-4'>
                        <label> <strong>Trạng thái: </strong></label>
                        <span className='status-paid'>Đã thanh toán</span>
                    </div>
                </div>

            </Modal>

        </>
    )
}

export default HomeCustomer
