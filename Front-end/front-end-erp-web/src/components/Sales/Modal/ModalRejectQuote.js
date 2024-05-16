import React from 'react'
import './ModalRejectQuote.scss'
import Modal from 'react-bootstrap/Modal';
import { Input } from 'antd';
import { TiTimes } from "react-icons/ti";


export const ModalRejectQuote = (props) => {

    const { TextArea } = Input;

    const handleCloseModalSignature = () => {

    }

    const handleConfirmCancelQuote = () => {
        props?.cancelQuote()
        props?.close()
        window.scrollTo(0, 0)
    }

    return (
        <Modal show={props?.show}
            backdrop="static"
            keyboard={false}
            size="lg"
            style={{ zIndex: '900' }}
            onHide={props?.close}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <h4>Từ chối báo giá này</h4>
                </Modal.Title>

            </Modal.Header>
            <Modal.Body>
                <span>Vui lòng cho chúng tôi biết lý do bạn từ chối báo giá này. Điều này sẽ giúp chúng tôi cải thiện dịch vụ của mình.</span>
                <TextArea placeholder="Phản hồi của bạn..." allowClear onChange={''} style={{ height: 120 }} className='mt-3' />
            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-danger' onClick={handleConfirmCancelQuote}><TiTimes /> Từ chối</button>
                <button className='btn btn-main' onClick={props?.close}> Hủy bỏ</button>
            </Modal.Footer>
        </Modal >
    )
}
