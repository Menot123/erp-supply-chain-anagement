import React, { useState, useRef, useEffect } from 'react'
import './ViewQuote.scss'
import { Alert, Affix, Table, Input, Button, Tooltip } from 'antd';
import { FaArrowRightLong, FaComment } from "react-icons/fa6";
import { useHistory } from 'react-router-dom';
import { FaHome, FaPrint, FaUpload } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { TiTimes } from "react-icons/ti";
import Modal from 'react-bootstrap/Modal';
import SignatureCanvas from 'react-signature-canvas'
import { FaRegTrashAlt } from "react-icons/fa";
import { getBase64 } from '../../utils/functions'
import { useReactToPrint } from 'react-to-print';
import { ModalRejectQuote } from '../Sales/Modal/ModalRejectQuote';
import { Comments } from '../Comments/Comments';
import { FormattedMessage } from 'react-intl'

export const ViewQuote = () => {

    const history = useHistory()
    const [signature, setSignature] = useState()
    const canvasRef = useRef(null);
    const [typeSignature, setTypeSignature] = useState('auto')
    const [isShowModalSignature, setIsShowModalSignature] = useState(false)
    const [isShowModalRejectQuote, setIsShowModalRejectQuote] = useState(false)
    const [dataSignature, setDataSignature] = useState(null)
    const [signatureFillInQuote, setSignatureFillInQuote] = useState(null)
    const [submitSignature, setSubmitSignature] = useState(false);
    const componentPDF = useRef()
    const [isCancelQuote, setIsCancelQuote] = useState(false)
    const commentRef = useRef()

    useEffect(() => {
        const autoSignature = (name) => {
            const canvas = canvasRef.current
            if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.font = '120px "Brush Script MT"';
                // Căn giữa chữ ký
                const textWidth = ctx.measureText(signature).width;
                const centerX = (canvas.width - textWidth) / 2;
                const centerY = canvas.height / 2;
                ctx.fillText(name, centerX, centerY);

                const imageDataURL = canvas.toDataURL(); // Chuyển đổi canvas thành đường dẫn hình ảnh

                setDataSignature(imageDataURL); // Lưu đường dẫn hình ảnh vào state
            }
        }

        if (typeSignature === 'auto' && isShowModalSignature) {
            autoSignature('Felix');
        }
    }, [typeSignature, signature, isShowModalSignature]);

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Quote_S0003",
        bodyClass: 'py-4 px-4'

    })

    const backPreviousPage = () => {
        history.goBack()
    }

    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'product',
        },
        {
            title: 'Số lượng',
            className: 'column-quantity',
            dataIndex: 'quantity',
            align: 'center',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
        },
        {
            title: 'Thuế',
            dataIndex: 'tax',
        },
        {
            title: 'Số tiền',
            dataIndex: 'total',
        },
    ];
    const data = [
        {
            key: '1',
            product: 'Product 1',
            quantity: '1',
            price: '16.000.000 đ',
            tax: 'Thuế GTGT phải nộp 10%',
            total: '16.000.000 đ',
        },
        {
            key: '2',
            product: 'Product 2',
            quantity: '2',
            price: '16.000.000 đ',
            tax: 'Thuế GTGT phải nộp 10%',
            total: '16.000.000 đ',
        },
    ];

    const handleShowModalSignature = () => {
        setIsShowModalSignature(true)
    }

    const handleCloseModalSignature = () => {
        setIsShowModalSignature(false)
    }

    const handleClearSignature = () => {
        signature.clear()
    }

    const handleGenerateSignature = (type) => {
        if (type === 'auto') {
            setDataSignature('')
            setTypeSignature('auto')
        } else if (type === 'draw') {
            setDataSignature('')
            setTypeSignature('draw')
        } else {
            setDataSignature('')
            setTypeSignature('upload')
        }
    };

    const handleUploadSignature = async (e) => {
        let dataFile = e.target.files
        let img = dataFile[0]
        if (img) {
            let imgBase64 = await getBase64(img)
            setDataSignature(imgBase64)
        }
    }

    const handleSaveDrawSignature = () => {
        const res = signature.getTrimmedCanvas().toDataURL('image/jpeg')
        setSignatureFillInQuote(res)
    }

    const handleSubmitSignature = () => {
        switch (typeSignature) {
            case 'draw':
                setSubmitSignature(true)
                setTimeout(() => {
                    handleSaveDrawSignature()
                    handleCloseModalSignature()
                    setSubmitSignature(false)
                }, 2000)
                break;
            case 'auto':
            case 'upload':
                setSubmitSignature(true)
                setTimeout(() => {
                    setSignatureFillInQuote(dataSignature)
                    handleCloseModalSignature()
                    setSubmitSignature(false)
                }, 2000)
                break;
            default:
            // code block
        }

    }

    const handleScrollToComment = () => {
        commentRef.current.scrollIntoView()
    }

    return (
        <>
            <div className='container container-view-quote'>
                <Alert
                    className='my-3 text-center'
                    description={
                        <div>
                            {`This is a preview of the customer portal. `}

                            <b className='hover-item' onClick={backPreviousPage}><FaArrowRightLong /> Trở lại chế độ chỉnh sửa </b>
                        </div>
                    }
                    type="info"
                    closable
                />
                <div className='location-page'>
                    <FaHome /> / <span>Đơn bán hàng</span> / <span>Báo giá S00003</span>
                </div>
                <div className='wrapper-content-view-quote'>
                    <div className='content-left'>
                        <Affix offsetTop={100} className='fixed-content-left'>
                            <div>
                                <h2>32.000 ₫</h2>
                                <button className='btn btn-main  btn-accept' onClick={handleShowModalSignature}><MdDone /> Chấp nhận & ký</button>
                                <button className='btn btn-view-detail' onClick={generatePDF}><FaPrint /> Lưu báo giá</button>
                            </div>
                        </Affix>

                    </div>

                    <div className='content-right'>
                        {isCancelQuote &&
                            <Alert
                                className='my-3 text-center'
                                description={
                                    <div>

                                        <b>Báo giá này đã bị huỷ. <FaComment className='hover-item' onClick={handleScrollToComment} /></b>
                                        {' Liên hệ với chúng tôi để nhận báo giá mới.'}
                                    </div>
                                }
                                type="error"
                                closable
                            />
                        }

                        <div ref={componentPDF} style={{ width: '100%' }}>
                            <h2>Báo giá - S00003</h2>
                            <div className='wrap-inf-quote d-flex gap-4'>
                                <div className='inf-selling w-50 '>
                                    <h5>Thông tin bán hàng</h5>
                                    <hr className='mt-1 mb-2' />
                                    <div className='date-created d-flex'>
                                        <span className='label-date'>Ngày:</span>
                                        <span>07/05/2024</span>
                                    </div>
                                    <div className='date-expiration d-flex'>
                                        <span className='label-date'>Ngày hết hạn:	</span>
                                        <span>07/06/2024</span>
                                    </div>
                                </div>

                                <div className='address-bill-delivery w-50 '>
                                    <h5>Địa chỉ xuất hóa đơn và giao hàng</h5>
                                    <hr className='mt-1 mb-2' />
                                    <span>Felix</span> <br />
                                    <span><IoMdMail /> felix@gmail.com</span>
                                </div>
                            </div>

                            <Table
                                className='mt-4'
                                columns={columns}
                                dataSource={data}
                                pagination={false}
                            />

                            <div className='row'>
                                <div className='col-6'></div>
                                <div className='col-6 wrapper-price'>
                                    <div className='price-before-tax d-flex justify-content-between bottom-line'>
                                        <span className='title-price-before-tax'>Số tiền trước thuế</span>
                                        <span>40 ₫</span>
                                    </div>

                                    <div className='tax d-flex justify-content-between bottom-line'>
                                        <span>Thuế GTGT 10%</span>
                                        <span>4 ₫</span>
                                    </div>

                                    <div className='total d-flex justify-content-between bottom-line'>
                                        <span className='title-total'>Tổng</span>
                                        <span>44 ₫</span>
                                    </div>

                                </div>
                                <div className='col-6'></div>
                                <div className='col-6 text-center mt-3 col-signatured'>
                                    {signatureFillInQuote &&
                                        <>
                                            <h5>Chữ ký</h5>
                                            <div className='wrap-img-signatured'>
                                                <img className='signatured' alt='signatured' src={signatureFillInQuote}></img>
                                            </div>
                                            <span className='signatured-text'>Felix</span>
                                        </>
                                    }
                                </div>

                            </div>

                            <div className='policy-condition mt-4'>
                                <h5>Điều khoản & điều kiện</h5>
                                <hr className='mt-1 mb-2' />
                                <span>Uy tín</span>
                            </div>

                            <div className='policy-condition mt-4'>
                                <h5>Điều khoản thanh toán</h5>
                                <hr className='mt-1 mb-2' />
                                <span>Điều khoản thanh toán: 21 ngày</span>
                            </div>
                        </div>

                        <div className='btn-actions d-flex justify-content-center gap-2'>
                            <button className='btn btn-main' onClick={handleShowModalSignature}><MdDone /> Chấp nhận & ký</button>
                            <button className='btn btn-reply hover-item' onClick={handleScrollToComment}><FaComment /> Phản hồi</button>
                            <button className='btn btn-danger' onClick={() => setIsShowModalRejectQuote(true)}><TiTimes /> Từ chối</button>

                        </div>

                        <h4 className='mt-3' ref={commentRef}><FormattedMessage id="comment-quote-title" /></h4>
                        <Comments />
                    </div>
                </div>
            </div>
            <Modal show={isShowModalSignature}
                backdrop="static"
                keyboard={false}
                size="lg"
                style={{ zIndex: '900' }}
                onHide={() => handleCloseModalSignature()}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5>Xác nhận đơn hàng</h5>
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <span>Bằng việc ký tên, bạn xác nhận bàn giao thay cho <strong>Duy</strong> cho <strong>6.655 ₫</strong> báo giá.</span> <br />
                    <strong>Điều khoản thanh toán: 21 ngày</strong>

                    <div className='mt-4'>
                        <span>Họ và tên</span>
                    </div>
                    <Input placeholder="Basic usage" value='DUY' />

                    <div className='wrapper-signature-canvas'>

                        <div className='header-signature-actions d-flex align-item-center justify-content-between'>
                            <div className='btn-actions'>
                                <button className='btn btn-draw' onClick={() => handleGenerateSignature('auto')}>Tự động</button>
                                <button className='btn btn-draw mx-2' onClick={() => handleGenerateSignature('draw')}>Vẽ</button>
                                <button className='btn btn-upload' onClick={() => handleGenerateSignature('upload')}>Nạp</button>
                            </div>

                            {typeSignature && typeSignature === 'draw'
                                &&
                                <div className='action-clear-signature'>
                                    <FaRegTrashAlt onClick={handleClearSignature} />
                                </div>
                            }

                            {typeSignature && typeSignature === 'upload'
                                &&
                                <div className='action-upload-signature'>
                                    <input hidden id="img-upload" type='file'
                                        onChange={(e) => handleUploadSignature(e)}
                                    />
                                    <Tooltip placement="left" title='Upload your signature'>
                                        <label className='label-upload' htmlFor="img-upload"><FaUpload /></label>
                                    </Tooltip>

                                </div>
                            }
                        </div>

                        {typeSignature && (typeSignature === 'auto' || typeSignature === 'draw') &&
                            <div className='line-signature'></div>
                        }

                        {typeSignature && typeSignature === 'auto'
                            &&
                            <div className='wrapper-auto-signature'>
                                <canvas className='auto-signature' ref={canvasRef} width={760} height={200} />
                            </div>
                        }

                        {typeSignature && typeSignature === 'draw'
                            &&
                            <div className='wrapper-draw-signature'>
                                <SignatureCanvas
                                    penColor='black'
                                    dotSize={3}
                                    ref={(ref) => setSignature(ref)}
                                    backgroundColor='rgba(255,255,255,1)'
                                    canvasProps={{ width: 760, height: 200, className: 'sigCanvas' }}
                                />
                            </div>
                        }

                        {typeSignature && typeSignature === 'upload'
                            &&
                            <div className='image-signature-uploaded'>
                                {dataSignature && <img alt="signature-upload" src={dataSignature ? dataSignature : ''} className='img-signature-uploaded' />}

                            </div>
                        }

                    </div>

                    <div className='wrapper-btn-accept-sign mt-3'>
                        <Button
                            onClick={handleSubmitSignature}
                            className='btn-main btn-accept float-end'
                            loading={submitSignature}>
                            {!submitSignature && <MdDone className='me-1' />}
                            <span>
                                Chấp nhận & ký
                            </span></Button>
                    </div>
                </Modal.Body>

            </Modal >
            <ModalRejectQuote
                show={isShowModalRejectQuote}
                close={() => setIsShowModalRejectQuote(false)}
                cancelQuote={() => setIsCancelQuote(true)}
            />
        </>

    )
}
