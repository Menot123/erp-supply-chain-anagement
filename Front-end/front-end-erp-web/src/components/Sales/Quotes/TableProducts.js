import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { FaRegBuilding } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from 'react'
import './TableProduct.scss'
import _ from 'lodash'
import { Flex, Input, Select } from 'antd';

const { TextArea } = Input;

export const TableProducts = (props) => {

    const defaultProduct = {
        productId: '',
        name: '',
        description: '',
        quantity: '',
        price: '',
        tax: '',
        priceAfterTax: '',
    }

    const [subCompanies, setSubCompanies] = useState([])
    const [listProduct, setListProduct] = useState([])

    const showDetailCompany = () => {

    }


    const TrashCanIcon = () => {
        return <FaRegTrashCan />;
    };

    const handleOnchangeInput = () => {

    }

    const handleDeleteInput = () => {

    }

    const handleAddNewInput = () => {
        let _listProduct = _.cloneDeep(listProduct)
        _listProduct.push(defaultProduct)
        setListProduct(_listProduct)
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
                            Object.entries(listProduct).map(([key, child], index) => {
                                return (
                                    <tr>
                                        <td>
                                            <Input placeholder="Nhập để tìm một sản phẩm..." variant="borderless" />
                                        </td>
                                        <td>
                                            <TextArea autoSize variant="borderless" />
                                        </td>
                                        <td>
                                            <Input variant="borderless" value='1,00' />
                                        </td>
                                        <td>
                                            <Input variant="borderless" value='0,00' />
                                        </td>
                                        <td>
                                            <Select
                                                showSearch
                                                className='select-customer'
                                                variant="borderless"
                                                style={{ width: 200 }}
                                                optionFilterProp="children"
                                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                filterSort={(optionA, optionB) =>
                                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                }
                                                options={[
                                                    {
                                                        value: '1',
                                                        label: 'Nguyen Van A',
                                                    },
                                                    {
                                                        value: '2',
                                                        label: 'Felix Huynh',
                                                    },
                                                ]}
                                            />
                                        </td>
                                        <td>
                                            <span>0₫</span>
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
            </div>
        </div >
    )
}
