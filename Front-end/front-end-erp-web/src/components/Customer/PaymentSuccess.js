import React, { useEffect } from 'react'
import { FaCheckCircle } from "react-icons/fa";
import './PaymentSuccess.scss'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { createPaidInvoice, updateStatusInvoice } from '../../services/saleServices'
import { toast } from 'react-toastify';

export const PaymentSuccess = () => {

    const location = useLocation();
    const history = useHistory()

    const searchParams = new URLSearchParams(location.search);

    const vnpAmount = searchParams.get('vnp_Amount');
    const vnp_PayDate = searchParams.get('vnp_PayDate');
    const vnpTxnRef = searchParams.get('vnp_TxnRef');
    const emailReceivers = searchParams.get('vnp_OrderInfo');

    const formattedDate = `${vnp_PayDate.slice(0, 4)}-${vnp_PayDate.slice(4, 6)}-${vnp_PayDate.slice(6, 8)}`;

    useEffect(() => {
        const postCreateInvoicePaid = async () => {
            let res = await createPaidInvoice({
                invoiceId: vnpTxnRef,
                datePaid: formattedDate,
                total: vnpAmount,
                paymentMethod: "Chuyển khoản",
                contentTransfer: `INV${vnpTxnRef}`,
                receivers: emailReceivers
            })
            let resUpdateStatusInvoice = await updateStatusInvoice(vnpTxnRef, { status: "S2" })

            if (resUpdateStatusInvoice?.EC !== 0 || res?.EC !== 0) {
                toast.error("Có lỗi xảy ra khi hoàn tất thanh toán!")
            }
        }
        if (vnpAmount && formattedDate && vnpTxnRef) {
            postCreateInvoicePaid()
        }
    }, [vnpAmount, formattedDate, vnpTxnRef])

    const handleBackToCustomerHome = () => {
        history.push('/customer')
    }

    return (
        <div className="container payment-success-container d-flex align-items-center justify-content-center">
            <div className='wrap-body-content d-flex flex-column align-items-center gap-2'>
                <FaCheckCircle style={{ color: "rgb(22 163 74)", fontSize: "8em" }} />
                <h3>Thanh toán thành công!</h3>
                <h6>Bạn đã thanh toán thành công hóa đơn INV{vnpTxnRef ?? 1} với số tiền {vnpAmount && (parseInt(vnpAmount) / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}.</h6>
                <div className='wrap-button-back'>
                    <button className='btn btn-main' onClick={handleBackToCustomerHome}>Thanh toán hóa đơn khác</button>
                </div>
            </div>
        </div>
    )
}
