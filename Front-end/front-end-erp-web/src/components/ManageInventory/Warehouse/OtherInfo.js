import React from 'react'
import './OtherInfo.scss'
import { Select, DatePicker } from "antd";


export const OtherInfo = () => {

    const handleChangeInputQuote = () => {

    }

    const onChangeDatePicker = () => {

    }

    return (
        <div className='wrapper-other-info-quote d-flex'>
            <div className='content-left'>
                <div className='content-left-title'>
                    <span className='text-title'>BÁN HÀNG</span>
                </div>
                <div className='content-left-employee d-flex align-items-center'>
                    <label className='me-2' htmlFor='select-employee'>Nhân viên kinh doanh</label>
                    <Select
                        showSearch
                        id='select-employee'
                        className='select-employee flex-grow-1'
                        variant="borderless"
                        placeholder=""
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={[
                            { value: 1, label: 'Nguyễn Văn Khánh' },
                            { value: 2, label: 'Nguyễn Tiến Đạt' },
                        ]}
                        onChange={(e) => handleChangeInputQuote(e, 'customer')}
                    />
                </div>
            </div>
            <div className='content-right'>
                <div className='content-right-title'>
                    <span className='text-title'>VẬN CHUYỂN</span>
                </div>
                <div className='content-right-delivery d-flex align-items-center'>
                    <label className='me-2' htmlFor='select-date-delivery'>Ngày giao hàng</label>
                    <DatePicker
                        className='select-date-delivery'
                        onChange={onChangeDatePicker}
                        suffixIcon={false}
                        variant="borderless"
                        placeholder=''
                        size='middle'
                        id='select-date-delivery'
                    />
                </div>
            </div>
        </div>
    )
}
