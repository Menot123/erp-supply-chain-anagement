import React from 'react'
import './CreateNewInputWarehouse.scss'
import { RiImageAddLine } from "react-icons/ri";
import { useState, useEffect } from 'react'
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import { createNewProduct, getAllCode, getAllProducts } from '../../../services/inventoryServices'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { LANGUAGES } from '../../../utils/constant'
import { FormattedMessage, useIntl } from 'react-intl'
import { Steps, Select, Tooltip, DatePicker, Tabs, Input } from "antd";
import { TableInputWarehouse } from './TableInputWarehouse';
import { OtherInfo } from './OtherInfo';


function CreateNewInputWarehouse() {

    //âha
    const history = useHistory()

    const defaultDataInputWarehouse = {
        operationType: '',
        expirationDay: '',
        receiveFrom: '',
        paymentPolicy: '',
        productList: [],
        policyAndCondition: '',
        totalPrice: '',
        status: ''
    }

    const defaultDataOtherInfoInputWarehouse = {
        employeeId: '',
        deliveryDate: '',
    }

    const [dataInputWarehouse, setDataInputWarehouse] = useState(defaultDataInputWarehouse)
    const [currentStepInputWarehouse, setCurrentStepInputWarehouse] = useState(0);
    const [listProduct, setListProduct] = useState([])
    // const [operationType, setOperationType] = useState([])
    const [operationTypesSelect, setOperationTypesSelect] = useState([])
    const [receiveFromSelect, setReceiveFromSelect] = useState([])
    const [timePayment, setTimePayment] = useState([])
    const [otherInfoInputWarehouse, setOtherInfoInputWarehouse] = useState(defaultDataOtherInfoInputWarehouse)


    const onChangeDatePicker = (date, dateString) => {
        setDataInputWarehouse((prevState) => ({
            ...prevState,
            expirationDay: dateString
        }))
    };

    const onChangeTab = (key) => {
        console.log(key);
    };

    const handleChangeInputQuote = (e, type) => {
        switch (type) {
            case 'operationType':
                setDataInputWarehouse((prevState) => ({
                    ...prevState,
                    operationType: e
                }))
                break;
            case 'receiveFrom':
                setDataInputWarehouse((prevState) => ({
                    ...prevState,
                    receiveFrom: e
                }))
                break;
            case 'paymentPolicy':
                setDataInputWarehouse((prevState) => ({
                    ...prevState,
                    paymentPolicy: e
                }))
                break;

            default:
            // code block
        }
    }

    //aha
    const language = useSelector(state => state.language.value)
    const intl = useIntl();

    useEffect(() => {
        const fetchAllProduct = async () => {
            const res = await getAllProducts()
            if (res && res.EC === 0) {
                setListProduct(res.DT)
            } else {
                toast.error(res.EM)
            }
        }

        fetchAllProduct()

    }, [])

    const handleSaveInputWarehouse = async () => {
        // Validate data
        // let check = validateDataProduct()

        // if (check.length === 0) {
        //     let res = await createNewProduct(dataProduct)
        //     if (res.EC === 0) {
        //         cleanValueSubmit()
        //         toast.success(res.EM)
        //     } else {
        //         toast.error(res.EM)
        //     }
        // } else {
        //     toast.warning(`Missing fields: ${check.toString()}`)
        // }
    }

    const handleCancelCreateProduct = () => {
        history.push('/manage-inventory/input-warehouse')
    }

    return (
        <div className='wrapper-create-input-warehouse'>
            <div className='header-create'>
                <span className='title-create'>
                    <span onClick={() => handleCancelCreateProduct()} className='bold'>{language === LANGUAGES.EN ? 'Reicept' : 'Phiếu nhập kho'}</span>
                    <span> / </span>
                    <span><FormattedMessage id='nav.manage-inventory-create-product-title' /></span>
                </span>
                <div className='btn-actions'>
                    <button onClick={() => handleSaveInputWarehouse()} className='btn btn-primary btn-main'><FormattedMessage id='btn-save' /></button>
                    <button onClick={() => handleCancelCreateProduct()} className='ms-1 btn btn-outline-secondary'><FormattedMessage id='btn-cancel' /></button>
                </div>
            </div>
            <div className='container-fluid create-product-container'>
                <div className='actions-status'>
                    <div className='wrap-btn-actions'>
                        <button className='btn btn-main'>Đánh dấu việc cần làm</button>
                        <button className='btn btn-gray'>Xác nhận</button>
                        <button className='btn btn-gray'>In nhãn</button>
                        <button className='btn btn-gray'>Hủy</button>
                    </div>
                    <div className='quote-status'>
                        <Steps
                            type="navigation"
                            size="small"
                            current={currentStepInputWarehouse}
                            className="site-navigation-steps quote-step"
                            items={[
                                {
                                    status: 'process',
                                    title: 'Nháp',
                                },
                                {
                                    status: 'wait',
                                    title: 'Sẵn sàng',
                                },
                                {
                                    status: 'wait',
                                    title: 'Hoàn tất',
                                },
                            ]}
                        />
                    </div>
                </div>
                <div className='body-create-quote'>
                    <div className='wrap-info-quote pt-5'>
                        <div className='content-left'>
                            <div className='wrap-expiration-date'>
                                <label htmlFor='select-receive-from'>Nhập từ</label>
                                <Select
                                    showSearch
                                    id='select-receive-from'
                                    className='receive-from'
                                    variant="borderless"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={operationTypesSelect}
                                    onChange={(e) => handleChangeInputQuote(e, 'receiveFrom')}
                                />
                            </div>
                            <div className='wrap-expiration-date'>
                                <label htmlFor='select-operation-type'>Loại hoạt động</label>
                                <Select
                                    showSearch
                                    id='select-operation-type'
                                    className='operation-type'
                                    variant="borderless"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={receiveFromSelect}
                                    onChange={(e) => handleChangeInputQuote(e, 'operationType')}
                                />
                            </div>

                        </div>

                        <div className='content-right'>
                            <div className='wrap-expiration-date'>
                                <label htmlFor='select-date-expiration'>Ngày theo kế hoạch</label>
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
                        </div>

                    </div>
                    <div className='wrap-info-products pt-3'>
                        <Tabs
                            onChange={onChangeTab}
                            type="card"
                            items={[{
                                label: `Hoạt động`,
                                key: 'tab-1',
                                children: <TableInputWarehouse listProductFromParent={listProduct} />,
                            },
                            {
                                label: `Thông tin bổ sung`,
                                key: 'tab-2',
                                children: <OtherInfo />,
                            },
                            {
                                label: `Ghi chú`,
                                key: 'tab-3',
                                children: <Input.TextArea
                                    // value={value}
                                    // onChange={(e) => setValue(e.target.value)}
                                    placeholder="Thêm một ghi chú nội bộ sẽ được in trên phiếu Hoạt động lấy hàng"
                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                />,
                            }
                            ]}
                        />

                    </div>
                </div>
            </div>
        </div >
    )
}

export default CreateNewInputWarehouse