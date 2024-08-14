import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Select, Input } from "antd";
import { FaRegFilePdf } from "react-icons/fa";
import { postDataCancelQuote } from '../../../services/saleServices'
import { toast } from 'react-toastify';
import './ModalCancelQuote.scss'

export const ModalCancelQuote = (props) => {

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
                setBodySendQuote(`
Kính gửi ${props?.fullDataCustomer?.fullName ?? "name"},

Xin lưu ý rằng Đơn bán hàng S${props?.dataQuote?.quoteId ?? "0"} đã bị hủy. Do đó, bạn sẽ không bị tính thêm tiền cho đơn hàng này. Nếu cần hoàn tiền, việc này sẽ được thực hiện theo cách thuận tiện nhất.

Đừng ngần ngại liên hệ với chúng tôi nếu bạn có câu hỏi cần được giải đáp.

`)])
        }
    }, [props])

    const { TextArea } = Input;

    const handleSendingEmailCancelQuote = async () => {
        try {
            setIsSendingEmail(true)

            // Tạo FormData và thêm các dữ liệu khác
            const formData = new FormData();
            formData.append('dataQuote', JSON.stringify({ ...props?.dataQuote, status: "deleted" }));
            formData.append('fullDataCustomer', JSON.stringify(props?.fullDataCustomer));
            formData.append('bodySendQuote', bodySendQuote);

            // Gửi request POST sử dụng axios và chờ phản hồi
            let res = await postDataCancelQuote(formData);
            setTimeout(() => {
                setIsSendingEmail(false);
                props?.changeStep(3)
                if (res && res.EC === 0) {
                    toast.success(`Cancel quote S${props?.dataQuote?.quoteId} successfully!`)
                    props?.close()
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
                        <h4>Hủy đơn bán hàng</h4>
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body>

                    <div className='wrap-body-modal-cancel'>

                        <div className='wrap-message-confirm-cancel'>
                            <span>Bạn có chắc chắn muốn hủy đơn hàng này không?</span>
                        </div>

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

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-main' onClick={handleSendingEmailCancelQuote}>Gửi và hủy</button>
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
