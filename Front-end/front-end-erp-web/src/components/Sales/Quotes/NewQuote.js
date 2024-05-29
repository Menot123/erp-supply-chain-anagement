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
import { NavLink } from "react-router-dom";
import { ModalSendQuoteToEmail } from '../Modal/ModalSendQuoteToEmail';
import { useReactToPrint } from 'react-to-print';
import { validateData } from '../../../utils/functions'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { QuotePDF } from './QuotePDF';
import { MdSignalCellularNull } from 'react-icons/md';
import { getLatestQuoteCode } from '../../../services/saleServices'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector } from 'react-redux';

export const NewQuote = () => {

    const history = useHistory()
    const componentPDF = useRef(null)
    const intl = useIntl();
    const language = useSelector(state => state.language.value)

    const defaultDataQuote = {
        quoteId: '',
        customer: '',
        expirationDay: '',
        currency: '',
        paymentPolicy: '',
        productList: [],
        policyAndCondition: '',
        totalPrice: '',
        status: ''
    }

    const defaultDataOtherInfoQuote = {
        employeeId: '',
        deliveryDate: '',
    }

    const [dataQuote, setDataQuote] = useState(defaultDataQuote)
    const [currentStepQuote, setCurrentStepQuote] = useState(0);
    const [listProduct, setListProduct] = useState([])
    const [customersSelect, setCustomersSelect] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState([])
    const [customerList, setCustomerList] = useState([])
    const [fullDataCustomer, setFullDataCustomer] = useState({})
    const [paymentPolicyToQuote, setPaymentPolicyToQuote] = useState('')
    const [currencySelect, setCurrencySelect] = useState([])
    const [timePayment, setTimePayment] = useState([])
    const [otherInfoQuote, setOtherInfoQuote] = useState(defaultDataOtherInfoQuote)
    const [isShowModalSendQuote, setIsShowModalSendQuote] = useState(false)
    const [isSendingQuote, setIsSendingQuote] = useState(false)
    const [dataSendQuotePDF, setDataSendQuotePDF] = useState([])
    const [filePDFBlob, setFilePDFBlob] = useState(null)

    useEffect(() => {
        const fetchLatestQuoteCode = async () => {
            let res = await getLatestQuoteCode()
            if (res?.EC === 0) {
                setDataQuote((prevState) => ({
                    ...prevState,
                    quoteId: 'S' + res?.DT[0]?.quoteId
                }))
            }
        }

        fetchLatestQuoteCode()
    }, [])


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

    }

    const backToQuote = () => {
        history.push('/sale-order')
    }

    const onChangeDatePicker = (date, dateString) => {
        setDataQuote((prevState) => ({
            ...prevState,
            expirationDay: dateString
        }))
    };

    const onChangeTab = (key) => {
        console.log(key);
    };

    const handleChangeInputQuote = (e, type, label) => {
        switch (type) {
            case 'customer':
            case 'currency':
            case 'paymentPolicy':
            case 'totalPrice':
            case 'productList':
                if (type === 'customer') {
                    setSelectedCustomer(label)
                    setFullDataCustomer(getCustomerById(e))
                }
                if (type === 'paymentPolicy') {
                    setPaymentPolicyToQuote(label.label)
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
            pdf.save("Quote.pdf");
        } catch (err) {
            console.log(err)
        }
    }

    const handleSendQuoteToEmail = () => {
        const arrValidateFieldsQuote = ['customer', 'expirationDay', 'currency', 'paymentPolicy']
        let check = validateData(arrValidateFieldsQuote, dataQuote)
        if (check && check.length === 0) {
            setDataSendQuotePDF(dataQuote)
            setIsShowModalSendQuote(true)
        } else {
            toast.warning(<FormattedMessage id="new_quote.toast-empty-field" />)
        }
    }

    const handlePushDataQuotePreview = () => {
        console.log('check data: ', dataQuote)
    }

    return (
        <div className='wrapper-create-quote'>
            <div className='header-create-quote'>
                <div className='btn-actions'>
                    <button onClick={() => handleCreateNewDepartment()} className='ms-1 btn btn-outline-secondary btn-create-quote'><FormattedMessage id="btn-new-quote" /></button>
                </div>
                <div className='wrapper-text-header'>
                    <Tooltip placement="top" title='Back to "Báo giá"'>
                        <span onClick={backToQuote} className='title-quote' ><FormattedMessage id="title-new-quote" /></span>
                    </Tooltip>
                    {/* <span onClick={backToQuote} className='title-quote' data-tooltip='Back to "Báo giá"'>Báo giá</span> */}
                    <span className='title-create'><FormattedMessage id="btn-new-quote" /></span>
                </div>
            </div>
            <div className='wrapper-body-create-quote'>
                <div className='actions-status'>
                    <div className='wrap-btn-actions'>
                        <button className='btn btn-main' onClick={handleSendQuoteToEmail}><FormattedMessage id="btn-send-quote" /></button>
                        <button className='btn btn-gray'><FormattedMessage id="btn-confirm-quote" /></button>
                        <button className='btn btn-gray' onClick={handlePushDataQuotePreview}><FormattedMessage id="btn-preview-quote" /></button>

                        {/* <NavLink to='/my/orders' className='btn btn-gray'>Xem trước</NavLink> */}
                    </div>
                    <div className='quote-status'>
                        <Steps
                            type="navigation"
                            size="small"
                            current={currentStepQuote}
                            className="site-navigation-steps quote-step"
                            items={[
                                {
                                    status: 'process',
                                    title: <FormattedMessage id="title-new-quote" />,
                                },
                                {
                                    status: 'wait',
                                    title: <FormattedMessage id="step-quote-sent" />,
                                },
                                {
                                    status: 'wait',
                                    title: <FormattedMessage id="step-bill" />,
                                },
                            ]}
                        />
                    </div>
                </div>
                <div className='body-create-quote'>
                    <h3>{isSendingQuote ? 'Báo giá - S00003' : <FormattedMessage id="btn-new-quote" />}</h3>
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
                                options={customersSelect}
                                onChange={(e, label) => handleChangeInputQuote(e, 'customer', label)}
                            />

                        </div>
                        <div className='content-right'>
                            <div className='wrap-expiration-date'>
                                <label htmlFor='select-date-expiration'><FormattedMessage id="new_quote.expire-date" /></label>
                                <DatePicker
                                    className='select-date-expiration'
                                    onChange={onChangeDatePicker}
                                    suffixIcon={false}
                                    variant="borderless"
                                    placeholder=''
                                    size='middle'
                                    id='select-date-expiration'
                                />
                            </div>
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
                                    options={currencySelect}
                                />
                            </div>

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
                                    options={timePayment}
                                />
                            </div>
                        </div>

                    </div>
                    <div className='wrap-info-products' >
                        <Tabs
                            onChange={onChangeTab}
                            type="card"
                            items={
                                !isSendingQuote ? [{
                                    label: <FormattedMessage id="new_quote.detail-order" />,
                                    key: 'tab-1',
                                    children: <TableProducts listProductFromParent={listProduct} handleChangeDataQuote={handleChangeInputQuote} isSendingQuote={isSendingQuote}
                                    />,
                                },
                                {
                                    label: <FormattedMessage id="new_quote.other-info" />,
                                    key: 'tab-2',
                                    children: <OtherInfo />,
                                }]
                                    :
                                    [{
                                        label: <FormattedMessage id="new_quote.detail-order" />,
                                        key: 'tab-1',
                                        children: <TableProducts listProductFromParent={listProduct} handleChangeDataQuote={handleChangeInputQuote} isSendingQuote={isSendingQuote}
                                        />,
                                    }]
                            }
                        />

                    </div>
                    <ModalSendQuoteToEmail
                        show={isShowModalSendQuote}
                        close={() => setIsShowModalSendQuote(false)}
                        dataQuote={dataQuote}
                        fullDataCustomer={fullDataCustomer}
                        downloadQuote={handleGeneratePdf}
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
        </div>
    )
}
