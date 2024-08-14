import React from 'react'
import './ModalRejectQuote.scss'
import Modal from 'react-bootstrap/Modal';
import { Input } from 'antd';
import { TiTimes } from "react-icons/ti";
import { FormattedMessage, useIntl } from 'react-intl'
import { cancelQuote } from '../../../services/saleServices'
import { toast } from 'react-toastify';

export const ModalRejectQuote = (props) => {

    const intl = useIntl();
    const { TextArea } = Input;

    const handleConfirmCancelQuote = async () => {

        const res = await cancelQuote(props?.quoteId)
        if (res && res?.EC === 0) {
            props?.close()
            window.scrollTo(0, 0)
            props?.reloadData(true)
        } else {
            toast.error("Có lỗi xảy ra khi thực hiện từ chối báo giá, vui lòng thử lại sau.")
        }

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
