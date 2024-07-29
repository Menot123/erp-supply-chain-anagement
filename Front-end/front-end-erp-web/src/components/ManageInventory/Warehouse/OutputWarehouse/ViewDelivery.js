import React from 'react'
import './ViewDelivery.scss'
import FilterHeader from '../../../FilterHeader/FilterHeader';
import { IoOptions } from "react-icons/io5";
import {
    useHistory, useLocation
} from "react-router-dom";
import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { getStockDeliveryInfo, getDeliveryListItems } from '../../../../services/inventoryServices'
import { LANGUAGES } from '../../../../utils/constant'
import { toast } from 'react-toastify';
import { TableProductView } from './TableProductView';
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import { Steps, Select, Tooltip, DatePicker, Tabs, Input } from "antd";

function ViewDelivery() {
    const language = useSelector(state => state.language.value)
    const location = useLocation();
    const history = useHistory();

    const pathParts = location.pathname.split('/')
    const idDelivery = pathParts[pathParts.length - 3] + '%2F' + pathParts[pathParts.length - 2] + '%2F' + pathParts[pathParts.length - 1];
    const idString = idDelivery.replace(/%2F/g, '/')

    const [deliveryInfo, setDeliveryInfo] = useState('');
    const [deliveryItems, setDeliveryItems] = useState([]);
    const [currentStatus, setCurrentStatus] = useState(0);
    const [itemsStatus, setItemsStatus] = useState([
        {
            status: 'process',
            title: 'Nháp',
        },
        {
            status: 'wait',
            title: 'Sẵn sàng',
        },
        {
            status: 'wait',
            title: 'Hoàn tất',
        },
    ]);

    useEffect(() => {
        const deliveryInfo = async () => {
            const res = await getStockDeliveryInfo(idDelivery)
            if (res && res.EC === 0) {
                setDeliveryInfo(res.DT)
                // console.log('Receipt Info:')
                // console.log(res.DT)
                if (res.DT.status === 'ready') {
                    setItemsStatus([
                        {
                            status: 'wait',
                            title: 'Nháp',
                        },
                        {
                            status: 'process',
                            title: 'Sẵn sàng',
                        },
                        {
                            status: 'wait',
                            title: 'Hoàn tất',
                        },
                    ])
                    setCurrentStatus(1);
                }
                else if (res.DT.status === 'done') {
                    setItemsStatus([
                        {
                            status: 'wait',
                            title: 'Nháp',
                        },
                        {
                            status: 'wait',
                            title: 'Sẵn sàng',
                        },
                        {
                            status: 'process',
                            title: 'Hoàn tất',
                        },
                    ])
                    setCurrentStatus(2);
                }
            } else {
                toast.error(res.EM)
            }
            return res
        }

        const fetchReceiptListItems = async () => {
            const res = await getDeliveryListItems(idDelivery)
            if (res && res.EC === 0) {
                setDeliveryItems(res.DT)
                // console.log('Product list of receipt info:')
                console.log(res)
            } else {
                toast.error(res.EM)
            }
            return res
        }

        Promise.all([deliveryInfo(), fetchReceiptListItems()])

    }, [])

    async function addToStock() {

    }


    return (
        <>
            {deliveryInfo &&
                <div className='wrapper-view-output-warehouse'>
                    <div className='header-view'>
                        <span className='title-view'>
                            <span className='bold'>{language === LANGUAGES.EN ? 'Reicept' : 'Phiếu xuất kho'}</span>
                            <span> / </span>
                            <span>({idString})</span>
                        </span>
                        <div className='btn-actions'>
                            <button className='btn btn-primary btn-main'><FormattedMessage id='btn-save' /></button>
                            <button className='ms-1 btn btn-outline-secondary'><FormattedMessage id='btn-cancel' /></button>
                        </div>
                    </div>
                    <div className='container-fluid view-product-container'>
                        <div className='actions-status'>
                            <div className='wrap-btn-actions'>
                                <button className='btn btn-main' onClick={() => addToStock()}>Xác nhận</button>
                                <button className='btn btn-gray'>In nhãn</button>
                                <button className='btn btn-gray'>Hủy</button>
                            </div>
                            <div className='output-warehouse-status'>
                                <Steps
                                    type="navigation"
                                    size="small"
                                    current={currentStatus}
                                    className="site-navigation-steps output-warehouse-step"
                                    items={itemsStatus}
                                />
                            </div>
                        </div>
                        <div className='body-view-output-warehouse'>
                            <div className='wrap-info-output-warehouse pt-5'>
                                <div className='content-left'>
                                    <div className='wrap-expiration-date'>
                                        <label htmlFor='select-receive-from'>Người nhận</label>
                                        <Select
                                            showSearch
                                            id='select-receive-from'
                                            className='receive-from'
                                            variant="borderless"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            options={[{ value: deliveryInfo.customerId, label: deliveryInfo.customerData.nameVi }]}
                                            defaultValue={deliveryInfo.customerId}
                                        // onChange={(e) => handleChangeInputWarehouse(e, 'receiveFrom')}
                                        />
                                    </div>
                                    <div className='wrap-expiration-date'>
                                        <label htmlFor='select-operation-type'>Loại hoạt động</label>
                                        <Select
                                            showSearch
                                            id='select-operation-type'
                                            className='operation-type'
                                            variant="borderless"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            defaultValue={1}
                                            options={[{ value: 1, label: 'Xuất kho' }]}
                                        // onChange={(e) => handleChangeInputWarehouse(e, 'operationType')}
                                        />
                                    </div>

                                </div>

                                <div className='content-right'>
                                    <div className='wrap-expiration-date'>
                                        <label htmlFor='select-date-expiration'>Ngày theo kế hoạch</label>
                                        <DatePicker
                                            className='select-date-expiration'
                                            // onChange={onChangeDatePicker}
                                            suffixIcon={false}
                                            variant="borderless"
                                            placeholder=''
                                            size='middle'
                                            id='select-date-expiration'
                                            defaultValue={moment('2024-03-20', 'YYYY-MM-DD')}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className='wrap-info-products pt-3'>
                                <Tabs
                                    // onChange={onChangeTab}
                                    type="card"
                                    items={[{
                                        label: `Hoạt động`,
                                        key: 'tab-1',
                                        children: <TableProductView listProduct={deliveryItems} />,
                                    },
                                    {
                                        label: `Thông tin bổ sung`,
                                        key: 'tab-2',
                                        // children: <OtherInfo />,
                                    },
                                    {
                                        label: `Ghi chú`,
                                        key: 'tab-3',
                                        children: <Input.TextArea
                                            // value={value}
                                            // onChange={(e) => setValue(e.target.value)}
                                            placeholder="Thêm một ghi chú nội bộ sẽ được in trên phiếu Hoạt động lấy hàng"
                                            // onChange={(e) => onChangeNote(e)}
                                            autoSize={{ minRows: 3, maxRows: 5 }}
                                        />,
                                    }
                                    ]}
                                />

                            </div>
                        </div>
                    </div>
                </div >
            }

        </>
    )
}

export default ViewDelivery