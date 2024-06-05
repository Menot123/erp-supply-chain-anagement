import React from 'react'
import './OtherInfo.scss'
import { Select, DatePicker } from "antd";
import { useSelector } from 'react-redux';


export const OtherInfo = () => {

    const user = useSelector(state => state.user)
    const userName = user.lastName + ' ' + user.firstName

    const handleChangeInputQuote = () => {

    }

    const onChangeDatePicker = () => {

    }

    return (
        <div className='wrapper-other-info-quote d-flex'>
            <div className='content-left'>
                <div className='content-left-title'>
                    <span className='text-title'>THÔNG TIN KHÁC</span>
                </div>
                <div className='content-left-employee d-flex align-items-center mt-4'>
                    <label className='me-2' htmlFor='select-employee'>Người phụ trách</label>
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
                            { value: 1, label: userName },
                        ]}
                        value={1}
                        onChange={(e) => handleChangeInputQuote(e, 'customer')}
                    />
                </div>
            </div>
        </div>
    )
}
