import React from 'react'
import './InputWarehouse.scss'
import FilterHeader from '../../../FilterHeader/FilterHeader';
import { IoOptions } from "react-icons/io5";
import {
    useHistory
} from "react-router-dom";
import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { getStockEntrys } from '../../../../services/inventoryServices'
import { getAllProviders } from '../../../../services/purchaseServices'
import { getAllUser } from '../../../../services/userServices'
import { LANGUAGES } from '../../../../utils/constant'
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl'
import moment from 'moment';

function InputWarehouse() {
    const user = useSelector(state => state.user)
    const userId = user.id

    const history = useHistory();
    const [currentView, setCurrentView] = useState('list')
    const [currentLimit] = useState(16)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)

    const [stockEntrys, setStockEntrys] = useState([])
    const tempProductsLength = 1
    const language = useSelector(state => state.language.value)

    // Checkbox
    const [isShowActions, setIsShowActions] = useState(false);
    const [numberCheckedItems, setNumberCheckedItems] = useState(0);
    const [allElementsChecked, setAllElementsChecked] = useState(false);

    const [isOpenDropdownFilter, setIsOpenDropdownFilter] = useState(false)
    const dropdownFilterRef = useRef(null);

    const [contactChecked, setContactChecked] = useState(true);
    const [personInChargeChecked, setPersonInChargeChecked] = useState(true);
    const [plannedDateChecked, setplannedDateChecked] = useState(false);
    const [productAvailabilityChecked, setProductAvailabilityChecked] = useState(false);
    const [deadlineChecked, setDeadlineChecked] = useState(false);
    const [effectiveDateChecked, setEffectiveDateChecked] = useState(true);
    const [originalDocumentChecked, setOriginalDocumentChecked] = useState(true);
    const [orderDelayOfChecked, setOrderDelayOfChecked] = useState(false);
    const [activityTypeChecked, setActivityTypeChecked] = useState(false);
    const [statusChecked, setStatusChecked] = useState(true);
    const [providerList, setProviderList] = useState([]);

    const [searchInputWarehouse, setSearchInputWarehouse] = useState('')

    const changeSearchInputWarehouse = (content) => {
        setSearchInputWarehouse(content)
    }

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

    const renderStatus = (item, status) => {
        let statusClass = '';
        let statusText = '';

        if (!status) {
            return (
                <td key='0'>
                    <span className='hidden'>{statusText}</span>
                </td>
            );
        }

        if (item === 'draft') {
            statusClass = 'gray';
            statusText = 'Nháp';
        } else if (item === 'ready') {
            statusClass = 'blue';
            statusText = 'Sẵn sàng';
        } else if (item === 'done') {
            statusClass = 'green';
            statusText = 'Hoàn thành';
        } else if (item === 'cancel') {
            statusClass = 'red';
            statusText = 'Đã hủy';
        }

        return (
            <td key={item.id}>
                <span className={statusClass}>{statusText}</span>
            </td>
        );
    };

    const csvDataExportVi = [
        ["Mã tham chiếu", "Liên hệ", "Người phụ trách", "Ngày theo kế hoạch", "Tình trạng còn hàng của sản phẩm", "Hạn chót", "Ngày hiệu lực", "Chứng từ gốc", "Đơn hàng chậm trễ của", "Loại hoạt động", "Trạng thái"],
        // ["WH/IN/001", "0123456789", "Nguyễn Tiến Đạt", "08/01/2024", "", "", "05/09/2024 04:18:45", "", "", "Nhập kho", "Hoàn tất"],
        // ["WH/IN/001", "0123456789", "Nguyễn Tiến Đạt", "08/01/2024", "", "", "05/09/2024 04:18:45", "", "", "Nhập kho", "Hoàn tất"],
        // ["WH/IN/001", "0123456789", "Nguyễn Tiến Đạt", "08/01/2024", "", "", "05/09/2024 04:18:45", "", "", "Nhập kho", "Hoàn tất"]
    ];
    const csvDataExportEn = [
        ["Reference", "Contact", "Responsible", "Scheduled Date", "Product Availability", "Deadline", "Effective Date", "Source Document", "Back Order of", "Operation Type", "Status"],
        // ["WH/IN/001", "0123456789", "Nguyễn Tiến Đạt", "08/01/2024", "", "", "05/09/2024 04:18:45", "", "", "Nhập kho", "Hoàn tất"],
        // ["WH/IN/001", "0123456789", "Nguyễn Tiến Đạt", "08/01/2024", "", "", "05/09/2024 04:18:45", "", "", "Nhập kho", "Hoàn tất"],
        // ["WH/IN/001", "0123456789", "Nguyễn Tiến Đạt", "08/01/2024", "", "", "05/09/2024 04:18:45", "", "", "Nhập kho", "Hoàn tất"]
    ];

    const [listCheckedItems, setListCheckedItems] = useState([["Mã tham chiếu", "Liên hệ", "Người phụ trách", "Ngày theo kế hoạch", "Tình trạng còn hàng của sản phẩm", "Hạn chót", "Ngày hiệu lực", "Chứng từ gốc", "Đơn hàng chậm trễ của", "Loại hoạt động", "Trạng thái"]]);



    const exampleItem = {
        reference: 'WH/IN/001',
        contact: '0123456789',
        responsible: 'Nguyễn Tiến Đạt',
        scheduledDate: '08/01/2024',
        productAvailability: '',
        deadline: '',
        effectiveDate: '05/09/2024 04:18:45',
        sourceDocument: '',
        backOrderof: '',
        operationType: 'Nhập kho',
        status: 'Sẵn sàng',
    }

    const itemObj2Array = (exampleItem) => {
        const valuesArray = [];
        for (const key in exampleItem) {
            if (exampleItem.hasOwnProperty(key)) {
                valuesArray.push(exampleItem[key]);
            }
        }
        return valuesArray;
    }

    const checkedOrUncheckedElement = (element) => {
        const arrayItem = itemObj2Array(exampleItem);
        setAllElementsChecked(false);
        // console.log(element.target.checked)
        if (element.target.checked) {
            const updateListChecked = [...listCheckedItems, arrayItem];
            setListCheckedItems(updateListChecked);
            console.log(updateListChecked);
            setIsShowActions(true);
            setNumberCheckedItems(updateListChecked.length - 1);
        }
        else {
            const removeItemListChecked = listCheckedItems;
            removeItemListChecked.pop();
            setListCheckedItems(removeItemListChecked);
            console.log(removeItemListChecked);
            if (removeItemListChecked.length === 1) {
                setIsShowActions(false);
            }
            setNumberCheckedItems(removeItemListChecked.length - 1);
        }
    }

    const checkAllElements = (element) => {
        if (allElementsChecked) {
            setAllElementsChecked(false);
        }
        else {
            setAllElementsChecked(true);
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownFilterRef.current && !dropdownFilterRef.current.contains(event.target)) {
                setIsOpenDropdownFilter(false)
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        const fetchStockEntrys = async () => {
            const response = await getStockEntrys()
            if (response.EC == 0) {
                Promise.all([setStockEntrys(response?.DT)])
                // console.log(response.DT)
            } else {
                toast.error(response?.EM)
            }
        }

        fetchStockEntrys()
    }, [currentPage, currentLimit])

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

    function getNameViById(providers, item) {
        const provider = providers.find(provider => provider.providerId === item);
        return provider ? provider.nameVi : null;
    }


    const handleNavigateToReceiptPage = (receiptId) => {
        history.push('/manage-inventory/input-warehouse/' + receiptId)
    }

    return (
        <>
            <div className='body-manage-input-warehouse'>
                <FilterHeader
                    namePage={language === LANGUAGES.EN ? 'Receipts' : 'Phiếu nhập kho'}
                    urlNewItem={'/manage-inventory/input-warehouse/create'}
                    setCurrentViewProduct={setCurrentView}
                    currentView={currentView}
                    totalPageProduct={totalPage}
                    setCurrentProductPage={setCurrentPage}
                    showActions={isShowActions}
                    setShowActions={setIsShowActions}
                    listCheckedItems={listCheckedItems}
                    numberCheckedItems={numberCheckedItems}
                    changeSearchInputWarehouse={changeSearchInputWarehouse}
                    urlImportProduct={'/manage-inventory/input-warehouse/import'}
                />


                {currentView === 'block'
                    ?
                    <div className='manage-input-warehouse-container container-fluid mt-3 ps-5 pe-5'>

                        <div className='input-warehouse-items-wrap row'>
                            {/* {products && products.length > 0 &&
                                products.map((item, index) => {
                                    return (
                                        <div key={index} className='input-warehouse-item d-flex col-4  ' onClick={() => handleNavigateToProductPage(item.productId)}>
                                            <div className='image-input-warehouse'>
                                                <img className='img-input-warehouse' src={item.image} alt='input-warehouse img' />
                                            </div>
                                            <div className='des-input-warehouse'>
                                                <span className='name-input-warehouse '><FormattedMessage id="nav.manage-inventory-product" />: {language === LANGUAGES.EN ? item.nameEn : item.nameVi}</span>
                                                <span className='barcode-input-warehouse'><MdBarcodeReader /> <FormattedMessage id="product-view-barcode" />: {item.barCode}</span>
                                                <span className='cost-input-warehouse'><FaCoins /><FormattedMessage id='nav.manage-inventory-create-product-cost' />: {formatCurrency(item.cost)}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            } */}
                        </div>

                    </div>
                    :
                    <>
                        <div className='manage-input-warehouse-container'>
                            <table className="table table-striped table-hover">
                                <thead className='table-heading'>
                                    <tr className='table-row-heading'>
                                        <th className='align-middle' style={{ backgroundColor: '#f1e3f5' }} scope="col"><input onChange={(e) => checkAllElements(e)} className='form-check-input' type="checkbox" /></th>
                                        <th className='align-middle' style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-reference-code" /></th>
                                        <th className={`align-middle ${contactChecked ? '' : 'hidden'}`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-contact" /></th>
                                        <th className={`align-middle ${personInChargeChecked ? '' : 'hidden'}`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-person-in-charge" /></th>
                                        <th className={`align-middle ${plannedDateChecked ? '' : 'hidden'}`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-planned-date" /></th>
                                        <th className={`align-middle ${productAvailabilityChecked ? '' : 'hidden'}`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-product-availabilty" /></th>
                                        <th className={`align-middle ${deadlineChecked ? '' : 'hidden'}`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-deadline" /></th>
                                        <th className={`align-middle ${effectiveDateChecked ? '' : 'hidden'}`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-effective-date" /></th>
                                        <th className={`align-middle ${originalDocumentChecked ? '' : 'hidden'}`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-original-document" /></th>
                                        <th className={`align-middle ${orderDelayOfChecked ? '' : 'hidden'}`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-order-delay-of" /></th>
                                        <th className={`align-middle ${activityTypeChecked ? '' : 'hidden'}`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-activity-type" /></th>
                                        <th className={`align-middle ${statusChecked ? '' : 'hidden'}`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-status" /></th>

                                        <th ref={dropdownFilterRef} className='align-middle' style={{ backgroundColor: '#f1e3f5' }} scope="col"><IoOptions className='hover-item fs-4' onClick={() => setIsOpenDropdownFilter(!isOpenDropdownFilter)} />
                                            <div className={`dropdown-setting shadow rounded ${isOpenDropdownFilter ? '' : 'hidden'}`}>
                                                <div className='item'><label className='w-100'>
                                                    <input className="form-check-input ms-2" type="checkbox" value=""
                                                        checked={contactChecked}
                                                        onChange={() => { setContactChecked(!contactChecked) }}
                                                        aria-label="Checkbox for following text input" />
                                                    <span style={{ marginLeft: '6px', fontWeight: 'normal' }}><FormattedMessage id="inventory-reiceipt-contact" /></span>
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value=""
                                                        checked={personInChargeChecked}
                                                        onChange={() => { setPersonInChargeChecked(!personInChargeChecked) }}
                                                        aria-label="Checkbox for following text input" />
                                                    <span style={{ marginLeft: '6px', fontWeight: 'normal' }}><FormattedMessage id="inventory-reiceipt-person-in-charge" /></span>
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value=""
                                                        checked={plannedDateChecked}
                                                        onChange={() => { setplannedDateChecked(!plannedDateChecked) }}
                                                        aria-label="Checkbox for following text input" />
                                                    <span style={{ marginLeft: '6px', fontWeight: 'normal' }}><FormattedMessage id="inventory-reiceipt-planned-date" /></span>
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value=""
                                                        checked={productAvailabilityChecked}
                                                        onChange={() => { setProductAvailabilityChecked(!productAvailabilityChecked) }}
                                                        aria-label="Checkbox for following text input" />
                                                    <span style={{ marginLeft: '6px', fontWeight: 'normal' }}><FormattedMessage id="inventory-reiceipt-product-availabilty" /></span>
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value=""
                                                        checked={deadlineChecked}
                                                        onChange={() => { setDeadlineChecked(!deadlineChecked) }}
                                                        aria-label="Checkbox for following text input" />
                                                    <span style={{ marginLeft: '6px', fontWeight: 'normal' }}><FormattedMessage id="inventory-reiceipt-deadline" /></span>
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value=""
                                                        checked={effectiveDateChecked}
                                                        onChange={() => { setEffectiveDateChecked(!effectiveDateChecked) }}
                                                        aria-label="Checkbox for following text input" />
                                                    <span style={{ marginLeft: '6px', fontWeight: 'normal' }}><FormattedMessage id="inventory-reiceipt-effective-date" /></span>
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value=""
                                                        checked={originalDocumentChecked}
                                                        onChange={() => { setOriginalDocumentChecked(!originalDocumentChecked) }}
                                                        aria-label="Checkbox for following text input" />
                                                    <span style={{ marginLeft: '6px', fontWeight: 'normal' }}><FormattedMessage id="inventory-reiceipt-original-document" /></span>
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value=""
                                                        checked={orderDelayOfChecked}
                                                        onChange={() => { setOrderDelayOfChecked(!orderDelayOfChecked) }}
                                                        aria-label="Checkbox for following text input" />
                                                    <span style={{ marginLeft: '6px', fontWeight: 'normal' }}><FormattedMessage id="inventory-reiceipt-order-delay-of" /></span>
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value=""
                                                        checked={activityTypeChecked}
                                                        onChange={() => { setActivityTypeChecked(!activityTypeChecked) }}
                                                        aria-label="Checkbox for following text input" />
                                                    <span style={{ marginLeft: '6px', fontWeight: 'normal' }}><FormattedMessage id="inventory-reiceipt-activity-type" /></span>
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value=""
                                                        checked={statusChecked}
                                                        onChange={() => { setStatusChecked(!statusChecked) }}
                                                        aria-label="Checkbox for following text input" />
                                                    <span style={{ marginLeft: '6px', fontWeight: 'normal' }}><FormattedMessage id="inventory-reiceipt-status" /></span>
                                                </label></div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {tempProductsLength > 0 ? ( */}
                                    {stockEntrys ? (
                                        (() => {
                                            // if (products.length > 0) {
                                            if (tempProductsLength > 0) {
                                                const filteredInputWarehouses = stockEntrys.filter((item) => {
                                                    return searchInputWarehouse.toLowerCase() === '' ||
                                                        (item.stockEntryId.toLowerCase().includes(searchInputWarehouse.toLowerCase()) ||
                                                            getNameViById(providerList, item.providerId).toLowerCase().includes(searchInputWarehouse.toLowerCase()));


                                                });
                                                if (filteredInputWarehouses.length > 0) {
                                                    return filteredInputWarehouses.map((item, index) => (
                                                        <tr key={'receipt' + index} className='hover-item'>
                                                            {allElementsChecked
                                                                ? <th scope="row"><input onChange={(e) => checkedOrUncheckedElement(e)} className='form-check-input' type="checkbox" checked /></th>
                                                                : <th scope="row"><input onChange={(e) => checkedOrUncheckedElement(e)} className='form-check-input' type="checkbox" /></th>
                                                            }
                                                            <td onClick={() => handleNavigateToReceiptPage(item.stockEntryId)}>{item.stockEntryId}</td>
                                                            <td onClick={() => handleNavigateToReceiptPage(item.stockEntryId)} className={`${contactChecked ? '' : 'hidden'}`}>{getNameViById(providerList, item.providerId)}</td>
                                                            <td onClick={() => handleNavigateToReceiptPage(item.stockEntryId)} className={`${personInChargeChecked ? '' : 'hidden'}`}>{findEmailById(item.userId)}</td>
                                                            <td onClick={() => handleNavigateToReceiptPage(item.stockEntryId)} className={`${plannedDateChecked ? '' : 'hidden'}`}>{moment(item.scheduledDate).format('YYYY-MM-DD')}</td>
                                                            <td onClick={() => handleNavigateToReceiptPage(item.stockEntryId)} className={`${productAvailabilityChecked ? '' : 'hidden'}`}></td>
                                                            <td onClick={() => handleNavigateToReceiptPage(item.stockEntryId)} className={`${deadlineChecked ? '' : 'hidden'}`}></td>
                                                            <td onClick={() => handleNavigateToReceiptPage(item.stockEntryId)} className={`${effectiveDateChecked ? '' : 'hidden'}`}>{moment(item.createdAt).format('YYYY-MM-DD')}</td>
                                                            <td onClick={() => handleNavigateToReceiptPage(item.stockEntryId)} className={`${originalDocumentChecked ? '' : 'hidden'}`}>{item.purchaseId}</td>
                                                            <td onClick={() => handleNavigateToReceiptPage(item.stockEntryId)} className={`${orderDelayOfChecked ? '' : 'hidden'}`}></td>
                                                            <td onClick={() => handleNavigateToReceiptPage(item.stockEntryId)} className={`${activityTypeChecked ? '' : 'hidden'}`}>{item.warehouseId}: Phiếu nhập kho</td>
                                                            {renderStatus(item.status, statusChecked)}
                                                            <td></td>
                                                        </tr>
                                                    ));
                                                }
                                                else {
                                                    return (
                                                        <div className='text-center w-100 fw-bold'>
                                                            Không tìm thấy phiếu nhập kho
                                                        </div>
                                                    );
                                                }
                                            } else {
                                                return (
                                                    <tr>
                                                        <td colSpan="13">
                                                            <div className='text-center w-100 fw-bold'>
                                                                <span>Chưa có phiếu nhập kho</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        })()
                                    ) : (
                                        <div className='text-center w-100 fw-bold'>
                                        </div>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                }

            </div>
        </>
    )
}

export default InputWarehouse