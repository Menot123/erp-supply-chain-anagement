import React, { useEffect, useState } from 'react'
import './OtherInfo.scss'
import { Select, DatePicker } from "antd";
import { FormattedMessage, useIntl } from 'react-intl'
import { getEmployeeById } from '../../../services/saleServices'
import dayjs from 'dayjs';
import moment from 'moment';

export const OtherInfo = (props) => {

    const [selectCustomer, setSelectCustomer] = useState({})

    useEffect(() => {
        const buildSelectCustomer = (dataCustomer) => {
            if (dataCustomer && dataCustomer?.lastName && dataCustomer?.firstName) {
                return {
                    label: dataCustomer?.firstName + ' ' + dataCustomer?.lastName,
                    value: props?.otherInfoQuote?.employeeId
                }
            } else {
                return {
                    label: '',
                    value: ''
                }
            }
        }

        const fetchDataEmployee = async () => {
            if (props?.otherInfoQuote && props?.otherInfoQuote?.employeeId) {
                const res = await getEmployeeById(props?.otherInfoQuote?.employeeId)
                if (res?.EC === 0) {
                    setSelectCustomer(buildSelectCustomer(res?.DT))
                }
            }
        }

        fetchDataEmployee()
    }, [props?.otherInfoQuote])

    const disablePastDates = (current) => {
        // Can not select days before today and today
        return current && current < moment().startOf('day');
    };


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
                        options={props?.listSaleEmployeesSelect ?? []}
                        value={selectCustomer ? selectCustomer : null}
                        onChange={(e) => props?.handleChangeEmployeeId(e)}
                        disabled={props?.isDisable}
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
                        onChange={props?.handleDateDelivery}
                        suffixIcon={false}
                        variant="borderless"
                        placeholder=''
                        size='middle'
                        id='select-date-delivery'
                        defaultValue={props?.otherInfoQuote?.deliveryDate ? dayjs(props?.otherInfoQuote?.deliveryDate) : null}
                        disabled={props?.isDisable}
                        disabledDate={disablePastDates}
                    />
                </div>
            </div>
        </div>
    )
}
