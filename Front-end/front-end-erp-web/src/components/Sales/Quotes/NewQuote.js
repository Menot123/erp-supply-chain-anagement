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

export const NewQuote = () => {

    const history = useHistory()
    const componentPDF = useRef(null)


    const defaultDataQuote = {
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

    const buildSelectAllCodes = (listCodes) => {
        let codesDataBuild = []
        codesDataBuild = listCodes.map((item, index) => {
            return (
                {
                    value: item?.id,
                    label: item?.valueVi
                }
            )
        })
        return codesDataBuild
    }

    useEffect(() => {
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

    }, [])

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

    const handleGeneratePdf = async () => {
        const quote = componentPDF.current
        try {
            const canvas = await html2canvas(quote, {
                scale: 2, // Tăng độ phân giải lên gấp đôi
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
            pdf.save("Quote.pdf");
        } catch (err) {
            console.log(err)
        }
    }

    const handleSendQuoteToEmail = () => {
        const arrValidateFieldsQuote = ['customer', 'expirationDay', 'currency', 'paymentPolicy']
        let check = validateData(arrValidateFieldsQuote, dataQuote)
        console.log('>>> validate: ', check)
        if (check && check.length === 0) {
            setIsShowModalSendQuote(true)
        } else {
            toast.warning("Vui lòng điền đủ thông tin báo giá trước khi gửi.")
        }
    }

    const handlePushDataQuotePreview = () => {
        console.log('check data: ', dataQuote)
    }

    return (
        <div className='wrapper-create-quote'>
            <div className='header-create-quote'>
                <div className='btn-actions'>
                    <button onClick={() => handleCreateNewDepartment()} className='ms-1 btn btn-outline-secondary btn-create-quote'>Mới</button>
                </div>
                <div className='wrapper-text-header'>
                    <Tooltip placement="top" title='Back to "Báo giá"'>
                        <span onClick={backToQuote} className='title-quote' >Báo giá</span>
                    </Tooltip>
                    {/* <span onClick={backToQuote} className='title-quote' data-tooltip='Back to "Báo giá"'>Báo giá</span> */}
                    <span className='title-create'>Mới</span>
                </div>
            </div>
            <div className='wrapper-body-create-quote'>
                <div className='actions-status'>
                    <div className='wrap-btn-actions'>
                        <button className='btn btn-main' onClick={handleSendQuoteToEmail}>Gửi qua email</button>
                        <button className='btn btn-gray'>Xác nhận</button>
                        <button className='btn btn-gray' onClick={handlePushDataQuotePreview}>Xem trước</button>

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
                                    title: 'Báo giá',
                                },
                                {
                                    status: 'wait',
                                    title: 'Báo giá đã gửi',
                                },
                                {
                                    status: 'wait',
                                    title: 'Đơn bán hàng',
                                },
                            ]}
                        />
                    </div>
                </div>
                <div className='body-create-quote'>
                    <h3>{isSendingQuote ? 'Báo giá - S00003' : 'Mới'}</h3>
                    <div className='wrap-info-quote'>
                        <div className='content-left'>
                            <label htmlFor='select-customer'>Khách hàng</label>
                            <Select
                                showSearch
                                id='select-customer'
                                className='select-customer'
                                variant="borderless"
                                placeholder="Nhập để tìm một khách hàng..."
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
                                <label htmlFor='select-date-expiration'>Ngày hết hạn</label>
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
                                <label htmlFor='select-currency'>Bảng giá</label>
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
                                <label htmlFor='select-payment-method'>Điều khoản thanh toán</label>
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
                                    label: `Chi tiết đơn hàng`,
                                    key: 'tab-1',
                                    children: <TableProducts listProductFromParent={listProduct} handleChangeDataQuote={handleChangeInputQuote} isSendingQuote={isSendingQuote}
                                    />,
                                },
                                {
                                    label: `Thông tin khác`,
                                    key: 'tab-2',
                                    children: <OtherInfo />,
                                }]
                                    :
                                    [{
                                        label: `Chi tiết đơn hàng`,
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
                        customer={selectedCustomer}
                        downloadQuote={handleGeneratePdf}

                    />
                </div>
            </div>

            <QuotePDF componentPDF={componentPDF} dataQuote={dataQuote}
                fullDataCustomer={fullDataCustomer}
                paymentPolicyToQuote={paymentPolicyToQuote}
            />
        </div>
    )
}
