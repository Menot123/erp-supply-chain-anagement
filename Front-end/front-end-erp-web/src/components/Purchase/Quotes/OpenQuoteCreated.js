import React, { useEffect, useRef } from 'react'
import './NewQuote.scss'
import { useHistory } from 'react-router-dom'
import { Steps, Select, Tooltip, DatePicker, Tabs } from "antd";
import { useState } from 'react'
import { TableProducts } from './TableProducts';
import { getAllProducts } from '../../../services/inventoryServices'
import { getCustomers, getAllCodes } from '../../../services/saleServices'
import { toast } from 'react-toastify';
import { OtherInfo } from './OtherInfo';
import { ModalSendQuoteToEmail } from '../Modal/ModalSendQuoteToEmail';
import { validateData } from '../../../utils/functions'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { QuotePDF } from './QuotePDF';
import { postDataInvoice, confirmInvoice } from '../../../services/saleServices'
import { getLatestQuoteCode, postDataQuote } from '../../../services/purchaseServices'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux';
import { ModalCancelQuote } from '../Modal/ModalCancelQuote';
import { ModalSendInvoiceToEmail } from '../Modal/ModalSendInvoiceToEmail';
import { InvoicePDF } from './InvoicePDF';
import { ModalConfirmPaid } from '../Modal/ModalConfirmPaid';
import { useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getDataInvoicePreview } from '../../../services/saleServices'
import { getDataQuotePreview } from '../../../services/purchaseServices'
import { createNewReceipt, createProductListOfReceiptArray } from '../../../services/inventoryServices'


import dayjs from 'dayjs';

export const OpenQuoteCreated = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const idUser = useSelector(state => state.user.id)
    const componentPDF = useRef(null)
    const intl = useIntl();
    const language = useSelector(state => state.language.value)
    const email = useSelector(state => state.user.email)

    const defaultDataQuote = {
        quoteId: '',
        providerId: '',
        expirationDay: '',
        currency: '',
        paymentPolicy: '',
        productList: [],
        policyAndCondition: '',
        createdUser: email ?? '',
        updatedUser: email ?? '',
        priceBeforeTax: '',
        tax: '',
        totalPrice: '',
        status: '',
    }

    const defaultDataOtherInfoQuote = {
        employeeId: '',
        deliveryDate: '',
    }

    const [dataQuote, setDataQuote] = useState(defaultDataQuote)
    const [currentStepQuote, setCurrentStepQuote] = useState(2);
    const [currentStepInvoice, setCurrentStepInvoice] = useState(0);
    const [listProduct, setListProduct] = useState([])
    const memoizedListProduct = useMemo(() => listProduct, [listProduct]);
    const [customersSelect, setCustomersSelect] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState([])
    const [providerList, setCustomerList] = useState([])
    const [fullDataProvider, setFullDataProvider] = useState({})
    const [paymentPolicyToQuote, setPaymentPolicyToQuote] = useState('')
    const [currencySelect, setCurrencySelect] = useState([])
    const [timePayment, setTimePayment] = useState([])
    const [otherInfoQuote, setOtherInfoQuote] = useState(defaultDataOtherInfoQuote)
    const [isShowModalSendQuote, setIsShowModalSendQuote] = useState(false)
    const [isShowModalSendInvoice, setIsShowModalSendInvoice] = useState(false)
    const [isShowModalCancelQuote, setIsShowModalCancelQuote] = useState(false)
    const [isSendingQuote, setIsSendingQuote] = useState(false)

    const [dataSendQuotePDF, setDataSendQuotePDF] = useState([])
    const [dataStep, setDataStep] = useState([])
    const [isCreateInvoice, setIsCreateInvoice] = useState(false)
    const [dateCreateInvoice, setDateCreateInvoice] = useState(null)
    const [isShowModalConfirmPaid, setIsShowModalConfirmPaid] = useState(false)
    const [isShowBannerPaid, setIsShowBannerPaid] = useState(false)
    const [isPaid, setIsPaid] = useState(false)

    const [dataProviderSelect, setDataCustomerSelect] = useState(null)
    const [expirationDay, setExpirationDay] = useState(null)
    const [currency, setCurrency] = useState(null)
    const [paymentPolicy, setPaymentPolicy] = useState(null)
    const [policyAndCondition, setPolicyAndCondition] = useState(null)
    const [productAdded, setProductAdded] = useState(null)
    const [isLoadingData, setIsLoadingData] = useState(false)
    const isDisable = true
    let isMounted = false;

    let defaultStep = {
        status1: 'wait',
        status2: 'wait',
        status3: 'process',
        status4: 'wait',
    }

    let defaultCreateInvoiceStep1 = {
        status1: 'wait',
        status2: 'wait',
        status3: 'process',
        status4: 'wait',
    }

    let defaultCreateInvoiceStep2 = {
        status1: 'wait',
        status2: 'process',
        status3: 'wait',
        status4: 'wait',
    }

    const [arrCurrentStep, setArrCurrentStep] = useState(defaultStep)
    const [arrCurrentInvoiceStep, setArrInvoiceCurrentStep] = useState(defaultCreateInvoiceStep1)

    useEffect(() => {
        // const path = location.pathname
        // const orderId = path.split("/").pop();
        // const invoiceId = path.split("/").pop();
        // let currentURL = path.split("/")
        // currentURL = currentURL[currentURL.length - 2]
        // setCurrentURL(currentURL)

        const fetchDataQuotePreview = async () => {
            setIsLoadingData(true)
            const res = await getDataQuotePreview(id)
            // console.log(res)
            if (res.EC === 0) {
                if (res?.DT && res?.DT?.status === 'S1') {
                    setCurrentStepQuote(1)
                    changeStep(1)
                } else if (res?.DT && res?.DT?.status === 'S2') {
                    setCurrentStepQuote(2)
                    changeStep(2)
                }
                else {
                    setCurrentStepQuote(1)
                    changeStep(1)
                }
                setDataQuote({ ...res?.DT, total: res?.DT?.totalPrice, productList: JSON.parse(res?.DT?.productList), fullDataProvider: res?.DT?.dataProvider })
                setOtherInfoQuote({ employeeId: res?.DT?.employeeId, deliveryDate: res?.DT?.deliveryDate })
                setDataCustomerSelect({ label: res?.DT?.dataProvider?.nameVi, value: res?.DT?.dataProvider?.providerId })
                setExpirationDay(res?.DT?.expirationDay)
                setCurrency({ value: res?.DT?.currency, label: res?.DT?.dataCurrency?.valueVi })
                setPaymentPolicy({ label: res?.DT?.dataPaymentPolicy?.valueVi, value: res?.DT?.paymentPolicy })
                setPolicyAndCondition(res?.DT?.policyAndCondition)
                setProductAdded(JSON.parse(res?.DT?.productList))
                let customer = res?.DT?.dataProvider?.nameVi
                customer = customer.split(' ')
                if (customer && customer.length > 0) {
                    // setNameCustomer(customer[customer.length - 1])
                }
                // setDataPreview({ ...res?.DT, tax: JSON.parse(res?.DT?.tax), productList: JSON.parse(res?.DT?.productList) })
                buildDataTableProduct(JSON.parse(res?.DT?.productList))
            }
            setIsLoadingData(false)
        }

        // const fetchDataDraftInvoice = async () => {
        //     setIsLoadingData(true)
        //     const res = await getDataInvoicePreview(invoiceId)
        //     if (res.EC === 0) {
        //         let customer = res?.DT?.dataProviderInvoice?.nameVi
        //         customer = customer.split(' ')
        //         if (customer && customer.length > 0) {
        //             setNameCustomer(customer[customer.length - 1])
        //         }
        //         setDataPreview({ ...res?.DT, tax: JSON.parse(res?.DT?.tax), productList: JSON.parse(res?.DT?.productList) })
        //         buildDataTableProduct(JSON.parse(res?.DT?.productList))
        //     }
        //     setIsLoadingData(false)
        // }

        const buildDataTableProduct = (listProduct) => {
            let dataProducts = []
            if (listProduct.length > 0) {
                listProduct.map((product, index) => {
                    return dataProducts.push({
                        key: index,
                        product: product?.name,
                        quantity: product?.quantity,
                        price: Number(product?.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                        tax: intl.formatMessage({ id: "table-preview-tax" }) + " " + product?.tax?.label,
                        total: product?.priceBeforeTax.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                    })
                })
            }
            // setDataProducts(dataProducts)
        }

        // if (currentURL === 'invoice') {
        //     fetchDataDraftInvoice()
        // } else {
        //     fetchDataQuotePreview()
        // }
        fetchDataQuotePreview()
    }, [id, intl])

    const fetchLatestQuoteCode = async () => {
        let res = await getLatestQuoteCode()
        if (res?.EC === 0) {
            let currentId = null
            if (res?.DT && res?.DT.length > 0) {
                currentId = +res?.DT[0]?.quoteId + 1
            } else {
                currentId = 1
            }
            setDataQuote((prevState) => ({
                ...prevState,
                quoteId: currentId
            }))
        }
    }


    const changeStep = (step) => {
        if (step === 1) {
            setCurrentStepQuote(step)
            setArrCurrentStep({
                status1: 'wait',
                status2: 'process',
                status3: 'wait',
                status4: 'wait',

            })
        } else if (step === 2) {
            setCurrentStepQuote(step)
            setArrCurrentStep({
                status1: 'wait',
                status2: 'wait',
                status3: 'process',
                status4: 'wait',
            })
        } else {
            setCurrentStepQuote(step)
            setArrCurrentStep({
                status1: 'wait',
                status2: 'wait',
                status3: 'wait',
                status4: 'process',
            })
        }
    }

    const getCustomerById = (providerId) => {
        const provider = providerList.find((provider) => provider.providerId === providerId);
        return provider;
    }

    const buildSelectCustomers = (listCustomer) => {
        let customersDataBuild = listCustomer.map((item, index) => {
            return (
                {
                    value: item.providerId,
                    label: item.nameVi
                }
            )
        })
        setCustomersSelect(customersDataBuild)
    }

    useEffect(() => {
        isMounted = true;
        return () => {
            isMounted = false;  // Clean up function sets isMounted to false
        };
    }, []);

    useEffect(() => {
        if (currentStepQuote === 3) {
            setDataStep([
                {
                    status: arrCurrentStep?.status1,
                    title: 'YCBG',
                },
                {
                    status: arrCurrentStep?.status2,
                    title: 'YCBG đã gửi',
                },
                {
                    status: arrCurrentStep?.status3,
                    title: 'Đơn mua hàng',
                },
                {
                    status: arrCurrentStep?.status4,
                    title: <FormattedMessage id="step-cancelled" />,
                },
            ])
        } else {
            setDataStep([
                {
                    status: arrCurrentStep?.status1,
                    title: 'YCBG',
                },
                {
                    status: arrCurrentStep?.status2,
                    title: 'YCBG đã gửi',
                },
                {
                    status: arrCurrentStep?.status3,
                    title: 'Đơn mua hàng',
                },
            ])
        }
    }, [currentStepQuote, arrCurrentStep])

    useEffect(() => {

        const buildSelectAllCodes = (listCodes) => {
            let codesDataBuild = []
            codesDataBuild = listCodes.map((item, index) => {
                return (
                    {
                        value: item?.id,
                        label: language === 'vi' ? item?.valueVi : item?.valueEn
                    }
                )
            })
            return codesDataBuild
        }

        const fetchAllProduct = async () => {
            const res = await getAllProducts()
            if (res && res.EC === 0) {
                setListProduct(res.DT)
            } else {
                toast.error(res.EM)
            }
        }
        const fetchCustomers = async () => {
            const res = await getCustomers()
            if (res && res.EC === 0) {
                setCustomerList(res.DT)
                buildSelectCustomers(res.DT)
            } else {
                toast.error(res.EM)
            }
        }

        const fetchAllCodes = async () => {
            const res = await getAllCodes()
            if (res && res.EC === 0 && res.DT) {
                let dataCurrency = res?.DT.filter(item => item?.type === 'Currency')
                let dataTimePayment = res?.DT.filter(item => item?.type === 'TimePayment')
                if (dataCurrency && dataCurrency.length > 0 && dataTimePayment && dataTimePayment.length > 0) {
                    setCurrencySelect(buildSelectAllCodes(dataCurrency))
                    setTimePayment(buildSelectAllCodes(dataTimePayment))
                }
            } else {
                toast.error(res.EM)
            }
        }

        Promise.all([fetchAllProduct(), fetchCustomers(), fetchAllCodes()])

    }, [language])

    const handleCreateNewDepartment = () => {
        fetchLatestQuoteCode()
    }

    const backToQuote = () => {
        history.push('/sale-order')
    }

    const onChangeDatePicker = (date, dateString) => {
        setExpirationDay(dateString)
        setDataQuote((prevState) => ({
            ...prevState,
            expirationDay: dateString
        }))
    };

    const onChangeTab = (key) => {
        console.log(key);
    };

    const handleChangeInputQuote = (e, type, label) => {
        // if (!isMounted) return;

        switch (type) {
            case 'providerId':
            case 'currency':
            case 'paymentPolicy':
            case 'totalPrice':
            case 'productList':
                if (type === 'providerId') {
                    setSelectedCustomer(label)
                    setFullDataProvider(getCustomerById(e))
                }
                if (type === 'paymentPolicy') {
                    setPaymentPolicyToQuote(label.label)
                    setPaymentPolicy({ value: e, label: label.label })
                }
                if (type === 'currency') {
                    setCurrency({ value: e, label: label })
                }
                setDataQuote((prevState) => ({
                    ...prevState,
                    [type]: e
                }))
                break;
            default:
                setDataQuote((prevState) => ({
                    ...prevState,
                    [type]: e.target.value
                }))
                break;
        }
    }



    const handleGeneratePdf = async (type) => {
        const quote = componentPDF.current
        try {
            const canvas = await html2canvas(quote, {
                scale: 1, // Tăng độ phân giải lên gấp đôi (neu bang 2 thi size file lon)
                useCORS: true, // Sử dụng Cross-Origin Resource Sharing nếu cần thiết
            });
            const imgQuote = canvas.toDataURL("image/png", 1.0);

            const pdf = new jsPDF({
                orientation: "vertical",
                unit: 'px',
                format: "a4",
            })

            const padding = 20; // Kích thước padding mong muốn

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = pdfWidth - (padding * 2);
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            const imgX = padding;
            const imgY = padding;

            pdf.addImage(imgQuote, "PNG", imgX, imgY, imgWidth, imgHeight);
            if (type && type === 'POST_API') {
                // setFilePDFBlob(pdf.output('blob'))
                return pdf.output('blob');
            }
            if (isShowModalSendInvoice) {
                pdf.save("INVOICE.pdf");
            } else {
                pdf.save("Quote.pdf");
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleSendQuoteToEmail = () => {
        const arrValidateFieldsQuote = ['providerId', 'expirationDay', 'currency']
        let check = validateData(arrValidateFieldsQuote, dataQuote)
        if (check && check.length === 0) {
            setDataSendQuotePDF(dataQuote)
            setIsShowModalSendQuote(true)
        } else {
            console.log(check)
            toast.warning(<FormattedMessage id="new_quote.toast-empty-field" />)
        }
    }
    const handleSendInvoiceToEmail = () => {
        const arrValidateFieldsQuote = ['providerId', 'expirationDay', 'currency']
        let check = validateData(arrValidateFieldsQuote, dataQuote)
        if (check && check.length === 0) {
            setDataSendQuotePDF(dataQuote)
            setIsShowModalSendInvoice(true)
        } else {
            console.log(check)
            toast.warning(<FormattedMessage id="new_quote.toast-empty-field" />)
        }
    }

    const handlePushDataQuotePreview = async (type) => {
        const arrValidateFieldsQuote = isCreateInvoice ? ['providerId', 'currency', 'paymentPolicy'] : ['providerId', 'expirationDay', 'currency', 'paymentPolicy']
        let check = validateData(arrValidateFieldsQuote, dataQuote)
        if (check && check.length === 0) {
            // Create an voice
            if (type === "invoice") {
                if (dateCreateInvoice) {
                    let res = await postDataInvoice({ ...dataQuote, totalPrice: dataQuote?.total, status: 'S0', dateCreateInvoice: dateCreateInvoice, invoiceId: dataQuote?.quoteId })
                    if (res?.EC === 0) {
                        const newTabUrl = `/my/invoice/${dataQuote?.quoteId}`;
                        window.open(newTabUrl, '_blank');
                    } else {
                        toast.error(<FormattedMessage id='new_quote.preview-toast-error' />)
                    }
                } else {
                    toast.warning(<FormattedMessage id="new_quote.preview-toast-empty-field" />)
                }
            } else {
                let res = await postDataQuote({ ...dataQuote, status: 'S0', dateCreateInvoice: dateCreateInvoice })
                if (res?.EC === 0) {
                    const newTabUrl = `/my/orders/${dataQuote?.quoteId}`;
                    window.open(newTabUrl, '_blank');
                } else {
                    toast.error(<FormattedMessage id='new_quote.preview-toast-error' />)
                }
            }
        } else {
            toast.warning(<FormattedMessage id="new_quote.preview-toast-empty-field" />)
        }
    }

    const handleClearDataQuote = () => {
        setDataSendQuotePDF([])
    }

    const handleConfirmQuote = async () => {
        if (dataQuote && dataQuote?.quoteId) {
            let res = await postDataQuote({ ...dataQuote, status: 'S2' })
            // console.log(res)
            if (res?.EC === 0) {
                // let createReceipt = createNewReceipt()
                let dataReceipt = {
                    providerId: dataQuote.providerId,
                    warehouseId: 'WH001',
                    purchaseId: 'QUO' + dataQuote.quoteId.toString(),
                    userId: idUser,
                    scheduledDate: dataQuote.expirationDay,
                    note: '',
                    status: 'ready'
                }
                let createReceipt = await createNewReceipt(dataReceipt)
                if (createReceipt.EC === 0) {
                    let stockCreatedId = createReceipt.DT

                    const arrayOfObjects = Array.from({ length: dataQuote.productList.length }, () => ({}));

                    for (let i = 0; i < arrayOfObjects.length; i++) {
                        arrayOfObjects[i].deadline = dataQuote.expirationDay
                        arrayOfObjects[i].scheduledDate = dataQuote.expirationDay
                        arrayOfObjects[i].quantity = dataQuote.productList[i].quantity
                        arrayOfObjects[i].description = dataQuote.productList[i].description
                        arrayOfObjects[i].stockEntryId = stockCreatedId
                        arrayOfObjects[i].productId = dataQuote.productList[i].productId
                    }

                    let addStockEntryItem = await createProductListOfReceiptArray(arrayOfObjects)

                    console.log(1)
                    console.log(arrayOfObjects)
                    console.log(2)
                    console.log(addStockEntryItem)

                    // toast.success(res.EM)
                    // handleCancelCreateInputWarehouse()
                }
                changeStep(2)
                toast.success('Tạo đơn mua hàng thành công')
                history.push('/manage-purchase')
            } else {
                toast.warning(<FormattedMessage id="new_quote.confirm-toast-empty-field" />)
            }
        }
    }

    const handleConfirmInvoice = async () => {
        const arrValidateFieldsQuote = ['providerId', 'paymentPolicy']
        let check = validateData(arrValidateFieldsQuote, dataQuote)
        if (check && check.length === 0 && dateCreateInvoice) {
            let res = await confirmInvoice({ ...dataQuote, dateCreateInvoice: dateCreateInvoice })
            if (res.EC !== 0) {
                toast.error("Something wrong when confirm invoice, please try again later")
            } else {
                setArrInvoiceCurrentStep(defaultCreateInvoiceStep2)
                setCurrentStepInvoice(1)
            }
        } else {
            toast.warning(<FormattedMessage id="new_quote.confirm-toast-empty-field" />)
        }

    }

    const setTaxAndPriceBeforeTax = useCallback((type, value) => {
        if (type === 'tax') {
            setDataQuote((prevState) => ({
                ...prevState,
                [type]: value
            }))
        } else {
            setDataQuote((prevState) => ({
                ...prevState,
                [type]: value
            }))
        }
    }, [])

    const handleCancelQuote = () => {
        setIsShowModalCancelQuote(true)
    }

    const handleCreateInvoice = () => {
        setIsCreateInvoice(true)
    }

    const handleChangeDateCreateInvoice = (date, dateString) => {
        setDateCreateInvoice(dateString)
    };

    const handleSendInvoice = () => {
        const arrValidateFieldsInvoice = ['providerId', 'expirationDay', 'paymentPolicy']
        let check = validateData(arrValidateFieldsInvoice, dataQuote)
        if (check && check.length === 0) {
            setDataSendQuotePDF(dataQuote)
            setIsShowModalSendInvoice(true)
        } else {
            toast.warning(<FormattedMessage id="new_quote.toast-empty-field" />)
        }
    }

    const handleBackToQuote = () => {
        history.push('/manage-purchase')
    }


    return (
        <div className='wrapper-create-quote'>
            <div className='header-create-quote'>
                <div className='btn-actions'>
                    <button onClick={() => handleBackToQuote()} className='ms-1 btn btn-outline-secondary btn-create-quote'>Trở về</button>
                </div>
                <div className='wrapper-text-header'>
                    <Tooltip placement="top" title='Back to "Báo giá"'>
                        <span onClick={backToQuote} className='title-quote' >Đơn hàng</span>
                    </Tooltip>
                    {/* <span onClick={backToQuote} className='title-quote' data-tooltip='Back to "Báo giá"'>Báo giá</span> */}
                    <span className='title-create'>{currentStepInvoice === 1 ? "INV" + dataQuote?.quoteId : 'Đơn mua hàng'}</span>
                </div>
            </div>
            <div className='wrapper-body-create-quote'>
                <div className='actions-status'>
                    <div className='wrap-btn-actions'>
                        {
                            currentStepQuote == 3 || isCreateInvoice ? "" :
                                <>
                                    {/* {currentStepQuote === 2 && <button className='btn btn-gray' onClick={handleCreateInvoice}><FormattedMessage id="btn-create-bill" /></button>} */}
                                    {currentStepQuote === 1 && <button className='btn btn-gray' onClick={handleSendQuoteToEmail}><FormattedMessage id="btn-send-quote" /></button>}
                                    {currentStepQuote === 2 && <button className='btn btn-gray' onClick={handleSendInvoiceToEmail}><FormattedMessage id="btn-send-quote" /></button>}
                                    {currentStepQuote === 1 && <button className='btn btn-gray' onClick={handleConfirmQuote}>Xác nhận đơn hàng</button>}
                                    {/* {currentStepQuote !== 2 && <button className='btn btn-gray' onClick={handleConfirmQuote}><FormattedMessage id="btn-confirm-quote" /></button>}
                                    <button className='btn btn-gray' onClick={handlePushDataQuotePreview}><FormattedMessage id="btn-preview-quote" /></button>
                                    {currentStepQuote === 2 && <button className='btn btn-gray' onClick={handleCancelQuote}><FormattedMessage id="btn-cancel-quote" /></button>} */}
                                </>
                            /* {
                                currentStepQuote === 3 || isCreateInvoice ? "" :
                                    <>
                                        {currentStepQuote === 2 && <button className='btn btn-gray' onClick={handleCreateInvoice}><FormattedMessage id="btn-create-bill" /></button>}
                                        {currentStepQuote !== 2 && <button className='btn btn-main' onClick={handleSendQuoteToEmail}><FormattedMessage id="btn-send-quote" /></button>}
                                        {currentStepQuote === 2 && <button className='btn btn-gray' onClick={handleSendQuoteToEmail}><FormattedMessage id="btn-send-quote" /></button>}
                                        {currentStepQuote !== 2 && <button className='btn btn-gray' onClick={handleConfirmQuote}><FormattedMessage id="btn-confirm-quote" /></button>}
                                        <button className='btn btn-gray' onClick={handlePushDataQuotePreview}><FormattedMessage id="btn-preview-quote" /></button>
                                        {currentStepQuote === 2 && <button className='btn btn-gray' onClick={handleCancelQuote}><FormattedMessage id="btn-cancel-quote" /></button>}
                                    </>
                            }
    
                            {
                                isCreateInvoice && currentStepInvoice === 0 ?
                                    <>
                                        <button className='btn btn-main' onClick={handleConfirmInvoice}><FormattedMessage id="btn-confirm-quote" /></button>
                                        <button className='btn btn-gray' onClick={() => handlePushDataQuotePreview("invoice")}><FormattedMessage id="btn-preview-quote" /></button>
                                        <button className='btn btn-gray' onClick={handleCancelQuote}><FormattedMessage id="btn-cancel-quote" /></button>
                                    </>
                                    :
                                    ""
    
                            }
                            {isCreateInvoice && currentStepInvoice === 1 ?
                                <>
                                    <button className='btn btn-main' onClick={handleSendInvoice}><FormattedMessage id="btn-send-invoice" /></button>
                                    {!isPaid && <button className='btn btn-main' onClick={() => setIsShowModalConfirmPaid(true)}><FormattedMessage id="btn-confirmed-payment" /></button>}
                                    <button className='btn btn-gray' onClick={() => handlePushDataQuotePreview("invoice")}><FormattedMessage id="btn-preview-quote" /></button>
                                </>
                                :
                                ""
                            } */
                        }
                    </div>
                    <div className={isCreateInvoice ? 'quote-status w30' : 'quote-status'}>
                        {isCreateInvoice ?
                            <Steps
                                type="navigation"
                                size="small"
                                current={currentStepInvoice}
                                className="site-navigation-steps quote-step"
                                items={[
                                    {
                                        status: arrCurrentInvoiceStep?.status1,
                                        title: <FormattedMessage id="step-draw-invoice" />,
                                    },
                                    {
                                        status: arrCurrentInvoiceStep?.status2,
                                        title: <FormattedMessage id="step-invoiced" />,
                                    }
                                ]} />
                            :
                            <Steps
                                type="navigation"
                                size="small"
                                current={currentStepQuote}
                                className="site-navigation-steps quote-step"
                                items={dataStep ?? []}

                            />
                        }

                    </div>
                </div>
                <div className='body-create-quote'>
                    {
                        isShowBannerPaid && <span className='text-paid text-bg-success'>ĐÃ THANH TOÁN</span>
                    }
                    {isCreateInvoice ? <span style={{ fontWeight: "500" }}><FormattedMessage id="new_quote.create-invoice-title" /></span> : ""}
                    <h3>{isCreateInvoice ?
                        (currentStepInvoice === 1 ? "INV" + dataQuote?.quoteId : <FormattedMessage id="new_quote.create-invoice-draft" />)
                        :
                        (id ? `Đơn hàng - S${id}` : <FormattedMessage id="btn-new-quote" />)}</h3>
                    <div className='wrap-info-quote'>
                        <div className='content-left'>
                            <label htmlFor='select-customer'>Nhà cung cấp</label>
                            <Select
                                showSearch
                                id='select-customer'
                                className='select-customer'
                                variant="borderless"
                                placeholder='Nhập thông tin nhà cung cấp'
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                // options={customersSelect}
                                value={dataProviderSelect}
                                disabled
                                onChange={(e, label) => handleChangeInputQuote(e, 'providerId', label)}
                            />

                        </div>
                        <div className='content-right'>
                            <div className='wrap-createInvoice-date'>
                                <label htmlFor='select-date-createInvoice'>Ngày đặt hàng</label>
                                <DatePicker
                                    className='select-date-createInvoice'
                                    // onChange={handleChangeDateCreateInvoice}
                                    suffixIcon={false}
                                    variant="borderless"
                                    placeholder=''
                                    size='middle'
                                    id='select-date-createInvoice'
                                    key="create-invoice"
                                    value={dataQuote.createdAt ? dayjs(dataQuote.createdAt) : null}
                                />
                            </div>

                            <div className='wrap-expiration-date'>
                                <label htmlFor='select-date-expiration'>Ngày giao hàng dự kiến</label>
                                <DatePicker
                                    key="expiration-date"
                                    className='select-date-expiration'
                                    format='YYYY-MM-DD'
                                    // onChange={onChangeDatePicker}
                                    suffixIcon={false}
                                    variant="borderless"
                                    placeholder=''
                                    size='middle'
                                    id='select-date-expiration'
                                    value={expirationDay ? dayjs(expirationDay) : null}
                                />
                            </div>


                        </div>

                    </div>
                    <div className='wrap-info-products' >
                        <Tabs
                            onChange={onChangeTab}
                            type="card"
                            items={
                                [{
                                    label: isCreateInvoice ? <FormattedMessage id="new_quote.detail-invoice" /> : <FormattedMessage id="new_quote.detail-order" />,
                                    key: 'tab-1',
                                    children: <TableProducts listProductFromParent={memoizedListProduct} handleChangeDataQuote={handleChangeInputQuote} isSendingQuote={isSendingQuote}
                                        setTaxAndPriceBeforeTax={setTaxAndPriceBeforeTax} productAdded={productAdded && productAdded}
                                        policyAndCondition={policyAndCondition} isDisable={isDisable}
                                    />,
                                },
                                !isSendingQuote ?
                                    {
                                        // label: <FormattedMessage id="new_quote.other-info" />,
                                        // key: 'tab-2',
                                        // children: <OtherInfo otherInfoQuote={otherInfoQuote} />,
                                    }
                                    :
                                    ""
                                ]

                            }
                        />

                    </div>
                    <ModalSendQuoteToEmail
                        show={isShowModalSendQuote}
                        close={() => setIsShowModalSendQuote(false)}
                        dataQuote={dataQuote}
                        fullDataProvider={dataQuote?.fullDataProvider}
                        downloadQuote={handleGeneratePdf}
                        handleClearDataQuote={handleClearDataQuote}
                        changeStep={changeStep}
                    />

                    <ModalSendInvoiceToEmail
                        show={isShowModalSendInvoice}
                        close={() => setIsShowModalSendInvoice(false)}
                        dataQuote={dataQuote}
                        fullDataProvider={dataQuote?.fullDataProvider}
                        downloadQuote={handleGeneratePdf}
                        handleClearDataQuote={handleClearDataQuote}
                    // changeStep={changeStep}
                    />

                    <ModalCancelQuote
                        show={isShowModalCancelQuote}
                        close={() => setIsShowModalCancelQuote(false)}
                        dataQuote={dataQuote}
                        fullDataProvider={dataQuote?.fullDataProvider}
                        changeStep={changeStep}
                    />

                    <ModalConfirmPaid
                        dataQuote={dataQuote}
                        show={isShowModalConfirmPaid}
                        close={() => setIsShowModalConfirmPaid(false)}
                        showBannerPaid={setIsShowBannerPaid}
                        hiddenBtnConfirmPayment={() => setIsPaid(true)}
                    />

                </div>
            </div>

            {isShowModalSendQuote ?
                <QuotePDF componentPDF={componentPDF}
                    fullDataProvider={fullDataProvider}
                    paymentPolicyToQuote={paymentPolicyToQuote}
                    dataQuote={dataSendQuotePDF}
                />
                : ''
            }

            {isShowModalSendInvoice ?
                <InvoicePDF
                    componentPDF={componentPDF}
                    fullDataProvider={dataQuote?.fullDataProvider}
                    paymentPolicyToQuote={paymentPolicyToQuote}
                    dataInvoice={dataSendQuotePDF} />
                :
                ""
            }

            {isLoadingData
                ?
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
                : ''
            }

        </div>
    )
}
