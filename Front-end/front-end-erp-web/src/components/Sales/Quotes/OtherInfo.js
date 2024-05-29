import React from 'react'
import './OtherInfo.scss'
import { Select, DatePicker } from "antd";
import { FormattedMessage, useIntl } from 'react-intl'


export const OtherInfo = () => {

    const handleChangeInputQuote = () => {

    }

    const onChangeDatePicker = () => {

    }

    return (
        <div className='wrapper-other-info-quote d-flex'>
            <div className='content-left'>
                <div className='content-left-title'>
                    <span className='text-title'><FormattedMessage id="new_quote.other-info-seller-title" /></span>
                </div>
                <div className='content-left-employee d-flex align-items-center'>
                    <label className='me-2' htmlFor='select-employee'><FormattedMessage id="new_quote.other-info-seller" /></label>
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
                    <span className='text-title'><FormattedMessage id="new_quote.other-info-transportation" /></span>
                </div>
                <div className='content-right-delivery d-flex align-items-center'>
                    <label className='me-2' htmlFor='select-date-delivery'><FormattedMessage id="new_quote.other-info.date-transportation" /></label>
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
