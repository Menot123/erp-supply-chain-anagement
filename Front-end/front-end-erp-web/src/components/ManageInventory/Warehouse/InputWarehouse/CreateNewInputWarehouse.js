import React from 'react'
import './CreateNewInputWarehouse.scss'
import { RiImageAddLine } from "react-icons/ri";
import { useState, useEffect } from 'react'
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import { createNewReceipt, getAllCode, getAllProducts, getProviders, getProductByProviderId, createProductListOfReceipt, createProductListOfReceiptArray } from '../../../../services/inventoryServices'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { LANGUAGES } from '../../../../utils/constant'
import { FormattedMessage, useIntl } from 'react-intl'
import { Steps, Select, Tooltip, DatePicker, Tabs, Input } from "antd";
import { TableInputWarehouse } from './TableInputWarehouse';
import { OtherInfo } from './OtherInfo';


function CreateNewInputWarehouse() {

    const idUser = useSelector(state => state.user.id)

    //âha
    const history = useHistory()

    const defaultDataInputWarehouse = {
        providerId: '',
        operationType: 'Phiếu nhập kho',
        warehouseId: 'WH001',
        scheduledDay: '',
        productList: [],
        note: '',
        userId: idUser,
        status: 'draft'
    }

    const defaultDataOtherInfoInputWarehouse = {
        employeeId: '',
        deliveryDate: '',
    }

    const [dataInputWarehouse, setDataInputWarehouse] = useState(defaultDataInputWarehouse)
    const [currentStepInputWarehouse, setCurrentStepInputWarehouse] = useState(0);
    const [listProduct, setListProduct] = useState([])
    const [listProvider, setListProvider] = useState([])
    const [selectProvider, setSelectProvider] = useState([])
    // const [operationType, setOperationType] = useState([])
    const [operationTypesSelect, setOperationTypesSelect] = useState([])
    const [receiveFromSelect, setReceiveFromSelect] = useState([{ value: 'actionEntry', label: 'Nhập kho' }])
    const [timePayment, setTimePayment] = useState([])
    const [otherInfoInputWarehouse, setOtherInfoInputWarehouse] = useState(defaultDataOtherInfoInputWarehouse)

    const [showAddProduct, setShowAddProduct] = useState(false)
    const [listProductOfProvider, setListProductOfProvider] = useState([])
    const [stockCreateId, setStockCreateId] = useState('');


    const onChangeDatePicker = (date, dateString) => {
        setDataInputWarehouse((prevState) => ({
            ...prevState,
            scheduledDay: dateString
        }))
    };

    const onChangeNote = (event) => {
        setDataInputWarehouse((prevState) => ({
            ...prevState,
            note: event.target.value
        }))
    };

    const onChangeTab = (key) => {
        if (dataInputWarehouse.providerId != '')
            console.log(dataInputWarehouse.providerId);
        // console.log(key);
    };

    const handleChangeInputWarehouse = (e, type) => {
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
                    providerId: e
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
        // console.log(idUser)
        // const fetchAllProduct = async () => {
        //     const res = await getAllProducts()
        //     if (res && res.EC === 0) {
        //         setListProduct(res.DT)
        //     } else {
        //         toast.error(res.EM)
        //     }
        //     return res
        // }

        const fetchProvider = async () => {
            const res = await getProviders()
            if (res && res.EC === 0) {
                setListProvider(res.DT)
            } else {
                toast.error(res.EM)
            }
            return res
        }

        Promise.all([fetchProvider()])

    }, [])

    useEffect(() => {
        const checkProviderSelected = async () => {
            if (dataInputWarehouse.providerId != '') {
                setShowAddProduct(true)
                const res = await getProductByProviderId(dataInputWarehouse.providerId)
                if (res && res.EC === 0) {
                    setListProductOfProvider(res.DT)
                    console.log(res.DT)
                } else {
                    toast.error(res.EM)
                }
            }
            else setShowAddProduct(false)
        }
        checkProviderSelected()
    }, [dataInputWarehouse.providerId])

    useEffect(() => {
        const buildSelectProvider = () => {
            let providerSelect = listProvider.map((item, index) => {
                return (
                    {
                        value: item.providerId,
                        label: item.nameVi
                    }
                )
            })
            setSelectProvider(providerSelect)
        }
        buildSelectProvider()
    }, [listProvider])


    const validateDataReceipt = () => {
        const fieldCheck = ['providerId', 'operationType', 'scheduledDay'];
        const missingFields = [];

        fieldCheck.forEach(field => {
            if (!dataInputWarehouse[field]) {
                missingFields.push(field);
            }
        });

        return missingFields;
    };

    const handleSaveInputWarehouse = async () => {
        // Validate data
        // let check = validateDataReceipt()

        // if (check.length === 0) {
        //     let res = await createNewReceipt(dataProduct)
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

    const handleCancelCreateInputWarehouse = () => {
        history.push('/manage-inventory/input-warehouse')
    }

    const handleSetReadyReceipt = async () => {
        // console.log(dataInputWarehouse)
        dataInputWarehouse.status = 'ready'
        let check = validateDataReceipt()

        if (check.length === 0) {
            let res = await createNewReceipt(dataInputWarehouse)
            if (res.EC === 0) {
                setStockCreateId(res.DT)
                toast.success(res.EM)
                handleCancelCreateInputWarehouse()
            } else {
                toast.error(res.EM)
            }
        } else {
            toast.warning(`Missing fields: ${check.toString()}`)
        }
    }

    const handleSetDoneReceipt = () => {
        console.log('done')
    }

    return (
        <div className='wrapper-create-input-warehouse'>
            <div className='header-create'>
                <span className='title-create'>
                    <span onClick={() => handleCancelCreateInputWarehouse()} className='bold'>{language === LANGUAGES.EN ? 'Reicept' : 'Phiếu nhập kho'}</span>
                    <span> / </span>
                    <span><FormattedMessage id='nav.manage-inventory-create-product-title' /></span>
                </span>
                <div className='btn-actions'>
                    <button onClick={() => handleSaveInputWarehouse()} className='btn btn-primary btn-main'><FormattedMessage id='btn-save' /></button>
                    <button onClick={() => handleCancelCreateInputWarehouse()} className='ms-1 btn btn-outline-secondary'><FormattedMessage id='btn-cancel' /></button>
                </div>
            </div>
            <div className='container-fluid create-product-container'>
                <div className='actions-status'>
                    <div className='wrap-btn-actions'>
                        <button onClick={() => handleSetReadyReceipt()} className='btn btn-main'>Đánh dấu việc cần làm</button>
                        <button onClick={() => handleSetDoneReceipt()} className='btn btn-gray'>Xác nhận</button>
                        <button className='btn btn-gray'>In nhãn</button>
                        <button className='btn btn-gray'>Hủy</button>
                    </div>
                    <div className='input-warehouse-status'>
                        <Steps
                            type="navigation"
                            size="small"
                            current={currentStepInputWarehouse}
                            className="site-navigation-steps input-warehouse-step"
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
                <div className='body-create-input-warehouse'>
                    <div className='wrap-info-input-warehouse pt-5'>
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
                                    options={selectProvider}
                                    onChange={(e) => handleChangeInputWarehouse(e, 'receiveFrom')}
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
                                    onChange={(e) => handleChangeInputWarehouse(e, 'operationType')}
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
                                children: <TableInputWarehouse createProductListOfReceipt={createProductListOfReceiptArray} stockCreateId={stockCreateId} hadProvider={showAddProduct} listProductFromParent={listProductOfProvider} />,
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
                                    onChange={(e) => onChangeNote(e)}
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