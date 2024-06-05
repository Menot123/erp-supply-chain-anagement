import React, { useState, useEffect } from 'react'
import './ModalSendQuoteToEmail.scss'
import Modal from 'react-bootstrap/Modal';
import { Select, Input } from "antd";
import { FaRegFilePdf } from "react-icons/fa";
import { sendingQuoteToCustomer, postDataQuote } from '../../../services/saleServices'
import { toast } from 'react-toastify';

export const ModalSendQuoteToEmail = (props) => {

    const defaultValue = `Xin chào,

Đã có quotation S${props?.dataQuote?.quoteId} có giá trị là ${props?.dataQuote?.totalPrice} đã sẵn sàng để bạn kiểm tra.
    
Đừng ngần ngại liên hệ với chúng tôi nếu bạn có câu hỏi cần được giải đáp.
`;


    const [titleSendQuote, setTitleSendQuote] = useState('')
    const [bodySendQuote, setBodySendQuote] = useState(defaultValue)
    const [receiver, setReceiver] = useState('')
    const [isSendingEmail, setIsSendingEmail] = useState(false)

    useEffect(() => {
        if (props?.dataQuote && props?.fullDataCustomer) {
            let receiverText = props?.fullDataCustomer?.fullName + ` <${props?.fullDataCustomer?.email}> `
            Promise.all([
                setReceiver(receiverText),
                setTitleSendQuote(props?.fullDataCustomer?.fullName + ' Báo giá (Mã ' + props?.dataQuote?.quoteId + ')'),
                setBodySendQuote(`Xin chào,

Đã có quotation ${props?.dataQuote?.quoteId} có giá trị là ${props?.dataQuote?.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} đã sẵn sàng để bạn kiểm tra.
                
Đừng ngần ngại liên hệ với chúng tôi nếu bạn có câu hỏi cần được giải đáp.`)])
        }
    }, [props])

    const { TextArea } = Input;

    const handleSendingQuoteToEmail = async () => {

        try {
            setIsSendingEmail(true)
            let response = await postDataQuote(props?.dataQuote)
            console.log('check response: ', response)
            let quoteFile = await props?.downloadQuote('POST_API');

            // Tạo FormData và thêm các dữ liệu khác
            const formData = new FormData();
            formData.append('quoteFile', quoteFile, 'quote.pdf'); // Chuyển đổi Blob thành file
            formData.append('dataQuote', JSON.stringify(props?.dataQuote));
            formData.append('fullDataCustomer', JSON.stringify(props?.fullDataCustomer));
            formData.append('bodySendQuote', bodySendQuote);

            // Gửi request POST sử dụng axios và chờ phản hồi
            let res = await sendingQuoteToCustomer(formData);
            setTimeout(() => {
                setIsSendingEmail(false);
                if (res && res.EC === 0) {
                    toast.success(`Sending quote to ${props?.fullDataCustomer?.email} successfully!`)
                    Promise.all([props?.close(),
                    props?.handleClearDataQuote(),
                    props?.secondStep(1)])
                }
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
                        <h4>Gửi báo giá</h4>
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
                            <div className='icon-quote hover-item' onClick={() => props?.downloadQuote()}>
                                <FaRegFilePdf className='icon-file-quote ' />
                            </div>

                            <div className='wrap-name-type-file'>
                                <span>Báo giá - S00005.pdf</span>
                                <strong>PDF</strong>
                            </div>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-main' onClick={handleSendingQuoteToEmail}>Gửi</button>
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
