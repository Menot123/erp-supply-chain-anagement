import React, { useState, useEffect } from 'react'
import './ModalSendQuoteToEmail.scss'
import Modal from 'react-bootstrap/Modal';
import { Select, Input } from "antd";
import { FaRegFilePdf } from "react-icons/fa";

export const ModalSendQuoteToEmail = (props) => {

    const defaultValue = `Xin chào,

Đã có quotation S00005 có giá trị là 6.655 ₫ đã sẵn sàng để bạn kiểm tra.
    
Đừng ngần ngại liên hệ với chúng tôi nếu bạn có câu hỏi cần được giải đáp.
`;


    const [titleSendQuote, setTitleSendQuote] = useState('')
    const [bodySendQuote, setBodySendQuote] = useState(defaultValue)

    useEffect(() => {
        if (props?.dataQuote && props?.customer?.label) {
            setTitleSendQuote(props?.customer?.label + ' Báo giá (Mã S00005)')
        }
    }, [props])

    const { TextArea } = Input;

    const handleConfirmCancelQuote = () => {
        props?.cancelQuote()
        props?.close()
        window.scrollTo(0, 0)
    }

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
                            <label htmlFor='select-customer'>Khách hàng</label>
                            <Select
                                id='select-customer'
                                className='select-customer'
                                variant="borderless"
                                value={props?.customer ?? props?.customer}
                                disabled={true}
                            />
                        </div>
                        <div className='wrap-input-title'>
                            <label htmlFor='input-title'>Tiêu đề</label>
                            <Input variant="borderless" id='input-title' className='input-title' value={titleSendQuote}
                                onChange={(e) => setTitleSendQuote(e.target.value)}
                            />
                        </div>

                        <TextArea className='p0' value={bodySendQuote} variant='borderless' autoSize
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
                    <button className='btn btn-main' onClick={handleConfirmCancelQuote}>Gửi</button>
                    <button className='btn btn-gray' onClick={props?.close}> Hủy bỏ</button>
                </Modal.Footer>
            </Modal >
        </>
    )
}
