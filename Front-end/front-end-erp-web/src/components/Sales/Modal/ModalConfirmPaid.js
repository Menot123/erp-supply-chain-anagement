import React, { useState, useEffect } from 'react'
import './ModalConfirmPaidInvoice.scss'
import Modal from 'react-bootstrap/Modal';
import { Select, Input, DatePicker } from "antd";


export const ModalConfirmPaid = (props) => {

    const defaultValue = `Xin chào,
Đây là hoá đơn của bạn INV${props?.dataQuote?.quoteId} có số tiền là 110.000 ₫   . Vui lòng thanh toán vào thời điểm sớm nhất mà bạn thấy thuận tiện.

Vui lòng điền thông tin thanh toán như sau: INV${props?.dataQuote?.quoteId}.
    
Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi.
`;


    const [datePaid, setDatePaid] = useState(null)
    const [total, setTotal] = useState(0)
    const [paymentMethod, setPaymentMethod] = useState('')
    const [contentTransfer, setContentTransfer] = useState('')

    useEffect(() => {
        if (props?.dataQuote) {
            Promise.all([
                setTotal(props?.dataQuote?.totalPrice),
                // setTitleSendQuote(props?.fullDataCustomer?.fullName + ' - Hóa đơn (Mã INV' + props?.dataQuote?.quoteId + ')'),
                setContentTransfer(`INV${props?.dataQuote?.quoteId}`)
            ])
        }
    }, [props?.dataQuote])

    const handleChangePaymentMethod = (e) => {
        setPaymentMethod(e)
    }

    const handleChangeDatePaid = (date, dateString) => {
        setDatePaid(dateString)
    };

    return (
        <>
            <Modal show={props?.show}
                backdrop="static"
                keyboard={false}
                size="lg"
                style={{ zIndex: '900' }}
                onHide={props?.close}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4>Ghi nhận thanh toán</h4>
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className='wrap-body-modal-paid-invoice row'>

                        <div className='wrap-input-title d-flex align-items-center col-6'>
                            <label htmlFor='input-title'>Ngày thanh toán</label>
                            <DatePicker
                                key="paid-date"
                                className='select-date-paid'
                                onChange={handleChangeDatePaid}
                                suffixIcon={false}
                                variant="borderless"
                                placeholder=''
                                size='middle'
                                id='select-date-paid'
                            />
                        </div>

                        <div className='wrap-input-title col-6'>
                            <label htmlFor='input-total'>Số tiền</label>
                            <Input variant="borderless" id='input-total' className='input-title' value={total}
                                onChange={(e) => setTotal(e.target.value)}
                            />
                        </div>

                        <div className='wrap-select-customer col-6'>
                            <label htmlFor='select-customer'>Phương thức thanh toán</label>
                            <Select
                                id='select-currency'
                                className='input-title'
                                showSearch
                                variant="borderless"
                                style={{ width: 200 }}
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                onChange={(e) => handleChangePaymentMethod(e)}
                                options={[{ label: "Tiền mặt", value: "cash" }, { label: "Chuyển khoản", value: "banking" }]}
                            />
                        </div>

                        <div className='wrap-input-title col-6'>
                            <label htmlFor='input-title'>Nội dung giao dịch</label>
                            <Input variant="borderless" id='input-title' className='input-title' value={contentTransfer}
                                onChange={(e) => setContentTransfer(e.target.value)}
                            />
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-main' onClick={""}>Tạo thanh toán</button>
                    <button className='btn btn-gray' onClick={props?.close}> Hủy bỏ</button>
                </Modal.Footer>
            </Modal >
            {/* {isSendingEmail
                ?
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
                : ''
            } */}
        </>
    )
}
