import React, { useState, useEffect } from 'react'
import './ModalSendQuoteToEmail.scss'
import Modal from 'react-bootstrap/Modal';
import { Select, Input, Tooltip } from "antd";
import { FaRegFilePdf } from "react-icons/fa";
import { sendCustomMail } from '../../../services/saleServices'
import { toast } from 'react-toastify';
import { InfoCircleOutlined, MailOutlined } from '@ant-design/icons'

export const ModalSendQuoteEx = (props) => {

    const defaultValue = `Xin chào,

Đã có báo giá mẫu có giá trị là 0 VND đã sẵn sàng để bạn kiểm tra.
    
Đừng ngần ngại liên hệ với chúng tôi nếu bạn có câu hỏi cần được giải đáp.


Chúc quý khách hàng một ngày tốt lành.

Trân trọng.
`;


    const [titleSendQuote, setTitleSendQuote] = useState('')
    const [bodySendQuote, setBodySendQuote] = useState(defaultValue)
    const [receiver, setReceiver] = useState('')
    const [isSendingEmail, setIsSendingEmail] = useState(false)


    useEffect(() => {

        Promise.all([
            setTitleSendQuote("Báo giá mẫu"),
            setBodySendQuote(`Xin chào,

Đã có báo giá mẫu có giá trị là 0 VND đã sẵn sàng để bạn kiểm tra.
                
Đừng ngần ngại liên hệ với chúng tôi nếu bạn có câu hỏi cần được giải đáp.`)])
    }, [])

    const { TextArea } = Input;

    const handleChangeInputEmailReceiver = (e) => {
        setReceiver(e.target.value)

    }

    const handleSendingQuoteToEmail = async () => {

        try {
            setIsSendingEmail(true)
            let quoteFile = await props?.downloadQuote('POST_API');

            // Tạo FormData và thêm các dữ liệu khác
            const formData = new FormData();
            formData.append('quoteFile', quoteFile, 'quote.pdf'); // Chuyển đổi Blob thành file
            // formData.append('dataQuote', JSON.stringify({ ...props?.dataQuote, status: "S1" }));
            formData.append('receiver', JSON.stringify(receiver));
            formData.append('bodySendQuote', bodySendQuote);

            // Gửi request POST sử dụng axios và chờ phản hồi
            let res = await sendCustomMail(formData);
            setTimeout(() => {
                setIsSendingEmail(false);
                if (res && res.EC === 0) {
                    toast.success(`Gửi báo giá mẫu đến ${receiver} thành công!`)
                    Promise.all([
                        props?.isDone(true),
                        props?.handleClose(),
                        props?.fetchAllQuotesSent()
                    ])
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
                onHide={props?.handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4>Báo giá mẫu</h4>
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className='wrap-body-modal'>
                        <div className='wrap-select-customer d-flex align-items-center'>
                            <label htmlFor='select-customer'>Người nhận</label>
                            {/* <Input onChange={(e) => handleChangeInputEmailReceiver(e)} variant="borderless" value={receiver} /> */}
                            <Input
                                onChange={(e) => handleChangeInputEmailReceiver(e)}
                                placeholder="Nhập vào email nhận báo giá mẫu"
                                variant="borderless"
                                prefix={
                                    <MailOutlined
                                        style={{
                                            color: 'rgba(0,0,0,.25)',
                                        }}
                                    />
                                }
                                suffix={
                                    <Tooltip title="Báo giá mẫu sẽ được gửi đến email này">
                                        <InfoCircleOutlined
                                            style={{
                                                color: 'rgba(0,0,0,.45)',
                                            }}
                                        />
                                    </Tooltip>
                                }
                            />
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
                                <span>Báo giá mẫu.pdf</span>
                                <strong>PDF</strong>
                            </div>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-main' onClick={handleSendingQuoteToEmail}>Gửi</button>
                    <button className='btn btn-gray' onClick={props?.handleClose}> Hủy bỏ</button>
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
