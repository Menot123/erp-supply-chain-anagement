import React from 'react'
import './NewQuote.scss'
import { useHistory } from 'react-router-dom'
import { Steps, Select, Tooltip, DatePicker, Tabs, Input } from "antd";
import { useState } from 'react'
import { TableProducts } from './TableProducts';

const { TextArea } = Input;


export const NewQuote = () => {

    const history = useHistory()
    const [current, setCurrent] = useState(0);

    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'product',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Thuế',
            dataIndex: 'tax',
        },
        {
            title: 'Giá thực tế',
            dataIndex: 'cost',
        },
    ];
    const data = [
        {
            key: '1',
            product: 'Iphone 15',
            description: 'Make by Apple',
            quantity: 10,
            price: 100,
            tax: '10%',
            cost: 110
        },
        {
            key: '2',
            product: 'Iphone 16',
            description: 'Make by Apple',
            quantity: 20,
            price: 200,
            tax: '20%',
            cost: 120
        },

    ];

    const handleCreateNewDepartment = () => {

    }

    const backToQuote = () => {
        history.push('/sale-order')
    }

    const onChangeDatePicker = (date, dateString) => {
        console.log(date, dateString);
    };

    const onChangeTab = (key) => {
        console.log(key);
    };

    const onChangeTable = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div className='wrapper-create-quote'>
            <div className='header-create-quote'>
                <div className='btn-actions'>
                    <button onClick={() => handleCreateNewDepartment()} className='ms-1 btn btn-outline-secondary btn-create-quote'>Mới</button>
                </div>
                <div className='wrapper-text-header'>
                    <Tooltip placement="top" title={'Back to "Báo giá"'}>
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
                        <button className='btn btn-gray'>Xem trước</button>
                    </div>
                    <div className='quote-status'>
                        <Steps
                            type="navigation"
                            size="small"
                            current={current}
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
                            <label>Khách hàng</label>
                            <Select
                                showSearch
                                className='select-customer'
                                variant="borderless"
                                placeholder="Nhập để tìm một khách hàng..."
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

                        </div>
                        <div className='content-right'>
                            <div className='wrap-expiration-date'>
                                <label>Ngày hết hạn</label>
                                <DatePicker
                                    className='select-date-expiration'
                                    onChange={onChangeDatePicker}
                                    suffixIcon={null}
                                    variant="borderless"
                                    placeholder=""
                                />
                            </div>
                            <div className='wrap-currency'>
                                <label>Bảng giá</label>
                                <Select
                                    className='select-currency'
                                    showSearch
                                    variant="borderless"
                                    style={{ width: 200 }}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={[
                                        {
                                            value: 'VND',
                                            label: 'Default VND pricelist (VND)',
                                        },
                                        {
                                            value: 'USD',
                                            label: 'Dollars (USD)',
                                        },
                                    ]}
                                />
                            </div>

                            <div className='wrap-payment-method'>
                                <label>Điều khoản thanh toán</label>
                                <Select
                                    showSearch
                                    className='select-payment-method'
                                    variant="borderless"
                                    style={{ width: 200 }}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={[
                                        {
                                            value: 'now',
                                            label: 'Thanh toán ngay',
                                        },
                                        {
                                            value: '15d',
                                            label: '15 ngày',
                                        },
                                        {
                                            value: '30d',
                                            label: '30 ngày',
                                        },
                                    ]}
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
                                key: 'info-product-1',
                                children: <TableProducts />,
                            },
                            {
                                label: `Thông tin khác`,
                                key: 'info-product-2',
                                children: <TableProducts />,
                            }
                            ]}
                        />

                    </div>
                </div>
            </div>

        </div>
    )
}
