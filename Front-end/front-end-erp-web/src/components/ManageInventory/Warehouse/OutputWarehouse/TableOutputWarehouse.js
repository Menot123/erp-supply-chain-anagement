import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { IoOptions } from "react-icons/io5";
import { FaRegBuilding } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from 'react'
import './TableOutputWarehouse.scss'
import _ from 'lodash'
import { Flex, Input, Select, Tooltip, DatePicker } from 'antd';
import { useEffect } from 'react'
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const { TextArea } = Input;

export const TableOutputWarehouse = (props) => {

    const [listProduct, setListProduct] = useState([])
    const [creatingProduct, setCreatingProduct] = useState({})
    const [selectedTax, setSelectedTax] = useState(null)
    const [isCreatingProduct, setIsCreatingProduct] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [taxTotals, setTaxTotals] = useState({});
    const [selectProduct, setSelectProduct] = useState([])

    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

    const defaultProduct = {
        stockEntryId: '',
        productId: '',
        description: '',
        scheduleDate: new Date(),
        deadline: new Date(),
        quantity: '0.0',
    }

    const taxOptions = [
        { value: '10', label: '10%' },
        { value: '20', label: '20%' },
        { value: '30', label: '30%' },
    ]

    useEffect(() => {
        if (props && props?.listProductFromParent) {
            const buildSelectProduct = () => {
                let productSelect = props?.listProductFromParent.map((item, index) => {
                    console.log(item)
                    return (
                        {
                            value: item.productId,
                            label: item.nameVi
                        }
                    )
                })
                setSelectProduct(productSelect)
            }
            buildSelectProduct()
        }
    }, [props])

    useEffect(() => {
        if (props.stockCreateId !== '') {
            listProduct.forEach(async (product, index) => {
                await props.createProductListOfDelivery(
                    {
                        stockDeliveryId: props.stockCreateId,
                        productId: product.productId,
                        description: product.description,
                        scheduledDate: product.scheduledDate,
                        deadline: product.deadline,
                        quantity: product.quantity
                    }
                )
            })
        }
    }, [props.stockCreateId])

    // useEffect(() => {

    // }, [listProduct]);


    const updateEmptyFieldProduct = (productCreating, type) => {
        const updatedProducts = listProduct.map(item => {
            if (item.productId === productCreating?.productId) {
                // Cập nhật giá trị của trường (field) tương ứng
                if (type === 'name') {
                    return { ...item, emptyName: true };
                }
                if (type === 'description') {
                    return { ...item, emptyDes: true };
                }
            }
            return item;
        });

        // Cập nhật danh sách sản phẩm mới
        setListProduct(updatedProducts);
    }

    const handleAddNewInput = () => {
        // Add new product
        if (!isCreatingProduct) {
            setIsCreatingProduct(true)
            let _listProduct = _.cloneDeep(listProduct)
            _listProduct.push(defaultProduct)
            setListProduct(_listProduct)
            setCreatingProduct(defaultProduct)
        } else {
            // Existing product is creating
            const productCreating = listProduct[listProduct.length - 1]
            if (productCreating) {
                if (!productCreating?.name || productCreating?.name === '') {
                    updateEmptyFieldProduct(productCreating, 'name')
                    return
                }
                else if (!productCreating?.description || productCreating?.description === '') {
                    updateEmptyFieldProduct(productCreating, 'description')
                    return
                } else {
                    let _listProduct = _.cloneDeep(listProduct)
                    _listProduct.push(defaultProduct)
                    setListProduct(_listProduct)
                    setCreatingProduct(defaultProduct)
                }
            }
        }
    }

    const onChangeDatePickerItem = (date, dateString) => {
        // setDataOutputWarehouse((prevState) => ({
        //     ...prevState,
        //     scheduledDay: dateString
        // }))
    };

    const handleOnchangeNameProduct = (e, labeledValue) => {
        let _listProduct = _.cloneDeep(listProduct)
        let creatingProduct = _listProduct[_listProduct.length - 1]
        if (creatingProduct) {
            creatingProduct = {
                ...creatingProduct,
                lineId: _listProduct.length,
                productId: e,
                name: labeledValue?.label
            }
        }
        _listProduct[_listProduct.length - 1] = creatingProduct
        // Cập nhật danh sách sản phẩm mới
        console.log(_listProduct)
        setListProduct(_listProduct);
    }

    const handleChangeInputCreatingProduct = (e, type, product) => {
        // Tìm sản phẩm trong danh sách dựa trên productId
        const updatedProducts = listProduct.map((item, index) => {
            const reg = /^-?\d*(\.\d*)?$/;
            if (+item.lineId === +product?.lineId) {
                // Cập nhật giá trị của trường (field) tương ứng
                if (type === 'tax') {
                    return {
                        ...item,
                        [type]: { value: e, label: e + ' %' }
                    };
                } else if (type === 'price') {
                    if (reg.test(e.target.value) || e.target.value === '' || e.target.value === '-') {
                        return {
                            ...item,
                            [type]: e.target.value,
                            priceBeforeTax: +e.target.value * +item.quantity
                        };
                    }

                } else if (type === 'quantity') {
                    if (reg.test(e.target.value) || e.target.value === '' || e.target.value === '-') {
                        return {
                            ...item,
                            [type]: e.target.value,
                            priceBeforeTax: +e.target.value * +item.price
                        };
                    }
                } else {
                    return {
                        ...item,
                        emptyName: false,
                        emptyDes: false,
                        [type]: e.target.value
                    };
                }
            }
            return item;
        });

        // Cập nhật danh sách sản phẩm mới
        setListProduct(updatedProducts);
    }

    const handleRemoveProduct = (product) => {
        let _listProduct = _.cloneDeep(listProduct);
        if (_listProduct && _listProduct.length > 0) {
            _listProduct = _listProduct.filter(item => item.productId !== product.productId);
        }
        setListProduct(_listProduct)
        setIsCreatingProduct(false)
    };

    return (
        <div>
            <div className='body-content-output-warehouse'>
                <table className="table table-striped table-hover table-products">
                    <thead>
                        <tr>
                            <th scope="col">Sản phẩm</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col">Ngày theo kế hoạch</th>
                            <th scope="col">Hạn chót</th>
                            <th scope="col">Nhu cầu</th>
                            <th scope="col"><IoOptions /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listProduct.map((item, index) => {
                                return (
                                    <tr key={'product' + index}>
                                        <td>
                                            <Select
                                                key={index}
                                                className={item?.emptyName
                                                    ? 'name-creating-product empty-data'
                                                    : 'name-creating-product'}
                                                placeholder="Nhập để tìm một sản phẩm..."
                                                variant="borderless"
                                                showSearch
                                                onChange={(e, labeledValue) => handleOnchangeNameProduct(e, labeledValue)}
                                                style={{ width: 200 }}
                                                optionFilterProp="children"
                                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                filterSort={(optionA, optionB) =>
                                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                }
                                                options={selectProduct}
                                            />
                                        </td>
                                        <td>
                                            <TextArea className={item?.emptyDes
                                                ? 'des-creating-product empty-data'
                                                : 'des-creating-product'}
                                                value={item?.description}
                                                autoSize variant="borderless"
                                                onChange={(e) => handleChangeInputCreatingProduct(e, 'description', item)}
                                            />
                                        </td>
                                        <td>
                                            <DatePicker
                                                className='select-date-expiration'
                                                onChange={onChangeDatePickerItem}
                                                suffixIcon={false}
                                                variant="borderless"
                                                placeholder=''
                                                size='middle'
                                                id='select-date-expiration'
                                            />
                                        </td>
                                        <td>
                                            <DatePicker
                                                className='select-date-expiration'
                                                onChange={onChangeDatePickerItem}
                                                suffixIcon={false}
                                                variant="borderless"
                                                placeholder=''
                                                size='middle'
                                                id='select-date-expiration'
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                onChange={(e) => handleChangeInputCreatingProduct(e, 'quantity', item)}
                                                value={item?.quantity && item?.quantity !== '' ? item?.quantity : '0.00'}
                                                variant="borderless" />
                                        </td>
                                        <td>
                                            <Tooltip placement="top" title={`Xóa sản phẩm "${item.name}"`}>
                                                <FaRegTrashCan className='hover-item' onClick={() => handleRemoveProduct(item)} />
                                            </Tooltip>
                                        </td>

                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td colSpan='7'>
                                <span onClick={() => handleAddNewInput()} className='add-output-warehouse'>Thêm một dòng</span>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div >
    )
}
