import React, { useEffect } from 'react'
import './NewQuote.scss'
import { useHistory } from 'react-router-dom'
import { Steps, Select, Tooltip, DatePicker, Tabs } from "antd";
import { useState } from 'react'
import { TableProducts } from './TableProducts';
import { getAllProducts } from '../../../services/productServices'
import { getCustomers, getAllCodes } from '../../../services/saleServices'
import { toast } from 'react-toastify';
import { OtherInfo } from './OtherInfo';
import { NavLink } from "react-router-dom";


export const NewQuote = () => {

    const history = useHistory()

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
    // const [listCustomer, setListCustomer] = useState([])
    const [customersSelect, setCustomersSelect] = useState([])
    const [currencySelect, setCurrencySelect] = useState([])
    const [timePayment, setTimePayment] = useState([])
    const [otherInfoQuote, setOtherInfoQuote] = useState(defaultDataOtherInfoQuote)

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

    const onChangeTable = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const handleChangeInputQuote = (e, type) => {
        switch (type) {
            case 'customer':
                setDataQuote((prevState) => ({
                    ...prevState,
                    customer: e
                }))
                break;
            case 'currency':
                setDataQuote((prevState) => ({
                    ...prevState,
                    currency: e
                }))
                break;
            case 'paymentPolicy':
                setDataQuote((prevState) => ({
                    ...prevState,
                    paymentPolicy: e
                }))
                break;

            default:
            // code block
        }
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
                        <button className='btn btn-main'>Gửi qua email</button>
                        <button className='btn btn-gray'>Xác nhận</button>
                        <NavLink to='/my/orders' className='btn btn-gray'>Xem trước</NavLink>
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
                    <h3>Mới</h3>
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
                                onChange={(e) => handleChangeInputQuote(e, 'customer')}
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
                                    onChange={(e) => handleChangeInputQuote(e, 'paymentPolicy')}
                                    options={timePayment}
                                />
                            </div>
                        </div>

                    </div>
                    <div className='wrap-info-products'>
                        <Tabs
                            onChange={onChangeTab}
                            type="card"
                            items={[{
                                label: `Chi tiết đơn hàng`,
                                key: 'tab-1',
                                children: <TableProducts listProductFromParent={listProduct} />,
                            },
                            {
                                label: `Thông tin khác`,
                                key: 'tab-2',
                                children: <OtherInfo />,
                            }
                            ]}
                        />

                    </div>
                </div>
            </div>

        </div>
    )
}
