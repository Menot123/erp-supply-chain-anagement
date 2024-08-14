import React from 'react'
import './ModalRejectQuote.scss'
import Modal from 'react-bootstrap/Modal';
import { Input } from 'antd';
import { TiTimes } from "react-icons/ti";
import { FormattedMessage, useIntl } from 'react-intl'

export const ModalRejectQuote = (props) => {

    const intl = useIntl();
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
                    <h4><FormattedMessage id="new_quote.preview-modal-reject-title" /></h4>
                </Modal.Title>

            </Modal.Header>
            <Modal.Body>
                <span><FormattedMessage id="new_quote.preview-modal-reject-content" /></span>
                <TextArea placeholder={intl.formatMessage({ id: "new_quote.preview-modal-reject-feedback" })} allowClear onChange={''} style={{ height: 120 }} className='mt-3' />
            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-danger' onClick={handleConfirmCancelQuote}><TiTimes /><FormattedMessage id="new_quote.preview-modal-reject-btn-confirm" /></button>
                <button className='btn btn-main' onClick={props?.close}><FormattedMessage id="new_quote.preview-modal-reject-btn-cancel" /></button>
            </Modal.Footer>
        </Modal >
    )
}
