import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { FaRegBuilding } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from 'react'
import './TableInputWarehouse.scss'
import _ from 'lodash'
import { Flex, Input, Select, Tooltip } from 'antd';
import { useEffect } from 'react'
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';



const { TextArea } = Input;

export const TableInputWarehouse = (props) => {

    const [listProduct, setListProduct] = useState([])
    const [creatingProduct, setCreatingProduct] = useState({})
    const [selectedTax, setSelectedTax] = useState(null)
    const [isCreatingProduct, setIsCreatingProduct] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [taxTotals, setTaxTotals] = useState({});
    const [selectProduct, setSelectProduct] = useState([])

    const defaultProduct = {
        productId: '',
        name: '',
        description: '',
        quantity: '0.0',
        price: '0.0',
        tax: { value: 0, label: '' },
        priceBeforeTax: '',
        lineId: '',
        emptyName: false,
        emptyDes: false,
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
        const calculateTotalPrice = () => {
            let totalBeforeTax = 0
            let totalPrice = 0
            if (listProduct && listProduct.length > 0) {
                listProduct.forEach(item => {
                    totalBeforeTax += +item.priceBeforeTax;
                    totalPrice += +item.priceBeforeTax + (+item?.priceBeforeTax * +item?.tax?.value / 100)
                });
            }
            setTotalPrice(totalBeforeTax);
            setFinalPrice(totalPrice)
        };

        const calculateTaxTotals = () => {
            const totals = {};
            listProduct.forEach(item => {
                if (item?.tax && item?.tax?.value !== 0) {
                    const taxValue = +item?.priceBeforeTax * +item?.tax.value / 100;
                    if (totals[item?.tax.value]) {
                        totals[item?.tax.value] += taxValue;
                    } else {
                        totals[item?.tax.value] = taxValue;
                    }
                }
            });
            setTaxTotals(totals);
        };

        calculateTaxTotals();
        calculateTotalPrice();
    }, [listProduct]);

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
            <div className='body-content-sub-company'>
                <table className="table table-striped table-hover table-products">
                    <thead>
                        <tr>
                            <th scope="col">Sản phẩm</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Đơn giá</th>
                            <th scope="col">Thuế</th>
                            <th scope="col">Thành tiền</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listProduct.map((item, index) => {
                                return (
                                    <tr key={'product' + index}>
                                        <td>
                                            <Select
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
                                            <Input
                                                onChange={(e) => handleChangeInputCreatingProduct(e, 'quantity', item)}
                                                value={item?.quantity && item?.quantity !== '' ? item?.quantity : '0.00'}
                                                variant="borderless" />
                                        </td>
                                        <td>
                                            <Input
                                                value={item?.price && item?.price !== '' ? item?.price : '0.00'}
                                                onChange={(e) => handleChangeInputCreatingProduct(e, 'price', item)}
                                                variant="borderless"
                                            />
                                        </td>
                                        <td>
                                            <Select
                                                showSearch
                                                onChange={(e) => handleChangeInputCreatingProduct(e, 'tax', item)}
                                                value={item.tax}
                                                variant="borderless"
                                                className='select-tax'
                                                style={{ width: 200 }}
                                                optionFilterProp="children"
                                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                filterSort={(optionA, optionB) =>
                                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                }
                                                options={taxOptions}
                                            />
                                        </td>
                                        <td>
                                            <span>{item?.priceBeforeTax && item?.priceBeforeTax !== '' ? item?.priceBeforeTax.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '0₫'}</span>
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
                                <span onClick={() => handleAddNewInput()} className='add-sub-company'>Thêm một dòng</span>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div >
    )
}
