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
import {
    getLatestQuoteCode, postDataQuote, postDataInvoice, confirmInvoice, createStockDelivery,
    createStockDeliveryItems, createPaidInvoice
} from '../../../services/saleServices'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux';
import { ModalCancelQuote } from '../Modal/ModalCancelQuote';
import { ModalSendInvoiceToEmail } from '../Modal/ModalSendInvoiceToEmail';
import { InvoicePDF } from './InvoicePDF';
import { ModalConfirmPaid } from '../Modal/ModalConfirmPaid';
import { useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getInvoice } from '../../../services/saleServices'
import dayjs from 'dayjs';
import eventEmitter from '../../../services/emitter'
import moment from 'moment';

export const CustomerOpenInvoiceCreated = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    const componentPDF = useRef(null)
    const intl = useIntl();
    const language = useSelector(state => state.language.value)
    const email = useSelector(state => state.user.email)
    const userId = useSelector(state => state.user?.id)

    const defaultDataQuote = {
        quoteId: '',
        customer: '',
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
    const [currentStepQuote, setCurrentStepQuote] = useState(0);
    const [currentStepInvoice, setCurrentStepInvoice] = useState(0);
    const [listProduct, setListProduct] = useState([])
    const memoizedListProduct = useMemo(() => listProduct, [listProduct]);
    const [customersSelect, setCustomersSelect] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState([])
    const [customerList, setCustomerList] = useState([])
    const [fullDataCustomer, setFullDataCustomer] = useState({})
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

    const [dataCustomerSelect, setDataCustomerSelect] = useState(null)
    const [expirationDay, setExpirationDay] = useState(null)
    const [currency, setCurrency] = useState(null)
    const [paymentPolicy, setPaymentPolicy] = useState(null)
    const [policyAndCondition, setPolicyAndCondition] = useState(null)
    const [productAdded, setProductAdded] = useState(null)
    const [isLoadingData, setIsLoadingData] = useState(false)
    let isMounted = false;



    useEffect(() => {
        isMounted = true;
        return () => {
            isMounted = false;  // Clean up function sets isMounted to false
        };
    }, []);

    useEffect(() => {
        const handleCustomEvent = (message) => {
            console.log("handleCustomEvent: ", message);
        };

        eventEmitter.on('customEvent', handleCustomEvent);

        // Cleanup function để tránh lắng nghe sự kiện nhiều lần
        return () => {
            eventEmitter.off('customEvent', handleCustomEvent);
        };
    }, []);

    let defaultStep = {
        status1: 'process',
        status2: 'wait',
        status3: 'wait',
        status4: 'wait',
    }

    let defaultCreateInvoiceStep1 = {
        status1: 'process',
        status2: 'wait',
        status3: 'wait',
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

    const checkExpiredDate = (startDate, duration) => {
        // Chuyển đổi startDate từ chuỗi sang đối tượng Date
        const date = new Date(startDate);

        // Lấy số ngày từ chuỗi duration
        const days = parseInt(duration.split(' ')[0]);

        // Cộng thêm số ngày vào đối tượng Date
        date.setDate(date.getDate() + days);

        // Chuyển đổi lại đối tượng Date thành chuỗi theo định dạng YYYY-MM-DD
        const newDate = date.toISOString().split('T')[0];

        // Lấy ngày hiện tại
        const currentDate = new Date().toISOString().split('T')[0];

        // So sánh ngày đã cộng với ngày hiện tại

        const isExpired = currentDate > newDate;

        return isExpired;
    }

    useEffect(() => {

        const fetchDataQuotePreview = async () => {
            setIsLoadingData(true)
            const res = await getInvoice(id)
            if (res.EC === 0) {
                setIsCreateInvoice(true)
                if (res?.DT && res?.DT?.status === 'S0') {
                    setCurrentStepInvoice(0)
                    changeStep(1)
                } else if (res?.DT && res?.DT?.status === 'S1') {
                    setArrInvoiceCurrentStep(defaultCreateInvoiceStep2)
                    setCurrentStepInvoice(1)
                } else {
                    setCurrentStepInvoice(1)
                    setArrInvoiceCurrentStep(defaultCreateInvoiceStep2)
                    setIsShowBannerPaid(true)
                    setIsPaid(true)
                }
                setIsCreateInvoice(true)
                setDataQuote({ ...res?.DT, quoteId: res?.DT?.invoiceId, productList: JSON.parse(res?.DT?.productList), fullDataCustomer: res?.DT?.dataCustomer })
                setOtherInfoQuote({ employeeId: res?.DT?.employeeId, deliveryDate: res?.DT?.deliveryDate })
                setDateCreateInvoice(res?.DT?.createdDate)
                setDataCustomerSelect({ label: res?.DT?.dataCustomer?.fullName, value: res?.DT?.dataCustomer?.customerId })
                setExpirationDay(res?.DT?.expirationDay)
                setCurrency({ value: res?.DT?.currency, label: res?.DT?.dataCurrency?.valueVi })
                setPaymentPolicy({ label: res?.DT?.invoicePaymentPolicy?.valueVi, value: res?.DT?.paymentPolicy })
                setPolicyAndCondition(res?.DT?.policyAndCondition)
                setProductAdded(JSON.parse(res?.DT?.productList))
                // let customer = res?.DT?.dataCustomer?.fullName
                // customer = customer.split(' ')
                // if (customer && customer.length > 0) {
                //     setNameCustomer(customer[customer.length - 1])
                // }
                // setDataPreview({ ...res?.DT, tax: JSON.parse(res?.DT?.tax), productList: JSON.parse(res?.DT?.productList) })
                buildDataTableProduct(JSON.parse(res?.DT?.productList))
            }
            setIsLoadingData(false)
        }

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
        }

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

    const getCustomerById = (customerId) => {
        const customer = customerList.find((customer) => customer.customerId === customerId);
        return customer;
    }

    const buildSelectCustomers = (listCustomer) => {
        let customersDataBuild = listCustomer.map((item, index) => {
            return (
                {
                    value: item.customerId,
                    label: item.fullName
                }
            )
        })
        setCustomersSelect(customersDataBuild)
    }

    useEffect(() => {
        if (currentStepQuote === 3) {
            setDataStep([
                {
                    status: arrCurrentStep?.status1,
                    title: <FormattedMessage id="title-new-quote" />,
                },
                {
                    status: arrCurrentStep?.status2,
                    title: <FormattedMessage id="step-quote-sent" />,
                },
                {
                    status: arrCurrentStep?.status3,
                    title: <FormattedMessage id="step-bill" />,
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
                    title: <FormattedMessage id="title-new-quote" />,
                },
                {
                    status: arrCurrentStep?.status2,
                    title: <FormattedMessage id="step-quote-sent" />,
                },
                {
                    status: arrCurrentStep?.status3,
                    title: <FormattedMessage id="step-bill" />,
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

    const handleChangeInputQuote = (e, type, label) => {
        switch (type) {
            case 'customer':
            case 'currency':
            case 'paymentPolicy':
            case 'policyAndCondition':
            case 'totalPrice':
            case 'productList':
                if (type === 'customer') {
                    setSelectedCustomer(label)
                    setFullDataCustomer(getCustomerById(e))
                }
                if (type === 'paymentPolicy') {
                    setPaymentPolicyToQuote(label.label)
                    setPaymentPolicy({ value: e, label: label.label })
                }
                if (type === 'currency') {
                    setCurrency({ value: e, label: label })
                }

                if (type === 'policyAndCondition') {
                    setPolicyAndCondition(e.target.value)
                    setDataQuote((prevState) => ({
                        ...prevState,
                        [type]: e.target.value
                    }))
                    break;
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
        const arrValidateFieldsQuote = ['customerId', 'expirationDay', 'currency', 'paymentPolicy']
        let check = validateData(arrValidateFieldsQuote, dataQuote)
        if (check && check.length === 0) {
            setDataSendQuotePDF(dataQuote)
            setIsShowModalSendQuote(true)
        } else {
            toast.warning(<FormattedMessage id="new_quote.toast-empty-field" />)
        }
    }

    const handlePushDataQuotePreview = async (type) => {
        const arrValidateFieldsQuote = ['customerId', 'createdDate', 'paymentPolicy']
        let check = validateData(arrValidateFieldsQuote, dataQuote)
        if (check && check.length === 0) {
            // Create an voice
            if (type === "invoice") {
                if (dateCreateInvoice) {
                    let res = await postDataInvoice({ ...dataQuote, status: 'S0', dateCreateInvoice: dateCreateInvoice, invoiceId: dataQuote?.invoiceId })
                    if (res?.EC === 0) {
                        const newTabUrl = `/my/invoice/${dataQuote?.invoiceId}`;
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

    const addDays = (dateString, daysToAdd) => {
        // Chuyển đổi chuỗi ngày tháng thành đối tượng Date
        const date = new Date(dateString);

        // Thêm số ngày cần thêm
        date.setDate(date.getDate() + daysToAdd);

        // Định dạng lại ngày theo định dạng "YYYY-MM-DD"
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0, nên cần +1
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const handleConfirmInvoice = async () => {
        const arrValidateFieldsQuote = ['customer', 'paymentPolicy']
        let check = validateData(arrValidateFieldsQuote, dataQuote)
        if (check && check.length === 0 && dateCreateInvoice) {
            let res = await confirmInvoice({ ...dataQuote, dateCreateInvoice: dateCreateInvoice, ...otherInfoQuote, status: 'S1' })
            if (res && res?.EC === -3) {
                toast.warning(res?.EM)
                return
            }
            let resStockDelivery = await createStockDelivery(
                {
                    customerId: dataQuote?.customer,
                    warehouseId: "WH001",
                    userId: otherInfoQuote?.employeeId ?? userId,
                    scheduledDate: otherInfoQuote?.deliveryDate ?? addDays(dateCreateInvoice, 3),
                    note: dataQuote?.policyAndCondition,
                    status: 'ready'
                }
            )
            const dataCreateStockDeliveryItems = dataQuote?.productList?.map((item, index) => {
                return {
                    stockDeliveryId: resStockDelivery?.DT,
                    productId: item?.productId,
                    description: item?.description,
                    scheduledDate: otherInfoQuote?.deliveryDate ?? addDays(dateCreateInvoice, 3),
                    deadline: otherInfoQuote?.deliveryDate ?? addDays(dateCreateInvoice, 10),
                    quantity: item?.quantity,
                    trueQuantity: 0
                }
            })
            let resStockDeliveryItems = await createStockDeliveryItems(dataCreateStockDeliveryItems)
            if (res.EC !== 0 || resStockDelivery?.EC !== 0 || resStockDeliveryItems?.EC !== 0) {
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

    const handleConfirmPaid = () => {
        if (!checkExpiredDate(dataQuote?.createdDate, dataQuote?.invoicePaymentPolicy?.valueVi)) {
            setIsShowModalConfirmPaid(true)
        } else {
            toast.warning("Hóa đơn của quý khách đã hết hạn thanh toán, vui lòng liên hệ với chúng tôi để nhận hỗ trợ")
        }
    }

    return (
        <div className='wrapper-create-quote'>

            <div className='wrapper-body-create-quote'>
                <div className='actions-status'>
                    <div className='wrap-btn-actions'>

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
                                {!isPaid &&
                                    <>
                                        <button className='btn btn-main' onClick={() => handleConfirmPaid()}><FormattedMessage id="btn-confirmed-payment" /></button>
                                        <button className='btn btn-gray' onClick={() => handlePushDataQuotePreview("invoice")}><FormattedMessage id="btn-preview-quote" /></button>
                                    </>
                                }
                            </>
                            :
                            ""
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
                        (currentStepInvoice === 1 ? "INV" + id : <FormattedMessage id="new_quote.create-invoice-draft" />)
                        :
                        (id ? `Báo giá - S${id}` : <FormattedMessage id="btn-new-quote" />)}</h3>
                    <div className='wrap-info-quote'>
                        <div className='content-left'>
                            <label htmlFor='select-customer'><FormattedMessage id="new_quote.customer" /></label>
                            <Select
                                showSearch
                                id='select-customer'
                                className='select-customer'
                                variant="borderless"
                                placeholder={intl.formatMessage({ id: "new_quote.placeholder-customer" })}
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={dataCustomerSelect ? [dataCustomerSelect] : []}
                                value={dataCustomerSelect}
                                disabled
                                onChange={(e, label) => handleChangeInputQuote(e, 'customer', label)}
                            />

                        </div>
                        <div className='content-right'>
                            {/* Ngay tao hoa don */}
                            {isCreateInvoice ?
                                <div className='wrap-createInvoice-date'>
                                    <label htmlFor='select-date-createInvoice'><FormattedMessage id="new_quote.createInvoice-date" /></label>
                                    <DatePicker
                                        className='select-date-createInvoice'
                                        onChange={handleChangeDateCreateInvoice}
                                        suffixIcon={false}
                                        variant="borderless"
                                        placeholder=''
                                        size='middle'
                                        id='select-date-createInvoice'
                                        key="create-invoice"
                                        value={dateCreateInvoice ? dayjs(dateCreateInvoice) : null}
                                        disabled
                                    />
                                </div>
                                :
                                <div className='wrap-expiration-date'>
                                    <label htmlFor='select-date-expiration'><FormattedMessage id="new_quote.expire-date" /></label>
                                    <DatePicker
                                        key="expiration-date"
                                        className='select-date-expiration'
                                        format='YYYY-MM-DD'
                                        onChange={onChangeDatePicker}
                                        suffixIcon={false}
                                        variant="borderless"
                                        placeholder=''
                                        size='middle'
                                        id='select-date-expiration'
                                        value={expirationDay ? dayjs(expirationDay) : null}
                                    />
                                </div>
                            }
                            {!isCreateInvoice &&
                                <div className='wrap-currency'>
                                    <label htmlFor='select-currency'><FormattedMessage id="new_quote.currency" /></label>
                                    <Select
                                        id='select-currency'
                                        className='select-currency'
                                        showSearch
                                        variant="borderless"
                                        style={{ width: 200 }}
                                        optionFilterProp="children"
                                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        onChange={(e) => handleChangeInputQuote(e, 'currency')}
                                        options={currency ? [currency] : []}
                                        value={currency && currency}
                                    />
                                </div>
                            }

                            <div className='wrap-payment-method'>
                                <label htmlFor='select-payment-method'><FormattedMessage id="new_quote.payment-policy" /></label>
                                <Select
                                    id='select-payment-method'
                                    showSearch
                                    className='select-payment-method'
                                    variant="borderless"
                                    style={{ width: 200 }}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    onChange={(e, label) => handleChangeInputQuote(e, 'paymentPolicy', label)}
                                    options={paymentPolicy ? [paymentPolicy] : []}
                                    value={paymentPolicy && paymentPolicy}
                                    disabled
                                />
                            </div>
                        </div>

                    </div>
                    <div className='wrap-info-products' >
                        <Tabs
                            type="card"
                            items={
                                [{
                                    label: isCreateInvoice ? <FormattedMessage id="new_quote.detail-invoice" /> : <FormattedMessage id="new_quote.detail-order" />,
                                    key: 'tab-1',
                                    children: <TableProducts listProductFromParent={memoizedListProduct} handleChangeDataQuote={handleChangeInputQuote} isSendingQuote={isSendingQuote}
                                        setTaxAndPriceBeforeTax={setTaxAndPriceBeforeTax} productAdded={productAdded && productAdded}
                                        policyAndCondition={policyAndCondition} isDisable={true}
                                    />,
                                },
                                !isSendingQuote ?
                                    {
                                        label: <FormattedMessage id="new_quote.other-info" />,
                                        key: 'tab-2',
                                        children: <OtherInfo otherInfoQuote={otherInfoQuote} isDisable={true} />,
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
                        fullDataCustomer={dataQuote?.fullDataCustomer}
                        downloadQuote={handleGeneratePdf}
                        handleClearDataQuote={handleClearDataQuote}
                        changeStep={changeStep}
                    />

                    <ModalSendInvoiceToEmail
                        show={isShowModalSendInvoice}
                        close={() => setIsShowModalSendInvoice(false)}
                        dataQuote={dataQuote}
                        fullDataCustomer={dataQuote?.fullDataCustomer}
                        downloadQuote={handleGeneratePdf}
                        handleClearDataQuote={handleClearDataQuote}
                    // changeStep={changeStep}
                    />

                    <ModalCancelQuote
                        show={isShowModalCancelQuote}
                        close={() => setIsShowModalCancelQuote(false)}
                        dataQuote={dataQuote}
                        fullDataCustomer={dataQuote?.fullDataCustomer}
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
                    fullDataCustomer={fullDataCustomer}
                    paymentPolicyToQuote={paymentPolicyToQuote}
                    dataQuote={dataSendQuotePDF}
                />
                : ''
            }

            {isShowModalSendInvoice ?
                <InvoicePDF
                    componentPDF={componentPDF}
                    fullDataCustomer={fullDataCustomer}
                    paymentPolicyToQuote={paymentPolicyToQuote}
                    dataInvoice={dataQuote} />
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
