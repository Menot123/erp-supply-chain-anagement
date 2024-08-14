import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './ModalConfirmQuote.scss'
import { FormattedMessage } from 'react-intl'
import { postDataConfirmMethod, getDetailCompany } from '../../../services/userServices'
import { toast } from 'react-toastify';

export const ModalConfirmQuote = (props) => {

    const [paymentMethod, setPaymentMethod] = useState(null)
    const [paymentMethodSelected, setPaymentMethodSelected] = useState(null)

    const fetchInfoCompany = async () => {
        let res = await getDetailCompany()
        if (res.EC === 0 && res?.DT?.confirmQuote) {
            setPaymentMethodSelected(res?.DT?.confirmQuote)
        }
    }
    useEffect(() => {
        fetchInfoCompany()
    }, [])

    useEffect(() => {
        if (paymentMethodSelected) {
            props?.isDone(true)
        }
    }, [props, paymentMethodSelected])

    const handleChangeSelectRadio = ({ target: { value } }) => {
        setPaymentMethod(value);
    };

    const handleApplyPayment = async () => {
        if (paymentMethod) {
            let res = await postDataConfirmMethod(paymentMethod)
            if (res.EC === 0) {
                props?.handleClose()
                fetchInfoCompany()
                toast.success(<FormattedMessage id="modal-confirm-quote.toast-successfully" />)
            } else {
                toast.warning(<FormattedMessage id="modal-confirm-quote.toast-empty-data.company" />)
            }
        } else {
            toast.info(<FormattedMessage id="modal-confirm-quote.toast-empty-select" />)
        }
    }

    return (
        <>

            <Modal
                show={props?.show ?? false}
                onHide={props?.handleClose ?? false}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title><FormattedMessage id="modal-confirm-quote.title" /></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-modal-confirm-quote'>
                        <Form>
                            <Form.Check // prettier-ignore
                                type={'radio'}
                                id={'option-sign'}
                                label={<FormattedMessage id="modal-confirm-quote.option-sign" />}
                                name="group1"
                                value='E-sign'
                                onChange={(e) => handleChangeSelectRadio(e)}
                                checked={paymentMethod === "E-sign"}
                                selected={paymentMethodSelected === "E-sign"}
                            />

                            <Form.Check // prettier-ignore
                                type={'radio'}
                                name="group1"
                                id={'option-payment'}
                                label={'Email'}
                                value='Email'
                                onChange={(e) => handleChangeSelectRadio(e)}
                                checked={paymentMethod === "Email"}
                                selected={paymentMethodSelected === "Email"}
                            />
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-purple' onClick={handleApplyPayment}>
                        <FormattedMessage id="modal-confirm-quote.btn-apply" />
                    </Button>
                    <Button className='btn-cancel-data-company' onClick={props?.handleClose ?? false}>
                        <FormattedMessage id="modal-confirm-quote.btn-cancel" />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
