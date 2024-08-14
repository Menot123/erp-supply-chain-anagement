import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { IoOptions } from "react-icons/io5";
import { FaRegBuilding } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from 'react'
import './TableProductView.scss'
import { getProductWithId, updateReceiptItem, addToStock, minusToStock } from '../../../../services/inventoryServices'
import _ from 'lodash'
import { Flex, Input, Select, Tooltip, DatePicker } from 'antd';
import { useEffect } from 'react'
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import dayjs from 'dayjs';

const { TextArea } = Input;

export const TableProductView = (props) => {

    const [listProduct, setListProduct] = useState([])
    const [creatingProduct, setCreatingProduct] = useState({})
    const [selectedTax, setSelectedTax] = useState(null)
    const [isCreatingProduct, setIsCreatingProduct] = useState(false)
    const [stockEntryId, setStockEntryId] = useState('')
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

    useEffect(() => {
        if (props && props?.listProduct) {
            if (props.listProduct[0]?.stockEntryId) {
                // console.log('list product', props.listProduct[0])
                // console.log(1)
                setStockEntryId(props.listProduct[0].stockEntryId)
            }
            // const buildSelectProduct = () => {
            //     let productSelect = props?.listProductFromParent.map((item, index) => {
            //         return (
            //             {
            //                 value: item.productId,
            //                 label: item.productData.nameVi
            //             }
            //         )
            //     })
            //     setSelectProduct(productSelect)
            // }
            // buildSelectProduct()
        }
    }, [props])

    useEffect(async () => {
        if (props.stockUpdateSubmit) {
            console.log('listProduct: ', props.listProduct)
            // await props.createProductListOfReceipt(listProduct)
            props.listProduct.map(async (item, index) => {
                // console.log(item)
                let dataStock = {
                    productId: item.productId,
                    warehouseId: 'WH001',
                    quantity: item.trueQuantity
                }
                let addResponse = await addToStock(dataStock)
                if (addResponse.EC == 0) {
                    await updateReceiptItem(item.stockEntryItemId,
                        {
                            // stockEntryId: props.stockUpdateId,
                            // productId: item.productId,
                            // description: item.description,
                            // scheduledDate: item.scheduledDate,
                            // deadline: item.deadline,
                            // quantity: item.quantity,
                            trueQuantity: item.trueQuantity,
                        }
                    )
                }

            })
            props.setStockUpdateSubmit(false)
        }
        else {
            console.log(props.listProduct)
        }
    }, [props.stockUpdateSubmit, props.listProduct])


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
        // setDataInputWarehouse((prevState) => ({
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
        // console.log(_listProduct)
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

    const setTrueQuantity = (product, e) => {
        // console.log(element.target.value)
        if (props.currentStatus === 1)
            props?.setChildItem(product, e.target.value)
        // console.log(props.listProduct)
    }

    return (
        <div>
            <div className='body-content-product-view'>
                <table className="table table-striped table-hover table-products">
                    <thead>
                        <tr>
                            <th scope="col">Sản phẩm</th>
                            <th scope="col">Mô tả</th>
                            {/* <th scope="col">Ngày theo kế hoạch</th> */}
                            {/* <th scope="col">Hạn chót</th> */}
                            <th scope="col">Nhu cầu</th>
                            <th scope="col">Số lượng nhận được</th>
                            <th scope="col"><IoOptions /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.listProduct.map((item, index) => {
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
                                                // options={selectProduct}
                                                options={[{ value: index, label: item.productData.nameVi }]}
                                                defaultValue={index}
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
                                        {/* <td>
                                            <DatePicker
                                                className='select-date-expiration'
                                                onChange={onChangeDatePickerItem}
                                                defaultValue={dayjs(item.scheduledDate)}
                                                suffixIcon={false}
                                                variant="borderless"
                                                placeholder=''
                                                size='middle'
                                                id='select-date-expiration'
                                                format="DD-MM-YYYY"
                                            />
                                        </td> */}
                                        {/* <td>
                                            <DatePicker
                                                className='select-date-expiration'
                                                onChange={onChangeDatePickerItem}
                                                defaultValue={moment(item.deadline)}
                                                suffixIcon={false}
                                                variant="borderless"
                                                placeholder=''
                                                size='middle'
                                                id='select-date-expiration'
                                                format="DD-MM-YYYY"
                                            />
                                        </td> */}
                                        <td>
                                            <Input
                                                onChange={(e) => handleChangeInputCreatingProduct(e, 'quantity', item)}
                                                value={item?.quantity && item?.quantity !== '' ? item?.quantity : '0'}
                                                variant="borderless" />
                                        </td>
                                        <td>
                                            <Input
                                                onChange={(e) => setTrueQuantity(item, e)}
                                                value={item?.trueQuantity && item?.trueQuantity !== '' ? item?.trueQuantity : '0'}
                                                variant="borderless" />
                                        </td>
                                        <td>
                                            <Tooltip placement="top" title={`Xóa sản phẩm "${item.productData.nameVi}"`}>
                                                <FaRegTrashCan className='hover-item' onClick={() => handleRemoveProduct(item)} />
                                            </Tooltip>
                                        </td>

                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td colSpan='7'>
                                {props.hadProvider == true
                                    ? <span onClick={() => handleAddNewInput()} className='add-product-view'>Thêm một dòng</span>
                                    : <span disabled className='add-product-view'>Thêm một dòng</span>
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div >
    )
}
