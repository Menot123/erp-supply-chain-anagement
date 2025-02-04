import React, { useCallback } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { FaRegBuilding } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from 'react'
import './TableProduct.scss'
import _ from 'lodash'
import { Flex, Input, Select, Tooltip } from 'antd';
import { useEffect } from 'react'
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const { TextArea } = Input;

export const TableProducts = (props) => {

    const intl = useIntl();

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
        quantity: '0',
        price: '0',
        tax: { value: 0, label: '' },
        priceBeforeTax: '',
        lineId: '',
        emptyName: false,
        emptyDes: false,
    }

    const taxOptions = [
        { value: '0', label: '0%' },
        { value: '10', label: '10%' },
        { value: '20', label: '20%' },
        { value: '30', label: '30%' },
    ]

    useEffect(() => {
        if (props?.listProductFromParent) {
            if (props?.productAdded) {
                setListProduct(props?.productAdded)
            }
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
    }, [props?.listProductFromParent, props?.productAdded])


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
            Promise.all([setTotalPrice(totalBeforeTax), setFinalPrice(totalPrice), props?.handleChangeDataQuote(totalPrice, 'totalPrice'), props?.setTaxAndPriceBeforeTax('priceBeforeTax', totalBeforeTax)])
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
            props?.setTaxAndPriceBeforeTax('tax', totals)
        };

        clearTimeout();
        setTimeout(() => {
            calculateTaxTotals();
            calculateTotalPrice();
        }, 1000);
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
        const updatedProducts = listProduct.map((item) => {
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

        // Sử dụng timeout để cập nhật dữ liệu sau 2 giây nếu không có thay đổi khác
        clearTimeout(handleChangeInputCreatingProduct.timeout);
        handleChangeInputCreatingProduct.timeout = setTimeout(() => {
            props?.handleChangeDataQuote(updatedProducts, 'productList');
        }, 2000);
    };


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
                            <th scope="col"><FormattedMessage id="new_quote.product" /></th>
                            <th scope="col"><FormattedMessage id="new_quote.product-description" /></th>
                            <th scope="col"><FormattedMessage id="new_quote.product-quantity" /></th>
                            <th scope="col"><FormattedMessage id="new_quote.product-price" /></th>
                            <th scope="col"><FormattedMessage id="new_quote.product-tax" /></th>
                            <th scope="col"><FormattedMessage id="new_quote.product-total" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listProduct.map((item, index) => {
                                return (
                                    <tr key={'product' + index} >
                                        <td>
                                            <Select
                                                className={item?.emptyName
                                                    ? 'name-creating-product empty-data'
                                                    : 'name-creating-product'}
                                                placeholder={intl.formatMessage({ id: "new_quote.placeholder-customer" })}
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
                                                value={{ label: item?.name, value: item?.productId }}
                                                disabled={props?.isDisable}
                                            />
                                        </td>
                                        <td>
                                            <TextArea className={item?.emptyDes
                                                ? 'des-creating-product empty-data'
                                                : 'des-creating-product'}
                                                value={item?.description}
                                                autoSize variant="borderless"
                                                onChange={(e) => handleChangeInputCreatingProduct(e, 'description', item)}
                                                disabled={props?.isDisable}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                onChange={(e) => handleChangeInputCreatingProduct(e, 'quantity', item)}
                                                value={item?.quantity && item?.quantity !== '' ? item?.quantity : '0'}
                                                variant="borderless" disabled={props?.isDisable}
                                            />

                                        </td>
                                        <td>
                                            <Input
                                                value={item?.price && item?.price !== '' ? item?.price : '0'}
                                                onChange={(e) => handleChangeInputCreatingProduct(e, 'price', item)}
                                                variant="borderless" disabled={props?.isDisable}
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
                                                disabled={props?.isDisable}
                                            />
                                        </td>
                                        <td>
                                            <span>{item?.priceBeforeTax && item?.priceBeforeTax !== '' ? item?.priceBeforeTax.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '0₫'}</span>
                                        </td>
                                        <td>
                                            {!props?.isDisable &&
                                                <Tooltip placement="top" title={intl.formatMessage({ id: "new_quote.tool-tip-delete" }) + item.name}>
                                                    <FaRegTrashCan className='hover-item' onClick={() => handleRemoveProduct(item)} />
                                                </Tooltip>
                                            }
                                        </td>

                                    </tr>
                                )
                            })
                        }
                        <tr>
                            {!props?.isDisable &&
                                <td colSpan='7'>
                                    {props?.isSendingQuote ? "" : <span onClick={() => handleAddNewInput()} className='add-sub-company'><FormattedMessage id="new_quote.product-add-new" /></span>}
                                </td>
                            }
                        </tr>
                    </tbody>
                </table>
                <div className='wrap-policy-total'>
                    <div className='policy input-hover'>
                        <TextArea autoSize variant="borderless" className='input-policy'
                            placeholder={intl.formatMessage({ id: "new_quote.condition-policy" })}
                            onChange={(e) => props?.handleChangeDataQuote(e, 'policyAndCondition')}
                            value={props?.policyAndCondition && props?.policyAndCondition}
                            disabled={props?.isDisable}
                        />
                    </div>
                    <div className='wrap-tax-price'>
                        <div className='price-before-tax d-flex justify-content-between gap-4 align-items-center'>
                            <span ><FormattedMessage id="new_quote.total-before-tax" /></span>
                            <span className='fw-bold'>
                                {
                                    totalPrice && totalPrice !== 'NaN' && +totalPrice !== 0 ? totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '0₫'
                                }
                            </span>
                        </div>

                        {
                            Object.keys(taxTotals).map((taxValue, index) => (
                                <div key={'tax-total' + index} className='tax-total d-flex justify-content-between gap-4 align-items-center'>
                                    <span><FormattedMessage id="new_quote.VAT" /> {taxValue}% : </span>
                                    <span>{taxTotals[taxValue].toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                </div>
                            ))
                        }

                        <div className='total-price d-flex justify-content-between gap-4 align-items-center'>
                            <span><FormattedMessage id="new_quote.total" /> </span>
                            <h5 className='total-price-text'>{finalPrice && finalPrice !== 0 ? finalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '0₫'}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
