import React from 'react'
import './ViewReceipt.scss'
import FilterHeader from '../../../FilterHeader/FilterHeader';
import { IoOptions } from "react-icons/io5";
import {
    useHistory, useLocation
} from "react-router-dom";
import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { getStockEntryInfo, getReceiptListItems, updateReceipt, checkMinusStock } from '../../../../services/inventoryServices'
import { getAllProviders } from '../../../../services/purchaseServices'
import { getAllUser } from '../../../../services/userServices'
import { LANGUAGES } from '../../../../utils/constant'
import { toast } from 'react-toastify';
import { TableProductView } from './TableProductView';
import { OtherInfo } from './OtherInfo';
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import dayjs from 'dayjs';
import { Steps, Select, Tooltip, DatePicker, Tabs, Input } from "antd";


function ViewReceipt() {
    const language = useSelector(state => state.language.value)
    const location = useLocation();
    const history = useHistory();

    const pathParts = location.pathname.split('/')
    const idReceipt = pathParts[pathParts.length - 3] + '%2F' + pathParts[pathParts.length - 2] + '%2F' + pathParts[pathParts.length - 1];
    const idString = idReceipt.replace(/%2F/g, '/')

    const [stockUpdateSubmit, setStockUpdateSubmit] = useState(false);

    const [receiptInfo, setReceiptInfo] = useState('');
    const [receiptItems, setReceiptItems] = useState([]);
    const [currentStatus, setCurrentStatus] = useState(0);

    const [providerList, setProviderList] = useState([]);

    const [usersList, setUsersList] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            let usersArray = await getAllUser();
            if (usersArray.EC == 0) {
                setUsersList(usersArray.DT)
            }
        }
        getUsers()
    }, []);

    function findEmailById(id) {
        // console.log(usersList)
        const user = usersList.find(user => user.id == id);
        if (user) {
            return user.email;
        } else {
            return 'Không xác định';
        }
    }

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
        {
            status: 'wait',
            title: 'Đã hủy',
        },
    ]);

    function getNameViById(providers, item) {
        const provider = providers.find(provider => provider.providerId === item);
        return provider ? provider.nameVi : null;
    }

    useEffect(() => {
        const fetchAllProviders = async () => {
            let response = await getAllProviders()
            if (response.EC == 0) {
                Promise.all([setProviderList(response?.DT)])
                // console.log(response.DT)
            } else {
                toast.error(response?.EM)
            }
        }

        fetchAllProviders()
    }, [])

    useEffect(() => {
        const fetchReceiptInfo = async () => {
            const res = await getStockEntryInfo(idReceipt)
            if (res && res.EC === 0) {
                setReceiptInfo(res.DT)
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
                        {
                            status: 'wait',
                            title: 'Đã hủy',
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
                        {
                            status: 'wait',
                            title: 'Đã hủy',
                        },
                    ])
                    setCurrentStatus(2);
                }
                else if (res.DT.status === 'cancel') {
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
                            status: 'wait',
                            title: 'Hoàn tất',
                        },
                        {
                            status: 'process',
                            title: 'Đã hủy',
                        },
                    ])
                    setCurrentStatus(3);
                }
            } else {
                toast.error(res.EM)
            }
            return res
        }

        const fetchReceiptListItems = async () => {
            const res = await getReceiptListItems(idReceipt)
            if (res && res.EC === 0) {
                setReceiptItems(res.DT)
                // console.log('Product list of receipt info:')
                // console.log(res.DT)
            } else {
                toast.error(res.EM)
            }
            return res
        }

        Promise.all([fetchReceiptInfo(), fetchReceiptListItems()])

    }, [])

    async function addToStock() {
        // console.log('receipt Info ', receiptInfo)
        // console.log('receipt Items ', receiptItems)
        // console.log(dataInputWarehouse)
        let dataInputWarehouse = {
            status: 'done'
        }

        let res = await updateReceipt(encodeURIComponent(receiptInfo.stockEntryId), dataInputWarehouse)
        if (res.EC === 0) {
            toast.success(res.EM)
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
                {
                    status: 'wait',
                    title: 'Đã hủy',
                },
            ])
            setCurrentStatus(2);
            setStockUpdateSubmit(true)
            // handleCancelCreateInputWarehouse()
        } else {
            toast.error(res.EM)
        }

    }

    async function cancelReceipt() {
        let dataInputWarehouse = {
            status: 'cancel'
        }

        let res = await updateReceipt(encodeURIComponent(receiptInfo.stockEntryId), dataInputWarehouse)
        if (res.EC === 0) {
            toast.success(res.EM)
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
                    status: 'wait',
                    title: 'Hoàn tất',
                },
                {
                    status: 'process',
                    title: 'Đã hủy',
                },
            ])
            setCurrentStatus(3);
            // setStockUpdateSubmit(true)
            // handleCancelCreateInputWarehouse()
        } else {
            toast.error(res.EM)
        }
    }

    const childrenItem = (product, value) => {
        // console.log(receiptItems)
        let updateListProduct = receiptItems.map((item, index) => {
            if (item.productId === product.productId) {
                return {
                    ...item,
                    trueQuantity: value
                };
            }
            return item;
        });
        setReceiptItems(updateListProduct)
    }

    const handleCancelViewInputWarehouse = () => {
        history.push('/manage-inventory/input-warehouse')
    }

    return (
        <>
            {receiptInfo &&
                <div className='wrapper-view-input-warehouse'>
                    <div className='header-view'>
                        <span className='title-view'>
                            <span className='bold'>{language === LANGUAGES.EN ? 'Reicept' : 'Phiếu nhập kho'}</span>
                            <span> / </span>
                            <span>({idString})</span>
                        </span>
                        <div className='btn-actions'>
                            <button className='btn btn-primary btn-main'><FormattedMessage id='btn-save' /></button>
                            <button onClick={() => handleCancelViewInputWarehouse()} className='ms-1 btn btn-outline-secondary'><FormattedMessage id='btn-cancel' /></button>
                        </div>
                    </div>
                    <div className='container-fluid view-product-container'>
                        <div className='actions-status'>
                            <div className='wrap-btn-actions'>
                                {currentStatus === 1 && (
                                    <>
                                        <button className='btn btn-main' onClick={() => addToStock()}>Xác nhận</button>
                                        <button className='btn btn-gray' onClick={() => cancelReceipt()}>Hủy</button>
                                    </>
                                )}
                                {currentStatus === 0 && (
                                    <>
                                        <button className='btn btn-gray' onClick={() => cancelReceipt()}>Hủy</button>
                                    </>
                                )}
                                {/* <button className='btn btn-main' onClick={() => addToStock()}>Xác nhận</button>
                                <button className='btn btn-gray' onClick={() => cancelReceipt()}>Hủy</button> */}
                            </div>
                            <div className='input-warehouse-status'>
                                <Steps
                                    type="navigation"
                                    size="small"
                                    current={currentStatus}
                                    className="site-navigation-steps input-warehouse-step"
                                    items={itemsStatus}
                                />
                            </div>
                        </div>
                        <div className='body-view-input-warehouse'>
                            <div className='wrap-info-input-warehouse pt-5'>
                                <div className='content-left'>
                                    <div className='wrap-expiration-date'>
                                        <label htmlFor='select-receive-from'>Nhập từ</label>
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
                                            options={[{ value: receiptInfo.providerId, label: getNameViById(providerList, receiptInfo.providerId) }]}
                                            defaultValue={receiptInfo.providerId}
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
                                            options={[{ value: 1, label: 'Nhập kho' }]}
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
                                            defaultValue={dayjs(receiptInfo.scheduledDate)}
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
                                        children: <TableProductView setStockUpdateSubmit={setStockUpdateSubmit} stockUpdateSubmit={stockUpdateSubmit} listProduct={receiptItems} setListProduct={setReceiptItems} setChildItem={childrenItem} currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} />,
                                    },
                                    {
                                        label: `Thông tin bổ sung`,
                                        key: 'tab-2',
                                        children: <OtherInfo userMail={findEmailById(receiptInfo.userId)} />,
                                    },
                                    {
                                        label: `Ghi chú`,
                                        key: 'tab-3',
                                        children: <Input.TextArea
                                            value={receiptInfo.note}
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

export default ViewReceipt