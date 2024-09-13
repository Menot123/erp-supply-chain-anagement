import React, { useState, useEffect } from 'react'
import './ModalSendQuoteToEmail.scss'
import Modal from 'react-bootstrap/Modal';
import { Select, Input } from "antd";
import { FaRegFilePdf } from "react-icons/fa";
import { sendingInvoiceToCustomer, confirmInvoice } from '../../../services/saleServices'
import { toast } from 'react-toastify';
import { Tooltip } from "antd"


export const ModalSendInvoiceToEmail = (props) => {

    const defaultValue = `Xin chào,
Đây là hoá đơn của bạn INV${props?.dataQuote?.quoteId} có số tiền là 110.000 ₫   . Vui lòng thanh toán vào thời điểm sớm nhất mà bạn thấy thuận tiện.

Vui lòng điền thông tin thanh toán như sau: INV${props?.dataQuote?.quoteId}.
    
Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi.
`;


    const [titleSendQuote, setTitleSendQuote] = useState('')
    const [bodySendQuote, setBodySendQuote] = useState(defaultValue)
    const [receiver, setReceiver] = useState('')
    const [isSendingEmail, setIsSendingEmail] = useState(false)

    useEffect(() => {
        if (props?.dataQuote && props?.fullDataProvider) {
            let receiverText = props?.fullDataProvider?.nameVi + ` <${props?.fullDataProvider?.email}> `
            Promise.all([
                setReceiver(receiverText),
                setTitleSendQuote(props?.fullDataProvider?.nameVi + ' - Hóa đơn (Mã INV' + props?.dataQuote?.quoteId + ')'),
                setBodySendQuote(`Xin chào,

Đây là hoá đơn của bạn INV${props?.dataQuote?.quoteId} có số tiền là ${props?.dataQuote?.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}. Vui lòng thanh toán vào thời điểm sớm nhất mà bạn thấy thuận tiện.

Vui lòng điền thông tin thanh toán như sau: INV${props?.dataQuote?.quoteId}.
    
Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi.`)])
        }
    }, [props])

    const { TextArea } = Input;

    const handleSendingInvoiceToEmail = async () => {

        try {
            setIsSendingEmail(true)
            // let response = await confirmInvoice({ ...props?.dataQuote, status: "S1" })
            // let quoteFile = await props?.downloadQuote('POST_API');

            // // Tạo FormData và thêm các dữ liệu khác
            // const formData = new FormData();
            // formData.append('quoteFile', quoteFile, 'invoice.pdf'); // Chuyển đổi Blob thành file
            // formData.append('dataQuote', JSON.stringify({ ...props?.dataQuote, status: "S1" }));
            // formData.append('fullDataProvider', JSON.stringify(props?.fullDataProvider));
            // formData.append('bodySendQuote', bodySendQuote);

            // // Gửi request POST sử dụng axios và chờ phản hồi
            // let res = await sendingInvoiceToCustomer(formData);
            setTimeout(() => {
                setIsSendingEmail(false);
                toast.success(`Gửi đơn mua hàng đến ${props?.fullDataProvider?.email} thành công!`)

            }, 3000);
        } catch (error) {
            console.error('Error sending quote:', error);
        }
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
                        <h4>Gửi hóa đơn</h4>
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className='wrap-body-modal'>
                        <div className='wrap-select-customer'>
                            <label htmlFor='select-customer'>Người nhận</label>
                            <Input variant="borderless" value={receiver ?? ''} disabled />
                        </div>
                        <div className='wrap-input-title'>
                            <label htmlFor='input-title'>Tiêu đề</label>
                            <Input variant="borderless" id='input-title' className='input-title' value={titleSendQuote}
                                onChange={(e) => setTitleSendQuote(e.target.value)}
                            />
                        </div>

                        <TextArea style={{ padding: '0px' }} value={bodySendQuote} variant='borderless' autoSize
                            onChange={(e) => setBodySendQuote(e.target.value)}
                        />

                        <hr />

                        <div className='wrap-quote-file'>
                            {/* <Tooltip placement="bottom" title={"Tải xuống hóa đơn"}> */}
                            <div className='icon-quote hover-item' onClick={() => props?.downloadQuote()}>
                                <FaRegFilePdf className='icon-file-quote ' />
                            </div>
                            {/* </Tooltip> */}


                            <div className='wrap-name-type-file'>
                                <span>Hóa đơn - INV{props?.dataQuote?.quoteId}.pdf</span>
                                <strong>PDF</strong>
                            </div>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-main' onClick={handleSendingInvoiceToEmail}>Gửi</button>
                    <button className='btn btn-gray' onClick={props?.close}> Hủy bỏ</button>
                </Modal.Footer>
            </Modal >
            {isSendingEmail
                ?
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
                : ''
            }
        </>
    )
}
