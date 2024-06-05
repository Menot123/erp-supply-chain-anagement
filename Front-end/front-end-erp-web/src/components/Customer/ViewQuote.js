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
import { getDataQuotePreview } from '../../services/saleServices'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';

export const ViewQuote = () => {

    const language = useSelector(state => state.language.value)
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
    const [dataPreview, setDataPreview] = useState(null)
    const [dataProducts, setDataProducts] = useState([])
    const location = useLocation();
    const [nameCustomer, setNameCustomer] = useState('')

    useEffect(() => {
        const path = location.pathname
        const orderId = path.split("/").pop();

        const fetchDataQuotePreview = async () => {
            const res = await getDataQuotePreview(orderId)
            if (res.EC === 0) {
                let customer = res?.DT?.dataCustomer?.fullName
                customer = customer.split(' ')
                if (customer && customer.length > 0) {
                    setNameCustomer(customer[customer.length - 1])
                }
                setDataPreview({ ...res?.DT, tax: JSON.parse(res?.DT?.tax), productList: JSON.parse(res?.DT?.productList) })
                buildDataTableProduct(JSON.parse(res?.DT?.productList))
            }
        }

        const buildDataTableProduct = (listProduct) => {
            let dataProducts = []
            if (listProduct.length > 0) {
                listProduct.map((product, index) => {
                    return dataProducts.push({
                        key: index,
                        product: product?.name,
                        quantity: product?.quantity,
                        price: product?.price,
                        tax: 'Thuế GTGT phải nộp ' + product?.tax?.label,
                        total: product?.priceBeforeTax.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                    })
                })
            }
            setDataProducts(dataProducts)
        }


        fetchDataQuotePreview()
    }, [location.pathname])

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
            autoSignature(nameCustomer ?? 'name');
        }
    }, [typeSignature, signature, isShowModalSignature, nameCustomer]);

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
            title: <FormattedMessage id="new_quote.preview-table-product" />,
            dataIndex: 'product',
        },
        {
            title: <FormattedMessage id="new_quote.preview-table-quantity" />,
            className: 'column-quantity',
            dataIndex: 'quantity',
            align: 'center',
        },
        {
            title: <FormattedMessage id="new_quote.preview-table-product-price" />,
            dataIndex: 'price',
        },
        {
            title: <FormattedMessage id="new_quote.preview-table-taxes" />,
            dataIndex: 'tax',
        },
        {
            title: <FormattedMessage id="new_quote.preview-table-Amount" />,
            dataIndex: 'total',
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;

        return formattedDate;
    }

    const handleChangeNameCustomer = (e) => {
        setNameCustomer(e.target.value)
    }

    return (
        <>
            <div className='container container-view-quote'>
                <Alert
                    className='my-3 text-center'
                    description={
                        <div>
                            {<FormattedMessage id="new_quote.preview-title-dialog" />}

                            <b className='hover-item ms-2' onClick={backPreviousPage}><FaArrowRightLong /> <FormattedMessage id="new_quote.preview-title-dialog-back" /></b>
                        </div>
                    }
                    type="info"
                    closable
                />
                <div className='location-page'>
                    <FaHome /> / <span><FormattedMessage id="new_quote.preview-location" /></span> / <span><FormattedMessage id="new_quote.preview-quote-code" />{dataPreview?.quoteId}</span>
                </div>
                <div className='wrapper-content-view-quote'>
                    <div className='content-left'>
                        <Affix offsetTop={100} className='fixed-content-left'>
                            <div>
                                <h2>{dataPreview && dataPreview?.totalPrice !== 0 ? (+dataPreview?.totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '0₫'}</h2>
                                <button className='btn btn-main  btn-accept' onClick={handleShowModalSignature}><MdDone /><FormattedMessage id="new_quote.preview-btn-sign" /></button>
                                <button className='btn btn-view-detail' onClick={generatePDF}><FaPrint /><FormattedMessage id="new_quote.preview-btn-save-pdf" /></button>
                            </div>
                        </Affix>

                    </div>

                    <div className='content-right'>
                        {isCancelQuote &&
                            <Alert
                                className='my-3 text-center'
                                description={
                                    <div>

                                        <b><FormattedMessage id="new_quote.preview-message-quote-canced" /> <FaComment className='hover-item' onClick={handleScrollToComment} /></b>
                                        {<FormattedMessage id="new_quote.preview-message-contact-us" />}
                                    </div>
                                }
                                type="error"
                                closable
                            />
                        }

                        <div ref={componentPDF} style={{ width: '100%' }}>
                            <h2><FormattedMessage id="new_quote.preview-title-quote-code" />{dataPreview?.quoteId}</h2>
                            <div className='wrap-inf-quote d-flex gap-4'>
                                <div className='inf-selling w-50 '>
                                    <h5><FormattedMessage id="new_quote.preview-inf-sale-order" /></h5>
                                    <hr className='mt-1 mb-2' />
                                    <div className='date-created d-flex'>
                                        <span className='label-date'><FormattedMessage id="new_quote.preview-created-date" /></span>
                                        <span>{formatDate(dataPreview?.createdAt)}</span>
                                    </div>
                                    <div className='date-expiration d-flex'>
                                        <span className='label-date'><FormattedMessage id="new_quote.preview-date-expiration" /></span>
                                        <span>{formatDate(dataPreview?.expirationDay)}</span>
                                    </div>
                                </div>

                                <div className='address-bill-delivery w-50 '>
                                    <h5><FormattedMessage id="new_quote.preview-shipping-address" /></h5>
                                    <hr className='mt-1 mb-2' />
                                    <span>{dataPreview?.dataCustomer?.fullName}</span> <br />
                                    <span><IoMdMail /> {dataPreview?.dataCustomer?.email}</span>
                                </div>
                            </div>

                            <Table
                                className='mt-4'
                                columns={columns}
                                dataSource={dataProducts ?? []}
                                pagination={false}
                            />

                            <div className='row'>
                                <div className='col-6'></div>
                                <div className='col-6 wrapper-price'>
                                    <div className='price-before-tax d-flex justify-content-between bottom-line'>
                                        <span className='title-price-before-tax'><FormattedMessage id="new_quote.preview-table-amount-before-tax" /></span>
                                        <span>{(+dataPreview?.priceBeforeTax).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                    </div>

                                    {
                                        dataPreview && dataPreview?.tax && Object.keys(dataPreview?.tax).map((taxValue, index) => (
                                            <div key={'tax-total' + index} className='tax d-flex justify-content-between bottom-line'>
                                                <span><FormattedMessage id="new_quote.VAT" /> {taxValue}% : </span>
                                                <span>{dataPreview?.tax[taxValue].toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                            </div>
                                        ))
                                    }

                                    <div className='total d-flex justify-content-between bottom-line'>
                                        <span className='title-total'><FormattedMessage id="new_quote.total" /></span>
                                        <span>{dataPreview && dataPreview?.totalPrice !== 0 ? (+dataPreview?.totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '0₫'}</span>
                                    </div>

                                </div>
                                <div className='col-6'></div>
                                <div className='col-6 text-center mt-3 col-signatured'>
                                    {signatureFillInQuote &&
                                        <>
                                            <h5><FormattedMessage id="new_quote.preview-modal-sign-title-area" /></h5>
                                            <div className='wrap-img-signatured'>
                                                <img className='signatured' alt='signatured' src={signatureFillInQuote}></img>
                                            </div>
                                            <span className='signatured-text'>{dataPreview?.dataCustomer?.fullName ? dataPreview?.dataCustomer?.fullName : 'name'}</span>
                                        </>
                                    }
                                </div>

                            </div>

                            <div className='policy-condition mt-4'>
                                <h5><FormattedMessage id="new_quote.preview-policy-conditions" /></h5>
                                <hr className='mt-1 mb-2' />
                                <span>{dataPreview?.policyAndCondition}</span>
                            </div>

                            <div className='policy-condition mt-4'>
                                <h5><FormattedMessage id="new_quote.preview-policy-payment" /></h5>
                                <hr className='mt-1 mb-2' />
                                <span><FormattedMessage id="new_quote.preview-policy-payment" /> {language === 'vi' ? dataPreview?.dataPaymentPolicy?.valueVi : dataPreview?.dataPaymentPolicy?.valueEn}</span>
                            </div>
                        </div>

                        <div className='btn-actions d-flex justify-content-center gap-2'>
                            <button className='btn btn-main' onClick={handleShowModalSignature}><MdDone /><FormattedMessage id="new_quote.preview-btn-sign" /></button>
                            <button className='btn btn-reply hover-item' onClick={handleScrollToComment}><FaComment /> <FormattedMessage id="new_quote.preview-btn-comment" /></button>
                            <button className='btn btn-danger' onClick={() => setIsShowModalRejectQuote(true)}><TiTimes /> <FormattedMessage id="new_quote.preview-btn-cancel" /></button>

                        </div>

                        <h4 className='mt-3' ref={commentRef}><FormattedMessage id="new_quote.preview-btn-history-comment" /></h4>
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
                        <h5><FormattedMessage id="new_quote.preview-policy-payment" /></h5>
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <span><FormattedMessage id="new_quote.preview-modal-sign-content-1" /> <strong>{nameCustomer ?? ''}</strong> <FormattedMessage id="new_quote.preview-modal-sign-content-for" /> <strong>{(dataPreview?.totalPrice && (+dataPreview?.totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })) ?? '0'}</strong> báo giá.</span> <br />
                    <strong><FormattedMessage id="new_quote.preview-policy-payment" />: {language === 'vi' ? dataPreview?.dataPaymentPolicy?.valueVi : dataPreview?.dataPaymentPolicy?.valueEn}</strong>

                    <div className='mt-4'>
                        <span><FormattedMessage id="new_quote.preview-modal-sign-name" /></span>
                    </div>
                    <Input placeholder="Basic usage" value={nameCustomer} onChange={(e) => handleChangeNameCustomer(e)} />

                    <div className='wrapper-signature-canvas'>

                        <div className='header-signature-actions d-flex align-item-center justify-content-between'>
                            <div className='btn-actions'>
                                <button className='btn btn-draw' onClick={() => handleGenerateSignature('auto')}><FormattedMessage id="new_quote.preview-modal-sign-btn-auto" /></button>
                                <button className='btn btn-draw mx-2' onClick={() => handleGenerateSignature('draw')}><FormattedMessage id="new_quote.preview-modal-sign-btn-draw" /></button>
                                <button className='btn btn-upload' onClick={() => handleGenerateSignature('upload')}><FormattedMessage id="new_quote.preview-modal-sign-btn-import" /></button>
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
                                <FormattedMessage id="new_quote.preview-btn-sign" />
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
