import React from 'react'
import './CreateNewOutputWarehouse.scss'
import { RiImageAddLine } from "react-icons/ri";
import { useState, useEffect } from 'react'
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import { createNewDelivery, getAllCode, getAllProducts, getCustomers, createProductListOfDelivery, createProductListOfDeliveryArray } from '../../../../services/inventoryServices'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { LANGUAGES } from '../../../../utils/constant'
import { FormattedMessage, useIntl } from 'react-intl'
import { Steps, Select, Tooltip, DatePicker, Tabs, Input } from "antd";
import { TableOutputWarehouse } from './TableOutputWarehouse';
import { OtherInfo } from './OtherInfo';


function CreateNewOutputWarehouse() {

    const idUser = useSelector(state => state.user.id)

    //âha
    const history = useHistory()

    const defaultDataOutputWarehouse = {
        id: '',
        operationType: 'Phiếu xuất kho',
        warehouseId: 'WH001',
        scheduledDate: '',
        customerId: '',
        productList: [],
        note: '',
        userId: idUser,
        status: 'draft'
    }

    const defaultDataOtherInfoOutputWarehouse = {
        employeeId: '',
        deliveryDate: '',
    }

    const [dataOutputWarehouse, setDataOutputWarehouse] = useState(defaultDataOutputWarehouse)
    const [currentStepOutputWarehouse, setCurrentStepOutputWarehouse] = useState(0);
    const [listProduct, setListProduct] = useState([])
    const [listCustomer, setListCustomer] = useState([])
    const [selectCustomer, setSelectCustomer] = useState([])
        // const [operationType, setOperationType] = useState([])
    const [operationTypesSelect, setOperationTypesSelect] = useState([])
    const [deliveryToSelect, setDeliveryToSelect] = useState([{ value: 'actionDelivery', label: 'Xuất kho' }])
    const [timePayment, setTimePayment] = useState([])
    const [otherInfoOutputWarehouse, setOtherInfoOutputWarehouse] = useState(defaultDataOtherInfoOutputWarehouse)

    const [stockCreateId, setStockCreateId] = useState('');


    const onChangeDatePicker = (date, dateString) => {
        setDataOutputWarehouse((prevState) => ({
            ...prevState,
            scheduledDate: dateString
        }))
    };

    const onChangeNote = (event) => {
        setDataOutputWarehouse((prevState) => ({
            ...prevState,
            note: event.target.value
        }))
    };

    const onChangeTab = (key) => {
        // if (dataOutputWarehouse.customerId != '')
        // console.log(dataOutputWarehouse.customerId);
        // console.log(key);
    };

    const handleChangeOutputWarehouse = (e, type) => {
        switch (type) {
            case 'operationType':
                setDataOutputWarehouse((prevState) => ({
                    ...prevState,
                    operationType: e
                }))
                break;
            case 'deliveryTo':
                setDataOutputWarehouse((prevState) => ({
                    ...prevState,
                    customerId: e
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
        const fetchAllProduct = async() => {
            const res = await getAllProducts()
            if (res && res.EC === 0) {
                setListProduct(res.DT)
            } else {
                toast.error(res.EM)
            }
            return res
        }

        const fetchCustomer = async() => {
            const res = await getCustomers()
            if (res && res.EC === 0) {
                setListCustomer(res.DT)
                    // console.log(res.DT)
            } else {
                toast.error(res.EM)
            }
            return res
        }

        Promise.all([fetchAllProduct(), fetchCustomer()])

    }, [])

    useEffect(() => {
        const buildSelectCustomer = () => {
            // console.log(listCustomer)
            let customerSelect = listCustomer.map((item, index) => {
                return ({
                    value: item.id,
                    label: item.fullName
                })
            })
            setSelectCustomer(customerSelect)
        }
        buildSelectCustomer()
    }, [listCustomer])


    const validateDataDelivery = () => {
        const fieldCheck = ['customerId', 'scheduledDate', 'scheduledDate'];
        const missingFields = [];

        fieldCheck.forEach(field => {
            if (!dataOutputWarehouse[field]) {
                missingFields.push(field);
            }
        });

        return missingFields;
    };

    const handleSaveOutputWarehouse = async() => {
        dataOutputWarehouse.status = 'draft'

        let check = validateDataDelivery()
        if (check.length === 0) {
            let res = await createNewDelivery(dataOutputWarehouse)
            if (res.EC === 0) {
                setStockCreateId(res.DT)
                toast.success(res.EM)
                handleCancelCreateOutputWarehouse()
            } else {
                toast.error(res.EM)
            }
        } else {
            toast.warning(`Missing fields: ${check.toString()}`)
        }
    }

    const handleCancelCreateOutputWarehouse = () => {
        history.push('/manage-inventory/output-warehouse')
    }

    const handleSetReadyDelivery = async() => {
        console.log(dataOutputWarehouse)
        let check = validateDataDelivery()

        if (check.length === 0) {
            dataOutputWarehouse.status = 'ready'
            let res = await createNewDelivery(dataOutputWarehouse)
                // console.log(res)
            if (res.EC === 0) {
                // console.log(res.DT)
                setStockCreateId(res.DT)
                toast.success(res.EM)
                handleCancelCreateOutputWarehouse()
            } else {
                console.log(1)
                toast.error(res.EM)
            }
        } else {
            toast.warning(`Missing fields: ${check.toString()}`)
        }
    }

    const handleSetDoneDelivery = () => {
        console.log('done')
    }

    return ( <
        div className = 'wrapper-create-output-warehouse' >
        <
        div className = 'header-create' >
        <
        span className = 'title-create' >
        <
        span onClick = {
            () => handleCancelCreateOutputWarehouse() }
        className = 'bold' > { language === LANGUAGES.EN ? 'Delivery' : 'Phiếu xuất kho' } < /span> <
        span > / </span >
        <
        span > < FormattedMessage id = 'nav.manage-inventory-create-product-title' / > < /span> <
        /span> <
        div className = 'btn-actions' >
        <
        button onClick = {
            () => handleSaveOutputWarehouse() }
        className = 'btn btn-primary btn-main' > < FormattedMessage id = 'btn-save' / > < /button> <
        button onClick = {
            () => handleCancelCreateOutputWarehouse() }
        className = 'ms-1 btn btn-outline-secondary' > < FormattedMessage id = 'btn-cancel' / > < /button> <
        /div> <
        /div> <
        div className = 'container-fluid create-product-container' >
        <
        div className = 'actions-status' >
        <
        div className = 'wrap-btn-actions' >
        <
        button onClick = {
            () => handleSetReadyDelivery() }
        className = 'btn btn-main' > Đánh dấu việc cần làm < /button> { /* <button onClick={() => handleSetDoneDelivery()} className='btn btn-gray'>Xác nhận</button> */ } <
        button onClick = {
            () => handleCancelCreateOutputWarehouse() }
        className = 'btn btn-gray' > Hủy < /button> <
        /div> <
        div className = 'output-warehouse-status' >
        <
        Steps type = "navigation"
        size = "small"
        current = { currentStepOutputWarehouse }
        className = "site-navigation-steps output-warehouse-step"
        items = {
            [{
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
            ]
        }
        /> <
        /div> <
        /div> <
        div className = 'body-create-output-warehouse' >
        <
        div className = 'wrap-info-output-warehouse pt-5' >
        <
        div className = 'content-left' >
        <
        div className = 'wrap-expiration-date' >
        <
        label htmlFor = 'select-receive-from' > Người nhận < /label> <
        Select showSearch id = 'select-receive-from'
        className = 'receive-from'
        variant = "borderless"
        optionFilterProp = "children"
        filterOption = {
            (input, option) => (option ? .label ? ? '').includes(input) }
        filterSort = {
            (optionA, optionB) =>
            (optionA ? .label ? ? '').toLowerCase().localeCompare((optionB ? .label ? ? '').toLowerCase())
        }
        options = { selectCustomer }
        onChange = {
            (e) => handleChangeOutputWarehouse(e, 'deliveryTo') }
        /> <
        /div> <
        div className = 'wrap-expiration-date' >
        <
        label htmlFor = 'select-operation-type' > Loại hoạt động < /label> <
        Select showSearch id = 'select-operation-type'
        className = 'operation-type'
        variant = "borderless"
        optionFilterProp = "children"
        filterOption = {
            (input, option) => (option ? .label ? ? '').includes(input) }
        filterSort = {
            (optionA, optionB) =>
            (optionA ? .label ? ? '').toLowerCase().localeCompare((optionB ? .label ? ? '').toLowerCase())
        }
        options = { deliveryToSelect }
        onChange = {
            (e) => handleChangeOutputWarehouse(e, 'operationType') }
        /> <
        /div>

        <
        /div>

        <
        div className = 'content-right' >
        <
        div className = 'wrap-expiration-date' >
        <
        label htmlFor = 'select-date-expiration' > Ngày theo kế hoạch < /label> <
        DatePicker className = 'select-date-expiration'
        onChange = { onChangeDatePicker }
        suffixIcon = { false }
        variant = "borderless"
        placeholder = ''
        size = 'middle'
        id = 'select-date-expiration' /
        >
        <
        /div> <
        /div>

        <
        /div> <
        div className = 'wrap-info-products pt-3' >
        <
        Tabs onChange = { onChangeTab }
        type = "card"
        items = {
            [{
                    label: `Hoạt động`,
                    key: 'tab-1',
                    children: < TableOutputWarehouse createProductListOfDelivery = { createProductListOfDeliveryArray }
                    stockCreateId = { stockCreateId }
                    listProductFromParent = { listProduct }
                    />,
                },
                {
                    label: `Thông tin bổ sung`,
                    key: 'tab-2',
                    children: < OtherInfo / > ,
                },
                {
                    label: `Ghi chú`,
                    key: 'tab-3',
                    children: < Input.TextArea
                        // value={value}
                        // onChange={(e) => setValue(e.target.value)}
                    placeholder = "Thêm một ghi chú nội bộ sẽ được in trên phiếu Hoạt động lấy hàng"
                    onChange = {
                        (e) => onChangeNote(e) }
                    autoSize = {
                        { minRows: 3, maxRows: 5 } }
                    />,
                }
            ]
        }
        />

        <
        /div> <
        /div> <
        /div> <
        /div >
    )
}

export default CreateNewOutputWarehouse