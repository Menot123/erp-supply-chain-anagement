import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { FaRegBuilding } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from 'react'
import './TableProduct.scss'
import _ from 'lodash'
import { Flex, Input, Select } from 'antd';
import { useEffect } from 'react'
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const { TextArea } = Input;

export const TableProducts = (props) => {

    const [listProduct, setListProduct] = useState([])
    const [creatingProduct, setCreatingProduct] = useState({})
    const [selectedTax, setSelectedTax] = useState(null)
    const [isCreatingProduct, setIsCreatingProduct] = useState(false)
    const [errors, setErrors] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const defaultProduct = {
        productId: 10,
        name: '',
        description: '',
        quantity: '0.0',
        price: '0.0',
        tax: { value: 0, label: '' },
        priceBeforeTax: '',
        emptyName: false,
        emptyDes: false,
    }

    const taxOptions = [
        { value: '10', label: '10%' },
        { value: '20', label: '20%' },
        { value: '30', label: '30%' },
    ]

    useEffect(() => {
        const calculateTotalPrice = () => {
            let total = 0;
            listProduct.forEach(item => {
                total += +item.priceBeforeTax;
            });
            setTotalPrice(total.toFixed(2));
        };

        calculateTotalPrice();
    }, [listProduct]);

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

    const handleChangeInputCreatingProduct = (e, type, product) => {

        // Tìm sản phẩm trong danh sách dựa trên productId
        const updatedProducts = listProduct.map((item, index) => {
            const reg = /^-?\d*(\.\d*)?$/;
            if (+item.productId === +product?.productId) {
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
                        productId: +index + 10,
                        priceBeforeTax: +item.quantity * +item.price,
                        [type]: e.target.value
                    };
                }
            }
            return item;
        });

        // Cập nhật danh sách sản phẩm mới
        setListProduct(updatedProducts);
    }

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
                                            <Input className={item?.emptyName
                                                ? 'name-creating-product empty-data'
                                                : 'name-creating-product'}
                                                placeholder="Nhập để tìm một sản phẩm..." variant="borderless"
                                                onChange={(e) => handleChangeInputCreatingProduct(e, 'name', item)}
                                                value={item?.name}
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
                                            <span>{item?.priceBeforeTax && item?.priceBeforeTax !== '' ? item?.priceBeforeTax : '0'}₫</span>
                                        </td>
                                        <td>
                                            <FaRegTrashCan />
                                        </td>

                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td colSpan='7'>
                                <span onClick={() => handleAddNewInput()} className='add-sub-company'>Thêm sản phẩm</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='wrap-policy-total'>
                    <div className='policy input-hover'>
                        <TextArea autoSize variant="borderless" className='input-policy' placeholder='Điều khoản và điều kiện...' />
                    </div>
                    <div className='wrap-tax-price'>
                        <div className='price-before-tax d-flex justify-content-between gap-4 align-items-center'>
                            <span>Số tiền trước thuế: </span>
                            <span>
                                {
                                    totalPrice && totalPrice !== 'NaN' && +totalPrice !== 0 ? totalPrice : '0₫'
                                }
                            </span>
                        </div>

                        <div className='price-tax d-flex justify-content-between gap-4 align-items-center'>
                            <span>Thuế GTGT 5%: </span>
                            <span>0₫</span>
                        </div>

                        <div className='total-price d-flex justify-content-between gap-4 align-items-center'>
                            <span>Tổng: </span>
                            <h5 className='total-price-text'>0₫</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
