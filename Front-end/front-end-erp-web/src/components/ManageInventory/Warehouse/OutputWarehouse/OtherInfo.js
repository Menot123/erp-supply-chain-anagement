import React from 'react'
import './OtherInfo.scss'
import { Select, DatePicker } from "antd";
import { useSelector } from 'react-redux';


export const OtherInfo = (props) => {

    const user = useSelector(state => state.user)
    const userName = user.lastName + ' ' + user.firstName

    return (
        <div className='wrapper-other-info-output-warehouse d-flex'>
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
                            { value: 1, label: props.userMail ? props.userMail : userName },
                        ]}
                        value={1}
                    />
                </div>
            </div>
        </div>
    )
}
